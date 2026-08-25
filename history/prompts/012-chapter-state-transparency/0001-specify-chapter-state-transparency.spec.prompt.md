---
id: 0001
title: Specify chapter state transparency
stage: spec
date: 2026-08-25
surface: agent
model: cc/claude-sonnet-5
feature: 012-chapter-state-transparency
branch: 012-chapter-state-transparency
user: Book
command: /sp.specify
labels: ["frontend", "reader-controls", "spec", "edu-site"]
links:
  spec: specs/012-chapter-state-transparency/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/012-chapter-state-transparency/spec.md
  - specs/012-chapter-state-transparency/checklists/requirements.md
tests:
---

## Prompt

specify the above things, and then /sp.plan at your own, and then /sp.tasks at your own and then /sp.implement at your own, because I am going to sleep and till the morning, this all must be done very carefully, note that since i am not here in front of laptop using you, you muse be careful of errors and bugs. also note that my monthly claude code's pro plan has a limited quota, so you has to work efficiently, with same quality as burnig a lot of tokens, but without burning a lof of token. Now, Go Ahead my lion, My wishes are with you. ultrathink

## Response snapshot

Scoped tonight's single feature to items 3 + 9 of the prior 10-item frontend-upgrade proposal ("Chapter state transparency"): (a) placeholder chapters render a real designed not-yet-written state via the existing `.tbb-chapter-state--*` badges instead of default doc chrome, without implying a fixed chapter total (D5); (b) `text-ready` chapters' `ReaderControls` card surfaces an "N/9 modes available" count, reusing the same per-page authored-combination computation the component already runs to dim picker pills — no new data plumbing.

Created branch `012-chapter-state-transparency` via `create-new-feature.ps1` (recovered from two script-invocation errors: a positional-parameter/`-Number` binding failure on the first call, and a harness-level `A positional parameter cannot be found that accepts argument 'prompts'` error on the second call whose side effects — branch + `spec.md` template copy — had already succeeded; verified via direct git/filesystem inspection rather than re-running the script, and manually created the missing `history/prompts/012-chapter-state-transparency/` directory).

Reconciled the chapter-state ground truth via a fresh `Grep` of `chapter_state:` across `edu-site/docs/`: 2 text-ready (`intro.md`, `perf-targets.md`), 15 placeholder, 4 stage-index overview pages with no `chapter_state` field — superseding both `PROJECT-MAP.md`'s single-chapter claim and `reader-controls.md`'s stale reference to a nonexistent third chapter `introduction.md`. Read `specs/007-adaptive-reader-controls/checklists/migration-status.md` in full and determined it is stale/self-contradictory (its own summary line's arithmetic doesn't match its own table; its per-row "9/9 complete" claims contradict its own "fully migrated: 0" line) — concluded item 9's completeness count must be sourced from the live `AuthoredCombinations.ts` (`inferAuthoredCombinations`) runtime computation, not this file. Confirmed via that source file that unmarked prose always contributes exactly one authored combination (Intermediate · Balanced), resolving the 0/9-vs-1/9 edge case as always ≥1/9.

Wrote `specs/012-chapter-state-transparency/spec.md` in full: 2 prioritized user stories (P1 placeholder badges, P2 completeness indicator), edge cases, 13 functional requirements, 2 key entities, 6 measurable success criteria, and an Assumptions section documenting every judgment call made in place of `[NEEDS CLARIFICATION]` markers (zero markers used, per the user's stated unavailability overnight). Wrote and self-validated the Spec Quality Checklist — all items pass on first iteration.

Deferred, with reasons now on record in spec.md's Assumptions: item 1 (`COMBINATION_DESCRIPTIONS` fix — blocked on ADR consent), items 4/5/8 (command palette, reading-time-remaining, Timeline/FeatureGrid extension — too risky unsupervised), items 2/6/7/10 (too small/disjoint to justify their own spec).

## Outcome

- ✅ Impact: `spec.md` and `checklists/requirements.md` written and passing; branch `012-chapter-state-transparency` active; feature scoped and ready for `/sp.plan`.
- 🧪 Tests: none yet (spec stage only)
- 📁 Files: `specs/012-chapter-state-transparency/spec.md` (new, filled), `specs/012-chapter-state-transparency/checklists/requirements.md` (new)
- 🔁 Next prompts: proceed autonomously to `/sp.plan`, then `/sp.tasks`, then `/sp.implement`, per the user's standing overnight instruction — no further user input available until morning.
- 🧠 Reflection: grounding item 9 in the actual `AuthoredCombinations.ts` source (rather than trusting `reader-controls.md`'s pointer to `migration-status.md`) caught a real staleness bug in the repo's own docs before it could propagate into the new feature's data model.

## Evaluation notes (flywheel)

- Failure modes observed: `create-new-feature.ps1` fails when the feature description is passed positionally without an explicit `-Number` flag (PowerShell mis-binds it to the `Int32` parameter); a second, likely harness-level error occurred after the script's git/file side effects had already completed successfully — resolved by inspecting resulting state directly rather than blindly retrying.
- Graders run and results (PASS/FAIL): Spec Quality Checklist — PASS (all items, first iteration).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when invoking `create-new-feature.ps1` in future sessions, always pass `-Number` explicitly (even `0` for auto-detect) to avoid the positional-binding failure mode.
