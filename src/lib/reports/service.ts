import { prisma } from "@/lib/db";
import { fetchAndExtractSignals } from "@/lib/fetcher";
import { analyzePage, sanitizePageSignals } from "@/lib/analysis";
import type { PageSignals } from "@/lib/analysis";
import { CreateRoastRequestSchema } from "./schema";
import { generateSlug } from "./slug";
import { serializeReport } from "./serializer";
import { mapFetchErrorToStatus } from "./errors";
import type { CreateRoastResult, ReportPayload, ReportMetrics } from "./types";
import type { ReportSource, ReportVisibility } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";

const MAX_SLUG_RETRIES = 5;

function stripHtmlFromSignals(signals: PageSignals): PageSignals {
  const { ...rest } = signals as PageSignals & { html?: string };
  delete (rest as Record<string, unknown>).html;
  return rest;
}

export async function createRoastReport(
  input: unknown
): Promise<CreateRoastResult> {
  const parsed = CreateRoastRequestSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: { status: 400, message: "Invalid request body." },
    };
  }

  const { url, signals: rawSignals, source: overrideSource, visibility } = parsed.data;

  if (url && rawSignals) {
    return {
      ok: false,
      error: {
        status: 400,
        message: "Provide either url or signals, not both.",
      },
    };
  }

  if (!url && !rawSignals) {
    return {
      ok: false,
      error: {
        status: 400,
        message: "Provide either url or signals.",
      },
    };
  }

  let signals: PageSignals;
  let source: string;

  if (url) {
    try {
      signals = await fetchAndExtractSignals(url);
      source = "WEB_URL";
    } catch (err) {
      const { status, message } = mapFetchErrorToStatus(err);
      return { ok: false, error: { status, message } };
    }
  } else {
    signals = sanitizePageSignals(rawSignals);
    source = overrideSource ?? rawSignals?.source ?? "MANUAL_SIGNALS";
  }

  signals = stripHtmlFromSignals(signals);

  const analysis = analyzePage(signals);

  const metricsData: ReportMetrics = {
    categoryScores: analysis.categoryScores,
    goblinComplaints: analysis.goblinComplaints,
    actuallyUsefulFixes: analysis.actuallyUsefulFixes,
    warnings: analysis.warnings,
    analysisMetrics: analysis.metrics,
  };

  const domain = analysis.domain;
  const slug = await generateUniqueSlug(domain);

  const report = await prisma.report.create({
    data: {
      slug,
      source: source as ReportSource,
      roastMode: "DETERMINISTIC",
      visibility: (visibility ?? "UNLISTED") as ReportVisibility,
      url: analysis.normalizedUrl,
      normalizedUrl: analysis.normalizedUrl,
      domain: analysis.domain,
      title: signals.title ?? null,
      metaDescription: signals.metaDescription ?? null,
      signals: signals as unknown as Prisma.InputJsonValue,
      metrics: metricsData as unknown as Prisma.InputJsonValue,
      score: analysis.goblinScore,
      biggestCrime: analysis.biggestCrime,
      verdict: analysis.verdict,
      summaryMarkdown: analysis.summaryMarkdown,
      userId: null,
    },
  });

  return { ok: true, data: serializeReport(report) };
}

async function generateUniqueSlug(domain: string): Promise<string> {
  for (let i = 0; i < MAX_SLUG_RETRIES; i++) {
    const slug = generateSlug(domain);
    const existing = await prisma.report.findUnique({ where: { slug } });
    if (!existing) return slug;
  }
  return generateSlug(domain);
}

export async function getReportBySlug(slug: string): Promise<ReportPayload | null> {
  const report = await prisma.report.findUnique({ where: { slug } });
  if (!report) return null;
  return serializeReport(report);
}
