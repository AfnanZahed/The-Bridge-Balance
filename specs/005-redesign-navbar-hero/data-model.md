# Data Model: Navbar + Hero Redesign

**Feature**: `005-redesign-navbar-hero`
**Date**: 2026-08-19

## Scope statement

This is a presentation and static-search feature. No database entities, API
endpoints, user records, migrations, or persistent user preferences are added.

## Presentation entities

| Entity | Contents | State/contract |
|---|---|---|
| Centered navbar | Left navigation, centered brand, right actions | Desktop and mobile variants; theme-aware; sticky without layout shift |
| Brand group | Logo mark + site title | Centered on desktop; compact in mobile bar; title ellipsizes |
| Navigation group | Curriculum link + search trigger | Curriculum active state; search trigger opens keyboard-accessible results |
| Action group | GitHub link + color-mode toggle | Shared 44px geometry, material, radius, focus ring |
| Search index | Static records `{title, headings, content, route}` | Generated from curriculum docs; read-only client-side data |
| Search panel | Query input + ranked result list | Closed/open/empty/loading states; Escape closes; Enter selects result |
| Hero mesh | CSS radial-gradient layers + no raster payload | Light/dark token variants; reduced-motion is static |
| Hero content | Mark, eyebrow, headline, subtitle, CTAs, meta row | Preserves approved copy; responsive stack; theme-aware |

## Search index schema (static)

```text
SearchRecord
- title: string          # required, displayed result title
- route: string          # required, absolute site-relative destination
- headings: string[]     # optional extracted H1–H6 text
- content: string        # optional normalized searchable body text
- excerpt: string        # optional short result preview
```

### Search rules

- Records are unique by `route`.
- Only public curriculum documents are indexed; generated/build artifacts,
  API files, hidden files, and non-document assets are excluded.
- Query matching is case-insensitive and whitespace-normalized.
- Empty queries show no results (the panel may show a short hint).
- Results are deterministic: title matches rank before heading matches, then
  body matches; ties retain source order.
- A result always navigates to its `route`; no arbitrary URL is accepted from
  user input.

## UI state transitions

```text
Search: closed → open → loading → results | empty → closed
Theme: light ↔ dark (geometry invariant)
Mobile drawer: closed ↔ open (page layout invariant)
Hero motion: animated → static under prefers-reduced-motion
Focus: unfocused → focus-visible (outline does not affect layout)
```

## Validation constraints

- Interactive navbar and hero controls: rendered hit area ≥ 44×44 CSS px.
- Search input has an accessible label and results use listbox/option semantics
  or an equivalent keyboard-navigable pattern.
- Search panel is clipped within the viewport at mobile widths.
- Mesh layers have a solid background fallback and do not obscure readable text.
