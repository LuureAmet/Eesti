# 04 — Model Atlas

> Every cell carries a confidence mark. Cells without one are not claims.

**Read this file as a template with the durable parts filled in, not as gospel.** Model
releases outpace any static table. The rows that age well are the *structural* ones
(Llama 3.1's config will never change); the rows that age badly are frontier-closed
pricing and capability. Re-derive with [`02`](02-reading-and-verifying.md) before
anything load-bearing.

Marks: ✅ verifiable · 📄 vendor claim · 🔍 third-party measured · 🌫️ speculation · ❌ wrong

---

## Closed frontier models

Architecture columns are 🌫️ **by construction** — none of these vendors publish shape.
The columns that *are* solid are the operational ones.

| Model | Total / active | Layers | Architecture | Context | Price in/out per MTok |
|---|---|---|---|---|---|
| **Claude Opus 5** | 🌫️ undisclosed | 🌫️ | 🌫️ undisclosed | ✅ 1M | ✅ $5 / $25 |
| **Claude Fable 5** | 🌫️ undisclosed | 🌫️ | 🌫️ undisclosed | ✅ 1M | ✅ $10 / $50 |
| **Claude Mythos 5** | 🌫️ undisclosed | 🌫️ | 🌫️ undisclosed | ✅ 1M | ✅ $10 / $50 |
| **Claude Sonnet 5** | 🌫️ | 🌫️ | 🌫️ | ✅ 1M | ✅ $3 / $15 |
| **Claude Haiku 4.5** | 🌫️ | 🌫️ | 🌫️ | ✅ 200K | ✅ $1 / $5 |
| **GPT-5 family** | 🌫️ undisclosed | 🌫️ | 🌫️ MoE implied, unconfirmed | 📄 large | 📄 vendor docs |
| **Gemini 3 Pro** | 🌫️ undisclosed | 🌫️ | 📄 sparse MoE (stated) | 📄 1M | 📄 vendor docs |
| **Grok 4** | 🌫️ leak-only | 🌫️ | 🌫️ | 📄 | 📄 |

**Claude rows carry ✅ on context and price because those come from Anthropic's own
current API reference, not from inference.** Everything architectural is blank for a
reason.

### Claude family — the operational detail that actually differs

This is the part worth memorising, because it's the part you configure.

| | Opus 5 | Fable 5 / Mythos 5 | Sonnet 5 | Haiku 4.5 |
|---|---|---|---|---|
| Price in/out | ✅ $5/$25 | ✅ $10/$50 | ✅ $3/$15 | ✅ $1/$5 |
| Context | ✅ 1M | ✅ 1M | ✅ 1M | ✅ 200K |
| Max output | ✅ 128K | ✅ 128K | ✅ 128K | ✅ 64K |
| Thinking default | ✅ on (adaptive) | ✅ always on | ✅ on (adaptive) | opt-in |
| `thinking: disabled` | ✅ only at effort ≤ `high` | ✅ **400 at any effort** | ✅ accepted | ✅ |
| Effort levels | ✅ low–max | ✅ low–max | ✅ low–max | n/a |
| Fast mode | ✅ yes ($10/$50) | ✅ **no** | ✅ no | ✅ no |
| Priority Tier | ✅ **excluded** | ✅ available | ✅ excluded | ✅ available |
| Zero data retention | ✅ fine | ✅ **unavailable under ZDR** | ✅ fine | ✅ fine |
| Prompt-cache minimum | ✅ 512 tok | ✅ 512 tok | ✅ 1024 tok | ✅ 4096 tok |
| Mid-conv system msgs | ✅ yes | ✅ yes | ✅ **no** | ✅ no |
| Sampling params | ✅ removed (400) | ✅ removed (400) | ✅ removed | ✅ available |
| Raw chain of thought | ✅ never returned | ✅ never returned | ✅ never returned | — |

Four of these are decision-terminating rather than merely informative:

- **Fable 5 under ZDR:** every request 400s. Not a degradation — total unavailability.
- **Fable 5 and security work:** classifiers target most cybersecurity content, and its
  documented bug-finding gains explicitly exclude security analysis.
- **Fast mode vs Priority Tier:** perfectly inverted between Opus 5 and Fable 5. You
  cannot have both on one model.
- **Sonnet 5 lacks mid-conversation system messages.** If your architecture depends on
  them, Sonnet is out regardless of price.

---

## Open-weights models — the verifiable rows

These are ✅ because `config.json` is public. **Verify with the script in
[`02`](02-reading-and-verifying.md#7-reproducible-check-script) rather than trusting
this table** — that's the whole point of publishing the script.

| Model | Total / active | Layers | Hidden | Attention | MoE | Context |
|---|---|---|---|---|---|---|
| **Llama 3.1 405B** | ✅ 405B dense | ✅ 126 | ✅ 16384 | ✅ GQA 128Q/8KV | — dense | ✅ 128K |
| **DeepSeek V3 / R1** | ✅ 671B / 37B | ✅ 61 | ✅ 7168 | ✅ MLA (576 latent) | ✅ 256 routed +1 shared, 8 active | ✅ 128K |
| **Mixtral 8x22B** | ✅ 141B / 39B | ✅ 56 | ✅ 6144 | ✅ GQA | ✅ 8 experts, 2 active | ✅ 64K |
| **Qwen3-235B-A22B** | ✅ 235B / 22B | ✅ 94 | ✅ | ✅ GQA 64Q | ✅ | ✅ 131K (YaRN) |
| **Kimi K2** | ✅ ~1T / 32B | 🔍 | 🔍 | 🔍 | ✅ 384 experts, 8 active | 🔍 |
| **GLM-4.5 / 4.6** | 🔍 ~355B / 32B | 🔍 92 | 🔍 5120 | 🔍 GQA 96, QK-Norm, partial RoPE | 🔍 + shared expert | 🔍 128K→200K |
| **GLM-5** | 🔍 ~744B / 40B | 🌫️ | 🌫️ | 🌫️ | 🔍 MoE | 🔍 |
| **DeepSeek V4** | 🔍 ~1T / 32B | 🌫️ | 🌫️ | 🌫️ | 🔍 | 🔍 |

Rows marked 🔍 come from third-party summaries and community aggregation rather than a
config I can point at. **Every one of them is a five-minute check away from being ✅** —
fetch the config, run the script, promote the row. That is the intended workflow for
this file.

### What each open model contributed technically

Worth separating "big" from "interesting" — several of these changed the field.

**DeepSeek V3** — the most architecturally significant open release of its cycle, on
three independent counts:
1. **MLA** — low-rank KV compression giving ~7× smaller cache than GQA at claimed
   MHA-or-better quality.
2. **Fine-grained MoE** — 256 small experts, 8 active, versus Mixtral's 8 large. Better
   specialisation, combinatorially richer routing.
3. **Native FP8 training at scale** — a genuine first, requiring aux-loss-free load
   balancing and careful stability work.

Also notable for training-cost transparency, though the widely-quoted figure is
*pretraining GPU-hours at assumed rental rates* — it excludes data acquisition, staff,
failed runs, and post-training. Realistic all-in is materially higher. Treat
single-figure training costs as marketing arithmetic regardless of who publishes them.

**Kimi K2** — the **MuonClip** optimiser, scaling the Muon optimiser to trillion-parameter
training with claimed zero loss spikes. Optimiser innovation at frontier scale is rare
and underrated; almost everyone runs AdamW. Also the finest MoE granularity shipped
(384/8).

**Llama 3.1 405B** — historically the important one: the first open-weights model at
genuine frontier scale. Deliberately *dense*, which now looks like the end of an era
rather than the start of one. Its config is the cleanest teaching example of a modern
dense transformer, which is why [`02`](02-reading-and-verifying.md) uses it.

**Qwen3** — breadth. A single family spanning tiny local models to frontier MoE, with
consistent tooling. The pragmatic default for a lot of production work.

**GLM family** — architecturally interesting for **partial RoPE** (only some head dims
rotated) and QK-Norm, and for pushing shared-expert MoE. Increasingly thin documentation
(see [`03`](03-openness-and-visibility.md#the-glm-5-question-specifically)).

**Mixtral 8x22B** — proved sparse MoE worked at production quality under Apache-2.0.
Everything fine-grained that followed is downstream of it.

---

## What this table cannot tell you

Three things, all of which matter more than anything above:

1. **Quality.** There is no column here that predicts it. Config gives you cost and
   memory. Data and post-training give you quality, and neither is in any config.
2. **Behaviour under agentic load.** Delegation propensity, tool-call rate, failure
   signature, refusal surface — [class F in `01`](01-parameter-taxonomy.md#f-behavioral-parameters).
   Undocumented everywhere. Only learnable by running your workload.
3. **Cost per completed task.** The only economic number that matters, and it's a
   product of price × turns × tokens-per-turn, all of which are workload-specific.

The atlas narrows the field. It does not pick the model. Picking requires running your
own eval on your own work.

→ Next: [`05-beyond-transformers.md`](05-beyond-transformers.md) — architectures with a
different parameter vocabulary entirely.
