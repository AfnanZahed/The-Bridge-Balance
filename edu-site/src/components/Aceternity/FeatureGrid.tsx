/**
 * FeatureGrid — a 2x2 grid of feature cards with cursor-tracked spotlights.
 *
 * Adapted from Aceternity UI's CardSpotlight pattern
 * (https://ui.aceternity.com). Each card tracks the pointer via inline
 * CSS custom properties (`--tbb-spot-x`, `--tbb-spot-y`) and renders a
 * radial gradient overlay that follows the cursor. The overlay fades in
 * on hover and out on leave.
 *
 * The card itself uses Framer Motion's `whileHover` for a coordinated
 * spring lift + slight scale, so the hover state has both the spotlight
 * (cursor-tracked, CSS) and the lift (Framer Motion spring) — two
 * separate channels working in tandem.
 *
 * Respects prefers-reduced-motion: no spring scale, no cursor tracking;
 * the spotlight overlay is hidden entirely.
 */

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";

export interface FeatureItem {
  /** Inline SVG icon element. */
  icon: React.ReactNode;
  title: string;
  body: string;
  /** Optional accent color override (defaults to brand primary). */
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
      <div className="tbb-feature-card__spotlight" aria-hidden="true" />
      <div className="tbb-feature-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="tbb-feature-card__icon" aria-hidden="true">
        {item.icon}
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