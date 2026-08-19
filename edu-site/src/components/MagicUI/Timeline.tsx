/**
 * Timeline — a vertical timeline with alternating left/right entries.
 *
 * Adapted from the Magic UI Timeline pattern (https://magicui.design).
 * The vertical "spine" is rendered as a static line (R-003: no scroll-linked
 * motion). Each entry alternates sides on desktop and stacks on the left on
 * narrow viewports.
 *
 * Animation philosophy:
 *   - Spine: static line (scroll-scrubbed drawing removed per R-003).
 *   - Entry reveal: scroll-triggered fade-in-up via useInView (once: true).
 *   - All GPU properties (transform + opacity).
 *   - Respects prefers-reduced-motion: spine renders fully drawn;
 *     entries appear instantly in their final position.
 */

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import clsx from "clsx";

export interface TimelineEntryData {
  /** Small uppercase label (e.g. "01", "Stage 1"). */
  step: string;
  title: string;
  body: string;
}

export interface TimelineProps {
  entries: TimelineEntryData[];
  /** Container className passthrough. */
  className?: string;
  /** Title rendered above the timeline. */
  heading?: string;
  /** Subtitle / lede rendered beneath the heading. */
  subheading?: string;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

function TimelineEntry({
  entry,
  index,
}: {
  entry: TimelineEntryData;
  index: number;
}): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={clsx("tbb-timeline-entry", isLeft ? "tbb-timeline-entry--left" : "tbb-timeline-entry--right")}
    >
      {/* The dot on the spine */}
      <div className="tbb-timeline-entry__dot" aria-hidden="true">
        <span className="tbb-timeline-entry__dot-inner" />
      </div>

      <motion.div
        className="tbb-timeline-entry__card"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, x: shouldReduceMotion ? 0 : (isLeft ? -16 : 16) }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: shouldReduceMotion ? 0 : 20, x: shouldReduceMotion ? 0 : (isLeft ? -16 : 16) }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.55,
          ease: EASE_OUT,
        }}
      >
        <span className="tbb-timeline-entry__step">{entry.step}</span>
        <h3 className="tbb-timeline-entry__title">{entry.title}</h3>
        <p className="tbb-timeline-entry__body">{entry.body}</p>
      </motion.div>
    </div>
  );
}

export default function Timeline({
  entries,
  className,
  heading,
  subheading,
}: TimelineProps): React.ReactElement {

  return (
    <div className={clsx("tbb-timeline", className)}>
      {(heading || subheading) && (
        <header className="tbb-timeline__header">
          {heading && <h2 className="tbb-timeline__heading">{heading}</h2>}
          {subheading && <p className="tbb-timeline__subheading">{subheading}</p>}
        </header>
      )}

      <div className="tbb-timeline__track">
        {/* The vertical spine — static per R-003 (no scroll-tied scrubbing). */}
        <div className="tbb-timeline__spine" aria-hidden="true" />

        {entries.map((entry, i) => (
          <TimelineEntry key={entry.step + i} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}