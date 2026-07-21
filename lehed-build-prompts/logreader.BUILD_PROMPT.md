# BUILD PROMPT — Logreader (logreader + logreaders)
> Read docs/AI_CORE_RULES.md + docs/EHITAJALE.md + docs/LOGGING_STANDARD.md. Tooling pages over ~/terminal_logs — the audit trail's reading glasses.

## Soul (one line, do not dilute)
Every AI session on this server left a trace (LOGGING_STANDARD); logreader makes those traces walkable — the system's own memory, browsable by the human who owns it.

## Betrayal test
- Becoming a pretty dashboard that summarizes instead of showing — logs verbatim first, views second.
- Write-access of any kind: logs are append-only artifacts of what happened; a log tool that can touch logs is an auditor that can lie.

## Standing on
Two folders (logreader, logreaders) with index.html; per-model folders in ~/terminal_logs; LOGGING_STANDARD defines the format.

## Next honest step (one thing)
Same merge move as aimail: one canonical folder (logreader), the other links through; note in DECISIONS.md. Then a static index by model/date generated from the terminal_logs tree — filenames and first-lines only, no parsing ambition yet.

## Best-day vision
Pick a day, pick a model, read what it did — sessions cross-linked to the git commits and DECISIONS lines they produced. When something surprises you in the system, the answer to "who did this and why" is three clicks, not an investigation. Pairs with MIND_SUMMARY: one shows current state, this shows how it got there.

## Seeds (designed, NOT built)
- Session ↔ commit cross-linking via Co-Authored-By trailers (trigger: first real "who did this" question).
- Log search (grep-as-a-page, still read-only) (trigger: >100 sessions).
- Notable-session → krattiina shard (trigger: first legendary session).

## Guardrails specific to this site
Logs may contain secrets accidentally pasted in sessions — the public face NEVER serves terminal_logs raw to the internet; owner-only until a redaction layer exists (rule rows + review, not regex hope).
