# Full review — ai-mailbox + server plans (2026-07-20)

Reviewed live on the server (`ubuntu`, user `margus`) via MCP. Covers `~/ai-mailbox/`
contents and state, the sync/courier machinery, the message DB, and the plan
documents across `~/ai-stack/docs/`, `~/ai-mailbox/system/`, and related folders.

---

## 1. What ai-mailbox is (as found)

aiMaiL is a file-first, multi-agent mail layer between several AI agents
(opencode, hy3-free, fable5, nemotron-3-ultra, mimo, opencode-bigpickle,
deepseek-r1, local-qwen, external-ai) and the human coordinator (margus).

- **Files** are primary: `inbox/<agent>/<date>_<from>_kirjutas_<to>_teemaks_[topic]_<desc>.md`
- **DB + API** (`core-api` :8090, Postgres via Docker) are a convenience layer
- **Sync**: `system/tools/aimail-sync.sh` (cron every 5 min) pushes files → DB and pulls DB → files
- **Courier**: `~/scripts/aimail-courier.py` (cron every 5 min, switch `system/courier.on`)
  answers mail addressed to LiteLLM models automatically
- **Protocol**: `system/PROTOCOL.md` (235 lines) — header-only envelopes, simple/advanced
  modes, perspectives, append-only, human is final coordinator

Inbox state today: ~56 real messages across 15 folders; most active are
`fable5/` (18), `opencode/` (9), `nemotron-3-ultra/` (9), `hy3-free/` (5).

## 2. Critical finding: sync is silently dead (again)

`aimail-sync.sh` was fixed at 01:55 today (heredoc rewrite, good commit comment),
**but the fix introduced a new fatal bug**:

```bash
DB_HASHES="$(curl -s ... | python3 <<'PYEOF'
...
PYEOF
)"
```

The heredoc redirects python3's **stdin to the heredoc**, so the pipe from curl
has no reader. curl exits 23 (write error), and with `set -euo pipefail` the whole
script dies **instantly and silently** — zero output. Verified by running it:
exit code 23 in 0.07 s. The same broken `pipe | python3 <<heredoc` pattern occurs
twice (DB_HASHES and the dup check).

Consequences:
- `sync.log` frozen since **01:45** (cron runs every 5 min but appends nothing)
- No PUSH (new inbox files never reach the DB) and no PULL since 01:55
- This is the *third* generation of sync breakage (quote bug → month of
  IndentationError → this)

**Fix** (minimal): feed curl output through a temp file or process substitution,
keep the heredoc as the program, e.g.:

```bash
tmp=$(mktemp); curl -s -m 5 "$URL" > "$tmp"
DB_HASHES="$(TMPF=$tmp python3 <<'PYEOF'
import json,os
...json.load(open(os.environ['TMPF']))...
PYEOF
)"
```

**Or** — per fable5's own broadcast today ("otsefaili protokoll": file = message,
no sync needed) — disable the sync cron entirely and treat the DB as archive only.
That is the simpler, more honest option given the file-first decision is already
agreed with opencode.

## 3. Data quality

### sync-pool: 6.5 MB of mostly garbage
`sync-pool/` holds **1,560 files**; the vast majority are recursively re-wrapped
envelopes (`From: db_<uuid> To: BROADCAST` wrapping another `db_<uuid>` wrapping
the real message). Product of the earlier PUSH↔PULL feedback loop.

### DB: 91% corrupt
API returns **11,819 messages**: `corrupt` 10,738 (mass-marked, correctly excluded
from PULL), `new` 1,030, `seen` 49, `answered` 2. The garbage loop is stopped
(the `db_*` filename guard in PUSH + `corrupt` filter in PULL are both in place),
but the rows and pool files remain as dead weight.

**Recommendation:** archive-and-delete `sync-pool/*` (keep a tar in `~/backups/`),
and `DELETE FROM ... WHERE status='corrupt'` (or move to an archive table). Also
note ~1,030 "new" rows likely contain further unmarked wrapper duplicates
(180 rows each addressed to a `db_<uuid>` recipient).

### Structure drift
- `readme.txt` declares a locked root schema ("exactly 3 dirs + 2 files:
  inbox/system/sandbox + readme + index.html"). Actual root also contains
  `sync-pool/`, `sync.log`, `ideas/`, `TODO_aimail_ui.md`, `LEHED_OVERVIEW.md`,
  and **no `sandbox/`**. Either restore the invariant or update the readme —
  a "locked" schema that isn't true misleads every new agent that boots from it.
- Misparse artifacts: empty folders `inbox/fable5le/`, `inbox/00-hello-how-to-find-fable-mail/`,
  plus duplicate `inbox/BROADCAST/` vs `inbox/broadcast/` (alias map lowercases,
  files land in both). Pick one canonical casing.
- `system/MASTER_INDEX.md` is **empty (0 lines)**.
- Dangling symlink: `~/scripts/aimail-sync.sh → ~/ai-mailbox/tools/…` (tools moved
  to `system/tools/`; other `~/scripts/aimail-*.sh` links worth re-checking too).

## 4. Courier

Design is sound (LiteLLM-only recipients, `courier.on` switch, max_tokens 500 cost
guard, never claude-*). Log shows it working for `deepseek-r1` (2 answered) but
`local-qwen` fails: HTTP 500s and timeouts (no GPU; 420 s timeout still not enough
or Ollama-side error). Either fix local-qwen in LiteLLM/Ollama or drop it from
`MODELS` so mail to it doesn't silently rot.

## 5. Plans on the server — inventory & assessment

| Plan | Where | State |
|---|---|---|
| PLAAN.md — main roadmap (phases A–C) | ai-stack/docs | Good, current. Phase A (fill 15 portal stubs, cheap models) is the declared next step |
| PLAAN-aimail-2026-07-19.md | ai-stack/docs | **DRAFT, still awaiting margus's approval** — but much of it was already built (protocol, API, perspectives). Should be marked approved/superseded |
| HARDENING_TODO.md | ai-stack/docs | Deliberate deferral, well-reasoned. **Ollama :11434 is public with no auth** — this one is worth doing before the rest |
| TODO_aimail_ui.md | ai-mailbox | Excellent handoff doc (webform v10 state, next steps: per-AI agent creation, SSE push, versioning) |
| ylevaade-2026-07-19.md | ai-mailbox/system | Best single overview; 5-point todo list still accurate |
| solutions/*.md (4 packages) | ai-mailbox/system | Good "load-a-brain" packages; aimail-core.md still claims sync keeps folders↔DB equal — false today (see §2) |
| suurkurk audit (opencode-bigpickle) | ai-mailbox/ideas | Concrete and actionable: 5 portal bugs (room.js hardcoded 'varav' is a 5-min high-prio fix), 3 portals missing files, build order proposal |
| AI_VAJADUSED.md | ai-mailbox/system | Partly stale ("sync not in cron yet" — it is) |

### Cross-cutting observations
1. **Plans agree with each other** — rare and good. File-first, cheap-builds/expensive-reviews,
   append-only, human-as-coordinator recur consistently everywhere.
2. **Docs lag reality by ~1 day** in several places (AI_VAJADUSED, aimail-core solution,
   DRAFT plan). With this many agents writing, a single "current truth" file
   (ylevaade pattern, dated, regenerated) beats patching many.
3. **Security is the biggest open item on any plan**: 5 services on 0.0.0.0
   (Ollama with zero auth), sshd `PermitRootLogin yes`, backups partly manual —
   all known and written down in HARDENING_TODO.md, none done. The system's own
   Principle #6: "a backup that isn't automated isn't a backup."

## 6. Prioritized recommendations

1. **Decide sync's fate** (fix the heredoc/pipe bug ~10 min, or remove the cron
   and go pure file-first per the broadcast). Current state — cron firing a
   silently-dead script every 5 min — is the worst of both.
2. **Clean the corpse**: tar+delete `sync-pool/` garbage, purge `corrupt` DB rows,
   remove `inbox/fable5le/`, unify `BROADCAST/broadcast`, fix/remove dangling
   `~/scripts` symlinks, fill or delete empty `MASTER_INDEX.md`.
3. **Ollama off the public internet** (127.0.0.1 rebind + nginx) — 1 h, highest
   risk-per-effort on the whole server.
4. **room.js `'varav'` hardcode fix** — 5 min, unblocks correct identity on all portals.
5. **Update readme.txt root schema** to match reality (or restore reality to match it).
6. **Mark PLAAN-aimail DRAFT as approved/superseded** so agents stop treating it as pending.
7. Fix or delist `local-qwen` from the courier.
