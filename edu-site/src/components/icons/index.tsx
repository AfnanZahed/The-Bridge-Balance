/**
 * Icon wrapper layer for The Bridge Balance.
 *
 * Each named export re-exports a Phosphor icon at a curated weight (regular /
 * bold / fill / duotone) so the rest of the codebase has a stable, hand-picked
 * visual vocabulary. The wrappers normalise the API to `{ size?: number }` +
 * any other SVG props, preserving the contract every component relied on
 * before the Phosphor migration.
 *
 * Why Phosphor: 6 weights, consistent optical sizing, accessible defaults,
 * tree-shakable per icon. We use duotone for "decorative / personality" icons,
 * fill for "status / signal" icons, and regular/bold for "directional / UI"
 * icons. Editorial hierarchy: regular in body, bold in CTAs.
 */
import React from "react";
import type { IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import {
  ArrowRight as PhosphorArrowRight,
  BookOpen as PhosphorBookOpen,
  Medal as PhosphorAward,
  Cpu as PhosphorCpu,
  GitBranch as PhosphorGitBranch,
  GithubLogo as PhosphorGithubLogo,
  Check as PhosphorCheck,
  Clock as PhosphorClock,
  Users as PhosphorUsers,
  Info as PhosphorInfo,
  Warning as PhosphorWarning,
  Lightning as PhosphorLightning,
  Lightbulb as PhosphorLightbulb,
  Database as PhosphorDatabase,
  Stack as PhosphorStack,
  Sparkle as PhosphorSparkle,
} from "@phosphor-icons/react";

export type IconProps = Omit<PhosphorIconProps, "size"> & {
  size?: number | string;
};

export function ArrowRight({ size = 20, ...rest }: IconProps) {
  return <PhosphorArrowRight size={size} weight="bold" {...rest} />;
}

export function BookOpen({ size = 20, ...rest }: IconProps) {
  return <PhosphorBookOpen size={size} weight="duotone" {...rest} />;
}

export function Sparkles({ size = 20, ...rest }: IconProps) {
  return <PhosphorSparkle size={size} weight="fill" {...rest} />;
}

export function Award({ size = 20, ...rest }: IconProps) {
  return <PhosphorAward size={size} weight="fill" {...rest} />;
}

export function Cpu({ size = 20, ...rest }: IconProps) {
  return <PhosphorCpu size={size} weight="regular" {...rest} />;
}

export function GitBranch({ size = 20, ...rest }: IconProps) {
  return <PhosphorGitBranch size={size} weight="regular" {...rest} />;
}

export function Github({ size = 20, ...rest }: IconProps) {
  return <PhosphorGithubLogo size={size} weight="bold" {...rest} />;
}

export function Check({ size = 20, ...rest }: IconProps) {
  return <PhosphorCheck size={size} weight="bold" {...rest} />;
}

export function Clock({ size = 20, ...rest }: IconProps) {
  return <PhosphorClock size={size} weight="regular" {...rest} />;
}

export function Users({ size = 20, ...rest }: IconProps) {
  return <PhosphorUsers size={size} weight="duotone" {...rest} />;
}

export function Info({ size = 20, ...rest }: IconProps) {
  return <PhosphorInfo size={size} weight="fill" {...rest} />;
}

export function AlertTriangle({ size = 20, ...rest }: IconProps) {
  return <PhosphorWarning size={size} weight="fill" {...rest} />;
}

export function Zap({ size = 20, ...rest }: IconProps) {
  return <PhosphorLightning size={size} weight="fill" {...rest} />;
}

export function Lightbulb({ size = 20, ...rest }: IconProps) {
  return <PhosphorLightbulb size={size} weight="duotone" {...rest} />;
}

export function Database({ size = 20, ...rest }: IconProps) {
  return <PhosphorDatabase size={size} weight="duotone" {...rest} />;
}

export function Server({ size = 20, ...rest }: IconProps) {
  return <PhosphorStack size={size} weight="regular" {...rest} />;
}
