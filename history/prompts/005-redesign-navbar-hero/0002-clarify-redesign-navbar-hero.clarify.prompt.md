---
id: 0002
title: Clarify navbar and hero redesign
stage: clarify
date: 2026-08-19
surface: agent
model: MiniMax-M3
feature: 005-redesign-navbar-hero
branch: 005-redesign-navbar-hero
user: Dell
command: /sp.clarify
labels: [clarify, navbar, hero, search, mesh-gradient]
links:
  spec: specs/005-redesign-navbar-hero/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/005-redesign-navbar-hero/spec.md
  - specs/005-redesign-navbar-hero/checklists/requirements.md

tests:
  - Ambiguity coverage scan — all high-impact categories resolved
  - Integration validation — both new FRs and Clarifications session entries present
  - No [NEEDS CLARIFICATION] markers remain
---

## Prompt

> /sp.clarify

## Response snapshot

- Ran `check-prerequisites.ps1 -Json -PathsOnly` → `FEATURE_DIR=specs/005-redesign-navbar-hero`, `BRANCH=005-redesign-navbar-hero`.
- Reviewed the spec against the ambiguity taxonomy. Most categories were already Clear thanks to the three design-direction answers already resolved on 2026-08-18. Two residual gaps materially impacted architecture and validation:
  1. Hero artwork treatment under "replace everything" was language-only ("replaced" did not pick a visual direction).
  2. The new search affordance's behavior was undefined — a critical UX and architecture choice (client-side index vs. external provider).
- Asked Q1: hero visual direction. User chose **Apple-style soft mesh gradient** (calm OKLCH blue/neutral layers, no raster assets).
- Asked Q2: search behavior. User chose **in-page client-side search** over static curriculum content with a results dropdown/panel and no external dependency.
- Integrated both answers into the spec:
  - FR-018: hero artwork uses Apple-style soft mesh gradient (no raster assets, no external images).
  - FR-019: search is in-page client-side, results in a navbar-associated dropdown/panel.
  - Recorded both in a new Clarifications session dated 2026-08-19.
- Updated the requirements checklist notes to list all five resolved clarifications (FR-012, FR-013, FR-017 from 2026-08-18; FR-018, FR-019 from 2026-08-19).

## Outcome

- ✅ Impact: Two remaining high-impact ambiguities resolved. Hero visual direction is concrete (Apple-style soft mesh gradient), and search behavior is locked to client-side indexing with no external service.
- 🧪 Tests: Coverage scan passes; both clarifications recorded in the spec; checklist fully passes.
- 📁 Files: `specs/005-redesign-navbar-hero/spec.md`, `specs/005-redesign-navbar-hero/checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design the centered-brand navbar (with client-side search dropdown), the new hero deck with mesh-gradient background, and their shared Apple Pro token contract.
- 🧠 Reflection: The plan stage can now pick concrete token names, a search index strategy (e.g., a small JSON index built at build time), and a CSS mesh-gradient pattern without further spec work. A future plan-stage note may revisit whether the search index is generated at build time or fetched lazily.

## Evaluation notes (flyflywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): PASS — no remaining [NEEDS CLARIFICATION]; PASS — spec integr