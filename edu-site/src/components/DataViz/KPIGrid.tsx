/**
 * KPIGrid — Displays high-level curriculum headline figures.
 *
 * Real figures from The Bridge Balance platform spec:
 *   - 3 Stages (Introduction to SDE, SDE Mastery (AI-Driven), SDE Mastery (AI-Native))
 *   - Free Forever — the textbook costs nothing, forever (Constitution Principle VI).
 *     No chapter count: the curriculum never fixes one (locked decision D5).
 *   - Starting point: zero — no prior programming needed, and Stage 0 assumes none.
 *   - A chapter is one sitting — one file, start to finish. No total hours:
 *     the book commits to none (the old "~48 Est. Total Hours" figure was
 *     removed on 2026-09-23 for exactly that reason).
 *   - 15+ Free-tier Services & Open Source tools (0 cost)
 */

import React from "react";
import AnimatedNumber from "../AnimatedNumber";

export interface KPICardData {
  label: string;
  /** Numeric figure, counted up on scroll. Omit when `display` is set. */
  value?: number;
  /** Verbatim text shown in place of a numeric figure (e.g. "Free Forever"). */
  display?: string;
  suffix?: string;
  subtext: string;
  accent: string;
}

export const KPI_ITEMS: KPICardData[] = [
  {
    label: "Stages",
    value: 3,
    subtext: "Switches to Autonomy",
    accent: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    label: "Textbook",
    display: "Free Forever",
    subtext: "Open source, no paywall",
    accent: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    label: "Starting point",
    display: "Zero",
    subtext: "No prior programming",
    accent: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    label: "A chapter",
    display: "One sitting",
    subtext: "One file, start to finish",
    accent: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    label: "Free Services",
    value: 15,
    suffix: "+",
    subtext: "Neon, Qdrant, Vercel...",
    accent: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    label: "Tuition Cost",
    value: 0,
    suffix: "$",
    subtext: "100% open & free",
    accent: "var(--tbb-accent, oklch(0 0 0))",
  },
];

export interface KPIGridProps {
  items?: KPICardData[];
}

export default function KPIGrid({
  items = KPI_ITEMS,
}: KPIGridProps): React.ReactElement {
  return (
    <div
      className="tbb-kpi-grid"
      role="region"
      aria-label="Curriculum summary key performance indicators"
    >
      {items.map((kpi) => (
        <div
          key={kpi.label}
          className="tbb-kpi-card"
          style={{ "--kpi-accent": kpi.accent } as React.CSSProperties}
        >
          <span className="tbb-kpi-card__label">{kpi.label}</span>
          <div className="tbb-kpi-card__value-row">
            <span className="tbb-kpi-card__value">
              {kpi.display !== undefined ? (
                kpi.display
              ) : (
                <AnimatedNumber value={kpi.value ?? 0} duration={800} />
              )}
            </span>
            {kpi.suffix && (
              <span className="tbb-kpi-card__suffix" aria-hidden="true">
                {kpi.suffix}
              </span>
            )}
          </div>
          <span className="tbb-kpi-card__subtext">{kpi.subtext}</span>
        </div>
      ))}
    </div>
  );
}
