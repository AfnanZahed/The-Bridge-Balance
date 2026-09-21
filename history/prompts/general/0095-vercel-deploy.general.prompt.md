---
id: 0095
title: First Vercel production deploy — repo-root CLI upload, vercel.json, and the refs-gate dependency that made it necessary
stage: general
date: 2026-09-16
surface: agent
model: unknown (Command Code session; no model id exposed to the agent)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["deploy", "vercel", "cli-upload", "monorepo-root", "refs-gate", "vercel-json", "vercelignore", "doc-correction", "adr-required"]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - vercel.json (NEW at the repo root — `framework: null`, `installCommand: cd edu-site && npm ci`, `buildCommand: cd edu-site && npm run build`, `outputDirectory: edu-site/build`. The repo root is the Vercel project root.)
 - .vercelignore (NEW at the repo root — excludes only `edu-site/node_modules`, `edu-site/build`, `edu-site/.docusaurus`, `edu-site/.local-logs`, `.git`, each grepped for first and each carrying the reason it is safe to exclude)
 - CLAUDE.md (the "Repo root has no `.git`" bullet was factually wrong and is replaced by two bullets: root `.git` does exist with `origin` at `github.com/AfnanZahed/The-Bridge-Balance` and the working tree runs ahead of it, plus a new bullet recording how the site actually deploys and WHY the repo root being the project root is load-bearing)
 - PROJECT-MAP.md (layout block now names `vercel.json` and `.vercelignore`)
 - specs/001-book-foundation/research.md (R-002 gets a dated Amendment: the original "no `vercel.json` required" holds only for the Git-integration route it implicitly assumed, not for a CLI upload)
 - .gitignore (the Vercel CLI appended a bare `.env*` on first link, which overrode the file's own `!.env.example` negation — later gitignore patterns win — silently dropping a file the constitution says documents every variable. Replaced with a comment explaining why no wildcard belongs there.)
 - .env.local (NEW, written by the Vercel CLI — a `VERCEL_OIDC_TOKEN`. Gitignored via the entries the CLI also appended for `.vercel`.)
 - .vercel/project.json (NEW, written by `vercel link` — the local link to project `afnans-projects-3dde1fd5/the-bridge-balance`.)
 - history/prompts/general/0095-vercel-deploy.general.prompt.md (this file)
tests:
 - Established the blocker before promising anything: no `vercel` on PATH, no `.vercel` link file anywhere, no `~/.vercel`, no `vercel.json` — so this machine had never been authenticated to Vercel, and auth needs an interactive browser handshake or a token. Reported that rather than half-attempting it. The owner ran `vercel login` (device flow) himself.
 - Found the dependency that decided the whole shape of the deploy, by reading rather than by deploying and watching it fail: `edu-site/scripts/check-references.mjs:48` sets `REPO = path.resolve(EDU, "..")` and `:354` reads `curriculum-state/ledgers` from there, and `SCANNED` (:73-82) lists repo-root paths — `CLAUDE.md`, `README.md`, `PROJECT-MAP.md`, `history/reports/PROJECT-REPORT.md`, `history/reports/INSTALL.md`, `stack.md`, `.claude/skills/bridge-balance-project-guide`, `.claude/skills/lesson-spine-authoring`, `curriculum-state`, `edu-site/README.md`. A missing one is pushed as a `scan-root-missing` finding (:300-306) and ANY finding exits 1 (:608-619), with no severity filter.
 - Proved it empirically instead of asserting it. Built a simulated `edu-site`-only upload in the scratchpad and ran the gate: 26 findings, exit 1. Then completed the simulation (copying `src/` and `static/` too, so the only difference from a real upload was the absent parent) and re-ran: 108 findings, of which 10 are real `scan-root-missing` plus 1 real `backticked-path` (`glossary.md` -> `curriculum-state/ledgers/concept-ledger.yaml`) = the 11 that actually break the build. The other 97 were artifacts of the simulation lacking `node_modules` (`import-unresolved` on every bare import), which Vercel resolves because it installs dependencies before building. Both numbers recorded so the 108 is never mistaken for the real figure.
 - Verified the exact `buildCommand` against a faithful simulation BEFORE deploying: a robocopy of the tree minus the ignored paths, with a Windows junction standing in for the 818 MB `node_modules`, then `cd edu-site && npm run build` from the simulated repo root. All five gates green, Docusaurus build green. This is what turned "should work" into "will work".
 - Checked the two classic first-deploy traps before they could fire: `npm ci` validates against the lockfile (dry run clean), and `npm config get ignore-scripts` is `false` with no `.npmrc` anywhere, so the `allow-scripts` warnings in the output are npm 11 informational notices and esbuild/core-js postinstalls do run.
 - Confirmed the deploy picked up the config rather than ignoring it: the CLI echoed "Local settings detected in vercel.json: Build Command: cd edu-site && npm run build, Install Command: cd edu-site && npm ci, Output Directory: edu-site/build".
 - Vercel build log: `npm ci` added 1502 packages, then all five gates passed ON VERCEL — `Reference validation passed ✓` is the one that would have failed with an `edu-site`-only upload, so the log is itself the confirmation that the repo-root strategy was both necessary and sufficient. Ready in 3m.
 - Verified the DEPLOYED site, not the local build: all 9 routes return 200 (`/`, `/welcome`, `/glossary`, `/faq`, `/changelog`, both stage indexes, the backend chapter, and an intro chapter). At 1440px the live chapter measures a median 71.0 chars/line in light and 70.7 in dark (the pre-change baseline was 98.3), article width 560px, headings h1 33.792px / h2 26.752px / h3 21.12px all at computed weight 700 with `border-bottom: 1px solid`, and `::marker` content `"◆  "`. On `/welcome` the live glossary term resolves to `rgb(25,27,29)` ink with `text-decoration-style: dotted` at 55% accent and a transparent background, its inner `em` in the UI sans with `font-style: italic`.
 - Read back a screenshot of the live site to confirm the bolded topic sentences actually render (the probe's own `textContent` counter returned 0 because the DOM has the asterisks stripped — a bad instrument, not a failure; the screenshot is the evidence).
 - Re-ran the full build on the synced simulation AFTER the doc corrections, with `edu-site/build`, `.docusaurus` and `.git` deleted to mimic what `.vercelignore` excludes at gate time — because the new `CLAUDE.md` text names those paths. Passed. Cross-checked why: `BACKTICKED` (:105) requires a token to start alphanumeric AND end in a real file extension, so `.git`, `.vercelignore`, `edu-site/build` and `edu-site/node_modules` are never path-checked, `history/reports/*` is filtered by the `*` placeholder rule (:114), and `vercel.json` is whitelisted in `NOT_IN_REPO` (:100-102).
 - `git remote -v` (read-only) — one remote, `origin` at `https://github.com/AfnanZahed/The-Bridge-Balance.git`, which is why the CLI attempted a Git connection during `link`. It failed, so the project has no Git integration and deployments are CLI-only. Noted rather than worked around.
 - `git` was used ONLY for that one read-only remote query. No commit, no push, no branch — the working process has no version control, and the deploy deliberately does not require one.
---

## Prompt

"deploy it on the vercel"

## Response snapshot

The ask was one line and the answer was not, so the first move was to find out what was actually possible rather than run `vercel` and narrate the failure. Four facts settled it: no `vercel` on PATH, no `.vercel` link file, no `~/.vercel`, no `vercel.json`. This machine had never been authenticated to Vercel, and auth needs either an interactive browser handshake or a token — neither of which an agent can produce. Said so, offered three concrete paths (CLI with the owner logging in / Git integration / a token via env var), and named the two things that would bite regardless: the Vercel project's root has to be `edu-site`, and `docusaurus.config.ts` still carries a placeholder `url`.

Also surfaced, because burying it would have been dishonest: `CLAUDE.md:120` said the repo root has no `.git` and that the Vercel-CI flow "shouldn't be suggested or run" — but the root `.git` demonstrably existed, so half that bullet was already wrong, and the owner was asking for the very thing its second half warned against.

**Then the technical finding that decided everything.** With the owner's two answers in hand (CLI upload, new project), the obvious next move was to deploy from `edu-site`. Reading the gate first is what stopped that: `check-references.mjs` resolves its root to the PARENT of `edu-site`, and eleven of its scanned paths live above `edu-site`. An `edu-site`-only upload has no parent, so those eleven stats fail as `scan-root-missing` and any finding exits 1.

Rather than trust that reading, it was simulated twice. The first simulation was deliberately minimal and produced 26 findings — of which 16 turned out to be the simulation's own fault for omitting `src/` and `static/`. The second, faithful one produced 108, and separating them mattered: 11 real, 97 the missing `node_modules`. Reporting "108 dead references" would have been a lie in the wrong direction; reporting "should be fine" would have shipped a broken build.

With the cause established, the fix was to make the repo root the Vercel project root so the parent always exists: a four-key `vercel.json` and a deliberately short `.vercelignore`. Before deploying, the exact `buildCommand` was run against a robocopy of the filtered tree with a junction standing in for the 818 MB `node_modules` — all five gates green. Then the deploy, which passed the same five gates on Vercel, and then a check of the live site rather than the local build.

## Outcome

- ✅ Impact: **https://the-bridge-balance.vercel.app** is live (per-deployment URL `https://the-bridge-balance-4ohxbn5ds-afnans-projects-3dde1fd5.vercel.app`, project `afnans-projects-3dde1fd5/the-bridge-balance`). The prose pass from PHR 0094 is deployed and confirmed on the live URL: median 71.0 chars/line at 1440px in light and 70.7 in dark against a 98.3 baseline, headings at +10% and weight 700 with a 1px block underline, the glossary term as ink with a dotted accent hairline, and the accent-diamond list marker. All nine sampled routes return 200.
- 🧪 Tests: See `tests:` above — a simulated `edu-site`-only upload to prove the failure mode, a faithful pre-deploy simulation of the exact `buildCommand`, the Vercel build log itself as confirmation, live route/measurement probes on the deployed URL, and a re-run of the full build after the doc corrections with the ignored paths deleted.
- 📁 Files: See `files:` above. Two new root files are the load-bearing part; three doc corrections are the honesty part.
- 🔁 Next prompts: (1) **The sitemap is the one real defect left.** `https://the-bridge-balance.vercel.app/sitemap.xml` returns 200 and every one of its 33 `<loc>` entries points at `https://thebridgebalance.app`, which does not resolve — so the deployed site tells crawlers its canonical URLs live on a dead domain. `docusaurus.config.ts`'s own comment says the domain is deliberately unlocked and that a free Vercel subdomain may come first, which makes swapping that one line the obvious fix; it needs the owner's call because it is his domain decision, not a technical one. (2) A redeploy is cheap and idempotent once that lands. (3) `AD aR` — the `vercel.json` addition contradicts R-002's letter, which has been amended in place rather than ADR'd; if the owner wants the deploy topology to be an ADR in its own right, it should be 0006 alongside the still-unwritten heading/emphasis one.
- 🧠 Reflection: the whole value here was reading the gate before running the deploy. `vercel` from `edu-site` would have failed in three minutes with a log full of `scan-root-missing`, and the fix would have been guessed from the error rather than derived from the cause. Simulating it first cost one extra edit-run cycle and produced both the diagnosis and the confidence to configure the project correctly the first time. The secondary lesson is about instruments again, three prompts running: the first simulation under-copied and inflated the finding count from 11 to 108, and the screenshot probe's `textContent` check reported "0 bolded paragraphs" on a page that plainly has them. In both cases the number was wrong and the artifact was right, so the discipline is the same one PHR 0094 recorded — when a count disagrees with something you can see, suspect the count.

## Evaluation notes (flywheel)

- Failure modes observed: three, all over-reporting rather than under-reporting, which is the safer direction but still worth naming.
  First, the initial simulation copied `docs/` and `scripts/` but not `src/`, `static/` or the config files, so it reported 26 findings where only 11 were real — the extra 16 being 4 backticked paths into `edu-site/src/css/a11y.css` and 11 site-absolute image links resolved against a `static/` that was not there. Fixed by completing the copy so the ONLY difference from a real upload was the absent parent.
  Second, the second simulation reported 108 findings because `node_modules` was absent, producing ~97 `import-unresolved` findings on bare imports (`react`, `clsx`, `motion/react`, `@phosphor-icons/react`). Vercel installs before building, so none of those are real. Recorded explicitly so the 108 is never quoted as the deploy's failure count.
  Third, a genuinely bad instrument rather than a bad copy: the live-site probe counted bolded paragraphs by testing `p.textContent` for a leading `**`, but `textContent` returns rendered text with the markdown markers consumed, so it reported 0 on a page whose topic sentences are visibly bold. The screenshot was the evidence that mattered.
  There was also one self-inflicted near-miss worth recording: after the deploy, correcting `CLAUDE.md` introduced new backticked tokens naming `edu-site/build` and `.git`, both of which `.vercelignore` excludes — which would have broken the NEXT deploy at gate time, not this one. Caught by re-running the full build with those paths deleted. The token filter (`BACKTICKED` requires a leading alphanumeric and a real file extension) is what makes them safe, and that is now the reason no wildcard and no extensionless path belongs in the ignore file.
- Graders run and results (PASS/FAIL): `npm run typecheck` — PASS (PHR 0094, unchanged). `npm run build` on the faithful pre-deploy simulation — PASS, all five gates. Vercel build — PASS, all five gates, `[SUCCESS] Generated static files in "build"`. `npm run build` again after the doc corrections with `edu-site/build` / `.docusaurus` / `.git` removed — PASS. Live route check, 9/9 — PASS (200). Live measurement — PASS, median 71.0 light / 70.7 dark at 1440px. `npm run lint` — still FAIL, pre-existing and repo-wide, untouched by this change.
- Prompt variant (if applicable): two questions were asked before deploying. The first offered the three deploy paths (CLI upload / Git integration / token) and whether a Vercel project already existed. The second offered the three ways to satisfy the repo-root requirement (repo root + `vercel.json` / repo root + dashboard settings / Git integration with a push). The owner chose the recommended answer on both. One question is still outstanding and deliberately not answered unilaterally: whether the canonical `url` should become the Vercel subdomain now.
- Next experiment (smallest change to try): check the refs gate's dependency shape at the same time as any future deploy question, because the `REPO = resolve(cwd, "..")` pattern is load-bearing and invisible — it makes `edu-site` non-deployable on its own, and nothing in the docs said so until now. The cheap guard is one line in `edu-site/README.md` next to the Deploy section (which still documents the retired GitHub Pages flow) pointing at `vercel.json` and the repo-root requirement.


## Addendum — canonical url corrected, second deploy (same day)

The outstanding decision recorded in "Next prompts" above was put to the owner
and answered: point the canonical `url` at the live Vercel domain rather than
leave it on a placeholder or wire up the real domain today.

`edu-site/docusaurus.config.ts` now sets `url: "https://the-bridge-balance.vercel.app"`.
The comment above it was rewritten too, because it described that field as a
placeholder and guessed the subdomain as `thebridgebalance.vercel.app` — the
assigned domain is hyphenated, and the guess would have been wrong if anyone had
copied it. The new comment keeps the owner's "not locked" position on the real
domain, records that the deployed value is now the real one, and points at this
PHR.

Verified, not assumed:

- `npm run build` locally first — all five gates green, `[SUCCESS] Generated static files`.
- Second `vercel --prod` — all five gates green on Vercel again, build restored from
  the previous deployment's cache, ready in 3m. The alias moved:
  `▲ Aliased https://the-bridge-balance.vercel.app`.
- `/sitemap.xml` fetched through the alias returns 200 with all **33** `<loc>`
  entries naming `https://the-bridge-balance.vercel.app`. Fetching it through the
  alias is itself the check that the alias serves the new deployment and not the
  previous one — the old sitemap named `thebridgebalance.app` throughout, so the
  change of content is the proof.

The served site is otherwise identical to the first deploy: the doc corrections
in this PHR (`CLAUDE.md`, `PROJECT-MAP.md`, R-002, `.gitignore`) sit outside
`edu-site` and are not part of the build output, so they needed no redeploy. The
second deploy was for the config line alone.

Remaining open item is unchanged: ADR-0006 for the heading-underline and
blanket-emphasis decisions from PHR 0094, which is still drafted and still
awaiting consent.
