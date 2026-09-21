/**
 * MDX components registry — extends Docusaurus's default MDX components
 * with the project's custom components.
 *
 * - `h1` is overridden to render the chapter masthead: the <ChapterState />
 *   badge (reads `chapter_state` from frontmatter), the <ContentKind /> badge
 *   when the chapter sets `content_kind`, plus a kicker rail carrying the
 *   sidebar-consistent chapter number and stage (see src/lib/chapterLocation).
 *   Only the decoration is added here — the h1's own text stays untouched so the
 *   heading anchor and ToC are unaffected.
 * - Task-list checkboxes receive accessible labels derived from their item text.
 * - `<Callout />` is registered globally so authors can write
 *   `<Callout type="tip">...</Callout>` in any MDX file.
 *
 * The components exported at the bottom of this file are the ones available
 * inside a chapter body. Docusaurus fails the build on an unregistered
 * component; that is a framework mechanic, not a limit on the palette. This
 * file is a registry and it is expected to grow (ADR-0008, Constitution
 * v3.0.1): add a component here, with its author docs, its gate allowance and
 * a changelog line.
 *
 * What stays closed is a component that draws. No `<Figure />`, no inline SVG
 * or Mermaid in a chapter body. `<Figure />` and the compiled-figure pipeline
 * were deleted on 2026-09-06. A diagram ships as a static image file under
 * `static/img/`, referenced as an ordinary markdown image.
 */

import { useDoc, useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import Callout from "@site/src/components/Callout";
import ChapterState from "@site/src/components/ChapterState";
import ContentKind from "@site/src/components/ContentKind";
import { getChapterKind } from "@site/src/data/chapterManifest";
import { findChapterLocation } from "@site/src/lib/chapterLocation";
import MDXComponents from "@theme-original/MDXComponents";
import React, { useEffect, useRef } from "react";

function ChapterHeading({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) {
  const { frontMatter, metadata } = useDoc();
  const sidebar = useDocsSidebar();
  const location = findChapterLocation(sidebar?.items ?? [], metadata.id);
  const kind = getChapterKind(metadata.id);
  const fm = frontMatter as unknown as {
    chapter_state?: "placeholder" | "text-ready" | "video-published";
    content_kind?: "theory" | "practice";
  };
  const state = fm?.chapter_state;
  const contentKind = fm?.content_kind;

  return (
    <>
      {state ? <ChapterState state={state} /> : null}
      {contentKind ? <ContentKind kind={contentKind} /> : null}
      <div
        className={
          kind === "sub"
            ? "tbb-chapter-head tbb-chapter-head--sub"
            : "tbb-chapter-head"
        }
      >
        {location ? (
          <p className="tbb-chapter-kicker" aria-hidden="true">
            <span className="tbb-chapter-kicker__mark" />
            <span className="tbb-chapter-kicker__ordinal">
              Chapter {String(location.ordinal).padStart(2, "0")}
            </span>
            <span className="tbb-chapter-kicker__sep" />
            <span className="tbb-chapter-kicker__stage">
              {location.stageEyebrow
                ? `${location.stageEyebrow} — ${location.stageTitle}`
                : location.stageTitle}
            </span>
            <span className="tbb-chapter-kicker__rule" />
          </p>
        ) : null}
        <h1 {...(props as React.HTMLAttributes<HTMLHeadingElement>)}>
          {children}
        </h1>
      </div>
    </>
  );
}

function AccessibleUnorderedList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!className?.includes("contains-task-list") || !ref.current) return;
    ref.current
      .querySelectorAll<HTMLInputElement>(
        'li.task-list-item > input[type="checkbox"]',
      )
      .forEach((input) => {
        if (input.getAttribute("aria-label")) return;
        const itemText = input.parentElement?.textContent
          ?.trim()
          .replace(/\s+/g, " ");
        input.setAttribute(
          "aria-label",
          itemText ? `Task item: ${itemText}` : "Task item",
        );
      });
  }, [className]);

  return (
    <ul ref={ref} className={className} {...props}>
      {children}
    </ul>
  );
}

/**
 * StageBanner — a callout-width panel carrying the matching stage's
 * background treatment. Usage in MDX: <StageBanner stage="1">...</StageBanner>
 */
function StageBanner({
  stage,
  children,
  ...props
}: {
  stage: "1" | "2" | "3" | "4";
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`tbb-stage-banner tbb-stage-banner--${stage}`} {...props}>
      {children}
    </div>
  );
}

export default {
  ...MDXComponents,
  h1: ChapterHeading,
  ul: AccessibleUnorderedList,
  Callout,
  StageBanner,
};
