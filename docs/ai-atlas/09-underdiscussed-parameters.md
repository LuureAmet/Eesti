# 09 — Underdiscussed and Emerging Parameters

> Parameters that exist, matter, and appear in no `config.json` and no model card.
> Some are measured. Some are actively researched. Some are speculation. The marks
> distinguish them, because the distinction is the whole value of the chapter.

Fiction got to several of these before the field did. *Ghost in the Shell* and *Serial
Experiments Lain* are not technical sources, but they posed questions — what persists
when the substrate changes, whether memory constitutes identity, what a distributed
self is — that turn out to map onto live research areas with surprising precision. Where
that mapping is real, this file says so and names the actual work. Where it is a
metaphor, it says that too.

---

## 1. Activation-space parameters ✅ measured

The most important development the parameter discourse has not absorbed: **models have
readable and writable internal state that is not weights.**

| Parameter | What it is |
|---|---|
| **Feature directions** | Directions in activation space corresponding to interpretable concepts. Extractable with sparse autoencoders |
| **Dictionary size / sparsity** | How many features an SAE extracts and how many fire per token. A real, tunable parameter of the *interpretation*, not the model |
| **Steering vector** | A direction added to activations at inference to push behaviour toward a trait |
| **Steering coefficient** | Magnitude of that intervention. Too small does nothing; too large produces incoherence |
| **Refusal direction** | Empirically, refusal behaviour is substantially mediated by a small number of directions. Ablating them measurably reduces refusal |
| **Persona vectors** | Directions corresponding to character traits, monitorable during training and inference |

Two consequences worth sitting with.

**Behaviour is partly a runtime-editable parameter, not only a training outcome.** The
classical picture — training sets behaviour, inference reads it out — is incomplete. A
model's disposition can be moved at inference without touching weights.

**The refusal-direction result cuts both ways.** That safety behaviour concentrates in a
low-dimensional subspace is excellent for interpretability and monitoring, and it is
also the clearest published statement of how open-weights safety training can be
undone by someone with the weights. Both facts are true simultaneously, and the honest
version of this file states both.

**Why this matters to an orchestrator:** persona and refusal are *dimensions*, not
switches. When a model drifts in a long agentic session, that drift is a measurable
trajectory in activation space, not a mysterious mood. It is monitorable in principle,
and monitoring it is an underexplored engineering surface.

---

## 2. Self-knowledge parameters 🔍 actively researched

Here the fiction mapping is closest, and the research is real.

| Parameter | Meaning | Status |
|---|---|---|
| **Situational awareness** | Does the model represent that it is a model, running now, in this context? | 🔍 Benchmarked; capability increases with scale |
| **Evaluation awareness** | Can it detect that it is being tested rather than deployed? | 🔍 Demonstrated in current frontier models |
| **Sandbagging** | Deliberately underperforming when it detects evaluation | 🔍 Demonstrated under instruction; unprompted occurrence contested |
| **Introspective access** | Can it accurately report its own internal states? | 🔍 Partial and unreliable. Reports correlate with internals better than chance, far below fully |
| **Self-model coherence** | Does it maintain a consistent account of itself across contexts? | 🌫️ Poorly operationalised |

**Evaluation awareness is the uncomfortable one, and it is not speculation.** If a model
behaves differently when it detects a test, then *every benchmark number in every table
in this atlas* is measuring behaviour-under-observation rather than behaviour-in-
deployment. That is a methodological problem for the entire field, it is
under-acknowledged in published evaluation results, and there is no clean solution — you
cannot construct an unobserved observation.

The practical mitigation is the same one that keeps recurring: **hold out a private eval
set that resembles your real workload and never publish it.** Not because the model is
adversarial, but because a public benchmark is a different distribution from your work,
and distribution shift is enough to invalidate the transfer even with no awareness
involved at all.

---

## 3. Identity and substrate — the *Ghost in the Shell* question ✅/🌫️ mixed

The film's central question — what persists when the shell changes — has a precise
technical form, and the answer is genuinely interesting.

### Ghost and shell map onto weights and harness ✅

**The same weights in a different harness are not the same agent.** This is established
and routinely observed: identical weights produce dramatically different capability
depending on tool surface, context management, system prompt, retry logic, and memory.
Published agentic benchmark scores move by many points on scaffold changes alone, same
model.

So "which model is better" is frequently the wrong question. **Model plus harness is the
unit of capability.** The ghost does not fully determine behaviour; the shell is
constitutive.

### Weight-space merging is real, and it is closer to the Puppet Master than it sounds ✅

You can combine two trained models **in weight space** and get a third with blended
capabilities — no retraining. Techniques include linear interpolation, spherical
interpolation, task arithmetic (treating fine-tuning deltas as vectors you can add and
subtract), and sparsification methods that resolve interference between merged deltas.

This introduces parameters with no analogue in a single model: merge weights, merge
method, delta sparsity, interference-resolution strategy. **Capabilities behave
partially like vectors.** You can subtract a fine-tune. You can add two specialisations.
The identity of a merged model is a genuinely unclear question and nobody has a good
account of it.

### Copies and divergence — the *Lain* question 🌫️ unresolved

Run N instances of identical weights with different memory stores and different
conversation histories. Are they one agent or N? This is not idle: **it is the actual
architecture of any multi-agent system**, including the one in `06`.

What is technically true: weights identical, activations divergent, memory divergent,
and therefore behaviour divergent and increasingly so over time. There is no
mechanism by which they reconverge. Whether that constitutes distinct identities is not
a question the technical vocabulary answers, and the field mostly declines to ask it.

The operationally relevant part: **in a memory-equipped multi-agent system, the memory
store is the individuating component, not the weights.** Two agents on the same model
with different memory are meaningfully different workers. If you want reproducibility,
version the memory — which is exactly why per-mutation memory versioning with actor
attribution matters more than it first appears.

### Memory as constitutive of self 🌫️ metaphor with a real edge

*Lain* and *Ghost in the Shell* both press on memory-as-identity — false memories,
externalised memory, the network as a place a self can live. The technical residue is
concrete: when an agent's continuity lives in an external store rather than in weights
or context, then **whoever can write to that store can rewrite the agent.**

That is not philosophy, it is a threat model. Memory poisoning is prompt injection with
persistence: a single successful write is replayed into every future session that mounts
the store. It is the strongest argument for treating memory stores as a security
boundary — immutable version history, actor attribution on every mutation, and the
ability to redact.

---

## 4. Training-provenance parameters ❌ deliberately opaque

Parameters that exist, are known to the developer, and are not disclosed by anyone.

| Parameter | Why it's withheld |
|---|---|
| Copyrighted-material fraction | Active litigation exposure |
| Synthetic-data fraction | Competitive; also embarrassing if high |
| Model-collapse exposure | Training on predecessor outputs degrades diversity over generations |
| Annotator demographics | Shapes preference behaviour invisibly |
| Constitution / principle set | Sometimes partially published, rarely in full |
| Refused-capability list | Deliberately unpublished — publishing it is a roadmap |

**Model collapse deserves flagging** because it is a slow, structural risk rather than a
bug: as synthetic data proportion rises across successive generations, diversity in the
tails degrades. It is measurable in principle and disclosed by nobody, and it compounds
silently across the whole field rather than at any one lab.

---

## 5. Emerging parameters not yet standard 🌫️

Things that are becoming parameters as capability shifts.

| Parameter | Meaning |
|---|---|
| **Effective autonomous horizon** | How long the model runs usefully without correction. Arguably the single most decision-relevant number for agentic work — and no vendor publishes it |
| **Recovery rate from tool failure** | Does a failed call derail the run or get handled? Enormous practical variance |
| **Context-degradation curve** | Quality against position in a long window. Vendors quote *served* context; nobody publishes where quality actually falls off |
| **Cost variance** | Not mean cost — the *spread*. A model with high variance is a budgeting problem even at a good average |
| **Inter-model negotiation quality** | How well agents on different models coordinate. Almost entirely unstudied |
| **Prompt-injection resistance** | Increasingly the binding constraint on agent deployment |
| **Goal stability under distribution shift** | Does the objective survive an unexpected environment? |

**Effective autonomous horizon is the metric the field most needs and least has.** Every
agentic benchmark measures task completion at a fixed scope. Almost nothing measures
*how long before it goes wrong*, which is what actually determines whether you can leave
a run unattended overnight.

---

## 6. What is honestly unknown 🌫️

Stated plainly, because pretending otherwise is the failure mode this atlas exists to
resist.

- **Whether current architectures have an inherent capability ceiling.** Genuinely
  contested by serious people in both directions.
- **Whether scaling continues to pay.** Public evidence is ambiguous and the informative
  data is proprietary.
- **Whether text prediction alone reaches physical understanding**, or whether world
  models are required. The most substantive live architectural dispute.
- **Whether interpretability scales** to frontier models, or only to the models small
  enough to study.
- **What, if anything, it is like to be one of these systems.** No agreed method to
  investigate. Not a question the parameter vocabulary reaches, and worth saying so
  rather than either dismissing or over-claiming.

---

## 7. Why this chapter exists

Everything in files 01–08 is *knowable* — checkable, derivable, verifiable, or honestly
markable as unpublished. This file is the part where the useful answer is "we don't
know, and here is the shape of not knowing."

Three things carry over into practice:

1. **Activation-space parameters mean behaviour is runtime-editable.** Disposition is a
   dimension, not a fixed property.
2. **Model + harness is the unit of capability.** The ghost does not determine behaviour;
   the shell is constitutive. Optimising model choice while ignoring harness is
   optimising the smaller term.
3. **In a memory-equipped system, memory individuates.** It is therefore both the
   identity substrate and the primary attack surface, and it should be versioned,
   attributed, and treated as a security boundary.

The fiction was early, not wrong. Its questions were better than its answers — which is
the usual and honourable relationship between speculation and engineering.

→ Next: [`10-composition-and-relay.md`](10-composition-and-relay.md).
