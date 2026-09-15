# Feature Specification: Code of Conduct Reference Page

**Feature Directory**: `009-code-of-conduct`
**Created**: 2026-09-14
**Status**: Draft
**Input**: User description: "No code of conduct — build it ultra professionally, mistake is not an option at all." (Owner clarified, after being asked what a code of conduct is: it's the standard reference document naming expected behavior for anyone interacting with the project.)

## Context

The book has no code of conduct anywhere (confirmed: zero matches for "code of conduct" outside `node_modules`, 2026-09-14 audit). CS50 and most open-source-adjacent educational projects publish one. This adds the same for The Bridge Balance, as a real reference page — not a legal boilerplate dump, not a chapter.

This is a **reference/platform page**, same class as `faq.md`: it does not go through `chapter-production` or `lesson-spine-authoring`, carries no `chapter_state` or `content_kind` (same `STAGE_FILES` exemption pattern in `scripts/check-frontmatter.mjs`), and is not subject to the two-reader spine structure. It **is** still subject to every factual constraint in `CLAUDE.md` and `curriculum-state/`.

**The one hard constraint that makes this page different from a generic Contributor-Covenant copy-paste**: this project has no live community surface today. `stack.md` names a future RAG chatbot (Phase B, not built). The public GitHub copy is explicitly "a one-time snapshot taken as off-computer insurance only; it is not synced and must not be treated as a workflow" (`CLAUDE.md`), and the just-shipped `faq.md` was independently fact-checked and confirmed to NOT invite GitHub issues/PRs as a live contribution channel. A code of conduct that invents a reporting workflow ("open an issue," "message us on Discord," a working contact email not confirmed by the owner) would contradict that page and would be exactly the kind of invented fact this project's own D5 precedent (the "17 chapters" incident) exists to prevent. The honest, correct move — mirroring how the FAQ handles "no community yet" — is to state the expected standard of behavior plainly and say reporting channels will be published once a live surface exists, rather than inventing one now.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Anyone interacting with the project knows the standard (Priority: P1) 🎯 MVP

As a reader, a future contributor, or anyone who eventually interacts with a Bridge Balance surface (comments, a future chatbot, a future community channel), I want a clear, plainly-written statement of expected behavior and what happens if it's violated, so the standard is set before it's ever tested.

**Why this priority**: it's the entire point of the page, independently shippable as one static doc.

**Independent Test**: Load `/code-of-conduct`. It states, in plain language (no legalese, matching the site's own register): the behavior expected, examples of what violates it, and what a reader should do if they experience or witness a violation — honestly scoped to today's reality (no live community surface yet).

**Acceptance Scenarios**:

1. **Given** the Code of Conduct page, **When** a reader asks "what's expected of me here," **Then** the page states the standard in concrete, unambiguous terms — respectful engagement, no harassment, no discrimination — without resorting to generic corporate boilerplate copied from elsewhere.
2. **Given** the Code of Conduct page, **When** a reader asks "how do I report a problem," **Then** the page is honest that there is no live community channel today and states that a reporting path will be published when one exists — it does NOT invent a Discord, a monitored email, or a live GitHub-issues workflow that the FAQ and CLAUDE.md both already contradict.
3. **Given** the Code of Conduct page, **When** a reader asks "does this apply to the book's content itself," **Then** the page is scoped correctly: it governs *behavior* (how people treat each other), not editorial content decisions, which stay with the project owner.

### User Story 2 - Nothing on the page contradicts the rest of the site (Priority: P1)

As the project owner, I want this page checked against the FAQ, CLAUDE.md, and stack.md before it ships, so it doesn't quietly promise a channel or process that doesn't exist — the same discipline already applied to the FAQ.

**Why this priority**: a code of conduct that promises an enforcement path nobody is watching is worse than none.

**Independent Test**: A review (can be inline, since this page makes no repo-internal factual claims the way the FAQ does — it's a behavioral policy, not a facts page) confirms zero contradictions with `faq.md`, `CLAUDE.md`, and `stack.md`, and zero invented channels.

**Acceptance Scenarios**:

1. **Given** the drafted page, **When** checked against `faq.md`'s "no community yet, RAG chatbot planned" answer, **Then** the Code of Conduct says the same thing, not a different or more optimistic version of it.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A new doc page MUST exist at `edu-site/docs/code-of-conduct.md`, added to `sidebars.ts`'s "Reference" category (alongside `faq`, `glossary`, `changelog`, `perf-targets`) with `customProps: { unnumbered: true }`.
- **FR-002**: `code-of-conduct.md` MUST use the reference-page frontmatter shape only (`sidebar_label`, `sidebar_position`, `title`, `description`) — no `chapter_state`, no `content_kind`. `"code-of-conduct.md"` MUST be added to `STAGE_FILES` in `edu-site/scripts/check-frontmatter.mjs`.
- **FR-003**: The page MUST state, at minimum: the standard of behavior expected (respect, no harassment, no discrimination, honest engagement); concrete examples of what violates it; what scope it covers (interactions on Bridge Balance surfaces — today, effectively the site itself and its future chat/community features); that it does not govern editorial/curriculum decisions.
- **FR-004**: The page MUST NOT: invent a live reporting channel (a monitored email, a Discord, a GitHub-issues workflow) that contradicts `faq.md`'s "no community yet" answer or `CLAUDE.md`'s "GitHub snapshot is not a synced workflow" rule; use generic, unedited boilerplate lifted from a template without adapting tone/register to the rest of the site; state or imply any fixed chapter/lesson count (D5, applies everywhere in this repo).
- **FR-005**: Reporting language MUST be honest about current state: no live channel today; a real path will be published once one exists (matching the FAQ's own pattern for the RAG chatbot).
- **FR-006**: Tone MUST match the rest of the site — direct, plain register, no audience-labeling language (`curriculum-state/canon/audience.md`'s banned-phrase rule applies to every reader-facing page, not just chapters).

### Key Entities

- **`edu-site/docs/code-of-conduct.md`**: the page itself — reference frontmatter, plain-language policy body.
- **`sidebars.ts`**: gains one `Reference`-category entry.
- **`scripts/check-frontmatter.mjs`**: `STAGE_FILES` gains `"code-of-conduct.md"`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `cd edu-site && npm run build` exits 0 (all five gates + Docusaurus build) with the page included in the generated search index.
- **SC-002**: `npm run typecheck` is clean.
- **SC-003**: Every element in FR-003 is present and specific — no placeholder text, no "TBD".
- **SC-004**: A grep of the page for "Discord", "email us", "open an issue", "pull request" (as live reporting invitations) returns nothing that contradicts FR-004.
- **SC-005**: A review pass confirms zero contradictions with `faq.md` and `CLAUDE.md`.

## Assumptions

- This is a reference page, not a chapter — exempt from `chapter-production`/`lesson-spine-authoring`, not from the audience/tone rules.
- No new dependency, backend route, or Phase B/C feature is introduced by this page.
- No version control steps are part of the workflow (repo rule).
- The exact future reporting mechanism (email, form, chatbot-routed) is intentionally left undecided here — that's a Phase B/C product decision for the owner, not something this page should pre-commit to.
