# Tasks: `006-storytelling-intro` — Story-Driven Introduction (30-Min Read)

**Input**: Design documents from `/specs/006-storytelling-intro/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md` (verified story + fact pool), `data-model.md` (editorial entities), `contracts/` (content / sourcing / pacing / navigation), `quickstart.md` (5-pass authoring runbook)
**Tests**: Verification tasks are REQUIRED by the spec's Success Criteria (SC-001..SC-014) — Pass-2 fact-check, Pass-3 pacing review, Pass-4 build, Pass-5 reader panel.

**Organization**: Tasks are grouped by user story (US1–US4). Because the rewrite touches **one** Markdown file (`edu-site/docs/intro.md`), drafting tasks are sequential within a story; planning and verification tasks are parallel where they touch different artifacts.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files / different artifacts, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`, `[US4]`). Setup / Foundational / Polish phases have NO story label.
- Include exact file paths in descriptions.

---

## Phase 1: Setup (Branch + Working Tree)

**Purpose**: Confirm the working tree is clean, the branch is active, and the verification directory exists.

- [x] T001 Verify the worktree is on branch `006-storytelling-intro` with a clean `git status` (no unrelated edits)
- [x] T002 Create the verification directory `specs/006-storytelling-intro/verification/` for the Pass-2 fact-mapping artifact, the Pass-3 pacing-review artifact, and the Pass-5 reader-panel artifact
- [x] T003 [P] Snapshot the current `edu-site/docs/intro.md` to `specs/006-storytelling-intro/verification/before.md` so the before/after diff is reproducible

**Checkpoint**: Branch confirmed, verification dir exists, current intro archived.

---

## Phase 2: Foundational (Scaffolds the Writer Will Use)

**Purpose**: Build the per-fact mapping scaffold, the story-card usage outline, and the frontmatter decision BEFORE any prose is written. The writer uses these during Pass 1 to avoid the "weave the stat in somewhere" failure mode.

- [x] T004 Build the Per-Fact Mapping Table scaffold at `specs/006-storytelling-intro/verification/fact-mapping.md` — one row per research.md §A.6 fact (24 rows) with `prose_span` empty; columns: `id`, `claim`, `survey/source`, `date`, `min_word_budget`, `new_prose_location`, `source_attached_inline_or_footnote`, `min_word_budget_met`, `verified_by`, `date_verified`
- [x] T005 [P] Build the story-card usage outline at `specs/006-storytelling-intro/verification/beat-outline.md` — choose which Story Cards land in which beat (Cold Open uses A1/A3/A4/A6; Extreme A uses A1+A3+A4+A6 or other combination ≥2 cards; Extreme B uses B2+B4+B5+B7 or other combination ≥2 cards; record the choice)
- [x] T006 [P] Decide on the rewritten page's `title` and `description` frontmatter values at `specs/006-storytelling-intro/verification/frontmatter-decision.md` — candidates from the Content Contract: `"Introduction — Why This Book Exists"` (current) vs. `"Introduction: The Bridge Between Code and Engineering"` (sharpened); and the candidate description string; record the chosen values

**Checkpoint**: All three scaffolds exist. The writer can begin Pass 1 (drafting) without inventing metadata.

---

## Phase 3: User Story 1 — The surrender pole (Priority: P1) 🎯

**Goal**: Cold Open beat + Extreme A beat (blind vibe coding) dramatized through ≥2 verified Story Cards from research.md §A.1, with the A.6 rows 1–10 retained facts woven into story payoffs.

**Independent Test**: Read the first ~1,500 words of the rewritten `edu-site/docs/intro.md`. Identify (a) a real, dated, named person/team whose story opens the section, (b) the moment the student can name the pattern without being told, and (c) a basic AI-coding term (agent / prompt / model / API / deployment / repository / testing / security boundary / auth) the story implicitly teaches.

### Implementation for User Story 1

- [x] T007 [US1] Draft the **Cold Open** beat in `edu-site/docs/intro.md` (≥ 400 words; opens with a real, dated, named actor — pick from Story Cards A1, A3, A4, A6; opens a curiosity gap inside the first ~120 words; closes with a line that transfers tension into the Extreme A beat; preserves valid frontmatter from `verification/frontmatter-decision.md` and adds a `30 min read · ~7,200 words · updated 2026-08-19` meta line per FR-014 / Content Contract §6)
- [x] T008 [US1] Draft the **Extreme A (blind vibe coding)** beat in `edu-site/docs/intro.md` (≥ 2,500 words; dramatizes ≥ 2 distinct Story Cards from research.md §A.1 with hooks from the research pool; weaves the 10 mandatory retained facts A.6 rows 1–10 (METR 19%, 63% debugging, vibe coding hangover, Veracode 45%, Java 70%, 2.7× vulnerability density, hardcoded credentials 2×, Fortune 50 10×, IBM/Cisco 20–30%, 75% by 2026) as payoffs inside the stories — NOT as a statistics wall; honors FR-009 first-person attribution and FR-010 empathy (vibe coding's momentum treated as understandable before the bill); closes with a curiosity-transfer line into Extreme B; FR-013 terminology glossary built in: at least three of {agent, prompt, model, API, deployment, repository} glossed in plain language at first use)

**Checkpoint**: US1 complete when the first ~1,500 words tell a story (not a dossier), Extreme A is ≥ 2,500 words with ≥ 2 verified story cards, all 10 retained facts are present in the prose, and the closing line hands off to the next beat. Re-read aloud to confirm dopamine pacing before proceeding to US2.

---

## Phase 4: User Story 2 — The resistance pole (Priority: P1)

**Goal**: Extreme B (AI resistance) dramatized through ≥ 2 verified Story Cards from research.md §A.2, with the A.6 rows 11–19 retained facts woven into story payoffs. Empathy before cost is the rule.

**Independent Test**: Read the next ~1,500 words. Identify (a) at least two named, dated, sourced resistance stories, (b) the line that names the shared cause ("they couldn't see what they couldn't see, so they refused"), and (c) a specific cost of refusal surfaced in one of the stories.

### Implementation for User Story 2

- [x] T009 [US2] Draft the **Extreme B (AI / coding-agent resistance)** beat in `edu-site/docs/intro.md` (≥ 2,500 words; dramatizes ≥ 2 distinct Story Cards from research.md §A.2 — recommended pairings: B2 DHH arc + B4 senior-dev coalition, OR B4 + B7 university bans; honors FR-010 empathy clause — validate the resistance's reasons (security, mastery, professional pride, identity) BEFORE showing the cost; weaves the 9 mandatory retained facts A.6 rows 11–19 (March 2026 30+ models, SO 84%/29%/49k/11-point-drop, AWS 40% less/2× defects, entry-level -40%, big tech -50%, 22–25 -20%, 57% hiring managers, 10%→50% AI/ML, architect +50%) as payoffs inside the stories; closes with a curiosity-transfer line into the shared-trap beat; FR-013 terminology glossary continued: ≥ 3 more foundational terms glossed at first use — auth, rollback, dependency, test, build)

**Checkpoint**: US2 complete when the resistance pole reads with empathy, both extremes are dramatized with ≥ 2 verified stories each, and the closing line hands off to the shared-trap beat. Re-read aloud to confirm pacing and tone.

---

## Phase 5: User Story 3 — The bridge thesis, the four stages, and the call to action (Priority: P1)

**Goal**: Shared Trap (Specification Poverty) + Bridge (Spec-Driven Engineering, four stages, the Promise) + CTA (who-this-is-for, Stage-1 link, Sources). This lands the book's reason for existing.

**Independent Test**: Read the final ~1,000 words. Identify (a) the named bridge discipline (Spec-Driven Engineering), (b) the four stages (Stage 1 Foundations → Stage 2 CS50 Certification → Stage 3 Mastering AI Coding Agents → Stage 4 Engineering Autonomous AI Agents), (c) the "who this is for / start here" guidance, and (d) the Stage-1 CTA link to `/stage-01-spec-aware-vibe-engineering/`. Pass = all four present and woven into prose.

### Implementation for User Story 3

- [x] T010 [US3] Draft the **Shared Trap** beat in `edu-site/docs/intro.md` (≥ 600 words; names the "Specification Poverty" term with a one-sentence definition per A.6 row 21; frames both extremes as growing from the same root — abdication of judgment; transitions into the Bridge beat without recap)
- [x] T011 [US3] Draft the **Bridge (Spec-Driven Engineering)** beat in `edu-site/docs/intro.md` (≥ 600 words; names the discipline; lands the four-stage syllabus (Stage 1 → Stage 4) — preserved as table OR as inline prose narrative per Content Contract §5; preserves the "engineer who directs AI systems" Promise sentence per FR-006; A.6 row 20 thesis ("differently prepared ones; the bar has shifted, not lowered") woven into prose)
- [x] T012 [US3] Draft the **CTA** beat in `edu-site/docs/intro.md` (≥ 400 words; preserves the "Who this is for / start here" table or mini-list with the three reader profiles (new to programming → Stage 1; comfortable with code → Stage 3; shipping agents → Stage 4) per Content Contract §5; preserves the Stage-1 link to `/stage-01-spec-aware-vibe-engineering/`; **builds the consolidated Sources section** listing every source used inline with publisher + date + URL, grouped by section; the Sources section is what the Sourcing Contract consumes)

**Checkpoint**: US3 complete when the closing beat reads as a coherent book on-ramp — bridge, syllabus, who-this-is-for, Stage-1 CTA, and Sources all present. The total body word count is now in `[6800, 7600]` per SC-001.

---

## Phase 6: User Story 4 — Pacing and Engagement (Priority: P2)

**Goal**: Quality pass across the entire rewritten `edu-site/docs/intro.md`. Verify dopamine architecture (no 3-stat walls, hooks on every opener, curiosity transfers on every closer), zero fabrication, all source URLs live, and ≥ 10 foundational terms glossed in context.

**Independent Test**: Read the full doc straight through. Confirm (a) every section opens with a hook, (b) no run of 3 consecutive paragraphs contains only statistical claims, (c) every section ends with a curiosity-transfer line, (d) sentence rhythm varies, (e) every named person/quote/statistic/incident traces to research.md §A or the Sources section, (f) every URL in the Sources section resolves.

### Implementation for User Story 4

- [x] T013 [US4] **Pacing review** — populate `specs/006-storytelling-intro/verification/pacing-review.md` with one row per paragraph (columns: `#`, `beat`, `opening_clause`, `type` ∈ {scene, stat, teacher-aside, transition, quote}, `hook_present`, `transfer_present`, `sentence_rhythm_ok`, `notes`); enforce the no-three-stat-run rule (§3.1 of Pacing Contract), the hook-on-every-opener rule (§3.2), the closing-transfer rule (§3.3), and the sentence-rhythm rule (§3.4). Flag any paragraph that violates; revise `edu-site/docs/intro.md` to fix
- [x] T014 [P] [US4] **Fact-check pass** — populate `specs/006-storytelling-intro/verification/fact-mapping.md` with `prose_span` and `source_attached_inline_or_footnote` for all 24 A.6 rows; audit every named person, direct quote, statistic, and incident in `edu-site/docs/intro.md` for traceability to `research.md` §A or the Sources section; first-person stories must be attributed as such (FR-009); handle-only actors retain their handles — no names invented; survey sample sizes + caveats honoured per Sourcing Contract §4. If any claim cannot be sourced, **return to the drafting pass (T007–T012) and cut or attribute** — this is a blocking gate
- [x] T015 [P] [US4] **Source URL verification** — open every URL in the rewritten `edu-site/docs/intro.md` (inline citations + Sources section) and confirm each resolves; record the navigation result at `specs/006-storytelling-intro/verification/source-url-check.md`; replace any dead or incorrect URLs before continuing
- [x] T016 [P] [US4] **Terminology audit** — tag every foundational term glossed at first use in `edu-site/docs/intro.md` (target: ≥ 10 of {agent, prompt, model, context window, deployment, API, authentication, repository, dependency, rollback, test, build}); record the tag list at `specs/006-storytelling-intro/verification/terminology-audit.md`. If short of 10, return to drafting and weave in the missing glosses

**Checkpoint**: US4 complete when all four verification artifacts (pacing, fact-mapping, source-url-check, terminology-audit) are populated and zero blocking issues remain.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final build verification, reader panel, ship commit, PHR.

- [x] T017 Run `cd edu-site && npm run build` and confirm exit 0; verify frontmatter validation passes; verify no broken Markdown / missing-image / broken-internal-link warnings; verify `edu-site/static/search-index.json` was regenerated and includes the rewritten Introduction; verify the generated route is still `/intro` (SC-006, Navigation Contract §8)
- [x] T018 [P] Reader panel — draft the survey instrument at `specs/006-storytelling-intro/verification/reader-panel-survey.md` (questions: total reading time, can-they-name-both-extremes, can-they-state-bridge-thesis, did-it-feel-like-a-story-or-list, which-scene-or-transition-remembered); recruit n ≥ 5 first-time readers; collect responses; record results at `specs/006-storytelling-intro/verification/reader-panel.md`. Pass when ≥ 4/5 can name both extremes + the bridge AND ≥ 4/5 describe the page as a story/narrative rather than a list AND ≥ 4/5 finish in ≤ 32 minutes (SC-005, SC-011). If the panel fails, revise the prose and re-run Pass 3 → Pass 5
- [ ] T019 [P] Final commit — stage `edu-site/docs/intro.md` + the four verification artifacts; commit with the message `feat(intro): rewrite as story-driven 30-minute narrative (006-storytelling-intro)`; verify `git status` is clean
- [ ] T020 PHR for `/sp.implement` — write `history/prompts/006-storytelling-intro/0003-implement-storytelling-intro.green.prompt.md` capturing the final implementation summary, what was actually shipped, and any deviations from the plan

**Checkpoint**: Build is green, reader panel passes, commit lands, PHR is recorded.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup (T001–T003). **BLOCKS** all drafting tasks.
- **User Story 1 (Phase 3)**: T007 cold-open must precede T008 Extreme A (both touch `edu-site/docs/intro.md`; the cold-open establishes voice). US1 must complete before US2.
- **User Story 2 (Phase 4)**: T009 depends on US1 closing transfer (same file). Must complete before US3.
- **User Story 3 (Phase 5)**: T010 → T011 → T012 (sequential, same file). Must complete before US4 verification passes.
- **User Story 4 (Phase 6)**: T013–T016 (verification artifacts can be drafted in parallel; T014 is the blocking gate — if any fact-check fails, return to US1–US3 drafting tasks).
- **Polish (Phase 7)**: T017 depends on US4. T018 depends on T017 (the panel reads the built page). T019 depends on T018. T020 depends on T019.

### Within Each User Story

- US1: T007 (cold open) → T008 (Extreme A). Sequential — same file.
- US2: T009 single task. Depends on US1's closing transfer.
- US3: T010 → T011 → T012. Sequential — same file.
- US4: T013 + T014 + T015 + T016. T014 is the blocking fact-check gate; T013 / T015 / T016 are parallel reads of the draft.

### Parallel Opportunities

- T002 + T003 [P] in Setup (different operations).
- T004 + T005 + T006 [P] in Foundational (three different artifacts).
- T014 + T015 + T016 [P] in US4 (three different verification artifacts; T013 pacing review can also run in parallel).
- T018 + T019 [P] in Polish (T018 is the human-facing survey; T019 is the commit once T018 passes).

---

## Parallel Examples

### Setup phase

```bash
# T002 creates the verification directory; T003 copies the current intro to before.md.
# Both can run in the same shell session.
mkdir -p specs/006-storytelling-intro/verification
cp edu-site/docs/intro.md specs/006-storytelling-intro/verification/before.md
```

### Foundational phase

```bash
# T004 (fact-mapping scaffold), T005 (beat-outline), T006 (frontmatter decision) — three independent markdown files.
# All three can be written in parallel by different agents.
```

### US4 verification phase

```bash
# T013 (pacing), T014 (fact-check), T015 (URL verification), T016 (terminology audit) — four independent artifacts.
# T014 is the blocking gate; T013 / T015 / T016 can run in parallel with T014.
```

---

## Implementation Strategy

### Atomic ship

This feature ships the entire rewritten `edu-site/docs/intro.md` as one atomic unit. There is no MVP slice that is independently useful — a half-rewrite (e.g. Cold Open + Extreme A only, or Extreme A + Extreme B without the bridge) is not shippable, because the Introduction's value is the *full* two-extreme arc + bridge + CTA. The draft therefore proceeds beat-by-beat in order, with each beat's word budget enforced.

### Authoring passes (per `quickstart.md`)

- **Pass 1 — Draft** (T007 → T012): the writer produces the six beats in order. Each beat must hit its minimum word budget and contain its mandatory content per the contracts.
- **Pass 2 — Fact-check** (T014, blocking gate): the writer verifies every claim, populates the Per-Fact Mapping Table, and either cuts or attributes every claim. If anything fails, return to Pass 1.
- **Pass 3 — Pacing review** (T013): paragraph-by-paragraph classification. If three-stat runs, missing hooks, or missing transfers appear, return to Pass 1.
- **Pass 4 — Build** (T017): `npm run build` exits 0.
- **Pass 5 — Reader panel** (T018): n ≥ 5 first-time readers; pass per SC-005 / SC-011.

### Suggested commit boundary

- **Commit 1** (after T012): `feat(intro): draft story-driven rewrite` — the full 6-beat draft lands.
- **Commit 2** (after T016): `feat(intro): fact-check + pacing + sourcing` — verification artifacts land.
- **Commit 3** (after T019): `chore(intro): ship after reader panel` — final cleanup and ship.

---

## Notes

- [P] tasks = different files / read-only verification artifacts, no dependencies on incomplete tasks.
- [US1] / [US2] / [US3] / [US4] map to the four prioritized user stories in `spec.md`.
- All drafting tasks (T007 → T012) modify the **same** file (`edu-site/docs/intro.md`) and are therefore sequential within a story. They cannot be marked [P].
- Verification tasks (T013–T016) write to four different files inside `specs/006-storytelling-intro/verification/` and CAN run in parallel.
- T014 is the **blocking** fact-check gate; if it fails, the drafting tasks must be revisited.
- T018 is a human-facing activity (the project owner recruits readers and collects responses per Constitution III — Co-Authored Text). The agent prepares the survey instrument and template; the project owner runs the panel.
- No ADR required for this feature (it is a content rewrite within the existing house style, per spec Out-of-Scope).
- No contract tests, no backend tasks, no API tasks — the deliverable is prose.
- The rewrite touches ONLY `edu-site/docs/intro.md`; every other file (config, components, hero, navbar) is reused unchanged.