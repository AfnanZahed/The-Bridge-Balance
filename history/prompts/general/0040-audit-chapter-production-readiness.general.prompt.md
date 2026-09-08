---
id: 0040
title: Audit chapter-production readiness
stage: general
date: 2026-09-07
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (follow-up to PHR 0038, 0039)
labels: [audit, chapter-production, validators, consistency, readiness]
links:
  spec: null
  ticket: null
  adr: history/adr/0004-two-skill-content-split.md
  pr: null
files:
  - .claude/skills/.../chapter-production/reference/ledgers-protocol.md (2 fixes - step 1 framed around "diagnosing the misconception", which SKILL.md now forbids)
  - edu-site/scripts/check-chapter.mjs (NON_CHAPTERS - dead llm-providers.md entry removed; invariant comment added)
  - history/prompts/general/0040-audit-chapter-production-readiness.general.prompt.md (created)
tests:
  - "npm run build - [SUCCESS] Generated static files in \"build\"; check:frontmatter and check:chapter both green"
  - "chapter gate - 1 chapter checked, 24 skipped, 0 errors, 1 warning (unchanged)"
  - "every file path referenced inside chapter-production/ resolves"
  - "step cross-references consistent - research 2, lesson-spine 3-5, gate 7, ledgers 1 and 8, present 9"
  - "frontmatter example covers all 5 REQUIRED_FM keys plus the conditional ones - none missing"
  - "all 4 ledger schemas carry every field ledgers-protocol.md claims"
  - "canon/voice.md confirmed to contain Six commitments, find-and-replace test, anti-commodity test"
---

## Prompt

Now, is this skill well managed and 100% ready to go and well packed or anything else is still to be done?

## Response snapshot

Audited rather than asserted. **It was not 100% — two real defects surfaced**, both
now fixed, plus four items that remain genuinely open.

**Defect 1 — a live contradiction inside the skill.** `ledgers-protocol.md` framed
step 1 twice as happening *"before diagnosing the misconception"* — an act
`SKILL.md` line 37 now explicitly forbids (*"Do not diagnose the misconception
separately. Station 0 locates it"*). PHR 0038 cleaned that file's archaeology and
renumbered its principle reference but missed the teaching-craft framing, so the
skill contained an instruction to do the thing it bans. Reframed around the real
reason to read the ledger at step 1: existing canonical definitions become handoff
constraints at step 3.

**Defect 2 — the same dead entry in the sibling validator.** `check-chapter.mjs`'s
`NON_CHAPTERS` still listed `llm-providers.md`, the file PHR 0039 had just removed
from `check-frontmatter.mjs`'s `STAGE_FILES`. Same bug, same dead file, second
validator — missed because the previous pass fixed the diff rather than the class.
Removed, with the invariant stated in a comment as in the sibling.

**What was verified to hold:** every file path referenced inside the skill
resolves; step cross-references are consistent in both directions; the step 6
frontmatter example covers all five `REQUIRED_FM` keys plus the conditional ones;
all four ledger schemas genuinely carry every field `ledgers-protocol.md` claims
(`defined`/`used-undefined`/`first_defined`, `questions_asked`/`unresolved_citations`,
`reserved`/`spent`, `requires`/`teaches`); `canon/voice.md` really does contain the
Six commitments and both named tests; the parent routing path resolves; and no
`lesson-spine-authoring` instructions remain — every mention is a boundary row, a
prohibition, or a pointer.

**Still open, and reported rather than fixed:**

1. **Never run.** Boundary specified twice, exercised zero times. Everything above
   is documentation consistency, not evidence the handoff works.
2. **`research/` does not exist** and is absent from `PROJECT-MAP.md`, though two
   skills write there. Not gitignored, so dossiers will commit — but the first run
   creates it blind.
3. **Neither validator checks its own exempt list against the filesystem** — the
   reason both dead entries survived. Roughly three lines.
4. **ADR-0004's most serious risk is unchanged**: `lesson-spine-authoring` triggers
   independently, so "teach me X" can reach it without the CS50 integrity floor,
   the no-images rule, or the no-chapter-count rule.

## Outcome

- ✅ Impact: The skill no longer instructs an act it forbids. Both validators' exempt lists now contain only files that exist. The readiness answer is grounded in checks that were actually run, with the four remaining gaps named rather than smoothed over.
- 🧪 Tests: `npm run build` green. Chapter gate unchanged at 0 errors / 1 warning. `check:frontmatter` green with the shortened list. All structural claims re-verified against the filesystem.
- 📁 Files: 2 fixed, 1 PHR.
- 🔁 Next prompts: Author a chapter. Item 1 above is the only remaining test that means anything.
- 🧠 Reflection: "Is it ready?" is worth answering by checking, not by summarising the previous turn's work. Two defects were found in under ten commands, one of them a direct contradiction I had introduced the same session — the cheapest possible time to catch it, and it would not have been caught by re-reading my own summary.

## Evaluation notes (flywheel)

- Failure modes observed: (1) A file cleaned for one property (archaeology, principle numbering) was assumed clean for another (teaching-craft framing) — partial cleanup reads as complete cleanup. (2) Fixing a reported diff instead of the class of bug left the identical dead entry in the sibling validator; the class was only found by grepping for the pattern rather than the instance.
- Graders run and results (PASS/FAIL): Build PASS. Chapter gate PASS (0 errors, unchanged). Path-resolution PASS. Step cross-reference PASS. Frontmatter-contract PASS. Ledger-schema PASS ×4. Canon-claim PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Add the filesystem assertion for `STAGE_FILES` and `NON_CHAPTERS` so the checkers check their own lists, then create `research/` with a README so the first authoring run does not invent its shape.
