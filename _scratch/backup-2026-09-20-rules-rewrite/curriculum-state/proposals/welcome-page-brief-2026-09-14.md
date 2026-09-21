# Welcome page proposal: what it should do, and what it must not borrow

**Status: executed 2026-09-15.** Shipped at `edu-site/docs/welcome.md`, `chapter_state: text-ready`, gate-clean. The naming-collision decision below (Stage 0 keeps "Orientation" for now) was confirmed unchanged at execution time. See `history/prompts/general/0074-ship-welcome-page.general.prompt.md` for the full record.

## Context

The project owner rejected "Orientation" as reader-facing vocabulary (2026-09-14) — too difficult, unattractive, and meaningless for the book's target Pakistani audience — and asked for the Welcome page to be planned under that name instead. This continues an earlier instruction, recovered verbatim from `history/prompts/general/0072-seo-push-changelog-and-standing-rule.general.prompt.md` (point 2): sequence the page's *authoring* second-to-last, right before Stage 0's real content is written, and study CS50P's and Hugging Face's own welcome pages first — full text of both already pasted into that same message as a web-fetch fallback. Closing instruction there, verbatim: **"Learn all the maximum points from both to design OUR welcome."**

Investigating the naming question surfaced that Stage 0 is currently shipped and named "Orientation" in 9+ site-code files plus FAQ/changelog/canon — the same rejected word. **Decided (2026-09-14): leave Stage 0's name alone; the correction applies only to this new page.** The resulting inconsistency (Welcome avoids a word Stage 0 still carries, one click later) is accepted, not an oversight — recorded below so it isn't lost.

This is a sketch, not a decision — nothing here is drafted until the owner reacts, and no prose gets written until Stage 0's own shape (naming, chapter breakdown) is settled, per the owner's own sequencing and the existing roadmap (`whole-book-redesign-record-2026-09-14.md` §13, which doesn't list a Welcome page as one of its 8 steps — it was never in that scope, and is being planned now, ahead of it, at the owner's direction).

## Two orderings, kept separate

- **Authoring order:** last-ish — after Stage 0's naming, hierarchy, and breakdown are decided, so the page can describe a book whose shape has stopped moving.
- **Reading order:** first — before Stage 0, before any chapter. The front door to the *reading journey*, distinct from the existing marketing homepage (`edu-site/src/pages/index.tsx`, a platform-track page that sells the book to someone who hasn't started). Welcome is content-track prose for a reader who has already decided to start. Likely a new docs-root file, positioned before `intro-1-binary-to-programming.md`.

## What CS50P and Hugging Face's welcome pages actually do

**CS50P** — institutional, logistics-first: one dense opening paragraph (course, prerequisite, topics, method, outcome), prerequisites/video links, an OpenCourseWare paragraph spelling out the free workflow, enrollment paths branched by goal, a section for instructors. Short declarative sentences, generic "you," efficient over warm.

**Hugging Face** — warm, community-first: exclamatory hook, one-line promise, a checklist of first onboarding actions (syllabus, audit-vs-cert, meet the team, make an account, join Discord), rhetorical-question subheadings, a syllabus table, prerequisites, a two-tier certification path, pace estimate, tips for getting the most out of it, named contributor acknowledgments, a bug/question section, sign-off. First-person-plural, emoji-forward.

Full original text: `history/prompts/general/0072-seo-push-changelog-and-standing-rule.general.prompt.md` lines 36–51 (CS50P) and 53–174 (Hugging Face). Not reproduced here — third-party copyrighted course pages.

## What this book's own rules already forbid or require

Checked against `canon/voice.md` and `canon/audience.md`, both binding on every chapter:

- **Neither opening is usable as-is.** Voice.md: *"Open in the middle of something. Never a definition."* Both borrowed pages open declaratively. Welcome needs its own opening — most naturally the over-trust/over-caution tension `canon/thesis.md` already names as the book's founding insight.
- **Second person, not Hugging Face's "we/us."** There's no live team or community yet to back a "we" up.
- **Question-format headers are fine — the shipped FAQ proves it. A rhetorical question as a mid-paragraph transition is banned** (voice.md's own example: "So what does this mean for you?").
- **No audience-segmented paths** (`audience.md`) — CS50P's branch-by-certificate-goal structure has no equivalent here, and inventing one would break the two-reader architecture.
- **No inventing a live community.** Matches `faq.md` / `code-of-conduct.md` / `accessibility.md`'s existing precedent: say plainly there's no Discord or forum yet, rather than borrowing Hugging Face's community structure wholesale.
- **First screen must alone deliver the thesis-linked claim and the one action** (`audience.md`'s interruption rule) — the hardest real constraint, given the mobile-dominant, metered-data reader.
- **D5 still applies.** Five stages is safe to state (already in the FAQ); a chapter count or duration estimate is not.
- **Pakistan-legible register, reinforced by today's own correction.** Voice.md's analogy rule already prefers a bank token number or a university merit list over a generic example — hold any wording on this page to that same bar, not just the general house style.

## Borrow / adapt / reject

| From | Borrow | Adapt | Reject |
|---|---|---|---|
| CS50P | Confident, concrete prerequisite statement | The outcome-promise, made falsifiable and D5-safe | Logistics-first opening; branch-by-goal structure |
| Hugging Face | Checklist-style first actions; question-format subheadings; pace honesty; "get the most out of it" tips | The onboarding checklist (this book needs no account, no signup) | "We/us" voice; Discord links; contributor acknowledgments; emoji |

## Proposed structure

1. Open on the tension, not a definition — the over-trust/over-caution extremes, concretely.
2. The claim and the one action, inside the first screen.
3. What you need to start, stated with CS50P's own confidence: nothing. No prior experience, no signup, no account (Phase A has no auth).
4. The shape of the thing — five real stages, no fixed chapter count, anchored on the two real Harvard credentials mid-way. Cross-reference the FAQ's stage list rather than duplicating it.
5. How to actually read this book — mobile-friendly, one continuous read per chapter, terms glossed inline, come back anytime.
6. What's not here yet, stated honestly — no live community, no RAG chatbot, matching the FAQ/Code of Conduct/Accessibility precedent.
7. Close on the one action again, as an action. Voice.md bans the closing-restatement pattern outright.

## Open items

- **Stage 0's own name** — still "Orientation," still just a placeholder per this project's own redesign record (`whole-book-redesign-record-2026-09-14.md` line 47). Parked by explicit owner choice on 2026-09-14, not resolved. A self-contained rename across `stages.ts`, `index.tsx`, `docusaurus.config.ts`, `sidebars.ts`, `stage-icons`, both `DataViz` chart components, `KPIGrid.tsx`, `faq.md`, `changelog.md`, and `canon/thesis.md`, once a real name exists — a single well-scoped `command-code-delegation` pass, not a redesign.
- **Frontmatter shape** — Welcome is neither a numbered chapter nor a reference page like FAQ; its exact frontmatter contract is undecided, left for actual authoring time.
- **Literal title** — "Welcome" is used throughout as both the working name and the presumed page title; not yet explicitly confirmed as the frontmatter `title`.
