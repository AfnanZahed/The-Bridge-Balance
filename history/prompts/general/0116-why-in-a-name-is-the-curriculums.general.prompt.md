---
id: 0116
title: The why in a name is the curriculum's, not the subject's
stage: general
date: 2026-09-20
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["naming", "canon", "corrections", "delegation", "stage-0", "beginner-first", "own-mistake-corrected"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/canon/naming.md
 - curriculum-state/canon/corrections.md
 - curriculum-state/canon/voice.md
 - curriculum-state/stage-0-drafting-plan.md
 - .claude/skills/lesson-spine-authoring/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/curriculum-architect/reference/brief-format.md
 - .claude/skills/bridge-balance-project-guide/reference/lesson-adversarial-review/SKILL.md
 - edu-site/scripts/check-chapter.mjs
 - CLAUDE.md
tests:
 - "node scripts/check-chapter.mjs - 9 chapters, 0 errors, 7 warnings"
 - "npm run build - all five gates green, site compiled"
---

## Prompt

> Firstly, I would say that you gave me 7 things that have to be answered, i only
> understod few of them i am going to answers, others that are left, you have to
> explain me what you actually meant by?
>
> 1. May DeepSeek draft reader-facing prose?: What you can meant by prose? if this
> a content writing, then I the AI MUST ask me everytime which one from both
> (Claude and deepseek) will plan, write and do this part exactly, becuase the
> topics that we are going to cover in the future very too much, so I will deicide
> the cost VS quality on each of the content writing.
> 2. what you meant by this?
> 3. I am going to finish these old intros, because we have new voice and writing
> rules but also a new plan and strucutre for writing the stage 0 completely, but
> as of now, keep these ones as a backup topic ideas to make sure we nothing
> misses out in our new stage 0 which was taught in these old ones
> 4. what you meant by this?
> 5. meaning?
> 6. meaining?
> 7. Ok.
>
> about the 2nd WHY part, when i said the WHY must also be covered, it means that
> step must be connected to our destination and main purpose of learning and why we
> covered that specific thing in that book, not the WHY of such specific invention
> in isolation, but WHY reader is going to read it in an SDE curriculum, and that
> WHY are going to be changed 100% on every topic, so, claude or deepseek, when
> they will be writing and deciding the name, heading, title of any content, part,
> lesson, stage, or chapter or even any subheading, ofcourse the curriculum
> desginer is ME (afnan zahed) and I will tell them in my own natural language that
> WHY I put this content and then the name will be engineered propelry with the
> WHAT and WHY. that is the meaning of 'WHY', not the WHY of the invention or tool
> itself.

## Response snapshot

**The owner corrected Rule 3 the same day it was written, and the correction is
substantial.** The version shipped hours earlier (PHR 0115) defined a name's why
as "something the reader gets" and produced subject-level whys: *"The Switch That
Made Computers Small Enough to Own"*. That is a fact about the transistor. It is
not a reason this reader is reading about it.

The owner's why is the **curriculum's** why: what this step gives a reader on the
way to specifying, bounding, verifying and owning AI-built work. It changes
completely for every topic, and - decisively - **it is an input, not an output**.
The curriculum designer is the owner; they state the why in their own natural
language, and the writer engineers a name from WHAT plus that WHY. Where it has
not been supplied, the writer **stops and asks**. A name built on a guessed why
fails in the worst available way: it reads perfectly and points at the wrong
destination.

Rewritten across eight files: `naming.md` Rule 3 (new sections "The why is the
curriculum's, never the subject's" and "The why is an input"; the four-move table
re-grounded on `thesis.md`'s four verbs; three rows of the comparison table left
**deliberately unresolved** because they cannot be finished without the owner);
`corrections.md` §18; `voice.md`; `stage-0-drafting-plan.md`; the spine skill's
heading rule and self-check; `brief-format.md`, which gains a new required
**WHY IT IS IN THE CURRICULUM** slot marked owner-supplied with a STOP AND ASK;
`lesson-adversarial-review`, whose three-second test now separates *no why* from
*the wrong why* - the latter being the failure that reads well; and the gate's
`heading-no-why` message plus a comment stating plainly that no regex can catch
the wrong-why case.

**The five renames proposed in PHR 0115 were withdrawn**, all of them, and
`naming.md`'s pending table now carries a "Blocked, not pending" note saying why.

**Two further owner decisions ratified.**

- **§19 - the owner picks the model for every piece of content, every time.**
  `command-code-delegation`'s ~95%-to-DeepSeek default explicitly does not apply
  to reader-facing prose. Added to `CLAUDE.md`'s standing rules, and the
  `feedback-claude-plans-deepseek-executes` memory marked superseded for content
  work.
- **§20 - `intro-1`..`intro-5` are retained as a topic-coverage source** for the
  new Stage 0, retired only once every subject they teach is checked off against
  the new chapters or recorded as a deliberate drop. They remain barred as style
  models (§17 item 5).

Four of the seven open items (the component palette, ADR 0004's genericness, a
sixth "Story" lesson shape, the Source chip) were explanations the owner asked
for rather than decisions; they were explained in the reply and remain open.

## Outcome

- Impact: the naming rule now means what the owner meant, and the writer can no
  longer invent a why - it must ask for one.
- Tests: gate 0 errors, full build green.
- Files: 9 changed, 0 created. Memory: 1 updated, index updated.
- Next prompts: the owner's why, per topic, before any rename; the four
  still-open explanations.
- Reflection: `naming.md` was written from the owner's *rejections* rather than
  from their *destination*, and inherited the blind spot of the thing it was
  reacting to. A rule derived only from what was wrong last time will be wrong in
  a new way.

## Evaluation notes (flywheel)

- Failure modes observed: the same shape as `corrections.md` §3 - a rule written
  confidently in the owner's absence on a question only the owner can answer.
  Rule 3 needed one clarifying question before it was written, not after.
- Graders run: the chapter gate and the full build. Green.
- Next experiment: when a new canon rule depends on intent the owner has not
  stated, write the rule with the intent slot **empty and marked blocking**,
  rather than filling it with the most plausible reading.
