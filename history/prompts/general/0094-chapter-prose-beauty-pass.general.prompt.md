---
id: 0094
title: Chapter prose beauty pass — headings bolder/bigger/underlined, topic-sentence bold, glossary mark, reading measure capped
stage: general
date: 2026-09-16
surface: agent
model: unknown (Command Code session; no model id exposed to the agent)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["typography", "reading-column", "measure", "characters-per-line", "headings", "glossary", "emphasis", "design-tokens", "rhythm", "accessibility", "content-edit", "adr-required"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/css/custom.css (token block: new `--tbb-heading-scale: 1.1` and a six-step `--tbb-rhythm-*` ladder, both `:root`-only; global `h1..h6` weight 600 -> 700 and `--ifm-heading-font-weight` 600 -> 700; `article` measure `min(100%, calc(63rem * var(--tbb-text-scale)))` -> `min(100%, 35rem)` plus `margin-inline: auto`; `.theme-doc-markdown h1` and `.tbb-chapter-head--sub h1` and `> h2` and `> h3` each gain `font-size: calc(<authored> * var(--tbb-heading-scale))`, weight 700, `padding-bottom: var(--tbb-rhythm-1)` and `border-bottom: 1px solid var(--tbb-border)`; `.theme-doc-markdown h1::after` (the 3.5rem accent signature bar) deleted and replaced by a note; `.theme-doc-markdown em` no longer swaps in `--tbb-font-display`; `.theme-doc-markdown strong` 700 -> 650; the glossary-link block rebuilt to ink + dotted accent hairline with a `prefers-contrast: more` escalation, pill removed; `> blockquote` rebuilt as a display-serif pull-quote with an accent rule and no left border; `ul > li::marker` given the accent diamond and `ol > li::marker` an accent tabular ordinal; eight ad-hoc margins converted to the rhythm ladder; type-scale table restated at the new sizes/weights plus a new spacing-scale table; the h1 and h2 block comments corrected where this change falsified them)
 - edu-site/docs/**/*.md (topic-sentence bolding across the chapter and lesson files only — 662 paragraphs, 9,186 of 46,124 words, 19.9%: one bolded sentence per paragraph, the opening one, stepping to the next sentence where the first carries a link, inline code or existing emphasis)
 - edu-site/docs/changelog.md (new `### 2026-09-16` section, five reader-facing bullets)
 - history/prompts/general/0094-chapter-prose-beauty-pass.general.prompt.md (this file)
tests:
 - Measured the baseline BEFORE editing anything, and the hypothesis I took into the pass was wrong in a way worth recording: I expected the fill-the-column measure to be running ~125 characters per line. Chromium measurement of `.theme-doc-markdown > p` on `/stage-01-spec-aware-vibe-engineering/backend` (body 15.04px, line-height 25.568px) gave a MEDIAN of 98.3 chars/line at 1440px (791px column) and 81.6 at 1253px (650px column), 60.9 at 1024px, 43.2 at 390px — wide, but not the catastrophe predicted
 - Resolved which line-counting method was trustworthy before trusting any of it: counting distinct rounded `Range.getClientRects()` tops over-counts lines from sub-pixel jitter (agreed with the height/line-height method on only 49 of 77 paragraphs), while block-height / line-height and a jitter-clustered top count agreed on 77 of 77. The height method is the one quoted above
 - Corrected a stale claim in the stylesheet while measuring it: the `article` comment asserted a 942px content box at a 1253px viewport. Measured, that column is 650px — the 942px figure came from 75% of the container width and omitted the sidebar, which is what made "the 63rem ceiling never binds" read as safe
 - Post-change, same harness: MEDIAN 71.0 chars/line at 1440px and 1253px (min 58.3, max 78.8), 60.7 at 1024px, 42.7 at 390px. 35rem (560px) binds only above ~1330px, so 1024px and 390px are byte-for-byte unchanged (article margin-inline 0/0, width 479/332). Centring verified: `margin-inline` resolves to 115.25px/115.25px at 1440px and 45.125px/45.125px at 1253px, so the narrowing is symmetric rather than a fresh dead strip
 - Verified the +10% arithmetically against rendered pixels: h1 30.72 -> 33.792px, h2 24.32 -> 26.752px, h3 19.2 -> 21.12px, all at computed weight 700, all reporting `border-bottom: 1px solid` and `padding-bottom: 8px`
 - Verified `::marker` `content` actually renders in Chromium rather than assuming it: `getComputedStyle(li, "::marker").content` returns `"◆  "`
 - Verified the glossary restyle on `/welcome`, the only page carrying a glossary link, in BOTH themes by computed style rather than by eye: colour `rgb(25,27,29)` light / `rgb(230,232,234)` dark (i.e. `--tbb-ink`, not the accent), `text-decoration-style: dotted`, thickness 1px, offset 4px, decoration colour the accent at 55% alpha in both modes, background fully transparent, family the UI sans. The italic is still present but now comes from the inner `<em>` in the body face
 - Verified the pull-quote on the two stage index pages in both themes: family Instrument Serif, 22px, `border-left-width: 0`, `font-style: normal`, heading ink, `::before` rule present
 - Verified italics are decoupled: `em` inside ordinary prose resolves to the system sans; `em` inside a pull-quote still inherits the display serif, which is the intended behaviour
 - `npm run typecheck` (tsc) — PASS, no output
 - `npm run lint` (biome) — FAIL, and every finding is PRE-EXISTING and repo-wide, none of it from this change: `custom.css` is not reported at all, and all 58 errors / 3 warnings / 10 infos sit in `scripts/*.mjs` and `src/components|theme/*.tsx`, files this pass never opened. The dominant cause is `biome.json` setting `lineEnding: "lf"` while the repo is CRLF throughout, so biome's formatter reports every file ("Formatter would have printed the following content") — the diffs show `␍` being stripped. Others are pre-existing unused variables and import ordering
 - `npm run build` — PASS. Frontmatter, references and chapter gates all green; 12 chapters checked, 20 skipped, 0 errors. The single warning is the PRE-EXISTING `safety-floor-absent` on `welcome.md` recorded in PHR 0093; nothing new
 - `check:refs` is the gate that reads `/glossary#slug` anchors, so it is also the gate that proved the rebuilt glossary selector did not disturb the authored link form
 - axe-core (the project's own tag set: wcag2a, wcag2aa, wcag21a, wcag21aa) against the served production build, BOTH themes forced by seeding `localStorage.theme`, on `/welcome`, `/stage-01-spec-aware-vibe-engineering/backend`, `/stage-02-cs50-certification` and `/faq`: 0 violations at every impact level in all eight runs. This holds the baseline recorded in PHR 0093 for two of those pages
 - Confirmed the bolding pass did not leak into search: `static/search-index.json` (regenerated by the build) contains no `**`
 - Confirmed the bolding pass did not touch non-prose blocks: `>.theme-doc-markdown` list items, table cells, blockquotes and `<Callout>` bodies are excluded by construction, and the two `<Callout>` regions in `04-backend.md` were inspected directly and carry no inserted bold
 - Ran the bolding pass idempotently as a hard requirement, and it failed twice before it passed: see Evaluation notes
 - Visual check: screenshots of the served build at 1440px in light and dark, `/welcome` at 1440px light, a stage index at 1440px light, and the chapter at 390px, all read back and inspected
---

## Prompt

"the text of the main content of chapters/lessons is not as beautiful as it should be. Make it ultra beautiful. I have 3 ideas to be implemented, you have to research and understand and critically think for 5 more ideas, mine 2 ones: 1. the glossary connected words are not beautiful, at all, very ugly and stupid. 2. make the all the chapters' headings' text Bold and and 10% bigger in size. and underlined too. 3.: Make the 20% of the content's text bold."

Asked twice for a decision during planning (owner's answers, verbatim):

- Headings and the 20%-bold idea: **"Exactly as I asked"** — with the risks to be recorded rather than argued.
- What "20% of the content's text is bold" means: **"Topic sentence per paragraph"** — bold the first sentence of each body paragraph.
- How the heading underline should land: **"Block-width hairline under the heading"**.
- Glossary look: **"Quiet hairline underline"** — term in reading ink, one fine accent underline, accent on hover.
- Extra ideas: all four proposed — **fix the reading measure**, **italic/typeface decoupling**, **pull-quotes + list markers**, **unified vertical rhythm**.
- Bolding sequencing: **"Every chapter in one pass"**, then one review.

## Response snapshot

Read the request as three owner-set changes plus four additions he selected from a proposed set, and pushed back once, in writing, on the two that conflict with the project's own design law. He overrode both and asked for the risks to be recorded instead — so they are, here and in the changelog's consequences, and an ADR is proposed rather than assumed (below).

**The pushback, for the record.** Idea 3 could not be implemented as literally written: no CSS selector bolds a fixed fraction of prose, so "20% of the content's text is bold" is a content edit across every chapter file, and bolding one word in five turns emphasis from a signal into texture. Idea 2's underline collided with two marks already in the stylesheet — the h1's accent signature bar and the h2's opening rule — and the file's own h2 comment argues against underlining headings because a chapter runs 12–14 of them. Both were confirmed as decisions and then implemented faithfully.

**Measurement first, and the measurement corrected me.** I took a hypothesis into Step 0 and it was wrong: I expected the fill-the-column measure to be running ~125 characters per line. Measured, the median is 98.3 at 1440px and 81.6 at 1253px — outside the 45–75 band at desktop widths, but not the emergency predicted. That changed the fix from "narrow the column hard" to "cap it at the measured landing point", and the difference matters: a 36rem cap would have dropped the line below the band at large widths. It also surfaced that the stylesheet's own comment (942px content box) was wrong by ~30%, because it omitted the sidebar.

Then a method had to be picked before any of it could be trusted. Two line-counting methods disagreed on 28 of 77 paragraphs; the disputed method was over-counting lines from sub-pixel jitter in `Range.getClientRects()`. A third method agreed with the height-based one on 77 of 77, which is what made 98.3 quotable at all.

**The seven changes.** Tokens first: `--tbb-heading-scale` as a sibling to `--tbb-text-scale` (headings scaled from their own authored clamps, so the two dials stay independent), and a six-step `--tbb-rhythm-*` ladder with every step consumed. Headings then went to 700 with a block-width `border-bottom` rather than `text-decoration`, so a three-line title gets one rule instead of three. The h1's short accent bar was deleted rather than left to double up. The glossary term was cut from four signals to one — the display serif, accent text, full-strength underline and tinted pill gave way to ink text with a fine DOTTED accent hairline, dotted specifically because an ordinary link in this block is a solid accent underline, so the two can no longer be confused. Italics were decoupled from the typeface at the root, which is what stopped a term reading as a quotation; the display serif was then narrowed to the pull-quote, which is the surface that actually wants it. List markers took the headings' accent diamond at the top level only. Eight unrelated margins became one scale.

**The content pass.** One rule, applied uniformly: bold the paragraph's opening sentence; step to the next sentence if the first carries a link, inline code, or emphasis the text already had. 662 paragraphs, 19.9% of 46,124 words. Lists, tables, blockquotes and Callout bodies were excluded by construction — which is defensible because a measurement showed 95% of the prose words live in top-level paragraphs. Every chapter file was backed up before the edit and restored twice during it.

## Outcome

- ✅ Impact: the reading column now sets ~71 characters per line at desktop widths instead of 98, centred with even margins and unchanged on small viewports; chapter titles and section headings are 10% larger at bold weight with a hairline rule under each block; roughly one sentence in five of the prose is bold on a consistent topic-sentence rule; a glossary term is marked by a single dotted accent hairline in reading ink instead of four competing signals; pull-quotes have a real display-serif treatment; list bullets carry the headings' accent diamond; and the prose block steps by one spacing scale rather than eight unrelated margins.
- 🧪 Tests: See `tests:` above — typecheck, build with all its content gates, axe in both themes across four pages, four widths of measured characters-per-line before and after, and a read-back of the rendered screenshots in both modes.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: (1) The ADR is the one thing left, and it needs his consent before the file is written — full proposed text is in the handover. (2) The h2 is now bracketed by two rules (its opening `border-top` plus the new underline). It reads as a designed band rather than as a mistake, but it is the most likely thing to want a second look, and the one-line fallback is dropping `border-top`. (3) The two `<Callout>` blocks in `04-backend.md` now sit between paragraphs whose first sentences are bolded; if the callouts start reading as a break in a rhythm that is otherwise one bolded sentence per paragraph, that is the thing to notice. (4) Three of the four blockquotes in the book are placeholder notes on stage index pages, so the pull-quote treatment is currently seen almost entirely on placeholders.
- 🧠 Reflection: the ordering was the whole value again, and this time it reversed a decision. Measuring first did not confirm my hypothesis — it refuted it, and the refutation was worth more than the confirmation would have been, because the wrong version of the fix (a hard 36rem cap) would have taken the line below the readable band and read as "correct per the spec, worse to read". The second lesson is about verification cost: two of my own instruments were wrong before the code was, a line-counter that over-counted and a sentence-splitter that missed a boundary whenever terminal punctuation was followed by a closing quote or an emphasis marker. Both were caught only because a re-run of an idempotent pass is cheap to check and its output is a number. The pass failing idempotency twice is not a footnote — it is the reason the splitter bugs were found at all.

## Evaluation notes (flywheel)

- Failure modes observed: four, all in the tooling rather than in the CSS, and all worth naming.
  First, the measurement harness raced hydration and reported a different number of top-level paragraphs per viewport (62/68/71/71) — the first run's numbers were unusable. Waiting on `.theme-doc-markdown` and settling the page made it stable at 77 paragraphs and 116 children at every width.
  Second, the line counter. `Range.getClientRects()` returns a rect per line fragment, and rect tops for inline elements on the same line differ by sub-pixel amounts, so rounding and de-duplicating them inflates the line count and deflates characters-per-line. It agreed with the trustworthy method on only 49 of 77 paragraphs. Fixed by comparing against block-height / line-height and a half-line-height clustering tolerance.
  Third, the sentence splitter, twice over. It required whitespace immediately after `[.!?]`, so it missed the boundary in `"...one workflow." You learn...` (closing quote) AND in `` **`401` against `403`.** RFC 9110 defines... `` (markdown emphasis marker). Both failures merged two sentences into one, which hid an existing bold from the picker and walked the choice onto the wrong sentence. The second one also meant the first applied pass placed bolds correctly but not at the intended sentence, which is why the pass was restored and re-derived rather than patched in place.
  Fourth, idempotency. The picker's "skip a sentence that already contains `**`" branch only fired for the FIRST sentence, so a second run walked past the sentence it had bolded and bolded the next one — 382 extra paragraphs, i.e. the pass would have doubled its own output. Detecting idempotency at the PARAGRAPH level (any sentence wrapped `**` start-to-end) fixed it, and the re-run then reported 0.
- Graders run and results (PASS/FAIL): `npm run typecheck` — PASS. `npm run build` (frontmatter, references, chapter gates, manifest, search index, Docusaurus) — PASS, 0 errors, 1 pre-existing warning. axe, both themes, four pages — PASS, 0 violations at every impact level. `npm run lint` — FAIL, pre-existing and repo-wide (biome `lineEnding: "lf"` against a CRLF repo; `custom.css` is not reported at all). Bolding-pass idempotency re-run — PASS, 0 further bolds. Characters-per-line target 66–75 at wide widths — PASS at 71.0.
- Prompt variant (if applicable): two clarifying questions were asked before implementation (what "20% bold" means, and how the underline should land), each with concrete previews of the alternatives, plus a three-option question on the glossary mark and a four-option multi-select on the extra ideas. The owner chose the recommended answer on the glossary and the extra ideas, and the literal answer on the two ideas that had been flagged.
- Next experiment (smallest change to try): a checked-in version of the two probes, since both get rebuilt from scratch every time a type or measure question comes up and both had to be debugged this run. The valuable one is small: given a URL and a width, print measured characters-per-line using the block-height method, plus each heading level's computed size, weight and border. The second follow-up is a guard on the bolding pass — a `--check` mode that asserts every paragraph carries zero or one start-to-end wrapped sentence, which would have caught both non-idempotency regressions in one run instead of three.

## Outstanding: ADR-0006 proposed, not created

Per Constitution Principle IV and the Governance clause, a change that conflicts with a principle must either comply or trigger an ADR, and ADRs "are written after user consent; never auto-created". Two parts of this pass conflict with Principle VII's restraint rules ("one telling detail per surface", "gridlines and hairlines exist only where data or alignment demands them", "when in doubt, remove"):

1. A hairline under every heading. A chapter runs 12–14 h2s; the stylesheet itself records underlining them as the reason the h2 rule sits above the heading rather than under it. This adds 12–14 competing horizontal lines per chapter.
2. ~20% of prose at 650–700. Emphasis works by contrast, and `strong` is announced by screen readers, so prosody noise rises across most sentences. Constitution IX's mixed-audience and humanised-prose rules are the nearest neighbours.

The proposed text was handed to the owner for approval. No file has been written and no row has been added to `history/adr/README.md`.
