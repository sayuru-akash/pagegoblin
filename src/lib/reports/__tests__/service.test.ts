import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockCreate, mockFindUnique } = vi.hoisted(() => ({
  mockCreate: vi.fn(),
  mockFindUnique: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    report: {
      create: mockCreate,
      findUnique: mockFindUnique,
    },
  },
}));

vi.mock("@/lib/fetcher", () => ({
  fetchAndExtractSignals: vi.fn(),
  PageFetchError: class PageFetchError extends Error {
    code: string;
    constructor(code: string, message: string) {
      super(message);
      this.name = "PageFetchError";
      this.code = code;
    }
  },
}));

import { createRoastReport, getReportBySlug } from "../service";
import { fetchAndExtractSignals } from "@/lib/fetcher";
import type { PageSignals } from "@/lib/analysis";

const mockFetchAndExtractSignals = vi.mocked(fetchAndExtractSignals);

const minimalSignals: PageSignals = {
  url: "https://example.com",
  title: "Example Domain",
  h1: ["Example Domain"],
  ctaTexts: ["Learn More"],
  heroText: "This domain is for use in examples.",
  bodyTextSample: "This domain is for use in illustrative examples in documents.",
  source: "MANUAL_SIGNALS",
};

function makePrismaReport(overrides: Record<string, unknown> = {}) {
  return {
    id: "cltest123",
    slug: "goblin-abc123-xyz",
    userId: null,
    source: "MANUAL_SIGNALS",
    roastMode: "DETERMINISTIC",
    visibility: "UNLISTED",
    url: "https://example.com",
    normalizedUrl: "https://example.com",
    domain: "example.com",
    title: "Example Domain",
    metaDescription: null,
    signals: minimalSignals,
    metrics: {
      categoryScores: { trustTax: 10, ctaCorpse: 20, fluffDamage: 30, buyerConfusionLevel: 40, conversionFriction: 50 },
      goblinComplaints: [],
      actuallyUsefulFixes: [],
      warnings: [],
      analysisMetrics: {},
    },
    score: 42,
    biggestCrime: "Generic fluff",
    verdict: "Needs work",
    summaryMarkdown: "# Summary\nScore: 42",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("createRoastReport", () => {
  it("rejects body with both url and signals", async () => {
    const result = await createRoastReport({
      url: "https://example.com",
      signals: minimalSignals,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(400);
      expect(result.error.message).toContain("both");
    }
  });

  it("rejects body with neither url nor signals", async () => {
    const result = await createRoastReport({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(400);
      expect(result.error.message).toContain("either");
    }
  });

  it("rejects invalid body (not an object)", async () => {
    const result = await createRoastReport(null);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(400);
    }
  });

  it("creates report from signals without calling fetcher", async () => {
    const prismaReport = makePrismaReport();
    mockCreate.mockResolvedValue(prismaReport);

    const result = await createRoastReport({ signals: minimalSignals });

    expect(result.ok).toBe(true);
    expect(mockFetchAndExtractSignals).not.toHaveBeenCalled();
    expect(mockCreate).toHaveBeenCalledTimes(1);

    const createArg = mockCreate.mock.calls[0][0];
    expect(createArg.data.source).toBe("MANUAL_SIGNALS");
    expect(createArg.data.roastMode).toBe("DETERMINISTIC");
    expect(createArg.data.visibility).toBe("UNLISTED");
    expect(createArg.data.userId).toBeNull();
  });

  it("creates report from url by calling fetchAndExtractSignals", async () => {
    const fetchedSignals: PageSignals = {
      ...minimalSignals,
      source: "WEB_URL",
    };
    mockFetchAndExtractSignals.mockResolvedValue(fetchedSignals);
    const prismaReport = makePrismaReport({ source: "WEB_URL", signals: fetchedSignals });
    mockCreate.mockResolvedValue(prismaReport);

    const result = await createRoastReport({ url: "https://example.com" });

    expect(result.ok).toBe(true);
    expect(mockFetchAndExtractSignals).toHaveBeenCalledWith("https://example.com");
    expect(mockCreate).toHaveBeenCalledTimes(1);

    const createArg = mockCreate.mock.calls[0][0];
    expect(createArg.data.source).toBe("WEB_URL");
  });

  it("url input always persists source as WEB_URL even with override", async () => {
    const fetchedSignals: PageSignals = {
      ...minimalSignals,
      source: "WEB_URL",
    };
    mockFetchAndExtractSignals.mockResolvedValue(fetchedSignals);
    const prismaReport = makePrismaReport({ source: "WEB_URL", signals: fetchedSignals });
    mockCreate.mockResolvedValue(prismaReport);

    const result = await createRoastReport({
      url: "https://example.com",
      source: "EXTENSION",
    });

    expect(result.ok).toBe(true);
    const createArg = mockCreate.mock.calls[0][0];
    expect(createArg.data.source).toBe("WEB_URL");
    if (result.ok) {
      expect(result.data.report.source).toBe("WEB_URL");
    }
  });

  it("maps PageFetchError INVALID_URL to 400", async () => {
    const { PageFetchError } = await import("@/lib/fetcher");
    mockFetchAndExtractSignals.mockRejectedValue(
      new PageFetchError("INVALID_URL", "Invalid URL")
    );

    const result = await createRoastReport({ url: "ftp://bad" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(400);
    }
  });

  it("maps PageFetchError TIMEOUT to 504", async () => {
    const { PageFetchError } = await import("@/lib/fetcher");
    mockFetchAndExtractSignals.mockRejectedValue(
      new PageFetchError("TIMEOUT", "Timeout")
    );

    const result = await createRoastReport({ url: "https://slow.com" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(504);
    }
  });

  it("maps PageFetchError BODY_TOO_LARGE to 422", async () => {
    const { PageFetchError } = await import("@/lib/fetcher");
    mockFetchAndExtractSignals.mockRejectedValue(
      new PageFetchError("BODY_TOO_LARGE", "Too large")
    );

    const result = await createRoastReport({ url: "https://big.com" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(422);
    }
  });

  it("maps PageFetchError NON_HTML_CONTENT to 422", async () => {
    const { PageFetchError } = await import("@/lib/fetcher");
    mockFetchAndExtractSignals.mockRejectedValue(
      new PageFetchError("NON_HTML_CONTENT", "Not HTML")
    );

    const result = await createRoastReport({ url: "https://file.pdf" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.status).toBe(422);
    }
  });

  it("serialized payload includes links, score, categoryScores, complaints, fixes, warnings", async () => {
    const prismaReport = makePrismaReport();
    mockCreate.mockResolvedValue(prismaReport);

    const result = await createRoastReport({ signals: minimalSignals });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.report.score).toBe(42);
      expect(result.data.report.slug).toBe("goblin-abc123-xyz");
      expect(result.data.report.categoryScores).toBeDefined();
      expect(result.data.report.goblinComplaints).toBeDefined();
      expect(result.data.report.actuallyUsefulFixes).toBeDefined();
      expect(result.data.report.warnings).toBeDefined();
      expect(result.data.links.report).toBe("/roasts/goblin-abc123-xyz");
      expect(result.data.links.api).toBe("/api/roasts/goblin-abc123-xyz");
    }
  });

  it("does not store html in signals or metrics", async () => {
    const signalsWithHtml: PageSignals & { html?: string } = {
      ...minimalSignals,
      html: "<html>should be stripped</html>",
    };
    const prismaReport = makePrismaReport();
    mockCreate.mockResolvedValue(prismaReport);

    await createRoastReport({ signals: signalsWithHtml });

    const createArg = mockCreate.mock.calls[0][0];
    expect(createArg.data.signals).not.toHaveProperty("html");
    expect(createArg.data.metrics).not.toHaveProperty("html");
  });

  it("respects custom source and visibility overrides", async () => {
    const prismaReport = makePrismaReport({ source: "EXTENSION", visibility: "PRIVATE" });
    mockCreate.mockResolvedValue(prismaReport);

    const result = await createRoastReport({
      signals: minimalSignals,
      source: "EXTENSION",
      visibility: "PRIVATE",
    });

    expect(result.ok).toBe(true);
    const createArg = mockCreate.mock.calls[0][0];
    expect(createArg.data.source).toBe("EXTENSION");
    expect(createArg.data.visibility).toBe("PRIVATE");
  });
});

describe("getReportBySlug", () => {
  it("returns null for missing report", async () => {
    mockFindUnique.mockResolvedValue(null);
    const result = await getReportBySlug("nonexistent");
    expect(result).toBeNull();
  });

  it("returns serialized report for existing report", async () => {
    const prismaReport = makePrismaReport();
    mockFindUnique.mockResolvedValue(prismaReport);

    const result = await getReportBySlug("goblin-abc123-xyz");

    expect(result).not.toBeNull();
    expect(result!.report.slug).toBe("goblin-abc123-xyz");
    expect(result!.report.score).toBe(42);
    expect(result!.links.report).toBe("/roasts/goblin-abc123-xyz");
    expect(result!.links.api).toBe("/api/roasts/goblin-abc123-xyz");
  });
});

describe("slug generation", () => {
  it("generates unique slugs", async () => {
    const { generateSlug } = await import("../slug");
    const slug1 = generateSlug("example.com");
    const slug2 = generateSlug("example.com");
    expect(slug1).not.toBe(slug2);
    expect(slug1).toMatch(/^example-/);
    expect(slug2).toMatch(/^example-/);
  });

  it("falls back to goblin prefix for unknown domain", async () => {
    const { generateSlug } = await import("../slug");
    const slug = generateSlug("");
    expect(slug).toMatch(/^goblin-/);
  });
});
