# Feature Specification: Accessibility Statement Reference Page

**Feature Directory**: `010-accessibility-statement`
**Created**: 2026-09-14
**Status**: Draft
**Input**: User description: "No reader-facing accessibility statement — build it ultra professionally, mistake is not an option at all." (Owner clarified, after being asked what this means in simple English: a page telling readers — including anyone using a screen reader, keyboard-only navigation, or who needs larger text or reduced motion — what the site actually does to stay usable for them.)

## Context

The book has no accessibility statement anywhere (confirmed: zero matches outside `node_modules`, 2026-09-14 audit) despite already doing substantial, real accessibility engineering: `edu-site/src/css/a11y.css` (WCAG 2.2 AA baseline, AAA aspirations for text/focus, documented file header, last revised 2026-08-17), an automated axe scan (`npm run test:a11y`) and Lighthouse audit (`npm run test:perf`) already wired as project scripts, and a chapter-gate rule that fails the build on missing, generic, or too-thin image alt text (`scripts/check-chapter.mjs`'s `alt-missing`/`alt-junk`/`alt-thin` checks). This page's entire value is being **specific and honest about what's actually been done**, not a generic "we care about accessibility" statement — the opposite failure mode from a code of conduct copy-pasted from a template.

This is a **reference/platform page**, same class as `faq.md`: no `chapter_state`/`content_kind`, same `STAGE_FILES` exemption pattern, not subject to the two-reader spine structure, but still bound by every factual constraint in `CLAUDE.md` and this repo.

Like the Code of Conduct (spec `009-code-of-conduct`), this page must not invent a live feedback/reporting channel that contradicts `faq.md`'s "no community yet" answer.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A reader who relies on assistive technology knows what to expect (Priority: P1) 🎯 MVP

As a reader using a screen reader, keyboard-only navigation, a high-contrast or reduced-motion OS setting, or who simply needs things to be legible and operable, I want a plain-language page telling me specifically what this site does (and honestly, what it doesn't do yet) for accessibility, so I don't have to guess or test it blind.

**Why this priority**: it's the entire point of the page, independently shippable as one static doc.

**Independent Test**: Load `/accessibility`. It states, in plain language (same simple-English register the owner asked for when clarifying this task), the real, specific measures already in place, cites the conformance target, and is honest about what's not yet covered.

**Acceptance Scenarios**:

1. **Given** the Accessibility Statement, **When** a reader asks "what standard does this site target," **Then** the page states WCAG 2.2 Level AA as the baseline (matching `a11y.css`'s own documented philosophy), explained in plain words (what WCAG/AA means, glossed inline, no jargon left undefined).
2. **Given** the Accessibility Statement, **When** a reader asks "how do you know it actually works," **Then** the page names the real, automated checks that run on this site — an automated accessibility scanner (axe, via `npm run test:a11y`) and a performance/accessibility audit (Lighthouse, via `npm run test:perf`) — described in plain English, not just tool names.
3. **Given** the Accessibility Statement, **When** a reader asks "what specific things have you done," **Then** the page names concrete, real measures: visible keyboard focus indicators on every interactive element; every image required to carry real, meaningful alt text before a chapter can even ship (enforced automatically, not manually); color never used as the only way to tell something apart (e.g., chapter-status badges also use a distinct shape, not just a color); support for reduced-motion, higher-contrast, and Windows high-contrast settings; touch targets sized for motor accessibility.
4. **Given** the Accessibility Statement, **When** a reader asks "how do I report an accessibility problem," **Then** the page is honest that there's no live feedback channel yet (same honest gap as the Code of Conduct and the FAQ) rather than inventing a monitored inbox.
5. **Given** the Accessibility Statement, **When** a reader asks "does this cover the video lectures too," **Then** the page is honest about scope: it describes the text/platform side (what this repo controls); the video side belongs to the project owner's recording process and isn't something the text page should overclaim.

### User Story 2 - Every claim on the page is real (Priority: P1)

As the project owner, I want every accessibility claim traceable to something that actually exists in this repo (a real CSS rule, a real test script, a real gate check), not aspirational language, so the statement can't be caught out by a reader who actually tests it.

**Why this priority**: an inaccurate accessibility statement is worse than none — screen-reader users and others rely on it being true, and a wrong claim here is a worse failure than most other content mistakes in the book.

**Independent Test**: A second, independent review (separate session/context from whoever drafted it — same two-pass discipline used for the FAQ, `specs/008-faq-page`) checks every claim against the real repo (`a11y.css`, `package.json` scripts, `check-chapter.mjs`) and reports any invented or unverifiable claim.

**Acceptance Scenarios**:

1. **Given** the drafted page, **When** independently fact-checked, **Then** every specific claim (WCAG level, the two automated tools, the alt-text gate, the focus-ring behavior, color-independence, motion/contrast preference support, touch-target sizing) is either directly supported by a cited file/line in this repo or flagged for correction.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A new doc page MUST exist at `edu-site/docs/accessibility.md`, added to `sidebars.ts`'s "Reference" category (alongside `faq`, `glossary`, `changelog`, `perf-targets`, and `code-of-conduct` once it ships) with `customProps: { unnumbered: true }`.
- **FR-002**: `accessibility.md` MUST use the reference-page frontmatter shape only (`sidebar_label`, `sidebar_position`, `title`, `description`) — no `chapter_state`, no `content_kind`. `"accessibility.md"` MUST be added to `STAGE_FILES` in `edu-site/scripts/check-frontmatter.mjs`.
- **FR-003**: The page MUST state, in plain language with every technical term glossed inline at first use (same discipline as chapter prose, per `curriculum-state/canon/audience.md`): the WCAG 2.2 AA conformance target (source: `edu-site/src/css/a11y.css:8`); the two automated checks that run against this site (axe via `test:a11y`, Lighthouse via `test:perf` — source: `edu-site/package.json` scripts); the alt-text enforcement gate (source: `edu-site/scripts/check-chapter.mjs`'s `alt-missing`/`alt-junk`/`alt-thin` checks); visible keyboard focus indicators (source: `a11y.css` §2); color-independence for state indicators (source: `a11y.css` §7, the `ChapterState` badge's shape-glyph + border-style backup); reduced-motion support (source: `a11y.css` §8); higher-contrast and Windows forced-colors support (source: `a11y.css` §9-10); 44×44px minimum touch targets (source: `a11y.css` §6, WCAG SC 2.5.8).
- **FR-004**: The page MUST NOT: invent a live feedback/reporting channel that contradicts `faq.md`; claim a conformance level stronger than what's documented (AA baseline — do not claim full AAA); claim video content is covered by these measures (video accessibility, e.g. captions, is the owner's recording process, out of this page's scope, and MUST NOT be asserted as already handled unless independently confirmed); state or imply any fixed chapter/lesson count (D5).
- **FR-005**: Every specific technical claim MUST be traceable to a real file in this repo — no invented percentages, no invented certifications, no invented third-party audit.
- **FR-006**: A second, independent pass (separate session, not a continuation of the drafting session — same pattern as `specs/008-faq-page`'s User Story 2) MUST re-check the drafted page's claims against `a11y.css`, `package.json`, and `check-chapter.mjs` before the page is considered done.

### Key Entities

- **`edu-site/docs/accessibility.md`**: the page itself — reference frontmatter, plain-language body grounded in real, cited measures.
- **`sidebars.ts`**: gains one `Reference`-category entry.
- **`scripts/check-frontmatter.mjs`**: `STAGE_FILES` gains `"accessibility.md"`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `cd edu-site && npm run build` exits 0 (all five gates + Docusaurus build) with the page included in the generated search index.
- **SC-002**: `npm run typecheck` is clean.
- **SC-003**: Every element in FR-003 is present, specific, and correctly cited — no placeholder text, no vague "we strive to."
- **SC-004**: A grep of the page for "AAA", "certified", "audited by" returns nothing that overclaims beyond FR-004.
- **SC-005**: The independent fact-check pass (FR-006) reports zero uncited or contradicted claims, or every flagged claim is corrected before this feature is marked done.

## Assumptions

- This is a reference page, not a chapter — exempt from `chapter-production`/`lesson-spine-authoring`, not from the audience/tone rules.
- No new dependency, backend route, or Phase B/C feature is introduced by this page — it documents current, real state only.
- No version control steps are part of the workflow (repo rule).
- Video/caption accessibility is explicitly out of scope for this page unless the owner confirms real captioning practice exists — left as an open gap rather than assumed.
