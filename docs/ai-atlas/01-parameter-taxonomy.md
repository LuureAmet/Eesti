# 01 — The Parameter Taxonomy

> "Parameter" collapses seven unrelated things into one word. This file separates them.

When someone says "a 405B parameter model", they have told you one number from **class A**
below and nothing from classes B–G. For most practical decisions, A is the *least*
informative of the seven.

| Class | What it describes | Who reads it | Visible for closed models? |
|---|---|---|---|
| **A. Weight/shape** | What the model physically *is* | Local runners, researchers | ❌ Never |
| **B. Training** | What *made* it | Researchers, evaluators | ❌ Rarely, even for open |
| **C. Inference-time** | What *you control* per request | Every API user | ✅ Fully documented |
| **D. Serving/economic** | What it *costs* you | Anyone with a budget | ✅ Fully documented |
| **E. Evaluation** | How you *compare* | Everyone | 📄 Vendor + 🔍 third party |
| **F. Behavioral** | How it *acts* under load | Agent orchestrators | 📄 Partially; mostly learned |
| **G. Modality** | How it handles non-text | Vision/audio/video builders | ✅ Partially documented |

The practitioner's inversion: **as models get better, class A matters less and classes
C and F matter more.** You cannot tune GPT-5's layer count. You tune its effort, its
tool surface, and its prompt. That is where leverage now lives.

---

## A. Weight and shape parameters

These live in `config.json` for open-weights models. They are fully determined and
fully checkable. See [`02-reading-and-verifying.md`](02-reading-and-verifying.md) for
how to derive the total from them.

### A1. Core dimensions

| Parameter | Typical `config.json` key | What it controls | Practical effect |
|---|---|---|---|
| Layers (depth) | `num_hidden_layers` | Sequential compute stages | Depth ≈ reasoning-chain capacity; also latency (each layer is a sync point) |
| Hidden / model dim | `hidden_size`, `d_model` | Width of the residual stream | The bandwidth every layer reads from and writes to. The single most consequential number after depth |
| FFN intermediate | `intermediate_size`, `d_ff` | MLP inner width | Usually 2.7–4× `hidden_size` with SwiGLU. Holds the bulk of parameters |
| Vocab size | `vocab_size` | Token inventory | Bigger vocab = fewer tokens per text = cheaper, but larger embedding matrix |
| Max positions | `max_position_embeddings` | Trained context length | Distinct from *served* context — extension methods stretch it |

**The depth/width tradeoff is the oldest real design question.** Deeper = more
sequential composition but harder to train (gradient path) and worse to parallelise
(pipeline bubbles). Wider = more parallel throughput, better hardware utilisation, but
diminishing returns per parameter. Modern frontier configs trend wide-and-deep with
aggressive normalisation to keep training stable.

**Residual stream as bandwidth** is the mental model worth internalising. Every layer
reads the residual stream, computes, and writes back. `hidden_size` is the width of that
shared bus. Everything the model "knows" at position *t* must fit in `hidden_size`
floats. That's why width tracks capability more tightly than raw parameter count.

### A2. Attention shape

| Parameter | Key | Meaning |
|---|---|---|
| Query heads | `num_attention_heads` | Parallel attention subspaces |
| KV heads | `num_key_value_heads` | Distinct K/V projections — **this is the KV-cache driver** |
| Head dim | `head_dim` (or `hidden_size / num_attention_heads`) | Per-head subspace width |

The attention-variant ladder, in order of KV-cache cost:

| Variant | KV heads | KV cache | Quality | Used by |
|---|---|---|---|---|
| **MHA** (multi-head) | = Q heads | Highest | Baseline | GPT-2, early Llama |
| **GQA** (grouped-query) | Q heads / G | ÷G | ~MHA | Llama 3, Qwen3, most 2024+ models |
| **MQA** (multi-query) | 1 | Minimal | Slight loss | PaLM, some serving-optimised models |
| **MLA** (latent) | Compressed to a low-rank latent | Lowest | ≥MHA claimed | DeepSeek V2/V3 |

**MLA is the most interesting attention innovation of the 2024–25 cycle.** Instead of
reducing the *number* of KV heads, it projects K and V into a shared low-rank latent
(DeepSeek V3: 512 dims + 64 decoupled RoPE dims = 576 per token per layer) and caches
only that. The full K/V are reconstructed on the fly. You get MHA-grade quality at
below-MQA cache cost. The arithmetic is in `02`.

### A3. Sparsity / MoE

Only meaningful for Mixture-of-Experts models. **This is where "total vs active" comes
from, and it is the single most misread pair of numbers in the field.**

| Parameter | Meaning |
|---|---|
| `num_experts` / `n_routed_experts` | Total expert FFNs per MoE layer |
| `num_experts_per_tok` | Experts activated per token (top-k routing) |
| `n_shared_experts` | Always-on experts (DeepSeek innovation) — stabilises training |
| `moe_intermediate_size` | Per-expert FFN width (much smaller than a dense `d_ff`) |
| `first_k_dense_replace` | How many early layers stay dense before MoE begins |
| Router type | Top-k softmax, sigmoid gating, aux-loss vs aux-loss-free balancing |

**Total parameters ≈ knowledge capacity. Active parameters ≈ per-token compute and
therefore cost and speed.** A 671B/37B model stores what a 671B model stores but costs
roughly what a 37B model costs to run per token. It does *not* cost what a 37B model
costs to *hold in memory* — you still need all 671B resident (or expert-offloaded, with
a latency penalty). This distinction — **compute-cheap, memory-expensive** — is why MoE
won for API serving and lost for consumer local inference.

**Expert granularity** is an underappreciated axis. Mixtral used 8 large experts, 2
active. DeepSeek V3 uses 256 fine-grained experts, 8 active. Kimi K2 pushes to 384/8.
Finer granularity means more specialisation and a combinatorially larger space of
expert *combinations* per token, at the cost of harder routing and worse hardware
utilisation. The trend has run decisively toward fine-grained.

### A4. Positional encoding

| Parameter | Meaning | Why you care |
|---|---|---|
| `rope_theta` / base | RoPE frequency base (10 000 → 500 000 → 10⁷) | Higher base = longer effective context. Raising it is the cheapest context extension |
| Partial RoPE ratio | Fraction of head dims that get rotated | Some dims stay position-agnostic; GLM uses this |
| `rope_scaling` | YaRN / NTK / linear / dynamic | Post-hoc context extension method + factor |
| NoPE | No positional encoding in some layers | Emerging technique; causal masking alone carries some position info |

**Context length is not a single number.** There are at least four: (1) natively
trained length, (2) extended length via RoPE scaling, (3) length the vendor *serves*,
(4) length at which quality actually holds. Vendors quote (3). Needle-in-a-haystack
tests probe (1)–(2). Real multi-fact reasoning across the window tests (4), and (4) is
routinely far below (3).

### A5. Normalisation and activation

| Parameter | Options | Note |
|---|---|---|
| Norm type | LayerNorm, RMSNorm | RMSNorm won — cheaper, no mean subtraction, no quality loss |
| Norm placement | Pre-norm, post-norm, sandwich | Pre-norm dominates for trainability |
| QK-Norm | on/off | Normalises Q and K before attention. Major stability win at scale; adopted widely 2024+ |
| Activation | GELU, SwiGLU, GeGLU | SwiGLU dominant. **Uses 3 weight matrices, not 2** — this is a common param-count error |
| Embedding tying | `tie_word_embeddings` | Shared input/output embedding. Saves `vocab × d_model` params |

### A6. Precision and quantisation

Not architecture, but it determines what you can actually run.

| Format | Bits/param | Quality | Use |
|---|---|---|---|
| FP32 | 32 | Reference | Training only, rarely |
| BF16 / FP16 | 16 | Reference | Standard training + serving |
| FP8 | 8 | ~Lossless with care | DeepSeek V3 trained natively in FP8 — a genuine first |
| INT8 / Q8 | 8 | Near-lossless | Safe local quantisation |
| Q5_K_M | ~5.5 | Slight | Good local sweet spot |
| Q4_K_M | ~4.8 | Noticeable on hard tasks | The common local default |
| Q3 and below | ≤3.5 | Substantial degradation | Desperation |

Quantisation methods differ in *what* they quantise: **GGUF** (llama.cpp, mixed
per-block), **AWQ** (activation-aware, protects salient weights), **GPTQ** (layerwise
second-order), **bitsandbytes** (on-the-fly NF4). AWQ and GPTQ generally beat naive
round-to-nearest at the same bit width.

---

## B. Training parameters

Determine capability more than architecture does. Almost never fully published — even
open-weights releases usually withhold data composition.

### B1. Scale

| Parameter | Meaning |
|---|---|
| Training tokens | Total tokens seen. The other half of the scaling equation |
| Tokens-per-parameter | Chinchilla-optimal ≈ 20. Modern models run 100–1000+ |
| Compute (FLOPs) | ≈ `6 × N_params × N_tokens` for dense training |
| GPU-hours | The cost proxy |

**Chinchilla is widely misapplied.** It answers "given a fixed training budget, what
size and token count minimise loss?" — a *training-cost* optimum. It says nothing about
*inference* cost. Since inference dominates lifetime cost for a deployed model,
everyone now deliberately overtrains small models far past Chinchilla, trading extra
training compute for permanently cheaper serving. Llama 3 8B saw ~15T tokens against a
Chinchilla-optimal ~160B. That's ~90× overtrained, on purpose.

### B2. Optimisation

| Parameter | Note |
|---|---|
| Optimiser | AdamW standard. **Muon** (and MuonClip) is the notable recent departure — an orthogonalising second-order-ish method that scaled to 1T params with claimed zero loss spikes |
| Learning-rate schedule | Cosine, WSD (warmup-stable-decay). WSD allows checkpoint reuse mid-run |
| Batch size | Often ramped during training |
| Gradient clipping, z-loss | Stability machinery, rarely reported but load-bearing |
| Load balancing (MoE) | Auxiliary-loss vs **aux-loss-free** (DeepSeek's bias-adjustment trick, avoids the quality tax of a balancing loss) |
| Multi-token prediction | Predict n+1 *and* n+2 during training. Improves the signal per token; also enables self-speculative decoding at inference |

### B3. Data

The most consequential and least disclosed class.

| Parameter | Disclosure reality |
|---|---|
| Corpus composition (web/code/math/multilingual %) | Almost never precise |
| Deduplication method | Sometimes described |
| Quality filtering / classifier | Rarely |
| Synthetic data fraction | Increasingly large, almost never quantified |
| Curriculum / annealing mix | Occasionally |
| Contamination controls | Claimed, rarely evidenced |

**If someone tells you they understand why model X is good at Y, and they don't have
the data mixture, they are guessing.** Architecture differences between frontier models
are modest. Data and post-training differences are enormous.

### B4. Post-training

Where a base model becomes a product. Often a larger capability delta than pretraining
scale.

| Stage | What it does |
|---|---|
| **SFT** | Supervised fine-tuning on demonstrations. Sets format and basic instruction-following |
| **RLHF** | RL from human preference. Classic PPO-on-reward-model pipeline |
| **RLAIF / Constitutional** | AI feedback against a written principle set. Anthropic's approach |
| **DPO / GRPO / other** | Preference optimisation without a separate reward model. Cheaper, widely adopted |
| **RLVR** | RL from *verifiable* rewards — math with checkable answers, code with passing tests. The reasoning-model breakthrough |
| **Distillation** | Train a small model on a large one's outputs. How capable small models get made |
| **Rejection sampling** | Generate n, keep the best by some filter, train on those |

**RLVR is the most important post-training development of the last two years.** The
DeepSeek-R1 result — that RL on purely verifiable domains (math, code) produces
reasoning that *generalises* to non-verifiable domains — reframed what post-training
could do. It also explains why reasoning models cluster: everyone found the same lever.

---

## C. Inference-time parameters — the ones you actually control

For a closed frontier model, this class **is** your entire surface area. Worth knowing
in detail, because it's the only place your engineering shows up.

### C1. Sampling (the classical set)

| Parameter | Effect | Status on frontier Claude |
|---|---|---|
| `temperature` | Logit sharpening | ❌ Removed — 400 on Opus 4.7+, Fable 5, Sonnet 5 |
| `top_p` | Nucleus truncation | ❌ Removed |
| `top_k` | Hard top-k truncation | ❌ Removed |
| `repetition_penalty` | Anti-loop | Not exposed |
| `stop_sequences` | Early termination | ✅ Available |

**The removal of sampling parameters on frontier models is a real shift, not an
oversight.** Reasoning models are post-trained to a specific output distribution;
perturbing it with temperature degrades rather than diversifies. The replacement for
"I want variety" is prompting — and for design work specifically, asking the model to
*propose several distinct directions and pick one* reliably outperforms what
temperature ever gave you.

### C2. Reasoning control (the modern set)

| Parameter | Effect |
|---|---|
| `thinking: {type}` | `adaptive` / `disabled` / (legacy) `enabled` + budget |
| `thinking.display` | `omitted` / `summarized` — visibility only; billing is identical |
| `effort` | `low`–`max`. Governs thinking depth *and* overall action budget |
| `task_budget` | Token ceiling for a whole agentic loop that the model *can see* and paces against |
| `max_tokens` | Hard per-response cap the model **cannot** see. Truncates without warning |

**`task_budget` vs `max_tokens` is the distinction people miss.** `max_tokens` is a
guillotine — the model doesn't know it exists and gets cut mid-sentence. `task_budget`
is a briefing — the model sees a countdown and wraps up gracefully. For agentic loops
you want both: budget for pacing, max_tokens for safety.

**Effort is now the primary cost lever**, and its relationship to quality is
non-monotonic. Higher effort on agentic work often *reduces* total cost by cutting turn
count. Sweep it per route; don't inherit a setting from a previous model.

### C3. Context management

| Parameter | Effect |
|---|---|
| Prompt caching + TTL | 5 min or 1 h. Read ≈ 0.1×, write ≈ 1.25× (5 m) or 2× (1 h) |
| Cache breakpoints | Max 4. Placed at stability boundaries |
| Context editing | Prune stale tool results / thinking blocks |
| Compaction | Summarise history server-side when nearing the window |
| Memory stores | Cross-session persistence, versioned |

### C4. Structure and tools

| Parameter | Effect |
|---|---|
| `output_config.format` | JSON-schema-constrained output. **Incompatible with citations** |
| `strict: true` on a tool | Guaranteed-valid tool arguments. **Compatible with citations** |
| `tool_choice` | `auto` / `any` / specific / `none` |
| `disable_parallel_tool_use` | Force one tool per turn |
| `defer_loading` | Declare a tool without loading its schema into context |
| `allowed_callers` | Permit a tool to be called from inside code execution |

---

## D. Serving and economic parameters

| Parameter | Why it decides things |
|---|---|
| $/MTok input, $/MTok output | Output is typically 5× input. Reasoning models emit far more output |
| Cache read / write multipliers | Changes the economics of any repeated-prefix workload by ~10× |
| Batch discount | Typically 50% for async |
| Tokens/second | Throughput |
| TTFT | Time to first token — the number users actually feel |
| Rate limits (RPM / ITPM / OTPM) | Often the real ceiling, not price |
| Tokenizer efficiency | **A hidden price variable.** Different tokenizers turn the same text into different token counts — a 30% tokenizer difference is a 30% price difference at identical sticker rates |

**Sticker price is the wrong comparison unit.** The right one is
**cost-per-completed-task**. A model at half the per-token price that takes three times
as many turns is more expensive. Measure the task, not the token.

---

## E. Evaluation parameters

| Benchmark family | Measures | Saturation risk |
|---|---|---|
| MMLU / MMLU-Pro | Broad knowledge | High — largely saturated |
| GPQA Diamond | Graduate science reasoning | Rising fast |
| SWE-bench Verified | Real GitHub issue resolution | The current coding standard |
| Terminal-Bench / agentic suites | Multi-step tool use | Current frontier |
| HLE | Deliberately extremely hard | Low |
| AIME / competition math | Math reasoning | Contamination-prone |
| LMArena Elo | Human blind preference | Measures *preference*, not correctness |
| Artificial Analysis Index | Composite | Useful aggregate; check the weighting |

Four failure modes to check before trusting any benchmark table:

1. **Saturation** — a benchmark everyone scores 94% on discriminates nothing.
2. **Contamination** — test items in the training corpus. Suspect any benchmark older than the model.
3. **Harness variance** — SWE-bench scores move several points on scaffold changes alone. Same model, different agent loop, different number.
4. **Selective reporting** — vendors show the suites where they win.

---

## F. Behavioral parameters

Not in any config, not in any model card, and the class that most determines whether
your agent system works. These are learned empirically per model and change between
versions.

| Dimension | Range | Why it matters |
|---|---|---|
| Instruction literalism | Loose ↔ literal | Literal models follow "only report high-severity" exactly — and silently drop findings |
| Tool-call propensity | Conservative ↔ eager | Under-calling loses grounding; over-calling burns budget |
| Delegation propensity | Reluctant ↔ eager | Directly multiplies cost in multi-agent systems |
| Verbosity calibration | Fixed ↔ task-scaled | Determines whether length instructions are needed |
| Self-verification | Needs prompting ↔ automatic | Telling a self-verifying model to verify causes *over*-verification |
| Scope discipline | Narrow ↔ expansive | Expansive models add unrequested work |
| Long-horizon coherence | Drifts ↔ sustains | Governs max viable autonomous run length |
| Refusal surface | Which domains trip classifiers | Can make a model unusable for a whole task class regardless of capability |
| Failure-mode signature | Fabricated progress, early stopping, context anxiety, narration collapse | Each has a specific prompt-level mitigation |

**This class is the practical difference between a demo and a system.** Two models with
identical benchmark scores can have opposite delegation propensities, and that alone
decides whether your orchestration costs €40 or €400 a run. It is only discoverable by
running the model on your actual workload — which is the argument for keeping a small,
fixed, internal eval set.

---

## G. Modality-specific parameters

### Vision

| Parameter | Meaning |
|---|---|
| Max resolution | Long-edge pixel cap before downscaling |
| Patch size | Pixels per visual token (14×14, 16×16 typical) |
| Tokens per image | Drives cost — can be 1 500–4 800+ for a high-res image |
| Tiling / AnyRes | How non-square and large images are split |
| Encoder type | ViT, SigLIP, or native-multimodal (no separate encoder) |
| Coordinate space | Whether returned coords map 1:1 to pixels or need scale-factor math |

**Vision token cost is the sleeper line item.** A high-resolution image at frontier
tiers can cost more than several pages of text. If your pipeline doesn't need the
fidelity, downsample before upload — but measure with a token counter first rather than
assuming.

### Audio / speech

Sample rate, codec (discrete acoustic tokens vs continuous), frame rate, streaming vs
batch, speaker diarisation support, tokens-per-second-of-audio.

### Video

Frames sampled per second, temporal compression ratio, max duration, whether audio is
processed jointly, tokens per second of footage.

### Embeddings and retrieval

A separate parameter vocabulary that matters enormously for mixed structured/unstructured
work:

| Parameter | Meaning |
|---|---|
| Embedding dimension | 384 → 4096. Storage and recall tradeoff |
| Matryoshka dims | Truncatable embeddings — one model serves several dimension budgets |
| Max sequence | Chunk ceiling |
| Pooling | CLS / mean / last-token |
| Similarity metric | Cosine / dot / Euclidean — must match training |
| Chunk size + overlap | Retrieval-side, not model-side, but dominates quality |
| Top-k, hybrid α | How many, and the dense/sparse blend weight |
| Reranker | Cross-encoder second stage. Usually the highest-ROI retrieval addition |

---

## The synthesis

Reading down the seven classes, the honest summary is:

- **Class A** is fully knowable for open models, permanently unknowable for closed ones,
  and less predictive of usefulness than its prominence suggests.
- **Class B** determines more than A and is disclosed less.
- **Classes C and D** are fully documented for every commercial model and are where
  practitioner skill actually compounds.
- **Class E** is the noisiest and most gamed.
- **Class F** is undocumented, decisive for agent work, and only learnable by running
  your own workload.
- **Class G** is where costs hide.

The practical conclusion: **stop trying to infer closed-model architecture, and start
measuring closed-model behaviour.** The former is unknowable and the latter is what
determines whether your system works.

→ Next: [`02-reading-and-verifying.md`](02-reading-and-verifying.md) — how to actually
read and check class A yourself.
