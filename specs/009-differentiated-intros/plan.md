# Implementation Plan: Nine Distinct Intro Reading Paths

**Branch**: `009-differentiated-intros` | **Date**: 2026-08-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/009-differentiated-intros/spec.md`

## Summary

Convert the nine existing intro variants from paraphrase-fatigue into nine distinct reading contracts, each with a unique lens, scenario, decision value, and actionable takeaway. The work is editorial-first: author contracts, rewrite `edu-site/docs/intro.md` to match, ship a comparison matrix as the review artifact, and ensure reader-control descriptions expose each version's lens and practical outcome.

## Technical Context

**Language/Version**: TypeScript 5.5, MDX 2.0 (Docusaurus 3.7+); prose is plain Markdown in MDX blocks.
**Primary Dependencies**: Docusaurus 3.7+, `@docusaurus/theme-classic`, the existing `ReaderControls` package, `clsx`. No new dependencies.
**Storage**: Markdown/MDX files under `edu-site/docs/intro.md`; editorial artifacts under `specs/009-differentiated-intros/`. No runtime database.
**Testing**: `npm run typecheck`, `npx docusaurus build`, Playwright live page checks (if reader-control description changes), and human editorial matrix review.
**Target Platform**: Web; static Docusaurus build served via GitHub Pages / Vercel.
**Project Type**: web (Docusaurus site); no backend change.
**Performance Goals**: Preserve current page-load budget; no additional network requests.
**Constraints**: Free-tier (Principle I); Apple-Design fidelity per Principle VII (no new visual chrome); smallest viable change (Principle V).
**Scale/Scope**: 9 versions × 1 file; 1 optional reader-control description field; 1 editorial matrix.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Free-Tier by Default** — PASS. No paid services added; the change is content + a description string.
- **II. Pluggable Provider Abstraction** — N/A. No provider changes.
- **III. Co-Authored Text, Video-Second Delivery** — PASS. Prose remains the project's primary authored artifact; video-lecture layer is unchanged.
- **IV. Spec-Driven Development (NON-NEGOTIABLE)** — PASS. Plan derived from the spec; PHRs recorded at every stage.
- **V. Smallest Viable Change** — PASS. No framework rewrites; only the affected markdown file and an optional description field. The comparison matrix is a documentation artifact, not a runtime system.
- **VI. Free, Open Curriculum** — PASS. Content stays free; no paywall, gating, or premium chapter.
- **VII. Apple-Design Purity** — PASS. No new visual chrome; existing reader-control surface is preserved.

Re-evaluation after Phase 1: all gates still PASS.

## Project Structure

### Documentation (this feature)

```text
specs/009-differentiated-intros/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── reading-contracts.md
└── comparison-matrix.md # Editorial artifact (post-implementation)
```

### Source Code (repository root)

```text
edu-site/
└── docs/
    └── intro.md          # The nine <Version> blocks rewritten to match the contracts
edu-site/src/components/ReaderControls/   # Optional: add a description field to options if needed for SC-003
```

**Structure Decision**: Single Docusaurus project; content-only change with optional reader-control description field. No backend, no new packages, no framework rewrites.

## Phase 0 — Research

Findings in [research.md](research.md):

- **R-001** — A reading contract (audience, lens, scenario, decision value, takeaway) is required before prose.
- **R-002** — Preserve the 3 × 3 matrix; assign one lens per cell (R-002 table).
- **R-003** — Compare via editorial matrix with explicit lens/scenario/structure/takeaway columns.
- **R-004** — Scope is editorial; minimal description field is the only allowed code change.

No NEEDS CLARIFICATION remains. Resolved:
- Storage: Markdown/MDX + spec-doc artifact.
- API: None.
- Testing: typecheck, build, Playwright (if reader-control changes), editorial matrix.
- Performance: preserve current budget.

## Phase 1 — Design & Contracts

### Data Model

Documented in [data-model.md](data-model.md): Reading Contract, Intro Version, Shared Thesis, Comparison Matrix, and editorial state transitions.

### Contracts

Documented in [contracts/reading-contracts.md](contracts/reading-contracts.md):

- Reading Contract Schema (YAML)
- Lens Assignment Table (C1–C9)
- Editorial Comparison Matrix schema
- Reader-Control Positioning contract
- Shared Thesis Compliance contract

### Quickstart

Documented in [quickstart.md](quickstart.md): author one contract, author one version, review the matrix, optionally update reader-control descriptions, verify, accept.

### Agent Context

Updated via `update-agent-context.ps1 -AgentType claude`. No new framework, language, or database dependencies added (all N/A).

## Phase 2 — Tasks (NOT generated here)

Tasks will be generated by `/sp.tasks`. They MUST include:

1. Author nine Reading Contracts in the comparison matrix.
2. Rewrite the nine `<Version>` blocks to satisfy each contract.
3. Update the comparison matrix with verdict per row.
4. (Conditional) Add a description string to the reader-control options if the current UI cannot expose the lens and practical outcome for SC-003.
5. Run typecheck, build, and (if reader-control changes) live-page checks.
6. Editorial review gate: no row with verdict other than `unique`.

## Complexity Tracking

No constitution violations; this section is intentionally empty.

## Follow-ups and risks

- Editorial matrix depends on human review; automated lint cannot replace lens/scenario/structure judgement.
- Reader-control description (if added) must stay restrained per Principle VII; treat copy length as part of the change.
- Source list remains canonical; if a claim changes, every version that cites it must be updated.
