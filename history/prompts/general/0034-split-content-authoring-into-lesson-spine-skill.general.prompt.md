---
id: 0034
title: Split content authoring into lesson-spine skill
stage: general
date: 2026-09-06
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: /anthropic-skills:lesson-spine-authoring
labels: [skills, architecture, audience, teaching-method, canon, name-first]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/lesson-spine-authoring/ (created — 5 files, 850 lines, copied from session-scoped plugin dir and verified identical)
  - curriculum-state/canon/audience.md (rewritten)
  - curriculum-state/canon/voice.md (4 edits — stage-register table cut, diagram removed from anti-commodity, sentence mechanics, analogies)
  - curriculum-state/canon/thesis.md (2 edits — stale grid language invariants table, three-tier safety floor)
  - .claude/skills/bridge-balance-project-guide/SKILL.md (7 edits — description, peer-skill section, standing rule 7, routing table, scripts tree, reference tree, anti-patterns)
  - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/SKILL.md (5 edits — description, boundary table, reference table, steps 3 and 5)
  - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/reference/research.md (5 edits — design handoff, worked example, anti-pattern, self-check, design.md contents)
  - .claude/skills/bridge-balance-project-guide/reference/project-map.md (5 substitutions + new peer-skill section)
  - PROJECT-MAP.md (synced from project-map.md)
  - CLAUDE.md (3 edits — routing table + split statement, chapter-authoring rule, two-reader rule, project structure)
  - history/prompts/general/0034-split-content-authoring-into-lesson-spine-skill.general.prompt.md (created)
tests:
  - "cd edu-site && npm run build — [SUCCESS] Generated static files in \"build\"; 1 chapter checked, 24 skipped, 0 errors, 1 warning"
  - "diff -r <plugin skill dir> .claude/skills/lesson-spine-authoring/ — identical"
  - "grep sweep for stale tier language across curriculum-state/canon/ — clean"
---

## Prompt

ok, now in the skill, add the teaching method, first the audience: the audience of the content is ultra mixed, profesisonals, senior developers need to learn AI assisted development, very very juniors and new comers and freshers who even find difficulty in login/sigup and installig basic things, all are the mixed. seniors must NEVER feel the time wasted or boring stuff and new comers and freshers and junior MUST NEVER be confused or find it diffiicult. Examples will be, most of the time, real world. Everytime, my own learning and teaching method will be used: method 1: 5 w's, 2 H's:  (1. What, 2. Why, 3. when, 4. where, 5. Who, 6. How, 7. How much, method 2 was etymology. I have discussed my mathods with claude Opus 5 Max thinking, we did a lot of changes in my 2 methods, in a new chat session and then we have Created a new skill at "/anthropic-skills:lesson-spine-authoring". This new skill will handle END to END Content Creation. The previous skill we are working on will handle the Architectural and technical decisions/things.

## Response snapshot

Read the invoked skill and all four of its reference files first, then checked how
it connected to the repo. Three findings surfaced before any edit:

1. **The skill was not in the repo, or anywhere durable.** It lived only at
   `AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/<uuid>/<uuid>/skills/`.
   Not in `~/.claude/skills/`, not in any plugin cache, not in git. 850 lines of
   framework in a session temp folder.
2. **`canon/audience.md` was stale** — it still split the readership into tiers
   with per-tier rules, and carried two instructions to prefer Mermaid and inline
   SVG, from the figure pipeline deleted a day earlier.
3. **`canon/voice.md` contradicted the new skill.** Its stage-register table let
   Stage 3–4 chapters assume "generic CS vocabulary"; `mixed-audience.md` requires
   glossing every term at first use in every chapter, because a reader arriving from
   a search result has no earlier chapter. Both could not be true.

Three questions asked, all three recommendations accepted: copy the skill into the
repo as a **peer** skill; **the new skill wins** on glossing (cut the stage ladder);
**rewrite** `audience.md` around the two-reader model.

**Work done.**

- Copied the skill to `.claude/skills/lesson-spine-authoring/`, verified byte-identical
  with `diff -r`. It is now git-visible and registered.
- Rewrote `canon/audience.md`: the two disengagement conditions as the operating frame,
  the five founding reader groups kept, mobile/metered/interruption/accessibility kept,
  the grid section and Mermaid lines cut. Added the two decisions
  `language-register.md` explicitly leaves to the project — **British spelling**
  (already the majority usage in `docs/`, 11 to 5) and **Urdu glosses permitted,
  never required**, which would otherwise have been lost.
- `canon/voice.md`: cut the stage-register table, replaced with one voice plus
  always-gloss; removed "a diagram" from the anti-commodity test; replaced
  Beginner/Advanced sentence rules with the 15–18 word target that applies at every
  stage; added "say where the analogy breaks" and the anchor tiers.
- `canon/thesis.md`: found during the final sweep — its six-invariants table still had
  "May be reworded per cell? / May be cut for Summary?" columns and the safety floor
  still shipped three tiered wordings. Both cut, one floor wording kept.
- **Retired the Tree-of-Thoughts design phase.** Name-First's shape classification and
  Station 0 register gap answer the same question more specifically; running both was
  ceremony. The one piece that did not survive elsewhere — the signature contribution —
  is now named explicitly at `chapter-authoring` step 3.
- `chapter-authoring`: added the boundary table (what each skill owns) and the rule that
  settles borderline cases — *what is true and where it lives* is this skill, *what the
  reader meets and in what order* is `lesson-spine-authoring`. Steps 3 and 5 now hand
  off. Rewrote the worked example to demonstrate the new flow; the old one used a
  to-do app, which `lesson-spine-authoring` Principle 7 bans outright.
- `bridge-balance-project-guide`: added the peer-skill section and split table, new
  standing rule 7 (two readers, no audience labels, always gloss), a routing row for
  standalone teaching prose, and a new anti-pattern for drafting without loading the
  spine skill. Also fixed a `check-figures` reference in its `edu-site/` tree that the
  previous session's figure-removal sweep had missed.
- `CLAUDE.md`, `project-map.md`, `PROJECT-MAP.md` updated to match.

## Outcome

- ✅ Impact: The teaching framework is now version-controlled with the book instead of living in a session temp directory, and the two skills have a stated, non-overlapping boundary. Three stale canon files that every authoring run reads were corrected.
- 🧪 Tests: `npm run build` green — `[SUCCESS] Generated static files in "build"`, 1 chapter checked, 24 skipped, 0 errors, 1 warning (`keywords-missing` on `docs/intro.md`, pre-existing). `diff -r` on the copied skill: identical. Canon sweep for grid language: clean.
- 📁 Files: 1 skill folder created (5 files), 10 files edited, 1 PHR.
- 🔁 Next prompts: Author one real chapter end to end — it would be the first exercise of either skill, and the first test of whether the handoff at step 3 actually holds. Consider an ADR for the two-skill split.
- 🧠 Reflection: The user's framing ("add the teaching method to the skill") described work that was already done — the method was fully built in the other session. The actual gap was that nothing connected it to this repo, and that three canon files still described a strategy retired days ago. Reading the skill and its references before editing anything is what surfaced that; the stated request would have been satisfiable without ever noticing the skill was untracked.

## Evaluation notes (flywheel)

- Failure modes observed: The previous session's figure-removal sweep missed `bridge-balance-project-guide/SKILL.md` line 85 (`check-figures` in the scripts tree). The handoff prompt's grep pattern would have caught it — evidence the sweep was scoped to the files being edited rather than run repo-wide. `canon/thesis.md` carried stale language too; canon was never swept for it.
- Graders run and results (PASS/FAIL): `npm run build` PASS. `check-chapter.mjs` PASS (0 errors). Copy integrity PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Sweep `curriculum-state/canon/` and `contracts/` for any remaining retired-strategy language before the first real chapter run — canon has now been found stale twice in three days, and it is the one layer every authoring session reads in full.
