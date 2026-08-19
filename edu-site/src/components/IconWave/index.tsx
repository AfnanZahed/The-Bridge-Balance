/**
 * IconWave — dense, scannable icon-chip strip
 *
 * Renders a horizontal row of topic chips. Each chip = title + a Tabler service icon
 * (primary) + a subtle Lucide accent glyph (secondary). Designed for "what you'll learn"
 * strips, provider rows, doc-type badges — any dense context where Phosphor's weight
 * variance feels heavy.
 *
 * DESIGN RULES (enforced here, not in consumers):
 * - Fixed icon size: 18px
 * - Fixed stroke: 1.8 (Tabler default stroke-width is 2; we pass 1.8 for harmony with Lucide's 2)
 * - Baseline-aligned via inline-flex + vertical-align: middle
 * - Uses --tbb-* semantic tokens ONLY (no inline hex)
 * - Phosphor (src/components/icons) remains the PRIMARY page vocabulary — this is additive
 */

import React from "react";
import type { DocTypeKey, ServiceKey } from "./doc-icons";

// ─── Static icon imports (tree-shakable — only used icons bundled) ────────────

// Lucide icons for document types
import {
  BookOpen as LucideBookOpen,
  PlayCircle as LucidePlayCircle,
  FileCode2 as LucideFileCode2,
  ListChecks as LucideListChecks,
  LibraryBig as LucideLibraryBig,
  Table as LucideTable,
  NotebookText as LucideNotebookText,
  FileSearch as LucideFileSearch,
  FileJson as LucideFileJson,
} from "lucide-react";

// Tabler icons for services / providers
import {
  IconRobot,
  IconDeviceLaptop,
  IconBrandOpenai,
  IconBrandStripe,
  IconBrandVercel,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandAws,
  IconBrandAzure,
  IconDatabase,
  IconMessageChatbot,
  IconBrain,
  IconServer,
  IconCloud,
  IconApiApp,
  IconBolt,
  IconSparkles,
  IconCpu,
  IconStack,
  IconWorld,
} from "@tabler/icons-react";

export type ChipKind = "doc" | "service";

export interface IconWaveChip {
  /** Unique key for React lists */
  key: string;
  /** Human-readable label */
  label: string;
  /** Chip flavor: "doc" → lucide accent, "service" → tabler primary */
  kind: ChipKind;
  /** DocTypeKey when kind === "doc" */
  docType?: DocTypeKey;
  /** ServiceKey when kind === "service" */
  service?: ServiceKey;
  /** Optional href — renders as <a>, otherwise <span> */
  href?: string;
  /** Optional aria-label override */
  ariaLabel?: string;
}

interface IconWaveProps {
  /** Array of chips to render */
  chips: IconWaveChip[];
  /** Optional section label (visually hidden, for a11y) */
  ariaLabel?: string;
  /** Additional className for the container */
  className?: string;
  /** Max chips before "+N more" overflow (default 8) */
  maxVisible?: number;
}

// ─── Icon component maps (string key → React component) ───────────────────────

const LUCIDE_ICON_MAP: Record<DocTypeKey, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  chapter: LucideBookOpen,
  video: LucidePlayCircle,
  spec: LucideFileCode2,
  checklist: LucideListChecks,
  glossary: LucideLibraryBig,
  dataset: LucideTable,
  code: LucideFileCode2,
  notebook: LucideNotebookText,
  reference: LucideFileSearch,
  config: LucideFileJson,
};

const TABLER_ICON_MAP: Record<ServiceKey, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  ollama: IconDeviceLaptop,
  groq: IconRobot,
  gemini: IconBrandGoogle,
  together: IconWorld,
  deepseek: IconBrain,
  openai: IconBrandOpenai,
  qdrant: IconDatabase,
  neon: IconDatabase,
  resend: IconMessageChatbot,
  stripe: IconBrandStripe,
  vercel: IconBrandVercel,
  github: IconBrandGithub,
  huggingface: IconBrain,
  anthropic: IconSparkles,
  cohere: IconCpu,
  mistral: IconBolt,
  google: IconBrandGoogle,
  aws: IconBrandAws,
  azure: IconBrandAzure,
  gcp: IconBrandGoogle,
  database: IconDatabase,
  server: IconServer,
  cloud: IconCloud,
  api: IconApiApp,
  bolt: IconBolt,
  sparkles: IconSparkles,
  cpu: IconCpu,
  stack: IconStack,
  world: IconWorld,
};

/**
 * Inner chip component — memoized to avoid re-renders on parent changes.
 */
const Chip = React.memo(function Chip({ chip }: { chip: IconWaveChip }) {
  const isLink = !!chip.href;
  const Component = isLink ? "a" : "span";

  const PrimaryIcon = chip.kind === "service" && chip.service
    ? TABLER_ICON_MAP[chip.service]
    : chip.kind === "doc" && chip.docType
      ? LUCIDE_ICON_MAP[chip.docType]
      : null;

  // For service chips, optionally show a subtle lucide accent if docType provided
  const AccentIcon = chip.kind === "service" && chip.docType
    ? LUCIDE_ICON_MAP[chip.docType]
    : null;

  const chipStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "var(--tbb-radius-pill)",
    background: "var(--tbb-surface)",
    border: "1px solid var(--tbb-border)",
    color: "var(--tbb-text)",
    fontSize: "0.8125rem",
    fontWeight: 500,
    lineHeight: 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background var(--tbb-duration-fast) var(--tbb-ease), border-color var(--tbb-duration-fast) var(--tbb-ease), box-shadow var(--tbb-duration-fast) var(--tbb-ease)",
    boxShadow: "var(--tbb-shadow-xs)",
    flexShrink: 0,
  };

  const iconWrapperStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    flexShrink: 0,
    verticalAlign: "middle",
  };

  const primaryIconStyle: React.CSSProperties = {
    ...iconWrapperStyle,
    color: chip.kind === "service" ? "var(--ifm-color-primary)" : "var(--tbb-text)",
  };

  const accentStyle: React.CSSProperties = {
    ...iconWrapperStyle,
    opacity: 0.55,
    color: "var(--tbb-text-muted)",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.background = "var(--tbb-bg-alt)";
    target.style.borderColor = "var(--tbb-border-strong)";
    target.style.boxShadow = "var(--tbb-shadow-sm)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.background = "var(--tbb-surface)";
    target.style.borderColor = "var(--tbb-border)";
    target.style.boxShadow = "var(--tbb-shadow-xs)";
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.outline = "none";
    target.style.boxShadow = "var(--tbb-shadow-glow)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.boxShadow = "var(--tbb-shadow-xs)";
  };

  return (
    <Component
      key={chip.key}
      href={chip.href}
      style={chipStyle}
      className="tbb-iconwave-chip"
      aria-label={chip.ariaLabel || chip.label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Primary icon */}
      {PrimaryIcon && (
        <PrimaryIcon
          style={primaryIconStyle}
          strokeWidth={chip.kind === "service" ? 1.8 : 2}
          aria-hidden="true"
        />
      )}

      {/* Label */}
      <span style={{ lineHeight: 1 }}>{chip.label}</span>

      {/* Optional subtle Lucide accent for service chips */}
      {AccentIcon && (
        <AccentIcon
          style={accentStyle}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </Component>
  );
});

Chip.displayName = "IconWaveChip";

/**
 * IconWave — public component.
 *
 * Usage:
 * ```tsx
 * <IconWave
 *   chips={[
 *     { key: "groq", label: "Groq", kind: "service", service: "groq" },
 *     { key: "gemini", label: "Gemini", kind: "service", service: "gemini" },
 *     { key: "video", label: "Video", kind: "doc", docType: "video" },
 *   ]}
 * />
 * ```
 */
export function IconWave({
  chips,
  ariaLabel = "Icon wave",
  className = "",
  maxVisible = 8,
}: IconWaveProps): React.ReactElement {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    alignItems: "center",
    rowGap: "0.375rem",
  };

  const visibleChips = chips.slice(0, maxVisible);
  const hiddenCount = chips.length - maxVisible;

  return (
    <div
      className={`tbb-iconwave ${className}`.trim()}
      style={containerStyle}
      role="group"
      aria-label={ariaLabel}
    >
      {visibleChips.map((chip) => (
        <Chip key={chip.key} chip={chip} />
      ))}
      {hiddenCount > 0 && (
        <span
          className="tbb-iconwave-more"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.25rem 0.5rem",
            borderRadius: "var(--tbb-radius-pill)",
            background: "var(--tbb-bg-alt)",
            border: "1px solid var(--tbb-border)",
            color: "var(--tbb-text-muted)",
            fontSize: "0.8125rem",
            fontWeight: 500,
          }}
          aria-hidden="true"
        >
          +{hiddenCount} more
        </span>
      )}
    </div>
  );
}

export default IconWave;