import type { AnalysisResult, GoblinComplaint } from "./types";

const severityCopy = {
  critical: "fix this first",
  high: "big bite",
  medium: "sharp scratch",
  low: "small nibble",
} as const;

const priorityCopy = {
  urgent: "do this now",
  high: "do this next",
  medium: "worth doing",
  low: "small polish",
} as const;

const effortCopy = {
  low: "quick",
  medium: "some work",
  high: "big job",
} as const;

function pickBiggestCrime(complaints: GoblinComplaint[]): string {
  if (complaints.length === 0)
    return "I sniffed every corner and found nothing big enough to bite.";

  // Prioritize critical, then high, then medium, then low
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = [...complaints].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  );
  return sorted[0].title;
}

function pickVerdict(score: number): string {
  if (score >= 85)
    return "Hmph. I came hungry and this page gave me little to chew. The offer is clear, the button is easy to find, and the proof has real bones.";
  if (score >= 70)
    return "This page has good bones. I still found a few loose bits to gnaw on, but I know where I am and what to do next.";
  if (score >= 55)
    return "I can follow the trail, but you keep dragging me through mud. Cut the fog from the main promise and pull the next step into the light.";
  if (score >= 40)
    return "I crawled into the first screen and got lost in the roots. Give me one clear headline, real proof, and a button I do not have to dig up.";
  if (score >= 25)
    return "I tore through this page and still had to guess what you want from me. Fix the first screen before you polish one more thing below it.";
  return "I bit the headline, clawed at the buttons, and sniffed every corner. I still do not know what you sell, who wants it, or where I should go.";
}

function formatComplaints(complaints: GoblinComplaint[]): string {
  if (complaints.length === 0)
    return "_I sniffed every corner. Nothing big enough to bite._";
  return complaints
    .map((c) => `- **${c.title}** (${severityCopy[c.severity]}): ${c.detail}`)
    .join("\n");
}

function formatFixes(fixes: AnalysisResult["actuallyUsefulFixes"]): string {
  if (fixes.length === 0)
    return "_No big fixes today. I leave hungry._";
  return fixes
    .map((f) => `- **${f.title}** [${priorityCopy[f.priority]}, ${effortCopy[f.effort]}]: ${f.detail}`)
    .join("\n");
}

function formatWarnings(warnings: AnalysisResult["warnings"]): string {
  if (warnings.length === 0) return "";
  return (
    "\n\n---\n\n⚠️ **A quick note before you use this report**\n\n" +
    warnings.map((w) => `- ${w.message}`).join("\n")
  );
}

function scoreBar(score: number): string {
  const filled = Math.round(score / 10);
  const empty = 10 - filled;
  return `${"█".repeat(filled)}${"░".repeat(empty)} ${score}/100`;
}

function buildHeroSectionPanic(result: AnalysisResult): string {
  const heroComplaints = result.goblinComplaints.filter(
    (c) =>
      c.title.toLowerCase().includes("headline") ||
      c.title.toLowerCase().includes("h1") ||
      c.title.toLowerCase().includes("vague") ||
      c.title.toLowerCase().includes("buyer confusion"),
  );
  if (heroComplaints.length === 0) {
    return "I sniffed the first screen and got the point. No digging needed.";
  }
  return heroComplaints.map((c) => `- ${c.title}: ${c.detail}`).join("\n");
}

function buildProofCredibilityCheck(result: AnalysisResult): string {
  const trustComplaints = result.goblinComplaints.filter(
    (c) =>
      c.title.toLowerCase().includes("trust") ||
      c.title.toLowerCase().includes("proof") ||
      c.title.toLowerCase().includes("credibility"),
  );
  if (trustComplaints.length === 0) {
    return "I found names, proof, and real details. Good. My nose is calm.";
  }
  return trustComplaints.map((c) => `- ${c.title}: ${c.detail}`).join("\n");
}

function buildMobileSuspicionWarning(result: AnalysisResult): string {
  if (result.metrics.hasMobileViewport === false) {
    return "⚠️ **Your phone setup smells wrong:** I couldn't find a mobile viewport tag, so this page may spill off a small screen.";
  }
  return "I found the mobile viewport tag. The tiny screen cave has a door.";
}

export function buildSummaryMarkdown(result: AnalysisResult): string {
  const sections = [
    `# 🧌 What I dragged out of ${result.domain}`,
    ``,
    `**My score after the sniffing:** ${scoreBar(result.goblinScore)}`,
    ``,
    `## Where the page fought back`,
    `| Category | Score |`,
    `|----------|-------|`,
    `| Where's the proof? | ${result.categoryScores.trustTax}/100 |`,
    `| What am I meant to click? | ${result.categoryScores.ctaCorpse}/100 |`,
    `| Do these words mean anything? | ${result.categoryScores.fluffDamage}/100 |`,
    `| What are you selling? | ${result.categoryScores.buyerConfusionLevel}/100 |`,
    `| Why is this so hard? | ${result.categoryScores.conversionFriction}/100 |`,
    ``,
    `## The first thing I'd bite`,
    `**${result.biggestCrime}**`,
    ``,
    `## What I sniffed out up top`,
    buildHeroSectionPanic(result),
    ``,
    `## The proof hiding in the cave`,
    buildProofCredibilityCheck(result),
    ``,
    `## My crawl through the phone-sized hole`,
    buildMobileSuspicionWarning(result),
    ``,
    `## What made me howl`,
    formatComplaints(result.goblinComplaints),
    ``,
    `## What you fix before I come back`,
    formatFixes(result.actuallyUsefulFixes),
    ``,
    `## My final growl`,
    result.verdict,
    formatWarnings(result.warnings),
  ];

  return sections.join("\n");
}

export { pickBiggestCrime, pickVerdict };
