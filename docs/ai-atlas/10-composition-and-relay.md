# 10 — Composition and Relay

> Getting many models — including free ones — to work as one system, and doing it in a
> way that survives contact with terms of service, bills, and your own future self.

The economics justify the engineering. With a 10–50× spread between the cheapest usable
tier and the frontier, a system that routes correctly is not marginally cheaper; it is
categorically cheaper. The 90/5/5 split from [`03`](03-openness-and-visibility.md) is
the design premise: most work does not need the expensive model.

---

## 0. One boundary, stated up front

**Use each provider's API, under that provider's terms.** Driving a chat web UI with a
headless browser to avoid API pricing violates essentially every provider's terms,
breaks without warning, and puts the account at risk. It is also unnecessary — the
legitimate architecture below is cheaper than the frontier tier by an order of magnitude
and does not depend on anyone not noticing.

Where a subscription genuinely includes programmatic access, use the documented
interface for it. Where it doesn't, the free and open tiers below cover the work.

---

## 1. The tier ladder

| Tier | Sources | Cost | Best at |
|---|---|---|---|
| **Local** | Ollama, llama.cpp, vLLM, LM Studio | Electricity | Bulk extraction, classification, private data, unlimited retries |
| **Free-tier hosted** | Provider free tiers, notebook GPUs, free model endpoints on aggregators | Free, rate-limited | Burst capacity, models too big for local |
| **Cheap API** | Small hosted models | ~$0.1–1 / MTok | Reliable prep with an SLA |
| **Mid API** | Volume-tier frontier models | ~$3 / MTok | Implementation, review |
| **Frontier API** | Top tier | $5–10 / MTok | Long-horizon autonomy, hardest reasoning |

**The whole discipline is: never let a tier do work a lower tier can do.**

Free tiers are genuinely useful but come with real constraints — rate limits, no
availability guarantee, and frequently a data-use policy that permits training on your
inputs. That last one is the binding constraint for anything sensitive, and it is the
reason the local tier exists in this table rather than being a curiosity.

---

## 2. Relay: cheap extraction, expensive synthesis

The core pattern. Fan out over a corpus with a cheap model producing **strictly
structured** output; fan in with one expensive call over the structured digest.

```
corpus (N docs)
   │
   ├─ local/cheap × N ──→ strict JSON per doc      ← 90% of tokens, ~1% of cost
   │                        {claims[], keywords[], confidence}
   │
   └─ frontier × 1 ────→ synthesis over the digest ← 10% of tokens, ~99% of value
```

Cost behaves well because the expensive model never sees the raw corpus. A 500-document
corpus that would be millions of frontier tokens becomes one frontier call over a
compact digest.

Two rules make it work:

1. **The cheap tier must emit a schema, not prose.** Prose has to be re-read by the
   expensive model, which defeats the point. Constrain the output.
2. **Carry provenance through every hop.** Each extracted claim keeps a pointer to its
   source. Otherwise the synthesis is unauditable and you have built a confident-
   sounding blender.

---

## 3. Model-asks-model

Three legitimate shapes, in increasing order of coupling.

**Tool-call relay** — the strongest. Model A has a tool whose implementation calls model
B. A doesn't know B exists; it just calls `deep_research(question)`. Your orchestrator
owns routing, so swapping B is a config change.

```python
@beta_tool
def consult_local(question: str) -> str:
    """Ask the local model. Use for bulk lookup where speed matters more than depth."""
    return ollama_chat(model="qwen3:8b", prompt=question)
```

**Advisor pattern** — where the provider supports it natively: a cheaper executor model
runs the loop and consults a stronger advisor model for planning, without you writing
the relay. Note that on frontier models the advisor's return may be encrypted — you can
replay it, not read it — so don't design around inspecting it.

**Sequential pipeline** — the simplest and most debuggable. Each stage writes to disk;
each stage is independently re-runnable. Unfashionable and usually correct.

**The pattern to avoid:** free-form conversation between two models with no schema
between them. It burns tokens, drifts, and produces no artifact you can audit. Every
hop should have a typed interface.

---

## 4. Provenance that survives the pipeline

With N models touching a corpus, "where did this come from" degrades fast unless it is
structural. The minimum viable record per claim:

```json
{
  "claim": "DeepSeek V3 uses 256 routed experts with 8 active",
  "source": {"path": "deepseek-v3.md", "loc": "L142-149"},
  "extracted_by": {"model": "qwen3:8b", "at": "2026-07-26T04:12:00Z"},
  "verified_by": {"method": "config.json", "at": "...", "result": "confirmed"},
  "confidence": 3
}
```

Three properties matter more than the exact shape: **the source pointer survives every
hop**, **the extracting model is named** (so you can re-run when you replace it), and
**verification is a separate field from extraction** — because who *said* it and whether
it is *true* are different questions, and collapsing them is how a corpus rots.

Store it as append-only. A claim that gets revised should produce a new record, not
overwrite the old one — for the same reason memory versioning matters in
[`09`](09-underdiscussed-parameters.md).

---

## 5. Routing as data, not code

Routing rules buried in prompt strings cannot be diffed, tested, or reasoned about. The
Lisp instinct is the right one here: **make the routing table a data structure your
program evaluates**, so rules are inspectable values rather than control flow.

```python
ROUTES = [
    # (predicate, model, effort, why)
    (lambda t: t.kind == "classify",                    "local:qwen3-8b",  "low",    "mechanical"),
    (lambda t: t.kind == "extract" and t.tokens < 8000, "local:qwen3-8b",  "low",    "bulk"),
    (lambda t: t.kind == "extract",                     "haiku",           "low",    "too big for local ctx"),
    (lambda t: t.kind == "review",                      "opus",            "high",   "precision+recall"),
    (lambda t: t.kind == "security",                    "opus",            "high",   "classifier constraint"),
    (lambda t: t.horizon == "long",                     "fable",           "high",   "async subagents"),
]

def route(task):
    for pred, model, effort, why in ROUTES:
        if pred(task):
            return Route(model, effort, why)
    raise Unroutable(task)          # fail loudly; never silently default to frontier
```

Three properties this buys you:

- **`why` is mandatory.** A route without a stated reason is a route nobody can audit
  later, including you.
- **Unroutable raises.** Silently defaulting to the expensive model is how routing
  systems quietly stop saving money.
- **The table is testable.** Assert that a security task never routes to a
  classifier-constrained model. That is a unit test, not a hope.

---

## 6. Deployment shape

Keep it boring. A small orchestrator plus a local model server plus a work queue covers
almost everything:

```yaml
services:
  ollama:                       # local tier
    image: ollama/ollama
    volumes: ["./models:/root/.ollama"]
    deploy: {resources: {reservations: {devices: [{capabilities: [gpu]}]}}}

  orchestrator:                 # routing + API calls
    build: .
    environment: [ANTHROPIC_API_KEY, OLLAMA_HOST=http://ollama:11434]
    volumes: ["./work:/work"]   # stage artifacts on disk, not in memory
    depends_on: [ollama]
```

Design choices worth defending:

- **Every stage writes to disk.** A pipeline whose intermediate state lives only in
  process memory cannot be resumed, and long runs fail.
- **Keys live in the orchestrator, never in a worker or a sandbox.** If a step needs a
  credential, the orchestrator makes that call and passes back the result.
- **Idempotent stages keyed by content hash.** Re-running should skip completed work.
  This is what makes an interrupted overnight run cheap to resume instead of expensive
  to restart.
- **Log the routing decision, not just the result.** When cost spikes, you need to see
  which predicate fired.

For remote GPU boxes, an SSH tunnel to the model server (`ssh -N -L 11434:localhost:11434 host`)
keeps the endpoint off the public internet with no additional infrastructure.

---

## 7. Cost discipline

| Lever | Effect |
|---|---|
| **Route to the cheapest sufficient tier** | 10–50× on the routed portion |
| **Prompt caching** | ~10× on repeated prefixes. Structure prompts so stable content precedes volatile |
| **Batch API** | ~50% on anything not latency-sensitive |
| **Keep intermediates out of context** | Filtering in code rather than in-context can dominate everything else |
| **Task budgets** | Prevents runaway loops; the model paces itself against a countdown it can see |
| **Local for retries** | Iterate against a free model, run the final pass on the paid one |

**Measure cost per completed task, never per token.** A cheaper model taking three times
the turns is more expensive, and per-token dashboards actively hide this.

**Instrument before optimising.** Log model, effort, input tokens, output tokens, cache
hits, wall time, and outcome for every call. The distribution is almost never what you
expect — the usual finding is that a small number of routes dominate spend, and they are
rarely the ones anyone predicted.

---

## 8. The honest limits

- **Free tiers are not an SLA.** Fine for development and batch work; design for
  failure if anything depends on them.
- **Local models are meaningfully weaker at long-horizon agentic work.** They are
  excellent at bounded, well-specified tasks. The gap is smallest on extraction and
  classification, largest on autonomy — which is exactly why the split in §2 works.
- **Every hop loses fidelity.** A five-stage pipeline of cheap models can end up worse
  *and* slower than one good call. Add stages only when you can measure the improvement.
- **Complexity has a real cost.** A routing system is a system: it needs tests,
  monitoring, and maintenance. Below some volume, one good model and a simple loop
  genuinely wins, and knowing where that threshold sits for your workload is worth more
  than any individual optimisation here.

→ Next: [`11-taken-out.md`](11-taken-out.md).
