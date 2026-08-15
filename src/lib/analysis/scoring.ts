import type {
  PageSignals,
  CategoryScores,
  GoblinComplaint,
  UsefulFix,
} from "./types";

// ─── Buzzword list ───────────────────────────────────────────────────────────

const BUZZWORDS = [
  "innovative",
  "cutting-edge",
  "world-class",
  "seamless",
  "leverage",
  "scalable solutions",
  "digital transformation",
  "synergy",
  "bespoke",
  "empower",
  "unlock potential",
  "next-generation",
  "game-changing",
  "revolutionize",
  "paradigm shift",
  "best-in-class",
  "state-of-the-art",
  "holistic",
  "robust",
];

const WEAK_CTAS = ["learn more", "submit", "click here", "read more", "more"];
const STRONG_CTAS = [
  "start free trial",
  "book a demo",
  "get started",
  "see pricing",
  "get quote",
  "install extension",
  "sign up free",
  "try free",
  "start trial",
  "get demo",
  "watch demo",
  "roast my page",
];

const VAGUE_H1_PATTERNS = [
  /^welcome\b/i,
  /^home$/i,
  /^the future of/i,
  /^innovative solutions/i,
  /^we help businesses/i,
  /^transform your/i,
  /^revolutionize/i,
  /^the best/i,
  /^your journey/i,
  /^discover the/i,
];

const CLEAR_H1_PATTERNS = [
  /\b(crm|erp|saas|app|platform|tool|software|dashboard)\b/i,
  /\bfor\b.*\b(teams|businesses|companies|people|developers|designers)\b/i,
  /\b(close|save|reduce|increase|grow|build|track|manage|automate)\b/i,
  /\b(free trial|demo|pricing|quote)\b/i,
];

// ─── Scoring helpers ─────────────────────────────────────────────────────────

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function countBuzzwords(text: string): { count: number; found: string[] } {
  const lower = text.toLowerCase();
  const found = BUZZWORDS.filter((bw) => lower.includes(bw));
  return { count: found.length, found };
}

function hasAnyTrue(signals: PageSignals, keys: (keyof PageSignals)[]): number {
  return keys.filter((k) => signals[k] === true).length;
}

// ─── Category scoring functions ──────────────────────────────────────────────

export function scoreTrustTax(signals: PageSignals): number {
  let score = 20; // base

  const trustCount = signals.trustIndicators?.length ?? 0;
  const socialCount = signals.socialProofText?.length ?? 0;

  // Trust indicators
  score += Math.min(trustCount * 8, 30);

  // Social proof
  score += Math.min(socialCount * 6, 20);

  // Boolean trust signals
  const trustBools = hasAnyTrue(signals, [
    "hasTestimonials",
    "hasCaseStudies",
    "hasClientLogos",
    "hasSecurityBadges",
    "hasAddress",
    "hasTeam",
  ]);
  score += trustBools * 5;

  // Contact info
  if (signals.hasContact) score += 8;

  // Has pricing (transparency)
  if (signals.hasPricing) score += 5;

  return clamp(score);
}

export function scoreCTACorpse(signals: PageSignals): number {
  const ctas = signals.ctaTexts ?? [];

  if (ctas.length === 0) return 5;

  let score = 30;

  const ctaTexts = ctas.map((c) => c.toLowerCase());

  // Check for strong CTAs
  const strongCount = ctaTexts.filter((cta) =>
    STRONG_CTAS.some((s) => cta.includes(s)),
  ).length;
  score += Math.min(strongCount * 15, 30);

  // Check for weak CTAs
  const weakCount = ctaTexts.filter((cta) =>
    WEAK_CTAS.some((w) => cta === w || cta.startsWith(w)),
  ).length;

  // If ALL CTAs are weak, big penalty
  if (weakCount === ctas.length && ctas.length > 0) {
    score -= 25;
  } else {
    score -= weakCount * 5;
  }

  // Too many competing CTAs is bad
  if (ctas.length > 5) score -= 10;

  // Having at least one CTA is good
  if (ctas.length >= 1) score += 10;

  return clamp(score);
}

export function scoreFluffDamage(signals: PageSignals): number {
  const allText = [
    signals.heroText ?? "",
    signals.bodyTextSample ?? "",
    signals.visibleTextSample ?? "",
    signals.title ?? "",
    signals.metaDescription ?? "",
  ].join(" ");

  const { count } = countBuzzwords(allText);

  // Start at 90, deduct for each buzzword
  let score = 90 - count * 12;

  // If there are many buzzwords with no substance, extra penalty
  const hasSubstance =
    signals.hasPricing ||
    signals.hasTestimonials ||
    signals.hasCaseStudies ||
    signals.trustIndicators?.length;

  if (count >= 3 && !hasSubstance) {
    score -= 15;
  }

  return clamp(score);
}

export function scoreBuyerConfusion(signals: PageSignals): number {
  let score = 30;

  const h1s = signals.h1 ?? [];
  const heroText = signals.heroText ?? "";

  // Has H1
  if (h1s.length > 0) {
    score += 15;

    const h1Text = h1s[0].toLowerCase();

    // Check if H1 is specific (not vague)
    const isVague = VAGUE_H1_PATTERNS.some((p) => p.test(h1Text));
    const isClear = CLEAR_H1_PATTERNS.some((p) => p.test(h1Text));

    if (isClear) score += 20;
    if (isVague) score -= 15;
  }

  // Has hero text
  if (heroText.length > 20) {
    score += 10;

    // Check if hero answers what/who/outcome
    const lower = heroText.toLowerCase();
    const hasWhoFor =
      /\b(for|help|teams|businesses|people|developers|companies)\b/.test(lower);
    const hasOutcome =
      /\b(close|save|reduce|increase|grow|build|track|manage|automate|faster|better|more)\b/.test(
        lower,
      );
    const hasWhat =
      /\b(crm|platform|tool|software|app|dashboard|extension)\b/.test(lower);

    if (hasWhoFor) score += 8;
    if (hasOutcome) score += 8;
    if (hasWhat) score += 8;
  }

  // Has meta description
  if (signals.metaDescription && signals.metaDescription.length > 30) {
    score += 5;
  }

  // Has multiple H2s (content structure)
  const h2s = signals.h2 ?? [];
  if (h2s.length >= 2) score += 5;

  return clamp(score);
}

export function scoreConversionFriction(signals: PageSignals): number {
  let score = 40;

  const ctas = signals.ctaTexts ?? [];

  // Has clear next step (CTA)
  if (ctas.length >= 1) score += 15;

  // Has trust signals near CTA (we approximate: both exist)
  const hasTrust =
    (signals.trustIndicators?.length ?? 0) > 0 ||
    signals.hasTestimonials ||
    signals.hasSecurityBadges;
  if (ctas.length > 0 && hasTrust) score += 10;

  // Has contact info
  if (signals.hasContact) score += 10;

  // Has pricing
  if (signals.hasPricing) score += 10;

  // Too many links = competing paths
  const links = signals.linkCount ?? 0;
  if (links > 40) score -= 15;
  else if (links > 25) score -= 5;

  // Too many buttons
  const buttons = signals.buttonCount ?? 0;
  if (buttons > 10) score -= 10;

  // Has form (good for conversion)
  if ((signals.formCount ?? 0) > 0) score += 5;

  return clamp(score);
}

// ─── Main scoring ────────────────────────────────────────────────────────────

export function computeCategoryScores(signals: PageSignals): CategoryScores {
  return {
    trustTax: scoreTrustTax(signals),
    ctaCorpse: scoreCTACorpse(signals),
    fluffDamage: scoreFluffDamage(signals),
    buyerConfusionLevel: scoreBuyerConfusion(signals),
    conversionFriction: scoreConversionFriction(signals),
  };
}

export function computeGoblinScore(categories: CategoryScores): number {
  // Weighted average — clarity and CTA are most important
  const weights = {
    trustTax: 0.2,
    ctaCorpse: 0.25,
    fluffDamage: 0.15,
    buyerConfusionLevel: 0.25,
    conversionFriction: 0.15,
  };

  const weighted =
    categories.trustTax * weights.trustTax +
    categories.ctaCorpse * weights.ctaCorpse +
    categories.fluffDamage * weights.fluffDamage +
    categories.buyerConfusionLevel * weights.buyerConfusionLevel +
    categories.conversionFriction * weights.conversionFriction;

  return clamp(weighted);
}

// ─── Complaints generation ───────────────────────────────────────────────────

export function generateComplaints(
  signals: PageSignals,
  categories: CategoryScores,
): GoblinComplaint[] {
  const complaints: GoblinComplaint[] = [];
  const allText = [
    signals.heroText ?? "",
    signals.bodyTextSample ?? "",
    signals.visibleTextSample ?? "",
  ].join(" ");

  // Trust complaints
  if (categories.trustTax < 70) {
    const trustCount =
      (signals.trustIndicators?.length ?? 0) +
      (signals.socialProofText?.length ?? 0);
    const missing: string[] = [];
    if (!signals.hasTestimonials) missing.push("testimonials");
    if (!signals.hasCaseStudies) missing.push("case studies");
    if (!signals.hasClientLogos) missing.push("client logos");
    if (!signals.hasSecurityBadges) missing.push("security badges");
    if (!signals.hasContact) missing.push("contact info");

    complaints.push({
      id: "trust-missing-proof",
      title: "I sniffed and found no proof",
      severity: categories.trustTax < 25 ? "critical" : "high",
      detail: `I sniffed all around the big claims and found very little underneath them. ${trustCount === 0 ? "Bring me a real customer quote, a named result, or a clear way to reach you before I start digging holes in the hero." : `I found ${trustCount} scrap${trustCount === 1 ? "" : "s"} of proof, but your main promise is still standing there with bare feet.`}`,
      evidence: missing.length > 0 ? missing : undefined,
    });
  }

  // CTA complaints
  if (categories.ctaCorpse < 70) {
    const ctas = signals.ctaTexts ?? [];
    const weakCTAs = ctas.filter((c) =>
      WEAK_CTAS.some(
        (w) => c.toLowerCase() === w || c.toLowerCase().startsWith(w),
      ),
    );

    if (ctas.length === 0) {
      complaints.push({
        id: "cta-none",
        title: "Your button crawled into a hole",
        severity: "critical",
        detail:
          "I clawed through the page and could not find one clear next step. Put one big button beside the first promise and make it tell me what happens.",
      });
    } else if (weakCTAs.length === ctas.length) {
      complaints.push({
        id: "cta-all-weak",
        title: "These buttons say nothing",
        severity: "high",
        detail: `The buttons say ${weakCTAs.map((w) => `"${w}"`).join(", ")}. I bit one and still could not tell what happens next. Name the real action before I chew through the rest.`,
        evidence: weakCTAs,
      });
    } else if (ctas.length > 5) {
      complaints.push({
        id: "cta-too-many",
        title: "Your buttons are biting each other",
        severity: "medium",
        detail: `I found ${ctas.length} different buttons fighting for my eyes. Pick one main path, then shove the smaller choices lower before the whole pack runs wild.`,
        evidence: ctas,
      });
    }
  }

  // Fluff complaints
  const { count: buzzCount, found: buzzwords } = countBuzzwords(allText);
  if (buzzCount >= 1) {
    complaints.push({
      id: "fluff-buzzwords",
      title: "Your words fed me air",
      severity:
        buzzCount >= 5 ? "critical" : buzzCount >= 3 ? "high" : "medium",
      detail: `You fed me ${buzzwords.map((b) => `"${b}"`).join(", ")} and called it a meal. I bit down and found air. Swap those words for a real result, feature, or scrap of proof.`,
      evidence: buzzwords,
    });
  }

  // Vague H1 complaints
  const h1s = signals.h1 ?? [];
  if (h1s.length > 0) {
    const h1Text = h1s[0];
    const isVague = VAGUE_H1_PATTERNS.some((p) => p.test(h1Text));
    if (isVague) {
      complaints.push({
        id: "clarity-vague-h1",
        title: "This headline is feeding me fog",
        severity: "high",
        detail: `The headline says "${h1Text}," and my nose still has no trail. Tell me what this thing is, who wants it, and what good comes out of it.`,
        evidence: [h1Text],
      });
    }
  }

  if (h1s.length === 0) {
    complaints.push({
      id: "clarity-no-h1",
      title: "The main headline ran away",
      severity: "high",
      detail:
        "I crawled across the top of the page and found no clear main headline. Put one strong sentence there that tells me what this is and who it helps.",
    });
  }

  // Buyer confusion
  if (categories.buyerConfusionLevel < 60) {
    complaints.push({
      id: "confusion-offer",
      title: "What are you even selling?",
      severity: "high",
      detail:
        "I scratched through half the page before the offer started to show itself. Put the thing, the buyer, and the result together near the top before I lose the scent.",
    });
  }

  // Conversion friction
  if (categories.conversionFriction < 60) {
    const issues: string[] = [];
    if (!signals.hasContact) issues.push("no contact info");
    if (!signals.hasPricing) issues.push("no pricing visible");
    if ((signals.ctaTexts?.length ?? 0) === 0) issues.push("no CTA");
    if ((signals.linkCount ?? 0) > 40) issues.push("too many competing links");
    if ((signals.buttonCount ?? 0) > 10) issues.push("too many competing buttons");

    complaints.push({
      id: "friction-path",
      title: "This path is full of roots",
      severity: "medium",
      detail: `I tried to crawl through the page and got my claws caught on ${issues.join(", ")}. Clear that mess before you pile on more words or buttons.`,
      evidence: issues,
    });
  }

  // MISSING META DESCRIPTION
  if (!signals.metaDescription || signals.metaDescription.length < 30) {
    complaints.push({
      id: "missing-meta-description",
      title: "Your search preview is bare",
      severity: "medium",
      detail:
        "I sniffed the search setup and found no useful meta description. Write one short line that tells people what waits inside and why they should open the page.",
    });
  }

  // TOO MANY LINKS (navigation soup)
  if ((signals.linkCount ?? 0) > 50) {
    complaints.push({
      id: "link-overload",
      title: "Your links escaped the cage",
      severity: "low",
      detail: `I counted ${signals.linkCount} links skittering in every direction. Keep the main path in the menu and herd the small stuff into the footer.`,
    });
  }

  // NO H2s (poor content structure)
  if ((signals.h2?.length ?? 0) < 2) {
    complaints.push({
      id: "poor-structure",
      title: "This page is one long growl",
      severity: "low",
      detail:
        "I found fewer than two clear section headings, so the whole page turns into one long lump. Chop it into named chunks before my eyes slide off the wall.",
    });
  }

  // IMAGE-HEAVY, TEXT-LIGHT
  if (
    (signals.imageCount ?? 0) > 10 &&
    (signals.bodyTextSample?.length ?? 9999) < 500
  ) {
    complaints.push({
      id: "image-heavy",
      title: "Pictures everywhere, answers nowhere",
      severity: "medium",
      detail: `I found ${signals.imageCount} images and barely any words with meat on them. Tell me what I am looking at and why it matters, or I am just sniffing pretty wallpaper.`,
    });
  }

  // TOO MANY FORMS (friction)
  if ((signals.formCount ?? 0) > 3) {
    complaints.push({
      id: "form-overload",
      title: "I fell into a form pit",
      severity: "low",
      detail: `I found ${signals.formCount} forms waiting with their mouths open. Keep the one that serves the main job and shut the rest before visitors get swallowed.`,
    });
  }

  // MISSING TEAM/ABOUT (credibility)
  if (!signals.hasTeam && (signals.trustIndicators?.length ?? 0) < 2) {
    complaints.push({
      id: "anonymous-brand",
      title: "Where are the humans?",
      severity: "medium",
      detail:
        "I sniffed behind the logo and found nobody there. Show a real name, face, short story, or clear company detail so this place does not feel like an empty cave.",
    });
  }

  return complaints;
}

// ─── Fixes generation ────────────────────────────────────────────────────────

export function generateFixes(
  signals: PageSignals,
  categories: CategoryScores,
): UsefulFix[] {
  const fixes: UsefulFix[] = [];

  // H1 fix
  const h1s = signals.h1 ?? [];
  if (h1s.length === 0) {
    fixes.push({
      title: "Feed me one clear headline",
      detail:
        "Put one big H1 at the top. Tell me what this is, who wants it, and what they get. Do not make me dig for the offer.",
      priority: "urgent",
      effort: "low",
    });
  } else {
    const isVague = VAGUE_H1_PATTERNS.some((p) => p.test(h1s[0]));
    if (isVague) {
      fixes.push({
        title: "Put the real offer in the headline",
        detail: `Right now the headline says "${h1s[0]}." Crack it open and put the offer, the buyer, and the result inside. I want the whole trail in one sniff.`,
        priority: "high",
        effort: "low",
      });
    }
  }

  // Trust fixes
  if (categories.trustTax < 75) {
    if (!signals.hasTestimonials) {
      fixes.push({
        title: "Bring me real customer words",
        detail:
          "Bring me two or three short customer quotes with real names, roles, or companies. Put the best one near the main promise or form, right where people start to worry.",
        priority: "high",
        effort: "low",
      });
    }
    if (!signals.hasClientLogos && !signals.hasCaseStudies) {
      fixes.push({
        title: "Show me who already came through",
        detail:
          "Drop in real customer logos, one short story, or a result with a number. I want tracks in the mud, not 'trusted by teams everywhere.'",
        priority: "high",
        effort: "medium",
      });
    }
    if (!signals.hasSecurityBadges) {
      fixes.push({
        title: "Put the right proof by the button",
        detail:
          "Put the real guarantee, safety detail, or return rule beside the place where people sign up, pay, or share details. That is where my nose starts twitching.",
        priority: "medium",
        effort: "low",
      });
    }
  }

  // CTA fixes
  if (categories.ctaCorpse < 75) {
    const ctas = signals.ctaTexts ?? [];
    if (ctas.length === 0) {
      fixes.push({
        title: "Give me one big next step",
        detail:
          "Put one main button near the first promise. Make it say what happens, such as 'Start my free trial,' 'Book a demo,' or 'Get a quote.' One trail. No maze.",
        priority: "urgent",
        effort: "low",
      });
    } else {
      const allWeak = ctas.every((c) =>
        WEAK_CTAS.some(
          (w) => c.toLowerCase() === w || c.toLowerCase().startsWith(w),
        ),
      );
      if (allWeak) {
        fixes.push({
          title: "Make the button tell me what happens",
          detail: `Rip off labels such as "Learn more" and "Submit." Use "See pricing," "Book a demo," or "Send my request" so I know what waits on the other side.`,
          priority: "high",
          effort: "low",
        });
      }
    }
  }

  // Fluff fix
  const allText = [signals.heroText ?? "", signals.bodyTextSample ?? ""].join(
    " ",
  );
  const { count: buzzCount } = countBuzzwords(allText);
  if (buzzCount >= 1) {
    fixes.push({
      title: "Feed those claims some facts",
      detail:
        "Big words are bones with no meat. Replace 'innovative,' 'cutting-edge,' and 'world-class' with a real feature, time, number, or example I can bite into.",
      priority: "high",
      effort: "medium",
    });
  }

  // Contact fix
  if (!signals.hasContact) {
    fixes.push({
      title: "Give me a path to a real person",
      detail:
        "Put a real email, contact page, phone number, or watched chat link where I can see it. Do not make people crawl through the roots when they need help.",
      priority: "medium",
      effort: "low",
    });
  }

  // Pricing fix
  if (!signals.hasPricing && (signals.ctaTexts?.length ?? 0) > 0) {
    fixes.push({
      title: "Stop hiding the price",
      detail:
        "Show the price, a starting range, or how you work it out. If people need a quote, tell them what you need and what happens after they ask. No locked treasure chest.",
      priority: "medium",
      effort: "low",
    });
  }

  // Mobile fix
  if (signals.hasMobileViewport === false) {
    fixes.push({
      title: "Fix the tiny-screen cave",
      detail:
        "Add the viewport meta tag, then crawl through the page at phone width. The tag opens the door, but you still need to check that nothing spills out.",
      priority: "high",
      effort: "low",
    });
  }

  // META DESCRIPTION FIX
  if (!signals.metaDescription || signals.metaDescription.length < 30) {
    fixes.push({
      title: "Write the words outside the cave",
      detail:
        "Write a short meta description that says what is inside, who wants it, and why they should enter. Do not let the search engine grab a random scrap.",
      priority: "medium",
      effort: "low",
    });
  }

  // CONTENT STRUCTURE FIX
  if ((signals.h2?.length ?? 0) < 2) {
    fixes.push({
      title: "Chop the page into clear chunks",
      detail:
        "Use a few plain H2 headings to name each part. I should be able to leap from heading to heading and still know the whole story.",
      priority: "medium",
      effort: "low",
    });
  }

  // CONSOLIDATE NAVIGATION FIX
  if ((signals.linkCount ?? 0) > 50) {
    fixes.push({
      title: "Put the loose links back in the cage",
      detail: `I counted ${signals.linkCount} links running loose. Keep only the main paths in the top menu, then herd legal, account, and small links into the footer.`,
      priority: "low",
      effort: "medium",
    });
  }

  // ADD TEAM/ABOUT FIX
  if (!signals.hasTeam) {
    fixes.push({
      title: "Show me the humans",
      detail:
        "Pull back the curtain. Add real names, photos, and one short line about why these people know the work. I trust footprints more than a floating logo.",
      priority: "medium",
      effort: "medium",
    });
  }

  // HERO COPY FIX (if hero is vague)
  if (signals.heroText && signals.heroText.length > 0) {
    const heroLower = signals.heroText.toLowerCase();
    const hasBenefit =
      /\b(save|faster|grow|increase|reduce|automate|simplify|boost|improve|cut|eliminate)\b/.test(
        heroLower,
      );
    const hasSpecificNumber = /\b\d+/.test(heroLower);
    if (!hasBenefit && !hasSpecificNumber && signals.heroText.length > 20) {
      fixes.push({
        title: "Put the prize at the top",
        detail: `The opening starts with "${signals.heroText.slice(0, 60)}..." but the good part is buried. Drag the result, the buyer, and one real detail up where I can see them.`,
        priority: "high",
        effort: "low",
      });
    }
  }

  // Ensure every report has enough practical value. Even strong pages deserve
  // at least three concrete next steps, otherwise the roast feels thin.
  if (fixes.length < 3) {
    const existingTitles = new Set(fixes.map((fix) => fix.title));

    if (!existingTitles.has("Drag the main button into the light")) {
      fixes.push({
        title: "Drag the main button into the light",
        detail:
          "Choose one action and put it beside the main promise. Make the button say what happens, then shove the smaller choices out of its way.",
        priority: "high",
        effort: "low",
      });
    }

    if (fixes.length < 3 && !existingTitles.has("Pile the proof by the button")) {
      fixes.push({
        title: "Pile the proof by the button",
        detail:
          "Put a real quote, rating, result, or promise near the main button. That is where people stop, sniff, and decide whether to move.",
        priority: "high",
        effort: "low",
      });
    }

    if (
      fixes.length < 3 &&
      !existingTitles.has("Make the first screen spill its secrets")
    ) {
      fixes.push({
        title: "Make the first screen spill its secrets",
        detail:
          "The first screen must tell me what this is, who wants it, why it matters, and where to go next. Anything else gets dragged lower.",
        priority: "high",
        effort: "medium",
      });
    }
  }

  return fixes;
}
