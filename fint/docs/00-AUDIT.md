# Audit of the v2 scripts

Every defect below was reproduced before being fixed. Where a claim can be
checked against the v2 output that was actually produced on the live machine,
the evidence is quoted.

The data *model* was sound. These are implementation defects, not design ones —
which is why v3 keeps the schema and replaces the code.

---

## 1. `new_files` was permanently zero

**Severity: high.** This silently disabled the most-used metric on the dashboard.

`scan.py` bound `first_seen` to `SCAN_START` (an ISO timestamp) in the values
tuple, then counted new files with:

```sql
SELECT COUNT(*) FROM files WHERE first_seen = ?   -- bound to SCAN_ID, a uuid
```

A timestamp is never equal to a UUID, so the count is always `0`.

**Evidence from the live run:**

```
Total Files: 282817 | Size: 138286.29 MB
New: 0 | Changed: 74 | Missing: 0
```

`Changed: 74` proves the scan was working and the tree was not static. `New: 0`
next to it is the bug, not a quiet disk. Every scan ever run reported zero new
files, including the very first one that inserted all 282,817 rows.

**Fix:** a dedicated `first_seen_scan` column holds the UUID; `first_seen`
stays a human-readable timestamp. v3 additionally derives new/changed counts
from a pre-read of each batch, so the numbers do not depend on a column
comparison at all.

---

## 2. Duplicate "wasted space" was overstated

**Severity: high.** It drove the headline number on the whole project.

```python
SELECT blake3, COUNT(*) copies, SUM(size_bytes) total_bytes ... GROUP BY blake3
```

`SUM(size_bytes)` over a group is the space occupied by *every* copy. You can
never reclaim all of it, because one copy — the master — is the file you are
keeping. Reclaimable is `(copies − 1) × size`.

**Reproduction** (`one 100 MB file in 4 places, two of them hardlinked`):

```
process_duplicates.py reports as 'wasted' : 400.0 MB
actual reclaimable (copies-1)*size        : 300.0 MB
truly reclaimable, hardlink-aware         : 200.0 MB
```

The reported `85,683.95 MB` of waste is the gross figure. The reclaimable
number is lower — by roughly one copy per group, then lower again once
hardlinks are excluded.

**Fix:** `duplicate_groups.reclaimable_bytes` is now the reclaimable figure and
is what every view, report and metric uses. `total_bytes` is retained as
*occupied* space and labelled as such.

---

## 3. Hardlinks were counted as reclaimable duplicates

**Severity: high — this one is destructive, not just wrong.**

Two paths sharing an inode are one file on disk. v2 saw two rows with the same
BLAKE3 and reported a full extra copy's worth of savings. Deleting the
"duplicate" frees nothing and destroys a path that something may depend on.

**Fix:** v3 records `device` and `nlink`, and computes
`reclaimable = size × (distinct_inodes − 1)`. Groups where
`distinct_inodes < copies` are labelled `duplicate_type = 'hardlink'` so the UI
can show them differently. Asserted by
`tests/test_pipeline.py::hardlink collapsed`.

---

## 4. Master selection was effectively arbitrary

**Severity: medium.** It decided which copy the cleanup script would keep.

```python
def calculate_score(path, mtime):
    score = 50
    if any(x in path for x in IGNORE_DIRS):
        score -= 40
    else:
        score += 30
    return score
```

Three problems: it returns only `20` or `80`, so almost every comparison is a
tie; `mtime` is accepted and never used; and `if score > best_score` breaks ties
toward whichever row SQLite happened to return first. Every member's stored
score was `best_score` for the master and a literal `0` for all duplicates, so
the per-copy reasoning was discarded.

**Fix:** a multi-signal score (scope, project membership, git tracking,
copy-suffix detection, hidden, generated, depth) with an explicit deterministic
tiebreak on `(−score, mtime, path)`. Each copy's score **and a human-readable
reason string** are stored, so the UI can answer "why this one".

---

## 5. Ten tables were created and never written

**Severity: high, structurally.** The audit-trail claim depended on them.

`file_history`, `file_events`, `file_tags`, `relationships`, `locations`,
`events`, `tags`, `extensions`, `mime_types`, `directory_similarity` all exist
in the schema and were never populated by any script.

This matters most for `file_events`. Without it, history lives entirely in the
`old_blake3` / `changed_scan` columns on the `files` row — which hold exactly
**one** prior version. A file modified five times retains one previous hash. The
"forensic trail proving who broke what" was not recorded.

**Fix:** v3 writes an append-only `file_events` row for every create, modify,
resize and disappearance. `extensions`, `mime_types` and `unknown_extensions`
are recomputed from SQL at the end of each scan. `file_tags` is populated by
the rule engine. The genuinely unused tables are documented as reserved in
`docs/02-DATA-CONTRACT.md` rather than left as mystery cruft.

---

## 6. Two subprocess forks per file

**Severity: high for performance.** ~565,000 process spawns per 282k-file scan.

```python
def blake3_file(path):  subprocess.run(["b3sum", str(path)], ...)
def get_mime(path):     subprocess.run(["file", "--brief", "--mime-type", str(path)], ...)
```

Both are called once per file. Process creation, not hashing, dominated the
runtime. `shutil.which("file")` also ran per file.

**Fix, in priority order:** use the in-process `blake3` wheel when present;
otherwise batch `b3sum` 256 paths per fork. MIME comes from an extension table
first, then `libmagic` in-process, then batched `file -b` as a last resort.
`detect_project` is memoised **per directory** rather than per file — v2 ran up
to twelve `.exists()` calls for every file, roughly 3.4M syscalls spent
rediscovering the same answers.

---

## 7. The whole inventory was held in RAM before a single insert

**Severity: high for a `/` scan.**

`files_data` accumulated one 40-field tuple per file and was written with a
single `executemany` at the end. At 282k files that is survivable; the advice
to run `sudo scan.py /` on a multi-million-file root is how you get an OOM kill
several hours into an unrecoverable scan.

**Fix:** v3 streams in batches (`--batch`, default 5000) — enrich, insert,
commit, release. Memory is bounded regardless of tree size.

---

## 8. Scanning `/` would break every subsequent subtree scan

**Severity: high, and subtle.**

The missing-file sweep was keyed on `top_directory`:

```sql
UPDATE files SET status='missing' ... AND top_directory = ?
```

`top_directory` is set to whatever root the current scan used. Scanning `/`
rewrites it to `/` on **every row**. After that, a `/home/margus` scan matches
no rows, and nothing is ever marked missing again. The partitioning property
the design depended on is destroyed by the exact command that was recommended.

**Fix:** the scan records every directory it actually walked into, and retires
only files whose `parent_dir` is in that set.

A path prefix (`path LIKE '<root>/%'`) fixes the reported bug but introduces a
subtler one, which surfaced while testing: `--profile light` skips
`node_modules`, so a prefix sweep declares every file under it missing even
though they are sitting on disk. Since the recommended cron cadence mixes
profiles, that would flood the change log with deletions that never happened.
Retiring only within visited directories is exact, and it subsumes the
subtree-independence property for free — a directory that was skipped, or that
errored on permissions, is simply never swept.

Asserted by `tests/test_pipeline.py::a beta-only scan left the backups tree
alone` and `::a file inside a skipped directory is not marked missing`.

---

## 9. `file_count` was inflated by subdirectory count

**Severity: medium.** Every directory statistic was wrong.

```python
dir_counts[parent_str] = dir_counts.get(parent_str, 0) + 1   # a SUBDIRECTORY
...
dir_counts[dir_str] = dir_counts.get(dir_str, 0) + 1          # a FILE
```

The same dict counts both, and `file_count` is read from it.

**Fix:** separate counters, plus recursive rollups (`total_bytes_recursive`,
`file_count_recursive`) computed deepest-first — without which a treemap draws
parents smaller than their own children.

---

## 10. Smaller items

| Issue | Fix |
|---|---|
| `basename` computed as `name.rsplit('.',1)[0]` → empty string for `.bashrc` | `fi_classify.stem()` handles dotfiles |
| `unknown_extensions` counts overwritten per scan, so a subtree scan reset global totals | Recomputed from SQL over the whole table |
| Error log opened and closed per error | Opened once per scan |
| No WAL, no `synchronous=NORMAL` | Set in `fi_common.connect()` |
| The 461 MB database sat under `/home` and was re-hashed on every scan, while being written to | `scan.py` excludes its own DB, WAL and SHM |
| `/proc`, `/sys`, `/dev`, `/run` were walked on a `/` scan | Always skipped |
| Symlinked *directories* were pruned without being recorded | Recorded as symlink rows; still never descended into |
| `disappeared_scan` was never cleared when a file returned | Cleared on upsert |
| `scan_statistics.duplicate_groups` / `duplicate_bytes` never written, so the waste-over-time chart had no series | Backfilled by `process_duplicates.py` |
| Bare `except: pass` around every migration | `PRAGMA user_version` migrations that tolerate only "already exists" and raise everything else |

---

## What v2 got right

Worth saying plainly, because it is the reason this was worth fixing rather
than rewriting:

- **The `ON CONFLICT(path) DO UPDATE` upsert.** Keeping change detection in the
  database layer instead of a Python `if/else` per file is the correct
  instinct, and v3 keeps the pattern.
- **`os.walk(followlinks=False)` with in-place `dirs[:]` pruning.** Correct loop
  protection and correct cost avoidance — pruning before descending means the
  contents are never stat'd. v3 keeps it verbatim and only adds recording.
- **The schema.** Sixty-odd columns of scope, project, ownership and lifecycle
  metadata is genuinely more than most indexers capture, and it is what makes
  the lens engine worth building.

---

## On the advice from other assistants

Two points are worth flagging, since they were presented as strengths.

**The `try/except: pass` migration pattern was praised as clever.** It is the
one snippet to actively remove. A bare `except` cannot distinguish "column
already exists" from "disk full", "database is locked", or "file is corrupt" —
it swallows all four identically and reports success. A `user_version`
migration list is about fifteen lines and is correct.

**Postgres, Neo4j and a vector database were proposed as phases 3–4.** At 282k
files this is premature by one to two orders of magnitude. SQLite handles this
row shape comfortably into the millions, and every graph query described
("show me every file touched by agent X in 48h, with hash diffs") is a join or
a recursive CTE over tables that already exist. See
[`01-ROADMAP.md`](01-ROADMAP.md) for the thresholds that would actually justify
each migration.
