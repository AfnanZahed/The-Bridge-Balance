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
      label: "Stage 0 — Introduction to SDE",
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
      label: "Stage 1 — SDE Mastery (AI-Driven)",
      collapsed: true,
      customProps: { stage: 1 },
      link: { type: "doc", id: "stage-01-sde-mastery-ai-driven/index" },
      items: [
        "stage-01-sde-mastery-ai-driven/foundations",
        "stage-01-sde-mastery-ai-driven/core-programming",
        "stage-01-sde-mastery-ai-driven/frontend",
        "stage-01-sde-mastery-ai-driven/backend",
        "stage-01-sde-mastery-ai-driven/databases",
        "stage-01-sde-mastery-ai-driven/git-github",
        "stage-01-sde-mastery-ai-driven/prompt-engineering",
        "stage-01-sde-mastery-ai-driven/context-engineering",
        "stage-01-sde-mastery-ai-driven/claude-code",
        "stage-01-sde-mastery-ai-driven/skills-and-mcp",
      ],
    },
    {
      type: "category",
      label: "Stage 2 — Credentials",
      collapsed: true,
      customProps: { stage: 2 },
      link: { type: "doc", id: "stage-02-credentials/index" },
      items: [
        "stage-02-credentials/cs50p",
        "stage-02-credentials/cs50w",
      ],
    },
    {
      type: "category",
      label: "Stage 3 — SDE Mastery (AI-Native; Agentic AI)",
      collapsed: true,
      customProps: { stage: 3 },
      link: { type: "doc", id: "stage-03-sde-mastery-ai-native/index" },
      items: [
        "stage-03-sde-mastery-ai-native/rag-and-tool-calling",
        "stage-03-sde-mastery-ai-native/multi-agent-systems",
        "stage-03-sde-mastery-ai-native/evaluations",
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
