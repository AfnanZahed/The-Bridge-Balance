---
id: 0004
title: Remove How This Book Works section
stage: general
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: none
branch: 001-spec-driven-engineering
user: Dell
command: 'remove this from the content: How This Book Works ...'
labels: [content-edit, introduction, cleanup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/docs/introduction.md (deleted "How This Book Works" section, lines 108-124)
tests:
  - null
---

## Prompt

> remove this from the content: How This Book Works
> 
> Video first, text second. Every chapter ships twice:
> 
> A video lecture from the project owner — the lived experience, the narrative, the "why"
> A detailed text companion co-authored with Claude Code — the reference you return to, the spec you study, the code you copy
> Neither stands alone. The video gives you the story. The text gives you the specification.
> 
> Specs, not prompts. Every chapter opens with a spec.md that defines contracts, interfaces, and acceptance criteria before any code is generated. You learn to write the spec. The AI implements it. You evaluate the result against the spec.
> 
> Two Harvard certificates. CS50P (Introduction to Programming with Python) and CS50W (Web Programming with Python and JavaScript) — completed as part of Stage 2. Internationally recognized. Portfolio-backed. Free.
> 
> 100% free, forever. Docusaurus on Vercel. Neon Postgres, Qdrant Cloud, Resend, Stripe, R2 — all on their free tiers. The textbook never charges for content.

## Response snapshot

- Located the exact block via `grep "How This Book Works"` → surfaced at `edu-site/docs/introduction.md:110`.
- Read the surrounding lines (lines 100–149) to confirm the section boundaries and the trailing `---` separator.
- Removed the entire block: section header `## How This Book Works`, all five sub-points, and the surrounding `---` separators (lines 108–124 in the pre-edit file).
- After the edit, the file jumps cleanly from the stage-overview table directly to the `## Who This Is For` section — no orphan `---`, no dangling prose.
- Re-grep'd for the four anchors (`How This Book Works`, `Video first, text second`, `Specs, not prompts`, `100% free, forever`) — zero matches in `edu-site/docs/introduction.md`.
- No build run; this is a static Markdown content edit that does not need a rebuild to verify (Docusaurus picks it up on next dev/build cycle).

## Outcome

- ✅ Impact: One section removed from the introduction. The document remains structurally valid (intro → stages table → Who This Is For → The Promise → Let's Begin).
- 🧪 Tests: none — content edit, no behaviour surface.
- 📁 Files: `edu-site/docs/introduction.md` only.
- 🔁 Next prompts: if there are other sections to drop or rework, supply them — otherwise the introduction is ready to be reviewed.
- 🧠 Reflection: For prose-only edits, single-pass `grep` + `Read` with `offset`/`limit` + targeted `Edit` is the most token-efficient path; no need to re-read the whole file or trigger a build cycle.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): n/a.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): spot-check the rendered output in `npm start` once the user is ready to review the introduction visually.
