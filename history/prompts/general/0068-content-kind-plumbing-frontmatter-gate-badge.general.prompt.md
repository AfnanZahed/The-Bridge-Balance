---
id: 0068
title: Content-kind plumbing frontmatter gate badge
stage: general
date: 2026-09-14
surface: agent
model: deepseek-v4.1-flash (Command Code)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["content-kind", "theory-practice", "frontmatter-contract", "chapter-gate", "reader-badge", "plumbing-only"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/scripts/check-frontmatter.mjs
 - edu-site/src/components/ContentKind/index.tsx
 - edu-site/src/theme/MDXComponents.tsx
 - edu-site/src/css/custom.css
 - C:\Users\Dell\AppData\Local\Temp\commandcode\C--Users-Dell-Desktop-Book\ee998a31-58b4-462b-a864-fbf655639624\scratchpad\cff-test\docs\ (scratch fixtures: good.md, emptykind.md + glossary/perf-targets stubs; bad-case fixtures removed after verification)
tests:
 - node scripts/check-frontmatter.mjs — repo, before and after: passed
 - node scripts/check-chapter.mjs — repo, before and after: 11 checked, 16 skipped, 0 errors, 0 warnings
 - node scripts/check-frontmatter.mjs against scratchpad/cff-test (synthetic cases) — expected 4 errors (invalid value x2, missing reason x2), then clean after removing bad fixtures
 - npm run typecheck — clean
 - npm run build — all five gates green + docusaurus build SUCCESS; generated chapterManifest.ts and static/search-index.json byte-identical (SHA-256 unchanged)
 - npm run lint — pre-existing repo-wide failure (59 errors in untouched files); zero diagnostics attributed to files changed here
---

## Prompt

TASK: Build the frontmatter + gate + reader-facing UI plumbing for a new two-value content-kind classification ("Theory" / "Practice") in "The Bridge Balance" book project. Work inside C:\Users\Dell\Desktop\Book. This is a WRITE task, and it is NEW infrastructure — read the grounding files first. This task builds the PLUMBING ONLY: do not add this classification to any existing chapter's frontmatter. No chapter uses it yet; that is deliberately future work.

GROUNDING — read these first:
- C:\Users\Dell\Desktop\Book\edu-site\scripts\check-frontmatter.mjs (the real, authoritative current chapter frontmatter contract — read this in full before touching anything; do not trust specs/001-book-foundation/contracts/content-schema.md, which is independently known to be stale)
- C:\Users\Dell\Desktop\Book\edu-site\scripts\check-chapter.mjs (the chapter gate; find how it already handles `scope_multiplier`/`scope_reason` as a paired required-together field — match that exact pattern for the new field)
- One real shipped chapter's frontmatter block only: C:\Users\Dell\Desktop\Book\edu-site\docs\intro-1-binary-to-programming.md — to see the real current shape. Do NOT open or use anything under edu-site\docs\stage-01-spec-aware-vibe-engineering\ for this or any other reason — that folder is off-limits this round.
- C:\Users\Dell\Desktop\Book\edu-site\src\theme (search for wherever the `ChapterState` badge is rendered — CLAUDE.md states it is registered "alongside" Callout/StageBanner in edu-site/src/theme/MDXComponents.tsx, but describes it as chrome rendered around a chapter, not a component used inside chapter body text; find its actual rendering file/swizzle before designing anything, and mirror its exact mechanism for the new badge)

PART 1 — Frontmatter contract: add `content_kind` + `content_kind_reason`
Add two new OPTIONAL frontmatter keys to the chapter contract, following the exact existing pattern of `scope_multiplier` + `scope_reason` (read how those two are defined and validated together in check-frontmatter.mjs / check-chapter.mjs, and mirror it):
- `content_kind`: allowed values exactly `theory` or `practice` (lowercase), or absent/null.
- `content_kind_reason`: a short free-text string, required whenever `content_kind` is present (same paired-requirement pattern as scope_reason), optional/absent when content_kind is absent.
These two fields must be OPTIONAL at the contract level right now — do NOT make them required for a chapter to pass the gate. This project's existing text-ready chapters do not have this field yet and must continue to pass the gate exactly as they do today; adding this must not break the current clean gate run. Confirm this by running the gate afterward (see Part 4).

PART 2 — Gate validation
Extend check-frontmatter.mjs (or check-chapter.mjs, whichever already owns frontmatter-shape validation — follow the existing file split) so that IF `content_kind` is present on a chapter, it must be exactly `theory` or `practice` (fail with a clear error naming the chapter and the invalid value otherwise), and `content_kind_reason` must also be present and non-empty (fail otherwise, same paired-field pattern as scope_multiplier/scope_reason). If `content_kind` is absent, no error — this is intentionally optional for now.

PART 3 — Reader-facing badge
Find exactly how and where the existing `ChapterState` badge is rendered (it is described as living "alongside" Callout/StageBanner in the registration comment, but functions as page chrome, not in-body MDX content — locate its real source file, likely a theme swizzle or a layout wrapper component). Add a second, similar badge for `content_kind`, rendered the same way, in the same location/pattern as ChapterState's badge (do not invent a new placement or pattern — mirror the existing one exactly). Rules:
- Only renders when the chapter's frontmatter has `content_kind` set (nothing renders for chapters without it — this must not visually break or leave an empty gap on any of today's existing chapters, none of which have this field yet).
- Label text: "Theory" or "Practice" (capitalized, exactly these two words — this project deliberately chose these words over the researched Concept/Procedure/Practice wording; do not use any other wording).
- Visual style: reuse this project's existing badge/pill styling (find whatever CSS class or component ChapterState's badge already uses, and reuse or closely pattern-match it) and the existing `--tbb-accent` token system — do not invent a new visual language. Both light and dark theme must work, matching however ChapterState's badge already handles that.
- Do NOT add anything to edu-site/src/theme/MDXComponents.tsx's registered-component list — if ChapterState's badge is not itself an MDX component (confirm this first), the new badge must follow the same non-MDX mechanism, not become a new entry in that locked allow-list.

PART 4 — Verify
Run the project's existing chapter gate across all currently shipped chapters (check package.json from edu-site for the right npm script, e.g. `npm run build` runs check:frontmatter + check:chapter among other steps, or call the scripts directly) and confirm it is still 100% clean — same pass/fail counts as before this change, since no existing chapter has been given the new field. Paste the real output.

HARD BOUNDARIES:
- Do NOT add `content_kind` to any existing chapter's frontmatter — not Stage 0/intro, not Stage 1, not anywhere. This task builds the mechanism only; applying it to real chapters is separate, future, content-authoring work.
- Do NOT touch, open, or reference anything under edu-site\docs\stage-01-spec-aware-vibe-engineering\ for any reason — that folder is off-limits this round.
- Do not add a new entry to edu-site/src/theme/MDXComponents.tsx.
- Do not run git commands.
- Make the smallest change that achieves each part — do not refactor surrounding code you don't need to touch.

FINAL REPORT: quote the exact diff for each of Parts 1-3, and paste the real gate-run output from Part 4.

## Response snapshot

Grounding confirmed the mechanism before touching anything: ChapterState is a component at src/components/ChapterState/index.tsx that is imported into src/theme/MDXComponents.tsx but NOT registered as an MDX component — it renders inside the `h1` override (`ChapterHeading`), which reads `chapter_state` from `useDoc().frontMatter` and paints the badge above the chapter masthead. That is page chrome; the export list `{...MDXComponents, h1, ul, Callout, StageBanner}` is the locked allow-list and stayed untouched.

Part 1+2: check-frontmatter.mjs owns frontmatter-shape validation (it validates the chapter_state enum for every doc, including placeholder chapters that check-chapter.mjs skips), so the new pair went there: `VALID_CONTENT_KINDS = ["theory", "practice"]`, and a check inside the chapter-file block that fires only when `content_kind` is non-empty — invalid value fails naming the file and the value, missing/empty `content_kind_reason` fails with the paired-field error. A bare `content_kind:` (empty → null) counts as absent. Header docstring updated to document the optional pair.

Part 3: new src/components/ContentKind/index.tsx mirroring ChapterState's component shape (typed value union, label map, `role="status"`, `aria-label="Content kind: …"`, dot span); MDXComponents.tsx's ChapterHeading reads `content_kind` and renders `{contentKind ? <ContentKind kind={contentKind} /> : null}` directly beside the ChapterState badge (adjacent-sibling CSS spaces the two pills when both are present); custom.css gets a `.tbb-content-kind` card pattern-matching `.tbb-chapter-state` (same padding/radius/type/shadow) tinted with `--tbb-accent` (10% surface mix background, 24% border, accent dot), so light and dark both resolve from existing tokens with no dark override needed. No chapter files were touched anywhere.

Part 4: baseline captured before edits, re-run after — check:frontmatter "passed ✓" both times; check:chapter identical both times (11 checked, 16 skipped, 0 errors, 0 warnings). Extra verification: synthetic scratch fixtures proved the new failure paths fire (invalid value, missing reason, both together) and the clean paths pass; npm run typecheck clean; npm run build fully green including docusaurus build, with generated chapterManifest.ts and static/search-index.json byte-identical (SHA-256) before/after.

One recorded tension, surfaced rather than silently resolved: ADR-0003's CSS comment scopes --tbb-accent to a closed consumer list that excludes badges (it re-homed the chapter-state badge off accent) — the task explicitly instructed --tbb-accent for this badge, so it was followed; the maintainer may want to extend that comment's list.

## Outcome

- ✅ Impact: content_kind/content_kind_reason contract + validation + reader badge exist end-to-end; every current chapter is provably unaffected (no frontmatter changes, same gate counts, build green, generated artifacts byte-identical).
- 🧪 Tests: repo gates before/after identical; synthetic scratch validation of both failure modes; typecheck clean; full build SUCCESS. npm run lint remains red for the repo's pre-existing CRLF/format drift (untouched files) with zero diagnostics attributed to the changed files — verified against the full saved lint log.
- 📁 Files: edu-site/scripts/check-frontmatter.mjs, edu-site/src/components/ContentKind/index.tsx (new), edu-site/src/theme/MDXComponents.tsx, edu-site/src/css/custom.css.
- 🔁 Next prompts: apply content_kind to real chapters during the from-scratch Stage 0 authoring (separate content work); decide whether the ADR-0003 permitted-consumers comment should list the content-kind badge; optionally add sidebar parity if the classification should surface in navigation later.
- 🧠 Reflection: The "registered alongside Callout/StageBanner" description in CLAUDE.md describes import/use, not the allow-list — reading the actual render path was what made the mirroring instruction unambiguous; also, "--tbb-accent token system" collides with ADR-0003's closed consumer list, so follow-the-instruction + surface-the-conflict was the honest path.

## Evaluation notes (flywheel)

- Failure modes observed: background-task log capture returned an empty file despite a successful exit 0 run — freshness of build/index.html timestamps was used as the corroborating evidence, then the build was re-run in the foreground to capture real output for the report.
- Graders run and results (PASS/FAIL): check:frontmatter PASS; check:chapter PASS (0 errors, 0 warnings); typecheck PASS; build PASS; lint FAIL (pre-existing, unowned drift — no new diagnostics from this work).
- Prompt variant (if applicable): task arrived with explicit hard boundaries (off-limits folder, no frontmatter edits, no MDXComponents export entry, no git) — all four held; the off-limits stage-01 folder was never opened or referenced.
- Next experiment (smallest change to try): when a task says "use token X" while the repo records token-X scoping elsewhere, grep for the token's governance comment first and decide the conflict stance in one pass instead of discovering it mid-implementation.
