---
id: 0004
title: Implement story-driven introduction
stage: green
date: 2026-08-19
surface: agent
model: opus
feature: 006-storytelling-intro
branch: 006-storytelling-intro
user: Dell
command: /sp.implement
labels: [implement, content-rewrite, fact-check, pacing, build, commit]
links:
  spec: specs/006-storytelling-intro/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/006-storytelling-intro/verification/fact-mapping.md
  - specs/006-storytelling-intro/verification/pacing-review.md
  - specs/006-storytelling-intro/verification/source-url-check.md
  - specs/006-storytelling-intro/verification/terminology-audit.md
  - specs/006-storytelling-intro/verification/beat-outline.md
  - specs/006-storytelling-intro/verification/frontmatter-decision.md
  - specs/006-storytelling-intro/verification/before.md
  - specs/006-storytelling-intro/verification/reader-panel-survey.md
  - edu-site/docs/intro.md
  - edu-site/static/search-index.json (regenerated)
tests:
  - T001–T003 Setup — branch confirmed clean; verification dir created; before.md snapshotted (53 lines)
  - T004–T006 Foundational — fact-mapping scaffold (24 rows), beat-outline (Lemkin/ZavicoAutomation/Acevedo/DHH/Majors), frontmatter-decision (title + description + chapter_state text-ready)
  - T007–T008 US1 — Cold Open + Extreme A drafted in edu-site/docs/intro.md (Lemkin cold open → ZavicoAutomation + Acevedo stories → glossary block with 13 terms glossed)
  - T009 US2 — Extreme B drafted (Samsung → Stack Overflow → DHH arc → senior-dev coalition → Miyahira + Martone → university bans)
  - T010–T012 US3 — Shared Trap (Specification Poverty + cooking analogy + architect metaphor), Bridge (four stages + Beck quote + crane metaphor), CTA (who-this-is-for table + Stage-1 link + Sources section)
  - T013–T016 US4 — pacing-review.md (all rules PASS), fact-mapping.md (24/24 verified), source-url-check.md (43 unique URLs recorded, 3 internal links verified), terminology-audit.md (13/10 minimum PASS)
  - T017 Build — search-index regenerates 22 records; Docusaurus build succeeds; build/intro/index.html exists; pre-existing frontmatter validator blocks full npm run build on 21 unrelated placeholder files (out of scope per Navigation Contract §11)
  - T018 Reader panel — instrument ready; awaiting human responses (panel responses cannot be fabricated per Constitution III)
  - T019 Commit — feat(intro): rewrite as story-driven 30-minute narrative (006-storytelling-intro) at commit 48df7d2
  - T020 PHR — this file
---

## Prompt

> /sp.implement

## Response snapshot

- **Pre-check** (`check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks`): `FEATURE_DIR=specs/006-storytelling-intro`, `AVAILABLE_DOCS=[research.md, data-model.md, contracts/, quickstart.md, tasks.md]`. All design artifacts present.
- **Checklist scan** (`checklists/requirements.md`): 16 items, all complete. Proceed automatically per skill flow.
- **Phase 1 — Setup (T001–T003)**:
  - Verified branch `006-storytelling-intro` is active with a clean working tree (only the spec/006-storytelling-intro/ scaffolding plus history/prompts/006-storytelling-intro/ were untracked).
  - Created `specs/006-storytelling-intro/verification/`.
  - Snapshotted the current `edu-site/docs/intro.md` (53 lines) to `specs/006-storytelling-intro/verification/before.md`.
- **Phase 2 — Foundational (T004–T006)**:
  - `fact-mapping.md` scaffold (24 rows from research.md §A.6) — every row begins with `TBD` placeholders for prose_span / source_attached / min_word_budget_met / verified_by.
  - `beat-outline.md` — selected Cold Open = A1 Lemkin; Extreme A = A6 ZavicoAutomation + A3 Acevedo; Extreme B = B2 DHH + B4 senior-dev coalition; plus the choice of B5/B6 for the human-cost subsection.
  - `frontmatter-decision.md` — title `"Introduction: The Bridge Between Code and Engineering"`, description `"A 30-minute story of how AI coding agents split the industry into two extremes — and the bridge between them."`, `chapter_state: text-ready`.
- **Phase 3 — US1 (T007–T008)**: drafted the Cold Open (Lemkin → Karpathy Feb 2025 → Collins Word-of-the-Year Nov 2025 → "two halves" framing) and Extreme A (ZavicoAutomation → Acevedo → METR / Veracode / Fortune 50 / IBM-Cisco / 75% retained facts woven into the stories). Added an inline "The Words Behind the Buttons" subsection in Extreme A that glosses 13 foundational terms (`agent`, `prompt`, `model`, `context window`, `repository`, `dependency`, `deployment`, `authentication`, `authorization`, `rollback`, `test`, `build`, `API`) — well past the 10-term minimum. The first draft landed at 4,693 words (below the 6,800 SC-001 lower bound); expanded via the glossary block and an Extreme B human-cost subsection to 6,988 words — inside the band.
- **Phase 4 — US2 (T009)**: drafted Extreme B (Samsung May 2023 ban + quiet reversal → Stack Overflow Dec 2022 ban + >50% traffic collapse → DHH May 2025 → Jan 2026 → Apr 2026 arc → senior-developer coalition Majors/Gee/Goel/MS+CMU → Miyahira + Martone → university bans Nasre/IIT Madras → labor-market beat with Stanford DEL / LinkedIn / S&P / AWS / SO 2025 trust paradox). Empathy-before-cost rule honored throughout. The DHH two-line juxtaposition is used as the emotional pivot.
- **Phase 5 — US3 (T010–T012)**: drafted Shared Trap (Specification Poverty named + mirror-image symmetry of the two poles + cooking analogy + architect metaphor), Bridge (Spec-Driven Engineering named + four-stage table preserved + Beck quote + crane metaphor), and CTA (who-this-is-for table preserved + Stage-1/3/4 entry links + consolidated Sources section grouped by section with 43 unique URLs).
- **Phase 6 — US4 (T013–T016)**: populated all four verification artifacts. **T014 (fact-check, blocking) PASS** — 24/24 A.6 rows verified, every row above its minimum word budget, every row has the survey/publisher attached inline. **T013 (pacing) PASS** — every section opens with a hook (scene, question, contradiction, or direct address); every section closes with a curiosity transfer; no three-stat runs; sentence rhythm varies; the first 120 words open a question paid off in Shared Trap. **T015 (source URLs) PASS** — 43 unique URLs recorded, all internal links to existing Docusaurus routes, one typo (`421631421831`) caught and corrected to `421831` in the meta-Stack-Overflow URL. **T016 (terminology) PASS** — 13/10 minimum.
- **Phase 7 — Polish (T017–T020)**:
  - **T017 build**: `node scripts/generate-search-index.mjs` succeeded (22 records written to `edu-site/static/search-index.json`); `docusaurus build` succeeded (`build/intro/index.html` exists, route is `/intro`). **The full `npm run build` script chain still fails on a pre-existing repository issue**: `scripts/check-frontmatter.mjs` rejects 21 placeholder-stage docs that lack frontmatter blocks (`stage-01-spec-aware-vibe-engineering/01-foundations.md` through `stage-04…/rag-and-tool-calling.md`, plus `introduction.md`, `perf-targets.md`, and others). **None of these files are part of feature 006.** Per Navigation Contract §11 and the plan ("fix only intro.md content/frontmatter unless the error proves a pre-existing issue"), this is correctly classified as a pre-existing issue and is out of scope. Documented in this PHR.
  - **T018 reader panel**: drafted `reader-panel-survey.md` with the participant instructions, response form, and pass thresholds. **Panel responses cannot be fabricated** — they require actual human readers; per Constitution III (Co-Authored Text) the agent drafts the instrument and the project owner runs the panel.
  - **T019 commit**: `48df7d2 feat(intro): rewrite as story-driven 30-minute narrative (006-storytelling-intro)` — staged 24 files (modified intro.md + regenerated search-index.json; added 3 PHRs, spec/plan/research/data-model/4 contracts/quickstart/checklist/tasks/before, and 7 verification artifacts). The two pre-existing `.superdesign-login*.out` files are not staged.
  - **T020 PHR**: this file.

## Outcome

- ✅ **Impact**: `edu-site/docs/intro.md` is now a 6,988-word story-driven introduction that dramatizes two extremes (Lemkin/ZavicoAutomation/Acevedo on the surrender pole; Samsung/Stack-Overflow/DHH/Majors/Gee/Goel/Miyahira/Martone on the resistance pole), bridges them through Spec-Driven Engineering, and lands the four-stage syllabus as the curriculum on-ramp. All 24 mandatory retained facts from the current intro are woven into story payoffs and verified.
- 🧪 **Tests**:
  - SC-001 (word count 6,800–7,600): **PASS** — 6,988
  - SC-002 (≥2 verified stories per pole, ≥2,500 words each): **PASS**
  - SC-003 (zero fabrication): **PASS** — 24/24 facts mapped and sourced
  - SC-004 (cold-open is a real story): **PASS** — Lemkin/Replit opens the doc
  - SC-005 (reader can name both poles): **PENDING** — reader panel instrument ready; human responses required
  - SC-006 (build passes): **PARTIAL** — Docusaurus build succeeds; pre-existing frontmatter validator blocks the full `npm run build` chain (out of scope)
  - SC-007 (curriculum preserved): **PASS** — four stages, who-this-is-for, Stage-1 link, Promise sentence all present
  - SC-008 (Karpathy + Collins anchor beats): **PASS** — both dated correctly
  - SC-009 (pacing rule): **PASS** — no three-stat runs; hooks/transfers verified
  - SC-010 (≥10 terms glossed): **PASS** — 13/10
  - SC-011 (reader-engagement signal): **PENDING** — reader panel required
  - SC-012 (sources complete): **PASS** — 43 URLs recorded, internal links verified
  - SC-013 (mandatory retained facts): **PASS** — 24/24 verified
  - SC-014 (per-fact traceability): **PASS** — full mapping table at `verification/fact-mapping.md`
- 📁 **Files**:
  - Modified: `edu-site/docs/intro.md`, `edu-site/static/search-index.json`, `specs/006-storytelling-intro/tasks.md`
  - Added: 3 PHRs, 8 spec artifacts, 7 verification artifacts, 1 before.md snapshot
  - Committed in commit `48df7d2`
- 🔁 **Next prompts**: `/sp.git.commit_pr` to push the branch and open a PR; project owner runs the reader panel and records responses in `verification/reader-panel.md`; if any pre-existing placeholder frontmatter issues block downstream tooling, address them in a separate dedicated feature (not in 006).
- 🧠 **Reflection**: The decision worth recording — the upfront glossary subsection ("The Words Behind the Buttons") turned out to be the load-bearing editorial move that took the draft from 4,693 words (below the 6,800 SC-001 band) to 6,988 words without padding. It serves FR-013 (≥10 terms glossed), holds the SC-010 gate, *and* adds narrative weight because each term is anchored to a real consequence (API key in the browser, rollback without a backup, deployment crossing an environment boundary). The terms become handles the reader can use to steer — which is the *point* of the bridge thesis. A glossary sidebar would have failed the test; an embedded glossary in story context passes it.

## Evaluation notes (flywheel)

- **Failure modes observed**:
  1. **First draft short on word count.** Initial draft landed at 4,693 words — below the 6,800 SC-001 lower bound by ~2,100 words. Fixed by extending the glossary block (added the foundational-terms subsection in Extreme A) and adding the human-cost subsection in Extreme B (B5 Martone + B6 Miyahira). Both extensions served content quality, not word-count padding.
  2. **Citation typo caught during validation.** A grep for `AWS Builder's Library & DORA research\),\), 2025` caught a `),)` paren typo. Fixed in place. The same pass caught a near-miss on the meta-Stack-Overflow URL (`421631421831` vs. the correct `421831`) — typo was in this PHR's earlier draft, not in prose.
  3. **`npm run build` chain blocked by pre-existing frontmatter.** 21 unrelated placeholder docs (the entire stage-01/02/03/04 lecture shells, plus `introduction.md` and `perf-targets.md`) lack frontmatter blocks. The `scripts/check-frontmatter.mjs` validator rejects them. Documented as pre-existing and out of scope per Navigation Contract §11. Direct Docusaurus build (`npx docusaurus build` after the search index step) succeeds; the chain only fails at the frontmatter step.
  4. **Reader panel cannot be self-completed.** T018 is the human-facing activity; the agent prepares the instrument and the project owner runs the panel. SC-005 and SC-011 remain PENDING until panel responses are recorded.
  5. **Working directory drift.** After `Set-Location edu-site`, subsequent Python grep commands failed because they ran from `edu-site/`. Resolved by `cd` back to repo root before running analysis scripts.
- **Graders run and results (PASS/FAIL)**:
  - Body word count: **PASS** (6,988 in [6,800, 7,600])
  - URL inventory: **PASS** (43 unique, no typos, all internal links valid)
  - Frontmatter validity on `intro.md`: **PASS** (5 required keys present)
  - Fact-mapping 24/24: **PASS**
  - Pacing rules: **PASS**
  - Terminology ≥10: **PASS** (13/10)
  - Source-section completeness: **PASS**
  - Docusaurus build: **PASS** (build/intro/index.html exists)
  - search-index regenerated: **PASS** (22 records)
  - Full `npm run build` chain: **FAIL** (pre-existing frontmatter in 21 unrelated placeholder docs)
  - Reader panel: **PENDING** (human responses required)
- **Prompt variant (if applicable)**: n/a
- **Next experiment (smallest change to try)**: When the project owner runs the reader panel, the lowest-friction next experiment is to capture *which term from the glossary block the readers remember most*. If the answer concentrates on one term (e.g., `rollback`), that's a signal that the glossary is doing its job; if it's distributed, the block may need reframing around the consequences of each term rather than the term itself.