# Research

Loaded at SKILL.md step 2. This is the front half of the chapter: finding out what is actually true before a paragraph of it exists.

**Design is not in this file.** Shape, the name, the stations, the spine, the layering — `lesson-spine-authoring` owns all of it and this folder does not restate it. What research produces here is the raw material that skill is handed at step 3.

**Nothing is filed in a side folder.** There is no dossier, no design trace, no separate research directory. Verification is recorded in `curriculum-state/ledgers/evidence-ledger.yaml`, which already stores per source its URL, what it establishes, when it was last verified, when that verification expires, and every question the book has asked of it. A second per-chapter copy of that would duplicate the ledger and drift from it. The chapter's citations and the ledger are the record.

## The two passes this research sits inside

`curriculum-state/canon/research-and-comparison.md` is a core platform policy and it governs this whole phase. **Nothing is written from memory, from instinct, or from a blank page.** Two passes run before drafting, and this file's protocol is how the first one is executed:

- **Pass 1 — standards research.** Not only "what is true about this topic," but **how the strongest sources in the world actually teach or build it, and what reasoning sits underneath that choice.** International practice and its philosophy, both. A convention adopted without its reason is cargo. This is usually delegated to DeepSeek v4.1 Flash through `command-code-delegation`, after asking the owner which model does it (`corrections.md` §19 and §30) — Claude decides what to ask and judges what returns, DeepSeek does the reading — and results are read from the actual tool trace, never from the summary line.
- **Pass 2 — the owner's comparative study.** The project owner works through several real courses or implementations and hands over their own learnings plus the points they want carried in. **It blocks step 3, not step 2**, so research runs first and drafting waits. It is not substitutable by your own search results.

**What comes back is not averaged, and it is not filtered either.** Study each source for everything it can teach — its structure, its ordering, its tone, the kind of example it reaches for, where it loses a reader — **and** for what all of them missed. Adopt what is good, then go further. `canon/research-and-comparison.md` and `corrections.md` §15.

**Then it is transformed.** Almost every external source teaches a learner to *write* the thing; this curriculum teaches them to **read and judge** it. That conversion is the adjustment step, and it is also what makes the derivation a new work rather than a reproduction with fresh sentences. **Nothing studied is ever reproduced** — no verbatim text, no reworded paragraphs, no borrowed structure, no lifted examples or exercises, from a free course or a paid one. Where a specific framing is genuinely owed to a named source, attribute it in the prose the way every other citation works here.

**Where CS50 is the source being studied, step 0's integrity floor is checked first and overrides this policy.**

## Research protocol

1. **Before writing a single sentence, establish three things by searching, not recalling:** what current authoritative sources actually say about this topic; whether anything about it is time-sensitive; what the official docs for any named tool actually claim. Alongside them, Pass 1's own question: **how the best sources in the world teach or build this, and why** — which is a different search from "what is true," and the one that gets skipped.

2. **Treat memory as a hypothesis for Stage 2 topics.** These tools update often enough that a chapter written from what you already "know" will describe a version that no longer exists. If search isn't available for such a topic, stop — a hedged claim written from memory about a monthly-changing tool isn't a smaller version of a verified claim, it's a claim this protocol has no business making.

3. **Look for three specific things:**
   - The single best real, current, citable statistic or incident — *best* meaning it most precisely supports **this** chapter's claim, not the most impressive one available. **Finding it is required; printing it is not.** It may end up shaping a plain sentence and living only in the ledger.
   - At least one primary or official source, preferred over secondary summaries.
   - Evidence of what learners actually get wrong. This often means searching discussion, support, or postmortem sources: docs describe correct behaviour and rarely describe how people misread it. This is raw material for `lesson-spine-authoring`, not a diagnosis made here.

4. **Check `evidence-ledger.yaml` and `concept-ledger.yaml` before treating a finding as new** (see `ledgers-protocol.md`). A source duplicating an existing canonical citation isn't earning a place; a term this chapter would "newly" define may already have a canonical wording.

5. **A claim that can't be verified in the time available doesn't go in as fact.** Hedge it explicitly, attribute it as a claim, or cut it. An unverified assertion inside a research-backed chapter is worse than an honest gap.

6. **Any code destined for the chapter must actually be run**, in whatever sandbox this session has. Show real output verbatim, and note the two or three real error messages a beginner is likely to hit, with what each means.

7. **Look it up the moment you are unsure, at any step.** Not only during this one. Web search for anything current, contested, or dated; Context7 for library, framework or CLI documentation, because its docs are fetched live and your memory of an API is a guess about a version. Stopping to check costs a minute. A confident wrong sentence about a tool a reader is about to run costs their trust in the whole book.

## What gets recorded, and where

Research living only in the session can't be audited later and can't be recalibrated when a source ages out. `evidence-ledger.yaml` is where it survives, and step 8 is when it is written — after the gate is clean, per `ledgers-protocol.md`. Each source carries:

- what it establishes that nothing already on the list does, in one clause
- `last_verified` — the date it was actually opened and read this run
- `expires` — **90 days** for a Stage 2 tool-behaviour claim, **12 months** for an industry report's figures, `null` for a named historical incident, whose facts don't expire even though its framing might
- `questions_asked` — the specific question *this* chapter asked of it

**A claim with no source doesn't ship.** That is the mechanism, not a suggestion, and the ledger is where it is enforced.

Reusing a source an earlier chapter already cited? Treat any entry past its `expires` date as needing a fresh check before it ships — not as pre-verified because a row exists. Re-open it, confirm it still says what the row claims, and update `last_verified`.

## Source discipline

Research is deliberately broader than the citation set, because the point of research is finding out what's true, not confirming what's already approved. But nothing found in research gets cited as if pre-approved. Every source lands in one of three buckets:

- **Canonical** — already in `evidence-ledger.yaml`. Cite normally.
- **Proposed** — newly found and genuinely warranted. Cite it, add one clause on why it earns inclusion, and add it to the ledger with `status: proposed` — a proposal for the editor to confirm, not a unilateral addition.
- **Background** — informed your understanding but isn't load-bearing enough to cite. Paraphrase what you learned without attributing it to a source that isn't earning a permanent place in the project's citation set.

**How citations appear in the finished chapter.** *(Rewritten 2026-09-20 — the old rule here said "inline, named, in the prose itself", and it is the most direct single cause of the citation density the owner rejected. `corrections.md` §11.)*

- **The prose carries the plain sentence.** *"Nearly half of AI-written code ships with a security flaw."*
- **The source travels with it, attached at the end of the sentence**, or in a Source chip once that component ships (`canon/thesis.md` §"Statistics and their sources"). Never wedged into the middle of a sentence a beginner is trying to read.
- **Every source, with its year and its link, goes in `evidence-ledger.yaml` regardless.** Nothing is unverifiable; the verification simply is not the reading experience.
- **Where the source *is* the teaching** — the chapter is about that report, that incident, that person — it belongs in the prose, named.
- The gate warns on a bolded percentage with no source named nearby.

## What to hand over, and what comes back

Research ends where design begins. Package what steps 0–2 produced — the topic and its position, the verified claims with their sources, the ledger constraints, the curriculum invariants — and hand all of it to `lesson-spine-authoring` at SKILL.md step 3.

The three things checked on the way back are in **SKILL.md step 3**, not here: the curriculum invariants, the ledger-checked worked example, and the signature contribution. Do not add a fourth check of your own invention.

What comes back is carried into the chapter and into the ledgers at step 8. The shape, the station sheet with its dropped-station reasons, and the signature contribution go into the **step 9 report**, where the reader of that report is the person deciding whether this chapter ships — not into a file nobody will open again.

## Worked example — "What an AI coding agent actually is"

**This is this skill's half only.** The design half of the same chapter — Station 0, the register, the beginner-landing set, the layering — is worked through in `lesson-spine-authoring/reference/mixed-audience.md` §6. Two halves of one chapter, one owner each, deliberately not duplicated.

**Step 0.** Cleared immediately — no external credential involved.

**Step 1, inputs.** Stage 0 / position 0, checked against `prerequisite-graph.yaml`, where it is already listed as `intro`. All three inputs real, so no stop.

**Step 2, research.**

- Searched how the propose → act → observe loop is currently described across the AI-native material's named tools, rather than relying on a memorised description. Stage 2 material, so memory was a hypothesis and search settled it.
- Searched for a current figure on AI-generated code reliability. Found Veracode's GenAI Code Security Report; checked `evidence-ledger.yaml` **first** — already canonical, and already spent on two distinct questions. Reuse here therefore needs a genuinely third question, which the ledger protocol exists to force.
- Searched postmortem and discussion sources for how people misread agent autonomy. That material was handed over as raw evidence; the diagnosis of what the reader wrongly believes was made at Station 0, not here.

**Step 3, the handback check.**

- **Curriculum invariants:** thesis tie-in present; the two extremes made concrete as the undersell and the oversell; safety floor required, because a reader could act on this. Passed.
- **Worked example, ledger-checked:** the design proposed "build me a to-do app," traced end to end. `example-ledger.yaml` was checked and the example was rejected — it is a toy, which `lesson-spine-authoring` Principle 7 bans outright — and recorded as rejected with the reason. A rejection is worth as much to the next author as a use.
- **Signature contribution:** the two-wrong-models frame — naming the undersell and the oversell as one failure with one cause, the name itself. The top search results state the correct model without naming either error, so it passes the anti-commodity test. Accepted.

**Step 4, scope.** `scope_multiplier: 1.0` — the anchor. `scope_reason`: one concept, corrected against two competing wrong models, with the loop shown once in full.

**Steps 6–8.** Assembled as the intro chapter at the docs root; gate run and clean; the ledgers written back, including the rejected example and the third question asked of the Veracode report.

## Anti-patterns

**Fabricating or citing unverified facts, statistics, or incidents.** The single most damaging failure a research-backed chapter can have.

**Writing Stage 2 tool claims from memory**, or quoting the curriculum's own stage descriptions from memory instead of `canon/thesis.md`. Same failure — reciting instead of checking — on different material.

**Guessing at an API, a flag, or a version instead of looking it up.** Context7 exists for exactly this and costs a minute. A chapter that tells a reader to run a command that changed two releases ago fails them at the only moment that matters.

**Carrying every researched fact into the handoff.** Research turns up far more than a chapter can hold. Handing over an undifferentiated pile makes the receiving skill do the sorting with less context than you have; hand over what is verified, bucketed, and load-bearing.

**Claiming a signature contribution that isn't one.** A label bolted onto an ordinary synthesis doesn't pass the anti-commodity test just because the field got filled in. The test is whether a reader actually loses something if this chapter didn't exist — that has to be true, not asserted.

**Including code that was never run**, or inventing its output.

**Diagnosing the misconception here.** It is genuinely tempting after reading the postmortems, and it produces a second answer that competes with Station 0's. Gather the evidence; hand it over; let Station 0 locate the misconception.

## Self-check before handing over

- [ ] Step 0 integrity check run, and cleared or escalated
- [ ] All required inputs present, or the run stopped and asked rather than inventing them
- [ ] Pass 1 asked how the best sources teach or build this **and why** — not only what is true about it
- [ ] Pass 1 run by the model the owner chose when asked (usually DeepSeek via `command-code-delegation`; `corrections.md` §30), and read from the actual trace
- [ ] The owner's comparative study is in hand, or step 3 is blocked and the ask has been made
- [ ] What every studied source missed is named, not averaged away
- [ ] Nothing reproduced from any studied source — no text, no structure, no examples, no exercises
- [ ] Every specific factual claim checked against a real source opened this session
- [ ] Anything uncertain was looked up — web search for current or contested facts, Context7 for library and CLI documentation — rather than written from memory
- [ ] Stage 2 tool claims verified against current search; stage descriptions quoted from `canon/thesis.md`
- [ ] `concept-`, `evidence-`, and `example-ledger.yaml` checked before treating anything as new
- [ ] Every source bucketed — canonical, proposed with rationale, or background
- [ ] Any reused source past its `expires` date re-opened and re-verified, not assumed
- [ ] Any code was actually run; its output is real
- [ ] All four handoff inputs packaged for `lesson-spine-authoring` (topic and position, verified claims, ledger constraints, curriculum invariants)
- [ ] Handback checked on the three SKILL.md step 3 obligations, and no fourth check invented
- [ ] Any concept that genuinely needs a labelled diagram is named as a gap for the owner in the step 9 report — not drawn, not approximated, not prompted for unasked

---

*A framework can't fix a chapter that wasn't worth teaching. This phase's only job is making sure what it's built on is true.*
