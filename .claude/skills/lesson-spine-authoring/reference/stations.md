# The twelve stations

The full definition of the Prime–Build–Close spine. `SKILL.md` is the workflow that runs on this; this file is the specification.

## Contents

1. [Origin and mapping to 5W2H](#1-origin-and-mapping-to-5w2h)
2. [The stations](#2-the-stations)
3. [Weighting by lesson shape](#3-weighting-by-lesson-shape)
4. [Sequencing rules and legal deviations](#4-sequencing-rules-and-legal-deviations)
5. [The station sheet](#5-the-station-sheet)

---

## 1. Origin and mapping to 5W2H

The spine is the 5W2H interrogative set — What, Why, When, Where, Who, How, How much — reordered for learning rather than for investigation, split where one question was doing two jobs, and extended at both ends.

| Station | 5W2H origin | What changed and why |
|---|---|---|
| S0 NAME | *(new)* | Etymological decomposition. The reader meets the word before they meet the concept, so the word is the natural entry point and a free source of predictions. |
| S1 ANCHOR | *(new)* | Prior knowledge is the strongest single predictor of whether new material sticks. The original set interrogates the topic but never asks what the reader already holds. |
| S2 SOURCE | Who (thin) | *Who* split in two. The cheap half is a gate at the front: is this alive, who is canonical. |
| S3 WHY | Why | Moved ahead of *What*. Struggling with a problem before receiving its solution produces markedly better transfer than the reverse order. |
| S4 WHAT | What | Redefined as **mechanism plus contrast class**, not definition. A definition is a sentence you can recite; a mechanism is a thing you can think with. |
| S5 HOW | How | Moved forward, immediately after *What*. This is where learning actually happens; everything downstream assumes the reader has touched the thing. |
| S6 WHERE | Where | Redefined as **position in the system**, because for abstract objects *where* and *when* otherwise collapse into each other. |
| S7 COST | How much | Kept and promoted. The most underrated station in the original set. |
| S8 WHEN | When | Redefined as **conditions of applicability and failure**, and moved last in Build, because judgment depends on everything before it. |
| S9 LINEAGE | Who (deep) | The expensive half of *Who*: papers, debates, who to follow. Turns a closed topic into an open thread. |
| S10 RETRIEVE | *(new)* | The original set has no verb. Every station can be satisfied by reading, and reading is close to worthless for retention. |
| S11 SPIRAL | *(new)* | Belongs to the curriculum map, not the lesson. A single pass is a checklist; the return pass is a curriculum. |

Three phases: **Prime** (S0–S2, before any explanation), **Build** (S3–S8), **Close** (S9–S11).

---

## 2. The stations

### PRIME

Everything in Prime happens before the reader receives a single explanation. Its whole purpose is to make the explanation land on prepared ground rather than flat.

---

#### S0 — NAME

**Delivers:** the topic's name, broken into parts, and a prediction the reader forms from those parts before knowing anything else.

**Procedure:** decompose the name; classify it into one of the four registers (see `name-registers.md`); state the prediction a reader would form from the name alone; measure the gap between that prediction and the truth.

**The gap sizes the lesson.** This is the station's most important output and it is easy to miss. If the name predicts the thing well (Register 1: *mutex*, *idempotent*, *codec*), the name carries real explanatory load and S4 can be shorter. If the name actively lies (Register 4: *serverless*, *hallucination*, *tensor*), the lesson is fundamentally a correction and should be structured as one — the misconception is the topic.

**Failure mode it prevents:** the reader treating technical vocabulary as a wall of arbitrary tokens signalling that they don't belong. This is the beginner's most common reason for quitting, and it is dissolved almost entirely by showing that the words have parts.

**Why it also serves the senior:** name origins are a near-universal blind spot. An engineer who has run Kubernetes for six years has usually never registered that the name means *helmsman* and shares a root with *cybernetics* — or that this predicts the reconciliation-loop architecture exactly.

**Never:** open with a definition instead. Once the definition is read there is nothing left to predict.

---

#### S1 — ANCHOR

**Delivers:** the nearest thing the reader already understands, named explicitly, so the new concept has somewhere to attach.

**Procedure:** name one thing the reader plausibly already holds. Then state the relationship — this is like that, except for one specific difference.

**The mixed-audience constraint bites hardest here**, because the two readers hold completely different priors. Three strategies, in order of preference:

1. **Find the shared anchor.** Something both readers own: waiting in a queue, a restaurant kitchen during a rush, a building's fire doors, a new hire's first week. Preferred, because it is one anchor rather than two.
2. **Anchor to the lesson's own earlier material.** Works when the curriculum has already established something. Costs nothing and serves everyone.
3. **Give two anchors in one sentence.** "The same move as a database transaction, or as sending a letter you can still pull back before the post goes out." Acceptable, but each additional anchor dilutes; never give three.

**Anchor tiers are defined in `language-register.md` §4** — universal anchors first, Pakistani anchors that stay legible to an outsider second.

**Never:** anchor to something only one reader has. An anchor a beginner lacks is a silent assumption — the exact thing that makes them quit — and an anchor only a beginner needs is an unrewarded sentence for the senior.

---

#### S2 — SOURCE

**Delivers:** who made this, whether it is alive, and where the canonical account lives. Thirty seconds. A gate, not a stage.

**Procedure:** name the origin, the current maintainer or steward, the version or era being described, and the one authoritative source. State the date of the information.

**Why it is a gate:** it decides whether the remaining stations are worth the reader's time. A tool abandoned in 2023 needs a different lesson from one shipping weekly.

**Why it belongs at the front and not the back:** learners routinely cannot verify technical claims themselves, so calibrating whose account to trust is a genuine skill rather than a shortcut around one. Teaching it early makes every later lesson cheaper.

**Keep it to two or three sentences.** The expensive version is S9.

---

### BUILD

---

#### S3 — WHY

**Delivers:** the problem that forced this thing to exist, felt rather than described.

**Procedure:** show the world before the thing existed. What was painful, who was hurt by it, what the workarounds cost. Only then name the thing as the response.

**The ordering claim:** a tool met before its problem is memorized; a tool met after its problem is understood. Where you can make the reader feel the pain in two or three sentences before naming the cure, do — attempting a problem before receiving the solution improves transfer even when the attempt fails.

**Why this is the senior's station.** They have the scar tissue. A senior who has hand-deployed forty containers reads the *why* of an orchestrator with recognition, and recognition is engagement. It is also frequently new to them: engineers usually know a tool well and its originating problem barely at all, because they arrived after the problem was already solved.

**For Register 3 names** (eponyms and accidents), this is where the name pays out. *Bayesian* tells you nothing; "Bayes was attacking inverse probability — reasoning backwards from effects to causes" tells you most of the concept.

**Never:** state the problem as an abstraction. "Managing many containers is difficult" is not a problem, it is a category. The problem is a person at 2 a.m. running the same command forty times.

---

#### S4 — WHAT

**Delivers:** the mechanism, the contrast class, and the scored prediction from S0.

**Three obligations, all mandatory:**

**(a) Mechanism, not definition.** What actually moves inside the box. A definition can be recited; a mechanism can be reasoned with. If your S4 could be replaced by a glossary entry without loss, it is not finished.

**(b) The contrast class.** Concepts are learned by discrimination, not in isolation. What did this displace, what sits adjacent to it, what is it commonly confused with, what is it explicitly not. There is no understanding of Docker without VMs, of transformers without what came before, of GraphQL without REST. A *What* without a contrast class is half a station.

**(c) Score the S0 prediction.** Explicitly return to the guess the name produced and mark it. Right, partly right, or wrong — and where the gap is, that gap is the highest-value sentence in the lesson. **A lesson that opens a prediction and never closes it has manufactured fluency**, which is indistinguishable from understanding to the person experiencing it and is not understanding.

---

#### S5 — HOW

**Delivers:** the smallest thing that works, and then the same thing deliberately broken.

**Procedure:** the minimum viable demonstration, complete and runnable, with nothing decorative. Then break it on purpose and show the failure. The break is not optional — it is where the mechanism becomes visible, and it is the difference between a reader who can run the example and one who can debug it.

**This station is where the audience gap is widest**, and therefore where the three-layer architecture does the most work. A beginner needs every keystroke, every prerequisite, every "you should now see." A senior needs none of it and will skim the entire block. Resolution: the spine states what the demonstration establishes and what breaking it reveals; the keystroke-level walkthrough goes in a **foothold**. See `mixed-audience.md` §3.

**For Procedure-shape lessons, this station is the whole lesson** — and the failure branch is where the value is. Anyone can follow a happy path. What defeats a beginner is step 4 not looking like the screenshot. Budget more words for what to do when it goes wrong than for when it goes right.

---

#### S6 — WHERE

**Delivers:** the thing's position in a system — which layer, what it talks to, what it constrains, and what breaks when it fails.

**Procedure:** name the layer. Name the interfaces. Name the blast radius: when this fails, what else fails with it, and who finds out first.

**Why *where* and not *when*:** for a physical event these are distinct questions; for an abstract object like gradient descent they blur into each other, and the blurred version gets answered with a shrug. Splitting them by definition — *where* is structural position, *when* is applicability — keeps both answerable.

**Blast radius is the part authors skip and readers need most.** It is also natively both-audience: a beginner can understand "if this goes down, nobody can log in" and a senior rarely has the specific dependency map for a tool they haven't operated.

---

#### S7 — COST

**Delivers:** real magnitudes. Time, money, memory, complexity, human attention.

**Procedure:** at least one real number with its unit and its comparison. Latency in milliseconds against what alternative. Dollars per month at what scale. Memory at what input size. Complexity class where it matters. Engineer-hours to adopt and to maintain.

**This is the most-skipped station and the most diagnostic.** Experts store quantities attached to their concepts — an L1 cache hit is roughly a nanosecond, a cross-region round trip is tens of milliseconds, this model costs that much per million tokens. Novices store only qualitative shape. The gap between the two groups is, to a surprising degree, just this: the expert's concepts have numbers stapled to them.

**Both-audience by construction.** A senior rarely has current figures memorized and will read them with genuine interest. A beginner needs no prior knowledge to understand a number with a comparison attached. Few kinds of content reward both readers this reliably.

**Date every figure and name its source.** Prices and benchmarks rot fast. An undated number becomes a wrong number.

**Never:** substitute an adjective. "It can get expensive" is not this station. Expensive compared to what, at what scale, crossing what threshold.

---

#### S8 — WHEN

**Delivers:** the conditions under which to reach for this, the conditions under which not to, and the conditions under which it breaks.

**Procedure:** state the decision rule. State the counter-indication — the situation where the obvious choice is wrong. State the failure conditions and their early symptoms.

**Last in Build because it depends on everything before it**, particularly S7. Judgment about when to use something is downstream of knowing what it costs. Anyone who acquires "use X over Y" from an article without having touched either has memorized a slogan, not formed a judgment, and slogans fail on exactly the cases that matter.

**Return the Register 2 metaphor here.** Every borrowed metaphor breaks somewhere, and where it breaks is where people get hurt. A *container* is not a shipping container: the isolation is considerably weaker than the metaphor implies, and that specific gap between the name's promise and the mechanism's delivery is the origin of a recognizable class of security incident. "Where does the metaphor stop being true" is often the strongest single question in a lesson.

**Return the Register 4 mismatch here too.** Misleading names cause misapplication, and this is the station where that damage lands.

---

### CLOSE

---

#### S9 — LINEAGE

**Delivers:** the intellectual thread — the paper, the debate, the disagreement that is still open, and who to read next.

**Procedure:** the originating work where one exists. The live disagreement, stated fairly from both sides. Two or three people or sources worth following, named.

**Purpose:** to leave the topic open rather than closed. A lesson that ends in resolution teaches that the field is settled. Naming a live disagreement teaches that it isn't, and gives the motivated reader somewhere to go.

**Runs thin on Procedure-shape lessons.** Signing up for an account has no lineage. Skip it and log the omission.

---

#### S10 — RETRIEVE

**Delivers:** work the reader does, from memory, without looking back.

**This is the only station with a verb.** Everything else can be satisfied by reading, and reading is close to worthless for retention. Retrieval consolidates knowledge in a way that re-reading does not, and the difference is not small.

**Shapes that work:**
- Reconstruct the mechanism from memory in three sentences.
- Predict the outcome of a case the lesson did not cover.
- Find the bug in a variant of the S5 example.
- Decide, for a described situation, whether to reach for this — and name the condition that would flip the answer.
- State the failure mode a named misuse would produce.

**Shapes that do not work:**
- A summary. It performs the retrieval on the reader's behalf, destroying the effect.
- Recognition questions where the answer is visible on the page.
- "Think about how you might apply this," which asks for nothing checkable.

**The recap ending is the most common way a good lesson is ruined in its last paragraph.** "In this lesson we learned that…" is not a weak version of this station; it is the station replaced by its own opposite. Delete it wherever it appears.

**Calibration for a mixed audience:** make the prompt open enough that a beginner can produce a partial answer and a senior can produce a deep one. "Reconstruct the mechanism in three sentences" scales naturally. "Which of these four options" does not.

---

#### S11 — SPIRAL

**Delivers:** the forward pointer — where this returns, at greater depth, later in the curriculum.

**Procedure:** name what this lesson deliberately did not resolve and where it gets resolved. One or two sentences.

**This station belongs to the curriculum map, not the lesson.** A single pass through the spine is a checklist; the same topic revisited at greater depth is a curriculum. The individual lesson's only job is to leave a correct pointer and to be honest about its own scope boundary.

---

## 3. Weighting by lesson shape

Every station is available to every lesson. What changes is which ones carry the weight. **The center of gravity is what makes a lesson feel right or wrong to a given reader — not the presence or absence of material.**

| Station | Concept | Tool | Practice | Procedure |
|---|---|---|---|---|
| S0 NAME | High | Medium | Medium | Low |
| S1 ANCHOR | High | Medium | Medium | High |
| S2 SOURCE | Low | High | Low | High |
| S3 WHY | **Highest** | Medium | High | Low — one clause |
| S4 WHAT | **Highest** | Medium | Low | Low |
| S5 HOW | Medium | **Highest** | **Highest** | **The whole lesson** |
| S6 WHERE | High | High | Medium | Low |
| S7 COST | Medium | **Highest** | Medium | Low |
| S8 WHEN | High | **Highest** | **Highest** | High — the failure branch |
| S9 LINEAGE | High | Low | Medium | Skip |
| S10 RETRIEVE | High | High | High | High |
| S11 SPIRAL | Medium | Medium | Medium | Low |

**Concept** — an idea with no install command. Weight on the problem, the mechanism, and the judgment. Cost often runs thin, and that is legitimate; do not manufacture a number.

**Tool** — a named thing with a version. Weight on demonstration, real cost, and the decision of when to reach for it. Lineage usually runs thin. The commonest failure is writing a Tool lesson as though it were a Concept lesson, producing an essay the reader cannot act on.

**Practice** — a repeatable human activity: reviewing a diff, writing a spec, debugging. **The framework is weakest here and should say so.** Competence at a practice comes overwhelmingly from repetition against feedback, not from exposition. A Practice lesson's honest job is to structure the reps and name what good looks like, not to explain the practice into existence. Weight S5 and S8 heavily, keep everything else short, and make S10 an actual rep.

**Procedure** — a bounded sequence with a definite end state: install this, create an account, get the first thing running. Named explicitly because this curriculum's audience includes people who genuinely stall at signup, and that reader is not served by a compressed lesson written as though the steps were beneath mention.

Three rules for Procedure lessons:
1. **The failure branch is the lesson.** Budget more words for what to do when step 4 doesn't match than for step 4 going right.
2. **No condescension and no apology.** Write the steps plainly. Do not preface them with "this is very simple," which converts a stuck reader's problem into a personal failing.
3. **State the end state up front**, so the reader can tell whether it worked. "When this is done, running `git status` prints a line about a branch." Without this a beginner cannot distinguish success from partial failure.

---

## 4. Sequencing rules and legal deviations

**Fixed by design:**
- S0 before any definition. The prediction cannot be formed after the answer.
- S3 before S4. The problem before the solution.
- S4 must score S0. The loop opened must close.
- S7 before S8. Judgment is downstream of magnitude.
- S10 last. Nothing after the retrieval prompt — a paragraph following it invites the reader to keep reading instead of thinking.

**Free to move:**
- S2 may move to the end for a Concept lesson where provenance is not a gate.
- S6 may merge into S4 when the mechanism and its position are the same fact.
- S9 may merge into S3 for Register 3 topics, where the person and the problem are one story.
- S1 may be omitted where the anchor is genuinely obvious. Rare; check the assumption before claiming it.

**Legal omissions:** any station can be dropped when the lesson has nothing real to put in it. Log each with a one-clause reason. Manufacturing a number for S7 or an origin story for S9 is strictly worse than dropping the station.

---

## 5. The station sheet

Fill before drafting prose. One line per station.

```
LESSON:            [topic]
SHAPE:             [Concept | Tool | Practice | Procedure]
NAME REGISTER:     [1 Compositional | 2 Metaphorical | 3 Eponymous | 4 Misleading]
PREDICTION GAP:    [what the name promises vs. what the thing is — sizes the lesson]
CENTER OF GRAVITY: [the 2-3 stations carrying the weight]
BOTH-AUDIENCE SET: [content new to a senior AND accessible to a beginner — this is the spine]

S0  NAME      | delivers:                          |
S1  ANCHOR    | delivers:                          |
S2  SOURCE    | delivers:                          |
S3  WHY       | delivers:                          |
S4  WHAT      | delivers:              | scores S0: |
S5  HOW       | delivers:              | breaks by: |
S6  WHERE     | delivers:              | blast radius: |
S7  COST      | delivers:              | figure + date + source: |
S8  WHEN      | delivers:              | counter-indication: |
S9  LINEAGE   | delivers:              | live disagreement: |
S10 RETRIEVE  | the reader must produce:           |
S11 SPIRAL    | returns at:                        |

FOOTHOLDS:         [beginner-only blocks — must pass delete test]
DEPTH BLOCKS:      [senior-only blocks — must pass delete test]
DROPPED STATIONS:  [station: one-clause reason]
```

If two stations' "delivers" lines say nearly the same thing, one of them is not earning its place. If every "delivers" line serves the same reader, the lesson has a center-of-gravity problem before it has a prose problem.
