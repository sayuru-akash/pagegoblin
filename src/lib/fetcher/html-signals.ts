import * as cheerio from "cheerio";
import type { PageSignals } from "../analysis/types";

const TRUST_PATTERNS = [
  /\bsoc\s*2\b/i,
  /\biso\s*27001\b/i,
  /\bgdpr\b/i,
  /\bhipaa\b/i,
  /\bbb[ba]\b/i,
  /\btrustpilot\b/i,
  /\bg2\b/i,
  /\bcapterra\b/i,
  /\bguarantee\b/i,
  /\bcertified\b/i,
  /\bcompliant\b/i,
  /\baward[\w]*\b/i,
  /\btestimonial/i,
  /\breview/i,
  /\bcase\s*stud/i,
  /\bclient\s*logo/i,
];

const SOCIAL_PROOF_PATTERNS = [
  /\d[\d,]*\+?\s*(companies|customers|users|teams|businesses|clients)/i,
  /\d[\d,.]*\s*\/\s*5\s*(on|stars|rating)/i,
  /\btrusted\s*by\b/i,
  /\brated\b.*\b(out of|\/|stars)\b/i,
  /\bover\s+\d[\d,]*\+/i,
];

const PRICING_KEYWORDS = [
  /\bpricing\b/i,
  /\bprice\b/i,
  /\$\d/,
  /\bper\s*month\b/i,
  /\bper\s*year\b/i,
  /\bfree\s*trial\b/i,
  /\bfree\s*tier\b/i,
];

const CONTACT_KEYWORDS = [
  /\bcontact\s*us\b/i,
  /\bemail\s*us\b/i,
  /\bhello@/i,
  /\binfo@/i,
  /\bsupport@/i,
  /\bphone\b/i,
  /\b\+?\d[\d\s()-]{7,}\d\b/,
];

const TESTIMONIAL_KEYWORDS = [
  /\btestimonial/i,
  /\b"[^"]{20,}"\s*[—–-]\s*\w/i,
  /\bwhat\s*(our|they|people)\s*say\b/i,
];

const CASE_STUDY_KEYWORDS = [/\bcase\s*stud/i];

const CLIENT_LOGOS_KEYWORDS = [
  /\bclient\s*logo/i,
  /\bour\s*client/i,
  /\btrusted\s*by\b/i,
  /\bused\s*by\b/i,
  /\bpowering\b/i,
];

const SECURITY_BADGE_KEYWORDS = [
  /\bsoc\s*2\b/i,
  /\biso\s*27001\b/i,
  /\bgdpr\b/i,
  /\bhipaa\b/i,
  /\bssl\b/i,
  /\bencrypt/i,
  /\bsecure\b/i,
  /\bpci[\s-]*dss\b/i,
];

const ADDRESS_PATTERN = /\d+\s+[\w\s]+(?:st|street|ave|avenue|blvd|boulevard|rd|road|dr|drive|ln|lane|way|ct|court)[.,]?\s*(?:suite|ste|unit|apt)?\s*\d*\s*,?\s*[\w\s]+,?\s*[A-Z]{2}\s+\d{5}/i;

const CONTACT_SECTION_RE = /contact|support|sales/i;

function detectContact($: cheerio.CheerioAPI, allText: string): boolean {
  if (matchesAny(allText, CONTACT_KEYWORDS)) return true;

  if ($('a[href^="mailto:"]').length > 0) return true;
  if ($('a[href^="tel:"]').length > 0) return true;

  let found = false;
  $("[id],[class],[aria-label]").each((_, el) => {
    if (found) return;
    const id = $(el).attr("id") ?? "";
    const cls = $(el).attr("class") ?? "";
    const aria = $(el).attr("aria-label") ?? "";
    if (CONTACT_SECTION_RE.test(id) || CONTACT_SECTION_RE.test(cls) || CONTACT_SECTION_RE.test(aria)) {
      found = true;
    }
  });
  if (found) return true;

  let linkHit = false;
  $("a").each((_, el) => {
    if (linkHit) return;
    const href = ($(el).attr("href") ?? "").toLowerCase();
    const text = $(el).text().trim().toLowerCase();
    if (/\/(contact|support|sales)(\/|$|\?|#)/.test(href) || /^(contact|support|sales)$/.test(text)) {
      linkHit = true;
    }
  });
  if (linkHit) return true;

  if (ADDRESS_PATTERN.test(allText)) return true;

  return false;
}

const TEAM_KEYWORDS = [/\bour\s*team\b/i, /\bleadership\s*team\b/i, /\bmeet\s*(the|our)\b/i, /\bfounder/i, /\bcoo\b/i, /\bceo\b/i, /\bcto\b/i];

function extractText($: cheerio.CheerioAPI, selector: string, max: number): string[] {
  const texts: string[] = [];
  $(selector).each((_, el) => {
    const t = $(el).text().trim().replace(/\s+/g, " ");
    if (t && t.length <= 300 && !texts.includes(t)) {
      texts.push(t);
    }
  });
  return texts.slice(0, max);
}

function extractCtas($: cheerio.CheerioAPI): string[] {
  const ctas: string[] = [];
  const seen = new Set<string>();

  $("button, a.btn, a.btn-primary, a.btn-secondary, a[class*='btn'], a[class*='button'], a[role='button'], input[type='submit'], button[type='submit']").each((_, el) => {
    const t = $(el).text().trim().replace(/\s+/g, " ");
    if (t && t.length <= 200 && !seen.has(t)) {
      seen.add(t);
      ctas.push(t);
    }
  });

  $("a").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    if (href.startsWith("#") || href === "/") return;
    const t = $(el).text().trim().replace(/\s+/g, " ");
    if (t && t.length <= 200 && !seen.has(t) && t.length <= 30) {
      seen.add(t);
      ctas.push(t);
    }
  });

  return ctas.slice(0, 30);
}

function extractHeroText($: cheerio.CheerioAPI): string {
  const candidates = [
    "#hero",
    "[class*='hero']",
    "main > section:first-of-type",
    "header + main > section:first-of-type",
    "main",
    "header",
  ];

  for (const sel of candidates) {
    const el = $(sel).first();
    if (el.length) {
      const clone = el.clone();
      clone.find("script, style, noscript, svg, iframe, template, nav").remove();
      const text = clone.text().trim().replace(/\s+/g, " ");
      if (text.length > 20) {
        return text.slice(0, 700);
      }
    }
  }

  return "";
}

function extractVisibleText($: cheerio.CheerioAPI): string {
  const body = $("body").clone();
  body.find("script, style, noscript, svg, iframe, template, input[type='hidden'], input[type='password']").remove();
  return body.text().trim().replace(/\s+/g, " ").slice(0, 3000);
}

function extractBodyText($: cheerio.CheerioAPI): string {
  const main = $("main").length ? $("main") : $("body");
  const clone = main.clone();
  clone.find("script, style, noscript, svg, iframe, template, nav, header, footer, input[type='hidden'], input[type='password']").remove();
  return clone.text().trim().replace(/\s+/g, " ").slice(0, 3000);
}

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

function findMatchingSnippets(text: string, patterns: RegExp[], maxSnippets = 5): string[] {
  const snippets: string[] = [];
  const sentences = text.split(/[.!?\n]+/).map((s) => s.trim()).filter(Boolean);

  for (const sentence of sentences) {
    if (snippets.length >= maxSnippets) break;
    if (patterns.some((p) => p.test(sentence))) {
      snippets.push(sentence.slice(0, 300));
    }
  }

  return snippets;
}

export function extractSignalsFromHtml(input: {
  url: string;
  html: string;
  source?: PageSignals["source"];
  fetchedAt?: Date;
}): PageSignals {
  const { url, html, source = "WEB_URL", fetchedAt } = input;

  if (!html || html.trim().length === 0) {
    return {
      url,
      source,
      capturedAt: (fetchedAt ?? new Date()).toISOString(),
      h1: [],
      h2: [],
      ctaTexts: [],
    };
  }

  const $ = cheerio.load(html, { xmlMode: false });

  const title = $("title").first().text().trim() || undefined;
  const metaDescription = $('meta[name="description"]').attr("content")?.trim() || undefined;

  const h1 = extractText($, "h1", 20);
  const h2 = extractText($, "h2", 20);
  const ctaTexts = extractCtas($);

  const heroText = extractHeroText($) || undefined;
  const visibleTextSample = extractVisibleText($) || undefined;
  const bodyTextSample = extractBodyText($) || undefined;

  const allText = [visibleTextSample, bodyTextSample, heroText].filter(Boolean).join(" ");

  const trustIndicators = findMatchingSnippets(allText, TRUST_PATTERNS, 20);
  const socialProofText = findMatchingSnippets(allText, SOCIAL_PROOF_PATTERNS, 20);

  const linkCount = $("a").length;
  const buttonCount = $("button, input[type='submit']").length;
  const formCount = $("form").length;
  const imageCount = $("img").length;

  const hasPricing = matchesAny(allText, PRICING_KEYWORDS);
  const hasContact = detectContact($, allText);
  const hasTestimonials = matchesAny(allText, TESTIMONIAL_KEYWORDS);
  const hasCaseStudies = matchesAny(allText, CASE_STUDY_KEYWORDS);
  const hasClientLogos = matchesAny(allText, CLIENT_LOGOS_KEYWORDS);
  const hasSecurityBadges = matchesAny(allText, SECURITY_BADGE_KEYWORDS);
  const hasAddress = ADDRESS_PATTERN.test(allText);
  const hasTeam = matchesAny(allText, TEAM_KEYWORDS);
  const hasMobileViewport = $('meta[name="viewport"]').length > 0;

  return {
    url,
    title,
    metaDescription,
    h1,
    h2,
    ctaTexts,
    heroText,
    bodyTextSample,
    visibleTextSample,
    trustIndicators: trustIndicators.length > 0 ? trustIndicators : undefined,
    socialProofText: socialProofText.length > 0 ? socialProofText : undefined,
    linkCount,
    buttonCount,
    formCount,
    imageCount,
    hasPricing,
    hasContact,
    hasTestimonials,
    hasCaseStudies,
    hasClientLogos,
    hasSecurityBadges,
    hasAddress,
    hasTeam,
    hasMobileViewport,
    capturedAt: (fetchedAt ?? new Date()).toISOString(),
    source,
  };
}
