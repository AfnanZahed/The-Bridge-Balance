/**
 * BackgroundGradient — an animated gradient blob that follows the cursor.
 *
 * Adapted from Aceternity UI's BackgroundGradient pattern
 * (https://ui.aceternity.com). The component renders an absolutely-
 * positioned layer with two large radial gradients; the layer translates
 * to follow the cursor via `useMotionValue` + `useSpring`. The translate
 * is intentionally damped (`stiffness: 80, damping: 18`) so the blob
 * feels like it has weight and inertia rather than snapping to the
 * pointer.
 *
 * The container's contents sit above the blob via z-index, and the blob
 * itself is masked with a soft radial vignette so the edges fade into
 * the surface — this is what gives it the "aurora" feel rather than a
 * hard rectangle.
 *
 * Respects prefers-reduced-motion: the blob renders centered and static,
 * the cursor-tracked motion is skipped.
 */

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from "motion/react";
import clsx from "clsx";

export interface BackgroundGradientProps {
  children: React.ReactNode;
  /** Outer className passthrough. */
  className?: string;
  /** Background gradient hue — defaults to the brand primary. */
  hueFrom?: string;
  /** Second gradient hue — defaults to the brand accent. */
  hueTo?: string;
  /** Inverse gradient palette (dark surfaces). Default: false. */
  inverted?: boolean;
  /** Strength of cursor tracking — 0 (none) to 1 (full). Default: 0.35. */
  intensity?: number;
  /** Maximum pointer-tracked translation in pixels. Default: 60. */
  maxOffset?: number;
}

export default function BackgroundGradient({
  children,
  className,
  hueFrom = "var(--ifm-color-primary)",
  hueTo = "var(--tbb-accent)",
  inverted = false,
  intensity = 0.35,
  maxOffset = 60,
}: BackgroundGradientProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track pointer position as a 0–1 normalized vector, then spring-damp it.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });

  // Translate the blob by ±maxOffset across the container, scaled by intensity.
  const tx = useTransform(sx, [0, 1], [-maxOffset * intensity, maxOffset * intensity]);
  const ty = useTransform(sy, [0, 1], [-maxOffset * intensity, maxOffset * intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x);
    my.set(y);
  };

  return (
    <div
      ref={containerRef}
      className={clsx("tbb-bg-gradient", inverted && "tbb-bg-gradient--inverted", className)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="tbb-bg-gradient__blob"
        style={{ x: tx, y: ty }}
        aria-hidden="true"
      >
        <div
          className="tbb-bg-gradient__orb tbb-bg-gradient__orb--a"
          style={{ background: `radial-gradient(circle, ${hueFrom} 0%, transparent 65%)` }}
        />
        <div
          className="tbb-bg-gradient__orb tbb-bg-gradient__orb--b"
          style={{ background: `radial-gradient(circle, ${hueTo} 0%, transparent 65%)` }}
        />
      </motion.div>

      <div className="tbb-bg-gradient__content">{children}</div>
    </div>
  );
}