---
name: lesson-spine-authoring
description: Author any chapter, lesson, tutorial, explainer or teaching section for The Bridge Balance using the Prime-Build-Close spine — a name-first sequence of twelve stations (Name, Anchor, Source, Why, What, How, Where, Cost, When, Lineage, Retrieve, Spiral) built on 5W2H plus etymological decomposition. Use whenever writing or revising instructional content on a technical topic — software engineering, AI, tooling, agents, developer workflow — for absolute beginners — readers who have never programmed — in one warm, plain, beautifully formatted document. Trigger on any request to write, draft, outline, expand, rewrite, or audit a lesson, chapter, module, or teach-X section, even when the framework is not named. Also trigger on mentions of the spine, the stations, Prime/Build/Close, name register, the four registers, depth block, foothold, or any station by name. Also governs language register — plain English for Pakistani and international readers alike — plus four binding rules it carries for every draft: the one-minute term test that decides whether a term is explained inline or taught before use, the ten-angle comprehension audit, the ten-angle beginner-experience audit, and the anti-slop rule that keeps prose reading as though a person wrote it.
---

# Chapter spine authoring

*The folder is still called `lesson-spine-authoring`, because many files point at that name. This skill writes a **chapter**, the one-file unit of the book (`curriculum-state/canon/course-structure.md`).*

**The framework this skill runs is called Name-First.** Refer to it by that name in working notes and in any reader-facing text that teaches the method. Its full form is *the Name-First Spine*: twelve stations in three phases — Prime, Build, Close.

Learners do not absorb ideas in the order a topic is organized. They absorb them in the order a mind can accept them: a name, a hook to hang it on, a problem worth solving, then the answer. This skill imposes that order on every chapter, so that the sequence stops being an accident of whatever the author happened to know first.

**Before drafting anything, read `reference/stations.md` in full.** It holds all twelve stations, what each must contain, the failure mode each one prevents, and how much weight each carries under each chapter shape. This file is the workflow that runs on top of that document; it deliberately does not re-derive the station definitions.

Read `reference/name-registers.md` before Station 0 on any chapter whose topic has a name worth decomposing (most of them). Read `reference/mixed-audience.md` and `reference/language-register.md` before drafting prose for the first time in a session — the second one governs every sentence in the book and cannot be inferred from the rest of this file. Read `reference/comprehension-audit.md` before running step 10, which no draft skips.

## Before you start: load the project guide

This skill is written for one project, The Bridge Balance (the Book repo), and it
triggers on its own. A request phrased as "teach me X" can be that project's work
without saying so.

**Stop and load `bridge-balance-project-guide` first, then come back here.** Read
`curriculum-state/canon/corrections.md` in full while you are there. It is the one
file in that repo written specifically to stop mistakes this skill has already made
twice, and neither repeat was caught by anything else in this file.

That guide carries rules this skill cannot know and must not override: an
academic-integrity floor on CS50 coursework, the rule on images and diagrams
(Constitution Principle III, step 3), no fixed chapter count, one continuous read per chapter, and a
standing policy that nothing is written before external practice has been
researched and the owner has supplied their own comparative study. They bind the
chapter regardless of how good the teaching is, and a chapter drafted without them
can be complete, well-structured, and still unusable.

## What to open, and when

Rules that decide what the book is, what it may say and what it must never do live in the project's canon, not in this skill. This skill holds the writing craft. When a rule below points at a canon file, open that file in full, at the moment this table says.

| When you are | Open, in full |
|---|---|
| Starting any chapter | `curriculum-state/canon/corrections.md` and `curriculum-state/canon/audience.md` |
| Naming a stage, chapter, section or heading | `curriculum-state/canon/naming.md` |
| Writing about AI, about Engineering, or opening a stage | `curriculum-state/canon/thesis.md` |
| Drafting a chapter that touches CS50 coursework, or any security content | `curriculum-state/canon/integrity-floor.md` |
| Researching, or studying a source | `curriculum-state/canon/research-and-comparison.md` |
| Naming or splitting any level of the course (stage, course, chapter, lesson, part) | `curriculum-state/canon/course-structure.md` |
| Assembling the file | `.claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/gate.md` |

## The one hard constraint: write for the beginner, and only the beginner

**Check who the chapter is for before the first sentence.** Who each stage is written for — absolute beginners in Stages 0 and 1, and nobody else — is settled in `curriculum-state/canon/audience.md`, "The reader"; the correction record is `curriculum-state/canon/corrections.md` §8 (whose dated note renumbers the floor to Stages 0–1, `course-structure.md` CS-31).

*The two-reader constraint, and every rule built on keeping a senior engineer rewarded, was withdrawn by the owner on 20 September 2026 and is not applied.* The rule, and the named list of withdrawn rules, is `curriculum-state/canon/corrections.md` §8; where the withdrawal binds a draft is `curriculum-state/canon/audience.md`, "The reader".

A beginner disengages for more reasons than the first silent assumption, and all of them count. The four causes — the silent assumption, difficulty that does not match them, pace that does not respect their time, and a page that looks like work — are in `curriculum-state/canon/audience.md`, "The reader" and "Formatting is part of the teaching".

`reference/mixed-audience.md` holds the reader model and the foothold / depth-block layering. The requirement that every Stage 0–1 draft passes the ten-angle beginner check in `reference/beginner-experience-audit.md` before it is presented is `curriculum-state/canon/audience.md`, "The reader".

## The second hard constraint: plain English, full engineering

Most readers are in Pakistan. They read technical English every day and think in Urdu, Punjabi, Pashto, Sindhi, Saraiki, or Balochi. A few read the book from elsewhere.

**Simplify the sentence *and* the vocabulary. Never simplify the engineering.** *(Revised 20 September 2026.)* The claim stays exactly as true as it was. The words carrying it do not stay fixed. The plain-word rule, and the balance that makes either extreme — dense or mushy — a failure, are in `curriculum-state/canon/corrections.md`, "12. Simplify the vocabulary, not only the sentence"; that a claim is never made vaguer, softer or wronger to simplify it is in `curriculum-state/canon/thesis.md`, "The safety floor".

The old rule here read "keep the technical vocabulary … exactly as it is", and applied to Stage 0 it produced sentences no beginner could read.

The working targets: sentences averaging 15 to 18 words, one idea each, second person, active voice, no idiom a reader has to have memorised, no long word where a short one works.

**Speaking to the reader directly is allowed and often right.** "If you have never programmed, nothing here assumes you have" is a good sentence. The old ban on audience labels is withdrawn.

Write as a warm, expert teacher talking to one student they like — a professor who knows the subject completely, is genuinely glad the reader turned up, and explains things the way they would to a friend sitting next to them.

**Plain is the floor, not the goal. Every sentence has to read as though a specific person wrote it, on purpose, for this reader.** Never sound like a specification, a syllabus, a vendor page, or a model summarising search results. Prose can be accurate, fully glossed, and inside the register and still read as machine-made — flat rhythm, dramatic fragments, false pivots, triads everywhere, a weighty one-liner closing each section. A reader who senses that does not complain; they decide the book was generated and stop trusting it, and that judgment almost never reverses. The creativity belongs in the explanation — the anchor that makes an abstract thing land, the example nobody else would have picked — never in the decoration of the sentence.

`reference/language-register.md` has the full rules, the substitution tables, the anchor tiers, the conventions for spelling, dates, numbers, and currency, and in §6 the named cadence tics with the read-aloud test that catches them. Read it before drafting.

## The third hard constraint: every term sorted, nothing assumed

Before a term is allowed onto the page it goes through one test. **Could a reader who has never programmed hold a working understanding of this word within one minute?** *(One minute, measured against a true beginner — tightened from two minutes on 20 September 2026.)*

- **Yes — a light term.** Explain it inline at first use, twelve words or fewer. If the glossary carries it, mark it where it first appears: `[*term*](/glossary#slug)` — italic, accent-coloured, underlined, one tap from the full definition. Italic with `*…*`, never backticks, which would render the term as code and say something false about it.
  **The inline explanation runs for roughly the term's first two or three appearances in the book, then stops.** After that the term appears as the glossary link alone. Re-explaining the same word in every chapter forever is what made pages read like dictionaries — that rule is withdrawn.
- **No — a heavy term.** It cannot be glossed at all. **Teach it before you use it**, in the spine, in a passage of its own — or restructure so the chapter does not need it yet. Never in a foothold or a depth block: both must survive the delete test, and a definition the spine leans on cannot.

The link never replaces the gloss. A reader on a phone, on paid data, mid-sentence, does not leave the page — the gloss carries the meaning and the link carries the depth. A term that is marked but not glossed is a footnote wearing a new coat.

**A hard ordinary English word is handled like a technical term.** These readers are reading a second language, so a hard ordinary word can stop them as surely as a technical one: choose the easy word first, and if it cannot be replaced, explain it inline and link it to the glossary under the same rules as any term.

**Stages 0 and 1 assume nothing at all** — a reader who does not know what Python is, and who has no way to tell whether confusion is the book's fault or their own. Every term sorted, every heavy term taught first, no exceptions bought with pace. And before sorting a term, ask whether the chapter needs it at all: **in Stages 0–1 a hard word must earn its place, and if the idea works without it, it goes.** Stage 2 builds on Stage 1, so field-standard vocabulary may pass on an inline explanation and a link.

`reference/mixed-audience.md` §4 has the full rule, the ledger weights that make the ordering enforceable, and the one-entry-per-term glossary invariant that lets an inline gloss repeat in every chapter without the term's meaning ever splitting in two.

## The fourth hard constraint: nothing is written blind

A draft is not finished when it is complete. It is finished when it has been read the way a reader will read it, and **that is a separate pass with its own method** — ten angles, each swept end to end over the whole draft, all asking one question in different ways: *how, and why, would somebody fail to understand this?*

The bar is not "covered" and not "correct." It is that a reader finishes each section holding the concept, its context, and its place in the chapter — enough that the structure assembles itself in their head as they read. A chapter the author cannot redraw from memory has no chance with a reader meeting it once, on a phone, between other things.

Nothing is exempt: not a heading, not a callout, not a link's wording, not a sentence the author is certain is obvious. Obviousness is a state of the author, never of the reader, and every silent assumption this book has ever shipped looked obvious to the person who wrote it.

`reference/comprehension-audit.md` has the ten angles, the mindmap test, and the findings log. It runs at step 10, after the draft is complete and before it is presented.

## The fifth hard constraint: nothing starts from a blank page

**No claim in a chapter is made from memory or guesswork, and both research passes have run before the workflow begins.** The scope note above "The two passes", both passes themselves, and the rule that what comes back is never averaged or filtered are `curriculum-state/canon/research-and-comparison.md`, "The two passes".

Pass 1 runs through `command-code-delegation`, usually the delegate and only after the owner is asked which model does it, and a result is read from its actual trace, never its summary line — "Who runs it" in the same file.

**Then it gets transformed, and the transformation is the point** — the conversion table, and the rule that a chapter walking its source's path in the same order toward the same skill is a reproduction, are `curriculum-state/canon/research-and-comparison.md`, "The transformation rule". The test the result must pass — every chapter makes at least one signature contribution, which in Stages 0–1 is making a beginner genuinely understand, not a competent restatement of the common explanation — is `curriculum-state/canon/voice.md`, "Two tests, run before anything ships".

**What is never reproduced is a source's expression, and what may cross over is `curriculum-state/canon/research-and-comparison.md`, "The legal boundary"** — the licensing and exam-question limits are `curriculum-state/canon/integrity-floor.md`, "Second-order rules". Where the owner supplies a reference and asks for its pattern: `curriculum-state/canon/corrections.md`, "2. A supplied reference is a skeleton to fill, not a pattern to filter" and "15. A studied source may be learned from completely".

**And research is not the reader's diet.** What Pass 1 returns makes the writer correct and does not become a list of names, dates and citations the chapter has to carry — `curriculum-state/canon/voice.md`, "Six commitments" (commitment 6), and `curriculum-state/canon/corrections.md`, "11. Research makes the writer correct. It is not the reader's diet".

**For The Bridge Balance:** `curriculum-state/canon/research-and-comparison.md` is the authoritative statement, and this skill points there rather than restating it. The Credentials-track integrity floor that overrides it wherever CS50 material is the source being studied is `curriculum-state/canon/integrity-floor.md`, "Known live conflict" — the boundary is checked first and any conflict surfaced, never worked around.

## The sixth hard constraint: a chapter connects backwards and hands forwards

**No chapter opens cold, and no chapter stops dead.** A reader arrives having just come from somewhere — the previous chapter, a search result, a shared link. Whichever it was, the opening has to carry them in and the closing has to walk them out. The opening is content, not a preamble, and it is required, not merely permitted. *(The reversal behind this — the rules that produced cold, dense, date-heavy openings are gone, not softened, and warmth now belongs everywhere — is `curriculum-state/canon/voice.md`, "Register — it varies, and that is the point".)*

**The opening.** Every chapter begins by welcoming the reader and showing them the shape of what is coming. Four things, in roughly this order — the rule and its full record are `curriculum-state/canon/corrections.md`, "7. Every chapter opens by welcoming the reader and showing the shape":

1. **A real hello that places them.** Vary the wording — no welcome style returns until at least four chapters later.
2. **A connection backwards, with a link** — what the previous chapter or the introduction left them holding.
3. **What this one covers**, as a few grouped bullets — the real moves, not a copy of the headings.
4. **Why it matters** — why this arrives now, and what it unlocks. **The why is not optional.** It is the half that was missing from every draft the owner rejected.

**The first screenful of every chapter tells the reader what this chapter is, why it comes now, and what they will have at the end** — a reader who leaves after one screen still leaves knowing where they were.

**There is no word cap on the opening** — it is as long as it needs to be to do the four things well and no longer. *(The old "under roughly 120 words, then out of the way" cap is withdrawn.)*

**No phrase is banned here.** *"In this chapter we will learn…"*, *"Let's start"*, *"Welcome to Chapter 4"* — all allowed, all normal, all human. The rule, and the ban on exactly that sentence that was tried and withdrawn, live in `curriculum-state/canon/corrections.md`, "7. Every chapter opens by welcoming the reader and showing the shape".

**And the transition matters as much as the opening.** Moving from the welcome into the first teaching section must be a slope, not a cliff. A warm opening followed by a bare heading and a cold first sentence is the same failure, forty words later. The rule that every section, not only the first, starts by connecting to what the reader just read — and what does not fix a cold opening — is `curriculum-state/canon/corrections.md`, "7. Every chapter opens by welcoming the reader and showing the shape".

**Every heading is a promise, and it carries a why.** The rule and its three-second test are `curriculum-state/canon/naming.md`, "Rule 3 - The name carries the why, and the why is the reader's destination". Reference pages (Glossary, Changelog, FAQ, Code of Conduct) are exempt — "Scope, and where it stops" in the same file governs them.

**The why is the curriculum's, and it is an input.** Not what the subject did for the world — *"The Switch That Made Computers Small Enough to Own"* is a fact about the transistor, not a why. The rule, the owner's own-words input and the stop-and-ask are in `curriculum-state/canon/naming.md`, "The why is an input. The writer does not invent it"; see also `curriculum-state/canon/corrections.md`, "18. A name carries the why, not only the what".

Then the teaching itself opens **problem-first or story-first** — a problem the reader can feel, or a short scene they can picture, before the mechanism. Which of the two to use is a judgment call for the chapter. A blend of the two is often strongest. What it never opens on is a dated artifact, a proper noun or a historical event chosen because it is "concrete": a date is not a hook, and a problem the reader already has is — the rule on dated artifacts, citation apparatus and the first screenful is `curriculum-state/canon/corrections.md`, "1. A front door is not a chapter". **A chapter that opens directly on its own subject — the first instruction of the thing itself — has skipped the step that makes the subject land.**

**The closing.** The last beat names what this chapter deliberately did not resolve, and hands the reader to the next one: what it will ask, and why that is the next question. **S11 is the skeleton of this, not the whole of it.** Spiral already says where the topic returns; the handoff is broader — it is the reader being walked to the door, not pointed at a sign.

**A stage's first position is an introduction to that stage**, which is a different object from a chapter: what the stage is, what it covers, in what order, why that order, what it costs the reader, and where it ends. It teaches none of the stage's own material. It is the `FrontDoor` shape — **never rounded to Concept**, whatever any weighting table elsewhere may say.

**Why this binds as hard as the other five.** A chapter can satisfy every station, gloss every term, and sit perfectly inside the register, and still fail — because the reader had nothing to attach the first paragraph to. Progressive disclosure is the same rule from the other side: a chapter reveals only what the reader needs at that point, and nothing is taught before the thing it is built on. Together they are the difference between a curriculum and a shelf of essays that do not know about each other.

## Operative principles

These are how to think while running the workflow, not a preamble to skip.

**1. The name comes before the explanation — inside the teaching.** Every technical term is a compressed argument about what the thing is, and most readers have never unpacked it. Decomposing it first costs ten seconds and converts an arbitrary token into a structure.

**Scope.** This governs the order ideas arrive in *within a teaching section*. It is not an instruction about the first words on the page — the page starts with the welcome and orientation in the sixth constraint. "Never open with a definition; open with the name" was being read as "open the chapter on its subject", which is the cold open the owner has rejected four times. And decompose only where the decomposition genuinely helps a beginner: a Latin or Greek root that needs its own explanation has made the wall taller, not turned it into a door.

**2. A prediction that is never scored is worse than no prediction.** Where Station 0 asks the reader to guess, Station 4 must visibly close that loop. An unscored guess manufactures fluency, which feels exactly like understanding and is not.

**Scope.** The staged guess-and-reveal device is **off** on any front door and used sparingly inside teaching chapters; Register 4's invert-the-question form — *why is it called that when it is not that* — with no staged guess beat is the permitted substitute. The full rule, including why the device reads as performative, is `curriculum-state/canon/corrections.md`, "1. A front door is not a chapter".

**3. The problem precedes the solution.** A tool encountered before its problem is memorized; a tool encountered after its problem is understood. Where a chapter can make the reader feel the pain in two sentences before naming the cure, it should.

**4. A magnitude is worth more than an adjective — when the reader can use it.** "Slow" tells a reader nothing; "about a second, where the other takes a minute" tells them something they can act on. Find the number in research, always.

**Scope, Stages 0–1.** A number reaches the page when it changes what the reader understands, in a form they can feel — a comparison, a scale, a "that is about the size of" — not as a dated citation; the rest stays in the ledgers. The rule is `curriculum-state/canon/corrections.md`, "11. Research makes the writer correct. It is not the reader's diet". The old wording, "numbers are not optional", was one of the rules that turned beginner chapters into reference pages.

**5. The stations are scaffolding, not an outline.** They govern the order ideas arrive in, and they must never appear as headings in reader-facing text; no internal label — station, spine, register, shape, front door, invariant — may reach a reader, and the rule is `curriculum-state/canon/naming.md`, "Never put an internal label in a name". A book where every chapter has a "Why" heading followed by a "What" heading is a book any attentive reader will see through in thirty seconds.

**6. Break a station when the chapter doesn't need it.** Some topics have no interesting name, no meaningful cost, no lineage worth tracing. Skip it, write a one-clause note in your working notes saying which station you dropped and why, and move on. A logged omission is this principle working. A silent one is an error.

**7. Examples must be concrete. They do not have to be real.** *(Revised 20 September 2026.)* An invented everyday example a reader can picture is fully legitimate and often teaches better than a named historical one: *"imagine you can only signal a friend across the street with a torch: on, or off"* is a good example. So are real named tools, companies, incidents and error messages.

What is still banned is the **placeholder**: `foo`, `bar`, `Acme Corp`, the generic to-do app — examples with no content, which teach nothing because there is nothing in them to picture. The failure was never invention; it was emptiness. The old wording, "real examples or none", was read as "attach a real name, a place and a year to everything", which is where much of Stage 0's density came from.

**Analogies and short stories are encouraged, and a chapter may use several.** `example-ledger.yaml` records every example used; before choosing one, check whether returning to an example the reader already knows would teach better than a new one.

## Look it up rather than guess — at any step

This applies to every step below, not to one of them. **The moment you are unsure
of a fact, a name, a number, a version, a date, or how a tool actually behaves,
stop and check it.** Nothing is written from memory: the rule's home is
`curriculum-state/canon/thesis.md`, "Source discipline"; statistics are recorded in
`evidence-ledger.yaml` with year and source ("Statistics and their sources" in the
same file), and the stage table is re-derived from the official doc's stage
sections ("The stages").

- **Web search** for anything current, contested, dated, or specific — a statistic,
  an incident, a release date, who built something and when, whether a claim still
  holds.
- **Context7** for library, framework, SDK or CLI documentation. Resolve the
  library, then query it. Its docs are fetched live, and your memory of an API is a
  guess about a version that may already be gone.

Neither is a last resort or a sign the chapter is in trouble. Station 0's etymology,
Station 7's magnitudes and Station 9's lineage are the three places a confident
wrong answer is most likely and most damaging, but the rule holds everywhere.

**Where a fact cannot be verified, say so in the chapter or drop it.** An honest gap
costs a reader nothing. A fabricated specific costs them the trust that makes every
other sentence worth reading — and it is exactly what a careful reader checks first;
the rule that uncertainty is disclosed, never smoothed, is
`curriculum-state/canon/integrity-floor.md`, "Second-order rules". Where a source is
unavailable, stale, disputed or retracted, stop, tell the owner and fall back to the
official docs (`thesis.md`, "Source discipline").

## Workflow

**0. Decide what kind of object you are writing, before anything else.** A teaching chapter, a stage front door, a welcome page, a reference page, and a standalone explainer are different objects with different rules. **Run the stations only after this is settled**, and run them the way that object needs — a front door does not get the station set a chapter gets, and forcing it to produced a page that opened on a moth and a 1947 logbook. If none of the shapes below fits, **stop and ask**; the rule that a chapter is never rounded to the nearest shape, and that an unclear shape is a conversation with the owner, is `curriculum-state/canon/corrections.md`, "23. The twelve stations and the five lesson shapes are not settled".

> **PROVISIONAL, 20 September 2026.** The owner is not satisfied with these five shapes and is redesigning them with the assistant. Until that happens: do not treat this table as canon, do not round a chapter to the nearest shape, and **do not build new rules on top of these five**. The full rule is `curriculum-state/canon/corrections.md`, "23. The twelve stations and the five lesson shapes are not settled".

**1. Classify the chapter shape.** Four shapes, each with a different center of gravity. `reference/stations.md` §3 has the full weighting table.

| Shape | Example | Weight falls on | Runs thin |
|---|---|---|---|
| **Concept** | "What is context engineering" | Why, What, When | Cost, Source |
| **Tool** | "Claude Code's permission model" | How, Cost, When | Lineage |
| **Practice** | "Reviewing agent-written diffs" | How, When | What, Where |
| **Procedure** | "Getting a GitHub account and your first repo" | How, and the failure branch | Why, Lineage |

Getting this wrong is the most expensive error available, because every later decision inherits it. A Concept chapter written with a Tool's center of gravity becomes a manual; a Tool chapter written with a Concept's becomes an essay nobody can act on.

**If nothing in the table fits, stop and ask — never round to the nearest.** A stage's opening page is the case that forced this rule. It is not a chapter at all, and rounding it to Concept produced a draft that opened on a dated artifact, was rejected on sight, and had passed every mechanical check in this file on the way there. A shape that does not exist yet is a conversation, not a guess.

**A fifth shape: FrontDoor.** Added 17 September 2026. A stage's opening page, a welcome page, any page a reader meets before they have agreed to read anything: what it must do — teach none of its stage's material, carry the stage's shape and its promise, stay short, never open on or hang from a dated artifact, and say directly what it is and what it does for the reader — is `curriculum-state/canon/corrections.md`, "1. A front door is not a chapter". Its station weighting is its own table in `reference/stations.md` §3; it drops S0, S5, S9 and S10 on purpose.

*(Warmth used to be described here as a FrontDoor permission. It is not: warmth is the house register everywhere, including the middle of a teaching chapter, and it is not positional — that rule is `curriculum-state/canon/corrections.md`, "13. Warmth, enthusiasm and emphasis belong everywhere", and `curriculum-state/canon/voice.md`, "Register — it varies, and that is the point".)*

**2. Run Station 0 on the topic's name before you research anything else.** Decompose it, classify it into one of the four registers in `reference/name-registers.md`, and write down the prediction a reader would form from the name alone. Then check that prediction against what the thing actually is. **The size of that gap determines the chapter's spine.** A large gap (Register 4) means the chapter is fundamentally a correction and should be built as one. A small gap (Register 1) means the name can carry real explanatory load and Station 4 gets shorter.

**3. Verify the etymology before you commit to it.** Folk etymologies are endemic in software and shipping one to thousands of learners is a real failure, not a rounding error. `reference/name-registers.md` has the verification protocol and a bank of pre-verified terms. When a claim can't be verified, teach the decomposition ("*idem* + *potent* — same power") without the historical claim, or drop the station.

**4. Fill the station sheet before drafting prose.** One line per station: what it delivers. This is the cheapest point to notice that four stations all deliver the same kind of thing, or that Station 7 is empty because you don't actually know the numbers yet. Fixing that here costs a line; fixing it after full prose costs a rewrite.

**5. Find what will make this land for a beginner.** Before drafting, list the things that will carry this subject for someone meeting it for the first time: the problem it solves and why anyone cared, an everyday analogy or a short scene, a worked example that runs through the chapter, the mistake most people make, where the analogy breaks, and the magnitude that makes the scale real. **That list is your spine.**

*This replaces "find the both-audience content" — the recipe of name origins, real magnitudes and named failures that existed to reward a senior reader, and that is the direct source of Stage 0's texture. `reference/mixed-audience.md` §2 has the revised taxonomy.*

**6. Sort every term the chapter will use, before drafting a sentence.** List them, ask first whether the chapter needs each one at all, then run the survivors through the one-minute test and mark each light or heavy. **This has to happen here, not mid-draft**, because a heavy term is a structural fact: it needs its own passage before first use, and discovering that halfway through a paragraph means rewriting the section around it. Note which light terms the glossary already carries, and their slugs. A term that turns out to be heavy and has no room to be taught is the signal to restructure the chapter or drop the term — at this point that costs a line.

**7. Draft the spine straight through, with nothing skipped — at the reader's pace, not at full pace.** Explaining something a second way at the hardest point is good teaching, not repetition, and the register may get gentler exactly where the material gets harder. Gloss every light term inline in twelve words or fewer, mark it if the glossary carries it, and keep moving. Do not stop to teach a prerequisite — a heavy term was already given its own passage at step 6, and anything else that wants teaching mid-spine is a term you sorted wrong. Write to `reference/language-register.md` from the first sentence — retrofitting plain English onto finished prose produces a flattened draft, because the idioms usually sit in the load-bearing sentences.

**8. Add footholds and depth blocks last, and apply the delete test to each.** Remove every foothold and every depth block. If the chapter no longer stands as a complete, coherent piece, the material was load-bearing and belongs in the spine. If it still stands, the layering is correct.

**9. Write Station 10 as a retrieval prompt, never as a recap.** A summary does the reconstruction for the reader and destroys the effect the station exists to create. Ask the reader to produce something from memory. See `reference/stations.md` §S10 for the shapes that work.

**10. Run both audits — ten angles each, one at a time, each swept end to end over the whole draft.**

- `reference/comprehension-audit.md` — will the reader *understand* it?
- `reference/beginner-experience-audit.md` — will a beginner *stay*? Required on all Stage 0–1 material — `curriculum-state/canon/audience.md`, "The reader". The comprehension audit checks none of this, which is why both the rejected Stage 0 intro and the cold `ch01` passed it clean.

Then run the mindmap test: close the draft and redraw the chapter's shape from memory. Neither audit is optional and neither is a formality; a sweep that returns nothing on a first draft was performed rather than run.

**11. Run the self-check below, then present the draft with your findings log, logged omissions, and deviations listed at the end.** The rule is `curriculum-state/canon/research-and-comparison.md`, "Self-check".

## Anti-patterns

Each of these survives a shallow read of the framework while failing the reader.

**The recap ending.** "In this chapter, we learned that…" This is the most common way a good chapter is destroyed in its final paragraph. It performs the retrieval on the reader's behalf, which is precisely the work that produces retention. Every recap ending is a Station 10 that has been deleted and replaced with its own opposite.

**The definition-first opening.** Opening with "X is a…" spends the one moment where the reader would have made a prediction. Once they've read the definition there is nothing left to be wrong about, and the whole Station 0 → Station 4 loop collapses.

**Station names as headings.** The framework is an authoring tool; a reader who can see the scaffolding is reading the scaffolding. No internal label — *station*, *spine*, *register*, *shape*, *front door*, *invariant* — ever reaches a reader, and a name says what the thing is about, not how the project thinks internally: `curriculum-state/canon/naming.md`, "Rule 1 — The name explains itself" and "Supporting conventions".

**Etymology invented to fill Station 0.** Decomposing an eponym or an accident (Register 3) produces confident nonsense — *git*, *spam*, *cookie*, *Bayesian* have no definitional content in their names. Route those to Station 3 and Station 9, where the person and the accident genuinely explain something, and skip the decomposition.

**Telling a reader to skip.** "If you're new to this, skip ahead." "Experienced readers will already know…" These tell a reader that part of the book isn't theirs. *Speaking to the beginner warmly is different and is encouraged* — "if you have never programmed, nothing here assumes you have" welcomes them rather than sorting them. Depth blocks are labeled by what's *in* them, never by who they're *for*.

**Explaining the book's own rules to the reader.** "Every technical word is defined where you first meet it, in every chapter…" — an actual sentence from a rejected draft. The reader never learns how the book is built, what a *stage* is internally, or why a page is structured the way it is, and never meets an internal label (*station*, *spine*, *register*, *shape*, *front door*, *invariant*). The rulebook copy is `curriculum-state/canon/corrections.md`, "9. Never explain the book's internal rules or internal names"; where an internal idea genuinely has to reach the reader, work out what to call it for them and ask the owner first (`curriculum-state/canon/thesis.md`, "Reading and understanding literacy"), and no internal label enters a name (`curriculum-state/canon/naming.md`, "Supporting conventions").

**A sentence that needs a second read.** However elegant, specific or concise: this test outranks all three. The rule is `curriculum-state/canon/corrections.md`, "16. Every sentence must make plain sense on the first read"; `curriculum-state/canon/voice.md`, "Six commitments" says the same for this book's actual reader.

**Depth blocks that are load-bearing.** A depth block the spine depends on is not a depth block, it's a paragraph you hid. Failing the delete test means a beginner who skips it now has a hole they can't see.

**Empty examples.** `foo`, `bar`, `Acme Corp`, the generic to-do app — examples with nothing in them to picture. An *invented* example full of concrete detail is not this and is encouraged (Principle 7).

**The empty comparison.** "It can be slow." Slow compared to what, by how much, at what cost. Find the real magnitude in research — then give the reader the version they can feel, not the citation: the rule is `curriculum-state/canon/thesis.md`, "Statistics and their sources".

**Guessing where checking was available.** A version, a flag, a date, an API shape, who built something — written from memory because looking it up would have interrupted the draft. The interruption costs a minute; a confident wrong specific costs the reader's trust in every other sentence, and it is the first thing a careful reader tests. The rule is `curriculum-state/canon/thesis.md`, "Source discipline".

**Difficulty imported through the sentence, not the idea.** An idiom, a thirty-word sentence, or a Latinate word where a plain one exists. This is difficulty the reader has to fight that teaches them nothing, and it is the fastest way to lose a reader who is reading in a second language and is entirely capable of the engineering. The rule is `curriculum-state/canon/corrections.md`, "16. Every sentence must make plain sense on the first read".

**The heavy term squeezed into a gloss.** A term that genuinely needs a passage, compressed into twelve words because the rule said twelve words. The gloss is technically present, the box is ticked, and the reader has nothing — they now hold a phrase they cannot use and do not know they cannot use it. Sorting terms at step 6 exists to catch this before the sentence gets written.

**The term marked but not glossed.** A word turned into a glossary link and left otherwise unexplained, on the theory that the link covers it. It does not. A reader on a phone, mid-sentence, on paid data, does not leave the page — and the one who does has lost the thread they were following. This is the footnote failure with better styling.

**The term that drifts.** *Coding agent* becomes *AI agent* becomes *the agent* across three paragraphs, each form assumed to carry the first one's definition. The term was glossed once, correctly, and is still illegible by the fourth mention. Glossed at first use means glossed **and kept alive**.

**Academic furniture in reader-facing prose.** Dates, full names, institutions and citations stacked into teaching prose because the research turned them up. The research stays rigorous; the chapter does not display it. All the rules that used to pull the other way were fixed at source on 20 September 2026 — Principle 7, S2, S7, S9, `voice.md`'s commitment 6 and `thesis.md`'s year-inline rule. Satisfy the station with the fact, not with the citation apparatus. The rulebook copies are `curriculum-state/canon/corrections.md`, "4. Historical material stays light in reader-facing prose" and "11. Research makes the writer correct. It is not the reader's diet"; "1. A front door is not a chapter" in the same file governs what a page may lead with, and the Stage 0 title-date exception is `curriculum-state/canon/naming.md`, "Supporting conventions".

**Bold assigned by position.** Paragraph after paragraph opening on a bolded sentence, until bold marks nothing at all. Bold heavily — but on what matters, wherever in the paragraph it sits. The rule is `curriculum-state/canon/corrections.md`, "14. Bold marks what matters, never the first sentence by rule".

**A flat-looking page.** A wall of prose with no bullets, no table, no callout and no visual landmark. Formatting is part of the teaching, and the standard is beautiful, not adequate. A page that looks heavy reads as heavy, whatever the sentences say — formatting is how a beginner finds their footing on a screen. Bullets, tables, short sections and callouts are first-class — reach for them before a long paragraph, not after one has failed. The rulebook copies are `curriculum-state/canon/corrections.md`, "14. Bold marks what matters, never the first sentence by rule" (visual flatness is fixed with structure, not bold), "7. Every chapter opens by welcoming the reader and showing the shape" (the opening must be beautiful) and "1. A front door is not a chapter" (bullets and tables carry the density); `curriculum-state/canon/audience.md`, "Formatting is part of the teaching" is the reading-conditions statement.

**Machine cadence.** Flat rhythm, dramatic two-word fragments, "it's not X — it's Y", a rhetorical question answered in the next clause — a real question the chapter then answers is fine — triads everywhere, a weighty one-liner at the end of every section. Each one survives every other check in this file. Together they tell a reader the page was generated, and that verdict is close to irreversible. `language-register.md` §6.

**The performed audit.** Ten angles swept in one pass while scrolling, returning "looks good." The angles blur, attention flattens after the third, and what comes out is a single vague impression wearing ten labels. Ten clean sweeps on a first draft has never once been true.

**The complete-but-unreasoned chapter.** Twelve stations each technically present, none of them chosen for a reason. A chapter can pass every mechanical check here and still teach nothing if the author was filling boxes rather than thinking about a reader.

## Self-check — run before presenting any draft

- [ ] Both research passes ran before drafting — standards research, and the owner's comparative study supplied rather than substituted for
- [ ] What every studied source missed is named, and this chapter does something about it
- [ ] Transformed toward reading and judgment, not toward writing the core logic
- [ ] Everything learnable learned from every source studied — structure and tone included — then taken further
- [ ] No source's expression reproduced — no verbatim or lightly-reworded text, no copied exercises
- [ ] Chapter shape classified, and the center of gravity visibly matches it
- [ ] Station 0 ran before research; the register is recorded; the etymology is verified or the historical claim was dropped
- [ ] The reader forms a prediction before any definition appears
- [ ] Station 4 visibly scores that prediction — the loop the name opened is closed
- [ ] Station 7 contains at least one real magnitude, not a qualitative adjective
- [ ] Every paragraph in the spine moves an absolute beginner forward
- [ ] Every term was first tested for whether the chapter needs it at all, then run through the one-minute test at step 6 — none reached the draft unsorted
- [ ] Every light term explained inline at first use in twelve words or fewer and marked as `[*term*](/glossary#slug)`; the inline explanation stops after its first two or three appearances in the book
- [ ] Every heavy term taught in the spine before its first use — never compressed into a gloss, never parked in a foothold
- [ ] No term drifts form after it is glossed; one word for one thing throughout
- [ ] Stages 0–1 material assumes no programming background whatsoever
- [ ] Delete test passed: remove all footholds and depth blocks, the chapter still stands
- [ ] No reader is told to skip anything, and no internal rule or internal label appears in reader-facing prose
- [ ] Zero station names used as headings
- [ ] Title and every heading carry the **owner-supplied curriculum why**, not the subject's own significance (`canon/naming.md` Rule 3, `corrections.md` §18)
- [ ] Every example is concrete enough to picture — real or invented, never an empty placeholder
- [ ] Anything uncertain was looked up — web search for facts, dates and figures, Context7 for library and CLI behaviour — never written from memory
- [ ] `reference/language-register.md` self-check passed — sentence length, idioms, phrasal verbs, cultural references
- [ ] Checked for every named cadence tic in `language-register.md` §6, and read aloud end to end
- [ ] Technical accuracy untouched; technical vocabulary simplified wherever a plain word is equally true (Stages 0–1)
- [ ] Every sentence makes sense on the first read — read aloud, nothing needing a second pass
- [ ] Bold used heavily and by meaning, never by paragraph position; the page has bullets, tables or callouts and does not read flat
- [ ] The chapter ends on a retrieval prompt, not a summary
- [ ] The chapter opens by welcoming the reader, connecting backwards with a link, listing what it covers **and why**, in a welcome style not used in the last four chapters
- [ ] The move from the opening into the first teaching section is gradual, and no later section starts cold either
- [ ] The teaching opens problem-first or story-first, never on a date or a proper noun
- [ ] The closing names what the chapter left unresolved and walks the reader to the next one, after the retrieval prompt
- [ ] A stage's first position is classified `FrontDoor`, never rounded to Concept, and teaches none of the stage's material
- [ ] Comprehension audit run — ten separate sweeps, findings log completed, every accepted finding reasoned
- [ ] Beginner-experience audit run — all ten angles, required on Stages 0–1 material
- [ ] Mindmap test passed, or the failure named and fixed at its real level
- [ ] Every dropped station is logged with a one-clause reason

---

*The name opens a question. The stations answer it in the order a mind can accept. The reader closes it themselves, from memory, or the chapter did not happen.*
