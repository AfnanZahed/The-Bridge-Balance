import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * `customProps` carried by these entries is read by the swizzled sidebar
 * components in `src/theme/`:
 *   - `stage` / `icon` pick a category's glyph (DocSidebarItem/Category)
 *   - `unnumbered` suppresses a leaf's ordinal marker (DocSidebarItem/Link)
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      // Top-level on purpose: the front door sits before Stage 0, not inside
      // it. No `customProps.unnumbered` — a level-1 leaf is already
      // unnumbered (`level >= 2 && ...` in DocSidebarItem/Link), so the prop
      // would be redundant; it exists for the nested Reference leaves.
      type: "doc",
      id: "welcome",
    },
    {
      type: "category",
      label: "Stage 0 — Orientation",
      collapsed: false,
      customProps: { icon: "start" },
      link: { type: "doc", id: "ch00-introduction" },
      items: [
        "ch00-introduction",
        "intro-1-binary-to-programming",
        "intro-2-architecture-map",
        "intro-3-editors-and-ides",
        "intro-4-terminals-and-cli-agents",
        "intro-5-spec-driven-engineering",
        "ch01-foundations",
        "ch02-programming-is-born",
      ],
    },
    {
      type: "category",
      label: "Stage 1 — Spec-Aware Vibe Engineering",
      collapsed: true,
      customProps: { stage: 1 },
      link: { type: "doc", id: "stage-01-spec-aware-vibe-engineering/index" },
      items: [
        "stage-01-spec-aware-vibe-engineering/foundations",
        "stage-01-spec-aware-vibe-engineering/core-programming",
        "stage-01-spec-aware-vibe-engineering/frontend",
        "stage-01-spec-aware-vibe-engineering/backend",
        "stage-01-spec-aware-vibe-engineering/databases",
        "stage-01-spec-aware-vibe-engineering/git-github",
      ],
    },
    {
      type: "category",
      label: "Stage 2 — Credible Validation (CS50)",
      collapsed: true,
      customProps: { stage: 2 },
      link: { type: "doc", id: "stage-02-cs50-certification/index" },
      items: [
        "stage-02-cs50-certification/cs50p",
        "stage-02-cs50-certification/cs50w",
      ],
    },
    {
      type: "category",
      label: "Stage 3 — Mastering AI Coding Agents",
      collapsed: true,
      customProps: { stage: 3 },
      link: { type: "doc", id: "stage-03-mastering-ai-coding-agents/index" },
      items: [
        "stage-03-mastering-ai-coding-agents/prompt-engineering",
        "stage-03-mastering-ai-coding-agents/context-engineering",
        "stage-03-mastering-ai-coding-agents/claude-code",
        "stage-03-mastering-ai-coding-agents/skills-and-mcp",
      ],
    },
    {
      type: "category",
      label: "Stage 4 — Engineering Autonomous AI Agents",
      collapsed: true,
      customProps: { stage: 4 },
      link: {
        type: "doc",
        id: "stage-04-engineering-autonomous-ai-agents/index",
      },
      items: [
        "stage-04-engineering-autonomous-ai-agents/rag-and-tool-calling",
        "stage-04-engineering-autonomous-ai-agents/multi-agent-systems",
        "stage-04-engineering-autonomous-ai-agents/evaluations",
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsed: true,
      customProps: { icon: "reference" },
      items: [
        {
          type: "doc",
          id: "code-of-conduct",
          customProps: { unnumbered: true },
        },
        {
          type: "doc",
          id: "faq",
          customProps: { unnumbered: true },
        },
        {
          type: "doc",
          id: "glossary",
          customProps: { unnumbered: true },
        },
        {
          type: "doc",
          id: "changelog",
          customProps: { unnumbered: true },
        },
        {
          type: "doc",
          id: "perf-targets",
          customProps: { unnumbered: true },
        },
        {
          type: "doc",
          id: "accessibility",
          customProps: { unnumbered: true },
        },
      ],
    },
  ],
};

export default sidebars;
