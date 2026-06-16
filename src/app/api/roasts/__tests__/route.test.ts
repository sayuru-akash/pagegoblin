import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { mockCreateRoastReport, mockGetReportBySlug, mockRateLimit } = vi.hoisted(() => ({
  mockCreateRoastReport: vi.fn(),
  mockGetReportBySlug: vi.fn(),
  mockRateLimit: vi.fn(),
}));

vi.mock("@/lib/reports", () => ({
  createRoastReport: mockCreateRoastReport,
  getReportBySlug: mockGetReportBySlug,
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: mockRateLimit,
}));

import { POST } from "../route";
import { GET } from "../[slug]/route";
import { NextRequest } from "next/server";

function makePostRequest(body: unknown, headers?: Record<string, string>): NextRequest {
  return new NextRequest("http://localhost:3000/api/roasts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "1.2.3.4",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function makeGetRequest(slug: string): NextRequest {
  return new NextRequest(`http://localhost:3000/api/roasts/${slug}`, {
    method: "GET",
  });
}

const successPayload = {
  report: {
    id: "cltest123",
    slug: "goblin-abc123-xyz",
    url: "https://example.com",
    normalizedUrl: "https://example.com",
    domain: "example.com",
    title: "Example",
    source: "MANUAL_SIGNALS",
    roastMode: "DETERMINISTIC",
    visibility: "UNLISTED",
    score: 42,
    categoryScores: { trustTax: 10, ctaCorpse: 20, fluffDamage: 30, buyerConfusionLevel: 40, conversionFriction: 50 },
    biggestCrime: "Generic fluff",
    goblinComplaints: [],
    actuallyUsefulFixes: [],
    warnings: [],
    verdict: "Needs work",
    summaryMarkdown: "# Summary",
    metrics: {},
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  links: {
    report: "/roasts/goblin-abc123-xyz",
    api: "/api/roasts/goblin-abc123-xyz",
  },
};

let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.clearAllMocks();
  mockRateLimit.mockReturnValue({ success: true, remaining: 9, resetAt: Date.now() + 60_000 });
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

describe("POST /api/roasts", () => {
  it("returns 201 for valid signals body", async () => {
    mockCreateRoastReport.mockResolvedValue({ ok: true, data: successPayload });

    const response = await POST(
      makePostRequest({ signals: { url: "https://example.com" } })
    );

    expect(response.status).toBe(201);
    const json = await response.json();
    expect(json.report.slug).toBe("goblin-abc123-xyz");
  });

  it("returns 400 for invalid JSON body", async () => {
    const request = new NextRequest("http://localhost:3000/api/roasts", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "1.2.3.4" },
      body: "not json{{{",
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("returns error status from service", async () => {
    mockCreateRoastReport.mockResolvedValue({
      ok: false,
      error: { status: 400, message: "Provide either url or signals." },
    });

    const response = await POST(makePostRequest({}));
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toContain("either");
  });

  it("returns 429 when rate limited", async () => {
    mockRateLimit.mockReturnValue({ success: false, remaining: 0, resetAt: Date.now() + 60_000 });

    const response = await POST(
      makePostRequest({ signals: { url: "https://example.com" } })
    );

    expect(response.status).toBe(429);
    const json = await response.json();
    expect(json.error).toContain("Rate limit");
  });

  it("sets Cache-Control: no-store on response", async () => {
    mockCreateRoastReport.mockResolvedValue({ ok: true, data: successPayload });

    const response = await POST(
      makePostRequest({ signals: { url: "https://example.com" } })
    );

    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("extracts IP from x-forwarded-for", async () => {
    mockCreateRoastReport.mockResolvedValue({ ok: true, data: successPayload });

    await POST(
      makePostRequest({ signals: { url: "https://example.com" } }, { "x-forwarded-for": "5.6.7.8, 9.10.11.12" })
    );

    expect(mockRateLimit).toHaveBeenCalledWith("roasts:post:5.6.7.8", 10, 60_000);
  });

  it("returns safe 500 when service throws unexpected error", async () => {
    mockCreateRoastReport.mockRejectedValue(
      new Error("database password leaked-like internal detail")
    );

    const response = await POST(
      makePostRequest({ signals: { url: "https://example.com" } })
    );

    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBe("Something went wrong while creating the roast.");
    expect(json.error).not.toContain("password");
    expect(json.error).not.toContain("leaked");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(consoleErrorSpy).toHaveBeenCalledOnce();
  });
});

describe("GET /api/roasts/[slug]", () => {
  it("returns report for existing slug", async () => {
    mockGetReportBySlug.mockResolvedValue(successPayload);

    const response = await GET(
      makeGetRequest("goblin-abc123-xyz"),
      { params: Promise.resolve({ slug: "goblin-abc123-xyz" }) }
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.report.slug).toBe("goblin-abc123-xyz");
  });

  it("returns 404 for missing report", async () => {
    mockGetReportBySlug.mockResolvedValue(null);

    const response = await GET(
      makeGetRequest("nonexistent"),
      { params: Promise.resolve({ slug: "nonexistent" }) }
    );

    expect(response.status).toBe(404);
  });

  it("sets Cache-Control: no-store on GET", async () => {
    mockGetReportBySlug.mockResolvedValue(successPayload);

    const response = await GET(
      makeGetRequest("goblin-abc123-xyz"),
      { params: Promise.resolve({ slug: "goblin-abc123-xyz" }) }
    );

    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("returns safe 500 when getReportBySlug throws unexpected error", async () => {
    mockGetReportBySlug.mockRejectedValue(
      new Error("database connection string exposed")
    );

    const response = await GET(
      makeGetRequest("goblin-abc123-xyz"),
      { params: Promise.resolve({ slug: "goblin-abc123-xyz" }) }
    );

    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.error).toBe("Something went wrong while fetching the report.");
    expect(json.error).not.toContain("database");
    expect(json.error).not.toContain("connection");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(consoleErrorSpy).toHaveBeenCalledOnce();
  });
});
