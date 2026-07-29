#!/usr/bin/env python3
"""Shared plumbing for the file-intelligence toolchain.

Everything that touches the database goes through here so that migrations,
pragmas and path conventions stay in exactly one place.
"""

import os
import sqlite3
from pathlib import Path

DB_PATH = Path(os.environ.get("FI_DB", Path.home() / "file-intelligence/database/files.db"))
TEXT_DB_PATH = Path(os.environ.get("FI_TEXT_DB", DB_PATH.parent / "files_text.db"))
REPORTS_DIR = Path(os.environ.get("FI_REPORTS", DB_PATH.parent.parent / "reports"))

SCAN_VERSION = "3.0-intelligence"

# Pseudo-filesystems. Walking these is meaningless at best and unbounded at worst.
ALWAYS_SKIP_ROOTS = {"/proc", "/sys", "/dev", "/run"}

# Directory names that mark machine-generated content. Used for scoring and profiles.
JUNK_DIR_NAMES = {
    ".git", ".cache", ".npm", ".cargo", ".rustup", ".vscode-server", ".Trash-1000",
    "node_modules", "__pycache__", ".venv", "venv", "site-packages", ".mypy_cache",
    ".pytest_cache", ".tox", "dist-info", ".gradle", ".m2", "target", ".next",
}


# ---------------------------------------------------------------------------
# Migrations
# ---------------------------------------------------------------------------
# Each entry is a list of statements applied atomically to move user_version
# from index i to i+1. Never edit a released migration; append a new one.
MIGRATIONS = [
    # 0 -> 1 : columns the v3 scanner needs on top of the v2 schema.
    [
        "ALTER TABLE files ADD COLUMN first_seen_scan TEXT",
        "ALTER TABLE files ADD COLUMN device INTEGER",
        "ALTER TABLE files ADD COLUMN nlink INTEGER DEFAULT 1",
        "ALTER TABLE files ADD COLUMN contains_secrets INTEGER DEFAULT 0",
        "ALTER TABLE files ADD COLUMN secret_types TEXT",
        "ALTER TABLE directories ADD COLUMN total_bytes_recursive INTEGER",
        "ALTER TABLE directories ADD COLUMN file_count_recursive INTEGER",
        "ALTER TABLE duplicate_groups ADD COLUMN reclaimable_bytes INTEGER",
        "ALTER TABLE duplicate_groups ADD COLUMN distinct_inodes INTEGER",
        "CREATE INDEX IF NOT EXISTS idx_files_first_seen_scan ON files(first_seen_scan)",
        "CREATE INDEX IF NOT EXISTS idx_files_changed_scan ON files(changed_scan)",
        "CREATE INDEX IF NOT EXISTS idx_files_dup_group ON files(duplicate_group)",
        "CREATE INDEX IF NOT EXISTS idx_events_scan ON file_events(scan_id)",
        "CREATE INDEX IF NOT EXISTS idx_events_path ON file_events(path)",
    ],
    # 1 -> 2 : the lens/rule engine's own storage.
    [
        """CREATE TABLE IF NOT EXISTS lenses (
               id INTEGER PRIMARY KEY,
               name TEXT UNIQUE NOT NULL,
               description TEXT,
               spec TEXT NOT NULL,          -- the query AST, as JSON
               kind TEXT DEFAULT 'view',    -- view | rule | metric
               tag TEXT,                    -- for kind='rule': tag to apply
               pinned INTEGER DEFAULT 0,
               created TEXT,
               updated TEXT
           )""",
        """CREATE TABLE IF NOT EXISTS reports (
               id INTEGER PRIMARY KEY,
               name TEXT UNIQUE NOT NULL,
               description TEXT,
               blocks TEXT NOT NULL,        -- ordered list of blocks, as JSON
               created TEXT,
               updated TEXT
           )""",
        "CREATE INDEX IF NOT EXISTS idx_tags_path ON file_tags(path)",
        "CREATE INDEX IF NOT EXISTS idx_tags_tag ON file_tags(tag)",
    ],
    # 2 -> 3 : the ajalugu (history rescue) ledger.
    [
        """CREATE TABLE IF NOT EXISTS rescue_candidates (
               id INTEGER PRIMARY KEY,
               blake3 TEXT,
               source_path TEXT UNIQUE,
               size_bytes INTEGER,
               mtime REAL,
               category TEXT,
               reason TEXT,                 -- why this looked worth rescuing
               score INTEGER,
               decision TEXT DEFAULT 'pending',   -- pending|rescue|skip|rescued
               rescued_path TEXT,
               reviewed_at TEXT,
               found_scan TEXT
           )""",
        "CREATE INDEX IF NOT EXISTS idx_rescue_decision ON rescue_candidates(decision)",
        "CREATE INDEX IF NOT EXISTS idx_rescue_score ON rescue_candidates(score)",
    ],
]


def _table_exists(cur, name):
    return cur.execute(
        "SELECT 1 FROM sqlite_master WHERE type='table' AND name=?", (name,)
    ).fetchone() is not None


BASE_SCHEMA = """
CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY, path TEXT NOT NULL UNIQUE, filename TEXT NOT NULL,
    size_bytes INTEGER, mtime REAL, ctime REAL, inode INTEGER, permissions TEXT,
    blake3 TEXT, scanned_at TEXT, extension TEXT, category TEXT DEFAULT 'unknown',
    scan_id TEXT, ignored_reason TEXT, file_type TEXT, symlink_target TEXT,
    size_class TEXT, mime_type TEXT, last_seen_scan TEXT, status TEXT,
    first_seen TEXT, modified_scan TEXT, deleted_scan TEXT, seen_count INTEGER DEFAULT 1,
    importance TEXT, environment TEXT, project TEXT, language TEXT, confidence REAL,
    depth INTEGER, basename TEXT, parent_dir TEXT, top_directory TEXT,
    owner_uid INTEGER, owner_gid INTEGER, owner_name TEXT, group_name TEXT,
    is_hidden INTEGER DEFAULT 0, is_executable INTEGER DEFAULT 0, is_symlink INTEGER DEFAULT 0,
    is_empty INTEGER DEFAULT 0, is_generated INTEGER DEFAULT 0, file_family TEXT,
    software_type TEXT, encoding TEXT, system_scope TEXT, duplicate_group INTEGER,
    duplicate_rank INTEGER, duplicate_status TEXT, duplicate_score INTEGER,
    project_root TEXT, project_name TEXT, project_type TEXT, vcs TEXT,
    git_repo INTEGER DEFAULT 0, git_branch TEXT, git_remote TEXT, git_commit TEXT,
    disappeared_scan TEXT, changed_scan TEXT, old_blake3 TEXT
);
CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY, scan_id TEXT UNIQUE, started TEXT, root_path TEXT,
    file_count INTEGER, scan_duration REAL, total_bytes INTEGER, duplicate_groups INTEGER,
    duplicate_bytes INTEGER, code_files INTEGER, document_files INTEGER, image_files INTEGER,
    archive_files INTEGER, largest_file TEXT, largest_file_size INTEGER, largest_directory TEXT,
    new_files INTEGER, deleted_files INTEGER, changed_files INTEGER, hash_time REAL,
    scan_version TEXT, hostname TEXT, username TEXT, scan_path_hash TEXT, scan_type TEXT
);
CREATE TABLE IF NOT EXISTS scan_statistics (
    scan_id TEXT PRIMARY KEY, started TEXT, finished TEXT, duration_seconds REAL,
    total_files INTEGER, total_size_bytes INTEGER, duplicate_groups INTEGER,
    duplicate_bytes INTEGER, code_files INTEGER, document_files INTEGER, image_files INTEGER,
    video_files INTEGER, archive_files INTEGER, database_files INTEGER, largest_file TEXT,
    largest_file_size INTEGER, largest_directory TEXT, largest_directory_size INTEGER,
    total_directories INTEGER, new_files INTEGER, deleted_files INTEGER, changed_files INTEGER,
    system_files INTEGER
);
CREATE TABLE IF NOT EXISTS directories (
    id INTEGER PRIMARY KEY, path TEXT UNIQUE, parent TEXT, file_count INTEGER,
    total_bytes INTEGER, largest_file TEXT, largest_file_size INTEGER, depth INTEGER,
    scan_id TEXT, subdirectory_count INTEGER DEFAULT 0, duplicate_files INTEGER DEFAULT 0,
    duplicate_bytes INTEGER DEFAULT 0, duplicate_ratio REAL DEFAULT 0, project_name TEXT,
    git_repo INTEGER DEFAULT 0, importance INTEGER DEFAULT 0, category TEXT, last_scan TEXT
);
CREATE TABLE IF NOT EXISTS duplicate_groups (
    id INTEGER PRIMARY KEY, blake3 TEXT UNIQUE, copies INTEGER, master_file_id INTEGER,
    status TEXT DEFAULT 'review_needed', oldest_file TEXT, newest_file TEXT,
    duplicate_type TEXT, total_bytes INTEGER, first_seen_scan TEXT, last_seen_scan TEXT
);
CREATE TABLE IF NOT EXISTS duplicate_members (
    id INTEGER PRIMARY KEY, group_id INTEGER, file_id INTEGER,
    role TEXT DEFAULT 'duplicate', reason TEXT, score INTEGER
);
CREATE TABLE IF NOT EXISTS file_events (
    id INTEGER PRIMARY KEY, path TEXT, event TEXT, old_value TEXT, new_value TEXT,
    timestamp TEXT, scan_id TEXT
);
CREATE TABLE IF NOT EXISTS file_tags (
    id INTEGER PRIMARY KEY, path TEXT, tag TEXT, source TEXT, created TEXT
);
CREATE TABLE IF NOT EXISTS unknown_extensions (
    extension TEXT PRIMARY KEY, count INTEGER, total_bytes INTEGER, example_path TEXT,
    suggested_category TEXT, reviewed INTEGER DEFAULT 0, guess TEXT
);
CREATE TABLE IF NOT EXISTS extensions (
    extension TEXT PRIMARY KEY, count INTEGER DEFAULT 0, bytes INTEGER DEFAULT 0,
    category TEXT, mime TEXT, reviewed INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS mime_types (
    mime TEXT PRIMARY KEY, count INTEGER DEFAULT 0, bytes INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS relationships (
    id INTEGER PRIMARY KEY, source TEXT, target TEXT, relation TEXT, confidence REAL
);
CREATE INDEX IF NOT EXISTS idx_files_blake3 ON files(blake3);
CREATE INDEX IF NOT EXISTS idx_files_size ON files(size_bytes);
CREATE INDEX IF NOT EXISTS idx_files_category ON files(category);
CREATE INDEX IF NOT EXISTS idx_files_status ON files(status);
CREATE INDEX IF NOT EXISTS idx_files_parent ON files(parent_dir);
CREATE INDEX IF NOT EXISTS idx_files_scope ON files(system_scope);
CREATE INDEX IF NOT EXISTS idx_dirs_path ON directories(path);
CREATE INDEX IF NOT EXISTS idx_dirs_size ON directories(total_bytes);
"""


def connect(db_path=None, read_only=False, timeout=30.0):
    """Open the intelligence database with sane pragmas."""
    path = Path(db_path or DB_PATH)
    if read_only:
        con = sqlite3.connect(f"file:{path}?mode=ro", uri=True, timeout=timeout)
        con.execute("PRAGMA query_only=ON")
    else:
        path.parent.mkdir(parents=True, exist_ok=True)
        con = sqlite3.connect(path, timeout=timeout)
        con.execute("PRAGMA journal_mode=WAL")
        con.execute("PRAGMA synchronous=NORMAL")
    con.execute("PRAGMA foreign_keys=ON")
    con.row_factory = sqlite3.Row
    return con


def migrate(con):
    """Bring the schema up to date. Idempotent, versioned, and loud on failure."""
    cur = con.cursor()
    if not _table_exists(cur, "files"):
        cur.executescript(BASE_SCHEMA)
        con.commit()

    version = cur.execute("PRAGMA user_version").fetchone()[0]

    # A pre-v3 database that predates user_version will report 0 but may already
    # carry some v3 columns from a partial run. Tolerate exactly that case.
    for index in range(version, len(MIGRATIONS)):
        for statement in MIGRATIONS[index]:
            try:
                cur.execute(statement)
            except sqlite3.OperationalError as exc:
                msg = str(exc).lower()
                if "duplicate column" in msg or "already exists" in msg:
                    continue  # the object is already there; that is the desired end state
                raise RuntimeError(
                    f"migration {index}->{index + 1} failed on: {statement}\n  {exc}"
                ) from exc
        cur.execute(f"PRAGMA user_version={index + 1}")
        con.commit()

    apply_views(con)
    return len(MIGRATIONS)


VIEWS_SQL = Path(__file__).resolve().parent.parent / "sql" / "10_views.sql"


def apply_views(con):
    """(Re)create the curated views.

    Views are part of the schema contract, not an optional extra: the rescue
    tool, the API and every saved lens name them directly. They are cheap to
    rebuild and always reflect the file on disk, so re-running is the point.
    """
    if not VIEWS_SQL.exists():
        return False
    con.executescript(VIEWS_SQL.read_text())
    con.commit()
    return True


def human_bytes(n):
    if n is None:
        return "-"
    n = float(n)
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if abs(n) < 1024 or unit == "TB":
            return f"{n:,.1f} {unit}" if unit != "B" else f"{int(n)} B"
        n /= 1024
    return f"{n:.1f} TB"


def size_class(size):
    if size < 500_000:
        return "tiny"
    if size < 5_000_000:
        return "small"
    if size < 100_000_000:
        return "medium"
    if size < 1_000_000_000:
        return "large"
    return "huge"
