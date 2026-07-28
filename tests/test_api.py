#!/usr/bin/env python3
"""API smoke test against a real scanned tree.

Builds a filesystem, scans it, processes duplicates, then exercises every
endpoint the dashboard calls -- including the generated cleanup script, which
is checked for the safety properties it claims to have.

    python3 tests/test_api.py
"""

import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

FAILURES, CHECKS = [], 0


def check(label, condition, detail=""):
    global CHECKS
    CHECKS += 1
    print(("  PASS  " if condition else "  FAIL  ") + label + ("" if condition else f"  {detail}"))
    if not condition:
        FAILURES.append(label)


def build(base):
    (base / "proj/src").mkdir(parents=True)
    (base / "proj/.venv/site-packages").mkdir(parents=True)
    (base / "backups/old").mkdir(parents=True)
    (base / ".cache").mkdir(parents=True)
    blob = b"SHARED CONTENT " * 20000        # ~300 KB
    (base / "proj/pyproject.toml").write_bytes(b"[project]\nname='p'\n")
    (base / "proj/src/app.py").write_bytes(blob)
    (base / "proj/.venv/site-packages/app.py").write_bytes(blob)
    (base / ".cache/app.py").write_bytes(blob)
    (base / "backups/old/app.py").write_bytes(blob)
    (base / "backups/old/forgotten_plan.md").write_bytes(b"# The original plan\n" * 200)
    (base / "proj/src/creds.py").write_bytes(b'KEY = "AKIAIOSFODNN7EXAMPLE"\n')
    (base / "proj/src/util.py").write_bytes(b"def helper():\n    return 1\n")


def main():
    workdir = Path(tempfile.mkdtemp(prefix="fi-api-"))
    tree = workdir / "home"
    tree.mkdir()
    build(tree)
    db = workdir / "files.db"

    env = dict(os.environ, FI_DB=str(db), FI_REPORTS=str(workdir / "reports"))
    for cmd in (
        [sys.executable, str(ROOT / "scripts/scan.py"), str(tree), "--secrets"],
        [sys.executable, str(ROOT / "scripts/process_duplicates.py")],
        [sys.executable, str(ROOT / "scripts/rescue_ajalugu.py"), "--scan"],
    ):
        result = subprocess.run(cmd, capture_output=True, text=True, env=env)
        if result.returncode:
            print(result.stdout, result.stderr)
            raise SystemExit(f"setup failed: {cmd[1]}")

    os.environ["FI_DB"] = str(db)
    sys.path.insert(0, str(ROOT / "api"))
    import importlib
    import fi_common
    importlib.reload(fi_common)
    fi_common.DB_PATH = db
    import lens as lens_mod
    importlib.reload(lens_mod)
    import main as api_main
    importlib.reload(api_main)
    api_main.DB_PATH = db

    from fastapi.testclient import TestClient
    client = TestClient(api_main.app)

    print("\n[endpoints]")
    with client:
        health = client.get("/api/health").json()
        check("health reports the database", health["exists"] and health["files"] > 0, str(health))

        ov = client.get("/api/overview").json()
        check("overview totals present",
              ov["totals"]["files"] > 0 and ov["totals"]["bytes"] > 0)
        check("overview reports reclaimable, not gross duplicate size",
              0 < ov["duplicates"]["reclaimable"] < ov["duplicates"]["occupied"],
              str(ov["duplicates"]))
        check("overview has category + scope breakdowns",
              len(ov["by_category"]) > 1 and len(ov["by_scope"]) > 1)
        check("overview surfaces secret count", ov["totals"]["secret_files"] >= 1)

        srcs = client.get("/api/sources").json()["sources"]
        check("all registered sources resolve", len(srcs) >= 15, str(len(srcs)))

        target = str(tree / "proj/src/app.py")
        detail = client.get("/api/file", params={"path": target}).json()
        check("file detail returns metadata + history",
              detail["file"]["path"] == target and len(detail["history"]) >= 1)
        check("file detail lists identical copies with roles",
              len(detail["identical_copies"]) == 3
              and any(c["role"] for c in detail["identical_copies"]),
              str(len(detail["identical_copies"])))

        check("missing path 404s", client.get("/api/file", params={"path": "/nope"}).status_code == 404)

        # --- lens engine over HTTP ---
        r = client.post("/api/query", json={
            "source": "v_live_files", "columns": ["path", "size_bytes"],
            "where": {"field": "system_scope", "op": "eq", "value": "user"},
            "order_by": [{"field": "size_bytes", "dir": "desc"}], "limit": 5})
        check("POST /api/query runs a lens", r.status_code == 200 and r.json()["row_count"] > 0)

        bad = client.post("/api/query", json={"source": "sqlite_master", "columns": ["name"]})
        check("hostile source rejected with 400, not 500", bad.status_code == 400, str(bad.status_code))

        bad2 = client.post("/api/query", json={
            "source": "files", "columns": ["path"],
            "where": {"field": "path); DROP TABLE files;--", "op": "eq", "value": "x"}})
        check("injection attempt rejected with 400", bad2.status_code == 400)

        ex = client.post("/api/query/explain", json={
            "source": "v_live_files", "columns": ["path"],
            "where": {"field": "category", "op": "eq", "value": "code"}}).json()
        check("explain returns SQL and a query plan", "SELECT" in ex["sql"] and ex["plan"])

        # --- saved lenses ---
        save = client.post("/api/lenses", json={
            "name": "Big cache files",
            "description": "cache scope over 100 KB",
            "spec": {"source": "v_live_files", "columns": ["path", "size_bytes"],
                     "where": {"all": [
                         {"field": "system_scope", "op": "eq", "value": "cache"},
                         {"field": "size_bytes", "op": "gt", "value": 100000}]},
                     "order_by": [{"field": "size_bytes", "dir": "desc"}], "limit": 50},
            "kind": "view", "pinned": True})
        check("lens saved", save.status_code == 200, save.text)

        listed = client.get("/api/lenses").json()["lenses"]
        check("saved lens appears in the sidebar list",
              any(l["name"] == "Big cache files" for l in listed))

        ran = client.post("/api/lenses/Big cache files/run").json()
        check("saved lens executes", ran["row_count"] >= 1, str(ran["row_count"]))

        broken = client.post("/api/lenses", json={
            "name": "nonsense", "spec": {"source": "v_live_files", "columns": ["nope"]},
            "kind": "view"})
        check("a lens that does not compile is refused at save time",
              broken.status_code == 400, str(broken.status_code))

        # --- rules -> tags ---
        client.post("/api/lenses", json={
            "name": "Secret carriers", "spec": {
                "source": "v_live_files", "columns": ["path"],
                "where": {"field": "contains_secrets", "op": "is_true"}, "limit": 100},
            "kind": "rule", "tag": "has-credentials"})
        applied = client.post("/api/rules/apply", json={}).json()["applied"]
        rule = next((a for a in applied if a.get("tag") == "has-credentials"), None)
        check("rule lens materialises tags", rule and rule["matched"] >= 1, str(applied))

        tagged = client.get("/api/file", params={"path": str(tree / "proj/src/creds.py")}).json()
        check("tag is visible on the file it matched",
              any(t["tag"] == "has-credentials" for t in tagged["tags"]), str(tagged["tags"]))

        norule = client.post("/api/lenses", json={
            "name": "ruleless", "spec": {"source": "files", "columns": ["path"]}, "kind": "rule"})
        check("a rule without a tag is refused", norule.status_code == 400)

        # --- reports ---
        client.post("/api/reports", json={
            "name": "Weekly", "description": "what moved",
            "blocks": [{"title": "Biggest cache files", "type": "table", "lens": "Big cache files"},
                       {"title": "By scope", "type": "table", "spec": {
                           "source": "v_live_files", "group_by": ["system_scope"],
                           "aggregates": [{"fn": "sum", "field": "size_bytes", "as": "bytes"}],
                           "order_by": [{"field": "bytes", "dir": "desc"}]}}]})
        rendered = client.get("/api/reports/Weekly/render").json()
        check("report renders every block",
              len(rendered["blocks"]) == 2 and all("result" in b for b in rendered["blocks"]),
              str([b.get("error") for b in rendered["blocks"]]))

        md = client.get("/api/reports/Weekly/render", params={"fmt": "markdown"}).text
        check("report exports as markdown", md.startswith("# Weekly") and "|" in md)

        # --- duplicates + cleanup script ---
        top = client.post("/api/query", json={
            "source": "v_duplicate_leaderboard", "columns": ["group_id", "master_path"],
            "order_by": [{"field": "reclaimable_bytes", "dir": "desc"}], "limit": 1}).json()
        gid = top["rows"][0]["group_id"]
        group = client.get(f"/api/duplicates/{gid}").json()
        check("group expansion returns master + duplicates with reasons",
              any(m["role"] == "master" for m in group["members"])
              and all(m["reason"] for m in group["members"]))

        script = client.post("/api/cleanup/plan", json={
            "min_reclaimable": 1, "max_groups": 10, "scopes": ["cache", "backup"]}).text

        master_path = next(m["path"] for m in group["members"] if m["role"] == "master")
        check("cleanup script never lists the master for deletion",
              f'check_and_rm "{master_path}"' not in script)
        check("cleanup script keeps the master explicitly",
              f"#   KEEP  {master_path}" in script)
        check("cleanup script re-verifies BLAKE3 before deleting", "b3sum --no-names" in script)
        check("cleanup script is dry-run unless --commit", '"--commit" ] && COMMIT=1' in script
              and 'if [ "$COMMIT" = "1" ]; then rm -f' in script)
        # Parse the actual deletion calls rather than searching the whole text:
        # the master's path legitimately appears in a "# KEEP" comment.
        import re as _re
        targeted = _re.findall(r'^check_and_rm "([^"]+)"', script, _re.M)
        check("cleanup script emits deletion calls at all", len(targeted) >= 1, str(targeted))

        # Scope is a property of the record, not of the path text: a copy under
        # proj/.venv/ is cache scope even though its path says neither
        # ".cache" nor "backups".
        scope_of = {r["path"]: r["system_scope"] for r in client.post("/api/query", json={
            "source": "files", "columns": ["path", "system_scope", "duplicate_status"],
            "where": {"field": "duplicate_status", "op": "not_null"}, "limit": 5000,
        }).json()["rows"]}
        check("cleanup script only targets cache and backup scope",
              all(scope_of.get(p) in ("cache", "backup") for p in targeted),
              str({p: scope_of.get(p) for p in targeted}))
        status_of = {r["path"]: r["duplicate_status"] for r in client.post("/api/query", json={
            "source": "files", "columns": ["path", "duplicate_status"],
            "where": {"field": "duplicate_status", "op": "not_null"}, "limit": 5000,
        }).json()["rows"]}
        check("every targeted file is flagged as a duplicate, never a master",
              all(status_of.get(p) == "duplicate" for p in targeted),
              str({p: status_of.get(p) for p in targeted}))

        # --- ajalugu ---
        rescue = client.get("/api/rescue").json()
        names = [Path(c["source_path"]).name for c in rescue["candidates"]]
        check("rescue queue contains the backup-only file",
              "forgotten_plan.md" in names, str(names))
        check("rescue queue excludes backup copies that still exist live",
              "app.py" not in names, str(names))

        decided = client.post("/api/rescue/decide", json={
            "paths": [str(tree / "backups/old/forgotten_plan.md")], "decision": "rescue"}).json()
        check("rescue decision persists", decided["updated"] == 1)
        check("decided item leaves the pending queue",
              not client.get("/api/rescue").json()["candidates"])

        check("index page is served", client.get("/").status_code == 200)

    print("\n[extraction]")
    dest = workdir / "ajalugu"
    out = subprocess.run(
        [sys.executable, str(ROOT / "scripts/rescue_ajalugu.py"), "--extract", str(dest)],
        capture_output=True, text=True, env=env)
    copied = list(dest.rglob("forgotten_plan.md"))
    check("accepted file was copied into the history folder", len(copied) == 1, out.stdout)
    check("original was left in place, not moved",
          (tree / "backups/old/forgotten_plan.md").exists())
    check("a manifest records what was rescued and from where",
          (dest / "AJALUGU_MANIFEST.txt").exists()
          and "forgotten_plan.md" in (dest / "AJALUGU_MANIFEST.txt").read_text())

    shutil.rmtree(workdir, ignore_errors=True)
    print(f"\n{'=' * 60}")
    if FAILURES:
        print(f"FAILED {len(FAILURES)}/{CHECKS}: {', '.join(FAILURES)}")
        raise SystemExit(1)
    print(f"ALL {CHECKS} CHECKS PASSED")


if __name__ == "__main__":
    main()
