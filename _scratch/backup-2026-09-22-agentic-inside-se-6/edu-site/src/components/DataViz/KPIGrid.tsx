/**
 * KPIGrid — Displays high-level curriculum headline figures.
 *
 * Real figures from The Bridge Balance platform spec:
 *   - 4 Stages (Introduction to SDE, SDE Mastery (AI-Driven), Credentials, SDE Mastery (AI-Native; Agentic AI))
 *   - Free Forever — the textbook costs nothing, forever (Constitution Principle VI).
 *     No chapter count: the curriculum never fixes one (locked decision D5).
 *   - 2 Harvard Certificates (CS50P Python + CS50W Web)
 *   - ~48 Est. Total Hours of structured study & project building
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
    value: 4,
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
    label: "Certificates",
    value: 2,
    subtext: "Harvard CS50P & CS50W",
    accent: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    label: "Est. Hours",
    value: 48,
    suffix: "h",
    subtext: "Self-paced study & labs",
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
