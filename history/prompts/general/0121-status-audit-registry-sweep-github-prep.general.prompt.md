---
id: 0121
title: Status audit, registry-cap sweep, GitHub snapshot prep
stage: general
date: 2026-09-20
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["status", "adr-0008", "constitution-v3.0.1", "worktree", "github-snapshot"]
links:
  spec: null
  ticket: null
  adr: history/adr/0008-chapter-component-palette-is-open.md
  pr: null
files:
 - edu-site/src/theme/MDXComponents.tsx
 - CLAUDE.md
 - .claude/skills/bridge-balance-project-guide/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/image-prompts.md
 - .specify/memory/constitution.md
tests:
 - "npm run typecheck - clean"
 - "npm run build - 9 chapters, 0 errors, 7 warnings, site compiled"
 - "repo-wide grep for the registry-cap wording - 0 live sites after the fix"
 - "secret scan over the prospective snapshot - 0 hits (1 false positive: a file named ...tokens.css)"
---

## Prompt

> ok, tell me what's actually done and what's remaining (including current
> context and also including the things what we postponed intentionally like
> palette etc). and also move the work tree to the desktop book and on my github
> too

## Response snapshot

**The worktree cannot be moved.** `change_directory` refused: this session runs
in an isolated worktree. All of the day's work was already written to
`Desktop\Book` by absolute path; the worktree itself holds zero changes. The
real fix is a new session started in `Desktop\Book`, which the assistant cannot
do from inside this one.

**GitHub.** Local `main` is at 1709a33; remote `main` is at e23017a (8 Sep); the
15 Sep snapshot went to a separate dated branch, `full-backup-2026-09-15`, and
left `main` alone. A new snapshot is 3.4 MB, contains no secrets, and excludes
the nested worktrees and node_modules. Not run by the assistant: CLAUDE.md
forbids it running `git commit`, and `git push` is refused in this session. The
exact commands were handed over instead, targeting a new dated remote branch so
`main` is untouched and nothing needs `--force`.

**A correction to an earlier claim.** The assistant had reported the ADR-0008
amendment as finalized. A repo-wide search for the enumeration found it still
live in six downstream places, none listed in the v3.0.1 sync report:
`MDXComponents.tsx` (comment), `bridge-balance-project-guide/SKILL.md` (three
sites), `chapter-production/SKILL.md`, `CLAUDE.md` line 55, and
`image-prompts.md` line 34. All corrected; the sync report now lists them.

## Outcome

- Impact: Principle III's amendment now actually reaches the files that tell an
  author what the registry is.
- Tests: typecheck, build, sweep, secret scan.
- Files: 6 modified.
- Next prompts: the ADR-0007 conflict map (seven small calls); the owner's
  per-topic why; the first component batch.
- Reflection: the amendment was declared complete after fixing the files that
  were already known. The search that found six more was one grep, run only
  because a status report forced a re-check. Search for the phrase before
  declaring an amendment landed.

## Evaluation notes (flywheel)

- Failure modes observed: a completion claim made from a list of files known to
  be affected rather than from a search for the wording.
- Graders run: the grep sweep; typecheck; build; secret scan.
- Next experiment: end every wording amendment with a repo-wide grep for the old
  phrase, run before saying "done", and paste its zero-hit output into the sync
  report.
