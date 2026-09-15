---
id: 0038
title: Rebrand chapter-authoring to chapter-production
stage: general
date: 2026-09-07
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (follow-up to ADR-0004, the two-skill content split)
labels: [skills, boundary, deduplication, rename, chapter-production, lesson-spine-authoring]
links:
  spec: null
  ticket: null
  adr: history/adr/0004-two-skill-content-split.md
  pr: null
files:
  - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/ -> chapter-production/ (git mv, 5 files, rename detected)
  - .../chapter-production/SKILL.md (rewritten - name, description, identity, boundary, never-do list, 7 principles cut to 5, steps 3 and 5 converted to handoffs, anti-patterns)
  - .../chapter-production/reference/research.md (rewritten - design half removed, duplicated worked example replaced with this skill's half only, 4 anti-patterns and 6 self-check items removed)
  - .../chapter-production/reference/gate.md (figure-pipeline and previous-gate archaeology removed; stale placeholder example generalised)
  - .../chapter-production/reference/ledgers-protocol.md (old-skill-split archaeology removed; Principle 7 -> Principle 5 renumber)
  - .../bridge-balance-project-guide/SKILL.md (description reworded, colon-space YAML fragility fixed)
  - .../reference/{book-coherence-audit,curriculum-architect,lesson-adversarial-review}/SKILL.md (shared "Where this fits" notice sharpened)
  - .../reference/curriculum-architect/reference/brief-format.md (stale "Tree-of-Thoughts design phase chapter-authoring runs on its own" corrected)
  - .../reference/project-map.md + PROJECT-MAP.md (calibration row, voice row, chapter-production row, peer-skill line)
  - CLAUDE.md, PROJECT-REPORT.md, curriculum-state/README.md, contracts/calibration.md, ledgers/evidence-ledger.yaml (rename + role wording)
  - history/prompts/general/0038-rebrand-chapter-authoring-to-chapter-production.general.prompt.md (created)
tests:
  - "node scripts/check-chapter.mjs - 1 chapter checked, 24 skipped, 0 errors, 1 warning (unchanged)"
  - "strict YAML parse of all 8 SKILL.md frontmatter blocks - 0 failing (2 were failing before this change)"
  - "yaml.safe_load on all four curriculum-state ledgers - parse OK"
  - "grep for chapter-authoring outside history/ - zero occurrences"
  - "diff PROJECT-MAP.md against reference/project-map.md - identical"
  - "git status - .claude/skills/lesson-spine-authoring/ clean, zero changes"
---

## Prompt

I think the chapter authoring is doing some steps which the lesson spine authoring does. tell me the without touching the lesson spine authoirng new skill, update the chapter authoring skill, rebrand it and fix it's exact role

## Response snapshot

Read both skills in full first, then reported six concrete duplications before
changing anything:

1. **The same worked example lived in both skills.** `research.md`'s "What an AI
   coding agent actually is" and `lesson-spine-authoring/reference/mixed-audience.md`
   §6 were the same example — same Register 4 verdict on *agent*, same
   both-audience list, same foothold ("What one turn looks like"), same depth
   block ("Why token cost scales worse than task size"), same delete-test verdict.
2. **Step 5 restated `lesson-spine-authoring` workflow steps 6–8** almost clause
   for clause.
3. **Step 3 restated its workflow steps 1–5**, while `research.md` two files away
   said "do not re-derive its workflow here."
4. **Three of seven operative principles were teaching craft** — P2 (teach the
   misconception) is the Station 0 → Station 4 prediction loop; P3 (concrete
   before abstract) is its Principle 3 plus the station ordering; P4 (curate
   ruthlessly) is the both-audience list.
5. **Four anti-patterns were its** — definition-first opening, forced analogy,
   presenting fact without diagnosing the wrong belief, faking the station sheet
   (that last one already admitted the overlap in its own text).
6. **Six of 17 self-check items re-checked its self-check.**

Plus one stale claim: `brief-format.md` still described "the Tree-of-Thoughts
design phase `chapter-authoring` runs on its own" — that phase has not existed
since the split.

**The rename was the actual fix.** A skill called *authoring* will author; the
name was inviting the drift. Renamed to **`chapter-production`** — the publishing
sense, where production is everything around the writing (commissioning,
fact-checking, house style, setting the page, proofing, cataloguing) done by
people who do not write the book. `git mv`, so history follows.

**What changed structurally:** seven principles cut to five, all of them about
evidence, contract or record. Steps 3 and 5 became real handoffs — step 3 now
names four things to hand over and three canon obligations to check on the way
back (curriculum invariants, ledger-checked example, signature contribution) and
explicitly forbids inventing a fourth. Added a **"What this skill must never do"**
list of six items. `research.md` lost its design half and its copy of the worked
example, keeping only this skill's half with a pointer to where the other half
lives.

**Also cleaned, since these were its files:** retirement archaeology in `gate.md`
("deleted on 2026-09-06", "the previous gate skipped them silently") and
`ledgers-protocol.md` ("that's a change from the two-skill split it replaces"),
per the standing rule that history lives in the ADR and git log, not inline.

**One thing found while verifying:** two `SKILL.md` descriptions — the parent
guide's (pre-existing) and the new one — contained an unquoted colon-space, which
strict YAML rejects. Claude Code's own parser tolerates it, so nothing was broken,
but it is a latent trap if a stricter parser ever loads them. Fixed both.

## Outcome

- ✅ Impact: One decision, one owner, in both directions. `chapter-production` now states its role in its first sentence — *it does not write the chapter* — and carries an explicit list of what it must never do. The duplicated worked example is gone; the two skills reference each other's halves instead of both holding a copy.
- 🧪 Tests: Chapter gate unchanged at 0 errors / 1 warning. All 8 skill frontmatter blocks parse under strict YAML, up from 6. All four ledgers parse. Zero `chapter-authoring` outside `history/`. The two project-map copies are byte-identical. `lesson-spine-authoring/` is untouched, as instructed.
- 📁 Files: 5 renamed (2 of them substantially rewritten), 11 edited, 1 PHR.
- 🔁 Next prompts: Author a chapter. The boundary has been specified three times now and never once exercised — the first real run is the only thing that will show whether the handoff at step 3 is actually workable or just tidy on paper.
- 🧠 Reflection: The duplication was not carelessness; it was a skill whose name described a job it no longer had, and every edit since the split had been quietly pulled back toward that name. Renaming was the load-bearing change and the prose cleanup mostly followed from it. Worth remembering that when a boundary keeps eroding, the name is a likely cause.

## Evaluation notes (flywheel)

- Failure modes observed: (1) Two skills held the same worked example, which no keyword sweep would flag as a problem — it took reading both in full to see it. (2) A `<<'EOF'` heredoc through the Bash tool failed on a large document with mixed quoting; falling back to the Write tool was correct and should have been the first choice for a file that size. (3) A `print()` of an em-dash crashed a patch script mid-loop under cp1252, and because the write happened after the loop, two edits were silently lost — caught only by re-running. Set `PYTHONIOENCODING=utf-8`, and write before printing.
- Graders run and results (PASS/FAIL): Chapter gate PASS (0 errors, unchanged). Strict-YAML frontmatter PASS ×8 (was 6/8). Ledger parse PASS ×4. Rename-completeness grep PASS (zero). Map-copy diff PASS (identical). Untouched-skill check PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Run one real chapter through `chapter-production` end to end and note every point where the handoff at step 3 needed something the protocol did not name. That is the only test that matters and it has not been run.
