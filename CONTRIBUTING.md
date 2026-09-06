# Contributing to The Bridge Balance

Thanks for pitching in! This project follows **Spec-Driven Development (SDD)** — every feature starts as a written spec before any code is written. This doc covers the workflow, and includes a beginner-friendly Git/GitHub walkthrough at the bottom.

## 🔁 Workflow

1. **Open an issue first** for anything non-trivial (bug or feature). Search [existing issues](../../issues) before filing a new one.
2. **Create a feature spec** for new functionality using the Spec-Kit Plus slash commands (wired at `.claude/commands/sp.*.md`):
   - `/sp.specify <feature>` — what & why
   - `/sp.plan` — how (architecture, interfaces, risks)
   - `/sp.tasks` — ordered, testable tasks
   - `/sp.implement` — execute the tasks
   - Each feature lives in `specs/NNN-feature-name/`.
3. **Branch** off `main`: `git checkout -b your-feature-name`.
4. **Keep changes small.** Smallest viable diff, no unrelated edits, no invented APIs — see [`CLAUDE.md`](./CLAUDE.md) for the full house rules.
5. **Run the checks locally** before opening a PR:
   ```bash
   cd edu-site
   npm run lint          # Biome
   npm run check:frontmatter
   npm run typecheck
   ```
6. **Open a pull request** against `main` using the PR template. Link the issue and spec it implements.
7. CI (`.github/workflows/ci.yml`) runs lint + frontmatter checks on every PR — make sure it's green before requesting review.

## ✅ Definition of done

- [ ] Change matches an approved spec (or is a trivial fix that doesn't need one)
- [ ] Tests/checks added or updated where it makes sense
- [ ] CI is green
- [ ] A [Prompt History Record](./history/prompts/) exists if AI assistance was used
- [ ] No unrelated files touched

## 🧭 Conventions

- **Prompt History Records (PHRs)** — every meaningful AI exchange is logged under `history/prompts/`.
- **Architecture Decision Records (ADRs)** — significant architectural decisions are documented under `history/adr/`, always with explicit consent (never auto-created).
- **Free-tier by default** — new components must run on a free tier unless the platform has paying users to justify the cost.

## 🐣 New to Git and GitHub?

Welcome! Here's the short version of the workflow above, in plain terms:

| Step | Command | What it does |
|---|---|---|
| 1. Copy the repo to your machine | `git clone https://github.com/AfnanZahed/The-Bridge-Balance.git` | Downloads the project |
| 2. Make a workspace for your change | `git checkout -b my-change` | Creates and switches to a new branch, so `main` stays untouched |
| 3. Edit files | *(use your editor)* | Make your change |
| 4. Stage your changes | `git add <file>` | Marks files to be included in the next commit |
| 5. Save a checkpoint | `git commit -m "short description"` | Records your changes with a message |
| 6. Upload your branch | `git push -u origin my-change` | Sends your branch to GitHub |
| 7. Propose the change | Open a **Pull Request** on GitHub | Asks a maintainer to review and merge your branch into `main` |

A few habits that will save you pain later:

- **Pull before you push:** `git pull origin main` regularly so your branch doesn't fall too far behind.
- **One topic per branch/PR.** Small, focused PRs are reviewed faster.
- **Read the CI output** if a check fails — it usually tells you exactly what's wrong.
- **Never commit secrets.** Copy `.env.example` to `.env` for local credentials; `.env` is git-ignored.

If you get stuck, open an issue with the [🐛 Bug report](../../issues/new?template=bug_report.md) template and describe what you tried — that's what issues are for.
