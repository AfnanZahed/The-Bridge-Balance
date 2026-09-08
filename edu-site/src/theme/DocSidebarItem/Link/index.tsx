/**
 * Swizzled DocSidebarItem/Link — forked from @docusaurus/theme-classic 3.7.0.
 *
 * Upstream renders a bare `<Link>` with a label span. This fork keeps every
 * upstream behaviour (active detection, external-link handling, `aria-current`,
 * `onItemClick`, prop spreading) and only restructures the render tree into the
 * four-column chapter row the sidebar design calls for:
 *
 *     [rail] [ordinal] [label] [state]
 *
 * - `ordinal` is derived from the `index` DocSidebarItems already passes, so
 *   numbering follows the sidebar order rather than a hand-maintained label.
 * - `state` reads the generated chapter manifest (src/data/chapterManifest.ts,
 *   sourced from each doc's `chapter_state` frontmatter) so a reader can see
 *   which chapters are real before clicking — Constitution Principle III.
 *   A doc missing from the manifest renders no dot rather than failing.
 *
 * NOTE: on a Docusaurus upgrade, re-diff against the upstream 3.7.0 source.
 */

import isInternalUrl from "@docusaurus/isInternalUrl";
import Link from "@docusaurus/Link";
import { isActiveSidebarItem } from "@docusaurus/plugin-content-docs/client";
import { ThemeClassNames } from "@docusaurus/theme-common";
import type { ChapterStateValue } from "@site/src/components/ChapterState";
import { getChapterState } from "@site/src/data/chapterManifest";
import type { Props } from "@theme/DocSidebarItem/Link";
import IconExternalLink from "@theme/Icon/ExternalLink";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

/** Sidebar-length wording; the page body carries the full badge. */
const STATE_LABEL: Record<ChapterStateValue, string> = {
  placeholder: "Placeholder — awaiting text",
  "text-ready": "Text ready",
  "video-published": "Video published",
};

/**
 * Several `sidebar_label`s already start with a hand-typed ordinal
 * ("1. Foundations"). Strip it when we render our own marker, so the row does
 * not read "01 1. Foundations". Presentational only — frontmatter is content
 * -track territory and stays untouched.
 */
function stripLeadingOrdinal(label: string): string {
  return label.replace(/^\d+[.)]\s*/, "");
}

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  const state = getChapterState(item.docId);

  // Top-level leaves (if any) stay unnumbered; so do items opting out via
  // `customProps.unnumbered` in sidebars.ts (the Reference group).
  const showOrdinal = level >= 2 && item.customProps?.unnumbered !== true;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        "menu__list-item",
        "tbb-sb-item",
        className,
      )}
      key={label}
      data-chapter-state={state}
    >
      <Link
        className={clsx("menu__link", "tbb-sb-link", {
          [styles.menuExternalLink]: !isInternalLink,
          "menu__link--active": isActive,
        })}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? "page" : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        {showOrdinal && (
          <span className="tbb-sb-link__ordinal" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className={clsx("tbb-sb-link__label", styles.linkLabel)}>
          {showOrdinal ? stripLeadingOrdinal(label) : label}
        </span>
        {state && (
          <span
            className="tbb-sb-link__state"
            role="img"
            aria-label={STATE_LABEL[state]}
            title={STATE_LABEL[state]}
          />
        )}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
