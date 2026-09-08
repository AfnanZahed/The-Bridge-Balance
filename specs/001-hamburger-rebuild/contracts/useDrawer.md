# Contract: `useDrawer` Hook

**Branch**: `001-hamburger-rebuild`
**Stage**: Phase 1 — Design & Contracts
**Source**: Functional Requirements FR-003, FR-005, FR-006, FR-011, FR-012 from `spec.md`.

This is the only contract the hamburger rebuild introduces. It is the TypeScript surface every consumer in this feature agrees on.

---

## Module

```ts
// edu-site/src/components/SiteMenu/useDrawer.ts
export type DrawerTriggerSource =
  | 'button'
  | 'escape'
  | 'backdrop'
  | 'link'
  | 'route-change';

export interface DrawerController {
  isOpen: boolean;
  open: (source?: Exclude<DrawerTriggerSource, 'route-change'>) => void;
  close: (source?: DrawerTriggerSource) => void;
  toggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export function useDrawer(): DrawerController;
```

---

## Semantics

### `isOpen`

Current open/closed state. `false` at hydration. Reflected into:
- `<button aria-expanded>` on the hamburger.
- `<html data-drawer-open>` for CSS-driven scroll lock and backdrop pointer-events.
- The drawer's `aria-hidden` (inverted) and visibility classes.

### `open(source?)`

Transitions `closed → open`. Stores the current `document.activeElement` (when it is the trigger button) so `close('escape')` can restore focus.

- `source` is advisory only — it does not change behavior. It exists so logs / devtools can tell which surface closed the drawer.
- Calling `open` while already open is a no-op (idempotent).

### `close(source?)`

Transitions `open → closed`. Releases `<html data-drawer-open>`.

- When `source === 'escape'` and the trigger was the button, focus is restored to the trigger via `triggerRef.current?.focus()`.
- When `source === 'route-change'`, focus restoration is skipped (a new page is about to take focus).
- Calling `close` while already closed is a no-op.

### `toggle()`

Toggles `isOpen`. Equivalent to `isOpen ? close('button') : open('button')`.

### `triggerRef`

`RefObject<HTMLButtonElement>` to attach to the hamburger button. The hook owns the ref so `useDrawer` can restore focus without the button having to forward it.

---

## Side Effects

The hook installs the following effects on mount and removes them on unmount:

1. **`keydown` listener on `window`** — calls `close('escape')` when the key is `Escape` and `isOpen === true`. Listener is only attached while the drawer is open (avoids a permanent global listener).
2. **`useLocation` effect** (from `@docusaurus/router`) — calls `close('route-change')` whenever the pathname changes while the drawer is open. Satisfies FR-012.
3. **`<html data-drawer-open>` effect** — adds the attribute while open, removes it on close. Pure DOM mutation; no React re-render needed for the CSS side.
4. **`resize` listener on `window`** — while open, recomputes drawer geometry from the navbar's `getBoundingClientRect().bottom`. Satisfies FR-011 and the "taller navbar" edge case.

All effects are cleaned up on unmount and on `close`.

---

## Failure Modes

| Condition | Behavior |
|---|---|
| Hydration mismatch on `aria-expanded` | The hook always renders `false` on the server and the client first paint; mismatch is impossible. |
| `document` undefined (SSR import guard) | All side effects are gated behind `typeof window !== 'undefined'`. |
| Multiple components call `useDrawer()` independently | Each instance has its own state. By design, only one SiteMenuButton and one SiteDrawer exist per page. |

---

## Test Contract

| Assertion | How to verify |
|---|---|
| `isOpen` toggles on `toggle()` | `act(() => result.current.toggle()); expect(result.current.isOpen).toBe(true)` |
| `close('escape')` restores focus to the trigger | Render the button with `ref={triggerRef}`, open the drawer, fire `keydown` for `Escape`, assert `document.activeElement === button` |
| `<html data-drawer-open>` is set while open | After `open()`, `document.documentElement.getAttribute('data-drawer-open') === 'true'` |
| Route change closes the drawer | Mock `useLocation` to return two paths in sequence; assert `isOpen` flips to `false` |
| Body scroll is locked while open | `document.documentElement.style.overflow === 'hidden'` (driven by the CSS hook) |

---

## Out of Contract

- Animation timing. The drawer panel reads `prefers-reduced-motion` from CSS, not from this hook.
- The list of navigation entries. The hook is list-agnostic.
- Theme tokens. CSS owns them; the hook emits no styling primitives.
