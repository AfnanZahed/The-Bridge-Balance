---
id: 0041
title: Drop research artifacts and close ADR risk
stage: general
date: 2026-09-07
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (follow-up to PHR 0040)
labels: [skills, research, dossier, lesson-spine-authoring, validators, adr, risk-mitigation]
links:
  spec: null
  ticket: null
  adr: history/adr/0004-two-skill-content-split.md
  pr: null
files:
  - .claude/skills/.../chapter-production/reference/research.md (rewritten - dossier and design.md removed; evidence-ledger named as the sole record; look-it-up protocol added as rule 7)
  - .claude/skills/.../chapter-production/SKILL.md (7 edits - description, boundary row, principle 3, step 2, step 3, step 5)
  - .claude/skills/.../chapter-production/reference/ledgers-protocol.md (dossier reference)
  - .claude/skills/.../curriculum-architect/SKILL.md + reference/brief-format.md (brief.md no longer written to a file)
  - .claude/skills/.../lesson-adversarial-review/SKILL.md (4 edits - design.md and dossier references)
  - .claude/skills/bridge-balance-project-guide/SKILL.md, CLAUDE.md (routing-table deliverables)
  - .claude/skills/lesson-spine-authoring/SKILL.md (2 new sections + 1 anti-pattern + 1 self-check item - look-it-up rule, and the standing-rules entry gate)
  - edu-site/scripts/check-frontmatter.mjs + check-chapter.mjs (assertExemptionsExist; check-chapter header archaeology removed)
  - history/adr/0004-two-skill-content-split.md (Follow-on changes subsection - artifact drop, risk mitigation)
tests:
  - "npm run build - Frontmatter validation passed; 1 chapter checked, 24 skipped, 0 errors, 1 warning; [SUCCESS] Generated static files"
  - "negative test - injected ghost.md into STAGE_FILES and NON_CHAPTERS; both validators exit 1 with a named message"
  - "positive test - lists restored, both validators pass"
  - "grep for research/stage, dossier, design.md, brief.md outside history+specs - only the sentence stating they no longer exist"
---

## Prompt

we will, for sure, do the 1st one. About the 2nd one, remove it from both you mentioned, and add this into the /lesson-spine new skill's SKILL.md as an instruction that if you (claude using that skill) need to find anything and understand about which you are not sure, research it using the web search tool or context7 (if needed) on ANY step when needed. fix the 3rd and then at last 4rth one.

## Response snapshot

**Asked one question before starting.** "Remove it" did not say what happens to the
three artifacts `research/` was supposed to hold — `dossier.yaml`, `design.md`,
`brief.md` — which are named in four workflow steps and two self-checks. Offered
drop / relocate / keep-dossier-only. Answer: **drop them entirely.**

**Item 2 — the artifacts are gone, and the ledger absorbed the job.**
`evidence-ledger.yaml` already stores per source its URL, what it establishes,
`last_verified`, `expires`, and every `questions_asked`, so `dossier.yaml` was a
per-chapter duplicate of it. The rule survives with different wording: *"a claim
with no dossier entry doesn't ship"* became *"a claim with no source doesn't
ship,"* enforced in the ledger at step 8. The design trace goes into the step 9
report and the brief into the reply — both read by the person deciding whether the
chapter ships, rather than filed where nobody opens them. 20 edits across 8 files.

**Item 2b — the replacement, in `lesson-spine-authoring`.** A new section, *"Look
it up rather than guess — at any step,"* placed between the operative principles
and the workflow so it visibly governs all nine steps rather than one: web search
for anything current, contested or dated; Context7 for library, framework and CLI
documentation, because its docs are fetched live and a remembered API is a guess
about a version. It names Station 0's etymology, Station 7's magnitudes and
Station 9's lineage as where a confident wrong answer is most likely. Carried into
that skill's anti-patterns and self-check so it binds rather than advises.

**Item 3 — the checkers now check their own lists.** `assertExemptionsExist()`
added to both validators, failing with a named message when `STAGE_FILES` or
`NON_CHAPTERS` names a file absent from `docs/`. Tested both directions: injected
`ghost.md` into each list and confirmed exit 1 with the file named, then restored
and confirmed both pass. Also cut the last piece of retirement archaeology from
`check-chapter.mjs`'s header comment.

**Item 4 — ADR-0004's most serious negative, mitigated at the point of entry.**
`lesson-spine-authoring` now opens, before any workflow step, with a conditional
block: if the lesson is Bridge Balance work — signalled by a chapter, a stage,
`edu-site/docs/`, `curriculum-state/`, an MDX file, or CS50 — stop and load
`bridge-balance-project-guide` first. The four rules it cannot know are named. It
also says a request phrased "teach me X" can be that work without saying so, which
is the exact phrasing the ADR identified as the risky path. **Honest status:
mitigated at entry, not structurally prevented** — it is still an instruction. But
it now lives in the file that loads when the risk occurs, rather than in a routing
table that path never reads. Recorded in the ADR that way, without upgrading the
claim.

## Outcome

- ✅ Impact: No skill writes to a directory that does not exist. Research became an activity with a named tool for each kind of uncertainty, instead of a form filled in once. Both validators verify their own configuration. The risk ADR-0004 called its most serious is now addressed in the file where it actually occurs.
- 🧪 Tests: `npm run build` green — frontmatter passed, gate unchanged at 0 errors / 1 warning. Assertion tested negative (both validators exit 1, file named) and positive (both pass). Artifact grep clean apart from the sentence stating they are gone.
- 📁 Files: 11 edited, 1 ADR extended, 1 PHR.
- 🔁 Next prompts: Author a chapter — item 1, and still the only untested thing here.
- 🧠 Reflection: "Remove it" was worth one question. The three artifacts were referenced from six places, and guessing wrong would have either gutted the fabrication protection or left files the user wanted gone. The answer also turned out to be the better architecture on its own terms: the ledger was already doing the dossier's job, so the dossier was duplication that happened to be pointed at a phantom path.

## Evaluation notes (flywheel)

- Failure modes observed: (1) A phantom output path survived three sessions of review because every check confirmed the *references* were consistent with each other — they were, and all of them pointed at nothing. Consistency between documents is not the same as correspondence with the filesystem. (2) The same class of bug (config listing a file that does not exist) appeared in three separate places this session: `research/`, `STAGE_FILES`, `NON_CHAPTERS`. Only the third was caught by a check rather than by reading.
- Graders run and results (PASS/FAIL): Build PASS. Frontmatter PASS. Chapter gate PASS (0 errors, unchanged). Assertion negative test PASS ×2. Assertion positive test PASS ×2. Artifact-removal grep PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): The generalisable rule from this session is that any path a skill writes to should be asserted to exist, the same way the exemption lists now are. There is no such check for skill-declared output paths — the reason `research/` survived.
