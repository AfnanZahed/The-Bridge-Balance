# Tasks 011 — Stage Structure Landing

Status, 22 September 2026: halted. The four-stage structure this spec lands was superseded the same day by the Agentic-inside-SE decision (curriculum-state/canon/course-structure.md, CS-12). Do not resume T007–T012.

Ordered. One executor per task; every task's evidence is recorded in the row. **Resume point for a later session: read the status note above — it, not the first unchecked task, says what to do.**

Owner's routing for this workstream (2026-09-22): Claude plans and verifies, DeepSeek V4.1 Flash through `cmdc --effort high` executes the mechanical work.

## Status

| # | Task | Executor | State | Evidence |
|---|---|---|---|---|
| T001 | Write this spec folder (`spec.md`, `plan.md`, `tasks.md`) | Claude | ✅ done | this folder; verified by Claude on 2026-09-22 with targeted ls and grep checks |
| T002 | Back up the three retired stage folders to `_scratch/backup-2026-09-22-stage-rename/` | DeepSeek | ✅ done | verified by Claude on 2026-09-22 with targeted ls and grep checks |
| T003 | Copy the wired chapter files into the two merge folders; rename `stage-02-cs50-certification` → `stage-02-credentials`; delete the three retired folders | DeepSeek | ✅ done | verified by Claude on 2026-09-22 with targeted ls and grep checks |
| T004 | Correct the three stage index pages (exact text in the brief) | DeepSeek | ✅ done | verified by Claude on 2026-09-22 with targeted ls and grep checks |
| T005 | Update `prerequisite-graph.yaml` (paths, stage numbers, positions, ids, `progress:` breakdown) and any other ledger path value | DeepSeek | ✅ done | verified by Claude on 2026-09-22 with targeted ls and grep checks |
| T006 | Update site code: `sidebars.ts`, `src/lib/stages.ts`, `docusaurus.config.ts` footer, `src/pages/index.tsx`, `src/pages/404.tsx`, `src/components/HomepageHero/index.tsx` | DeepSeek | ✅ done | verified by Claude on 2026-09-22 with targeted ls and grep checks |
| T007 | Run the five gates and report raw output | DeepSeek | ⛔ halted | Superseded on 2026-09-22 by the Agentic-inside-SE decision (course-structure.md CS-12); a new task list for the second structure pass replaces them. |
| T008 | Update scanned docs: `CLAUDE.md`, `PROJECT-MAP.md`, `stack.md`, `edu-site/README.md`, the two `history/reports/` files, `.claude/skills/**`, `curriculum-state/**` | DeepSeek | ⛔ halted | Superseded on 2026-09-22 by the Agentic-inside-SE decision (course-structure.md CS-12); a new task list for the second structure pass replaces them. |
| T009 | Apply the reader-facing corrections: `welcome.md`, `faq.md`, `ch00-introduction.md`, `code-of-conduct.md` | Claude writes, DeepSeek applies | ⛔ halted | Superseded on 2026-09-22 by the Agentic-inside-SE decision (course-structure.md CS-12); a new task list for the second structure pass replaces them. |
| T010 | Append the changelog entry | Claude | ⛔ halted | Superseded on 2026-09-22 by the Agentic-inside-SE decision (course-structure.md CS-12); a new task list for the second structure pass replaces them. |
| T011 | Canon-side record: `course-structure.md` §5, §6 (CS-Q7 — 22 September 2026: this became the zero-knowledge floor question, answered **Stages 0–1**), §7 (rows now done), §8 changelog; `thesis.md` stage table; `naming.md` row; `course-structure.md` pointer to this spec | Claude | ⛔ halted | Superseded on 2026-09-22 by the Agentic-inside-SE decision (course-structure.md CS-12); a new task list for the second structure pass replaces them. |
| T012 | Final verification: all gates green, grep clean, reader-facing diffs read; then PHRs 0133–0134 and this task table closed | Claude | ⛔ halted | Superseded on 2026-09-22 by the Agentic-inside-SE decision (course-structure.md CS-12); a new task list for the second structure pass replaces them. |

## Notes

- T002–T007 are one DeepSeek job each stage of the sequence, not one giant call — the CLI stalls on oversized briefs (`command-code-delegation/references/command-code-cli.md`).
- Nothing in this list may be marked done from a `finalText` summary; only from the raw tool trace plus a re-read of the changed file.
- T011 is the content track's half of the record, per the owner's "both, split by track" decision.

## Second pass (22 September 2026): the three-stage structure

The four-stage pass above was superseded the same day by the Agentic-inside-SE decision (`curriculum-state/canon/course-structure.md`, CS-12 to CS-33). This list replaces T007–T012; T001–T006 stand as the record of the first pass. The task briefs are in `_scratch/job-briefs/2026-09-22/`.

| # | Task | Executor | State | Evidence |
|---|---|---|---|---|
| T013 | The canon record of the three-stage decision | Claude + DeepSeek | ✅ done | CS-12 to CS-33 in `curriculum-state/canon/course-structure.md` (`job4-canon-record.md`, `job7-canon-followup.md`); `thesis.md` and `naming.md`; PHRs 0135 to 0138 |
| T014 | The inventory of stale stage references | DeepSeek | ✅ done | `_scratch/job-briefs/2026-09-22/job5-inventory.md` (`job5-stage-inventory.md`) |
| T015 | Agent instructions and project docs (inventory category A), with the constitution's MINOR version bump | DeepSeek | in progress | `_scratch/job-briefs/2026-09-22/job9-agent-docs.md`; backups in `_scratch/backup-2026-09-22-agentic-inside-se-3/` |
| T016 | curriculum-state (inventory category B) | DeepSeek | ✅ done | `_scratch/job-briefs/2026-09-22/job10-curriculum-state.md`; backups in `_scratch/backup-2026-09-22-agentic-inside-se-4/`; re-grep and backup comparison clean in that job's report |
| T017 | The site structure pass (inventory category C) | DeepSeek | ⛔ blocked | waits for the owner to confirm that another session has finished editing `edu-site/sidebars.ts` |
| T018 | Minimal fact fixes on the reader pages the inventory lists | Claude writes, DeepSeek applies | pending, after T017 | the inventory's category E hits |
| T019 | One changelog entry | Claude | pending, after T017 and T018 | `edu-site/docs/changelog.md` |
| T020 | The final gate | Claude | pending, last | — |

### Acceptance checks

**T013 — the canon record.**
- [x] CS-12 to CS-33 recorded in `curriculum-state/canon/course-structure.md`
- [x] `thesis.md` and `naming.md` carry the three stages
- [x] PHRs 0135 to 0138 filed

**T014 — the inventory.**
- [x] `_scratch/job-briefs/2026-09-22/job5-inventory.md` filed, categories A–G, with the "No hits" list and the OWNER DECISION flags

**T015 — agent instructions and project docs.**
- [ ] Every category-A hit fixed in its file's own voice, or marked with a dated note
- [ ] `CLAUDE.md`, `PROJECT-MAP.md`, `stack.md`, `.specify/memory/constitution.md`, `.claude/**`, `edu-site/README.md` covered
- [ ] The constitution's Sync Impact Report updated, the version bumped MINOR, last-amended 2026-09-22
- [ ] CS50 promises, literal stage folder paths, dated history entries and folder/skill names left alone and listed in the report

**T016 — curriculum-state.**
- [x] Every category-B hit fixed: `README.md`, `canon/integrity-floor.md`, `canon/research-and-comparison.md`, `canon/corrections.md`, `contracts/calibration.md`, `research/stage-0/cluster-7-language-landscape.md` (a dated note only, it is a research record); `canon/audience.md` and `canon/voice.md` already carried job 7's floor notes and needed nothing further
- [x] Re-grep clean: every remaining hit is a dated record, a CS50 promise, a folder path or superseded wording kept visible
- [x] Every edited file compared with `_scratch/backup-2026-09-22-agentic-inside-se-4/`: nothing lost outside the intended edits, line endings and encoding kept

**T017 — the site structure pass.**
- [ ] `edu-site/docs/stage-03-sde-mastery-ai-native/` renamed to `stage-02-sde-mastery-ai-native/`
- [ ] `edu-site/docs/stage-02-credentials/` moved out of the published docs to `edu-site/parked/credentials-track/`
- [ ] The five hand-written stage lists changed together (their files are named in category C of the inventory), plus the stage icons
- [ ] `--tbb-stage-3` and `--tbb-stage-4` retired or renumbered in `edu-site/src/css/custom.css`
- [ ] Folder paths updated in `curriculum-state/ledgers/**`
- [ ] `chapterManifest.ts` and `search-index.json` rebuilt by `npm run build`, never hand-edited
- [ ] `npm run build` green
- [ ] No link or path points to an old stage folder

**T018 — the reader pages.**
- [ ] `edu-site/docs/welcome.md`, `edu-site/docs/faq.md`, the Stage 0 introduction and `edu-site/docs/ch02-programming-is-born.md` line 74 ("Stages 3 and 4") carry the three-stage facts
- [ ] CS50 promises untouched

**T019 — the changelog.**
- [ ] One entry in `edu-site/docs/changelog.md`: agentic AI moves inside SE, and the course goes from four stages to three

**T020 — the final gate.**
- [ ] `npm run build` green
- [ ] `node scripts/check-chapter.mjs` clean
- [ ] A repository-wide grep for the old stage names where every remaining hit is a dated record, a CS50 promise or history
