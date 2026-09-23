---
id: 0126
title: Welcome page canon fixes and live deploy
stage: general
date: 2026-09-21
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["welcome-page", "corrections-9", "safety-floor", "stage-names", "naming", "audit", "vercel-deploy", "easy-english"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/welcome.md (description, §9 bullet, stage table names, safety-floor callout, roadmap wording, heading)
 - edu-site/sidebars.ts (Stage 0/1/2 labels)
 - edu-site/docusaurus.config.ts (footer stage labels)
 - edu-site/docs/changelog.md (### 2026-09-21 entry)
 - history/prompts/general/0126-welcome-page-canon-fixes-and-deploy.general.prompt.md (this record)
 - "artifact: https://the-bridge-balance.vercel.app/welcome (live, redeployed this session)"
tests:
 - "audit read: full method (skill + 6 references + 8 canon files + corrections) before judging, per the session's first instruction"
 - "welcome.md checked against check-chapter.mjs rules by hand before edit: single h1, no heading skips, callout exact form, no voice tells"
 - "live page fetched (markdown + raw HTML) before and after deploy; description, bullets, table, callout, heading, footer and sidebar verified on the live URL"
---

## Prompt

> 1. Research the writing method and writing way completly and then tell me whether the welcome page 100% perfectly fulfills our standards on each and every word or not. https://the-bridge-balance.vercel.app/welcome
> 2. fix ALL of the above things, also in the live current page at https://the-bridge-balance.vercel.app/welcome
> 3. (Note during planning) the english must be easy

Owner answers during planning (asked per corrections §19 and the entry-point question): keep the intro-1 CTA link · full canon stage names win · this session authors the revision.

## Response snapshot

Read the complete method first — the lesson-spine-authoring skill, its six reference files, all eight canon files, and the corrections record — then audited the live page word by word against it and fetched its raw HTML to check heading structure, glossary anchors and metadata. Findings that failed: both the live and repo versions explained the book's internal rules to the reader (corrections §9); the repo version's replacement sentence broke the same rule; stage names disagreed across the page, sidebar and footer; the safety-floor callout was missing; the metadata description led with the internal label "front door"; "Ready?" was a rhetorical-question heading; plus three minor wording findings. Facts checked against the evidence ledger (METR 19%, Collins 2025 — both verified entries). Owner approved a written fix plan; every finding was then fixed in the repo, the gate suite run, and the site deployed with vercel --prod from the repo root, with the live page re-verified afterwards.

## Outcome

- ✅ Impact: the welcome page no longer explains the book's own rules, its stage names now match the sidebar and footer exactly (canon/thesis.md forms), it carries the fixed Stage 0–2 safety floor, and its metadata no longer leaks internal vocabulary. The rejected word "Orientation" is gone from the sidebar and footer.
- 🧪 Tests: see front matter. `npm run check:frontmatter` / `check:refs` / `check:chapter` / `build` / axe run from edu-site/ before deploy.
- 📁 Files: see front matter.
- 🔁 Next prompts: the Stage 1 / Stage 2 long-form names are recorded in naming.md as failing Rule 1 and are due a re-check before each stage opens; the CTA still points at the legacy intro-1 sequence (owner decision this session) until the new Stage 0 replaces it.
- 🧠 Reflection: the audit's most useful finding was that a rule violation can be fixed into a second violation — the repo had already replaced one §9 sentence with another — which is why each fix was checked against the correction's own wording before shipping.

## Evaluation notes (flywheel)

- Failure modes observed: the live deployment lagged the repo by one edit (fixed by the deploy in this session); my first audit pass initially called the live version stale in the wrong direction until the repo history was compared.
- Graders run and results (PASS/FAIL): gate suite PASS; a11y PASS; live verification PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): a small check for stage-name consistency across sidebars.ts, docusaurus.config.ts and the welcome/FAQ tables, so the next drift fails a gate instead of an audit.
