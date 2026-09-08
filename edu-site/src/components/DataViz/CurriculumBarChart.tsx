/**
 * CurriculumBarChart — Chapters per curriculum stage as a horizontal bar
 * comparison (Recharts `BarChart`).
 *
 * Data is real platform-spec counts: Stage 1 → 6 chapters, Stage 2 → 2,
 * Stage 3 → 4, Stage 4 → 3.
 *
 * Dataviz discipline applied:
 *   - Bars ≤ 24px thick, 4px rounded data-end, baseline rounded.
 *   - Direct value labels on bar tips; hairline gridlines; muted axis ticks.
 *   - Palette: single monochrome accent (R-005) — pure black on light,
 *     pure white on dark. Bars share the semantic `--tbb-accent`; stage
 *     identity comes from the `short` label on the axis + legend, never
 *     from color alone (FR-008).
 *   - Custom tooltip shows stage name + chapter count.
 *   - `isAnimationActive="auto"` — Recharts auto-disables animation under
 *     `prefers-reduced-motion` and during SSR.
 */

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import LegendStrip from "./LegendStrip";

export interface CurriculumBarDatum {
  stage: string;
  short: string;
  chapters: number;
  fill: string;
}

export const BAR_CHART_DATA: CurriculumBarDatum[] = [
  {
    stage: "Spec-Aware Vibe Engineering",
    short: "Stage 1",
    chapters: 6,
    fill: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    stage: "Credible Validation",
    short: "Stage 2",
    chapters: 2,
    fill: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    stage: "Mastering AI Coding Agents",
    short: "Stage 3",
    chapters: 4,
    fill: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    stage: "Engineering Autonomous Agents",
    short: "Stage 4",
    chapters: 3,
    fill: "var(--tbb-accent, oklch(0 0 0))",
  },
];

function renderBarTooltip(
  props: TooltipContentProps<number, string>,
): React.ReactNode {
  const { active, payload } = props;
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0];
  const datum = row?.payload as CurriculumBarDatum | undefined;
  if (!datum) return null;

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
        <span className="tbb-chart-tooltip__metric">Chapters</span>
        <span className="tbb-chart-tooltip__val">{datum.chapters}</span>
      </div>
      <div className="tbb-chart-tooltip__sub">{datum.stage}</div>
    </div>
  );
}

export default function CurriculumBarChart(): React.ReactElement {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={BAR_CHART_DATA}
          layout="vertical"
          margin={{ top: 4, right: 36, bottom: 4, left: 4 }}
          accessibilityLayer
        >
          <CartesianGrid
            horizontal
            vertical={false}
            stroke="var(--tbb-border)"
            strokeWidth={1}
          />
          <XAxis
            type="number"
            domain={[0, 7]}
            tickCount={7}
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "var(--tbb-text-subtle)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="short"
            width={62}
            tick={{ fontSize: 13, fill: "var(--tbb-text-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={renderBarTooltip}
            cursor={{ fill: "var(--tbb-surface-emphasis)", radius: 6 }}
          />
          <Bar
            dataKey="chapters"
            name="Chapters"
            radius={[0, 4, 4, 0]}
            barSize={22}
            isAnimationActive="auto"
            label={{
              position: "right",
              fontSize: 13,
              fontWeight: 600,
              fill: "var(--tbb-text)",
              formatter: (value: number) => `${value}`,
            }}
          >
            {BAR_CHART_DATA.map((entry) => (
              <Cell key={entry.short} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <LegendStrip
        items={BAR_CHART_DATA.map((d) => ({ label: d.short, color: d.fill }))}
      />
    </>
  );
}
