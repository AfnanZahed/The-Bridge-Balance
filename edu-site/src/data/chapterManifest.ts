// GENERATED FILE — do not edit by hand.
// Source: docs/**/*.{md,mdx} frontmatter `chapter_state` + folder nesting.
// Regenerate with: npm run gen:manifest

import type { ChapterStateValue } from "@site/src/components/ChapterState";

/** Docusaurus doc id -> authoring state. Docs without the key are omitted. */
export const CHAPTER_STATES: Record<string, ChapterStateValue> = {
  "intro-1-binary-to-programming": "text-ready",
  "intro-1-binary-to-programming/binary": "placeholder",
  "intro-2-architecture-map": "text-ready",
  "intro-3-editors-and-ides": "text-ready",
  "intro-4-terminals-and-cli-agents": "text-ready",
  "intro-5-spec-driven-engineering": "text-ready",
  "stage-01-spec-aware-vibe-engineering/backend": "text-ready",
  "stage-01-spec-aware-vibe-engineering/core-programming": "text-ready",
  "stage-01-spec-aware-vibe-engineering/databases": "text-ready",
  "stage-01-spec-aware-vibe-engineering/foundations": "text-ready",
  "stage-01-spec-aware-vibe-engineering/frontend": "text-ready",
  "stage-01-spec-aware-vibe-engineering/git-github": "text-ready",
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
  welcome: "text-ready",
};

/** Look up a doc's state. Returns undefined for unknown or stateless docs. */
export function getChapterState(
  docId: string | undefined,
): ChapterStateValue | undefined {
  return docId ? CHAPTER_STATES[docId] : undefined;
}

/** Docusaurus doc id -> kind. Only subchapters are listed; main is default. */
export const CHAPTER_KINDS: Record<string, "main" | "sub"> = {
  "intro-1-binary-to-programming/binary": "sub",
};

/**
 * A doc sitting inside another doc's folder is a subchapter; every other
 * chapter (a stage chapter, a stage index, an intro chapter) is a main
 * chapter. The two now differ only in h1 size — see the title block in
 * src/css/custom.css.
 */
export function getChapterKind(docId: string | undefined): "main" | "sub" {
  return docId && CHAPTER_KINDS[docId] === "sub" ? "sub" : "main";
}
