# Navigation Contract — `006-storytelling-intro`

**Purpose**: specify the *page-as-Docusaurus-page* surface. The rewrite touches only the body of the page; the site's navigation, hero, sidebar, build pipeline, and other components are out of scope.

---

## 1. Page route

| Field | Value |
|-------|-------|
| File | `edu-site/docs/intro.md` |
| Generated route | `/intro` (Docusaurus default from filename) |
| Route change | None. The URL MUST stay `/intro`. |
| Sidebar entry | `Introduction` (the existing sidebar_label) |

---

## 2. Frontmatter (Docusaurus)

The YAML frontmatter at the top of `intro.md` MUST contain at least the following keys:

| Key | Value |
|-----|-------|
| `sidebar_label` | `"Introduction"` (unchanged) |
| `sidebar_position` | `0` (unchanged — first in sidebar) |
| `title` | A title that reflects the new narrative. The implementation chooses between `"Introduction — Why This Book Exists"` (current) and a sharpened alternative. The chosen value MUST reflect the story-led rewrite (e.g. `"Introduction: The Bridge Between Code and Engineering"` is acceptable). |
| `description` | A short description suitable for SEO/og. Candidate: `"A 30-minute story of how AI coding agents split the industry into two extremes — and the bridge between them."` |
| `chapter_state` | One of `"text-ready"` or `"video-published"`. The Introduction is text-first per Constitution III; `"placeholder"` is forbidden. |

Frontmatter is otherwise unchanged. No new keys.

---

## 3. Sidebar order

`intro.md` is `sidebar_position: 0` — the **first** item the in site's sidebar. Its sibling `introduction.md` is `sidebar_position: 1` ("Welcome"). **This order MUST NOT change.**

The hero on the homepage (feature `005-redesign-navbar-hero`) carries the site's marketing surface; the Introduction page is the deeper read.

---

## 4. Internal links

The page links to internal routes as follows. **These are the only internal links the page is allowed to have on the CTA beat.** Other internal links (e.g. to Stage 2, 3, 4) are permitted in the Bridge beat but MUST point to existing routes.

| Beat | Link target | Text |
|------|-------------|------|
| CTA | `/stage-01-spec-aware-vibe-engineering/` | "Start Stage 1: Spec-Aware Vibe Engineering →" (or a sharpened equivalent) |
| Bridge (optional) | `/stage-03-mastering-ai-coding-agents/` | only if a path-skip is named in the who-this-is-for block |
| Bridge (optional) | `/stage-04-engineering-autonomous-ai-agents/` | only if a path-skip is named in the who-this-is-for block |

**No external links** beyond the Sources section (citations). No links to social, podcasts, video, or commerce.

---

## 5. Outbound links (Sources section)

The consolidated Sources section MAY contain outbound links. Rules:

- URLs MUST be working as of the ship date (SC-012).
- URLs MUST be the canonical publisher URL, not a tracker / redirect.
- Links open in the same tab by default (Docusaurus markdown convention).

---

## 6. Images / video / audio / interactive

**None.** The rewrite is text-only. No new image assets, no new videos, no audio, no embedded iframes.

The existing site-wide hero (`HomepageHero`) and the introduction's `BrandMark` glyph (carried over from feature `002-apple-design`) are out of scope.

---

## 7. Markdown / MDX

The page is plain Markdown (`.md`). It MAY use Docusaurus Markdown directives that are already used in the current `intro.md`:

- `> ` blockquotes for emphasis
- `## ` / `### ` headings
- `[text](url)` links
- Tables (`| header | header |`)

It MUST NOT introduce:

- React component imports
- JSX
- Custom shortcodes

If the writer needs a "30 min read" badge, it is a plain text line (per the Content Contract §6), not a custom component.

---

## 8. Build

- `cd edu-site && npm run build` MUST exit 0.
- The site MUST generate without warnings about broken markdown, invalid frontmatter, or missing images.
- The site's `npm run check:frontmatter` (run by the build script before `docusaurus build`) MUST pass for `intro.md`.

---

## 9. Search index

`edu-site/scripts/generate-search-index.mjs` (from feature `005-redesign-navbar-hero`) walks `edu-site/docs/**/*.md*` and generates `edu-site/static/search-index.json`. The build script `npm run build` runs the indexer before `docusaurus build`. The new `intro.md` is automatically indexed.

The implementation does NOT manually edit `search-index.json`; the build does it.

---

## 10. Backward compatibility

- The page's existing URL (`/intro`) MUST stay the same.
- The page's existing `sidebar_label` (`"Introduction"`) MUST stay the same.
- The page's existing `sidebar_position` (`0`) MUST stay the same.
- The page's existing role (the first thing a new reader sees in the sidebar) MUST stay the same.

External links pointing to `/intro` continue to resolve. The page's permalink is stable.

---

## 11. Out of scope for this contract

- Changes to `docusaurus.config.ts` (no config changes are required).
- Changes to the sidebar plugin / theme.
- Changes to the homepage, hero, navbar, or footer.
- Changes to `package.json` / `scripts/` (the existing build pipeline is reused).
- New routes, new pages, new translations.

---

## 12. What "complete" means at ship

The page is ship-ready on the navigation axis when **all** of the following are true:

- `edu-site/docs/intro.md` is the only file changed.
- Frontmatter is valid; `chapter_state` is `"text-ready"` or `"video-published"`.
- The page renders at `/intro` and appears at sidebar_position 0.
- All internal links resolve.
- All outbound source URLs work (no 404s).
- `cd edu-site && npm run build` exits 0 with no new warnings.
- `edu-site/static/search-index.json` is regenerated and the new prose is searchable.