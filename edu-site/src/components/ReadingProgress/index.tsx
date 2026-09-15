/**
 * ReadingProgress — a 3px progress bar pinned to the top of the viewport,
 * showing scroll progress through the current article.
 *
 * Implementation notes:
 *   - Uses `transform: scaleX()` (GPU-friendly; no layout).
 *   - The bar's width is updated via direct DOM mutation in a rAF-throttled
 *     scroll handler; we avoid React state on every scroll tick.
 *   - Hidden on non-doc pages (homepage / 404) by checking the location path.
 *   - `prefers-reduced-motion` is handled at the CSS layer (no transitions on
 *     the bar, so it's already static-friendly).
 */

import React, { useEffect, useRef } from "react";
import { useLocation } from "@docusaurus/router";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const NON_DOC_PATHS = new Set(["/", "/404/", "/404.html"]);

export default function ReadingProgress(): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    // Hide on non-doc pages.
    const path = location.pathname.replace(/\/+$/, "/") || "/";
    const isDoc = !NON_DOC_PATHS.has(path);
    if (!isDoc || !ref.current || !barRef.current) {
      if (ref.current) ref.current.dataset.active = "false";
      return;
    }
    ref.current.dataset.active = "true";

    let ticking = false;

    function compute() {
      ticking = false;
      const article = document.querySelector<HTMLElement>("article");
      // Fall back to the main content wrapper if no <article> is found.
      const target: HTMLElement =
        article ??
        document.querySelector<HTMLElement>("main") ??
        document.body;

      const rect = target.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Total scrollable distance within the article (clamped >= 0).
      const scrollable = Math.max(
        1,
        rect.height - viewport + Math.max(0, -rect.top)
      );

      // Progress = how far past the start of the article we've scrolled,
      // relative to the article's total scrollable range.
      const scrolled = Math.min(
        scrollable,
        Math.max(0, -rect.top)
      );

      const progress = Math.min(1, Math.max(0, scrolled / scrollable));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(compute);
      }
    }

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  return (
    <div
      ref={ref}
      className="tbb-reading-progress"
      data-active="false"
      aria-hidden="true"
    >
      <div ref={barRef} className="tbb-reading-progress__bar" />
    </div>
  );
}