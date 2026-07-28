#!/usr/bin/env python3
"""CLI report, v2.

Same job as v1 -- print what the last scan found -- but the numbers are the
ones the dashboard shows, and the duplicate figure is reclaimable space rather
than the sum of every copy.

    report.py                # latest scan
    report.py --scan SCAN_ID
    report.py --json         # machine-readable, for cron mail or a webhook
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from fi_common import DB_PATH, connect, human_bytes  # noqa: E402


def fetch(con, scan_id=None):
    cur = con.cursor()
    if scan_id:
        scan = cur.execute(
            "SELECT * FROM scan_statistics WHERE scan_id = ?", (scan_id,)).fetchone()
    else:
        scan = cur.execute(
            "SELECT * FROM scan_statistics ORDER BY started DESC LIMIT 1").fetchone()
    if not scan:
        return None

    meta = cur.execute(
        "SELECT root_path, scan_type, scan_version, hostname FROM scans WHERE scan_id = ?",
        (scan["scan_id"],)).fetchone()

    def listing(sql, params=()):
        return [dict(r) for r in cur.execute(sql, params).fetchall()]

    sid = scan["scan_id"]
    return {
        "scan": dict(scan),
        "meta": dict(meta) if meta else {},
        "new": listing(
            "SELECT path, size_bytes FROM files WHERE first_seen_scan = ?"
            " ORDER BY size_bytes DESC LIMIT 20", (sid,)),
        "changed": listing(
            "SELECT path, size_bytes FROM files WHERE changed_scan = ?"
            " ORDER BY size_bytes DESC LIMIT 20", (sid,)),
        "missing": listing(
            "SELECT path, size_bytes FROM files WHERE disappeared_scan = ?"
            " ORDER BY size_bytes DESC LIMIT 20", (sid,)),
        "largest": listing(
            "SELECT path, size_bytes, system_scope FROM files"
            " WHERE status <> 'missing' AND is_symlink = 0"
            " ORDER BY size_bytes DESC LIMIT 10"),
        "duplicates": dict(cur.execute(
            "SELECT COUNT(*) groups, COALESCE(SUM(reclaimable_bytes),0) reclaimable,"
            " COALESCE(SUM(total_bytes),0) occupied FROM duplicate_groups").fetchone()),
        "top_waste": listing(
            "SELECT master_path, copies, reclaimable_bytes FROM v_duplicate_leaderboard"
            " ORDER BY reclaimable_bytes DESC LIMIT 10"),
        "scopes": listing(
            "SELECT system_scope scope, COUNT(*) files, SUM(size_bytes) bytes"
            " FROM files WHERE status <> 'missing' GROUP BY system_scope"
            " ORDER BY bytes DESC"),
        "secrets": cur.execute(
            "SELECT COUNT(*) n FROM files WHERE contains_secrets = 1"
            " AND status <> 'missing'").fetchone()["n"],
    }


def render(data):
    scan, meta = data["scan"], data["meta"]
    print("\n=== FILE INTELLIGENCE REPORT ===")
    print(f"scan     : {scan['scan_id']}")
    print(f"started  : {scan['started']}")
    print(f"target   : {meta.get('root_path', '?')}  ({meta.get('scan_type', '?')} profile)")
    print(f"duration : {scan['duration_seconds'] or 0:.1f}s")

    print("\n--- INVENTORY ---")
    print(f"files    : {scan['total_files'] or 0:,}")
    print(f"size     : {human_bytes(scan['total_size_bytes'])}")
    print(f"new      : {scan['new_files'] or 0:,}")
    print(f"changed  : {scan['changed_files'] or 0:,}")
    print(f"missing  : {scan['deleted_files'] or 0:,}")
    if data["secrets"]:
        print(f"secrets  : {data['secrets']:,} files carry credential patterns")

    print("\n--- BY SCOPE ---")
    for row in data["scopes"]:
        print(f"  {row['scope'] or '?':<8} {row['files']:>9,} files  {human_bytes(row['bytes']):>12}")

    for label, key in (("NEW", "new"), ("CHANGED", "changed"), ("MISSING", "missing")):
        if data[key]:
            print(f"\n--- {label} (top {len(data[key])}) ---")
            for row in data[key]:
                print(f"  {human_bytes(row['size_bytes']):>10}  {row['path']}")

    print("\n--- LARGEST ON DISK ---")
    for row in data["largest"]:
        print(f"  {human_bytes(row['size_bytes']):>10}  [{row['system_scope'] or '?'}] {row['path']}")

    dup = data["duplicates"]
    print("\n--- DUPLICATES ---")
    print(f"groups          : {dup['groups']:,}")
    print(f"occupied        : {human_bytes(dup['occupied'])}")
    print(f"RECLAIMABLE     : {human_bytes(dup['reclaimable'])}")
    if not dup["groups"]:
        print("  (run process_duplicates.py)")
    for row in data["top_waste"][:5]:
        print(f"  {human_bytes(row['reclaimable_bytes']):>10}  x{row['copies']:<4} "
              f"{row['master_path']}")
    print()


def main():
    parser = argparse.ArgumentParser(description="File Intelligence report v2")
    parser.add_argument("--scan", default=None, help="a specific scan_id")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--db", default=None)
    args = parser.parse_args()

    con = connect(Path(args.db) if args.db else DB_PATH, read_only=True)
    try:
        data = fetch(con, args.scan)
    finally:
        con.close()

    if not data:
        raise SystemExit("no scans found. Run scan.py first.")
    if args.json:
        print(json.dumps(data, indent=2, default=str))
    else:
        render(data)


if __name__ == "__main__":
    main()
