---
id: 0003
title: Add Apple-design identity principle
stage: constitution
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: none
branch: 001-book-foundation
user: Dell
command: /sp.constitution
labels: [constitution, design, apple, visual-identity, principle-vii]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md (amended to v2.1.0 — Principle VII added + Design fidelity audit in Operational Standards + Reviews check (e))
tests:
  - n/a — governance doc only
---

## Prompt

> The website theme will be Apple (tech company)'s theme

## Response snapshot

- Loaded the existing constitution (v2.0.0, 6 principles, no `[ALL_CAPS]` placeholders, full Sync Impact Report in the HTML comment).
- Determined the request adds a **new principle** (visual identity) rather than redefining an existing one → MINOR bump to **v2.1.0**.
- Drafted **Principle VII — Apple-Design Purity (guided visual identity)**: Apple's design language implemented on the free tier — generous negative space, floating layered surfaces with blur + elevation, restrained monochrome-neutral palette with one accent per surface, first-class light/dark, reticent motion, one telling detail per surface. Concrete embodiments: Inter (SF Pro stand-in) + Instrument Serif (display accent) + Geist Mono (code), `backdrop-filter: blur()` with solid fallback, Radix neutral scales, Open Props elevation, reduced-motion collapse, detail density cap. Cites the free-tier constraint (SF Pro / New York are proprietary; licensed use requires an ADR).
- Propagated into dependent artifacts:
  - `## Operational Standards` → added "Design fidelity (per Principle VII)" audit (blur fallback, light/dark tokens, reduced-motion, focus-visible, no-hard-borders).
  - `## Governance` → version bumped to 2.1.0.
  - `## Development Workflow` → Reviews now check (e) Apple-Design fidelity.
  - `stack.md` cross-reference: Inter / Instrument Serif / Geist Mono ratified as the free substitutes.
- Wrote the constitution back with a fresh Sync Impact Report comment (2.0.0 → 2.1.0) and preserved the v2.0.0 header.

## Outcome

- ✅ Impact: Visual identity is now a constitutional principle, not a stylistic preference — every review checks Apple-Design fidelity, and every phase ships with a design-fidelity audit.
- 🧪 Tests: n/a (governance doc). No code build touched.
- 📁 Files: `.specify/memory/constitution.md`
- 🔁 Next prompts: apply the design language tokens (blur layering, elevation, one-accent) in `radix.css` / `custom.css`; record ADR-0003 if the Apple-Design decision needs a decision log; re-run `/sp.plan` for book-foundation with the (e) review check.
- 🧠 Reflection: Apple's design system is trademark-adjacent — the constitution intentionally frames it as "guided visual identity" on the free tier (Inter for SF Pro, CSS-native blur, no licensed assets), which keeps the project legally safe and financially free per Principle I.

## Evaluation notes (flywheel)

- Failure modes observed: none — the v2.0.0 file had no `[ALL_CAPS]` placeholders, so no clarification was needed.
- Graders run and results (PASS/FAIL): Governance doc version line matches Sync Impact Report (PASS) · dates ISO (PASS) · no unexplained bracket tokens (PASS)
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Draft the concrete design-token diff (blur/elevation/one-accent) on `edu-site/src/css/` as the first PR that satisfies the new (e) review check.