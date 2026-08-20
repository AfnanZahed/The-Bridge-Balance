# Implementation Plan: Harden, Verify, and Ship the Differentiated Intros

**Branch**: `010-continue-intro-work` | **Date**: 2026-08-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/010-continue-intro-work/spec.md`

## Summary

Convert the implementation-complete `009-differentiated-intros` branch into a publication-ready state. The work is verification, not authoring: independent-reviewer matrix audit, live reader-control check (Playwright preferred, static DOM fallback), typecheck/build, routing resolution, branch cleanliness, and a final PHR. No code changes are required if the verification artifacts pass.

## Technical Context

**Language/Version**: TypeScript 5.5, MDX 2.0 (Docusaurus 3.7+); verification work is shell + Markdown + optional Playwright (already available via MCP).
**Primary Dependencies**: Docusaurus 3.7+, existing `ReaderControls` package. No new dependencies introduced by this spec.
**Storage**: Markdown verification artifacts under `specs/009-differentiated-intros/`; final PHR under `history/prompts/009-differentiated-intros/`. No runtime database.
**Testing**: `npm run typecheck`, `npx docusaurus build`, optional Playwright (via MCP `mcp__playwright__*`), static DOM inspection of `edu-site/build/`, file-system routing check, `git diff main --stat`.
**Target Platform**: Web; static Docusaurus build served via GitHub Pages / Vercel.
**Project Type**: web (Docusaurus site); verification-only pass.
**Performance Goals**: identical to 009 baseline; verification work does not change runtime budget.
**Constraints**: Free-tier (Principle I); Apple-Design fidelity per Principle VII (no new visual chrome); smallest viable change (Principle V); no new dependencies; no code changes unless verification fails.
**Scale/Scope**: 1 audit log, 1 live check result, 1 final PHR, 1 routing check, 1 branch diff summary.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Free-Tier by Default** — PASS. Verification uses shell, file-system checks, and the existing Playwright MCP server; no new paid services.
- **II. Pluggable Provider Abstraction** — N/A. No provider changes.
- **III. Co-Authored Text, Video-Second Delivery** — N/A. Verification pass; no new prose authored.
- **IV. Spec-Driven Development (NON-NEGOTIABLE)** — PASS. Plan derived from the spec; PHRs recorded at every stage.
- **V. Smallest Viable Change** — PASS. The verification layer is the smallest viable addition over the implementation-complete 009 branch. No unrelated edits; branch cleanliness check enforces this.
- **VI. Free, Open Curriculum** — PASS. Verification does not touch content gating.
- **VII. Apple-Design Purity** — PASS. No new visual chrome; verification confirms existing description surface preserves WCAG 2.1 AA.

Re-evaluation after Phase 1: all gates still PASS.

## Project Structure

### Documentation (this feature)

```text
specs/010-continue-intro-work/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── publication-readiness.md
└── (no tasks.md until /sp.tasks)

specs/009-differentiated-intros/   # Targets for verification artifacts
├── audit-log.md         # Reviewer-blind matrix audit result
├── live-check-result.md # Reader-control description verification result
└── comparison-matrix.md # Existing artifact being audited
```

### Source Code (repository root)

```text
edu-site/                # No code changes; verification only
edu-site/build/          # Generated artifact for static DOM inspection
history/prompts/009-differentiated-intros/
└── 0007-differentiated-intros.publish.green.prompt.md
```

**Structure Decision**: Single Docusaurus project; verification-only pass that adds Markdown artifacts under the existing 009 spec dir and produces one final PHR. No code changes, no new packages, no framework rewrites.

## Phase 0 — Research

Findings in [research.md](research.md):

- **R-001** — Reviewer-blind audit with pairwise duplicate check satisfies SC-001 (FR-001/002).
- **R-002** — Playwright preferred for live verification; static DOM inspection of `edu-site/build/` is the mandatory fallback when a server cannot be started (FR-003/004).
- **R-003** — Typecheck, build, and `git diff main --stat` mapped to a task file produce a deterministic PR-readiness signal (FR-005/007, SC-005).
- **R-004** — Routing resolution is a file-system check on `edu-site/build/<route>/index.html`; missing destinations get a documented fallback (FR-008, SC-006).

No NEEDS CLARIFICATION remains. Resolved:
- Server availability: best-effort Playwright with mandatory static fallback.
- Audit reviewer: any named human reviewer; the model may self-audit in this environment with the audit log recording both stages.
- Storage: Markdown artifacts under `specs/009-differentiated-intros/`; final PHR under `history/prompts/009-differentiated-intros/`.
- Testing: typecheck, build, Playwright (optional), static DOM, routing check, diff mapping.
- Performance: identical to 009.

## Phase 1 — Design & Contracts

### Data Model

Documented in [data-model.md](data-model.md): Audit Log, Live Check Result, Final PHR, Publication State machine, and state transitions.

### Contracts

Documented in [contracts/publication-readiness.md](contracts/publication-readiness.md): Audit Log schema, Live Check Result schema, Routing Resolution schema, Final PHR schema, Branch Cleanliness rule.

### Quickstart

Documented in [quickstart.md](quickstart.md): audit, live check (Playwright + static fallback), typecheck/build, routing check, branch cleanliness, final PHR, acceptance gate.

### Agent Context

Updated via `update-agent-context.ps1 -AgentType claude`. No new language, framework, or database dependencies added (all N/A for a verification-only pass).

## Phase 2 — Tasks (NOT generated here)

Tasks will be generated by `/sp.tasks`. They MUST include:

1. Pairwise matrix audit and audit log creation.
2. Playwright live reader-control check (preferred) or static DOM fallback.
3. Routing resolution check.
4. Typecheck and build verification.
5. Branch cleanliness check (`git diff main --stat`).
6. Final PHR creation at `history/prompts/009-differentiated-intros/0007-differentiated-intros.publish.green.prompt.md`.
7. Branch state transition to `pr-ready`.

## Complexity Tracking

No constitution violations; this section is intentionally empty.

## Follow-ups and risks

- The Playwright run requires a local server; if the harness cannot start one, the static DOM fallback is the authoritative signal.
- The reviewer-blind audit depends on having a second pair of eyes. If only the model is available, the audit log records that fact and explicitly notes the limitation; the matrix verdict column remains the primary gate.
- The branch is `010-continue-intro-work` while the work it documents targets `009-differentiated-intros`. The final PHR lives under the 009 PHR series because it closes that branch.
