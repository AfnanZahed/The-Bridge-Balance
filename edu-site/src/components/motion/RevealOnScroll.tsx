/**
 * RevealOnScroll — a lightweight scroll-linked reveal wrapper.
 *
 * Wraps children in a motion.div that fades in from below when it scrolls
 * into view. Defaults follow Emil Kowalski's bar: under 300ms for micro,
 * 600ms for entrances, ease-out (cubic-bezier(0.16, 1, 0.3, 1)), only
 * transform + opacity (GPU-friendly), and `once: true` so a passed element
 * never re-animates and never causes a layout thrash on scroll-back.
 *
 * Respects `prefers-reduced-motion: reduce` — animation collapses to the
 * static end state (children visible at rest).
 *
 * Usage:
 *   <RevealOnScroll>
 *     <h2>...</h2>
 *   </RevealOnScroll>
 *
 *   <RevealOnScroll delay={0.2} y={40} duration={0.8} as="section">
 *     ...
 *   </RevealOnScroll>
 */

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";

export interface RevealOnScrollProps {
  children: React.ReactNode;
  /** Translation distance for the entrance, in px. Default: 24. */
  y?: number;
  /** Duration in seconds. Default: 0.6. */
  duration?: number;
  /** Delay in seconds before the entrance runs. Default: 0. */
  delay?: number;
  /** IntersectionObserver margin. Default: "-100px". */
  margin?: string;
  /** Animate only the first time it enters the viewport. Default: true. */
  once?: boolean;
  /** HTML tag for the wrapper. Default: "div". */
  as?: "div" | "section" | "article" | "span" | "li" | "ul" | "header" | "footer";
  className?: string;
  /** Additional inline styles. */
  style?: React.CSSProperties;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RevealOnScroll({
  children,
  y = 24,
  duration = 0.6,
  delay = 0,
  margin = "-100px",
  once = true,
  as = "div",
  className,
  style,
}: RevealOnScrollProps): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });
  const shouldReduceMotion = useReducedMotion();

  // When the user prefers reduced motion, we render the static end state
  // immediately (opacity 1, no translation) — the children appear in place.
  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE_OUT,
      },
    },
  };

  // motion.create lets us pick the rendered HTML tag without re-mounting.
  const MotionTag = (motion as unknown as Record<string, typeof motion.div>)[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}