import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PageGoblin: Throw Me a Website and Let Me Loose",
    short_name: "PageGoblin",
    description:
      "A wild little goblin that crawls through your webpage, roasts the mess, and drags back useful fixes.",
    start_url: "/",
    display: "standalone",
    background_color: "#020402",
    theme_color: "#b9d63b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    categories: ["productivity", "developer", "business"],
  };
}
