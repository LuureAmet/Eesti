# Ajalugu — rescuing history from backups

*Ajalugu* — history.

## The problem

Agents and people delete things. Some of what was deleted was junk. Some of it
was the record of what was being attempted and why: conversation logs, plans,
notes, half-finished designs, the artefacts of an approach that got abandoned.

Once the live tree loses those, the only surviving copy sits inside a backup
archive nobody will ever open. Not because it is worthless, but because nobody
knows what is in there and 500 GB is too much to browse.

This tool makes that browsable, ranked by likely interest.

## What it does not do

It **only copies**. It never deletes from a backup, never moves anything, and
never overwrites an existing file at the destination. If it fails halfway
through, the backup is untouched and you re-run it.

---

## How "only in the backup" is determined

Not by filename, and not by path. By **content hash**:

```sql
-- v_backup_only, simplified
SELECT * FROM files b
WHERE b.system_scope = 'backup'
  AND b.blake3 IS NOT NULL
  AND NOT EXISTS (
        SELECT 1 FROM files live
        WHERE live.blake3 = b.blake3
          AND live.system_scope = 'user'
          AND live.status <> 'missing')
```

This matters. A file that was renamed, or moved to a different project, has the
same bytes and is correctly **not** flagged — you have not lost it. Only content
that exists nowhere in user scope any more is a candidate.

`tests/test_pipeline.py` asserts both directions: a backup-only file is found,
and a backup copy whose original still exists live is excluded.

Two known limits, stated plainly:

- Files inside `.tar.zst` and `.zip` archives are opaque. The scanner sees the
  archive, not its contents. To rescue from inside archives you must extract
  them somewhere first and scan that. Given your `master_backup_2026-07-23/*.tar.zst`
  files, **this is the common case** — see the workflow below.
- Files with no hash (symlinks, empty files, and anything scanned under
  `--profile fast`) are excluded, because content identity cannot be established.

---

## Interestingness scoring

`v_backup_only` on a real machine returns a great deal of dependency noise. The
score separates "someone wrote this" from "a package manager put this here".

| Signal | Weight |
|---|---|
| Category: document / code / script / log | +35 / +30 / +25 / +20 |
| Category: binary / package / model / video | −35 / −35 / −40 / −25 |
| Filename matches `readme, notes, plan, design, spec, journal, conversation, chat, prompt, instruction, memo, idea, draft, architecture, decision, postmortem, changelog, ajalugu, history…` | +25 |
| Path is a dependency or build artefact (`node_modules`, `site-packages`, `.git/objects`, `vendor`, `.min.js`…) | −45 |
| Human-sized text (200 B – 2 MB) | +15 |
| Nearly empty (<200 B) | −15 |
| Belonged to a recognised project | +10 |
| Recognised source language | +8 |
| Archived more than 5 times (routine infrastructure, not a unique thought) | −15 |

Clamped to 0–100. **Every score is stored with its reason string**, so the
review queue shows *why* something surfaced rather than an unexplained number.

The weights are in `score_candidate()` in `scripts/rescue_ajalugu.py` and are
meant to be edited. If your logs matter more than your code, raise `log`.

---

## Workflow

```bash
# 1. build the queue (needs a scan that covered your backup tree, with hashing)
python3 scripts/rescue_ajalugu.py --scan

# 2. look at what it found, highest score first, with reasons
python3 scripts/rescue_ajalugu.py --list --min-score 60 -v

# 3. accept in bulk, or review individually in the dashboard's Ajalugu tab
python3 scripts/rescue_ajalugu.py --auto-accept 70

# 4. see exactly what would be copied, before anything is written
python3 scripts/rescue_ajalugu.py --extract ~/ajalugu --dry-run

# 5. do it
python3 scripts/rescue_ajalugu.py --extract ~/ajalugu
```

### Rescuing from inside `.tar.zst` archives

The scanner cannot see inside archives, so extract first, scan the extraction,
and let the hash comparison do the work:

```bash
mkdir -p /tmp/unpack && cd /tmp/unpack
zstd -d --stdout ~/backups/master_backup_2026-07-23/instructions.tar.zst | tar -xf -

FI_DB=~/file-intelligence/database/files.db \
  python3 scripts/rescue_ajalugu.py --db ~/file-intelligence/database/files.db --scan
```

Wait — the extracted tree must be scanned first, and it must land in `backup`
scope for `v_backup_only` to consider it. Unpack under a path containing
`backup` or `archive` (e.g. `~/backups/unpacked/instructions/`), or the scanner
will classify it as `user` scope and the comparison becomes meaningless:

```bash
mkdir -p ~/backups/unpacked/instructions && cd ~/backups/unpacked/instructions
zstd -d --stdout ~/backups/master_backup_2026-07-23/instructions.tar.zst | tar -xf -

python3 scripts/scan.py ~/backups/unpacked --profile full
python3 scripts/rescue_ajalugu.py --scan
python3 scripts/rescue_ajalugu.py --list --min-score 65 -v
```

Scope is assigned from path components (`fi_classify.BACKUP_MARKERS`), so
unpacking under `~/backups/` is what makes this work.

---

## What the destination looks like

Original absolute paths are mirrored underneath the destination, so the context
of *where a file used to live* survives with it:

```
~/ajalugu/
├── AJALUGU_MANIFEST.txt
└── home/margus/
    ├── ai-mailbox/inbox/opencode/2026-05-11_plan.md
    └── instructions/eesti_portaal/old-architecture.md
```

`AJALUGU_MANIFEST.txt` records, per file: score, size, source path, destination
path — and `MISSING` / `EXISTS` lines for anything skipped. It is the record of
what the rescue actually did.

Rescued rows move to `decision = 'rescued'` with `rescued_path` set, so re-running
is idempotent.

---

## Review states

| State | Meaning |
|---|---|
| `pending` | Found and scored, awaiting a decision |
| `rescue` | Accepted, not yet copied |
| `skip` | Rejected. Stays recorded, so it will not resurface every scan |
| `rescued` | Copied. `rescued_path` holds the destination |

The dashboard's **Ajalugu** tab shows the pending queue with scores and reasons.
`POST /api/rescue/decide` moves items between states in bulk.

---

## Reading what you rescued

Once `~/ajalugu` exists, scan it as a normal tree and it becomes searchable
through every lens the rest of the system offers:

```bash
python3 scripts/scan.py ~/ajalugu --profile full
```

The history book becomes part of the same index — a lens over
`project_name` or `parent_dir` inside `~/ajalugu` will tell you what the old
structure looked like, which is often the interesting part on its own.

Stage 4 (text extraction + FTS5) is what makes this fully useful: at that point
you can ask "which of these mention LiteLLM" rather than opening files one at a
time. See [`01-ROADMAP.md`](01-ROADMAP.md#stage-4--text-extraction-and-search).
