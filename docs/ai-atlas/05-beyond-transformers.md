# 05 — Beyond Transformers

> "What else is out there." Quite a lot — and each family has parameters the transformer
> vocabulary has no word for.

The transformer's structural weakness is fixed and well understood: **attention is
O(n²) in sequence length, and the KV cache grows linearly forever.** Every alternative
below is, at bottom, an attack on one of those two facts.

---

## 1. State Space Models (SSM) — Mamba and relatives

A different mechanism for carrying information across a sequence. Instead of every
token attending to every previous token, the model maintains a **fixed-size recurrent
state** that it updates as it reads.

**The consequence is categorical, not incremental:**

| | Transformer | SSM |
|---|---|---|
| Compute vs length | O(n²) | **O(n)** |
| Memory during generation | Grows with context (KV cache) | **Constant** |
| Parallel training | Yes | Yes (via parallel scan) |
| Random access to history | Exact | Compressed / lossy |

**Parameters SSMs have that transformers don't:**

| Parameter | Meaning |
|---|---|
| `d_state` | Size of the recurrent hidden state. The core capacity knob — the SSM analogue of KV cache size, but *fixed* |
| `d_conv` | Width of the short causal convolution before the scan |
| `expand` | Inner-dimension expansion factor (typically 2) |
| Selectivity | Whether the state-transition parameters are **input-dependent** — Mamba's central contribution. Earlier SSMs used fixed dynamics and couldn't do content-based reasoning |
| Discretisation (Δ) | Step size converting continuous dynamics to discrete steps |

**Why selectivity mattered.** Pre-Mamba SSMs were fast but couldn't selectively remember
or forget based on content — they treated all tokens alike. Making the transition
parameters a function of the input let the model choose what to retain, which is exactly
what attention does implicitly. That single change closed most of the quality gap.

**The honest tradeoff:** SSMs compress history into a fixed state, so they lose exact
recall. Tasks needing verbatim retrieval from far back (copy this specific string,
what exactly did line 4000 say) favour attention. Tasks needing *summarised* long-range
context favour SSMs. This is why pure SSMs haven't displaced transformers at the
frontier and why hybrids exist.

**Also in this family:** RWKV (RNN-like, attention-free, trainable in parallel),
RetNet, Hyena, and various linear-attention formulations. All chase the same O(n) prize.

---

## 2. Hybrid SSM-Transformer

The pragmatic resolution: **interleave**. Use SSM layers for cheap sequence mixing and
occasional attention layers for exact recall.

The design parameter is the **ratio** — e.g. one attention layer per seven SSM layers,
often with MoE on alternating blocks. Attention layers carry the KV cache; SSM layers
don't. A 1:7 ratio therefore cuts KV memory by roughly 8× while keeping exact-recall
capability at regular intervals.

**Why this matters practically:** a hybrid can hold a very long context on a single
accelerator specifically because seven-eighths of its layers store no KV. This is a
real deployment advantage, not a benchmark artefact, and it's the strongest existing
evidence that pure-transformer long context is an economic dead end rather than a law
of nature.

Hybrid designs have appeared in production models from several labs; the ratio and
placement of attention layers is the main differentiator.

---

## 3. Diffusion language models

Text generation by iterative denoising rather than left-to-right autoregression. Start
from noise (or a fully-masked sequence) and refine over several steps.

| Parameter | Meaning |
|---|---|
| Denoising steps | Refinement passes. **The quality/speed dial** |
| Noise / masking schedule | How corruption is applied and removed |
| Remasking strategy | Which tokens to re-predict each step |
| Guidance scale | Conditioning strength, as in image diffusion |

**The structural appeal:** generation is **parallel across positions**, not sequential.
An autoregressive model must emit token 500 after token 499. A diffusion LM can refine
all positions simultaneously, so latency scales with *step count* rather than *output
length*. It can also edit its own earlier output — autoregressive models cannot revise
a token once emitted.

**Current state:** promising, early, not competitive at frontier scale. Worth tracking
because the parallel-generation property is genuinely different, and long outputs are
exactly where autoregression hurts most.

---

## 4. World models

A different objective, not a different architecture. LLMs predict the next token; world
models predict **how an action changes an environment**.

| Parameter | Meaning |
|---|---|
| Latent state dim | Compressed world representation |
| Action space | Discrete or continuous control dimensionality |
| Rollout horizon | Steps predicted forward |
| Prediction target | **Pixels vs latents** — the central design split |
| Frame rate / temporal resolution | For video-based models |

**The pixel-vs-latent split is the interesting argument.** Predicting raw pixels wastes
enormous capacity on visually salient but semantically irrelevant detail — exact leaf
positions, film grain. Predicting in *latent* space forces the model to represent what
matters causally. The joint-embedding predictive line of work (predict latent
representations, not reconstructions) is the main standard-bearer for the latent camp,
and the argument that this is the path to physical understanding — as opposed to
scaling text prediction — is one of the field's live disputes.

**Categories:** video generation, real-time interactive environment models, robotics
world models trained on manipulation data, and simulation platforms for synthetic
training data.

**Why it matters to a language-model practitioner:** it is a genuinely different
capability axis. A model that understands that an unsupported object falls has
something no amount of text prediction reliably confers. Whether that turns out to be
necessary for general capability is unresolved — but it's the strongest live challenge
to the text-scaling paradigm.

---

## 5. Encoder and embedding models

Small, unglamorous, and disproportionately important for mixed structured/unstructured
work. Different parameters entirely.

| Parameter | Meaning | Why it matters |
|---|---|---|
| Embedding dimension | 384 → 4096 | Storage × recall tradeoff. 1024 is a common sweet spot |
| **Matryoshka dims** | Truncatable representation | One model serves 256/512/1024-dim budgets. Truncate the vector, keep most of the quality. Excellent for tiered retrieval |
| Max sequence | Chunk ceiling | Determines chunking strategy |
| Pooling | CLS / mean / last-token | Must match how it was trained |
| Similarity metric | Cosine / dot / L2 | Must match training. Mismatches silently degrade recall |
| Multilingual | Shared space across languages | Cross-lingual retrieval without translation |
| Instruction-tuned | Query/document asymmetry | Prefix conventions matter; getting them wrong costs real recall |

**Rerankers** are cross-encoders that score (query, document) pairs jointly rather than
independently. Far more accurate than bi-encoder similarity, far too slow to run over a
whole corpus. The standard pattern — retrieve 100 with embeddings, rerank to 10 with a
cross-encoder — is usually the highest-ROI single addition to a retrieval system, and
it's routinely skipped.

**Retrieval-side parameters that aren't in any model:**

| Parameter | Typical | Note |
|---|---|---|
| Chunk size | 256–1024 tokens | Dominates quality more than embedding model choice |
| Overlap | 10–20% | Prevents boundary loss |
| Top-k | 5–50 | Feeds the reranker |
| Hybrid α | 0.3–0.7 | Dense/sparse (BM25) blend weight |
| Metadata filters | — | Often beats better embeddings outright |

**Chunking strategy beats embedding-model choice.** Teams routinely A/B embedding models
for weeks while leaving a naive fixed-size chunker in place. The chunker is where the
quality is.

---

## 6. Inference-time architectures

Not models — techniques that change effective performance without touching weights.

| Technique | Parameter | Effect |
|---|---|---|
| **Speculative decoding** | Draft model size, lookahead k, acceptance threshold | Small model proposes, large model verifies in parallel. 2–3× speedup, **output distribution unchanged** |
| **Self-speculative** | Multi-token-prediction heads | Same idea without a separate draft model — a reason MTP training pays off twice |
| **Continuous batching** | Max batch, scheduling policy | The main serving-throughput lever |
| **Paged attention** | Block size | KV cache paging; eliminates fragmentation |
| **Prefix caching** | Cache size, eviction | Shared-prefix reuse — the serving analogue of prompt caching |
| **Quantised KV cache** | int8 / fp8 | Halves or quarters cache memory. Often the difference between fitting and not |

Speculative decoding deserves emphasis: it is **mathematically lossless**. The verifier
accepts only tokens the large model would have produced anyway. Free latency, no quality
cost. If you serve your own models and aren't using it, you're leaving 2–3× on the table.

---

## 7. The comparison that actually matters

| Family | Kills O(n²)? | Exact recall? | Frontier-ready? | Best at |
|---|---|---|---|---|
| Transformer | ❌ | ✅ | ✅ | Everything, expensively |
| Pure SSM | ✅ | ❌ compressed | ⚠️ near | Very long streams, edge deployment |
| Hybrid | ✅ mostly | ✅ at intervals | ✅ | Long context on constrained hardware |
| Diffusion LM | ➖ different axis | ✅ | ❌ early | Parallel generation, self-editing |
| World model | n/a | n/a | ⚠️ domain | Physical/causal prediction |
| Embedding | n/a | n/a | ✅ | Retrieval — the unglamorous workhorse |

**The synthesis:** the transformer is not obviously permanent, but nothing has displaced
it either. Hybrids are the live compromise, and they are already in production. The
strongest signal to watch is not benchmark scores — it's whether long-context *serving
economics* push more of the field toward SSM layers. That's an infrastructure question,
and infrastructure questions decide architecture more often than research results do.

→ Next: [`06-role-views.md`](06-role-views.md) — which of all this you can safely ignore,
depending on your job.
