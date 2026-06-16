import type { ReportPayload, ReportMetrics } from "./types";

interface PrismaReportLike {
  id: string;
  slug: string;
  url: string;
  normalizedUrl: string;
  domain: string;
  title: string | null;
  metaDescription: string | null;
  source: string;
  roastMode: string;
  visibility: string;
  score: number;
  biggestCrime: string;
  verdict: string;
  summaryMarkdown: string;
  signals: unknown;
  metrics: unknown;
  createdAt: Date;
  updatedAt: Date;
}

export function serializeReport(report: PrismaReportLike): ReportPayload {
  const metrics = (report.metrics ?? {}) as ReportMetrics;

  return {
    report: {
      id: report.id,
      slug: report.slug,
      url: report.url,
      normalizedUrl: report.normalizedUrl,
      domain: report.domain,
      title: report.title ?? undefined,
      metaDescription: report.metaDescription ?? undefined,
      source: report.source as "WEB_URL" | "EXTENSION" | "MANUAL_SIGNALS",
      roastMode: report.roastMode as "DETERMINISTIC" | "AI_ASSISTED" | "HYBRID",
      visibility: report.visibility as "PRIVATE" | "UNLISTED" | "PUBLIC",
      score: report.score,
      categoryScores: metrics.categoryScores ?? {
        trustTax: 0,
        ctaCorpse: 0,
        fluffDamage: 0,
        buyerConfusionLevel: 0,
        conversionFriction: 0,
      },
      biggestCrime: report.biggestCrime,
      goblinComplaints: metrics.goblinComplaints ?? [],
      actuallyUsefulFixes: metrics.actuallyUsefulFixes ?? [],
      warnings: metrics.warnings ?? [],
      verdict: report.verdict,
      summaryMarkdown: report.summaryMarkdown,
      metrics: (metrics.analysisMetrics ?? {}) as Record<string, unknown>,
      createdAt: report.createdAt.toISOString(),
      updatedAt: report.updatedAt.toISOString(),
    },
    links: {
      report: `/roasts/${report.slug}`,
      api: `/api/roasts/${report.slug}`,
    },
  };
}
