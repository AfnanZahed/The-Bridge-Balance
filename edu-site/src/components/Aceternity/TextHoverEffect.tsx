/**
 * TextHoverEffect — a wordmark that draws itself in, then reveals a colour
 * gradient inside its letterforms under the cursor.
 *
 * Adapted from Aceternity UI's TextHoverEffect + FooterBackgroundGradient
 * (https://ui.aceternity.com). Three layers stack inside one <svg>:
 *
 *   1. A hairline outline that fades in only while the pointer is over the
 *      mark, so the resting state is empty space rather than a heavy block
 *      of type sitting at the end of every page.
 *   2. A slow stroke-dashoffset draw (4s) in the accent blue, so the wordmark
 *      assembles itself once on mount.
 *   3. A `textGradient`-stroked copy masked by a cursor-tracked radial
 *      gradient, so colour appears only inside the letterforms the pointer is
 *      actually over. The gradient's stops are mounted only while hovered —
 *      that is what makes the colour arrive with the cursor instead of
 *      sitting pre-lit under the mask.
 *
 * The reveal palette is a deliberate, user-approved exception to Principle
 * VII's single-accent rule: this component is the ONE place on the site that
 * carries more than one hue. Everything else stays on the silver ramp.
 *
 * Respects prefers-reduced-motion: the 4s draw and the mask transition both
 * collapse to their final state.
 *
 * GEOMETRY: everything below is in user units, and all of it lives here rather
 * than split with the stylesheet — the viewBox, the type size and the stroke
 * weight are one coupled system, and separating them is what let the stroke go
 * silently wrong once already. `viewBoxWidth` (default 880) must stay wider
 * than the rendered run of `text` or the glyphs clip at both ends, since SVG
 * clips to its viewport. Widen it for a longer string.
 *
 * The mark is deliberately sized to fill the band edge to edge: the effect's
 * whole character is enormous type drawn in hairlines, and it only reads that
 * way when the letters are as large as the available width allows. Upstream
 * gets away with an even larger scale because it renders into a 300-unit
 * viewBox and simply crops the overspill; a full wordmark can't do that, so
 * this sizes the box to the word instead and takes its drama from the width.
 */

import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import React, { useId, useRef, useState } from "react";

export interface TextHoverEffectProps {
  /** The wordmark to render. Displayed uppercase. */
  text: string;
  /** Seconds the reveal mask takes to settle on the cursor. Default: 0 (instant). */
  duration?: number;
  /** viewBox width in user units — must exceed the rendered width of `text`. */
  viewBoxWidth?: number;
  /** Type size in user units. Stroke weight is derived from it. */
  fontSize?: number;
  /** Class applied to the <svg>. */
  className?: string;
}

/** Upstream's ratio: a 0.3-unit stroke against 72-unit type. */
const UPSTREAM_STROKE_RATIO = 0.3 / 72;

export function TextHoverEffect({
  text,
  duration = 0,
  viewBoxWidth = 880,
  fontSize = 72,
  className,
}: TextHoverEffectProps): React.ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const shouldReduceMotion = useReducedMotion();

  // useId is SSR-stable; ':' is stripped so url(#id) stays a valid reference.
  // Namespacing matters here — the footer renders on every page, and a second
  // instance anywhere would otherwise collide on the shared upstream ids.
  const uid = useId().replace(/:/g, "");
  const gradientId = `tbb-th-gradient-${uid}`;
  const revealId = `tbb-th-reveal-${uid}`;
  const maskId = `tbb-th-mask-${uid}`;

  // Stroke weight tracks the TYPE, not the viewBox. Deriving it from
  // viewBoxWidth (the earlier attempt) inverted the effect: it left the letters
  // small and gave them proportionally fat strokes, where upstream's beauty is
  // in huge letters drawn with hairlines. Held at upstream's own 0.0042 ratio
  // the line renders at ~0.4px here and the gradient layer washes out, so it
  // sits a little heavier at 0.007 — still a hairline, still legible.
  const strokeWidth = fontSize * UPSTREAM_STROKE_RATIO * 1.7;

  // Percentage is resolved against the SVG's own box rather than accumulated
  // in state, so the mask tracks the cursor correctly after a resize.
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setMaskPosition({
      cx: `${((e.clientX - rect.left) / rect.width) * 100}%`,
      cy: `${((e.clientY - rect.top) / rect.height) * 100}%`,
    });
  };

  // Upstream's `r="20%"` resolves against its 300x100 viewBox diagonal — a
  // ~45-unit torch, which is 0.87x the 51.6-unit cap height and reads as a
  // local reveal under the pointer. Held literally, that same 20% against our
  // wider viewBox becomes a ~131-unit wash tinting four letters at once, so
  // the radius is pinned to upstream's absolute size and re-expressed as a
  // percentage of whatever viewBox we actually render.
  const upstreamTorchUnits = 0.2 * Math.sqrt((300 * 300 + 100 * 100) / 2);
  const viewportDiagonal = Math.sqrt(
    (viewBoxWidth * viewBoxWidth + 100 * 100) / 2,
  );
  const revealRadius = `${(upstreamTorchUnits / viewportDiagonal) * 100}%`;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxWidth} 100`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={text}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={clsx("tbb-text-hover", className)}
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id={revealId}
          gradientUnits="userSpaceOnUse"
          r={revealRadius}
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{
            duration: shouldReduceMotion ? 0 : duration,
            ease: "easeOut",
          }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id={maskId}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${revealId})`}
          />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        strokeWidth={strokeWidth}
        className="tbb-text-hover__outline"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        strokeWidth={strokeWidth}
        className="tbb-text-hover__draw"
        initial={
          shouldReduceMotion
            ? { strokeDashoffset: 0, strokeDasharray: 1000 }
            : { strokeDashoffset: 1000, strokeDasharray: 1000 }
        }
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: shouldReduceMotion ? 0 : 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
        mask={`url(#${maskId})`}
        className="tbb-text-hover__reveal"
      >
        {text}
      </text>
    </svg>
  );
}

/**
 * FooterBackgroundGradient — the faint radial wash behind the footer wordmark.
 * Rendering it as its own layer keeps the gradient off the footer's content,
 * so links and copyright stay on the flat dark ground.
 */
export function FooterBackgroundGradient(): React.ReactElement {
  return (
    <div
      className="tbb-footer-showcase__bg"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
}
