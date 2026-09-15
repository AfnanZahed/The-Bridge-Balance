/**
 * <ContentKind /> — Theory / Practice badge driven by frontmatter.
 *
 * A chapter's `content_kind` frontmatter key classifies it as `theory` or
 * `practice` (with a required `content_kind_reason`); the badge surfaces that
 * classification at the top of the chapter page, beside the ChapterState
 * badge. The key is optional and no chapter carries it yet, so this renders
 * nothing until one does.
 *
 * Wired into Docusaurus the same way ChapterState is: the h1 override in
 * src/theme/MDXComponents.tsx renders it, so it is page chrome and NOT an MDX
 * component authors can use in a chapter body.
 */

import React from "react";

export type ContentKindValue = "theory" | "practice";

interface Props {
  kind: ContentKindValue;
  className?: string;
}

const KIND_LABEL: Record<ContentKindValue, string> = {
  theory: "Theory",
  practice: "Practice",
};

export default function ContentKind({
  kind,
  className,
}: Props): React.ReactElement | null {
  const label = KIND_LABEL[kind];
  if (!label) return null;

  return (
    <div
      className={["tbb-content-kind", className].filter(Boolean).join(" ")}
      role="status"
      aria-label={`Content kind: ${label}`}
    >
      <span className="tbb-content-kind__dot" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
