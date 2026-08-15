import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PageGoblin: Throw Me a Website and Let Me Loose",
    short_name: "PageGoblin",
    description:
      "A wild little goblin that crawls through your webpage, roasts the mess, and drags back useful fixes.",
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
