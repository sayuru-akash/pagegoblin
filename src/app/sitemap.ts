import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || "https://pagegoblin.org";
  const lastModified = new Date();

  const staticPages = [
    "",
    "/analyze",
    "/how-it-works",
    "/examples",
    "/privacy",
    "/terms",
    "/support",
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path === "/analyze" ? 0.9 : 0.7,
  }));
}
