---
id: 0001
title: Redesign navbar and hero top
stage: spec
date: 2026-08-18
surface: agent
model: MiniMax-M3
feature: 005-redesign-navbar-hero
branch: 005-redesign-navbar-hero
user: Dell
command: /sp.specify (transform this part: [Image #4] design, UI and UX at all from the scratch)
labels: [spec, redesign, navbar, hero, ux, apple-design]
links:
  spec: specs/005-redesign-navbar-hero/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/005-redesign-navbar-hero/spec.md
  - specs/005-redesign-navbar-hero/checklists/requirements.md

tests:
  - Specification quality checklist — all items PASS after clarifications
  - Discovery scan of HomepageHero/index.tsx, styles.module.css, index.tsx — PASS
---

## Prompt

> transform this part: [Image #4] design, Ui and UX at all from the scrath

## Response snapshot

- Created branch `005-redesign-navbar-hero` (renamed from `005-redesign-navbar` after scope clarification) and scaffolded the feature spec.
- Inspected the screenshot, existing navbar (nav/logo/title/Curriculum/GitHub/theme toggle), and hero top (brand mark, eyebrow, headline, subtitle, CTA row, meta row) via `edu-site/src/components/HomepageHero/index.tsx` + `styles.module.css` + `src/pages/index.tsx` + `docusaurus.config.ts`.
- User clarified the target: "the top bar, which has the theme toggle, The Bridge Balance, Curriculum button etc", then expanded scope: "redesign all of them, and the complete top part of the hero section which has these buttons".
- Wrote a spec with three user stories:
  1. US1 (P1) — fresh navbar visual design (MVP).
  2. US2 (P1) — fresh hero top section design.
  3. US3 (P2) — UX behaviors and active-state cohesion.
- Added 17 functional requirements (FR-001..FR-017), 10 success criteria (SC-001..SC-010), edge cases, assumptions, and key entities for both surfaces.
- Asked three design-direction questions (navbar structure, navbar items, hero depth); user chose: **Centered brand**, **Add search**, **Replace everything** (hero artwork included).
- Resolved all [NEEDS CLARIFICATION] markers into the requirements and recorded the answers in a dated `## Clarifications` section (Session 2026-08-18).
- Updated the quality checklist to all-pass.

## Outcome

- ✅ Impact: The spec now defines a from-scratch redesign of the top-of-page chrome — a centered-brand navbar with a curriculum search affordance, and a hero whose content layer and artwork are fully replaced (keeping the existing copy) — while inheriting the WCAG 2.2 / Apple Pro accessibility contract from feature 004.
- 🧪 Tests: Specification checklist — all items pass; no [NEEDS CLARIFICATION] markers remain.
- 📁 Files: `specs/005-redesign-navbar-hero/spec.md`, `specs/005-redesign-navbar-hero/checklists/requirements.md`.
- 🔁 Next prompts: `/sp.clarify` (remaining questions likely low-impact), then `/sp.plan`.
- 🧠 Reflection: The redesign spans two surfaces (navbar + hero top) with clear priorities (US1 + US2 as two P1 MVP slices, US3 as P2 polish). The centered-brand + search + full-hero-replacement direction maximizes perceived change while the spec keeps the accessibility and free-tier constraints frozen.

## Evaluation notes (flywheel)

- Failure modes observed: The create-new-feature script reported the usual positional-argument warning (non-blocking). Branch and spec directory were renamed once the user clarified the target surface (navbar) and expanded scope (hero top).
- Graders run and results (PASS/FAIL): PASS — specification quality checklist; PASS — no remaining placeholders; PASS — both surfaces mapped to user stories and success criteria.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): Run `/sp.clarify`, then `/sp.plan` to pin the concrete CSS/component structure for the centered-brand navbar + search and the new hero deck.