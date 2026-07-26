# 11 — Taken Out

> The offcuts. Things considered and cut, claims that didn't clear the bar, alternatives
> rejected and why, and threads left open.
>
> Cut material is usually lost silently, and the *reasoning* behind a cut is often worth
> more than the cut itself — it stops the same idea being re-proposed and
> re-rejected six months later. This file is the near-zero-loss buffer.

---

## A. Claims that didn't clear the confidence bar

Encountered during research, plausible, insufficiently sourced. Recorded so they are
not silently re-imported later as fact.

| Claim | Why it was cut | If you want to promote it |
|---|---|---|
| GPT-4 ≈ 1.8T params, 16 experts | The canonical unverified leak. Repeated until it reads as fact | It cannot be. No primary source exists |
| Claude models are dense transformers | Traces to one third-party analysis, not to the vendor | Only a vendor statement would move this |
| Specific frontier benchmark scores to one decimal | No harness specified; not reproducible from vendor docs | Cite source + harness + date, or drop |
| Named enterprise migration case studies | Fabrication-shaped: named company, round number, dramatic ratio, no primary source | Find the customer's own published account |
| Precise training-cost figures | Usually pretraining GPU-hours at assumed rental rates. Excludes data, staff, failed runs, post-training | State what's included, or give a range |
| "Open/closed gap is N months" | Sources contradict each other and it's domain-dependent | Split by domain — `03` does this |

**The pattern worth remembering:** every one of these is *specific*. Specificity reads as
credibility and is frequently the opposite — a real source is usually vaguer than a
confabulated one.

---

## B. Structural alternatives rejected

**Organising by vendor rather than by parameter class.** Rejected: it would have made
the atlas a catalogue that expires on the next release. Organising by parameter class
means files 01–03 stay valid while 04 ages. Also, vendor organisation implicitly frames
the question as "which brand" when the useful question is "which class of fact".

**A single "capability score" per model.** Rejected as the most tempting bad idea here.
It would have made the charts much prettier and would have required inventing numbers.
Every axis in the Profile lens is *computed from published data* for this reason. The
moment one invented score enters, the confidence marking becomes decorative.

**Benchmark tables.** Deliberately omitted. They are the most-copied and least-useful
content in this genre: saturated, contamination-prone, harness-sensitive, and stale
within weeks. `01` explains how to read them instead, which survives longer.

**Merging 06 (role views) into 01.** Rejected: role filtering is the highest-value part
for most readers and would have been buried as a subsection.

**A glossary.** Rejected as redundant — terms are defined at first use in context, and a
detached glossary duplicates content that then drifts out of sync with it.

---

## C. Console design alternatives rejected

**Confidence as a five-colour categorical scale.** Rejected: confidence is *ordinal*
(descending), so hue would have been the wrong channel and would have burned five slots
of categorical palette on one variable. Encoding it as opacity plus stroke style is more
honest to the data type and leaves colour free for the open/closed distinction that
genuinely is categorical.

**Red for "not published".** Shipped, then removed after looking at the render. It
painted the entire closed-model half of the table in alarm colour, which is semantically
wrong — "not published" is a correctly-known fact, not an error. Red is now reserved for
genuine contradiction, of which the dataset currently contains none. **That is the
correct outcome and the class should stay unused until something earns it.**

**A force-directed graph lens.** Rejected: pretty, and it would have encoded nothing
true. Node position in a force layout is an artifact of the simulation, not of the data.
The Field lens uses real axes instead.

**Scroll-driven narrative.** Rejected as directly contrary to the brief. Scrollytelling
imposes one reading order, which is the opposite of multiple simultaneous ways in.

**A command palette.** Cut for scope, not for merit — it is the right next addition.
Number keys 1–7 currently cover lens switching.

**Search/filter box.** Cut for the same reason. With 14 models, sorting is sufficient;
at 50 it would not be.

---

## D. Things deliberately not covered

| Topic | Why |
|---|---|
| Fine-tuning / LoRA parameters | A large adjacent field (rank, alpha, target modules, dropout). Would double the atlas |
| Prompt-engineering technique | Well covered elsewhere; changes faster than this document could track |
| Multi-modal generation (image/video/audio out) | Different parameter space, different evaluation culture |
| Hardware and interconnect | Real determinant of what gets built, but a separate discipline |
| Regulation in detail | Jurisdiction-specific, fast-moving, and needs a lawyer rather than an engineer |
| Model-specific prompting quirks | Version-specific; belongs in per-model notes, not a reference |

---

## E. Open threads

Ranked by value-to-effort.

1. **Fetch real configs for the 🔍 rows in `04`.** Every one is a five-minute check away
   from ✅. `tools/check_params.py` already does the work. Highest yield in the atlas.
2. **Add a self-test case per attention family.** The current suite covers dense-GQA and
   MLA. A hybrid or unusual-FFN model would likely expose another gap — as MLA did.
3. **Effective autonomous horizon.** The metric nobody publishes ([`09`](09-underdiscussed-parameters.md) §5).
   Even a crude internal measurement would be more than exists publicly.
4. **A behavioural probe suite.** Class F is undocumented everywhere. A small fixed set
   measuring delegation propensity, tool-call rate, and instruction literalism per model
   version would be genuinely novel and immediately useful.
5. **Cost-per-completed-task instrumentation.** Referenced repeatedly as the only
   economic metric that matters; not yet implemented anywhere here.
6. **Command palette + search in the console.**

---

## F. Terminology notes

Words used precisely here that are used loosely elsewhere.

- **Open weights ≠ open source ≠ open data.** Three different things; the ladder in `03`
  separates six rungs.
- **Parameters** — unqualified, means weight count. This atlas argues that usage is the
  problem.
- **Active parameters** — per-token compute. Not "the useful ones."
- **Context window** — at least four distinct numbers (trained, extended, served,
  quality-holds). Vendors quote the third.
- **Reasoning model** — post-trained to produce extended intermediate output. Not a
  distinct architecture.
- **Agent** — model plus harness plus tools plus loop. The model alone is not an agent,
  and conflating them is why "which model is best" so often has no useful answer.
- **Hallucination** — used sparingly here; "confabulation" is more precise for
  fluent-but-fabricated specifics, and "unverifiable" is more precise still when you
  cannot check either way.

---

## G. Known weaknesses of this atlas

Stated because a reference that doesn't state its own limits is asking to be
over-trusted.

1. **Anthropic models are documented in more operational detail than others**, because
   an authoritative current reference was available for them and not for others. This is
   a coverage asymmetry, not a quality judgment. `04` marks it, but a reader skimming
   could mistake depth for endorsement.
2. **Several open-model rows are 🔍 rather than ✅.** Fixable; see §E.1.
3. **No behavioural data**, because none exists publicly and none was measured here. The
   most decision-relevant class is the emptiest.
4. **The console's dataset is a subset.** Fourteen models, chosen to span the design
   space rather than to be exhaustive.
5. **Written at one point in time.** `08` has the half-life table; the closed-model rows
   age in weeks.
6. **Single-author.** No adversarial review. `07` argues that confident single-source
   technical content deserves scrutiny — that applies here too, and this file is the
   closest thing to a self-audit it contains.

---

## H. What the writing process actually surfaced

Worth recording because it wasn't the expected outcome.

**The MLA bug.** The parameter script shipped assuming standard attention, passed Llama,
and failed DeepSeek by 17.2B — exactly the MHA-minus-MLA delta. It diagnosed itself. The
generalisable lesson: **an untested script in a document is a claim; a script with a
failing test is a bug report.** Every code sample in a reference should ship with a
self-test for this reason.

**The red-dot error.** A data-modelling mistake (conflating "not published" with
"contradicted") was invisible in the code and obvious the instant the page was rendered.
Rendering is a debugging technique for *semantics*, not only for layout.

**The error-clustering finding in `07`** was not the expected result. The prediction was
that a model would be most accurate about its own vendor's products. The opposite held:
open-model configs near-perfect, recent closed-model facts weakest. **Documentation
stability beats topical proximity.** That single finding did more to shape the routing
rules than anything planned in advance — which is the argument for writing the audit
before writing the router.
