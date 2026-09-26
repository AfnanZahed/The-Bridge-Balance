---
id: 0158
title: "A chapter is one step in a long-term plan — framing written into the agent docs"
stage: general
date: 2026-09-26
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: owner
command: none
labels: ["claude-md", "agents-md", "readme", "project-map", "framing", "long-term-plan"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - CLAUDE.md
 - AGENTS.md
 - README.md
 - PROJECT-MAP.md
 - .claude/skills/bridge-balance-project-guide/reference/project-map.md
 - _scratch/job-briefs/2026-09-22/agenda/index.html
 - history/prompts/general/0158-major-plan-framing.general.prompt.md
tests:
 - "npm run check:refs in edu-site: Reference validation passed"
---

## Prompt

Also, this too: update the claude.md, readme, agents.md and project map as per this. so that, whenever in future, the AI (you or the claude) will be writing any new lessson or chapter in the bridge balance book, it will keep it mind that this is the part of a MAJOR idea and long term plan, not just teaching a thing to some students.

## Response snapshot

Added the framing in one consistent shape to all four named files. `CLAUDE.md` and `AGENTS.md` now open the "Content track — writing chapters" section with "A chapter is never just a chapter — it is one step in a long-term plan, not lesson production for a class of students," naming the four purposes a chapter serves and pointing at `curriculum-state/canon/projects.md`. The root `README.md` gained a "The long-term plan" section stating the learn–apply–teach loop and the four purposes. Both project maps — the root `PROJECT-MAP.md` and the skill's duplicate `reference/project-map.md` — gained the same framing paragraph under "Content & curriculum system", a new row for `curriculum-state/canon/projects.md`, and the ledgers row corrected from five to six. The Agenda's new done row was extended to record the framing's placement.

## Outcome

- ✅ Impact: A future session writing any lesson or chapter now meets the framing wherever it starts — the project brief it loads automatically, the site README, and the structure map it consults for paths — instead of only in the mechanical step 9 check. The two project-map copies were drifting (the skill's copy is shorter and lacks the `course-structure.md` row); the new content was added to both so this change does not widen the drift, and the remaining drift is noted for the owner rather than silently half-fixed.
- 🧪 Tests: `npm run check:refs` passed after the edits, covering the new backticked paths and the README's relative link.
- 📁 Files: The seven files in the frontmatter — six edited plus this record.
- 🔁 Next prompts: the two project-map copies have drifted beyond this change (the skill's copy is missing later rows); a future job can reconcile them fully or retire one copy.
- 🧠 Reflection: the same sentence was placed in four files on purpose — each is loaded at a different moment, and a rule that exists in only one of them is a rule the next session can miss.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
