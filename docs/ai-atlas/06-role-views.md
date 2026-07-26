# 06 — Role Views

> Same parameters, five jobs. Most of the taxonomy is noise for any given reader — this
> file says which parts, and why.

---

## A. The local runner

*Running models on your own hardware. Privacy, cost, or curiosity.*

**Read:** A1 (dimensions), A2 (attention/KV), A3 (MoE), A6 (quantisation).
**Ignore:** everything about closed models, most of class B, all of class D.

Your entire world is one inequality:

```
weights + KV cache + activations + overhead  ≤  VRAM
```

| Parameter | Why it decides your life |
|---|---|
| Total params × bits/param | Weight memory. Q4_K_M ≈ 0.6 bytes/param effective |
| `num_key_value_heads` | KV cache scales with this. GQA is what makes long context possible |
| MoE total vs active | **The trap.** A 671B/37B model runs at 37B *speed* but needs 671B *resident*. MoE helps API economics, not your GPU |
| Quantisation method | AWQ/GPTQ beat naive RTN at equal bit width |
| Context length | KV cache is linear in it. Halve context, halve cache |

**The MoE trap deserves repeating** because it catches everyone once: sparse models are
compute-cheap and memory-expensive. That's the opposite of what a single-GPU user needs.
For local work, a dense 30B usually beats a sparse 200B/20B you have to offload.

**Practical ladder:** 8 GB → 7–8B at Q4. 24 GB → 32B at Q4, or 8B at Q8 with long
context. 48 GB → 70B at Q4. 80 GB → 70B at Q8, or 120B-class at Q4. Beyond that,
multi-GPU and a different set of problems.

**Free experimentation:** Ollama (simplest), llama.cpp (most control), LM Studio (GUI),
vLLM (serving throughput), Hugging Face Spaces and various free API tiers (no hardware
at all).

---

## B. The API application builder

*Shipping a product on someone else's models.*

**Read:** C (inference), D (economics), E (evaluation).
**Ignore:** A and B almost entirely. You cannot act on them.

This is the inversion worth internalising: **architecture knowledge has near-zero
operational value to you.** You will never tune a layer count. You will tune caching
every single day.

| Parameter | Leverage |
|---|---|
| **Prompt caching** | The largest single cost lever. Read ≈ 0.1×. Structure prompts so the stable part precedes the volatile part |
| Effort / thinking | Primary quality↔cost dial on reasoning models. Non-monotonic — sweep it |
| Model tier per route | 5–10× spread between tiers. Route, don't default |
| Structured outputs | Eliminates a whole class of parsing failure |
| Batch API | ~50% off for anything not latency-sensitive |
| Streaming | Required above ~16K output; also fixes perceived latency |
| Token counting | Model-specific. Never `tiktoken` for Claude |

**Caching is a prefix match.** One byte changed anywhere in the prefix invalidates
everything after it. The classic silent killer is a timestamp or UUID interpolated into
the system prompt — it makes every request unique and your hit rate zero. Verify with
`cache_read_input_tokens`, not with hope.

**The concurrency subtlety:** N parallel requests with the same prefix all miss, because
the cache isn't readable until the first response starts streaming. Send one, await
first token, then fan out the rest.

---

## C. The agent orchestrator

*Multiple models, multi-step, autonomous or semi-autonomous.*

**Read:** all of C, D, F. Especially **F**.
**Ignore:** A and B.

You are the reader for whom **class F (behavioral) matters more than everything else
combined**, and it is the one class with no documentation anywhere.

| Parameter | Why it's decisive |
|---|---|
| Delegation propensity | Directly multiplies cost. Each subagent re-establishes context, re-explores, reports back — then the coordinator re-reads the report |
| Tool-call propensity | Under-calling loses grounding; over-calling burns budget |
| Instruction literalism | A literal model obeys "only report high-severity" exactly — and silently drops real findings |
| Self-verification | Telling a self-verifying model to verify causes over-verification with no quality gain |
| Refusal surface | Can make a model unusable for a task class regardless of capability |
| Long-horizon coherence | Sets maximum viable autonomous run length |
| Failure signature | Fabricated progress, early stopping, context anxiety — each needs a specific mitigation |
| `task_budget` vs `max_tokens` | Budget the model *sees* and paces against, vs the guillotine it doesn't |

**Routing economics.** With a 10× spread between cheap and frontier tiers, correct
routing isn't an optimisation, it's the difference between viable and not:

```
prep / extract / classify   →  cheapest tier that holds quality
implement / review          →  mid or high tier
long-horizon autonomous     →  frontier tier, justified per task
```

Every token of normalisation done before the expensive model sees the data is billed at
a tenth. **Programmatic tool calling** is the multiplier here: results return to running
code rather than the context window, so filtering and joining happen outside the
context entirely. Cost then scales with final output, not intermediate volume.

**Model-scoped caches.** A mixed-model pipeline maintains one cache per model. Batch
fan-out *by model*, and never switch models inside a single loop — spawn a subagent
instead.

**Measure cost per completed task, not per token.** A cheaper model taking three times
the turns is more expensive. This is the only economic metric that survives contact with
reality.

---

## D. The researcher / evaluator

*Understanding why models work, or judging them rigorously.*

**Read:** A, B, E in full.
**Ignore:** D mostly.

| Parameter | Why |
|---|---|
| Full config | The actual object of study |
| Training tokens + tokens/param | Where the model sits against scaling curves |
| Data composition | The biggest explanatory variable — and almost never published |
| Post-training recipe | Frequently a larger capability delta than pretraining scale |
| Benchmark provenance | Contamination, saturation, harness variance |

**The methodological rule:** you cannot explain a capability difference from
architecture alone. Frontier architectures have converged — decoder-only, RMSNorm,
SwiGLU, RoPE, GQA-or-MLA, MoE. Capability differences come from data and post-training,
which are exactly what isn't disclosed. Any explanation resting only on config
differences is almost certainly wrong.

**When comparing:** fix the harness, fix the prompt, fix the effort setting, report
variance across seeds, and state the date. Benchmark numbers without a harness
specification are not comparable to anything.

---

## E. The procurement / compliance reader

*Deciding what the organisation may use.*

**Read:** D, plus licence and data-handling terms.
**Ignore:** A, B, most of C.

| Parameter | Why |
|---|---|
| **Data retention posture** | Some models are *unavailable* under zero-retention, not merely degraded |
| Licence tier | Apache-2.0 / MIT / custom-with-conditions. MAU thresholds, attribution, naming, acceptable-use |
| Deployment region | Data residency; per-platform feature availability differs |
| Rate limits per tier | Often the real capacity ceiling, not price |
| Priority/SLA availability | Not uniform across models in the same family |
| Refusal surface | A model that declines your domain is unusable regardless of price |
| Subprocessor posture | Who else touches the data |

**The two hard blockers**, in the sense that they end the evaluation rather than
informing it:

1. **Retention requirements.** A model requiring 30-day retention is simply unavailable
   to a zero-retention organisation. Check first, before any capability comparison.
2. **Domain refusals.** If classifiers decline your core use case, capability is
   irrelevant.

Both are cheap to check and routinely checked last, after weeks of benchmarking.

---

## The cross-role summary

| Role | Cares most about | Can ignore |
|---|---|---|
| Local runner | KV cache, quantisation, MoE memory trap | Closed models, economics |
| API builder | Caching, effort, tier routing | Architecture entirely |
| **Orchestrator** | **Behavioral (F)**, routing economics | Architecture entirely |
| Researcher | Data, post-training, benchmark hygiene | Pricing |
| Compliance | Retention, licence, refusal surface | Nearly all technical detail |

**The pattern:** architecture parameters matter enormously to two of five roles and
almost not at all to the other three — yet they dominate public discussion. Most people
reading about layer counts would be better served by reading about prompt caching.

→ Next: [`07-claims-audit.md`](07-claims-audit.md) — a worked audit of real
model-generated claims about all of the above.
