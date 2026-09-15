---
id: 0047
title: Re-apply lesson-spine-authoring to the Introduction Spine Pilot
stage: general
date: 2026-09-09
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: (direct request)
labels: ["lesson-spine-authoring", "chapter-revision", "station-0", "etymology-verification", "intro-spine-experiment"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/docs/intro-spine-experiment.md
  - curriculum-state/ledgers/evidence-ledger.yaml
  - curriculum-state/ledgers/concept-ledger.yaml
  - curriculum-state/ledgers/example-ledger.yaml
  - curriculum-state/ledgers/prerequisite-graph.yaml
tests:
  - "node scripts/check-chapter.mjs --chapter docs/intro-spine-experiment.md -> 0 errors, 0 warnings"
  - "node scripts/check-chapter.mjs (all shipped) -> 2 checked, 24 skipped, 0 errors, 1 warning (pre-existing keywords-missing on docs/intro.md)"
  - "npm run build -> five gates green, static files generated"
  - "python yaml.safe_load on all four ledgers -> ok"
---

## Prompt

master this: "C:\Users\Dell\Desktop\Book\.claude\skills\lesson-spine-authoring" and re-apply this skill on the "Introduction — Spine Pilot" chapter, because I think it is not written as good as it should be.

## Response snapshot

Read `lesson-spine-authoring/SKILL.md` and all four references in full, then loaded
`bridge-balance-project-guide` (the skill's own instruction for Book-repo work) and
`chapter-production` for the gate and ledger obligations around the file.

**Diagnosis.** The chapter was well-sourced and structurally weighted like a Tool
lesson while being Concept-shaped. Four structural holes:

1. **Station 1 (Anchor) absent.** Its only anchor was test-driven development —
   an anchor a senior holds and a beginner does not, the exact failure
   `stations.md` S1 forbids. For a Concept lesson S1 is weighted High.
2. **Station 3 (Why) near-empty**, though Concept weights it Highest. METR's 19%
   was told, not felt; no moment where the reader experiences the problem.
3. **Station 5 (How) had no break.** `stations.md` marks the break as not
   optional. The CSV example ran only the happy path.
4. **Station 2 (Source) at ~85% depth.** A reader searching the chapter's own
   term meets GitHub's "Spec-Driven Development" with no warning until the end.

Plus: an unverified carpentry etymology for "driven" whose analogy leaked inside
its own sentence; a banned closing restatement sitting after the retrieval prompt;
9 sentences over the 28-word ceiling (one at 44); `easy`/`just`/`leverage`; and
`wave off`, `lost ground`, `beyond question`, `Fortune 100`.

**Fixes.** Station 0 re-run and verified against primary sources: *specification*
→ *specificus* → *species* → *specere* "to look at", and *inspect* → *inspicere*
→ *in-* + *specere*; *engineer* → Old French *engigneor* → Latin *ingenium*. The
shared *specere* root is stated at exactly its size, two hops apart, beside an
explicit etymological-fallacy caution. "Driven" is now treated as morphological
decomposition of a live English compound, not an etymology.

Station 1 is a tailor's measurements — one shared Tier-2 anchor that carries the
chapter's frame. Station 3 opens on the moment the misconception forms. Station 5
now runs the CSV export twice, correct then broken: the filter reads an
eleven-month-old hardcoded list, every existing test passes, and an
`internal_notes` column added two weeks earlier leaks in every export. Station 2
moved into Prime. One foothold and one depth block added, both content-labelled;
the delete test initially failed on two dangling references and both were fixed.

**Signature contribution** (`voice.md` anti-commodity test): the specification is
one document doing two jobs at opposite ends of the loop — it sets the cut and it
checks the fit — and both headline failures in the chapter are the second job
going unclaimed. The name's own root is what predicts it.

## Outcome

- ✅ Impact: `docs/intro-spine-experiment.md` re-authored in place. All twelve
  stations now carry real content, weighted for a Concept lesson. 2,515 → 3,643
  words; `scope_multiplier` stays 1.0 because the gate measures the scope-1.0
  anchor (`docs/intro.md`) at 3,321 words, so this is 1.1x it.
- 🧪 Tests: chapter gate 0 errors / 0 warnings; full `npm run build` green; all
  four ledgers parse.
- 📁 Files: 1 chapter, 4 ledgers.
- 🔁 Next prompts: run `lesson-adversarial-review` on the chapter before the
  owner compares it against `intro.md`; decide whether `intro.md` gets the same
  treatment in place.
- 🧠 Reflection: the delete test caught two load-bearing references that a read-
  through did not — "that last line" pointing into the foothold, and "the Cui
  study" introduced only inside the depth block. Running it literally, as
  `mixed-audience.md` §3 instructs, is what found them.

## Evaluation notes (flywheel)

- Failure modes observed: the original draft passed the gate and read
  competently while missing two of the four stations a Concept lesson weights
  most. A clean gate proves correctness, not teaching structure — the two checks
  are not substitutes.
- Graders run and results (PASS/FAIL): chapter gate PASS; `npm run build` PASS;
  `language-register.md` §7 self-check PASS (avg 12.6 words/sentence, 0 banned
  words, 0 unguessable phrasal verbs, British spelling consistent); delete test
  PASS after two fixes; `mixed-audience.md` §7 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add a mechanical delete-test helper
  to `check-chapter.mjs` — strip `<Callout type="info">` blocks and flag
  back-references left dangling. It caught a real defect here by hand.

## Deviations and logged omissions

- **S2 SOURCE moved forward into Prime** rather than sitting at the end. Legal
  under `stations.md` §4, used in the opposite direction from the stated case:
  provenance *is* a gate here, because the book's term differs by one word from
  the industry's.
- **S6 WHERE merged into S4.** Legal under §4 — the mechanism and its position
  are the same fact. Blast radius kept and promoted out of a buried paragraph.
- **S11 SPIRAL placed before S10 RETRIEVE**, because "S10 last" is a fixed rule.
- **Sources `<details>` block still follows S10.** Collapsed reference apparatus,
  not prose that invites continued reading. The italic closing line that
  previously sat after it was cut on both grounds — `voice.md` bans the closing
  restatement, and `stations.md` requires nothing after the retrieval prompt.
- **No station dropped.** All twelve carry content.
- **No image, and one gap named:** the four-stage loop with the specification
  drawn as one artefact touching both ends would teach faster as a labelled
  diagram. Left for the owner; the prose carries the claim on its own.
- Out of scope, not touched: `docs/intro.md`'s pre-existing `keywords-missing`
  warning and its Mermaid diagram (a standing-rule violation on a file this task
  did not open).
