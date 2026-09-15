# Build guard: fail when the production bundle contains HMR/dev-only code

## Context

While typesetting the chapter reading column I found a production-breaking bug that
**no existing gate could see**. The production bundle contained React Fast Refresh HMR
code:

```js
e.hot.data && e.hot.data.value !== r ? e.hot.invalidate() : e.hot.accept()
```

`module.hot` is `undefined` outside a dev server, so this threw
`TypeError: Cannot read properties of undefined (reading 'data')` on **every page**, and
React never hydrated. Theming, search, the mobile drawer and every interactive
affordance were dead for real visitors.

The cause was a dev-populated persistent webpack cache (`node_modules/.cache`) being
reused by the production build. `docusaurus clear` + a clean rebuild fixed it.

**Why nothing caught it:** `check:frontmatter`, `check:refs`, `check:chapter`, the
manifest generator, the search indexer and `docusaurus build` all passed. The axe suite
also passed, because axe inspects the static DOM and the static DOM was correct — only
hydration was broken. A green build is currently no evidence that the site works.

## Proposal

Add a post-build assertion to `scripts/` that scans `build/assets/js/*.js` for
dev-only identifiers and fails the build if any are present.

Candidate signatures, cheapest first:

- `e.hot.data`, `.hot.accept(`, `.hot.dispose(`, `module.hot`
- `react-refresh` / `ReactRefresh` markers

A guard on any one of these catches this exact class. The check is a few lines, runs in
well under a second, and belongs in `npm run build` immediately after `docusaurus build`.

## Why it is worth adding

- It catches a failure mode that is invisible to every existing check and to the axe
  suite, and it is a release-blocking one.
- The trigger is environmental rather than a code mistake — building while a dev server
  has populated the cache is an easy accident, and it produces a *successful* build with
  a broken site.
- Related gap already recorded this session: nothing validates `requires`-reference
  integrity in `prerequisite-graph.yaml` either. Both are "the chain cannot see this
  class of staleness" problems, and both are cheap to close.

## Open question

Should the guard auto-clear the cache and retry, or fail hard and tell the author to run
`npm run clear`? Failing hard is more honest — a silent retry hides the fact that a
stale-cache build was ever attempted, and that fact is worth knowing. Recommend: fail
with the instruction printed, no automatic recovery.
