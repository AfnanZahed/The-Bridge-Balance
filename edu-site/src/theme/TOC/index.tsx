/**
 * Swizzled TOC — forked from @docusaurus/theme-classic 3.7.0.
 *
 * Upstream is a fixed panel: a sticky div of links with no way to get it out of
 * the reader's way. The doc sidebar on the other side of the page has had a
 * collapse handle since the sidebar pass, so on a wide monitor a reader could
 * fold the left rail for full-width prose and still lose a quarter of the
 * viewport to this one. This fork gives the right rail the same affordance, at
 * the same size and on the same 200ms clock, so the two edges of the reading
 * column read as one system rather than one designed control and one bare box.
 *
 * Four decisions worth stating:
 *
 * - **The eyebrow is markup now.** "ON THIS PAGE" was a pure-CSS `::before` in
 *   custom.css, chosen specifically so the upgrade path could avoid a swizzle. A
 *   collapse handle needs a real row to sit in, and a pseudo-element cannot host
 *   a button. The trade is deliberate: a control the reader can reach beats a
 *   rule that was never load-bearing. The `::before` is retired there, and its
 *   type rules moved into this component's stylesheet.
 * - **One button, not two.** The sidebar does this with a collapse button that
 *   unmounts and an expand button that mounts. That is fine for a pointer but
 *   costs keyboard focus on every toggle, so this uses a single button whose
 *   glyph and `aria-expanded` change. Same disclosure contract (W3C WAI-ARIA
 *   APG), no focus to lose.
 * - **The rail is 44px, not zero.** Folded, it keeps the project's touch target
 *   and a knob to come back through, exactly as the left rail does. A panel that
 *   vanished entirely would leave no way back.
 * - **It stays mounted.** The list is hidden with `visibility` (delayed to the
 *   end of its fade) rather than unmounted, which is what takes the links out of
 *   the tab order and the accessibility tree while still letting them dim.
 *
 * The rail's own WIDTH is not set here. The column that contains it, the article
 * column beside it and the prose measure all live outside this subtree, so the
 * fold is expressed in custom.css against `<html data-tbb-toc-collapsed>` —
 * see useTocCollapse.ts, which sets it.
 *
 * NOTE: on a Docusaurus upgrade, re-diff against the upstream 3.7.0 source.
 */

import TOCItems from "@theme/TOCItems";
import type { Props } from "@theme/TOC";
import { translate } from "@docusaurus/Translate";
import SidebarPanelGlyph from "@site/src/components/SidebarPanelGlyph";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./styles.module.css";
import { useTocCollapse } from "./useTocCollapse";

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = "table-of-contents__link toc-highlight";
const LINK_ACTIVE_CLASS_NAME = "table-of-contents__link--active";

/** Named by the handle's `aria-controls`, so the disclosure resolves. */
const PANEL_ID = "tbb-toc-panel";

export default function TOC({ className, ...props }: Props): ReactNode {
  const { collapsed, toggle } = useTocCollapse();

  const label = collapsed
    ? translate({
        id: "theme.tbb.toc.expandAriaLabel",
        message: "Expand this page's contents",
        description: "Accessible name of the reading page's expand control",
      })
    : translate({
        id: "theme.tbb.toc.collapseAriaLabel",
        message: "Collapse this page's contents",
        description: "Accessible name of the reading page's collapse control",
      });

  return (
    <div
      className={clsx(
        styles.tableOfContents,
        "thin-scrollbar",
        className,
        collapsed && styles.collapsed,
      )}
    >
      <div className={styles.header}>
        {/* Sentence case in the DOM, uppercased in CSS: the eyebrow is read by
            screen readers and passed through translation, and neither wants a
            pre-shouted string. */}
        <span className={styles.eyebrow}>
          {translate({
            id: "theme.tbb.toc.eyebrow",
            message: "On this page",
            description: "Label above the reading page's table of contents",
          })}
        </span>
        <button
          type="button"
          className={styles.handle}
          aria-label={label}
          title={label}
          aria-expanded={!collapsed}
          aria-controls={PANEL_ID}
          onClick={toggle}
        >
          {/* `in` folds the panel onto its rail, `out` pulls it back — the same
              pairing the sidebar's handles use, mirrored for this edge. */}
          <SidebarPanelGlyph
            direction={collapsed ? "out" : "in"}
            side="right"
            className={styles.handleIcon}
          />
        </button>
      </div>
      <div id={PANEL_ID} className={styles.panel}>
        <TOCItems
          {...props}
          linkClassName={LINK_CLASS_NAME}
          linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
        />
      </div>
    </div>
  );
}
