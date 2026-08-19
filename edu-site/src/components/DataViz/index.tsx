/**
 * DataViz — "Curriculum at a Glance" dashboard section.
 *
 * Composes three visualization layers for The Bridge Balance homepage:
 *   1. KPIGrid        — headline "big numbers" (stages, chapters, certs, hours,
 *                       free services, cost) with animated counters.
 *   2. CurriculumBarChart — chapters per stage (Recharts BarChart, horizontal).
 *   3. CurriculumDonut     — estimated commitment share per stage (Recharts PieChart).
 *
 * All data comes from the platform spec; hours figures are labelled estimates.
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
              aria-label="Chapters per curriculum stage"
            >
              <header className="tbb-chart-card__header">
                <div className="tbb-chart-card__eyebrow">Coverage</div>
                <h3 className="tbb-chart-card__title">Chapters per stage</h3>
                <p className="tbb-chart-card__description">
                  Where the curriculum is densest. Stage 1 foundations carry the
                  most chapters; later stages compress into deep dives.
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
              aria-label="Estimated hours per stage"
            >
              <header className="tbb-chart-card__header">
                <div className="tbb-chart-card__eyebrow">Commitment</div>
                <h3 className="tbb-chart-card__title">Where your time goes</h3>
                <p className="tbb-chart-card__description">
                  Estimated hours needed per stage, based on chapter length and
                  project depth. A planning guide, not a promise.
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