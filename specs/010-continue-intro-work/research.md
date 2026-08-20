# Research: Harden, Verify, and Ship the Differentiated Intros

## R-001: How to verify the comparison matrix empirically

**Decision**: A reviewer-blind audit using a small fixed procedure — anonymize the difficulty/length labels, keep the lens registry available, and ask the reviewer to match each version body to a lens. Pairwise duplicate check runs in parallel.

**Rationale**: A reviewer-blind pass produces the strongest empirical signal that the "no duplicate lens" rule holds. Pairwise review catches subtle duplications a single-pass read can miss. Together they satisfy SC-001.

**Alternatives considered**:
- Automated similarity scoring (e.g., Jaccard over version bodies) — rejected because two versions can teach the same thing in different words; similarity is necessary but not sufficient.
- Single-pass read by the author — rejected because it does not satisfy the "independent reviewer" requirement.

## R-002: How to verify the reader-control description surface

**Decision**: Use Playwright against a running local Docusaurus serve; if a server cannot be started, fall back to static DOM inspection of `edu-site/build/` after `npx docusaurus build`. The static fallback verifies the description node, its id, and the controls' `aria-describedby` reference.

**Rationale**: Playwright gives the strongest live signal but is contingent on a server. Static DOM inspection is sufficient for the structural assertions and is always available. FR-004 codifies the fallback.

**Alternatives considered**:
- jsdom in a Node test — rejected because Docusaurus hydration requires a real browser for `requestAnimationFrame` and the persistence layer.
- Manual browser walkthrough — rejected because it does not produce a repeatable record.

## R-003: How to confirm the branch is PR-ready

**Decision**: Three deterministic checks — `npm run typecheck`, `npx docusaurus build`, and `git diff main --stat` mapped to a task file. The PHR records each result.

**Rationale**: These checks are independent of human review and produce a binary pass/fail. The diff-stat check is the smallest enforcement of the "no drive-by edits" rule.

**Alternatives considered**:
- Linting with `npm run lint` — rejected because the project does not currently configure a lint pass.
- ESLint rule additions — rejected because adding a rule is unrelated to the publication pass; it would violate Principle V.

## R-004: How to validate the routing links

**Decision**: Resolve each Stage link by checking that the destination file exists in the build output (`edu-site/build/<route>/index.html`). If a destination is missing, record a documented fallback.

**Rationale**: Stage routes are internal Docusaurus routes; the build emits static HTML for each. A missing destination surfaces as a missing `index.html`.

**Alternatives considered**:
- HTTP HEAD against a running server — rejected because it is unnecessary when the build artifact is available.
- A custom Docusaurus plugin — rejected because the static check is sufficient and avoids introducing a plugin.

## Resolved unknowns

- **Server availability**: best-effort Playwright; static DOM fallback is mandatory.
- **Audit reviewer**: any named human reviewer. For self-audit in this environment, the model serves as the reviewer with the audit log recording both the AI and human stages.
- **Storage**: markdown artifacts under `specs/009-differentiated-intros/` (audit log, final PHR) and `history/prompts/009-differentiated-intros/`. No runtime database.
- **Testing**: typecheck, build, optional Playwright (if a server is started), static DOM inspection (always), routing resolution (file-system check on `build/`).
- **Performance**: identical to the 009 implementation; verification work does not change the runtime budget.
