# Incident reconstruction — briefs for other models

A working set of task briefs for handing to other models on the machine.

Read the first section before writing any of them. It is the difference between
an investigation that produces findings and one that produces confident fiction.

---

## Why "reconstruction" and not "trial"

A trial produces verdicts. The evidence available here does not support verdicts,
and framing the task as a trial is an instruction to produce them anyway.

**What the filesystem evidence genuinely proves:**

| Question | Answerable? | From |
|---|---|---|
| What changed, and exactly when | **Yes** | `file_events`, `mtime`, `first_seen` |
| Which bytes are identical to which | **Yes** | BLAKE3 + `duplicate_groups` |
| What survived only in backups | **Yes** | `v_backup_only` |
| How much space a pattern wastes | **Yes** | `reclaimable_bytes` |
| Which *process* wrote a file | **No** | the filesystem does not record it |
| Which *agent* decided to write it | **No** | requires that agent's own logs |
| Who consumed an API credit balance | **No** | not a filesystem fact at all |

The last three matter most, because they are the ones the "trial" framing most
wants answered. A model asked "who did this" against evidence that cannot
identify an actor will not answer "the evidence cannot say" — it will name
someone. That is exactly the failure mode under investigation.

**Two specific cautions:**

1. **Agent logs are self-reported.** An agent's journal is written by the agent.
   It is evidence of what the agent *recorded*, not of what it *did*. Where a
   log and a `file_events` row disagree, the filesystem is the harder evidence —
   it was written by the kernel, not by a participant.

2. **API credit consumption is not visible from here.** No scan, no log on this
   machine, can establish who spent a Fable balance. That is account-level
   billing data and lives only in the provider's usage dashboard. Any model that
   claims to have determined it from filesystem evidence is fabricating. Say so
   in the brief.

**And the honest finding that no investigation will produce**, because it is
structural rather than anyone's act: nothing was watching. There was no disk
monitoring, no duplicate detection, no change log. Asking "why did no agent
notice the disk filling" presumes a monitoring system that did not exist. The
answer is not negligence by an individual agent — it is a missing system. That
system is what was just built.

---

## Do this before the archaeology

**Something is still writing a 275 MB binary every few hours.**

```
claude.v217   Jul 28 13:48   275,012,592
claude.v4     Jul 28 17:48   275,012,592
```

Six files at byte-identical size in one directory; the newest timestamps are
from during the investigation itself. The disk went from 4.8 GB free to 166 MB
while a scan was running, and the scan's own footprint was ~60 MB.

Reconstructing how the disk filled is worth doing. Doing it while the disk is
*still filling* is not. Find and stop the writer first:

```bash
crontab -l 2>/dev/null | grep -iE 'claude|npm|backup'
systemctl list-timers --all | grep -iE 'claude|backup|npm'
ls -la ~/.config/systemd/user/ 2>/dev/null
sudo lsof +D ~/backups/masterbackup/.npm-global 2>/dev/null | head
find ~/backups -name 'claude.v*' -size +100M 2>/dev/null | wc -l
```

---

## How to write a brief a small model can actually complete

The plan as originally drafted is eight investigations in one message. Handed to
a small or free model, it will produce a confident summary of none of them —
too many goals, no stated output format, no way to be wrong.

Split it. Each brief gets **one question, the exact command, the shape of the
answer, and explicit permission to fail**:

```markdown
## TASK: <one sentence, one question>

RUN EXACTLY THIS:
    <command>

ANSWER ONLY THESE FIELDS:
    finding:     <one sentence>
    evidence:    <paste the output lines that support it>
    confidence:  high | medium | low
    cannot_tell: <what this data does NOT show>

RULES
- If the command returns nothing, the answer is "no evidence found".
  That is a complete and acceptable answer.
- Do not name an actor unless a log line names it. "An agent did X" is only
  allowed if you can paste the line containing the agent's name.
- Do not delete, move, or modify anything. Read only.

WRITE THE ANSWER TO: ai-mailbox/common/findings/<task-id>-<yourmodel>.md
```

The `cannot_tell` field carries most of the value. It gives a model a
non-embarrassing place to put uncertainty, which is the single most effective
way to stop it inventing an answer.

---

## The briefs

### T1 — Which binaries are byte-identical?

```bash
cd ~/backups/masterbackup/.npm-global/lib/node_modules/@anthropic-ai/claude-code/node_modules/@anthropic-ai/claude-code-linux-x64/
b3sum claude claude.v* 2>/dev/null | sort
```
Answer: how many distinct hashes, how many files share the most common hash,
and how many bytes are reclaimable (`(copies − 1) × size`).
Cannot tell: who created them.

### T2 — Is the pattern elsewhere too?

```bash
cd ~/file-intelligence && ./fint scan ~/backups --profile full && ./fint dupes && ./fint report
```
Answer: total `reclaimable_bytes`, and the top 10 groups by reclaimable space.
Note: this is the whole-disk version of T1. Requires free disk space first.

### T3 — Build the chronology

```bash
find ~/backups ~/.npm-global -name 'claude*' -printf '%T@ %TY-%Tm-%Td %TH:%TM  %10s  %p\n' 2>/dev/null | sort -n
```
Answer: a table of timestamp → size → path, plus the interval between
creations. State whether the interval is regular (a timer) or irregular (a
triggered action).
Cannot tell: what triggered them.

### T4 — What is scheduled on this machine?

Commands as in "Do this before the archaeology" above.
Answer: every cron entry, systemd timer and user unit that mentions claude,
npm, backup or rsync — pasted verbatim, not summarised.

### T5 — What did the file index record during the window?

```bash
cd ~/file-intelligence
./fint status
sqlite3 database/files.db "SELECT timestamp, event, path FROM file_events
  WHERE path LIKE '%claude%' ORDER BY timestamp DESC LIMIT 50;"
```
Answer: what the append-only log shows for those paths.
Cannot tell: anything before the first v3 scan — the log starts then. Earlier
history was never recorded, and its absence is not evidence of absence.

### T6 — Agent inventory, from logs

Read each agent's own logs under `~/ai-mailbox/logs/`.
Answer: for each agent name found — first seen, last seen, and what it recorded
doing.
**Mandatory caveat in the answer:** these logs are self-reported. Where a log
conflicts with `file_events`, prefer `file_events` and say so.

### T7 — Does the mailbox protocol actually work?

Have each model describe, in its own words, how it receives a message: via CLI,
via tmux, via the web front end, via another agent, via a hand-written file.
Answer: one section per model, its own understanding, unedited.
Purpose: this is not an investigation — the disagreements *between* the
descriptions are the finding.

**Not a brief: who spent the Fable credits.** No task on this machine can
answer it. Check the provider's usage dashboard. Any model that offers an
answer from local evidence is guessing.

---

## The one process change worth keeping

From the original plan, point 6 — routing deletions through other models for
approval before acting — is the idea worth implementing, and it is cheap:

- A delete proposal is a file: what, why, how many bytes, and the reversal plan.
- Other models reply approve / reject / need-more-info **with a reason**.
- Nothing is deleted until every reply is in.

It is slow and costs tokens, which is the objection. But note what the tooling
already does in this spirit: `fint` never deletes anything. Cleanup is emitted
as a **script for a human to read**, dry-run by default, re-verifying each
file's BLAKE3 before removal and never listing a master copy. The approval loop
is the same principle applied to agents rather than to a script.

The immutable "safe haven" folder is the other idea worth building: a Drive
location where agents can write but not delete. Recovery plans, the incident
record, and the irreplaceable parts of the history belong there — irreplaceable
meaning `file_events` and `first_seen`, since paths, sizes and hashes can all be
regenerated by rescanning, and history cannot.
