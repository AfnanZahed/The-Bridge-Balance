# Research: Nine Distinct Intro Reading Paths

## R-001: How to make nine variants materially different

**Decision**: Define a reading contract before prose: audience, unique lens, real-world scenario, decision value, structure, and action takeaway. Treat the nine contracts as mutually exclusive editorial jobs.

**Rationale**: Difficulty and length alone are presentation dimensions. They do not guarantee different understanding. A contract makes the intended learner outcome testable and gives reviewers a rejection rule for near-duplicates.

**Alternatives considered**:
- Keep one thesis and vary only word count — rejected because the existing content already does this and produces paraphrase fatigue.
- Give every version a different example but the same argument — rejected because examples can change while the learner's mental model remains unchanged.
- Create nine unrelated topics — rejected because the curriculum needs one coherent thesis and progression.

## R-002: Editorial mapping for the existing 3 × 3 matrix

**Decision**: Preserve the existing beginner/intermediate/advanced × summary/balanced/detailed surface and assign one lens to each cell: safety rule; everyday analogy; boundary checklist; decision framework; responsibility map; experiment-to-system transition; strategic scarcity; governance/trust boundaries; scalable ownership architecture.

**Rationale**: This preserves the existing reader-control contract and navigation while making every selection carry a distinct promise. The sequence also increases conceptual abstraction by difficulty.

**Alternatives considered**:
- Replace difficulty/length with nine named essays — rejected because it would break the current selection model and make progression less legible.
- Add a fourth dimension such as profession — rejected as scope expansion; audience and practical outcome can be expressed in the contract without multiplying controls.

## R-003: How to verify differentiation

**Decision**: Add a comparison matrix as an editorial artifact and require blind lens matching plus pairwise duplicate review before publication.

**Rationale**: Subjective claims that versions "feel different" are insufficient. Reviewers need columns for lens, scenario, reasoning structure, evidence, and takeaway; the matrix becomes a lightweight acceptance gate.

**Alternatives considered**:
- Word-count or similarity scoring alone — rejected because two texts can use different words while teaching the same thing.
- Reader survey alone — rejected because readers may detect repetition without identifying which editorial dimension is missing.

## R-004: Scope and implementation boundary

**Decision**: Keep this feature editorial-first: revise `edu-site/docs/intro.md`, add version metadata/labels only where needed, and keep the reader controls' existing behavior unless the plan reveals a minimal description field is required.

**Rationale**: The requested value is unique understanding, not a new framework or content system. The smallest viable change is prose plus a review artifact and, if necessary, concise option descriptions.

**Alternatives considered**:
- Introduce a CMS or structured content database — rejected as premature abstraction and a constitution violation under smallest viable change.
- Create a new reader-control framework — rejected because the existing adaptive reader controls already select the nine combinations.

## Resolved unknowns

- **Storage**: Markdown/MDX source files and an editorial matrix in the feature documentation; no runtime persistence.
- **API**: None; this is a static educational content change.
- **Testing**: Typecheck, Docusaurus build, content lint/checks if present, and human/editorial matrix review.
- **Performance**: Preserve current page-load and interaction budgets; no new network request or runtime computation is required.
