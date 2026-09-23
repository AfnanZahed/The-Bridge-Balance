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
 *   3. <SearchUXProvider /> — the home Spotlight's controller (once-per-
 *      session auto-open, ⌘K, focus restore, scroll lock) and the overlay
 *      itself; the navbar's search trigger reads the same context.
 *
 *   4. <ChatAssistant /> — the assistant's floating trigger and the surface it
 *      opens into. A preview: it makes no API call and its only real outcome is
 *      the "under development" reveal.
 *
 *   5. {children} — the rest of the Docusaurus app tree.
 *
 * Note (R-003): the previous Lenis smooth-scroll wrapper and ScrollFX /
 * ScrollTrigger overlays were removed; native browser scroll is used.
 *
 * See https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
 */

import ChatAssistant from "@site/src/components/ChatAssistant";
import ReadingProgress from "@site/src/components/ReadingProgress";
import SearchUXProvider from "@site/src/components/Search/SearchUXContext";
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
      <MotionProvider>
        <SearchUXProvider>{children}</SearchUXProvider>
        <ChatAssistant />
      </MotionProvider>
    </>
  );
}
