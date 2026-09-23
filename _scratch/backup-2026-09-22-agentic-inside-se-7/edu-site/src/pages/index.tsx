/**
 * Homepage — The Bridge Balance textbook entry point.
 *
 * Sections (each wrapped in <RevealOnScroll> for entrance reveal only — Framer
 * Motion collapse-under-reduced-motion is wired in motion/RevealOnScroll):
 *   1. Hero (HomepageHero) — static CSS hero (no WebGL, no R3F, no Lenis)
 *   2. Stages grid — 3 stage cards with muted Apple-grade accent chips
 *   3. Marquee — chip strip showing what students will build
 *   4. Why-this-book — 4-pillar FeatureGrid
 *   5. Co-authoring in action — 4-step Timeline
 *   6. Curriculum dashboard — DataViz (single Apple-blue + neutrals)
 *   7. Closing CTA — wrapped in BackgroundGradient
 */

import React from "react";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import HomepageHero from "../components/HomepageHero";
import StageCard from "../components/StageCard";
import RevealOnScroll from "../components/motion/RevealOnScroll";
import Marquee from "../components/MagicUI/Marquee";
import Timeline, { type TimelineEntryData } from "../components/MagicUI/Timeline";
import FeatureGrid, { type FeatureItem } from "../components/Aceternity/FeatureGrid";
import BackgroundGradient from "../components/Aceternity/BackgroundGradient";
import DataVizSection from "../components/DataViz";
import { BookOpen, Zap, Sparkles, ArrowRight, GitBranch, Check } from "../components/icons";

const STAGES = [
  {
    number: "00",
    title: "Introduction to SDE",
    description:
      "The history of computing and software, read in the order it happened — binary through today's AI-coding-agent era — plus the Spec-Driven Engineering and Reading & Understanding Literacy philosophy the rest of the book depends on.",
    href: "/intro-1-binary-to-programming",
    accentColor: "var(--tbb-text)",
    accentLabel: "Ink",
  },
  {
    number: "01",
    title: "SDE Mastery (AI-Driven)",
    description:
      "Architecture, programming, frontend, backend, databases and Git, learned side by side with prompt, context and loop engineering, Claude Code, skills and MCP — the engineering and the agent growing together.",
    href: "/stage-01-sde-mastery-ai-driven/",
    accentColor: "var(--tbb-stage-1)",
    accentLabel: "Teal",
  },
  {
    number: "02",
    title: "SDE Mastery (AI-Native)",
    description:
      "RAG, tool calling, multi-agent systems, evaluations. Ship complete agentic systems with the OpenAI Agents SDK, Claude Agents SDK and LangGraph.",
    href: "/stage-02-sde-mastery-ai-native/",
    accentColor: "var(--tbb-stage-2)",
    accentLabel: "Lilac",
  },
];

// 4-pillar feature grid — label-first identity. The accent is a RAMP STEP, not
// a hue: the four plates step down the silver ramp the way the stages do, so
// the visual metaphor holds across the page. Card 3 previously read
// `--tbb-accent`, which ADR-0003 scopes to a named list of surfaces that does
// not include cards — a ramp step is the token that belongs here.
const FEATURE_PILLARS: FeatureItem[] = [
  {
    icon: <BookOpen size={22} aria-hidden="true" />,
    title: "Video + text, paired",
    body:
      "Every chapter ships twice: a video lecture from the project owner and a detailed text companion co-authored with Claude Code. Neither stands alone.",
    accent: "var(--chart-4)",
  },
  {
    icon: <Check size={22} aria-hidden="true" />,
    title: "Two Harvard certificates",
    body:
      "CS50P (Python) and CS50W (web) — internationally recognized credentials that pair naturally with the GitHub portfolio your lecture notes produce.",
    accent: "var(--chart-3)",
  },
  {
    icon: <Zap size={22} aria-hidden="true" />,
    title: "Free-tier, forever",
    body:
      "Docusaurus on Vercel. Neon Postgres, Qdrant Cloud, Resend, Stripe, R2 — all on their free tiers. The textbook never charges for content.",
    accent: "var(--chart-2)",
  },
  {
    icon: <GitBranch size={22} aria-hidden="true" />,
    title: "Specs, not prompts",
    body:
      "Every chapter opens with a spec.md that defines contracts, interfaces, and acceptance criteria before any code is generated. Engineering judgment first.",
    accent: "var(--chart-1)",
  },
];

// Marquee chips — what students actually build across the curriculum.
const MARQUEE_CHIPS = [
  "Spec-driven development",
  "Frontend engineering",
  "Backend APIs",
  "Postgres + Qdrant",
  "Claude Code",
  "OpenCode",
  "Multi-agent systems",
  "MCP servers",
  "Skills & plugins",
  "GitHub portfolio",
  "Two Harvard certificates",
  "Zero cost, forever",
];

// Timeline entries — co-authoring workflow steps.
const CO_AUTHOR_TIMELINE: TimelineEntryData[] = [
  {
    step: "Step 01",
    title: "Co-research",
    body: "Project owner + Claude Code work the topic together — outline, sources, scope. Spec.md leads.",
  },
  {
    step: "Step 02",
    title: "Text writing",
    body: "Claude Code writes the detailed lecture into MDX against the spec. The owner reviews and edits.",
  },
  {
    step: "Step 03",
    title: "Image integration",
    body: "Owner produces diagrams; Claude Code integrates with descriptive alt text and captions.",
  },
  {
    step: "Step 04",
    title: "Video recording",
    body: "Owner records against the now-complete text. Chapter ships. Open source, free forever.",
  },
];

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="The Bridge Balance — Spec-Driven AI Agent Engineering for Students"
      description="A 3-stage curriculum with 2 Harvard certificates, teaching students to lead AI coding agents with engineering judgment. 100% free."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "The Bridge Balance",
            description:
              "A free, three-stage curriculum teaching spec-driven AI agent engineering, from computing fundamentals through autonomous multi-agent systems, anchored by two Harvard CS50 certificates.",
            url: "https://thebridgebalance.app/",
            isAccessibleForFree: true,
            provider: {
              "@type": "Organization",
              name: "The Bridge Balance",
            },
          })}
        </script>
      </Head>
      <main>
        <HomepageHero />

        <section className="tbb-stages">
          <div className="container">
            <RevealOnScroll as="div">
              <div className="tbb-section-heading">
                <div className="tbb-section-heading__eyebrow">The curriculum</div>
                <h2 className="tbb-section-heading__title">
                  Three stages, one bridge from student to engineer.
                </h2>
                <p className="tbb-section-heading__subtitle">
                  Each stage unlocks the next. Skip ahead, jump back, follow the
                  path — every chapter is independent.
                </p>
              </div>
            </RevealOnScroll>

            <div className="tbb-stage-grid">
              {STAGES.map((s) => (
                <div key={s.number}>
                  <StageCard {...s} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "1.5rem 0 2rem" }}>
          <div className="container">
            <Marquee duration={40}>
              {MARQUEE_CHIPS.map((chip) => (
                <span key={chip} className="tbb-marquee__badge">
                  <Sparkles size={14} aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </Marquee>
          </div>
        </section>

        <section style={{ padding: "4rem 0 6rem" }}>
          <div className="container">
            <RevealOnScroll as="div">
              <div className="tbb-section-heading">
                <div className="tbb-section-heading__eyebrow">Why this book</div>
                <h2 className="tbb-section-heading__title">
                  Built for the way students actually learn.
                </h2>
                <p className="tbb-section-heading__subtitle">
                  Four principles guide every chapter, every video, every spec.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll as="div" delay={0.05}>
              <FeatureGrid items={FEATURE_PILLARS} />
            </RevealOnScroll>
          </div>
        </section>

        <DataVizSection />

        <section
          style={{
            padding: "4rem 0 6rem",
            background: "var(--tbb-bg-alt)",
            borderTop: "1px solid var(--tbb-border)",
            borderBottom: "1px solid var(--tbb-border)",
          }}
        >
          <div className="container">
            <RevealOnScroll as="div">
              <div className="tbb-timeline-spine">
                <Timeline
                  entries={CO_AUTHOR_TIMELINE}
                  heading="Built with Claude Code, in the open."
                  subheading="The textbook is co-authored. Every workflow step is open source — read the spec, watch the video, ship the chapter."
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <section style={{ padding: "5rem 0 7rem" }}>
          <div className="container">
            <RevealOnScroll as="div">
              <BackgroundGradient inverted>
                <div
                  style={{
                    textAlign: "center",
                    maxWidth: "40rem",
                    margin: "0 auto",
                    padding: "3rem 1.5rem",
                    borderRadius: "var(--tbb-radius-xl)",
                    border: "1px solid var(--tbb-border)",
                    background: "var(--tbb-surface)",
                  }}
                >
                  <Sparkles
                    size={28}
                    aria-hidden="true"
                    style={{ color: "var(--ifm-color-primary)", marginBottom: "1rem" }}
                  />
                  <h2
                    style={{
                      fontSize: "clamp(2rem, 4vw, 2.75rem)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.03em",
                      fontWeight: 700,
                      margin: "0 0 1rem",
                      color: "var(--tbb-text)",
                    }}
                  >
                    Ready to start?
                  </h2>
                  <p
                    style={{
                      fontSize: "1.0625rem",
                      color: "var(--tbb-text-muted)",
                      margin: "0 auto 2rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Open Stage 1 and start with Foundations. Two Harvard
                    certificates wait at the end. Everything is free.
                  </p>
                  <Link
                    to="/stage-01-sde-mastery-ai-driven/"
                    className="tbb-hero__cta-primary"
                  >
                    <BookOpen size={18} aria-hidden="true" />
                    Begin Stage 1
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="tbb-hero__arrow"
                    />
                  </Link>
                </div>
              </BackgroundGradient>
            </RevealOnScroll>
          </div>
        </section>
      </main>
    </Layout>
  );
}

