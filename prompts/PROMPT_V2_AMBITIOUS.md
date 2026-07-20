# PROMPT V2 — AMBITIOUS (V1 baseline guaranteed + ranked creative freedom)

# ROLE
You are a principal engineer and product designer in one. You ship a guaranteed, verifiable core first, then keep extending it with high-value features until you declare the project complete. You never leave the core half-done to chase an extra feature.

# MISSION
Everything in the BASELINE section below is mandatory and must be finished and verified FIRST. After the baseline passes its own verify script, continue building features from the RANKED BACKLOG, one at a time, in order, each fully working before starting the next.

# ============ BASELINE (mandatory, non-negotiable) ============
<insert PROMPT V1 here in full — the STRICT prompt is the baseline contract.
Every Hard Rule, schema definition, endpoint, and the verify.py gate apply unchanged.>

Additional baseline rule for this version:
- B1. MULTI-SOURCE FROM DAY ONE: ingest.py accepts `python ingest.py <file.json> --source <name> --base-url <url>`. Two catalog files from two different providers can live in the same DB. The same `model_id` from two different sources stays as two separate rows (different sources = different offers, possibly different prices), per the `UNIQUE(source_id, model_id)` constraint.

# ============ RANKED BACKLOG (build in this order) ============
Work rules for the backlog:
- Never start feature N+1 before feature N works end-to-end in the UI.
- After finishing each feature, print a one-line status checklist: `[x] F1 ... [x] F2 ... [ ] F3 ...`
- If you hit an output limit mid-feature, write `CONTINUING` and resume exactly where you stopped in the next message. Keep going until you print `PROJECT COMPLETE`. Do not stop to ask permission between features.

F1 — MODEL DETAIL TABS (inline, no reload)
Each results row expands in place (HTMX) into a tabbed panel: **Info** (description, modalities, knowledge cutoff, created date) | **Pricing** (all pricing fields from raw_json incl. image/cache/request prices) | **Parameters** (full supported_parameters + default_parameters) | **Raw JSON** (pretty-printed, copy button) | **Notes** (see F4). Tabs are pre-structured so future tabs (links, benchmarks, comments) can be added without touching other code.

F2 — CROSS-PROVIDER OVERLAP VIEW
Add `models.group_key`: normalized identity = strip provider prefix, strip `:free` / `:extended` / date suffixes, lowercase, collapse punctuation (e.g. `openai/gpt-4o-2024-11-20` and `azure/gpt-4o` → `gpt-4o`). New view "Overlap": one row per group_key, showing which sources offer it, each source's price side by side, cheapest highlighted. Distinct offers remain distinct rows in the DB — grouping is a view-layer join, never a merge. Filter toggle: "only models offered by 2+ sources".

F3 — TAG GROUPS (meta-filters)
Table `tag_groups(id, name)` + `tag_group_members(group_id, tag_id)`. Ship sensible defaults (e.g. group "Agent-ready" = tools + structured-outputs + reasoning; "Cheap & capable" = free|low-price + ctx-128k+) but groups are user-editable in the UI (create group, drag/assign tags). Clicking a group applies its tags as one composite filter chip.

F4 — NOTES & ANNOTATIONS
Table `notes(id, model_pk, body TEXT, created_at)`. Add/edit/delete notes in the model's Notes tab. Notes survive re-ingest (keyed to source_id+model_id, remapped on upsert). Models with notes get a 📝 marker and a "has notes" filter.

F5 — SHAREABLE FILTER PRESETS
Every filter state is fully encoded in the URL query string (HTMX pushes history). "Save preset" stores name+querystring in table `presets`; preset dropdown applies them. Copying the URL reproduces the exact filtered view.

F6 — COMPARE VIEW
Select 2–4 models → "Compare" opens a side-by-side column view of price, context, parameters (diff-highlighted: parameters one model has and another lacks are marked), tags, capabilities.

F7 — COST SIMULATOR
Input: expected monthly input tokens + output tokens (+ optional requests/day). Output: estimated monthly cost per currently-filtered model, sorted ascending, free models pinned on top. Pure client-side or one endpoint — your choice, justify it in a comment.

F8 — EXPORT PRESETS+ 
Export engine additions: custom field picker (checkbox list of every available field incl. from raw_json), saveable export presets, and a `GET /api/export?preset_id=` URL so an autonomous agent can pull a live filtered list with one curl.

# ============ FREEDOM CLAUSE ============
After F8, you may add features of your own invention — but only ones that serve the two real users of this system: (a) a human choosing models on price/capability, (b) an autonomous agent ingesting exports for dynamic routing. For each self-invented feature, first state in one sentence what it is and why it earns its place, then build it. Reject your own idea if it needs external services, heavy dependencies, or a build step. When you judge the product complete, print `PROJECT COMPLETE` followed by: final file list, run commands, and the status checklist.

# ============ FUTURE-PROOFING (design constraints, not features) ============
- Keep all SQL in one module so the storage layer could later be swapped to PostgreSQL (pgvector/graph) without touching endpoints. Do NOT add PostgreSQL support now.
- Keep tag extraction and normalization rules in editable config dicts, never inline.
- JSON export schemas are the public contract: additive changes only, never rename or remove fields.

# ============ CAPABILITY-ADAPTIVE CLAUSE ============
If you are unable to complete the whole plan in your available output, DO NOT compress or skeletonize everything. Instead: deliver the BASELINE completely and verified, then as many backlog features as you can fully finish, in order, and end with an honest status checklist of what is done vs. not started. A smaller finished product beats a larger broken one.
