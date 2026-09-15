---
id: 0001
title: Write Book Foundation Spec
stage: spec
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation
branch: 001-book-foundation
user: Dell
command: /sp.specify
labels: [spec, docusaurus, mdx, curriculum, free-tier, lecture-first]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md
  pr: null
files:
  - specs/001-book-foundation/spec.md
  - specs/001-book-foundation/checklists/requirements.md
  - history/prompts/001-book-foundation/0001-write-book-foundation-spec.spec.prompt.md
tests: []
---

## Prompt

/sp.specify book foundation

(Feature description: "book foundation" — the textbook feature. Derived from the prior conversation: Docusaurus site with 4 stages, 6 Stage 1 placeholder chapters, branded "The Bridge Balance", free-tier hosting, lecture-first content model.)

## Response snapshot

1. **Branch and feature dir created.** Ran `.specify/scripts/powershell/create-new-feature.ps1 -Json "book foundation" -Number 1 -ShortName "book-foundation"`. The script's `git checkout -b` succeeded (`Switched to a new branch '001-book-foundation'`); a `Join-Path` bug in the script's `promptsDir` line caused an exit-1 but did not block the spec-dir creation. Branch now active; `specs/001-book-foundation/spec.md` was copied from the template.

2. **Drafted the spec.** Five user stories prioritized:
   - **P1**: Read a Stage 1 chapter (homepage → stage overview → chapter with all four sections).
   - **P2**: Navigate between stages (sidebar with Stage 1 expanded, Stages 2–4 collapsed).
   - **P2**: Find a chapter by topic (sidebar visibility of all six Stage 1 chapters).
   - **P1**: Teacher pastes lecture content (ergonomic template, no MDX fight).
   - **P1**: Build and deploy (`npm run build` exits 0; deploys to GitHub Pages or Vercel).
   - Five edge cases (placeholder chapter, MDX syntax error, broken link, 404, no-JS).

3. **Twelve functional requirements** written to be testable: homepage with 4 stages, sidebar, 4-section chapter template, "awaiting lecture" marking, MDX support, build success, broken-link failure (not warning), brand name, no-auth reading, free-tier deploy, README, syntax highlighting.

4. **Seven success criteria** are measurable and tech-agnostic where possible: build exit code, click-count to a chapter, render success of all six chapters, 3-second 3G load, Lighthouse a11y ≥ 90, public reachability, 15-minute paste-and-build for a teacher.

5. **Assumptions** documented for every deferred choice: no search until Phase B, no i18n until Phase B, no versioned docs in Phase A, no comments widget, no analytics, configurable deployment, single-author workflow.

6. **Out of Scope** explicitly enumerates what this feature is NOT: RAG chat, personalization, translation, auth, payments, search, analytics.

7. **Validation.** Created `specs/001-book-foundation/checklists/requirements.md` and ran through every checklist item. Result: all pass. Cross-checked against the constitution v1.0.0 (Free-Tier, Pluggable, Lecture-First, Spec-Driven, Smallest Change, Free Curriculum) — all six principles satisfied.

8. **No NEEDS_CLARIFICATION markers needed.** Every potentially-ambiguous choice (search, i18n, versioning, comments, analytics, deployment target) has a reasonable default in the Assumptions section.

## Outcome

- ✅ Impact: First feature spec written. The textbook's scope is now formally bounded; Phase B/C features are explicitly excluded. The spec is the contract for `/sp.plan`.
- 🧪 Tests: none — specs are documentation. Behavioral tests are authored when `/sp.tasks` runs.
- 📁 Files:
  - `specs/001-book-foundation/spec.md` — the spec.
  - `specs/001-book-foundation/checklists/requirements.md` — validation result.
  - `history/prompts/001-book-foundation/0001-write-book-foundation-spec.spec.prompt.md` — this PHR.
- 🔁 Next prompts:
  1. `/sp.plan` — design the book-foundation build/deploy architecture (which will reference stack.md).
  2. `/sp.tasks` — break the plan into testable units.
  3. `cd edu-site && npm install && npm start` — actually run the textbook and click through User Story 1.
- 🧠 Reflection: The spec deliberately keeps Docusaurus, React, MDX names out of the user-value framing and puts them in Functional Requirements only where they describe *what* the platform is. This matches the Constitution Check contract — implementation details belong in `plan.md`, not `spec.md`. The 5-user-story split separates "student reads" (P1, P2), "student navigates" (P2), "teacher authors" (P1), and "maintainer ships" (P1), giving the plan four clean slices.

## Evaluation notes (flywheel)

- Failure modes observed: the `create-new-feature.ps1` script has a `Join-Path` bug (passes 4 args; `Join-Path` takes 2) that crashes the script after `git checkout -b` and `New-Item` for the spec dir. The crash does not block work — branch and spec.md are already in place. Worth a follow-up patch to the script.
- Graders run and results (PASS/FAIL): the spec quality checklist passed all items. Constitution cross-check passed all six principles.
- Prompt variant (if applicable): n/a — `$ARGUMENTS` was `book foundation`.
- Next experiment (smallest change to try): the next session should `/sp.plan` to design the architecture (Docusaurus build pipeline, deploy target, branch protection, PR workflow). Then `/sp.tasks` to break it into testable units.
