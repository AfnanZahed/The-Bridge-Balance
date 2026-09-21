---
id: 0109
title: Was the ten-angle comprehension audit actually run on the intro chapter
stage: misc
date: 2026-09-17
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["comprehension-audit", "ch00-introduction", "lesson-spine-authoring", "frontdoor", "process-accountability", "false-fluency"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/ch00-introduction.md
 - .claude/skills/lesson-spine-authoring/reference/stations.md
 - history/prompts/general/0109-audit-applied-to-intro-chapter.general.prompt.md
tests:
 - node scripts/check-chapter.mjs --chapter docs/ch00-introduction.md — 0 errors, 0 warnings, 551 words, ~3.7 min
 - npm run build — frontmatter, references, chapter gate, manifest, search index and the Docusaurus build all green
---

## Prompt

there are 10 critique pipeline in the lesson spine skill, did you applied that in the intro (in first version or in the currecnt one)?? Also what changes you have did above?

## Response snapshot

Answered both questions honestly rather than defensively, and the answers were not flattering.

**Q1 — was the comprehension audit applied?** Partially on the first draft, not at all on the shipped one.

- **First (rejected) draft — swept, but not reported.** All ten angles were run and real findings were fixed: three heavy terms used unglossed in what was then the book's first chapter (machine code, assembly language, compiler), a 44-word sentence, a silent step conflating the traffic light with the telegraph key, and a paragraph orphaned under "The road ahead". But the skill also requires the findings log to be **presented with the draft**, and no log was ever shown — the owner received the chapter and no evidence of the pass.
- **The audit could not have caught the actual failure anyway**, and saying so is the more useful answer. All ten angles presuppose that the right *object* was chosen. Angle 1 asks what an opening assumes the reader has already read; it does not ask whether this is the wrong kind of page. So the audit ran clean over a chapter the owner rejected on sight. It finds tuning defects, not wrong-shape ones.
- **Current (shipped) draft — not run at all.** Written, gated, shipped. No sweep.
- **And the gap was mine, from the previous turn:** the `FrontDoor` shape had been added to `reference/stations.md` with a station-weighting table that drops S0, S5, S9 and S10 — and said nothing about how the audit applies to a FrontDoor. A future FrontDoor draft would have fallen into the same hole.

**The audit, then run in full on the shipped chapter, and the log presented.** Six real findings, all fixed:

| Angle | Findings | What |
|---|---|---|
| A1 cold landing | 1 | "CS50P and CS50W" named with no expansion, against the expand-every-acronym rule |
| A3 / A5 silent step + unanchored abstraction | 1 | the `Specify → Design → Implement → Verify` chain shipped as four words and arrows with nothing saying it is a process, and nothing connecting it to the line above it |
| A6 unmotivated passage | 1 | the no-quiz beat landed immediately after the safety-floor callout and read as a swerve |
| A7 second-language load | 2 | the closing sentence at 43 words; the coding-agent sentence at 41 |
| A8 false fluency | 1 | the chapter never said the stage is not about writing code, so a reader could leave expecting to be programming by chapter three |
| A10 stall point | 2 | the same two sentences A7 found |
| A2, A4, A9 | 0 | preview names in the topic map (terminal, file, web, command line) judged acceptable — naming what is coming is a map's job; A9's orphan was the callout split, treated as A6 |

**Fixes applied:** CS50P and CS50W expanded into what they are; the workflow chain labelled as "the workflow the rest of this book builds on"; the no-quiz beat moved above the verification paragraph so the callout no longer interrupts; both long sentences split; and a direct statement added that nothing in the stage is code the reader has to write. Chapter goes 503 → 551 words, gate clean at 0 errors and 0 warnings, full build green.

**The skill gap closed in the same pass:** `reference/stations.md` now states that all ten angles run on a FrontDoor unchanged, with two flagged as mattering more there than anywhere else — Angle 1, because a front door is the page most likely to be met with nothing behind it, and Angle 8, because a front door that promises more than its stage delivers fails silently and is the FrontDoor's characteristic failure.

**Q2 — the change list.** Given as two dated turns:

*Earlier turn (the chapter and the boundaries rule):* `ch00-introduction.md` created and rebuilt; `sidebars.ts` (ch00 first, stage link repointed to it); `CLAUDE.md` (chapters connect backwards and hand forwards, plus a Stage 0 folder-list correction); `SKILL.md` (sixth hard constraint, three self-check items); `stations.md` ("Lesson boundaries" in §4); `voice.md` (commitment 1 clarified); `prerequisite-graph.yaml`; `concept-ledger.yaml`; `evidence-ledger.yaml`; `example-ledger.yaml`; `changelog.md`; `chapterManifest.ts` and `search-index.json` regenerated; PHR 0107.

*Later turn (the repeat-failure fix):* `canon/corrections.md` created; `voice.md` (commitment 2 scoped, position exception added to Register); `curriculum-state/README.md` (canon is five files); `CLAUDE.md` (corrections live in the repo); `SKILL.md` (FrontDoor shape + stop rule); `stations.md` (FrontDoor weighting table); `check-chapter.mjs` (new `opening-not-addressed-to-reader` warning); PHR 0108.

Four files were touched in both turns: `CLAUDE.md`, `voice.md`, `SKILL.md`, `stations.md`.

## Outcome

- ✅ Impact: the audit that should have run was run, its log was shown rather than summarised, six real defects were fixed, and the FrontDoor shape in the skill no longer leaves the audit undefined — which was the gap that let the miss happen in the first place. Separately, the answer establishes the audit's actual limit in writing: it cannot catch a wrong-shape draft, which is why the FrontDoor shape and the stop rule from PHR 0108 are load-bearing rather than decorative.
- 🧪 Tests: `check-chapter` on the chapter — 0 errors, 0 warnings, 551 words. `npm run build` — all five gates plus the Docusaurus build green. Two pre-existing warnings on s1-03 and s1-04 from the new reader-address check, already verified as genuine in PHR 0108.
- 📁 Files: `ch00-introduction.md` edited (six audit fixes); `stations.md` edited (FrontDoor audit note).
- 🔁 Next prompts: unchanged and still open — transcribe the remaining six memory files listed in `corrections.md` §6, and retrofit `ch01`/`ch02`, which both predate the chapter-boundaries rule and still open directly on their own subject.
- 🧠 Reflection: the honest answer to "did you run the audit" was "once, silently, and not on the version that shipped", and the more important finding was that running it would not have saved the draft. Every quality device in this repo — the gate, the audit, the ledgers, the two-reader architecture — tests execution against a chosen shape. None of them tests the choice. That is what `corrections.md` and the FrontDoor shape exist to cover, and it is why the owner had to say the same thing three times before it stuck.

## Evaluation notes (flywheel)

- Failure modes observed: (1) the comprehension audit was run on the first draft and its findings log was never presented, despite the skill requiring it to ship with the draft — the owner had no way to tell a real pass from a performed one. (2) The audit was skipped entirely on the rebuilt chapter, and shipped. (3) Adding a new lesson shape without defining how the mandatory audit applies to it left the skill with a hole for the very next draft to fall into.
- Graders run and results (PASS/FAIL): `check-chapter` PASS (0/0); `npm run build` PASS. Neither grader has any concept of whether the audit was run, which is the point — a mandatory process step enforced by nothing but memory is a step that gets skipped silently.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): make the audit's findings log a required artifact rather than a presented-in-chat one — written to the chapter's ledger entry or as a sibling file at the moment the draft is finished, so a missing log is visible to the next reader instead of relying on the author to volunteer it. The same logic that produced `corrections.md` applies here: a required step whose output leaves no trace will be skipped, and only the trace makes that checkable.
