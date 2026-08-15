import { describe, expect, it } from "vitest";
import { serializeReport } from "../serializer";

function makeReport(overrides: Record<string, unknown> = {}) {
  return {
    id: "report-1",
    slug: "example-com-abc123",
    url: "https://example.com",
    normalizedUrl: "https://example.com",
    domain: "example.com",
    title: "Example",
    metaDescription: "A clear example page.",
    source: "WEB_URL",
    roastMode: "DETERMINISTIC",
    visibility: "UNLISTED",
    score: 40,
    biggestCrime: "Trust Signals? Never Met Her.",
    verdict: "Your page needs a CTA intervention.",
    summaryMarkdown: "## Buyer Confusion\nOld report copy",
    signals: {
      url: "https://example.com",
      title: "Example",
      h1: ["Welcome to our platform"],
      ctaTexts: ["Learn More"],
      heroText: "We help businesses grow with innovative solutions.",
      bodyTextSample: "A world-class platform that helps businesses grow.",
      trustIndicators: [],
      socialProofText: [],
      hasMobileViewport: true,
      source: "WEB_URL",
    },
    metrics: {
      categoryScores: {
        trustTax: 20,
        ctaCorpse: 30,
        fluffDamage: 40,
        buyerConfusionLevel: 35,
        conversionFriction: 55,
      },
      goblinComplaints: [
        {
          id: "old-copy",
          title: "SEO Suicide: Missing Meta Description",
          severity: "high",
          detail: "Write a meta description or watch CTR die.",
        },
      ],
      actuallyUsefulFixes: [],
      warnings: [],
      analysisMetrics: {},
    },
    createdAt: new Date("2026-08-01T00:00:00.000Z"),
    updatedAt: new Date("2026-08-01T00:00:00.000Z"),
    ...overrides,
  };
}

describe("serializeReport", () => {
  it("refreshes legacy reader copy without changing the stored score", () => {
    const payload = serializeReport(makeReport());
    const readerCopy = JSON.stringify(payload.report);

    expect(payload.report.score).toBe(40);
    expect(payload.report.categoryScores.trustTax).toBe(20);
    expect(readerCopy).not.toMatch(/Trust Signals|CTA intervention|Buyer Confusion|SEO Suicide/i);
    expect(readerCopy).toMatch(/sniff|bite|cave|howl/i);
  });

  it("leaves modern report copy unchanged", () => {
    const payload = serializeReport(
      makeReport({
        biggestCrime: "I sniffed and found no proof",
        verdict: "I crawled through this page and found a muddy trail.",
        summaryMarkdown: "## My final growl\nThe page needs one clear next step.",
        metrics: {
          categoryScores: {
            trustTax: 20,
            ctaCorpse: 30,
            fluffDamage: 40,
            buyerConfusionLevel: 35,
            conversionFriction: 55,
          },
          goblinComplaints: [],
          actuallyUsefulFixes: [],
          warnings: [],
          analysisMetrics: {},
        },
      }),
    );

    expect(payload.report.biggestCrime).toBe("I sniffed and found no proof");
    expect(payload.report.summaryMarkdown).toContain("My final growl");
  });
});
