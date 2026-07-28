#!/usr/bin/env python3
"""fint -- File INTelligence.

One entry point for the whole toolchain, so you never have to remember which
script lives where or what order things run in.

    ./fint.py status                    what does the database currently know
    ./fint.py doctor                    are the optional accelerators installed
    ./fint.py scan ~ --profile light    inventory a tree
    ./fint.py dupes                     work out what is genuinely duplicated
    ./fint.py report                    print the latest scan
    ./fint.py ajalugu --scan            find content surviving only in backups
    ./fint.py serve                     start the dashboard
    ./fint.py all ~                     scan + dupes + report in one go

Every subcommand passes unknown flags straight through to the underlying
script, so `fint scan ~ --batch 2000 --dry-run` works exactly as it would if
you had called scan.py yourself.
"""

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPTS = HERE / "scripts"
API = HERE / "api"
SQL = HERE / "sql"
TESTS = HERE / "tests"

sys.path.insert(0, str(SCRIPTS))

BOLD, DIM, GREEN, YELLOW, RED, RESET = (
    ("\033[1m", "\033[2m", "\033[32m", "\033[33m", "\033[31m", "\033[0m")
    if sys.stdout.isatty() else ("", "", "", "", "", "")
)


def run_script(name, args, check=True):
    """Delegate to one of the scripts, forwarding argv and the exit code."""
    target = SCRIPTS / name
    if not target.exists():
        die(f"missing script: {target}")
    result = subprocess.run([sys.executable, str(target), *args])
    if check and result.returncode != 0:
        sys.exit(result.returncode)
    return result.returncode


def die(message):
    print(f"{RED}error:{RESET} {message}", file=sys.stderr)
    sys.exit(1)


def _db():
    from fi_common import DB_PATH
    return DB_PATH


# ---------------------------------------------------------------------------
# status
# ---------------------------------------------------------------------------
def cmd_status(args, rest):
    from fi_common import connect, human_bytes

    db = _db()
    print(f"{BOLD}database{RESET}  {db}")
    if not db.exists():
        print(f"  {YELLOW}not created yet{RESET} -- run: fint scan <path>")
        return

    size = db.stat().st_size
    print(f"  size        {human_bytes(size)}")

    con = connect(read_only=True)
    try:
        version = con.execute("PRAGMA user_version").fetchone()[0]
        print(f"  schema      user_version={version}")

        row = con.execute(
            "SELECT COUNT(*) n, COALESCE(SUM(size_bytes),0) b FROM files"
            " WHERE status <> 'missing'").fetchone()
        print(f"\n{BOLD}inventory{RESET}")
        print(f"  live files  {row['n']:,}")
        print(f"  total size  {human_bytes(row['b'])}")

        missing = con.execute(
            "SELECT COUNT(*) n FROM files WHERE status = 'missing'").fetchone()["n"]
        if missing:
            print(f"  missing     {missing:,}")

        hashed = con.execute(
            "SELECT COUNT(*) n FROM files WHERE blake3 IS NOT NULL").fetchone()["n"]
        pct = (hashed / row["n"] * 100) if row["n"] else 0
        colour = GREEN if pct > 95 else YELLOW
        print(f"  hashed      {hashed:,} ({colour}{pct:.0f}%{RESET})")

        secrets = con.execute(
            "SELECT COUNT(*) n FROM files WHERE contains_secrets = 1").fetchone()["n"]
        if secrets:
            print(f"  {YELLOW}secrets{RESET}     {secrets:,} files carry credential patterns")

        scan = con.execute(
            "SELECT s.*, sc.root_path, sc.scan_type FROM scan_statistics s"
            " LEFT JOIN scans sc ON sc.scan_id = s.scan_id"
            " ORDER BY s.started DESC LIMIT 1").fetchone()
        if scan:
            print(f"\n{BOLD}last scan{RESET}")
            print(f"  when        {(scan['started'] or '')[:19].replace('T', ' ')}")
            print(f"  target      {scan['root_path']}  ({scan['scan_type']} profile)")
            print(f"  duration    {scan['duration_seconds'] or 0:.1f}s")
            print(f"  new/chg/del {scan['new_files'] or 0:,} / "
                  f"{scan['changed_files'] or 0:,} / {scan['deleted_files'] or 0:,}")

        scans = con.execute("SELECT COUNT(*) n FROM scan_statistics").fetchone()["n"]
        events = con.execute("SELECT COUNT(*) n FROM file_events").fetchone()["n"]
        print(f"  scans kept  {scans:,}   audit events {events:,}")

        dup = con.execute(
            "SELECT COUNT(*) g, COALESCE(SUM(reclaimable_bytes),0) r,"
            " COALESCE(SUM(total_bytes),0) o FROM duplicate_groups").fetchone()
        print(f"\n{BOLD}duplicates{RESET}")
        if not dup["g"]:
            print(f"  {YELLOW}not analysed{RESET} -- run: fint dupes")
        else:
            print(f"  groups      {dup['g']:,}")
            print(f"  occupied    {human_bytes(dup['o'])}")
            print(f"  {GREEN}RECLAIMABLE {human_bytes(dup['r'])}{RESET}")

        lenses = con.execute("SELECT COUNT(*) n FROM lenses").fetchone()["n"]
        pending = con.execute(
            "SELECT COUNT(*) n FROM rescue_candidates WHERE decision='pending'").fetchone()["n"]
        if lenses or pending:
            print(f"\n{BOLD}engine{RESET}")
            if lenses:
                print(f"  lenses      {lenses}")
            if pending:
                print(f"  ajalugu     {pending:,} candidates awaiting review")
    finally:
        con.close()


# ---------------------------------------------------------------------------
# doctor
# ---------------------------------------------------------------------------
def cmd_doctor(args, rest):
    print(f"{BOLD}python{RESET}      {sys.version.split()[0]}  ({sys.executable})")

    import sqlite3
    print(f"{BOLD}sqlite{RESET}      {sqlite3.sqlite_version}")

    print(f"\n{BOLD}hashing{RESET}")
    try:
        import blake3  # noqa: F401
        print(f"  {GREEN}ok{RESET}    blake3 module (in-process -- fastest)")
    except ImportError:
        if shutil.which("b3sum"):
            print(f"  {YELLOW}warn{RESET}  blake3 module missing; falling back to batched b3sum")
            print(f"        {DIM}pip install blake3   # ~10x faster on a large tree{RESET}")
        else:
            print(f"  {RED}FAIL{RESET}  no blake3 module and no b3sum binary")
            print(f"        {DIM}without one of these, nothing is hashed and duplicate")
            print(f"        detection cannot work at all{RESET}")

    print(f"\n{BOLD}mime detection{RESET}")
    try:
        import magic  # noqa: F401
        print(f"  {GREEN}ok{RESET}    python-magic (in-process)")
    except ImportError:
        if shutil.which("file"):
            print(f"  {YELLOW}warn{RESET}  python-magic missing; falling back to batched file(1)")
            print(f"        {DIM}pip install python-magic{RESET}")
        else:
            print(f"  {YELLOW}warn{RESET}  no MIME detection available; extension map only")

    print(f"\n{BOLD}dashboard{RESET}")
    missing = []
    for module, label in (("fastapi", "fastapi"), ("uvicorn", "uvicorn")):
        try:
            __import__(module)
            print(f"  {GREEN}ok{RESET}    {label}")
        except ImportError:
            print(f"  {RED}FAIL{RESET}  {label} missing")
            missing.append(label)
    if missing:
        print(f"        {DIM}pip install {' '.join(missing)}{RESET}")

    print(f"\n{BOLD}layout{RESET}")
    for label, path in (("scripts", SCRIPTS), ("sql", SQL), ("api", API),
                        ("web", HERE / "web"), ("tests", TESTS)):
        mark = f"{GREEN}ok{RESET}  " if path.exists() else f"{RED}FAIL{RESET}"
        print(f"  {mark}  {label:<8} {path}")

    db = _db()
    print(f"\n{BOLD}database{RESET}")
    print(f"  path        {db}")
    print(f"  exists      {'yes' if db.exists() else 'no'}")
    if db.exists():
        free = shutil.disk_usage(db.parent).free
        from fi_common import human_bytes
        note = f"  {YELLOW}<- tight{RESET}" if free < 2 * 1024**3 else ""
        print(f"  free space  {human_bytes(free)}{note}")


# ---------------------------------------------------------------------------
# thin wrappers
# ---------------------------------------------------------------------------
def cmd_scan(args, rest):
    run_script("scan.py", [args.path, *rest])


def cmd_dupes(args, rest):
    run_script("process_duplicates.py", rest)


def cmd_report(args, rest):
    run_script("report.py", rest)


def cmd_ajalugu(args, rest):
    run_script("rescue_ajalugu.py", rest or ["--help"])


def cmd_all(args, rest):
    print(f"{BOLD}[1/3] scanning {args.path}{RESET}")
    run_script("scan.py", [args.path, *rest])
    print(f"\n{BOLD}[2/3] duplicate analysis{RESET}")
    run_script("process_duplicates.py", [])
    print(f"\n{BOLD}[3/3] report{RESET}")
    run_script("report.py", [])


def cmd_migrate(args, rest):
    from fi_common import connect, migrate
    con = connect()
    version = migrate(con)
    con.close()
    print(f"{GREEN}ok{RESET}  schema at version {version}, views rebuilt")


def cmd_test(args, rest):
    failed = []
    for name in ("test_pipeline.py", "test_lens.py", "test_api.py"):
        target = TESTS / name
        if not target.exists():
            print(f"{YELLOW}skip{RESET}  {name} not found")
            continue
        print(f"\n{BOLD}=== {name} ==={RESET}")
        if subprocess.run([sys.executable, str(target)]).returncode != 0:
            failed.append(name)
    if failed:
        die(f"failing suites: {', '.join(failed)}")
    print(f"\n{GREEN}all suites passed{RESET}")


def cmd_serve(args, rest):
    if not (API / "main.py").exists():
        die(f"missing {API / 'main.py'}")
    try:
        import uvicorn  # noqa: F401
    except ImportError:
        die("uvicorn is not installed. Run: pip install fastapi uvicorn")

    cmd = [sys.executable, "-m", "uvicorn", "main:app",
           "--host", args.host, "--port", str(args.port), *rest]

    if args.background:
        log = HERE / "reports"
        log.mkdir(parents=True, exist_ok=True)
        logfile = log / "dashboard.log"
        with open(logfile, "ab") as handle:
            process = subprocess.Popen(
                cmd, cwd=str(API), stdout=handle, stderr=subprocess.STDOUT,
                start_new_session=True)
        (HERE / "reports" / "dashboard.pid").write_text(str(process.pid))
        print(f"{GREEN}started{RESET}  pid {process.pid}")
        print(f"  url   http://{args.host}:{args.port}/")
        print(f"  log   {logfile}")
        print(f"  stop  fint stop")
        return

    print(f"dashboard on http://{args.host}:{args.port}/   (ctrl-c to stop)")
    os.chdir(API)
    os.execv(sys.executable, cmd)


def cmd_stop(args, rest):
    pidfile = HERE / "reports" / "dashboard.pid"
    if not pidfile.exists():
        die("no recorded dashboard pid (was it started with --background?)")
    pid = int(pidfile.read_text().strip())
    try:
        os.kill(pid, 15)
        print(f"{GREEN}stopped{RESET}  pid {pid}")
    except ProcessLookupError:
        print(f"{YELLOW}pid {pid} was not running{RESET}")
    pidfile.unlink(missing_ok=True)


# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(
        prog="fint", description="File INTelligence -- one entry point for the toolchain",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__.split("Every subcommand")[0].split("\n", 2)[2])
    sub = parser.add_subparsers(dest="command", metavar="<command>")

    def add(name, help_text, fn):
        p = sub.add_parser(name, help=help_text)
        p.set_defaults(fn=fn)
        return p

    add("status", "what the database currently knows", cmd_status)
    add("doctor", "check dependencies and layout", cmd_doctor)
    add("migrate", "apply schema migrations and rebuild views", cmd_migrate)

    p = add("scan", "inventory a directory tree", cmd_scan)
    p.add_argument("path")

    add("dupes", "group identical files and compute reclaimable space", cmd_dupes)
    add("report", "print the latest scan", cmd_report)
    add("ajalugu", "find and rescue content surviving only in backups", cmd_ajalugu)

    p = add("all", "scan + dupes + report", cmd_all)
    p.add_argument("path")

    p = add("serve", "start the web dashboard", cmd_serve)
    p.add_argument("--port", type=int, default=8420)
    p.add_argument("--host", default="127.0.0.1")
    p.add_argument("-b", "--background", action="store_true",
                   help="run detached and write a pidfile")

    add("stop", "stop a backgrounded dashboard", cmd_stop)
    add("test", "run the regression suites", cmd_test)

    args, rest = parser.parse_known_args()
    if not args.command:
        parser.print_help()
        sys.exit(0)
    args.fn(args, rest)


if __name__ == "__main__":
    main()
