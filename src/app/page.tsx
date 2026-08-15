import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "A Clear, Honest Website Roast",
  description:
    "Give PageGoblin a URL. It will point out what feels unclear, what is hard to trust, and what to fix first.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PageGoblin: A Clear, Honest Website Roast",
    description:
      "Hand over a URL and the goblin will show you what is confusing visitors and what to fix first.",
    url: "/",
  },
};

export default function Home() {
  return <HomePage />;
}
