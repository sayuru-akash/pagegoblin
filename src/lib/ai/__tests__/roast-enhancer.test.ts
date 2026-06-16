import { describe, it, expect, vi, beforeEach } from "vitest";
import { enhanceRoastWithAI } from "../roast-enhancer";
import { buildSystemPrompt, buildUserPrompt } from "../goblin-prompt";
import type { AiConfig, AiEnhancementInput } from "../types";
import type { PageSignals, AnalysisResult } from "@/lib/analysis";

const mockSignals: PageSignals = {
  url: "https://example.com",
  title: "Example Domain",
  h1: ["Example Domain"],
  ctaTexts: ["Learn More"],
  heroText: "This domain is for use in examples.",
  bodyTextSample: "This domain is for use in illustrative examples in documents.",
  source: "MANUAL_SIGNALS",
};

const mockAnalysis: AnalysisResult = {
  goblinScore: 42,
  categoryScores: {
    trustTax: 10,
    ctaCorpse: 20,
    fluffDamage: 30,
    buyerConfusionLevel: 40,
    conversionFriction: 50,
  },
  biggestCrime: "Generic fluff everywhere",
  goblinComplaints: [
    {
      id: "weak-hero",
      title: "Weak hero section",
      severity: "high",
      detail: "The hero section does not communicate value clearly.",
    },
  ],
  actuallyUsefulFixes: [
    {
      title: "Strengthen hero copy",
      detail: "Replace generic text with specific value proposition.",
      priority: "high",
      effort: "medium",
    },
  ],
  verdict: "Needs work",
  summaryMarkdown: "# Summary\nScore: 42",
  warnings: [],
  normalizedUrl: "https://example.com",
  domain: "example.com",
  metrics: {},
};

const mockConfig: AiConfig = {
  baseUrl: "https://api.openai.com/v1",
  apiKey: "test-key",
  model: "gpt-4o-mini",
  name: "Test Config",
  providerType: "OPENAI",
};

const validRoastObject = {
  verdict: "Your page is putting visitors to sleep faster than a lullaby.",
  biggestCrime: "The hero section is doing interpretive dance instead of selling.",
  goblinComplaints: [
    {
      id: "sleepy-hero",
      title: "Your hero is napping on the job",
      severity: "high" as const,
      detail: "The hero section says nothing about what you actually do. Visitors are guessing, and guesses don't convert.",
      evidence: ["This domain is for use in examples."],
    },
  ],
  actuallyUsefulFixes: [
    {
      title: "Wake up your hero",
      detail: "Replace the generic hero text with a clear value proposition that answers 'what do I get?' in under 5 seconds.",
      priority: "high" as const,
      effort: "medium" as const,
    },
  ],
};

function makeAiResponse(content: string, status = 200) {
  return new Response(
    JSON.stringify({ choices: [{ message: { content } }] }),
    { status, headers: { "content-type": "application/json" } }
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("buildSystemPrompt", () => {
  it("contains the goblin persona", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("PageGoblin");
    expect(prompt).toContain("goblin");
  });

  it("contains hard constraints", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("NEVER the people");
    expect(prompt).toContain("NO slurs");
    expect(prompt).toContain("NO extreme profanity");
    expect(prompt).toContain("actionable fix");
  });

  it("contains example goblin lines", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("interpretive dance");
    expect(prompt).toContain("hiding like it owes someone money");
  });

  it("specifies JSON output format", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("ONLY a valid JSON object");
    expect(prompt).toContain('"verdict"');
    expect(prompt).toContain('"goblinComplaints"');
    expect(prompt).toContain('"actuallyUsefulFixes"');
  });
});

describe("buildUserPrompt", () => {
  it("includes page signals", () => {
    const prompt = buildUserPrompt(mockSignals, mockAnalysis);
    expect(prompt).toContain("https://example.com");
    expect(prompt).toContain("Example Domain");
    expect(prompt).toContain("Learn More");
  });

  it("includes deterministic analysis findings", () => {
    const prompt = buildUserPrompt(mockSignals, mockAnalysis);
    expect(prompt).toContain("42/100");
    expect(prompt).toContain("Generic fluff everywhere");
    expect(prompt).toContain("trustTax=10");
    expect(prompt).toContain("ctaCorpse=20");
  });

  it("includes existing complaints and fixes", () => {
    const prompt = buildUserPrompt(mockSignals, mockAnalysis);
    expect(prompt).toContain("Weak hero section");
    expect(prompt).toContain("Strengthen hero copy");
  });

  it("includes boolean flags when true", () => {
    const signalsWithFlags: PageSignals = {
      ...mockSignals,
      hasPricing: true,
      hasContact: true,
      hasTestimonials: true,
    };
    const prompt = buildUserPrompt(signalsWithFlags, mockAnalysis);
    expect(prompt).toContain("hasPricing");
    expect(prompt).toContain("hasContact");
    expect(prompt).toContain("hasTestimonials");
  });

  it("ends with instruction to generate JSON", () => {
    const prompt = buildUserPrompt(mockSignals, mockAnalysis);
    expect(prompt).toContain("ONLY the JSON object");
  });
});

describe("enhanceRoastWithAI", () => {
  it("returns enhanced content on successful AI response", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeAiResponse(JSON.stringify(validRoastObject))
    );

    const input: AiEnhancementInput = { signals: mockSignals, analysis: mockAnalysis, config: mockConfig };
    const result = await enhanceRoastWithAI(input);

    expect(result.enhanced).toBe(true);
    expect(result.result).toBeDefined();
    expect(result.result!.verdict).toBe(validRoastObject.verdict);
    expect(result.result!.biggestCrime).toBe(validRoastObject.biggestCrime);
    expect(result.result!.goblinComplaints).toHaveLength(1);
    expect(result.result!.actuallyUsefulFixes).toHaveLength(1);
    expect(result.result!.aiProvider).toBe("OPENAI");
    expect(result.result!.aiModel).toBe("gpt-4o-mini");

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-key",
        }),
      })
    );
  });

  it("returns enhanced:false when AI API returns non-200", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Rate limited", { status: 429 })
    );

    const input: AiEnhancementInput = { signals: mockSignals, analysis: mockAnalysis, config: mockConfig };
    const result = await enhanceRoastWithAI(input);

    expect(result.enhanced).toBe(false);
    expect(result.error).toContain("429");
  });

  it("returns enhanced:false when AI returns invalid JSON content", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeAiResponse("this is not json at all")
    );

    const input: AiEnhancementInput = { signals: mockSignals, analysis: mockAnalysis, config: mockConfig };
    const result = await enhanceRoastWithAI(input);

    expect(result.enhanced).toBe(false);
    expect(result.error).toContain("not valid JSON");
  });

  it("returns enhanced:false when AI JSON fails Zod validation", async () => {
    const invalidRoast = { verdict: "too short" };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeAiResponse(JSON.stringify(invalidRoast))
    );

    const input: AiEnhancementInput = { signals: mockSignals, analysis: mockAnalysis, config: mockConfig };
    const result = await enhanceRoastWithAI(input);

    expect(result.enhanced).toBe(false);
    expect(result.error).toContain("validation");
  });

  it("returns enhanced:false on network error (fetch throws)", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network failure"));

    const input: AiEnhancementInput = { signals: mockSignals, analysis: mockAnalysis, config: mockConfig };
    const result = await enhanceRoastWithAI(input);

    expect(result.enhanced).toBe(false);
    expect(result.error).toContain("Network failure");
  });

  it("includes summary markdown with domain and score", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      makeAiResponse(JSON.stringify(validRoastObject))
    );

    const input: AiEnhancementInput = { signals: mockSignals, analysis: mockAnalysis, config: mockConfig };
    const result = await enhanceRoastWithAI(input);

    expect(result.enhanced).toBe(true);
    expect(result.result!.summaryMarkdown).toContain("example.com");
    expect(result.result!.summaryMarkdown).toContain("42/100");
    expect(result.result!.summaryMarkdown).toContain(validRoastObject.verdict);
  });
});
