/**
 * IconWave — Doc & Service icon maps
 *
 * RULE (deliberate, not icon-soup):
 * - lucide-react  → DOCUMENT-TYPE semantics (chapters, videos, specs, checklists, datasets)
 * - @tabler/icons-react → SYSTEM/SERVICE identity in dense chips (providers, infra, platforms)
 *
 * Both libraries are installed and tree-shakable. Phosphor (src/components/icons) remains
 * the PRIMARY page-level vocabulary — this layer is additive for dense, scannable contexts.
 */

// ─── lucide-react: document / content type icons ────────────────────────────────
// All icons exist in lucide-react@1.31.0 dist (verified via d.ts)
export const DOC_TYPE_ICONS = {
  /** A chapter / lecture page */
  chapter: "BookOpen",
  /** A video lecture / walkthrough */
  video: "PlayCircle",
  /** A written specification / ADR / design doc */
  spec: "FileCode2",
  /** A checklist / check-your-understanding section */
  checklist: "ListChecks",
  /** A glossary / reference entry */
  glossary: "LibraryBig",
  /** A dataset / embeddings / benchmark table */
  dataset: "Table",
  /** A code example / runnable snippet */
  code: "FileCode2",
  /** A notebook / interactive exercise */
  notebook: "NotebookText",
  /** A searchable reference / cheat-sheet */
  reference: "FileSearch",
  /** A configuration / schema file */
  config: "FileJson",
} as const;

export type DocTypeKey = keyof typeof DOC_TYPE_ICONS;

// ─── @tabler/icons-react: service / provider identity icons ─────────────────────
// All icons exist in @tabler/icons-react@3.46.0 dist (verified via d.ts)
// We prefer Brand* icons for recognizable logos; fall back to conceptual icons.
export const SERVICE_ICONS = {
  // LLM Providers
  // Note: Tabler has no brand icons for Ollama/Gemini/Together/Qdrant/HF/Claude/Cohere/Mistral.
  // We follow the convention: Brand* icon when available, else a deliberate conceptual icon.
  ollama: "IconDeviceLaptop", // self-hosted → local laptop
  groq: "IconRobot", // fastest inference bot
  gemini: "IconBrandGoogle", // no BrandGemini → Google parent brand
  together: "IconWorld", // many open models, one key
  deepseek: "IconBrain", // strong reasoning
  openai: "IconBrandOpenai",

  // Vector / Embedding / RAG
  qdrant: "IconDatabase", // no BrandQdrant → vector database
  neon: "IconDatabase", // Postgres
  resend: "IconMessageChatbot", // API-driven transactional email
  stripe: "IconBrandStripe",
  vercel: "IconBrandVercel",
  github: "IconBrandGithub",

  // Model / provider families
  huggingface: "IconBrain", // no BrandHuggingFace → open model hub
  anthropic: "IconSparkles", // no BrandClaude → frontier assistant
  cohere: "IconCpu", // no BrandCohere → embeddings/compute
  mistral: "IconBolt", // no BrandMistral → open, fast weights
  google: "IconBrandGoogle",
  aws: "IconBrandAws",
  azure: "IconBrandAzure",
  gcp: "IconBrandGoogle",

  // Generic fallbacks for unknown services
  database: "IconDatabase",
  server: "IconServer",
  cloud: "IconCloud",
  api: "IconApiApp",
  bolt: "IconBolt",
  sparkles: "IconSparkles",
  cpu: "IconCpu",
  stack: "IconStack",
  world: "IconWorld",
} as const;

export type ServiceKey = keyof typeof SERVICE_ICONS;

/**
 * Returns the lucide icon component NAME for a doc type.
 * Caller does: import { BookOpen } from "lucide-react"; <BookOpen />
 */
export function getDocIconName(key: DocTypeKey): string {
  return DOC_TYPE_ICONS[key];
}

/**
 * Returns the tabler icon component NAME for a service.
 * Caller does: import { IconRobot } from "@tabler/icons-react"; <IconRobot />
 */
export function getServiceIconName(key: ServiceKey): string {
  return SERVICE_ICONS[key];
}

/**
 * Union of all known doc-type keys for exhaustiveness checking.
 */
export const ALL_DOC_TYPES: readonly DocTypeKey[] = [
  "chapter",
  "video",
  "spec",
  "checklist",
  "glossary",
  "dataset",
  "code",
  "notebook",
  "reference",
  "config",
] as const;

/**
 * Union of all known service keys for exhaustiveness checking.
 */
export const ALL_SERVICES: readonly ServiceKey[] = [
  "ollama",
  "groq",
  "gemini",
  "together",
  "deepseek",
  "openai",
  "qdrant",
  "neon",
  "resend",
  "stripe",
  "vercel",
  "github",
  "huggingface",
  "anthropic",
  "cohere",
  "mistral",
  "google",
  "aws",
  "azure",
  "gcp",
  "database",
  "server",
  "cloud",
  "api",
  "bolt",
  "sparkles",
  "cpu",
  "stack",
  "world",
] as const;