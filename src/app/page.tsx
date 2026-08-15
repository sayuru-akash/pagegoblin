import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Throw Me Your Website. I'll Tear Into It.",
  description:
    "Throw PageGoblin a URL. The wild little beast will crawl inside, roast the mess, and drag back the fixes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PageGoblin: Throw Me Your Website",
    description:
      "Let the goblin loose on your page. It will bite the weak words, find the hidden buttons, and show you what to fix.",
    url: "/",
  },
};

export default function Home() {
  return <HomePage />;
}
