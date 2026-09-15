/**
 * Swizzled DocSidebar/Desktop/CollapseButton — forked from
 * @docusaurus/theme-classic 3.7.0.
 *
 * Upstream is a full-bleed 40px bar: `border-radius: 0`, a 1px box all round, a
 * hardcoded grey double chevron, and Infima's `button` classes underneath. Set
 * against a panel that has a frosted header, numbered rows and a hairline spine,
 * it read as leftover chrome bolted to the bottom of a designed surface.
 *
 * This fork makes it the panel's handle — a capsule on the panel's own ground,
 * sized to its content and centred on the panel's axis, carrying the panel/rail
 * glyph and naming the action in words. Three decisions worth stating:
 *
 * - **It hovers the way a row does.** No new vocabulary: the ink promotes to
 *   `--tbb-text` and the shadow steps up, which is the same promotion
 *   `.tbb-sb .menu__link:hover` performs. The handle is the panel's last row that
 *   happens to be a control.
 * - **Neutral, never accent.** `--tbb-accent` is scoped to a named list of
 *   surfaces (ADR-0003) that this control is not on. It appears in the focus
 *   ring only, which is on that list.
 * - **`aria-expanded`.** The control is a disclosure (W3C WAI-ARIA APG): what it
 *   names goes away when it is pressed, so it reports that state.
 *
 * NOTE: on a Docusaurus upgrade, re-diff against the upstream 3.7.0 source.
 */

import { translate } from "@docusaurus/Translate";
import SidebarPanelGlyph from "@site/src/components/SidebarPanelGlyph";
import type { Props } from "@theme/DocSidebar/Desktop/CollapseButton";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

export default function CollapseButton({ onClick }: Props): ReactNode {
  return (
    <button
      type="button"
      title={translate({
        id: "theme.docs.sidebar.collapseButtonTitle",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar",
      })}
      aria-label={translate({
        id: "theme.docs.sidebar.collapseButtonAriaLabel",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar",
      })}
      aria-expanded="true"
      className={styles.collapseSidebarButton}
      onClick={onClick}
    >
      <SidebarPanelGlyph
        direction="in"
        className={styles.collapseSidebarButtonIcon}
      />
      {/* Visible label is sentence case and shorter than the accessible name on
          purpose; the name contains it, so WCAG 2.5.3 "Label in Name" holds. */}
      <span>
        {translate({
          id: "theme.docs.sidebar.collapseButtonLabel",
          message: "Collapse",
          description:
            "The visible label on the doc sidebar's collapse control",
        })}
      </span>
    </button>
  );
}
