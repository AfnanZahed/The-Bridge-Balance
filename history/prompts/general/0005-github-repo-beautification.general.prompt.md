---
id: 0005
title: GitHub repo beautification and organization
stage: general
date: 2026-09-06
surface: agent
model: claude-sonnet-5
feature: none
branch: claude/github-organization-setup-jg2ojv
user: afnanzahed@gmail.com
command: none
labels: ["github", "readme", "documentation", "onboarding"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - README.md
 - CONTRIBUTING.md
 - CODE_OF_CONDUCT.md
 - .github/PULL_REQUEST_TEMPLATE.md
 - .github/ISSUE_TEMPLATE/bug_report.md
 - .github/ISSUE_TEMPLATE/feature_request.md
 - .github/ISSUE_TEMPLATE/config.yml
tests:
 - N/A — documentation-only change, no automated tests apply
---

## Prompt

Hi there, I am a beginner in github and don't know how to use it and make it ULTRA organized and highly beautiful and 100% attractive and colorful. make this

## Response snapshot

Rewrote the root `README.md` with a hero banner (reusing the existing brand `og-image.svg`), a colorful badge row using the project's own accent palette (extracted from `edu-site/src/css/custom.css`), a linked table of contents, a cleaned-up status/quickstart/stack layout, and fixed a dead link to the removed `edu-site/docs/llm-providers.md` page (superseded by ADR-0001). Added the standard GitHub "community health" files that make a repo read as organized and welcoming to a beginner: `CONTRIBUTING.md` (workflow + a beginner Git/GitHub cheat sheet), `CODE_OF_CONDUCT.md` (Contributor Covenant v2.1), `.github/PULL_REQUEST_TEMPLATE.md`, and `.github/ISSUE_TEMPLATE/` (bug report, feature request, config). Left `LICENSE` untouched (already flagged TBD in the README) since choosing one is a legal/ownership decision for the repo owner, not something to invent. Also flagged to the user, in chat, the GitHub.com "About" panel settings (description, topics, social preview image) that only they can set via the web UI.

## Outcome

- ✅ Impact: Repo now has a polished, badge-rich README and full community-health file set; no dead links.
- 🧪 Tests: N/A (documentation-only change)
- 📁 Files: README.md rewritten; CONTRIBUTING.md, CODE_OF_CONDUCT.md, .github/PULL_REQUEST_TEMPLATE.md, .github/ISSUE_TEMPLATE/* added
- 🔁 Next prompts: Decide and add a LICENSE; set the GitHub repo's About description/topics/social image; consider syncing `specs/README.md`'s index (currently only lists 001) with specs 002–005.
- 🧠 Reflection: Grounded "colorful" in the project's actual brand palette and existing assets instead of generic/arbitrary styling, and caught a pre-existing dead doc link while touching the README.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
