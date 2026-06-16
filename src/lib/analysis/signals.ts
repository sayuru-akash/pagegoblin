import type { PageSignals, PageRisk } from "./types";
import { PageSignalsSchema } from "./schema";

const PRIVATE_URL_PATTERNS = [
  /localhost/i,
  /127\.0\.0\.\d+/,
  /0\.0\.0\.0/,
  /192\.168\.\d+\.\d+/,
  /10\.\d+\.\d+\.\d+/,
  /172\.(1[6-9]|2\d|3[01])\.\d+\.\d+/,
];

const PRIVATE_PATH_PATTERNS = [
  /\/dashboard/i,
  /\/admin/i,
  /\/account/i,
  /\/settings/i,
  /\/login/i,
  /\/auth/i,
  /\/checkout/i,
  /\/private/i,
];

const PRIVATE_TITLE_KEYWORDS = [
  "dashboard",
  "admin",
  "account settings",
  "sign in",
  "login",
];

const PRIVATE_BODY_KEYWORDS = [
  "dashboard",
  "admin",
  "account settings",
  "sign in",
  "login",
];

export function sanitizePageSignals(input: unknown): PageSignals {
  return PageSignalsSchema.parse(input);
}

export function detectPageRisk(signals: PageSignals): PageRisk[] {
  const risks: PageRisk[] = [];
  const url = signals.url.toLowerCase();
  const title = (signals.title ?? "").toLowerCase();

  // Check URL for private/local patterns
  for (const pattern of PRIVATE_URL_PATTERNS) {
    if (pattern.test(url)) {
      risks.push({
        type: "PRIVATE_PAGE",
        message: "This URL appears to be a local/private address. The analysis may not represent a public-facing page.",
        severity: "warning",
      });
      break;
    }
  }

  // Check URL path for private page patterns
  for (const pattern of PRIVATE_PATH_PATTERNS) {
    if (pattern.test(url)) {
      risks.push({
        type: "PRIVATE_PAGE",
        message: "This URL appears to be a private/internal page (dashboard, admin, login, etc.). Analysis results may not be meaningful.",
        severity: "warning",
      });
      break;
    }
  }

  // Check title for private page keywords
  for (const keyword of PRIVATE_TITLE_KEYWORDS) {
    if (title.includes(keyword)) {
      risks.push({
        type: "PRIVATE_PAGE",
        message: `The page title contains "${keyword}" which suggests this is a private/internal page.`,
        severity: "warning",
      });
      break;
    }
  }

  // Check visible/hero/body text for private page keywords
  if (risks.length === 0) {
    const bodyText = [
      signals.heroText ?? "",
      signals.bodyTextSample ?? "",
      signals.visibleTextSample ?? "",
    ]
      .join(" ")
      .toLowerCase();

    for (const keyword of PRIVATE_BODY_KEYWORDS) {
      if (bodyText.includes(keyword)) {
        risks.push({
          type: "PRIVATE_PAGE",
          message: `The page body text contains "${keyword}" which suggests this is a private/internal page.`,
          severity: "warning",
        });
        break;
      }
    }
  }

  return risks;
}
