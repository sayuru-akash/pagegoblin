import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "PageGoblin: Throw Me Your Website. I'll Tear Into It.",
  description:
    "Throw PageGoblin a URL. The wild little beast will crawl inside, roast the mess, and drag back the fixes.",
  path: "/",
  openGraphTitle: "PageGoblin: Throw Me Your Website",
  keywords: [
    "website roast",
    "website feedback tool",
    "website conversion audit",
    "landing page review",
    "conversion teardown",
  ],
});

export default function Home() {
  return <HomePage />;
}
