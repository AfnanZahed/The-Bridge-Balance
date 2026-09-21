---
id: 0115
title: Names must carry the why, not only the what
stage: general
date: 2026-09-20
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["naming", "canon", "beginner-first", "gate", "corrections", "coverage-check"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/canon/naming.md
 - curriculum-state/canon/corrections.md
 - .claude/skills/lesson-spine-authoring/SKILL.md
 - .claude/skills/bridge-balance-project-guide/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/curriculum-architect/reference/brief-format.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/gate.md
 - .claude/skills/bridge-balance-project-guide/reference/lesson-adversarial-review/SKILL.md
 - curriculum-state/canon/voice.md
 - curriculum-state/stage-0-drafting-plan.md
 - edu-site/scripts/check-chapter.mjs
tests:
 - "node scripts/check-chapter.mjs - 9 chapters, 0 errors, 7 warnings (2 new heading-no-why, both true positives)"
 - "npm run build - all five gates green, site compiled"
 - "npm run typecheck - clean"
---

## Prompt

> were my answers enough for the remaining 21 files or not? also, a new and very
> improtant rule, I told you in my answers that the headings, names and titles of
> stages, chatpters, lessons and parts (if any) must give the meaning of WHAT they
> actually are, but for the beginners, the names MUST also give them the sense of
> WHY, for example, in the beginning, when they will start from the yes or not, if
> first 3 seconds, they don't have the context and the WHY in their subconsiose
> minds.

Followed by a pointer to the rendered walkthrough, to save re-reading:
`file:///C:/Users/Dell/Desktop/Simple%20HTML/index.html` - the same 41-file
walkthrough as PHR 0113, as HTML.

## Response snapshot

**Part 1 - coverage.** Read files 21-41 out of the owner's HTML copy and checked
each recommendation against what PHR 0114 actually applied. Of roughly forty
"changes to consider" in files 21-41, every one was either already applied under
the owner's answers to files 1-20, or is a decision their answers genuinely do
not reach. Seven of the latter were reported back as open, the three substantive
ones being: whether DeepSeek may draft reader-facing prose; whether the chapter
component set (today only `Callout` and `StageBanner`) should grow, since
"ultra beautiful" pages are being asked of a two-component palette; and whether
`lesson-spine-authoring` should stay deliberately book-agnostic per ADR 0004,
which is the structural reason book-specific decisions cannot live inside the
skill that writes every sentence.

Two recommendations from files 21-41 that the answers *did* cover but PHR 0114
had missed were applied in this pass: the "style models" line (nothing in canon
said which shipped pages to imitate, and the 17 September session had taken
house style from `intro-1`), now `corrections.md` §17 item 5.

**Part 2 - the new rule, applied at source.** `canon/naming.md` had been written
that morning with two rules, and both are about the **what**. Obeying them
produced titles that are accurate, plain, professional and give a beginner no
reason to open them - "Short Words Instead of Numbers" being the clearest case.
§7 had already fixed the chapter *opening* so it states why the chapter matters;
nothing fixed the **name**, which is what a reader meets first, in a sidebar or
a search result, before any opening exists.

Added:

1. **`canon/naming.md` Rule 3 - "The name carries the why, not only the what"**,
   with the three-second test, four honest ways to carry a why (what it lets you
   do / the question it answers / the payoff / what changes for you), three
   things that are *not* a why (excitement, urgency, a claim of importance), and
   the scope note that reference pages are exempt because they are looked up
   deliberately. The comparison table gained four rows and now names which rule
   each weak title fails. "Two rules" became "three rules", settled in the order
   1 -> 3 -> 2.
2. **`canon/corrections.md` §18**, recording the decision, the owner's words,
   what went wrong, and what does not count as a fix (putting the why in the
   first paragraph and leaving the title bare).
3. **`lesson-spine-authoring/SKILL.md`** - "Every heading is a promise, and it
   carries a why", placed with the opening and transition rules, plus a
   self-check line.
4. **`brief-format.md`'s `NAME CHECK` slot** now tests all three rules and asks
   which one the title was weakest on.
5. **`bridge-balance-project-guide/SKILL.md` rule 13** extended.
6. **`check-chapter.mjs`: a new `heading-no-why` warning.** Deliberately blunt -
   it fires only on a heading that is a bare noun phrase with no question word
   and no verb anywhere in it. Passing is not proof a heading has a why, only
   that it is not obviously missing one; the real test is the human one. It
   found two true positives and zero false positives on the nine live chapters:
   ch02's "Short Words Instead of Numbers", and three headings in `welcome.md`
   ("The problem it solves", "The shape of it", "Ready?"). ch00 and ch01, the
   two accepted pages, pass clean.

**Held for the owner, not applied:** the concrete renames. `naming.md`'s own
procedure is to propose a rename before applying it, because a name appears in
prose, the sidebar, the chapter header, the ledgers and every cross-link. The
proposal table sits in `naming.md` under "Names currently awaiting owner
confirmation", now prefaced with the note that every entry predates Rule 3.

## Outcome

- Impact: the naming rule is now enforced at four layers - canon, the planning
  brief, the skill that writes every heading, and the build gate - rather than
  in the two chapter files that happened to be open.
- Tests: gate 0 errors; full build green; typecheck clean.
- Files: 7 changed, 0 created.
- Next prompts: the seven open decisions, chiefly the rename approvals, the
  component palette, DeepSeek's drafting scope, and ADR 0004's genericness.
- Reflection: this is `corrections.md` §17 working as intended for once. The
  owner named a symptom in two titles; the fix went to the file that generates
  titles, then down through every layer that reads it, and a mechanical check
  was added so the next drafter meets the rule without having read this record.

## Evaluation notes (flywheel)

- Failure modes observed: `naming.md` was written the same morning and still
  missed half the requirement, because it was derived from the rejected examples
  ("Orientation", "Yes, No, and Nothing In Between") rather than from what a
  beginner needs a name to do. A rule written only against the last rejection
  inherits that rejection's blind spot.
- Graders run: the chapter gate, the full build, typecheck. All green.
- Next experiment: before writing any new canon rule, state the reader's job the
  rule exists to serve, not only the output it exists to prevent.
