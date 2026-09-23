# The twelve stations

The full definition of the Prime–Build–Close spine. `SKILL.md` is the workflow that runs on this; this file is the specification.

> **Swept 20 September 2026.** The two-reader model was withdrawn by Constitution
> v3.0.0 and `corrections.md` §8, and `SKILL.md` recorded that at its steps 1 and
> 5 — but this file kept nine live instructions built on it, including the station
> sheet in §5. They are corrected below, each marked where it stood. **No rule in
> this file may assume a reader who already knows the subject.** Stages 0–2 are
> written for someone who has never programmed; Stages 3–4 have the same reader,
> further along the road (`audience.md`), so no separate expert may be assumed there.

## Contents

1. [Origin and mapping to 5W2H](#1-origin-and-mapping-to-5w2h)
2. [The stations](#2-the-stations)
3. [Weighting by chapter shape](#3-weighting-by-chapter-shape)
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
| S11 SPIRAL | *(new)* | Belongs to the curriculum map, not the chapter. A single pass is a checklist; the return pass is a curriculum. |

Three phases: **Prime** (S0–S2, before any explanation), **Build** (S3–S8), **Close** (S9–S11).

---

## 2. The stations

**Scope note on dates and sources — strengthened 20 September 2026.** S2, S7 and S9 ask for dates, figures and named origins. **Every one of those is found in research and recorded in the ledgers, and almost none of it reaches the reader** — the station is satisfied by knowing the fact, not by printing it. The recording rule is `curriculum-state/canon/thesis.md` §"Statistics and their sources"; what reaches the reader is `curriculum-state/canon/corrections.md` §"11. Research makes the writer correct. It is not the reader's diet".

- `curriculum-state/canon/corrections.md` §"4. Historical material stays light in reader-facing prose" and §"11. Research makes the writer correct. It is not the reader's diet" outrank all three stations in every stage, and bind hardest in Stages 0–2. Nothing in that file is optional or superseded by a later preference — "The rule that keeps this file alive".
- A date, a full name or a source reaches the prose only when it is **load-bearing to the sentence carrying it**: `curriculum-state/canon/corrections.md` §"4. Historical material stays light in reader-facing prose", with the exception for a name or year that is itself the teaching in `curriculum-state/canon/thesis.md` §"Statistics and their sources" and `curriculum-state/canon/voice.md`, "Six commitments", item 6.
- A statistic reaches the prose as a plain sentence with its source attached at the end — `curriculum-state/canon/thesis.md` §"Statistics and their sources" has the form, the Source chip and the interim parenthetical for Stage 0–2 chapters; `curriculum-state/canon/corrections.md` §"11. Research makes the writer correct. It is not the reader's diet" lists the four inline-citation rules withdrawn.

The earlier version of this note scoped the exception to Stages 0–2 and called the stations "right" for the rest. That framing is what let the density back in.

### PRIME

Everything in Prime happens before the reader receives a single explanation. Its whole purpose is to make the explanation land on prepared ground rather than flat.

---

#### S0 — NAME

**Delivers:** the topic's name, broken into parts, and a prediction the reader forms from those parts before knowing anything else.

**Procedure:** decompose the name; classify it into one of the four registers (see `name-registers.md`); state the prediction a reader would form from the name alone; measure the gap between that prediction and the truth.

**The gap sizes the chapter.** This is the station's most important output and it is easy to miss. If the name predicts the thing well (Register 1: *mutex*, *idempotent*, *codec*), the name carries real explanatory load and S4 can be shorter. If the name actively lies (Register 4: *serverless*, *hallucination*, *tensor*), the chapter is fundamentally a correction and should be structured as one — the misconception is the topic.

**Failure mode it prevents:** the reader treating technical vocabulary as a wall of arbitrary tokens signalling that they don't belong. This is the beginner's most common reason for quitting, and it is dissolved almost entirely by showing that the words have parts.

**The decomposition has to predict something.** *Kubernetes* means *helmsman* and shares a root with *cybernetics*, and that predicts the reconciliation-loop architecture exactly. A decomposition that predicts the design earns the station; one that only produces trivia does not.

*(The senior-reward rationale that stood here — "why it also serves the senior... an engineer who has run Kubernetes for six years" — is withdrawn with the two-reader model. Constitution v3.0.0, `corrections.md` §8.)*

**Never:** open with a definition instead. Once the definition is read there is nothing left to predict.

---

#### S1 — ANCHOR

**Delivers:** the nearest thing the reader already understands, named explicitly, so the new concept has somewhere to attach.

**Procedure:** name one thing the reader plausibly already holds. Then state the relationship — this is like that, except for one specific difference.

**Priors are the hard part of this station**, because a beginner's are the only ones that count and they are easy to overestimate. Three strategies, in order of preference:

1. **Find the shared anchor.** Something the reader already owns: waiting in a queue, a restaurant kitchen during a rush, a building's fire doors, a new hire's first week. Preferred, because it is one anchor rather than two.
2. **Anchor to the chapter's own earlier material.** Works when the curriculum has already established something. Costs nothing and serves everyone.
3. **Give two anchors in one sentence.** "The same move as a database transaction, or as sending a letter you can still pull back before the post goes out." Acceptable, but each additional anchor dilutes; never give three.

**Anchor tiers are defined in `language-register.md` §4** — Pakistani and everyday anchors first, universal anchors second, and a reader outside Pakistan must still follow the point (`corrections.md` §29).

**Never:** anchor to something the reader does not already have. An anchor a beginner lacks is a silent assumption — the exact thing that makes them quit.

*(The second half of this rule — "an anchor only a beginner needs is an unrewarded sentence for the senior" — is withdrawn, not softened, and an anchor a beginner needs is the point of the station. `curriculum-state/canon/corrections.md` §"8. Stages 0–2 are written for absolute beginners, and for nobody else" and `curriculum-state/canon/audience.md` §"The reader", under "What withdrawing the senior reader changed", carry the withdrawn rules.)*

**And check it travels.** An anchor has to land for a Pakistani reader first, and a reader outside Pakistan must still follow it. Morse code and Braille are good teaching objects in principle and bad anchors in practice here — both are unfamiliar words for most of this book's readers, so each would need teaching before it could anchor anything.

---

#### S2 — SOURCE

**Delivers:** who made this, whether it is alive, and where the canonical account lives. Thirty seconds. A gate, not a stage.

**Procedure — backstage.** Establish the origin, the current maintainer or steward, the version or era being described, and the one authoritative source, and record them in `evidence-ledger.yaml`. **What reaches the reader is the consequence, not the citation:** that a tool is still maintained, or that an idea came out of a specific problem, said in a plain sentence — the rule, and what it means for a figure, a year or a source, is `curriculum-state/canon/corrections.md` §"11. Research makes the writer correct. It is not the reader's diet" and `curriculum-state/canon/thesis.md` §"Statistics and their sources". Only name the source in prose where the reader needs it to judge something themselves — `curriculum-state/canon/corrections.md` §"15. A studied source may be learned from completely" and `curriculum-state/canon/research-and-comparison.md`, "The legal boundary".

**Why it is a gate:** it decides whether the remaining stations are worth the reader's time. A tool abandoned in 2023 needs a different chapter from one shipping weekly.

**Why it belongs at the front and not the back:** learners routinely cannot verify technical claims themselves, so calibrating whose account to trust is a genuine skill rather than a shortcut around one. Teaching it early makes every later chapter cheaper.

**Keep it to two or three sentences.** The expensive version is S9.

---

### BUILD

---

#### S3 — WHY

**Delivers:** the problem that forced this thing to exist, felt rather than described.

**Procedure:** show the world before the thing existed. What was painful, who was hurt by it, what the workarounds cost. Only then name the thing as the response.

**The ordering claim:** a tool met before its problem is memorized; a tool met after its problem is understood. Where you can make the reader feel the pain in two or three sentences before naming the cure, do — attempting a problem before receiving the solution improves transfer even when the attempt fails.

**The originating problem is the part that is almost never told.** A tool is normally met long after the problem it answered was solved, so the problem has to be reconstructed deliberately or it is simply absent.

*(The senior-reward rationale that stood here — "this is the senior's station... they have the scar tissue" — is withdrawn with the two-reader model. The ordering claim above does not depend on who is reading: a tool whose originating problem is never shown can only be memorised. Constitution v3.0.0, `corrections.md` §8.)*

**For Register 3 names** (eponyms and accidents), this is where the name pays out. *Bayesian* tells you nothing; "Bayes was attacking inverse probability — reasoning backwards from effects to causes" tells you most of the concept.

**Never:** state the problem as an abstraction. "Managing many containers is difficult" is not a problem, it is a category. The problem is a person at 2 a.m. running the same command forty times.

---

#### S4 — WHAT

**Delivers:** the mechanism, the contrast class, and the scored prediction from S0.

**Three obligations, all mandatory:**

**(a) Mechanism, not definition.** What actually moves inside the box. A definition can be recited; a mechanism can be reasoned with. If your S4 could be replaced by a glossary entry without loss, it is not finished.

**(b) The contrast class.** Concepts are learned by discrimination, not in isolation. What did this displace, what sits adjacent to it, what is it commonly confused with, what is it explicitly not. There is no understanding of Docker without VMs, of transformers without what came before, of GraphQL without REST. A *What* without a contrast class is half a station.

**(c) Score the S0 prediction.** Explicitly return to the guess the name produced and mark it. Right, partly right, or wrong — and where the gap is, that gap is the highest-value sentence in the chapter. **A chapter that opens a prediction and never closes it has manufactured fluency**, which is indistinguishable from understanding to the person experiencing it and is not understanding.

---

#### S5 — HOW

**Delivers:** the smallest thing that works, and then the same thing deliberately broken.

**Procedure:** the minimum viable demonstration, complete and runnable, with nothing decorative. Then break it on purpose and show the failure. The break is not optional — it is where the mechanism becomes visible, and it is the difference between a reader who can run the example and one who can debug it.

**This station is where a beginner is most easily lost.** Every keystroke, every prerequisite, every "you should now see" is load-bearing for a reader who has never programmed.

**The walkthrough belongs in the spine.** *(The resolution that stood here — the spine states what the demonstration establishes, and the keystroke-level walkthrough goes in a foothold — is **withdrawn**. It existed so a senior could skim the block, and it demoted into an optional layer precisely the material a beginners-only book needs most. Constitution v3.0.0, `corrections.md` §8.)* A foothold at this station still has to pass the delete test like any other: if removing it leaves the reader unable to run the example, it was never a foothold.

**For Procedure-shape chapters, this station is the whole chapter** — and the failure branch is where the value is. Anyone can follow a happy path. What defeats a beginner is step 4 not looking like the screenshot. Budget more words for what to do when it goes wrong than for when it goes right.

---

#### S6 — WHERE

**Delivers:** the thing's position in a system — which layer, what it talks to, what it constrains, and what breaks when it fails.

**Procedure:** name the layer. Name the interfaces. Name the blast radius: when this fails, what else fails with it, and who finds out first.

**Why *where* and not *when*:** for a physical event these are distinct questions; for an abstract object like gradient descent they blur into each other, and the blurred version gets answered with a shrug. Splitting them by definition — *where* is structural position, *when* is applicability — keeps both answerable.

**Blast radius is the part authors skip and readers need most.** It also states cleanly at a beginner's level — "if this goes down, nobody can log in" is the whole idea, and it needs no prior operational experience to land.

---

#### S7 — COST

**Delivers:** real magnitudes. Time, money, memory, complexity, human attention.

**Procedure:** at least one real number with its unit and its comparison. Latency in milliseconds against what alternative. Dollars per month at what scale. Memory at what input size. Complexity class where it matters. Engineer-hours to adopt and to maintain.

**This is the most-skipped station and the most diagnostic.** Experts store quantities attached to their concepts — an L1 cache hit is roughly a nanosecond, a cross-region round trip is tens of milliseconds, this model costs that much per million tokens. Novices store only qualitative shape. The gap between the two groups is, to a surprising degree, just this: the expert's concepts have numbers stapled to them.

**A number with a comparison attached needs no prior knowledge.** That is why this station works for a beginner: not the figure itself, but the scale it gives them.

**Date every figure and name its source — in `evidence-ledger.yaml`, never inside the sentence the reader is reading.** `curriculum-state/canon/thesis.md` §"Statistics and their sources" owns that rule and its form — the Source chip, or the interim parenthetical a Stage 0–2 chapter uses — and `curriculum-state/canon/corrections.md` §"11. Research makes the writer correct. It is not the reader's diet" lists the four inline-citation rules withdrawn. Prices and benchmarks rot fast, and an undated number becomes a wrong number. In the prose, give the magnitude in a form they can feel — "about a second, where the other takes a minute" — and attach the source at the end of the sentence where one is needed.

**Never:** substitute an adjective. "It can get expensive" is not this station. Expensive compared to what, at what scale, crossing what threshold.

---

#### S8 — WHEN

**Delivers:** the conditions under which to reach for this, the conditions under which not to, and the conditions under which it breaks.

**Procedure:** state the decision rule. State the counter-indication — the situation where the obvious choice is wrong. State the failure conditions and their early symptoms.

**Last in Build because it depends on everything before it**, particularly S7. Judgment about when to use something is downstream of knowing what it costs. Anyone who acquires "use X over Y" from an article without having touched either has memorized a slogan, not formed a judgment, and slogans fail on exactly the cases that matter.

**Return the Register 2 metaphor here.** Every borrowed metaphor breaks somewhere, and where it breaks is where people get hurt. A *container* is not a shipping container: the isolation is considerably weaker than the metaphor implies, and that specific gap between the name's promise and the mechanism's delivery is the origin of a recognizable class of security incident. "Where does the metaphor stop being true" is often the strongest single question in a chapter.

**Return the Register 4 mismatch here too.** Misleading names cause misapplication, and this is the station where that damage lands.

---

### CLOSE

---

#### S9 — LINEAGE

**Delivers:** the intellectual thread — the paper, the debate, the disagreement that is still open, and who to read next.

**Procedure:** the originating work where one exists, and two or three sources worth following.

**Disagreements, in Stages 0–2:** the rule is the bullet 'In Stages 0–2, disputes mostly stay backstage' in `curriculum-state/canon/integrity-floor.md`, "Second-order rules". It tells you when a dispute belongs in `evidence-ledger.yaml` and when it must be taught properly, with both positions and why they matter.

**Purpose:** to leave the topic open rather than closed. A chapter that ends in resolution teaches that the field is settled. Naming a live disagreement teaches that it isn't, and gives the motivated reader somewhere to go.

**Runs thin on Procedure-shape chapters.** Signing up for an account has no lineage. Skip it and log the omission.

---

#### S10 — RETRIEVE

**Delivers:** work the reader does, from memory, without looking back.

**This is the only station with a verb.** Everything else can be satisfied by reading, and reading is close to worthless for retention. Retrieval consolidates knowledge in a way that re-reading does not, and the difference is not small.

**Shapes that work:**
- Reconstruct the mechanism from memory in three sentences.
- Predict the outcome of a case the chapter did not cover.
- Find the bug in a variant of the S5 example.
- Decide, for a described situation, whether to reach for this — and name the condition that would flip the answer.
- State the failure mode a named misuse would produce.

**Shapes that do not work:**
- A summary. It performs the retrieval on the reader's behalf, destroying the effect.
- Recognition questions where the answer is visible on the page.
- "Think about how you might apply this," which asks for nothing checkable.

**The recap ending is the most common way a good chapter is ruined in its last paragraph.** "In this chapter we learned that…" is not a weak version of this station; it is the station replaced by its own opposite. Delete it wherever it appears.

**Calibrate the prompt to scale with how much the reader actually absorbed:** open enough that someone who got half of it still produces a partial answer, and someone who got all of it produces a fuller one. "Reconstruct the mechanism in three sentences" scales naturally. "Which of these four options" does not.

---

#### S11 — SPIRAL

**Delivers:** the forward pointer — where this returns, at greater depth, later in the curriculum.

**Procedure:** name what this chapter deliberately did not resolve and where it gets resolved. One or two sentences.

**This station belongs to the curriculum map, not the chapter.** A single pass through the spine is a checklist; the same topic revisited at greater depth is a curriculum. The individual chapter's only job is to leave a correct pointer and to be honest about its own scope boundary.

---

## 3. Weighting by chapter shape

Every station is available to every chapter. What changes is which ones carry the weight. **The center of gravity is what makes a chapter feel right or wrong to a given reader — not the presence or absence of material.**

| Station | Concept | Tool | Practice | Procedure |
|---|---|---|---|---|
| S0 NAME | High | Medium | Medium | Low |
| S1 ANCHOR | High | Medium | Medium | High |
| S2 SOURCE | Low | High | Low | High |
| S3 WHY | **Highest** | Medium | High | Low — one clause |
| S4 WHAT | **Highest** | Medium | Low | Low |
| S5 HOW | Medium | **Highest** | **Highest** | **The whole chapter** |
| S6 WHERE | High | High | Medium | Low |
| S7 COST | Medium | **Highest** | Medium | Low |
| S8 WHEN | High | **Highest** | **Highest** | High — the failure branch |
| S9 LINEAGE | High | Low | Medium | Skip |
| S10 RETRIEVE | High | High | High | High |
| S11 SPIRAL | Medium | Medium | Medium | Low |

**Concept** — an idea with no install command. Weight on the problem, the mechanism, and the judgment. Cost often runs thin, and that is legitimate; do not manufacture a number.

**Tool** — a named thing with a version. Weight on demonstration, real cost, and the decision of when to reach for it. Lineage usually runs thin. The commonest failure is writing a Tool chapter as though it were a Concept chapter, producing an essay the reader cannot act on.

**Practice** — a repeatable human activity: reviewing a diff, writing a spec, debugging. **The framework is weakest here and should say so.** Competence at a practice comes overwhelmingly from repetition against feedback, not from exposition. A Practice chapter's honest job is to structure the reps and name what good looks like, not to explain the practice into existence. Weight S5 and S8 heavily, keep everything else short, and make S10 an actual rep.

**Procedure** — a bounded sequence with a definite end state: install this, create an account, get the first thing running. Named explicitly because this curriculum's audience includes people who genuinely stall at signup, and that reader is not served by a compressed chapter written as though the steps were beneath mention.

Three rules for Procedure chapters:
1. **The failure branch is the chapter.** Budget more words for what to do when step 4 doesn't match than for step 4 going right.
2. **No condescension and no apology.** Write the steps plainly. Do not preface them with "this is very simple," which converts a stuck reader's problem into a personal failing.
3. **State the end state up front**, so the reader can tell whether it worked. "When this is done, running `git status` prints a line about a branch." Without this a beginner cannot distinguish success from partial failure.

**FrontDoor** — the fifth shape, added 17 September 2026 after four chapter shapes between them failed to describe a stage's opening page. A FrontDoor teaches none of its stage's material. What it carries is the stage's shape and its promise. Its opening and its length are governed by `curriculum-state/canon/corrections.md`, "1. A front door is not a chapter" — it covers what a front door may open on, its first screenful, and why short is correct. Open it before writing one.

*(This used to read "the one place in the book where warmth and orientation outrank density". Withdrawn on 20 September 2026 — warmth is the house register everywhere, including the middle of a teaching chapter. The withdrawal record, and the front-door-only permission it removes, are `curriculum-state/canon/corrections.md`, "13. Warmth, enthusiasm and emphasis belong everywhere"; the register rule is `curriculum-state/canon/voice.md`, "Register — it varies, and that is the point".)*

| Station | FrontDoor |
|---|---|
| S0 NAME | Dropped. A welcome has no name to decompose, and forcing the station produces a demonstration the position does not need. |
| S1 ANCHOR | The reader's own situation: what they came for, and what they will have at the end. |
| S2 SOURCE | Which stage this is, of how many, and what it is called. |
| S3 WHY | Why this stage comes first, and why it is ordered the way it is. This is the one place a short version of the argument belongs. |
| S4 WHAT | What the stage covers, as groups rather than a list — never a chapter count, and never a promise the stage cannot keep. |
| S5 HOW | Dropped. There is nothing to run. |
| S6 WHERE | Where the stage sits in the whole book, and what it hands to the next one. |
| S7 COST | What it asks of the reader. Usually nothing but reading, and worth saying plainly. |
| S8 WHEN | How to read it — in order, at whatever pace, coming back whenever. |
| S9 LINEAGE | Dropped. |
| S10 RETRIEVE | Dropped, or replaced by the single action the reader takes next. |
| S11 SPIRAL | The handoff to the first real chapter, named, and the reason that chapter opens where it does. |

**A FrontDoor still carries the safety floor** wherever the topic warrants one and **still hands forwards**. The safety-floor rule — where it applies, and the fixed `<Callout type="warning" title="Safety floor">` that carries it — is `curriculum-state/canon/thesis.md`, "The safety floor" and "The six invariants"; the one call to action, at the true end, once, is `curriculum-state/canon/corrections.md`, "1. A front door is not a chapter". Like every other page, no title, heading or text states a chapter count (locked decision D5; `naming.md`). See `curriculum-state/canon/corrections.md` §1 for the rule this shape exists to enforce, and §2 for how a reference structure gets mapped into it.

**All ten comprehension-audit angles run on a FrontDoor**, unchanged, and its findings log is presented the same way. Two of them matter more here than anywhere else. **Angle 1 (cold landing)** is the whole risk, because a front door is the page a reader is most likely to meet with nothing behind them. **Angle 8 (false fluency)** is the one that fails quietly: a front door that promises more than its stage delivers — a build, a skill, a credential — leaves the reader feeling they understood what they were signing up for, and they did not. Nothing on a FrontDoor may promise anything the stage does not actually carry.

---

## 4. Sequencing rules and legal deviations

**Fixed by design:**
- S0 before any definition. The prediction cannot be formed after the answer.
- S3 before S4. The problem before the solution.
- S4 must score S0. The loop opened must close.
- S7 before S8. Judgment is downstream of magnitude.
- S10 last. Nothing after the retrieval prompt — a paragraph following it invites the reader to keep reading instead of thinking.

**Free to move:**
- S2 may move to the end for a Concept chapter where provenance is not a gate.
- S6 may merge into S4 when the mechanism and its position are the same fact.
- S9 may merge into S3 for Register 3 topics, where the person and the problem are one story.
- S1 may be omitted where the anchor is genuinely obvious. Rare; check the assumption before claiming it.

**Legal omissions:** any station can be dropped when the chapter has nothing real to put in it. Log each with a one-clause reason. Manufacturing a number for S7 or an origin story for S9 is strictly worse than dropping the station.

### Chapter boundaries — the open and the close

**Two rules bind every chapter at its edges, and neither is one of the twelve stations.** They govern where a chapter sits in a sequence, not what happens inside it. `SKILL.md`'s sixth hard constraint is the full statement; this is the spec.

**The chapter opens by connecting backwards.** Before any teaching happens, the opening carries the reader in from where they already are: what came before, what it left unresolved, and why this subject arrives now. The full rule — four things in roughly this order, starting with the greeting and the link back — is `curriculum-state/canon/corrections.md`, "7. Every chapter opens by welcoming the reader and showing the shape". Open it before drafting an opening. **S1 is where this lives, and S1's job is narrower than the requirement** — a chapter can have a real anchor and still open cold on its own subject. The test is whether the first paragraph answers a question the reader is already holding, not whether an analogy is present. The opening is content in the chapter's own voice, never a preamble announcing that a chapter is about to begin.

**The chapter closes by handing forwards.** Once S10's retrieval prompt has been answered, and alongside S11's forward pointer, the closing names what this chapter deliberately left unresolved and walks the reader to the next one: what it will ask, and why that is the next question. **S11 points at a sign; the handoff walks them to the door.** Both are required, the handoff comes last, and nothing follows it.

**A stage's first position introduces the stage itself** — what it is, what it covers, in what order, why that order, what it costs the reader, and where it ends. It teaches none of the stage's own material.

**It is the `FrontDoor` shape and uses the FrontDoor weighting table above. It never borrows Concept's.**

> **Corrected 20 September 2026.** This paragraph used to say a stage's first
> position "has no weighting row of its own: it borrows Concept's" — fifty lines
> after the FrontDoor table was added precisely so it would not have to. A
> drafting session that reached this line instead of the table would rebuild the
> exact draft the owner rejected on sight: a stage introduction written as a
> Concept chapter, opening on a dated artifact.

---

## 5. The station sheet

Fill before drafting prose. One line per station.

```
CHAPTER:            [topic]
SHAPE:             [Concept | Tool | Practice | Procedure]
NAME REGISTER:     [1 Compositional | 2 Metaphorical | 3 Eponymous | 4 Misleading]
PREDICTION GAP:    [what the name promises vs. what the thing is — sizes the chapter]
CENTER OF GRAVITY: [the 2-3 stations carrying the weight]
BEGINNER-LANDING SET: [what will carry this for someone meeting it the first time — this is the spine]

S0  NAME      | delivers:                          |
S1  ANCHOR    | delivers:                          |
S2  SOURCE    | delivers:                          |
S3  WHY       | delivers:                          |
S4  WHAT      | delivers:              | scores S0: |
S5  HOW       | delivers:              | breaks by: |
S6  WHERE     | delivers:              | blast radius: |
S7  COST      | delivers:              | magnitude the reader can feel: |
              | (figure + date + source go in evidence-ledger.yaml, not the prose) |
S8  WHEN      | delivers:              | counter-indication: |
S9  LINEAGE   | delivers:              | where to go next: |
S10 RETRIEVE  | the reader must produce:           |
S11 SPIRAL    | returns at:                        |

FOOTHOLDS:         [concrete mechanics: commands, click paths, expected output — must pass delete test]
DEPTH BLOCKS:      [optional “why does it work like this?” extras for a curious beginner — must pass delete test]
DROPPED STATIONS:  [station: one-clause reason]
```

If two stations' "delivers" lines say nearly the same thing, one of them is not earning its place. If every "delivers" line delivers the same *kind* of thing — all definition, or all procedure — the chapter has a center-of-gravity problem before it has a prose problem.
