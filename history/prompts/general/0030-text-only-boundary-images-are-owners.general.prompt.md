---
id: 0030
title: Text-only boundary, images are owner's
stage: general
date: 2026-09-06
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (conversational request)
labels: ["chapter-authoring", "text-only", "images", "image-prompts", "quality-gate"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/reference/figures.md (DELETED)
 - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/reference/image-prompts.md (new)
 - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/reference/gate.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/reference/research.md
 - .claude/skills/bridge-balance-project-guide/SKILL.md
 - edu-site/scripts/check-chapter.mjs
 - CLAUDE.md
 - PROJECT-MAP.md
 - .claude/skills/bridge-balance-project-guide/reference/project-map.md
tests:
 - "node scripts/check-chapter.mjs — PASS (intro.md clean, 24 placeholders listed, 0 errors)"
 - "synthetic chapter: owner-supplied image that EXISTS with good alt — correctly silent"
 - "synthetic chapter: reference to a file that does not exist — correctly errors image-missing"
 - "synthetic chapter: alt text 'diagram' — correctly errors alt-junk"
 - "synthetic chapter: alt text 'two doors' — correctly errors alt-thin (new check)"
 - "intro-4 forced text-ready: all 5 legacy compiled figures as raw images — still correctly error figure-raw-image"
 - "npm run build — PASS end to end (frontmatter ✓, 10 figures 0 problems, chapter gate ✓, SUCCESS)"
---

## Prompt

exclude the Image generation via the diagrams from this skill entirely, because I have tried too much to force the claude code to create ultra beautiful and highly professional superb images, but it can't. so i tried the chatgpt image generation and the quality was amazing, so now, using this skill, the claude code will generate amazing AI prompts for the content it will generate (when I will ask, otherwise I will myself generate the images using the gpt using my own prompts), now, from now on, the claude code's one and only task type is just text generation. wheter it is research, content creteion, teaching to the students, using advanced teaching methodologies or whatever it is, just text based work, images will be MINE whether by using Chatgpt IMage generation or Minimax Image generation... Mean, exclude this diagram and image related things from this new skill "AT ALL" for claude code.

## Response snapshot

Deleted `reference/figures.md` outright and replaced it with `reference/image-prompts.md`,
which loads ONLY on explicit request — the default is no images and no prompts, since
the owner generates from their own prompts most of the time and unrequested prompt
blocks are noise in the deliverable.

Made the boundary explicit rather than implied: a dedicated "This skill is text-only"
section in `SKILL.md`, a new standing rule 6 in the guide and a matching one in
`CLAUDE.md`, and an anti-pattern with no small exceptions ("No SVG, no Mermaid, no
figure module, no ASCII diagram, no quick sketch to illustrate the point"). Step 5
lost figure authoring entirely and gained the instruction that matters instead: where
a visual would have helped, make the prose carry it, and if a concept genuinely needs
a labelled diagram, name the gap for the owner rather than filling it with something
weaker.

The most useful thing written into `image-prompts.md` is the constraint that decides
what may be asked for at all: **diffusion models cannot spell.** A prompt for "four
boxes labelled Specify, Design, Implement, Verify" returns a handsome picture reading
`Speclfy`, `Desgin`. That does not improve with better prompting. So the file forbids
requesting anything whose meaning depends on legible text, and says plainly that a
concept needing a labelled diagram is not an image-prompt job — say so and stop. It
also carries the house visual identity (near-monochrome, one sparing accent, soft
directional light, restraint over spectacle, must work in both themes) so prompts
produce images that can actually sit on the site.

Then realigned the gate, which had been built assuming Claude authors figures. Under
the new model images arrive from outside, so the failure that matters changed: a
reference to a file nobody has made. Added `image-missing` and `alt-thin`; narrowed
`figure-raw-image` to fire only for slugs actually in the figure manifest, so a plain
owner-supplied image is correct as a plain markdown image while the ten legacy
compiled figures are still protected. Alt-text checks apply to every image and stay
Claude's job — alt text is prose.

## Outcome

- ✅ Impact: Claude Code's output surface for this project is now text, and only text.
  Nothing in the skill, the guide, `CLAUDE.md`, or either project map asks it to draw
  anything. The gate enforces the parts of an image that ARE text — the reference
  resolves, the alt text does its job.
- 🧪 Tests: five image cases verified individually (exists/missing/junk alt/thin
  alt/legacy figure), plus the full build green end to end.
- 📁 Files: 1 deleted, 1 created, 8 edited.
- 🔁 Next prompts: first real chapter run. When images are wanted for it, ask
  explicitly and the skill will produce prompt blocks with placement, aspect, negative
  prompt, and draft alt text.
- 🧠 Reflection: the sharpest part of this change wasn't removing the figure code — it
  was writing down WHY a labelled diagram can't simply be re-requested as a prompt.
  Without that, the natural next failure would have been prompting for flowcharts and
  shipping beautiful misspelled pictures.

## Evaluation notes (flywheel)

- Failure modes observed: two bash heredocs failed on embedded JSX quotes and regex
  escapes; switched to writing the patch as a file and running it, which is the right
  tool for content-heavy substitutions. Inserting a new standing rule renumbered the
  list wrong (5, 7, 8) — caught on verification and fixed.
- Graders run and results (PASS/FAIL): image-case matrix PASS (5/5); legacy-figure
  regression PASS; repo-wide sweep for any remaining instruction to draw PASS (clean);
  full build PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): the gate cannot tell whether an image's alt
  text actually matches the picture. Nothing can, mechanically — worth stating in
  `lesson-adversarial-review` as an explicitly human/hostile check rather than leaving
  it as an assumed one.
