---
id: 0080
title: Research and comparison core policy
stage: general
date: 2026-09-15
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["canon", "core-policy", "research", "command-code-delegation", "copyright", "reading-literacy", "lesson-spine-authoring"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/canon/research-and-comparison.md (NEW — the authoritative statement: two passes, the transformation rule, the legal boundary, platform scope, the Stage 1 Python worked example, self-check)
 - CLAUDE.md (edited — new first standing rule binding both tracks; new platform-track bullet; the two-readers bullet's "four consequences" updated to five and its glossing clause replaced with the two-minute test)
 - .claude/skills/bridge-balance-project-guide/SKILL.md (edited — Step 0 standing rule 10 added; standing rule 7's glossing clause corrected to the two-minute test)
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md (edited — a fifth stop added at Step 1, blocking step 3 rather than step 2)
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/research.md (edited — new "two passes this research sits inside" section, protocol step 1 extended with Pass 1's own question, self-check extended by five lines)
 - .claude/skills/lesson-spine-authoring/SKILL.md (edited — fifth hard constraint added; the project-guide rules list extended; four self-check lines added)
 - history/prompts/general/0080-research-and-comparison-core-policy.general.prompt.md (this file)
tests:
 - No gate applies — canon, skill and instruction files only; no chapter changed, so `check-chapter.mjs` reads nothing that moved.
 - Verified before writing, not assumed: `canon/thesis.md` already defines "Reading and Understanding Literacy" (§ lines 52–60) as the book's resolution to the over-trust/over-caution fight. The owner's "adjust it to reading and understanding literacy, not writing the core logic" maps onto existing canon exactly, so the transformation rule was anchored to it rather than invented.
 - Verified: `chapter-production/SKILL.md` Step 1 already carries an "establish the inputs, and stop rather than invent" pattern with a fourth mechanical stop, so the owner's study was added as a fifth stop in the idiom already there.
 - Verified: `research.md` step 1 previously asked only what is *true* about a topic, never how the best sources *teach* it — the gap Pass 1 fills.
 - Verified: `canon/integrity-floor.md` exists and is referenced by both Step 0 of chapter-production and standing rule 2 of the project guide; the new policy defers to it explicitly rather than creating a second answer.
---

## Prompt

New ultra important rule, also add this, this is one of the Core policiies of our platform, and of the lesson spine skill. Which is that when ever we are going to write ANY thing, whether a lesson teaching, chapter writing, any heading, any new functionality in the website, any new option or any new button, these will be 1. researched thoroughly through international and philosophical standards using AI (you the claude or 95% of the times using command code's deepseek v4.1 flash) , and 2nd is even more important, I will my self compare our implementation with others and learn properly about that. specially this will be our routine in content writing. I will, from multiple platforms, first learn and give their teachings to you and then we will learn all the major and minor points from them and innovate and then after adjusting, we will implment. for example, in the stage 1, we will start the python programming, I will first search, explore and learn the x from the youtube titorials, hopetoskills/awfera by sir irfan malik's python programming course, CS50p, freecodecamp's python course etc and paste my own outof the box learnings and the things I want to integrate in our content, then we will extract and learn from their pasted content (legally) and then adjust it to make it for just reading and understanding literacy, not writing the core logic. and then we will write actually. write this policy everyehere inclusing the lesson spine skill too

## Response snapshot

Read the placement targets before writing anything into them — `canon/thesis.md`, `chapter-production/SKILL.md`'s workflow, `chapter-production/reference/research.md`, and the project guide's Step 0 — because "everywhere" needed to mean *everywhere it binds behaviour*, not everywhere it would fit.

**The interpretation call that shaped the work.** The policy is a **sequencing gate**, not a style preference: it changes *when* writing may begin, not only how. That made the owner's comparative study a **required input with a stop condition**, which is a structure `chapter-production` Step 1 already uses for three other inputs. Added it as a fifth stop with one deliberate refinement: it blocks **step 3 (drafting)**, not step 2 (research), because standards research can legitimately run before the owner's study arrives while drafting cannot.

**One authoritative statement, five bindings.** Wrote the full policy once as `curriculum-state/canon/research-and-comparison.md`, then had every other location state the obligation and point there. This follows the repo's own convention — `research.md` already says "Design is not in this file… this folder does not restate it" — and avoids six copies of a policy that would drift apart within a month. Flagged this choice rather than silently spraying the text.

**Pass 1 turned out to fill a real gap, not restate one.** `research.md` step 1 previously asked only what is *true* about a topic. It never asked **how the best sources in the world actually teach or build it, and why** — which is a different search, and the one the owner is naming. Wrote it in as a distinct question alongside the existing three, plus the `command-code-delegation` routing (≈95% DeepSeek v4.1 Flash, Claude judging, results read from the real trace and never the summary line).

**The transformation rule was anchored to existing canon, not invented.** `canon/thesis.md` already defines **Reading and Understanding Literacy** as this book's resolution to the over-trust/over-caution fight. The owner's "adjust it for reading and understanding literacy, not writing the core logic" is that exact concept applied as a production procedure, so the canon file cites it rather than coining a parallel idea. Gave it a four-row conversion table (source teaches you to produce syntax → we teach you to read it and say what it does; *write a function that…* → *read this function, predict what it returns, find where it breaks*), and made the second, less obvious point explicit: **that conversion is also what makes the derivation legitimate.** A chapter walking its source's path in its order toward its skill is a reproduction with new sentences; one rebuilt toward a different competence is a new work.

**Took the owner's "(legally)" seriously and wrote it as a hard boundary**, because the routine involves pasting material from a paid course, CS50P, freeCodeCamp and YouTube tutorials. Pasted material is **input to understanding, never a source to reproduce**: no verbatim passages, no lightly-reworded paragraphs, no lifted explanation sequences, no copied exercises or problem sets, no borrowed examples. Attribution is required where a specific framing is genuinely owed — and stated as *not* a substitute for transformation, since the two are commonly confused. Added that a paid course is studied and never redistributed, and that the owner's access is not the reader's. Made the Stage 2 integrity floor explicitly **override** this policy wherever CS50 is the source, so there is one answer rather than two competing ones.

**Kept the platform half, which is easy to lose.** The owner named headings, functionality, options and buttons — so the policy is bound in `CLAUDE.md`'s platform-track list too, with "international standard" read as established interface conventions, accessibility practice, and the named products solving the same problem well. Added the line that matters there: adopt the reasoning, not the pixels.

**Carried the owner's own worked example in** — the Stage 1 Python case, with its four named sources — because canon files in this repo are grounded in concrete instances and this one states the routine better than an abstraction would.

**Two consistency repairs made in passing, disclosed rather than smuggled.** Both `CLAUDE.md` and the project guide's Step 0 still said "every technical term is glossed inline at first use, every time" — which PHR 0079's two-minute test supersedes, since a heavy term now may *not* be glossed. Corrected both to the tier rule, and added the Stage 0–2 zero-knowledge floor while there. Left as-is they would have had three files stating a rule the fourth had already replaced.

## Outcome

- ✅ Impact: The policy is canon, and it binds at the five places work actually starts — the project entry point, both tracks' instruction file, the research protocol, the chapter workflow's stop conditions, and the authoring skill's constraints. The owner's comparative study is now a named blocking input rather than an informal habit.
- 🧪 Tests: See `tests:` above — every factual claim about existing canon and workflow structure was verified by reading the file before writing against it.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: `.specify/memory/constitution.md` carries seven ratified principles, and the owner called this "one of the Core policies of our platform" — an eighth principle is arguably warranted, but a constitution amendment is a ratification act and this repo's own discipline requires consent before creating that class of record. Left untouched and surfaced instead.
- 🧠 Reflection: The strongest part of the request was the part easiest to under-implement — "I will myself compare" is an input, and inputs that live only in a habit get skipped the first time someone is in a hurry. Encoding it as a stop condition at a named workflow step is what makes it real; writing it as a principle would have made it decorative. The second-strongest was "(legally)", which a less careful pass would have recorded as a one-line caveat rather than the six-clause boundary a routine built on pasted paid-course material actually needs.

## Evaluation notes (flywheel)

- Failure modes observed: none this turn. The live risk was treating "write this policy everywhere" as an instruction to paste identical text into six files — which satisfies the letter, guarantees drift, and is precisely what the repo's existing single-source convention was built to prevent.
- Graders run and results (PASS/FAIL): none applicable; no chapter or site file changed, so no gate reads these paths.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): run the policy once end to end on a real piece of work — the Stage 1 Python opening is the owner's own example — and see where the handoff format for pasted learnings needs a shape it does not yet have.
