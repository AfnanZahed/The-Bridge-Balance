---
id: 0048
title: Fix chapter heading typography and title capitalisation
stage: general
date: 2026-09-09
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: (direct question)
labels: ["typography", "css", "text-wrap-balance", "chapter-title", "mobile", "cross-track"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/src/css/custom.css
  - edu-site/docs/intro-spine-experiment.md
  - edu-site/.claude/launch.json
  - curriculum-state/ledgers/prerequisite-graph.yaml
tests:
  - "Live DOM measurement at 360 / 480 / 671px, before and after"
  - "node scripts/check-chapter.mjs --chapter docs/intro-spine-experiment.md -> 0 errors, 0 warnings"
  - "npm run build -> green (run twice: after the CSS change, and after the title change)"
  - "Post-change live check: text-wrap computed as 'balance', h1 renders 367/553, no orphan"
---

## Prompt

Why the heading 'Reading Spec-Driven Engineering From Its Own Name' is not looking beautiful?

## Response snapshot

Rendered the page on a dev server and measured the h1's line boxes rather than
guessing. Two independent causes, in different tracks.

**Cause 1 — platform defect, book-wide.** `article h1` had no `text-wrap:
balance`, so headings used greedy wrapping. Measured:

| Width | Before | After |
|---|---|---|
| 671px | 585 / 342 (36% spread) | 367 / 560 (29%) |
| 480px | 367 / 449 / **103** (72%) | 251 / 334 / 342 (19%) |

At 480px the word "Name" sat alone on a third line at 103px. That is the
mobile-dominant reader `canon/audience.md` is built around, and it was by far
the worst case. Fixed with one declaration on `article h1, h2, h3`, with the
measurement recorded in a CSS comment so the next author does not undo it.

**Cause 2 — editorial, this title only.** The CSS could only reach 29% because
the title's word mass is front-loaded: three long words (Reading, Spec-Driven,
Engineering) then four short ones (From, Its, Own, Name). No break point yields
even lines, so no CSS setting fixes it. Separately, "From" was capitalised
against the book's own convention - every other title lowercases short
prepositions and conjunctions.

Measured five replacement candidates live. "Spec-Driven Engineering, Read from
Its Own Name" reached 2% spread and "Spec-Driven Engineering Starts With Its
Own Name" reached 0%. Presented these with their numbers rather than renaming
the chapter unasked, since a chapter title is the owner's editorial call.

**Owner chose** to keep the wording and fix only the capitalisation. Applied to
all three occurrences (frontmatter `title`, body h1, prerequisite-graph row).

## Outcome

- ✅ Impact: heading orphan eliminated at every width across the whole book, not
  just this chapter. Title capitalisation now consistent with the other nine
  titles.
- 🧪 Tests: chapter gate 0/0; `npm run build` green twice; live DOM check
  confirms `text-wrap: balance` computed and 367/553 with no orphan.
- 📁 Files: 1 stylesheet, 1 chapter, 1 ledger, 1 new launch config.
- 🔁 Next prompts: none required. The 28% spread is a recorded, accepted
  cosmetic limit of the chosen title, not an open defect.
- 🧠 Reflection: "not looking beautiful" read as a single complaint and was two
  faults with different owners. Measuring the line boxes separated them - the
  CSS accounted for the orphan, the word distribution accounted for the rest,
  and only the second one needed the owner's decision.

## Evaluation notes (flywheel)

- Failure modes observed: the defect was invisible at desktop width in an
  earlier session, because 585/342 merely looks unbalanced while 367/449/103 at
  480px looks broken. Checking one viewport would have found the smaller half of
  the problem and missed the larger one.
- Graders run and results (PASS/FAIL): chapter gate PASS; build PASS; live
  computed-style verification PASS; orphan check PASS at 360 / 480 / 671px.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none for this defect. Worth noting
  for later that `check-chapter.mjs` could warn when a frontmatter `title`
  exceeds roughly 45 characters with no natural break point, since that is what
  makes a title unbalanceable.

## Deviations and notes

- **Cross-track edit, flagged.** `bridge-balance-project-guide` treats editing
  `src/` from a content-track task as the exception rather than the default.
  The question was about how a chapter renders, which is genuinely platform
  work; the CSS fix follows ratified Constitution Principle VII (Apple-Design
  Purity) rather than introducing a new visual language, and the title change is
  content-track. Both are recorded here.
- **New file:** `edu-site/.claude/launch.json`, needed to run the dev server
  through the preview tooling. Port 3000 was in use, so the server bound to
  59224 automatically. The server was stopped at the end of the session.
- **Checked and found NOT to be a defect:** the sidebar shows "Introduction —
  Spine Pilot" at position 01 with no separate "Introduction" entry above it.
  `sidebars.ts:16` makes `intro` the *category link* for "Start Here", so
  `intro.md` is reachable by clicking the category itself. Verified before
  reporting, and no change made.
- Still out of scope and untouched: `docs/intro.md`'s `keywords-missing` gate
  warning and its Mermaid diagram.
