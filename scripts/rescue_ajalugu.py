#!/usr/bin/env python3
"""Ajalugu -- rescue content that survives only inside backups.

The problem this solves: agents (and people) delete things. Some of what was
deleted was junk, some of it was the record of what was being attempted and
why. Once the live tree no longer has it, the only remaining copy is inside a
backup archive that nobody will ever open.

This tool finds files whose *content* exists nowhere in user scope any more,
scores how likely each one is to be worth keeping, and stages the interesting
ones into a history folder for later reading.

It only ever copies. It never deletes from a backup and never moves anything.

    rescue_ajalugu.py --scan                      # build the review queue
    rescue_ajalugu.py --list --min-score 60       # look at what it found
    rescue_ajalugu.py --auto-accept 70            # mark high scorers for rescue
    rescue_ajalugu.py --extract ~/ajalugu         # copy accepted files out
"""

import argparse
import re
import shutil
import sys
from datetime import datetime, UTC
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from fi_common import DB_PATH, connect, migrate, human_bytes  # noqa: E402

# Categories worth reading later versus categories that are just bulk.
CATEGORY_SCORE = {
    "document": 35, "code": 30, "script": 25, "log": 20, "database": 5,
    "unknown": 0, "image": -5, "audio": -15, "video": -25, "archive": -20,
    "binary": -35, "package": -35, "font": -30, "model": -40, "key": 10,
}

# Filenames and paths that suggest deliberate human or agent authorship.
INTERESTING_NAME = re.compile(
    r"(?i)(readme|notes?|plan|design|spec|todo|journal|diary|log|conversation|"
    r"chat|prompt|instruction|memo|idea|draft|architecture|decision|postmortem|"
    r"retro|ajalugu|history|changelog|report|analysis|summary)"
)

BORING_PATH = re.compile(
    r"(?i)(/node_modules/|/site-packages/|/__pycache__/|/\.git/objects/|/dist-info/|"
    r"/\.cache/|/vendor/|/third_party/|\.min\.(js|css)$|/locale/|/man\d?/)"
)

TEXTUAL = {"document", "code", "script", "log", "unknown"}


def score_candidate(row):
    """0-100ish. Higher means "a human might actually want to read this again"."""
    path = row["path"]
    name = Path(path).name
    score = 50
    reasons = []

    category_bonus = CATEGORY_SCORE.get(row["category"], 0)
    score += category_bonus
    if category_bonus:
        reasons.append(f"{category_bonus:+d} category={row['category']}")

    if INTERESTING_NAME.search(name):
        score += 25
        reasons.append("+25 name suggests authored content")

    if BORING_PATH.search(path):
        score -= 45
        reasons.append("-45 dependency or build artefact path")

    size = row["size_bytes"] or 0
    if row["category"] in TEXTUAL:
        if 200 <= size <= 2_000_000:
            score += 15
            reasons.append("+15 human-sized text")
        elif size < 200:
            score -= 15
            reasons.append("-15 nearly empty")
        elif size > 20_000_000:
            score -= 20
            reasons.append("-20 enormous for text")
    elif size > 100_000_000:
        score -= 25
        reasons.append("-25 very large binary")

    if row["project_name"]:
        score += 10
        reasons.append(f"+10 belonged to project {row['project_name']}")

    if row["language"]:
        score += 8
        reasons.append(f"+8 source in {row['language']}")

    # Many identical copies inside backups means it was routinely re-archived --
    # more likely infrastructure than a unique thought.
    copies = row["backup_copies"] or 1
    if copies > 5:
        score -= 15
        reasons.append(f"-15 archived {copies} times")

    return max(0, min(100, score)), "; ".join(reasons)


def do_scan(con, args):
    cur = con.cursor()
    print("finding content that exists only in backups...")
    try:
        rows = cur.execute("SELECT * FROM v_backup_only").fetchall()
    except Exception as exc:
        raise SystemExit(
            f"v_backup_only is missing ({exc}).\n"
            "Run: sqlite3 $FI_DB < sql/10_views.sql"
        )
    print(f"{len(rows):,} orphaned files. Scoring...")

    now = datetime.now(UTC).isoformat()
    payload = []
    for row in rows:
        score, reason = score_candidate(row)
        if score < args.min_score:
            continue
        payload.append((row["blake3"], row["path"], row["size_bytes"], row["mtime"],
                        row["category"], reason, score, now))

    cur.executemany("""
        INSERT INTO rescue_candidates
          (blake3, source_path, size_bytes, mtime, category, reason, score, found_scan)
        VALUES (?,?,?,?,?,?,?,?)
        ON CONFLICT(source_path) DO UPDATE SET
          score=excluded.score, reason=excluded.reason, size_bytes=excluded.size_bytes,
          found_scan=excluded.found_scan""", payload)
    con.commit()

    kept = cur.execute(
        "SELECT COUNT(*) c, COALESCE(SUM(size_bytes),0) b FROM rescue_candidates"
        " WHERE decision='pending'").fetchone()
    print(f"\nqueued {len(payload):,} candidates at score >= {args.min_score}")
    print(f"pending review: {kept['c']:,} files / {human_bytes(kept['b'])}")
    print("\nnext: --list to review, or --auto-accept N")


def do_list(con, args):
    rows = con.execute("""
        SELECT * FROM rescue_candidates
        WHERE decision = ? AND score >= ?
        ORDER BY score DESC, size_bytes DESC LIMIT ?""",
        (args.decision, args.min_score, args.limit)).fetchall()
    if not rows:
        print("nothing matching.")
        return
    print(f"{'SCORE':>5}  {'SIZE':>10}  PATH")
    print("-" * 100)
    for row in rows:
        print(f"{row['score']:>5}  {human_bytes(row['size_bytes']):>10}  {row['source_path']}")
        if args.verbose:
            print(f"         {row['reason']}")
    print(f"\n{len(rows)} shown.")


def do_auto_accept(con, threshold):
    cur = con.execute(
        "UPDATE rescue_candidates SET decision='rescue', reviewed_at=?"
        " WHERE decision='pending' AND score >= ?",
        (datetime.now(UTC).isoformat(), threshold))
    con.commit()
    print(f"marked {cur.rowcount:,} candidates for rescue (score >= {threshold})")


def do_extract(con, destination, dry_run):
    """Copy accepted files into the history folder, preserving their old shape."""
    destination = Path(destination).expanduser().resolve()
    rows = con.execute(
        "SELECT * FROM rescue_candidates WHERE decision='rescue' ORDER BY score DESC"
    ).fetchall()
    if not rows:
        print("nothing marked for rescue. Use --auto-accept or the dashboard queue.")
        return

    manifest = [
        "# Ajalugu rescue manifest",
        f"# generated: {datetime.now(UTC).isoformat()}",
        f"# destination: {destination}",
        "",
    ]
    copied = skipped = 0
    copied_bytes = 0
    now = datetime.now(UTC).isoformat()
    updates = []

    for row in rows:
        source = Path(row["source_path"])
        if not source.is_file():
            manifest.append(f"MISSING\t{source}")
            skipped += 1
            continue
        # Mirror the original absolute path underneath the destination so the
        # context of where a file used to live is not lost.
        target = destination / source.as_posix().lstrip("/")
        if target.exists():
            manifest.append(f"EXISTS\t{target}")
            skipped += 1
            continue
        manifest.append(f"COPY\t{row['score']}\t{row['size_bytes']}\t{source}\t->\t{target}")
        if not dry_run:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
            updates.append((str(target), now, row["source_path"]))
        copied += 1
        copied_bytes += row["size_bytes"] or 0

    if not dry_run:
        con.executemany(
            "UPDATE rescue_candidates SET decision='rescued', rescued_path=?,"
            " reviewed_at=? WHERE source_path=?", updates)
        con.commit()
        destination.mkdir(parents=True, exist_ok=True)
        manifest_path = destination / "AJALUGU_MANIFEST.txt"
        manifest_path.write_text("\n".join(manifest) + "\n")
        print(f"manifest: {manifest_path}")

    print(f"\n{'would copy' if dry_run else 'copied'}: {copied:,} files / "
          f"{human_bytes(copied_bytes)}")
    print(f"skipped: {skipped:,}")
    if dry_run:
        print("\n(dry run -- re-run without --dry-run to write)")


def main():
    parser = argparse.ArgumentParser(description="Rescue backup-only history")
    parser.add_argument("--db", default=None)
    parser.add_argument("--scan", action="store_true", help="build the review queue")
    parser.add_argument("--list", action="store_true", help="show the queue")
    parser.add_argument("--auto-accept", type=int, metavar="SCORE",
                        help="mark everything at or above SCORE for rescue")
    parser.add_argument("--extract", metavar="DEST", help="copy accepted files to DEST")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--min-score", type=int, default=45)
    parser.add_argument("--decision", default="pending",
                        choices=["pending", "rescue", "skip", "rescued"])
    parser.add_argument("--limit", type=int, default=100)
    parser.add_argument("-v", "--verbose", action="store_true")
    args = parser.parse_args()

    con = connect(Path(args.db) if args.db else DB_PATH)
    migrate(con)

    did_something = False
    if args.scan:
        do_scan(con, args)
        did_something = True
    if args.auto_accept is not None:
        do_auto_accept(con, args.auto_accept)
        did_something = True
    if args.list:
        do_list(con, args)
        did_something = True
    if args.extract:
        do_extract(con, args.extract, args.dry_run)
        did_something = True

    if not did_something:
        parser.print_help()
    con.close()


if __name__ == "__main__":
    main()
