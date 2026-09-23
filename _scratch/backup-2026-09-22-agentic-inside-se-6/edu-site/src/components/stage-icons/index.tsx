/**
 * StageIcon — Phosphor-based icon for each curriculum stage.
 *
 * Each stage gets a single, large (48×48) Phosphor icon rendered in
 * the stage's accent color, with a soft tinted background that reads
 * as a "chip" against the rest of the page. The wrapper preserves the
 * original `StageIcon` API so consumers do not need to change.
 *
 *   0 Introduction to SDE     → Sparkle (fill)
 *   1 SDE Mastery (AI-Driven) → Blueprint (duotone) — plans, foundations
 *   2 Credentials             → Certificate (fill)  — official recognition
 *   3 SDE Mastery (AI-Native) → Atom (duotone)      — atomic-level skill
 *
 * Props: stage (0|1|2|3) selects the icon; all other SVG props
 * (size, className, style, aria-*, color) are forwarded to the <svg>.
 */
import React from "react";
import {
  Blueprint,
  Certificate,
  Atom,
  Sparkle,
} from "@phosphor-icons/react";

export type StageNumber = 0 | 1 | 2 | 3;

type StageMeta = {
  /** Phosphor accent color (resolves to the stage's Radix color). */
  color: string;
  /** Soft tinted background fill, used inside the chipping wrapper. */
  tint: string;
  /** a11y label. */
  label: string;
};

const STAGE_META: Record<StageNumber, StageMeta> = {
  0: { color: "var(--tbb-text)", tint: "color-mix(in srgb, var(--tbb-text) 14%, transparent)", label: "Stage 0 — Introduction to SDE" },
  1: { color: "var(--tbb-stage-1)", tint: "color-mix(in srgb, var(--tbb-stage-1) 14%, transparent)", label: "Stage 1 — SDE Mastery (AI-Driven)" },
  2: { color: "var(--tbb-stage-2)", tint: "color-mix(in srgb, var(--tbb-stage-2) 14%, transparent)", label: "Stage 2 — Credentials" },
  3: { color: "var(--tbb-stage-3)", tint: "color-mix(in srgb, var(--tbb-stage-3) 14%, transparent)", label: "Stage 3 — SDE Mastery (AI-Native; Agentic AI)" },
};

export type StageIconProps = Omit<React.SVGProps<SVGSVGElement>, "viewBox" | "children"> & {
  stage: StageNumber;
  /** Render size in pixels (default 48). */
  size?: number;
};

/**
 * The bare stage glyph — same four Phosphor icons, no chip, no tint, no
 * label. Consumers that supply their own surface (the Spotlight shortcut
 * circles, search-result rows) use this; `StageIcon` wraps it in the tinted
 * chip for the stage cards.
 */
export function StageGlyph({ stage, size = 48, ...rest }: StageIconProps) {
  if (stage === 0) return <Sparkle size={size} weight="fill" {...rest} />;
  if (stage === 1) return <Blueprint size={size} weight="duotone" {...rest} />;
  if (stage === 2) return <Certificate size={size} weight="fill" {...rest} />;
  return <Atom size={size} weight="duotone" {...rest} />;
}

export function StageIcon({
  stage,
  size = 48,
  className,
  ...rest
}: StageIconProps) {
  const meta = STAGE_META[stage];
  const composedClassName = ["tbb-stage-icon", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={composedClassName}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "0.875rem",
        background: meta.tint,
        color: meta.color,
        flexShrink: 0,
      }}
      role="img"
      aria-label={meta.label}
    >
      <StageGlyph stage={stage} size={Math.round(size * 0.58)} {...rest} />
    </span>
  );
}

export default StageIcon;
