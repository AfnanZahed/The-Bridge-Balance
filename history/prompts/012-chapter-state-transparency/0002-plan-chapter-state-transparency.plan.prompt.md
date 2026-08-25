---
id: 0002
title: Plan chapter state transparency
stage: plan
date: 2026-08-25
surface: agent
model: cc/claude-sonnet-5
feature: 012-chapter-state-transparency
branch: 012-chapter-state-transparency
user: Book
command: /sp.plan
labels: ["frontend", "reader-controls", "plan", "edu-site"]
links:
  spec: specs/012-chapter-state-transparency/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/012-chapter-state-transparency/plan.md
  - specs/012-chapter-state-transparency/research.md
  - specs/012-chapter-state-transparency/data-model.md
  - specs/012-chapter-state-transparency/contracts/README.md
  - specs/012-chapter-state-transparency/quickstart.md
  - CLAUDE.md
tests:
---

## Prompt

specify the above things, and then /sp.plan at your own, and then /sp.tasks at your own and then /sp.implement at your own, because I am going to sleep and till the morning, this all must be done very carefully, note that since i am not here in front of laptop using you, you muse be careful of errors and bugs. also note that my monthly claude code's pro plan has a limited quota, so you has to work efficiently, with same quality as burnig a lot of token, but without burning a lof of token. Now, Go Ahead my lion, My wishes are with you. ultrathink

## Response snapshot

Filled `specs/012-chapter-state-transparency/plan.md` from the template — Summary (extracted from spec.md primary requirement), Technical Context (TypeScript/React in Docusaurus; no new dependencies; no storage; existing `npm run build`/`check-frontmatter`/`check-chapter-quality.mjs`/axe gates; web frontend only; no new bundle or LCP regressions; 17 doc pages), Constitution Check (clean pass against all seven principles from `.specify/memory/constitution.md` v2.1.1, with per-principle rationale), Project Structure (Option 1 single-project scoped to `edu-site/` with concrete paths under `edu-site/src/components/ChapterState/`, `edu-site/src/components/ReaderControls/`, `edu-site/src/css/`, `edu-site/src/theme/`, `edu-site/docs/`), Complexity Tracking (empty — no violations).

Generated Phase 0 `research.md` resolving the four micro-design questions the spec left implementation-agnostic: (R-001) indicator placement between `.combinationDescription` and `.substitution` paragraphs in the card; (R-002) SSR/no-JS graceful degradation via the existing `hydrated` state — render nothing before hydration, the real count after (no static "0/9" flash, no "up to 9" hedge); (R-003) accessibility ARIA pattern — `role="status"` mirroring the existing `substitutionNote` pattern (avoids two adjacent `aria-live="polite"` regions); (R-004) a new `.completeness` CSS class sharing `.cue`'s muted typography but distinguished by a `--tbb-accent-subtle` `::before` dot (visually distinct from no-dot `.cue` and full-accent `.substitution`); (R-005) build-gate order — `check-frontmatter.mjs` then `check-chapter-quality.mjs` then `npm run build`; (R-006) three deferred follow-ups (flicker/LCP eyeball checks, axe wiring scope-defer).

Generated Phase 1 artifacts: `data-model.md` (two entities — `ChapterState` page-level enum from frontmatter, `AuthoredCombinationCount` runtime-only `number` in `[1,9]` from `inferAuthoredCombinations`; both already exist in the system, this feature just documents them); `contracts/README.md` (intentionally empty — pure presentational feature, no new APIs/schemas); `quickstart.md` (7-step local verification: static checks → build → serve → visit 2 text-ready pages → visit 1 placeholder → visit 1 stage-index overview → keyboard/SR smoke → teardown). Ran `update-agent-context.ps1 -AgentType claude` successfully — auto-detected feature dir from git branch and updated `CLAUDE.md` with the new language/framework/database lines.

Re-evaluated Constitution Check post-design (added as a new sub-section at the end of the existing one) — clean pass on all seven principles, no design-phase violations. Verified the four resolved micro-decisions (R-001 placement, R-003 ARIA, R-004 styling, R-005 gate order) against Principles V (Smallest Viable Change), VII (Apple-Design Purity), and IV (SDD NON-NEGOTIABLE — this PHR is being written immediately after Phase 1).

Did NOT push, open a PR, or commit anything to git during plan stage — that is the explicit standing instruction from the user overnight, and the plan/commit boundary lives at `/sp.tasks` and `/sp.implement`.

## Outcome

- ✅ Impact: Plan, research, data-model, contracts, quickstart all written and self-validated; Constitution Check passes both pre- and post-design; agent context updated; ready for `/sp.tasks`.
- 🧪 Tests: none run (plan stage only); build-gate order documented in research.md R-005.
- 📁 Files: `specs/012-chapter-state-transparency/plan.md` (new, filled), `specs/012-chapter-state-transparency/research.md` (new, filled), `specs/012-chapter-state-transparency/data-model.md` (new, filled), `specs/012-chapter-state-transparency/contracts/README.md` (new, documents intentional emptiness), `specs/012-chapter-state-transparency/quickstart.md` (new, filled), `CLAUDE.md` (auto-updated by `update-agent-context.ps1`).
- 🔁 Next prompts: proceed autonomously to `/sp.tasks`, then `/sp.implement`, per the user's standing overnight instruction — no further user input available until morning.
- 🧠 Reflection: Discovering mid-plan that the existing `MDXComponents.tsx` already injects `<ChapterState>` from `useDoc().frontMatter.chapter_state` reduced the entire item-3 implementation to a frontmatter audit + optional CSS polish — exactly the kind of "smallest viable change" payoff Principle V is supposed to deliver. Mirroring that discovery for item 9 (`authored.combinations.size` is already in scope) collapsed the data-model from "design a new shape" to "document the existing shape," which is the right outcome and the reason Phase 1 was so small.

## Evaluation notes (flywheel)

- Failure modes observed: `update-agent-context.ps1` does not accept a `-FEATURE_DIR` parameter (initial guess); resolved by re-reading the script's `param()` block and discovering it auto-detects via `Get-FeaturePathsEnv` from the git branch — invoked without the param and succeeded on the first try.
- Graders run and results (PASS/FAIL): Constitution Check — PASS (all seven principles, pre- and post-design); Project Structure — Option 1 single-project, scoped to `edu-site/` only (consistent with the existing repo layout and Principle V); Complexity Tracking — empty (no violations to justify, expected outcome).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): if a future plan stage needs to pass an explicit feature dir to a `specify`/`plan`/`tasks` script, prefer reading the script's `param()` block first rather than guessing common parameter names — saved a 30-second retry cycle on this turn.
