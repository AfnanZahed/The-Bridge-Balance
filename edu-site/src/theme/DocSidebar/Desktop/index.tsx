/**
 * Swizzled DocSidebar/Desktop — forked from @docusaurus/theme-classic 3.7.0.
 *
 * Upstream is a bare column: optional logo, the scrolling menu, and an optional
 * collapse button. This fork keeps all three (and `React.memo`) and adds the
 * panel shell the sidebar design calls for — a sticky frosted header carrying a
 * "CURRICULUM" eyebrow plus, when the reader is inside a stage, that stage's
 * name, so orientation survives scrolling a long tree.
 *
 * Deliberately carries no counts or totals: locked decision D5 forbids implying
 * a finalized chapter count anywhere in this repo.
 *
 * NOTE: on a Docusaurus upgrade, re-diff against the upstream 3.7.0 source.
 */

import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import { useThemeConfig } from "@docusaurus/theme-common";
import type { Props } from "@theme/DocSidebar/Desktop";
import CollapseButton from "@theme/DocSidebar/Desktop/CollapseButton";
import Content from "@theme/DocSidebar/Desktop/Content";
import Logo from "@theme/Logo";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

/**
 * True once the panel's scroll region has moved off the top, so the header can
 * grow a hairline only when content is actually passing under it.
 *
 * The flag lands on the shell rather than on the scrolling `<nav>` (which lives
 * in the Content component) on purpose: reading it from the header through
 * `:has()` proved unreliable — Chrome did not always re-evaluate the ancestor's
 * style when the descendant's attribute changed. Owning both the flag and the
 * header here keeps it a plain descendant selector.
 */
function useScrolledNav(
  shellRef: React.RefObject<HTMLElement | null>,
): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = shellRef.current?.querySelector(".tbb-sb__nav");
    if (!nav) {
      return undefined;
    }
    const onScroll = () => setScrolled(nav.scrollTop > 2);
    onScroll();
    nav.addEventListener("scroll", onScroll, { passive: true });
    return () => nav.removeEventListener("scroll", onScroll);
  }, [shellRef]);

  return scrolled;
}

/**
 * The label of the top-level category containing `path`, or undefined at the
 * root. Matches on href prefix rather than walking the doc graph, which is
 * enough for a one-level-deep curriculum and costs nothing to render.
 */
function findActiveCategoryLabel(
  items: readonly PropSidebarItem[],
  path: string,
): string | undefined {
  for (const item of items) {
    if (item.type !== "category") {
      continue;
    }
    const matchesSelf = item.href && path.startsWith(item.href);
    const matchesChild = item.items.some(
      (child) =>
        (child.type === "link" || child.type === "category") &&
        child.href &&
        path.startsWith(child.href),
    );
    if (matchesSelf || matchesChild) {
      return item.label;
    }
  }
  return undefined;
}

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  const activeCategory = findActiveCategoryLabel(sidebar, path);
  const shellRef = useRef<HTMLDivElement>(null);
  const scrolled = useScrolledNav(shellRef);

  return (
    <div
      ref={shellRef}
      data-scrolled={scrolled ? "true" : undefined}
      className={clsx(
        styles.sidebar,
        "tbb-sb",
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <div className="tbb-sb__header">
        <span className="tbb-sb__eyebrow">Curriculum</span>
        {activeCategory && (
          <span className="tbb-sb__context">{activeCategory}</span>
        )}
      </div>
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
