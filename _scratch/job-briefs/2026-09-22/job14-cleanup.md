# Job 14: small fixes after the site pass

Effort: high. Live repository C:/Users/Dell/Desktop/Book only; never `.claude/worktrees/`; no git. Before editing a file, copy it byte-for-byte to `_scratch/backup-2026-09-22-agentic-inside-se-7/` under the same relative path. Keep line endings and encoding. Touch only what is named here.

1. `edu-site/docs/changelog.md`, the 22 September entry: replace "Credentials was never a stage; it is a track that runs alongside the three stages, and it is switched off for now." with "Credentials is no longer a stage: it is now a separate track that runs alongside the three stages, and it is switched off for now." (It was Stage 2 until 22 September.)
2. `edu-site/src/css/custom.css` (and `radix.css` if involved): the restructure must not change how non-stage elements look. Compare with `_scratch/backup-2026-09-22-agentic-inside-se-6/edu-site/src/css/`. For every non-stage element that used `--tbb-stage-3` or `--tbb-stage-4` before job 11 (the `.tbb-callout--warning` callout, the homepage pillars, anything else), restore its previous colour in light and dark through a purpose-named token (for example `--tbb-callout-warning`) holding the old values. Warning and important callouts must look different again. Leave the stage tokens as job 11 left them.
3. `history/adr/README.md`: add ADR-0010 ("Agentic AI Taught Inside Software Engineering: the Three-Stage Structure", Accepted, 2026-09-22) in that index's own format.
4. The Agenda, `_scratch/job-briefs/2026-09-22/agenda/index.html`: copy it first to `agenda/index.pre-job14.html`; content edits only, under the "Ground rules" of `_scratch/job-briefs/2026-09-22/job8b-agenda-refresh.md`.
   - Remove every sentence that still says the work waits for the owner's answer about the other session (step 4's text in "Where we are", the "One by one" intro, anywhere else).
   - "One by one": add a Queued row at the end, "The 64 lint errors that were already there": "npm run lint reports 64 errors and 3 warnings. All of them were there before today's work, and the build does not run lint, so nothing is blocked. Starts: when you say start."
   - "Parked on purpose", the row "The design of the Credentials track": add "The ledger rows for its three pages still say stage 2, because the ledger's stage field only takes a number. The track's design decides how to mark them."
   - "Done today": add at the top "Small fixes after the site pass": "The changelog now says Credentials is no longer a stage (it was Stage 2 until today). Warning callouts have their own colour again, and the homepage pillars look as they did. ADR-0010 is in the ADR index."
   - The header time and the tally.
5. In `edu-site/`: `npm run build` must pass, `npm run typecheck` pass, and `npm run lint` show no more than 64 errors and 3 warnings. If a command times out in the shell tool, redirect its output to a log file and poll it.

Report (at most 20 lines): each change in one line, the three command results, and the Agenda's tags balanced with everything before `<main>` and after `</main>` byte-identical to `index.pre-job14.html`.
