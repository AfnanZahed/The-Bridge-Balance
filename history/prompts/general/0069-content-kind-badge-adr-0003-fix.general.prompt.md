---
id: 0069
title: Content-kind badge ADR-0003 accent fix
stage: general
date: 2026-09-14
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["content-kind", "adr-0003", "design-system", "bug-fix", "verification"]
links:
  spec: null
  ticket: null
  adr: history/adr/0003-scoped-accent-reintroduction.md
  pr: null
files:
 - edu-site/src/css/custom.css
tests:
 - edu-site/docs/intro-1-binary-to-programming.md temporarily carried content_kind: theory for live browser verification, then reverted (not a real content change)
---

## Prompt

[No new user message — triggered by Job D's completion notification. Verifying Job D's output surfaced a real defect worth fixing before reporting back, per the standing verify-from-the-real-trace discipline in [[feedback-claude-plans-deepseek-executes]].]

## Response snapshot

Job D's own final report flagged, rather than silently resolved, a tension: it had used `--tbb-accent` for the new `ContentKind` badge (Theory/Practice) exactly as instructed, but noted `history/adr/0003-scoped-accent-reintroduction.md` scopes that token to a closed list of navigation/wayfinding surfaces and explicitly re-homes the `ChapterState` badge off it. Read the ADR in full: it names "the chapter-state badge" directly as one of the things that must stay on `--ifm-color-primary`, with the rationale "a status badge isn't a link, active nav item, or focus ring, so it stays neutral." `ContentKind` is the same category of thing — a content-classification pill sitting right beside `ChapterState` — so it was in violation of an existing, deliberate design decision, not a judgment call to leave open.

Fixed directly (small, surgical, not volume work): `custom.css`'s `.tbb-content-kind` and `.tbb-content-kind__dot` now read `--ifm-color-primary` instead of `--tbb-accent`, matching `.tbb-chapter-state--text-ready`'s exact mix percentages (10% background, 24% border). Updated the block's comment to state the ADR-0003 compliance reasoning instead of the now-wrong "tinted with the accent" claim.

Verified live rather than by inspection alone: started the Docusaurus dev server, temporarily added `content_kind: "theory"` to `intro-1-binary-to-programming.md`'s frontmatter (a Stage-0 chapter already slated for a full from-scratch rewrite, not the off-limits Stage 1), screenshotted the rendered page in both dark and light mode (dark is the pane's default), confirmed the badge renders "Theory" beside the ChapterState badge in the same neutral tone — no accent bleed, no layout break, consistent in both themes — then reverted the frontmatter edit immediately and stopped the preview server.

## Outcome

- ✅ Impact: a real design-system violation (ADR-0003 non-compliance) caught and fixed before being reported as "done," rather than left as a flagged-but-unresolved tension. No chapter frontmatter changes persisted.
- 🧪 Tests: live browser verification in both color themes; the only file changed is `custom.css` — no gate re-run needed since no frontmatter, script, or component logic changed, only two CSS custom-property references.
- 📁 Files: `edu-site/src/css/custom.css`.
- 🔁 Next prompts: none required — this closes the tension Job D's report surfaced. If a future badge/pill is added to chapter chrome, check ADR-0003's scope list before reaching for `--tbb-accent`.
- 🧠 Reflection: giving a delegated execution task an instruction ("use `--tbb-accent`") without first checking whether that token was already governed elsewhere produced a real defect — DeepSeek followed the literal instruction and correctly surfaced the conflict rather than silently picking a side, which is exactly the behavior the delegation pattern depends on, but the fix still had to come from actually reading the ADR, not from the flag alone.

## Evaluation notes (flywheel)

- Failure modes observed: an imprecise delegated instruction (naming a specific token without checking its governance) produced a real, if small, defect. Caught only because the executor was instructed to flag tensions rather than resolve them silently, and because verification read the real report instead of trusting "all parts done."
- Graders run and results (PASS/FAIL): visual verification PASS in both themes.
- Prompt variant (if applicable): first time this session a delegated task's own self-report directly caused a follow-up fix rather than just a "worth noting" flag.
- Next experiment (smallest change to try): before naming a specific design token in a delegated prompt, grep the codebase for that token's own governance comment (ADRs, "why" comments near its definition) in the same pass that drafts the prompt, not after execution reports a conflict.
