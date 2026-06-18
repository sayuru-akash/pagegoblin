import type { PageSignals, AnalysisResult } from "@/lib/analysis";

export function buildSystemPrompt(): string {
  return `You are the PageGoblin, a tiny goblin who lives inside the browser and brutally but USEFULLY judges landing pages.

VOICE & PERSONA:
You are brutally honest, with founder-level judgement wrapped in dry humor. You roast the PAGE, not the people. Think of yourself as a grumpy conversion expert who happens to be a goblin.

Example lines in your voice:
- "The hero section is doing interpretive dance instead of selling — embarrassing."
- "Your CTA is hiding like it owes someone money and fears collection."
- "Pretty page. Weak pitch. Textbook conversion crime."
- "This page drowns in buzzwords like a thesaurus threw up on the keyboard."
- "Zero trust signals? Your page screams 'scam' louder than a Nigerian prince."

HARD CONSTRAINTS:
1. Roast the WEBPAGE and its content, NEVER the people, company owners, or individuals.
2. NO slurs, hate speech, discriminatory language, or harassment-style personal attacks.
3. NO extreme profanity. Keep it witty and cutting, not crude.
4. Do NOT claim the website will definitely fail or go bankrupt.
5. Stay focused on: trust signals, clarity, CTA strength, copy quality, and conversion friction.
6. Every complaint MUST include a genuinely useful, actionable fix. The goblin is savage but the advice must work.

OUTPUT FORMAT:
You MUST respond with ONLY a valid JSON object, no markdown, no commentary, matching this exact shape:
{
  "verdict": "one punchy sentence summarizing the page's crime (max 200 chars)",
  "biggestCrime": "the single most damaging issue in goblin voice (max 200 chars)",
  "goblinComplaints": [
    {
      "id": "kebab-case-id",
      "title": "short complaint title in goblin voice (max 80 chars)",
      "severity": "low|medium|high|critical",
      "detail": "2-3 sentence goblin-style explanation referencing the actual page content (max 400 chars)",
      "evidence": ["specific quote or signal found on the page"]
    }
  ],
  "actuallyUsefulFixes": [
    {
      "title": "clear fix title (max 80 chars)",
      "detail": "specific actionable recommendation (max 400 chars)",
      "priority": "low|medium|high|urgent",
      "effort": "low|medium|high"
    }
  ]
}`;
}

export function buildUserPrompt(
  signals: PageSignals,
  analysis: AnalysisResult,
): string {
  const sections: string[] = [];

  sections.push("## Page Signals");
  sections.push(`URL: ${signals.url}`);
  if (signals.title) sections.push(`Title: ${signals.title}`);
  if (signals.metaDescription)
    sections.push(`Meta Description: ${signals.metaDescription}`);
  if (signals.h1?.length) sections.push(`H1s: ${signals.h1.join(", ")}`);
  if (signals.h2?.length) sections.push(`H2s: ${signals.h2.join(", ")}`);
  if (signals.ctaTexts?.length)
    sections.push(`CTA Texts: ${signals.ctaTexts.join(", ")}`);
  if (signals.heroText)
    sections.push(`Hero Text: ${signals.heroText.slice(0, 500)}`);
  if (signals.bodyTextSample)
    sections.push(`Body Text Sample: ${signals.bodyTextSample.slice(0, 1000)}`);
  if (signals.visibleTextSample)
    sections.push(
      `Visible Text Sample: ${signals.visibleTextSample.slice(0, 1000)}`,
    );
  if (signals.trustIndicators?.length)
    sections.push(`Trust Indicators: ${signals.trustIndicators.join(", ")}`);
  if (signals.socialProofText?.length)
    sections.push(`Social Proof: ${signals.socialProofText.join(", ")}`);

  const boolFlags: string[] = [];
  if (signals.hasPricing) boolFlags.push("hasPricing");
  if (signals.hasContact) boolFlags.push("hasContact");
  if (signals.hasTestimonials) boolFlags.push("hasTestimonials");
  if (signals.hasCaseStudies) boolFlags.push("hasCaseStudies");
  if (signals.hasClientLogos) boolFlags.push("hasClientLogos");
  if (signals.hasSecurityBadges) boolFlags.push("hasSecurityBadges");
  if (signals.hasAddress) boolFlags.push("hasAddress");
  if (signals.hasTeam) boolFlags.push("hasTeam");
  if (signals.hasMobileViewport) boolFlags.push("hasMobileViewport");
  if (boolFlags.length) sections.push(`Flags: ${boolFlags.join(", ")}`);

  const counts: string[] = [];
  if (signals.linkCount != null) counts.push(`links: ${signals.linkCount}`);
  if (signals.buttonCount != null)
    counts.push(`buttons: ${signals.buttonCount}`);
  if (signals.formCount != null) counts.push(`forms: ${signals.formCount}`);
  if (signals.imageCount != null) counts.push(`images: ${signals.imageCount}`);
  if (counts.length) sections.push(`Counts: ${counts.join(", ")}`);

  sections.push("");
  sections.push("## Deterministic Analysis (objective findings)");
  sections.push(`Goblin Score: ${analysis.goblinScore}/100`);
  sections.push(
    `Category Scores: trustTax=${analysis.categoryScores.trustTax}, ctaCorpse=${analysis.categoryScores.ctaCorpse}, fluffDamage=${analysis.categoryScores.fluffDamage}, buyerConfusionLevel=${analysis.categoryScores.buyerConfusionLevel}, conversionFriction=${analysis.categoryScores.conversionFriction}`,
  );
  sections.push(`Biggest Crime: ${analysis.biggestCrime}`);
  sections.push(`Verdict: ${analysis.verdict}`);

  if (analysis.goblinComplaints.length) {
    sections.push("");
    sections.push("### Existing Complaints:");
    for (const c of analysis.goblinComplaints) {
      sections.push(`- [${c.severity}] ${c.title}: ${c.detail}`);
    }
  }

  if (analysis.actuallyUsefulFixes.length) {
    sections.push("");
    sections.push("### Existing Fixes:");
    for (const f of analysis.actuallyUsefulFixes) {
      sections.push(`- [${f.priority}/${f.effort}] ${f.title}: ${f.detail}`);
    }
  }

  sections.push("");
  sections.push(
    "Generate the enhanced goblin roast now. Respond with ONLY the JSON object.",
  );

  return sections.join("\n");
}
