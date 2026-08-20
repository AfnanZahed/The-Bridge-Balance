# Feature Specification: Harden, Verify, and Ship the Differentiated Intros

**Feature Branch**: `010-continue-intro-work`  
**Created**: 2026-08-20  
**Status**: Draft  
**Input**: User description: "Now continue" — interpreted as continuing the in-progress differentiated-intros work (`009-differentiated-intros`) by hardening the editorial gate, running the live reader-control check, and producing the publication artifacts that turn the branch into a PR-ready state.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Verify differentiation empirically (Priority: P1)

As an editor preparing the differentiated-intros branch for publication, I want the comparison matrix to be auditable by an independent reviewer, so the "no duplicate lens, scenario, structure, or takeaway" rule holds before any version ships.

**Why this priority**: The differentiation claim is the entire value of the feature. If a reviewer can find duplicates, the feature is not ready.

**Independent Test**: A reviewer who has not seen the version labels can match each version's opening and body to its lens from the comparison matrix with at least 90% accuracy; pairwise review finds zero duplicate verdicts.

**Acceptance Scenarios**:
1. **Given** a reviewer receives the nine version bodies with their difficulty/length labels hidden, **when** they match each body to a lens using only the matrix, **then** at least 9 of 10 attempted matches are correct.
2. **Given** the matrix lists nine rows, **when** a pairwise lens check is run, **then** no row has the same primary lens, scenario, structure, and takeaway as any other row.
3. **Given** the verdict column exists, **when** the audit runs, **then** every row reads `unique` and the audit log records the reviewer and date.

---

### User Story 2 - Confirm reader-control description surface (Priority: P1)

As a first-time reader, I want the reader controls above the intro page to expose each combination's lens, real-world use, and choosing guidance, so I can pick the right reading within 30 seconds without scrolling the page.

**Why this priority**: SC-003 is the only testable commitment that the new description surface works. Without it, the differentiated-intros feature is invisible to readers.

**Independent Test**: A Playwright (or equivalent) live check at the intro page confirms that every difficulty × length combination exposes the combination's lens and choosing guidance, that the controls' `aria-describedby` references the description, and that switching combinations updates the description live.

**Acceptance Scenarios**:
1. **Given** a Playwright session opens `localhost:<port>/`, **when** the test reads the reader controls, **then** the description for the current effective combination is visible and contains the lens and a "choose this if" sentence.
2. **Given** the test changes the difficulty or length pill, **when** the change is committed, **then** the description text updates to reflect the new combination without a page reload.
3. **Given** a screen-reader user activates a pill, **when** assistive technology announces the section, **then** it reads the description text in addition to the pill label.
4. **Given** the description node exists, **when** the test inspects DOM, **then** the controls' `aria-describedby` references the description's id.

---

### User Story 3 - Produce a publication-ready branch (Priority: P2)

As a maintainer, I want the differentiated-intros branch to be self-documenting and PR-ready, so reviewers can verify the editorial gate, the evidence set, and the live behavior without out-of-band context.

**Why this priority**: A feature is not "done" until its branch can be reviewed and merged. Without a publication artifact, the branch sits in limbo.

**Independent Test**: Running `npm run typecheck` and `npx docusaurus build` succeeds; a CHANGELOG-style PHR records the final state; the branch's commits reference the spec; the comparison matrix is committed and audit-stamped.

**Acceptance Scenarios**:
1. **Given** the branch is local, **when** the maintainer reviews the diff against `main`, **then** every modified file maps to a task in `specs/009-differentiated-intros/tasks.md` and a file in the comparison matrix.
2. **Given** a reviewer opens the branch's PHR series, **when** they read the final PHR, **then** it lists every changed file, the verification results, and the ship state.
3. **Given** the branch has passed typecheck and build, **when** the maintainer marks the branch ready, **then** no further code changes are required before merge.

---

### User Story 4 - Hand off to the next curriculum step (Priority: P3)

As a learner who has just finished the differentiated intro, I want a clear handoff to Stage 1 ("Spec-Aware Software Foundations") and the rest of the curriculum, so the work of choosing a reading leads naturally into building with AI under specification-driven engineering.

**Why this priority**: The intro's job is to make the rest of the curriculum legible. A clean handoff completes the loop.

**Independent Test**: The "Where to start" routing table at the bottom of the intro page links to Stage 1, Stage 3, and Stage 4 and resolves cleanly in the build.

**Acceptance Scenarios**:
1. **Given** the reader reaches the bottom of the intro, **when** they read the routing table, **then** they can pick a stage that matches their background.
2. **Given** the maintainer follows a routing link, **when** the destination page loads, **then** it exists, builds without errors, and uses the same reader-controls surface as the intro.

---

### Edge Cases

- If a reviewer cannot identify a version's lens from its body alone, the version returns to draft and the lens registry is updated.
- If the live reader-control check cannot reach a running server, the build verifies the description surface statically (DOM inspection of the rendered HTML) instead of dynamically.
- If a matrix verdict is not `unique` during audit, Q5's release policy applies: the entire intro release is blocked until the duplicate is resolved.
- If the reader's preferred combination is unavailable, the substitution note must continue to render and not be replaced by the new description surface.
- If the curriculum routing destination is missing or renamed, the link must surface a clear fallback rather than a 404.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The comparison matrix MUST be reviewable by an independent reviewer who is blind to the version labels, and the audit MUST record reviewer identity, date, and verdict per row.
- **FR-002**: The audit MUST run pairwise checks for duplicate primary lens, scenario, reasoning structure, and takeaway; any duplicate verdict MUST revert that row to `pending` and block publication per Q5.
- **FR-003**: A live reader-control check MUST verify the description node visibility, content (lens + use + "choose this if"), `aria-describedby` linkage, and live update on combination change.
- **FR-004**: If a live server is unavailable, the description surface MUST be verified through static DOM inspection of the production build output (`edu-site/build/`).
- **FR-005**: `npm run typecheck` and `npx docusaurus build` MUST both succeed before the branch is marked PR-ready.
- **FR-006**: A final implementation PHR MUST list every changed file with its task id, every verification step with its result, and the explicit ship state.
- **FR-007**: The branch MUST NOT include unrelated drive-by edits; every change MUST trace to a task in `specs/009-differentiated-intros/tasks.md` or this spec.
- **FR-008**: The "Where to start" routing table MUST keep its existing destination links; missing destinations MUST surface a documented fallback rather than a 404.
- **FR-009**: The reader-control description surface MUST preserve WCAG 2.1 AA conformance: visible focus ring, sufficient contrast in both light and dark themes, and keyboard operability of all pills.
- **FR-010**: The publication artifacts MUST live under `specs/009-differentiated-intros/` (matrix, lens registry, audit log) and `history/prompts/009-differentiated-intros/` (final PHR); no artifacts may live outside these locations.

### Key Entities

- **Audit Log**: The artifact produced by the reviewer-blind verification pass, with reviewer identity, date, per-row verdict, and per-pair duplicate dimension.
- **Live Check Result**: The output of the live reader-control verification (Playwright run, DOM inspection, or both) capturing the description surface behavior.
- **Final PHR**: The closing Prompt History Record for the `009-differentiated-intros` branch that lists every file, task, and verification.
- **Publication State**: `draft`, `audit-passed`, `live-checked`, `build-green`, `pr-ready`, or `shipped`.

### Assumptions

- The `009-differentiated-intros` branch remains the work in progress; this spec adds the verification and publication layer on top of it.
- The reader-control description surface added in the previous turn (`types.ts`, `index.tsx`, `ReaderControls.module.css`) is correct as authored and is verified, not re-implemented.
- The official docs cited in `intro.md` remain the canonical source set; no new sources are introduced in the publication pass.
- The branch's destination is a PR against `main`; no separate staging environment is in scope.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The reviewer-blind matrix audit returns `unique` for 9 of 9 rows, and the audit log lists at least one named reviewer and a date no earlier than 2026-08-20.
- **SC-002**: The live reader-control check confirms visibility, content, `aria-describedby` linkage, and live update for at least 4 of the 9 combinations exercised in the test.
- **SC-003**: `npm run typecheck` and `npx docusaurus build` both succeed; the build artifact contains the description node with the correct `id` referenced by the controls' `aria-describedby`.
- **SC-004**: The final implementation PHR lists every file touched since the last PHR (0006) and reports the audit and build results.
- **SC-005**: The branch ships with no unrelated drive-by edits: `git diff main --stat` shows only files mapped to a task or to this spec.
- **SC-006**: Each Stage link in the "Where to start" routing table resolves successfully in the build, or carries a documented fallback.
- **SC-007**: Reader-control descriptions remain WCAG 2.1 AA conformant: visible focus ring, sufficient contrast in both light and dark themes, and keyboard operability preserved.

## Out of Scope

- Implementing a full CMS or structured-content database for the nine versions.
- Adding a tenth version or removing an existing combination.
- Re-authoring or restyling the reader-control card beyond the description surface already added.
- Translating the intro into other languages.
- Building Stage 2+ curriculum pages; only the routing handoff is verified.
