# Feature Specification: Book Foundation

**Feature Directory**: `001-book-foundation`
**Created**: 2026-08-17
**Last Updated**: 2026-08-17
**Status**: Active / Refreshed
**Input**: User description: "update with the latest changes"

## Clarifications

### Session 2026-08-17

- Q: Deployment target lock-in (GitHub Pages vs Vercel vs both) → A: **Vercel** — Phase A deploys exclusively to Vercel free tier. (GitHub Pages remains an option for future features if needed.)
- Q: Review workflow for lecture content PRs → A: **Lecturer + automated CI checks only** — no required human reviewer for Phase A. CI gates merge via build + lint (Biome + typecheck + frontmatter check + Lighthouse/Axe).
- Q: Chapter completeness — what counts as "no longer awaiting lecture"? → A: **Text-first, video-second co-authoring.** The project owner (Dell) and Claude Code co-research each topic; Claude Code writes detailed text lectures in MDX; Dell produces diagrams/illustrations (AI-generated) and records video lectures afterward. Documented in ADR-0002.
- Q: Stages 2–4 stub depth → A: **Complete chapter skeleton in place.** Stages 1–4 all have structured placeholder MDX files with frontmatter contracts. Stage 1 is the immediate active authoring target; Stages 2–4 will receive full text and video incrementally.
- Q: Vercel build/deploy failure recovery → A: **Trust Vercel atomic deploys.** A failed build never replaces the last successful deploy. No custom health check or notification wiring in book-foundation.
- Q: Textbook Entry Point & Framing → A: **Story-driven Introduction chapter preceding curriculum stages.** Sourced from official foundation documents (`problem_statement.md`, `solution_statement.md`, `curriculum.pdf`), articulating the two converging crises (fundamentals divide / vibe coding hangover + AI velocity / option paralysis), labor market shifts (+50% architect premium), Specification Poverty, and the four-stage Spec-Driven Engineering path.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the Story-Driven Introduction & Curriculum Overview (Priority: P1)

A prospective student lands on the textbook or clicks "Introduction" in the sidebar. They read a compelling narrative on why Spec-Driven Engineering exists — learning about the industry data (METR 19% slowdown, Veracode 45% vulnerability rate, Stack Overflow 84% adoption vs 29% trust, 40% drop in entry-level hiring), the concept of "Specification Poverty", and how the four stages guide them from zero to autonomous agent architect.

**Why this priority**: Motivates the student and sets the foundational mental model before diving into technical coursework.

**Independent Test**: Navigate to `/introduction`, verify the full narrative renders with proper typography, quotes, tables, and stage overview links.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the site, **When** they click "Introduction" in the sidebar, **Then** `/introduction` opens and renders the full story-driven chapter without errors.
2. **Given** a visitor reads the Introduction, **When** they reach the end, **Then** they see a clear call to action linking directly to Stage 1.

---

### User Story 2 - Read a Stage 1 Chapter with Clear Completion State (Priority: P1)

A student opens a Stage 1 chapter (e.g., Foundations, Core Programming, Frontend, Backend, Databases, Git & GitHub). They see the chapter outline, its current delivery state badge (`Placeholder — awaiting text`, `Text ready — video coming soon`, or clean video header), the text lecture, worked examples, and check-your-understanding questions.

**Why this priority**: Core learning delivery mechanism for the textbook.

**Independent Test**: Open any Stage 1 chapter (e.g. `/stage-01-spec-aware-vibe-engineering/01-foundations`), verify the chapter state banner renders correctly based on frontmatter, and all sections are readable.

**Acceptance Scenarios**:

1. **Given** a chapter has `chapter_state: "placeholder"`, **When** rendered, **Then** an informative amber notice indicates the chapter is undergoing active text co-authoring.
2. **Given** a chapter has `chapter_state: "text-ready"`, **When** rendered, **Then** a blue notice indicates text is complete and video recording is in progress.
3. **Given** a chapter has `chapter_state: "video-published"` with a `video_url`, **When** rendered, **Then** the video is prominently embedded and no placeholder banner is displayed.

---

### User Story 3 - Interactive Curriculum Dashboard & Data Visualization (Priority: P2)

A visitor scrolling the homepage interacts with the "Curriculum at a glance" dashboard — exploring chapters per stage via horizontal bar chart, total estimated hours breakdown via donut chart, and headline KPI metrics with animated counters.

**Why this priority**: Communicates the rigor, structure, and 100% free commitment of the curriculum visually and transparently.

**Independent Test**: Scroll to the DataViz section on the homepage; confirm BarChart, Donut, and KPIGrid render with accurate data (15 chapters, 4 stages, 2 Harvard certs, ~48h, $0 tuition).

**Acceptance Scenarios**:

1. **Given** a visitor views the homepage, **When** scrolling into the DataViz section, **Then** counters animate to their target values (4, 15, 2, 48h, 15+, $0).
2. **Given** a visitor hovers over chart bars or donut sectors, **When** interacted with, **Then** custom accessible tooltips display stage details.
3. **Given** a user has `prefers-reduced-motion: reduce` enabled, **When** loading the page, **Then** chart animations and counter transitions resolve instantly without motion.

---

### User Story 4 - Multi-Library Semantic Icon & Asset Hierarchy (Priority: P2)

A reader navigates documentation and LLM provider matrices. They see consistent visual cues: Phosphor icons for primary UI actions, Lucide icons for document-type semantics (chapters, videos, specs, checklists), and Tabler icons for external system/cloud service identity (Groq, Gemini, Ollama, Together, DeepSeek, OpenAI, Neon, Qdrant, Vercel).

**Why this priority**: Dense technical documentation requires instant visual categorization without becoming visual clutter.

**Independent Test**: Inspect `/llm-providers` and `/intro`; verify semantic icon chips render baseline-aligned with proper labels and accessible titles.

**Acceptance Scenarios**:

1. **Given** a reader views `/llm-providers`, **When** viewing the provider matrix, **Then** Tabler service chips annotate each provider row.
2. **Given** a reader views `/intro`, **When** viewing the format guide, **Then** Lucide document-type chips annotate content types.

---

### User Story 5 - Co-authoring, Quality Gate, and Continuous Deployment (Priority: P1)

The author co-researches and writes lecture MDX with Claude Code, commits changes, and pushes to GitHub. The CI pipeline executes frontmatter validation, TypeScript compilation, Biome formatting/lint checks, Docusaurus production build, and automated Lighthouse/Axe accessibility audits. On merge to `main`, Vercel deploys atomically at zero cost.

**Why this priority**: Ensures zero regressions, strict frontmatter adherence, high accessibility (WCAG AA), and continuous free-tier operation.

**Independent Test**: Run `node scripts/check-frontmatter.mjs && npx tsc --noEmit && npx docusaurus build && npx @biomejs/biome ci src`; verify all exit code 0.

**Acceptance Scenarios**:

1. **Given** any chapter MDX file is missing required frontmatter (`sidebar_label`, `sidebar_position`, `title`, `description`, `chapter_state`), **When** CI runs, **Then** the build fails with an explicit error naming the missing key.
2. **Given** all checks pass, **When** merged to `main`, **Then** Vercel deploys the updated static site in under 3 minutes.

---

## Edge Cases

- **Chapter has no text yet (`placeholder`)**: Marked with clear visual badge; frontmatter validation passes; build succeeds without broken links.
- **Chapter has text but video pending (`text-ready`)**: Text is fully readable; badge notes video is forthcoming; no video URL required.
- **Chapter has published video (`video-published`)**: Requires non-empty `video_url` frontmatter; validator fails if `video_url` is omitted.
- **Provider has no native brand icon in Tabler**: Fallback to conceptual system icon (e.g. `IconDeviceLaptop` for self-hosted Ollama, `IconBrain` for DeepSeek) with explicit title attribute.
- **User prefers reduced motion**: All animations (R3F hero, Lenis smooth scroll, Framer Motion reveals, Recharts transitions, AnimatedNumber counters) instantly deactivate or collapse to instant states.
- **Browser runs with JavaScript disabled**: Static SSG HTML renders complete text, navigation, and tables cleanly without layout shifts.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The textbook MUST render a sidebar containing: Introduction (`/introduction`), Welcome (`/intro`), and four collapsible curriculum stages (Stages 1–4) containing all 15 core chapters.
- **FR-002**: The textbook MUST provide a story-driven Introduction chapter (`docs/introduction.md`) integrating problem statement, solution statement, and curriculum structure.
- **FR-003**: Every chapter file MUST provide strict frontmatter: `sidebar_label`, `sidebar_position`, `title`, `description`, and `chapter_state` (`placeholder` | `text-ready` | `video-published`).
- **FR-004**: When `chapter_state: "video-published"`, the chapter MUST provide a valid `video_url` string in frontmatter.
- **FR-005**: The textbook MUST render an interactive 3D hero bridge on the homepage using React Three Fiber, falling back gracefully if WebGL is unavailable.
- **FR-006**: The homepage MUST provide an interactive data visualization section composed of `CurriculumBarChart`, `CurriculumDonut`, and `KPIGrid` built with Recharts and Radix token scales.
- **FR-007**: The design system MUST follow a three-tier icon taxonomy: Phosphor (primary UI), Lucide (doc semantics), Tabler (service/cloud identity).
- **FR-008**: The site MUST employ self-contained Open Props tokens and Radix Colors mapped through semantic `--tbb-*` CSS variables supporting light and dark modes.
- **FR-009**: All code snippets MUST render with syntax highlighting for Python, TypeScript, JavaScript, SQL, bash, and JSON.
- **FR-010**: The project MUST enforce automated code quality via `@biomejs/biome` linting/formatting and `check-frontmatter.mjs` pre-build checks.
- **FR-011**: The textbook MUST build statically with zero broken links (`onBrokenLinks: "throw"`) and deploy to Vercel free tier with $0 operating cost.
- **FR-012**: The platform MUST document free-tier LLM provider alternatives (`docs/llm-providers.md`) with a pluggable provider preference hierarchy (Ollama → Groq → Gemini → Together → DeepSeek → OpenAI).

### Key Entities

- **Stage**: One of four curriculum stages (1: Spec-Aware Vibe Engineering, 2: Credible Validation / CS50, 3: Mastering AI Coding Agents, 4: Engineering Autonomous Agents).
- **Chapter**: An MDX document within a stage representing a single lecture topic, tracked with an explicit lifecycle state (`placeholder` → `text-ready` → `video-published`).
- **Introduction**: Top-level narrative document framing the educational philosophy, economic imperatives, and specification-first methodology.
- **Design Token**: Semantic CSS custom property (`--tbb-*`) bridging primitive scales (Radix, Open Props) to contextual UI roles.
- **Icon Role**: Categorized icon glyph from Phosphor (action/navigation), Lucide (document artifact), or Tabler (external platform/service).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `npm run build` exits with code 0 from a fresh checkout with 100% static page generation.
- **SC-002**: Frontmatter validator (`scripts/check-frontmatter.mjs`) passes with 0 errors across all 23+ documentation and chapter files.
- **SC-003**: TypeScript compilation (`npx tsc --noEmit`) passes with 0 errors across all UI, chart, 3D, and icon components.
- **SC-004**: Homepage loads in ≤ 2.5 seconds on mobile 4G and achieves a Lighthouse performance score ≥ 90 and accessibility score ≥ 95.
- **SC-005**: All four stages and their 15 constituent chapters are navigable from the sidebar in ≤ 2 clicks from any page.
- **SC-006**: 100% of external infrastructure and hosting costs remain at $0.00 / month on free tiers.

## Assumptions

- **Content Delivery Model**: Co-authored text in MDX is authored first with Claude Code; high-resolution diagrams and video lectures are recorded/integrated by the project owner second (ADR-0002).
- **Free-Tier Primacy**: Default LLM provider configuration is `none`/free-tier (Groq, Gemini, Ollama); OpenAI is strictly gated as an optional fallback (ADR-0001).
- **Phase A Scope**: Static Docusaurus textbook on Vercel. Dynamic FastAPI backend stubs, RAG chatbot, and auth/payments are deferred to Phase B/C while interface contracts remain documented.

## Out of Scope

- Live RAG chatbot and vector search endpoints (Phase B).
- User authentication and persistent student profile database (Phase B).
- Paid digital product catalog, Stripe checkout, and file downloads (Phase C).
- Urdu translation and dynamic chapter personalization (Phase B).
- Third-party tracking analytics and cookie consent banners.
