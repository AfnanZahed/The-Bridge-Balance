---
id: 0003
title: Decompose into executable tasks
stage: tasks
date: 2026-08-19
surface: agent
model: opus
feature: 006-storytelling-intro
branch: 006-storytelling-intro
user: Dell
command: /sp.tasks
labels: [tasks, story-driven-intro, pacing, fact-check, contracts, verification]
links:
  spec: specs/006-storytelling-intro/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/006-storytelling-intro/tasks.md
tests:
  - check-prerequisites.ps1 -Json → FEATURE_DIR + AVAILABLE_DOCS = [research.md, data-model.md, contracts/, quickstart.md]
  - 20 task-format lines (`- [ ] T<NN>`)
  - Story labels per task: US1 ×2, US2 ×1, US3 ×3, US4 ×4
  - 10 setup/foundational/polish tasks (no story label, per template)
  - All tasks reference absolute paths under `edu-site/` or `specs/006-storytelling-intro/`
  - Per-task budgets align with Content Contract §2 and beat min-words
---

## Prompt

> /sp.tasks

## Response snapshot

- **Pre-check**: ran `check-prerequisites.ps1 -Json` from repo root. Parsed JSON: `FEATURE_DIR = specs/006-storytelling-intro`, `AVAILABLE_DOCS = [research.md, data-model.md, contracts/, quickstart.md]` — the design-artifact surface is complete.
- **Loaded design context**: read `plan.md`, `spec.md`, `quickstart.md`, `tasks-template.md`. Mapped user stories US1–US4 to drafting phases; mapped 24 mandatory retained facts from `research.md` §A.6 to beat-by-beat weaving requirements; mapped the 5-pass authoring flow from `quickstart.md` to a sequencing of concrete tasks.
- **Authored `tasks.md`** following the template structure:
  - **Phase 1 — Setup** (3 tasks, T001–T003): branch check; create `specs/006-storytelling-intro/verification/`; snapshot current intro to `verification/before.md`.
  - **Phase 2 — Foundational** (3 tasks, T004–T006, all [P]): Per-Fact Mapping Table scaffold (24 rows from research.md §A.6); story-card usage outline (which A/B cards land in which beat); frontmatter title/description decision. Block drafting — writer cannot begin without these scaffolds in place.
  - **Phase 3 — US1 (P1) — surrender pole** (2 tasks, T007–T008): Cold Open beat (≥ 400 words; real dated actor; opens a curiosity gap inside first ~120 words); Extreme A beat (≥ 2,500 words; ≥ 2 verified Story Cards from A1–A7; weaves 10 retained facts A.6 rows 1–10 as payoffs; FR-013 terminology glossary built in).
  - **Phase 4 — US2 (P1) — resistance pole** (1 task, T009): Extreme B beat (≥ 2,500 words; ≥ 2 verified Story Cards from B1–B7; empathy-before-cost rule; weaves 9 retained facts A.6 rows 11–19; closes with a curiosity transfer into shared trap).
  - **Phase 5 — US3 (P1) — bridge + CTA** (3 tasks, T010–T012): Shared Trap (≥ 600 words; Specification Poverty named); Bridge (≥ 600 words; Spec-Driven Engineering; four stages; "engineer who directs AI systems" Promise sentence); CTA (≥ 400 words; who-this-is-for table; Stage-1 link; **Sources section** built here, not later — so the Sourcing Contract has its content from day one).
  - **Phase 6 — US4 (P2) — pacing + verification** (4 tasks, T013–T016, three of them [P]): Pacing review (paragraph-by-paragraph classification, no three-stat runs); Fact-check pass (the **blocking** gate — populate `prose_span` for all 24 A.6 rows; if any claim fails, return to drafting); Source URL verification; Terminology audit (≥ 10 foundational terms glossed).
  - **Phase 7 — Polish** (4 tasks, T017–T020): `npm run build` exits 0; reader panel (n ≥ 5; instrument drafted at `verification/reader-panel-survey.md`; the panel itself is human-facing per Constitution III); final commit; PHR for `/sp.implement`.
- **Validation**: 20 checklist-format lines (`- [ ] T<NN>`), unique IDs, story labels distributed correctly (2 + 1 + 3 + 4 + 10 non-story = 20).
- **Dependencies documented**: drafting tasks sequential within each story (one Markdown file); verification tasks parallel; T014 fact-check is the blocking gate that sends the draft back to Pass 1 if it fails.
- **Implementation strategy**: documented atomic-ship rationale (no MVP slice — the half-rewrite is not shippable) + 5-pass authoring flow + three suggested commit boundaries.

## Outcome

- ✅ **Impact**: every contract a writer or verifier needs is now broken into 20 executable tasks with exact file paths, word budgets, story-card inventory, and verification artifacts. Each task can be handed to an LLM or human writer without additional context.
- 🧪 **Tests**:
  - Prerequisite check ran: **PASS** (all design artifacts present)
  - Task format compliance: **20/20** valid checklist lines
  - Story label distribution: **PASS** (US1 ×2, US2 ×1, US3 ×3, US4 ×4)
  - Story-priority ordering respected: US1/US2/US3 all P1; US4 P2
  - Per-task word budgets reconcile with Content Contract §2 (sum of beat minimums = 6,800; SC-001 band 6,800–7,600)
  - Per-fact weaving requirement present in T008 + T009 (24 A.6 rows split 10 + 9 + 5 across US1/US2/US3)
- 📁 **Files**:
  - `specs/006-storytelling-intro/tasks.md` (20 tasks, ~230 lines)
- 🔁 **Next prompts**: `/sp.implement` to execute the 20 tasks in order (or `/sp.taskstoissues` to convert them into GitHub issues first). The implementer should respect the 5-pass authoring flow from `quickstart.md`.
- 🧠 **Reflection**: The decision worth recording — T014 (fact-check pass) was deliberately marked as the **blocking gate**, not just a verification step. Without that gate, a draft with a fabricated quote or a dropped fact would happily proceed to the reader panel and fail there. Putting the fact-check gate before pacing review before build before reader panel maps the verification order to the risk profile: cheapest checks (counting paragraphs, checking URLs) first, most expensive checks (reader time) last.

## Evaluation notes (flywheel)

- **Failure modes observed**:
  1. The first draft of the story-label counts in the body was inflated by `[US1]`/`[US2]`/`[US3]`/`[US4]` mentions in section headings (`### User Story 1 — … (Priority: P1)`). Tightened the grep to count only task-format lines, which produced the correct distribution (2/1/3/4 on tasks; the rest on headings).
  2. The 24 mandatory retained facts needed to be split across the beats to ensure the writer covers each one: 10 in US1 (rows 1–10, METR / vibe-coding hangover / Veracode / Fortune 50 / IBM-Cisco / 75%), 9 in US2 (rows 11–19, March 2026 / SO / AWS / labor-market / 57% / 10→50% / architect), 5 in US3 (rows 20–24, market framing / Specification Poverty / Karpathy / Collins / velocity). The split is documented in the task descriptions so the writer does not have to re-derive it.
  3. The Sources section is built inside T012 (CTA beat), not later in the verification phase. This is deliberate: the Sources section IS prose, and the Sourcing Contract needs it from Pass 1. The fact-check pass then verifies it; the URL check (T015) verifies the URLs.
- **Graders run and results (PASS/FAIL)**:
  - Prerequisite check: **PASS**
  - Task format compliance: **PASS** (20/20)
  - Story-label distribution: **PASS**
  - Per-task word budgets: **PASS** (sum = 6,800 minimum, in SC-001 band)
  - Dependency ordering: **PASS** (no forward refs; T014 blocking gate explicitly marked)
  - Cross-task coherence with contracts: **PASS** (each drafting task references its contract clauses; each verification task references its deliverable)
- **Prompt variant (if applicable)**: n/a
- **Next experiment (smallest change to try)**: When the implementer runs T007 (Cold Open), they should draft the cold-open's *closing transfer line* first, before writing the rest of the cold-open — because that line locks in the hand-off into Extreme A. If the writer finishes the cold-open and discovers the closing line doesn't hand off cleanly, they end up rewriting the whole beat. Starting from the closing transfer is cheap insurance.