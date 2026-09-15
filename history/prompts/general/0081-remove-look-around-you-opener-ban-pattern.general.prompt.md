---
id: 0081
title: Remove look-around-you opener, ban pattern
stage: misc
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["voice", "canon", "intro-1", "anti-slop"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/intro-1-binary-to-programming.md
 - curriculum-state/canon/voice.md
tests:
 - cd edu-site && node scripts/check-chapter.mjs --chapter docs/intro-1-binary-to-programming.md
---

## Prompt

The user selected a paragraph in the live site (rendered from
`edu-site/docs/intro-1-binary-to-programming.md`) via the launch-selected-element
tool: "Look at the closest screen to you — this page, a phone, a laptop.
Everything happening on it, however advanced it looks, comes down to one
physical fact. Somewhere inside that device, a switch is either on, or off.
Not partly on. On, or off." and said, verbatim: "Remove these type of
paragrpahs from all the chapters, current and for the future"

## Response snapshot

Routed through `bridge-balance-project-guide` first, since the request didn't
cleanly match any of the four bundled protocols (not a new chapter, not a
single-chapter review, not a coherence audit). Investigated scope before
editing:

- Checked `whole-book-redesign-initiative` and `stage-1-content-flagged-
  unauthorized` memories first — Stage 1's six shipped chapters are off-limits
  without new explicit owner instruction, and the whole intro sequence is
  mid-redesign (this chapter's content is not final and will eventually be
  superseded by `intro-1-binary-to-programming/01-binary.md`, still a
  placeholder). This bounded the task to a stopgap style fix, not a rewrite.
- Grepped every `edu-site/docs/**/*.md` file for this "look around you /
  picture the room" observational-hook opener pattern, and read the opening
  paragraphs of every other text-ready Stage 0 chapter (`welcome.md`,
  `intro-2` through `intro-5`) by hand. The pattern exists in exactly one
  live, editable file: `intro-1-binary-to-programming.md`. Every other
  Stage 0 chapter already opens "in the middle of something" (a specific
  incident or moment of friction), matching `canon/voice.md` commitment 1 —
  so this was a single isolated instance, not a corpus-wide problem.
- Fixed it: removed the "Look at the closest screen to you" reader-address
  staging device from the opening paragraph, keeping the same underlying fact
  (a switch is on or off) stated directly instead of via a manufactured
  shared-observation frame. Re-ran the chapter gate — clean, 0 errors,
  0 warnings, 2,390 words.
- Added the pattern to `curriculum-state/canon/voice.md`'s "Structural tells,
  equally banned" list as **"The look-around-you opener,"** with the example
  phrasing and a pointer to this PHR, so it is a standing, named rule any
  future chapter (including the from-scratch Stage 0 rewrite) is checked
  against — this satisfies the "for the future" half of the request.
- Did not touch `lesson-spine-authoring/reference/language-register.md`
  (the peer skill's own general anti-slop tic table) because the redesign
  memory records the owner is currently mid-editing that file themselves;
  `canon/voice.md` is this book's own canon file and the correct, non-
  conflicting home for a book-specific banned-phrase addition.
- Did not touch Stage 1 chapter content, per the owner's standing "skip it
  entirely" instruction — not re-checked for this pattern.

## Outcome

- ✅ Impact: One live chapter's opening paragraph rewritten to drop the
  observational-hook tic; the pattern is now a named, banned structural tell
  in canon/voice.md for every future chapter.
- 🧪 Tests: `node scripts/check-chapter.mjs --chapter docs/intro-1-binary-to-programming.md` — 0 errors, 0 warnings.
- 📁 Files: edu-site/docs/intro-1-binary-to-programming.md; curriculum-state/canon/voice.md
- 🔁 Next prompts: None required; flagged to the user that Stage 1 was
  deliberately excluded and that intro-1's fuller content is still slated for
  replacement by the eventual Stage 0 rewrite.
- 🧠 Reflection: A single hostile-sounding request ("remove from all chapters")
  turned out to be scoped to one file once actually checked against every
  chapter's real opening — worth verifying scope by reading before assuming a
  corpus-wide problem exists.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): chapter gate — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
