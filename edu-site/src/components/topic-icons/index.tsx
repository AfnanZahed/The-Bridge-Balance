/**
 * TopicIcon — Phosphor-based icon family for Stage 1 chapter topics.
 *
 * Phosphor replaces the hand-rolled SVG icons so all icons share the
 * same optical weight + corner geometry. The wrapper preserves the
 * original `TopicIcon` API (`name` + `size`), so existing consumers
 * don't need to change.
 *
 * Topics:
 *   architecture  → Blueprint (duotone) — plans, foundations
 *   programming   → Code (bold)         — code brackets
 *   frontend      → Monitor (regular)   — UI / viewport
 *   backend       → Stack (duotone)     — server rack
 *   databases     → Database (duotone)  — stacked cylinders
 *   git           → GitBranch (regular) — branching tree
 */
import React from "react";
import {
  Blueprint,
  Code,
  Monitor,
  Stack,
  Database,
  GitBranch,
} from "@phosphor-icons/react";

export type TopicIconName =
  | "architecture"
  | "programming"
  | "frontend"
  | "backend"
  | "databases"
  | "git";

export type TopicIconProps = Omit<React.SVGProps<SVGSVGElement>, "children"> & {
  name: TopicIconName;
  size?: number;
};

export function TopicIcon({ name, size = 24, ...rest }: TopicIconProps) {
  return (
    <span
      aria-hidden="true"
      style={{ display: "inline-flex", color: "currentColor" }}
    >
      {name === "architecture" && (
        <Blueprint size={size} weight="duotone" {...rest} />
      )}
      {name === "programming" && (
        <Code size={size} weight="bold" {...rest} />
      )}
      {name === "frontend" && (
        <Monitor size={size} weight="regular" {...rest} />
      )}
      {name === "backend" && (
        <Stack size={size} weight="duotone" {...rest} />
      )}
      {name === "databases" && (
        <Database size={size} weight="duotone" {...rest} />
      )}
      {name === "git" && (
        <GitBranch size={size} weight="regular" {...rest} />
      )}
    </span>
  );
}

export default TopicIcon;
