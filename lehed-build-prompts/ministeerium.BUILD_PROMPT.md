# BUILD PROMPT — Arvutiministeerium (ministeerium)
> Paste with SITE_SPEC.md into a capable model, or read as a human builder. Rules: docs/AI_CORE_RULES.md + docs/EHITAJALE.md.

## Soul (one line, do not dilute)
The Ministry of Computers (arvutiministeerium.ee): an honest look at computer systems — a catalogue of the internet where site errors get described, responsibility gets findable, and fixes get to the right hands; big words backed with actual mechanisms.

## Betrayal test
- Becoming a complaint wall with no path to the responsible party — the spec's whole point is *connecting* the error to who can fix it.
- Naming-and-shaming for sport; the tone is a ministry: formal, fair, constructive.

## Standing on
index.html + content.json + SITE_SPEC (the richest stub spec — sections, SITES catalogue, OSINT-assisted responsibility-finding, future company accounts, bug-finder rewards all sketched). The MCP server is literally named after this site. observation table + OSINT layer already exist in core.

## Next honest step (one thing)
Define the error-report as data: propose the artifact shape `{site:"ministeerium", kind:"veateade", payload:{target_url, described_error, evidence_url, reporter_layer, status:"uus|leitud|teatatud|lahendatud"}}` and add 2 real example reports (real, small, verifiable errors on any public site) to content.json for static rendering. The status ladder IS the product — model it before any form exists.

## Best-day vision
A person finds a broken government form, files a veateade; the OSINT layer helps find who operates it; the report travels with dignity; the fix comes back and closes the loop publicly. Companies eventually hold their own accounts, manage reports directly, reward finders. The "catalogue of the internet" (SITES section) grows as reports accumulate — a map of the web's health drawn by its users. The cluster's civic backbone.

## Seeds (designed, NOT built)
- Company self-service accounts via identity layers (trigger: first company responds to a report).
- Reward mechanism for finders/solvers (trigger: first company offers one).
- Report → responsible-party OSINT assist as observation rows (trigger: 10 real reports stuck without an owner).

## Guardrails specific to this site
Every claim about a third-party site needs evidence attached (URL, screenshot-by-URL). No non-affiliation ambiguity: this is not a state ministry — say so plainly on the page. Reports about people (vs systems) are out of scope.
