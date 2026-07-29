# The lens engine

A **lens** is a saved query: a source, some logic, an output shape. Saving one
creates a button in the sidebar. That is the whole idea — the dashboard is not
a fixed set of screens, it is a set of screens you build.

---

## Why a JSON AST instead of SQL

The obvious way to let a user compose queries is to build a SQL string. Do that
and you have an injection hole; hand the same job to an LLM behind a
natural-language bar and you have an injection hole that writes itself.

So the UI and the model emit an **AST**, and `api/lens.py` is the only module in
the system that writes SQL. It will emit nothing except:

- sources from an explicit registry (`lens.SOURCES`),
- columns that exist on that source, checked live against `PRAGMA table_info`,
- operators from a fixed table,
- values as bound parameters — never interpolated,
- a `LIMIT`, always, clamped to 5000.

Anything else raises `LensError`, which the API returns as a `400`. A
hallucinated spec produces an error message, not a dropped table.

`tests/test_lens.py` fires twelve injection attempts — `DROP TABLE` through a
column name, `UNION SELECT` through the source, a subquery through `order_by`,
a statement terminator through the sort direction, an aggregate alias closing
the SELECT list, `sqlite_master` as a source — and asserts all twelve are
refused.

Two further limits worth knowing: every execution runs under a VM-step budget
via `sqlite3.set_progress_handler`, so a runaway query returns
`query exceeded its work budget` rather than hanging the dashboard; and `IN`
lists are capped at 1000 values.

---

## Spec reference

```jsonc
{
  "source":  "v_live_files",          // required; from the registry
  "columns": ["path", "size_bytes"],  // ignored when group_by is present
  "where":   { /* condition tree */ },
  "group_by":   ["category"],
  "aggregates": [{"fn": "sum", "field": "size_bytes", "as": "bytes"}],
  "having":     {"field": "bytes", "op": "gt", "value": 1000000},
  "order_by":   [{"field": "bytes", "dir": "desc"}],
  "limit":  200,
  "offset": 0
}
```

### Condition tree

A leaf:

```json
{"field": "system_scope", "op": "eq", "value": "user"}
```

Junctions nest arbitrarily:

```json
{"all": [
  {"field": "size_bytes", "op": "gte", "value": {"$mb": 100}},
  {"any": [
    {"field": "system_scope", "op": "eq", "value": "cache"},
    {"field": "duplicate_status", "op": "eq", "value": "duplicate"}
  ]},
  {"not": {"field": "git_repo", "op": "is_true"}}
]}
```

### Operators

| Operator | Value | Notes |
|---|---|---|
| `eq` `ne` `gt` `gte` `lt` `lte` | scalar | |
| `contains` `not_contains` | string | `%` and `_` are escaped — a literal `%` matches a literal `%` |
| `starts_with` `ends_with` | string | |
| `in` `not_in` | array | max 1000 items |
| `between` | `[low, high]` | |
| `is_null` `not_null` | — | |
| `is_true` `is_false` | — | `is_false` treats `NULL` as false |

`not_contains` and `not_in` are `NULL`-safe: they match rows where the column is
`NULL`, which is almost always what you meant.

### Aggregates

`count`, `sum`, `avg`, `min`, `max`, `count_distinct`. `count` without a field
becomes `COUNT(*)`. Aliases must be valid identifiers and are usable in
`having` and `order_by`.

### Value macros

Resolved server-side at execution, so a saved lens stays meaningful as time
passes.

| Macro | Resolves to |
|---|---|
| `{"$daysAgo": 7}` | unix timestamp 7 days ago — for `mtime`, `ctime` |
| `{"$daysAgoIso": 7}` | ISO string 7 days ago — for `timestamp`, `first_seen` |
| `{"$now"}` / `{"$nowIso"}` | now |
| `{"$latestScan": true}` | the most recent `scan_id` |
| `{"$mb": 100}` / `{"$gb": 2}` | bytes |

> Match the macro to the column's storage. `mtime` is a unix float (`$daysAgo`);
> `file_events.timestamp` is an ISO string (`$daysAgoIso`).

---

## Worked examples

**Large files in cache scope that nothing depends on**

```json
{"source": "v_live_files",
 "columns": ["path", "size_bytes", "age_days"],
 "where": {"all": [
   {"field": "system_scope", "op": "eq", "value": "cache"},
   {"field": "size_bytes", "op": "gte", "value": {"$mb": 50}}]},
 "order_by": [{"field": "size_bytes", "dir": "desc"}]}
```

**Which directories were churning this week**

```json
{"source": "v_recent_changes",
 "where": {"all": [
   {"field": "timestamp", "op": "gte", "value": {"$daysAgoIso": 7}},
   {"field": "event", "op": "eq", "value": "modified"}]},
 "group_by": ["parent_dir"],
 "aggregates": [{"fn": "count", "as": "changes"}],
 "having": {"field": "changes", "op": "gt", "value": 10},
 "order_by": [{"field": "changes", "dir": "desc"}]}
```

**Credentials sitting outside version control**

```json
{"source": "v_secret_radar",
 "columns": ["path", "secret_types", "project_name"],
 "where": {"all": [
   {"field": "git_repo", "op": "is_false"},
   {"field": "system_scope", "op": "ne", "value": "cache"}]}}
```

**Disk by scope, largest first**

```json
{"source": "v_live_files",
 "group_by": ["system_scope"],
 "aggregates": [{"fn": "sum", "field": "size_bytes", "as": "bytes"},
                {"fn": "count", "as": "files"}],
 "order_by": [{"field": "bytes", "dir": "desc"}]}
```

---

## Rules: lenses that write tags

A lens saved with `kind: "rule"` and a `tag` does not return rows to a screen.
`POST /api/rules/apply` runs every rule and materialises its matches into
`file_tags`.

```json
{"name": "Unprotected credentials",
 "kind": "rule",
 "tag":  "exposed-secret",
 "spec": {"source": "v_secret_radar", "columns": ["path"],
          "where": {"field": "git_repo", "op": "is_false"}}}
```

Every matching file now carries `exposed-secret` in `file_tags`, visible in the
detail drawer and filterable by any other lens. Re-apply after each scan and the
labels stay current.

Rule rows are rewritten wholesale per apply (`DELETE ... WHERE tag = ? AND
source = 'rule'` first), so a file that stops matching loses the tag. Manually
applied tags — any row whose `source` is not `'rule'` — are never touched.

---

## Reports

An ordered list of blocks, each backed by either a saved lens name or an inline
spec.

```json
{"name": "Weekly review",
 "blocks": [
   {"title": "Reclaimable space", "type": "table", "lens": "Top duplicate waste"},
   {"title": "Disk by scope",     "type": "chart",
    "spec": {"source": "v_live_files", "group_by": ["system_scope"],
             "aggregates": [{"fn": "sum", "field": "size_bytes", "as": "bytes"}]}}]}
```

`GET /api/reports/{name}/render?fmt=markdown` returns the whole thing as
Markdown — suitable for piping into a cron mail or an agent's inbox.

---

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/sources` | Registry + every field, for the pickers |
| `POST` | `/api/query` | Run an ad-hoc spec |
| `POST` | `/api/query/explain` | Compiled SQL + `EXPLAIN QUERY PLAN`, without running |
| `GET` `POST` `DELETE` | `/api/lenses` | Saved lens CRUD |
| `POST` | `/api/lenses/{name}/run` | Run a saved lens |
| `POST` | `/api/rules/apply` | Materialise every rule into `file_tags` |
| `GET` `POST` | `/api/reports` | Report CRUD |
| `GET` | `/api/reports/{name}/render` | `?fmt=json\|markdown` |

Every response from `/api/query` includes the compiled `sql` and `params`. That
is deliberate: a query builder that hides what it generated is a query builder
you cannot learn from or debug.

---

## Adding a natural-language bar

The engine is already the right shape for it. The model's job is to emit a spec,
not SQL:

1. Send `GET /api/sources` as context — the model sees exactly which sources and
   fields exist.
2. Ask for a JSON object matching the spec schema above.
3. `POST` it to `/api/query`.
4. On a `400`, feed the `LensError` message back and retry — the errors are
   written to be understood ("field 'passwd' does not exist on v_live_files").

The model never touches SQL, so the worst case for a bad generation is an error
message. Show the user the compiled SQL alongside the results, and offer "save
as lens" so a good answer becomes a permanent button.
