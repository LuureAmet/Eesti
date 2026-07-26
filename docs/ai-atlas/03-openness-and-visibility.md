# 03 — Openness and Visibility

> Your question: *is there full visibility into open models, or is some information —
> around GLM-5 and up — restricted?*
>
> Short answer: **nothing is forbidden; a great deal is simply never published.** The
> gap is voluntary, not legal, and it is widening in a specific direction.

---

## The ladder

"Open" is not binary. There are six meaningfully different rungs, and almost every
model called "open" sits on rung 2 or 3.

| Rung | Name | What you get | Real examples |
|---|---|---|---|
| **0** | **Closed** | API access only. No weights, no architecture, no data | GPT-5 family, Claude family, Gemini, Grok |
| **1** | **Documented-closed** | + architecture *type* stated (e.g. "sparse MoE") | Gemini model cards |
| **2** | **Open weights, restricted licence** | Weights downloadable, licence with conditions | Llama (community licence, 700 M MAU trigger) |
| **3** | **Open weights, permissive licence** | Weights under Apache-2.0 / MIT | Mixtral, Qwen, DeepSeek, Kimi (Modified MIT) |
| **4** | **Open weights + full technical report** | + training method, data mixture ratios, ablations | DeepSeek V3, Qwen3, OLMo |
| **5** | **Fully open** | + training code, full data, intermediate checkpoints | OLMo (AI2), Pythia, LLM360 |

**Rung 5 is rare and almost never at the frontier.** The genuinely fully-open models are
research artefacts an order of magnitude below frontier scale. There is no fully-open
frontier model, and there has never been one.

### Where the interesting models actually sit

| Model family | Rung | What's missing at that rung |
|---|---|---|
| Claude, GPT, Gemini, Grok | 0–1 | Everything architectural |
| Llama 3.x | 2–4 | Data composition; licence has MAU + naming conditions |
| Qwen3 | 3–4 | Data composition |
| DeepSeek V3/R1 | 3–4 | Data composition; method unusually well documented |
| Mixtral | 3 | Thin technical detail relative to the licence's generosity |
| Kimi K2 | 3–4 | Modified MIT with an attribution clause above a usage threshold |
| GLM family | 3 | **Increasingly thin documentation** — see below |
| OLMo, Pythia | 5 | Nothing — but far from frontier scale |

---

## What is *never* published, even at rung 4

This is the honest answer to "do we get the real internals for open models."

You get: **the shape and the weights.** That is genuinely a lot — you can compute every
number in [`02`](02-reading-and-verifying.md), run it, fine-tune it, inspect activations,
do interpretability work. Nothing is hidden about *what the network is*.

You almost never get:

| Withheld | Why | Consequence |
|---|---|---|
| **Training data composition** | Copyright exposure, competitive moat | You cannot explain *why* a model is good at something. This is the biggest gap by far |
| **Training code / infra** | Competitive moat | Cannot reproduce, only fine-tune |
| **Intermediate checkpoints** | Storage; also reveals data ordering | Cannot study training dynamics |
| **Data cleaning / filter classifiers** | Moat; the filter *is* much of the value | Cannot reproduce quality |
| **Full RL recipe** | The current competitive frontier | Post-training is described in outline, not detail |
| **Synthetic-data generation pipeline** | Increasingly the core asset | Often unmentioned entirely |
| **Failed ablations** | Nobody publishes negative results | You repeat their mistakes |
| **Safety-eval internals** | Gaming risk | Cannot audit safety claims independently |

**The centre of gravity has moved to exactly the withheld part.** In 2021 the
architecture was the secret. Today architectures are near-commoditised — everyone runs
a decoder-only transformer with RMSNorm, SwiGLU, RoPE, GQA-or-MLA, and MoE. Data and
post-training are the differentiators, and those are precisely what nobody discloses.

The corollary for a reader: **inferring capability from a config is a dead end.** Two
models with near-identical configs can differ wildly. The config tells you cost and
memory. It does not tell you quality.

---

## The GLM-5 question specifically

Nothing about GLM-5 is *legally* restricted for you to read. What has changed is
voluntary disclosure practice, and it's worth naming precisely because it's a trend
rather than a one-off.

**What is observable:** weights on Hugging Face / ModelScope, a `config.json`, a
licence, and typically a headline total/active parameter split.

**What has thinned out across recent Z.ai releases:** the accompanying repositories
have become deliberately minimal — a README, the licence, deployment notes, and little
else, in place of the substantial technical reports that accompanied earlier GLM
generations. Nothing prevents you reading the config; there is simply much less prose
explaining the choices.

Three plausible reasons, none of them prohibition:

1. **Competitive.** The recipe is the asset now, not the weights. Releasing weights
   builds ecosystem; releasing the recipe hands over the moat.
2. **Speed.** Release cadence has compressed to weeks. Technical reports take months.
3. **Strategic signalling.** A near-empty repo alongside frontier-grade weights is
   itself a statement: *the weights are the artefact; you don't need our explanation.*

**On regulatory restriction — separating three commonly-conflated things:**

| Constraint | What it actually governs | Does it block your reading? |
|---|---|---|
| **China's CAC filing** | Public-facing generative services *offered in China* must register | ❌ No. Affects deployment there, not your access to a published config |
| **US export controls** | Advanced compute hardware; periodic proposals around weights | ❌ Not currently for downloading published open weights. This is a moving target — verify before commercial deployment |
| **Model licences** | Your *use* — commercial thresholds, attribution, naming, acceptable use | ⚠️ Yes, for use. Never for reading |

So: read anything published. Check the licence before shipping. Recheck export-control
posture before commercial deployment at scale, because that specific area genuinely
moves.

---

## The closed-model situation, stated plainly

For GPT-5, the Claude family, Gemini, and Grok:

- **Parameter counts:** not published. Every figure in circulation is a leak or a guess.
- **Layer counts, hidden dims:** never published for any of them.
- **Architecture type:** sometimes. Google states "sparse MoE" for Gemini 3 Pro. OpenAI's
  system cards imply MoE without confirming a count. Anthropic states nothing.
- **The Claude-is-dense claim:** this circulates widely and traces to a single
  third-party analysis, not to Anthropic. It is 🌫️ — plausible, unconfirmed, and
  frequently restated as though it were established. Treat accordingly.
- **The "GPT-4 ≈ 1.8T, 16 experts" figure:** the canonical unverified leak. Repeated so
  many times it has acquired the texture of fact. It has never been confirmed.

**What *is* fully documented for closed models** — and this is the part that matters
operationally — is class C, D, and E from [`01`](01-parameter-taxonomy.md): every
inference parameter, exact pricing, context limits, rate limits, feature availability
per platform, and a live capability API. That's the surface you actually build against.
You will never tune a layer count. You will tune effort, caching, and tool surface
every day.

---

## Two historical inflection points

Worth knowing because they explain why the information landscape looks like this.

**2020 — GPT-3.** OpenAI published the parameter count and the paper, but not the
weights. First frontier model that could not be run independently. Establishes the
API-only norm.

**2023 — GPT-4.** The technical report explicitly declines to disclose architecture,
size, hardware, dataset, or training method, citing competitive and safety reasons.
Everyone followed. From here on, parameter counts stop being a comparison axis for
frontier models.

Between them, the field went from *"here is what we built and how"* to *"here is what
it scores."* Everything downstream — leak culture, benchmark inflation, third-party
spec pages of variable accuracy — follows from that.

---

## The open/closed gap

The honest position is that **the size of the gap is contested and probably
domain-dependent**, and you should distrust anyone who quotes a single number for it.

- Aggregators tracking capability indices have generally put the lag at **months, not
  years**, and reasonably stable over time.
- Some analyses argue it's widening as frontier labs scale RL compute.
- Others argue open models have reached parity or better in specific domains —
  particularly long-context handling and some coding work.

A defensible synthesis:

| Domain | State |
|---|---|
| Raw knowledge / general reasoning | Closed ahead, modestly |
| Coding (single-shot) | Near parity |
| **Long-horizon agentic reliability** | **Closed clearly ahead** — this is the real frontier |
| Tool-use reliability under failure | Closed ahead |
| Long-context retrieval | Near parity, open sometimes ahead |
| Cost per token | **Open ahead by 10–50×** |
| Safety/refusal calibration | Closed ahead (also more restrictive) |

**The most useful heuristic in circulation is the 90/5/5 split**, and it holds up:

- **~90%** of production tasks: an open model is sufficient and dramatically cheaper.
- **~5%**: a frontier model is *qualitatively* different, not marginally better.
  Long-horizon agentic work, synthesis across many implicitly-related documents,
  reliability under partial failure.
- **~5%**: nothing does it well yet.

The engineering mistake is treating everything as the middle 5%. The 10–50× cost
difference means a system that routes correctly is not slightly cheaper — it is
categorically cheaper. That is the entire argument for a dispatcher.

---

## Practical stance

1. **For anything load-bearing about an open model:** read `config.json`. Compute it
   yourself. Ignore spec-aggregator sites unless corroborated.
2. **For anything about a closed model's internals:** accept that you cannot know, and
   design so it doesn't matter. Measure behaviour instead.
3. **For licences:** read the actual file in the repo. Watch for MAU thresholds,
   attribution requirements, naming conditions, and acceptable-use clauses.
4. **Before commercial deployment of any open model:** re-verify licence *and*
   export-control posture. Both move.
5. **Never treat "open weights" as "open source."** Different obligations, different
   guarantees, different reproducibility.

→ Next: [`04-model-atlas.md`](04-model-atlas.md) — the comparison table, confidence-marked.
