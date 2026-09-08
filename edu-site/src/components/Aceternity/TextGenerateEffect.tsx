/**
 * TextGenerateEffect — character-by-character text reveal.
 *
 * Adapted from Aceternity UI's TextGenerateEffect pattern
 * (https://ui.aceternity.com). Splits the input string into spans (one
 * per character, including spaces) and reveals them with a stagger
 * triggered by `useInView`. The reveal is a quick opacity fade — under
 * 200ms per character — so the whole phrase assembles within ~1s for a
 * 30-character headline.
 *
 * Why characters rather than words: the per-character stagger produces
 * the "typewriter settles into place" rhythm that distinguishes this
 * from the default word-fade reveal. Spaces are kept (not collapsed)
 * so the layout doesn't shift.
 *
 * Respects prefers-reduced-motion: the full string renders instantly
 * without any animation.
 */

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import clsx from "clsx";

export interface TextGenerateEffectProps {
  text: string;
  /** Tag for the wrapper element. Default: "h2". */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Stagger between characters, in seconds. Default: 0.022. */
  stagger?: number;
  /** Initial fade-in duration per character, in seconds. Default: 0.4. */
  duration?: number;
  /** CSS class for the wrapper. */
  className?: string;
  /** CSS class applied to each character span. */
  charClassName?: string;
}

export default function TextGenerateEffect({
  text,
  as = "h2",
  stagger = 0.022,
  duration = 0.4,
  className,
  charClassName,
}: TextGenerateEffectProps): React.ReactElement {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : {
            staggerChildren: stagger,
            delayChildren: 0.05,
          },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration, ease: "easeOut" },
    },
  };

  // We split on each character (including spaces) so layout matches what
  // the browser would render with the un-styled string.
  const chars = Array.from(text);

  const Tag = (motion as unknown as Record<string, typeof motion.div>)[as];

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={clsx("tbb-text-generate", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className={clsx("tbb-text-generate__char", charClassName)}
          variants={charVariants}
          aria-hidden="true"
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </Tag>
  );
}