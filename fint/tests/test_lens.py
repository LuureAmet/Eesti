#!/usr/bin/env python3
"""Lens engine tests, with emphasis on what happens when the AST is hostile.

The natural-language query bar means an LLM writes these specs. That makes the
adversarial cases the important ones: the compiler is the only thing standing
between a hallucinated spec and the database.

    python3 tests/test_lens.py
"""

import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "api"))
sys.path.insert(0, str(ROOT / "scripts"))

from lens import LensError, compile_lens, run_lens, describe_source  # noqa: E402
import lens as lens_module  # noqa: E402
from fi_common import BASE_SCHEMA, MIGRATIONS  # noqa: E402

FAILURES, CHECKS = [], 0


def check(label, condition, detail=""):
    global CHECKS
    CHECKS += 1
    print(("  PASS  " if condition else "  FAIL  ") + label + ("" if condition else f"  {detail}"))
    if not condition:
        FAILURES.append(label)


def refuses(label, con, spec, expect_fragment=None):
    global CHECKS
    CHECKS += 1
    try:
        sql, params = compile_lens(con, spec)
        print(f"  FAIL  {label} -- compiled instead of refusing:\n        {sql}")
        FAILURES.append(label)
    except LensError as exc:
        ok = expect_fragment is None or expect_fragment in str(exc)
        print(("  PASS  " if ok else "  FAIL  ") + f"{label} -> {exc}")
        if not ok:
            FAILURES.append(label)


def make_db():
    con = sqlite3.connect(":memory:")
    con.row_factory = sqlite3.Row
    con.executescript(BASE_SCHEMA)
    for batch in MIGRATIONS:
        for statement in batch:
            try:
                con.execute(statement)
            except sqlite3.OperationalError:
                pass
    con.executescript((ROOT / "sql" / "10_views.sql").read_text())
    rows = [
        ("/home/m/proj/a.py", "a.py", 1000, "code", "user", "python", 1, 0),
        ("/home/m/proj/b.py", "b.py", 2_000_000, "code", "user", "python", 1, 0),
        ("/home/m/.cache/c.bin", "c.bin", 5_000_000, "binary", "cache", None, 0, 0),
        ("/home/m/backups/d.md", "d.md", 300, "document", "backup", None, 0, 0),
        ("/home/m/proj/secret.env", "secret.env", 120, "document", "user", None, 1, 1),
    ]
    con.executemany(
        """INSERT INTO files (path, filename, size_bytes, category, system_scope,
                              language, git_repo, contains_secrets, status, mtime, is_symlink)
           VALUES (?,?,?,?,?,?,?,?, 'normal', 1700000000, 0)""",
        rows,
    )
    con.commit()
    return con


def main():
    con = make_db()
    lens_module._COLUMN_CACHE.clear()

    print("\n[valid specs]")

    result = run_lens(con, {
        "source": "v_live_files",
        "columns": ["path", "size_bytes"],
        "where": {"all": [
            {"field": "system_scope", "op": "eq", "value": "user"},
            {"field": "size_bytes", "op": "gte", "value": 1000},
        ]},
        "order_by": [{"field": "size_bytes", "dir": "desc"}],
        "limit": 10,
    })
    # a.py (1000) and b.py (2M) qualify; secret.env is user scope but only 120 bytes.
    check("filtered select returns the right rows", result["row_count"] == 2,
          str([r["path"] for r in result["rows"]]))
    check("values are bound, never inlined", "?" in result["sql"] and "'user'" not in result["sql"])

    grouped = run_lens(con, {
        "source": "v_live_files",
        "group_by": ["category"],
        "aggregates": [
            {"fn": "count", "as": "n"},
            {"fn": "sum", "field": "size_bytes", "as": "bytes"},
        ],
        "having": {"field": "bytes", "op": "gt", "value": 500},
        "order_by": [{"field": "bytes", "dir": "desc"}],
    })
    check("group_by + aggregate + having works",
          grouped["rows"][0]["category"] == "binary" and grouped["rows"][0]["bytes"] == 5_000_000,
          str(grouped["rows"]))

    nested = run_lens(con, {
        "source": "v_live_files",
        "columns": ["path"],
        "where": {"any": [
            {"field": "contains_secrets", "op": "is_true"},
            {"all": [
                {"field": "category", "op": "eq", "value": "code"},
                {"field": "size_bytes", "op": "gt", "value": 1_000_000},
            ]},
        ]},
    })
    check("nested any/all boolean tree", nested["row_count"] == 2, str(nested["rows"]))

    negated = run_lens(con, {
        "source": "v_live_files", "columns": ["path"],
        "where": {"not": {"field": "system_scope", "op": "eq", "value": "user"}},
    })
    check("not-wrapper works", negated["row_count"] == 2)

    macro_sql, macro_params = compile_lens(con, {
        "source": "v_live_files", "columns": ["path"],
        "where": {"field": "size_bytes", "op": "gte", "value": {"$mb": 1}},
    })
    check("$mb macro resolves to bytes", macro_params == [1048576], str(macro_params))

    _, days_params = compile_lens(con, {
        "source": "v_live_files", "columns": ["path"],
        "where": {"field": "mtime", "op": "gte", "value": {"$daysAgo": 7}},
    })
    check("$daysAgo macro resolves to a unix timestamp",
          isinstance(days_params[0], float) and days_params[0] > 1_600_000_000)

    like = run_lens(con, {
        "source": "v_live_files", "columns": ["path"],
        "where": {"field": "path", "op": "contains", "value": "proj"},
    })
    check("contains matches substrings", like["row_count"] == 3)

    escaped = run_lens(con, {
        "source": "v_live_files", "columns": ["path"],
        "where": {"field": "path", "op": "contains", "value": "%"},
    })
    check("a literal % is escaped, not treated as a wildcard", escaped["row_count"] == 0)

    print("\n[hostile specs -- every one of these must be refused]")

    refuses("DROP TABLE smuggled through a column name", con, {
        "source": "files", "columns": ["path"],
        "where": {"field": "path\"; DROP TABLE files; --", "op": "eq", "value": "x"},
    }, "illegal field name")

    refuses("UNION SELECT smuggled through the source", con,
            {"source": "files UNION SELECT * FROM sqlite_master"}, "unknown source")

    refuses("subquery smuggled through order_by", con, {
        "source": "files", "columns": ["path"],
        "order_by": [{"field": "(SELECT 1)", "dir": "asc"}],
    }, "illegal field name")

    refuses("SQL keyword smuggled through order direction", con, {
        "source": "files", "columns": ["path"],
        "order_by": [{"field": "path", "dir": "asc; DELETE FROM files"}],
    }, "asc or desc")

    refuses("aggregate alias used to inject", con, {
        "source": "files", "group_by": ["category"],
        "aggregates": [{"fn": "count", "as": "n\") FROM sqlite_master --"}],
    }, "illegal aggregate alias")

    refuses("unknown aggregate function", con, {
        "source": "files", "group_by": ["category"],
        "aggregates": [{"fn": "load_extension", "field": "path"}],
    }, "unknown aggregate")

    refuses("reading a table outside the registry", con,
            {"source": "sqlite_master", "columns": ["name"]}, "unknown source")

    refuses("column that does not exist on the source", con,
            {"source": "v_live_files", "columns": ["password_hash"]}, "does not exist")

    refuses("unknown operator", con, {
        "source": "files", "columns": ["path"],
        "where": {"field": "path", "op": "glob_exec", "value": "x"},
    }, "unknown operator")

    refuses("having without group_by", con, {
        "source": "files", "columns": ["path"],
        "having": {"field": "path", "op": "eq", "value": "x"},
    }, "having requires group_by")

    refuses("empty IN list", con, {
        "source": "files", "columns": ["path"],
        "where": {"field": "category", "op": "in", "value": []},
    }, "non-empty list")

    refuses("IN list used as a memory bomb", con, {
        "source": "files", "columns": ["path"],
        "where": {"field": "category", "op": "in", "value": ["x"] * 5000},
    }, "at most 1000")

    print("\n[limits]")
    sql, _ = compile_lens(con, {"source": "files", "columns": ["path"], "limit": 999_999})
    check("limit is clamped to MAX_LIMIT", f"LIMIT {lens_module.MAX_LIMIT}" in sql, sql)

    sql, _ = compile_lens(con, {"source": "files", "columns": ["path"]})
    check("a limit is always applied even when omitted", "LIMIT" in sql)

    print("\n[introspection]")
    fields = describe_source(con, "v_live_files")
    check("field picker can enumerate a view", any(f["name"] == "size_bytes" for f in fields),
          str(len(fields)))

    print(f"\n{'=' * 60}")
    if FAILURES:
        print(f"FAILED {len(FAILURES)}/{CHECKS}: {', '.join(FAILURES)}")
        raise SystemExit(1)
    print(f"ALL {CHECKS} CHECKS PASSED")


if __name__ == "__main__":
    main()
