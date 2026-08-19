/**
 * <ChapterState /> — chapter state badge driven by frontmatter.
 *
 * Per the co-authoring workflow (Constitution v2.0.0 Principle III), every
 * chapter is one of: placeholder → text-ready → video-published. The badge
 * surfaces that state at the top of every chapter page.
 *
 * Wired into Docusaurus via src/theme/MDXComponents.tsx so it auto-renders
 * above every chapter heading — authors don't need to import it per file.
 */

import React from "react";

export type ChapterStateValue =
  | "placeholder"
  | "text-ready"
  | "video-published";

interface Props {
  state: ChapterStateValue;
  className?: string;
}

const STATE_META: Record<
  ChapterStateValue,
  { label: string; modifier: string; pulse?: boolean }
> = {
  placeholder: {
    label: "Placeholder — awaiting text",
    modifier: "tbb-chapter-state--placeholder",
  },
  "text-ready": {
    label: "Text ready — video coming soon",
    modifier: "tbb-chapter-state--text-ready",
    pulse: true,
  },
  "video-published": {
    label: "Video lecture available below",
    modifier: "tbb-chapter-state--video-published",
  },
};

export default function ChapterState({
  state,
  className,
}: Props): React.ReactElement | null {
  // Hide badge for the "finished" state — the video embed is the headline.
  if (state === "video-published") return null;

  const meta = STATE_META[state];
  if (!meta) {
    return (
      <div
        role="alert"
        className="tbb-chapter-state tbb-chapter-state--unknown"
        style={{ display: "inline-flex" }}
      >
        Unknown chapter_state: "{state}"
      </div>
    );
  }

  return (
    <div
      className={["tbb-chapter-state", meta.modifier, className]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-label={`Chapter state: ${meta.label}`}
    >
      <span className="tbb-chapter-state__dot" aria-hidden="true" />
      <span>{meta.label}</span>
    </div>
  );
}
