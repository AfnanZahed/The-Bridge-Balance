# Job 1 — stage structure landing (mechanical)

Repo: `C:\Users\Dell\Desktop\Book`. Site root: `edu-site`. Execute the seven steps below in order, exactly, and nothing else. Do not explore the repository, do not read files you are not told to read, do not edit any file not named here, and do not create any new file other than the backup copies. Never run a git command.

Background you can rely on (do not go verify it): the curriculum is moving from five stages to four.

| Old | New |
|---|---|
| `stage-01-spec-aware-vibe-engineering/` | chapter files now live in `stage-01-sde-mastery-ai-driven/` (folder already exists) |
| `stage-02-cs50-certification/` | rename to `stage-02-credentials/` |
| `stage-03-mastering-ai-coding-agents/` | retired; its chapters now live in `stage-01-sde-mastery-ai-driven/` |
| `stage-04-engineering-autonomous-ai-agents/` | its chapters now live in `stage-03-sde-mastery-ai-native/` (folder already exists) |

## STEP 1 - Backup

Create `_scratch/backup-2026-09-22-stage-rename/docs/` and copy these three folders into it, preserving every file:

- `edu-site/docs/stage-01-spec-aware-vibe-engineering` -> `_scratch/backup-2026-09-22-stage-rename/docs/stage-01-spec-aware-vibe-engineering`
- `edu-site/docs/stage-03-mastering-ai-coding-agents` -> `_scratch/backup-2026-09-22-stage-rename/docs/stage-03-mastering-ai-coding-agents`
- `edu-site/docs/stage-04-engineering-autonomous-ai-agents` -> `_scratch/backup-2026-09-22-stage-rename/docs/stage-04-engineering-autonomous-ai-agents`

Report the number of files copied from each folder.

## STEP 2 - Fill the merge folders from the wired copies

For each `.md` file whose basename exists in BOTH `edu-site/docs/stage-01-spec-aware-vibe-engineering/` and `edu-site/docs/stage-01-sde-mastery-ai-driven/`, copy the OLD file (from `stage-01-spec-aware-vibe-engineering/`) over the new one, so the new folder holds the version the site already serves. Exception: leave `index.md` alone in every folder.

Do the same for every basename shared between `edu-site/docs/stage-04-engineering-autonomous-ai-agents/` and `edu-site/docs/stage-03-sde-mastery-ai-native/`, again leaving `index.md` alone.

If a basename exists in one of a pair of folders but not the other, do NOT guess or rename anything - list both folders' contents and report the mismatch in your final answer.

Then list every `.md` file now present in `stage-01-sde-mastery-ai-driven/` and in `stage-03-sde-mastery-ai-native/`, with each file's `chapter_state` frontmatter value (write "none" if the key is absent).

## STEP 3 - Rename the Stage 2 folder

Move `edu-site/docs/stage-02-cs50-certification` to `edu-site/docs/stage-02-credentials`. File names inside stay unchanged.

## STEP 4 - Delete the three retired folders

Delete these three directories completely:

- `edu-site/docs/stage-01-spec-aware-vibe-engineering`
- `edu-site/docs/stage-03-mastering-ai-coding-agents`
- `edu-site/docs/stage-04-engineering-autonomous-ai-agents`

The Step 1 backup holds their contents. Delete nothing else.

## STEP 5 - Stage index pages

Apply exactly these replacements. The em dash in the strings below is the same character already used in the files (U+2014).

(a) `edu-site/docs/stage-02-credentials/index.md`

- `title: "Stage 2 — Credible Validation (CS50)"` becomes `title: "Stage 2 — Credentials"`
- `description: "Two Harvard certificates (CS50P + CS50W) as international proof of skill."` becomes `description: "CS50P and CS50W — Harvard's two CS50 credentials — as internationally recognized proof of your skill."`
- `# Stage 2 — Credible Validation (CS50)` becomes `# Stage 2 — Credentials`

Leave every other line of the file untouched.

(b) `edu-site/docs/stage-03-sde-mastery-ai-native/index.md`

- `# Stage 4 — Engineering Autonomous AI Agents` becomes `# Stage 3 — SDE Mastery (AI-Native; Agentic AI)`
- `**Stage 4 is the shift from "one agent, one task" to "many agents, one workflow."**` becomes `**This stage is the shift from "one agent, one task" to "many agents, one workflow."**`
- `> _Detailed chapter content to be added when the Stage 4 video series is recorded._` becomes `> _Detailed chapter content to be added when this stage's video series is recorded._`

Leave every other line of the file untouched.

(c) `edu-site/docs/stage-01-sde-mastery-ai-driven/index.md` - no changes at all.

## STEP 6 - Ledger updates

File: `curriculum-state/ledgers/prerequisite-graph.yaml`. Make exactly these changes, and use the basenames that actually exist on disk in the destination folder (report it if a basename differs from the one named here):

- row `s1-index`: `path:` becomes `docs/stage-01-sde-mastery-ai-driven/index.md`.
- rows `s1-01` through `s1-06`: `path:` becomes `docs/stage-01-sde-mastery-ai-driven/<same basename>`; set `position:` to 2, 3, 4, 5, 6, 7 in that order (s1-01 = 2 ... s1-06 = 7).
- rows `s3-prompt`, `s3-context`, `s3-cc`, `s3-skills`: rename the ids to `s1-prompt`, `s1-context`, `s1-cc`, `s1-skills`; change `stage: 3` to `stage: 1`; set positions 8, 9, 10, 11 in that order; change `path:` to `docs/stage-01-sde-mastery-ai-driven/<same basename>`. Keep every other field (title, status, scope_multiplier, requires, teaches) exactly as it is.
- row `s3-index`: keep the row, set `status: removed`, set `path: null`, and add this sentence to its existing `notes:` value: `Retired 2026-09-22 in the four-stage restructure: the old Stage 3 overview merged into s1-index and its placeholder file was deleted.`
- rows `s2-index`, `s2-cs50p`, `s2-cs50w`: `path:` becomes `docs/stage-02-credentials/<same basename>`; keep `stage: 2` and their positions.
- rows `s4-index`, `s4-rag`, `s4-multi`, `s4-evals`: rename the ids to `s3-index`, `s3-rag`, `s3-multi`, `s3-evals`; change `stage: 4` to `stage: 3`; `path:` becomes `docs/stage-03-sde-mastery-ai-native/<same basename>`; keep positions 1, 2, 3, 4. In `requires:`, `s3-index` becomes `[s1-skills]`, `s3-rag` becomes `[s3-index, s1-05]`, `s3-multi` becomes `[s3-rag]`, `s3-evals` becomes `[s3-rag]`. Keep every other field.
- the `progress:` block near the end of the file: keep every number exactly as it is, update the per-stage breakdown comment so it reads `Stage 1 (10) + Stage 2 (2) + Stage 3 (3)`, and append this line to the block: `2026-09-22: four-stage restructure. Old Stage 1 (6) and old Stage 3 (4) merged into Stage 1 (10); old Stage 4 became Stage 3 (3). Totals unchanged.`
- anywhere else in `curriculum-state/ledgers/*.yaml` where the VALUE of a `path:`, `used_in:` or `first_defined:` field names a folder being renamed or deleted, repoint it to the new path. Change field values only - dated historical comments stay exactly as they are. Report every such change.

## STEP 7 - Record the restructure in the ledger

Append this block, exactly, to the very end of `curriculum-state/ledgers/prerequisite-graph.yaml`:

```
# RESTRUCTURE 2026-09-22 (four-stage curriculum, owner-approved). The five
# stages became four: Stage 1 SDE Mastery (AI-Driven) is the old Stage 1 and
# old Stage 3 merged; Stage 2 is Credentials (renamed from Credible
# Validation); Stage 3 SDE Mastery (AI-Native; Agentic AI) is the old Stage 4.
# Live folders: docs/stage-01-sde-mastery-ai-driven/,
# docs/stage-02-credentials/, docs/stage-03-sde-mastery-ai-native/. Every file
# that moved was a placeholder. The retired folders were backed up to
# _scratch/backup-2026-09-22-stage-rename/ before deletion.
```

## Final answer

Report, as a plain list in order: every file created, copied, moved, edited and deleted; the file counts from STEP 1; the folder listings from STEP 2; the mismatch report from STEP 2 if any; and the list of chapter rows you changed in STEP 6 with their final id, stage, position and path. Do not run any build, test or site command. Do not touch `edu-site/sidebars.ts`, any other `.ts`/`.tsx` file, or any file under `edu-site/docs/` other than the three `index.md` files named in STEP 5.
