# Data Model: Apple-Inspired Theme Transformation

**Feature**: `002-apple-design`  
**Source**: [spec.md](./spec.md)

This feature introduces no persisted business data. The model describes the visual
entities and their validation rules.

## Design Token

A semantic visual value shared across components and theme modes.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `name` | string | yes | Stable `--tbb-*` identifier. |
| `category` | enum | yes | `color`, `typography`, `spacing`, `elevation`, `shape`, `motion`, `focus`. |
| `lightValue` | CSS value | yes | Must render in light mode. |
| `darkValue` | CSS value | yes | Must render in dark mode. |
| `fallback` | CSS value | conditional | Required for blur, font, WebGL, or remote-asset dependent effects. |
| `usage` | string | yes | Documents allowed semantic role. |

## Surface

A visually grouped region with shared appearance states.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `id` | string | yes | Stable class/component target. |
| `role` | enum | yes | `hero`, `card`, `navbar`, `sidebar`, `callout`, `chart`, `code`, `footer`. |
| `modeStates` | ThemeModeState[2] | yes | Must define light and dark states. |
| `fallback` | string | yes | Must describe behavior when blur/assets/animation are unavailable. |
| `motionPolicy` | enum | yes | `static`, `entrance-only`, or `none`. This feature defaults to `static` except retained entrance reveals. |

## ThemeModeState

A mode-specific rendering contract for a surface.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `background` | token reference | yes | Must be explicit, never transparent-only. |
| `text` | token reference | yes | Must meet the selected contrast target. |
| `separator` | token reference | conditional | Use only where alignment/data requires it. |
| `shadow` | token reference | conditional | Prefer soft elevation over hard borders. |
| `focus` | token reference | yes | Must remain visible in this mode. |

## StageAccent

A muted categorical identity marker, not a general UI accent.

| Stage | Semantic name | Light family | Dark family | Usage |
|---:|---|---|---|---|
| 1 | Foundations | muted teal | muted teal-light | Stage labels, icons, categorical legend only. |
| 2 | Credentials | muted ochre | muted ochre-light | Stage labels, icons, categorical legend only. |
| 3 | Coding agents | muted lilac | muted lilac-light | Stage labels, icons, categorical legend only. |
| 4 | Autonomous agents | dusty rose | dusty rose-light | Stage labels, icons, categorical legend only. |

Saturated legacy values must not remain as general chrome after migration.

## InteractionState

| State | Required behavior |
|---|---|
| `default` | Neutral surface and readable label. |
| `hover` | Subtle elevation or tonal shift; no layout shift. |
| `focus-visible` | Visible Apple-blue ring with offset; not color-only. |
| `active` | Apple-blue semantic indicator and stable geometry. |
| `disabled` | Reduced emphasis while retaining perceivable text/control boundary. |
| `current-page` | Sidebar/nav state readable in light and dark modes. |

## Theme Transformation Lifecycle

1. **Token audit** — map existing variables to semantic Apple-grade tokens.
2. **Mode parity** — define light/dark values and fallbacks for every shared surface.
3. **Surface migration** — apply tokens without changing routes/content contracts.
4. **Motion removal** — remove Lenis, GSAP, R3F runtime paths; retain entrance-only reveals.
5. **Fidelity verification** — inspect desktop/mobile, keyboard, reduced-motion, blur fallback, and forced colors.

## Invariants

- No persisted records or API schema changes.
- No Apple proprietary assets or fonts.
- No page-level horizontal overflow.
- No essential content depends on animation, WebGL, blur, or remote decorative assets.
- Chart meaning remains available through labels and values without color perception.
