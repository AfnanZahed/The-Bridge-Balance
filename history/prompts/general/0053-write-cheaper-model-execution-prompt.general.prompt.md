---
id: 0053
title: Write cheaper-model execution prompt for intro resequence
stage: general
date: 2026-09-10
surface: agent
model: claude-sonnet-5
feature: none
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat message)
labels: ["curriculum-architecture", "intro-sequence", "handoff-prompt", "lesson-spine-authoring"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - curriculum-state/proposals/intro-resequence-execution-prompt-2026-09-10.md (created)
tests:
  - none (planning/handoff artifact only; no book content, sidebar, or ledger changed)
---

## Prompt

Don't read More things, you are an expensive model. Now that you have the COMPLETE Context and understanding, write me the Complete AI Prompt, WITH COMPLETE CONTEXT AND BACKGROUND AND UNDERSTANDING, for a Cheaper model for the execution and refer all the files in the prompt for the cheaper model to read, like the official docs and the ESPECIALLY /lesson spine authoring skill "MUST" be read and mastered fully by that model to write the chapters actually and add them into the book.

(This followed an earlier "now, write me the plan to execute" request, during which Claude had entered Plan Mode and was mid-exploration — reading placeholder-chapter frontmatter and `curriculum-state/contracts/calibration.md` — when this message arrived and redirected the deliverable.)

## Response snapshot

Stopped further exploration immediately, per the explicit instruction, and
used only what was already gathered this session (all four chapter files,
`sidebars.ts`, all four ledgers, `prerequisite-graph.yaml`, the three
official docs, the `Callout` component API, and `contracts/calibration.md`
— the last two read just before this message arrived and folded in).

Recognized the deliverable had changed shape: not a plan for Claude to
execute directly, but a complete, standalone prompt for a *different,
cheaper* model's fresh session to execute — covering both the mechanical
restructuring (Phase 1) and the actual chapter authoring via
`lesson-spine-authoring` (Phase 2), since that model will have zero memory
of this conversation.

Wrote the plan-mode file
(`C:\Users\Dell\.claude\plans\purring-riding-anchor.md`) as this deliverable
itself (since plan mode only permits editing that one file), then called
ExitPlanMode; the user approved. Saved the clean prompt content (without
the plan-mode meta-header) to
`curriculum-state/proposals/intro-resequence-execution-prompt-2026-09-10.md`
as a durable, copy-pasteable artifact, alongside the existing proposal file
it's built on.

The prompt covers: a mandatory, ordered reading list (CLAUDE.md,
curriculum-state/README.md, all of canon/, calibration.md, the approved
proposal file, the three official docs, and — called out explicitly, per
the user's emphasis — `.claude/skills/lesson-spine-authoring/`'s SKILL.md
and every reference file, in full, before writing any prose); the full
background/rationale for the resequencing (the evolutionary 0/1→SDE
principle, the 5-chapter breakdown, the "What Is Programming" placement
reasoning, the three resolved risks, the SDD-vs-SDE flag, two newly-noticed
naming inconsistencies between intro.md and intro-4 worth reconciling
during the merge); a concrete Phase 1 mechanical-restructuring checklist
(create 5 files, delete 4 old ones, rewire sidebars.ts, re-point all four
ledgers plus calibration.md's now-dangling anchor reference, regenerate the
manifest, run the gates); a Phase 2 chapter-by-chapter authoring sequence
that explicitly routes through `chapter-production`/`lesson-spine-authoring`
rather than freehand prose; the project's non-negotiable constraints (no
git, no fixed chapter count, no generated images, PHR-per-prompt); and a
definition-of-done checklist.

One consequence surfaced during this pass that hadn't been flagged before:
`contracts/calibration.md` names `edu-site/docs/intro.md` by path as the
calibration anchor (scope_multiplier 1.0) — since that file is being
deleted, the anchor reference goes dangling unless explicitly fixed. Added
this as its own Phase 1 step (re-point honestly, mark the anchor unset
until intro-5 is re-authored and reaches text-ready) rather than letting it
slip through silently.

## Outcome

- ✅ Impact: Produced a complete, self-contained execution brief a cheaper model can run from cold, covering both the file restructuring and the actual lesson-spine-authored chapter writing — without Claude performing either itself in this turn.
- 🧪 Tests: None run (no book/site/ledger files touched — only the prompt document itself was written).
- 📁 Files: `curriculum-state/proposals/intro-resequence-execution-prompt-2026-09-10.md` created. Plan-mode scratch file also holds the same content. This PHR file created.
- 🔁 Next prompts: The user runs this prompt in a fresh, cheaper-model session to actually execute Phase 1 and Phase 2. Any further work in *this* session would most likely be reviewing that execution's output, not repeating it.
- 🧠 Reflection: Respecting "don't read more, you're expensive" meant leaning entirely on context already gathered rather than re-verifying anything further (e.g., the exact file list inside `lesson-spine-authoring/`) — handled by instructing the executing model to read that skill's directory exhaustively itself, rather than the current session guessing at its contents.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): n/a (handoff artifact, not a gated chapter).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
