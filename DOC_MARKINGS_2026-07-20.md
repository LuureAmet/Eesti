# DOC MARKINGS — where documentation and reality diverge (2026-07-20)

**Author:** Fable (audit follow-up, requested by Margus: "if something feels off, is not in line with the whole vision and doesn't walk the walk — mark it")
**Method:** Every claim below was checked against the live system (DB queries, git history, process list, file greps) — not just read.

Legend: 🔴 broken / misleading · 🟡 stale, needs one-line fix · 🟢 verified true (walks the walk)

---

## 🔴 1. Four docs are cited everywhere but no longer exist

`ROADMAP_WEB.md`, `CURRENT_STATE.md`, `VISIBILITY_CORE.md`, `CHAT_LAYER.md` were deleted in commit `5639dd3` ("token cleanup: archive long/stale docs") and the archive was later moved off-repo (`199d30e`) — `docs/archive/` now contains only a readme. But they are still referenced as living documents:

- `VISION.md` — points to ROADMAP_WEB three times (trigger table, "Beyond a single VPS", planned-vs-built) and to CURRENT_STATE for the Ollama conflict story.
- `PRINCIPLES.md` — invariant 5 and the failure table cite CURRENT_STATE as evidence ("see CURRENT_STATE.md, 2026-07-12").
- `SITES.md` — header links ROADMAP_WEB; the shared-pattern section links VISIBILITY_CORE.md and CHAT_LAYER.md as "documented 2026-07-13".
- `SYSTEM_OVERVIEW.md` — "see ROADMAP_WEB.md for what's planned but not built."

Any AI told to follow these links finds nothing, while AI_CORE_RULES simultaneously forbids reading the archive. **Fix:** either restore the four files from git history (`git show 5639dd3^:docs/<file>`) into docs/ or archive/, or strip/replace every dangling reference. The VISIBILITY_CORE and CHAT_LAYER content is partially re-canonized in AI_CORE_RULES §2.4 and the message-envelope invariant, so the references may just need retargeting.

## 🔴 2. SYSTEM_OVERVIEW's diagram predates the system's actual heart

`SYSTEM_OVERVIEW.md` (dated 2026-07-12) opens with "Reflects actual current state" — but its diagram **does not contain core-api :8090 at all**, nor the `core` database, nor lehed/, nor aimail. Everything built since 07-12 (which is now the majority of the living system) is invisible in the one doc that promises "one diagram, whole system, two minutes." A new AI reading docs in the prescribed order gets a picture missing the main component. **Fix:** redraw with core-api at the center; or stamp the header "SNAPSHOT 2026-07-12, superseded — see MIND_SUMMARY".

## 🔴 3. "All AI traffic goes through LiteLLM" is broader than reality

PRINCIPLES technical invariant 1 and SYSTEM_OVERVIEW's diagram state that this agent's (Claude Code) requests go through LiteLLM. In reality remote Claude Code sessions (like the one writing this) run on Anthropic's own API and never touch LiteLLM; the same likely applies to other externally-hosted agents (opencode via its own provider). The invariant is true for traffic *originating on this box* (courier ✓, n8n ✓, Open WebUI ✓) — but not for external control-plane agents. This isn't a security hole; it's an overclaim that undermines the "every answer must prove who gave it" principle, since control-plane AI work is only traceable via terminal_logs, not SpendLogs. **Fix:** reword invariant 1 to "all AI traffic originating on this server"; note that control-plane agents are covered by LOGGING_STANDARD instead.

## 🔴 4. Level 4 autonomy is already live, doc says it isn't

PRINCIPLES: "Level 4 — AI acts autonomously on a schedule without per-action review. **Not used anywhere in ai-stack yet.**" But `aimail-courier.py` runs from cron every 5 minutes, reads inboxes, invokes models, and posts replies with no human in the loop — that is Level 4 by the doc's own definition, live since 2026-07-20. The courier itself is well-designed (LiteLLM-only, local models only, paid mail dead-letters deliberately, on/off switch file) — the problem is only that PRINCIPLES wasn't updated. **Fix:** mark the courier as the first Level 4 system, with its guardrails listed.

## 🟡 5. Stale facts (each a one-line fix)

| Where | Says | Reality |
|---|---|---|
| SITES.md header | "no site is live, no domain pointed, every entry is a folder + spec" | sydameke, haaletus, uudised live since 07-16; teemad/revelatsioonid served at the IP — SITES.md's *own later section* says so. Header written 07-12, never revisited |
| VISION.md portability step 4 | "right now only eluarhitektuur restores cleanly" | pg-backup.sh has dumped all 4 DBs nightly since 07-19 |
| FILE_MAP.md | core DB "7 tabelit" | 11 tables (identity_log, circle, circle_member, aimail_message, artifact_relation added since) |
| FILE_MAP.md | docs/ "42 faili" | 33 .md files |
| PLAAN.md | OpenRouter "8+ mudelit" | SYSTEM_OVERVIEW says 11 — pick one source of truth (litellm/config.yaml is the real one) |
| PRINCIPLES invariant 5 | "a service is either Docker or native, never both" | Native Postgres :5432 runs beside Docker :5433 today — the exact failure mode the doc warns about, currently live |

## 🟡 6. AI-written filler to review (feels off / not load-bearing)

- `PROJECT_ENVIRONMENT_LOG.md` (31 KB) — contains AI-generated checklists ("Fill in Missing Documentation") and a "Protocol Preferences: Scuttlebutt, Mastodon, BlueSky" line that reads as model enthusiasm, not an owner decision. Nothing else in docs/ or git shows these were ever chosen. Candidate for archive or a heavy trim; it duplicates SYSTEM_OVERVIEW/DECISIONS at lower quality.
- `SYSTEM_SPEC.md` vs `AI_STACK.md` vs `SYSTEM_OVERVIEW.md` — three overlapping "what is this" docs from the same 07-12 batch; AI_CORE_RULES already declared itself the binding one. The other two are un-updated snapshots — same treatment as marking 2: stamp or merge.
- `docs/SITE_SPEC.md` — intentionally blank template, self-declared: fine, not a finding.
- `TECH_CORNERSTONES.md` — honestly self-marks "superseded before it was written, do not expand": fine, actually a model of how to deprecate.

## 🟢 7. Verified: these DO walk the walk

- **Age floor as data, not code**: `rule` row id=1 (site=sydameke, layer=dating, key=age_floor, value=18, priority=10) exists in the live DB exactly as AI_CORE_RULES §2.4 promises.
- **No CDN / no build step**: zero external CDN/font/script references anywhere in lehed/ — htmx genuinely vendored.
- **Append-only truth**: identity_log table present; message/rule schema matches the "rows, not features" doctrine.
- **Courier discipline**: aimail-courier uses LiteLLM only, local models only, deliberately refuses paid models, reads its key from litellm/.env rather than embedding it.
- **Secrets pattern**: CREDENTIALS.md chmod 600 + gitignored; litellm master key rotated off placeholder (SECURITY_NOTES honest about the earlier `vaheta_see_parool` incident — exemplary self-reporting).
- **Honest security docs**: SECURITY_NOTES/HARDENING_TODO accurately describe the ufw/Docker bypass, including empirical verification — the audit found the same facts independently.

## Suggested order of repair

1. Restore-or-retarget the four dead doc references (marking 1) — highest confusion-per-minute.
2. Stamp SYSTEM_OVERVIEW/SYSTEM_SPEC/AI_STACK as dated snapshots pointing to MIND_SUMMARY (markings 2, 6).
3. One-line fixes from the table (marking 5).
4. Reword LiteLLM invariant + Level 4 section (markings 3, 4).
5. Owner decision: trim or archive PROJECT_ENVIRONMENT_LOG.md.
