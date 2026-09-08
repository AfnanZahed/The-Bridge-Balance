// GENERATED FILE — do not edit by hand.
// Source: docs/**/*.{md,mdx} frontmatter `chapter_state`.
// Regenerate with: npm run gen:manifest

import type { ChapterStateValue } from "@site/src/components/ChapterState";

/** Docusaurus doc id -> authoring state. Docs without the key are omitted. */
export const CHAPTER_STATES: Record<string, ChapterStateValue> = {
  intro: "text-ready",
  "intro-2-binary-to-language": "placeholder",
  "intro-3-architecture-map": "placeholder",
  "intro-4-two-extremes-and-sde": "placeholder",
  "stage-01-spec-aware-vibe-engineering/backend": "placeholder",
  "stage-01-spec-aware-vibe-engineering/core-programming": "placeholder",
  "stage-01-spec-aware-vibe-engineering/databases": "placeholder",
  "stage-01-spec-aware-vibe-engineering/foundations": "placeholder",
  "stage-01-spec-aware-vibe-engineering/frontend": "placeholder",
  "stage-01-spec-aware-vibe-engineering/git-github": "placeholder",
  "stage-02-cs50-certification/cs50p": "placeholder",
  "stage-02-cs50-certification/cs50w": "placeholder",
  "stage-03-mastering-ai-coding-agents/claude-code": "placeholder",
  "stage-03-mastering-ai-coding-agents/context-engineering": "placeholder",
  "stage-03-mastering-ai-coding-agents/prompt-engineering": "placeholder",
  "stage-03-mastering-ai-coding-agents/skills-and-mcp": "placeholder",
  "stage-04-engineering-autonomous-ai-agents/evaluations": "placeholder",
  "stage-04-engineering-autonomous-ai-agents/multi-agent-systems":
    "placeholder",
  "stage-04-engineering-autonomous-ai-agents/rag-and-tool-calling":
    "placeholder",
};

/** Look up a doc's state. Returns undefined for unknown or stateless docs. */
export function getChapterState(
  docId: string | undefined,
): ChapterStateValue | undefined {
  return docId ? CHAPTER_STATES[docId] : undefined;
}
