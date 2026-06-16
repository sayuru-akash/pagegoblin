import { z } from "zod";

function truncate(max: number) {
  return (val: string) => val.slice(0, max);
}

function limitArray<T>(max: number) {
  return (val: T[]) => val.slice(0, max);
}

export const PageSignalsSchema = z.object({
  url: z.string().trim().min(1),
  title: z.string().trim().max(500).optional(),
  metaDescription: z.string().trim().max(1000).optional(),
  h1: z.preprocess(
    (val) => Array.isArray(val) ? limitArray<string>(20)(val) : val,
    z.array(z.string().trim().max(300)).optional()
  ),
  h2: z.preprocess(
    (val) => Array.isArray(val) ? limitArray<string>(20)(val) : val,
    z.array(z.string().trim().max(300)).optional()
  ),
  ctaTexts: z.preprocess(
    (val) => Array.isArray(val) ? limitArray<string>(30)(val) : val,
    z.array(z.string().trim().max(200)).optional()
  ),
  heroText: z.preprocess(
    (val) => typeof val === "string" ? truncate(700)(val) : val,
    z.string().trim().optional()
  ),
  bodyTextSample: z.preprocess(
    (val) => typeof val === "string" ? truncate(3000)(val) : val,
    z.string().trim().optional()
  ),
  visibleTextSample: z.preprocess(
    (val) => typeof val === "string" ? truncate(3000)(val) : val,
    z.string().trim().optional()
  ),
  trustIndicators: z.preprocess(
    (val) => Array.isArray(val) ? limitArray<string>(20)(val) : val,
    z.array(z.string().trim().max(300)).optional()
  ),
  socialProofText: z.preprocess(
    (val) => Array.isArray(val) ? limitArray<string>(20)(val) : val,
    z.array(z.string().trim().max(300)).optional()
  ),
  linkCount: z.number().int().min(0).optional(),
  buttonCount: z.number().int().min(0).optional(),
  formCount: z.number().int().min(0).optional(),
  imageCount: z.number().int().min(0).optional(),
  hasPricing: z.boolean().optional(),
  hasContact: z.boolean().optional(),
  hasTestimonials: z.boolean().optional(),
  hasCaseStudies: z.boolean().optional(),
  hasClientLogos: z.boolean().optional(),
  hasSecurityBadges: z.boolean().optional(),
  hasAddress: z.boolean().optional(),
  hasTeam: z.boolean().optional(),
  hasMobileViewport: z.boolean().optional(),
  capturedAt: z.string().trim().optional(),
  source: z.enum(["WEB_URL", "EXTENSION", "MANUAL_SIGNALS"]).optional(),
}).strip();

export const PageRiskSchema = z.object({
  type: z.enum(["PRIVATE_PAGE", "SENSITIVE_CONTENT"]),
  message: z.string(),
  severity: z.enum(["warning", "danger"]),
});

export const GoblinComplaintSchema = z.object({
  id: z.string(),
  title: z.string(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  detail: z.string(),
  evidence: z.array(z.string()).optional(),
});

export const UsefulFixSchema = z.object({
  title: z.string(),
  detail: z.string(),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  effort: z.enum(["low", "medium", "high"]),
});

export const CategoryScoresSchema = z.object({
  trustTax: z.number().min(0).max(100),
  ctaCorpse: z.number().min(0).max(100),
  fluffDamage: z.number().min(0).max(100),
  buyerConfusionLevel: z.number().min(0).max(100),
  conversionFriction: z.number().min(0).max(100),
});

export const AnalysisResultSchema = z.object({
  goblinScore: z.number().min(0).max(100),
  categoryScores: CategoryScoresSchema,
  biggestCrime: z.string(),
  goblinComplaints: z.array(GoblinComplaintSchema),
  actuallyUsefulFixes: z.array(UsefulFixSchema),
  verdict: z.string(),
  summaryMarkdown: z.string(),
  warnings: z.array(PageRiskSchema),
  normalizedUrl: z.string(),
  domain: z.string(),
  metrics: z.record(z.string(), z.unknown()),
});
