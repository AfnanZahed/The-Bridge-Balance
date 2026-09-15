/**
 * SearchBar — the navbar's search entry, split by route.
 *
 *   - Home (`/`)      → a compact trigger button; the real surface is the
 *                       Apple Spotlight overlay owned by SearchUXProvider
 *                       (once-per-session auto-open, ⌘K, focus restore).
 *   - Everywhere else → the ExpandableSearchBar in the navbar's right slot.
 *
 * The decision lives here — the one place Docusaurus already routes the
 * navbar `search` item through (`@theme/SearchBar`, rendered inside
 * `@theme/Navbar/Search` by the swizzled Navbar/Content), so nothing else in
 * the navbar needs to know search changed.
 *
 * No window access at render, so the server HTML carries the trigger/bar.
 */

import { useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import ExpandableSearchBar from "@site/src/components/Search/ExpandableSearchBar";
import { useSearchUX } from "@site/src/components/Search/SearchUXContext";
import { Search } from "lucide-react";
import React from "react";

export default function SearchBar(): React.ReactElement {
  const { pathname } = useLocation();
  const { open } = useSearchUX();

  if (pathname === "/") {
    return (
      <button
        type="button"
        className="tbb-search-trigger"
        onClick={open}
        aria-label={translate({
          id: "theme.SearchBar.open",
          message: "Open search",
        })}
      >
        <Search size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
    );
  }

  return <ExpandableSearchBar expandDirection="left" />;
}
