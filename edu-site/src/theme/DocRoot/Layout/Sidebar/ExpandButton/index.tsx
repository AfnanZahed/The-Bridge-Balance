/**
 * Swizzled DocRoot/Layout/Sidebar/ExpandButton — forked from
 * @docusaurus/theme-classic 3.7.0.
 *
 * Upstream is a `div[role="button"]` stretched over the entire collapsed rail
 * (`position: absolute; inset: 0`, so the full width by the full viewport
 * height) with a grey double chevron parked in the middle of it and
 * `onKeyDown={toggleSidebar}` firing on any key at all. What a reader saw was a
 * blank strip with an orphaned arrow: nothing on it read as a control.
 *
 * Two changes:
 *
 * - **A real `<button>`.** Native activation (Enter and Space, and nothing else),
 *   no hand-maintained `role` promise, and `aria-expanded="false"` so the same
 *   disclosure the collapse button reports reads correctly from this side.
 * - **A knob to look at.** The same handle as the panel's foot, in its collapsed
 *   form: a square on the rail's own ground with the glyph aimed back out,
 *   sitting below the navbar the rail runs underneath. The whole rail stays the
 *   hit target — it is 44px wide and Docusaurus's hidden-container rule already
 *   gives it `cursor: pointer` — but the focus ring is drawn on the knob rather
 *   than around a 44 × 100vh rectangle, so keyboard users see it where the
 *   control actually appears.
 *
 * NOTE: on a Docusaurus upgrade, re-diff against the upstream 3.7.0 source.
 */

import { translate } from "@docusaurus/Translate";
import SidebarPanelGlyph from "@site/src/components/SidebarPanelGlyph";
import type { Props } from "@theme/DocRoot/Layout/Sidebar/ExpandButton";
import type { ReactNode } from "react";

import styles from "./styles.module.css";

export default function DocRootLayoutSidebarExpandButton({
  toggleSidebar,
}: Props): ReactNode {
  return (
    <button
      type="button"
      className={styles.expandButton}
      title={translate({
        id: "theme.docs.sidebar.expandButtonTitle",
        message: "Expand sidebar",
        description:
          "The ARIA label and title attribute for expand button of doc sidebar",
      })}
      aria-label={translate({
        id: "theme.docs.sidebar.expandButtonAriaLabel",
        message: "Expand sidebar",
        description:
          "The ARIA label and title attribute for expand button of doc sidebar",
      })}
      aria-expanded="false"
      onClick={toggleSidebar}
    >
      <span className={styles.expandButtonKnob}>
        <SidebarPanelGlyph direction="out" />
      </span>
    </button>
  );
}
