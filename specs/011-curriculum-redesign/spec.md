# 011 — Curriculum Redesign: Stage Structure Landing

Status, 22 September 2026: halted. The four-stage structure this spec lands was superseded the same day by the Agentic-inside-SE decision (curriculum-state/canon/course-structure.md, CS-12). Do not resume T007–T012.

**Status:** in progress (slice 1 of the redesign) — halted 2026-09-22; see the note above.
**Owner approval:** 2026-09-22, this session — "land the structure now", renaming for real, recording the work split by track.
**Track:** platform (site, config, ledgers) — the content track's record for the same work lives in `curriculum-state/canon/course-structure.md`.

## Why this exists

The whole-curriculum redesign was decided on 21–22 September 2026 (`course-structure.md`, CS-1 to CS-11): five stages become four, learning becomes parallel, old Stage 1 and old Stage 3 merge into one stage. Nothing was applied. The site, the sidebar, the stage labels, the ledgers and the reader-facing pages still carry the five retired stage names, and two stage folders created for the merge (`stage-01-sde-mastery-ai-driven`, `stage-03-sde-mastery-ai-native`) exist on disk but are referenced by nothing.

Every later redesign step — Courses, chapter lists, the one-page front matter — has to name its stage on a live site. So the structure lands first and alone.

## Scope

**In scope**

- The four stage folders, and the three retired folders.
- `edu-site/sidebars.ts`, `edu-site/src/lib/stages.ts`, `edu-site/docusaurus.config.ts` (footer), `edu-site/src/pages/index.tsx`, `edu-site/src/pages/404.tsx`, `edu-site/src/components/HomepageHero/index.tsx`.
- `curriculum-state/ledgers/prerequisite-graph.yaml` (paths, stages, positions, ids, progress counts) and any ledger `path:`/`used_in:`/`first_defined:` value naming a retired folder.
- Every file the reference gate scans that names a retired stage folder or one of the five retired stage names: `CLAUDE.md`, `PROJECT-MAP.md`, `stack.md`, `edu-site/README.md`, `history/reports/PROJECT-REPORT.md`, `history/reports/INSTALL.md`, `.claude/skills/bridge-balance-project-guide/**`, `.claude/skills/lesson-spine-authoring/**`, `curriculum-state/**`, `edu-site/docs/**`.
- The reader-facing stage table and stage list (`welcome.md`, `faq.md`, `ch00-introduction.md`, `code-of-conduct.md`), corrected only where they state the stage list.
- A changelog entry, and the canon-side record of what this slice closed.

**Out of scope (deliberately)**

- Any chapter prose. No chapter is authored, re-authored or edited in this slice.
- The Course level's contents (difficulty bands) — the next redesign step, not this one.
- The one-page front matter (CS-Q6) — parked; `welcome.md` gets factual corrections only.
- The component palette (`Source`, `KeyTakeaway`, `Steps`, `Collapse`).
- The two skill folder renames (`lesson-spine-authoring`, `lesson-adversarial-review`) — deferred to the end of the redesign.
- Version control. No commit, branch or push is part of this work.

## Requirements

| # | Requirement | How it is proven |
|---|---|---|
| R1 | The live site renders four stages — Stage 0 Introduction to SDE, Stage 1 SDE Mastery (AI-Driven), Stage 2 Credentials, Stage 3 SDE Mastery (AI-Native; Agentic AI) — in the sidebar, the drawer, the Spotlight, the footer and the homepage cards. | `npm run build` passes; scroll every surface in the running build. |
| R2 | No file the reference gate scans names a retired folder (`stage-01-spec-aware-vibe-engineering`, `stage-02-cs50-certification`, `stage-03-mastering-ai-coding-agents`, `stage-04-engineering-autonomous-ai-agents`) or one of the five retired stage names. | Repo-wide grep over the scanned paths returns zero hits; `check-references.mjs` passes. |
| R3 | The two folders created for the merge are the live ones, their chapter files carry the frontmatter the gate requires, and the three retired folders are gone (backed up under `_scratch/` first). | `check-frontmatter.mjs` passes; the retired paths do not exist. |
| R4 | Every ledger `path:` names a file that exists, and every `requires:`/`first_introduced:` names an id that exists. | `check-references.mjs` (ledger pass) and `check-references.mjs` (`first-introduced-unknown`). |
| R5 | Every reader-facing sentence that states how many stages the book has states four, and every stage link resolves. | `onBrokenLinks: "throw"` in the build; the four pages read by hand. |
| R6 | The work is resumable: this spec, its `plan.md` and `tasks.md` carry live status, and a PHR records the exchange. | This folder, plus `history/prompts/general/`. |

## Success criteria

- The five-gate chain (`check:frontmatter` → `check:refs` → `check:chapter` → chapter manifest → search index → `docusaurus build`) exits 0.
- `grep` for the four retired folder slugs and the five retired stage names over the scanned paths returns nothing but dated historical notes that are explicitly kept.
- A later session can read `tasks.md`, see every task's state, and continue without re-deriving anything.

## Open questions this slice does not answer

1. **The audience of the material that moved.** Old Stage 3 (AI coding agents) is parked on audience; it now sits inside new Stage 1, which is beginner-first. Recorded as CS-Q7 in `course-structure.md`. *(22 September 2026: CS-Q7 in `course-structure.md` became the zero-knowledge floor question and was answered — **Stages 0–1**.)*
2. **Stage 2's promise.** Whether the Credentials page may say more certificates are coming. The page states what exists today only, until the owner rules.
3. **Level wording.** `welcome.md` still says "Lesson or Part" where CS-8 decided Chapter → Lesson → Part (if any). Deferred to the front-page work.
