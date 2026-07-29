# Data contract

What a frontend, a lens or a report may rely on. Anything not listed here is an
implementation detail and may change.

The live schema is always authoritative:

```bash
sqlite3 ~/file-intelligence/database/files.db ".schema"
```

---

## Migrating an existing database

v3 is additive. It does not drop or rewrite any v2 column, so an existing
461 MB `files.db` upgrades in place.

```bash
# 1. back up first — this is a one-line insurance policy on months of scanning
cp ~/file-intelligence/database/files.db ~/file-intelligence/database/files.db.bak

# 2. migrate + create views (idempotent; safe to run repeatedly)
python3 -c "import sys; sys.path.insert(0,'scripts'); \
from fi_common import connect, migrate; c=connect(); print('user_version ->', migrate(c))"

# 3. reclaim space and refresh the planner's statistics
sqlite3 ~/file-intelligence/database/files.db "VACUUM; ANALYZE;"
```

Then re-run a scan. Rows from v2 scans keep their history; `first_seen_scan`,
`device` and `nlink` are `NULL` until each file is next observed, which means:

- **Run `process_duplicates.py` again after the first v3 scan.** Until then,
  hardlink collapsing has no inode data to work with and will fall back to
  counting every path.
- `new_files` on the first v3 scan will be **0**, correctly — nothing is new,
  the rows already existed. It becomes meaningful from the second scan on.

Migrations are versioned via `PRAGMA user_version` and defined in
`fi_common.MIGRATIONS`. Never edit a released migration; append a new list.

---

## `files` — the master inventory

One row per path. `path` is `UNIQUE`; the row is upserted on every observation.

### Identity
| Column | Notes |
|---|---|
| `id` | Stable primary key. Referenced by `duplicate_members`. |
| `path` | Absolute, resolved. The natural key. |
| `filename`, `basename`, `extension` | `basename` is dotfile-correct (`.bashrc` → `.bashrc`, not `""`). |
| `parent_dir`, `top_directory`, `depth` | `top_directory` is the scan root; **do not** use it for partitioning — the missing sweep keys on directories actually visited, not on this column. |

### Metrics
| Column | Notes |
|---|---|
| `size_bytes` | `0` for symlinks (the link, not the target). |
| `size_class` | `tiny` <500 KB, `small` <5 MB, `medium` <100 MB, `large` <1 GB, `huge`. |
| `mtime`, `ctime` | Unix float. |
| `inode`, `device`, `nlink` | **`device` + `inode` together** identify a physical file. `nlink > 1` means hardlinks exist. |
| `permissions` | Octal mode string, e.g. `0o644`. |

### Content
| Column | Notes |
|---|---|
| `blake3` | `NULL` for symlinks, empty files, unreadable files, and every file under `--profile fast`. **Always handle `NULL`.** |
| `mime_type`, `category`, `language` | `category` ∈ code, script, document, image, video, audio, archive, database, binary, package, log, font, key, model, unknown. |
| `contains_secrets`, `secret_types` | Only populated by `--secrets`. `secret_types` is a comma-separated list of *kinds* — never a credential value. |

### Ownership & flags
`owner_uid`, `owner_gid`, `owner_name`, `group_name`,
`is_hidden`, `is_executable`, `is_symlink`, `is_empty`, `is_generated`,
`symlink_target`.

### Classification
| Column | Notes |
|---|---|
| `system_scope` | `system` \| `user` \| `cache` \| `backup`. The main filter axis. **Scope is not inferable from the path text** — `proj/.venv/x` is `cache` scope. Filter on the column, never on a path substring. |
| `project_root`, `project_name`, `project_type` | Nearest enclosing project marker, up to 6 levels. |
| `git_repo`, `git_branch` | Enclosing git worktree. |
| `importance` | Reserved. Not currently written. |

### Lifecycle
| Column | Notes |
|---|---|
| `status` | `normal` \| `missing` \| `deleted`. Filter `status <> 'missing'` for "on disk now", or use `v_live_files`. |
| `first_seen` | ISO timestamp of first observation. |
| `first_seen_scan` | **Scan UUID** of first observation. Use this to find new files, not `first_seen`. |
| `last_seen_scan`, `seen_count` | |
| `changed_scan`, `old_blake3` | Most recent content change only. For full history use `file_events`. |
| `disappeared_scan` | Cleared if the file returns. |

### Duplicates
`duplicate_group` (→ `duplicate_groups.id`), `duplicate_status`
(`master` \| `duplicate` \| `NULL`), `duplicate_rank` (0 = master),
`duplicate_score`.

---

## `file_events` — the audit trail

Append-only. One row per observed transition. **This is the history**; the
`old_blake3` column on `files` holds only the single most recent change.

| Column | Notes |
|---|---|
| `path` | Not a foreign key — events survive the file's deletion. |
| `event` | `created` \| `modified` \| `resized` \| `missing`. |
| `old_value`, `new_value` | BLAKE3 hashes for `modified`; sizes for `resized`. |
| `timestamp`, `scan_id` | |

`resized` occurs only under `--profile fast`, where size is the sole change signal.

---

## `duplicate_groups` / `duplicate_members`

| Column | Meaning |
|---|---|
| `copies` | Number of **paths**. |
| `distinct_inodes` | Number of **physical files**. Less than `copies` when hardlinks exist. |
| `total_bytes` | Space currently **occupied** = `size × distinct_inodes`. |
| `reclaimable_bytes` | Space you can **free** = `size × (distinct_inodes − 1)`. |
| `duplicate_type` | `content` \| `hardlink`. |
| `master_file_id` | → `files.id`. |

> **Use `reclaimable_bytes` for anything user-facing.** `total_bytes` is not
> savings; presenting it as savings is the v2 bug.

`duplicate_members.reason` is a human-readable score breakdown
(`+40 user scope; +25 inside a project; -12 depth 12`). Show it — an unexplained
verdict about which copy to delete is not actionable.

---

## `directories`

| Column | Notes |
|---|---|
| `file_count`, `total_bytes` | **Direct children only.** |
| `file_count_recursive`, `total_bytes_recursive` | Whole subtree. **Use these for treemaps** — direct bytes make a parent look smaller than its own child. |
| `subdirectory_count` | Counted separately from files. |
| `duplicate_files`, `duplicate_bytes`, `duplicate_ratio` | Written by `process_duplicates.py`; zero until it runs. |

---

## `scan_statistics` / `scans`

One row per scan. `scan_statistics` is the timeline source.
`duplicate_groups` and `duplicate_bytes` are backfilled by
`process_duplicates.py`, so they are `NULL` on any scan not followed by it.

---

## Views

Defined in `sql/10_views.sql`, recreated on every `migrate()`. These are the
stable surface — prefer them over raw tables.

| View | Purpose |
|---|---|
| `v_live_files` | Everything on disk now, plus a computed `age_days`. |
| `v_recent_changes` | `file_events` enriched with file metadata, plus `hour_bucket` / `day_bucket`. |
| `v_duplicate_leaderboard` | Groups joined to their master, ordered by reclaimable bytes. |
| `v_directory_heat` | Treemap source with recursive bytes and duplicate ratio. |
| `v_projects` | Per-project footprint, language spread and secret count. |
| `v_backup_only` | Content existing nowhere in user scope. The Ajalugu source. |
| `v_stale_large` | >50 MB, >90 days untouched, not git-tracked, not a master. |
| `v_agent_activity` | Events bucketed by hour × directory × project × event. |
| `v_secret_radar` | Files carrying credential patterns. |

---

## Reserved tables

Present in the schema, intentionally not written yet. Do not build against
them; they are named here so they are not mistaken for cruft.

| Table | Intended for |
|---|---|
| `file_text`, `file_text_fts` | Stage 4. **Will move to `files_text.db`.** |
| `relationships` | Stage 5 — imports, references, agent→file edges. |
| `file_history` | Superseded by `file_events`. Retained for v2 compatibility. |
| `locations`, `events`, `tags`, `directory_similarity`, `directory_stats` | Unused v2 remnants. `directory_stats` duplicates `directories`; use `directories`. |

---

## Engine tables (written by the API, not the scanner)

| Table | Contents |
|---|---|
| `lenses` | Saved query ASTs. `kind` ∈ `view` \| `rule` \| `metric`. |
| `reports` | Ordered lens-backed blocks. |
| `file_tags` | Materialised rule matches. `source = 'rule'` rows are rewritten on every apply. |
| `rescue_candidates` | The Ajalugu review queue. |

---

## Invariants a frontend may assume

1. `path` is unique and absolute.
2. `blake3` may be `NULL`. Never join on it without a `NOT NULL` guard — v2's
   duplicate query would otherwise group every unhashed file together.
3. `status <> 'missing'` means the file was present at its last observation.
4. `reclaimable_bytes ≤ total_bytes`, always.
5. Exactly one member per duplicate group has `role = 'master'`.
6. `file_events` is append-only; rows are never updated or deleted.
7. The API never writes to `files`, `directories`, `duplicate_*` or
   `scan_statistics` — it holds those read-only.
