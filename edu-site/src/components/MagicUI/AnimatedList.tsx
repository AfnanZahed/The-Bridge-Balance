/**
 * AnimatedList — a list that staggers its children into view.
 *
 * Adapted from the Magic UI AnimatedList pattern (https://magicui.design).
 * Uses Framer Motion variants + `staggerChildren` for an orchestrated
 * reveal. The container fires once on mount with `delayChildren` so the
 * stagger starts after a brief pause, giving the entrance a settled,
 * intentional feel.
 *
 * Animation philosophy:
 *   - Only transform + opacity.
 *   - staggerChildren 0.08s — tight enough to feel cohesive, loose
 *     enough to register each item.
 *   - spring stiffness 320 / damping 26 — gentle settle.
 *   - Respects prefers-reduced-motion: items render in their final
 *     positions, no entrance animation.
 *
 * Generic over T so consumers can render any item shape they like.
 */

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import clsx from "clsx";

export interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  /** Delay before the stagger starts, in seconds. Default: 0.1. */
  delayChildren?: number;
  /** Time between each child's animation, in seconds. Default: 0.08. */
  staggerChildren?: number;
  className?: string;
  /** HTML tag for the outer container. Default: "ul". */
  as?: "ul" | "ol" | "div";
  /** HTML tag for each item. Default: "li". */
  itemAs?: "li" | "div";
}

export default function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  delayChildren = 0.1,
  staggerChildren = 0.08,
  className,
  as = "ul",
  itemAs = "li",
}: AnimatedListProps<T>): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : {
            staggerChildren,
            delayChildren,
          },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring",
            stiffness: 320,
            damping: 26,
          },
    },
  };

  const ContainerTag = (motion as unknown as Record<string, typeof motion.div>)[as];
  const ItemTag = (motion as unknown as Record<string, typeof motion.div>)[itemAs];

  return (
    <ContainerTag
      className={clsx("tbb-animated-list", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <ItemTag key={keyExtractor(item, index)} variants={itemVariants}>
          {renderItem(item, index)}
        </ItemTag>
      ))}
    </ContainerTag>
  );
}