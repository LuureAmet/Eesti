# 02 — Reading and Verifying

> The antidote to confident fiction is arithmetic you can do yourself.

Most published "specs" for open models are correct. A meaningful minority are not — one
widely-copied third-party page listed Llama 3.1 405B at 118 layers; the real figure is
126. Errors propagate because nobody checks. Checking takes about five minutes.

---

## 1. The source of truth: `config.json`

For any open-weights model on Hugging Face:

```
https://huggingface.co/<org>/<model>/blob/main/config.json
```

Or without a browser:

```bash
curl -s https://huggingface.co/meta-llama/Llama-3.1-405B/raw/main/config.json | jq
```

Gated repos need a token:

```bash
curl -s -H "Authorization: Bearer $HF_TOKEN" \
  https://huggingface.co/<org>/<model>/raw/main/config.json | jq
```

### The keys that matter

```jsonc
{
  "num_hidden_layers":      126,      // depth
  "hidden_size":            16384,    // residual stream width (d_model)
  "intermediate_size":      53248,    // FFN inner width (d_ff)
  "num_attention_heads":    128,      // query heads
  "num_key_value_heads":    8,        // KV heads → GQA group size = 128/8 = 16
  "vocab_size":             128256,
  "max_position_embeddings": 131072,
  "rope_theta":             500000.0, // high base = long-context trained
  "tie_word_embeddings":    false,    // separate output head → embeddings counted twice
  "hidden_act":             "silu",   // SwiGLU → 3 FFN matrices, not 2
  "torch_dtype":            "bfloat16"
}
```

For MoE models, additionally:

```jsonc
{
  "n_routed_experts":       256,
  "num_experts_per_tok":    8,
  "n_shared_experts":       1,
  "moe_intermediate_size":  2048,     // per-expert, much smaller than dense d_ff
  "first_k_dense_replace":  3         // first 3 layers stay dense
}
```

**`config.json` cannot lie about shape.** It is what the loader uses. If a blog post
and `config.json` disagree, `config.json` wins — always, without exception.

---

## 2. Deriving the parameter count from first principles

You do not need to trust a headline number. You can compute it.

### Dense transformer with GQA + SwiGLU

Let `L` = layers, `d` = hidden_size, `f` = intermediate_size, `H` = query heads,
`K` = KV heads, `h` = head_dim, `V` = vocab_size.

**Per-layer attention:**

```
W_Q : d × (H·h)
W_K : d × (K·h)     ← smaller under GQA
W_V : d × (K·h)     ← smaller under GQA
W_O : (H·h) × d
```

**Per-layer FFN (SwiGLU — three matrices):**

```
W_gate : d × f
W_up   : d × f
W_down : f × d
```

This is the most common source of param-count error. SwiGLU is *not* two matrices.
Using 2 instead of 3 undercounts a modern model by roughly a quarter.

**Embeddings:**

```
V × d, doubled if tie_word_embeddings == false
```

**Total:**

```
N ≈ L · [ d·(H·h) + 2·d·(K·h) + (H·h)·d  +  3·d·f ]  +  (1 or 2)·V·d
```

Norm parameters (~2·d per layer) are negligible — under 0.01% at scale.

### Worked example: Llama 3.1 405B

```
L=126, d=16384, f=53248, H=128, K=8, h=128, V=128256, untied
```

| Term | Arithmetic | Result |
|---|---|---|
| W_Q | 16384 × 16384 | 268.4 M |
| W_K | 16384 × 1024 | 16.8 M |
| W_V | 16384 × 1024 | 16.8 M |
| W_O | 16384 × 16384 | 268.4 M |
| **Attention/layer** | | **570.4 M** |
| FFN/layer | 3 × 16384 × 53248 | 2 617.2 M |
| **Total/layer** | | **3 187.6 M** |
| × 126 layers | | **401.6 B** |
| Embeddings | 2 × 128256 × 16384 | 4.2 B |
| **Grand total** | | **405.8 B** ✅ |

The published figure is 405B. The derivation lands within rounding. **The formula is
correct and you can now check anything.**

### MoE variant

Replace the FFN term:

```
Total FFN params  = L_moe · (n_routed + n_shared) · 3 · d · f_expert
Active FFN params = L_moe · (n_active + n_shared) · 3 · d · f_expert
```

Dense prefix layers (`first_k_dense_replace`) use the standard dense FFN term.

Apply to DeepSeek V3 (`L=61`, `d=7168`, 256 routed + 1 shared, 8 active,
`f_expert=2048`, 3 dense prefix layers):

```
MoE layers = 58
Total FFN  = 58 × 257 × 3 × 7168 × 2048   ≈ 656 B
Active FFN = 58 ×   9 × 3 × 7168 × 2048   ≈  23 B
```

Add attention (MLA, ~0.19 B/layer × 61 ≈ 11 B) and embeddings (~1 B): total lands near
the published **671B total / 37B active**. The active figure runs a little above the
FFN-only 23B because the dense prefix layers and all attention are always active. ✅

**This is why "active parameters" is the number that predicts cost.** DeepSeek V3 does
roughly 37B-worth of FLOPs per token while holding 671B in memory.

---

## 3. KV-cache arithmetic — the real memory constraint

For long contexts, KV cache dominates memory, not weights.

```
KV bytes = 2 × L × K × h × seq_len × batch × bytes_per_element
```

(The 2 is K and V.)

### Comparison at 128K context, batch 1, fp16

| Model | L | K | h | Per-token | At 128K |
|---|---|---|---|---|---|
| Llama 3.1 405B (GQA, K=8) | 126 | 8 | 128 | 516 KB | **~66 GB** |
| Same model hypothetically MHA (K=128) | 126 | 128 | 128 | 8.26 MB | **~1 057 GB** |
| DeepSeek V3 (MLA, 576-dim latent) | 61 | — | — | ~70 KB | **~9 GB** |

Two conclusions fall straight out:

1. **GQA is not a minor optimisation.** It is the difference between 66 GB and 1 TB of
   cache. Long context is simply infeasible without it.
2. **MLA is another 7× beyond GQA.** DeepSeek's 671B model needs *less* KV cache than
   Llama's 405B — the architectural reason its long-context serving is cheap.

For MLA the formula becomes `L × latent_dim × seq × bytes` with no factor of 2, because
a single compressed latent replaces both K and V.

### Practical VRAM budget

```
Total VRAM ≈ weights + KV cache + activations + overhead

weights   = N_params × bytes_per_param   (Q4_K_M ≈ 0.6 bytes/param effective)
KV cache  = formula above
overhead  ≈ 1–2 GB (CUDA context, framework)
```

Worked: Llama 3.1 70B at Q4_K_M, 32K context.

```
weights  = 70e9 × 0.6                          ≈ 42 GB
KV       = 2 × 80 × 8 × 128 × 32768 × 2 bytes  ≈ 10.7 GB  (fp16 cache)
overhead                                        ≈  2 GB
                                                 ─────────
                                                 ≈ 55 GB  → needs 2× 40 GB or 1× 80 GB
```

Quantising the KV cache to int8 halves that 10.7 GB, which is often the difference
between fitting and not.

---

## 4. Tokenizer arithmetic — the hidden price variable

**Never use `tiktoken` to estimate Claude tokens.** It's OpenAI's tokenizer; it
undercounts Claude by roughly 15–20% on prose and considerably more on code. Token
counts are model-specific and there is a real API for it.

```python
from anthropic import Anthropic
client = Anthropic()

def count(text: str, model: str) -> int:
    return client.messages.count_tokens(
        model=model,
        messages=[{"role": "user", "content": text}],
    ).input_tokens

body = open("corpus.md").read()
for m in ("claude-opus-5", "claude-fable-5", "claude-haiku-4-5"):
    print(f"{m:24} {count(body, m):>9,}")
```

From the shell:

```bash
ant messages count-tokens --model claude-opus-5 \
  --message '{role: user, content: "@./corpus.md"}' \
  --transform input_tokens -r
```

To diff a file across versions, count each separately and subtract — the endpoint is
stateless.

**Why this matters commercially:** two models at identical $/MTok are not identically
priced if their tokenizers differ by 30%. Always re-baseline token counts when changing
model families; never carry a count across a tokenizer boundary.

---

## 5. A five-minute claim-verification protocol

Given any spec claim about an open model:

1. **Find `config.json`.** If there isn't one, the model is not open-weights, and every
   architecture claim about it is 🌫️. Stop.
2. **Read the shape keys.** Compare directly to the claim.
3. **Derive the param count** with the formula above. Within ~2% is a pass.
4. **Check the ratios for sanity:**
   - `intermediate_size / hidden_size` ≈ 2.7–4 (SwiGLU) — outside that, suspect a typo
   - `hidden_size / num_attention_heads` = 64, 96, or 128 usually
   - `num_attention_heads / num_key_value_heads` = a clean integer
5. **Cross-check against the paper**, not a blog. Blogs copy each other; the error
   propagates.
6. **Confirm the licence** in the repo, not in an article.

For **closed** models, the protocol is shorter: *there is no config.json, therefore every
architectural claim is speculation.* You can still verify **class C/D/E** facts —
pricing, context, features, benchmarks — from vendor docs and the Models API. Those are
real. Layer counts are not.

### Live capability lookup (Anthropic)

Don't trust a cached table for capability questions; ask the API:

```python
m = client.models.retrieve("claude-opus-5")
m.max_input_tokens          # context window
m.max_tokens                # output cap
m.capabilities["effort"]["max"]["supported"]
m.capabilities["thinking"]["types"]["adaptive"]["supported"]

# filter across everything available to you
[x.id for x in client.models.list()
 if x.capabilities["structured_outputs"]["supported"]]
```

`capabilities` is an untyped nested dict — bracket access, check `["supported"]` at the
leaf. Iterate the list result directly; it auto-paginates.

---

## 6. Red flags in any spec claim

| Red flag | Why |
|---|---|
| Layer count for a closed model | Not published. Fabricated or leaked-unverifiable |
| Param count for GPT-5 / Gemini 3 / any Claude | Same |
| "≈1.8T, 16 experts" for GPT-4 | The canonical unverified leak. Repeated so often it reads as fact. It isn't |
| Precise benchmark to one decimal, no harness named | SWE-bench moves points on scaffold alone. A bare number is not comparable |
| Training cost as a single figure | Usually pretraining-only at optimistic rental rates. Excludes data, staff, failed runs, RL |
| "Open source" for weights-only | Different thing. See `03` |
| A number citing another blog citing a third blog | Follow to a primary source or discard |
| Confident claim about a model released after the speaker's cutoff | The dominant failure mode. See `07` |

---

## 7. MLA attention arithmetic

MLA does not fit the `Q/K/V/O` shape above, so it needs its own term. DeepSeek V3's
per-layer attention params:

```
W_DQ  (q down)  : d × q_lora_rank
W_UQ  (q up)    : q_lora_rank × H × (qk_nope_head_dim + qk_rope_head_dim)
W_DKV (kv down) : d × (kv_lora_rank + qk_rope_head_dim)
W_UKV (kv up)   : kv_lora_rank × H × (qk_nope_head_dim + v_head_dim)
W_O             : H × v_head_dim × d
```

With `d=7168, H=128, q_lora=1536, kv_lora=512, rope=64, nope=128, v=128`:

| Term | Result |
|---|---|
| W_DQ | 11.0 M |
| W_UQ | 37.7 M |
| W_DKV | 4.1 M |
| W_UKV | 16.8 M |
| W_O | 117.4 M |
| **Per layer** | **187.1 M** |
| × 61 layers | **11.4 B** |

The equivalent MHA at the same H and head_dim would be 469.8 M/layer → 28.7 B. **MLA
uses 2.5× fewer attention parameters *and* 7× less KV cache.** That is the whole reason
it exists.

---

## 8. Reproducible check script

Lives at [`tools/check_params.py`](tools/check_params.py). It handles dense, GQA/MQA,
MoE, and MLA, and ships with a self-test against two published models:

```
$ python3 tools/check_params.py --self-test
[PASS] Llama 3.1 405B       derived   405.8B /  405.8B active (published 405.0B / 405.0B)
[PASS] DeepSeek V3          derived   670.9B /   37.4B active (published 671.0B / 37.0B)

$ python3 tools/check_params.py meta-llama/Llama-3.1-405B
meta-llama/Llama-3.1-405B
  total  ~   405.8 B
  active ~   405.8 B
```

Both cases land within 0.2% of the published figures — dense and sparse, standard
attention and MLA.

**A note on how this section was written.** The first version of the script assumed
standard attention for everything. Its self-test passed Llama and *failed* DeepSeek at
688.2B against a published 671B — an overcount of 17.2B, which turned out to be exactly
the MHA-minus-MLA attention delta (28.7 − 11.4). The failure diagnosed itself.

That is the argument for shipping a self-test rather than a snippet. An untested script
in a document is a claim; a script with a failing test is a bug report. If you extend
this to a model family with a different attention or FFN structure, **add a case to
`self_test()` with the published figures before trusting the output** — a >2% deviation
means the model does something the formula doesn't model yet, and that deviation is
information.

→ Next: [`03-openness-and-visibility.md`](03-openness-and-visibility.md) — what you
still can't see, even when the weights are public.
