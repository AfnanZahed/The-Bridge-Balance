---
id: 0011
title: Manual Eraser diagrams and 5x expansion
stage: general
date: 2026-09-03
surface: agent
model: claude-sonnet-5
feature: none
branch: a
user: Book
command: null
labels: [curriculum, sde-intro, eraser, diagrams, chapter-authoring]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/intro-2-binary-to-language.md (2 diagrams embedded, already-expanded from prior turn)
 - edu-site/docs/intro-3-architecture-map.md (rewritten, ~5x prior depth, 6 diagrams embedded, broken raw-Mermaid block removed)
 - edu-site/docs/intro-4-two-extremes-and-sde.md (rewritten, ~5x prior depth, 2 diagrams embedded)
 - edu-site/static/img/lessons/intro-2/*.png (2 files, from prior turn's AI-generated diagrams)
 - edu-site/static/img/lessons/intro-3/*.png (6 new files: assembled-system, the-trap, one-signup-request, auth-vs-authz, git-and-github, same-map-different-terrain)
 - edu-site/static/img/lessons/intro-4/*.png (2 new files: two-extremes-one-bridge, four-stage-loop)
tests:
 - node scripts/check-frontmatter.mjs (from edu-site/) - passed
 - dev server (port 59482) - zero console errors on both pages; all 8 new images confirmed 200 OK via in-page fetch() after navigation
 - visual inspection of all 8 diagrams via Read tool before embedding - confirmed correct layout, labels, colors, arrow routing
---

## Prompt

Turn 1: "make the detalies 5x. also, use the eraser connctor and add ultra beautiful and very easy to understand diagrams for teaching each and everything"
Turn 2 (after AskUserQuestion was dismissed): "you can use the eraser connector directly or the eraser connector via composiio and create the diagrames manually using the available tools"

## Response snapshot

Turn 1: connected to the already-authorized Eraser MCP server, created a
shared team file, generated 2 diagrams via Eraser's AI (create_diagram)
for Part 2, then hit "you have used your free AI credits" on the
remaining 6-8 planned diagrams. Did not upgrade or spend anything on the
user's account. Finished Part 2's 5x expansion (ASCII, x86/ARM, registers,
punch cards, compiler-vs-interpreter, forward link to libraries/
frameworks/agents as further abstraction layers) with its 2 AI-generated
diagrams embedded, downloaded into edu-site/static/img/lessons/intro-2/.
Asked via AskUserQuestion how to source the remaining diagrams and
whether 5x applied to both remaining parts - user dismissed without
answering, so stopped and waited rather than guessing.

Turn 2: user pointed at the already-connected Eraser server's manual
(non-AI) diagram-creation tools. Checked Composio's search tool first -
Eraser is not among the user's manually-connected Composio apps, so
pursuing that route would have meant a fresh connection with uncertain
payoff; used the already-authenticated Eraser connector's
manually_create_diagram instead, which explicitly runs no AI and so
doesn't touch the exhausted credit pool. Ran one throwaway 3-box
calibration diagram first to confirm the freeform-diagram JSON schema and
connector auto-routing behavior (from/to/fromPort/toPort alone, no manual
coordinate math needed) before committing to all 8 real diagrams -
deleted it once confirmed. Hand-authored and created all 8 remaining
diagrams (Part 3: assembled system, the trap two-panel comparison, one-
signup-request step flow, auth-vs-authz with a decision diamond, git-and-
github branch/PR flow, same-map-different-terrain grid; Part 4: two-
extremes-with-bridge, four-stage-loop with a fails/loop-back arrow),
exported each to PNG, downloaded all into the repo, and visually verified
every one via the Read tool before embedding - all rendered correctly on
the first attempt, including the two structurally trickiest ones (decision
diamond, loop-back arrow).

Then executed the "5x details" side of the original ask for the two
chapters that hadn't gotten it yet: Part 3 rewritten with substantially
more depth (HTTP methods/status codes, the DOM, responsive breakpoints,
client-side-vs-server-side as a named security principle, password
hashing, OAuth, tokens, merge conflicts, DNS, production/staging
environments) and its 6 new diagrams embedded at matching points,
replacing the broken raw-Mermaid block entirely. Part 4 rewritten with
more depth (the METR feels-faster-but-is-slower mechanism explained, a
second concrete incident - Enrichlead's browser-side authorization leak -
alongside Replit's database deletion, per-stage worked detail on the
signup-page example plus the original CSV-export example, a comparison
table for the two extremes) and its 2 diagrams embedded. Re-ran
check-frontmatter (clean) and verified all 8 new images resolve 200 OK on
the live dev server via in-page fetch(), not just screenshot (which had
shown an unrelated rendering glitch in an earlier turn).

## Outcome

- Impact: all three SDE Intro chapters now carry real depth and a total of 10 embedded diagrams (2 AI-generated, 8 hand-authored), fully unblocked from the Eraser credit limit by routing around the AI-generation path rather than the connector itself
- Tests: check-frontmatter.mjs - PASS; console errors - none; all 8 new + 2 prior images - 200 OK confirmed via fetch(); every diagram visually inspected before embedding
- Files: see files list above
- Next prompts: none pending on this thread; chapters remain chapter_state: "placeholder" awaiting the user's own review before any are flipped to text-ready
- Reflection: running one cheap, disposable calibration diagram before committing to 8 hand-authored ones was worth the extra round trip - it revealed the connector auto-routes from from/to/port alone, which made every subsequent diagram both faster to author and lower-risk than manually computing bend-point coordinates would have been

## Evaluation notes (flywheel)

- Failure modes observed: none this pass - the AI-credit exhaustion was an external constraint, not a mistake, and was handled by surfacing it rather than working around it silently
- Graders run and results (PASS/FAIL): check-frontmatter - PASS; image HTTP status check - PASS (10/10); visual diagram review - PASS (8/8 correct on first attempt)
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a diagramming tool offers both an AI-generation path and a manual/DSL path, calibrate the manual path's exact schema with one minimal throwaway example before mass-producing real diagrams on it - this turn's approach is worth reusing as a default pattern, not a one-off
