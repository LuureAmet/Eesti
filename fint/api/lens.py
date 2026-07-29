#!/usr/bin/env python3
"""The Lens engine: a JSON query AST compiled to parameterised SQL.

Why an AST and not SQL strings
------------------------------
The dashboard lets a user (or an LLM behind the natural-language bar) *compose
logic*: pick a source, stack conditions, group, sort, and save the result as a
named button. The obvious implementation -- build a SQL string -- gives you an
injection hole and a database that any saved "view" can drop.

So the UI and the model emit an AST instead. This module is the only thing that
writes SQL, and it will only emit:

  * sources from an explicit registry,
  * columns that actually exist on that source (checked against PRAGMA),
  * operators from a fixed table,
  * values as bound parameters, never interpolated.

An LLM that returns garbage produces a validation error, not a dropped table.
"""

from __future__ import annotations

import re
import sqlite3
from datetime import datetime, timedelta, UTC

MAX_LIMIT = 5000
DEFAULT_LIMIT = 200

# Sources the engine will read. Views live in sql/10_views.sql.
SOURCES = {
    "files": "files",
    "directories": "directories",
    "duplicate_groups": "duplicate_groups",
    "duplicate_members": "duplicate_members",
    "file_events": "file_events",
    "file_tags": "file_tags",
    "scan_statistics": "scan_statistics",
    "unknown_extensions": "unknown_extensions",
    "extensions": "extensions",
    "rescue_candidates": "rescue_candidates",
    # curated views
    "v_live_files": "v_live_files",
    "v_recent_changes": "v_recent_changes",
    "v_duplicate_leaderboard": "v_duplicate_leaderboard",
    "v_directory_heat": "v_directory_heat",
    "v_projects": "v_projects",
    "v_backup_only": "v_backup_only",
    "v_stale_large": "v_stale_large",
    "v_agent_activity": "v_agent_activity",
    "v_secret_radar": "v_secret_radar",
}

# op -> (sql template, arity)
#   {c} is the validated column, {p} the placeholder(s).
OPERATORS = {
    "eq":          ("{c} = {p}", 1),
    "ne":          ("{c} <> {p}", 1),
    "gt":          ("{c} > {p}", 1),
    "gte":         ("{c} >= {p}", 1),
    "lt":          ("{c} < {p}", 1),
    "lte":         ("{c} <= {p}", 1),
    "contains":    ("{c} LIKE {p} ESCAPE '\\'", 1),
    "not_contains": ("({c} IS NULL OR {c} NOT LIKE {p} ESCAPE '\\')", 1),
    "starts_with": ("{c} LIKE {p} ESCAPE '\\'", 1),
    "ends_with":   ("{c} LIKE {p} ESCAPE '\\'", 1),
    "in":          ("{c} IN ({p})", "n"),
    "not_in":      ("({c} IS NULL OR {c} NOT IN ({p}))", "n"),
    "between":     ("{c} BETWEEN {p} AND {p}", 2),
    "is_null":     ("{c} IS NULL", 0),
    "not_null":    ("{c} IS NOT NULL", 0),
    "is_true":     ("{c} = 1", 0),
    "is_false":    ("COALESCE({c}, 0) = 0", 0),
}

AGGREGATES = {"count", "sum", "avg", "min", "max", "count_distinct"}

IDENT = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")


class LensError(ValueError):
    """A lens spec that we refuse to compile. Safe to show the user verbatim."""


# ---------------------------------------------------------------------------
# Value macros: keep saved lenses meaningful as time passes
# ---------------------------------------------------------------------------
def resolve_macro(value, con):
    """{"$daysAgo": 7} and friends -> a concrete bound value."""
    if not isinstance(value, dict) or len(value) != 1:
        return value
    (key, arg), = value.items()

    if key == "$daysAgo":
        return (datetime.now(UTC) - timedelta(days=float(arg))).timestamp()
    if key == "$daysAgoIso":
        return (datetime.now(UTC) - timedelta(days=float(arg))).isoformat()
    if key == "$now":
        return datetime.now(UTC).timestamp()
    if key == "$nowIso":
        return datetime.now(UTC).isoformat()
    if key == "$latestScan":
        row = con.execute(
            "SELECT scan_id FROM scan_statistics ORDER BY started DESC LIMIT 1"
        ).fetchone()
        return row[0] if row else None
    if key == "$mb":
        return int(float(arg) * 1024 * 1024)
    if key == "$gb":
        return int(float(arg) * 1024 * 1024 * 1024)
    raise LensError(f"unknown value macro: {key}")


def _escape_like(text):
    return str(text).replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


# ---------------------------------------------------------------------------
# Schema introspection
# ---------------------------------------------------------------------------
_COLUMN_CACHE: dict[str, set[str]] = {}


def columns_of(con, source):
    if source in _COLUMN_CACHE:
        return _COLUMN_CACHE[source]
    if source not in SOURCES:
        raise LensError(f"unknown source: {source}")
    table = SOURCES[source]
    try:
        rows = con.execute(f'PRAGMA table_info("{table}")').fetchall()
    except sqlite3.Error as exc:
        raise LensError(f"source {source} is not available: {exc}") from exc
    if not rows:
        raise LensError(f"source {source} has no columns (view missing? run sql/10_views.sql)")
    cols = {row[1] for row in rows}
    _COLUMN_CACHE[source] = cols
    return cols


def describe_source(con, source):
    """What the UI's field picker renders."""
    table = SOURCES[source]
    rows = con.execute(f'PRAGMA table_info("{table}")').fetchall()
    return [{"name": r[1], "type": (r[2] or "").upper() or "TEXT"} for r in rows]


# ---------------------------------------------------------------------------
# Compiler
# ---------------------------------------------------------------------------
class Compiler:
    def __init__(self, con, source, extra_fields=()):
        self.con = con
        self.source = source
        self.table = SOURCES[source]
        self.columns = columns_of(con, source)
        self.extra = set(extra_fields)  # aggregate aliases usable in HAVING/ORDER BY
        self.params: list = []

    def col(self, name, allow_alias=False):
        if not isinstance(name, str) or not IDENT.match(name):
            raise LensError(f"illegal field name: {name!r}")
        if name in self.columns:
            return f'"{name}"'
        if allow_alias and name in self.extra:
            return f'"{name}"'
        raise LensError(f"field {name!r} does not exist on {self.source}")

    def condition(self, node, allow_alias=False):
        """Recursively compile a boolean tree."""
        if not isinstance(node, dict):
            raise LensError("condition must be an object")

        for junction, sql_op in (("all", " AND "), ("any", " OR ")):
            if junction in node:
                children = node[junction]
                if not isinstance(children, list) or not children:
                    raise LensError(f"'{junction}' needs a non-empty list")
                parts = [self.condition(child, allow_alias) for child in children]
                return "(" + sql_op.join(parts) + ")"

        if "not" in node:
            return "NOT (" + self.condition(node["not"], allow_alias) + ")"

        field, op = node.get("field"), node.get("op")
        if op not in OPERATORS:
            raise LensError(f"unknown operator: {op!r}")
        template, arity = OPERATORS[op]
        column = self.col(field, allow_alias)

        if arity == 0:
            return template.format(c=column)

        raw = node.get("value")

        if op in ("in", "not_in"):
            if not isinstance(raw, list) or not raw:
                raise LensError(f"operator {op} needs a non-empty list value")
            if len(raw) > 1000:
                raise LensError(f"operator {op} accepts at most 1000 values")
            values = [resolve_macro(v, self.con) for v in raw]
            self.params.extend(values)
            return template.format(c=column, p=",".join("?" * len(values)))

        if op == "between":
            if not isinstance(raw, list) or len(raw) != 2:
                raise LensError("operator between needs [low, high]")
            self.params.extend(resolve_macro(v, self.con) for v in raw)
            return template.format(c=column, p="?")

        value = resolve_macro(raw, self.con)
        if op in ("contains", "not_contains"):
            value = f"%{_escape_like(value)}%"
        elif op == "starts_with":
            value = f"{_escape_like(value)}%"
        elif op == "ends_with":
            value = f"%{_escape_like(value)}"
        self.params.append(value)
        return template.format(c=column, p="?")


def compile_lens(con, spec):
    """spec (dict) -> (sql, params). Raises LensError on anything suspicious."""
    if not isinstance(spec, dict):
        raise LensError("lens spec must be an object")

    source = spec.get("source")
    if source not in SOURCES:
        raise LensError(f"unknown source: {source!r}. Known: {', '.join(sorted(SOURCES))}")

    group_by = spec.get("group_by") or []
    aggregates = spec.get("aggregates") or []
    if not isinstance(group_by, list) or not isinstance(aggregates, list):
        raise LensError("group_by and aggregates must be lists")

    aliases = []
    for agg in aggregates:
        alias = agg.get("as") or f"{agg.get('fn')}_{agg.get('field') or 'all'}"
        if not IDENT.match(str(alias)):
            raise LensError(f"illegal aggregate alias: {alias!r}")
        aliases.append(alias)

    compiler = Compiler(con, source, extra_fields=aliases)

    # ---- SELECT ----
    select_parts = []
    if group_by:
        for field in group_by:
            select_parts.append(compiler.col(field))
    else:
        for field in (spec.get("columns") or []):
            select_parts.append(compiler.col(field))

    for agg, alias in zip(aggregates, aliases):
        fn = agg.get("fn")
        if fn not in AGGREGATES:
            raise LensError(f"unknown aggregate function: {fn!r}")
        if fn == "count" and not agg.get("field"):
            expr = "COUNT(*)"
        elif fn == "count_distinct":
            expr = f"COUNT(DISTINCT {compiler.col(agg.get('field'))})"
        else:
            expr = f"{fn.upper()}({compiler.col(agg.get('field'))})"
        select_parts.append(f'{expr} AS "{alias}"')

    if not select_parts:
        select_parts = ["*"]

    sql = [f'SELECT {", ".join(select_parts)}', f'FROM "{compiler.table}"']

    # ---- WHERE ----
    where = spec.get("where")
    if where:
        sql.append("WHERE " + compiler.condition(where))

    # ---- GROUP BY / HAVING ----
    if group_by:
        sql.append("GROUP BY " + ", ".join(compiler.col(f) for f in group_by))
        having = spec.get("having")
        if having:
            sql.append("HAVING " + compiler.condition(having, allow_alias=True))
    elif spec.get("having"):
        raise LensError("having requires group_by")

    # ---- ORDER BY ----
    order_by = spec.get("order_by") or []
    if order_by:
        parts = []
        for item in order_by:
            if isinstance(item, str):
                item = {"field": item}
            direction = str(item.get("dir", "asc")).lower()
            if direction not in ("asc", "desc"):
                raise LensError(f"order direction must be asc or desc, got {direction!r}")
            parts.append(f"{compiler.col(item.get('field'), allow_alias=True)} {direction.upper()}")
        sql.append("ORDER BY " + ", ".join(parts))

    # ---- LIMIT / OFFSET ----
    limit = spec.get("limit", DEFAULT_LIMIT)
    try:
        limit = max(1, min(int(limit), MAX_LIMIT))
    except (TypeError, ValueError):
        raise LensError("limit must be an integer")
    offset = spec.get("offset", 0)
    try:
        offset = max(0, int(offset))
    except (TypeError, ValueError):
        raise LensError("offset must be an integer")
    sql.append(f"LIMIT {limit} OFFSET {offset}")

    return "\n".join(sql), compiler.params


def run_lens(con, spec, timeout_steps=50_000_000):
    """Compile and execute, with a hard ceiling on VM steps.

    A saved lens is user-authored logic running against a 460 MB database; an
    accidental cross-product should return an error, not hang the dashboard.
    """
    sql, params = compile_lens(con, spec)

    tripped = {"hit": False}

    def guard():
        tripped["hit"] = True
        return 1  # non-zero aborts the statement

    con.set_progress_handler(guard, timeout_steps)
    try:
        cursor = con.execute(sql, params)
        rows = [dict(row) for row in cursor.fetchall()]
        names = [d[0] for d in cursor.description] if cursor.description else []
    except sqlite3.OperationalError as exc:
        if tripped["hit"]:
            raise LensError("query exceeded its work budget; add filters or a smaller limit")
        raise LensError(f"query failed: {exc}") from exc
    finally:
        con.set_progress_handler(None, 0)

    return {"sql": sql, "params": params, "columns": names, "rows": rows,
            "row_count": len(rows), "truncated": len(rows) >= (spec.get("limit") or DEFAULT_LIMIT)}
