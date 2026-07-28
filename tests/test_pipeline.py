#!/usr/bin/env python3
"""End-to-end test of the v3 pipeline against a synthetic filesystem.

Runs the real scanner and the real duplicate processor over a tree with known
properties, then asserts the numbers the dashboard will display. Every check
here corresponds to a defect found in the v2 scripts.

    python3 tests/test_pipeline.py
"""

import os
import shutil
import sqlite3
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / "scripts"
sys.path.insert(0, str(SCRIPTS))
sys.path.insert(0, str(ROOT / "api"))

FAILURES = []
CHECKS = 0


def check(label, condition, detail=""):
    global CHECKS
    CHECKS += 1
    if condition:
        print(f"  PASS  {label}")
    else:
        print(f"  FAIL  {label}  {detail}")
        FAILURES.append(label)


def build_tree(base):
    """A tree with deliberately awkward properties."""
    (base / "projects/alpha/src").mkdir(parents=True)
    (base / "projects/alpha/.venv/lib/site-packages").mkdir(parents=True)
    (base / "projects/beta").mkdir(parents=True)
    (base / "backups/snap-2026-01").mkdir(parents=True)
    (base / ".cache/pip").mkdir(parents=True)
    (base / "links").mkdir(parents=True)

    payload = b"IDENTICAL PAYLOAD " * 5000          # ~90 KB
    orphan = b"ONLY IN THE BACKUP, NOWHERE LIVE " * 400

    (base / "projects/alpha/pyproject.toml").write_bytes(b"[project]\nname='alpha'\n")
    (base / "projects/alpha/src/main.py").write_bytes(payload)          # master candidate
    (base / "projects/alpha/.venv/lib/site-packages/main.py").write_bytes(payload)
    (base / "backups/snap-2026-01/main.py").write_bytes(payload)
    (base / ".cache/pip/blob.py").write_bytes(payload)

    # Hardlink: a fifth path, but NOT a fifth physical copy.
    os.link(base / "projects/alpha/src/main.py", base / "links/main_hardlink.py")

    # Content that exists only inside the backup -> an ajalugu rescue candidate.
    (base / "backups/snap-2026-01/lost_notes.md").write_bytes(orphan)

    # Unique files, so not every file is a duplicate.
    (base / "projects/beta/package.json").write_bytes(b'{"name":"beta"}')
    (base / "projects/beta/index.js").write_bytes(b"console.log('beta');\n")
    (base / "projects/alpha/src/config.py").write_bytes(
        b'AWS = "AKIAIOSFODNN7EXAMPLE"\npassword = "hunter2hunter2"\n'
    )

    # A symlink pointing at a parent: v2's loop guard is the one thing it got right.
    os.symlink(base / "projects", base / "links/loop")

    # An empty file: hashes identically to every other empty file but wastes nothing.
    (base / "projects/beta/empty.txt").touch()
    (base / "projects/alpha/also_empty.txt").touch()

    return {"payload_size": len(payload), "orphan_size": len(orphan)}


def run(cmd, env):
    result = subprocess.run(cmd, capture_output=True, text=True, env=env, cwd=str(ROOT))
    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr, file=sys.stderr)
        raise SystemExit(f"command failed: {' '.join(cmd)}")
    return result.stdout


def main():
    workdir = Path(tempfile.mkdtemp(prefix="fi-test-"))
    tree = workdir / "home"
    tree.mkdir()
    db = workdir / "files.db"
    facts = build_tree(tree)

    env = dict(os.environ)
    env["FI_DB"] = str(db)
    env["FI_REPORTS"] = str(workdir / "reports")

    print("\n[1] first scan")
    out = run([sys.executable, str(SCRIPTS / "scan.py"), str(tree), "--secrets"], env)
    print("    " + " | ".join(l.strip() for l in out.splitlines() if l.strip().startswith(
        ("files", "new", "changed", "missing"))))

    con = sqlite3.connect(db)
    con.row_factory = sqlite3.Row

    stats = con.execute(
        "SELECT * FROM scan_statistics ORDER BY started DESC LIMIT 1").fetchone()
    total = con.execute("SELECT COUNT(*) FROM files").fetchone()[0]

    # --- the v2 bug that made 'New' permanently zero ---
    check("new_files is non-zero on a first scan",
          stats["new_files"] == total and total > 0,
          f"new_files={stats['new_files']} rows={total}")

    check("symlinked directory was not followed into",
          con.execute("SELECT COUNT(*) FROM files WHERE path LIKE ?",
                      (str(tree / "links/loop") + "/%",)).fetchone()[0] == 0)

    check("symlink itself is recorded",
          con.execute("SELECT COUNT(*) FROM files WHERE is_symlink=1").fetchone()[0] >= 1)

    check("audit events were written (v2 never wrote any)",
          con.execute("SELECT COUNT(*) FROM file_events WHERE event='created'").fetchone()[0] == total)

    # --- directory accounting ---
    alpha = con.execute("SELECT * FROM directories WHERE path=?",
                        (str(tree / "projects/alpha"),)).fetchone()
    direct_files = len([p for p in (tree / "projects/alpha").iterdir() if p.is_file()])
    check("file_count counts files only, not subdirectories",
          alpha["file_count"] == direct_files,
          f"stored={alpha['file_count']} actual={direct_files}")
    check("subdirectory_count is tracked separately",
          alpha["subdirectory_count"] == 2, f"got {alpha['subdirectory_count']}")
    check("recursive rollup exceeds direct bytes",
          alpha["total_bytes_recursive"] > alpha["total_bytes"])

    # --- classification ---
    check("project detection found alpha",
          con.execute("SELECT COUNT(*) FROM files WHERE project_name='alpha'").fetchone()[0] > 0)
    check("backup scope assigned",
          con.execute("SELECT COUNT(*) FROM files WHERE system_scope='backup'").fetchone()[0] >= 2)
    check("cache scope assigned",
          con.execute("SELECT COUNT(*) FROM files WHERE system_scope='cache'").fetchone()[0] >= 1)

    secrets = con.execute(
        "SELECT path, secret_types FROM files WHERE contains_secrets=1").fetchall()
    check("secret radar found the planted AWS key",
          any("aws_key" in (r["secret_types"] or "") for r in secrets),
          f"found={[dict(r) for r in secrets]}")

    # --- hashing actually happened ---
    hashed = con.execute("SELECT COUNT(*) FROM files WHERE blake3 IS NOT NULL").fetchone()[0]
    if hashed == 0:
        print("  SKIP  no blake3 backend (install `blake3` or `b3sum`); duplicate checks skipped")
        con.close()
        summarise()
        return

    print("\n[2] duplicate analysis")
    out = run([sys.executable, str(SCRIPTS / "process_duplicates.py")], env)
    print("    " + " | ".join(l.strip() for l in out.splitlines() if "RECLAIM" in l or "groups" in l))

    con2 = sqlite3.connect(db)
    con2.row_factory = sqlite3.Row
    group = con2.execute(
        "SELECT * FROM duplicate_groups ORDER BY reclaimable_bytes DESC LIMIT 1").fetchone()

    size = facts["payload_size"]
    check("group sees all five paths", group["copies"] == 5, f"copies={group['copies']}")
    check("hardlink collapsed: 4 distinct inodes, not 5",
          group["distinct_inodes"] == 4, f"inodes={group['distinct_inodes']}")
    check("reclaimable = (distinct_inodes - 1) x size",
          group["reclaimable_bytes"] == 3 * size,
          f"got {group['reclaimable_bytes']} expected {3 * size}")
    check("v2 would have over-reported by 2 copies",
          group["total_bytes"] == 4 * size and 5 * size > group["reclaimable_bytes"])

    master = con2.execute("SELECT path, duplicate_score FROM files WHERE id=?",
                          (group["master_file_id"],)).fetchone()
    check("master is the real source file, not the .venv or backup copy",
          master["path"] == str(tree / "projects/alpha/src/main.py"),
          f"chose {master['path']}")

    reason = con2.execute(
        "SELECT reason FROM duplicate_members WHERE group_id=? AND role='master'",
        (group["id"],)).fetchone()["reason"]
    check("master choice is explained", "user scope" in reason and "project" in reason, reason)

    scores = [r[0] for r in con2.execute(
        "SELECT DISTINCT score FROM duplicate_members WHERE group_id=?", (group["id"],))]
    check("per-copy scores are distinct (v2 wrote 0 for every duplicate)", len(scores) > 2, str(scores))

    empties = con2.execute(
        "SELECT COUNT(*) FROM files WHERE is_empty=1 AND duplicate_status IS NOT NULL"
    ).fetchone()[0]
    check("empty files are not reported as reclaimable duplicates", empties == 0)

    print("\n[3] views")
    con2.executescript((ROOT / "sql" / "10_views.sql").read_text())
    con2.commit()

    orphans = con2.execute("SELECT path, size_bytes FROM v_backup_only").fetchall()
    orphan_names = [Path(r["path"]).name for r in orphans]
    check("ajalugu view finds backup-only content", "lost_notes.md" in orphan_names, str(orphan_names))
    check("ajalugu view excludes backup copies that still exist live",
          "main.py" not in orphan_names, str(orphan_names))

    leaders = con2.execute(
        "SELECT * FROM v_duplicate_leaderboard ORDER BY reclaimable_bytes DESC LIMIT 1").fetchone()
    check("leaderboard exposes the master path", leaders["master_path"] is not None)

    for view in ("v_live_files", "v_recent_changes", "v_directory_heat", "v_projects",
                 "v_stale_large", "v_agent_activity", "v_secret_radar"):
        try:
            con2.execute(f"SELECT * FROM {view} LIMIT 1").fetchall()
            print(f"  PASS  view {view} queryable")
        except sqlite3.Error as exc:
            print(f"  FAIL  view {view}: {exc}")
            FAILURES.append(view)
        globals()["CHECKS"] = CHECKS + 1
    con2.close()

    print("\n[4] incremental rescan: change, add, delete")
    (tree / "projects/alpha/src/main.py").write_bytes(b"MUTATED CONTENT " * 100)
    (tree / "projects/beta/brand_new.js").write_bytes(b"// fresh\n")
    (tree / "projects/beta/index.js").unlink()

    run([sys.executable, str(SCRIPTS / "scan.py"), str(tree)], env)

    con3 = sqlite3.connect(db)
    con3.row_factory = sqlite3.Row
    latest = con3.execute(
        "SELECT * FROM scan_statistics ORDER BY started DESC LIMIT 1").fetchone()
    check("rescan reports exactly one new file", latest["new_files"] == 1, f"{latest['new_files']}")
    # TWO changed, not one: main.py and links/main_hardlink.py share an inode, so
    # writing through one path genuinely alters the bytes visible at both. A
    # scanner that reported 1 here would be hiding a real filesystem fact.
    check("rescan reports both paths of the mutated hardlink as changed",
          latest["changed_files"] == 2, f"{latest['changed_files']}")
    check("rescan reports exactly one missing file",
          latest["deleted_files"] == 1, f"{latest['deleted_files']}")

    hist = con3.execute(
        "SELECT event, COUNT(*) c FROM file_events GROUP BY event").fetchall()
    events = {r["event"]: r["c"] for r in hist}
    check("append-only history retains creations AND the later modifications",
          events.get("modified", 0) == 2 and events.get("missing", 0) == 1
          and events.get("created", 0) == total + 1, str(events))

    mutated = con3.execute("SELECT old_blake3, changed_scan FROM files WHERE path=?",
                           (str(tree / "projects/alpha/src/main.py"),)).fetchone()
    check("previous hash preserved on the changed file", mutated["old_blake3"] is not None)

    print("\n[5] scanning a subtree must not retire the rest")
    run([sys.executable, str(SCRIPTS / "scan.py"), str(tree / "projects/beta")], env)
    still_live = con3.execute(
        "SELECT COUNT(*) FROM files WHERE path LIKE ? AND status='missing'",
        (str(tree / "backups") + "/%",)).fetchone()[0]
    con3.close()
    con4 = sqlite3.connect(db)
    still_live = con4.execute(
        "SELECT COUNT(*) FROM files WHERE path LIKE ? AND status='missing'",
        (str(tree / "backups") + "/%",)).fetchone()[0]
    check("a beta-only scan left the backups tree alone", still_live == 0, f"{still_live} retired")
    con4.close()

    print("\n[6] switching profiles must not fake deletions")
    # A light-profile scan skips .venv. Those files still exist on disk, so
    # retiring them would flood the change log with deletions that never
    # happened -- and the recommended cron cadence mixes profiles.
    run([sys.executable, str(SCRIPTS / "scan.py"), str(tree), "--profile", "light"], env)
    con5 = sqlite3.connect(db)
    con5.row_factory = sqlite3.Row
    skipped_status = con5.execute(
        "SELECT status FROM files WHERE path = ?",
        (str(tree / "projects/alpha/.venv/lib/site-packages/main.py"),)).fetchone()
    check("a file inside a skipped directory is not marked missing",
          skipped_status and skipped_status["status"] == "normal",
          f"status={skipped_status['status'] if skipped_status else None}")
    fake = con5.execute(
        "SELECT COUNT(*) FROM file_events WHERE event='missing' AND path LIKE ?",
        (str(tree / "projects/alpha/.venv") + "%",)).fetchone()[0]
    check("no phantom 'missing' event was logged for skipped files", fake == 0, f"{fake} events")
    con5.close()

    con.close()
    shutil.rmtree(workdir, ignore_errors=True)
    summarise()


def summarise():
    print(f"\n{'=' * 60}")
    if FAILURES:
        print(f"FAILED {len(FAILURES)}/{CHECKS}: {', '.join(FAILURES)}")
        raise SystemExit(1)
    print(f"ALL {CHECKS} CHECKS PASSED")


if __name__ == "__main__":
    main()
