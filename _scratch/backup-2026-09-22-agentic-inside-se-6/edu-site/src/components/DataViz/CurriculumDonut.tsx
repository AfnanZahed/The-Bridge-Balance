/**
 * CurriculumDonut — The four curriculum stages at a glance (Recharts
 * `PieChart` with `innerRadius`).
 *
 * Four equal slices, one per stage. Equal is honest here: the curriculum's
 * four-stage shape is fixed and real, so no slice is weighted by size. Each
 * slice carries its stage's own accent color — the same color that stage's
 * card uses on the homepage — and the tooltip names the stage, its status and
 * its one-line description. Status is supporting information, never the value
 * that sizes the slice.
 *
 * No chapter count and no hour total appear in this chart, or ever (locked
 * decision D5). The number of chapters inside a stage, and the hours that
 * implies, are decided at authoring time and keep changing, so the site never
 * states them. The `sliceWeight` value exists only to split the ring into
 * equal parts; it is never rendered as text.
 *
 * Dataviz discipline applied:
 *   - Inner radius ~60% for clear center; 2px stroke in surface color on sectors.
 *   - Legend below (no legend box inside the chart).
 *   - Per-stage accent palette tied to the homepage stage cards; stage identity
 *     is carried by the legend label and the tooltip, never by color alone
 *     (FR-008).
 *   - Custom tooltip shows stage name, status word and one-line description.
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

export type StageStatus = "live" | "in-development";

export interface DonutDatum {
  name: string;
  short: string;
  status: StageStatus;
  description: string;
  /** Equal slice weight — never rendered as text. */
  sliceWeight: number;
  fill: string;
}

/** One unit per stage keeps the four slices equal (25% each). */
const SLICE_WEIGHT = 1;

function statusLabel(status: StageStatus): string {
  return status === "live" ? "Live" : "In development";
}

export const DONUT_DATA: DonutDatum[] = [
  {
    name: "Introduction to SDE",
    short: "Stage 0",
    status: "live",
    description:
      "The history of computing and software, read in the order it happened — binary through today's AI-coding-agent era — plus the Spec-Driven Engineering and Reading & Understanding Literacy philosophy Stage 1 depends on.",
    sliceWeight: SLICE_WEIGHT,
    fill: "var(--tbb-text)",
  },
  {
    name: "SDE Mastery (AI-Driven)",
    short: "Stage 1",
    status: "in-development",
    description:
      "Foundations. Architecture, programming, frontend, backend, databases, Git. Learn to lead AI coding agents with engineering judgment, not blind prompt-and-hope.",
    sliceWeight: SLICE_WEIGHT,
    fill: "var(--tbb-stage-1)",
  },
  {
    name: "Credentials",
    short: "Stage 2",
    status: "in-development",
    description:
      "Two Harvard certificates — CS50P (Python) and CS50W (web) — as internationally recognized proof of skill, paired with your GitHub portfolio.",
    sliceWeight: SLICE_WEIGHT,
    fill: "var(--tbb-stage-2)",
  },
  {
    name: "SDE Mastery (AI-Native; Agentic AI)",
    short: "Stage 3",
    status: "in-development",
    description:
      "RAG, tool calling, multi-agent systems, evaluations. Ship full autonomous agentic systems with OpenAI Agents SDK, Claude Agents SDK, LangGraph.",
    sliceWeight: SLICE_WEIGHT,
    fill: "var(--tbb-stage-3)",
  },
];

function renderDonutTooltip(
  props: TooltipContentProps<number, string>,
): React.ReactNode {
  const { active, payload } = props;
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0];
  const datum = row?.payload as DonutDatum | undefined;
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
        <span className="tbb-chart-tooltip__metric">Status</span>
        <span className="tbb-chart-tooltip__val">
          {statusLabel(datum.status)}
        </span>
      </div>
      <div className="tbb-chart-tooltip__sub" style={{ maxWidth: 260 }}>
        {datum.name}
      </div>
      <div className="tbb-chart-tooltip__sub" style={{ maxWidth: 260 }}>
        {datum.description}
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
            dataKey="sliceWeight"
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
        <caption>Curriculum stages at a glance</caption>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Status</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {DONUT_DATA.map((d) => (
            <tr key={d.short}>
              <td>{d.name}</td>
              <td>{statusLabel(d.status)}</td>
              <td>{d.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
