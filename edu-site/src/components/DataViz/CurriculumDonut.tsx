/**
 * CurriculumDonut — Estimated commitment per stage as a donut chart
 * (Recharts `PieChart` with `innerRadius`).
 *
 * Data derived from platform spec: relative chapter weights + realistic
 * hours-per-chapter estimates, presented as "Estimated Hours" contribution.
 * Values are labelled as estimates in the tooltip.
 *
 * Dataviz discipline applied:
 *   - Inner radius ~60% for clear center; 2px stroke in surface color on sectors.
 *   - Legend below (no legend box inside the chart).
 *   - Single-accent + neutrals palette (R-005): monochrome `--tbb-accent`
 *     primary segment, then grayscale steps; stage identity communicated by
 *     the explicit legend labels, never color-only meaning (FR-008).
 *   - Custom tooltip shows stage + estimated hours + share %.
 *   - `isAnimationActive="auto"` respects `prefers-reduced-motion`.
 *   - Accessible via `accessibilityLayer` + hidden data table for SR users.
 */

import React from "react";
import {
  Cell,
  type DefaultLegendContentProps,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
} from "recharts";

export interface DonutDatum {
  name: string;
  short: string;
  hours: number;
  fill: string;
}

/** Monochromatic steps: pure-black/white primary → neutral grayscale (R-005). */
export const DONUT_PALETTE = [
  "var(--tbb-accent, #000000)", // Foundations — primary
  "var(--gray-8, #606060)", // Credentials
  "var(--gray-7, #484848)", // Mastery
  "var(--gray-6, #3a3a3a)", // Autonomy
];

export const DONUT_DATA: DonutDatum[] = [
  {
    name: "Spec-Aware Vibe Engineering",
    short: "Foundations",
    hours: 20,
    fill: DONUT_PALETTE[0],
  },
  {
    name: "Credible Validation",
    short: "Credentials",
    hours: 8,
    fill: DONUT_PALETTE[1],
  },
  {
    name: "Mastering AI Coding Agents",
    short: "Mastery",
    hours: 12,
    fill: DONUT_PALETTE[2],
  },
  {
    name: "Engineering Autonomous Agents",
    short: "Autonomy",
    hours: 8,
    fill: DONUT_PALETTE[3],
  },
];

const TOTAL_HOURS = DONUT_DATA.reduce((sum, d) => sum + d.hours, 0);

function renderDonutTooltip(
  props: TooltipContentProps<number, string>,
): React.ReactNode {
  const { active, payload } = props;
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0];
  const datum = row?.payload as DonutDatum | undefined;
  if (!datum) return null;

  const pct = Math.round((datum.hours / TOTAL_HOURS) * 100);

  return (
    <div className="tbb-chart-tooltip" role="tooltip">
      <div className="tbb-chart-tooltip__header">
        <span
          className="tbb-chart-tooltip__dot"
          style={{ background: datum.fill }}
          aria-hidden="true"
        />
        {datum.short}
      </div>
      <div className="tbb-chart-tooltip__row">
        <span className="tbb-chart-tooltip__metric">Est. Hours</span>
        <span className="tbb-chart-tooltip__val">{datum.hours}h</span>
      </div>
      <div className="tbb-chart-tooltip__row">
        <span className="tbb-chart-tooltip__metric">Share</span>
        <span className="tbb-chart-tooltip__val">{pct}%</span>
      </div>
      <div className="tbb-chart-tooltip__sub">
        Estimated commitment — self-paced
      </div>
    </div>
  );
}

function CustomLegend({
  payload,
}: DefaultLegendContentProps): React.ReactElement {
  return (
    <div
      className="tbb-chart-legend"
      role="list"
      aria-label="Curriculum stages"
    >
      {payload.map((entry) => (
        <span
          key={entry.value}
          className="tbb-chart-legend__item"
          role="listitem"
        >
          <span
            className="tbb-chart-legend__swatch"
            style={{ background: entry.color } as React.CSSProperties}
            aria-hidden="true"
          />
          {entry.value}
        </span>
      ))}
    </div>
  );
}

export default function CurriculumDonut(): React.ReactElement {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart accessibilityLayer>
          <Pie
            data={DONUT_DATA}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={3}
            dataKey="hours"
            nameKey="short"
            label={false}
            isAnimationActive="auto"
            labelLine={false}
          >
            {DONUT_DATA.map((entry) => (
              <Cell
                key={entry.short}
                fill={entry.fill}
                stroke="var(--tbb-surface)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={renderDonutTooltip} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Screen-reader accessible data table */}
      <table className="tbb-sr-only" aria-hidden="true">
        <caption>Estimated hours per curriculum stage</caption>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Estimated Hours</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {DONUT_DATA.map((d) => (
            <tr key={d.short}>
              <td>{d.name}</td>
              <td>{d.hours}h</td>
              <td>{Math.round((d.hours / TOTAL_HOURS) * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
