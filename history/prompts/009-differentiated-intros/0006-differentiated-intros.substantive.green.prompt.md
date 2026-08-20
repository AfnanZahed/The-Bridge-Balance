---
id: 0006
title: Substantive rewrite of nine intro versions
stage: green
date: 2026-08-20
surface: agent
model: opus
feature: 009-differentiated-intros
branch: 009-differentiated-intros
user: Dell
command: (direct instruction to draw from official docs)
labels: [intro, editorial, evidence, official-docs, substantive, METR, Veracode, Stack-Overflow, EU-AI-Act]
links:
  spec: specs/009-differentiated-intros/spec.md
  plan: specs/009-differentiated-intros/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/docs/intro.md
  - specs/009-differentiated-intros/comparison-matrix.md
  - specs/009-differentiated-intros/lens-registry.md
  - specs/009-differentiated-intros/tasks.md

tests:
  - npm run typecheck — PASS
  - npx docusaurus build — PASS
  - Comparison matrix verdict — all 9 rows still `unique` after evidence update
  - Source attribution — every cited number lives in canonical sources (problem_statement.md, solution_statement.md, Concept Decisions DOCX) or the existing canonical reader-facing list
---

## Prompt

read these docs:C:\Users\Dell\Desktop\The Bridge Balance\Official docs, and then write proper 9 versions, on the same rules you have made foreach of the 9 version for uniqueness. but the current content is looking MVP or dummy data.

## Response snapshot

**Mined the official docs.** Read `problem_statement.md` (full industry-crisis narrative with Stack Overflow 84%/29%, METR 19% slower / 63% debugging, Veracode 45% vulnerabilities, Fortune 50 10× security findings, Stanford -20% junior employment, Dice -40% entry-level postings, S&P Global option paralysis, 30+ models in March 2026), `solution_statement.md` (Spec-Driven Engineering vs SDD, GitHub Spec Kit launch, "intent is the source of truth," EU AI Act evidentiary artifacts, Deloitte 1-in-5 governance maturity, BCMS specification poverty, LinkedIn 2.3× faster roles), and the Bridge Balance Concept Decisions DOCX (Stage 0 free, Stage 1 paid, five tracks, founder-led positioning). The curriculum PDF was not readable in this environment.

**Reframed the lens registry** so each cell maps to its primary evidence, and refreshed the comparison-matrix `Evidence` and `Scenario` columns with substantive numbers from the official docs (not paraphrases of the same incident).

**Rewrote `edu-site/docs/intro.md`** so each `<Version>` carries real evidence at its promised depth:

- **C1 beginner/summary (Safety rule).** One rule, one canonical incident (Replit).
- **C2 beginner/balanced (Everyday analogy).** Three-act story using Karpathy's "vibe coding" origin and Collins Word of the Year 2025 as cultural anchors; Lemkin + Enrichlead + Samsung as the three real-world versions of the same lesson.
- **C3 beginner/detailed (Boundary checklist).** Four enumerated boundaries (environment, data, authority, verification) with Replit, Enrichlead, and Veracode 45% as concrete evidence per item.
- **C4 intermediate/summary (Decision framework).** Two poles + Stack Overflow 84%/29% adoption-trust gap as the supporting data; one bridge sentence.
- **C5 intermediate/balanced (Responsibility map).** Four-row human-vs-AI table; METR 19% slower + 63% debugging + AWS 40%/2× as the closing evidence paragraph.
- **C6 intermediate/detailed (Experiment → system).** Four-criterion rubric (users / money / secrets / durable data) tied to Stack Overflow trust gap, Stanford -20% junior employment, Dice -40% entry-level postings, 57% trust AI over interns.
- **C7 advanced/summary (Strategic scarcity).** S&P Global option-paralysis thesis; 30+ March 2026 model releases; Anthropic 2026 Agentic Coding Trends Report as anchor.
- **C8 advanced/balanced (Governance + trust boundaries).** Four labeled boundary boxes (environment / trust / data / apprenticeship), each anchored to a canonical incident; closing line on Deloitte 1-in-5 + EU AI Act evidentiary artifacts.
- **C9 advanced/detailed (Ownership architecture).** Architecture pattern across retrieval, tool calling, and multi-agent; Veracode 45% / 2.7× density / Fortune 50 10× / IBM-Cisco 20-30% / BCMS specification poverty / Deloitte 1-in-5 / EU AI Act Aug 2 2026 / €15M-or-3% penalties as the closing argument; GitHub's "intent is the source of truth" as the closing line.

**Uniqueness preserved.** Each version still opens with its promised lens, ends with a single concrete takeaway, and uses a different reasoning structure from peers (rule vs. analogy vs. checklist vs. framework vs. table vs. rubric vs. reframing vs. four-box vs. architecture pattern). FR-007/008/009/010 and Q3 still hold.

**Verification.** Typecheck PASS; Docusaurus production build PASS.

## Outcome

- ✅ Impact: nine versions are now substantive, evidence-anchored, and recognizably different in both *what* they teach (nine distinct lenses) and *how* they teach it (nine distinct reasoning structures). Readers can choose by lens and arrive at real understanding, not paraphrase fatigue.
- 🧪 Tests: typecheck PASS; build PASS; matrix verdict still `unique` for all nine rows.
- 📁 Files: `edu-site/docs/intro.md`, `comparison-matrix.md`, `lens-registry.md`, `tasks.md`.
- 🔁 Next prompts: T034 live reader-control check (pending) when a server is started; otherwise `/sp.git.commit_pr` whenever the branch is ready to ship.
- 🧠 Reflection: the editorial rules established earlier carried the rewrite — the lens registry is what kept each version on its own track. The substantive upgrade changed *evidence* and *structure* but did not require new contracts; that is the signal that the reading-contract model is doing its job.
