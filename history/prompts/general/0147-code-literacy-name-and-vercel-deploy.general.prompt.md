---
id: 0147
title: Code Literacy name and Vercel deploy
stage: general
date: 2026-09-23
surface: agent
model: deepseek/deepseek-v4.1-flash
feature: none
branch: main
user: owner
command: none
labels: ["naming","code-literacy","deploy"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - _scratch/job-briefs/2026-09-23/job20-code-literacy-deploy.md
  - edu-site/src/pages/index.tsx
  - edu-site/src/components/DataViz/CurriculumDonut.tsx
  - edu-site/src/components/DataViz/CurriculumBarChart.tsx
  - edu-site/docs/faq.md
  - edu-site/docs/welcome.md
  - edu-site/docs/glossary.md
  - edu-site/docs/changelog.md
  - curriculum-state/canon/naming.md
  - curriculum-state/canon/thesis.md
  - curriculum-state/canon/course-structure.md
  - _scratch/job-briefs/2026-09-22/agenda/index.html
  - history/prompts/general/0147-code-literacy-name-and-vercel-deploy.general.prompt.md
tests:
  - npm run build (green; frontmatter, references, chapter gate, manifest and search index all pass, Docusaurus build succeeds)
  - npm run typecheck (clean)
  - npm run lint (64 errors, 3 warnings — the pre-existing baseline, none in an edited file)
  - node scripts/check-chapter.mjs (11 chapters checked, 20 skipped as placeholder, 0 errors, 11 warnings)
  - live check on https://the-bridge-balance.vercel.app (contains "Zero background needed" and "Code Literacy", does not contain "Harvard")
---

## Prompt

the changes in vercel doesn't applied by deepseek. also, write me the script Reading and Judging Code, update it everywhere using deepseek. But what about the word literacy, i found this word very helpful, it must be used.

## Response snapshot

Named the core skill Code Literacy (reading and judging code), rewrote the script's first part with it, and had DeepSeek apply the name everywhere and deploy the site to Vercel.

## Outcome

- ✅ Impact: The skill canon calls "Reading and Understanding Literacy" now has its public name — **Code Literacy**, introduced at its first use on a page as *Code Literacy: reading and judging code* — and the owner's deliberate exception to `naming.md` Rule 1 is recorded with its reason (the word keeps understanding and evaluating, the OECD PISA reading-literacy definition). The name is live on every reader-facing surface that carried the internal one: the homepage, both curriculum charts, the FAQ, the Welcome page and a new glossary entry, with a dated changelog line. The decision is CS-35 in `curriculum-state/canon/course-structure.md`, and `thesis.md` keeps the internal name unchanged beside the public one.
- 🧪 Tests: `npm run build` green (all five gates then Docusaurus). `npm run typecheck` clean. `npm run lint` unchanged at 64 errors and 3 warnings. `node scripts/check-chapter.mjs` reports 0 errors over 11 chapters (20 skipped as `placeholder`). One non-fatal build warning remains: the dated 2026-09-22 changelog entry links to `/faq#what-does-the-cs50-certification-cost`, a section job19b removed; the entry is a dated record, so it was reported, not rewritten.
- 📁 Files: the seven reader-visible files, the three canon files, the changelog, the agenda and this record, all listed in the frontmatter. Every edited file was copied byte-for-byte first to `_scratch/backup-2026-09-23-code-literacy/` at its own relative path (hashes verified), and the agenda was snapshotted to `agenda/index.pre-job20.html` before its edit.
- 🔁 Next prompts: the marketing package for the new name, per the standing rule; the Stage 0 pages that will teach Code Literacy by name as they are rewritten; the owner's decision on `thebridgebalance.app`, which the project files name but which does not resolve in DNS.
- 🧠 Reflection: The brief's own wording — "the changes in vercel doesn't applied by deepseek" — turned out to be about a deploy that had never run, not a change that had been lost: the site was last deployed two days earlier, before the three-stage rename. Verifying the deploy first (whoami, the linked project, its root directory and Node version) turned the part that felt riskiest into one command, and the live check afterwards proved the reader-facing rename end to end.

## Evaluation notes (flywheel)

- Failure modes observed: `vercel --prod --yes` piped through `Tee-Object | Out-String` in a background PowerShell task produced an empty captured log — the CLI's output never reached either the task log or the teed file. The deployment URL was recovered instead from `vercel ls` and `vercel inspect`, which is the more reliable record anyway. The custom domain the project files name (`thebridgebalance.app`) does not resolve: `Resolve-DnsName` returns "DNS name does not exist", and the deployment carries only the `the-bridge-balance.vercel.app` aliases.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): run `vercel --prod --yes` in a foreground call with output redirected to a file with `-Encoding utf8`, so the deployment URL is captured on the first pass instead of reconstructed afterwards.
