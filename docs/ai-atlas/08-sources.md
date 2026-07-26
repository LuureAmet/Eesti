# 08 — Sources, Ranked by Evidentiary Quality

> Ranked by *what kind of claim each can settle*, not by popularity.

The ordering principle: a source is good to the degree that it is **the artefact
itself** rather than a description of it. `config.json` is the model. A blog post about
`config.json` is someone's reading of the model.

---

## Tier 1 — Primary artefacts (settle facts outright)

### 1. `config.json` on Hugging Face

```
https://huggingface.co/<org>/<model>/blob/main/config.json
https://huggingface.co/<org>/<model>/raw/main/config.json    # raw, curl-able
```

**Settles:** every shape parameter, and therefore parameter count, KV-cache size, and
VRAM requirement. Cannot be wrong — it's what the loader reads.
**Cannot settle:** anything about training data, quality, or behaviour.

Also in the repo: `tokenizer_config.json` (chat template, special tokens),
`generation_config.json` (default sampling), `LICENSE`, and the model card.

### 2. Live vendor capability APIs

For closed models this is the **only** authoritative source, and it beats documentation
because documentation caches.

```python
m = client.models.retrieve("claude-opus-5")
m.max_input_tokens, m.max_tokens, m.capabilities
```

**Settles:** context, output cap, feature support, model existence.
**Cannot settle:** anything architectural.

### 3. Official technical reports (arXiv)

**Settles:** training method, ablations, sometimes data ratios.
**Cannot settle:** what was omitted — usually full data composition.

Worth reading in full, because the methods sections contain the parts nobody
summarises:

| Paper | Why |
|---|---|
| *Attention Is All You Need* (arXiv 1706.03762) | The origin. Still worth reading directly |
| *DeepSeek-V3 Technical Report* (arXiv 2412.19437) | MLA, fine-grained MoE, FP8 training, aux-loss-free balancing. The most instructive single modern report |
| *The Llama 3 Herd of Models* (arXiv 2407.21783) | Unusually candid on infrastructure and failures |
| *Mamba: Linear-Time Sequence Modeling* (arXiv 2312.00752) | Selective SSMs |
| *Jamba* (arXiv 2403.19887) | Hybrid SSM-transformer in production |
| *Mixtral of Experts* (arXiv 2401.04088) | Sparse MoE at production quality |
| *Training Compute-Optimal LLMs* — Chinchilla (arXiv 2203.15556) | The scaling result everyone cites and few read |
| *GQA* (arXiv 2305.13245) | Grouped-query attention |
| *RoFormer* — RoPE (arXiv 2104.09864) | Rotary embeddings |
| *YaRN* (arXiv 2309.00071) | Context extension |
| *Direct Preference Optimization* (arXiv 2305.18290) | RLHF without a reward model |
| *Switch Transformers* (arXiv 2101.03961) | The MoE scaling groundwork |

Qwen3, Kimi K2, and GLM technical reports are on arXiv but I'd search by title rather
than trust an ID from memory — **verify any arXiv ID before citing it**, including the
ones above.

### 4. Official vendor API documentation

**Settles:** pricing, rate limits, feature availability per platform, beta headers,
error semantics.
**Cannot settle:** architecture, or comparative claims.

This is the highest-value tier for anyone building rather than researching, and it's
routinely skipped in favour of blog summaries that are three revisions stale.

### 5. Model repositories on GitHub

Inference code, and occasionally training code. When present, the modelling file is
more informative than any prose description — it *is* the architecture, in Python.

---

## Tier 2 — Independent measurement

### 6. Third-party capability indices

Composite scores across many benchmarks, run on a consistent harness. **The consistent
harness is the value** — vendor numbers use vendor harnesses.

**Settles:** relative capability under one methodology.
**Watch:** the weighting is a judgment call, and composites can hide domain-specific
inversions.

### 7. Human-preference arenas (Elo)

Blind pairwise human preference.

**Settles:** which output people prefer.
**Does not settle:** correctness. Preference correlates with formatting, length, and
confidence — sometimes negatively with accuracy. A model that hedges appropriately can
lose to one that asserts confidently and wrongly.

### 8. Independent evaluation organisations

Safety and capability assessments run outside the vendor. Slower, more rigorous, less
comprehensive.

---

## Tier 3 — Interpretation (useful, needs verification)

### 9. High-quality technical writing

A small number of writers reimplement architectures from scratch and publish working
code. Implementation is a strong correctness filter — code that runs and matches
published outputs cannot be hand-waving.

**Settles:** understanding.
**Verify:** numbers against primary sources anyway.

### 10. Practitioner communities

Local-inference communities produce information vendors never publish: real VRAM
figures at specific quantisations, quality degradation per quant level, actual
throughput on actual hardware, and rapid identification of broken releases.

**Settles:** practical deployment reality.
**Watch:** anecdote volume masquerading as measurement.

### 11. Vendor blogs and announcements

**Settles:** that a thing was released, and the vendor's positioning.
**Watch:** "up to X% better" without a named baseline, benchmark selection, and
comparisons against a competitor's older version.

---

## Tier 4 — Treat as leads only

### 12. Spec-aggregator sites

Sometimes accurate, sometimes not, rarely dated, and they copy each other — so an error
appears in five places and looks corroborated. The Llama 405B "118 layers" error
propagated exactly this way.

**Use:** as a pointer to the real source. Never as the source.

### 13. Leaks and informed speculation

The GPT-4 "1.8T, 16 experts" figure lives here permanently.

**Use:** hypothesis generation.
**Never:** as a basis for a decision.

### 14. Model-generated summaries

Including this document. See [`07-claims-audit.md`](07-claims-audit.md) for the failure
distribution — strong on stable documented material, unreliable on recent closed-model
facts, and confabulation-prone on named case studies and precise figures.

**Use:** structure, orientation, and synthesis.
**Verify:** every number.

---

## A decision procedure

| Question | Source | Time |
|---|---|---|
| How many layers does open model X have? | `config.json` | 30 s |
| Will X fit in my 24 GB GPU? | `config.json` + KV formula in [`02`](02-reading-and-verifying.md) | 2 min |
| What's the context window of closed model X? | Vendor API `models.retrieve` | 10 s |
| What does X cost? | Vendor pricing docs | 1 min |
| Is X better than Y at my task? | **Your own eval on your own data** | Hours — and worth it |
| How many parameters does GPT-5 have? | **Unanswerable.** Move on | 0 s |
| Why is X good at Y? | Usually unanswerable — data isn't published | — |
| Can I use X commercially? | The `LICENSE` file in the repo | 5 min |

The last three matter most. **A great deal of energy goes into questions that have no
available answer.** Recognising an unanswerable question quickly is a skill, and it
frees time for the one question that *is* answerable and does determine outcomes:
*does it work on my actual workload?*

---

## Maintenance

This atlas will age. The parts that age at different rates:

| Content | Half-life | Re-check |
|---|---|---|
| Mechanism explanations (MLA, MoE, GQA, scaling) | Years | Rarely |
| Open-model configs | Permanent per version | Never — new models, new rows |
| The verification method in [`02`](02-reading-and-verifying.md) | Years | Rarely |
| Closed-model pricing and features | **Weeks** | Before any decision |
| Model rosters and rankings | **Weeks** | Before any decision |
| Behavioral notes (class F) | Per model version | Every version bump |

The design intent is that [`02`](02-reading-and-verifying.md) makes the rest
regenerable. If the tables here go stale, the method for rebuilding them doesn't.
