/**
 * StageCard — a single curriculum stage tile.
 *
 * Numbered (01-04), muted Apple-grade accent chip, hover lift with soft
 * elevation + border-color shift. Hover is CSS-only (R-003 / motion contract:
 * "The ONLY retained animation is RevealOnScroll"; entrance-only Framer
 * Motion is the retained budget).
 *
 * The accent is passed in as a CSS color string (typically `var(--tbb-stage-N)`)
 * and applied to the chip and number; card surface stays neutral so stage
 * identity is a categorical signal (FR-008).
 */

import React from "react";
import Link from "@docusaurus/Link";
import { ArrowRight } from "../icons";

export interface StageCardProps {
  number: string;
  title: string;
  description: string;
  href: string;
  /** CSS color string (typically a muted Apple-grade stage token). */
  accentColor: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
}

export default function StageCard({
  number,
  title,
  description,
  href,
  accentColor,
  eyebrow,
}: StageCardProps): React.ReactElement {
  const style = {
    "--stage-color": accentColor,
  } as React.CSSProperties;

  return (
    <Link to={href} className="tbb-stage-card" style={style}>
      <div className="tbb-stage-card__head">
        <span className="tbb-stage-card__num">{eyebrow ?? `Stage ${number}`}</span>
        <span className="tbb-stage-card__chip" aria-hidden="true">
          {number}
        </span>
      </div>
      <h3 className="tbb-stage-card__title">{title}</h3>
      <p className="tbb-stage-card__desc">{description}</p>
      <span className="tbb-stage-card__cta">
        Open stage
        <ArrowRight size={14} aria-hidden="true" className="tbb-stage-card__cta-arrow" />
      </span>
    </Link>
  );
}
