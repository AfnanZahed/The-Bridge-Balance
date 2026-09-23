/**
 * HomepageHero — the textbook's marketing entry point (static CSS, R-003).
 *
 * Brand mark → eyebrow chip → display headline (with serif accent) →
 * subtitle → primary + secondary CTAs → meta row.
 *
 * Background: a pure-CSS Apple-style soft mesh gradient replacing the
 * wall-scale arch artwork. No raster assets, no external images, purely
 * OKLCH radial-gradient layers over --tbb-bg. A canvas layer (GatewayFlow-
 * Canvas) adds streaming bezier trajectories converging on the hero's
 * center on top of the mesh, in both themes — silver-on-black in dark mode,
 * low-opacity ink-on-white in light mode.
 *
 * Reduced motion: mesh is static; canvas draws one frame instead of
 * animating; @media (prefers-reduced-motion: reduce) collapses the rest.
 */

import Link from "@docusaurus/Link";
import React from "react";
import BrandMark from "../BrandMark";
import { ArrowRight, BookOpen, Server, Zap } from "../icons";
import GatewayFlowCanvas from "./GatewayFlowCanvas";
import styles from "./styles.module.css";

/* No HeroSpan — mesh gradient is now pure CSS in styles.module.css */

export default function HomepageHero(): React.ReactElement {
  return (
    <section
      className="tbb-hero"
      aria-labelledby="tbb-hero-title"
      aria-describedby="tbb-hero-subtitle"
    >
      <div className={styles.mesh} aria-hidden="true" />
      <GatewayFlowCanvas />

      <div className="container">
        <div className={styles.markWrap}>
          <BrandMark size={76} />
        </div>

        {/* The wrapper is a bare <span>, which maps to the `generic` role — and
            that role prohibits aria-label, so the label that used to sit here
            was ignored outright. Because the three items were also
            aria-hidden, a screen reader got nothing at all from the hero's
            headline claims. The items now expose their own text, and the
            dividers stay hidden since they are punctuation, not content. */}
        <span className="tbb-hero__eyebrow">
          <span className="tbb-hero__eyebrow-item">
            <strong>100%</strong> free
          </span>
          <span className="tbb-hero__eyebrow-divider" aria-hidden="true" />
          <span className="tbb-hero__eyebrow-item">
            <strong>3</strong> stages
          </span>
          <span className="tbb-hero__eyebrow-divider" aria-hidden="true" />
          <span className="tbb-hero__eyebrow-item">
            <strong>Zero</strong> background needed
          </span>
        </span>

        <h1 id="tbb-hero-title" className="tbb-hero__title">
          Lead AI agents with{" "}
          <span className="tbb-hero__title-accent">engineering judgment.</span>
        </h1>

        <p id="tbb-hero-subtitle" className="tbb-hero__subtitle">
          The Bridge Balance is the textbook for students learning spec-driven
          AI agent engineering — a complete 3-stage curriculum from zero
          programming background to autonomous AI agents, built so you ship
          agents, not chase prompts.
        </p>

        <div className="tbb-hero__cta-row">
          <Link
            to="/welcome"
            className="tbb-hero__cta-primary"
            aria-label="Start reading: open the Welcome page, the book's front door"
          >
            <BookOpen size={18} aria-hidden="true" />
            Start reading
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="tbb-hero__arrow"
            />
          </Link>
          <Link
            to="/welcome"
            className="tbb-hero__cta-secondary"
            aria-label="See the three stages (open the Welcome page and its stage table)"
          >
            <Zap size={18} aria-hidden="true" />
            See the three stages
          </Link>
        </div>

        <div className="tbb-hero__meta">
          <span className="tbb-hero__meta-item">
            <Zap className="tbb-hero__meta-icon" aria-hidden="true" />
            From zero to expert
          </span>
          <span className="tbb-hero__meta-item">
            <BookOpen className="tbb-hero__meta-icon" aria-hidden="true" />
            Video + text, paired
          </span>
          <span className="tbb-hero__meta-item">
            <Server className="tbb-hero__meta-icon" aria-hidden="true" />
            Free-tier stack, forever
          </span>
        </div>
      </div>
    </section>
  );
}
