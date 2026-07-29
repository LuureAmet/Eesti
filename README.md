# File Intelligence & OSINT Engine

A filesystem intelligence system: it inventories every file, hashes it, tracks
what changed between scans, works out what is genuinely duplicated, and lets you
build your own views over all of it without writing SQL.

Backend is Python + SQLite. Frontend is one HTML file served by a FastAPI app.
No Node, no build step, no Docker, no cloud.

```
scripts/scan.py  ──▶  files.db  ◀──  api/main.py  ──▶  web/index.html
                         ▲
      scripts/process_duplicates.py
      scripts/rescue_ajalugu.py
```

---

## Quick start

Everything runs through `fint` — one entry point, so there is nothing to
remember about which script lives where or what order things go in.

```bash
pip install fastapi uvicorn blake3 python-magic

./fint.py doctor          # is anything missing, and what does it cost me
./fint.py all ~           # scan + duplicates + report, in one go
./fint.py serve           # dashboard on http://127.0.0.1:8420/
```

| Command | Does |
|---|---|
| `fint status` | What the database currently knows |
| `fint doctor` | Dependency and layout check, with the impact of each gap |
| `fint scan PATH` | Inventory a tree (`--profile light\|fast`, `--secrets`) |
| `fint dupes` | Group identical files, compute reclaimable space |
| `fint report` | Print the latest scan (`--json` for cron) |
| `fint ajalugu` | Find and rescue content surviving only in backups |
| `fint all PATH` | scan → dupes → report |
| `fint serve` | Dashboard (`-b` to background it, `fint stop` to stop) |
| `fint backup` | Snapshot + SQL dump + schema + manifest, in one archive |
| `fint migrate` | Apply schema migrations, rebuild views |
| `fint test` | Run all three regression suites |

Unknown flags pass straight through, so `fint scan ~ --batch 2000 --dry-run`
behaves exactly as calling `scan.py` would.

The database lives at `~/file-intelligence/database/files.db` by default.
Override with `FI_DB=/path/to/files.db`.

The tests build a synthetic filesystem, scan it for real, and assert the
numbers:

```bash
./fint.py test
# test_pipeline.py  50 checks   scanner, duplicate maths, backup/restore
# test_lens.py      24 checks   query compiler, incl. hostile input
# test_api.py       38 checks   every endpoint the UI calls
```

---

## What each piece does

| Path | Role |
|---|---|
| `scripts/scan.py` | Walks a tree, hashes with BLAKE3, classifies, upserts, writes an audit event per change |
| `scripts/process_duplicates.py` | Groups by hash, picks a canonical master with an explained score, computes reclaimable bytes |
| `scripts/rescue_ajalugu.py` | Finds content surviving only inside backups and stages it into a history folder |
| `fint.py` | Unified CLI. Everything below is reachable through it |
| `scripts/report.py` | Terminal report; `--json` for cron |
| `scripts/fi_common.py` | Connection, versioned migrations, shared helpers |
| `scripts/fi_classify.py` | Extension/category/language maps, scope rules, secret patterns |
| `sql/10_views.sql` | The curated views every frontend and lens reads |
| `api/lens.py` | JSON query AST → parameterised SQL. The only module that writes SQL |
| `api/main.py` | Read-only REST API + saved lenses, rules, reports |
| `web/index.html` | The dashboard. One file, no dependencies |

---

## The four things this does that a file lister does not

**1. It remembers.** `file_events` is append-only. Every creation, modification
and disappearance is a row, so you can ask "what happened to this file over the
last month", not just "what does it look like now".

**2. It tells you the truth about duplicates.** Reclaimable space is
`(distinct_inodes - 1) × size` — the master is never counted, and hardlinked
copies are collapsed because deleting one frees nothing.

**3. It explains its own decisions.** When it picks a master copy, it stores
*why* (`+40 user scope; +25 inside a project; -12 depth 12`). No unexplained
verdicts.

**4. It lets you build the view you actually wanted.** See below.

---

## Lenses: build your own views

The dashboard is not four fixed screens. A **Lens** is a saved query —
source + logic + output shape — that becomes a button in the sidebar.

You pick a source (`v_live_files`, `v_recent_changes`, `v_duplicate_leaderboard`,
…), stack conditions, optionally group and aggregate, and save it. The compiled
SQL is always shown, so nothing is hidden from you.

A lens saved as a **rule** carries a tag instead of returning rows: every file
it matches gets labelled in `file_tags`, and re-applying the rule after each
scan keeps the labels current. That is how "the logic and reasons I want to
apply and find" becomes durable state rather than a query you retype.

Lenses stack into **reports**: an ordered list of blocks, each backed by a lens,
rendered as JSON or Markdown.

The important detail: the UI and any LLM emit a **JSON AST**, never SQL.
`api/lens.py` compiles it against a source registry and a live column check,
binds every value as a parameter, and clamps the row limit. A malformed or
malicious spec produces a `400`, not a dropped table. `tests/test_lens.py`
fires twelve injection attempts at it; all twelve are refused.

See [`docs/03-LENS-ENGINE.md`](docs/03-LENS-ENGINE.md).

---

## Ajalugu — the history book

Agents and people delete things. Some of what was deleted was junk; some of it
was the record of what was being attempted and why. Once the live tree loses it,
the only copy is inside a backup nobody will open again.

`rescue_ajalugu.py` finds files whose **content** exists nowhere in user scope
any more (hash-based, so a rename does not fool it), scores how likely each is
to be worth reading, and stages the interesting ones into a history folder —
mirroring their original paths so the context of where a file used to live
survives with it.

It only ever copies. It never deletes from a backup and never moves anything.

```bash
python3 scripts/rescue_ajalugu.py --scan
python3 scripts/rescue_ajalugu.py --list --min-score 60 -v
python3 scripts/rescue_ajalugu.py --auto-accept 70
python3 scripts/rescue_ajalugu.py --extract ~/ajalugu --dry-run
```

See [`docs/04-AJALUGU.md`](docs/04-AJALUGU.md).

---

## Safety posture

- The API opens the inventory **read-only** (`mode=ro` + `PRAGMA query_only`).
  It cannot modify the file index, only its own tables (lenses, reports, rescue
  decisions).
- Nothing here deletes a file. Cleanup is **emitted as a shell script** for a
  human to read. That script is dry-run by default, re-checks each file's
  BLAKE3 before removing it (so anything that changed since the scan is skipped
  rather than destroyed), and never lists a master copy.
- Secret detection records **that** a file contains a credential and of what
  kind. It never stores the credential itself.
- Every lens runs under a VM-step budget, so a runaway query returns an error
  instead of hanging the dashboard.

---

## Documentation

| Doc | Contents |
|---|---|
| [`docs/05-INSTALL.md`](docs/05-INSTALL.md) | Installing on a real machine, and the gotchas hit doing it |
| [`docs/00-AUDIT.md`](docs/00-AUDIT.md) | What was wrong with v2, with reproductions |
| [`docs/01-ROADMAP.md`](docs/01-ROADMAP.md) | Staged plan, and what to *not* build yet |
| [`docs/02-DATA-CONTRACT.md`](docs/02-DATA-CONTRACT.md) | Schema and views the frontend may rely on |
| [`docs/03-LENS-ENGINE.md`](docs/03-LENS-ENGINE.md) | Query AST reference |
| [`docs/04-AJALUGU.md`](docs/04-AJALUGU.md) | History rescue design |
