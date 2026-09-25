/**
 * AlphaBadge — the book's phase marker.
 *
 * The Bridge Balance is published while it is still being written, and that is
 * a claim a reader deserves to meet before they start rather than after. The
 * badge states the phase in one place and is consumed wherever the book names
 * itself: the navbar brand and the homepage hero.
 *
 * Render: a brushed-metal pill — silver gradient, hairline border and an inset
 * specular highlight, the same material language as BrandMark — carrying a
 * slow sheen sweep and a pulsing status dot. Strictly monochrome per ADR-0003:
 * the phase reads from the dot and the word, never from a hue.
 *
 * Accessibility: the visible word "Alpha" is real text and a visually hidden
 * clause completes the sentence, so the badge announces "Alpha phase — still
 * being written". The dot is decorative. Sighted users get the same sentence
 * from the `title` tooltip. Both ambient animations collapse under
 * `prefers-reduced-motion: reduce`.
 */

import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export interface AlphaBadgeProps {
  /** `sm` for the navbar brand, `md` for the homepage hero. Defaults to `sm`. */
  size?: "sm" | "md";
  className?: string;
}

/** Read aloud in full, and shown on hover. One string, so the two cannot drift. */
const PHASE_DESCRIPTION = "Alpha phase — still being written";

export default function AlphaBadge({
  size = "sm",
  className,
}: AlphaBadgeProps): React.ReactElement {
  return (
    <span
      className={clsx(styles.badge, styles[size], className)}
      title={PHASE_DESCRIPTION}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.word}>Alpha</span>
      <span className={styles.srOnly}> phase — still being written</span>
    </span>
  );
}
