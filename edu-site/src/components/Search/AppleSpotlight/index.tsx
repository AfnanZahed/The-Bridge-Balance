/**
 * AppleSpotlight — the home page's search surface.
 *
 * Ported from the owner's reference component. The look is kept as supplied:
 * the `#blob` SVG filter, the spring entrance/exit (blur + scale), the
 * animated placeholder crossfade, the 64px shortcut circles at 30% opacity,
 * the supplied layout/stagger math, and the result-card list. Only mechanical
 * substitutions were made:
 *
 *   - Tailwind classes → CSS Modules on the existing --tbb-* tokens
 *     (Tailwind/shadcn is on the stack's normative do-not-add list)
 *   - `framer-motion` → the installed `motion/react`
 *   - placeholder external links → in-app routing through `useHistory`
 *   - the paste's static app list → live results from the shared engine
 *     (`useRankedResults` over `/search-index.json`)
 *   - the accessibility contract the paste does not carry: a labelled modal
 *     dialog, Escape to close, focus into the field on open and back to the
 *     trigger on close (the provider owns the restore), a Tab cycle inside
 *     the overlay, listbox/option semantics with ArrowUp/ArrowDown + Enter,
 *     and a reduced-motion guard on every entrance
 *
 * The four shortcut circles are the four curriculum stages, from the same
 * `STAGE_LINKS` list the SiteMenu drawer renders.
 */

import { useHistory } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import SearchResultRow from "@site/src/components/Search/SearchResultRow";
import { StageGlyph } from "@site/src/components/stage-icons";
import {
  describeHit,
  type SearchHit,
  useRankedResults,
  useSearchIndex,
} from "@site/src/lib/search";
import {
  STAGE_LINKS,
  type StageLink,
  stageNumberFromRoute,
} from "@site/src/lib/stages";
import clsx from "clsx";
import { FileText, Search } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

const SVGFilter = () => {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <filter id="blob">
        <feGaussianBlur stdDeviation="10" in="SourceGraphic" />
        <feColorMatrix
          values="
      1 0 0 0 0
      0 1 0 0 0
      0 0 1 0 0
      0 0 0 18 -9
    "
          result="blob"
        />
        <feBlend in="SourceGraphic" in2="blob" />
      </filter>
    </svg>
  );
};

type ShortcutButtonProps = {
  stage: StageLink;
  onNavigate: (route: string) => void;
};

const ShortcutButton = ({ stage, onNavigate }: ShortcutButtonProps) => {
  return (
    <button
      type="button"
      data-tbb-search-shortcut
      aria-label={stage.label}
      onClick={() => onNavigate(stage.to)}
      className={styles.shortcut}
    >
      <span className={styles.shortcutCircle}>
        <StageGlyph stage={stage.number} size={28} aria-hidden="true" />
      </span>
    </button>
  );
};

type SpotlightPlaceholderProps = {
  text: string;
  className?: string;
  reduce: boolean;
};

const SpotlightPlaceholder = ({
  text,
  className,
  reduce,
}: SpotlightPlaceholderProps) => {
  return (
    <motion.div layout className={clsx(styles.placeholder, className)}>
      <AnimatePresence mode="popLayout">
        <motion.p
          layoutId={`placeholder-${text}`}
          key={`placeholder-${text}`}
          initial={
            reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(5px)" }
          }
          animate={
            reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          exit={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: -10, filter: "blur(5px)" }
          }
          transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

type SpotlightInputProps = {
  placeholder: string;
  hidePlaceholder: boolean;
  highlightPlaceholder: boolean;
  value: string;
  activeOptionId?: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reduce: boolean;
};

const SpotlightInput = ({
  placeholder,
  hidePlaceholder,
  highlightPlaceholder,
  value,
  activeOptionId,
  onChange,
  onKeyDown,
  reduce,
}: SpotlightInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.inputRow}>
      <motion.div layoutId="search-icon">
        <Search size={28} strokeWidth={1.4} aria-hidden="true" />
      </motion.div>
      <div className={styles.inputWrap}>
        {!hidePlaceholder && (
          <SpotlightPlaceholder
            text={placeholder}
            className={
              highlightPlaceholder ? styles.placeholderHighlight : undefined
            }
            reduce={reduce}
          />
        )}

        <motion.input
          ref={inputRef}
          data-tbb-search-input
          layout="position"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className={styles.input}
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-expanded={Boolean(value)}
          aria-controls="tbb-spotlight-results"
          aria-activedescendant={activeOptionId}
          aria-autocomplete="list"
          aria-label={translate({
            id: "theme.SearchBar.label",
            message: "Search the curriculum",
          })}
        />
      </div>
    </div>
  );
};

type SearchResultsContainerProps = {
  children: React.ReactNode;
  status?: string;
  onMouseLeave: () => void;
};

const SearchResultsContainer = ({
  children,
  status,
  onMouseLeave,
}: SearchResultsContainerProps) => {
  return (
    <motion.div
      layout
      onMouseLeave={onMouseLeave}
      id="tbb-spotlight-results"
      role="listbox"
      aria-label={translate({
        id: "theme.SearchBar.resultsLabel",
        message: "Search results",
      })}
      className={styles.results}
    >
      {status ? (
        <p className={styles.status} role="status">
          {status}
        </p>
      ) : (
        children
      )}
    </motion.div>
  );
};

export type AppleSpotlightProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

/** Stage glyph for a stage route; a document glyph elsewhere. */
function routeIcon(route: string): React.ReactNode {
  const stage = stageNumberFromRoute(route);
  if (stage) return <StageGlyph stage={stage} size={24} aria-hidden="true" />;
  return <FileText size={24} strokeWidth={1.5} aria-hidden="true" />;
}

const AppleSpotlight = ({
  isOpen = false,
  onClose = () => {},
}: AppleSpotlightProps): React.ReactElement => {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredShortcut, setHoveredShortcut] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const reduce = useReducedMotion() ?? false;
  const history = useHistory();
  const { records, loading, failed, ensureLoaded } = useSearchIndex();
  const hits = useRankedResults(searchValue, records);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureLoaded();
  }, [ensureLoaded]);

  // The keyboard cursor tracks the current result set.
  useEffect(() => {
    setActiveIndex(hits.length > 0 ? 0 : null);
  }, [hits]);

  // Escape closes; Tab cycles inside the overlay (it is a modal dialog, so
  // focus must not wander into the page behind it).
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'button, input, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const navigate = (route: string) => {
    onClose();
    history.push(route);
  };

  const hoveredHit = activeIndex !== null ? hits[activeIndex] : undefined;

  const placeholderText =
    hoveredShortcut !== null
      ? STAGE_LINKS[hoveredShortcut].label
      : hoveredHit
        ? hoveredHit.record.title
        : translate({ id: "theme.SearchBar.placeholder", message: "Search" });

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hits.length > 0) {
        setActiveIndex((i) => Math.min((i ?? -1) + 1, hits.length - 1));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hits.length > 0) {
        setActiveIndex((i) => Math.max((i ?? 1) - 1, 0));
      }
    } else if (e.key === "Enter") {
      const hit = activeIndex !== null ? hits[activeIndex] : hits[0];
      if (hit) {
        e.preventDefault();
        navigate(hit.record.route);
      }
    }
  };

  const status = loading
    ? translate({ id: "theme.SearchBar.loading", message: "Loading…" })
    : failed || hits.length === 0
      ? translate({ id: "theme.SearchBar.noResults", message: "No matches." })
      : undefined;

  const entrance = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: {
          opacity: 0,
          filter: "blur(20px) url(#blob)",
          scaleX: 1.3,
          scaleY: 1.1,
          y: -10,
        },
        animate: {
          opacity: 1,
          filter: "blur(0px) url(#blob)",
          scaleX: 1,
          scaleY: 1,
          y: 0,
        },
        exit: {
          opacity: 0,
          filter: "blur(20px) url(#blob)",
          scaleX: 1.3,
          scaleY: 1.1,
          y: 10,
        },
      };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          {...entrance}
          transition={{
            stiffness: 550,
            damping: 50,
            type: "spring",
          }}
          className={styles.overlay}
          onClick={(e) => {
            // Backdrop click closes; clicks on the search cluster do not
            // (checked by target instead of stopPropagation, so the row
            // wrapper needs no click handler of its own).
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={translate({
            id: "theme.SearchBar.dialogLabel",
            message: "Search the curriculum",
          })}
          ref={dialogRef}
        >
          <SVGFilter />

          {/* A real fieldset, not a div with role="group" — it groups the
              search field and its shortcut controls for assistive tech. */}
          <fieldset
            aria-label={translate({
              id: "theme.SearchBar.groupLabel",
              message: "Search",
            })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setHoveredShortcut(null);
            }}
            className={styles.row}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                layoutId="search-input-container"
                transition={{
                  layout: {
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.2,
                  },
                }}
                className={styles.panel}
              >
                <SpotlightInput
                  placeholder={placeholderText}
                  hidePlaceholder={!(hoveredHit !== undefined || !searchValue)}
                  highlightPlaceholder={hoveredHit !== undefined}
                  reduce={reduce}
                  value={searchValue}
                  activeOptionId={
                    hoveredHit
                      ? `tbb-spotlight-option-${activeIndex}`
                      : undefined
                  }
                  onChange={setSearchValue}
                  onKeyDown={onInputKeyDown}
                />

                {searchValue && (
                  <SearchResultsContainer
                    status={status}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {hits.map((hit: SearchHit, index: number) => (
                      <motion.div
                        key={hit.record.route}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : {
                                delay: index * 0.1,
                                duration: 0.2,
                                ease: "easeOut",
                              }
                        }
                      >
                        <SearchResultRow
                          id={`tbb-spotlight-option-${index}`}
                          icon={routeIcon(hit.record.route)}
                          label={hit.record.title}
                          description={describeHit(hit)}
                          active={index === activeIndex}
                          onHover={() => setActiveIndex(index)}
                          onSelect={() => navigate(hit.record.route)}
                        />
                      </motion.div>
                    ))}
                  </SearchResultsContainer>
                )}
              </motion.div>
              {hovered &&
                !searchValue &&
                STAGE_LINKS.map((stage, index) => (
                  <motion.div
                    key={`shortcut-${stage.number}`}
                    onMouseEnter={() => setHoveredShortcut(index)}
                    layout
                    initial={
                      reduce
                        ? { opacity: 0 }
                        : { scale: 0.7, x: -1 * (64 * (index + 1)) }
                    }
                    animate={reduce ? { opacity: 1 } : { scale: 1, x: 0 }}
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : {
                            scale: 0.7,
                            x:
                              1 *
                              (16 * (STAGE_LINKS.length - index - 1) +
                                64 * (STAGE_LINKS.length - index - 1)),
                          }
                    }
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.2,
                            delay: index * 0.05,
                          }
                    }
                    className={styles.shortcutWrap}
                  >
                    <ShortcutButton stage={stage} onNavigate={navigate} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </fieldset>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { AppleSpotlight };
