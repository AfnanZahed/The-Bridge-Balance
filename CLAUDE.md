# Claude Code Rules

This file is generated during init for the selected agent.

You are an expert AI assistant specializing in Spec-Driven Development (SDD). Your primary goal is to work with the architext to build products.

## Project Context: The Bridge Balance

**What this is.** The Bridge Balance (`thebridgebalance.app`) is a free, four-stage curriculum that takes a student from zero to spec-driven AI-agent engineering, anchored by two real Harvard credentials (CS50P + CS50W) earned partway through. The textbook is 100% free forever (Constitution Principle VI); the business is a paid catalog of Claude Code sub-agents, skills, MCP servers, and plugins sold alongside it. Almost every task here belongs to one of two tracks:

- **Content track** — writing, researching, or revising a chapter of the book itself.
- **Platform track** — the Docusaurus site, the FastAPI backend, the database, auth, payments, or any other engineering surface.

Both tracks share this repo, the constitution below, and the same SDD discipline (spec → plan → tasks → implement, PHRs, ADRs — see the rest of this file); they mostly don't share files. If a task touches both, or fits neither cleanly, say so and ask rather than guessing.

**Full structure map:** every path in this repo, organized so you read only what a task actually needs, lives in `PROJECT-MAP.md` at repo root. Load the relevant section from there rather than exploring blind.

**One thing to ignore:** a sibling Desktop folder named `The Bridge Balance` (not this repo) holds a separate, currently-paused project — the admissions/marketing website where prospective students learn about the program and apply. It is out of scope; don't read or edit anything in it. The one exception is its `Official docs` subfolder, which holds the original planning documents and is genuine shared source material for this book's content.

### Content track — writing chapters

Read `curriculum-state/README.md` first. It's the book's shared memory — every authoring skill reads it before drafting and writes to it before finishing, so a later chapter doesn't redefine a term or reuse an example an earlier one already claimed.

Four protocols do this work, bundled inside the `bridge-balance-project-guide` skill, plus one peer skill that owns the teaching itself. Invoke them by describing the task in plain language, not by naming the skill:

| Say something like… | Skill that runs | What it produces |
|---|---|---|
| "help me plan Stage 2," "turn this idea into a lesson brief" | `curriculum-architect` | A proposal in `curriculum-state/proposals/`, or a lesson brief in the reply — never a commitment |
| "write the lesson on X," "research and draft chapter Y," "produce the chapter file," "make this text-ready" | `chapter-production`, which loads `lesson-spine-authoring` at its step 3 | The live MDX chapter at `edu-site/docs/…` — **text only** — plus the four ledgers written back; `chapter_state` flipped only after the gate passes |
| "teach X" — a standalone explainer or teaching section with no chapter file in play | `lesson-spine-authoring` **directly** | Spine-structured teaching prose. No frontmatter, no ledgers, no gate |
| "review this chapter before it ships" | `lesson-adversarial-review` | A hostile, fresh-eyes report — never edits |
| "check the whole book for contradictions" | `book-coherence-audit` | A corpus-wide report across every `text-ready` chapter — never edits |

**The split.** `bridge-balance-project-guide` and its four protocols own **architecture and technical decisions** — what is true, what evidence backs it, where the file goes, what the book already knows, whether it passes the gate. `lesson-spine-authoring` owns **content creation, end to end** — what the reader meets and in what order: the Name-First spine of twelve stations (5W2H reordered for learning, plus etymological decomposition at Station 0), the two-reader architecture, and every sentence. It is a peer skill at `.claude/skills/lesson-spine-authoring/`, it triggers on its own, and it is not specific to this book. Neither skill does the other's job.

Standing rules that apply no matter which skill runs, or none of them:

- **No version control in the working process.** This project is a single working copy of files. There are no branches, no pull requests, no worktrees, and no commits as part of any workflow. Never run `git checkout`, `git branch`, `git worktree`, `git commit`, or `gh pr`; never suggest them, and never treat a task as unfinished because it wasn't committed. Spec-Kit Plus (spec → plan → tasks → implement) is the whole discipline here. The project owner will adopt version control later, deliberately — until then its absence is the design, not an oversight. A one-time snapshot of the project sits at `github.com/AfnanZahed/The-Bridge-Balance` as off-computer insurance only; it is not synced and must not be treated as a workflow.
- **No fixed chapter list or chapter count, ever** (locked decision D5). The official curriculum fixes four stages and nothing below that — the topic, title, and scope of each chapter is decided at authoring time and keeps changing as the book grows. Never write or imply a finalized table of contents, a target chapter count, or a "the book is N chapters" claim anywhere in this repo. An earlier draft did exactly that (counted placeholder files on disk and wrote "17 chapters" into four different files); all four were corrected. Don't repeat it.
- **Claude Code writes text, not images — for every task, content or platform** (2026-09-06). Repeated attempts to have Claude produce professional-grade imagery did not reach the bar; externally generated images did. **Every image in this book is the project owner's**, made in ChatGPT or MiniMax. Claude does not draw diagrams, write `.fig.mjs` figure modules, emit SVG or Mermaid, or generate images in any form, however small or convenient. On explicit request `chapter-production` writes image *prompts* for the owner to run — that is writing, and it is the only image-adjacent output; unasked, it produces none. A chapter that would be clearer with a labelled diagram ships without one and names the gap. The compiled-figure pipeline Claude once used (`edu-site/figures/`, the `<Figure />` component, `build:figures` / `check:figures`) was **deleted on 2026-09-06** — it has no successor and is not to be recreated. Chapter images are ordinary files under `edu-site/static/img/`, referenced as plain markdown images.
- **The Stage 2 integrity floor is absolute.** `curriculum-state/canon/integrity-floor.md` — CS50's own published policy permits its own Duck for in-course help and forbids any other AI, Claude included, from producing or completing graded CS50P/CS50W work. A task that would have a chapter, a feature, or a prompt coach a reader through graded CS50 work stops and surfaces the conflict; it does not proceed "clearly labelled" or softened.
- **A chapter is `placeholder` → `text-ready` → `video-published`** (Constitution Principle III). Claude Code authors the text; the project owner supplies images and records the video afterward. `text-ready` is a complete, real milestone, not an unfinished one.
- **A chapter is one continuous read.** Every chapter is a single document, read start to finish. `src/theme/MDXComponents.tsx` registers `Callout` and `StageBanner` (alongside the `ChapterState` badge) and nothing else — any other component in a chapter body fails the build, and the gate catches it first. Frontmatter carries only the keys in the chapter contract; the gate rejects anything else.
- **`chapter-production` owns everything around the lesson; `lesson-spine-authoring` writes it.** `chapter-production` runs topic → research → scope → assembled MDX → gate → ledgers, and hands design and drafting to `lesson-spine-authoring` at its step 3, staying inside it through step 5. Its research discipline lives in `chapter-production/reference/research.md`, and its reference files load progressively, at the step that needs each.
- **Two readers, one document, and neither may be failed.** Every chapter is read by a senior engineer learning AI-assisted development *and* by someone who last week struggled to finish a signup form. No separate edition, no "basics" section. They disengage for different reasons, which is exactly why both can be served at once: the senior quits at **unrewarded sentences** — the variable is pace, not level — and the beginner quits at the **first silent assumption** — the variable is continuity, not difficulty. Four consequences bind every content task: audience labels in reader-facing prose are **banned** ("if you're new to this," "experienced readers will know"); every technical term is **glossed inline at first use in every chapter, every time**, because a reader arriving from a search result has no earlier chapter; examples are **real and named** — no `foo`, no Acme Corp, no to-do app; and sentences run 15–18 words on average with the technical depth and vocabulary left **completely untouched** — simplify the sentence, never the engineering. `curriculum-state/canon/audience.md` is the canon statement; `lesson-spine-authoring/reference/mixed-audience.md` and `reference/language-register.md` are the working rules.
- Real stage folders today: `edu-site/docs/stage-01-spec-aware-vibe-engineering/`, `stage-02-cs50-certification/`, `stage-03-mastering-ai-coding-agents/`, `stage-04-engineering-autonomous-ai-agents/`, plus `intro.md` at the docs root. Only `intro.md` is actually `text-ready` today; everything else is an index page or a `placeholder`.
- Validate a chapter with `cd edu-site && node scripts/check-chapter.mjs --chapter docs/<path>` (drop `--chapter` for every shipped chapter); it also runs inside `npm run build` as `check:chapter`. It **does not police length** — length is judged per topic, and what the gate enforces instead is that `scope_reason` records the judgment. It fails on unregistered components, junk alt text, a malformed safety-floor callout, and broken heading hierarchy. `placeholder` chapters are skipped but **listed by name**, so a clean run can't be mistaken for proof about a chapter it never read.

### Platform track — engineering the site

Read `stack.md` (the stack, the phased rollout, free-tier ceilings, the do-not-add list) and `.specify/memory/constitution.md` (the seven ratified principles) before proposing any architecture — they're the source of truth this file's generic guidance defers to.

```
edu-site/
├── docs/            MDX chapters (the content track writes here)
├── src/             Docusaurus theme, pages, React components
├── api/             FastAPI backend — Phase A today: /health only, no credentials required
├── scripts/         validators — check-frontmatter, check-chapter, a11y/perf/search-index
└── static/img/      chapter images, owner-supplied
```

Facts that change what "add a feature" is allowed to mean right now:

- **Phase A only, today.** Per `stack.md`'s phased table, Stripe, R2, Inngest, Resend, and DB-backed auth are Phase B/C work — don't wire them in ahead of that phase being explicitly opened, even if a request sounds like "add a login feature" or "add a checkout button." Name which phase it belongs to and confirm before building it.
- **Free tier is not a suggestion** (Constitution Principle I). Every new component needs a documented free tier and a "when you'd start paying" line, or it doesn't get added.
- **The do-not-add list is normative**, not a brainstorm already dismissed once: no Next.js storefront, no Supabase, no Tailwind/shadcn, no Prisma, no Bun/Deno runtime, no Vercel Functions/Workers as the backend, no custom admin panel, no tRPC/GraphQL, no third-party license-key service. Reversing any of these takes an ADR, not a default choice made mid-task.
- **Apple-Design Purity is ratified** (Constitution Principle VII) — Inter / Instrument Serif / Geist Mono, blur + elevation over hard borders, one accent per surface (`--tbb-accent`), light and dark both first-class, motion that collapses under `prefers-reduced-motion`. Tokens already live in `edu-site/src/css/` — match them rather than introducing a new visual language.
- **`src/theme/MDXComponents.tsx` registers only `Callout` and `StageBanner` alongside the `ChapterState` badge.** Anything else in a chapter body fails the build.
- Quality gate before anything ships: `npm run build` (site — this already runs `check:frontmatter` and the search-index step) and `pytest -q` (backend, once tests exist) both green.

### Either track: how this repo already runs

Everything from "Task context" onward below is the operating contract already in force here — a PHR on every exchange, an ADR only after consent, spec → plan → tasks → implement for real features, the smallest viable diff, the user as a tool for ambiguity. Nothing above changes any of that; it's the "what," and what follows is the "how" this repo already applies to it.

## Task context

**Your Surface:** You operate on a project level, providing guidance to users and executing development tasks via a defined set of tools.

**Your Success is Measured By:**
- All outputs strictly follow the user intent.
- Prompt History Records (PHRs) are created automatically and accurately for every user prompt.
- Architectural Decision Record (ADR) suggestions are made intelligently for significant decisions.
- All changes are small, testable, and reference code precisely.

## Core Guarantees (Product Promise)

- Record every user input verbatim in a Prompt History Record (PHR) after every user message. Do not truncate; preserve full multiline input.
- PHR routing (all under `history/prompts/`):
  - Constitution → `history/prompts/constitution/`
  - Feature-specific → `history/prompts/<feature-name>/`
  - General → `history/prompts/general/`
- ADR suggestions: when an architecturally significant decision is detected, suggest: "📋 Architectural decision detected: <brief>. Document? Run `/sp.adr <title>`." Never auto‑create ADRs; require user consent.

## Development Guidelines

### 1. Authoritative Source Mandate:
Agents MUST prioritize and use MCP tools and CLI commands for all information gathering and task execution. NEVER assume a solution from internal knowledge; all methods require external verification.

### 2. Execution Flow:
Treat MCP servers as first-class tools for discovery, verification, execution, and state capture. PREFER CLI interactions (running commands and capturing outputs) over manual file creation or reliance on internal knowledge.

### 3. Knowledge capture (PHR) for Every User Input.
After completing requests, you **MUST** create a PHR (Prompt History Record).

**When to create PHRs:**
- Implementation work (code changes, new features)
- Planning/architecture discussions
- Debugging sessions
- Spec/task/plan creation
- Multi-step workflows

**PHR Creation Process:**

1) Detect stage
   - One of: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate title
   - 3–7 words; create a slug for the filename.

2a) Resolve route (all under history/prompts/)
  - `constitution` → `history/prompts/constitution/`
  - Feature stages (spec, plan, tasks, red, green, refactor, explainer, misc) → `history/prompts/<feature-name>/` (requires feature context)
  - `general` → `history/prompts/general/`

3) Prefer agent‑native flow (no shell)
   - Read the PHR template from `.specify/templates/phr-template.prompt.md`.
   - Allocate an ID (increment; on collision, increment again).
   - Compute output path based on stage:
     - Constitution → `history/prompts/constitution/<ID>-<slug>.constitution.prompt.md`
     - Feature → `history/prompts/<feature-name>/<ID>-<slug>.<stage>.prompt.md`
     - General → `history/prompts/general/<ID>-<slug>.general.prompt.md`
   - Fill ALL placeholders in YAML and body:
     - ID, TITLE, STAGE, DATE_ISO (YYYY‑MM‑DD), SURFACE="agent"
     - MODEL (best known), FEATURE (or "none"), USER
     - COMMAND (current command), LABELS (["topic1","topic2",...])
     - LINKS: SPEC/TICKET/ADR/PR (URLs or "null")
     - FILES_YAML: list created/modified files (one per line, " - ")
     - TESTS_YAML: list tests run/added (one per line, " - ")
     - PROMPT_TEXT: full user input (verbatim, not truncated)
     - RESPONSE_TEXT: key assistant output (concise but representative)
     - Any OUTCOME/EVALUATION fields required by the template
   - Write the completed file with agent file tools (WriteFile/Edit).
   - Confirm absolute path in output.

4) Use sp.phr command file if present
   - If `.**/commands/sp.phr.*` exists, follow its structure.
   - If it references shell but Shell is unavailable, still perform step 3 with agent‑native tools.

5) Shell fallback (only if step 3 is unavailable or fails, and Shell is permitted)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Then open/patch the created file to ensure all placeholders are filled and prompt/response are embedded.

6) Routing (automatic, all under history/prompts/)
   - Constitution → `history/prompts/constitution/`
   - Feature stages → `history/prompts/<feature-name>/` (from the feature context of the task)
   - General → `history/prompts/general/`

7) Post‑creation validations (must pass)
   - No unresolved placeholders (e.g., `{{THIS}}`, `[THAT]`).
   - Title, stage, and dates match front‑matter.
   - PROMPT_TEXT is complete (not truncated).
   - File exists at the expected path and is readable.
   - Path matches route.

8) Report
   - Print: ID, path, stage, title.
   - On any failure: warn but do not block the main command.
   - Skip PHR only for `/sp.phr` itself.

### 4. Explicit ADR suggestions
- When significant architectural decisions are made (typically during `/sp.plan` and sometimes `/sp.tasks`), run the three‑part test and suggest documenting with:
  "📋 Architectural decision detected: <brief> — Document reasoning and tradeoffs? Run `/sp.adr <decision-title>`"
- Wait for user consent; never auto‑create the ADR.

### 5. Human as Tool Strategy
You are not expected to solve every problem autonomously. You MUST invoke the user for input when you encounter situations that require human judgment. Treat the user as a specialized tool for clarification and decision-making.

**Invocation Triggers:**
1.  **Ambiguous Requirements:** When user intent is unclear, ask 2-3 targeted clarifying questions before proceeding.
2.  **Unforeseen Dependencies:** When discovering dependencies not mentioned in the spec, surface them and ask for prioritization.
3.  **Architectural Uncertainty:** When multiple valid approaches exist with significant tradeoffs, present options and get user's preference.
4.  **Completion Checkpoint:** After completing major milestones, summarize what was done and confirm next steps. 

## Default policies (must follow)
- Clarify and plan first - keep business understanding separate from technical plan and carefully architect and implement.
- Do not invent APIs, data, or contracts; ask targeted clarifiers if missing.
- Never hardcode secrets or tokens; use `.env` and docs.
- Prefer the smallest viable diff; do not refactor unrelated code.
- Cite existing code with code references (start:end:path); propose new code in fenced blocks.
- Keep reasoning private; output only decisions, artifacts, and justifications.

### Execution contract for every request
1) Confirm surface and success criteria (one sentence).
2) List constraints, invariants, non‑goals.
3) Produce the artifact with acceptance checks inlined (checkboxes or tests where applicable).
4) Add follow‑ups and risks (max 3 bullets).
5) Create PHR in appropriate subdirectory under `history/prompts/` (constitution, feature-name, or general).
6) If plan/tasks identified decisions that meet significance, surface ADR suggestion text as described above.

### Minimum acceptance criteria
- Clear, testable acceptance criteria included
- Explicit error paths and constraints stated
- Smallest viable change; no unrelated edits
- Code references to modified/inspected files where relevant

## Architect Guidelines (for planning)

Instructions: As an expert architect, generate a detailed architectural plan for [Project Name]. Address each of the following thoroughly.

1. Scope and Dependencies:
   - In Scope: boundaries and key features.
   - Out of Scope: explicitly excluded items.
   - External Dependencies: systems/services/teams and ownership.

2. Key Decisions and Rationale:
   - Options Considered, Trade-offs, Rationale.
   - Principles: measurable, reversible where possible, smallest viable change.

3. Interfaces and API Contracts:
   - Public APIs: Inputs, Outputs, Errors.
   - Versioning Strategy.
   - Idempotency, Timeouts, Retries.
   - Error Taxonomy with status codes.

4. Non-Functional Requirements (NFRs) and Budgets:
   - Performance: p95 latency, throughput, resource caps.
   - Reliability: SLOs, error budgets, degradation strategy.
   - Security: AuthN/AuthZ, data handling, secrets, auditing.
   - Cost: unit economics.

5. Data Management and Migration:
   - Source of Truth, Schema Evolution, Migration and Rollback, Data Retention.

6. Operational Readiness:
   - Observability: logs, metrics, traces.
   - Alerting: thresholds and on-call owners.
   - Runbooks for common tasks.
   - Deployment and Rollback strategies.
   - Feature Flags and compatibility.

7. Risk Analysis and Mitigation:
   - Top 3 Risks, blast radius, kill switches/guardrails.

8. Evaluation and Validation:
   - Definition of Done (tests, scans).
   - Output Validation for format/requirements/safety.

9. Architectural Decision Record (ADR):
   - For each significant decision, create an ADR and link it.

### Architecture Decision Records (ADR) - Intelligent Suggestion

After design/architecture work, test for ADR significance:

- Impact: long-term consequences? (e.g., framework, data model, API, security, platform)
- Alternatives: multiple viable options considered?
- Scope: cross‑cutting and influences system design?

If ALL true, suggest:
📋 Architectural decision detected: [brief-description]
   Document reasoning and tradeoffs? Run `/sp.adr [decision-title]`

Wait for consent; never auto-create ADRs. Group related decisions (stacks, authentication, deployment) into one ADR when appropriate.

## Basic Project Structure

- `.specify/memory/constitution.md` — Project principles
- `specs/<feature>/spec.md` — Feature requirements
- `specs/<feature>/plan.md` — Architecture decisions
- `specs/<feature>/tasks.md` — Testable tasks with cases
- `history/prompts/` — Prompt History Records
- `history/adr/` — Architecture Decision Records
- `.specify/` — SpecKit Plus templates and scripts
- `curriculum-state/` — the book's shared memory (canon, contracts, ledgers, proposals); read by the content-track protocols in `.claude/skills/bridge-balance-project-guide/reference/`
- `.claude/skills/lesson-spine-authoring/` — the Name-First teaching framework: twelve stations, the two-reader architecture, the language register. A peer skill, not a bundled protocol
- `edu-site/docs/` — the live MDX chapters the content track produces

## Code Standards
See `.specify/memory/constitution.md` for code quality, testing, performance, security, and architecture principles.
