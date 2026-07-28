#!/usr/bin/env python3
"""File Intelligence scanner, v3.

Changes that matter versus v2:
  * Streams in batches instead of holding every file in RAM (survives `/`).
  * Hashes and MIME-types in bulk instead of forking two subprocesses per file.
  * Records first_seen_scan, so "new files" is no longer permanently zero.
  * Writes an append-only file_events audit trail instead of only the last delta.
  * Marks missing files by path prefix, so scanning `/` no longer destroys the
    ability to scan subtrees independently.
  * Counts subdirectories separately from files.
  * Excludes the intelligence database from its own scan.

Usage:
    scan.py PATH [--profile full|light|fast] [--secrets] [--batch N] [--dry-run]
"""

import argparse
import os
import subprocess
import sys
import time
import uuid
from collections import defaultdict
from datetime import datetime, UTC
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import fi_classify as clf  # noqa: E402
from fi_common import (  # noqa: E402
    ALWAYS_SKIP_ROOTS, DB_PATH, REPORTS_DIR, SCAN_VERSION,
    connect, migrate, human_bytes, size_class,
)

try:
    import pwd
    import grp
except ImportError:  # non-POSIX
    pwd = grp = None

LIGHT_SKIP = {
    ".Trash-1000", ".cache", ".npm", ".cargo", ".rustup", ".vscode-server",
    "node_modules", "__pycache__", ".venv", "venv", ".mypy_cache", ".pytest_cache",
    ".tox", ".next", ".turbo", ".gradle", ".m2",
}

EXT_MIME = {
    ".py": "text/x-python", ".js": "text/javascript", ".ts": "text/typescript",
    ".json": "application/json", ".md": "text/markdown", ".txt": "text/plain",
    ".html": "text/html", ".css": "text/css", ".xml": "text/xml",
    ".yaml": "text/yaml", ".yml": "text/yaml", ".toml": "text/toml",
    ".sh": "text/x-shellscript", ".log": "text/plain", ".csv": "text/csv",
    ".pdf": "application/pdf", ".zip": "application/zip", ".gz": "application/gzip",
    ".zst": "application/zstd", ".tar": "application/x-tar", ".xz": "application/x-xz",
    ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
    ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
    ".mp4": "video/mp4", ".mkv": "video/x-matroska", ".mp3": "audio/mpeg",
    ".so": "application/x-sharedlib", ".deb": "application/vnd.debian.binary-package",
    ".sqlite": "application/vnd.sqlite3", ".db": "application/vnd.sqlite3",
}


# ---------------------------------------------------------------------------
# Bulk hashing
# ---------------------------------------------------------------------------
class Hasher:
    """BLAKE3 with the fastest backend available.

    In-process (the `blake3` wheel) beats forking b3sum by roughly an order of
    magnitude at 280k files. If the wheel is absent we still batch the CLI so we
    fork once per chunk rather than once per file.
    """

    CHUNK = 256

    def __init__(self, enabled=True):
        self.enabled = enabled
        self.backend = None
        if not enabled:
            return
        try:
            import blake3  # noqa: F401
            self.backend = "module"
            self._blake3 = blake3
        except ImportError:
            if _which("b3sum"):
                self.backend = "b3sum"

    def hash_many(self, paths):
        """paths -> {path: hexdigest}. Unreadable files are simply absent."""
        if not self.enabled or not self.backend or not paths:
            return {}
        if self.backend == "module":
            return self._hash_in_process(paths)
        return self._hash_via_cli(paths)

    def _hash_in_process(self, paths):
        out = {}
        for path in paths:
            try:
                hasher = self._blake3.blake3()
                with open(path, "rb", buffering=0) as handle:
                    for block in iter(lambda: handle.read(1 << 20), b""):
                        hasher.update(block)
                out[path] = hasher.hexdigest()
            except OSError:
                continue
        return out

    def _hash_via_cli(self, paths):
        out = {}
        for start in range(0, len(paths), self.CHUNK):
            chunk = paths[start:start + self.CHUNK]
            try:
                result = subprocess.run(
                    ["b3sum", "--"] + chunk,
                    capture_output=True, text=True, timeout=600,
                )
            except (OSError, subprocess.TimeoutExpired):
                continue
            for line in result.stdout.splitlines():
                # "<hex>  <path>" — b3sum prefixes a backslash when the name
                # needed escaping, in which case we skip rather than guess.
                if line.startswith("\\"):
                    continue
                parts = line.split("  ", 1)
                if len(parts) == 2 and len(parts[0]) == 64:
                    out[parts[1]] = parts[0]
        return out


class MimeDetector:
    """MIME types, extension-first and batched for the rest."""

    CHUNK = 256

    def __init__(self):
        self.magic = None
        try:
            import magic
            self.magic = magic.Magic(mime=True)
        except Exception:
            self.magic = None
        self.have_file = _which("file") is not None

    def detect_many(self, paths_with_ext):
        """[(path, ext)] -> {path: mime}"""
        out = {}
        unknown = []
        for path, ext in paths_with_ext:
            hit = EXT_MIME.get(ext)
            if hit:
                out[path] = hit
            else:
                unknown.append(path)
        if not unknown:
            return out
        if self.magic is not None:
            for path in unknown:
                try:
                    out[path] = self.magic.from_file(path)
                except Exception:
                    pass
            return out
        if not self.have_file:
            return out
        for start in range(0, len(unknown), self.CHUNK):
            chunk = unknown[start:start + self.CHUNK]
            try:
                result = subprocess.run(
                    ["file", "-b", "--mime-type", "--"] + chunk,
                    capture_output=True, text=True, timeout=300,
                )
            except (OSError, subprocess.TimeoutExpired):
                continue
            lines = result.stdout.splitlines()
            # `file -b` emits exactly one line per input, in argument order.
            if len(lines) == len(chunk):
                out.update(zip(chunk, (line.strip() for line in lines)))
        return out


def _which(name):
    from shutil import which
    return which(name)


# ---------------------------------------------------------------------------
# Insert / update
# ---------------------------------------------------------------------------
COLUMNS = [
    "path", "filename", "size_bytes", "mtime", "ctime", "inode", "device", "nlink",
    "permissions", "blake3", "scanned_at", "extension", "category", "scan_id",
    "symlink_target", "size_class", "mime_type", "last_seen_scan", "first_seen",
    "first_seen_scan", "seen_count", "status", "language", "depth", "basename",
    "parent_dir", "top_directory", "owner_uid", "owner_gid", "owner_name", "group_name",
    "is_hidden", "is_executable", "is_symlink", "is_empty", "is_generated",
    "system_scope", "project_root", "project_name", "project_type", "git_repo",
    "git_branch", "contains_secrets", "secret_types",
]

# Columns refreshed on every re-observation. Deliberately excludes first_seen,
# first_seen_scan and seen_count, which are lifecycle facts, not observations.
_REFRESH = [c for c in COLUMNS if c not in
            ("path", "first_seen", "first_seen_scan", "seen_count", "status")]

SQL_UPSERT = f"""
INSERT INTO files ({", ".join(COLUMNS)})
VALUES ({", ".join("?" * len(COLUMNS))})
ON CONFLICT(path) DO UPDATE SET
    {", ".join(f"{c}=excluded.{c}" for c in _REFRESH)},
    seen_count = files.seen_count + 1,
    status = 'normal',
    disappeared_scan = NULL,
    old_blake3 = CASE
        WHEN excluded.blake3 IS NOT NULL AND files.blake3 IS NOT NULL
             AND files.blake3 <> excluded.blake3
        THEN files.blake3 ELSE files.old_blake3 END,
    changed_scan = CASE
        WHEN excluded.blake3 IS NOT NULL AND files.blake3 IS NOT NULL
             AND files.blake3 <> excluded.blake3
        THEN excluded.scan_id ELSE files.changed_scan END
"""


def flush_batch(con, batch, scan_id, now):
    """Write one batch and emit audit events for anything that moved.

    The event rows are derived from a pre-read of the affected paths, because
    SQLite's UPSERT cannot return the old row.
    """
    if not batch:
        return 0, 0
    cur = con.cursor()
    paths = [row[0] for row in batch]

    placeholders = ",".join("?" * len(paths))
    before = {
        r["path"]: (r["blake3"], r["size_bytes"])
        for r in cur.execute(
            f"SELECT path, blake3, size_bytes FROM files WHERE path IN ({placeholders})",
            paths,
        )
    }

    cur.executemany(SQL_UPSERT, batch)

    blake_i, size_i = COLUMNS.index("blake3"), COLUMNS.index("size_bytes")
    events, new_count, changed_count = [], 0, 0
    for row in batch:
        path, new_hash, new_size = row[0], row[blake_i], row[size_i]
        if path not in before:
            new_count += 1
            events.append((path, "created", None, new_hash, now, scan_id))
            continue
        old_hash, old_size = before[path]
        if new_hash and old_hash and new_hash != old_hash:
            changed_count += 1
            events.append((path, "modified", old_hash, new_hash, now, scan_id))
        elif new_hash is None and old_size != new_size:
            # fast profile: no hashes, so size is the only change signal
            changed_count += 1
            events.append((path, "resized", str(old_size), str(new_size), now, scan_id))

    if events:
        cur.executemany(
            "INSERT INTO file_events (path, event, old_value, new_value, timestamp, scan_id)"
            " VALUES (?,?,?,?,?,?)",
            events,
        )
    return new_count, changed_count


# ---------------------------------------------------------------------------
# Walk
# ---------------------------------------------------------------------------
def build_row(full, name, stat, is_symlink, scan_id, scan_start, now,
              scan_root, blake, mime, secrets):
    path_str = str(full)
    ext = full.suffix.lower()
    category, language = clf.categorize(name, ext)

    if is_symlink:
        size = mtime = ctime = inode = device = 0
        nlink, perm = 0, "symlink"
        try:
            target = os.readlink(path_str)
        except OSError:
            target = None
        owner_uid = owner_gid = 0
    else:
        size = stat.st_size
        mtime, ctime = stat.st_mtime, stat.st_ctime
        inode, device, nlink = stat.st_ino, stat.st_dev, stat.st_nlink
        perm = oct(stat.st_mode & 0o7777)
        target = None
        owner_uid, owner_gid = stat.st_uid, stat.st_gid

    owner_name = _uid_name(owner_uid)
    group_name = _gid_name(owner_gid)
    parent = str(full.parent)
    project_type, project_root, project_name = clf.detect_project(parent)
    git_repo, git_branch = clf.detect_git(parent)

    return (
        path_str, name, size, mtime, ctime, inode, device, nlink, perm,
        blake, now, ext, category, scan_id, target, size_class(size), mime,
        scan_id, scan_start, scan_id, 1, "normal", language, len(full.parts),
        clf.stem(name), parent, scan_root, owner_uid, owner_gid, owner_name, group_name,
        1 if name.startswith(".") else 0,
        1 if (stat and not is_symlink and stat.st_mode & 0o111) else 0,
        1 if is_symlink else 0,
        1 if size == 0 and not is_symlink else 0,
        clf.is_generated(path_str),
        clf.system_scope(path_str), project_root, project_name, project_type,
        git_repo, git_branch,
        1 if secrets else 0, ",".join(secrets) if secrets else None,
    )


_UID_CACHE, _GID_CACHE = {}, {}


def _uid_name(uid):
    if uid not in _UID_CACHE:
        try:
            _UID_CACHE[uid] = pwd.getpwuid(uid).pw_name if pwd else str(uid)
        except (KeyError, AttributeError):
            _UID_CACHE[uid] = str(uid)
    return _UID_CACHE[uid]


def _gid_name(gid):
    if gid not in _GID_CACHE:
        try:
            _GID_CACHE[gid] = grp.getgrgid(gid).gr_name if grp else str(gid)
        except (KeyError, AttributeError):
            _GID_CACHE[gid] = str(gid)
    return _GID_CACHE[gid]


def main():
    parser = argparse.ArgumentParser(description="File Intelligence scanner v3")
    parser.add_argument("path")
    parser.add_argument("--profile", choices=["full", "light", "fast"], default="full")
    parser.add_argument("--secrets", action="store_true",
                        help="scan small text files for credential patterns")
    parser.add_argument("--batch", type=int, default=5000)
    parser.add_argument("--dry-run", action="store_true",
                        help="walk and report, write nothing")
    parser.add_argument("--db", default=None)
    args = parser.parse_args()

    scan_root = str(Path(args.path).resolve())
    if not os.path.isdir(scan_root):
        parser.error(f"not a directory: {scan_root}")

    db_path = Path(args.db) if args.db else DB_PATH
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    error_log = REPORTS_DIR / "scan_errors.log"

    con = connect(db_path)
    migrate(con)
    cur = con.cursor()

    scan_id = str(uuid.uuid4())
    scan_start = datetime.now(UTC).isoformat()
    started = time.time()

    skip_names = LIGHT_SKIP if args.profile in ("light", "fast") else set()
    hasher = Hasher(enabled=args.profile != "fast")
    mimer = MimeDetector()

    # Never hash the database we are writing to, or its WAL.
    self_paths = {str(db_path), f"{db_path}-wal", f"{db_path}-shm"}

    print(f"scan root : {scan_root}")
    print(f"profile   : {args.profile}   hash backend: {hasher.backend or 'disabled'}   "
          f"mime: {'libmagic' if mimer.magic else 'file(1)'}")

    batch = []
    total_files = total_bytes = new_files = changed_files = errors = 0
    dir_bytes = defaultdict(int)
    dir_files = defaultdict(int)
    dir_subdirs = defaultdict(int)
    dir_largest = {}
    category_counts = defaultdict(int)
    largest_file, largest_size = None, 0
    hash_seconds = 0.0
    error_handle = open(error_log, "a") if not args.dry_run else None

    def enrich_and_flush():
        """Hash + MIME the pending batch, then write it."""
        nonlocal batch, new_files, changed_files, hash_seconds
        if not batch:
            return
        hashable = [p for p, _, s, sym in batch if not sym and s > 0 and p not in self_paths]
        t0 = time.time()
        hashes = hasher.hash_many(hashable)
        hash_seconds += time.time() - t0
        mimes = mimer.detect_many([(p, e) for p, e, _, sym in batch if not sym])

        rows = []
        for path, _ext, _size, _sym in batch:
            meta = pending[path]
            secrets = []
            if args.secrets and not meta["is_symlink"]:
                secrets = clf.scan_for_secrets(path, meta["category"], meta["size"])
            rows.append(build_row(
                meta["full"], meta["name"], meta["stat"], meta["is_symlink"],
                scan_id, scan_start, datetime.now(UTC).isoformat(), scan_root,
                hashes.get(path), mimes.get(path, "inode/symlink" if meta["is_symlink"] else None),
                secrets,
            ))
        if not args.dry_run:
            n, c = flush_batch(con, rows, scan_id, datetime.now(UTC).isoformat())
            new_files += n
            changed_files += c
            con.commit()
        batch = []
        pending.clear()

    pending = {}

    for root, dirs, filenames in os.walk(scan_root, followlinks=False, onerror=lambda e: None):
        root_path = Path(root)

        # Prune in place: skip symlinked directories (loop protection), profile
        # skips, and pseudo-filesystems. Doing this here means we never stat the
        # contents at all.
        #
        # A symlinked directory is pruned from the walk but still *recorded*: the
        # fact that /links/loop points at /projects is intelligence, and losing
        # it means the map has a hole where a redirection used to be.
        kept, symlinked_dirs = [], []
        for d in dirs:
            child = root_path / d
            if d in skip_names or str(child) in ALWAYS_SKIP_ROOTS:
                continue
            try:
                if child.is_symlink():
                    symlinked_dirs.append(child)
                    continue
            except OSError:
                continue
            kept.append(d)
        dirs[:] = kept

        dir_str = str(root_path)
        dir_subdirs[dir_str] = len(kept)
        dir_bytes[dir_str] += 0
        parent_str = str(root_path.parent)
        if dir_str != scan_root and parent_str != dir_str:
            pass  # subdirectory counts come from len(kept) above, not from children

        for full in symlinked_dirs + [root_path / n for n in filenames]:
            name = full.name
            path_str = str(full)
            try:
                is_symlink = full.is_symlink()
                stat = None if is_symlink else full.stat()
                size = 0 if is_symlink else stat.st_size
            except OSError as exc:
                errors += 1
                if error_handle:
                    error_handle.write(f"{path_str}\t{exc}\n")
                continue

            ext = full.suffix.lower()
            category, _lang = clf.categorize(name, ext)
            category_counts[category] += 1
            total_files += 1
            total_bytes += size
            dir_bytes[dir_str] += size
            dir_files[dir_str] += 1
            if size > dir_largest.get(dir_str, (None, -1))[1]:
                dir_largest[dir_str] = (path_str, size)
            if size > largest_size:
                largest_file, largest_size = path_str, size

            pending[path_str] = {
                "full": full, "name": name, "stat": stat,
                "is_symlink": is_symlink, "size": size, "category": category,
            }
            batch.append((path_str, ext, size, is_symlink))

            if len(batch) >= args.batch:
                enrich_and_flush()
                print(f"  ... {total_files:,} files / {human_bytes(total_bytes)}", end="\r")

    enrich_and_flush()
    print(f"  walked {total_files:,} files / {human_bytes(total_bytes)}          ")
    if error_handle:
        error_handle.close()

    if args.dry_run:
        print(f"\ndry run: nothing written. errors={errors}")
        con.close()
        return

    # ---- missing files -------------------------------------------------
    # A file is retired only if this scan actually looked inside its directory.
    #
    # Keying on the scan root (by prefix or by top_directory) is too coarse: a
    # --profile light run skips node_modules, so every file under it would be
    # declared missing even though it is sitting right there on disk. The same
    # goes for a directory that errored out on permissions. Recording the
    # directories we visited and retiring only within those is exact, and it
    # subsumes the subtree-independence property for free.
    print("marking missing files...")
    cur.execute("CREATE TEMP TABLE visited_dirs (path TEXT PRIMARY KEY)")
    cur.executemany("INSERT OR IGNORE INTO visited_dirs VALUES (?)",
                    [(d,) for d in dir_bytes])
    cur.execute(
        """UPDATE files SET status='missing', disappeared_scan=?
           WHERE last_seen_scan <> ?
             AND status NOT IN ('missing', 'deleted')
             AND parent_dir IN (SELECT path FROM visited_dirs)""",
        (scan_id, scan_id),
    )
    deleted_files = cur.rowcount
    if deleted_files:
        cur.execute(
            """INSERT INTO file_events (path, event, old_value, new_value, timestamp, scan_id)
               SELECT path, 'missing', blake3, NULL, ?, ? FROM files
               WHERE disappeared_scan = ?""",
            (datetime.now(UTC).isoformat(), scan_id, scan_id),
        )
    con.commit()

    # ---- directory rollups --------------------------------------------
    print("rolling up directories...")
    recursive_bytes = defaultdict(int)
    recursive_files = defaultdict(int)
    # Deepest-first so each directory adds its own totals into every ancestor.
    for path in sorted(dir_bytes, key=lambda p: p.count(os.sep), reverse=True):
        recursive_bytes[path] += dir_bytes[path]
        recursive_files[path] += dir_files[path]
        parent = str(Path(path).parent)
        if parent != path and path != scan_root:
            recursive_bytes[parent] += recursive_bytes[path]
            recursive_files[parent] += recursive_files[path]

    dir_rows = [
        (
            path, str(Path(path).parent), dir_files[path], dir_bytes[path],
            recursive_bytes[path], recursive_files[path],
            dir_largest.get(path, (None, 0))[0], dir_largest.get(path, (None, 0))[1],
            len(Path(path).parts), dir_subdirs.get(path, 0), scan_id, scan_start,
        )
        for path in dir_bytes
    ]
    cur.executemany(
        """INSERT INTO directories
             (path, parent, file_count, total_bytes, total_bytes_recursive,
              file_count_recursive, largest_file, largest_file_size, depth,
              subdirectory_count, scan_id, last_scan)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
           ON CONFLICT(path) DO UPDATE SET
             parent=excluded.parent, file_count=excluded.file_count,
             total_bytes=excluded.total_bytes,
             total_bytes_recursive=excluded.total_bytes_recursive,
             file_count_recursive=excluded.file_count_recursive,
             largest_file=excluded.largest_file,
             largest_file_size=excluded.largest_file_size, depth=excluded.depth,
             subdirectory_count=excluded.subdirectory_count,
             scan_id=excluded.scan_id, last_scan=excluded.last_scan""",
        dir_rows,
    )
    con.commit()

    # ---- extension / mime rollups (recomputed, never accumulated) -------
    print("rebuilding extension + mime rollups...")
    cur.executescript("DELETE FROM extensions; DELETE FROM mime_types; DELETE FROM unknown_extensions;")
    cur.execute(
        """INSERT INTO extensions (extension, count, bytes, category)
           SELECT COALESCE(extension,''), COUNT(*), COALESCE(SUM(size_bytes),0),
                  MAX(category)
           FROM files WHERE status <> 'missing' GROUP BY COALESCE(extension,'')"""
    )
    cur.execute(
        """INSERT INTO mime_types (mime, count, bytes)
           SELECT mime_type, COUNT(*), COALESCE(SUM(size_bytes),0)
           FROM files WHERE mime_type IS NOT NULL AND status <> 'missing'
           GROUP BY mime_type"""
    )
    cur.execute(
        """INSERT INTO unknown_extensions (extension, count, total_bytes, example_path,
                                           suggested_category)
           SELECT COALESCE(extension,''), COUNT(*), COALESCE(SUM(size_bytes),0),
                  MAX(path), 'review'
           FROM files WHERE category='unknown' AND status <> 'missing'
           GROUP BY COALESCE(extension,'')"""
    )
    con.commit()

    # ---- scan bookkeeping ----------------------------------------------
    duration = time.time() - started
    largest_dir = max(recursive_bytes, key=recursive_bytes.get) if recursive_bytes else None
    finished = datetime.now(UTC).isoformat()

    cur.execute(
        """INSERT INTO scan_statistics
             (scan_id, started, finished, duration_seconds, total_files, total_size_bytes,
              code_files, document_files, image_files, video_files, archive_files,
              database_files, largest_file, largest_file_size, largest_directory,
              largest_directory_size, total_directories, new_files, deleted_files,
              changed_files, system_files)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
        (scan_id, scan_start, finished, duration, total_files, total_bytes,
         category_counts["code"], category_counts["document"], category_counts["image"],
         category_counts["video"], category_counts["archive"], category_counts["database"],
         largest_file, largest_size, largest_dir,
         recursive_bytes.get(largest_dir, 0), len(dir_bytes),
         new_files, deleted_files, changed_files,
         cur.execute("SELECT COUNT(*) FROM files WHERE system_scope='system'").fetchone()[0]),
    )
    cur.execute(
        """INSERT INTO scans
             (scan_id, started, root_path, file_count, scan_duration, total_bytes,
              code_files, document_files, image_files, archive_files, largest_file,
              largest_file_size, largest_directory, new_files, deleted_files,
              changed_files, hash_time, scan_version, hostname, username, scan_type)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
        (scan_id, scan_start, scan_root, total_files, duration, total_bytes,
         category_counts["code"], category_counts["document"], category_counts["image"],
         category_counts["archive"], largest_file, largest_size, largest_dir,
         new_files, deleted_files, changed_files, hash_seconds, SCAN_VERSION,
         os.uname().nodename if hasattr(os, "uname") else "", os.getenv("USER", ""),
         args.profile),
    )
    con.commit()
    con.execute("PRAGMA optimize")
    con.close()

    print(f"\nscan {scan_id}")
    print(f"  files    : {total_files:,}   {human_bytes(total_bytes)}")
    print(f"  new      : {new_files:,}")
    print(f"  changed  : {changed_files:,}")
    print(f"  missing  : {deleted_files:,}")
    print(f"  duration : {duration:.1f}s   (hashing {hash_seconds:.1f}s)")
    if errors:
        print(f"  errors   : {errors}  -> {error_log}")
    print("\nnext: process_duplicates.py, then report.py")


if __name__ == "__main__":
    main()
