/**
 * Root — swizzled from @docusaurus/theme-classic/Root.
 *
 * Global UI that persists across route changes. Mounts:
 *
 *   1. <ReadingProgress /> — a 3px gradient bar that scales horizontally as
 *      the user scrolls the article.
 *
 *   2. <MotionProvider /> — wires Framer Motion's `MotionConfig` to honor
 *      `prefers-reduced-motion: reduce` (all entrance reveals collapse to
 *      zero motion).
 *
 *   3. {children} — the rest of the Docusaurus app tree.
 *
 * Note (R-003): the previous Lenis smooth-scroll wrapper and ScrollFX /
 * ScrollTrigger overlays were removed; native browser scroll is used.
 *
 * See https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
 */

import ReadingProgress from "@site/src/components/ReadingProgress";
import { MotionConfig } from "motion/react";
import React from "react";

function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.32 }}>
      {children}
    </MotionConfig>
  );
}

export default function Root({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      <ReadingProgress />
      <MotionProvider>{children}</MotionProvider>
    </>
  );
}
