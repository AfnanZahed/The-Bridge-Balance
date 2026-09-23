---
id: 0003
title: Start chatbot engineering, subagent-driven, spec-driven
stage: misc
date: 2026-09-23
surface: agent
model: deepseek/deepseek-v4.1-flash (Command Code)
feature: 012-chatbot-tutor
branch: main
user: owner
command: none (freeform chat — authorises Step 0 of feature 012)
labels: ["chatbot", "012", "step-0", "speckit", "subagents"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - CLAUDE.md (modified — 3 bullets: version-control standing rule, the "Phase A only" platform bullet, the ".git" architecture bullet)
  - .claude/skills/bridge-balance-project-guide/SKILL.md (modified — Step 0 rule 9 and its "Phase A only" bullet)
  - .gitignore (modified — .env.* above !.env.example, plus feature 012 local-service and artefact paths)
  - specs/012-chatbot-tutor/progress.md (new)
  - specs/012-chatbot-tutor/research.md (new)
  - history/prompts/012-chatbot-tutor/0001-chatbot-build-prompt-read-and-stack-fixed.misc.prompt.md (new)
  - history/prompts/012-chatbot-tutor/0002-subagent-model-and-reasoning-effort-capability.misc.prompt.md (new)
  - edu-site/api/.env (new, git-ignored — holds COMMANDCODE_API_KEY; value never printed)
  - .commandcode/agents/tbb-mechanical.md, tbb-builder.md, tbb-verifier.md (new — subagent definitions)
  - edu-site/api/pyproject.toml (modified — removed the unsatisfiable better-auth dependency)
tests:
  - cd edu-site && npm run typecheck — exit 0
  - cd edu-site && npm run lint — exit 1, 64 errors / 3 warnings / 9 infos (baseline T020 was 64/3/10)
  - cd edu-site && npm run build — exit 0, all five gates plus the Docusaurus build
  - cd edu-site/api && .venv\Scripts\python.exe -m pytest -q — 7 passed, exit 0
  - git check-ignore -v edu-site/api/.env — .gitignore:42:.env, exit 0
---

## Prompt

ok, start the chatbot engineering professionally. you will do the subagent driven development at low, high or max efforts as needed, and will verify each and everything, even the verification step will be done by an subagent if it will cost a considerable number of tokens. note that the speed matters, but the mistake is NEVER an option at all. start and proceed carefully, note that the simplicity is the key, you will do it in the spec driven way, you must use the speckit plus, i will not be giving you the commands for it. but you will document each and everything as per it

## Response snapshot

Executed Step 0 (0.0–0.4) of the build prompt, then stopped to surface a blocker rather than guess.

**0.0** `specs/012-chatbot-tutor/` created by hand with `progress.md` and `research.md`. The stock `create-new-feature.ps1` was deliberately **not** run: it calls `git checkout -b`, which the hard rules forbid, and its own adapted command doc (`.claude/commands/sp.specify.md`) says to create the directory with file tools instead.

**0.1** Rule files: in `CLAUDE.md`, the "No version control in the working process." standing rule was replaced with block A, the "Phase A only, today." platform bullet with block B, and the "Repo root DOES have `.git`." bullet rewritten to say git is now the working process with `ci.yml` running on every push to `main`. The same meaning was carried into `SKILL.md` rule 9 and its Phase A bullet. The required audit grep over the six named locations found exactly one remaining in-scope stale hit — `.specify/memory/constitution.md:546` — whose exact diff was shown to the owner and **not** applied, per the instruction to show it first.

**0.2** Git: `origin` confirmed, branch `main`, `.gitignore` extended with `.env.*` above the `!.env.example` negation plus the feature-012 paths, verified with `git check-ignore -v`. No file over 50 MB. The staged-diff secret scan returned no credential value. Baseline commit `80ac6fc` (366 files); working tree clean afterwards.

**Two findings surfaced instead of guessed at.** First, `gh repo view --json visibility` returned `{"isPrivate":false,"visibility":"PUBLIC"}` — contradicting block A and §2 row 16, which both say private; no secret is tracked, but the commit was left unpushed. Second, `pip install -e ".[dev]"` failed: `pyproject.toml` declared `better-auth>=0.4.0`, and no installable version of that package exists for Python 3.12. Verified independently, and verified that nothing in the backend imports it.

**0.4** The key was saved to `edu-site/api/.env` as `COMMANDCODE_API_KEY` with `LLM_PROVIDER=commandcode`, proven ignored, and never echoed.

## Outcome

- ✅ Impact: Step 0 opened and half-landed, with the two real obstacles (a public repo, an unsatisfiable dependency) found and evidenced rather than papered over.
- 🧪 Tests: `npm run typecheck` 0, `npm run lint` 64/3/9, `npm run build` 0 (five gates + Docusaurus), `pytest -q` 7 passed.
- 📁 Files: 11 new/modified paths listed above; one commit (`80ac6fc`), not pushed.
- 🔁 Next prompts: the owner's "Use the Subagents for completing differnet tasks" (record 0004) and the nudge to finish what was described (record 0005).
- 🧠 Reflection: the sequencing error was mine — 0.4 was completed while 0.3 was still open, so `.env` already held `LLM_PROVIDER=commandcode` when `pytest` first ran, and the enum rejected it. The prompt's own order (0.3 before 0.4) exists precisely to avoid that.

## Evaluation notes (flywheel)

- Failure modes observed: (1) `better-auth>=0.4.0` is unsatisfiable on Python 3.12 — the backend has therefore never been installable as documented; (2) running 0.4 before 0.3 contaminated the pytest baseline; (3) a background PowerShell task piped through `Select-Object` buffered its output, so a failed job logged nothing at all.
- Graders run and results (PASS/FAIL): frontend typecheck PASS, frontend build PASS, backend pytest PASS (with `LLM_PROVIDER=none`), secret scan PASS (no credential value staged).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): never pipe a long background command through `Select-Object`; redirect to a file and read the file, so a failure still leaves a log.
