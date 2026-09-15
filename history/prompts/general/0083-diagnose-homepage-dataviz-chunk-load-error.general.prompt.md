---
id: 0083
title: Diagnose homepage DataViz chunk load error
stage: misc
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — pasted a browser runtime-error overlay, no further comment)
labels: ["remediation", "docusaurus", "dev-server", "chunk-load-error", "recharts", "edu-site"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - none (diagnostic session only; no source or generated files were modified)
tests:
  - manual: GET http://localhost:53843/vendors-node_modules_recharts_es6_cartesian_CartesianGrid_js-node_modules_recharts_es6_cartes-764046.js -> HTTP 200 (the exact chunk URL from the error, on a freshly started dev server)
  - manual: fresh `docusaurus start` -> "Client: Compiled successfully in 9.10s", zero console errors
  - manual: netstat -ano | grep :3000 -> PID 16792 (node.exe, ~760MB) already listening, predating this session
  - manual: homepage screenshot at 1600x1000 -> hero + DataViz (CurriculumBarChart, CurriculumDonut) render correctly; get_page_text confirms a single clean hero heading text node
---

## Prompt

Uncaught runtime errors:
×
ERROR
Loading chunk vendors-node_modules_recharts_es6_cartesian_CartesianGrid_js-node_modules_recharts_es6_cartes-764046 failed.
(error: http://localhost:62491/vendors-node_modules_recharts_es6_cartesian_CartesianGrid_js-node_modules_recharts_es6_cartes-764046.js)
ChunkLoadError
    at __webpack_require__.f.j (http://localhost:62491/runtime~main.js:843:31)
    at http://localhost:62491/runtime~main.js:167:40
    at Array.reduce (<anonymous>)
    at __webpack_require__.e (http://localhost:62491/runtime~main.js:166:67)
    at fn.e (http://localhost:62491/runtime~main.js:373:50)
    at __WEBPACK_DEFAULT_EXPORT__.__comp---site-src-pages-index-tsx-1-df-d3e (webpack-internal:///./.docusaurus/registry.js:5:824)
    at load (webpack-internal:///./node_modules/react-loadable/lib/index.js:28:17)
    at eval (webpack-internal:///./node_modules/react-loadable/lib/index.js:56:20)
    at Array.forEach (<anonymous>)
    at loadMap (webpack-internal:///./node_modules/react-loadable/lib/index.js:55:22)

## Response snapshot

**Same failure class as [PHR 0031](0031-clear-docusaurus-cache-to-resolve-chunk-load-error.general.prompt.md) and [PHR 0059](0059-clear-docusaurus-cache-stage-4-chunk-load-error.general.prompt.md) — third occurrence, not a code defect.** The failing chunk is the dev-server's split-vendor bundle for `recharts`'s `CartesianGrid` module group, pulled in by the homepage route (`site-src-pages-index-tsx`) via `DataVizSection` → `CurriculumBarChart`/`CurriculumDonut`. Both components import `recharts` with plain static named imports (no `React.lazy`/dynamic import), so the split is ordinary webpack route-based code-splitting — nothing unusual in the app code.

**Verification, not just theory.** Checked the installed vs. declared recharts version (3.10.1 both places — no drift), read both chart components end to end (no lazy-loading pattern that could race), then reproduced by starting a fresh `docusaurus start` instance. It compiled clean and — critically — a network check showed the **identical chunk filename from the user's error** returning `200 OK` this time. That confirms the dependency graph and build are healthy; the original failure was dev-server *state*, not the code.

**Root cause candidate found.** `.claude/launch.json` configures the dev server on port 3000, but `preview_start` reported port 3000 already in use, so the fresh verification instance was auto-bumped to 53843. `netstat` confirmed a live listener on 3000: PID 16792, `node.exe`, ~760 MB resident — consistent with a long-running dev server that has been through many HMR rebuilds across a long session (this repo has had heavy edit activity per the many recent `general/` PHRs). That's exactly the mechanism both prior PHRs document: the browser's loaded runtime holds a chunk-hash reference the *currently running* server no longer serves once enough incremental rebuilds (or a concurrent `npm run build`) have shifted its registry — surfaced by `react-loadable` as `ChunkLoadError` for whichever one chunk the page happens to request at that moment.

**Also checked, ruled out as a false alarm:** the homepage hero headline looked visually garbled/overlapping in an initial 800×450 screenshot. Re-checked with `get_page_text` (single clean text node, no duplication) and a re-screenshot at a realistic 1600×1000 desktop width (renders perfectly, headline and italic accent line clearly separated). This was a small-viewport screenshot-scale artifact, not a CSS bug — no source change made.

**Recommendation given to the user, not yet executed:** stop the stale PID-16792 server, run `npm run clear` (drops `.docusaurus/`, `build/`, `node_modules/.cache/`), restart `npm start`, hard-refresh the browser. Killing a running process is one of this session's named confirm-before-acting actions, and ownership of that particular process (left over from an earlier session vs. the user's own terminal) was not certain, so the agent asked before touching it rather than killing it outright.

## Outcome

- ✅ Impact: Root cause identified (stale long-running dev server on port 3000, not a recharts/DataViz defect); no source changes needed or made.
- 🧪 Tests: see `tests:` above — exact failing chunk URL re-verified as 200 on a clean compile; homepage visually verified end to end.
- 📁 Files: none modified; this PHR is the only file authored.
- 🔁 Next prompts: user confirms whether to stop PID 16792 and run the clear+restart, or does it themselves in their own terminal; either way, a hard refresh clears the browser's stale chunk reference.
- 🧠 Reflection: third instance of this exact failure class in this project's history (0031, 0059, now this one). The common thread every time is a dev server that has been alive through a lot of incremental rebuilding, not any particular chunk or dependency — recharts is incidental here the way `DocsRoot` and the Stage 4 content chunk were incidental before it.

## Evaluation notes (flywheel)

- Failure modes observed: long-lived dev-server process surviving across sessions and accumulating enough HMR history to serve a stale chunk registry; a narrow default preview-pane viewport (800×450) producing a screenshot that reads as a CSS overlap bug until rechecked at desktop width.
- Graders run and results (PASS/FAIL): PASS — identical chunk URL confirmed 200 after a clean compile; hero text confirmed non-overlapping via DOM text extraction and a wider screenshot.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): given three occurrences now share one root cause, worth a one-line standing note (README or this file's own convention) to check for an existing dev-server listener (`netstat`/`preview_list`) *before* reading source on any future "Loading chunk … failed" report — 0059 already drew this same conclusion; this session re-confirms it.
