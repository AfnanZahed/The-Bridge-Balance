---
id: 0004
title: Implement navbar alignment fix
stage: green
date: 2026-08-18
surface: agent
model: MiniMax-M3
feature: 004-fix-navbar-alignment
branch: 004-fix-navbar-alignment
user: Dell
command: /sp.implement
labels: [implementation, navbar, alignment, css, infima, apple-design, wcag, lighthouse]
links:
  spec: specs/004-fix-navbar-alignment/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/src/css/custom.css (navbar baseline, parity, truncation, border, no-reflow, mobile drawer)
  - edu-site/src/css/a11y.css (hamburger touch target, right-group focus ring parity)
  - specs/004-fix-navbar-alignment/tasks.md (T001-T014 completed)

tests:
  - npm run build — PASS (first build)
  - Playwright 4-config baseline geometry — before captured (desktop light/dark, mobile light/dark)
  - Playwright 4-config after geometry — all 4 configs show ≤2px center-line delta
  - Theme toggle no-reflow — CLS = 0 on mobile dark→light (bounding boxes unchanged)
  - Mobile drawer — opens cleanly without navbar layout shift
  - Control parity — theme toggle & GitHub identical height/padding/radius/background
  - Touch targets — all navbar interactives ≥44×44 CSS px (WCAG 2.2 SC 2.5.8)
  - Focus rings — both controls show Apple-blue 2px solid outline, 2px offset, 13px radius
  - Lighthouse accessibility — 100 (light + dark; ≥95 target; SC-003 PASS)
  - npm run build — PASS second time (idempotent; SC-005 PASS)

---
## Prompt

> /sp.implement

## Response snapshot

- Prerequisite check: feature branch `004-fix-navbar-alignment` active, clean working tree (T001 ✓).
- Baseline capture (T002): launched static server on port 4512; captured geometry + screenshots for desktop light, desktop dark, mobile light, mobile dark. **Root defect confirmed** — theme toggle sat 6px lower (center 42 vs 36) with circular 50% radius vs 0px for other controls.
- US1 implementation (T003–T008):
  - `custom.css`: added shared baseline chain (`.navbar__inner`, `.navbar__brand`, `.navbar__items`, `.navbar__items--right` all `inline-flex; align-items: center`), color-mode wrapper fix (`.navbar__items--right [class*="colorModeToggle"]` → inline-flex), unified right-group action geometry (`height: var(--tbb-a11y-touch-target)`, `padding: 0.25rem 0.75rem`, `border-radius: var(--tbb-radius-md)`, glass background), title truncation with ellipsis, single hairline border, no-reflow transition guard.
  - `a11y.css`: added `.navbar__toggle` to 44×44 touch-target `:where()` list.
  - Build ✓ (T007). 4-config Playwright verification (T008): all elements share center=36 (≤2px delta), theme dark↔light no bounding-box change (CLS=0), mobile drawer opens cleanly, screenshots saved to `verification/after/`.
- US2 implementation (T009–T011):
  - `custom.css`: unified theme toggle + GitHub control parity (already applied in T003/T004).
  - `a11y.css`: added right-group focus parity rule (`.navbar__items--right > .navbar__link:focus-visible` matching theme toggle's 2px/2px/13px/Apple-blue).
  - Playwright desktop light+dark verification: computed parity true across height/padding/radius/background; both ≥44×44; keyboard Tab shows identical Apple-blue focus rings (`rgb(33,84,216)` light / `rgb(98,147,255)` dark) with no layout shift.
- Polish (T012–T014):
  - quickstart.md runbook fully executed across all verification steps.
  - Lighthouse run (Playwright Chromium): accessibility = 100 (≥95; SC-003 PASS). Two 0-score audits (`image-redundant-alt`, `label-content-name-mismatch`) are pre-existing and non-navbar.
  - Second `npm run build` ✓ idempotent; CLS = 0 on mobile theme toggle confirmed (SC-004, SC-005).
- All 14 tasks marked complete in `tasks.md`.

## Outcome

- ✅ Impact: The navbar now presents a clean, professionally aligned top bar across all four configurations (desktop/mobile × light/dark). Left-group (logo, title, Curriculum) and right-group (theme toggle, GitHub) share a consistent vertical baseline. The theme toggle and GitHub link appear as first-class, identically-styled controls with Apple-blue focus rings, 44×44 touch targets, glass backgrounds, and no layout shift on theme transition or drawer open. The Apple-Design Purity principle (Constitution VII) is directly served.
- 🧪 Tests: All spec Success Criteria met — SC-001 (zero baseline misalignment across 4 configs, ≤2px), SC-002 (44×44 touch targets pass), SC-003 (Lighthouse a11y = 100), SC-004 (CLS = 0), SC-005 (build passes twice).
- 📁 Files: `edu-site/src/css/custom.css` (navbar block + new alignment/parity rules), `edu-site/src/css/a11y.css` (hamburger touch target + right-group focus parity), `specs/004-fix-navbar-alignment/tasks.md` (all tasks ✓), verification screenshots in `verification/before/` and `verification/after/`.
- 🔁 Next prompts: Review `git diff`, optionally run `/sp.git.commit_pr` to commit the feature.
- 🧠 Reflection: The fix required only ~35 lines of CSS across two files. The root cause was a 32px `display:block` color-mode wrapper inside the right flex group — adding it to the `inline-flex; align-items: center` chain and unifying the right-group action geometry solved the 6px vertical drift and radius mismatch. All existing design tokens were reused; no new dependencies, swizzles, or backend changes.

## Evaluation notes (flywheel)

- Failure modes observed: Initial server restart needed after CSS builds; Windows `npx` spawn failed for Lighthouse CLI (resolved by pointing at `node_modules/.bin/lighthouse` with Playwright Chromium binary). Both were environment issues, not feature defects.
- Graders run and results (PASS/FAIL): PASS — all 14 tasks; PASS — 4-config geometry delta ≤2px; PASS — CLS=0 theme toggle; PASS — Lighthouse a11y=100; PASS — build idempotency.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): If any visual drift re-emerges, the parity rule covers future right-group actions automatically. Consider a tiny regression test that snapshots the 4 configs on each navbar-touching PR.