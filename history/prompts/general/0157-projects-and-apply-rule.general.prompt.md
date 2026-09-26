---
id: 0157
title: "The projects and the apply-as-you-write rule recorded in canon"
stage: general
date: 2026-09-26
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: owner
command: none
labels: ["canon", "projects", "learn-apply-teach", "application-ledger", "workflow"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/canon/projects.md
 - curriculum-state/ledgers/application-ledger.yaml
 - curriculum-state/README.md
 - .claude/skills/bridge-balance-project-guide/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md
 - CLAUDE.md
 - AGENTS.md
 - _scratch/job-briefs/2026-09-22/agenda/index.html
 - history/prompts/general/0157-projects-and-apply-rule.general.prompt.md
tests:
 - "npm run check:refs in edu-site: Reference validation passed"
 - "Agenda row count, PowerShell regex: 79 rows in index.html against 78 in the pre-edit snapshot — the one new row landed"
---

## Prompt

In the book's internal docs, list:1. The Book (= Hackathon I) — DO OR DIE, Rank #1

The core learning content, free to read. Functional on localhost (basic frontend + backend); needs major development.
Its 4 jobs: learning forcing-function, portfolio, teaching source, storefront for paid products.
Content pillars: OpenAI Agents SDK, Claude Agents SDK, LangGraph, MCP, paid MCP servers, paid Agent Skills, paid Sub-Agent files, Bridge Balance teachings.
Ships the 9-cell lesson grid (Beginner/Intermediate/Advanced × Summary/Balanced/Detailed) — Claude Code writes them; your cost is review only.
Carries Hackathon I's stack: chatbot + Urdu translation button per chapter.
Hackathon deadline (Nov 30 2025) passed, no submission — kept purely for portfolio/learning.
2. The Bridge Balance — High, Rank #2

The paid testing layer, kept separate from the Book by design: exams, submissions + scoring, progress tracking, dashboards (1 student + 1 admin).
Price: ~4,000 PKR/month (working figure). Free layer: full curriculum (the traffic engine).
Status: very-very-initial Next.js scaffold; domain undecided. Build order: Book first, Site 1–2 months later (~Nov 2026).
3. Multi-Agent Career Assistant and 4. PanaShowCase — tied, Mid, Ranks #3

Career Assistant (was Student Data System; old folder name "Job Scraper"): web search + tools for jobs, internships, news, hackathons, placements, reports, surveys, expert opinions, portfolio critique — plus daily task automation via Composio. Freemium + paid tiers. Starts with PIAIC/GIAIC/Panaversity.
PanaShowCase: highlights + personal branding + one place for a student's work. Freemium, not an instant-money project. Distribution via the Panaversity WhatsApp groups.
Both pure ideas; both confirmed as separate products; both gated behind you completing your own curriculum first.
5. Dr. Mir — Low-mid, Rank #4, postponed on purpose

Website for your father, to be built only when the clinic exists in a good location. A little started ("Dr mir website" folder), then stopped intentionally.
Attached Multi-Agent System (case solving + medicine identification): not initialized; value is portfolio/CV/PR, maybe subscriptions from other homeopathic doctors later.
The 6 hackathons — no longer competitions, now a free blueprint library (0 PKR prizes, all windows closed)

Hackathon 0 — Personal AI Employee (autonomous FTEs, HITL safeguards) → Career Assistant
Hackathon I — Robotics Textbook → The Book (in use)
Hackathon II — Todo Spec-Driven Dev → method, not product
Hackathon III — Reusable Intelligence / Cloud-Native → the paid-products pattern
Hackathon IV — Course Companion FTE → The Bridge Balance's paid layer, literally
Hackathon 5 — CRM Digital FTE Factory → Career Assistant's social/daily automation


these project ideas, and write down that whenever we will write new content in the bridge balance book for any stage, we will check that on which project this knowledge can be applied, and then I will do it. because I am not just going to teach in bridge balance, but also going to learn in parrallel. the exact thing is that to first read, research and learn things on my own, then apply on any of the project (whether it's the book's own website or any other) or hackathon, and then I will teach, in this way, I will achieve all the things that can be included to make money: 1. learning and getting the knowledge, 2. practicing by applying on a real project to make sure my learning is not just theory, 3. building projects for my portfolio, 4. be ready for teaching confidently and correctly, 5. being an author of the bridge balance in parrallel so that my portfolio gets even more by being an author.

## Response snapshot

Wrote the project list and the learn–apply–teach rule into canon as `curriculum-state/canon/projects.md` (the five projects in the owner's priority order, the six hackathon blueprints with their integration map, the owner's five payoffs, and the check's mechanics), created `curriculum-state/ledgers/application-ledger.yaml` as the running `proposed → applied → taught` record, wired both into `curriculum-state/README.md`, bound the check into the workflow (project-guide standing rule 14, chapter-production steps 8 and 9), and added the standing rule to `CLAUDE.md` and `AGENTS.md`. One item was flagged as unreconciled rather than silently recorded: the nine-cell lesson grid from the 31 August record has no home in the repo's canon and conflicts with the live levels decision, so the file says to confirm with the owner before relying on it. The Agenda was snapshotted (`agenda/index.pre-job26.html`) and updated inside `<main>`: date and time, the new done row, count 40 → 41.

## Outcome

- ✅ Impact: The loop the whole project runs on is now canon instead of living in the owner's personal file: every chapter, once authored, names which project its knowledge can be applied to; the owner applies it and teaches from it; the ledger tracks how far each one got. Future sessions get the rule from `canon/` (read in full on every content task), from the project guide's Step 0, and from the chapter-production workflow itself.
- 🧪 Tests: `npm run check:refs` passed after every file that mentions a backticked path was written; the Agenda's row count verified 79 against the snapshot's 78.
- 📁 Files: The nine files in the frontmatter — two created, seven edited.
- 🔁 Next prompts: the first authored chapter after this rule takes effect should produce the application ledger's first real entry — check that the step 9 report names a target and a concrete first application.
- 🧠 Reflection: the rule only binds if it sits where chapter work actually reads — canon for the writer, Step 0 for routing, steps 8–9 for the mechanics — so it was recorded in all three rather than in one place; and stale items in the owner's personal record (the nine-cell grid) were surfaced with a dated caveat instead of being imported as if current.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
