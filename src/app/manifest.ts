import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PageGoblin — The tiny goblin that judges your website",
    short_name: "PageGoblin",
    description:
      "A tiny goblin that brutally but usefully reviews your webpage's trust, clarity, CTAs, copy, and conversion confidence.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f3",
    theme_color: "#4ade80",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    categories: ["productivity", "developer", "business"],
  };
}
