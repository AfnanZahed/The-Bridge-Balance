/**
 * ExpandableSearchBar — the chapter pages' search surface.
 *
 * Ported from the owner's reference component. Kept as supplied: the 40px
 * collapsed circle, the spring expansion (stiffness 260 / damping 26), the
 * right-anchored growth used in the navbar's right slot
 * (`expandDirection="left"`), the animated left-aligned placeholder, the
 * 120ms focus delay, the submit affordance, and the "click outside with an
 * empty field collapses" rule. Mechanical substitutions only:
 *
 *   - Tailwind classes → CSS Modules on the existing --tbb-* tokens
 *   - `framer-motion` → the installed `motion/react`
 *   - the supplied file's accidentally duplicated effects are collapsed into
 *     one each (no visual change)
 *   - `onSearch` still fires on submit; on top of it, results render live
 *     from the shared engine in the same card language as the home Spotlight
 *   - the combobox/listbox keyboard handling (ArrowUp/ArrowDown/Enter,
 *     Escape) that the surface this replaces already carried
 *
 * The 40px circle is the reference's visual; an invisible ::after extends the
 * hit area to the site's 44 × 44 contract without moving a pixel.
 */

import { useHistory } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import SearchResultRow from "@site/src/components/Search/SearchResultRow";
import { StageGlyph } from "@site/src/components/stage-icons";
import {
  describeHit,
  useRankedResults,
  useSearchIndex,
} from "@site/src/lib/search";
import { stageNumberFromRoute } from "@site/src/lib/stages";
import clsx from "clsx";
import { FileText, Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

const COLLAPSED_SIZE = 40;

export type ExpandableSearchBarProps = {
  expandDirection?: "left" | "right";
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  defaultOpen?: boolean;
  width?: number;
};

/** Stage glyph for a stage route; a document glyph elsewhere. */
function routeIcon(route: string): React.ReactNode {
  const stage = stageNumberFromRoute(route);
  if (stage) return <StageGlyph stage={stage} size={24} aria-hidden="true" />;
  return <FileText size={24} strokeWidth={1.5} aria-hidden="true" />;
}

export default function ExpandableSearchBar(props: ExpandableSearchBarProps) {
  const {
    expandDirection = "right",
    placeholder = "Search…",
    onSearch,
    className = "",
    defaultOpen = false,
    width = 280,
  } = props;

  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const history = useHistory();
  const reduce = useReducedMotion() ?? false;
  const { records, loading, ensureLoaded } = useSearchIndex();
  const hits = useRankedResults(value, records);

  // Click outside collapses, but only when the field is empty (the supplied
  // rule) — otherwise a half-typed query would be lost to a stray click.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        open &&
        value === ""
      ) {
        setOpen(false);
        setValue("");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, value]);

  useEffect(() => {
    if (open) {
      ensureLoaded();
      const id = setTimeout(() => inputRef.current?.focus(), reduce ? 0 : 120);
      return () => clearTimeout(id);
    }
    setValue("");
    return undefined;
  }, [open, reduce, ensureLoaded]);

  // The keyboard cursor tracks the current result set.
  useEffect(() => {
    setActiveIndex(hits.length > 0 ? 0 : null);
  }, [hits]);

  const navigate = (route: string) => {
    setOpen(false);
    setValue("");
    history.push(route);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
    const hit = activeIndex !== null ? hits[activeIndex] : hits[0];
    if (hit) navigate(hit.record.route);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (hits.length > 0) {
        e.preventDefault();
        setActiveIndex((i) => Math.min((i ?? -1) + 1, hits.length - 1));
      }
    } else if (e.key === "ArrowUp") {
      if (hits.length > 0) {
        e.preventDefault();
        setActiveIndex((i) => Math.max((i ?? 1) - 1, 0));
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setValue("");
    }
  };

  const showResults = open && value.trim().length > 0;
  const status = loading
    ? translate({ id: "theme.SearchBar.loading", message: "Loading…" })
    : hits.length === 0
      ? translate({ id: "theme.SearchBar.noResults", message: "No matches." })
      : undefined;

  return (
    <div
      ref={containerRef}
      data-tbb-search-bar
      className={clsx(styles.root, className)}
    >
      {/* Icon button (always visible, overlays the right end of the bar) */}
      <button
        type="button"
        data-tbb-search-toggle
        aria-label={
          open
            ? translate({
                id: "theme.SearchBar.close",
                message: "Close search",
              })
            : translate({ id: "theme.SearchBar.open", message: "Open search" })
        }
        onClick={() => setOpen((s) => !s)}
        className={styles.circle}
      >
        {open ? (
          <X size={16} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Search size={16} strokeWidth={1.5} aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className={clsx(
              styles.form,
              expandDirection === "left" ? styles.formLeft : styles.formRight,
            )}
            initial={{ width: COLLAPSED_SIZE, opacity: 0.98 }}
            animate={{ width, opacity: 1 }}
            exit={
              reduce
                ? { width: COLLAPSED_SIZE, opacity: 0 }
                : {
                    width: COLLAPSED_SIZE,
                    opacity: 0,
                    transition: { type: "spring", stiffness: 260, damping: 26 },
                  }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 26 }
            }
          >
            {/* Absolutely positioned left search icon */}
            <span className={styles.searchIcon}>
              <Search size={16} strokeWidth={1.5} aria-hidden="true" />
            </span>

            <div className={styles.field}>
              <input
                ref={inputRef}
                data-tbb-search-input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                className={clsx(
                  styles.input,
                  expandDirection === "left"
                    ? styles.inputLeft
                    : styles.inputRight,
                )}
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded={showResults}
                aria-controls="tbb-bar-results"
                aria-activedescendant={
                  showResults && activeIndex !== null
                    ? `tbb-bar-option-${activeIndex}`
                    : undefined
                }
                aria-autocomplete="list"
                aria-label={translate({
                  id: "theme.SearchBar.label",
                  message: "Search the curriculum",
                })}
              />

              <AnimatePresence>
                {open && !value && (
                  <motion.span
                    key="ph"
                    className={clsx(
                      styles.placeholder,
                      expandDirection === "left"
                        ? styles.placeholderLeft
                        : styles.placeholderRight,
                    )}
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ opacity: 0.9, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: reduce ? 0 : 0.2 }}
                  >
                    {placeholder}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              key="go"
              type="submit"
              className={styles.go}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: reduce ? 0 : 0.15 }}
              aria-label={translate({
                id: "theme.SearchBar.submit",
                message: "Search",
              })}
            >
              <Search size={16} strokeWidth={1.5} aria-hidden="true" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {showResults && (
        <div
          id="tbb-bar-results"
          role="listbox"
          aria-label={translate({
            id: "theme.SearchBar.resultsLabel",
            message: "Search results",
          })}
          className={clsx(
            styles.results,
            expandDirection === "left"
              ? styles.resultsLeft
              : styles.resultsRight,
          )}
        >
          {status ? (
            <p className={styles.status} role="status">
              {status}
            </p>
          ) : (
            hits.map((hit, index) => (
              <SearchResultRow
                key={hit.record.route}
                id={`tbb-bar-option-${index}`}
                icon={routeIcon(hit.record.route)}
                label={hit.record.title}
                description={describeHit(hit)}
                active={index === activeIndex}
                onHover={() => setActiveIndex(index)}
                onSelect={() => navigate(hit.record.route)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
