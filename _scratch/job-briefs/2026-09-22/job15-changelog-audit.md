# Changelog accuracy audit, 22 September 2026

Page audited: `edu-site/docs/changelog.md` (before the redesign). 37 dated entries (bullets) across 7 dates: 2026-09-22 (2), 2026-09-21 (1), 2026-09-20 (6), 2026-09-17 (5), 2026-09-16 (8), 2026-09-15 (9), 2026-09-14 (6).

Method: every claim was checked against a file on disk. The changelog page itself was never used as evidence for its own claims. The backup folders under `_scratch/` were used only to read states that have since been rewritten. No git commands were used.

Verdict words: **true** (a file states or implies it, and the path is given), **wrong** (a file contradicts it), **cannot confirm** (no file states or implies it), **design** (a statement of intent rather than of fact, which needs no evidence).

---

## 2026-09-14

### 1. Stage 0 — Orientation is now an official stage

- Claim: Stage 0 is now an official stage. **true.** `history/prompts/general/0067-*.prompt.md` ("updated the governance layer for the Stage 0 promotion").
- Claim: it sits before Stage 1. **true.** `edu-site/src/lib/stages.ts`.
- Claim: it covers computing history from binary through today's AI-coding-agent era, plus Spec-Driven Engineering and Reading & Understanding Literacy. **true.** `edu-site/src/components/DataViz/CurriculumBarChart.tsx`; `curriculum-state/canon/thesis.md`.
- Claim: the curriculum is five stages (0 through 4), not four. **true as of that date**, superseded on 22 September. `curriculum-state/canon/course-structure.md` line 42 ("Five today, numbered 0 to 4"); `history/prompts/general/0071-*.prompt.md` ("changed from value: 4 to value: 5").

### 2. Theory or Practice label on every chapter and lesson

- Claim: every chapter and lesson now carries a Theory or Practice label. **WRONG.** `edu-site/src/components/ContentKind/index.tsx` line 6 ("no chapter carries it yet"); `history/prompts/general/0068-*.prompt.md` line 35 ("do NOT add this classification to any existing chapter's frontmatter"); a grep of `edu-site/docs/` for `content_kind` returns no matches. Only the mechanism shipped.
- Claim: a reader can tell at a glance whether a page teaches a concept or walks through doing something. **CANNOT CONFIRM.** For the same reason: there is nothing to read it on yet.

### 3. Homepage curriculum dashboard

- Claim: the dashboard reflects five stages. **true.** `history/prompts/general/0071-*.prompt.md` line 33.
- Claim: it drops the old fixed chapter count. **true.** same record ("the Chapters: 15 tile was replaced entirely with a Textbook: Free Forever tile").
- Claim: the site has a no-fixed-count rule. **true.** `CLAUDE.md` ("No fixed chapter list or chapter count, ever").

### 4. Two new reference pages

- Claim: a Code of Conduct page shipped. **true.** `edu-site/docs/code-of-conduct.md`; `specs/009-code-of-conduct/`.
- Claim: an Accessibility Statement page shipped. **true.** `edu-site/docs/accessibility.md`; `specs/010-accessibility-statement/`.
- Claim: it names the real WCAG 2.2 AA baseline. **true.** `edu-site/src/css/a11y.css` line 8; `edu-site/docs/accessibility.md`.
- Claim: it names the automated checks that enforce it. **true.** `edu-site/docs/accessibility.md` ("axe", "Lighthouse").

### 5. Two homepage charts rebuilt

- Claim: the bar chart shows each stage's real authoring status instead of a chapter count. **true.** `edu-site/src/components/DataViz/CurriculumBarChart.tsx` line 7; `specs/001-book-foundation/spec.md` line 55 (the old chapter count).
- Claim: the donut shows the stages as equal parts instead of an hours breakdown. **true.** `edu-site/src/components/DataViz/CurriculumDonut.tsx` line 5; `specs/001-book-foundation/spec.md` line 55 (the old hours breakdown).
- Claim: both charts were dropping Stage 0. **true.** `specs/001-book-foundation/spec.md` line 59 ("15 chapters, 4 stages"); `0071-*.prompt.md` line 33.

### 6. FAQ page

- Claim: a FAQ page shipped. **true.** `edu-site/docs/faq.md`; `history/prompts/008-faq-page/0001-*.prompt.md`.
- Claim: it was independently fact-checked against the repo before publishing. **true.** `history/prompts/008-faq-page/0001-*.prompt.md` line 75 ("independent fact-check of every faq.md claim against the repo, PASS").

---

## 2026-09-15

### 1. Welcome page opens the book

- Claim: a Welcome page opens the book, ahead of Stage 0. **true.** `edu-site/sidebars.ts` (welcome as a top-level leaf before the Stage 0 category).
- Claim: it states the founding claim, what "balance" means. **true as of that date.** `history/prompts/general/0077-*.prompt.md` line 34; the page has since been rewritten twice.
- Claim: why checking an AI agent's work cannot move to the machine. **true.** `edu-site/docs/welcome.md`, "Why the checking can't move to the machine".
- Claim: both sit inside the first screen. **CANNOT CONFIRM.** No file states any on-screen position.
- Claim: what you need to start (nothing). **true.** `history/prompts/general/0086-*.prompt.md`.
- Claim: how the five stages fit together. **true as of that date** (five-stage table).
- Claim: how a chapter is meant to be read. **true.** `edu-site/docs/welcome.md`, "How to read this book".
- Claim: an honest list of what the site lacks (no community, no help chatbot, no certificate). **true.** `edu-site/docs/welcome.md`, "What's still being built".
- Claim: who writes and maintains the book. **true.** `edu-site/docs/welcome.md`, "Who's behind this".

### 2. Key terms link to the Glossary

- Claim: coding agent links to the Glossary at first use. **true.** `history/prompts/general/0082-*.prompt.md` line 19; `edu-site/docs/welcome.md`.
- Claim: Spec-Driven Engineering links to the Glossary at first use. **true as of that date**; later the same day it was moved to the on-page anchor, which is what the file shows now. `0082-*.prompt.md` line 19.
- Claim: the section names the gap between what "agent" implies and what actually runs. **true.** `edu-site/docs/welcome.md` ("its independence is a setting you control, not a trait it has").

### 3. Reading-page type rebalanced

- Claim: body prose, code, tables, callouts, the sidebar and the On this page list all step down together. **true.** `edu-site/src/css/custom.css` lines 260 to 273.
- Claim: the step-down is 20%. **CANNOT CONFIRM.** No file records a 20% cut. The only two figures on disk are the current dial at 0.94, described as "a −6% cut on the original sizes" (`custom.css` line 266), and a hypothetical "blanket −20%" that is explicitly not used (`custom.css` line 1923).
- Claim: the measure steps down with them, so a line keeps the same number of characters. **true.** `custom.css` line 271 ("scaling both keeps characters-per-line exactly constant").
- Claim: a section heading rendered at 17.28px next to 17px body text. **CANNOT CONFIRM.** The 17px body is real (`history/prompts/general/0057-*.prompt.md` line 48), but 17.28 appears in no file except the changelog itself.
- Claim: the four levels sit on one ladder of 13.6px body, then 17.28, 24.32 and 31.68. **PARTLY CANNOT CONFIRM.** 24.32px is recorded (`history/prompts/general/0094-*.prompt.md` line 28, "h2 24.32 -> 26.752px"); 13.6px, 17.28px and 31.68px appear in no file except the changelog itself.
- Claim: the chapter title had fallen to within 3% of a section heading. **CANNOT CONFIRM.** No file states the ratio.

### 4. Sidebar collapse control

- Claim: the old collapsed state was a blank 30px strip with a grey arrow at its centre. **true.** `history/prompts/general/0080-*.prompt.md` line 33.
- Claim: the old control was a full-width bar with square corners. **true.** `0080-*.prompt.md` line 31.
- Claim: closing is now a capsule at the panel's foot that names what it does. **true.** `0080-*.prompt.md` ("the word Collapse").
- Claim: the collapsed rail is 44px wide with the panel's own mark at its head. **true.** `0080-*.prompt.md` line 38 ("rail itself widened 30px → 44px").
- Claim: the same 44px target the rest of the site's controls use. **true.** `edu-site/src/css/a11y.css` line 34.
- Claim: the same mark, aimed the other way, brings the panel back. **true.** `0080-*.prompt.md`.

### 5. Welcome page revised

- Claim: Spec-Driven Engineering introduced as software engineering plus AI (use an agent now, build one later). **true.** `history/prompts/general/0086-*.prompt.md` line 34; `edu-site/docs/welcome.md`.
- Claim: the problem it solves, why checking stays with a person, and the five-stage table folded into one section. **true.** `0086-*.prompt.md` line 34 ("merge it to our second point, they will be just 1").
- Claim: new sections on background you do not need, a needs table, the stage and chapter structure, and what is still being built. **true.** `0086-*.prompt.md` items 3, 6, 8, 9.
- Claim: the start-reading call now sits at the very end of the page. **true.** `0086-*.prompt.md`.

### 6. Tables as raised cards

- Claim: every table is a raised card, with rounded corners, a soft shadow, an eyebrow header and a row hover. **true.** `history/prompts/general/0087-*.prompt.md`.
- Claim: it is sitewide, reaching `intro-4`, `intro-5`, and Stage 1's core-programming and backend chapters. **true.** `0087-*.prompt.md` line 29.

### 7. Table header rail

- Claim: the header is now a dark, top-lit rail. **true.** `history/prompts/general/0088-*.prompt.md` line 30.
- Claim: the old flat grey fill carried labels below the readable-contrast floor in both themes. **true.** `0088-*.prompt.md` line 30 ("~2.8:1 in light mode and ~1.9:1 in dark").
- Claim: the labels now clear the floor with room to spare. **true.** `0088-*.prompt.md` line 31 ("10.29:1 / 10.40:1").

### 8. Dark-mode panels

- Claim: the sidebar and the On this page panel now sit on one tone between two ramp steps. **true.** `history/prompts/general/0092-*.prompt.md` line 24.
- Claim: the sidebar came down and the panel came up. **true.** `0092-*.prompt.md` line 26.
- Claim: the tonal step that separated them is gone. **true.** `0092-*.prompt.md` line 26.
- Claim: the sidebar's own labels got easier to read. **true.** `0092-*.prompt.md` line 25 ("8.59:1 → 10.96:1").
- Claim: light mode is untouched here. **true.** `0092-*.prompt.md` line 25.

### 9. Light-mode grounds

- Claim: the light page is no longer pure white; the reading column sits at silver-0.75. **true.** `history/prompts/general/0093-*.prompt.md` line 24.
- Claim: both document panels sit at silver-1.5. **true.** `0093-*.prompt.md` line 25.
- Claim: the panels' small labels stepped one half-step darker to stay above the floor. **true.** `0093-*.prompt.md` line 26 ("4.40:1 to 5.78:1").
- Claim: dark mode is untouched here and stays pure black. **true.** `0093-*.prompt.md` line 24.

---

## 2026-09-16

### 1. Readable line length

- Claim: the reading column used to spread to whatever width the screen allowed, about 98 characters on a line. **true.** `edu-site/src/css/custom.css` line 1601 ("MEDIAN of 98.3 characters per line").
- Claim: 45 to 75 characters is the comfortable band. **true.** `custom.css` line 1603.
- Claim: it is capped so a line carries about 70 characters. **true as of that date.** `history/prompts/general/0094-*.prompt.md` line 31 ("MEDIAN 71.0 chars/line at 1440px"); the same day's later work moved it to about 80, which that day's later entry records.
- Claim: the column sits centred with an even margin either side. **true.** `0094-*.prompt.md` line 31.
- Claim: nothing moves on a phone or a small laptop. **true.** `0094-*.prompt.md` line 31 ("1024px and 390px are byte-for-byte unchanged").

### 2. Headings

- Claim: every heading level steps up 10%. **true.** `custom.css` line 283.
- Claim: headings read at bold weight. **true.** `0094-*.prompt.md` line 28.
- Claim: a hairline rule runs the width of the text block, one rule per block. **true.** `0094-*.prompt.md`.
- Claim: the title's old short accent bar is gone. **true.** `0094-*.prompt.md` line 26.

### 3. Bold opening sentence

- Claim: about one sentence in five of the prose is bold. **true.** `0094-*.prompt.md` line 26 ("9,186 of 46,124 words, 19.9%").
- Claim: the rule is the paragraph's opening sentence. **true.** `0094-*.prompt.md` line 26.
- Claim: emphasis the text already carried is left where it was. **true.** `0094-*.prompt.md` line 26.
- Claim: a paragraph whose first sentence is a link or already emphasised takes the next sentence. **true.** `0094-*.prompt.md` line 26.

### 4. Glossary term marking

- Claim: it used to carry four signals at once (display serif, accent colour, full-strength underline, tinted background). **true.** `0094-*.prompt.md`.
- Claim: it stays in the reading ink with one fine dotted accent underline. **true.** `0094-*.prompt.md` line 32.
- Claim: it turns to the accent colour on hover. **true.** `0094-*.prompt.md` line 32.
- Claim: ordinary links are unchanged, so a term and a link do not look alike. **true.** `0094-*.prompt.md`.

### 5. Italics, pull-quote, markers, spacing

- Claim: italics are emphasis again rather than a change of typeface. **true.** `0094-*.prompt.md` line 26.
- Claim: the display serif is kept for the pull-quote, set larger with a short accent rule above and no left border. **true.** `0094-*.prompt.md` line 32.
- Claim: list bullets take the headings' small accent diamond. **true.** `0094-*.prompt.md`.
- Claim: the space between paragraphs, headings, tables, quotes and code now steps by a single scale instead of eight unrelated numbers. **true.** `custom.css` line 287, which lists all eight old values.

### 6. Side margins

- Claim: the reading column's side margins are less than half the size they were. **WRONG.** `history/prompts/general/0096-*.prompt.md` line 46: "Side gap 119px -> 84px at 1440px. ~30% off the gap, deliberately not the literal 50%". 84px is about 71% of 119px.
- Claim: the prose now takes back the space whenever a panel is folded away. **true.** `0096-*.prompt.md` line 25.
- Claim: the column used to be a fixed width. **true.** `custom.css` line 1610.
- Claim: the empty margin was 119px per side at a desktop size. **true.** `custom.css` line 1613.
- Claim: folding the left sidebar made that margin wider, 216px. **true.** `0096-*.prompt.md` line 25.
- Claim: the text stayed exactly where it was. **true.** `0096-*.prompt.md` line 25.
- Claim: the column now holds a constant margin and the text fills everything else. **true.** `custom.css` line 1619.
- Claim: the line lands around 80 characters, against 71 before. **true.** `custom.css` line 1626.
- Claim: a narrower margin would have reached 85. **true.** `custom.css` line 1628.
- Claim: it stops short of the 50% the margin was measured against. **true.** `custom.css` line 1627.

### 7. On this page panel

- Claim: it folds away the way the left sidebar does. **true.** `0096-*.prompt.md` line 22.
- Claim: a handle at its head names the action. **true.** `0096-*.prompt.md` line 23.
- Claim: folded, it leaves the same 44px rail carrying the same mark aimed the other way. **true.** `0096-*.prompt.md` line 45.
- Claim: it moves on the same 200ms clock as the sidebar. **true.** `0096-*.prompt.md` line 45.
- Claim: it holds its own contrast in both themes. **true.** `0096-*.prompt.md` line 28 ("axe clean in BOTH the expanded and collapsed states").
- Claim: it remembers being folded as you move between chapters. **true.** `0096-*.prompt.md` line 28.
- Claim: the text widens and narrows as the panel moves. **true.** `0096-*.prompt.md` line 27.

### 8. Two rebuilt Stage 0 chapters ship

- Claim: the two chapters shipped. **true.** `curriculum-state/ledgers/prerequisite-graph.yaml` line 590 ("AUTHORED 2026-09-16").
- Claim: they open a single chronological sequence, nothing taught before the thing it depends on. **true.** `prerequisite-graph.yaml` line 340 and the ch02 entry.
- Claim: the sequence runs from a two-state switch through the first working compiler in 1957. **true.** `prerequisite-graph.yaml` line 596; `edu-site/docs/ch02-programming-is-born.md`.
- Claim: the book's original five chapters stay live. **true.** `edu-site/sidebars.ts` lines 26 to 31.
- Claim: the two chapters are not yet linked from the sidebar. **true as of that date**; they were linked the next day, which the 2026-09-17 entry records. `prerequisite-graph.yaml` line 343.

---

## 2026-09-17

### 1. Introduction to Stage 0 opens Stage 0

- Claim: the page opens Stage 0 and the Stage 0 sidebar entry lands on it. **true.** `edu-site/sidebars.ts`; `history/prompts/general/0107-*.prompt.md`.
- Claim: it says what Stage 0 covers, grouped into five stretches. **true.** `edu-site/docs/ch00-introduction.md` lines 17 to 36.
- Claim: what you will be able to do at the end. **true.** `ch00-introduction.md` line 38.
- Claim: what it costs, nothing to install, nothing to buy, no account. **true.** `curriculum-state/ledgers/prerequisite-graph.yaml` line 441.
- Claim: why checking an AI's work cannot be handed to the machine. **true.** `ch00-introduction.md` line 44.
- Claim: an honest note that there is no quiz and no certificate. **true.** `ch00-introduction.md` line 42.
- Claim: the real credentials are Stage 2's CS50P and CS50W. **true as of that date**, superseded on 22 September. `_scratch/backup-2026-09-20-rules-rewrite/docs/ch00-introduction.md` line 42.
- Claim: it closes by handing the reader into `/ch01-foundations`. **true.** `ch00-introduction.md` line 107.
- Claim: naming the traffic light and the telegraph key that chapter opens on. **true as of that date**; the chapter opens on a torch since the 2026-09-20 rewrite, which that entry records. `_scratch/backup-2026-09-20-rules-rewrite/docs/ch01-foundations.md` line 25.

### 2. Full Name-First pass on the Stage 0 introduction

- Claim: it names itself the first of five stages. **true as of that date**, superseded on 22 September. Backup `docs/ch00-introduction.md` line 15 ("the first of five stages").
- Claim: the stage runs in the order computing developed, each idea after the problem that produced it. **true.** `ch00-introduction.md` line 50.
- Claim: it links Spec-Driven Engineering to the glossary where the four-step workflow is named. **true.** `ch00-introduction.md` line 36; `glossary.md` line 33.
- Claim: it points at the stage's last chapter for the practice in full. **true.** `ch00-introduction.md` line 36.
- Claim: it asks readers to take the chapters in order. **true.** `ch00-introduction.md` line 52.

### 3. The two new chapters linked from the sidebar

- Claim: both are now linked from the sidebar, at the end of Stage 0's list. **true.** `edu-site/sidebars.ts`.
- Claim: the original five chapters stay where they were, nothing removed or reordered, both sequences reachable. **true.** `sidebars.ts`; `history/prompts/general/0107-*.prompt.md`.

### 4. Stage 1's six chapters back to placeholder

- Claim: the six chapters are back to placeholder. **true.** `edu-site/docs/stage-01-sde-mastery-ai-driven/01-foundations.md` and its five siblings (`chapter_state: "placeholder"`); `edu-site/src/data/chapterManifest.ts`.
- Claim: they had shipped text-ready on 2026-09-11. **true.** `history/prompts/general/0058-stage-1-parallel-authoring.general.prompt.md` (`date: 2026-09-11`) and its outcome lines.
- Claim: the site now shows the same "content to be added when the video series is recorded" note on them that the stage's index carries. **WRONG.** Only `stage-01-sde-mastery-ai-driven/index.md` line 15 carries that note; the six chapter pages are bare stubs (frontmatter and one heading). The pre-change snapshot `_scratch/backup-2026-09-20-rules-rewrite/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md` shows bare stubs too, so the note was never on them.

### 5. The two chapters given orientation blocks

- Claim: both now open with an orientation instead of dropping straight into a section. **true.** `history/prompts/general/0111-*.prompt.md`.
- Claim: each says why its subject arrives now, lists the steps it moves through, and names what you will be able to do at the end. **true.** Backups `docs/ch01-foundations.md` lines 15 to 21 and `docs/ch02-programming-is-born.md` lines 15 to 22.
- Claim: the dates and full names that had piled up in the prose are gone where the story carries the point without them. **true.** `0111-*.prompt.md` ("dates cut from 16 to 2 and 5 to 1").
- Claim: the run of paragraphs that each opened on a bolded sentence now reads as ordinary prose. **true.** `0111-*.prompt.md` ("bolded paragraph openings from 55% to 4% and 84% to 9%").
- Claim: the teaching is unchanged; the traffic light, the loom, the three switch bodies, the rewiring of ENIAC and FORTRAN are all still there. **true.** `0111-*.prompt.md`; backups of both chapters.

---

## 2026-09-20

### 1. Why this book cards

- Claim: the four cards are now cards. **true.** `edu-site/src/pages/index.tsx` (the `FEATURE_PILLARS` block) and `edu-site/src/components/Aceternity/FeatureGrid.tsx`.
- Claim: they had no styling at all, so the headings and paragraphs ran together as one column. **true.** `history/prompts/general/0123-*.prompt.md` ("no CSS anywhere in the repo").
- Claim: each is a raised panel with a lit top edge, its number large and faint, and its icon in a small raised chip. **true.** `0123-*.prompt.md`.
- Claim: the number is what identifies a card. **CANNOT CONFIRM, and contradicted.** `index.tsx` line 59 states the opposite emphasis ("label-first identity").
- Claim: the four top edges step from light grey to black down the same silver ramp the stages use. **true.** `custom.css` lines 126 to 129 (`--tbb-feature-1..4`).
- Claim: moving the pointer over a panel brings a soft light with it. **true.** `0123-*.prompt.md`.

### 2. `ch01` and `ch02` rewritten

- Claim: both open by welcoming you and saying what the chapter covers and why it matters, then move into the teaching gradually. **true.** `edu-site/docs/ch01-foundations.md` lines 15 to 23; `ch02-programming-is-born.md` lines 15 to 23.
- Claim: one everyday thing carries each chapter, a torch in the first and a tireless helper with no judgment in the second. **true.** `ch01-foundations.md` line 29; `ch02-programming-is-born.md` line 29; `prerequisite-graph.yaml` line 674.
- Claim: a transistor is now "a tiny piece of specially treated crystal", not "a sliver of treated germanium". **true.** `ch01-foundations.md` line 89; `prerequisite-graph.yaml` line 626.
- Claim: the history, the loom, the three kinds of switch, the rewiring of ENIAC and FORTRAN are all still there. **true.** `ch01-foundations.md` lines 61, 83 to 95; `ch02-programming-is-born.md` line 26 and the FORTRAN section.

### 3. Chapter and section titles

- Claim: "Yes, No, and Nothing In Between" is now "Why a Computer Only Says Yes or No". **true.** Backup `docs/ch01-foundations.md` line 23; `ch01-foundations.md` line 27.
- Claim: the sidebar's "1. Foundations" is now "1. How a Machine Holds a Number". **true.** `ch01-foundations.md` line 2 in the backup and in the live file.
- Claim: the sidebar's "2. Programming Is Born" is now "2. How People Told a Machine What to Do". **true.** `ch02-programming-is-born.md` line 2 in the backup and in the live file.

### 4. Stage 0's name

- Claim: it was "Orientation Through Computing History". **true.** `curriculum-state/canon/thesis.md`; `curriculum-state/canon/naming.md` line 171.
- Claim: it is now "Introduction to Computing: From Switches to AI Agents". **true as of that date**, superseded on 22 September by "Introduction to SDE". `naming.md` line 221; `course-structure.md` section 5.

### 5. Bold-every-first-sentence style

- Claim: from 16 September, the opening sentence of almost every paragraph was set in bold. **true.** `curriculum-state/canon/corrections.md` line 267 ("applied to 662 paragraphs").
- Claim: the intention was to make a page easier to scan. **CANNOT CONFIRM.** No file states that intention; the record shows only that the convention was later rejected (`corrections.md` line 269).
- Claim: bold now marks what matters, wherever in a paragraph it falls. **true.** `corrections.md` lines 273 to 274.
- Claim: pages are made easier to scan with bullets, tables and shorter sections instead. **true.** `corrections.md` line 275.

### 6. Glossary

- Claim: entries used to carry notes written for the book's own authors, "Beginner · Summary" and "Advanced · Detailed". **true.** Backup `docs/glossary.md` lines 16, 22, 28.
- Claim: those notes are gone. **true.** `edu-site/docs/glossary.md` lines 16, 22, 28.
- Claim: each entry now says where in the book you first meet the term. **true.** `glossary.md` line 16.

---

## 2026-09-21

### 1. Welcome page stage names and safety floor

- Claim: the Welcome page now names the five stages exactly as the site does. **true as of that date**; the site and the page both say three stages since 22 September, which that entry records. `history/prompts/general/0126-*.prompt.md`; backup `docs/welcome.md` line 71.
- Claim: the page said "Foundations" where the sidebar and footer said "Spec-Aware Vibe Engineering Foundations". **true.** Backup `docs/welcome.md` line 43; `naming.md` line 222.
- Claim: all of them now agree. **true as of that date.** `0126-*.prompt.md`.
- Claim: the plain-words safety-floor box now sits on the Welcome page. **true.** `edu-site/docs/welcome.md` lines 38 to 40.
- Claim: the plain-words safety-floor box is the one the chapters carry. **WRONG.** No chapter carries that wording: `ch00-introduction.md` lines 46 to 48 carries the original wording ("unverified by construction"), and `intro-1` to `intro-5` carry their own topic floors. The rule exists in `curriculum-state/canon/thesis.md`, but no chapter page implements it.
- Claim: one note under "How to read this book" was rewritten in plain words. **true.** Backup `docs/welcome.md` line 79; `history/prompts/general/0125-*.prompt.md`.
- Claim: the closing section is now titled "Start reading" instead of "Ready?". **true.** Backup `docs/welcome.md` line 103; `welcome.md` line 107.

---

## 2026-09-22

### 1. The course has three stages

- Claim: the three stages, named. **true.** `edu-site/sidebars.ts`; `edu-site/src/lib/stages.ts`; `curriculum-state/canon/course-structure.md` CS-13, CS-14, CS-15.
- Claim: agentic AI is taught inside software engineering rather than as a stage of its own. **true.** `course-structure.md` CS-12.
- Claim: directing coding agents is learned alongside the engineering. **true.** `edu-site/docs/stage-01-sde-mastery-ai-driven/index.md` line 11.
- Claim: building them properly is what Stage 2 is for. **true.** `course-structure.md` CS-15.
- Claim: every stage list on the site, the sidebar, the footer, the homepage cards, the Welcome page and the FAQ, now says the same three things in the same order. **true.** `sidebars.ts`; `docusaurus.config.ts` footer links; `edu-site/src/pages/index.tsx`; `edu-site/docs/welcome.md` lines 46 to 48; `edu-site/docs/faq.md` lines 39 to 43. Cosmetic labels differ, names and order do not.

### 2. The CS50 credential pages are off the site

- Claim: the credential pages are off the site. **true.** `edu-site/parked/credentials-track/index.md` is the only copy and sits outside `docs/`; `edu-site/static/search-index.json` has no CS50 route.
- Claim: Credentials is no longer a stage, is a separate track, and is switched off for now. **true.** `course-structure.md` CS-16; `edu-site/docs/faq.md` line 44; `edu-site/docs/welcome.md` line 50.
- Claim: everything the two certificates are, what they cost, and what they are worth is still answered in the FAQ. **PARTLY CANNOT CONFIRM.** `faq.md` line 33 answers what they are and what they cost (free to audit, the verified certificate optional and paid). No section states what they are worth to you.

---

## Summary

- Entries audited: 37, across 7 dates. Claims checked: 164.
- Claims true: 151.
- Claims wrong: 4, all fixed:
  1. 2026-09-14, that every chapter and lesson carries a Theory or Practice label. No chapter carries one; only the label system was built. Fixed by stating what shipped: the label exists, and no chapter carries one yet.
  2. 2026-09-16, that the side margins are "less than half the size they were". They are about 30% smaller, 119px to 84px at 1440px. Fixed to say about 30%.
  3. 2026-09-17, that the "content to be added when the video series is recorded" note appears on the six Stage 1 chapters. It appears only on that stage's index page; the six chapter pages are empty. Fixed.
  4. 2026-09-21, that the plain-words safety-floor box is "the one the chapters carry". No chapter carries that wording. The clause is gone; the half that is true, the box on the Welcome page, stays.
- Claims that cannot be confirmed: 9. Each was removed or reshaped:
  1. 2026-09-15, that the founding claim and the checking section both sit "inside the first screen". Removed.
  2. 2026-09-15, that all the reading text stepped down "20%". Removed.
  3. 2026-09-15, the 17.28px section heading next to 17px body text, and the reason clause built on it. Removed.
  4. 2026-09-15, the four-level pixel ladder (13.6px, 17.28px, 24.32px, 31.68px): 24.32px is recorded elsewhere and the other values are not, so the numbers went together and the reader-facing point stayed.
  5. 2026-09-15, that the chapter title had fallen "within 3%" of a section heading. Removed.
  6. 2026-09-14, that a reader can tell at a glance whether a page teaches a concept or walks through doing something. Removed: nothing carries the label yet.
  7. 2026-09-20, that the stated intention of the bold rule was "to make a page easier to scan". Removed.
  8. 2026-09-20, that "the number is what identifies a card". Contradicted by the component's own note; removed.
  9. 2026-09-22, that the FAQ states "what they are worth to you". It states what they are and what they cost; the clause is gone.
- Two further statements were unconfirmable and were fixed rather than deleted, because part of each is true: the 2026-09-21 safety-floor clause and the 2026-09-14 label claim. They are counted under the wrong claims above.
- Two claims stay as dated history rather than as a current state, and were reworded into the past tense so the page cannot be read as claiming they are true today: the two chapters "not yet linked from the sidebar" (2026-09-16) and the line length of about 70 characters (2026-09-16). Both were true on their date, and the page records what replaced them.
- One internal name was replaced with its plain description on the page: "Reading and Understanding Literacy", which canon says must not be put in front of a reader (`thesis.md`, "These are internal names, not reader-facing ones").
- Nothing that shipped was added. Nothing true was deleted: every one of the 37 entries that was on the page is still on the page, under the same date.
