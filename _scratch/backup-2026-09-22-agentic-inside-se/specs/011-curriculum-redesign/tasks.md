# Tasks 011 — Stage Structure Landing

Ordered. One executor per task; every task's evidence is recorded in the row. **Resume point for a later session: read the first unchecked task.**

Owner's routing for this workstream (2026-09-22): Claude plans and verifies, DeepSeek V4.1 Flash through `cmdc --effort high` executes the mechanical work.

## Status

| # | Task | Executor | State | Evidence |
|---|---|---|---|---|
| T001 | Write this spec folder (`spec.md`, `plan.md`, `tasks.md`) | Claude | ✅ done | this folder |
| T002 | Back up the three retired stage folders to `_scratch/backup-2026-09-22-stage-rename/` | DeepSeek | ☐ | — |
| T003 | Copy the wired chapter files into the two merge folders; rename `stage-02-cs50-certification` → `stage-02-credentials`; delete the three retired folders | DeepSeek | ☐ | — |
| T004 | Correct the three stage index pages (exact text in the brief) | DeepSeek | ☐ | — |
| T005 | Update `prerequisite-graph.yaml` (paths, stage numbers, positions, ids, `progress:` breakdown) and any other ledger path value | DeepSeek | ☐ | — |
| T006 | Update site code: `sidebars.ts`, `src/lib/stages.ts`, `docusaurus.config.ts` footer, `src/pages/index.tsx`, `src/pages/404.tsx`, `src/components/HomepageHero/index.tsx` | DeepSeek | ☐ | — |
| T007 | Run the five gates and report raw output | DeepSeek | ☐ | — |
| T008 | Update scanned docs: `CLAUDE.md`, `PROJECT-MAP.md`, `stack.md`, `edu-site/README.md`, the two `history/reports/` files, `.claude/skills/**`, `curriculum-state/**` | DeepSeek | ☐ | — |
| T009 | Apply the reader-facing corrections: `welcome.md`, `faq.md`, `ch00-introduction.md`, `code-of-conduct.md` | Claude writes, DeepSeek applies | ☐ | — |
| T010 | Append the changelog entry | Claude | ☐ | — |
| T011 | Canon-side record: `course-structure.md` §5, §6 (CS-Q7), §7 (rows now done), §8 changelog; `thesis.md` stage table; `naming.md` row; `course-structure.md` pointer to this spec | Claude | ☐ | — |
| T012 | Final verification: all gates green, grep clean, reader-facing diffs read; then PHRs 0133–0134 and this task table closed | Claude | ☐ | — |

## Notes

- T002–T007 are one DeepSeek job each stage of the sequence, not one giant call — the CLI stalls on oversized briefs (`command-code-delegation/references/command-code-cli.md`).
- Nothing in this list may be marked done from a `finalText` summary; only from the raw tool trace plus a re-read of the changed file.
- T011 is the content track's half of the record, per the owner's "both, split by track" decision.
