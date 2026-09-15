---
id: 0039
title: Amend ADR-0004 and fix lock drift
stage: general
date: 2026-09-07
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (follow-up to PHR 0038)
labels: [adr, amendment, dependencies, package-lock, validators, cleanup]
links:
  spec: null
  ticket: null
  adr: history/adr/0004-two-skill-content-split.md
  pr: null
files:
  - history/adr/0004-two-skill-content-split.md (Amendment section appended - rename rationale, six duplications, three structural changes, consequences, alternative considered)
  - history/adr/README.md (0006 row marked amended; short note on how an amended ADR differs from a superseded one)
  - edu-site/package-lock.json (regenerated with --package-lock-only - six dead figure-pipeline devDeps and 49 packages removed)
  - edu-site/scripts/check-frontmatter.mjs (second dead STAGE_FILES entry removed; comment added stating the invariant)
  - history/prompts/general/0039-amend-adr-0004-and-fix-lock-drift.general.prompt.md (created)
tests:
  - "npm run build - [SUCCESS] Generated static files in \"build\""
  - "check:chapter inside the build - 1 chapter checked, 24 skipped, 0 errors, 1 warning (unchanged)"
  - "check:frontmatter inside the build - passed with the shortened STAGE_FILES"
  - "package.json vs lock root - zero drift in both directions, both fields"
  - "lock package count 1560 -> 1511; file 22079 -> 21433 lines"
  - "svgo confirmed transitive (via @svgr/plugin-svgo and postcss-svgo), correctly retained"
---

## Prompt

amend ADR-0004 and fix the 2 things you flagged.

## Response snapshot

Read "the 2 things" as the pair flagged at the end of the commit report — the
`package-lock.json` drift and the uncommitted `check-frontmatter.mjs` change —
since the other pair mentioned later in the session had already been fixed in the
same breath they were reported.

**ADR-0004 amended, not rewritten.** The original body is left exactly as
written, because it records what was decided on 2026-09-06; an `## Amendment`
section carries 2026-09-07, opening with a naming note that maps every
`chapter-authoring` in the body to `chapter-production`.

The amendment's most useful content is that **this ADR predicted its own
failure.** Its first listed negative reads *"a boundary in prose is weaker than
no boundary at all."* That was correct within a day, and in a worse form than
anticipated: the expectation was that the seam would cost something during a real
authoring run, but the boundary eroded through **documentation drift alone**,
before either skill had authored a single chapter. Recorded the six duplications
as found, the diagnosis (the name was the cause), the three structural changes,
and the alternative rejected (dedupe without renaming — treats the symptom and
leaves the cause for the next author to rediscover).

Also recorded honestly: the "Untested" negative **still stands, undiminished**.
The boundary has now been specified twice and exercised zero times. And the
renaming remedy is itself unproven — if the boundary erodes again under a name
that plainly forbids the drift, the conclusion is that prose cannot hold this
seam.

**`package-lock.json`.** Confirmed six devDeps present in the lock root but absent
from `package.json`, all figure-pipeline remnants: `satori`, `@resvg/resvg-js`,
`elkjs`, `svgo`, `culori`, `subset-font`. Regenerated with
`npm install --package-lock-only` so `node_modules` was left untouched. Result:
zero drift both directions, 1560 → 1511 packages, 646 fewer lines. It also
absorbed most of the ~722 lines of unrelated churn the file was already carrying,
leaving a net diff against HEAD of 106 insertions / 53 deletions.

`svgo` still appears in the lock and that is correct — it is transitive, pulled in
by `@svgr/plugin-svgo` and `postcss-svgo`, both Docusaurus internals. Checked
rather than assumed.

**`check-frontmatter.mjs`.** The uncommitted change removed `choose-your-path.md`
from `STAGE_FILES` (the docs-root pages exempt from requiring `chapter_state`).
Verified the file genuinely no longer exists, so the change was right — **but
incomplete**: `llm-providers.md` in the same list is equally dead. Removed it too
and added a comment stating the invariant, since a stale entry in an exempt list
fails silently and hides the fact that the page is gone.

## Outcome

- ✅ Impact: ADR-0004 is current again and carries the rename plus the reason it was needed, in one place. The lock file and `package.json` agree for the first time since the figure pipeline was deleted. The frontmatter validator's exempt list contains only files that exist.
- 🧪 Tests: `npm run build` green — `[SUCCESS] Generated static files in "build"`. Chapter gate unchanged at 0 errors / 1 warning. `check:frontmatter` passed with the shortened list. Lock/manifest drift zero in both directions.
- 📁 Files: 1 ADR amended, 1 ADR index updated, 1 lock regenerated, 1 validator fixed, 1 PHR.
- 🔁 Next prompts: Author a chapter. Nothing in the last three sessions has been exercised by a real run, and that is now the only meaningful next test.
- 🧠 Reflection: The `check-frontmatter.mjs` change was someone else's, correct, and half-finished — the kind of edit that looks complete because the entry it removed was the one that had been noticed. Checking every entry in the list rather than the one in the diff took one command and found the second dead file.

## Evaluation notes (flywheel)

- Failure modes observed: (1) "The 2 things you flagged" was genuinely ambiguous — two different pairs had been flagged in the same session — and was resolved by picking the pair that was still unfixed, since asking to "fix" already-fixed items is a no-op. Stating the interpretation up front is cheaper than asking. (2) Reviewing a diff instead of the state it produces would have shipped the second dead `STAGE_FILES` entry.
- Graders run and results (PASS/FAIL): Build PASS. Chapter gate PASS (0 errors, unchanged). Frontmatter check PASS. Lock-drift check PASS (zero, both fields). Transitive-dependency check PASS (svgo correctly retained).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Add a `check:stage-files` assertion to the frontmatter validator that fails when a `STAGE_FILES` entry names a file that does not exist. The dead entries survived because nothing checks the checker's own list.
