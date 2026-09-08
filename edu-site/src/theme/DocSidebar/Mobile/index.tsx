/**
 * Swizzled DocSidebar/Mobile — forked from @docusaurus/theme-classic 3.7.0.
 *
 * Below 997px the desktop sidebar container is hidden, so the chapter tree has
 * to reach the reader some other way. This site replaced Docusaurus's
 * `MobileSidebar` with its own `SiteDrawer` (rendered from the navbar, which
 * sits outside `DocsSidebarProvider` — so the drawer cannot call
 * `useDocsSidebar()` itself).
 *
 * `NavbarSecondaryMenuFiller` is the supported bridge across that boundary:
 * this component runs inside the docs tree, where the sidebar data exists, and
 * publishes the rendered tree into a context the navbar can read. `SiteDrawer`
 * consumes it via `useNavbarSecondaryMenu().content`.
 *
 * Two changes from upstream:
 *  - a `tbb-sb` scope wrapper, so the one sidebar CSS system in custom.css
 *    styles the drawer's tree and the desktop panel identically;
 *  - upstream's `onItemClick` toggled the stock mobile sidebar, which this site
 *    never renders. Dropped: `useDrawer` already closes the drawer on route
 *    change, which is the same outcome for links, and leaves link-less category
 *    headers free to expand without dismissing the drawer.
 *
 * NOTE: on a Docusaurus upgrade, re-diff against the upstream 3.7.0 source.
 */

import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import type { Props } from "@theme/DocSidebar/Mobile";
import DocSidebarItems from "@theme/DocSidebarItems";
import clsx from "clsx";
import React, { type ReactNode } from "react";

const DocSidebarMobileSecondaryMenu: React.ComponentType<Props> = ({
  sidebar,
  path,
}) => (
  <div className="tbb-sb">
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
      <DocSidebarItems items={sidebar} activePath={path} level={1} />
    </ul>
  </div>
);

function DocSidebarMobile(props: Props): ReactNode {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
