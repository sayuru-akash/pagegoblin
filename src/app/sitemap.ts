import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-16T00:00:00.000Z");

  const staticPages = [
    "",
    "/analyze",
    "/extension",
    "/how-it-works",
    "/examples",
    "/privacy",
    "/terms",
    "/support",
  ];

  return staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path === "/analyze" ? 0.9 : path === "/extension" ? 0.85 : 0.7,
  }));
}
