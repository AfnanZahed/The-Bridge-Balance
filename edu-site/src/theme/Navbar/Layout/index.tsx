/**
 * Swizzled Navbar/Layout — owns the rebuilt hamburger drawer.
 *
 * Replaces the Docusaurus default `MobileSidebar` and `MobileSidebar/Toggle`
 * with our `SiteDrawer` + `SiteMenuButton`. The single `useDrawer()` instance
 * lives here so the layout is the sole source of truth; `SiteMenuButton` and
 * `SiteDrawer` consume it via `SiteDrawerContext`.
 *
 * Spec: specs/001-hamburger-rebuild/spec.md (FR-010 — must not depend on
 * Docusaurus's internal MobileSidebar mounting rules).
 */

import { translate } from "@docusaurus/Translate";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import { useHideableNavbar } from "@docusaurus/theme-common/internal";
import SiteDrawer from "@site/src/components/SiteMenu/SiteDrawer";
import {
  SiteDrawerContext,
  useDrawer,
} from "@site/src/components/SiteMenu/useDrawer";
import type { Props } from "@theme/Navbar/Layout";
import clsx from "clsx";
import { type ReactNode } from "react";

import styles from "./styles.module.css";

export default function NavbarLayout({ children }: Props): ReactNode {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const controller = useDrawer();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);
  return (
    <SiteDrawerContext.Provider value={controller}>
      <nav
        ref={navbarRef}
        aria-label={translate({
          id: "theme.NavBar.navAriaLabel",
          message: "Main",
          description: "The ARIA label for the main navigation",
        })}
        className={clsx(
          ThemeClassNames.layout.navbar.container,
          "navbar",
          "navbar--fixed-top",
          hideOnScroll && [
            styles.navbarHideable,
            !isNavbarVisible && styles.navbarHidden,
          ],
          {
            "navbar--dark": style === "dark",
            "navbar--primary": style === "primary",
            "navbar-sidebar--show": controller.isOpen,
          },
        )}
      >
        {children}
      </nav>
      {/* Keep the overlay outside the filtered navbar. `backdrop-filter` on
          `.navbar` creates a containing block for fixed descendants; placing
          the drawer as a sibling makes fixed geometry resolve to the viewport. */}
      <SiteDrawer />
    </SiteDrawerContext.Provider>
  );
}
