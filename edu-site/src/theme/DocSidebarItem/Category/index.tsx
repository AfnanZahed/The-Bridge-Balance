/**
 * Swizzled DocSidebarItem/Category — forked from @docusaurus/theme-classic
 * 3.7.0.
 *
 * Every upstream behaviour is copied verbatim — auto-expand of the active
 * category, the SSR href fallback, `useCollapsible`, `autoCollapseCategories`,
 * the collapse-on-click-when-already-here rule, and `<Collapsible lazy>`. Only
 * the render tree changes, into the stage row the sidebar design calls for:
 *
 *     [glyph] [eyebrow / title] [caret]
 *
 * - The label is split on its em dash ("Stage 1 — SDE Mastery (AI-Driven)")
 *   into a small letterspaced eyebrow and a title, because a single line wraps
 *   badly at the sidebar's width. Labels without a dash render as one line.
 * - The glyph is declared per category via `customProps` in sidebars.ts rather
 *   than parsed out of the href. The three stage glyphs mirror
 *   `src/components/stage-icons/` — keep the two in sync.
 * The caret itself is left untouched: Infima draws it from
 * `--ifm-menu-link-sublist-icon`, and custom.css re-masks that glyph at the
 * sidebar scope so a category with a link (a `menu__caret` button) and one
 * without (a `menu__link--sublist-caret` pseudo-element) render identically.
 *
 * NOTE: on a Docusaurus upgrade, re-diff against the upstream 3.7.0 source.
 */

import Link from "@docusaurus/Link";
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";
import {
  findFirstSidebarItemLink,
  isActiveSidebarItem,
  useDocSidebarItemsExpandedState,
  useVisibleSidebarItems,
} from "@docusaurus/plugin-content-docs/client";
import { translate } from "@docusaurus/Translate";
import {
  Collapsible,
  ThemeClassNames,
  useCollapsible,
  usePrevious,
  useThemeConfig,
} from "@docusaurus/theme-common";
import { isSamePath } from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { Atom, Blueprint } from "@phosphor-icons/react";
import { BookOpen, Sparkles } from "@site/src/components/icons";
import type { Props } from "@theme/DocSidebarItem/Category";
import DocSidebarItemLink from "@theme/DocSidebarItem/Link";
import DocSidebarItems from "@theme/DocSidebarItems";
import clsx from "clsx";
import { type ComponentProps, type ReactNode, useEffect, useMemo } from "react";
import styles from "./styles.module.css";

// If we navigate to a category and it becomes active, it should automatically
// expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
  activePath,
}: {
  isActive: boolean;
  collapsed: boolean;
  updateCollapsed: (b: boolean) => void;
  activePath: string;
}) {
  const wasActive = usePrevious(isActive);
  const previousActivePath = usePrevious(activePath);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    const stillActiveButPathChanged =
      isActive && wasActive && activePath !== previousActivePath;
    if ((justBecameActive || stillActiveButPathChanged) && collapsed) {
      updateCollapsed(false);
    }
  }, [
    isActive,
    wasActive,
    collapsed,
    updateCollapsed,
    activePath,
    previousActivePath,
  ]);
}

/**
 * When a collapsible category has no link, we still link it to its first child
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
 * see https://github.com/facebook/docusaurus/issues/3030
 */
function useCategoryHrefWithSSRFallback(
  item: Props["item"],
): string | undefined {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation
    if (isBrowser || !item.collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

function CollapseButton({
  collapsed,
  categoryLabel,
  onClick,
}: {
  collapsed: boolean;
  categoryLabel: string;
  onClick: ComponentProps<"button">["onClick"];
}) {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
              {
                id: "theme.DocSidebarItem.expandCategoryAriaLabel",
                message: "Expand sidebar category '{label}'",
                description: "The ARIA label to expand the sidebar category",
              },
              { label: categoryLabel },
            )
          : translate(
              {
                id: "theme.DocSidebarItem.collapseCategoryAriaLabel",
                message: "Collapse sidebar category '{label}'",
                description: "The ARIA label to collapse the sidebar category",
              },
              { label: categoryLabel },
            )
      }
      aria-expanded={!collapsed}
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  );
}

/**
 * Glyph for a category, declared in sidebars.ts via `customProps`. The stage
 * glyphs mirror `src/components/stage-icons/`; `aria-hidden` because the
 * adjacent label already names the stage.
 */
function CategoryGlyph({ item }: { item: PropSidebarItemCategory }): ReactNode {
  const { stage, icon } = (item.customProps ?? {}) as {
    stage?: number;
    icon?: string;
  };
  const size = 17;
  let glyph: ReactNode = null;
  if (stage === 1) {
    glyph = <Blueprint size={size} weight="duotone" />;
  } else if (stage === 2) {
    glyph = <Atom size={size} weight="duotone" />;
  } else if (icon === "start") {
    glyph = <Sparkles size={size} />;
  } else if (icon === "reference") {
    glyph = <BookOpen size={size} />;
  }
  if (!glyph) {
    return null;
  }
  return (
    <span className="tbb-sb-cat__glyph" aria-hidden="true">
      {glyph}
    </span>
  );
}

/**
 * Splits "Stage 1 — SDE Mastery (AI-Driven)" into an eyebrow and a title.
 * Degrades to a single line when the label carries no em dash.
 */
function CategoryLinkLabel({ label }: { label: string }) {
  const [eyebrow, ...restParts] = label.split(/\s+—\s+/);
  const title = restParts.join(" — ");
  return (
    <span className={clsx(styles.categoryLinkLabel, "tbb-sb-cat__text")}>
      {title ? (
        <>
          <span className="tbb-sb-cat__eyebrow">{eyebrow}</span>
          <span className="tbb-sb-cat__title">{title}</span>
        </>
      ) : (
        <span className="tbb-sb-cat__title">{label}</span>
      )}
    </span>
  );
}

export default function DocSidebarItemCategory(props: Props): ReactNode {
  const visibleChildren = useVisibleSidebarItems(
    props.item.items,
    props.activePath,
  );
  if (visibleChildren.length === 0) {
    return <DocSidebarItemCategoryEmpty {...props} />;
  } else {
    return <DocSidebarItemCategoryCollapsible {...props} />;
  }
}

function isCategoryWithHref(
  category: PropSidebarItemCategory,
): category is PropSidebarItemCategory & { href: string } {
  return typeof category.href === "string";
}

// If a category doesn't have any visible children, we render it as a link
function DocSidebarItemCategoryEmpty({ item, ...props }: Props): ReactNode {
  // If the category has no link, we don't render anything
  // It's not super useful to render a category you can't open nor click
  if (!isCategoryWithHref(item)) {
    return null;
  }
  // We remove props that don't make sense for a link and forward the rest
  const {
    type,
    collapsed,
    collapsible,
    items,
    linkUnlisted,
    ...forwardableProps
  } = item;
  const linkItem: PropSidebarItemLink = {
    type: "link",
    ...forwardableProps,
  };
  return <DocSidebarItemLink item={linkItem} {...props} />;
}

function DocSidebarItemCategoryCollapsible({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const { items, label, collapsible, className, href } = item;
  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);

  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);

  const { collapsed, setCollapsed } = useCollapsible({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });

  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();
  // Use this instead of `setCollapsed`, because it is also reactive
  const updateCollapsed = (toCollapsed: boolean = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };
  useAutoExpandActiveCategory({
    isActive,
    collapsed,
    updateCollapsed,
    activePath,
  });
  useEffect(() => {
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  const handleItemClick: ComponentProps<"a">["onClick"] = (e) => {
    onItemClick?.(item);
    if (collapsible) {
      if (href) {
        // When already on the category's page, we collapse it
        // We don't use "isActive" because it would collapse the
        // category even when we browse a children element
        // See https://github.com/facebook/docusaurus/issues/11213
        if (isCurrentPage) {
          e.preventDefault();
          updateCollapsed();
        } else {
          // When navigating to a new category, we always expand
          // see https://github.com/facebook/docusaurus/issues/10854#issuecomment-2609616182
          updateCollapsed(false);
        }
      } else {
        e.preventDefault();
        updateCollapsed();
      }
    }
  };

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        "menu__list-item",
        "tbb-sb-item",
        "tbb-sb-cat",
        {
          "menu__list-item--collapsed": collapsed,
        },
        className,
      )}
    >
      <div
        className={clsx("menu__list-item-collapsible", "tbb-sb-cat__row", {
          "menu__list-item-collapsible--active": isCurrentPage,
        })}
      >
        <Link
          className={clsx(
            styles.categoryLink,
            "menu__link",
            "tbb-sb-cat__link",
            {
              "menu__link--sublist": collapsible,
              "menu__link--sublist-caret": !href && collapsible,
              "menu__link--active": isActive,
            },
          )}
          onClick={handleItemClick}
          aria-current={isCurrentPage ? "page" : undefined}
          role={collapsible && !href ? "button" : undefined}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          href={
            collapsible ? (hrefWithSSRFallback ?? "#") : hrefWithSSRFallback
          }
          {...props}
        >
          <CategoryGlyph item={item} />
          <CategoryLinkLabel label={label} />
        </Link>
        {href && collapsible && (
          <CollapseButton
            collapsed={collapsed}
            categoryLabel={label}
            onClick={(e) => {
              e.preventDefault();
              updateCollapsed();
            }}
          />
        )}
      </div>

      <Collapsible
        lazy
        as="ul"
        className="menu__list tbb-sb-sublist"
        collapsed={collapsed}
      >
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}
