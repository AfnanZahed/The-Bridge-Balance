/**
 * SearchResultRow — the shared result card.
 *
 * One component renders every search result on the site: the home Spotlight's
 * result list and the chapter SearchBar's dropdown both feed it, so the two
 * surfaces cannot look different. The card shape comes straight from the
 * reference components (32px icon slot, medium label, one-line description,
 * chevron that reveals on hover/active).
 *
 * Semantics: a real `role="option"` inside its parent listbox, so ArrowUp /
 * ArrowDown / Enter handling in the parents stays valid. `active` mirrors the
 * keyboard cursor and shares the hover styling, so keyboard users see where
 * Enter will go.
 */

import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

export type SearchResultRowProps = {
  id?: string;
  icon: ReactNode;
  label: string;
  description: string;
  /** Keyboard cursor position — shares the hover treatment. */
  active?: boolean;
  onHover?: () => void;
  onSelect: () => void;
};

export default function SearchResultRow({
  id,
  icon,
  label,
  description,
  active = false,
  onHover,
  onSelect,
}: SearchResultRowProps) {
  return (
    <button
      type="button"
      id={id}
      role="option"
      aria-selected={active}
      data-tbb-search-row
      className={clsx(styles.row, active && styles.rowActive)}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onSelect}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.description}>{description}</span>
      </span>
      <span className={styles.chevron} aria-hidden="true">
        <ChevronRight size={24} strokeWidth={1.5} />
      </span>
    </button>
  );
}
