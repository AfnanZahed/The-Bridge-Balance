# Quickstart: Harden, Verify, and Ship the Differentiated Intros

## Audit the matrix

1. Open `specs/009-differentiated-intros/comparison-matrix.md`.
2. Pairwise check: for each pair of rows, confirm primary lens, scenario, structure, and takeaway are not duplicates. Any duplicate reverts that row to `pending`.
3. Record the audit in `specs/009-differentiated-intros/audit-log.md` using the Audit Log contract. Include reviewer name and date.

## Verify the reader-control description surface (preferred: Playwright)

1. Start a local server: `npx docusaurus serve --port 4173` from `edu-site/`.
2. Drive Playwright to:
   - Open `http://localhost:4173/`.
   - Confirm the description node is visible and contains the lens + "choose this if" sentence.
   - Confirm the controls' `aria-describedby` references the description id.
   - Click at least four different pills and confirm the description text updates live.
3. Record the result in `specs/009-differentiated-intros/live-check-result.md` (mode = `playwright`).

## Verify the description surface via static DOM (fallback)

1. Run `npx docusaurus build` from `edu-site/`.
2. Inspect `edu-site/build/index.html` and any generated chunk that renders the reader controls:
   - Find the description node and its id.
   - Find the controls' `aria-describedby` attribute and confirm it references that id.
   - Confirm the description text contains the lens and the "choose this if" sentence.
3. Record the result in `specs/009-differentiated-intros/live-check-result.md` (mode = `static-dom`).

## Build and typecheck

1. `npm run typecheck` from `edu-site/` — expect PASS.
2. `npx docusaurus build` from `edu-site/` — expect SUCCESS.
3. Record both results in the final PHR.

## Routing resolution check

For each Stage link in the "Where to start" table at the bottom of `edu-site/docs/intro.md`:

1. After `npx docusaurus build`, confirm `edu-site/build/<route>/index.html` exists.
2. If a destination does not resolve, document a fallback (e.g., "use Stage 3 instead") in the live-check result's `routing` section.

## Branch cleanliness

1. Run `git diff main --stat`.
2. Confirm every changed file maps to a task in `specs/009-differentiated-intros/tasks.md` or to this spec.
3. Revert any unrelated drive-by edits before marking the branch `pr-ready`.

## Final PHR

Write the final PHR at `history/prompts/009-differentiated-intros/0007-differentiated-intros.publish.green.prompt.md` with all artifacts, results, and the explicit ship state.

## Acceptance gate

The branch is `pr-ready` only when:

- Audit log shows 9/9 rows `unique` with named reviewer and date ≥ 2026-08-20.
- Live check result has every required check `pass`, with at least 4 combinations exercised.
- Typecheck and build both pass.
- All Stage routing links resolve or carry a documented fallback.
- `git diff main --stat` shows only files mapped to a task or to this spec.
- Final PHR committed and references every changed file.
