/**
 * BrandMark — The Bridge Balance identity mark.
 *
 * The mark is a tied arch: a level deck, and a span that rises from below it
 * on both banks, crosses it, and meets at a keystone. Read it as a bridge, as
 * a beam held in balance, or as two paths converging on one point — all three
 * are the brand's argument, and the coral keystone is what closes the span.
 *
 * Motion (pure CSS, no animation library):
 *   1. on mount the deck draws, then each span draws upward (staggered);
 *   2. the keystone drops in and closes the arch;
 *   3. a halo pings slowly, and a second gradient breathes across the tile.
 * All of it collapses to the finished static state under
 * `prefers-reduced-motion: reduce`.
 *
 * Geometry is authored on a 32-unit grid and holds at 16px (favicon) — three
 * strokes and one dot, nothing finer than 2.5 units.
 */

import React, { useId } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type BrandMarkVariant = "tile" | "glyph";

export interface BrandMarkProps {
  /** Rendered edge length in px. Defaults to 40. */
  size?: number;
  /** `tile` = gradient app-icon form. `glyph` = bare mark in currentColor. */
  variant?: BrandMarkVariant;
  /** Set false to render the finished mark with no motion at all. */
  animated?: boolean;
  /**
   * Accessible name. When omitted the mark is decorative (aria-hidden) —
   * correct whenever adjacent text already names the brand.
   */
  title?: string;
  className?: string;
}

export default function BrandMark({
  size = 40,
  variant = "tile",
  animated = true,
  title,
  className,
}: BrandMarkProps): React.ReactElement {
  // Ids must be unique per instance or a second mark steals the first's
  // gradients. useId is SSR-stable; ':' is stripped so url(#id) stays valid.
  const uid = useId().replace(/:/g, "");
  const tileId = `tbb-tile-${uid}`;
  const altId = `tbb-alt-${uid}`;
  const sheenId = `tbb-sheen-${uid}`;

  const isTile = variant === "tile";
  const labelled = Boolean(title);

  return (
    <span
      className={clsx(styles.root, animated && styles.animated, className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        fill="none"
        className={styles.svg}
        role={labelled ? "img" : undefined}
        aria-hidden={labelled ? undefined : true}
        focusable="false"
      >
        {labelled && <title>{title}</title>}

        {isTile && (
          <defs>
            <linearGradient id={tileId} x1="1" y1="0" x2="31" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" className={styles.stopFrom} />
              <stop offset=".52" className={styles.stopMid} />
              <stop offset="1" className={styles.stopTo} />
            </linearGradient>
            <linearGradient id={altId} x1="31" y1="0" x2="1" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" className={styles.stopAltFrom} />
              <stop offset=".58" className={styles.stopAltMid} />
              <stop offset="1" className={styles.stopAltTo} />
            </linearGradient>
            <linearGradient id={sheenId} x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ffffff" stopOpacity=".20" />
              <stop offset=".62" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        )}

        {isTile && (
          <>
            <rect width="32" height="32" rx="8" fill={`url(#${tileId})`} />
            <rect
              width="32"
              height="32"
              rx="8"
              fill={`url(#${altId})`}
              className={styles.drift}
              opacity="0"
            />
            <rect width="32" height="32" rx="8" fill={`url(#${sheenId})`} />
          </>
        )}

        {/* Keystone halo — the slow heartbeat of the mark */}
        <circle
          className={styles.halo}
          cx="16"
          cy={isTile ? 11 : 10.5}
          r={isTile ? 2.1 : 2.31}
        />

        {/* A level deck, then the two halves of the arch climbing to the crown */}
        <g
          className={styles.ink}
          fill="none"
          stroke={isTile ? "var(--tbb-mark-ink)" : "currentColor"}
          strokeWidth={isTile ? 2.5 : 2.75}
          strokeLinecap="round"
        >
          {isTile ? (
            <>
              <path className={clsx(styles.stroke, styles.deck)} pathLength={100} d="M3.6 17H28.4" />
              <path
                className={clsx(styles.stroke, styles.spanL)}
                pathLength={100}
                d="M7 22.5Q11.5 11 16 11"
              />
              <path
                className={clsx(styles.stroke, styles.spanR)}
                pathLength={100}
                d="M25 22.5Q20.5 11 16 11"
              />
            </>
          ) : (
            <>
              <path className={clsx(styles.stroke, styles.deck)} pathLength={100} d="M2.36 17.1H29.64" />
              <path
                className={clsx(styles.stroke, styles.spanL)}
                pathLength={100}
                d="M6.1 23.15Q11.05 10.5 16 10.5"
              />
              <path
                className={clsx(styles.stroke, styles.spanR)}
                pathLength={100}
                d="M25.9 23.15Q20.95 10.5 16 10.5"
              />
            </>
          )}
        </g>

        {/* The keystone that closes the span */}
        <circle
          className={styles.key}
          cx="16"
          cy={isTile ? 11 : 10.5}
          r={isTile ? 2.1 : 2.31}
        />

        {isTile && (
          <rect
            className={styles.rim}
            x=".6"
            y=".6"
            width="30.8"
            height="30.8"
            rx="7.4"
            fill="none"
          />
        )}
      </svg>
    </span>
  );
}
