/**
 * <Callout /> — colored admonition box for MDX.
 *
 * Variants:
 *   - info     (indigo / primary)
 *   - tip      (cyan / stage-1)
 *   - important (amber / stage-2)
 *   - warning  (coral accent)
 *   - danger   (red)
 *
 * Usage in MDX:
 *
 *   <Callout type="info" title="Heads up">
 *     The RAG chatbot wires up in Phase B.
 *   </Callout>
 */

import React from "react";
import { Info, Lightbulb, AlertTriangle, Zap, AlertTriangle as Danger } from "../icons";

type Variant = "info" | "tip" | "important" | "warning" | "danger";

interface Props {
  type?: Variant;
  title?: string;
  children: React.ReactNode;
}

const VARIANT_META: Record<
  Variant,
  { className: string; defaultTitle: string; Icon: React.ComponentType<{ size?: number }> }
> = {
  info: {
    className: "tbb-callout--info",
    defaultTitle: "Note",
    Icon: Info,
  },
  tip: {
    className: "tbb-callout--tip",
    defaultTitle: "Tip",
    Icon: Lightbulb,
  },
  important: {
    className: "tbb-callout--important",
    defaultTitle: "Important",
    Icon: Zap,
  },
  warning: {
    className: "tbb-callout--warning",
    defaultTitle: "Warning",
    Icon: AlertTriangle,
  },
  danger: {
    className: "tbb-callout--danger",
    defaultTitle: "Danger",
    Icon: Danger,
  },
};

export default function Callout({
  type = "info",
  title,
  children,
}: Props): React.ReactElement {
  const meta = VARIANT_META[type];
  const Icon = meta.Icon;
  const displayTitle = title ?? meta.defaultTitle;

  return (
    <div className={`tbb-callout ${meta.className}`} role="note">
      <Icon size={20} aria-hidden="true" />
      <div className="tbb-callout__body">
        <p className="tbb-callout__title">{displayTitle}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}
