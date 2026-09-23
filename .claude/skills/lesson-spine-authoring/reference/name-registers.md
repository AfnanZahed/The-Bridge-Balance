# Name registers

How to run Station 0 without producing confident nonsense.

## Contents

1. [Three different operations under one word](#1-three-different-operations-under-one-word)
2. [Why it works](#2-why-it-works)
3. [The four registers](#3-the-four-registers)
4. [The verification protocol](#4-the-verification-protocol)
5. [Verified term bank](#5-verified-term-bank)
6. [Traps](#6-traps)
7. [Staging the prediction for a reader](#7-staging-the-prediction-for-a-reader)

---

## 1. Three different operations under one word

"Etymology" is doing three jobs, and applying the wrong one to a term produces plausible-sounding nonsense. Knowing which lens a term needs is most of the skill.

| Lens | Question | Example |
|---|---|---|
| **Morphological** — splitting a compound into live parts | What is this made of? | *idempotent* = *idem* + *potent*, "same power" |
| **Metaphorical** — recovering the borrowed source domain | What domain was this stolen from? | *container*, *firewall*, *stream*, *garbage collection* |
| **Historical** — tracing the actual origin | What accident produced this? | *algorithm* ← al-Khwārizmī; *daemon* ← Maxwell's demon |

Note that "frontend = the end at the front" is the *first* lens, not the third. It is synchronic decomposition of a live compound, not etymology proper. Both are useful; conflating them is how authors end up asserting histories they invented.

---

## 2. Why it works

Four mechanisms, all well-established, and worth knowing because they tell you when the technique will and will not pay.

**Arbitrary pairings are expensive; motivated ones are cheap.** An opaque word is a sound glued to a meaning by brute force. Decomposition converts it into a structure with internal logic, and structure survives forgetting in a way arbitrary pairings do not.

**Morphemes transfer; words do not.** Learn *poly-*, *morph-*, *-ism* once and you unlock polymorphism, polyglot, morphology, isomorphic, amorphous. In a jargon-dense field this is the highest-leverage move available.

**Generation beats reception.** Material a reader produces is retained better than identical material handed to them. Decomposing a term is generation, which is why it feels different from reading a glossary.

**Terminology anxiety is real, and this can dissolve it.** Beginners experience technical vocabulary as a wall of arbitrary tokens signalling that they do not belong. Decomposition can turn the wall into doors.

**It can also build a second wall, and in Stages 0–1 that is the likelier outcome.** *(Added 2026-09-20.)* Explaining *idempotent* through *idem* and *potent*, or *binary* through *bini*, hands a reader who has never programmed two unfamiliar Latin words in place of one unfamiliar English one. **Decompose only when the parts are words the reader already owns.** *Frontend* = the end at the front works. *Poly* + *morphē* does not, unless the chapter is willing to teach both roots properly first — and in a beginner stage it usually should not be.

When the decomposition would need its own explanation, skip Station 0's morphology and go straight to a plain sentence saying what the thing is and why it is called that.

**The honest limit:** meaning is determined by use, not origin. Treating origin as authority is the etymological fallacy, and computing is unusually full of terms whose origin and current use have divorced. Station 0 produces a *hypothesis*, not an answer. That is exactly why Station 4 must score it.

---

## 3. The four registers

Classify every term before decomposing it. The register determines what the decomposition is worth and where it routes.

### Register 1 — Compositional

The name is a compressed definition. Decomposition delivers most of the concept.

*mutex, bit, pixel, codec, modem, semaphore, middleware, backpropagation, idempotent, polymorphism, API, CRUD, i18n*

**Handling:** decompose fully; let it carry real explanatory load; S4 can then be shorter. Highest yield register.

### Register 2 — Metaphorical

Borrowed from another domain. Decomposition hands the reader a working model plus a hidden trap.

*container, cache, thread, firewall, cloud, bootstrap, heap, stack, pipeline, stream, garbage collection, sandbox, kernel, fork, Kubernetes*

**Handling:** give the source domain, then ask **where the metaphor stops being true** — that question is worth more than the metaphor itself, and it routes to S8. Every borrowed metaphor breaks somewhere, and where it breaks is where people get hurt. A *container* is not a shipping container; the isolation is far weaker than the word implies, and that gap is the origin of a recognizable class of security incident.

### Register 3 — Eponymous or accidental

Named for a person or a joke. Zero definitional content.

*algorithm, Boolean, Bayesian, Markov, Git, spam, cookie, bug, daemon, Python, Java, robot, foobar*

**Handling: do not decompose.** There is nothing inside. But these terms often carry real S3 content: *Bayesian* tells you nothing, while "Bayes was attacking inverse probability — reasoning backwards from effects to causes" tells you most of the concept. **Route Register 3 to S3 (Why) and S9 (Lineage), never to S0's decomposition.** Inventing meaning here is the single most common way authors ship falsehoods.

### Register 4 — Misleading

The name encodes a false or expired model.

*serverless, hallucination, neural network, tensor (in ML), regression, sprint, NoSQL, microservice, agent, prompt engineering*

**Handling: invert the question.** Do not ask what the name means. Ask **"why is it called that when it isn't that?"** The answer is usually the best available account of the thing. "Why does serverless have servers" answers itself with *the product removes server management, not servers* — which is a better statement of the value proposition than most definitions.

**Register 4 is the most valuable register for this curriculum**, for two reasons. First, the mismatch is load-bearing: it marks where a field's marketing, history, or politics leaked into its vocabulary. Second, the confusion is genuinely universal: almost everyone who meets the name takes the wrong model from it, so a beginner who guessed wrong is in good company and the correction lands without embarrassment.

**When a chapter's topic is Register 4, the chapter is fundamentally a correction.** Structure it as one: the misconception is the subject, not a preamble to it.

---

## 4. The verification protocol

Folk etymologies are endemic in software, and shipping one to thousands of learners is a real failure. Run this before any historical claim reaches a draft.

1. **Decompose first, assert history second.** The decomposition of *idempotent* into *idem* + *potent* is checkable from the parts. The claim that a specific person coined it in a specific year is not, and needs a source.

2. **Two independent non-circular sources for any origin claim.** Software-etymology blog posts copy each other; three sites repeating the same story is one source. Prefer the original paper, the language's own documentation, a maintainer's own account, or a standard dictionary.

3. **Treat charming stories as suspect in proportion to their charm.** The best-known example: the 1947 moth taped into the Harvard Mark II logbook is real, but it did not originate "bug" — Edison was using the word for technical faults in the 1870s, which is why the logbook entry is written as a joke about finding an actual one.

   > **Retired as an opening device.** It is kept here as a *verification* example — a case where the charming version is wrong. Calling it "a good verification lesson" in this file is the traceable source of a Stage 0 introduction that opened on a moth and a 1947 logbook, which the owner rejected on sight. Front doors and opening pages — what one must say first and what it may not open on — follow `curriculum-state/canon/corrections.md`, "1. A front door is not a chapter". Open it before writing any opening. The same applies to any myth-busting anecdote used as a hook: correcting a reader before welcoming them is the wrong first move.

4. **When it can't be verified, teach the decomposition and drop the history.** "*Idem* + *potent* — same power" stands on its own without a coinage claim.

5. **Distinguish "named after" from "means."** *Java* is named after coffee. That is a fact about the name and tells you nothing about the language. Say so plainly rather than manufacturing significance.

6. **Do not unify collisions.** *Kernel* means four unrelated things — OS core, SVM kernel, CUDA kernel, convolution kernel. *Heap* means two. When a root appears to explain two distant concepts at once, that is usually coincidence, and presenting it as insight teaches a false connection.

**Sourcing standard for this curriculum:** any origin claim that survives into a draft carries its source in the author's notes, even when the reader-facing text does not display it.

---

## 5. Verified term bank

Safe to use without re-verification. Anything not on this list runs §4.

**Register 1 — Compositional**

| Term | Decomposition |
|---|---|
| bit | binary digit |
| pixel | picture element |
| codec | coder–decoder |
| modem | modulator–demodulator |
| mutex | mutual exclusion |
| idempotent | Latin *idem* (same) + *potent* (power) — same power however many times applied |
| polymorphism | Greek *poly* (many) + *morphē* (form) |
| API | application programming interface |
| REST | Representational State Transfer — from Roy Fielding's 2000 dissertation |
| i18n / a11y / k8s | numeronyms: first letter, count of omitted letters, last letter |

**Register 2 — Metaphorical**

| Term | Source domain | Where it breaks |
|---|---|---|
| cache | French *cacher*, to hide — a hidden store | Hiding is the point; staleness is the cost the metaphor omits |
| bootstrap | "pull yourself up by your bootstraps" — a deliberately impossible act | The name encodes the paradox: a computer loading the program that loads programs |
| container | shipping containers — standardized, isolated, portable | Isolation is far weaker than physical containers imply — shared kernel, not a sealed box |
| Kubernetes | Greek *κυβερνήτης*, helmsman; same root as *cybernetics* and, via Latin, *governor* | Predicts the architecture well — reconciliation loops are literally cybernetic governors — but a helmsman steers one ship; this assumes a fleet |
| garbage collection | municipal refuse collection | Collection is periodic and pauses things, which is exactly the operational surprise |
| firewall | building construction — a wall to stop fire spreading | Compartmentalizes; does not inspect what passes through openings |

**Register 3 — Eponymous or accidental**

| Term | Origin | Route to |
|---|---|---|
| algorithm | al-Khwārizmī, 9th-century Persian mathematician | S3, S9 |
| Boolean / Bayesian / Markov | Boole, Bayes, Markov | S3 — each one's actual problem is the concept |
| daemon | Maxwell's demon, via MIT's Project MAC | S9 |
| robot | Czech *robota*, forced labour — Karel Čapek's *R.U.R.*, 1920 | S9 |
| spam | the Monty Python sketch | S9 |
| Python | Monty Python, not the snake | S9 |
| bug | in technical use by Edison in the 1870s; the 1947 Harvard Mark II moth is a joke about the existing term | S9. **Retired as a teaching example — see the note below.** |

**Register 4 — Misleading**

| Term | What the name implies | What it is |
|---|---|---|
| serverless | there are no servers | Servers exist; the *management* of them is what was removed |
| hallucination | a perceptual system malfunctioning | Next-token prediction with no ground-truth channel — nothing is misperceiving anything |
| neural network | a model of the brain | A differentiable function approximator; the biological resemblance is loose and mostly historical |
| tensor (ML) | a tensor in the physics sense, with transformation laws | An n-dimensional array |
| regression | moving backwards | Galton's "regression toward mediocrity" — a historical accident with no relation to the modern method |
| sprint | maximum short-term exertion | Scrum's own doctrine is *sustainable pace*; the word has damaged the practice it names |
| NoSQL | no SQL | Retconned to "not only SQL"; many such databases now ship SQL interfaces |
| microservice | small | The real criterion is a bounded context, not line count |
| agent | autonomous action, agency | A model in a loop with tools and a stopping condition — the autonomy is a configuration, not a property |

---

## 6. Traps

**Decomposing a Register 3 name.** Produces invented meaning. Classify before decomposing.

**Terms that look compositional and are not.** *Transformer* is not a compressed definition and not named after the electrical device; decomposition yields almost nothing. When a decomposition produces something vague, say so and move on rather than stretching it.

**Overclaiming a partial hit.** "Frontend = the end at the front" is correct and tells the reader nothing about rendering, hydration, bundle size, or the event loop. The name is a label on a door; it is not the room. State the win at its actual size.

**Etymology as the chapter.** A reader who decomposes a hundred terms in an afternoon will feel expert in a field they cannot operate in, and that state is more dangerous than plain ignorance because it stops the search. Station 0 is the cheapest station, not the most important one.

**The unscored prediction.** Guessing and then reading the answer without registering the gap builds confidence. Guessing, committing, and confronting the error builds calibration. Only the second one is what this technique is for, and the difference is entirely whether S4 closes the loop.

---

## 7. Staging the prediction for a reader

> **Scope, added 2026-09-20.** The staged guess is off entirely on any front
> door or welcome page, and used sparingly inside teaching chapters. The full
> rule, including the permitted substitute, is in
> `curriculum-state/canon/corrections.md`, "1. A front door is not a chapter".
> Open it before staging one. This file's own limits: at most once every few
> chapters, never in an opening, and **no reveal beat** in the
> invert-the-question form.

A private learner can guess silently. Where a book does stage a guess, it has to stage it deliberately, or it does not happen.

The example prompts below are written the way they should ship — short sentences, plain words, no idiom. Hold that register; see `language-register.md`.

**Ask before telling.** "Before reading on: *idempotent* is *idem* plus *potent*. What would you guess that means for an operation you run twice?" Then answer it a paragraph later.

**Make the gap visible when there is one.** Register 4 terms do this by themselves: "*Serverless.* Take a guess at how many servers are involved." The reveal lands because the reader committed.

**Do not force it where the register does not support it.** A Register 3 term has nothing to guess at, and staging a prediction that cannot pay off trains the reader to skip the device.

**Do not stage more than one per chapter.** The move works because it is a small surprise. Three of them is a format, and a format is skimmable.

*(The "levels the room" argument for this device is withdrawn with the two-reader model — the rule is in `curriculum-state/canon/corrections.md` §8. There is no room to level: Stages 0–1 have one reader, and what that reader needs is footing, not a test.)*
