---
id: 0001
title: Continue work hardening and shipping
stage: spec
date: 2026-08-20
surface: agent
model: opus
feature: 010-continue-intro-work
branch: 010-continue-intro-work
user: Dell
command: /sp.specify
labels: [spec, continue, harden, ship, audit, live-check]
links:
  spec: specs/010-continue-intro-work/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/010-continue-intro-work/spec.md
  - specs/010-continue-intro-work/checklists/requirements.md

tests:
  - Quality checklist review — PASS (30/30 items)
  - [NEEDS CLARIFICATION] markers — 0 (defaults documented in Assumptions)
  - Branch created via create-new-feature.ps1 — PASS (`010-continue-intro-work`)
---

## Prompt

/sp.specify

Now continue

## Response snapshot

**Interpretation.** "Now continue" follows a substantive rewrite of the nine differentiated intro versions on branch `009-differentiated-intros`. Read as a continuation, the next concrete work is the verification and publication layer: an independent-reviewer matrix audit (SC-001), the live reader-control description check (T034 + SC-002/SC-003), build verification, and a final PR-ready PHR.

**Branch chosen.** `010-continue-intro-work` (no existing branch or spec dir with this short-name).

**Spec outcome.** 4 user stories (US1 blind-reviewer audit, US2 live reader-control check, US3 PR-ready branch, US4 curriculum handoff), 10 functional requirements, 5 edge cases, 4 key entities, 7 success criteria, an explicit Out-of-Scope list.

**Quality checklist.** Created at `specs/010-continue-intro-work/checklists/requirements.md`; 30/30 items PASS on initial review; zero [NEEDS CLARIFICATION] markers required.

**Out of scope.** Re-authoring the nine versions (PHR 0006 already delivered that). Re-styling the reader-control card (PHR 0005 already shipped that). Adding new curriculum pages. Translating the intro.

## Outcome

- ✅ Impact: spec turns the user's "continue" into a concrete, testable publication pass without re-doing prior work.
- 🧪 Tests: matrix audit, live reader-control check, typecheck/build, branch-cleanliness diff, link resolution — all written as acceptance scenarios.
- 📁 Files: `specs/010-continue-intro-work/spec.md`, `specs/010-continue-intro-work/checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design the audit and live-check execution; `/sp.tasks` to enumerate the verification steps.
- 🧠 Reflection: the most useful interpretation of "continue" is the gap between "feature works" and "feature ships." This spec is that gap.
