# The Book — Project Map

**Read this file to find where something lives. Do not read the files it points to until your current task actually needs them — that's the entire purpose of this map: know the shape of the repo without paying to read all of it every session.**

This map covers `Book/` only — the one live curriculum-and-platform repo. A separate Desktop folder, `The Bridge Balance`, holds a different, currently-paused project: the admissions/marketing website where prospective students learn about the program and apply. It is not part of this repo. Don't read it, don't edit it, don't let it influence anything here. The one exception is `The Bridge Balance\Official docs\` — `problem_statement.md`, `solution_statement.md`, `curriculum_1.md` — the original planning documents, which are genuine shared source material for this book's content and are also mirrored into this Claude Project's own knowledge base.

## Start here, by task

| If the task is… | Read first | Then act via |
|---|---|---|
| Writing, researching, or revising a chapter | `curriculum-state/README.md`, then the relevant `curriculum-state/canon/*.md` | The matching skill below |
| Planning a stage, sequencing lessons, scoping a brief | `curriculum-state/ledgers/prerequisite-graph.yaml` | `curriculum-architect` |
| Reviewing one finished chapter | nothing extra — the skill reads what it needs | `lesson-adversarial-review` |
| Checking the whole book for drift or contradictions | nothing extra | `book-coherence-audit` |
| Adding or changing a site feature — frontend, backend, database, API | `stack.md`, `.specify/memory/constitution.md` | Normal SDD flow: `/sp.specify` → plan → tasks → implement |
| Checking what's actually built vs. stubbed in the backend | `README.md`'s Phase A status table, then `edu-site/api/app/` directly | — |
| Any visual design, CSS, or theming work | Constitution Principle VII (Apple-Design Purity), then `edu-site/src/css/` | — |

## Top-level layout

```
Book/
├── CLAUDE.md              Claude Code's operating rules — read automatically, every session
├── PROJECT-MAP.md         this file
├── README.md              human-facing overview, current phase status table
├── stack.md               the stack, phased rollout, free-tier ceilings, do-not-add list
├── INSTALL.md             how the curriculum-state + quality-gate pieces were installed
├── The Bridge Balance - Platform Spec.docx   original platform spec (reference)
├── curriculum-state/      the book's shared memory — canon, contracts, ledgers, proposals
├── .claude/skills/        bridge-balance-project-guide (+ 4 bundled protocols)
│                       and lesson-spine-authoring (peer skill, the teaching framework)
├── edu-site/              the actual website: textbook frontend + FastAPI backend
├── specs/<NNN-feature>/   Spec-Kit Plus feature specs (spec.md, plan.md, tasks.md)
├── history/prompts/       Prompt History Records, routed by feature (or general/constitution)
├── history/adr/           Architecture Decision Records (0001–0003 so far)
├── .specify/              Spec-Kit Plus templates, scripts, and memory/constitution.md
└── _to_delete/            leftover files staged for manual deletion — safe to ignore
```

## Content & curriculum system

| Path | What it is | Read it when… |
|---|---|---|
| `curriculum-state/README.md` | Index of the whole shared-memory layer | Starting any content task |
| `curriculum-state/canon/thesis.md` | Core thesis + the four-stage table | Writing anything that states what a stage covers |
| `curriculum-state/canon/audience.md` | The two readers, their reading conditions, and the two language decisions canon makes (British spelling; Urdu glosses permitted, never required). Defers the audience architecture to `lesson-spine-authoring` | Starting any content task |
| `curriculum-state/canon/voice.md` | Voice, the two tests, banned phrases. One voice for every chapter, every stage | Drafting any prose |
| `curriculum-state/canon/integrity-floor.md` | The CS50 academic-integrity hard stop | Any Stage 2 work, even structural planning |
| `curriculum-state/contracts/calibration.md` | The 150 wpm reading baseline and the `scope_multiplier` anchor. The chapter output contract lives in `chapter-production/SKILL.md` step 6 (frontmatter) and its `reference/gate.md` (what's enforced). | Estimating chapter length |
| `curriculum-state/ledgers/*.yaml` | Four ledgers: concept, evidence, example, prerequisite-graph | Before drafting — the skills do this automatically |
| `curriculum-state/proposals/` | Non-binding stage/lesson proposals | Planning only; never treat as committed |

## The four protocols — `.claude/skills/bridge-balance-project-guide/reference/<name>/SKILL.md`

These own **architecture and technical decisions**. The teaching itself belongs to the peer skill in the next section.

| Skill | Job | Also loads |
|---|---|---|
| `curriculum-architect` | Stage planning, lesson briefs, prerequisite-graph health checks | `reference/brief-format.md` |
| `chapter-production` | Topic → shipped, gate-passing MDX chapter: everything around the lesson — integrity check, research, ledgers, scope, assembly, the gate. **It does not write the lesson**; `lesson-spine-authoring` does, from step 3. **Text only** — never images, diagrams, SVG or Mermaid | `reference/research.md`, `gate.md`, `ledgers-protocol.md` per step; **`lesson-spine-authoring` at step 3, held through step 5**; `image-prompts.md` only when image prompts are explicitly requested |
| `lesson-adversarial-review` | Hostile, fresh-eyes review of one chapter | — |
| `book-coherence-audit` | Corpus-wide pattern checks across chapters | — |

Each protocol loads its own `reference/` files only when its own steps call for them. That's already progressive disclosure — don't pre-read a protocol's reference files before it is actually invoked.

## The peer skill — `.claude/skills/lesson-spine-authoring/`

Owns **content creation, end to end**: what the reader meets and in what order. Not bundled under the guide, has its own description, and triggers on its own. Added 2026-09-06.

| File | What it is | Read it when… |
|---|---|---|
| `SKILL.md` | The Name-First workflow: classify shape, run Station 0, fill the station sheet, draft the spine, layer footholds and depth blocks, close on retrieval | Any teaching prose, for this book or not |
| `reference/stations.md` | The twelve stations — 5W2H reordered for learning, split, and extended at both ends. Their weighting by lesson shape | **In full, before drafting anything** |
| `reference/name-registers.md` | Station 0's four registers and the etymology verification protocol, with a pre-verified term bank | Before Station 0, on any topic with a name worth decomposing |
| `reference/mixed-audience.md` | The two disengagement conditions, both-audience content, spine / footholds / depth blocks, the delete test | Before drafting prose, first time in a session |
| `reference/language-register.md` | Every sentence in the book: length, idioms, phrasal verbs, Latinate padding, anchors, dates and currency | Before drafting prose, first time in a session |

This skill writes the lesson, start to finish. `chapter-production` delegates to it and does not duplicate, summarise or second-guess it.

## The website — `edu-site/`

| Path | What it is | Read it when… |
|---|---|---|
| `edu-site/docs/` | The live MDX chapters — see inventory below | Working on chapter content directly |
| `edu-site/src/components/` | React components: `Aceternity/`, `AnimatedNumber/`, `BrandMark/`, `Callout/`, `ChapterState/`, `DataViz/`, `HomepageHero/`, `IconWave/`, `MagicUI/`, `ReadingProgress/`, `SiteMenu/`, `StageCard/`, `icons/`, `motion/`, `stage-icons/`, `topic-icons/` | Frontend component work |
| `edu-site/src/css/` | Theme tokens — the Apple-Design Purity implementation | Any styling work |
| `edu-site/src/pages/`, `edu-site/src/theme/` | Custom pages, Docusaurus theme swizzles | Site-structure or layout work |
| `edu-site/docusaurus.config.ts`, `edu-site/sidebars.ts` | Site config, nav and sidebar structure | Adding a section, changing navigation |
| `edu-site/api/app/main.py` | FastAPI entrypoint | Any backend work — start here |
| `edu-site/api/app/config.py` | Pydantic Settings — all runtime config flows through this | Adding any config value or env var |
| `edu-site/api/app/db/neon.py` | Postgres connection (Neon) | Database work |
| `edu-site/api/app/llm/` | Pluggable LLM abstraction — `base.py`, `registry.py`, `router.py`, `providers/*.py` (openai, groq, gemini, deepseek, ollama, together, none) | Anything touching an LLM call |
| `edu-site/api/app/rag/qdrant.py` | Vector search | RAG or chat work |
| `edu-site/api/app/routers/` | `chat.py`, `health.py`, `personalize.py`, `translate.py` — scaffolded; most return 501 until their phase opens | Wiring up an API route |
| `edu-site/api/tests/` | Backend tests, run with `pytest -q` | After any backend change |
| `edu-site/scripts/` | `check-frontmatter.mjs`, `check-references.mjs`, `check-chapter.mjs` (the chapter gate), `generate-search-index.mjs`, `generate-chapter-manifest.mjs`, `axe.mjs`, `lighthouse.mjs`, `serve-and-test.mjs` | Running any quality gate |
| `edu-site/package.json` | Every npm script — `build`, `start`, `typecheck`, `lint`, `test:*` | Before running any site command |

## Current chapter inventory — a snapshot, not a target (see `CLAUDE.md`'s D5 rule: never treat this as final)

- `docs/intro.md` — the only chapter actually `text-ready` today.
- `docs/perf-targets.md` — a reference doc, not a chapter.
- `stage-01-spec-aware-vibe-engineering/` — index + 6 placeholder shells: foundations, core-programming, frontend, backend, databases, git-github.
- `stage-02-cs50-certification/` — index + 2 placeholder shells: cs50p, cs50w.
- `stage-03-mastering-ai-coding-agents/` — index + 4 placeholder shells: claude-code, context-engineering, prompt-engineering, skills-and-mcp.
- `stage-04-engineering-autonomous-ai-agents/` — index + 3 placeholder shells: evaluations, multi-agent-systems, rag-and-tool-calling.

This list goes stale the moment a chapter is authored, renamed, or added. Re-list `edu-site/docs/` directly rather than trusting this table for anything beyond a rough starting orientation.

## Governance & process — already fully wired; see `CLAUDE.md` for the operating rules themselves

| Path | What it is |
|---|---|
| `.specify/memory/constitution.md` | The seven ratified project principles — supersedes everything else here if there's ever a conflict |
| `specs/<NNN-feature>/{spec,plan,tasks}.md` | Every feature's formal record, past and present |
| `history/adr/` | The decision record. 0004 (two-skill content split) is the one that governs content work today. See `history/adr/README.md` for the full index. |
| `history/prompts/` | Verbatim record of every meaningful exchange, routed by feature |
