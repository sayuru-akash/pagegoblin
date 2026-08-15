import type { ReportPayload, ReportMetrics } from "./types";
import { analyzePage, sanitizePageSignals } from "@/lib/analysis";
import { buildSummaryMarkdown } from "@/lib/analysis/roast-copy";

const LEGACY_COPY_PATTERN =
  /\b(?:Trust Tax|CTA Corpse|Fluff Damage|Buyer Confusion|Conversion Friction|SEO Suicide|Ghost Brand|Wall of Text|CTA intervention|trust signals|street cred|pathetic stub|landmines|miracle anyone stays)\b/i;

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
  const storedComplaints = metrics.goblinComplaints ?? [];
  const storedFixes = metrics.actuallyUsefulFixes ?? [];

  let biggestCrime = report.biggestCrime;
  let verdict = report.verdict;
  let summaryMarkdown = report.summaryMarkdown;
  let goblinComplaints = storedComplaints;
  let actuallyUsefulFixes = storedFixes;

  const storedReaderCopy = JSON.stringify({
    biggestCrime,
    verdict,
    summaryMarkdown,
    goblinComplaints,
    actuallyUsefulFixes,
  });

  if (LEGACY_COPY_PATTERN.test(storedReaderCopy)) {
    try {
      const refreshed = analyzePage(sanitizePageSignals(report.signals));
      const presentationResult = {
        ...refreshed,
        goblinScore: report.score,
        categoryScores: metrics.categoryScores ?? refreshed.categoryScores,
      };

      biggestCrime = presentationResult.biggestCrime;
      verdict = presentationResult.verdict;
      goblinComplaints = presentationResult.goblinComplaints;
      actuallyUsefulFixes = presentationResult.actuallyUsefulFixes;
      summaryMarkdown = buildSummaryMarkdown(presentationResult);
    } catch {
      // Keep the stored report if its historical signal bundle cannot be read.
    }
  }

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
      biggestCrime,
      goblinComplaints,
      actuallyUsefulFixes,
      warnings: metrics.warnings ?? [],
      verdict,
      summaryMarkdown,
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
