---
id: 0063
title: Diagnose dev overlay "Unexpected token '<'" — stale tab across a dev-server restart
stage: misc
date: 2026-09-12
surface: agent
model: claude (Command Code agent)
feature: none (dev-environment diagnosis, no source change)
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — owner pasted the Docusaurus dev error overlay)
labels: ["diagnosis", "dev-server", "no-code-change", "evidence"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - none (diagnosis only; `edu-site/src/css/custom.css` unchanged in this exchange)
tests:
  - playwright full loads of `/` and `/intro-1-binary-to-programming`, plus client-side navigation — zero pageerror, zero HTML-fallback JS responses
  - CDP `Network.requestWillBeSent` initiator capture for the failing request
  - `netstat` + process inspection of the port-3000 listener
  - `curl` content-type probes of the chunk URLs and the served HTML
---

## Prompt

Uncaught runtime errors: × ERROR Unexpected token '<' SyntaxError: Unexpected token '<' ERROR Unexpected token '<' SyntaxError: Unexpected token '<'

## Response snapshot

Traced the error to the dev environment, not the app. No source change was needed, and none was made.

**What the error is.** `Unexpected token '<'` is the browser parsing an HTML document as JavaScript. In dev, Docusaurus's dev server answers any unknown path with the SPA fallback (`index.html`, status 200, `text/html`), so a stale script URL does not 404 — it returns markup that the JS parser then rejects. The overlay shows it once per failed script.

**What was stale.** The dev-server task from the previous session (`s1cjyd9d`) died at 03:54:51 local (exit 3221225786, the log's last line is `[stderr] ^CTerminate batch job (Y/N)?`). A new `node` process took port 3000 at 03:55:31 local (PID 10752, still listening — it is not a session task; it belongs to the owner's own terminal, so it was left untouched). A tab opened against the old server keeps the old build's chunk URLs; the new server compiles new hashes, so those old URLs fall through to `index.html` and the parse error follows.

**Evidence it is not the app or the title change.**
- Fresh contexts (after the restart) load `/` and `/intro-1-binary-to-programming` with zero `pageerror`, and client-side navigation pulls real chunks from `/assets/js/<hash>.js`, all `200 text/javascript` — zero HTML fallbacks.
- The only suspicious request, captured with its initiator, is `http://localhost:3000/config---4045-e-9-90e.js` → `200 text/html`, requested by `@docusaurus/core/lib/client/prefetch.js` (a `<link rel="prefetch">`, which is never executed) for the `config` chunk declared on the `/` and `/404` routes in `.docusaurus/routesChunkNames.json` (chunk `@generated/docusaurus.config`). It is a dev-only upstream quirk — noiseless in the network panel, not a source of the overlay.
- A repo-wide check found no `JSON.parse`, no dynamic `import()`/`React.lazy`, and exactly one client fetch (`src/lib/search.ts`, which checks `res.ok` and catches) — so no guarded-parse call site exists that could throw this uncaught.
- The running server serves the corrected chapter title (sans, 600, 40px, three lines) — the fix from PHR 0062 is live.

**Resolution.** Hard reload the tab (Ctrl+Shift+R), or close and reopen it. Nothing in the project needs to change.

## Outcome

- ✅ Impact: owner unblocked with a one-action fix; a scary-looking overlay resolved to a stale browser tab rather than a code defect, and the search/parse surface was verified clean so it cannot be confused for this again.
- 🧪 Tests: pageerror listener on full loads and client-side navigation (clean); CDP initiator capture (identified Docusaurus's own prefetch); port-3000 process inspection (identified the restarted, non-session server).
- 📁 Files: none changed.
- 🔁 Next prompts: owner hard-reloads and confirms; if the overlay returns on a *fresh* tab, it is a different bug and the next step is capturing the failing script URL in that session.
- 🧠 Reflection: the overlay's two identical errors and the "restart at 03:55:31 / tab open since before" timing matched exactly; capturing the failing URL and its initiator was what turned a plausible story into a verified one, and checking our own source for unguarded parses was what ruled us out first.

## Evaluation notes (flywheel)

- Failure modes observed: a browser tab outliving a dev-server restart produces chunk/hot-update URLs that the SPA fallback answers with HTML, and the dev overlay reports it as a SyntaxError with no hint about the stale URL; a dead shell task does not mean a dead server, since the node child kept the port.
- Graders run and results (PASS/FAIL): fresh-context loads clean — PASS; client-side navigation clean — PASS; no unguarded client parse in source — PASS; port-3000 owner identified — PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none.
