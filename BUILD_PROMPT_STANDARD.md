# BUILD_PROMPT_STANDARD — how each site carries its own guide

**Author:** Fable, 2026-07-20, at Margus's direction: *"use me to make quality instructions and guides — my own plan of what I'd do on my best day — so others can do what's described well."*
**Where this lives:** `docs/BUILD_PROMPT_STANDARD.md` (the method) + one `BUILD_PROMPT.md` in every `lehed/<site>/` root (the per-site instance).
**Read first:** `docs/AI_CORE_RULES.md`, `docs/EHITAJALE.md`. This standard does not repeat their rules — it assumes them and adds one thing: a *forward* guide per site.

---

## Why this exists

`SITE_SPEC.md` answers *what a site is*. `SITE_DEVELOPMENT.md` records *what was done*. Neither one tells the next builder — a person, a cheap model, a future agent arriving cold — *what to do next and how to do it in line with the whole vision*. That gap is where sites stall or drift into generic filler.

`BUILD_PROMPT.md` closes it. It is a **copy-paste-ready prompt**: paste it (plus the site's `SITE_SPEC.md` and the `docs/DELEGATE_PROMPTS.md` CONTEXT block) into any capable model, or hand it to a person, and they can move the site one honest step forward without asking Margus to re-explain. It is the architect (Fable) thinking out loud on its best day, then leaving that thinking where the work happens.

## The "best day" rule (what makes these good, not generic)

Write each prompt as if it were the best version of an architect who:
1. **Knows the whole cluster**, not just this page — so it never proposes a second backend, a new framework, a signup wall, or a hardcoded visibility exception. Every idea routes through `core-api`, `rule` rows, instant identity, vendored htmx.
2. **Names the single next step**, concretely, small enough to finish in one sitting — never "build the site," always "write `content.json` with these three fields" or "add this one `rule` row."
3. **Sees three moves ahead** and writes the far-out needs down as *seeds*, not code — so ambition is preserved without being prematurely built (`AI_CORE_RULES §2.7`: designed, not built, until a real trigger).
4. **Protects the soul.** Every site here has a reason to exist that isn't "another site." The prompt states that soul in one line and tells the builder what would betray it (e.g. krattiina betrayed = folklore turned into sellable pulp fiction; seadus betrayed = pretending to be a law firm).
5. **Prefers a stub that's honest over a feature that lies.** A visible "tuleb" (501) button beats a fake one. Say so per site.

## Fixed shape — every BUILD_PROMPT.md has exactly these sections

```
# BUILD PROMPT — <Site> (<folder>)
> One-paragraph role line: paste this + SITE_SPEC.md into a model, or read as a builder.

## Soul (one line, do not dilute)
What this site is FOR that no other site in the cluster is. The tie-breaker.

## Betrayal test
The one or two things that would make this site wrong even if it "worked."

## Standing on (what already exists)
Shared parts this site gets for free: _starter skeleton, _shared/*.js, core-api, rule table.
Whatever is already in THIS folder (content.json? index.html? a mockup?).

## Next honest step (do this one thing)
The smallest concrete task that moves the site forward, in the delegatable format
(content.json shape / skin.css :root tokens / a rule-row / one SITE_SPEC gap answer).
Point at the exact Task number in docs/DELEGATE_PROMPTS.md when one fits.

## Best-day vision (where this goes if it earns it)
2–5 sentences: the fullest honest version of this site, cluster-aware.

## Seeds (designed, NOT built — build only on trigger)
Bullet list of far-out/future capabilities, each with its trigger condition.
These go here OR into docs/EDASISED_SEEMNED.md — never into code before the trigger.

## Guardrails specific to this site
Anything beyond the global rules: disclaimers (kriminaalpolitsei), age/consent
(sydameke), sensitivity (seadus "unlawful" section, patt, jumalale).
```

Keep it dense, like `EHITAJALE.md` — a page, not a manual. If it grows past ~70 lines, a seed is masquerading as a spec; move it to `EDASISED_SEEMNED.md`.

## How a builder uses one (the loop)

1. Read this site's `BUILD_PROMPT.md` + `SITE_SPEC.md`.
2. Do the **one** "next honest step." Nothing more in the first pass.
3. Log it: newest line on top of `SITE_DEVELOPMENT.md`, and a `DECISIONS.md` line if it was a decision.
4. Verify for real (Playwright, real clicks — not "I assume it works").
5. Commit with `Co-Authored-By: <model>`. Update the "next honest step" in the BUILD_PROMPT to the *following* step, so the file always points at what's next.
6. If you saw something the site could become but shouldn't build yet — write a seed, not code.

## Not delegatable, ever (unchanged from EHITAJALE §4)

`core/schema.sql`, `core/main.py`, security, secrets, commits, `_shared/*.js`. A BUILD_PROMPT may *propose* a schema or shared-component change as a seed for Fable/Margus — it may not instruct a delegate to make one.
