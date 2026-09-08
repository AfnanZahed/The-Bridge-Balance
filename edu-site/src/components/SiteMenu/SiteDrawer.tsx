/**
 * SiteDrawer — the rebuilt navigation drawer.
 *
 * Renders one backdrop + one panel. Below 997px the desktop doc sidebar is
 * hidden, so on a doc route this drawer is the *only* way to reach chapters —
 * it therefore renders the real sidebar tree rather than a parallel hand-kept
 * list. The tree arrives through Docusaurus's secondary-menu portal, published
 * by the swizzled `DocSidebar/Mobile`; the navbar sits outside
 * `DocsSidebarProvider`, so that portal is the supported way across the
 * boundary. Off doc routes (and at desktop width, where the real sidebar is
 * already on screen) it falls back to the site-level entries below.
 *
 * Route state comes from `useLocation()` so the active link stays in sync
 * without coupling to Docusaurus's internal sidebar markup. The drawer mounts
 * only while open so the closed state is fully inert in the accessibility tree.
 *
 * Dismissal paths (FR-005):
 *  - The hamburger button itself (via `useDrawer().toggle()`).
 *  - This panel's close affordance.
 *  - Clicking the backdrop.
 *  - Activating any in-drawer link.
 *  - The `Escape` key (handled in `useDrawer`).
 *  - Route changes (handled in `useDrawer`) — which is also what dismisses the
 *    drawer when a chapter is picked from the tree.
 */

import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";
import { type ReactNode } from "react";
import { useSiteDrawer } from "./useDrawer";

type NavEntry = {
  /** Display text for screen readers and visual users. */
  label: string;
  /** Internal route. Mutually exclusive with `href`. */
  to?: string;
  /** External route. Mutually exclusive with `to`. */
  href?: string;
  /**
   * Kept when the curriculum tree is showing — the tree covers every stage,
   * but not these.
   */
  keepWithTree?: boolean;
};

const NAV_ENTRIES: NavEntry[] = [
  { to: "/", label: "Home", keepWithTree: true },
  {
    to: "/stage-01-spec-aware-vibe-engineering/",
    label: "Stage 1 — Foundations",
  },
  { to: "/stage-02-cs50-certification/", label: "Stage 2 — CS50 Certs" },
  {
    to: "/stage-03-mastering-ai-coding-agents/",
    label: "Stage 3 — AI Coding Agents",
  },
  {
    to: "/stage-04-engineering-autonomous-ai-agents/",
    label: "Stage 4 — Autonomous Agents",
  },
  {
    href: "https://github.com/the-bridge-balance/the-bridge-balance",
    label: "GitHub",
    keepWithTree: true,
  },
];

function isActive(currentPath: string, target: string): boolean {
  if (target === "/") return currentPath === "/";
  // Parent-route match: `/stage-01-spec-aware-vibe-engineering/intro`
  // should still highlight the Stage 1 entry.
  return currentPath === target || currentPath.startsWith(target);
}

export default function SiteDrawer(): ReactNode {
  const controller = useSiteDrawer();
  const { isOpen, close, navbarHeight } = controller;
  const location = useLocation();
  const secondaryMenu = useNavbarSecondaryMenu();

  if (!isOpen) return null;

  const tree = secondaryMenu.content;
  const entries = tree
    ? NAV_ENTRIES.filter((entry) => entry.keepWithTree)
    : NAV_ENTRIES;

  return (
    <>
      <div
        className="site-drawer__backdrop"
        onClick={() => close("backdrop")}
        aria-hidden="true"
      />
      <div
        id="site-drawer"
        className="site-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-drawer-title"
        style={{ top: `${navbarHeight}px` }}
      >
        <header className="site-drawer__header">
          <h2 id="site-drawer-title" className="visually-hidden">
            Site Navigation
          </h2>
          <button
            type="button"
            className="site-drawer__close"
            onClick={() => close("button")}
            aria-label="Close site navigation"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <nav className="site-drawer__panel" aria-label="Primary">
          {tree}
          <ul
            className={
              tree
                ? "site-drawer__list site-drawer__list--secondary"
                : "site-drawer__list"
            }
          >
            {entries.map((entry) => {
              const target = entry.to ?? entry.href ?? "#";
              const active =
                !entry.href && entry.to
                  ? isActive(location.pathname, entry.to)
                  : false;
              return (
                <li key={target} className="site-drawer__item">
                  <Link
                    {...(entry.to
                      ? { to: entry.to }
                      : { href: entry.href ?? "#" })}
                    className="site-drawer__link"
                    data-active={active ? "true" : undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={() => close("link")}
                  >
                    {entry.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
