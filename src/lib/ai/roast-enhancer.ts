import { z } from "zod";
import type { AiEnhancementInput, AiEnhancementOutcome } from "./types";
import { buildSystemPrompt, buildUserPrompt } from "./goblin-prompt";
import type { GoblinComplaint, UsefulFix } from "@/lib/analysis";

const AiRoastSchema = z.object({
  verdict: z.string().min(1).max(300),
  biggestCrime: z.string().min(1).max(300),
  goblinComplaints: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1).max(120),
    severity: z.enum(["low", "medium", "high", "critical"]),
    detail: z.string().min(1).max(500),
    evidence: z.array(z.string()).optional(),
  })).min(1).max(10),
  actuallyUsefulFixes: z.array(z.object({
    title: z.string().min(1).max(120),
    detail: z.string().min(1).max(500),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    effort: z.enum(["low", "medium", "high"]),
  })).min(1).max(10),
});

const AI_TIMEOUT_MS = 30_000;

export async function enhanceRoastWithAI(input: AiEnhancementInput): Promise<AiEnhancementOutcome> {
  const { signals, analysis, config } = input;

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(signals, analysis);

  let response: Response;
  try {
    response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 2000,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });
  } catch (err) {
    return { enhanced: false, error: `AI request failed: ${err instanceof Error ? err.message : "unknown"}` };
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    return { enhanced: false, error: `AI API returned ${response.status}: ${body.slice(0, 200)}` };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return { enhanced: false, error: "AI response was not valid JSON" };
  }

  const content = (data as { choices?: { message?: { content?: string } }[] })?.choices?.[0]?.message?.content;
  if (!content || typeof content !== "string") {
    return { enhanced: false, error: "AI response had no content" };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    return { enhanced: false, error: "AI content was not valid JSON" };
  }

  const validated = AiRoastSchema.safeParse(parsed);
  if (!validated.success) {
    return { enhanced: false, error: `AI output failed validation: ${validated.error.issues.map(i => i.path.join(".")).join(", ")}` };
  }

  const roast = validated.data;

  const summaryMarkdown = buildEnhancedSummary(roast.verdict, roast.biggestCrime, analysis.goblinScore, analysis.domain);

  return {
    enhanced: true,
    result: {
      verdict: roast.verdict,
      biggestCrime: roast.biggestCrime,
      goblinComplaints: roast.goblinComplaints as GoblinComplaint[],
      actuallyUsefulFixes: roast.actuallyUsefulFixes as UsefulFix[],
      summaryMarkdown,
      aiProvider: config.providerType,
      aiModel: config.model,
    },
  };
}

function buildEnhancedSummary(verdict: string, biggestCrime: string, score: number, domain: string): string {
  return `## The Goblin Verdict: ${domain}\n\n**Goblin Score: ${score}/100**\n\n${verdict}\n\n### Biggest Crime\n${biggestCrime}\n`;
}
