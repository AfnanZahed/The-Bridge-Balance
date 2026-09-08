---
id: 0022
title: Setup Biome code quality
a stage: refactor
date: 2026-08-17
surface: agent
model: Claude Opus
feature: 001-book-foundation
branch: 001-spec-driven-engineering
user: user
command: frontend overhaul / Biome setup
labels: [biome, lint, formatting, ci, frontend]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - C:\Users\Dell\Desktop\Book\edu-site\biome.json
 - C:\Users\Dell\Desktop\Book\edu-site\package.json
 - C:\Users\Dell\Desktop\Book\edu-site\src\pages\404.tsx
 - C:\Users\Dell\Desktop\Book\edu-site\src\theme\Root.tsx
 - C:\Users\Dell\Desktop\Book\edu-site\scripts\axe.mjs
 - C:\Users\Dell\Desktop\Book\edu-site\scripts\check-frontmatter.mjs
 - C:\Users\Dell\Desktop\Book\edu-site\scripts\lighthouse.mjs
 - C:\Users\Dell\Desktop\Book\.github\workflows\ci.yml
tests:
 - npx biome check src/theme/Root.tsx src/pages/404.tsx scripts (pass)
 - npm run typecheck (pass)
 - npx biome check src (expected failures reported in active agent-owned files)
---

## Prompt

The user asked Agent E to set up @biomejs/biome for the Docusaurus frontend without a broad refactor. Scope was biome.json, stable 404.tsx, Root.tsx, scripts/*.mjs, package.json scripts, and root CI workflow. Requirements included recommended rules with noExplicitAny, useImportType, and noArrayIndexKey disabled, formatter settings, issue catalog, trivial fixes only in stable files, npm lint/format scripts, a CI Biome step, and typecheck verification. Do not touch active files owned by other agents.

## Response snapshot

Created a Biome 2.5.8 configuration using the v2 schema and migrated include exclusions, recommended preset, formatter settings, and explicitly disabled the requested rules. Ran checks and cataloged active-file issues by rule. Applied only mechanical fixes to stable files: import organization/formatting, safe template literal and ts-expect-error changes in scripts, and removed the redundant main role from 404. Added four npm scripts and a CI lint step using `npx @biomejs/biome ci src`. Typecheck passed.

## Outcome

- ✅ Impact: Biome configuration, local commands, and CI enforcement are wired without refactoring active frontend files.
- 🧪 Tests: Scoped Biome check passed; `npm run typecheck` passed twice. Full src lint remains blocked by active files with 50 errors, 6 warnings, and 2 infos.
- 📁 Files: Configuration, package scripts, CI, 404, Root, and stable scripts updated.
- 🔁 Next prompts: Active frontend agents can apply or consciously suppress the reported Biome findings.
- 🧠 Reflection: Biome 2.5 requires `files.includes` negation patterns and `linter.rules.preset`; migration output was used to align the config.

## Evaluation notes (flywheel)

- Failure modes observed: Initial Biome 2 config used deprecated/invalid `files.ignore` and `recommended` syntax; corrected via `biome migrate` guidance. Full lint also surfaces concurrent-agent files, so they were not modified.
- Graders run and results (PASS/FAIL): Scoped Biome PASS; TypeScript typecheck PASS; full Biome CI FAIL on pre-existing active-file diagnostics.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Re-run `npm run lint` after concurrent src changes settle and address remaining findings file-by-file.
