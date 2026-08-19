/**
 * HomepageHero — the textbook's marketing entry point (static CSS, R-003).
 *
 * Brand mark → eyebrow chip → display headline (with serif accent) →
 * subtitle → primary + secondary CTAs → meta row.
 *
 * Background: a pure-CSS Apple-style soft mesh gradient replacing the
 * wall-scale arch artwork. No raster assets, no external images, purely
 * OKLCH radial-gradient layers over --tbb-bg.
 *
 * Reduced motion: mesh is static; @media (prefers-reduced-motion: reduce)
 * collapses any decorative motion.
 */

import React from "react";
import Link from "@docusaurus/Link";
import BrandMark from "../BrandMark";
import { ArrowRight, BookOpen, Award, Zap } from "../icons";
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

      <div className="container">
        <div className={styles.markWrap}>
          <BrandMark size={76} />
        </div>

        <span className="tbb-hero__eyebrow">
          <span className="tbb-hero__eyebrow-dot" aria-hidden="true" />
          <span>
            <span className="sr-only">Curriculum highlights: </span>
            100% free · 4 stages · 2 Harvard certificates
          </span>
        </span>

        <h1 id="tbb-hero-title" className="tbb-hero__title">
          Lead AI agents with{" "}
          <span className="tbb-hero__title-accent">engineering judgment.</span>
        </h1>

        <p id="tbb-hero-subtitle" className="tbb-hero__subtitle">
          The Bridge Balance is the textbook for students learning spec-driven
          AI agent engineering — a complete 4-stage curriculum with two Harvard
          certificates (CS50P + CS50W), built so you ship agents, not chase
          prompts.
        </p>

        <div className="tbb-hero__cta-row">
          <Link
            to="/stage-01-spec-aware-vibe-engineering/"
            className="tbb-hero__cta-primary"
            aria-label="Start with Stage 1: Foundations (skip to the first stage of the curriculum)"
          >
            <BookOpen size={18} aria-hidden="true" />
            Start with Stage 1
            <ArrowRight size={16} aria-hidden="true" className="tbb-hero__arrow" />
          </Link>
          <Link
            to="/stage-03-mastering-ai-coding-agents/"
            className="tbb-hero__cta-secondary"
            aria-label="Jump to Stage 3: Mastering AI Coding Agents (skip ahead in the curriculum)"
          >
            <Zap size={18} aria-hidden="true" />
            Jump to AI agents
          </Link>
        </div>

        <div className="tbb-hero__meta">
          <span className="tbb-hero__meta-item">
            <Zap className="tbb-hero__meta-icon" aria-hidden="true" />
            Built for working developers
          </span>
          <span className="tbb-hero__meta-item">
            <Award className="tbb-hero__meta-icon" aria-hidden="true" />
            CS50P + CS50W credentials
          </span>
          <span className="tbb-hero__meta-item">
            <BookOpen className="tbb-hero__meta-icon" aria-hidden="true" />
            Free-tier stack, forever
          </span>
        </div>
      </div>
    </section>
  );
}