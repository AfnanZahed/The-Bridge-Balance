/**
 * SiteMenuButton — the rebuilt hamburger control.
 *
 * Stateless presentation over `useSiteDrawer()`. Renders a native <button>
 * with the WCAG-required accessible name, `aria-expanded`, and
 * `aria-controls` linkage. Click target is fixed at 44×44 CSS px so phones,
 * tablets, and desktops all share the same affordance size.
 */

import { type ReactNode } from "react";
import { useSiteDrawer } from "./useDrawer";

export default function SiteMenuButton(): ReactNode {
  const { isOpen, toggle, triggerRef } = useSiteDrawer();
  return (
    <button
      ref={triggerRef}
      onClick={toggle}
      type="button"
      className="site-menu-button navbar__toggle clean-btn"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls={isOpen ? "site-drawer" : undefined}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {isOpen ? (
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M3 6h14M3 10h14M3 14h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}
