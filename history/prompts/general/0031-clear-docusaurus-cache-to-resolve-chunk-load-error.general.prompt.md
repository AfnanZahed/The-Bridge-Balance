---
id: 0031
title: Clear docusaurus cache to resolve chunk load error
stage: misc
date: 2026-09-06
surface: agent
model: mavis/MiniMax-M3
feature: none
branch: a
user: Book
command: none
labels: ["remediation", "docusaurus", "dev-server", "chunk-load-error", "edu-site"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/.docusaurus/  # cleared via npm run clear
  - edu-site/build/        # cleared via npm run clear
  - edu-site/node_modules/.cache/  # cleared via npm run clear
tests:
  - manual: GET http://localhost:3000/  -> HTTP 200
  - manual: GET http://localhost:3000/intro  -> HTTP 200 (Accept: text/html)
  - manual: Get-NetTCPConnection -State Listen -LocalPort 3000 -> 1 row (PID 27468, IPv6 ::1)
  - manual: webpack client compiled successfully in 31.58s
---

## Prompt

ERROR
Loading chunk __comp---theme-docs-root-5-e-9-0b6 failed.
(error: http://localhost:3000/__comp---theme-docs-root-5-e-9-0b6.js)
ChunkLoadError
    at __webpack_require__.f.j (http://localhost:3000/runtime~main.js:843:31)
    at http://localhost:3000/runtime~main.js:167:40
    ...

## Response snapshot

Treated as a Docusaurus dev-server HMR chunk-hash mismatch (transient runtime error, not a code defect). The failing chunk is the dev server's runtime name for `@theme/DocsRoot` (the docs route layout, route `/-130` per `.docusaurus/routesChunkNames.json`, sub-hash `e-9-0b6` derived from the DocsRoot dep graph). After a wave of source edits in the working tree — modified `package.json` (+6 dev deps for the figure pipeline: `@resvg/resvg-js`, `culori`, `elkjs`, `satori`, `subset-font`, `svgo`), `docusaurus.config.ts`, `sidebars.ts`, multiple swizzled theme files (`Root.tsx`, `MDXComponents.tsx`, `Navbar/*`, `DocSidebar/*`, `DocSidebarItem/*`), and many components (`BrandMark`, `Callout`, `ChapterState`, `DataViz/*`, `HomepageHero/*`, `SiteMenu/*`, `Figure/*`) — the dev server rebuilt the DocsRoot component under a new hash while the browser still held a reference to the old URL. `react-loadable` caught the 404 and threw `ChunkLoadError`.

Plan / Plan Mode was used to scope and approve the remediation: stop the dev server (no listener on 3000, per `Get-NetTCPConnection`), `npm run clear` to drop `.docusaurus/`, `build/`, and `node_modules/.cache/`, restart `npm start`, hard-refresh the browser, unregister any Service Worker. The conditional `npm install` step was deferred to runtime (only run if the new deps are missing); at runtime the dev server compiled without a missing-module error so `npm install` was not needed.

The prod build is healthy and unaffected: `build/assets/js/*` uses content-hashed names (`0012c2e7.8514fe2f.js` etc.) and the prod registry keys DocsRoot under chunk `5e95c892` (see `.docusaurus/registry.js`). The error is dev-only.

## Verification

- `npm run clear` exit 0; cleared `.docusaurus/`, `build/`, `node_modules/.cache/`.
- `npm start` (background) reached "Docusaurus website is running at: http://localhost:3000/" in ~31s; `webpack 5.109.2 client compiled successfully`; no errors in stdout.
- `Get-NetTCPConnection -State Listen -LocalPort 3000` -> 1 row, PID 27468, IPv6 `::1`.
- `Invoke-WebRequest http://localhost:3000/` -> HTTP 200, 1873 bytes (homepage).
- `Invoke-WebRequest http://localhost:3000/intro` (with `Accept: text/html`) -> HTTP 200.
- Direct `Invoke-WebRequest http://localhost:3000/intro` (no Accept header) -> 404: this is the standard Docusaurus dev-server behavior without the SPA fallback header, not a regression. Browser navigation works as expected.
- `git status` is unchanged from before the remediation (only `.docusaurus/`, `build/`, `node_modules/.cache/` were touched; the uncommitted working-tree diff is preserved).

## User-side follow-ups (not agent actions)

- Hard refresh the browser (Ctrl+Shift+R) on `http://localhost:3000/` to clear the stale `__comp---theme-docs-root-5-e-9-0b6` chunk reference.
- DevTools -> Application -> Service Workers -> Unregister (if any SW is registered against `localhost:3000`); then re-test.
- If the user sees the same error after a hard refresh, the cause is no longer the cache (it has been cleared and the dev server has been restarted) and points at a stale SW or a browser extension caching JS aggressively.

## Out of scope (deliberate)

- No source, config, theme, component, script, or dependency file was modified.
- No `git reset`, `git clean`, or rebuild from scratch.
- No investigation of HMR-stability hardening (e.g., pinning `react-loadable`, deterministic `webpackChunkName`, SW-controlled chunk prefetch) — these are recorded as future mitigations, not required to recover.
