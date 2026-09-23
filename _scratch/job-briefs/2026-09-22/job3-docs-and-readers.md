# Job 3 - docs alignment and reader-facing corrections

Repo: `C:\Users\Dell\Desktop\Book`. Two parts. Work file by file, apply exactly what is written here, and change nothing else. Never run a build or test command. Never touch `history/prompts/`, `specs/`, `_scratch/`, any `.ts`/`.tsx` file, or any file not named below.

## The facts you are applying

The curriculum moved from five stages to four on 2026-09-22. Anything in a live document that says five stages, or names a retired stage, is now wrong.

| Retired | Now |
|---|---|
| Stage 0 "Introduction to Computing: From Switches to AI Agents" | **Stage 0 — Introduction to SDE** (same files, docs root) |
| Stage 1 "Spec-Aware Vibe Engineering Foundations", folder `stage-01-spec-aware-vibe-engineering/` | **Stage 1 — SDE Mastery (AI-Driven)**, folder `stage-01-sde-mastery-ai-driven/` — old Stage 1 and old Stage 3 merged |
| Stage 2 "Credible Validation Through International Certification", folder `stage-02-cs50-certification/` | **Stage 2 — Credentials**, folder `stage-02-credentials/` |
| Stage 3 "Mastering AI Coding Agents", folder `stage-03-mastering-ai-coding-agents/` | **retired** — merged into Stage 1 |
| Stage 4 "Engineering Autonomous AI Agents", folder `stage-04-engineering-autonomous-ai-agents/` | **Stage 3 — SDE Mastery (AI-Native; Agentic AI)**, folder `stage-03-sde-mastery-ai-native/` |

Route map: `/stage-01-spec-aware-vibe-engineering/` → `/stage-01-sde-mastery-ai-driven/`; `/stage-02-cs50-certification/` → `/stage-02-credentials/`; `/stage-03-mastering-ai-coding-agents/` → `/stage-01-sde-mastery-ai-driven/`; `/stage-04-engineering-autonomous-ai-agents/` → `/stage-03-sde-mastery-ai-native/`.

The em dash is U+2014, the same character already used in these files.

## Part A - repo documents

For every file below: replace retired folder paths with their new paths, replace retired stage names with the new names, and change a count of five stages to four. **Do not rewrite any sentence that contains none of those three things.** Every change must be reported as an exact old line → new line pair.

1. `CLAUDE.md`
   - `a free, five-stage curriculum` → `a free, four-stage curriculum`.
   - The whole bullet that begins `Real stage folders today:` is replaced by this text (find the bullet that starts with that phrase; it ends just before the bullet beginning `Validate a chapter with`):

     `- Real stage folders today: edu-site/docs/stage-01-sde-mastery-ai-driven/, edu-site/docs/stage-02-credentials/, edu-site/docs/stage-03-sde-mastery-ai-native/, plus two Stage 0 sets at the docs root — the new chronological ladder (ch00-introduction.md, ch01-foundations.md, ch02-programming-is-born.md, and the chapters still to come) and the book's original five-chapter sequence (intro-1-binary-to-programming.md through intro-5-spec-driven-engineering.md), which stays live until the owner retires it. The curriculum has four stages since 2026-09-22 (canon/course-structure.md; specs/011-curriculum-redesign/): old Stage 3 merged into Stage 1, and old Stage 4 is now Stage 3. Current status, per curriculum-state/ledgers/prerequisite-graph.yaml: the stage index pages and every Stage 0 chapter are text-ready; every chapter inside Stages 1, 2 and 3 remains placeholder. Stage 1's six original chapters were authored and shipped text-ready on 2026-09-11, then reverted to placeholder on 2026-09-17 on owner instruction (the run was flagged as unauthorized) — do not re-author them without new explicit instruction. The Stage 0 sequence, though text-ready, is mid-redesign into an officially-promoted, from-scratch chronological Stage 0 (see curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md), so its current text should not be treated as final.`

     Keep the backticks around file paths as in the original bullet, and keep the bullet as one paragraph.
   - If any other line in the file names a retired folder or says five stages, fix it the same way and report it.

2. `PROJECT-MAP.md` and `.claude/skills/bridge-balance-project-guide/reference/project-map.md` (same two edits in both files)
   - `Core thesis, the five-stage table, the six invariants` → `Core thesis, the four-stage table, the six invariants`.
   - `stages.ts (the five stage labels + routes, shared by the drawer)` → `stages.ts (the four stage labels + routes, shared by the drawer)`.
   - In `PROJECT-MAP.md` only: replace the whole section under the heading `## Current chapter inventory` — the intro line and every bullet down to the line beginning `This list goes stale` — with:

     `- Stage 0 lives at the docs root in two sequences: the original five chapters (intro-1-binary-to-programming.md through intro-5-spec-driven-engineering.md), all text-ready today but mid-redesign, and the new chronological ladder (ch00-introduction.md, ch01-foundations.md, ch02-programming-is-born.md), where the rest of that ladder will be written.`

     `- stage-01-sde-mastery-ai-driven/ — Stage 1, SDE Mastery (AI-Driven), the old Stage 1 and old Stage 3 merged: index plus ten placeholder chapters (01-foundations, 02-core-programming, 03-frontend, 04-backend, 05-databases, 06-git-github, prompt-engineering, context-engineering, claude-code, skills-and-mcp). The six original Stage 1 chapters shipped text-ready on 2026-09-11 and were reverted to placeholder on 2026-09-17 on owner instruction.`

     `- stage-02-credentials/ — Stage 2, Credentials: index plus two placeholder shells, cs50p and cs50w.`

     `- stage-03-sde-mastery-ai-native/ — Stage 3, SDE Mastery (AI-Native; Agentic AI), the old Stage 4: index plus three placeholder shells (rag-and-tool-calling, multi-agent-systems, evaluations).`

     `- docs/perf-targets.md — a reference doc, not a chapter.`

     `- The four-stage shape is decided in curriculum-state/canon/course-structure.md; the slice that applied it is specs/011-curriculum-redesign/.`

     Keep the existing intro line that begins `- The Stage 0 sequence at the docs root` only if it is not one of the bullets replaced above; otherwise drop it. Write the paths in backticks, matching the surrounding style.

3. `.claude/skills/bridge-balance-project-guide/SKILL.md`
   - `a free, five-stage curriculum` → `a free, four-stage curriculum`.
   - Any retired stage folder or stage name: apply the map.

4. `.claude/skills/bridge-balance-project-guide/reference/curriculum-architect/SKILL.md`
   - `the five stages' real focus lines` → `the four stages' real focus lines`.
   - Any other five-stage claim or retired name: apply the map.

5. `.claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md`
   - `the five stages` → `the four stages` (wherever it appears as a factual statement).

6. `.claude/skills/bridge-balance-project-guide/reference/book-coherence-audit/SKILL.md`
   - `the five stages` → `the four stages`; retired names: apply the map.

7. `curriculum-state/README.md`
   - `the official curriculum sets five stages (0 through 4)` → `the official curriculum sets four stages (0 through 3, Stage 3 being SDE Mastery (AI-Native; Agentic AI))`.
   - Add one sentence at the end of that same paragraph: `The stages were restructured on 2026-09-22; see canon/course-structure.md and specs/011-curriculum-redesign/.`

8. `edu-site/README.md` — apply the folder/name map wherever a stage folder or stage name appears.

9. `history/reports/PROJECT-REPORT.md` and `history/reports/INSTALL.md` — these two are scanned for dead references, so every retired folder path or retired stage name in them must be repointed to the new path or name. Do not rewrite anything else in them, and do not remove the dated statements they make; if a sentence cannot be repointed without changing its meaning, leave the sentence and report it.

10. `stack.md` and `README.md` (repo root) — if either names a retired stage folder or a retired stage name, apply the map. Report if neither does.

**Do NOT touch these files at all** (Claude edits them separately): `curriculum-state/canon/course-structure.md`, `curriculum-state/canon/thesis.md`, `curriculum-state/canon/naming.md`, `curriculum-state/canon/audience.md`, `curriculum-state/canon/corrections.md`.

## Part B - reader-facing corrections

Apply each pair exactly as written. Every one of these appears once in its file.

### `edu-site/docs/welcome.md`

1. In the frontmatter, `how the five stages fit together` → `how the four stages fit together`.
2. In the frontmatter, `edX, five stages]` → `edX, four stages]`.
3. In the frontmatter `scope_reason`, `the five-stage table as one unit` → `the stage table as one unit`.
4. Replace the whole markdown table that begins `| Stage | What it covers | What you leave able to do |` and its five data rows with exactly:

```
| Stage | What it covers | What you leave able to do |
|---|---|---|
| **0 — Introduction to SDE** | The history of computing, from binary through today's AI-coding-agent era | Explain what a computer is actually doing, and why Spec-Driven Engineering exists |
| **1 — SDE Mastery (AI-Driven)** | Real frontend, backend and database work, learned side by side with prompt, context and loop engineering, Claude Code, skills and MCP | Ship a working application, read its code well enough to own it, and direct a coding agent with real skill rather than guesswork |
| **2 — Credentials** | Harvard's CS50P and CS50W | Hold two genuine Harvard credentials — free to complete; edX prices the optional verified certificate |
| **3 — SDE Mastery (AI-Native; Agentic AI)** | Tool calling, RAG, evaluations, multi-agent systems | Design and build AI agents yourself, not just use someone else's |
```

5. `The [FAQ](/faq#what-are-the-five-stages) has the full breakdown. **The five stages are fixed;` → `The [FAQ](/faq#what-are-the-four-stages) has the full breakdown. **The four stages are fixed;`
6. `the same discipline carries you to building autonomous AI agents yourself in Stage 4.` → `the same discipline carries you to building autonomous AI agents yourself in Stage 3.`
7. `- **Stage** — one of five large arcs, 0 through 4, always in the same order.` → `- **Stage** — one of four large arcs, 0 through 3, always in the same order.`
8. `Spec-Driven Engineering runs from Stage 0's history lesson to Stage 4's autonomous agents` → `Spec-Driven Engineering runs from Stage 0's history lesson to Stage 3's autonomous agents`
9. `the first chapter, and the start of all five stages` → `the first chapter, and the start of all four stages`

### `edu-site/docs/faq.md`

1. Frontmatter description: `how the five stages work` → `how the four stages work`.
2. `A free, five-stage curriculum` → `A free, four-stage curriculum`.
3. `## What are the five stages?` → `## What are the four stages?`
4. Replace the five bullet list items that follow that heading with exactly these four bullets, in this order:

```
- **[Stage 0 — Introduction to SDE](/intro-1-binary-to-programming).** The history of computing and software, read in the order it happened, from binary through today's AI-coding-agent era, plus the Spec-Driven Engineering and reading habits the rest of the book depends on.
- **[Stage 1 — SDE Mastery (AI-Driven)](/stage-01-sde-mastery-ai-driven/).** The engineering foundations and the AI coding agents learned together: architecture, programming, frontend, backend, databases and Git alongside prompt, context and loop engineering, Claude Code, skills and MCP.
- **[Stage 2 — Credentials](/stage-02-credentials/).** The two Harvard certificates, paired with the GitHub portfolio your work builds.
- **[Stage 3 — SDE Mastery (AI-Native; Agentic AI)](/stage-03-sde-mastery-ai-native/).** RAG, tool calling, multi-agent systems, and evaluations — designing and building agentic systems of your own.
```

5. `The curriculum fixes five stages and commits to nothing below them` → `The curriculum fixes four stages and commits to nothing below them`.

### `edu-site/docs/ch00-introduction.md`

`Welcome to the first of five stages,` → `Welcome to the first of four stages,`

### `edu-site/docs/code-of-conduct.md`

`a free, five-stage curriculum` → `a free, four-stage curriculum`

### `edu-site/docs/changelog.md`

Insert this entry immediately after the intro paragraph (the line ending `this page is for changes a reader would notice or care about.`) and before the first `### ` heading, with one blank line on each side:

```
### 2026-09-22

- **The curriculum is four stages now, not five.** Stage 0 is *Introduction to SDE*, and it is where the book starts. Stage 1 is *SDE Mastery (AI-Driven)* — the old Stage 1 and the old Stage 3 brought together, so the engineering foundations and the AI coding agents are learned side by side instead of one after the other. Stage 2 is *Credentials*, the two Harvard certificates, renamed from *Credible Validation*. Stage 3 is *SDE Mastery (AI-Native; Agentic AI)*, the old Stage 4. Every stage link, the sidebar, the footer and the homepage cards now name the four stages the same way.
```

## Final answer

Report: for every file, each exact old line → new line pair you applied; every sentence you deliberately left alone because it needed new prose; every retired name or five-stage claim you found that this brief did not name; and a statement that no other file was touched.
