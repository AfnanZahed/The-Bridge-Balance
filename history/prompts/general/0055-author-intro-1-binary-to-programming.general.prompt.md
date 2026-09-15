---
id: 0055
title: Author intro-1 (binary to programming) through the spine
stage: general
date: 2026-09-10
surface: agent
model: claude-sonnet-5
feature: none
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — chapter-production run for intro-1)
labels: ["chapter-production", "lesson-spine-authoring", "intro-sequence", "intro-1", "concept-chapter"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/docs/intro-1-binary-to-programming.md (rewritten in full; chapter_state flipped to text-ready)
  - curriculum-state/ledgers/concept-ledger.yaml (19 terms first-defined by intro-1; agent entry gained a coding-agent register variant; old "defined nowhere" note superseded)
  - curriculum-state/ledgers/evidence-ledger.yaml (five sources canonicalised: etymonline-program, kathleen-booth-assembly-1947, a0-system-hopper-compiler-nuance, apple-m4-newsroom-2024, ascii-1963-standardisation)
  - curriculum-state/ledgers/example-ledger.yaml (recorded the deliberate omission as intro-1-no-worked-example; arithmetic trace remains unspent)
  - curriculum-state/ledgers/prerequisite-graph.yaml (intro-1 row to text-ready, teaches list built out, authored count 0 -> 1)
  - curriculum-state/contracts/calibration.md (recorded intro-1's 2,365-word interim measurement; anchor still unset)
tests:
  - node scripts/check-chapter.mjs --chapter docs/intro-1-binary-to-programming.md -> ok, 2,365 words, ~15.8 min, 0 errors, 0 warnings
  - npm run build -> check:frontmatter, check:refs, check:chapter (1 checked, 25 skipped), manifest (20 states), search-index (26 docs), Docusaurus build all green
---

## Prompt

Phase 2, chapter 1 of the intro-resequence execution brief: "make `intro-1` text-ready" — i.e. take `docs/intro-1-binary-to-programming.md` off the migrated placeholder prose, insert the agreed "What Is Programming" beat after the register/assembler material and before high-level language, and run the whole chapter through the `lesson-spine-authoring` Name-First treatment, then gate it, write the ledgers back, and flip `chapter_state` only once the gate passes.

(This is the first chapter of Phase 2 as specified in PHR 0054's prompt. Phase 1 — the mechanical restructuring — was completed under PHR 0054. The brief fixes Phase 2 as one chapter at a time, in order, with the owner reviewing each chapter on localhost before it is settled.)

## Response snapshot

Classified the lesson before writing: **Concept** shape, so the weight falls on Why and What, with How carrying the four-rung ladder and When carrying the two-extremes correction. Station 0 runs on the word *program* itself — which is what the new "What Is Programming" beat made available.

Ran Station 0 properly rather than from memory: verified the etymology against Etymonline and Wiktionary (Greek *programma*, "a written public notice"; *pro-* "forth" + *graphein* "to write"; into English in the 1630s), and verified two lineage claims before naming them (Kathleen Booth and colleagues, first assembly language and assembler at Birkbeck in the late 1940s; Grace Hopper's A-0 system, 1952). Also verified a dated transistor figure (Apple M4, 2024, 28 billion) and the ASCII 1963 standardisation date.

The chapter is built as one continuous evolutionary ladder, in spine order but with no station names as headings:

- **S0 NAME / S1 ANCHOR** — the opening guess: a *program* is a written plan set down in advance, so what is programming? The anchor is a printed exam timetable, which is the literal original sense of the word.
- **S3 WHY** — the wall: writing "add two numbers" in raw bits, x86 versus ARM, punched cards and the dropped box.
- **S4 WHAT** — machine code, registers, and the contrast class; then "What Is Programming" scores the opening guess explicitly (programming is making an instruction precise, not typing it).
- **S5 HOW** — assembly and the assembler, with the break-it branch being the chip-family boundary; then high-level languages, compilers and interpreters.
- **S6/S7/S8** — abstraction as the layer model, the cost of a layer (errors reported in the language above the failure), and the two extremes made concrete (refusing the layer vs. trusting it unread).
- **S10 RETRIEVE** — ends on a prompt that reconstructs the four rungs and re-tests the opening guess, never a recap.
- **S11 SPIRAL** — points forward to the architecture map.

The safety floor is present and specific to the topic: abstraction hides the layer, but an agent's output becomes the reader's the moment they accept it. A `<Callout type="info" title="Where this sits">` names Stage 1, satisfying the stage-reference invariant. No images were generated; none were referenced.

Deliberate omission, logged: no worked example. The ladder is the chapter's single illustration, and spending the reserved 2 + 2 arithmetic trace on top would have given the reader two competing pictures of one idea.

## Outcome

- ✅ Impact: `intro-1-binary-to-programming.md` is the first `text-ready` chapter in the resequenced intro sequence, and the first chapter through the real `lesson-spine-authoring` treatment the deleted pilots trialled. The "What Is Programming" beat now names the specification-over-syntax distinction the finale builds on.
- 🧪 Tests: chapter gate clean (2,365 words, ~15.8 min, 0 errors, 0 warnings); full `npm run build` green (frontmatter, refs, chapter, manifest, search-index, Docusaurus).
- 📁 Files: chapter rewritten and flipped; all four ledgers and `contracts/calibration.md` written back before the pass was called finished.
- 🔁 Next prompts: "make `intro-2` text-ready" — spine-treat the architecture map with no new topics. Then `intro-3` and `intro-4`, which need fresh current research on the named tools plus a "Current as of writing" Callout; then the `intro-5` merge-and-rewrite with the length check.
- 🧠 Reflection: the four-rung ladder already existed in the migrated prose; what the spine added was the Station 0 frame that makes the rest of the chapter an argument rather than a history. The "What Is Programming" beat lands hardest because it scores a guess the reader made three sections earlier — which is exactly the mechanism the skill requires and the earlier draft lacked.

## Evaluation notes (flywheel)

- Failure modes observed: none. The chapter passed on the first gate run.
- Graders run and results (PASS/FAIL): check-chapter PASS; npm run build PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): for `intro-2`, test whether a chapter with no new concept (pure spine-retreatment of existing content) can carry a station's worth of new reward for the senior reader without inventing scope — the brief says no new topics, so the reward has to come from ordering and framing.
