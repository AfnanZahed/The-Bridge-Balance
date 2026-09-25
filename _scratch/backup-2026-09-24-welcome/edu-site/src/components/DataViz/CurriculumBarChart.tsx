/**
 * CurriculumBarChart — Stage authoring status as a horizontal bar chart
 * (Recharts `BarChart`).
 *
 * Bar LENGTH encodes status only. A stage that is authored and text-ready
 * shows a full-length bar; a stage whose chapters are still placeholder
 * scaffolding shows a short stub. The bar's tip label and its tooltip both
 * print the status WORD — "Live" or "In development" — and never a number.
 * There is deliberately no value axis and no numeric label anywhere: this
 * chart communicates state, not magnitude.
 *
 * No chapter count and no hour total appear in this chart, or ever (locked
 * decision D5). The number of chapters inside a stage, and the hours that
 * implies, are decided at authoring time and keep changing, so the site never
 * states them. The per-stage `statusWeight` value exists only to size a bar's
 * pixel length; it is never rendered as text.
 *
 * Dataviz discipline applied:
 *   - Bars ≤ 24px thick, 4px rounded data-end, baseline rounded.
 *   - Status word on bar tips; hairline gridlines; no numeric axis.
 *   - Palette: single monochrome accent (R-005) — pure black on light, pure
 *     white on dark. Stage identity comes from the `short` label on the axis +
 *     legend, never from color alone (FR-008).
 *   - Custom tooltip shows stage name, status word and one-line description.
 *   - `isAnimationActive="auto"` — Recharts auto-disables animation under
 *     `prefers-reduced-motion` and during SSR.
 */

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import LegendStrip from "./LegendStrip";

export type StageStatus = "live" | "in-development";

export interface CurriculumBarDatum {
  stage: string;
  short: string;
  status: StageStatus;
  /** Illustrative bar length only — never rendered as text. */
  statusWeight: number;
  description: string;
  fill: string;
}

/** Full bar = a live, text-ready stage. */
const LIVE_WEIGHT = 1;
/** Short stub = a stage still in placeholder scaffolding. */
const IN_DEVELOPMENT_WEIGHT = 0.2;

function statusLabel(status: StageStatus): string {
  return status === "live" ? "Live" : "In development";
}

export const BAR_CHART_DATA: CurriculumBarDatum[] = [
  {
    stage: "Introduction to SDE",
    short: "Stage 0",
    status: "live",
    statusWeight: LIVE_WEIGHT,
    description:
      "The history of computing and software, read in the order it happened — binary through today's AI-coding-agent era — plus Spec-Driven Engineering and Code Literacy: reading and judging code — the philosophy Stage 1 depends on.",
    fill: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    stage: "SDE Mastery (AI-Driven)",
    short: "Stage 1",
    status: "in-development",
    statusWeight: IN_DEVELOPMENT_WEIGHT,
    description:
      "Foundations. Architecture, programming, frontend, backend, databases, Git. Learn to lead AI coding agents with engineering judgment, not blind prompt-and-hope.",
    fill: "var(--tbb-accent, oklch(0 0 0))",
  },
  {
    stage: "SDE Mastery (AI-Native)",
    short: "Stage 2",
    status: "in-development",
    statusWeight: IN_DEVELOPMENT_WEIGHT,
    description:
      "RAG, tool calling, multi-agent systems, evaluations. Ship full autonomous agentic systems with OpenAI Agents SDK, Claude Agents SDK, LangGraph.",
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
        <span className="tbb-chart-tooltip__metric">Status</span>
        <span className="tbb-chart-tooltip__val">
          {statusLabel(datum.status)}
        </span>
      </div>
      <div className="tbb-chart-tooltip__sub" style={{ maxWidth: 260 }}>
        {datum.description}
      </div>
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
          {/* No visible value axis: bar length carries status, not magnitude. */}
          <XAxis type="number" hide domain={[0, 1.25]} />
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
            dataKey="statusWeight"
            name="Status"
            radius={[0, 4, 4, 0]}
            barSize={22}
            isAnimationActive="auto"
          >
            <LabelList
              valueAccessor={(entry) =>
                statusLabel((entry.payload as CurriculumBarDatum).status)
              }
              position="right"
              offset={8}
              fill="var(--tbb-text)"
              fontSize={13}
              fontWeight={600}
            />
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
