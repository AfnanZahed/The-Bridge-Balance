/**
 * DataViz — "Curriculum at a Glance" dashboard section.
 *
 * Composes three visualization layers for The Bridge Balance homepage:
 *   1. KPIGrid        — headline "big numbers" (stages, free-forever, certs,
 *                       hours, free services, cost) with animated counters.
 *   2. CurriculumBarChart — authoring status per stage (Recharts BarChart, horizontal).
 *   3. CurriculumDonut     — the three stages at a glance (Recharts PieChart).
 *
 * All data comes from the platform spec. The two charts show the curriculum by
 * stage and by authoring status; no chapter count and no hour total is ever
 * stated (locked decision D5).
 * The whole section respects `prefers-reduced-motion`:
 *   - AnimatedNumber renders the final value instantly when reduced.
 *   - Recharts `isAnimationActive="auto"` disables chart animation automatically.
 *   - CSS transitions are flattened under the media query.
 */

import React from "react";
import RevealOnScroll from "../motion/RevealOnScroll";
import KPIGrid from "./KPIGrid";
import CurriculumBarChart from "./CurriculumBarChart";
import CurriculumDonut from "./CurriculumDonut";
import "./dataviz.css";

export interface LegendStripProps {
  /** Label + CSS color pairs; shown as a plain accessible legend strip. */
  items: Array<{ label: string; color: string }>;
}

/**
 * LegendStrip — renderless helper: plain HTML legend used under charts so the
 * reader never has to rely on color-matching alone (dataviz discipline).
 */
export function LegendStrip({ items }: LegendStripProps): React.ReactElement {
  return (
    <div className="tbb-chart-legend" role="list" aria-label="Chart legend">
      {items.map((item) => (
        <span key={item.label} className="tbb-chart-legend__item" role="listitem">
          <span
            className="tbb-chart-legend__swatch"
            style={{ background: item.color } as React.CSSProperties}
            aria-hidden="true"
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export interface DataVizSectionProps {
  /** Main section heading. */
  heading?: string;
  /** Smaller lift text above the heading. */
  eyebrow?: string;
  /** Supporting paragraph under the heading. */
  subtitle?: string;
}

export default function DataVizSection({
  heading = "Curriculum at a glance",
  eyebrow = "The numbers",
  subtitle = "Real numbers from the platform spec — what each stage covers, how long it takes, and what it costs you. Exactly zero dollars.",
}: DataVizSectionProps): React.ReactElement {
  return (
    <section className="tbb-dataviz-section" aria-labelledby="tbb-dataviz-heading">
      <div className="tbb-dataviz-container">
        <RevealOnScroll as="div">
          <div className="tbb-section-heading">
            <div className="tbb-section-heading__eyebrow">{eyebrow}</div>
            <h2 id="tbb-dataviz-heading" className="tbb-section-heading__title">
              {heading}
            </h2>
            <p className="tbb-section-heading__subtitle">{subtitle}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll as="div" delay={0.05}>
          <KPIGrid />
        </RevealOnScroll>

        <div className="tbb-dataviz-charts">
          <RevealOnScroll as="div">
            <article
              className="tbb-chart-card"
              aria-label="Authoring status per stage"
            >
              <header className="tbb-chart-card__header">
                <div className="tbb-chart-card__eyebrow">Progress</div>
                <h3 className="tbb-chart-card__title">Stage status</h3>
                <p className="tbb-chart-card__description">
                  Where the curriculum stands today. Full bars are live and
                  text-ready; the short stubs are still in development.
                </p>
              </header>
              <div className="tbb-chart-card__body">
                <CurriculumBarChart />
              </div>
            </article>
          </RevealOnScroll>

          <RevealOnScroll as="div" delay={0.1}>
            <article
              className="tbb-chart-card"
              aria-label="The three curriculum stages"
            >
              <header className="tbb-chart-card__header">
                <div className="tbb-chart-card__eyebrow">Structure</div>
                <h3 className="tbb-chart-card__title">
                  Three stages at a glance
                </h3>
                <p className="tbb-chart-card__description">
                  The three stages that shape the curriculum, from orientation
                  through AI-native work. Equal by design — this is the book's
                  shape, not a measure of its length.
                </p>
              </header>
              <div className="tbb-chart-card__body">
                <CurriculumDonut />
              </div>
            </article>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}