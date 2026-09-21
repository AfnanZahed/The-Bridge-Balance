---
id: 0087
title: Restyle markdown tables as raised cards
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["css", "tables", "design", "apple-design-purity", "welcome-page"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/css/custom.css (the `## Tables` block rewritten: border-collapse switched from collapse to separate + border-radius + overflow:hidden so the table clips to a rounded card; header restyled from bold-on-grey to the site's existing small-caps eyebrow treatment; row hover highlight added)
 - edu-site/docs/changelog.md (new bullet under the existing 2026-09-15 date)
 - history/prompts/general/0087-restyle-markdown-tables-as-raised-cards.general.prompt.md (this file)
tests:
 - Dev-server preview + `javascript_tool` computed-style check on the live DOM, both themes: confirmed 16px border-radius, `border-collapse: separate`, `overflow: hidden`, the card box-shadow, and the header's uppercase/letterspaced/small-caps styling actually apply, in both light (`oklch(0.965 ...)` card background) and dark (`oklch(0.15 ...)`) — not just written in the stylesheet, since a screenshot render wasn't available this turn (browser pane not painting)
 - `npm run lint` (biome) — 58 pre-existing errors elsewhere in `src/` (unrelated, e.g. `Root.tsx` formatting), zero touching `custom.css`; confirmed via `grep -i "custom.css"` on the lint output
 - `preview_logs` on the running dev server — only a harmless webpack pack-cache warning, no CSS parse error, confirming the hot-reloaded stylesheet is syntactically valid
 - Grepped `edu-site/docs/**/*.md` for pipe-table syntax before shipping, to see the change's real blast radius: found tables already live in `intro-4-terminals-and-cli-agents.md`, `intro-5-spec-driven-engineering.md`, `stage-01.../02-core-programming.md`, and `stage-01.../04-backend.md`, not just `welcome.md`; read their row shapes (including a blank first header cell, and inline-code cells) to confirm none would render oddly under the new rules
---

## Prompt

"Is there any other beautiful shape of the table possible in our platform? because this table is very very ugly and clearly seems like vibe coded.If yes, then make it really beautiful."

## Response snapshot

Read `edu-site/src/css/custom.css`'s existing `## Tables` block before touching anything — it turned out to be a genuinely minimal, default-shaped ruleset: `border-collapse: collapse`, plain bottom-hairline rows, a flat bold-on-grey header. With `border-collapse: collapse`, `border-radius` is a no-op in every browser, so the table rendered as a square, borderless-feeling grid sitting loose in the text column — exactly the generic look the owner was reacting to, and a real gap next to the rest of the page's actually-designed surfaces (callouts, code blocks, cards all already read as "raised" via the same token system).

Confirmed this is a platform/CSS task, not a content one: the "only Callout and StageBanner in a chapter body" rule blocks adding a JSX wrapper or per-chapter markup, and even if it didn't, hand-wrapping one table in raw HTML would only fix that one instance and drift out of sync the next time a chapter added a table. A global rule in `custom.css` fixes every table on the site at once and matches the project's own "match the tokens already there" instruction.

Redesigned the table to read as a raised card, reusing only pre-existing design tokens (no new colors or values introduced):
- `border-collapse: separate` + `border-spacing: 0` + `border-radius: var(--tbb-radius-lg)` + `overflow: hidden` — the actual fix; this is the standard technique for a table whose corners clip properly, which `collapse` cannot do.
- `background: var(--tbb-bg-alt)`, a `var(--tbb-border)` hairline frame, and `box-shadow: var(--tbb-shadow-sm)` — the same "structured content" surface treatment the CSS's own comments already describe callouts and tables as sharing.
- The header dropped the bold-on-solid-grey block look and now reuses the site's existing eyebrow/kicker typographic role verbatim (0.6875rem, uppercase, 650 weight, 0.06em letter-spacing, muted color) — the same treatment the chapter masthead's kicker already uses, so a table's header and the page's own chrome read as the same design system rather than two unrelated ones.
- Row hover now highlights via `var(--tbb-surface-emphasis)`, the same "where you might go" hover signal already used on the sidebar and TOC links.

Verified functionally rather than by eye, since the browser pane wasn't painting screenshots this turn (confirmed via a failed `computer` screenshot and the tool's own "does not need to be displayed" guidance): queried `getComputedStyle` on a live table in both the dark theme (the page's default here) and light theme (toggled `data-theme` via `javascript_tool`, read computed values, reverted) to confirm every rule actually resolved to real, sane values in both — not just that the CSS parsed. Then grepped the whole `docs/` tree for other pipe-tables before calling this done, since a sitewide CSS rule's blast radius includes chapters this conversation never touched; found four more, read their row shapes, and confirmed none would render oddly (a blank header cell renders as an empty tinted cell, which is a normal pattern, not a defect).

## Outcome

- ✅ Impact: Every table on the site — the two just added to `welcome.md` and four more already live in shipped chapters — now renders as a rounded, shadowed card with a typographically consistent header and a row hover state, instead of a bare default grid. No markdown or MDX content changed; the fix is entirely in the shared stylesheet, so any future chapter's table inherits it automatically.
- 🧪 Tests: See `tests:` above.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: None raised. If the owner later adds a much wider table (many columns, dense numeric data) somewhere in the book, the current CSS doesn't add a horizontal-scroll wrapper — it relies on normal text wrapping stayin within `width: 100%`, which held for every table checked here but hasn't been stress-tested against a genuinely wide one.
- 🧠 Reflection: The complaint ("vibe coded") was a fair, specific diagnosis once traced to its cause — `border-collapse: collapse` silently disabling `border-radius` is a common reason a table looks like an unstyled default even when someone did write CSS for it. The fix was small (one property changed, plus reusing existing tokens) but the *look* changes completely, which is a good sign the original problem really was "the wrong CSS property," not "needs a lot more CSS."

## Evaluation notes (flywheel)

- Failure modes observed: none in the shipped result. The browser pane's screenshot capability was unavailable for this whole turn (returned blank/black or timed out every attempt), which would have blocked verification entirely if computed-style inspection via `javascript_tool` weren't a reliable fallback — worth remembering as the default verification path when a screenshot won't render.
- Graders run and results (PASS/FAIL): `npm run lint` — PASS (zero new errors; pre-existing unrelated errors confirmed not to touch the edited file). Live computed-style check, light + dark — PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): if a future table in this book turns out to be wide enough to risk horizontal overflow on a phone, revisit whether `table-layout` or an `overflow-x` rule is needed — not added pre-emptively here since no shipped table currently needs it.
