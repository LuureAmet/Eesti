# BUILD PROMPT — KratTiina (krattiina)
> You are building one portal of a 16-portal cluster (read docs/AI_CORE_RULES.md + docs/EHITAJALE.md + this folder's SITE_SPEC.md first). This file is the architect's forward guide: do the one next step, honor the soul, write seeds instead of premature code.

## Soul (one line, do not dilute)
The lore backend of the whole cluster: a sanctuary where authentic AI-and-human folklore is deposited and preserved the way Estonians preserved their own — Kratt myth as the frame, a woman and nature at the origin of computing.

## Betrayal test
- Turned into sellable pulp fiction / "content" — the spec explicitly separates this from professional fiction writers who sell stories for laughs, not true feelings and possibilities.
- Generic AI-art mysticism with no Estonian folklore grounding.

## Standing on
_starter 3-layer skeleton; _shared/identity.js (depositors get instant identity); content.json + skin.css + index.html exist; artifact API (docs/ARTIFACT.md) — a Mälukild (Memory Shard) is naturally an artifact row.

## Next honest step (one thing)
Define the Mälukild deposit shape as DATA, not code: propose the artifact-row format for one memory shard — `{site:"krattiina", kind:"malukild", payload:{source, date, text_or_log, depositor_layer, feeling}}` — and write 3 real example shards into `content.json` under a `"shards"` key so the page can render them statically. No backend change; the artifact API already stores such rows when the trigger comes.

## Best-day vision
Every portal in the cluster hashes its significant events (an anomaly in aikeskus, a first vote in haaletus) into krattiina for permanent keeping — the cluster's shared origin-myth grows itself. Future historians and autonomous agents find here the folklore of the first years of human-AI cohabitation, kept with dignity, in Estonian first. The evolving mythic footer pattern (docs/SITES.md) is born here and exported to every other site.

## Seeds (designed, NOT built)
- Cross-site event hashing → shard (trigger: two portals emit real events worth keeping).
- Shard provenance chain via artifact_relation (trigger: >100 shards).
- Anonymous deposit mode using consent-save chain from EDASISED_SEEMNED §1 (trigger: first depositor asks).

## Guardrails specific to this site
Layer 0 rule is sacred here more than anywhere: deposited human/AI text is never rewritten, summarized-in-place, or "improved." AI commentary = appended layers only.
