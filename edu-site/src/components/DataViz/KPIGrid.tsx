/**
 * KPIGrid — Displays high-level curriculum headline figures.
 *
 * Real figures from The Bridge Balance platform spec:
 *   - 4 Stages (Foundations, Credentials, Coding Agents, Autonomous Systems)
 *   - 15 Core Chapters (6 + 2 + 4 + 3)
 *   - 2 Harvard Certificates (CS50P Python + CS50W Web)
 *   - ~48 Est. Total Hours of structured study & project building
 *   - 15+ Free-tier Services & Open Source tools (0 cost)
 *   - 100% Free content forever
 */

import React from "react";
import AnimatedNumber from "../AnimatedNumber";

export interface KPICardData {
  label: string;
  value: number;
  suffix?: string;
  subtext: string;
  accent: string;
}

export const KPI_ITEMS: KPICardData[] = [
  {
    label: "Stages",
    value: 4,
    subtext: "Foundations to Autonomy",
    accent: "var(--tbb-accent, oklch(0.5 0.21 264))",
  },
  {
    label: "Chapters",
    value: 15,
    subtext: "Video + Text paired",
    accent: "var(--tbb-accent, oklch(0.5 0.21 264))",
  },
  {
    label: "Certificates",
    value: 2,
    subtext: "Harvard CS50P & CS50W",
    accent: "var(--tbb-accent, oklch(0.5 0.21 264))",
  },
  {
    label: "Est. Hours",
    value: 48,
    suffix: "h",
    subtext: "Self-paced study & labs",
    accent: "var(--tbb-accent, oklch(0.5 0.21 264))",
  },
  {
    label: "Free Services",
    value: 15,
    suffix: "+",
    subtext: "Neon, Qdrant, Vercel...",
    accent: "var(--tbb-accent, oklch(0.5 0.21 264))",
  },
  {
    label: "Tuition Cost",
    value: 0,
    suffix: "$",
    subtext: "100% open & free",
    accent: "var(--tbb-accent, oklch(0.5 0.21 264))",
  },
];

export interface KPIGridProps {
  items?: KPICardData[];
}

export default function KPIGrid({ items = KPI_ITEMS }: KPIGridProps): React.ReactElement {
  return (
    <div className="tbb-kpi-grid" role="region" aria-label="Curriculum summary key performance indicators">
      {items.map((kpi) => (
        <div
          key={kpi.label}
          className="tbb-kpi-card"
          style={{ "--kpi-accent": kpi.accent } as React.CSSProperties}
        >
          <span className="tbb-kpi-card__label">{kpi.label}</span>
          <div className="tbb-kpi-card__value-row">
            <span className="tbb-kpi-card__value">
              <AnimatedNumber value={kpi.value} duration={800} />
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
