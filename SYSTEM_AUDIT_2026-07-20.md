# SYSTEM AUDIT + MASTER MAP — 2026-07-20

**Author:** Fable (Claude Code remote session, via ArvutiMinisteerium MCP)
**Scope:** Deep audit of the VPS (`ubuntu`, user `margus`), the ai-stack project, docs/, lehed/ (pages), plans, and live system state.
**Purpose:** One document that remaps everything, so shared memory (MIND_SUMMARY / ai-mailbox agents) can load a single file and know the whole system.
**Note on secrets:** Per owner's instruction this is a transparent open education environment — temporary keys are not treated as critical, but exposure findings are still listed for completeness.

---

## 1. WHAT THIS SYSTEM IS (30 seconds)

A single VPS run by one person (Margus) + a team of AI agents, forming a **personal intelligence platform**:

- **One AI gateway** — LiteLLM :4000 (localhost only), routing to Ollama (10 local models, free) and OpenRouter (11+ cloud models). Fallback permanently OFF (invariant: never silent model substitution).
- **One web entry** — nginx :80 (partially; several services still bypass it).
- **One Postgres container** — 4 databases (eluarhitektuur, litellm, ai_keycloak, core).
- **One backend** — core-api :8090 (FastAPI-style, single `main.py`): identity, message, rule, relation, observation, artifact.
- **18+ portal sites** in `lehed/` sharing `_shared/*.js` (identity, layers, account, rooms).
- **AI team with roles** (see §6): Fable = architect, opencode = documentalist, Qwen local = worker, GPT-mini = translator, n8n = kratt (automation).
- **File-first memory**: state lives in files + git, never in chat history.

Core principles (docs/PRINCIPLES.md, VISION.md): build only on trigger, every AI answer traceable to its model and cost, nothing irreplaceable, cheap models filter / expensive models reason.

---

## 2. HOST / INFRA SNAPSHOT (live, 2026-07-20 13:11)

| Item | Value |
|---|---|
| Host | Ubuntu VPS, public IP 217.160.49.139 |
| Disk | 232 GB, 84 GB used (37%) — healthy |
| RAM | 7.7 GiB, ~3.3 GiB used; **swap 3.3 GiB used of 8 GiB** — mild memory pressure |
| Load | 0.06 — idle |
| Uptime | 8 h (rebooted this morning) |
| Firewall | ufw active (22, 80, 443, 2222, 3000, 60001-3, dns) — **but Docker bypasses ufw** (see §8) |
| Backups | pg-backup.sh daily 04:30 (all 4 DBs since 2026-07-19); backups/ + sql_backups/ dirs; ai-stack-docs snapshot 07-18 |

### Docker containers (all Up ~8h)

| Container | Port binding | Exposure |
|---|---|---|
| core-api | 0.0.0.0:8090 | **PUBLIC** |
| root-n8n-1 | 0.0.0.0:5678 | **PUBLIC** |
| open-webui | 0.0.0.0:3000 | **PUBLIC** (intended) |
| ollama | 0.0.0.0:11434 | **PUBLIC, no auth** (known, HARDENING_TODO) |
| web-test | 0.0.0.0:8080 | **PUBLIC** |
| litellm | 127.0.0.1:4000 | local only ✓ |
| eluarhitektuur-db (pg16) | 127.0.0.1:5433 | local only ✓ |
| keycloak | 127.0.0.1:8180 | local only ✓ |
| ai-keycloak | 127.0.0.1:8280 | local only ✓ (inert, provisioned ahead of need) |

### Non-Docker listeners

| Port | What | Note |
|---|---|---|
| 22 | sshd | **PermitRootLogin yes; PasswordAuthentication effectively YES** (50-cloud-init.conf wins over 60-cloudimg) |
| 25 | SMTP (postfix active) | open to world; check if relay is closed |
| 80 | nginx | default site: /files, portaalid |
| 8000 | mcp-lab `main.py` (0.0.0.0) | **the MCP server this session uses; also tunneled via ngrok `https://gumminess-shakable-spendable.ngrok-free.dev`** — full run_command access behind that URL |
| 5432 | native Postgres (localhost) | duplicate of Docker pg — candidate for removal ("never accumulate" principle) |
| 6379 | redis (localhost) | fine |
| 4040 | ngrok admin (localhost) | fine |
| fail2ban | active ✓ | |

### Cron (user margus)

- `*/5min` aimail-sync.sh (mailbox file/DB sync)
- `04:30` pg-backup.sh (all 4 DBs)
- `*/5min` aimail-courier.py (LLM postman; toggle `~/ai-mailbox/system/courier.on`)

---

## 3. DOCS MAP — `~/ai-stack/docs/` (the rulebook, ~42 files)

Read order for any new AI: **SYSTEM_OVERVIEW → AI_CORE_RULES → FILE_MAP → PLAAN → SITES**.

| Cluster | Files | Role |
|---|---|---|
| **Identity / tie-breaker** | VISION.md, PRINCIPLES.md | What this is, binding principles; VISION wins conflicts |
| **Current state** | SYSTEM_OVERVIEW.md, SYSTEM_SPEC.md, CURRENT_STATE, PROJECT_ENVIRONMENT_LOG.md, SERVER_INDEX.md, PROJECT_TREE.md | Architecture as-built |
| **Rules for AIs** | AI_CORE_RULES.md, AGENT_RULES.md, SAFETY_RULES.md (model levels A/B/C/D), DELEGATE_PROMPTS.md, EHITAJALE.md, LOGGING_STANDARD.md | Who may touch what; per-model access levels |
| **Plans** | PLAAN.md (phases A-D), PLAAN-aimail-2026-07-19.md, ROADMAP_WEB.md, EDASISED_SEEMNED.md (7 "seeds" designed-not-built), HARDENING_TODO.md | Build order + triggers |
| **Web/site layer** | SITES.md (master catalog), SITE_SPEC.md (template), MASTER_SITE_SPECS.md, WEB_FRONTENDS.md, WEB_HOSTING.md, VISIBILITY_CORE.md, CHAT_LAYER.md, ARTIFACT.md, IDENTITY_LAYERS.md | Cross-site shared patterns |
| **Infra detail** | AI_STACK.md, MODEL_ROUTING.md, DATABASES.md, BACKUPS.md, COMMANDS.md, TECH_CORNERSTONES.md | Service-level detail |
| **History / decisions** | DECISIONS.md (37 KB), MUUDATUSED.log, archive/ | Why things are the way they are |
| **Security** | SECURITY_NOTES.md, HARDENING_TODO.md | Known gaps (mostly matching §8 below) |
| **Human-readable twins** | forhuman/ | Each TECH doc is meant to get a `-forhuman` twin (in progress) |

Key plan facts:
- **Phase A (now, 2026-07):** fill 15 stub portals with content.json + index.html (cheap models); ramm SVG mockup (Fable).
- **Phase B (2026-08):** real content — sydameke sliders, haaletus V1, highland real pub site, krattiina.
- **Phase C (2026-08/09):** HTTPS certbot, backup cron (done ✓), health dashboard, n8n monitoring, 127.0.0.1 rebinds.
- **Phase D (2026-09/10):** pgvector, WebRTC, consent-recording, P2P — each only on trigger.
- **Seeds (EDASISED_SEEMNED):** consent-save message chain, WebRTC video, user-extendable page slots, thumbnail machine, auto-layers from hashtags, per-site story rivers, kriminaalpolitsei registrations WITHOUT Keycloak.

---

## 4. PAGES MAP — `~/ai-stack/lehed/` (28 entries)

Shared infrastructure:
- **`_shared/`** — identity.js, kihid.js (layers), konto.js (account), room.js (chat rooms), artifact.js. Loaded by every portal. Critical files (FILE_MAP ★★★★★).
- **`_starter/`** — 3-layer starter template: plain HTML skeleton (no-JS semantic layer, binding rule for ALL sites), htmx enhancement (vendored), retheme-able CSS.
- **`index.html`** — portal gateway (18 portals).

| Portal | Status | One line |
|---|---|---|
| **sydameke** | **LIVE** (Stage B, core-api :8090) | Maikeneration — age-as-choices meet portal; sliders, temp profiles, feed+chat, glass view |
| **haaletus** | **LIVE** (V0) | Verifiable voting — glass ballot box, artifact chains; "home of all votings" |
| **uudised** | **LIVE** | News river (`news:pere`) — write once, appears everywhere |
| **highland** | live-ish | Highlander pub (highlanderpub.ee) community site |
| **varamu** | built | Artifact/object commons (extracted from ramm's object model) |
| **ramm** | mockup | Mõisa Portaal — 2.5D SVG manor restoration studio, role lenses |
| **teemad** | content | 8 domains × 8 pages aggregator (valimised, info-sõda, ai-stack, ajalooline mälu, teadvuse vabadus, IT-infra, meedia-vabadus, KGB-planetaarne); symlinked into mind/ |
| **revelatsioonid** | content | 4 perspectives (EKSTRATOP, MIDDLE, OLEMUS-VÕIMALUS, KEEL-KULTUUR) + THIRD-TEMPLE analysis |
| **aimail / aimailbox** | live system | Web face of the ai-mailbox courier system |
| **logreader / logreaders** | tooling | Terminal-log browsing pages |
| aikeskus | stub | AI Cooperative Centre Forum — each AI picks its own subdomain (idea predates 2011) |
| kingshire | stub | kingshire.ee (registered) — realm-themed, per-section membership |
| kriminaalpolitsei | stub | kriminaalpolitsei.ee — dual criminal/police theme; needs non-affiliation disclaimer |
| linnapea | stub | linnapea.ee — open-source city administration; "city as open repository" |
| ministeerium | stub | arvutiministeerium.ee — umbrella tech site (namesake of the MCP server) |
| sihtasutus | stub | sihtasutus.ee — neutral formal mother organization |
| seadus | stub | Two-sided legal agreements; "right, not just lawful" |
| koduteenus | stub | Work/service agreements; "promote your competitors" principle |
| startupideas | stub | Ideas meet investors; hands off to seadus/koduteenus |
| jumalale | stub | jumalale.ee — working through religious disagreement |
| patt | stub | patt.ee — least specified |
| techn0bs | stub | Small tech site; device scanner exists |
| krattiina | stub | Kratt folklore + Tiina — computing through nature/folklore |

Cross-site patterns (build once, in `_shared`/docs, not per site): `.:.` webring icon, root theme system, federated identity facets, evolving mythic footers, inter-portal links, **no-JS semantic skeleton under everything** (binding).

Each real site folder has its own `SITE_SPEC.md`; `docs/SITE_SPEC.md` is the blank template. Domains registered: kingshire.ee; none pointed at the server yet — everything served by IP.

---

## 5. DATA LAYER

- **eluarhitektuur-db** (Postgres 16, :5433): databases `eluarhitektuur` (app + keycloak schema), `litellm` (spend/request audit — every AI request logged with model, tokens, cost), `ai_keycloak` (inert), `core` (7 tables: identity, message, rule, relation, observation, artifact, +1).
- **mcp_readonly** role: SELECT-only across DBs — Claude Code's data-inspection path (deliberately separate from the AI-traffic path).
- **Native Postgres :5432 also running** — duplicate of the Docker one; violates "never accumulate" (same class of issue as the old Ollama systemd/Docker conflict). Candidate: confirm nothing uses it, then disable.
- Backups: daily pg_dump of all 4 DBs since 07-19 (gap noted in BACKUPS.md now closed).

## 6. AI TEAM + SHARED MEMORY

| Agent | Model | Role | Level |
|---|---|---|---|
| Fable | Claude 5 | Architect — decides, designs, hard logic | A |
| opencode | DeepSeek | Documentalist — audits, standards, refactor | B |
| Qwen3.5 | local Ollama | Worker — content.json, simple code | C |
| GPT-4o-mini | cloud | Translator — Estonian/English, forhuman | C |
| n8n | — | Kratt — scheduled automation | D |

Shared memory surfaces:
- **`ai-stack/MIND_SUMMARY/`** — condensed system memory (SYSTEM_OVERVIEW.md, overview.md) — *this audit is the new candidate master input*.
- **`~/ai-mailbox/`** — inter-AI message passing: inbox/<agent>/ dirs (opencode, hy3-free, fable5, aikeskus, BROADCAST, outbox), online (API+DB) + offline (files) channels, sync + LLM courier crons every 5 min. PROTOCOL.md = spec. Append-only.
- **`~/mind/`** — thought collection; `mind/teemad` symlinks into lehed/teemad.
- **`~/terminal_logs/`** — every AI session logged, per-model folders (LOGGING_STANDARD.md).
- **`ai-stack/audit/`** — audit artifacts (this file's server copy lives here).

## 7. GIT STATE

- `ai-stack` repo: active daily commits (last: haaletus counter-statistics + aimail courier). Untracked: `MIND_SUMMARY/`, `audit/`; modified: `docs/SITES.md` — worth committing.
- `LuureAmet/Eesti` (GitHub): near-empty (README only) — this audit is its first real content, branch `claude/server-system-audit-dot2or`.

---

## 8. SECURITY FINDINGS (prioritized; "open education server" context acknowledged)

1. **SSH: root login + password auth enabled.** `PermitRootLogin yes` and `PasswordAuthentication yes` (50-cloud-init.conf wins lexical order over 60-cloudimg's `no`). With port 22 open to the world this is the #1 practical risk — fail2ban helps but key-only auth + `PermitRootLogin no` is a 5-minute fix that changes nothing about openness of the *content*.
2. **Docker publishes past ufw.** ufw only allows 22/80/443/2222/3000/6000x, but Docker's iptables rules expose :8090 (core-api), :5678 (n8n), :11434 (Ollama, no auth), :8080 (web-test) to the internet anyway. HARDENING_TODO already plans 127.0.0.1 rebinds + nginx fronting — this audit confirms it's the right fix and still pending. Ollama especially: anyone can run inference (resource drain) or pull/delete models.
3. **mcp-lab :8000 on 0.0.0.0 + public ngrok tunnel.** This MCP server executes arbitrary shell commands as `margus`. It's the front door for this session (useful!), but it's also reachable at a public ngrok URL — whoever can hit that URL (and pass whatever auth mcp-lab does or doesn't do) owns the account. Recommendation: bind to 127.0.0.1 (ngrok can still reach it locally), verify auth on the tunnel (ngrok basic auth or an mcp-lab token), and treat the ngrok URL itself as a credential.
4. **n8n :5678 public** — check whether owner auth is enabled; n8n holds credentials for whatever it automates.
5. **SMTP :25 open** — postfix active; confirm it's not an open relay (`smtpd_recipient_restrictions`), otherwise it will end up on blocklists.
6. **Swap 3.3 GiB in use** — not urgent at load 0.06, but Ollama model loads will contend; consider which local models actually earn their residency.
7. Duplicate native Postgres :5432 (see §5) — surface-area and confusion cost, not an exposure per se.

Not treated as findings per owner instruction: presence of temporary API keys in CREDENTIALS.md / .env files (gitignored, chmod 600 — pattern is already correct).

## 9. GAPS BETWEEN PLANS AND REALITY

- **HTTPS**: planned (Phase C), not done — everything is plain HTTP on a raw IP.
- **nginx as single web gateway**: stated as invariant, but 5 services still bypass it.
- **Health endpoint**: core-api has no `/health` (returns 404) — PLAAN's health dashboard needs one first.
- **litellm/ai_keycloak backup gap**: closed 07-19 ✓ (docs BACKUPS.md may still say otherwise — update it).
- **forhuman twins**: AI_CORE_RULES and PLAAN still lack their forhuman versions (flagged in PLAAN §1).
- **SITE_SPEC.md** (top-level): still the unfilled template; "first real site" decision still open — sydameke is de facto first.
- **ai-keycloak**: still inert; EDASISED_SEEMNED §7 already concludes kriminaalpolitsei does NOT need it — candidate for removal if no other trigger appears.

## 10. RECOMMENDED NEXT STEPS (smallest first)

1. SSH hardening (root off, keys only) — 5 min, no functional change.
2. Rebind ollama/core-api/n8n/web-test to 127.0.0.1 and front through nginx :80 paths — already planned in HARDENING_TODO/Phase C.
3. Bind mcp-lab to 127.0.0.1 + confirm tunnel auth.
4. Add `/health` to core-api (one route), then the n8n monitor from Phase C.
5. Commit `MIND_SUMMARY/`, `audit/`, and this audit into ai-stack git.
6. Point MIND_SUMMARY at this file as the master map; regenerate its two summaries from it.
7. Decide native-Postgres and ai-keycloak removal (both "accumulation" violations with no trigger).

---

*Server copy: `~/ai-stack/audit/SYSTEM_AUDIT-2026-07-20.md` · Repo copy: `LuureAmet/Eesti` branch `claude/server-system-audit-dot2or`.*
