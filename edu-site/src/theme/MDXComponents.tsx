/**
 * MDX components registry — extends Docusaurus's default MDX components
 * with the project's custom components.
 *
 * - `h1` is overridden to inject the <ChapterState /> badge above every
 *   chapter title (reads `chapter_state` from frontmatter).
 * - Task-list checkboxes receive accessible labels derived from their item text.
 * - `<Callout />` is registered globally so authors can write
 *   `<Callout type="tip">...</Callout>` in any MDX file.
 *
 * The components exported at the bottom of this file are the only ones
 * available inside a chapter body. Anything else an author writes fails the
 * build, which is the intended guard.
 *
 * `<Figure />` and the compiled-figure pipeline were deleted on 2026-09-06.
 * Claude Code authors text only; images are the project owner's, generated
 * externally and referenced as ordinary markdown images.
 */

import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Callout from "@site/src/components/Callout";
import ChapterState from "@site/src/components/ChapterState";
import MDXComponents from "@theme-original/MDXComponents";
import React, { useEffect, useRef } from "react";

function ChapterHeading({
  children,
  ...props
}: {
  children?: React.ReactNode;
}) {
  const { frontMatter } = useDoc();
  const fm = frontMatter as unknown as {
    chapter_state?: "placeholder" | "text-ready" | "video-published";
  };
  const state = fm?.chapter_state;

  return (
    <>
      {state ? <ChapterState state={state} /> : null}
      <h1 {...(props as React.HTMLAttributes<HTMLHeadingElement>)}>
        {children}
      </h1>
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
