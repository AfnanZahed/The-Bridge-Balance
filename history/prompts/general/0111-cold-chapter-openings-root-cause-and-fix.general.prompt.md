---
id: 0111
title: Cold chapter openings - root cause and fix
stage: misc
date: 2026-09-17
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: [corrections, front-door, chapter-openings, gate, lesson-spine-authoring, stage-0]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - curriculum-state/canon/corrections.md
  - curriculum-state/README.md
  - .claude/skills/bridge-balance-project-guide/SKILL.md
  - .claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md
  - .claude/skills/lesson-spine-authoring/SKILL.md
  - .claude/skills/lesson-spine-authoring/reference/stations.md
  - .claude/skills/lesson-spine-authoring/reference/language-register.md
  - edu-site/scripts/check-chapter.mjs
  - edu-site/docs/ch01-foundations.md
  - edu-site/docs/ch02-programming-is-born.md
  - edu-site/docs/changelog.md
tests:
  - node scripts/check-chapter.mjs (9 chapters, 0 errors, 5 warnings)
  - npm run build (all five gates green, static build generated)
  - node --check scripts/check-chapter.mjs
---

## Prompt

The owner asked why the AI writes cold, robotic openings every time it is asked to write
anything in the book - "no context, no base making, no high hello, no starting gradully, no in
this chapter we will learn x, no natural start AT ALL, just vibe coded robotic tone everytime" -
citing the rejected first draft of the Stage 0 introduction against the accepted version, and
then correcting the scope: the same problem affects teaching chapters, not only front doors.
"read the ch01-foundations and you will know, i just gave the both intros as an example for you
to understand what problem I am asking for." They asked which files cause it and how to fix it.

## Response snapshot

Diagnosed the cause rather than restyling the prose. Every feature the owner objected to was a
rule firing correctly, and all of them were written for teaching chapters:

- `canon/voice.md` commitment 1 bans any scene-setting paragraph under a title, which is exactly
  the warm opening the owner wanted.
- Station 0 must run before any definition, and `name-registers.md` §5's term bank supplies the
  Edison/Mark II moth row - the literal source of the rejected draft's opening.
- `stations.md` S10 bans summaries and requires a from-memory prompt last, which is why the page
  ended on a quiz rather than a nudge to start reading.
- `canon/voice.md`'s anti-commodity test requires a signature contribution, so a navigation page
  manufactured a thesis.

Root cause, one level deeper than the rules: on 15 September a session diagnosed this correctly
("front-door prose needs its own opening rule, not a bent version of the chapter rule") and filed
it in PHR 0076 and an assistant memory directory. Nothing loads either at drafting time, so the
mistake repeated on 17 September. `canon/corrections.md` already existed to record exactly this.
The remaining hole was that the two skills upstream of the one that was fixed - the mandated
entry point and `chapter-production` - never loaded `corrections.md` and had no FrontDoor route.

For chapters the finding was different and sharper: the rule already existed and was being
broken. `lesson-spine-authoring`'s sixth hard constraint says in its own words that "a lesson
that opens directly on its own subject ... has skipped the step that makes the subject land", and
`ch01-foundations.md` shipped text-ready doing precisely that - h1, section heading, traffic
light. `ch02` complied, which made the inconsistency invisible. `corrections.md` §4 already
banned the date density too, and lost to five rules inside the spine skill that pull the other
way because it was not in that skill's reading list.

Work done, after three decisions the owner made by menu (live copy not the stale worktree;
transcribe the front-door memories only; codify a fixed slot template):

1. Wiring - 13 asserted edits so the rules reach the writer: `corrections.md` added to
   `chapter-production`'s read-now list and to the spine skill's project block; standing rule 11
   and a FrontDoor routing row added to the entry-point skill, plus a front-door anti-pattern;
   the sixth hard constraint amended to require a short orientation; date-furniture and
   bolded-lead anti-patterns added; the bolded-lead tic named in `language-register.md` §6; a
   scope note in `stations.md` §2 making §4 outrank S2, S7 and S9 for Stage 0-2; `README.md`'s
   stale canon count (five to six) and ledger count (four to five) fixed, and the two files
   missing from its layout tree added.
2. Canon - `corrections.md` gained the ten-slot front-door skeleton and its register rules, the
   two transcribed memories, a new §7 (a chapter opens with orientation, not with its own
   subject, with the owner's words and the `ch01` example), and a note in §4 explaining why it
   lost an argument it was not present for.
3. Enforcement - four new checks in `check-chapter.mjs`, thresholds calibrated against the real
   corpus rather than guessed: `cold-open` (error), `orientation-thin`, `date-density` past 4.0
   years per 1,000 words, and `bold-lead` past 40% of paragraphs. A dated `LEGACY_STAGE0`
   exemption covers the five pre-redesign intro files, backed by the existing stale-entry
   assertion. Before the repair the checks failed `ch01` and `ch02` and flagged nothing already
   accepted, which is what calibration was for.
4. Repair - `ch01` and `ch02` rewritten: orientation blocks added in the shape the owner picked,
   dates cut from 16 to 2 and 5 to 1, bolded paragraph openings from 55% to 4% and 84% to 9%. The
   teaching content is unchanged.

## Outcome

- ✅ Impact: the rule a front door needs now reaches the skill that writes it, the chapter
  orientation rule is canon and mechanically enforced, and the two chapters the owner pointed at
  open warm instead of cold.
- 🧪 Tests: chapter gate 9 checked, 0 errors, 5 warnings; `npm run build` green end to end.
- 📁 Files: see `files:` above. All edits landed in the live working copy, not the worktree.
- 🔁 Next prompts: the real test is a fresh session asked for "the Stage 1 introduction page"
  with no mention of front doors - it should classify FrontDoor unprompted and produce the ten
  slots. `welcome.md` still warns on `orientation-thin` and `bold-lead` (52%), left for the owner
  to decide rather than edited unasked.
- 🧠 Reflection: on this project a rule existing has never been the same as a rule firing. §4
  existed and `ch01` shipped anyway, because the skill that writes prose did not read the file
  that carried it. The durable lesson is that a correction needs three landings, not one - the
  canon entry, the reading list of whatever actually drafts, and a mechanical check - and that
  warnings alone are what let this ship twice.

## Evaluation notes (flywheel)

- Failure modes observed: a correct diagnosis filed outside the repo is indistinguishable from no
  diagnosis at all; and a gate that reports clean on a rejected page teaches everyone to trust it
  less. Both were structural, not stylistic.
- Graders run and results (PA§/FAIL): chapter gate PA§ (0 errors); full build PA§.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): scope the first draft's page kind out loud before
  drafting anything, and say which `corrections.md` entries bind it - a one-line declaration that
  would have caught both repeats.
