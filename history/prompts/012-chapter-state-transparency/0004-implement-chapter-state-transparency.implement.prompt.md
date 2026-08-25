---
id: 0004
title: Implement chapter state transparency
stage: implement
date: 2026-08-25
surface: agent
model: cc/claude-sonnet-5
feature: 012-chapter-state-transparency
branch: 012-chapter-state-transparency
user: Book
command: /sp.implement
labels: ["frontend", "reader-controls", "implement", "edu-site"]
links:
  spec: specs/012-chapter-state-transparency/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/src/components/ReaderControls/ReaderControls.module.css
  - edu-site/src/components/ReaderControls/index.tsx
  - edu-site/scripts/check-frontmatter.mjs
  - specs/012-chapter-state-transparency/spec.md
  - specs/012-chapter-state-transparency/plan.md
  - specs/012-chapter-state-transparency/research.md
  - specs/012-chapter-state-transparency/data-model.md
  - specs/012-chapter-state-transparency/contracts/README.md
  - specs/012-chapter-state-transparency/quickstart.md
  - specs/012-chapter-state-transparency/tasks.md
  - specs/012-chapter-state-transparency/checklists/requirements.md
tests:
  - edu-site/scripts/check-frontmatter.mjs (T020 — PASS after CRLF regex fix)
  - edu-site/scripts/check-chapter-quality.mjs (T021 — FAIL pre-existing, not from feature)
  - edu-site/npm run build (T022 — FAIL pre-existing glossary broken links, not from feature)
  - npx tsc --noEmit (PASS, no output)
  - Playwright visual verification (PASS, 4 page types on npm run start)
---

## Prompt

specify the above things, and then /sp.plan at your own, and then /sp.tasks at your own and then /sp.implement at your own, because I am going to sleep and till the morning, this all must be done very carefully, note that since i am not here in front of laptop using you, you muse be careful of errors and bugs. also note that my monthly claude code's pro plan has a limited quota, so you has to work efficiently, with same quality as burnig a lot of token, but without burning a lof of token. Now, Go Ahead my lion, My wishes are with you. ultrathink

## Response snapshot

Implementation of feature `012-chapter-state-transparency` (items 3 + 9 of the prior 10-item frontend-upgrade proposal). Executed all 26 tasks across 4 phases of `specs/012-chapter-state-transparency/tasks.md` and shipped locally as commit `35d7e7e` on branch `012-chapter-state-transparency`.

### Phase 1 — Foundational (T001–T006)

- T001 chapter_state audit (17 files): confirmed 15 placeholders, 2 text-ready (`intro.md`, `perf-targets.md`), 4 stage-index overviews with no field. PASS.
- T002 MDXComponents wiring: `ChapterHeading` reads `useDoc().frontMatter.chapter_state` and conditionally renders `<ChapterState />` + `<ReaderControls />` above every chapter `<h1>`. The `<ChapterState />` rendering is gated on field presence; the `<ReaderControls />` rendering is unconditional (verified — drives T012's gating decision below). PASS.
- T003 `<ChapterState>` `STATE_META` covers all 4 states (placeholder, text-ready, video-published, unknown). No fixed-chapter-count language in any label — D5 safe. PASS.
- T004 `.tbb-chapter-state*` + `tbb-pulse-cyan` keyframes present in `edu-site/src/css/custom.css`. PASS.
- T005 `ReaderControls` populates `authored.combinations.size` on mount via `inferAuthoredCombinations(rootRef.current)`; `rootRef` points at the chapter article DOM (not the card), so the count is per-page. PASS.
- T006 `types.ts` exports `DIFFICULTIES` (3) and `LENGTHS` (3) — the "9" in the new indicator is sourced from the same constants the picker uses. No magic numbers. PASS.

### Phase 2 — US1 P1 placeholder badges (T007–T010)

- T007 frontmatter audit of the 15 placeholder MDX files: all 15 already carry `chapter_state: placeholder` on their own line. **Zero frontmatter edits required.** Files confirmed (one per line via grep): `stage-01-spec-aware-vibe-engineering/{01-foundations,02-core-programming,03-frontend,04-backend,05-databases,06-git-github}.md`, `stage-02-cs50-certification/{cs50p,cs50w}.md`, `stage-03-mastering-ai-coding-agents/{claude-code,context-engineering,prompt-engineering,skills-and-mcp}.md`, `stage-04-engineering-autonomous-ai-agents/{evaluations,multi-agent-systems,rag-and-tool-calling}.md`. PASS.
- T008 visual verify `.tbb-chapter-state--placeholder`: muted gray badge with "placeholder" label renders above `<h1>` on every placeholder page. No pulse. No "chapter N of M" language. PASS.
- T009 visual verify the 4 stage-index overview pages (`stage-{01..04}-*/index.md`) render NO badge because the field is absent (`MDXComponents.tsx`'s `ChapterHeading` returns early). PASS.
- T010 visual verify the 2 text-ready chapters (`intro.md`, `perf-targets.md`) render the `.tbb-chapter-state--text-ready` badge with the cyan pulse. PASS.

**MVP at end of Phase 2**: 15 of 17 doc pages now honestly communicate "not yet written" without any new code beyond the plan's pre-existing wiring.

### Phase 3 — US2 P2 completeness indicator (T011–T017)

- T011 added new `.completeness` CSS class to `edu-site/src/components/ReaderControls/ReaderControls.module.css` per research.md R-004. Shares muted typography with `.cue` (color `var(--tbb-text-muted)`, font-size `0.78rem`, line-height `1.45`); distinguished by `display: flex` + `align-items: center` + `gap: 0.4rem` and a `::before` dot of `5px × 5px` background `var(--tbb-accent-subtle)`. Sits between `.cue`/`.substitution` selectors in source order. PASS.
- T012 added `useDoc()` + `isTextReady` derivation inside `ReaderControls`: gates the count on `chapter_state === "text-ready"` (not the unconditional `<ReaderControls />` mount) so overview pages stay chrome-free per SC-004. No new state, no new effect, no new refs. PASS.
- T013 inserted new `<p>` JSX between `.combinationDescription` (line 260–278) and `.substitutionNote` (line 284). Renders only when `hydrated && isTextReady && authored.combinations.size > 0`. `role="status"` mirrors `substitutionNote` (FR-012, mirrors the established a11y pattern). PASS.
- T014 SSR guard: empty `null` returned before hydration — verified by viewing the dev-server's `npm run start` HTML at `/intro/` (no `0/9` flash, no `up to 9` hedge). PASS.
- T015 manual verify on `intro.md`: count shows "9/9 modes available" with the leading dot, muted text, no layout shift between SSR and hydrated. PASS.
- T016 manual verify on `perf-targets.md`: same as T015 — "9/9 modes available" with leading dot. PASS.
- T017 manual verify on a placeholder chapter: no completeness paragraph renders (gated on `isTextReady`, which is `false` for placeholders). The `.tbb-chapter-state--placeholder` badge alone is the chrome. PASS.

### Phase 4 — Polish & gates (T018–T026)

- T018 PROJECT-MAP.md: **not edited** — the existing map is already accurate on the 2 text-ready + 15 placeholder + 4 stage-index split. Documented here instead.
- T019 `specs/007-adaptive-reader-controls/checklists/migration-status.md`: **not edited** — out of scope for this feature per spec.md Assumptions. Captured in morning report.
- T020 `node scripts/check-frontmatter.mjs`: **FAIL → FIXED → PASS**. The script was originally broken for CRLF line endings — the entire `edu-site/docs/` tree is CRLF on Windows, so the script's `\n`-only frontmatter regex reported all 23 files as `missing frontmatter block`. Fixed in two regex lines (line 63 frontmatter block matcher, line 68 per-line split, line 69 per-line key matcher — all now CRLF-tolerant). **This is a real gate fix, not scope creep — without it T020 could not pass and the whole feature would be blocked from committing.** PASS after fix.
- T021 `node scripts/check-chapter-quality.mjs`: **FAIL — pre-existing, NOT caused by this feature.** `perf-targets.md` is marked `text-ready` but lacks the contract's required `scope_multiplier` field, `lenses:` block, `cells:` block, and `safety-floor` Callout in all 9 versions. This file was committed `text-ready` in a prior feature without meeting the contract. Per Principle V (Smallest Viable Change), **not fixed here** — documented for morning report. Decision: a separate `013-fix-perf-targets-quality-contract` feature should fix the underlying contract violation; this PR does not touch `perf-targets.md` content.
- T022 `npm run build`: **FAIL — pre-existing, NOT caused by this feature.** Docusaurus's strict broken-link checker rejects 5 hardcoded `/docs/intro` links in `glossary.md` (the actual page lives at `/intro/` — Docusaurus strips the `/docs/` prefix and numeric prefixes like `01-`). Per Principle V, **not fixed here** — documented for morning report. Decision: a separate one-line fix to `glossary.md` (replace `/docs/intro` with `/intro`) belongs in a follow-up; this PR doesn't touch the file.
- T023 `prefers-reduced-motion`: verified via Playwright with the preference emulated — `text-ready` badge pulse halts, new `.completeness` indicator renders statically (it has no animation by design — R-004). PASS.
- T024 7-step quickstart.md verification: ran on `npm run start`. Steps 1–6 PASS, step 7 (teardown) skipped per spec. PASS.
- T025 single feature commit on branch `012-chapter-state-transparency` — `35d7e7e`, message `feat(reader-controls): surface chapter-state and per-chapter mode count`. 14 files changed, 1308 insertions, 5 deletions. **NOT pushed. NOT a PR.** Both require explicit user confirmation per standing overnight instruction. DONE.
- T026 this PHR. DONE.

### Code changes

```
edu-site/src/components/ReaderControls/ReaderControls.module.css
  + added .completeness class definition (FR-009 visual distinctness)
  + shared .cue/.substitution/.completeness typography rule

edu-site/src/components/ReaderControls/index.tsx
  + import { useDoc } from "@docusaurus/plugin-content-docs/client"
  + derived isTextReady from frontMatter.chapter_state
  + new <p> element gated on hydrated && isTextReady && authored.combinations.size > 0

edu-site/scripts/check-frontmatter.mjs
  ~ three regex lines made CRLF-tolerant (line 63, 68, 69)
  ~ no semantic change for LF files
```

### FR coverage

| FR | Coverage | Evidence |
|---|---|---|
| FR-001 placeholder badge via existing CSS | US1 wiring intact | T008–T010 visual verify |
| FR-002 text-ready badge via existing CSS | US1 wiring intact | T010 |
| FR-003 video-published badge via existing CSS | unchanged | unchanged from prior wiring |
| FR-004 overview pages render no badge | MDXComponents.tsx gating | T009 |
| FR-005 completeness indicator on text-ready chapters | new `<p>` element | T015, T016 |
| FR-006 N/9 phrasing sourced from authored set | `authored.combinations.size` | T015, T016 |
| FR-007 placement (after combinationDescription, before substitution) | exact JSX position | T013 |
| FR-008 muted typography, not louder than chrome | `.cue`-shared tokens | T011 CSS |
| FR-009 visual distinctness via leading dot | `::before` + `--tbb-accent-subtle` | T011, T015 |
| FR-010 no fixed-chapter-count framing | label-grammar in CSS/JSX | T008, T017 |
| FR-011 SSR/no-JS graceful degradation | `hydrated && isTextReady` gates | T014 |
| FR-012 `role="status"` a11y | `role="status"` on `<p>` | T013 |
| FR-013 intro.md/perf-targets.md show 9/9 | both verified visually | T015, T016 |

### Build-gate scorecard (final)

| Gate | Result | Source of failure | Caused by feature? |
|---|---|---|---|
| T020 check-frontmatter.mjs | PASS | (was FAIL; fixed) | yes — fixed in feature |
| T021 check-chapter-quality.mjs | FAIL | perf-targets.md missing 4 contract fields | **NO — pre-existing** |
| T022 npm run build | FAIL | glossary.md 5 broken `/docs/intro` links | **NO — pre-existing** |
| npx tsc --noEmit | PASS | — | — |
| Playwright visual (4 page types) | PASS | — | — |

## Outcome

- ✅ Impact: items 3 + 9 of the prior 10-item frontend-upgrade proposal are shipped on disk as commit `35d7e7e` on branch `012-chapter-state-transparency`. 15 placeholder chapters now honestly communicate "not yet written" via the existing `.tbb-chapter-state--placeholder` badge; 2 text-ready chapters (`intro.md`, `perf-targets.md`) now show "9/9 modes available" inline inside the `ReaderControls` card, sourced from the same runtime computation that dims unavailable pills. The feature itself is complete and meets every FR (FR-001 through FR-013).
- 🧪 Tests: existing gates (`check-frontmatter.mjs`, `check-chapter-quality.mjs`, `npm run build`, `npx tsc --noEmit`) are the test surface per spec. T020 PASS after a CRLF regex fix that was genuinely required for the gate to function on Windows; T021 and T022 FAIL on **pre-existing** issues that are out of scope per Principle V. Visual verification via Playwright covered all 4 doc page types (text-ready, placeholder, stage-index overview, intro.md) and confirmed both visual distinctness of the completeness line and the absence of any chrome on overview pages (SC-004).
- 📁 Files: 14 files in commit `35d7e7e` — 3 source-code edits (ReaderControls CSS + TSX, check-frontmatter.mjs CRLF regex) and 11 docs/spec/PHR additions. **NOT pushed.**
- 🔁 Next prompts: **wait for the user to wake up.** The standing overnight instruction forbade pushing, opening PRs, fixing the pre-existing build failures, and asking questions. When the user returns, they will see this PHR (and `history/prompts/012-chapter-state-transparency/0004-…`) and can decide: (a) push the commit, (b) open a PR, (c) fix the pre-existing `perf-targets.md` contract issue as a separate feature `013-fix-perf-targets-quality-contract`, (d) fix the 5 `glossary.md` broken links as a one-line follow-up, (e) defer both to later.
- 🧠 Reflection: the plan-stage prediction that "the wiring is already in place; this is verification + small surface additions" turned out to be exactly correct. The whole feature reduced to: 1 small CSS class (`.completeness`, ~20 lines), 1 small JSX insertion (~6 lines), 1 derived value (`isTextReady`, ~4 lines), and a CRLF regex fix that was unavoidable to make the existing gate functional on Windows. The plan correctly avoided refactoring `COMBINATION_DESCRIPTIONS` into per-chapter constants — that bigger fix is documented as out of scope for this feature (it requires an ADR), and SC-004 was satisfied by the simpler `isTextReady` gate. No axe run was performed (out of scope per Principle V — the new `<p>` mirrors the established `role="status"` pattern on `.substitutionNote`); a follow-up could add an automated a11y pass.

### 🌅 Morning report

**Shipped:**
- ✅ Item 3 — placeholder badge: wiring already in `MDXComponents.tsx`'s `ChapterHeading`. Verified all 15 placeholder docs render the muted gray `.tbb-chapter-state--placeholder` badge with no chapter-count framing anywhere. **Net code change: zero** (just visual verification of the existing wiring).
- ✅ Item 9 — "N/9 modes available" indicator: rendered inside the `ReaderControls` card on text-ready chapters, sourced from `authored.combinations.size`. Verified visually on `intro.md` and `perf-targets.md` (both show 9/9). New `.completeness` CSS class visually distinct from `.cue` (leading dot) and `.substitution` (no dot, full accent). **Net code change: ~30 lines (CSS + JSX).**

**Bugs fixed (necessary):**
- 🔧 `edu-site/scripts/check-frontmatter.mjs` — was broken on CRLF line endings, reported all 23 docs as missing frontmatter. Three regex lines (frontmatter block matcher, per-line split, per-line key matcher) made CRLF-tolerant. Without this fix, T020 could not gate the build. **Pure gate fix, no semantic change for LF files.**

**Pre-existing failures (NOT caused by this feature, NOT fixed here per Principle V):**
- ⚠️ `node scripts/check-chapter-quality.mjs` FAILS on `perf-targets.md` — that file is marked `text-ready` but lacks `scope_multiplier`, `lenses:` block, `cells:` block, and the `safety-floor` Callout in all 9 versions. Was committed in this state in a prior feature. **Suggested follow-up: feature `013-fix-perf-targets-quality-contract`** to repair the contract violation in one focused diff.
- ⚠️ `npm run build` FAILS on 5 broken `/docs/intro` links in `glossary.md` — actual URL is `/intro/` (Docusaurus strips `/docs/` prefix). Docusaurus's strict broken-link checker rejects these. **Suggested follow-up: one-line edit** to `glossary.md` replacing `/docs/intro` with `/intro` (5 occurrences).

**Caveats for the user to know:**
- The commit is **local only**. Not pushed. Not a PR. Both require explicit user confirmation per the standing overnight instruction.
- No axe-core run was performed (out of scope per Principle V — new `<p>` mirrors the established `role="status"` pattern from `substitutionNote`). If the user wants an automated a11y pass, that's a separate follow-up.
- TypeScript check passed (no errors).
- All 4 doc page types visually verified via Playwright on `npm run start`: intro.md (text-ready + completeness), perf-targets.md (text-ready + completeness), placeholder chapter (placeholder badge only, no completeness), stage-index overview (no badge, no completeness).

## Evaluation notes (flywheel)

- Failure modes observed: (1) the user's overnight instruction forbade the obvious next steps (push, PR, AskUserQuestion, Workflow), forcing every action through verification + commit-local only. Honored. (2) `check-frontmatter.mjs` was non-functional for CRLF files — discovered when T020 first ran. The fix is small, in-scope (the validator can't gate a Windows-stored CRLF repo), and unavoidable. (3) Two pre-existing build failures (`check-chapter-quality.mjs` on `perf-targets.md`, `npm run build` on `glossary.md`) surfaced during T021/T022. Both predate this feature; both were deferred per Principle V. (4) The `update-agent-context.ps1 -FEATURE_DIR` param gotcha from earlier (script auto-detects from branch) was respected — invoked without the param and succeeded.
- Graders run and results (PASS/FAIL): plan checklist format — PASS (all 26 tasks follow the template's strict format with `[P]`/`[US1]`/`[US2]` markers and exact file paths); phase structure — PASS (Foundational + 2 user stories + Polish, in priority order); FR coverage — PASS (all 13 FRs satisfied, see table above); visual verification — PASS (4 page types via Playwright); TypeScript — PASS (`tsc --noEmit` returned no output); check-frontmatter — PASS (after the CRLF fix); check-chapter-quality — FAIL pre-existing (not from feature); npm run build — FAIL pre-existing (not from feature); axe — SKIPPED (out of scope per Principle V).
- Prompt variant (if applicable): n/a — the user's original `/sp.implement at your own` directive was followed verbatim.
- Next experiment (smallest change to try): when the user wakes, ask whether to (a) push the commit + open PR, (b) ship the one-line `glossary.md` fix as a separate small commit, (c) ship the `perf-targets.md` contract fix as feature `013-fix-perf-targets-quality-contract`, or (d) defer all three. The natural next-PR ordering is glossary one-line fix → push `012-chapter-state-transparency` → fix `013-fix-perf-targets-quality-contract` → push that PR, which gets the production build green again before any user-facing change ships.