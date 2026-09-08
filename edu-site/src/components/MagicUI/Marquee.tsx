/**
 * Marquee — an infinite horizontal scrolling band of badges / chips.
 *
 * Adapted from the Magic UI Marquee pattern (https://magicui.design).
 * Renders children twice in a flex track, then animates `x: 0% → -50%`
 * with `repeat: Infinity` and `linear` easing. The duplicated children
 * are what makes the loop seamless — when the first half slides off,
 * the second half is already in view, so the wrap is invisible.
 *
 * Pause on hover is a native CSS-only affordance so it costs nothing
 * when motion is allowed and degrades gracefully otherwise.
 *
 * Respects `prefers-reduced-motion: reduce` — the track renders in its
 * resting state (no `x` transform), so children are simply laid out
 * side by side without animation.
 */

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";

export interface MarqueeProps {
  children: React.ReactNode;
  /** Animation duration in seconds. Default: 30 (slow, library-like). */
  duration?: number;
  /** Reverse direction. Default: false (left). */
  reverse?: boolean;
  /** Vertical axis gap between duplicated rows when `vertical` is set. */
  className?: string;
  /** Pause the marquee on hover. Default: true. */
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  duration = 30,
  reverse = false,
  className,
  pauseOnHover = true,
}: MarqueeProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={clsx("tbb-marquee", pauseOnHover && "tbb-marquee--pause-on-hover", className)}
      role="marquee"
      aria-label="Scrolling collection"
    >
      <motion.div
        className="tbb-marquee__track"
        animate={
          shouldReduceMotion
            ? { x: 0 }
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration,
                ease: "linear",
                repeat: Infinity,
              }
        }
      >
        {/* Render the children twice — the duplicated copy is what creates
            the seamless loop. Each copy gets the same aria-hidden treatment
            on the second pass to avoid double-announcements. */}
        <div className="tbb-marquee__group">{children}</div>
        <div className="tbb-marquee__group" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}