---
id: 0043
title: Extend reference checks and commit
stage: general
date: 2026-09-07
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (follow-up to PHR 0042)
labels: [validators, dead-references, css, imports, jsx, commit, git]
links:
  spec: null
  ticket: null
  adr: history/adr/0004-two-skill-content-split.md
  pr: null
files:
  - edu-site/scripts/check-references.mjs (section 5 added - JS/TS imports, package imports, CSS url() and @import, site-absolute asset strings)
  - history/prompts/general/0043-extend-reference-checks-and-commit.general.prompt.md (created)
  - "commit e5cc292 refactor(skills)!: rename chapter-authoring to chapter-production (18 files)"
  - "commit 073947d fix(docs): correct eleven dead file references (5 files)"
  - "commit 2901fc5 feat(scripts): validate every path this repo's documents name (6 files)"
  - "commit fd5a62f docs(adr,phr): amend ADR-0004 and record sessions 0038-0042 (7 files)"
tests:
  - "npm run build at HEAD - Frontmatter passed, Reference passed, 1 chapter checked 0 errors 1 warning, [SUCCESS]"
  - "negative test: relative import, undeclared package, CSS url(), CSS @import subpath, JSX static asset - all caught with file:line, exit 1"
  - "positive test after fixture removal - exit 0"
  - "good CSS @import subpath (@radix-ui/colors/gray.css) still passes while ghost.css fails"
  - "git status - nothing of this session's work left uncommitted"
---

## Prompt

extend it to CSS, imports, and JSX too. and then commit all the things well organized.

## Response snapshot

**Surveyed before writing checks**, rather than guessing at the patterns. Four
CSS files and 42 TS/TSX files, using: relative imports, `@site/`, Docusaurus
aliases (`@theme`, `@theme-original`, `@docusaurus`), bare packages including
subpaths like `motion/react`, CSS `url()` against `static/`, `url(data:)`, an
`@import` of a package CSS file, and an external Google Fonts import. Every one
of them currently resolves — the check exists so they cannot stop.

**Two false-positive classes surfaced on the first run and both were real design
errors, not tuning:**

1. **`motion/react` reported as unresolved.** The package is declared and
   installed; `react` is an `exports`-map subpath with no matching file on disk.
   Probing the filesystem for JS subpaths reports false failures by design, so
   package imports are now checked to the **root package only** — which still
   catches the real bug, importing something nothing declares or installs.
2. **English prose matched the import regex.** `…from "this is the exact page"…`
   in a chapter, and two more in stage index files. Import scanning is now
   restricted to `.ts/.tsx/.js/.jsx/.mjs`; markdown never had module specifiers
   to find.

**One gap found by testing rather than reading.** After loosening JS package
resolution, a deliberately broken `@import "@radix-ui/colors/ghost.css"` passed.
Correct for JS, wrong for CSS: **CSS has no exports maps, so a CSS `@import`
subpath is a plain file path** and must exist. Split the two cases. Verified the
bad subpath now fails while the real one (`gray.css`) still passes.

**Committed as four themed commits, ordered so the tree is bisectable:**

```
e5cc292  refactor(skills)!: rename chapter-authoring to chapter-production   18 files
073947d  fix(docs): correct eleven dead file references                        5 files
2901fc5  feat(scripts): validate every path this repo's documents name         6 files
fd5a62f  docs(adr,phr): amend ADR-0004 and record sessions 0038-0042           7 files
```

The order is load-bearing: the dead references are fixed **before** the validator
that enforces them lands, so no commit in the range is one where the build would
fail on its own content.

Files were grouped by subject area rather than by session, because several
(`CLAUDE.md`, `PROJECT-MAP.md`, the validators) changed across three or four of
sessions 0038-0042 and `git add -i` is unavailable in this environment. Each
commit is coherent; none maps one-to-one to a PHR.

**Deliberately not committed:** 40 untracked and 19 modified files of pre-existing
work that is not mine — the frontend and design changes (`SiteMenu/`,
`DocSidebar/`, `Navbar/`, `GatewayFlowCanvas.tsx`, the CSS files, the SVGs), three
new intro chapters, `docusaurus.config.ts`, `sidebars.ts`, `.claude/skills/mmx-cli/`,
and assorted scratch output. `check-frontmatter.mjs` was the one exception: it
carried a pre-existing edit that my change subsumed, so the commit message says so
rather than claiming the whole diff.

## Outcome

- ✅ Impact: The dead-reference class now has no remaining surface in this repo — markdown, ledgers, JS/TS imports, package declarations, CSS, and static assets are all checked against the filesystem on every build. Five sessions of work committed in four coherent, bisectable commits.
- 🧪 Tests: Build green at HEAD with all three validators. Negative test caught five distinct new reference kinds with file:line; positive test clean. CSS subpath split verified in both directions.
- 📁 Files: 1 validator extended, 1 PHR, 4 commits covering 36 files.
- 🔁 Next prompts: Author a chapter. It is still the only untested thing in any of this.
- 🧠 Reflection: Both false positives were the check being wrong about how resolution works, not thresholds needing tuning — and the CSS gap only appeared because the fix for the JS case was applied to both. Testing the fix rather than reasoning about it is what caught that; the same loosening was right in one place and wrong in the other.

## Evaluation notes (flywheel)

- Failure modes observed: (1) Applying one resolution rule to two languages that differ in exactly the relevant way (exports maps) silently weakened the CSS check. (2) A regex written for code was run over prose and matched English sentences — scope the pattern to the file type before tuning the pattern. (3) Grouping commits by session was impossible after the fact; had the work been committed per session as it went, the history would map to the PHRs one-to-one.
- Graders run and results (PASS/FAIL): Build at HEAD PASS. Reference negative test PASS ×5 kinds. Reference positive test PASS. CSS subpath discrimination PASS (ghost fails, gray passes). Uncommitted-work audit PASS (nothing of this session's left).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Commit at the end of each session rather than batching five, so commits map to PHRs and each can be built and verified in isolation.
