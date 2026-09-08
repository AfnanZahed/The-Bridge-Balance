# The Bridge Balance — Docusaurus Site

This is the textbook half of **The Bridge Balance**. Built with [Docusaurus 3](https://docusaurus.io/) (TypeScript, MDX).

## Quick start

```bash
npm install
npm start          # http://localhost:3000
npm run build      # static output in build/
npm run typecheck  # tsc --noEmit
```

Requires **Node.js ≥ 18**.

## Layout

```
edu-site/
├── docs/                                      # MDX curriculum content
│   ├── intro.md                               # textbook root
│   ├── stage-01-spec-aware-vibe-engineering/  # Stage 1 (6 chapters)
│   ├── stage-02-cs50-certification/           # Stage 2 (2 chapters)
│   ├── stage-03-mastering-ai-coding-agents/   # Stage 3 (4 chapters)
│   └── stage-04-engineering-autonomous-ai-agents/  # Stage 4 (3 chapters)
├── src/
│   ├── css/custom.css                         # brand color tokens
│   └── pages/index.tsx                        # homepage (hero + stage cards)
├── docusaurus.config.ts                       # site config
├── sidebars.ts                                # navigation order
└── package.json
```

## Adding lecture content

1. Open the chapter file in `docs/stage-XX-.../NN-topic.md`.
2. Replace `> _Awaiting video lecture._` with the transcript / notes.
3. Fill the **Lecture outline** checklist.
4. Open a PR. Reviewers check: code snippets run, links resolve, headings ordered.

## Branding

- Site title: **The Bridge Balance**
- Primary color: `--ifm-color-primary` in `src/css/custom.css`
- Logo / favicon: drop a `img/logo.svg` and `img/favicon.svg` into `static/` (placeholder path already in `docusaurus.config.ts`).

## Deploy

Default Docusaurus deploy is GitHub Pages. Configure in `docusaurus.config.ts`:

- `organizationName` → GitHub org/user
- `projectName` → repo name
- Run `npm run deploy` (requires write access to the repo's `gh-pages` branch).

## Status

Scaffolded (Phase A.1). Lecture content arrives as the video series is delivered.

## Deploying to Vercel (free tier)

The textbook deploys exclusively to Vercel free tier (per FR-010 and ADR-0002). Vercel auto-detects Docusaurus — no `vercel.json` is needed.

### One-time setup

1. Sign up at <https://vercel.com/> (free tier is enough).
2. Click **Add New → Project** and import the GitHub repo.
3. Vercel auto-detects the framework as **Docusaurus**.
4. **Root Directory** must be set to `edu-site/` (this is where `package.json` lives).
5. Leave all build settings as the detected defaults. Click **Deploy**.

The first deploy will run `npm install && npm run build` (which includes the frontmatter validator and broken-link gate). Subsequent deploys run on every push to `main` and on every PR's branch (deploy previews).

### Atomic deploys (Q5)

Vercel's atomic deploys mean a **failed build never replaces the last successful deploy**. No custom health check or notification wiring is needed in this project.

### Branch protection on `main`

Per FR-013 and Q2, PRs are gated by CI (no required human reviewers — single author):

1. In GitHub → Settings → Branches → **Branch protection rules** → Add rule for `main`.
2. Enable **Require status checks to pass before merging**.
3. Search for and select: **`ci / build`** (the GitHub Actions job).
4. Enable **Require branches to be up to date before merging**.
5. **Do NOT** enable "Require approvals" — the lecturer self-merges.
6. Leave **Include administrators** ON (admin override is required for self-merge in a single-author repo).

### Custom domain (optional, free)

Vercel assigns a `*.vercel.app` subdomain for free. To use a custom domain (e.g., `thebridgebalance.com`), add it under Project → Settings → Domains — DNS instructions are provided.

## How to contribute

The textbook content follows the **co-authoring workflow** defined in [Constitution v2.0.0](../.specify/memory/constitution.md) (Principle III):

1. **Co-research** — the project owner (Dell) and Claude Code jointly research each topic.
2. **Text writing** — Claude Code writes the detailed lecture into the chapter's MDX. The chapter moves from `placeholder` → `text-ready`.
3. **Image integration** — the project owner produces diagrams / AI-generated explanatory visuals and saves them under `edu-site/static/img/<chapter-slug>/`. Claude Code integrates them with alt text.
4. **Video recording** — the project owner records the video against the now-complete text. The chapter moves from `text-ready` → `video-published`.

Every chapter's `chapter_state` is read from frontmatter and surfaced via the `<ChapterState />` badge at the top of the page.

PRs are gated by CI (the `ci / build` GitHub Actions workflow). No human reviewer is required — the lecturer self-merges.
