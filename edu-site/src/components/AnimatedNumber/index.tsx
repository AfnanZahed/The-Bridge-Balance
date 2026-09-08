/**
 * AnimatedNumber — counts from 0 to `value` once when scrolled into view.
 *
 * Implementation notes:
 *   - IntersectionObserver triggers once; we unobserve after the first reveal
 *     so the animation never re-runs on subsequent scrolls.
 *   - requestAnimationFrame with a custom ease-out cubic for a natural
 *     "decelerate into final value" feel.
 *   - Respects `prefers-reduced-motion: reduce` — renders the final value
 *     instantly with no rAF loop.
 *   - Pure presentation; takes a `value`, optional `duration` (ms), and
 *     an optional `formatter` for display (e.g., locale-aware Intl.NumberFormat).
 */

import React, { useEffect, useRef, useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export interface AnimatedNumberProps {
  /** Target value to count up to. */
  value: number;
  /** Animation duration in milliseconds. Capped at 1500ms per Emil's bar. */
  duration?: number;
  /** Optional formatter applied to the displayed value. */
  formatter?: (n: number) => string;
  /** CSS class name forwarded to the rendered span. */
  className?: string;
  /** Inline style forwarded to the rendered span. */
  style?: React.CSSProperties;
  /** Threshold passed to IntersectionObserver. Defaults to 0.2 (20%). */
  threshold?: number;
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

function prefersReducedMotion(): boolean {
  if (!ExecutionEnvironment.canUseDOM) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function AnimatedNumber({
  value,
  duration = 900,
  formatter,
  className,
  style,
  threshold = 0.2,
}: AnimatedNumberProps): React.ReactElement {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  const format = formatter ?? ((n: number) => Math.round(n).toLocaleString());

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    if (hasAnimated) return;

    const node = ref.current;
    if (!node) return;

    // Reduced motion: skip the animation entirely.
    if (prefersReducedMotion()) {
      setDisplay(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        observer.disconnect();
        setHasAnimated(true);

        const start = performance.now();
        const clampedDuration = Math.min(Math.max(duration, 200), 1500);

        const tick = (now: number) => {
          const elapsed = now - start;
          const t = Math.min(1, elapsed / clampedDuration);
          const eased = easeOutCubic(t);
          setDisplay(value * eased);

          if (t < 1) {
            window.requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };

        window.requestAnimationFrame(tick);
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [value, duration, threshold, hasAnimated]);

  return (
    <span ref={ref} className={className} style={style}>
      {format(display)}
    </span>
  );
}