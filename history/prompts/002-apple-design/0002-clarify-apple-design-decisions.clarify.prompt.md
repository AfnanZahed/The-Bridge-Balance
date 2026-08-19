---
id: 0002
title: Clarify Apple-design theme decisions
stage: clarify
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 002-apple-design
branch: 002-apple-design
user: Dell
command: /sp.clarify
labels: [clarify, design, accents, motion, typography, charts]
links:
  spec: specs/002-apple-design/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-apple-design/spec.md (added ## Clarifications section — 5 bullets; updated FR-002, FR-007, FR-008, FR-009, FR-011, US1/US4, Edge Cases)
  - specs/002-apple-design/checklists/requirements.md (notes updated)
tests:
  - n/a — speculation/design decisions; no build changes
---

## Prompt

> /sp.clarify

## Response snapshot

Ran `check-prerequisites.ps1 -Json -PathsOnly` → resolved `specs/002-apple-design/spec.md` as the active spec. Ran a structured ambiguity scan across 12 taxonomy categories; identified 5 high-impact (Impact × Uncertainty) ambiguities, then resolved each sequentially in-session:

1. **Stage accents** → **Mute all to Apple-grade** (teal/ochre/lilac/dusty rose).
2. **Primary accent** → **Apple-system blue** (~#0a84ff family): links, focus rings, primary CTAs, active states.
3. **Motion budget** → **Strip to static**: remove Lenis smooth scroll, GSAP scroll-spine scrub, and R3F 3D bridge hero; keep only Framer Motion entrance reveals (collapse under `prefers-reduced-motion`).
4. **Type system** → **Keep stack, tune Apple-style**: ultra-professional, bold, simple, attractive — bolder display weights, tighter tracking, one or two editorial Instrument Serif moments.
5. **Chart palette** → **Single accent + neutrals**: Apple-system blue for the primary series, neutral grays for secondary/tertiary; stage identity via labels, not color alone.

After each accepted answer, appended the Q→A bullet under `## Clarifications → ### Session 2026-08-17` and immediately propagated to the affected sections (FR-002/007/008/009/011, Success Criteria, Assumptions). Final validation pass: exactly 5 bullets (one per answer), no unresolved `[NEEDS CLARIFICATION]`, no contradicting statements, Markdown structure valid, terminology consistent.

## Outcome

- ✅ Impact: The theme transformation now has a binding visual contract: muted Apple-grade stage accents, Apple-system-blue primary, static/near-static motion, tuned type, and a single-accent chart system. This removes planning ambiguity and de-risks /sp.plan and /sp.tasks.
- 🧪 Tests: n/a (design decisions only). All 5 acceptance answers recorded; spec quality checklist updated to all-pass.
- 📁 Files: `specs/002-apple-design/spec.md`, `specs/002-apple-design/checklists/requirements.md`
- 🔁 Next prompts: `/sp.plan` for `002-apple-design` to decompose the token → surface → component → fidelity-audit path against Constitution v2.1.0.
- 🧠 Reflection: The "Strip to static" decision removes the R3F hero, Lenis, and GSAP — significant scope simplification on top of the token work. Agents that previously added those libraries will be reverted, which is worth noting in the plan's Constitution Check (Principle V: Smallest Viable Change).

## Evaluation notes (flywheel)

- Failure modes observed: none during the session. All 5 answers accepted with explicit choices or short answers.
- Graders run and results (PASS/FAIL): 5 bullet clarifications · ≤5 max limit PASS · no conflicting bearing statements PASS · section readability PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): run `/sp.plan` to normalize the plan ephemera (design-token audit of current `radix.css`/`custom.css`, removal of motion deps, audit of stage-4 chart palette) into an executable task list.