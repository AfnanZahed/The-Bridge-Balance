---
name: lesson-spine-authoring
description: Author any lesson, chapter, tutorial, explainer or teaching section using the Prime-Build-Close spine — a name-first sequence of twelve stations (Name, Anchor, Source, Why, What, How, Where, Cost, When, Lineage, Retrieve, Spiral) built on 5W2H plus etymological decomposition. Use whenever writing or revising instructional content on a technical topic — software engineering, AI, tooling, agents, developer workflow — for a deliberately mixed audience of senior engineers and absolute beginners in one document. Trigger on any request to write, draft, outline, expand, rewrite, or audit a lesson, chapter, module, or teach-X section, even when the framework is not named. Also trigger on mentions of the spine, the stations, Prime/Build/Close, name register, the four registers, depth block, foothold, or any station by name. Also governs language register — plain English for a mainly Pakistani readership, technical depth untouched.
---

# Lesson spine authoring

**The framework this skill runs is called Name-First.** Refer to it by that name in working notes and in any reader-facing text that teaches the method. Its full form is *the Name-First Spine*: twelve stations in three phases — Prime, Build, Close.

Learners do not absorb ideas in the order a topic is organized. They absorb them in the order a mind can accept them: a name, a hook to hang it on, a problem worth solving, then the answer. This skill imposes that order on every lesson, so that the sequence stops being an accident of whatever the author happened to know first.

**Before drafting anything, read `reference/stations.md` in full.** It holds all twelve stations, what each must contain, the failure mode each one prevents, and how much weight each carries under each lesson shape. This file is the workflow that runs on top of that document; it deliberately does not re-derive the station definitions.

Read `reference/name-registers.md` before Station 0 on any lesson whose topic has a name worth decomposing (most of them). Read `reference/mixed-audience.md` and `reference/language-register.md` before drafting prose for the first time in a session — the second one governs every sentence in the book and cannot be inferred from the rest of this file.

## Before you start: is this for a project with its own rules?

This skill is general teaching craft and triggers on its own, which means it can
be reached without whatever standing rules the surrounding project has.

**If the lesson is for The Bridge Balance — the Book repo — stop and load
`bridge-balance-project-guide` first, then come back here.** Signals: a chapter or
a stage, `edu-site/docs/`, `curriculum-state/`, an MDX file, CS50, or the project
named directly. A request phrased as "teach me X" can be that work without saying
so, so check the surroundings rather than the wording.

That guide carries rules this skill cannot know and must not override: an
academic-integrity floor on CS50 coursework, a hard prohibition on generating any
image or diagram, no fixed chapter count, and one continuous read per
chapter. They bind the lesson regardless of how good the teaching is, and a lesson
drafted without them can be complete, well-structured, and still unusable.

For any other project, or for standalone teaching material, carry on — nothing
below depends on that guide.

## The one hard constraint: one document, two readers

Every lesson is read by a senior engineer and by someone who last week struggled to finish a signup form. There is no separate edition. Both readers get the same document, and the design has to be good enough that neither is insulted.

The naive solutions both fail. Writing for the middle bores one and loses the other. Splitting into "basics" and "advanced" sections tells each reader which half of the book is not for them, which is the fastest way to make a senior skim and a beginner quit.

The working solution rests on a specific observation about how each reader actually disengages:

- **A senior does not disengage because basics are present. They disengage from unrewarded sentences** — paragraphs that deliver nothing they didn't have. Pace is the variable, not level.
- **A beginner does not disengage because hard material is present. They disengage at the first unglossed assumption** — a term, a symbol, or a leap that silently assumed something they lack.

Both conditions can be satisfied at once, because they constrain different things. Build the lesson so every paragraph carries something new (senior condition) while nothing is ever assumed silently (beginner condition). `reference/mixed-audience.md` gives the three-layer architecture — spine, footholds, depth blocks — and the categories of content that reward both readers simultaneously. Use it; do not improvise a substitute.

## The second hard constraint: plain English, full engineering

Most readers are in Pakistan. They read technical English every day and think in Urdu, Punjabi, Pashto, Sindhi, Saraiki, or Balochi. A few read the book from elsewhere.

**Simplify the sentences. Never simplify the engineering.** These are different problems and confusing them insults a reader who can already read a stack trace faster than most people read a menu. Keep the technical vocabulary, the real numbers, the honest uncertainty, and the depth exactly as they are. Make plain the sentence structure, the idioms, and the ornamental word choice.

The working targets: sentences averaging 15 to 18 words, one idea each, active voice, no idiom a reader has to have memorised, no long word where a short one works. Nothing about the language level is ever mentioned to the reader — that is an audience label, and audience labels are banned.

`reference/language-register.md` has the full rules, the substitution tables, the anchor tiers, and the conventions for spelling, dates, numbers, and currency. Read it before drafting.

## Operative principles

These are how to think while running the workflow, not a preamble to skip.

**1. The name comes before the explanation.** Every technical term is a compressed argument about what the thing is, and most readers — expert and novice alike — have never unpacked it. Decomposing it first costs ten seconds, produces a free prediction the reader can be right or wrong about, and converts an arbitrary token into a structure. Never open a lesson with a definition; open with the name.

**2. A prediction that is never scored is worse than no prediction.** Station 0 asks the reader to guess. If the lesson never returns to mark that guess, you have manufactured fluency, which feels exactly like understanding and is not. Station 4 must visibly close the loop the name opened. A wrong prediction is a better outcome than no prediction, but only if the reader sees that it was wrong.

**3. The problem precedes the solution.** A tool encountered before its problem is memorized; a tool encountered after its problem is understood. Where a lesson can make the reader feel the pain in two sentences before naming the cure, it should.

**4. Numbers are not optional.** Station 7 is the most-skipped station and the one that most separates a lesson that produces judgment from one that produces vocabulary. Experts store magnitudes attached to concepts; novices store only shapes. Give both readers the number.

**5. The stations are scaffolding, not an outline.** They govern the order ideas arrive in. They must never appear as headings in reader-facing text. A book where every chapter has a "Why" heading followed by a "What" heading is a book a senior will diagnose in thirty seconds.

**6. Break a station when the lesson doesn't need it.** Some topics have no interesting name, no meaningful cost, no lineage worth tracing. Skip it, write a one-clause note in your working notes saying which station you dropped and why, and move on. A logged omission is this principle working. A silent one is an error.

**7. Real examples or none.** Named tools, named companies, named incidents, real numbers, real dates, real error messages. No `foo`, no `bar`, no to-do app, no "imagine a company called Acme." A fabricated example teaches a fabricated skill, and it is the single fastest way to lose a senior reader's trust.

## Look it up rather than guess — at any step

This applies to every step below, not to one of them. **The moment you are unsure
of a fact, a name, a number, a version, a date, or how a tool actually behaves,
stop and check it.**

- **Web search** for anything current, contested, dated, or specific — a statistic,
  an incident, a release date, who built something and when, whether a claim still
  holds.
- **Context7** for library, framework, SDK or CLI documentation. Resolve the
  library, then query it. Its docs are fetched live, and your memory of an API is a
  guess about a version that may already be gone.

Neither is a last resort or a sign the lesson is in trouble. Station 0's etymology,
Station 7's magnitudes and Station 9's lineage are the three places a confident
wrong answer is most likely and most damaging, but the rule holds everywhere.

**Where a fact cannot be verified, say so in the lesson or drop it.** An honest gap
costs a reader nothing. A fabricated specific costs them the trust that makes every
other sentence worth reading — and it is exactly what a senior reader checks first.

## Workflow

**1. Classify the lesson shape before anything else.** Four shapes, each with a different center of gravity. `reference/stations.md` §3 has the full weighting table.

| Shape | Example | Weight falls on | Runs thin |
|---|---|---|---|
| **Concept** | "What is context engineering" | Why, What, When | Cost, Source |
| **Tool** | "Claude Code's permission model" | How, Cost, When | Lineage |
| **Practice** | "Reviewing agent-written diffs" | How, When | What, Where |
| **Procedure** | "Getting a GitHub account and your first repo" | How, and the failure branch | Why, Lineage |

Getting this wrong is the most expensive error available, because every later decision inherits it. A Concept lesson written with a Tool's center of gravity becomes a manual; a Tool lesson written with a Concept's becomes an essay nobody can act on.

**2. Run Station 0 on the topic's name before you research anything else.** Decompose it, classify it into one of the four registers in `reference/name-registers.md`, and write down the prediction a reader would form from the name alone. Then check that prediction against what the thing actually is. **The size of that gap determines the lesson's spine.** A large gap (Register 4) means the lesson is fundamentally a correction and should be built as one. A small gap (Register 1) means the name can carry real explanatory load and Station 4 gets shorter.

**3. Verify the etymology before you commit to it.** Folk etymologies are endemic in software and shipping one to thousands of learners is a real failure, not a rounding error. `reference/name-registers.md` has the verification protocol and a bank of pre-verified terms. When a claim can't be verified, teach the decomposition ("*idem* + *potent* — same power") without the historical claim, or drop the station.

**4. Fill the station sheet before drafting prose.** One line per station: what it delivers, and which reader it primarily serves. This is the cheapest point to notice that four stations are all serving the same reader, or that Station 7 is empty because you don't actually know the numbers yet. Fixing that here costs a line; fixing it after full prose costs a rewrite.

**5. Find the both-audience content.** Before drafting, list what this lesson contains that is simultaneously new to a senior and accessible to a beginner — name origins, real magnitudes, the original problem, named failures, where the metaphor breaks. That list is your spine. Material that serves only one reader goes into a foothold or a depth block, never into the spine. `reference/mixed-audience.md` §2 has the full taxonomy.

**6. Draft the spine straight through, at full pace, with nothing skipped and nothing explained twice.** Gloss every new term inline in twelve words or fewer and keep moving. Do not stop to teach a prerequisite. Write to `reference/language-register.md` from the first sentence — retrofitting plain English onto finished prose produces a flattened draft, because the idioms usually sit in the load-bearing sentences.

**7. Add footholds and depth blocks last, and apply the delete test to each.** Remove every foothold and every depth block. If the lesson no longer stands as a complete, coherent piece, the material was load-bearing and belongs in the spine. If it still stands, the layering is correct.

**8. Write Station 10 as a retrieval prompt, never as a recap.** A summary does the reconstruction for the reader and destroys the effect the station exists to create. Ask the reader to produce something from memory. See `reference/stations.md` §S10 for the shapes that work.

**9. Run the self-check below, then present the draft with your logged omissions and deviations listed at the end** so an editor sees them without hunting.

## Anti-patterns

Each of these survives a shallow read of the framework while failing the reader.

**The recap ending.** "In this lesson, we learned that…" This is the most common way a good lesson is destroyed in its final paragraph. It performs the retrieval on the reader's behalf, which is precisely the work that produces retention. Every recap ending is a Station 10 that has been deleted and replaced with its own opposite.

**The definition-first opening.** Opening with "X is a…" spends the one moment where the reader would have made a prediction. Once they've read the definition there is nothing left to be wrong about, and the whole Station 0 → Station 4 loop collapses.

**Station names as headings.** The framework is an authoring tool. A reader who can see the scaffolding is reading the scaffolding.

**Etymology invented to fill Station 0.** Decomposing an eponym or an accident (Register 3) produces confident nonsense — *git*, *spam*, *cookie*, *Bayesian* have no definitional content in their names. Route those to Station 3 and Station 9, where the person and the accident genuinely explain something, and skip the decomposition.

**Audience labels in the prose.** "If you're new to this, skip ahead." "Experienced readers will already know…" Both are insults, in opposite directions, and both tell a reader that part of the book isn't theirs. Depth blocks are labeled by what's *in* them, never by who they're *for*.

**Depth blocks that are load-bearing.** A depth block the spine depends on is not a depth block, it's a paragraph you hid. Failing the delete test means a beginner who skips it now has a hole they can't see.

**Toy examples.** `foo`, `bar`, `Acme Corp`, the to-do app. Real-world examples were a founding requirement of this project and they are also the mechanism by which a senior decides whether to keep reading.

**The missing number.** Station 7 skipped, or filled with "it can be slow." Slow compared to what, by how much, at what cost. If you don't know the number, find it or say plainly that you don't.

**Guessing where checking was available.** A version, a flag, a date, an API shape, who built something — written from memory because looking it up would have interrupted the draft. The interruption costs a minute; a confident wrong specific costs the reader's trust in every other sentence, and it is the first thing a senior reader tests.

**Difficulty imported through the sentence, not the idea.** An idiom, a thirty-word sentence, or a Latinate word where a plain one exists. This is difficulty the reader has to fight that teaches them nothing, and it is the fastest way to lose a reader who is reading in a second language and is entirely capable of the engineering.

**The complete-but-unreasoned lesson.** Twelve stations each technically present, none of them chosen for a reason. A lesson can pass every mechanical check here and still teach nothing if the author was filling boxes rather than thinking about a reader.

## Self-check — run before presenting any draft

- [ ] Lesson shape classified, and the center of gravity visibly matches it
- [ ] Station 0 ran before research; the register is recorded; the etymology is verified or the historical claim was dropped
- [ ] The reader forms a prediction before any definition appears
- [ ] Station 4 visibly scores that prediction — the loop the name opened is closed
- [ ] Station 7 contains at least one real magnitude, not a qualitative adjective
- [ ] Every paragraph in the spine carries something a senior did not already have
- [ ] Every term is glossed at first use, inline, in twelve words or fewer
- [ ] Delete test passed: remove all footholds and depth blocks, the lesson still stands
- [ ] Zero audience labels anywhere in reader-facing prose
- [ ] Zero station names used as headings
- [ ] Every example is real and named — no toy scenarios
- [ ] Anything uncertain was looked up — web search for facts, dates and figures, Context7 for library and CLI behaviour — never written from memory
- [ ] `reference/language-register.md` self-check passed — sentence length, idioms, phrasal verbs, cultural references
- [ ] Technical depth and technical vocabulary untouched by the language rules
- [ ] The lesson ends on a retrieval prompt, not a summary
- [ ] Every dropped station is logged with a one-clause reason

---

*The name opens a question. The stations answer it in the order a mind can accept. The reader closes it themselves, from memory, or the lesson did not happen.*
