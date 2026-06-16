import { describe, it, expect, beforeAll } from "vitest";
import {
  normalizePageUrl,
  detectPageRisk,
  sanitizePageSignals,
  analyzePage,
} from "../index";
import type { PageSignals, AnalysisResult } from "../index";

// ─── Test fixtures ───────────────────────────────────────────────────────────

const strongSaaSPage: PageSignals = {
  url: "https://acme-crm.com",
  title: "Acme CRM — Close More Deals Faster",
  metaDescription: "The #1 CRM for small sales teams. Pipeline tracking, automated follow-ups, and real-time analytics.",
  h1: ["Close More Deals with Acme CRM"],
  h2: ["Features", "Pricing", "Testimonials", "FAQ"],
  ctaTexts: ["Start Free Trial", "Book a Demo", "See Pricing"],
  heroText: "Acme CRM helps small sales teams close 30% more deals with automated follow-ups and pipeline tracking.",
  bodyTextSample: "Acme CRM is built for B2B sales teams of 5-50 people. Track your pipeline, automate follow-ups, and get real-time analytics. Over 2,000 companies trust Acme CRM to close more deals.",
  visibleTextSample: "Close More Deals with Acme CRM. Start Free Trial. Book a Demo. Features Pricing Testimonials FAQ. Over 2,000 companies trust us. SOC 2 certified. 99.9% uptime.",
  trustIndicators: ["SOC 2 certified", "99.9% uptime SLA", "24/7 support"],
  socialProofText: ["2,000+ companies", "4.8/5 on G2", "Used by Salesforce, HubSpot, and more"],
  linkCount: 25,
  buttonCount: 6,
  formCount: 1,
  imageCount: 8,
  hasPricing: true,
  hasContact: true,
  hasTestimonials: true,
  hasCaseStudies: true,
  hasClientLogos: true,
  hasSecurityBadges: true,
  hasAddress: true,
  hasTeam: true,
  hasMobileViewport: true,
  source: "WEB_URL",
};

const emptyGenericPage: PageSignals = {
  url: "https://generic-startup.io",
  title: "Welcome",
  metaDescription: "",
  h1: ["Welcome to Our Platform"],
  h2: [],
  ctaTexts: ["Learn More", "Submit"],
  heroText: "We help businesses grow with innovative solutions.",
  bodyTextSample: "We are a leading provider of cutting-edge solutions that empower businesses to unlock their potential.",
  visibleTextSample: "Welcome to Our Platform. Learn More. Submit. Innovative solutions for your business.",
  trustIndicators: [],
  socialProofText: [],
  linkCount: 3,
  buttonCount: 2,
  formCount: 0,
  imageCount: 1,
  hasPricing: false,
  hasContact: false,
  hasTestimonials: false,
  hasCaseStudies: false,
  hasClientLogos: false,
  hasSecurityBadges: false,
  hasAddress: false,
  hasTeam: false,
  hasMobileViewport: true,
  source: "WEB_URL",
};

const weakCTAOnlyPage: PageSignals = {
  url: "https://weak-cta.com",
  title: "Our Services",
  metaDescription: "Check out our services.",
  h1: ["Our Services"],
  h2: ["About", "Contact"],
  ctaTexts: ["Learn More", "Submit", "Click Here", "Read More"],
  heroText: "We offer a range of services to help you succeed.",
  bodyTextSample: "Our team provides expert services. Learn more about what we can do for you.",
  visibleTextSample: "Our Services. Learn More. Submit. Click Here. Read More.",
  trustIndicators: [],
  socialProofText: [],
  linkCount: 10,
  buttonCount: 4,
  formCount: 0,
  imageCount: 2,
  hasPricing: false,
  hasContact: true,
  hasTestimonials: false,
  hasCaseStudies: false,
  hasClientLogos: false,
  hasSecurityBadges: false,
  hasAddress: false,
  hasTeam: false,
  hasMobileViewport: true,
  source: "WEB_URL",
};

const buzzwordHeavyPage: PageSignals = {
  url: "https://buzzword-central.com",
  title: "Next-Generation Digital Transformation",
  metaDescription: "Leverage our cutting-edge, innovative, world-class platform for scalable solutions.",
  h1: ["Empower Your Business with Next-Generation Innovation"],
  h2: ["Our Solutions"],
  ctaTexts: ["Get Started"],
  heroText: "Our cutting-edge platform leverages innovative synergy to deliver world-class, seamless digital transformation and scalable solutions that empower your team to unlock potential.",
  bodyTextSample: "We provide bespoke, cutting-edge solutions that leverage innovative synergy. Our world-class platform enables seamless digital transformation for scalable growth.",
  visibleTextSample: "Empower Your Business with Next-Generation Innovation. Get Started. Cutting-edge. Innovative. World-class. Seamless. Leverage. Scalable solutions.",
  trustIndicators: [],
  socialProofText: [],
  linkCount: 5,
  buttonCount: 1,
  formCount: 0,
  imageCount: 3,
  hasPricing: false,
  hasContact: false,
  hasTestimonials: false,
  hasCaseStudies: false,
  hasClientLogos: false,
  hasSecurityBadges: false,
  hasAddress: false,
  hasTeam: false,
  hasMobileViewport: true,
  source: "WEB_URL",
};

const localhostPage: PageSignals = {
  url: "http://localhost:3000/dashboard",
  title: "Dashboard — My App",
  metaDescription: "Your account dashboard.",
  h1: ["Dashboard"],
  h2: ["Settings", "Profile"],
  ctaTexts: ["Save Changes"],
  heroText: "Welcome back to your dashboard.",
  bodyTextSample: "Manage your account settings and profile.",
  visibleTextSample: "Dashboard. Settings. Profile. Save Changes.",
  trustIndicators: [],
  socialProofText: [],
  linkCount: 15,
  buttonCount: 3,
  formCount: 2,
  imageCount: 0,
  hasPricing: false,
  hasContact: false,
  hasTestimonials: false,
  hasCaseStudies: false,
  hasClientLogos: false,
  hasSecurityBadges: false,
  hasAddress: false,
  hasTeam: false,
  hasMobileViewport: true,
  source: "MANUAL_SIGNALS",
};

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("normalizePageUrl", () => {
  it("normalizes a standard HTTPS URL", () => {
    const result = normalizePageUrl("https://example.com/path?q=1#hero");
    expect(result.url).toBe("https://example.com/path?q=1#hero");
    expect(result.domain).toBe("example.com");
    expect(result.protocol).toBe("https:");
  });

  it("adds https protocol when missing", () => {
    const result = normalizePageUrl("example.com");
    expect(result.url).toMatch(/^https:\/\//);
    expect(result.domain).toBe("example.com");
  });

  it("preserves http for localhost", () => {
    const result = normalizePageUrl("http://localhost:3000");
    expect(result.protocol).toBe("http:");
    expect(result.domain).toBe("localhost");
  });
});

describe("detectPageRisk", () => {
  it("detects localhost URL", () => {
    const risks = detectPageRisk(localhostPage);
    expect(risks.length).toBeGreaterThan(0);
    expect(risks.some((r) => r.type === "PRIVATE_PAGE")).toBe(true);
  });

  it("detects dashboard/admin URLs", () => {
    const adminPage: PageSignals = { ...localhostPage, url: "https://myapp.com/admin/users" };
    const risks = detectPageRisk(adminPage);
    expect(risks.some((r) => r.type === "PRIVATE_PAGE")).toBe(true);
  });

  it("detects login page", () => {
    const loginPage: PageSignals = { ...localhostPage, url: "https://myapp.com/login" };
    const risks = detectPageRisk(loginPage);
    expect(risks.some((r) => r.type === "PRIVATE_PAGE")).toBe(true);
  });

  it("returns no risks for a normal public page", () => {
    const risks = detectPageRisk(strongSaaSPage);
    expect(risks).toHaveLength(0);
  });
});

describe("sanitizePageSignals", () => {
  it("trims string fields", () => {
    const dirty: unknown = {
      url: "  https://example.com  ",
      title: "  Hello World  ",
      metaDescription: "  Some description  ",
    };
    const clean = sanitizePageSignals(dirty);
    expect(clean.url).toBe("https://example.com");
    expect(clean.title).toBe("Hello World");
    expect(clean.metaDescription).toBe("Some description");
  });

  it("truncates long text samples", () => {
    const longText = "x".repeat(5000);
    const dirty: unknown = {
      url: "https://example.com",
      heroText: longText,
      bodyTextSample: longText,
      visibleTextSample: longText,
    };
    const clean = sanitizePageSignals(dirty);
    expect(clean.heroText!.length).toBeLessThanOrEqual(700);
    expect(clean.bodyTextSample!.length).toBeLessThanOrEqual(3000);
    expect(clean.visibleTextSample!.length).toBeLessThanOrEqual(3000);
  });

  it("limits arrays to max sizes", () => {
    const dirty: unknown = {
      url: "https://example.com",
      h1: Array(30).fill("Heading"),
      h2: Array(30).fill("Subheading"),
      ctaTexts: Array(50).fill("Click me"),
    };
    const clean = sanitizePageSignals(dirty);
    expect(clean.h1!.length).toBeLessThanOrEqual(20);
    expect(clean.h2!.length).toBeLessThanOrEqual(20);
    expect(clean.ctaTexts!.length).toBeLessThanOrEqual(30);
  });

  it("drops unknown fields", () => {
    const dirty: unknown = {
      url: "https://example.com",
      title: "Test",
      unknownField: "should be dropped",
      anotherUnknown: 42,
    };
    const clean = sanitizePageSignals(dirty);
    expect(clean).not.toHaveProperty("unknownField");
    expect(clean).not.toHaveProperty("anotherUnknown");
  });

  it("passes through valid signals unchanged", () => {
    const clean = sanitizePageSignals(strongSaaSPage);
    expect(clean.url).toBe(strongSaaSPage.url);
    expect(clean.title).toBe(strongSaaSPage.title);
    expect(clean.h1).toEqual(strongSaaSPage.h1);
  });
});

describe("analyzePage — strong SaaS page", () => {
  let result: AnalysisResult;

  beforeAll(() => {
    result = analyzePage(strongSaaSPage);
  });

  it("produces a high Goblin Score (>= 80)", () => {
    expect(result.goblinScore).toBeGreaterThanOrEqual(80);
  });

  it("has no critical complaints", () => {
    const critical = result.goblinComplaints.filter((c) => c.severity === "critical");
    expect(critical).toHaveLength(0);
  });

  it("has strong trust category score", () => {
    expect(result.categoryScores.trustTax).toBeGreaterThanOrEqual(70);
  });

  it("has strong CTA category score", () => {
    expect(result.categoryScores.ctaCorpse).toBeGreaterThanOrEqual(70);
  });

  it("has strong clarity category score", () => {
    expect(result.categoryScores.buyerConfusionLevel).toBeGreaterThanOrEqual(70);
  });

  it("returns normalized URL and domain", () => {
    expect(result.normalizedUrl).toBe("https://acme-crm.com");
    expect(result.domain).toBe("acme-crm.com");
  });

  it("includes a verdict string", () => {
    expect(typeof result.verdict).toBe("string");
    expect(result.verdict.length).toBeGreaterThan(0);
  });
});

describe("analyzePage — empty/generic page", () => {
  let result: AnalysisResult;

  beforeAll(() => {
    result = analyzePage(emptyGenericPage);
  });

  it("produces a low Goblin Score (<= 45)", () => {
    expect(result.goblinScore).toBeLessThanOrEqual(45);
  });

  it("has biggest crime about vague offer or fluff", () => {
    const crime = result.biggestCrime.toLowerCase();
    const hasRelevantCrime =
      crime.includes("vague") ||
      crime.includes("fluff") ||
      crime.includes("unclear") ||
      crime.includes("generic") ||
      crime.includes("buzzword") ||
      crime.includes("trust") ||
      crime.includes("cta") ||
      crime.includes("offer");
    expect(hasRelevantCrime).toBe(true);
  });

  it("includes complaints about vague H1, fluff, CTA, and trust", () => {
    const complaintTitles = result.goblinComplaints.map((c) => c.title.toLowerCase());
    const complaintDetails = result.goblinComplaints.map((c) => c.detail.toLowerCase());
    const allText = [...complaintTitles, ...complaintDetails].join(" ");

    const hasVague = allText.includes("vague") || allText.includes("unclear") || allText.includes("generic") || allText.includes("welcome") || allText.includes("h1");
    const hasFluff = allText.includes("fluff") || allText.includes("buzzword") || allText.includes("innovative") || allText.includes("cutting-edge");
    const hasCTA = allText.includes("cta") || allText.includes("call to action") || allText.includes("learn more") || allText.includes("submit");
    const hasTrust = allText.includes("trust") || allText.includes("proof") || allText.includes("testimonial") || allText.includes("credibility");

    expect(hasVague || hasFluff || hasCTA || hasTrust).toBe(true);
  });

  it("includes fixes for H1, proof, and CTA", () => {
    const fixTitles = result.actuallyUsefulFixes.map((f) => f.title.toLowerCase());
    const fixDetails = result.actuallyUsefulFixes.map((f) => f.detail.toLowerCase());
    const allText = [...fixTitles, ...fixDetails].join(" ");

    const hasH1Fix = allText.includes("h1") || allText.includes("headline") || allText.includes("hero");
    const hasProofFix = allText.includes("proof") || allText.includes("trust") || allText.includes("testimonial") || allText.includes("credibility");
    const hasCTAFix = allText.includes("cta") || allText.includes("call to action") || allText.includes("button");

    expect(hasH1Fix || hasProofFix || hasCTAFix).toBe(true);
  });
});

describe("analyzePage — weak CTA page", () => {
  let result: AnalysisResult;

  beforeAll(() => {
    result = analyzePage(weakCTAOnlyPage);
  });

  it("gets a CTA Corpse complaint", () => {
    const ctaComplaints = result.goblinComplaints.filter(
      (c) =>
        c.title.toLowerCase().includes("cta") ||
        c.detail.toLowerCase().includes("cta") ||
        c.title.toLowerCase().includes("call to action") ||
        c.detail.toLowerCase().includes("call to action") ||
        c.title.toLowerCase().includes("learn more") ||
        c.detail.toLowerCase().includes("learn more")
    );
    expect(ctaComplaints.length).toBeGreaterThan(0);
  });

  it("has lower CTA category score", () => {
    expect(result.categoryScores.ctaCorpse).toBeLessThan(60);
  });
});

describe("analyzePage — buzzword-heavy page", () => {
  let result: AnalysisResult;

  beforeAll(() => {
    result = analyzePage(buzzwordHeavyPage);
  });

  it("triggers Fluff Damage complaint with buzzword evidence", () => {
    const fluffComplaints = result.goblinComplaints.filter(
      (c) =>
        c.title.toLowerCase().includes("fluff") ||
        c.title.toLowerCase().includes("buzzword") ||
        c.detail.toLowerCase().includes("fluff") ||
        c.detail.toLowerCase().includes("buzzword")
    );
    expect(fluffComplaints.length).toBeGreaterThan(0);

    // Check that evidence includes actual buzzwords
    const allEvidence = fluffComplaints.flatMap((c) => c.evidence ?? []).join(" ").toLowerCase();
    const hasBuzzwordEvidence =
      allEvidence.includes("cutting-edge") ||
      allEvidence.includes("innovative") ||
      allEvidence.includes("world-class") ||
      allEvidence.includes("seamless") ||
      allEvidence.includes("leverage") ||
      allEvidence.includes("scalable") ||
      allEvidence.includes("synergy") ||
      allEvidence.includes("bespoke") ||
      allEvidence.includes("empower") ||
      allEvidence.includes("unlock") ||
      allEvidence.includes("next-generation") ||
      allEvidence.includes("digital transformation");
    expect(hasBuzzwordEvidence).toBe(true);
  });

  it("has lower fluffDamage score", () => {
    expect(result.categoryScores.fluffDamage).toBeLessThan(60);
  });
});

describe("analyzePage — localhost/dashboard URL", () => {
  let result: AnalysisResult;

  beforeAll(() => {
    result = analyzePage(localhostPage);
  });

  it("triggers warnings for private page", () => {
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings.some((w) => w.type === "PRIVATE_PAGE")).toBe(true);
  });

  it("still returns a deterministic analysis result", () => {
    expect(result.goblinScore).toBeGreaterThanOrEqual(0);
    expect(result.goblinScore).toBeLessThanOrEqual(100);
    expect(result.categoryScores).toBeDefined();
    expect(result.goblinComplaints).toBeDefined();
    expect(result.actuallyUsefulFixes).toBeDefined();
    expect(result.verdict).toBeDefined();
    expect(result.summaryMarkdown).toBeDefined();
  });
});

describe("determinism — same input returns same output", () => {
  it("returns deep-equal output for same input", () => {
    const result1 = analyzePage(strongSaaSPage);
    const result2 = analyzePage(strongSaaSPage);
    expect(result1).toEqual(result2);
  });

  it("returns deep-equal output for generic page", () => {
    const result1 = analyzePage(emptyGenericPage);
    const result2 = analyzePage(emptyGenericPage);
    expect(result1).toEqual(result2);
  });
});

// ─── Phase 1D: private-page text detection ───────────────────────────────────

describe("detectPageRisk — private-page keywords in visible/hero/body text", () => {
  it("detects PRIVATE_PAGE when heroText contains 'dashboard'", () => {
    const signals: PageSignals = {
      url: "https://example.com/app",
      title: "My App",
      heroText: "Welcome back to your dashboard overview.",
      bodyTextSample: "Manage your projects.",
      visibleTextSample: "Dashboard overview projects.",
    };
    const risks = detectPageRisk(signals);
    expect(risks.some((r) => r.type === "PRIVATE_PAGE")).toBe(true);
  });

  it("detects PRIVATE_PAGE when bodyTextSample contains 'account settings'", () => {
    const signals: PageSignals = {
      url: "https://example.com/profile",
      title: "Profile",
      heroText: "Your profile",
      bodyTextSample: "Update your account settings and preferences here.",
      visibleTextSample: "Profile account settings.",
    };
    const risks = detectPageRisk(signals);
    expect(risks.some((r) => r.type === "PRIVATE_PAGE")).toBe(true);
  });

  it("detects PRIVATE_PAGE when visibleTextSample contains 'sign in'", () => {
    const signals: PageSignals = {
      url: "https://example.com/portal",
      title: "Portal",
      heroText: "Access the portal",
      bodyTextSample: "Enter your credentials to continue.",
      visibleTextSample: "Portal sign in to your account.",
    };
    const risks = detectPageRisk(signals);
    expect(risks.some((r) => r.type === "PRIVATE_PAGE")).toBe(true);
  });

  it("detects PRIVATE_PAGE when visibleTextSample contains 'admin'", () => {
    const signals: PageSignals = {
      url: "https://example.com/manage",
      title: "Manage",
      heroText: "Manage your team",
      bodyTextSample: "Team management tools.",
      visibleTextSample: "Manage admin panel users.",
    };
    const risks = detectPageRisk(signals);
    expect(risks.some((r) => r.type === "PRIVATE_PAGE")).toBe(true);
  });

  it("does NOT false-positive on a normal public page", () => {
    const risks = detectPageRisk(strongSaaSPage);
    expect(risks.filter((r) => r.type === "PRIVATE_PAGE")).toHaveLength(0);
  });
});

// ─── Phase 1D: summary Markdown SPEC sections ────────────────────────────────

describe("summaryMarkdown — SPEC section coverage", () => {
  it("includes Hero Section Panic section", () => {
    const result = analyzePage(emptyGenericPage);
    expect(result.summaryMarkdown).toContain("Hero Section Panic");
  });

  it("includes Proof/Credibility Check section", () => {
    const result = analyzePage(emptyGenericPage);
    expect(result.summaryMarkdown).toContain("Proof/Credibility Check");
  });

  it("includes Mobile Suspicion Warning section when hasMobileViewport is false", () => {
    const noMobile: PageSignals = { ...emptyGenericPage, hasMobileViewport: false };
    const result = analyzePage(noMobile);
    expect(result.summaryMarkdown).toContain("Mobile Suspicion Warning");
  });

  it("includes all existing SPEC terms in summary", () => {
    const result = analyzePage(strongSaaSPage);
    const md = result.summaryMarkdown;
    expect(md).toContain("Goblin Score");
    expect(md).toContain("Biggest Crime");
    expect(md).toContain("Goblin Complaints");
    expect(md).toContain("Actually Useful Fixes");
    expect(md).toContain("The Goblin Verdict");
  });
});

// ─── Phase 1D: Mobile Suspicion Warning complaint/fix ────────────────────────

describe("analyzePage — mobile viewport missing", () => {
  let result: AnalysisResult;

  beforeAll(() => {
    const noMobile: PageSignals = { ...emptyGenericPage, hasMobileViewport: false };
    result = analyzePage(noMobile);
  });

  it("includes a complaint or fix labeled 'Mobile Suspicion Warning'", () => {
    const complaintTitles = result.goblinComplaints.map((c) => c.title);
    const fixTitles = result.actuallyUsefulFixes.map((f) => f.title);
    const allTitles = [...complaintTitles, ...fixTitles];
    expect(allTitles.some((t) => t.includes("Mobile Suspicion Warning"))).toBe(true);
  });

  it("includes Mobile Suspicion Warning in summary markdown", () => {
    expect(result.summaryMarkdown).toContain("Mobile Suspicion Warning");
  });
});

describe("summaryMarkdown", () => {
  it("includes PageGoblin terms and useful fixes", () => {
    const result = analyzePage(strongSaaSPage);
    const md = result.summaryMarkdown;

    // Should include goblin branding terms
    const hasGoblinTerm =
      md.includes("Goblin Score") ||
      md.includes("goblin score") ||
      md.includes("Biggest Crime") ||
      md.includes("biggest crime") ||
      md.includes("Goblin Complaints") ||
      md.includes("goblin complaints") ||
      md.includes("Trust Tax") ||
      md.includes("trust tax") ||
      md.includes("CTA Corpse") ||
      md.includes("cta corpse") ||
      md.includes("Fluff Damage") ||
      md.includes("fluff damage") ||
      md.includes("Buyer Confusion") ||
      md.includes("buyer confusion") ||
      md.includes("Goblin Verdict") ||
      md.includes("goblin verdict") ||
      md.includes("Actually Useful Fixes") ||
      md.includes("actually useful fixes") ||
      md.includes("PageGoblin") ||
      md.includes("pagegoblin");
    expect(hasGoblinTerm).toBe(true);

    // Should include useful fixes section
    const hasFixes =
      md.includes("Fix") ||
      md.includes("fix") ||
      md.includes("improve") ||
      md.includes("Improve") ||
      md.includes("recommendation") ||
      md.includes("Recommendation");
    expect(hasFixes).toBe(true);
  });
});
