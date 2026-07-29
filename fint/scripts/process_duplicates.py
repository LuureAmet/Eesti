#!/usr/bin/env python3
"""Duplicate analysis, v2.

Three things v1 got wrong, all of which changed the headline number:

  1. "Wasted space" summed every copy in the group. Deleting duplicates never
     reclaims the master, so reclaimable is (copies - 1) x size.
  2. Hardlinks were counted as separate copies. Two paths sharing an inode
     occupy the disk once; deleting one frees nothing.
  3. The master score returned only 20 or 80 and ignored mtime entirely, so
     ties -- the common case -- were broken by SQLite's row order.

It also stops issuing three queries per group. At 52k groups that was ~158k
round trips; this version does two reads and three bulk writes.
"""

import argparse
import re
import sys
from collections import defaultdict
from datetime import datetime, UTC
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from fi_common import DB_PATH, connect, migrate, human_bytes  # noqa: E402

JUNK_SEGMENTS = (
    "/venv/", "/.venv/", "/site-packages/", "/node_modules/", "/__pycache__/",
    "/.git/", "/.cache/", "/.npm/", "/.cargo/", "/.rustup/", "/.tox/",
    "/.mypy_cache/", "/.pytest_cache/", "/dist-info/", "/.Trash-1000/",
    "/.vscode-server/", "/.next/", "/target/debug/", "/build/",
)

COPY_MARKERS = re.compile(
    r"(?i)(\bcopy\b|\(\d+\)|~$|\.bak$|\.old$|\.orig$|_old\b|_bak\b|"
    r"\bduplicate\b|\bconflicted copy\b| \(\d+\)\.)"
)


def score_candidate(row):
    """Score a copy's fitness to be the canonical master.

    Returns (score, reasons). Reasons are stored so the dashboard can answer
    "why did you pick this one" without re-deriving the heuristic.
    """
    path = row["path"]
    score = 100
    reasons = []

    scope = row["system_scope"] or "user"
    if scope == "user":
        score += 40
        reasons.append("+40 user scope")
    elif scope == "backup":
        score -= 25
        reasons.append("-25 backup scope")
    elif scope == "cache":
        score -= 60
        reasons.append("-60 cache scope")
    elif scope == "system":
        score -= 10
        reasons.append("-10 system scope")

    if any(segment in path for segment in JUNK_SEGMENTS):
        score -= 70
        reasons.append("-70 machine-generated path")

    if row["project_root"]:
        score += 25
        reasons.append("+25 inside a project")
    if row["git_repo"]:
        score += 20
        reasons.append("+20 tracked in a git worktree")

    if COPY_MARKERS.search(Path(path).name):
        score -= 30
        reasons.append("-30 filename looks like a copy")

    if row["is_hidden"]:
        score -= 10
        reasons.append("-10 hidden")
    if row["is_generated"]:
        score -= 20
        reasons.append("-20 generated artefact")

    # Shallower paths are usually the ones a human put there on purpose.
    depth = row["depth"] or 0
    depth_penalty = min(depth, 20)
    score -= depth_penalty
    reasons.append(f"-{depth_penalty} depth {depth}")

    return score, "; ".join(reasons)


def main():
    try:
        sys.stdout.reconfigure(line_buffering=True)  # see the note in scan.py
    except (AttributeError, OSError):
        pass

    parser = argparse.ArgumentParser(description="Duplicate analysis v2")
    parser.add_argument("--db", default=None)
    parser.add_argument("--min-size", type=int, default=1,
                        help="ignore groups whose member size is below this (bytes)")
    args = parser.parse_args()

    con = connect(Path(args.db) if args.db else DB_PATH)
    migrate(con)
    cur = con.cursor()
    now = datetime.now(UTC).isoformat()

    print("clearing previous duplicate analysis...")
    cur.execute("DELETE FROM duplicate_members")
    cur.execute("DELETE FROM duplicate_groups")
    cur.execute(
        "UPDATE files SET duplicate_status=NULL, duplicate_group=NULL,"
        " duplicate_rank=NULL, duplicate_score=NULL"
        " WHERE duplicate_group IS NOT NULL OR duplicate_status IS NOT NULL"
    )
    con.commit()

    print("loading candidates...")
    # One pass. Symlinks and empty files are excluded: a symlink has no content
    # of its own, and every empty file hashes identically without wasting a byte.
    rows = cur.execute(
        """SELECT id, path, blake3, size_bytes, mtime, inode, device, depth,
                  system_scope, project_root, git_repo, is_hidden, is_generated
           FROM files
           WHERE blake3 IS NOT NULL
             AND status <> 'missing'
             AND is_symlink = 0
             AND size_bytes >= ?
           ORDER BY blake3, path""",
        (max(1, args.min_size),),
    ).fetchall()

    by_hash = defaultdict(list)
    for row in rows:
        by_hash[row["blake3"]].append(row)

    groups = {h: members for h, members in by_hash.items() if len(members) > 1}
    print(f"{len(rows):,} hashed files -> {len(groups):,} duplicate groups")

    group_rows, member_rows, file_updates = [], [], []
    total_reclaimable = 0
    total_occupied = 0

    for blake, members in groups.items():
        size = members[0]["size_bytes"]
        copies = len(members)

        # Hardlinked copies share storage. Count physical instances, not paths.
        distinct_inodes = len({(m["device"], m["inode"]) for m in members})
        reclaimable = size * (distinct_inodes - 1)
        occupied = size * distinct_inodes

        scored = []
        for member in members:
            value, reason = score_candidate(member)
            scored.append((value, member, reason))
        # Deterministic ordering: score desc, then oldest mtime, then path.
        scored.sort(key=lambda item: (-item[0], item[1]["mtime"] or 0, item[1]["path"]))

        mtimes = [m["mtime"] or 0 for m in members]
        oldest = min(members, key=lambda m: m["mtime"] or 0)["path"]
        newest = max(members, key=lambda m: m["mtime"] or 0)["path"]
        dup_type = "hardlink" if distinct_inodes < copies else "content"

        group_rows.append((
            blake, copies, distinct_inodes, occupied, reclaimable,
            oldest, newest, dup_type, "processed", now,
        ))
        for rank, (value, member, reason) in enumerate(scored):
            role = "master" if rank == 0 else "duplicate"
            member_rows.append((blake, member["id"], role, reason, value))
            file_updates.append((role, rank, value, member["id"]))

        total_reclaimable += reclaimable
        total_occupied += occupied
        del mtimes

    print("writing groups...")
    cur.executemany(
        """INSERT INTO duplicate_groups
             (blake3, copies, distinct_inodes, total_bytes, reclaimable_bytes,
              oldest_file, newest_file, duplicate_type, status, last_seen_scan)
           VALUES (?,?,?,?,?,?,?,?,?,?)""",
        group_rows,
    )
    con.commit()

    gid_by_hash = {r["blake3"]: r["id"] for r in
                   cur.execute("SELECT id, blake3 FROM duplicate_groups")}

    cur.executemany(
        "INSERT INTO duplicate_members (group_id, file_id, role, reason, score)"
        " VALUES (?,?,?,?,?)",
        [(gid_by_hash[h], fid, role, reason, value)
         for h, fid, role, reason, value in member_rows],
    )
    cur.executemany(
        "UPDATE files SET duplicate_status=?, duplicate_rank=?, duplicate_score=?"
        " WHERE id=?",
        file_updates,
    )
    cur.execute(
        """UPDATE files
           SET duplicate_group = (SELECT dg.id FROM duplicate_groups dg
                                  WHERE dg.blake3 = files.blake3)
           WHERE duplicate_status IS NOT NULL"""
    )
    cur.execute(
        """UPDATE duplicate_groups
           SET master_file_id = (SELECT dm.file_id FROM duplicate_members dm
                                 WHERE dm.group_id = duplicate_groups.id
                                   AND dm.role = 'master' LIMIT 1)"""
    )
    con.commit()

    # ---- directory duplicate ratios ------------------------------------
    print("updating directory duplicate ratios...")
    cur.execute(
        """UPDATE directories SET
             duplicate_files = COALESCE((
                 SELECT COUNT(*) FROM files f
                 WHERE f.parent_dir = directories.path
                   AND f.duplicate_status = 'duplicate'), 0),
             duplicate_bytes = COALESCE((
                 SELECT SUM(f.size_bytes) FROM files f
                 WHERE f.parent_dir = directories.path
                   AND f.duplicate_status = 'duplicate'), 0)"""
    )
    cur.execute(
        "UPDATE directories SET duplicate_ratio = "
        "CASE WHEN total_bytes > 0 THEN CAST(duplicate_bytes AS REAL)/total_bytes ELSE 0 END"
    )
    con.commit()

    # ---- backfill the latest scan so the timeline chart has a series ----
    latest = cur.execute(
        "SELECT scan_id FROM scan_statistics ORDER BY started DESC LIMIT 1"
    ).fetchone()
    if latest:
        cur.execute(
            "UPDATE scan_statistics SET duplicate_groups=?, duplicate_bytes=? WHERE scan_id=?",
            (len(group_rows), total_reclaimable, latest["scan_id"]),
        )
        cur.execute(
            "UPDATE scans SET duplicate_groups=?, duplicate_bytes=? WHERE scan_id=?",
            (len(group_rows), total_reclaimable, latest["scan_id"]),
        )
    con.commit()
    con.execute("PRAGMA optimize")
    con.close()

    print()
    print(f"  groups            : {len(group_rows):,}")
    print(f"  occupied by dupes : {human_bytes(total_occupied)}")
    print(f"  RECLAIMABLE       : {human_bytes(total_reclaimable)}   <- the real number")
    print("\nnext: report.py, or cleanup_plan.py --apply-to-review")


if __name__ == "__main__":
    main()
