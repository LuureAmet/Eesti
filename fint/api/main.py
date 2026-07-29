#!/usr/bin/env python3
"""File Intelligence API.

Read-only over the scanner's SQLite database, plus a small amount of writable
state of its own (saved lenses, reports, rescue decisions). The distinction
matters: the API can never modify the file inventory. Anything destructive is
emitted as a script for a human to read and run, never executed here.

    pip install fastapi uvicorn
    uvicorn main:app --reload --port 8420      # from the api/ directory

Then open http://127.0.0.1:8420/
"""

from __future__ import annotations

import json
import sqlite3
import sys
from datetime import datetime, UTC
from pathlib import Path

from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse, PlainTextResponse
from pydantic import BaseModel, Field

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

from fi_common import DB_PATH, connect, migrate  # noqa: E402
from lens import (  # noqa: E402
    SOURCES, LensError, compile_lens, describe_source, run_lens,
)

WEB_DIR = Path(__file__).resolve().parent.parent / "web"
VIEWS_SQL = Path(__file__).resolve().parent.parent / "sql" / "10_views.sql"

app = FastAPI(title="File Intelligence", version="3.0")


# ---------------------------------------------------------------------------
# Connections
# ---------------------------------------------------------------------------
def db_ro():
    """Read-only handle. Used for every query path."""
    try:
        return connect(read_only=True)
    except sqlite3.OperationalError as exc:
        raise HTTPException(503, f"database unavailable at {DB_PATH}: {exc}")


def db_rw():
    """Writable handle, only for the API's own tables."""
    return connect()


@app.on_event("startup")
def ensure_ready():
    if not Path(DB_PATH).exists():
        print(f"WARNING: no database at {DB_PATH}. Run scripts/scan.py first.")
        return
    con = db_rw()
    migrate(con)
    if VIEWS_SQL.exists():
        con.executescript(VIEWS_SQL.read_text())
        con.commit()
    con.close()
    print(f"ready: {DB_PATH}")


def rows(con, sql, params=()):
    return [dict(r) for r in con.execute(sql, params).fetchall()]


def one(con, sql, params=()):
    row = con.execute(sql, params).fetchone()
    return dict(row) if row else None


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class LensSpec(BaseModel):
    source: str
    columns: list[str] | None = None
    where: dict | None = None
    group_by: list[str] | None = None
    aggregates: list[dict] | None = None
    having: dict | None = None
    order_by: list[dict | str] | None = None
    limit: int | None = 200
    offset: int | None = 0


class SavedLens(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    description: str | None = None
    spec: LensSpec
    kind: str = "view"          # view | rule | metric
    tag: str | None = None      # required when kind == 'rule'
    pinned: bool = False


class SavedReport(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    description: str | None = None
    blocks: list[dict]


# ---------------------------------------------------------------------------
# Meta
# ---------------------------------------------------------------------------
@app.get("/api/health")
def health():
    exists = Path(DB_PATH).exists()
    payload = {"database": str(DB_PATH), "exists": exists}
    if exists:
        con = db_ro()
        payload["size_bytes"] = Path(DB_PATH).stat().st_size
        payload["files"] = one(con, "SELECT COUNT(*) n FROM files")["n"]
        payload["last_scan"] = one(
            con, "SELECT scan_id, started, finished FROM scan_statistics"
                 " ORDER BY started DESC LIMIT 1")
        con.close()
    return payload


@app.get("/api/sources")
def sources():
    """Everything the lens builder's pickers need, in one call."""
    con = db_ro()
    out = []
    for name in sorted(SOURCES):
        try:
            fields = describe_source(con, name)
        except Exception:
            continue  # a view that has not been created yet
        out.append({"name": name, "fields": fields, "field_count": len(fields)})
    con.close()
    return {"sources": out}


# ---------------------------------------------------------------------------
# View 1: Command Center
# ---------------------------------------------------------------------------
@app.get("/api/overview")
def overview():
    con = db_ro()
    scan = one(con, "SELECT * FROM scan_statistics ORDER BY started DESC LIMIT 1") or {}

    totals = one(con, """
        SELECT COUNT(*) files, COALESCE(SUM(size_bytes),0) bytes,
               COALESCE(SUM(contains_secrets),0) secret_files
        FROM files WHERE status <> 'missing'""")

    dup = one(con, """
        SELECT COUNT(*) groups,
               COALESCE(SUM(reclaimable_bytes),0) reclaimable,
               COALESCE(SUM(total_bytes),0) occupied
        FROM duplicate_groups""")

    payload = {
        "scan": scan,
        "totals": totals,
        "duplicates": dup,
        "by_category": rows(con, """
            SELECT category, COUNT(*) files, SUM(size_bytes) bytes
            FROM files WHERE status <> 'missing'
            GROUP BY category ORDER BY bytes DESC"""),
        "by_scope": rows(con, """
            SELECT system_scope scope, COUNT(*) files, SUM(size_bytes) bytes
            FROM files WHERE status <> 'missing'
            GROUP BY system_scope ORDER BY bytes DESC"""),
        "timeline": rows(con, """
            SELECT scan_id, started, total_files, total_size_bytes,
                   new_files, changed_files, deleted_files, duplicate_bytes
            FROM scan_statistics ORDER BY started ASC LIMIT 200"""),
        "largest": rows(con, """
            SELECT path, size_bytes, category, system_scope, duplicate_status
            FROM files
            WHERE status <> 'missing' AND system_scope <> 'system' AND is_symlink = 0
            ORDER BY size_bytes DESC LIMIT 15"""),
        "recent_activity": rows(con, """
            SELECT day_bucket AS day, event, COUNT(*) n
            FROM v_recent_changes
            WHERE timestamp >= datetime('now','-14 days')
            GROUP BY day, event ORDER BY day"""),
    }
    con.close()
    return payload


# ---------------------------------------------------------------------------
# View 2: Investigator
# ---------------------------------------------------------------------------
@app.get("/api/file")
def file_detail(path: str = Query(..., min_length=1)):
    """Everything known about one path -- the slide-out drawer."""
    con = db_ro()
    record = one(con, "SELECT * FROM files WHERE path = ?", (path,))
    if not record:
        con.close()
        raise HTTPException(404, "path not indexed")

    history = rows(con, """
        SELECT event, old_value, new_value, timestamp, scan_id
        FROM file_events WHERE path = ? ORDER BY timestamp DESC LIMIT 200""", (path,))

    siblings = []
    if record.get("blake3"):
        siblings = rows(con, """
            SELECT f.path, f.size_bytes, f.system_scope, dm.role, dm.score, dm.reason
            FROM files f
            LEFT JOIN duplicate_members dm ON dm.file_id = f.id
            WHERE f.blake3 = ? AND f.path <> ?
            ORDER BY dm.score DESC LIMIT 100""", (record["blake3"], path))

    tags = rows(con, "SELECT tag, source, created FROM file_tags WHERE path = ?", (path,))
    con.close()
    return {"file": record, "history": history, "identical_copies": siblings, "tags": tags}


# ---------------------------------------------------------------------------
# View 3: Cleanup
# ---------------------------------------------------------------------------
@app.get("/api/duplicates/{group_id}")
def duplicate_group(group_id: int):
    con = db_ro()
    group = one(con, "SELECT * FROM v_duplicate_leaderboard WHERE group_id = ?", (group_id,))
    if not group:
        con.close()
        raise HTTPException(404, "no such group")
    members = rows(con, """
        SELECT f.id, f.path, f.size_bytes, f.mtime, f.system_scope, f.project_name,
               dm.role, dm.score, dm.reason
        FROM duplicate_members dm JOIN files f ON f.id = dm.file_id
        WHERE dm.group_id = ? ORDER BY dm.score DESC""", (group_id,))
    con.close()
    return {"group": group, "members": members}


class CleanupRequest(BaseModel):
    group_ids: list[int] | None = None
    min_reclaimable: int = 10 * 1024 * 1024
    max_groups: int = 500
    scopes: list[str] = ["cache", "backup"]


@app.post("/api/cleanup/plan", response_class=PlainTextResponse)
def cleanup_plan(req: CleanupRequest):
    """Emit a shell script. This endpoint never deletes anything itself.

    Three invariants are enforced in the generated script rather than trusted:
      * the master of each group is never listed for deletion,
      * every deletion is guarded by a live BLAKE3 re-check, so a file that
        changed since the scan is skipped rather than destroyed,
      * the script defaults to dry-run and requires an explicit --commit.
    """
    con = db_ro()
    if req.group_ids:
        placeholders = ",".join("?" * len(req.group_ids))
        groups = rows(con, f"""
            SELECT * FROM v_duplicate_leaderboard WHERE group_id IN ({placeholders})
            ORDER BY reclaimable_bytes DESC""", req.group_ids)
    else:
        groups = rows(con, """
            SELECT * FROM v_duplicate_leaderboard
            WHERE reclaimable_bytes >= ?
            ORDER BY reclaimable_bytes DESC LIMIT ?""",
            (req.min_reclaimable, min(req.max_groups, 2000)))

    lines = [
        "#!/usr/bin/env bash",
        "# Generated by File Intelligence. READ BEFORE RUNNING.",
        f"# Generated: {datetime.now(UTC).isoformat()}",
        "#",
        "# Dry run by default. Pass --commit to actually delete.",
        "set -uo pipefail",
        'COMMIT=0; [ "${1:-}" = "--commit" ] && COMMIT=1',
        'if [ "$COMMIT" = "0" ]; then echo "DRY RUN -- pass --commit to delete"; fi',
        "freed=0; skipped=0; deleted=0",
        "",
        "check_and_rm() {  # $1=path  $2=expected blake3",
        '  if [ ! -f "$1" ]; then echo "SKIP missing: $1"; skipped=$((skipped+1)); return; fi',
        '  actual=$(b3sum --no-names "$1" 2>/dev/null | tr -d "[:space:]")',
        '  if [ "$actual" != "$2" ]; then',
        '    echo "SKIP changed since scan: $1"; skipped=$((skipped+1)); return',
        "  fi",
        '  size=$(stat -c %s "$1")',
        '  if [ "$COMMIT" = "1" ]; then rm -f -- "$1"; else echo "would delete: $1"; fi',
        "  freed=$((freed+size)); deleted=$((deleted+1))",
        "}",
        "",
    ]

    total, count = 0, 0
    for group in groups:
        members = rows(con, """
            SELECT f.path, f.blake3, f.size_bytes, f.system_scope, dm.role
            FROM duplicate_members dm JOIN files f ON f.id = dm.file_id
            WHERE dm.group_id = ? ORDER BY dm.score DESC""", (group["group_id"],))
        victims = [m for m in members
                   if m["role"] == "duplicate" and m["system_scope"] in req.scopes]
        if not victims:
            continue
        master = next((m for m in members if m["role"] == "master"), None)
        lines.append(f"# group {group['group_id']}  reclaim "
                     f"{group['reclaimable_bytes'] or 0:,} B  copies={group['copies']}")
        if master:
            lines.append(f"#   KEEP  {master['path']}")
        for victim in victims:
            lines.append(f'check_and_rm "{victim["path"]}" "{victim["blake3"]}"')
            total += victim["size_bytes"] or 0
            count += 1
        lines.append("")

    lines += [
        'echo ""',
        'echo "deleted: $deleted   skipped: $skipped   freed: $((freed/1024/1024)) MB"',
        f'# planned: {count} files, ~{total / 1024 / 1024:.1f} MB',
    ]
    con.close()
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# The lens engine
# ---------------------------------------------------------------------------
@app.post("/api/query")
def query(spec: LensSpec):
    """Run an ad-hoc lens. This is what the builder calls on every edit."""
    con = db_ro()
    try:
        return run_lens(con, spec.model_dump(exclude_none=True))
    except LensError as exc:
        raise HTTPException(400, str(exc))
    finally:
        con.close()


@app.post("/api/query/explain")
def explain(spec: LensSpec):
    """Show the SQL a spec compiles to, without running it."""
    con = db_ro()
    try:
        sql, params = compile_lens(con, spec.model_dump(exclude_none=True))
        plan = rows(con, f"EXPLAIN QUERY PLAN {sql}", params)
        return {"sql": sql, "params": params, "plan": plan}
    except LensError as exc:
        raise HTTPException(400, str(exc))
    finally:
        con.close()


@app.get("/api/lenses")
def list_lenses():
    con = db_ro()
    out = rows(con, "SELECT * FROM lenses ORDER BY pinned DESC, name")
    con.close()
    for item in out:
        item["spec"] = json.loads(item["spec"])
    return {"lenses": out}


@app.post("/api/lenses")
def save_lens(lens: SavedLens):
    if lens.kind == "rule" and not lens.tag:
        raise HTTPException(400, "a lens of kind 'rule' needs a tag")
    con_ro = db_ro()
    try:
        compile_lens(con_ro, lens.spec.model_dump(exclude_none=True))
    except LensError as exc:
        raise HTTPException(400, f"spec does not compile: {exc}")
    finally:
        con_ro.close()

    now = datetime.now(UTC).isoformat()
    con = db_rw()
    con.execute("""
        INSERT INTO lenses (name, description, spec, kind, tag, pinned, created, updated)
        VALUES (?,?,?,?,?,?,?,?)
        ON CONFLICT(name) DO UPDATE SET
            description=excluded.description, spec=excluded.spec, kind=excluded.kind,
            tag=excluded.tag, pinned=excluded.pinned, updated=excluded.updated""",
        (lens.name, lens.description, json.dumps(lens.spec.model_dump(exclude_none=True)),
         lens.kind, lens.tag, int(lens.pinned), now, now))
    con.commit()
    con.close()
    return {"saved": lens.name}


@app.delete("/api/lenses/{name}")
def delete_lens(name: str):
    con = db_rw()
    cur = con.execute("DELETE FROM lenses WHERE name = ?", (name,))
    con.commit()
    con.close()
    if not cur.rowcount:
        raise HTTPException(404, "no such lens")
    return {"deleted": name}


@app.post("/api/lenses/{name}/run")
def run_saved_lens(name: str, limit: int | None = None, offset: int | None = None):
    con = db_ro()
    record = one(con, "SELECT * FROM lenses WHERE name = ?", (name,))
    if not record:
        con.close()
        raise HTTPException(404, "no such lens")
    spec = json.loads(record["spec"])
    if limit is not None:
        spec["limit"] = limit
    if offset is not None:
        spec["offset"] = offset
    try:
        result = run_lens(con, spec)
        result["lens"] = {k: record[k] for k in ("name", "description", "kind", "tag")}
        return result
    except LensError as exc:
        raise HTTPException(400, str(exc))
    finally:
        con.close()


@app.post("/api/rules/apply")
def apply_rules():
    """Run every kind='rule' lens and materialise its matches into file_tags.

    This is the "logic you want to apply and find" turned into durable state:
    a rule authored once keeps labelling files on every future scan.
    """
    con_ro = db_ro()
    rules = rows(con_ro, "SELECT name, spec, tag FROM lenses WHERE kind = 'rule'")
    applied = []
    con = db_rw()
    now = datetime.now(UTC).isoformat()
    for rule in rules:
        spec = json.loads(rule["spec"])
        spec["columns"] = ["path"]
        spec.pop("group_by", None)
        spec.pop("aggregates", None)
        spec.pop("having", None)
        spec["limit"] = 5000
        try:
            result = run_lens(con_ro, spec)
        except LensError as exc:
            applied.append({"rule": rule["name"], "error": str(exc)})
            continue
        con.execute("DELETE FROM file_tags WHERE tag = ? AND source = 'rule'", (rule["tag"],))
        con.executemany(
            "INSERT INTO file_tags (path, tag, source, created) VALUES (?,?, 'rule', ?)",
            [(r["path"], rule["tag"], now) for r in result["rows"]])
        applied.append({"rule": rule["name"], "tag": rule["tag"],
                        "matched": result["row_count"],
                        "truncated": result["truncated"]})
    con.commit()
    con.close()
    con_ro.close()
    return {"applied": applied}


# ---------------------------------------------------------------------------
# Reports: ordered stacks of lens-backed blocks
# ---------------------------------------------------------------------------
@app.get("/api/reports")
def list_reports():
    con = db_ro()
    out = rows(con, "SELECT * FROM reports ORDER BY name")
    con.close()
    for item in out:
        item["blocks"] = json.loads(item["blocks"])
    return {"reports": out}


@app.post("/api/reports")
def save_report(report: SavedReport):
    now = datetime.now(UTC).isoformat()
    con = db_rw()
    con.execute("""
        INSERT INTO reports (name, description, blocks, created, updated)
        VALUES (?,?,?,?,?)
        ON CONFLICT(name) DO UPDATE SET
            description=excluded.description, blocks=excluded.blocks,
            updated=excluded.updated""",
        (report.name, report.description, json.dumps(report.blocks), now, now))
    con.commit()
    con.close()
    return {"saved": report.name}


@app.get("/api/reports/{name}/render")
def render_report(name: str, fmt: str = "json"):
    """Execute every block and return the assembled result."""
    con = db_ro()
    record = one(con, "SELECT * FROM reports WHERE name = ?", (name,))
    if not record:
        con.close()
        raise HTTPException(404, "no such report")

    blocks = json.loads(record["blocks"])
    rendered = []
    for block in blocks:
        entry = {"title": block.get("title"), "type": block.get("type", "table")}
        spec = block.get("spec")
        if not spec and block.get("lens"):
            saved = one(con, "SELECT spec FROM lenses WHERE name = ?", (block["lens"],))
            spec = json.loads(saved["spec"]) if saved else None
        if not spec:
            entry["error"] = "block has neither an inline spec nor a known lens"
        else:
            try:
                entry["result"] = run_lens(con, spec)
            except LensError as exc:
                entry["error"] = str(exc)
        rendered.append(entry)
    con.close()

    if fmt == "markdown":
        return PlainTextResponse(_report_markdown(record, rendered))
    return {"report": {"name": record["name"], "description": record["description"]},
            "blocks": rendered}


def _report_markdown(record, rendered):
    out = [f"# {record['name']}", ""]
    if record["description"]:
        out += [record["description"], ""]
    out += [f"_Generated {datetime.now(UTC).isoformat()}_", ""]
    for block in rendered:
        out.append(f"## {block.get('title') or '(untitled)'}")
        out.append("")
        if block.get("error"):
            out += [f"> error: {block['error']}", ""]
            continue
        result = block["result"]
        if not result["rows"]:
            out += ["_no rows_", ""]
            continue
        cols = result["columns"]
        out.append("| " + " | ".join(cols) + " |")
        out.append("|" + "|".join(["---"] * len(cols)) + "|")
        for row in result["rows"][:100]:
            out.append("| " + " | ".join(str(row.get(c, "")) for c in cols) + " |")
        out.append("")
    return "\n".join(out)


# ---------------------------------------------------------------------------
# Ajalugu review queue
# ---------------------------------------------------------------------------
@app.get("/api/rescue")
def rescue_queue(decision: str = "pending", limit: int = 200):
    con = db_ro()
    out = rows(con, """
        SELECT * FROM rescue_candidates WHERE decision = ?
        ORDER BY score DESC, size_bytes DESC LIMIT ?""", (decision, min(limit, 2000)))
    counts = rows(con, "SELECT decision, COUNT(*) n FROM rescue_candidates GROUP BY decision")
    con.close()
    return {"candidates": out, "counts": counts}


class RescueDecision(BaseModel):
    paths: list[str]
    decision: str  # rescue | skip | pending


@app.post("/api/rescue/decide")
def rescue_decide(body: RescueDecision):
    if body.decision not in ("rescue", "skip", "pending"):
        raise HTTPException(400, "decision must be rescue, skip or pending")
    con = db_rw()
    now = datetime.now(UTC).isoformat()
    con.executemany(
        "UPDATE rescue_candidates SET decision=?, reviewed_at=? WHERE source_path=?",
        [(body.decision, now, p) for p in body.paths])
    con.commit()
    con.close()
    return {"updated": len(body.paths), "decision": body.decision}


# ---------------------------------------------------------------------------
# Static UI
# ---------------------------------------------------------------------------
@app.get("/")
def index():
    target = WEB_DIR / "index.html"
    if not target.exists():
        raise HTTPException(404, "web/index.html not found")
    return FileResponse(target)
