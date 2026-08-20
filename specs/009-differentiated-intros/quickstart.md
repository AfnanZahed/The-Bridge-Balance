# Quickstart: Nine Distinct Intro Reading Paths

## Author one contract

1. Pick the cell id from `C1` through `C9`.
2. Fill every field in the Reading Contract schema (audience, lens, scenario, decision value, structure, takeaway).
3. Verify the lens is not already taken by another cell.
4. Record the contract in the comparison matrix at `specs/009-differentiated-intros/comparison-matrix.md`.

## Author one version

1. Open with the lens promise within the first paragraph.
2. Use the chosen scenario as the central example.
3. End with an actionable takeaway the reader can apply.
4. Reference the shared thesis and four curriculum stages at a depth that matches difficulty.
5. Cite sources from the canonical reference list.

## Review the matrix

For each pair of cells, confirm:

- Different primary lens.
- Different scenario or a scenario that answers a different question.
- Different reasoning structure.
- Different actionable takeaway.

Mark the verdict for each row as `unique` or list the duplicate dimension. A duplicate row blocks publication.

## Update reader controls (if needed)

If the reader-control label currently shows only difficulty and length, add a concise description string exposing the lens and practical outcome. No new control dimension.

## Verify

1. `npm run typecheck` — PASS.
2. `npx docusaurus build` — PASS.
3. Live page: each selected cell surfaces the right audience, lens, scenario, and takeaway.
4. Editorial matrix review: every row verdict is `unique`.
5. Shared thesis compliance: every version passes the thesis check.

## Acceptance gate

A version ships only when:

- Typecheck and build pass.
- The comparison matrix shows `unique` for the row.
- The reader-control description (if any) names the lens and practical value.
- The shared thesis check passes.
