import { randomBytes } from "crypto";

function domainToPrefix(domain: string): string {
  if (!domain) return "goblin";
  const parts = domain.replace(/\./g, "-").toLowerCase();
  const safe = parts.replace(/[^a-z0-9-]/g, "");
  return safe.slice(0, 20) || "goblin";
}

function randomSuffix(): string {
  const ts = Date.now().toString(36);
  const rand = parseInt(randomBytes(4).toString("hex"), 16).toString(36);
  return `${ts}-${rand}`;
}

export function generateSlug(domain: string): string {
  const prefix = domainToPrefix(domain);
  return `${prefix}-${randomSuffix()}`;
}
