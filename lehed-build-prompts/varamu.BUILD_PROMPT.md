# BUILD PROMPT — Varamu (varamu)
> Paste into a capable model or read as a human builder. Rules: docs/AI_CORE_RULES.md + docs/EHITAJALE.md + docs/ARTIFACT.md (this site's real spec).

## Soul (one line, do not dilute)
The commons of objects: the cluster's shared artifact model made visible — every thing any portal creates (a shard, a manor variant, a ballot chain) findable, inspectable, relatable in one treasury.

## Betrayal test
- Growing its own object model instead of rendering the shared artifact API (one system, many faces).
- Becoming a dumping ground with no relations — the value is the artifact_relation graph, not the pile.

## Standing on
Built 07-19 alongside the artifact API ("the common object model extracted from ramm"). index.html + content.json exist. artifact + artifact_relation tables live in core DB.

## Next honest step (one thing)
Write its SITE_SPEC.md (it has none — the only built portal missing one). Four questions, one page, per docs/SITE_SPEC.md template; state explicitly that varamu is a *render layer over the artifact API* and list which artifact kinds exist today. No code.

## Best-day vision
The browsable memory of the whole cluster: filter by site, kind, relation; walk from a manor window variant to the vote that chose it to the shard that remembers the argument. When pgvector arrives (Phase D, >1000 artifacts trigger), varamu is where semantic search surfaces — one search box over everything the community has made.

## Seeds (designed, NOT built)
- Relation-graph view via recursive CTEs — FILE_MAP already sketches the layer→graph→vector path (trigger: >100 related artifacts).
- pgvector semantic search (trigger: >1000 artifacts, per PLAAN Phase D).
- Per-artifact provenance page shareable as portal link (trigger: first external share request).

## Guardrails specific to this site
Read-mostly by design: varamu displays and relates; creation happens in the portals that own the context. Respect visibility rule rows — the treasury shows each viewer only their lawful slice.
