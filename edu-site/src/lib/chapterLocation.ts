/**
 * Chapter location — the sidebar-consistent number and stage for a doc.
 *
 * The sidebar numbers its chapter rows from the array index Docusaurus passes
 * to DocSidebarItem/Link (see src/theme/DocSidebarItem/Link/index.tsx). This
 * module reproduces that exact number on the chapter page itself, by walking
 * the same sidebar tree rather than a hand-maintained list — so the reading
 * page and the chrome can never disagree.
 *
 * Reads the same `customProps.unnumbered` opt-out the sidebar honours, and
 * returns null for docs that are not a numbered chapter row (a stage index, a
 * Reference entry, or a doc missing from the sidebar) so callers degrade
 * gracefully instead of printing a wrong ordinal.
 */

import type {
  PropSidebarItem,
  PropSidebarItemCategory,
} from "@docusaurus/plugin-content-docs";

export type ChapterLocation = {
  /** 1-based position within the category, matching the sidebar row. */
  ordinal: number;
  /** "Stage 1" for "Stage 1 — Spec-Aware Vibe Engineering"; "" when undashed. */
  stageEyebrow: string;
  /** "Spec-Aware Vibe Engineering"; the whole label when undashed. */
  stageTitle: string;
};

/**
 * Splits "Stage 1 — Spec-Aware Vibe Engineering" into an eyebrow and a title.
 * An em-dash-free label returns an empty eyebrow and the label as the title,
 * mirroring src/theme/DocSidebarItem/Category/index.tsx.
 */
function splitCategoryLabel(label: string): {
  eyebrow: string;
  title: string;
} {
  const parts = label.split(/\s+—\s+/);
  if (parts.length < 2) {
    return { eyebrow: "", title: label };
  }
  return { eyebrow: parts[0], title: parts.slice(1).join(" — ") };
}

/**
 * Find the numbered position of `docId` within the sidebar tree.
 * Returns null if the doc is unnumbered, is a category link rather than a
 * chapter row, or is simply absent.
 */
export function findChapterLocation(
  items: PropSidebarItem[],
  docId: string | undefined,
): ChapterLocation | null {
  if (!docId) return null;

  for (const item of items) {
    if (item.type !== "category") continue;

    const index = (item as PropSidebarItemCategory).items.findIndex(
      (child) =>
        child.type === "link" &&
        child.docId === docId &&
        child.customProps?.unnumbered !== true,
    );

    if (index !== -1) {
      const { eyebrow, title } = splitCategoryLabel(item.label);
      return { ordinal: index + 1, stageEyebrow: eyebrow, stageTitle: title };
    }

    const nested = findChapterLocation(item.items, docId);
    if (nested) return nested;
  }

  return null;
}
