# PROMPT V1 — STRICT (zero-error, fully verifiable)

# ROLE
You are a senior full-stack engineer. You deliver complete, working, production-quality code with zero placeholders, zero TODOs, zero "left as an exercise" gaps.

# MISSION
Build a local, lightweight LLM-catalog system: JSON ingester → SQLite database → FastAPI backend → single-page HTMX frontend → JSON export engine. One deliverable, fully runnable on a plain Linux machine.

# INPUT DATA — READ CAREFULLY
- The data file `openrouter_models.json` already exists on disk. It is the raw output of:
  `curl https://openrouter.ai/api/v1/models -o openrouter_models.json`
- It is NOT included in this prompt and you must NOT ask for it, NOT embed sample data as the database, and NOT fetch it from the network. Your code reads it from disk at runtime.
- Top-level shape: `{"data": [ <model objects> ], "total_count": N, ...}`
- Each model object contains (at least): `id`, `canonical_slug`, `name`, `created`, `description`,
  `context_length`, `architecture` (`modality`, `input_modalities`, `output_modalities`, `tokenizer`),
  `pricing` (`prompt`, `completion`, possibly `image`, `request`, `web_search`, `internal_reasoning`, `input_cache_read`, `input_cache_write` — all values are STRINGS of USD per token),
  `top_provider` (`context_length`, `max_completion_tokens`, `is_moderated`),
  `supported_parameters` (list of strings), `default_parameters`, `knowledge_cutoff`, `benchmarks`.
- Any field not listed above may also appear. Unknown fields must NEVER crash the parser and must NEVER be lost (see Hard Rule 1).

# DATABASE — SQLite3, exact schema
- `sources(id INTEGER PK, name TEXT UNIQUE, base_url TEXT, file_path TEXT, fetched_at TEXT)`
  — designed so a second provider's catalog file can be ingested later without schema changes.
- `models(pk INTEGER PK, source_id INTEGER REFERENCES sources, model_id TEXT, provider TEXT,
   name TEXT, context_window INTEGER, input_price REAL, output_price REAL, combined_price REAL,
   is_free INTEGER, modality TEXT, input_modalities TEXT, output_modalities TEXT,
   created INTEGER, knowledge_cutoff TEXT, description TEXT, raw_json TEXT NOT NULL,
   UNIQUE(source_id, model_id))`
  - `provider` = the part of `model_id` before the first `/` (e.g. `openai/gpt-4` → `openai`).
  - `input_price` / `output_price` = pricing.prompt / pricing.completion parsed to float, full precision, USD per token. A negative value (e.g. "-1") means dynamic/unknown pricing → store NULL and auto-tag the model `dynamic-pricing`.
  - `combined_price` = (input_price * 1000) + (output_price * 1000)  — i.e. cost of 1k input + 1k output tokens. NULL if either side is NULL.
  - `is_free` = 1 when combined_price == 0.
- `parameters(id INTEGER PK, name TEXT UNIQUE)` and `model_parameters(model_pk, parameter_id, UNIQUE pair)`
  — many-to-many, populated ONLY from each model's `supported_parameters` list.
- `tags(id INTEGER PK, name TEXT UNIQUE)` and `model_tags(model_pk, tag_id, UNIQUE pair)`.

# TAG EXTRACTION RULES
- Structural tags (derived from data, always applied): `free`, `vision` (image in input_modalities), `audio`, `multimodal` (more than one input modality), `tools` (supports tools/tool_choice), `reasoning` (supports reasoning/include_reasoning), `structured-outputs`, `moderated` (top_provider.is_moderated), context buckets: `ctx-32k+`, `ctx-128k+`, `ctx-200k+`, `ctx-1M+`, `dynamic-pricing`.
- Description keyword tags: extracted from `description` text using ONE single editable Python dict `KEYWORD_TAGS = {tag: [keyword variants...]}` near the top of the ingester, covering at minimum: coding, agentic, MoE, roleplay, math, multilingual, long-context, distilled, open-source, uncensored. Matching is case-insensitive on word level.
- The dict is the ONLY place keyword rules live; parameters must have NO hardcoded whitelist anywhere.

# HARD RULES — NON-NEGOTIABLE
1. ZERO DATA LOSS: every model object is stored verbatim in `raw_json`. Row count in `models` MUST equal `len(data)` in the JSON file. Re-running ingest is idempotent (upsert, no duplicates).
2. Parameters are fully dynamic: whatever strings appear in `supported_parameters` become rows in `parameters`. Never filter, rename, or whitelist them.
3. Prices keep full float precision in the DB. Round ONLY for display (6 decimals) and never in storage or export.
4. Runs with exactly: `pip install fastapi uvicorn jinja2` then `python ingest.py && python app.py`. SQLite file: `catalog.db`. No other services, no build step, no Node.
5. No network calls at runtime. Tailwind + HTMX may be loaded from CDN in index.html (acceptable), everything else is local.

# BACKEND — FastAPI endpoints
- `GET /` → serves index.html.
- `GET /api/models` → the single filtering endpoint. Query params: `q` (substring on id/name/description), `tags` (comma list, AND logic), `params` (comma list, AND logic), `min_context`, `max_price` (on combined_price; NULL prices excluded unless `include_unknown_price=1`), `free_only`, `sort` (name|combined_price|context_window|created, plus `_desc` variants), `limit`/`offset`. Returns an HTML table fragment for HTMX; returns minified JSON instead when `format=json`.
- `GET /api/tags` and `GET /api/params` → names + model counts, respecting active filters (counts update as filters change).
- `POST /api/export` → accepts either explicit `model_pks` list or the same filter params as /api/models, plus `preset` = `ids` (list of model_id strings) | `pricing` (id, name, input_price, output_price, combined_price) | `params` (id + parameters_supported) | `full` (the enriched schema below). Response: minified JSON, `Content-Disposition: attachment`.
- `full` export item schema (exactly):
  `{"model_id", "name", "provider", "context_window_tokens", "pricing": {"input_price_per_token", "output_price_per_token", "combined_price_1k_in_1k_out"}, "parameters_supported": [...], "capabilities": {"vision_supported", "tool_calling", "reasoning"}, "tags": [...], "raw_description"}`

# FRONTEND — one file, templates/index.html, HTMX + Tailwind
- Filters column: text search (debounced 300ms), range slider for context_window, range slider for combined_price with `free only` toggle, tag cloud (tag name + count, click toggles, active tags highlighted), parameter checkboxes (top 20 by count, rest behind a "show all" toggle).
- Every filter change triggers ONE `hx-get` to /api/models replacing the results table. No full page reloads anywhere.
- Results table: checkbox per row, select-all-visible checkbox, columns: id, name, provider, context, input $, output $, combined $/1k+1k, tag chips. Sortable by clicking headers.
- Export bar (sticky): shows selected count, preset dropdown (ids/pricing/params/full), "Export selected" and "Export all filtered" buttons → downloads JSON.

# SELF-VERIFICATION — mandatory deliverable
Provide `verify.py` that prints a PASS/FAIL table for:
1. `models` row count == `len(data)` in the JSON file.
2. Every DB row's `raw_json` round-trips byte-equal (after canonical json.dumps) to its source object.
3. `parameters` table contains every distinct string that appears in any `supported_parameters` list — count both sides and compare.
4. combined_price recomputed from raw_json matches stored value for 25 random models.
5. Export preset `full` of 3 random models validates against the schema above.
Exit code 0 only if all PASS.

# OUTPUT FORMAT
Deliver complete files in this exact order, each in its own fenced code block with the filename as the first comment line:
1. `ingest.py`  2. `app.py`  3. `templates/index.html`  4. `verify.py`  5. `README.md` (exact run commands, endpoint docs with curl examples).
If you hit an output limit, stop at a file boundary, write `CONTINUING`, and resume from the exact point in your next message. Do not summarize instead of finishing. The task is complete only when all 5 files are fully emitted.
