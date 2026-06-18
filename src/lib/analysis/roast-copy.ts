import type { AnalysisResult, GoblinComplaint } from "./types";

function pickBiggestCrime(complaints: GoblinComplaint[]): string {
  if (complaints.length === 0)
    return "No crimes detected — this page smells fake. Did you write it yourself?";

  // Prioritize critical, then high, then medium, then low
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sorted = [...complaints].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  );
  return sorted[0].title;
}

function pickVerdict(score: number): string {
  if (score >= 85)
    return "Your page is dangerously competent. The goblin has nothing to roast except its own envy. Suspicious.";
  if (score >= 70)
    return "Solid page. A few goblin grumbles, but you clearly tried. Barely passing inspection.";
  if (score >= 55)
    return "Mediocre. Like a sandwich with no filling — structurally there, but disappointing. Visitors bounce faster than a rubber ball.";
  if (score >= 40)
    return "Oof. Your page is confusing, vague, and desperately needs a CTA intervention. It's a miracle anyone stays.";
  if (score >= 25)
    return "This page is a conversion crime scene. The goblin is filing a police report and suing for damages.";
  return "The goblin has fainted. Revive it by adding literally any trust signals, a headline, or a purpose. This is embarrassing.";
}

function formatComplaints(complaints: GoblinComplaint[]): string {
  if (complaints.length === 0)
    return "_No complaints. This feels like cheating._";
  return complaints
    .map((c) => `- **${c.title}** (${c.severity}): ${c.detail}`)
    .join("\n");
}

function formatFixes(fixes: AnalysisResult["actuallyUsefulFixes"]): string {
  if (fixes.length === 0)
    return "_Nothing to fix. Either you're a genius or the goblin gave up._";
  return fixes
    .map((f) => `- **${f.title}** [${f.priority}/${f.effort}]: ${f.detail}`)
    .join("\n");
}

function formatWarnings(warnings: AnalysisResult["warnings"]): string {
  if (warnings.length === 0) return "";
  return (
    "\n\n---\n\n⚠️ **Warnings**\n\n" +
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
    return "Your hero section passed inspection. Don't get cocky, it's not that hard.";
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
    return "Your page has adequate trust signals. Don't get comfortable.";
  }
  return trustComplaints.map((c) => `- ${c.title}: ${c.detail}`).join("\n");
}

function buildMobileSuspicionWarning(result: AnalysisResult): string {
  if (result.metrics.hasMobileViewport === false) {
    return "⚠️ **Mobile Suspicion Warning:** This page appears to be missing a mobile viewport meta tag. Mobile visitors may have a poor experience.";
  }
  return "No mobile suspicion detected. Your page declares a mobile viewport.";
}

export function buildSummaryMarkdown(result: AnalysisResult): string {
  const sections = [
    `# 🧌 PageGoblin Report`,
    ``,
    `**Goblin Score:** ${scoreBar(result.goblinScore)}`,
    ``,
    `## Category Scores`,
    `| Category | Score |`,
    `|----------|-------|`,
    `| Trust Tax | ${result.categoryScores.trustTax}/100 |`,
    `| CTA Corpse | ${result.categoryScores.ctaCorpse}/100 |`,
    `| Fluff Damage | ${result.categoryScores.fluffDamage}/100 |`,
    `| Buyer Confusion Level | ${result.categoryScores.buyerConfusionLevel}/100 |`,
    `| Conversion Friction | ${result.categoryScores.conversionFriction}/100 |`,
    ``,
    `## Biggest Crime`,
    `**${result.biggestCrime}**`,
    ``,
    `## Hero Section Panic`,
    buildHeroSectionPanic(result),
    ``,
    `## Proof/Credibility Check`,
    buildProofCredibilityCheck(result),
    ``,
    `## Mobile Suspicion Warning`,
    buildMobileSuspicionWarning(result),
    ``,
    `## Goblin Complaints`,
    formatComplaints(result.goblinComplaints),
    ``,
    `## Actually Useful Fixes`,
    formatFixes(result.actuallyUsefulFixes),
    ``,
    `## The Goblin Verdict`,
    result.verdict,
    formatWarnings(result.warnings),
  ];

  return sections.join("\n");
}

export { pickBiggestCrime, pickVerdict };
