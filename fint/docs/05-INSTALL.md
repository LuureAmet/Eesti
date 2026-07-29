# Installing on a real machine

Written from an actual deployment onto Ubuntu 24.04 with an existing v2
database. Every gotcha below is one that was hit for real, not anticipated.

---

## Layout

The tool expects to sit at the root of its own directory:

```
~/file-intelligence/
├── fint                  launcher (pins the interpreter)
├── fint.py               the CLI
├── .venv/                project virtualenv
├── scripts/              scanner, duplicates, report, ajalugu, shared modules
├── sql/10_views.sql      curated views
├── api/                  FastAPI + lens engine
├── web/index.html        dashboard
├── tests/                regression suites
├── database/files.db     the inventory
└── reports/              error logs, dashboard log, pidfile
```

`FI_DB` overrides the database path; `FI_REPORTS` overrides the reports
directory. Both are useful for testing against a copy.

---

## Install

```bash
cd ~
git clone --branch <branch> https://github.com/LuureAmet/Eesti.git eesti-v3

# the project lives in the repo's fint/ subfolder (Eesti is a monorepo)
FI=~/file-intelligence
mkdir -p $FI/reports
cp -r ~/eesti-v3/fint/. $FI/
chmod +x $FI/fint $FI/fint.py

cd $FI
/usr/bin/python3 -m venv .venv
./.venv/bin/pip install -r requirements-dev.txt
./fint doctor
```

---

## Gotcha 1: which python actually runs this

**This is the one that will waste your afternoon.**

On a machine with agents, the shell an agent runs commands in may already be
inside a virtualenv, while your own login shell uses the system python:

```
agent's shell : /home/margus/mcp-lab/.venv/bin/python3   (3.11)
your shell    : /usr/bin/python3                          (3.12)
```

Install the dependencies once and they land in exactly one of those. The tool
then works perfectly for whoever installed them and reports "fastapi missing"
for the other, which reads like a broken install rather than two interpreters.

The `fint` launcher resolves this by pinning the interpreter, in order:

1. `$FINT_PYTHON` if set,
2. `./.venv/bin/python3` next to the launcher,
3. `python3` from `PATH`.

**Always invoke `./fint`, not `python3 fint.py`.** The `.py` still works, but
only the launcher guarantees everyone lands on the same interpreter.

---

## Gotcha 2: PEP 668

Ubuntu 24.04 marks the system python as externally managed, so a plain
`pip install` fails with:

> error: externally-managed-environment

Do **not** reach for `--break-system-packages`. Make the project venv instead —
that is what the launcher looks for, and it keeps this tool's dependencies away
from anything apt manages.

Note also that `pip install ... | tail -3` swallows pip's exit status: in a
pipeline, `$?` is the last command's. A `cmd | tail || fallback` never runs the
fallback.

---

## Gotcha 3: the test client is a separate dependency

`tests/test_api.py` drives the API through starlette's `TestClient`, which
needs an HTTP client library that fastapi does not itself pull in. It is in
`requirements-dev.txt`, not `requirements.txt`. Without it the suite exits 77
(skipped, not failed) and `fint test` reports it as a skip.

```bash
./.venv/bin/pip install -r requirements-dev.txt
```

---

## Migrating an existing v2 database

v3 is additive — no v2 column is dropped or rewritten.

```bash
cp ~/file-intelligence/database/files.db ~/file-intelligence/database/files.db.v2-backup
cd ~/file-intelligence && ./fint migrate
```

On a 461 MB / 282k-row database this takes **about two seconds** — SQLite's
`ALTER TABLE ADD COLUMN` is a metadata-only operation, so the size of the table
does not matter.

Then:

```bash
./fint scan ~ --profile light --secrets
./fint dupes            # required: hardlink collapsing needs the inode data
                        # that only a v3 scan records
./fint report
```

Two things to expect on the **first** v3 scan:

- `new_files` will be near zero, correctly — nothing is new, the rows already
  existed. It becomes meaningful from the second scan on.
- Until `fint dupes` re-runs, duplicate figures still reflect v2's arithmetic.

---

## Running a long scan

A full-tree scan runs for many minutes. Detach it:

```bash
nohup ./fint scan /home/margus --profile light --secrets > reports/scan.log 2>&1 &
tail -f reports/scan.log
```

The scanner line-buffers its output, so the log fills in as it goes rather than
staying empty until the process exits.

To check on a scan that has no visible output yet:

```bash
PID=$(pgrep -f "scan.py /home")
ps -o etime=,time= -p $PID          # elapsed vs CPU time
grep -E 'read_bytes|write_bytes' /proc/$PID/io
```

Progress carries `\r`, so pipe through `tr '\r' '\n'` when reading the log with
`tail`.

---

## Disk space

Check before a full scan:

```bash
df -h /home
```

The database itself is modest — 282k files produced 471 MB, with a WAL that
stays around 36 MB during a scan. Budget roughly **2 GB free** and you have
ample headroom.

If the machine is already at 99%, note that the scanner is a *reader*: it will
tell you what is consuming the disk (`fint report`, the treemap, the duplicate
leaderboard) without needing much space to do it.

---

## Running the dashboard

```bash
./fint serve                 # foreground, ctrl-c to stop
./fint serve -b              # background; writes reports/dashboard.pid
./fint stop                  # stop the backgrounded one
```

It binds `127.0.0.1` by default — local only. To reach it from another machine,
prefer an SSH tunnel over binding `0.0.0.0`:

```bash
ssh -N -L 8420:127.0.0.1:8420 margus@server
```

There is **no authentication on the API**. It exposes full paths, project
names and which files carry credentials. Do not bind it to a public interface.
