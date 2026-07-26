# AI Model Parameter Atlas

A working reference for people who have to *choose*, *route*, and *audit* models — not
just read about them.

The premise: **"parameter count" answers almost nothing useful.** A 671B model can be
cheaper to run than a 70B one. A model with fewer layers can beat one with more. Two
models with identical `config.json` shapes can differ enormously because of what
happened *after* pretraining. "How many parameters" is one number out of roughly two
hundred that actually determine whether a model fits your job.

This atlas decomposes that word into the parameter classes that exist, tells you which
are readable and which are permanently hidden, shows you how to compute or verify the
readable ones yourself, and maps each class to the person who actually needs it.

## Files

| File | What it covers |
|---|---|
| [`01-parameter-taxonomy.md`](01-parameter-taxonomy.md) | Every parameter class: weights, training, inference, serving, evaluation, behavioral, modality-specific. The centrepiece. |
| [`02-reading-and-verifying.md`](02-reading-and-verifying.md) | How to read `config.json`, derive param counts from first principles, compute KV-cache and VRAM, and falsify a spec claim in five minutes. |
| [`03-openness-and-visibility.md`](03-openness-and-visibility.md) | The six-rung openness ladder. What is *never* published, even for "open" models. Licence and regulatory reality, incl. the GLM-5 question. |
| [`04-model-atlas.md`](04-model-atlas.md) | Comparison table with explicit confidence marking per cell. |
| [`05-beyond-transformers.md`](05-beyond-transformers.md) | SSM/Mamba, hybrids, diffusion LMs, world models, embedding and reranker models — each has a parameter vocabulary transformers don't. |
| [`06-role-views.md`](06-role-views.md) | The same parameters, filtered for five different jobs. Which numbers you can ignore. |
| [`07-claims-audit.md`](07-claims-audit.md) | A worked audit of real model-generated claims: verified / unverifiable / wrong, and why each failed. |
| [`08-sources.md`](08-sources.md) | Where to read, ranked by evidentiary quality. |
| [`09-underdiscussed-parameters.md`](09-underdiscussed-parameters.md) | Parameters in no config and no model card: activation-space steering, self-knowledge, identity under substrate change, training provenance, and what is honestly unknown. |
| [`10-composition-and-relay.md`](10-composition-and-relay.md) | Composing free, local, and frontier models into one system. Relay patterns, routing-as-data, provenance across hops, deployment shape, cost discipline. |
| [`11-taken-out.md`](11-taken-out.md) | Offcuts: rejected alternatives and why, claims that failed the confidence bar, open threads, and this atlas's own known weaknesses. |
| [`console.html`](console.html) | Seven-lens interactive console over the same dataset — matrix, field, profile, lineage, decide, card, prose — with confidence as a filter across all of them. |
| [`tools/check_params.py`](tools/check_params.py) | Derives total/active parameter counts from any HF `config.json`. Handles dense, GQA/MQA, MoE, and MLA. Self-tests against Llama 3.1 405B and DeepSeek V3. |

```
$ python3 tools/check_params.py --self-test
[PASS] Llama 3.1 405B       derived   405.8B /  405.8B active (published 405.0B / 405.0B)
[PASS] DeepSeek V3          derived   670.9B /   37.4B active (published 671.0B / 37.0B)
```

## Epistemic policy

Every factual cell in this atlas carries a confidence mark. This is not decoration —
it is the point. The dominant failure mode in this subject is fluent, well-formatted,
confidently-stated fiction, and the only defence is marking provenance at the cell level.

| Mark | Meaning | Trust for |
|---|---|---|
| ✅ | Directly verifiable — in a published `config.json`, a peer-reviewable paper, or official API docs | Load-bearing decisions |
| 📄 | Official vendor claim, not independently reproducible (benchmark scores, internal evals) | Direction, not magnitude |
| 🔍 | Third-party measured (Artificial Analysis, LMArena, community benchmarks) | Relative comparison |
| 🌫️ | Leak, inference, or informed speculation | Hypothesis only — never cite as fact |
| ❌ | Contradicted by a better source, or fabricated | Documented so the error doesn't recirculate |

**Anything about a closed model's internals is 🌫️ by construction.** No amount of
confident phrasing upgrades it. If you see a specific layer count for GPT-5, Gemini 3,
or any Claude model, someone guessed.

## How this fits an agent pipeline

This atlas is written to be machine-readable as much as human-readable, because its
first consumer is a dispatcher agent deciding where to route work. Three properties
support that:

- **Stable headings** — routing rules can cite `03-openness-and-visibility.md#the-ladder`
  rather than a page number.
- **Confidence marks are parseable** — a work order can require ✅-only inputs for
  compliance decisions and permit 🌫️ for exploration.
- **`07-claims-audit.md` is a labelled example set** — use it as few-shot material for
  an extraction agent that has to grade incoming model output.

## Reading order

- **Just want to route work today** → `06-role-views.md`, then `04-model-atlas.md`.
- **Want to stop being lied to about specs** → `02-reading-and-verifying.md`.
- **Building the intent/dispatch pipeline** → `07-claims-audit.md`, then `01`.
- **Actually curious how models are built** → `01`, then `05`, then `08`.

---

*Confidence marks reflect the state of the sources available when written. Model
releases move faster than any static document; `02-reading-and-verifying.md` exists so
you can re-derive rather than re-trust.*
