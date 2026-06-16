import type { PageSignals, AnalysisResult } from "./types";
import { sanitizePageSignals, detectPageRisk } from "./signals";
import { normalizePageUrl } from "./url";
import {
  computeCategoryScores,
  computeGoblinScore,
  generateComplaints,
  generateFixes,
} from "./scoring";
import { buildSummaryMarkdown, pickBiggestCrime, pickVerdict } from "./roast-copy";

export function analyzePage(input: PageSignals | unknown): AnalysisResult {
  const signals = sanitizePageSignals(input);
  const { url, domain } = normalizePageUrl(signals.url);
  const warnings = detectPageRisk(signals);

  const categoryScores = computeCategoryScores(signals);
  const goblinScore = computeGoblinScore(categoryScores);

  const goblinComplaints = generateComplaints(signals, categoryScores);
  const actuallyUsefulFixes = generateFixes(signals, categoryScores);

  const biggestCrime = pickBiggestCrime(goblinComplaints);
  const verdict = pickVerdict(goblinScore);

  const result: AnalysisResult = {
    goblinScore,
    categoryScores,
    biggestCrime,
    goblinComplaints,
    actuallyUsefulFixes,
    verdict,
    summaryMarkdown: "", // filled below
    warnings,
    normalizedUrl: url,
    domain,
    metrics: {
      h1Count: signals.h1?.length ?? 0,
      h2Count: signals.h2?.length ?? 0,
      ctaCount: signals.ctaTexts?.length ?? 0,
      linkCount: signals.linkCount ?? 0,
      buttonCount: signals.buttonCount ?? 0,
      formCount: signals.formCount ?? 0,
      trustIndicatorCount: signals.trustIndicators?.length ?? 0,
      socialProofCount: signals.socialProofText?.length ?? 0,
      hasPricing: signals.hasPricing ?? false,
      hasContact: signals.hasContact ?? false,
      hasTestimonials: signals.hasTestimonials ?? false,
      hasMobileViewport: signals.hasMobileViewport ?? false,
      source: signals.source ?? "UNKNOWN",
    },
  };

  result.summaryMarkdown = buildSummaryMarkdown(result);

  return result;
}
