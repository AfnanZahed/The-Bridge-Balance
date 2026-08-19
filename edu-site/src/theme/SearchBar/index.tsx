/**
 * SearchBar — client-side curriculum search.
 *
 * Fetches /search-index.json (generated at build time by
 * scripts/generate-search-index.mjs), debounces input, ranks results
 * (title → heading → body), and renders a keyboard-accessible results
 * dropdown. Returns the user to the chosen doc route on Enter / click.
 *
 * No external service. No new runtime dependency. Apple Pro tokens.
 *
 * Constitution alignment: preserves the WCAG contract (44×44 targets, focus
 * rings, reduced-motion, no layout shift) and uses only existing tokens.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";

type SearchRecord = {
  title: string;
  route: string;
  headings: string[];
  content: string;
  excerpt: string;
};

type ScoredResult = {
  record: SearchRecord;
  score: number;
  matchedHeading?: string;
  matchedSnippet?: string;
};

const MIN_QUERY = 1;
const DEBOUNCE_MS = 150;
const RESULT_LIMIT = 8;

function score(record: SearchRecord, query: string): ScoredResult | null {
  const q = query.toLowerCase();
  if (!q) return null;

  let score = 0;
  let matchedHeading: string | undefined;
  let matchedSnippet: string | undefined;

  const titleLower = record.title.toLowerCase();
  if (titleLower === q) score += 1000;
  else if (titleLower.startsWith(q)) score += 500;
  else if (titleLower.includes(q)) score += 250;

  for (const heading of record.headings) {
    const headingLower = heading.toLowerCase();
    if (headingLower === q) {
      score += 200;
      matchedHeading = heading;
      break;
    }
    if (headingLower.includes(q)) {
      score += 80;
      matchedHeading ??= heading;
    }
  }

  const contentLower = record.content.toLowerCase();
  const contentIdx = contentLower.indexOf(q);
  if (contentIdx >= 0) {
    score += 20;
    const start = Math.max(0, contentIdx - 40);
    const end = Math.min(record.content.length, contentIdx + q.length + 80);
    matchedSnippet = record.content.slice(start, end).trim();
    if (start > 0) matchedSnippet = "…" + matchedSnippet;
    if (end < record.content.length) matchedSnippet += "…";
  }

  return score > 0 ? { record, score, matchedHeading, matchedSnippet } : null;
}

export default function SearchBar(): React.ReactElement {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ScoredResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexLoaded, setIndexLoaded] = useState<Set<SearchRecord>>(new Set());
  const [indexLoading, setIndexLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const history = useHistory();

  // Lazy-load the index on first focus.
  const ensureIndex = useCallback(async () => {
    if (indexLoaded.size > 0 || indexLoading) return;
    setIndexLoading(true);
    try {
      const res = await fetch("/search-index.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: SearchRecord[] = await res.json();
      setIndexLoaded(new Set(data));
    } catch (err) {
      console.warn("SearchBar: failed to load search index", err);
    } finally {
      setIndexLoading(false);
    }
  }, [indexLoaded.size, indexLoading]);

  // Run the query with debouncing.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (q.length < MIN_QUERY) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    debounceRef.current = setTimeout(() => {
      const all = Array.from(indexLoaded);
      const scored: ScoredResult[] = [];
      for (const record of all) {
        const r = score(record, q);
        if (r) scored.push(r);
      }
      scored.sort((a, b) => b.score - a.score);
      setResults(scored.slice(0, RESULT_LIMIT));
      setActiveIndex(0);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, indexLoaded]);

  // Click outside closes the panel.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const navigate = useCallback(
    (route: string) => {
      setIsOpen(false);
      setQuery("");
      setResults([]);
      history.push(route);
    },
    [history],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const choice = results[activeIndex];
        if (choice) navigate(choice.record.route);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [results, activeIndex, navigate],
  );

  return (
    <div
      ref={containerRef}
      className="navbar__search-container"
      role="search"
    >
      <label htmlFor="tbb-search-input" className="sr-only">
        {translate({
          id: "theme.SearchBar.label",
          message: "Search the curriculum",
        })}
      </label>
      <input
        ref={inputRef}
        id="tbb-search-input"
        type="search"
        className="navbar__search"
        placeholder={translate({
          id: "theme.SearchBar.placeholder",
          message: "Search…",
        })}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          void ensureIndex();
          setIsOpen(true);
        }}
        onKeyDown={onKeyDown}
        autoComplete="off"
        spellCheck="false"
        aria-autocomplete="list"
        aria-expanded={isOpen && (query.length > 0 || results.length > 0)}
        aria-controls="tbb-search-results"
      />
      {isOpen && query.length > 0 && (
        <div
          id="tbb-search-results"
          className="navbar__search-panel"
          role="listbox"
        >
          {indexLoading && (
            <div className="navbar__search-status">
              {translate({
                id: "theme.SearchBar.loading",
                message: "Loading…",
              })}
            </div>
          )}
          {!indexLoading && results.length === 0 && query.length >= MIN_QUERY && (
            <div className="navbar__search-status">
              {translate({
                id: "theme.SearchBar.noResults",
                message: "No matches.",
              })}
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={r.record.route}
              type="button"
              role="option"
              aria-selected={i === activeIndex}
              className={
                "navbar__search-item" +
                (i === activeIndex ? " navbar__search-item--active" : "")
              }
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => navigate(r.record.route)}
            >
              <span className="navbar__search-item-title">{r.record.title}</span>
              {r.matchedHeading && (
                <span className="navbar__search-item-heading">
                  {r.matchedHeading}
                </span>
              )}
              {r.matchedSnippet && (
                <span className="navbar__search-item-snippet">
                  {r.matchedSnippet}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}