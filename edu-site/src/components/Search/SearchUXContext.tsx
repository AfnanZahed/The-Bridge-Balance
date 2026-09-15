/**
 * SearchUXContext — the home Spotlight's controller, shared with the navbar.
 *
 * The swizzled SearchBar renders a small trigger on the home route and the
 * ExpandableSearchBar everywhere else. The bar owns its own open state, but
 * the Spotlight needs a controller that both the trigger button and the
 * keyboard can reach; this provider is that controller, and it owns the
 * home-only concerns:
 *
 *   - auto-open once per browser session (the mechanic the owner asked for —
 *     the site opens with its search), skipped when storage is unavailable
 *   - ⌘K / Ctrl+K toggling on the home route
 *   - focus restore: whatever was focused when the Spotlight opened is
 *     focused again on close
 *   - a scroll lock while the overlay is up, using the same html-attribute
 *     pattern the SiteMenu drawer uses
 *   - closing on route change, so a result picked mid-overlay leaves nothing
 *     stuck behind
 *
 * The Spotlight stays mounted on the home route (open or not) so its own
 * AnimatePresence can run the exit animation.
 */

import { useLocation } from "@docusaurus/router";
import { AppleSpotlight } from "@site/src/components/Search/AppleSpotlight";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SearchUX = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const SearchUXContext = createContext<SearchUX | null>(null);

const SESSION_KEY = "tbb-spotlight-seen";

export function useSearchUX(): SearchUX {
  const ctx = useContext(SearchUXContext);
  if (!ctx) {
    throw new Error("useSearchUX must be used inside <SearchUXProvider>");
  }
  return ctx;
}

export default function SearchUXProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  const rememberOpener = useCallback(() => {
    openerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  }, []);

  const open = useCallback(() => {
    rememberOpener();
    setIsOpen(true);
  }, [rememberOpener]);

  const close = useCallback(() => {
    setIsOpen(false);
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  // ⌘K / Ctrl+K — the Spotlight's keyboard summon (home route only; chapter
  // routes open their bar by click, by design).
  useEffect(() => {
    if (!isHome) return;
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isHome, toggle]);

  // Auto-open once per browser session. Storage can throw in privacy modes;
  // in that case the Spotlight simply waits for ⌘K or the trigger.
  useEffect(() => {
    if (!isHome) return;
    let seen: string | null = null;
    try {
      seen = sessionStorage.getItem(SESSION_KEY);
      if (!seen) sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return;
    }
    if (!seen) open();
  }, [isHome, open]);

  // A route change closes the overlay (no stuck state between pages).
  useEffect(() => {
    if (!isHome && isOpen) setIsOpen(false);
  }, [isHome, isOpen]);

  // Scroll lock while the overlay is up — same pattern as the SiteMenu drawer.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.setAttribute("data-search-open", "true");
    return () => root.removeAttribute("data-search-open");
  }, [isOpen]);

  const value = useMemo<SearchUX>(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  );

  return (
    <SearchUXContext.Provider value={value}>
      {children}
      {isHome && <AppleSpotlight isOpen={isOpen} onClose={close} />}
    </SearchUXContext.Provider>
  );
}
