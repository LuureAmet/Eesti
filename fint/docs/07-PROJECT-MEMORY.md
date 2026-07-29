# Project memory

Context an agent cannot recover by reading the code: why this exists, what was
tried, which decisions are settled and on what grounds, and what is still open.

Read [`CLAUDE.md`](../CLAUDE.md) first for how to operate the repository. This
file is for when you need to make a *judgement*.

---

## 1. The vision, in one paragraph

A machine accumulates files faster than anyone can account for them, and once
several AI agents are also writing to it, nobody can answer "what happened
here, and when". This system is the answer to that: an inventory that
**remembers**. Not a file lister — a record of what existed, what changed, what
disappeared, what is genuinely wasted space, and what survives only inside a
backup nobody will ever open. On top of it sits a query engine the owner can
compose himself, so the questions do not have to be anticipated in advance.

The longer-horizon ambition is accountability: when several agents operate on
one filesystem, an immutable record of what changed and when is the only thing
that makes the question "who broke this" answerable at all. See §6 for how far
that can honestly go.

---

## 2. Where this came from

The owner had a working v2 scanner (~282k files indexed, 461 MB database) and
asked for a dashboard on top. Auditing the v2 scripts first turned up nine
defects, several of which invalidated its headline numbers:

- `new_files` was **permanently zero** — `first_seen` was written as a timestamp
  and counted against a UUID. Every scan ever run reported zero new files.
- Duplicate "waste" summed *every* copy in a group. You can never reclaim the
  master, so the real figure is `(copies − 1) × size` — and lower again once
  hardlinks are excluded, since deleting one hardlink frees nothing.
- **Ten tables were created and never written**, including `file_events`. The
  audit trail the whole accountability idea depended on **did not exist**; the
  only history was one prior hash per file.
- `sudo scan.py /` — the command the owner had been told to run — would have
  permanently broken subtree scanning by rewriting `top_directory='/'` on every
  row.

The full audit with reproductions is in [`00-AUDIT.md`](00-AUDIT.md). The
**data model was sound**, which is why v3 kept the schema and replaced the code.

**Tone note:** the owner had been given confident, wrong advice by other
assistants — including praise for the `try/except: pass` migration pattern and
a roadmap to Postgres/Neo4j/vector DBs at 282k files. He responds well to being
shown a reproduction rather than an assertion. When something is wrong, prove
it with a runnable case.

---

## 3. Decisions that are settled, and why

| Decision | Reason | Do not undo unless |
|---|---|---|
| SQLite, not Postgres | 282k rows, single writer, local. Postgres buys latency and an ops burden and returns nothing | >5M rows, or concurrent writers, or network access from several machines |
| No Neo4j | Every "graph" query described is a join or a recursive CTE over tables that already exist | Traversals genuinely exceed ~4 hops |
| JSON AST, not SQL strings | The UI *and an LLM* compose queries. The compiler is the security boundary; 12 injection attempts are asserted refused | Never |
| Emit cleanup scripts, never delete | The system exists because automated deletion went wrong. It must not be able to repeat that | Never |
| Copy-only rescue | Same reason. A backup is the last copy by definition | Never |
| Online backup API, not `cp` | `cp` can catch a torn WAL state; `VACUUM INTO` needs write access to the live database | Never |
| Views live in `sql/10_views.sql`, applied on every `migrate()` | They are schema, not an optional extra — the rescue tool and every lens name them directly | Never |
| Secret detection stores the *kind*, never the value | The whole point is being able to publish "this file has 2 API keys" without leaking them | Never |
| Missing-sweep keys on visited directories | Anything coarser either breaks subtree independence or fakes deletions when the profile changes | Never |

---

## 4. State of the machine (as of 2026-07-28)

Ubuntu 24.04, `margus@ubuntu`, 232 GB disk. Facts worth carrying forward:

- **The disk fills.** It was at 98% before this work and hit **100%** during it.
  A `fint dupes` run died from `ENOSPC` partway through. The database survived
  (`quick_check: ok`) but was left half-populated — `duplicate_groups` written,
  `duplicate_members` empty. Re-running `fint dupes` is self-healing.
- **Space is mostly outside `/home/margus`:** `/var/lib/docker` 32 GB,
  `/var/lib/containerd` 23 GB, `/var/log` 11 GB. `/home/margus` is 146 GB, of
  which `backups/` is 60.6 GB.
- **Something is still writing a 275 MB binary every few hours** into
  `backups/masterbackup/.npm-global/lib/node_modules/@anthropic-ai/claude-code/node_modules/@anthropic-ai/claude-code-linux-x64/`.
  Six files at byte-identical size `275,012,592`, plus three zero-byte ones with
  mode 700 (failed writes). Newest timestamps landed *during* the investigation.
  **This is the actual root cause of the full disk** and it has not been found
  or stopped. Finding it comes before any further archaeology.
- **Two Pythons:** the agent shell sits in `mcp-lab/.venv` (3.11), the login
  shell uses `/usr/bin/python3` (3.12). The project has its own
  `~/file-intelligence/.venv` and `./fint` pins it.
- PEP 668 blocks `pip install` on the system interpreter. Do not reach for
  `--break-system-packages`; use the project venv.

### Verified results of the first v3 run

```
scan /home/margus --profile light --secrets
  100,857 files / 67.6 GB    new 2,595 · changed 141 · missing 23 · errors 0
  713 s total, of which only 157 s hashing
migrate: user_version 0 → 3 in 1.9 s
tests on the real machine: 100/100 pass
```

`new: 2,595` is the v2 counter bug fixed, demonstrated on real data.

---

## 5. What is done and what is next

**Done and tested:** the scanner, duplicate analysis, lens engine, read-only
API, dashboard, ajalugu rescue, backup/restore, `fint` CLI. Roughly 100 checks.

**Immediately next** (blocked on disk space):
1. Find and stop the 275 MB writer.
2. `./fint backup` before anything else.
3. `./fint dupes` — the first honest reclaimable figure for this machine.
4. `./fint scan ~/backups --profile full` — the light profile skipped
   `node_modules`, which is exactly where the waste lives.
5. `./fint serve -b`.

**Designed, not built:** text extraction + FTS5 in a *separate* database file
(§`01-ROADMAP.md` stage 4 — putting extracted text in `files.db` would slow
every metadata query), agent attribution, a public redacted portal.

---

## 6. The accountability question — and its honest limit

The owner wants to reconstruct how the disk filled and which agent was
responsible. This deserves a straight answer, because it is the one place where
the temptation to over-claim is strongest.

**The evidence supports:** what changed, when, what bytes are identical to
what, what survives only in backups, how much space a pattern wastes.

**The evidence cannot support:** which *process* wrote a file (the filesystem
does not record it), which *agent* decided to (that needs the agent's own logs,
which the agent wrote — the suspect's own alibi), or who consumed an API credit
balance (not a filesystem fact at all; only the provider's usage dashboard
knows).

A model asked "who did this", against evidence that cannot identify an actor,
will not answer "the evidence is silent" — it will name someone. That is the
same class of failure being investigated. Hence the framing in
[`06-INCIDENT-BRIEFS.md`](06-INCIDENT-BRIEFS.md): **reconstruction, not trial**,
and every task brief carries a mandatory `cannot_tell` field.

And the finding no investigation will produce, because it is structural rather
than anyone's act: **nothing was watching.** No disk monitoring, no duplicate
detection, no change log. "Why did no agent notice the disk filling" presumes a
system that did not exist. That missing system is what this project is.

---

## 7. Working with this owner

Observations that make collaboration go better:

- He writes in Estonian and English mixed. Either is fine; match him.
- He asks **"can you verify this with 100% certainty?"** and means it. Do not
  soften. If you cannot check something right now, say that plainly and give
  him the command to check it himself — he will run it and report back.
- **Absence of an index entry is not absence of a file.** He was once told a
  directory did not exist when the truth was that `--profile light` had skipped
  it. Distinguish "not indexed" from "not present" every single time.
- He values being shown the working, not just the conclusion — reproductions,
  compiled SQL, the reasoning behind a master-copy choice.
- He is running on a nearly-full disk with agents he does not fully control.
  **Never delete anything on his machine without asking**, even when it is
  obviously junk, and even when he has said "clean up" in general terms.
- If you got something wrong, correct it in one sentence and move on. He
  noticed, for example, that a "just flip the toggle" diagnosis was wrong when
  his screenshot showed the toggle already on — and that an ngrok command
  suggested to him required a paid plan.

---

## 8. Open questions

1. **What writes the 275 MB binaries?** Unanswered. Highest priority.
2. **Where is the real duplicate waste?** The v2 figure (85.6 GB) was gross, not
   reclaimable. The honest number needs `fint dupes` on a full backup scan.
3. **What happened to the "hermes" agent**, and were agent names in `ai-mailbox`
   ever mis-assigned?
4. **Did an agent delete more than it should have?** `v_backup_only` can list
   content that exists only in backups — that is the closest available proxy.
5. **How should the machine be exposed for remote MCP access?** ngrok free
   rotates its URL on restart, which silently breaks the connector while it
   still reports `connected: true`. Alternatives worth evaluating: Tailscale
   Funnel, Cloudflare Tunnel, or — if the host has a public IP, which the
   `/dev/vda1` + Docker + Grafana profile suggests — Caddy with automatic
   Let's Encrypt certificates and no third party in the path at all.
