# Data Model: Hamburger Drawer Rebuild

**Branch**: `001-hamburger-rebuild`
**Stage**: Phase 1 — Design & Contracts
**Source**: Entities and requirements from `spec.md`.

This feature is a presentational rebuild with one piece of client-side state. There are no persistence, transport, or schema concerns. The data model below describes the runtime state shape, the entities that the UI consumes, and the lifecycle of the drawer's open/closed state.

---

## Entities

### Hamburger Button

| Attribute | Type | Notes |
|---|---|---|
| `isOpen` | `boolean` | Mirrored from `useDrawer()`; drives `aria-expanded` and the icon glyph. |
| `label` | `'Open menu' \| 'Close menu'` | Derived from `isOpen`. |
| `clickTargetSize` | `≥ 44 × 44 px` | Enforced in CSS, asserted in US-3 / SC-001. |
| `focusable` | `true` | Native `<button>` element, no `tabindex` override. |

### Drawer

| Attribute | Type | Notes |
|---|---|---|
| `isOpen` | `boolean` | Mirrored from `useDrawer()`. |
| `topAnchor` | `'navbar' \| number (px)` | Defaults to `'navbar'`; resolves to the navbar's actual measured height to satisfy the "navbar may be taller than 60px" edge case. |
| `width` | `'full' \| 'panel'` | `'full'` on viewports < 768px; `'panel'` (≤ 320px capped at 82vw) at ≥ 768px. |
| `scrollLockActive` | `boolean` | True iff `isOpen === true`. Drives `<html data-drawer-open>`. |
| `lastFocusedTrigger` | `HTMLElement \| null` | Stored on open; restored on `Escape` close. |

### Backdrop

| Attribute | Type | Notes |
|---|---|---|
| `isOpen` | `boolean` | Mirrored from `useDrawer()`. |
| `pointerEvents` | `'auto' \| 'none'` | `'none'` while closed so it does not block clicks behind it. |
| `animationParity` | `true` | Drawer and backdrop share the same `prefers-reduced-motion` branch. |

### Navigation Entry

| Attribute | Type | Notes |
|---|---|---|
| `to` | `string` | Target route (`/`, `/docs/intro`, etc.). |
| `label` | `string` | Display text. |
| `isActive` | `boolean` | `pathname === to` (or `pathname.startsWith(to)` for parent routes). |
| `icon` | `ReactNode \| null` | Optional, drawn from the existing `edu-site/src/components/icons` set. |

The list of entries itself is the **same array the top navbar already renders**. The drawer does not introduce new taxonomy (FR-007).

---

## State Transitions

The drawer is a finite state machine with two states and five entry points:

```text
                open (button, Enter, Space, programmatic)
   ┌─────────────────────────────────────────────────────┐
   ▼                                                     │
[closed] ───────────────────────────────────► [open]    │
   ▲                                                     │
   │                                                     │
   └─────────────────────────────────────────────────────┘
                close (button, Enter, Space, Escape, backdrop click,
                       in-drawer link click, route change)
```

| Trigger | Transition | Source |
|---|---|---|
| Button click / `Enter` / `Space` | `closed → open` or `open → closed` | `SiteMenuButton` |
| Backdrop click | `open → closed` | `SiteDrawer` |
| In-drawer close affordance | `open → closed` | `SiteDrawer` |
| In-drawer link click | `open → closed` (then navigation) | `SiteDrawer` |
| `Escape` keydown | `open → closed` (focus returns to button) | `useDrawer` |
| Route change (Docusaurus router) | `open → closed` | `useDrawer` via `useLocation` effect |

Transitions are idempotent: dispatching `close` while already closed is a no-op.

---

## Validation Rules

- The drawer MUST NOT open while JavaScript is disabled (the button is `hidden` via `no-js` body class; progressive enhancement mirrors Docusaurus).
- The drawer MUST close itself before navigation commits, so the new page paints in the closed state (FR-012).
- The drawer MUST close and reset scroll lock before unmounting during route changes (avoids leak on rapid nav).
- The drawer MUST refuse to mount if `<html data-drawer-open>` is already true at hydration time (defensive; should not happen in practice).

---

## Out of Model (per spec "Out of Scope")

- Persisted "always open" preferences.
- Multi-instance drawers (e.g., one per section).
- Server-fetched navigation — entries are statically defined at build time, same as the existing navbar.
