/**
 * useDrawer — the single source of truth for the hamburger drawer state.
 *
 * Lives in `edu-site/src/components/SiteMenu/useDrawer.ts` together with the
 * `SiteDrawerContext` so a swizzled parent (`Navbar/Layout`) owns exactly one
 * instance and shares it with `SiteMenuButton` and `SiteDrawer` via React
 * context. No global store, no extra dependencies.
 *
 * Behavior contract (see specs/001-hamburger-rebuild/contracts/useDrawer.md):
 *  - `isOpen` toggles between false and true.
 *  - `open()` / `close()` / `toggle()` are idempotent.
 *  - `Escape` while open closes the drawer and returns focus to the trigger.
 *  - Route changes close the drawer (so destination pages paint closed).
 *  - Resizing re-measures the navbar so the drawer anchors to its real height.
 *  - `<html data-drawer-open="true">` is set while open; CSS hooks off it for
 *    scroll lock and backdrop pointer-events.
 */

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useLocation } from "@docusaurus/router";
import {
  createContext,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type DrawerTriggerSource =
  | "button"
  | "escape"
  | "backdrop"
  | "link"
  | "route-change"
  | "resize"
  | "programmatic";

export interface DrawerController {
  isOpen: boolean;
  open: (source?: Exclude<DrawerTriggerSource, "route-change">) => void;
  close: (source?: DrawerTriggerSource) => void;
  toggle: () => void;
  triggerRef: RefObject<HTMLButtonElement>;
  navbarHeight: number;
}

export const SiteDrawerContext = createContext<DrawerController | null>(null);

export function useSiteDrawer(): DrawerController {
  const ctx = useContext(SiteDrawerContext);
  if (!ctx) {
    throw new Error(
      "useSiteDrawer must be used within a SiteDrawerContext.Provider. " +
        "The provider is installed by the swizzled Navbar/Layout.",
    );
  }
  return ctx;
}

export function useDrawer(): DrawerController {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(60);

  const location = useLocation();

  // Measure the navbar so the drawer anchors to its real height, not a
  // hard-coded 60 px. Re-measure on resize and on every open/close.
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    const measure = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar instanceof HTMLElement) {
        const rect = navbar.getBoundingClientRect();
        const h = Math.max(0, Math.round(rect.bottom));
        setNavbarHeight(h);
        // Mirror the measured height into a CSS custom property so the
        // drawer's `height` formula in custom.css can use the live value
        // (the React state only drives the inline `top`; the height
        // formula references `--site-drawer-navbar-height`).
        document.documentElement.style.setProperty(
          "--site-drawer-navbar-height",
          `${h}px`,
        );
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isOpen]);

  // Reflect open state into <html> for CSS scroll lock + a11y parity.
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    const root = document.documentElement;
    if (isOpen) {
      root.setAttribute("data-drawer-open", "true");
    } else {
      root.removeAttribute("data-drawer-open");
    }
    return () => root.removeAttribute("data-drawer-open");
  }, [isOpen]);

  // Escape closes the drawer and returns focus to the trigger.
  useEffect(() => {
    if (!isOpen || !ExecutionEnvironment.canUseDOM) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        // Focus restoration runs after React commits the closed state.
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Focus containment while the drawer is open. The drawer advertises
  // `role="dialog"` + `aria-modal="true"`, so keyboard focus must stay
  // inside until the drawer closes. We do a minimal Tab/Shift+Tab wrap
  // over the focusable elements inside `#site-drawer`.
  useEffect(() => {
    if (!isOpen || !ExecutionEnvironment.canUseDOM) return;
    const drawer = document.getElementById("site-drawer");
    if (!drawer) return;
    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("aria-hidden"));
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Track the previous pathname so we only close on actual *changes*,
  // not on every render where `isOpen` toggles.
  const previousPathname = useRef(location.pathname);
  useEffect(() => {
    if (previousPathname.current === location.pathname) return;
    previousPathname.current = location.pathname;
    if (!isOpen) return;
    // Skip focus restoration on route change — the new page owns its own
    // initial focus target via Docusaurus's normal nav cycle.
    setIsOpen(false);
  }, [location.pathname, isOpen]);

  // When the drawer opens, move focus into it so keyboard users land in
  // the dialog (and so `aria-modal="true"` is honest). When it closes,
  // restore focus to the trigger — for every close path except route
  // change (the new page handles its own initial focus).
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    if (isOpen) {
      requestAnimationFrame(() => {
        const drawer = document.getElementById("site-drawer");
        if (!drawer) return;
        const closeBtn = drawer.querySelector<HTMLElement>(
          ".site-drawer__close",
        );
        (closeBtn ?? drawer).focus();
      });
    }
  }, [isOpen]);

  const open = useCallback((_source?: DrawerTriggerSource) => {
    setIsOpen((current) => {
      if (current) return current;
      return true;
    });
  }, []);

  const close = useCallback((source?: DrawerTriggerSource) => {
    setIsOpen(false);
    // Restore focus to the hamburger for every dismissal path. The route
    // change effect closes the drawer without invoking this callback.
    if (source !== "route-change") {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  return useMemo(
    () => ({ isOpen, open, close, toggle, triggerRef, navbarHeight }),
    [isOpen, open, close, toggle, navbarHeight],
  );
}
