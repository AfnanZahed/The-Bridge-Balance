/**
 * useTocCollapse — the right rail's fold state.
 *
 * Lives with the swizzle that owns it (`src/theme/TOC`) rather than in a shared
 * components folder, because exactly one component reads it and nothing else
 * needs to know the rail is folded: the layout consequences are expressed in
 * CSS off the `<html>` attribute below, not by prop-drilling.
 *
 * That attribute is the whole interface to the rest of the page. Three things
 * depend on it, all in custom.css:
 *   - the TOC column narrows to the 44px rail,
 *   - the article column's `75%` cap lifts so the freed width can be used,
 *   - and therefore the prose measure grows, because it is a function of that
 *     column. Nothing else has to be told.
 *
 * Contract:
 *  - `collapsed` starts false, so the server-rendered markup and the first
 *    client render agree (the docs pages are pre-rendered).
 *  - A stored `sessionStorage` preference is applied in a LAYOUT effect, before
 *    the first paint. Not a `useState` initialiser — reading storage during
 *    render would make the client's markup disagree with the server's and React
 *    would discard the tree. Not a plain effect either — it is safe but paints
 *    the open panel and folds it a frame later, which reads as a flash.
 *  - `toggle()` remembers the choice for the session, so a reader who folds the
 *    rail for full-width prose keeps it across chapters. Storage failures are
 *    swallowed: privacy modes throw, and losing the memory is a far smaller
 *    problem than a broken toggle.
 *
 * Session, not local: a reader who folds the rail to read one chapter wide
 * should not find the TOC hidden in a tab they open next week. Same `tbb-` key
 * convention as SearchUXContext's `tbb-spotlight-seen`.
 */

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "tbb-toc-collapsed";

/**
 * `useLayoutEffect` on the client, `useEffect` on the server. React warns if
 * `useLayoutEffect` runs during SSR, and there is no paint to beat there.
 */
const useBeforePaint = ExecutionEnvironment.canUseDOM
  ? useLayoutEffect
  : useEffect;

export interface TocCollapseController {
  collapsed: boolean;
  toggle: () => void;
}

export function useTocCollapse(): TocCollapseController {
  const [collapsed, setCollapsed] = useState(false);

  // Restore the session preference. Runs before paint, so a folded rail is
  // folded in the first frame the reader sees.
  useBeforePaint(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") setCollapsed(true);
    } catch {
      // Storage can throw in privacy modes. Falling back to expanded is the
      // right degradation: the reader can still fold the rail, they just do
      // not get the memory.
    }
  }, []);

  // Mirror onto <html> for CSS. Also before paint, so the column, the cap and
  // the prose measure all move in the same frame the button state does.
  useBeforePaint(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    const root = document.documentElement;
    if (collapsed) root.setAttribute("data-tbb-toc-collapsed", "true");
    else root.removeAttribute("data-tbb-toc-collapsed");
  }, [collapsed]);

  const toggle = useCallback(() => {
    setCollapsed((current) => {
      const next = !current;
      try {
        sessionStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // See above.
      }
      return next;
    });
  }, []);

  return useMemo(() => ({ collapsed, toggle }), [collapsed, toggle]);
}
