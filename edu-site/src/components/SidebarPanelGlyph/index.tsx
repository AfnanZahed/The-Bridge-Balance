/**
 * SidebarPanelGlyph — the mark carried by the sidebar's collapse/expand handle.
 *
 * The stock Docusaurus affordance is a bare double chevron, which names no
 * object: it points left, but left of what. This draws the thing the control
 * acts on — a panel with its navigation rail — and aims the chevron at the rail
 * while the panel is open (`direction="in"`) and away from it once the panel has
 * folded into that rail (`direction="out"`). Anchoring both states to the rail
 * is what lets one mark carry them without a label, which only matters on the
 * collapsed 44px rail, where no label would fit.
 *
 * Hand-drawn on the navbar's own grid (SiteMenuButton): 20×20 box, 2px stroke,
 * round caps and joins. It is a chrome glyph, so it stays here rather than
 * entering the Phosphor content vocabulary in src/components/icons — and here
 * rather than in one of the two swizzles, so the collapsed and expanded states
 * cannot drift apart.
 */

import { type ReactNode } from "react";

/** `in` closes the panel onto its rail; `out` pulls it back off. */
export type PanelGlyphDirection = "in" | "out";

/**
 * Which edge of the page the panel is on. The doc sidebar draws the panel on
 * the left, with its rail on the panel's own left; the right rail's TOC is the
 * same object with every horizontal relationship flipped, so it mirrors the
 * whole mark about the viewBox's axis rather than re-deriving its paths. Added
 * for the right rail [2026-09-16] — same reason this file exists at all: one
 * mark, so the two sides cannot drift.
 */
export type PanelGlyphSide = "left" | "right";

/** The chevron, mirrored about the right compartment's centre (x = 13). */
const CHEVRON: Record<PanelGlyphDirection, string> = {
  in: "M14.25 7 11.5 10l2.75 3",
  out: "M11.75 7 14.5 10l-2.75 3",
};

/** Reflects x -> 20 - x, i.e. mirrors about the 20-wide viewBox's centre. */
const MIRROR: Record<PanelGlyphSide, string | undefined> = {
  left: undefined,
  right: "translate(20 0) scale(-1 1)",
};

export default function SidebarPanelGlyph({
  direction,
  side = "left",
  className,
}: {
  direction: PanelGlyphDirection;
  side?: PanelGlyphSide;
  className?: string;
}): ReactNode {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={MIRROR[side]}>
        <rect
          x="2.5"
          y="3"
          width="15"
          height="14"
          rx="3.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Runs from the panel's inner edge to the same edge at the foot, so the
            round caps land inside the outline's own 2px band and merge with it
            instead of poking through. */}
        <path
          d="M8.5 4v12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d={CHEVRON[direction]}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
