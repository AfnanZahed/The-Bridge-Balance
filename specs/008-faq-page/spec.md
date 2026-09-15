# Feature Specification: FAQ Reference Page

**Feature Directory**: `008-faq-page`
**Created**: 2026-09-14
**Status**: Draft
**Input**: User description: "No FAQ anywhere — if it is cheaper task, do it yourself, and if this task will consume more tokens, use command code with deepseek v4.1 flash to implement the plan and spec, and then in a new terminal, again deepseek for fact-checking and verifying the previous session's implementation and +/- points."

## Context

The book has no FAQ anywhere in the repo (confirmed: zero `faq.md` or equivalent across every doc folder, 2026-09-14 audit). CS50's and Hugging Face's own free-course pages both lean on an explicit FAQ/"what are the prerequisites"/"how does certification work" section to answer the questions a first-time visitor has before they commit any time. This feature adds the same for The Bridge Balance, as a real reference page — not marketing copy, not a chapter.

This is a **reference/platform page**, not curriculum content: it does not go through `chapter-production` or `lesson-spine-authoring`, carries no `chapter_state` or `content_kind` (same exemption as `glossary.md`, `perf-targets.md`, `changelog.md` — see `scripts/check-frontmatter.mjs`'s `STAGE_FILES` allowlist), and is not subject to the two-reader spine structure. It **is** still subject to every factual constraint in `CLAUDE.md` and `curriculum-state/`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A first-time visitor gets a straight answer (Priority: P1) 🎯 MVP

As someone who just found the site (from a search result, a social post, or a link), I want a single page answering the questions I'd otherwise have to dig for — is this really free, who is it for, what do I actually get, how long does it take, do I need to follow the stages in order, how do I get help if I'm stuck — so I can decide whether to start without emailing anyone.

**Why this priority**: it is the entire point of the page, and independently shippable as one static doc.

**Independent Test**: Load `/faq`. Every question below has a real, specific answer (no "TBD", no placeholder text). Reading it top to bottom answers all of: what this is, who it's for, cost (both the textbook and the CS50 certificates), the five-stage shape, pacing, how to get help today, and whether there's a Bridge-Balance-issued certificate.

**Acceptance Scenarios**:

1. **Given** the FAQ page, **When** a reader asks "is this really free," **Then** the answer distinguishes the textbook (100% free forever, Constitution Principle VI) from the two Harvard CS50 certificates (auditing CS50 is free; a verified/professional certificate from edX costs money and is optional) — matching CS50W's own real pricing structure, not glossed over.
2. **Given** the FAQ page, **When** a reader asks "how many chapters / how long will this take," **Then** the answer explains the curriculum is organized in five stages and deliberately never fixes a chapter count or total hour figure in advance (locked decision D5) — it does not state or imply any specific number.
3. **Given** the FAQ page, **When** a reader asks "is there a community or way to get help," **Then** the answer states plainly that there is no Discord/forum today, and that an AI help chatbot (RAG-based) is planned — it does not invent a live community channel.
4. **Given** the FAQ page, **When** a reader asks "can I contribute / suggest a change," **Then** the answer does not invite GitHub pull requests or issues as a live workflow — the repo's GitHub copy is a one-time off-computer snapshot only, not synced, per `CLAUDE.md`.
5. **Given** the FAQ page, **When** a reader asks "do I get a certificate from The Bridge Balance itself," **Then** the answer is honest that the two real, portable credentials are CS50's own (CS50P, CS50W), and does not claim a Bridge-Balance-issued certificate or completion tracking exists today (that infrastructure is Phase B/C, not live).

### User Story 2 - Nothing on the page is invented (Priority: P1)

As the project owner, I want every FAQ answer traceable to a real fact already stated in this repo (CLAUDE.md, stack.md, the Constitution, or a shipped page), so the FAQ can't drift from reality the way the old "17 chapters" incident did.

**Why this priority**: an inaccurate FAQ is worse than none — it's a page whose entire job is being trustworthy.

**Independent Test**: A second, independent review (separate session/context from whoever drafted it) checks every claim in the FAQ against the real repo and reports any invented fact, stale number, or overclaim, with a citation for each answer that passes.

**Acceptance Scenarios**:

1. **Given** the drafted FAQ, **When** independently fact-checked, **Then** every factual claim (pricing, stage count, certificate provider, help channel, contribution process) is either directly supported by a cited file/line in this repo or flagged for correction — nothing ships on an assumption.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A new doc page MUST exist at `edu-site/docs/faq.md`, added to `sidebars.ts`'s "Reference" category (alongside `glossary`, `changelog`, `perf-targets`) with `customProps: { unnumbered: true }`.
- **FR-002**: `faq.md` MUST use the reference-page frontmatter shape only (`sidebar_label`, `sidebar_position`, `title`, `description`) — no `chapter_state`, no `content_kind`. `"faq.md"` MUST be added to `STAGE_FILES` in `edu-site/scripts/check-frontmatter.mjs` so the gate doesn't demand chapter frontmatter from it.
- **FR-003**: The page MUST answer, at minimum: what this is / who it's for (stating no prior experience is required, mirroring the two-reader promise in `curriculum-state/canon/audience.md` without using banned audience labels like "if you're new to this"); the real cost structure (textbook vs. the two optional CS50 certificates); the five-stage shape (naming all five, no chapter counts); expected pacing (self-paced, no fixed hour total); how the video+text pairing works (per the homepage's own "Co-authoring in action" timeline); how to get help today (honest: no live community yet, RAG chatbot planned — do not invent a Discord); whether there's a Bridge-Balance-issued certificate (no — CS50's own credentials are the real ones); how the project is maintained (project owner + Claude Code, in the open, per the homepage).
- **FR-004**: The page MUST NOT state or imply: a fixed chapter/lesson count or total study-hour figure (D5); a live GitHub contribution workflow (the snapshot is insurance only, not synced); any Phase B/C feature as already live (accounts, payments, a personal dashboard, a Bridge-Balance certificate); any community channel that doesn't exist yet.
- **FR-005**: Every answer MUST be traceable to a real source in this repo (CLAUDE.md, `.specify/memory/constitution.md`, `stack.md`, `curriculum-state/canon/`, or a shipped page/component) — no invented statistics, no invented dates, no invented process.
- **FR-006**: A second, independent pass (its own session/terminal, not a continuation of the drafting session) MUST re-check the drafted page against the real repo and report per-claim pass/fail with citations, before the page is considered done.

### Key Entities

- **`edu-site/docs/faq.md`**: the page itself — reference frontmatter, Q&A body, no chapter contract.
- **`sidebars.ts`**: gains one `Reference`-category entry.
- **`scripts/check-frontmatter.mjs`**: `STAGE_FILES` gains `"faq.md"`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `cd edu-site && npm run build` exits 0 (all five gates + Docusaurus build) with `faq.md` included in the generated search index.
- **SC-002**: `npm run typecheck` is clean.
- **SC-003**: Every answer identified in FR-003 is present and specific (no placeholder text).
- **SC-004**: A grep for chapter-count numbers, invented hour totals, "Discord", "pull request", or "issue" (as invitations to contribute) in `faq.md` returns nothing that contradicts FR-004.
- **SC-005**: The independent fact-check pass (FR-006) reports zero uncited or contradicted claims, or every flagged claim is corrected before this feature is marked done.

## Assumptions

- This is a reference page, not a chapter — it is exempt from `chapter-production`/`lesson-spine-authoring` and the two-reader spine structure, but not from the audience/tone rules in `curriculum-state/canon/audience.md` (no banned labels, plain glossing where a term appears).
- No new dependency, backend route, or Phase B/C feature is introduced by this page — it only documents current, real state (Constitution Principle I; Phase A discipline).
- No version control steps are part of the workflow (repo rule).
- Tone matches the rest of the site: direct, honest about limitations (e.g., no community yet) rather than silent about them — matching how CS50W's own course page discloses its paid-certificate tiers plainly rather than hiding them.
