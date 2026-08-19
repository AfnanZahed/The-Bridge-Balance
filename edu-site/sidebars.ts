import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    "introduction",
    "intro",
    {
      type: "category",
      label: "Stage 1 — Spec-Aware Vibe Engineering",
      collapsed: false,
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
      link: { type: "doc", id: "stage-04-engineering-autonomous-ai-agents/index" },
      items: [
        "stage-04-engineering-autonomous-ai-agents/rag-and-tool-calling",
        "stage-04-engineering-autonomous-ai-agents/multi-agent-systems",
        "stage-04-engineering-autonomous-ai-agents/evaluations",
      ],
    },
  ],
};

export default sidebars;
