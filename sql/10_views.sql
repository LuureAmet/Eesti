-- File Intelligence: curated read views.
--
-- These are the contract between the engine and any frontend. A dashboard, a
-- lens, or an LLM query bar should reach for these rather than re-deriving the
-- same joins, because the definitions here encode decisions (what counts as
-- live, what counts as reclaimable) that must not drift between views.
--
-- Apply with:  sqlite3 ~/file-intelligence/database/files.db < sql/10_views.sql
-- Safe to re-run.

-- ---------------------------------------------------------------------------
-- Everything that is actually on disk right now.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_live_files;
CREATE VIEW v_live_files AS
SELECT
    id, path, filename, basename, extension, parent_dir, depth,
    size_bytes, size_class, mtime, ctime, blake3, mime_type, category, language,
    owner_name, group_name, system_scope, importance,
    is_hidden, is_executable, is_symlink, is_empty, is_generated,
    contains_secrets, secret_types,
    project_name, project_type, project_root, git_repo, git_branch,
    duplicate_group, duplicate_status, duplicate_score,
    first_seen, first_seen_scan, last_seen_scan, seen_count,
    changed_scan, old_blake3,
    CAST((julianday('now') - 2440587.5) * 86400.0 - mtime AS INTEGER) / 86400 AS age_days
FROM files
WHERE status <> 'missing' AND status <> 'deleted';

-- ---------------------------------------------------------------------------
-- The OSINT log view: every recorded lifecycle event, enriched.
-- file_events is append-only, so this is the real audit trail -- not just the
-- single most recent delta that lives on the files row.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_recent_changes;
CREATE VIEW v_recent_changes AS
SELECT
    e.id            AS event_id,
    e.path,
    e.event,
    e.old_value,
    e.new_value,
    e.timestamp,
    substr(e.timestamp, 1, 13) AS hour_bucket,
    substr(e.timestamp, 1, 10) AS day_bucket,
    e.scan_id,
    f.size_bytes, f.category, f.language, f.owner_name, f.system_scope,
    f.parent_dir, f.project_name, f.git_repo, f.contains_secrets,
    f.status        AS current_status
FROM file_events e
LEFT JOIN files f ON f.path = e.path;

-- ---------------------------------------------------------------------------
-- Duplicate leaderboard, ordered by what you can genuinely reclaim.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_duplicate_leaderboard;
CREATE VIEW v_duplicate_leaderboard AS
SELECT
    g.id            AS group_id,
    g.blake3,
    g.copies,
    g.distinct_inodes,
    g.duplicate_type,
    g.total_bytes       AS occupied_bytes,
    g.reclaimable_bytes,
    g.status,
    m.path          AS master_path,
    m.category,
    m.size_bytes    AS unit_bytes,
    m.system_scope  AS master_scope,
    m.project_name  AS master_project
FROM duplicate_groups g
LEFT JOIN files m ON m.id = g.master_file_id;

-- ---------------------------------------------------------------------------
-- Treemap source. Recursive bytes so a parent is never smaller than its child.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_directory_heat;
CREATE VIEW v_directory_heat AS
SELECT
    d.path, d.parent, d.depth,
    d.file_count, d.subdirectory_count,
    d.total_bytes,
    COALESCE(d.total_bytes_recursive, d.total_bytes) AS bytes_recursive,
    COALESCE(d.file_count_recursive, d.file_count)   AS files_recursive,
    d.duplicate_files, d.duplicate_bytes, d.duplicate_ratio,
    d.largest_file, d.largest_file_size,
    d.project_name, d.git_repo, d.last_scan
FROM directories d;

-- ---------------------------------------------------------------------------
-- Every project the scanner recognised, with its footprint.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_projects;
CREATE VIEW v_projects AS
SELECT
    project_name,
    project_root,
    MAX(project_type)                       AS project_type,
    MAX(git_repo)                           AS git_repo,
    MAX(git_branch)                         AS git_branch,
    COUNT(*)                                AS file_count,
    SUM(size_bytes)                         AS total_bytes,
    SUM(CASE WHEN duplicate_status = 'duplicate' THEN size_bytes ELSE 0 END)
                                            AS duplicate_bytes,
    SUM(CASE WHEN category = 'code' THEN 1 ELSE 0 END)      AS code_files,
    SUM(CASE WHEN category = 'document' THEN 1 ELSE 0 END)  AS document_files,
    SUM(COALESCE(contains_secrets, 0))      AS files_with_secrets,
    MAX(mtime)                              AS last_touched,
    COUNT(DISTINCT language)                AS language_count
FROM files
WHERE project_root IS NOT NULL AND status <> 'missing'
GROUP BY project_root, project_name;

-- ---------------------------------------------------------------------------
-- AJALUGU: content that survives only inside backups.
--
-- These are the files an agent deleted from the live tree and that nothing in
-- user scope still carries. Hash-based, so a rename does not fool it: if the
-- same bytes exist anywhere live, the file is not orphaned.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_backup_only;
CREATE VIEW v_backup_only AS
SELECT
    b.id, b.path, b.filename, b.extension, b.category, b.language,
    b.size_bytes, b.mtime, b.blake3, b.parent_dir, b.project_name,
    b.duplicate_status,
    (SELECT COUNT(*) FROM files x
      WHERE x.blake3 = b.blake3 AND x.status <> 'missing') AS backup_copies
FROM files b
WHERE b.system_scope = 'backup'
  AND b.status <> 'missing'
  AND b.is_symlink = 0
  AND b.size_bytes > 0
  AND b.blake3 IS NOT NULL
  AND NOT EXISTS (
        SELECT 1 FROM files live
        WHERE live.blake3 = b.blake3
          AND live.system_scope = 'user'
          AND live.status <> 'missing'
  );

-- ---------------------------------------------------------------------------
-- Big, old, unloved, and not protected by version control.
-- The safest cleanup candidates that are *not* duplicates.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_stale_large;
CREATE VIEW v_stale_large AS
SELECT
    path, filename, category, size_bytes, mtime, system_scope, parent_dir,
    project_name, duplicate_status,
    CAST(((julianday('now') - 2440587.5) * 86400.0 - mtime) / 86400 AS INTEGER) AS age_days
FROM files
WHERE status <> 'missing'
  AND is_symlink = 0
  AND size_bytes > 50 * 1024 * 1024
  AND COALESCE(git_repo, 0) = 0
  AND COALESCE(duplicate_status, '') <> 'master'
  AND mtime < (julianday('now') - 2440587.5) * 86400.0 - (90 * 86400);

-- ---------------------------------------------------------------------------
-- Who is churning what. Aimed at multi-agent setups where several processes
-- write into the same tree and you need to attribute the noise.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_agent_activity;
CREATE VIEW v_agent_activity AS
SELECT
    substr(e.timestamp, 1, 13)  AS hour_bucket,
    substr(e.timestamp, 1, 10)  AS day_bucket,
    f.parent_dir,
    f.project_name,
    f.owner_name,
    f.category,
    e.event,
    COUNT(*)                    AS events,
    SUM(COALESCE(f.size_bytes, 0)) AS bytes_touched
FROM file_events e
JOIN files f ON f.path = e.path
GROUP BY hour_bucket, f.parent_dir, f.project_name, f.owner_name, f.category, e.event;

-- ---------------------------------------------------------------------------
-- Credential radar. Populated only when scan.py runs with --secrets.
-- Note the deliberate absence of the secret *value*: the engine records that a
-- file contains a credential and of what kind, never the credential itself.
-- ---------------------------------------------------------------------------
DROP VIEW IF EXISTS v_secret_radar;
CREATE VIEW v_secret_radar AS
SELECT
    path, filename, category, secret_types, size_bytes, mtime,
    system_scope, parent_dir, project_name, git_repo, owner_name,
    is_hidden, duplicate_status
FROM files
WHERE COALESCE(contains_secrets, 0) = 1 AND status <> 'missing';
