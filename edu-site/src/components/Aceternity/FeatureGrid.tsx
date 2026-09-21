/**
 * FeatureGrid — a 2x2 grid of specimen plates.
 *
 * Each card is one machined surface, built from the site's own specular set
 * (`--tbb-metal-face` / `--tbb-metal-rim` / `--tbb-shadow-*`) rather than a
 * flat fill, so the four pillars read as four plates cut from the same stock
 * as the hero CTAs and the table headers.
 *
 * The four anatomy parts, in painting order:
 *   1. `__rail`      — a 2px light-catch along the top edge, in the card's own
 *                      ramp step, fading out to the right. The card's identity
 *                      mark; decorative only (`aria-hidden`).
 *   2. `__spotlight` — a soft radial bloom that tracks the pointer via the
 *                      `--tbb-spot-x` / `--tbb-spot-y` custom properties set on
 *                      mousemove. Aceternity UI's CardSpotlight pattern
 *                      (https://ui.aceternity.com), kept because it is direct
 *                      manipulation — the surface answers the hand — and not an
 *                      animation, so it costs nothing under reduced motion.
 *   3. `__head`      — the icon chip (left) and the ordinal (right).
 *   4. `__title` / `__body` — the reading block.
 *
 * `accent` is a RAMP STEP, not a hue: each card descends the silver ramp the
 * way the stages do (ADR-0003 scopes `--tbb-accent` away from cards entirely).
 * Rank is carried by the ordinal and the title, never by colour alone.
 *
 * Respects `prefers-reduced-motion`: no spring lift, no cursor tracking, and
 * the spotlight overlay is hidden outright.
 */

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";

export interface FeatureItem {
  /** Inline SVG icon element. */
  icon: React.ReactNode;
  title: string;
  body: string;
  /**
   * The card's ramp step — a named silver/stage token, never a hue.
   * Defaults to brand primary.
   */
  accent?: string;
}

export interface FeatureGridProps {
  items: FeatureItem[];
  className?: string;
}

function FeatureCard({ item, index }: { item: FeatureItem; index: number }): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const accent = item.accent ?? "var(--ifm-color-primary)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--tbb-spot-x", `${x}%`);
    e.currentTarget.style.setProperty("--tbb-spot-y", `${y}%`);
  };

  return (
    <motion.div
      className="tbb-feature-card"
      style={{ "--tbb-feature-accent": accent } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      initial={false}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }
      }
    >
      <div className="tbb-feature-card__rail" aria-hidden="true" />
      <div className="tbb-feature-card__spotlight" aria-hidden="true" />
      <div className="tbb-feature-card__head">
        <div className="tbb-feature-card__chip" aria-hidden="true">
          {item.icon}
        </div>
        <div className="tbb-feature-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <h3 className="tbb-feature-card__title">{item.title}</h3>
      <p className="tbb-feature-card__body">{item.body}</p>
    </motion.div>
  );
}

export default function FeatureGrid({
  items,
  className,
}: FeatureGridProps): React.ReactElement {
  return (
    <div className={clsx("tbb-feature-grid", className)}>
      {items.map((item, i) => (
        <FeatureCard key={item.title + i} item={item} index={i} />
      ))}
    </div>
  );
}
