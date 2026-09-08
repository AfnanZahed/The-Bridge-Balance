---
id: 0002
title: Amend Principle III to v2.0.0
stage: constitution
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation (impact)
branch: 001-spec-driven-engineering
user: Dell
command: (amendment, no slash command — driven by clarification Q3)
labels: [constitution, amendment, principle-iii, co-authoring, ma-jor-bump, adr-0002]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0002-text-first-video-second-workflow.md
  pr: null
files:
  - .specify/memory/constitution.md
  - history/adr/0002-text-first-video-second-workflow.md
  - history/adr/README.md
  - history/prompts/constitution/0002-amend-principle-iii-v2.constitution.prompt.md
tests: []
---

## Prompt

The clarification session for `001-book-foundation` (Q3 2026-08-17) revealed the actual content authoring workflow inverts Constitution Principle III ("Lecture-First, Text-Second"). User chose to pause clarification and fix the constitution first. Workflow:

1. Co-research (Dell + Claude Code)
2. Text writing (Claude Code writes MDX chapters)
3. Image integration (Dell produces AI-generated visuals, Claude Code integrates)
4. Video recording (Dell records against the now-complete text)

This requires an ADR + constitution amendment.

## Response snapshot

1. **Wrote ADR-0002** at `history/adr/0002-text-first-video-second-workflow.md`.
   - Status: Accepted.
   - Captures: context (Principle III inverted by Q3), decision (4-step co-authoring model with three chapter states: placeholder / text-ready / video-published; image as first-class entity), consequences (positive: faster publishing, separation of concerns; negative: coupling, image pipeline bottleneck), and three rejected alternatives (keep lecture-first; two-track separation; AI-generated video).
   - Cross-references: spec.md, clarification PHR, platform spec.

2. **Amended the constitution** at `.specify/memory/constitution.md`.
   - Prepended Sync Impact Report v2.0.0 (MAJOR bump — principle redefinition trigger).
   - Rewrote Principle III as "Co-Authored Text, Video-Second Delivery (formerly 'Lecture-First, Text-Second Delivery')."
   - Detailed the 4-step workflow (co-research → text writing → image integration → video recording).
   - Defined the three explicit chapter states visible to readers.
   - Added the constitutional note: "Claude Code is a *content author*, not just a documentation formatter."
   - Listed affected downstream artifacts (spec, ADR, clarification PHR) and a follow-up TODO for the `/sp.plan` invocation to reference v2.0.0.
   - Version: **2.0.0** | Ratified: 2026-08-17 | Last Amended: 2026-08-17.

3. **Updated `history/adr/README.md`** index — ADR-0001 status flipped from "Proposed" to "Accepted" (it was implicitly accepted at constitution ratification); ADR-0002 added as "Accepted."

## Outcome

- ✅ Impact: Constitution is back in sync with the actual workflow. Principle III is no longer contradicted by the spec. The `/sp.plan` invocation for `001-book-foundation` will reference v2.0.0 and the Constitution Check section can proceed.
- 🧪 Tests: none — constitutional change.
- 📁 Files: `constitution.md` (amended), `0002-text-first-video-second-workflow.md` (new ADR), `history/adr/README.md` (index updated), this PHR.
- 🔁 Next prompts:
  1. `/sp.plan` for `001-book-foundation` — Constitution Check references v2.0.0.
  2. Optional: revisit the deferred clarification questions (Q4 stub depth, Q5 Vercel failure recovery) once planning surfaces them.
- 🧠 Reflection: The amendment was driven by a user-provided workflow that contradicted an inferred principle. The right move was to surface the conflict to the user immediately, propose pausing the clarification session to fix the constitution, and ship both the ADR and the amendment in the same session. The MAJOR bump (v1.0.0 → v2.0.0) is appropriate because Principle III was *redefined*, not merely clarified — redefinition is a MAJOR trigger per the constitution's own versioning rules. Future readers of the constitution's Sync Impact Report will see both v1.0.0 (initial fill) and v2.0.0 (this amendment) side-by-side and understand the evolution.

## Evaluation notes (flyflywheel)

- Failure modes observed: none. The conflict was caught at the right time — during clarification, before planning.
- Graders run and results (PASS/FAIL): n/a.
- Prompt variant (if applicable): the amendment was not invoked via a slash command but as a follow-up to the clarification session. This is the right escape hatch when a clarification invalidates a constitutional principle.
- Next experiment (smallest change to try): `/sp.plan` for `001-book-foundation`, with the Constitution Check section explicitly citing v2.0.0 Principle III (the new co-authoring workflow).
