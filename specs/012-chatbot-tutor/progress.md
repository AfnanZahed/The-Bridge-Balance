# Progress — Feature 012: Chatbot Tutor (The Bridge Balance Tutor 1.0)

One dated line per step, oldest first. Every line is written only after the step's evidence
was read from real output (build prompt §0.5). Session model: DeepSeek V4.1 Flash (Command
Code).

Resume rule (build prompt §0.3): read `_scratch/platform-research/02-chatbot-1.0-build-prompt.md`,
then this file and `tasks.md`, and resume at the first unticked task.

| Date | Step | What happened | Evidence |
|---|---|---|---|
| 2026-09-23 | 0.0 | Feature folder created by hand at `specs/012-chatbot-tutor/` with `progress.md` and `research.md`. | `read_directory specs/` shows 011 as the previous highest; this folder now exists. The stock `create-new-feature.ps1` was **not** run: it calls `git checkout -b`, which the hard rules forbid ("`main` only. No branches"). Its own adapted command doc (`.claude/commands/sp.specify.md`) says to create the directory with file tools instead, so the folder was made by hand. |
| 2026-09-23 | 0.1 | Rule files updated: `CLAUDE.md` (3 bullets) and `bridge-balance-project-guide/SKILL.md` (2 bullets). | **CLAUDE.md** — the "No version control in the working process." bullet replaced with block A; the "Phase A only, today." bullet replaced with block B; the "Repo root DOES have `.git`." bullet rewritten to say git is now the working process and `ci.yml` runs on every push to `main` (its `pull_request` trigger stays, unused — both verified at `.github/workflows/ci.yml:4-7`: `pull_request: branches: [main, "00*-*"]`, `push: branches: [main]`). **SKILL.md** — Step 0 rule 9 and its "Phase A only, today" bullet carried the same meaning. Audit grep for "No version control", "no branches", "no commits", "Phase A only" over the six required locations: only remaining in-scope stale hit is `.specify/memory/constitution.md:546`, whose exact diff is prepared and shown at CP0 and **not** changed; `PROJECT-MAP.md`, `curriculum-state/canon/**` and `stack.md` carry no hit of the four phrases (`stack.md:23` separately calls the repo public — a CP2 item). Other hits are out-of-scope dated records (see CP0 list). |
