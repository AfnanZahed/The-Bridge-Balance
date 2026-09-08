/**
 * Swizzled DocSidebar/Desktop/Content — forked from @docusaurus/theme-classic
 * 3.7.0.
 *
 * The upstream markup is preserved exactly — `<nav class="menu thin-scrollbar">`
 * wrapping `<ul class="menu__list">` with `ThemeClassNames.docs.docSidebarMenu`,
 * plus the announcement-bar offset — because both Docusaurus and our CSS key
 * off those classes. The only addition is a `tbb-sb__nav` scope class; the
 * panel shell in ../index.tsx owns the scroll state and observes this element.
 *
 * NOTE: on a Docusaurus upgrade, re-diff against the upstream 3.7.0 source.
 */

import { translate } from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useAnnouncementBar,
  useScrollPosition,
} from "@docusaurus/theme-common/internal";
import type { Props } from "@theme/DocSidebar/Desktop/Content";
import DocSidebarItems from "@theme/DocSidebarItems";
import clsx from "clsx";
import { type ReactNode, useState } from "react";

import styles from "./styles.module.css";

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): ReactNode {
  const showAnnouncementBar = useShowAnnouncementBar();

  return (
    <nav
      aria-label={translate({
        id: "theme.docs.sidebar.navAriaLabel",
        message: "Docs sidebar",
        description: "The ARIA label for the sidebar navigation",
      })}
      className={clsx(
        "menu thin-scrollbar",
        "tbb-sb__nav",
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}
    >
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
