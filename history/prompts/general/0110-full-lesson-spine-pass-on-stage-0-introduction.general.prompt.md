---
id: 0110
title: Full Name-First pass applied to the Stage 0 introduction
stage: misc
date: 2026-09-17
surface: agent
model: unknown (Command Code session)
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["lesson-spine-authoring", "ch00-introduction", "frontdoor", "station-sheet", "term-sort", "comprehension-audit", "ledger-reconciliation", "spec-driven-engineering"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/ch00-introduction.md
 - curriculum-state/ledgers/prerequisite-graph.yaml
 - curriculum-state/ledgers/concept-ledger.yaml
 - edu-site/docs/changelog.md
 - history/prompts/general/0110-full-lesson-spine-pass-on-stage-0-introduction.general.prompt.md
tests:
 - node scripts/check-chapter.mjs --chapter docs/ch00-introduction.md — 0 errors, 0 warnings, 606 words, ~4 min
 - node scripts/check-references.mjs — Reference validation passed, including the restored /glossary#spec-driven-engineering anchor
 - npm run build — check:frontmatter, check:refs, check:chapter, chapter manifest, search index and the Docusaurus build all green
---

## Prompt

apply the lesson spine skill (COMPLTELY) on the introduction of stage 0 chapter

## Response snapshot

Ran the complete Name-First workflow over `edu-site/docs/ch00-introduction.md` — the Stage 0 front door — as instructed: shape re-confirmed as FrontDoor (the fifth shape, added 17 September, which drops S0/S5/S9/S10 and re-weights the rest); the station sheet filled and checked row by row against the text; every term re-sorted through the two-minute test; the delete test run; the ten-angle comprehension audit as ten separate sweeps; the mindmap test; the full self-check; and the findings, omissions and deviations recorded.

**The pass found five real defects, all fixed.**

1. **S2 under-delivered.** The FrontDoor row asks which stage this is, *of how many*. "Welcome to the first stage" never said how many; it now reads "Welcome to the first of five stages" (five stages is locked canon — thesis.md — not a chapter count, so D5 is untouched).
2. **S3 under-delivered — the largest gap.** The stage was never said to be in date order anywhere in the prose, while both the frontmatter description and the `scope_reason` claimed the chapter explained it. The "essential starting point" paragraph now carries the ordering argument in three sentences, ending "…That is why nothing later in this book asks you to take an earlier idea on faith" — previously an unconnected promise, now the consequence of the ordering, matching how `welcome.md` states the same rationale.
3. **S8 under-delivered.** The row asks for how to read it — in order, at any pace, coming back whenever. Pace and return were present; order was not. The sentence now asks the reader to "read the chapters in order".
4. **A term defect, and a text/ledger contradiction.** The concept-ledger records *Spec-Driven Engineering* as glossed in this chapter — twelve words, the exact wording quoted in the note — linked to `/glossary#spec-driven-engineering`, with Stage 0's last chapter named as where the practice is taught in full. The file as found carried only the four bare steps, unglossed and unlinked. The bullet was restored to the treatment the ledger describes (gloss, anchor, last-chapter pointer), the chain staying "named only" as the recorded mapping requires. concept-ledger's note now matches the shipped text again and carries a dated re-alignment line.
5. **A7/A10 audit fix.** "After exploring all of it, you'll be able to say what a computer is actually doing while it runs something, and why every tool on it is shaped the way it is" ran 32 words against the ~28-word ceiling and was the page's stall point; split into two sentences (21 + 11).

**The full record — station sheet, audit log with the ten angles, dropped stations, delete-test result, gate output — is appended to the chapter's `ch00-introduction` entry in `prerequisite-graph.yaml`,** which also had its stale title corrected ("Why This Stage Starts in the Past" → "Introduction to Stage 0", the shipped file's own title).

**Audit log, in brief.** A1 0 new (preview names and the canon-fixed floor wording accepted with reasons); A2 1 fixed (the term defect above; term chains checked, *coding agent → the agent → Agent output* stays one thing across the callout boundary); A3 0; A4 0 (one referent examined and accepted); A5 1 fixed (the four-step chain anchored by the restored gloss); A6 0; A7 1 fixed; A8 0, swept deliberately over the smoothest claims; A9 0; A10 1, the same sentence as A7. Mindmap test passed from memory.

**Self-check items that needed an honest answer rather than a tick.** The two research passes predate this draft (the stage's cluster dossiers; the owner's own supplied Hugging Face Unit 1 introduction, which is this page's reference by owner instruction and is mapped slot-by-slot in the ledger — the sanctioned exception to the general no-borrowed-structure rule, recorded in `canon/corrections.md` §2). S0's prediction loop (S0→S4) does not open on a FrontDoor, so its absence is the shape working, not a dropped station; S10 is replaced by the single next action ("Start with the first chapter"); S5 and S9 are dropped with the same logged reason.

## Outcome

- ✅ Impact: the chapter's text and its two ledger records now agree; three FrontDoor station rows that were silently under-delivered are delivered; the book's own central term is glossed and linked where its first chapter names the workflow; the audit's findings log exists in the repo rather than only in chat — which was PHR 0109's own "next experiment", now done.
- 🧪 Tests: `check-chapter` on the file — 0 errors, 0 warnings, 606 words (was 551). `check-references` — passed, including the restored glossary anchor. `npm run build` — all five gates plus the Docusaurus build green. The five standing warnings across the corpus (ch01/ch02 and welcome.md safety-floor-absent; s1-03/s1-04 opening-not-addressed-to-reader) are pre-existing, deliberate or already verified.
- 📁 Files: `ch00-introduction.md` revised (five edits); `prerequisite-graph.yaml` (title fix + full pass record); `concept-ledger.yaml` (re-alignment line on the Spec-Driven Engineering note); `changelog.md` (dated revision bullet).
- 🔁 Next prompts: unchanged and still open — transcribe the remaining six memory files from `corrections.md` §6; retrofit `ch01`/`ch02` with real openings and handoffs; the sidebar question of the old `intro-1`..`intro-5` sequence relative to the new ladder.
- 🧠 Reflection: a "complete application" run on a page that had already passed every mechanical check still found five defects, and the most serious one (S3) was a promise made in the frontmatter and never kept in the body — both frontmatter fields described a chapter that did not exist yet. The second most serious (the missing term gloss) was recoverable only because the concept-ledger note had recorded the intended treatment in the author's own words; without that note the defect would have been invisible, because a missing glossary link looks exactly like a style choice.

## Evaluation notes (flywheel)

- Failure modes observed: (1) frontmatter `description` and `scope_reason` can assert deliveries the body does not make, and no check compares the two — the gate reads frontmatter for validity, never for truth against the prose. (2) A recorded ledger decision can silently stop being true of the shipped text; the ledger is the only surviving witness, which is an argument for writing these notes at decision time rather than after. (3) The station sheet is where shape-level omissions surface — the audit, run alone, would not have found S2/S3/S8, because it tests the text as written rather than the text against its shape's obligations.
- Graders run and results (PASS/FAIL): `check-frontmatter` PASS; `check-references` PASS; `check-chapter` PASS (0/0); Docusaurus build PASS. No grader covers frontmatter-vs-body truth, station-row delivery, or ledger-vs-text agreement — all three defect classes found here are invisible to every automated check.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add a single check to `check-chapter.mjs` — for a chapter whose `description` or `scope_reason` names a delivery ("why …", "what it costs", "in what order"), assert that at least one word of that delivery's key term appears in the body. Cheap, warn-level, and it would have caught S3 in one line.
