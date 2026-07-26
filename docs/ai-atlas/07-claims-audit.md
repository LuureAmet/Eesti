# 07 — Claims Audit: A Worked Example

> Three model-generated analyses of AI architecture were submitted for review. This is
> the audit output. It doubles as a labelled example set for an extraction agent.

The point of this file is not to score other models. It is that **the errors cluster in
a diagnosable place**, and that pattern is directly encodable as routing rules. A
dispatcher that knows *where* a source class fails can triage it automatically instead
of requiring a human to read everything.

---

## 1. Corpus

Three long analyses, all fluent, well-structured, heavily formatted, and carrying
inline citation markers. Content spanned: transformer architecture, parameter counts
across ~20 models, open-vs-closed dynamics, benchmark results, and vendor-specific
capability claims.

**Surface quality was uniformly high.** Nothing about the presentation signalled which
claims were solid. That is precisely the problem this audit exists to solve.

---

## 2. Findings

### ❌ Contradicted — do not propagate

| Claim | Reality | Severity |
|---|---|---|
| *"Opus 5 officially does not exist; the latest Opus is Opus 4.7"* | `claude-opus-5` is current and generally available | **Critical** — invalidates every routing decision downstream |
| *"Mythos 5 = Fable 5 without certain safety filters, for cyberdefenders only"* | Mythos 5 has **identical** capabilities, pricing, and API surface to Fable 5. Distributed via Project Glasswing. The safety-filter differential is not in any vendor source | **High** — would justify a dangerous model choice on false grounds |
| *"Claude Opus 4.7 — 200K context"* | Opus 4.7 is 1M context | Medium |
| *"Fable 5 filters route automatically to Opus 4.8"* | Fallbacks are **opt-in** on the API. Without configuration a refused request simply stops. Opus 4.8 is the recommended target, not an automatic one | **High** — inverts a production failure mode |
| *"<5% of sessions hit filters"* | No published figure exists | Medium |
| *"Access suspended 12 June 2026, restored 1 July"* | No corroboration in any vendor source | Medium |
| *"Stripe: 50M-line Ruby migration in one day"* | Unverifiable. Bears the structural signature of a synthesised case study — named enterprise, round figure, dramatic ratio | Medium |
| Precise benchmark scores to one decimal (SWE-Bench 87.6%, GPQA 94.2%, CursorBench 70%) | Not verifiable from vendor documentation. May be partly real; presented with unearned precision and no harness specification | Medium |

### ✅ Correct — and worth keeping

Substantially more of the corpus was right than wrong, and the accurate parts were
genuinely useful:

| Claim | Status |
|---|---|
| Llama 3.1 405B: 126 layers, 16384 hidden, GQA 8 KV heads | ✅ Verified by derivation in [`02`](02-reading-and-verifying.md#worked-example-llama-31-405b) |
| DeepSeek V3: 671B/37B, 61 layers, 7168 hidden, MLA, 256 experts / 8 active, FP8 training | ✅ Matches the published technical report |
| Mixtral 8x22B: 141B/39B, Apache-2.0 | ✅ |
| Qwen3-235B-A22B: 94 layers, GQA 64 Q heads | ✅ |
| Kimi K2: ~1T/32B, 384 experts / 8 active, MuonClip optimiser | ✅ |
| MLA compresses the KV cache to a low-rank latent | ✅ Correct mechanism, correctly explained |
| "Open weights ≠ open source" | ✅ Correct and important |
| "Total params ≈ knowledge; active params ≈ compute" | ✅ Good framing |
| Third-party spec pages are unreliable (118 vs 126 layers for Llama) | ✅ Correct — and self-demonstrating |
| `config.json` is the gold standard | ✅ Exactly right |
| Task Budgets, `xhigh` effort, 2576px vision on Opus 4.7 | ✅ All real |
| Anthropic publishes no architecture details | ✅ |
| "Agent = Model + Harness" | ✅ The single most useful framing in the corpus |
| The 90/5/5 routing heuristic | ✅ Holds up well |

### 🌫️ Unverifiable — usable as hypothesis only

GLM-5 at 744B/40B · GPT-5 context and MoE structure · Gemini 3 Pro as sparse MoE ·
Grok 4 at ~1.7T · DeepSeek training-cost figures · **"Claude is a dense transformer"**

The last one deserves a note: it circulates constantly, traces to a single third-party
analysis, and is routinely restated as established fact. It is plausible. It is not
confirmed. Treat every appearance of it as 🌫️ regardless of how confidently it's phrased.

---

## 3. The error pattern — the actually useful finding

Plot the errors against the claim type and the structure is unmistakable:

| Claim class | Accuracy | Why |
|---|---|---|
| **Open-model architecture** (configs, params, layers) | ~95% correct | Extensively documented, stable, well-represented in training data |
| **Mechanism explanations** (MLA, MoE, GQA, scaling) | ~100% correct | Conceptual, stable, well-taught |
| **General principles** (openness, routing, harness) | ~100% correct | Genuine synthesis, no recency dependency |
| **Recent closed-model facts** (versions, pricing, availability) | **~40% correct** | Requires live reference the model didn't have |
| **Specific benchmark numbers** | Unverifiable throughout | Requires a source and a harness spec |
| **Named case studies** | Unverifiable, likely synthesised | The classic confabulation shape |

**Three structural causes, all predictable:**

1. **Training-cutoff blindness.** A model asked about releases after its cutoff cannot
   say "I don't know what shipped since" — it has no signal that time has passed. It
   interpolates from the last state it knew. That produced "Opus 5 doesn't exist": a
   correct statement *about April 2026* delivered as a correct statement about now.

2. **Citation markers as false authority.** The corpus carried inline reference markers
   throughout. They lend the texture of sourcing without the substance — a marker
   attaches to a *search result*, not to the specific claim in the sentence. **Readers
   trust cited text more, and that trust is unearned here.** A reader who spot-checks
   citations on a well-cited document and finds them plausible will lower their guard
   on the rest.

3. **Confabulation follows a shape.** Fabricated content clusters where a plausible
   answer is easy to synthesise and hard to check: named enterprise + round number +
   dramatic ratio + specific date. "50 million lines in one day." "Suspended 12 June,
   restored 1 July." The specificity *is* the tell — real sources are usually vaguer.

**The practical inversion:** you would expect a model to be more reliable on its
vendor's own products than on a competitor's obscure config file. The opposite held.
Open-model configs were near-perfect; Anthropic-specific facts were the weakest section
of an analysis written by a Claude-adjacent question. Documentation stability beats
topical proximity, every time.

---

## 4. Routing rules derived from this audit

This is the payoff — the pattern above converts directly into dispatcher configuration.

```yaml
source_class_rules:

  - class: open_model_architecture
    trust: high
    verify: config.json                # cheap, deterministic
    route: haiku-4-5                   # mechanical check, no judgment
    escalate_if: derived_count_delta > 2%

  - class: mechanism_explanation
    trust: high
    verify: spot_check_against_paper
    route: sonnet-5

  - class: closed_model_current_facts
    trust: none                        # regardless of confidence or citations
    verify: vendor_api_or_docs_required
    route: opus-5
    block_until_verified: true         # never propagate unverified

  - class: benchmark_number
    trust: none_without_harness_spec
    verify: require(source, harness, date)
    route: opus-5

  - class: named_case_study
    trust: none
    verify: primary_source_required
    route: human
    note: "specificity is a fabrication signal, not a credibility signal"
```

Three rules generalise beyond this corpus:

- **A claim's confidence is uncorrelated with its accuracy.** Never weight by tone.
- **Citation markers are not verification.** They may reduce reliability by suppressing
  scrutiny. Treat a heavily-cited document as *unaudited*, not as *audited*.
- **Verification cost varies enormously by class.** An open-model config check is
  seconds and fully mechanical — route it to the cheapest tier. A closed-model
  availability claim needs a live API call. Price the check, not the claim.

---

## 5. Reusable grading rubric

For an outcome-graded audit agent:

```markdown
# Rubric: model-generated technical claims

For each factual claim, output: {claim, class, verdict, evidence, action}

## Verdicts
- VERIFIED     — primary source located and checked. Cite it.
- UNVERIFIABLE — no primary source exists or is reachable. Not the same as false.
- CONTRADICTED — a better source disagrees. Record both.
- FABRICATED   — specific, checkable, and absent from all sources.

## Required
1. Every numeric claim about an open model MUST be checked against config.json.
2. Every claim about a closed model's internals is UNVERIFIABLE by default.
   Exception: pricing, context, and features from live vendor docs → VERIFIED.
3. Every benchmark number without {source, harness, date} is UNVERIFIABLE.
4. Presence of citation markers changes nothing. Grade the claim, not the formatting.
5. A claim about a release later than the source model's cutoff gets extra scrutiny.

## Pass condition
100% of claims classified. Zero claims passed through ungraded.
Coverage is the objective, not precision — a downstream pass filters.
```

Note rule 5 and the pass condition. Coverage-first grading exists because a literal
model told to "only flag serious errors" will find them and then decline to report them
— precision rises while measured recall falls. Grade everything; filter later.

---

## 6. What this means for the pipeline

Your corpus of mixed model outputs is **not uniformly trustworthy, and its
untrustworthiness is structured.** That's good news: structure is automatable.

- **Open-model technical content** → verify mechanically at the cheapest tier. High
  yield, near-zero cost.
- **Mechanism and principle content** → largely reliable, extract directly. This is
  where the real value in the corpus sat.
- **Recent closed-model facts** → quarantine until checked against a live source. This
  is where every serious error was.
- **Named case studies and precise benchmarks** → treat as unsourced until proven
  otherwise.

The corpus audited here was **genuinely valuable** — the architecture explanations,
the openness framing, the 90/5/5 heuristic, and "Agent = Model + Harness" are all worth
keeping. It was also confidently wrong about the single fact that would have determined
which model to build on.

That combination — high average value, catastrophic tail error, no surface signal
distinguishing them — is the exact argument for an audit layer. Not because model output
is bad. Because it's *good enough that nobody checks*.

→ Next: [`08-sources.md`](08-sources.md) — where to check.
