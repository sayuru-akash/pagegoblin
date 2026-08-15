import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Website Roast & Conversion Teardown Tool",
  description:
    "Drop a URL and get a brutally honest PageGoblin teardown covering trust, CTA clarity, copy quality, buyer confusion, and conversion friction.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PageGoblin - Website Roast & Conversion Teardown Tool",
    description:
      "Drop a URL. Watch the goblin tear apart the conversion problems holding your page back.",
    url: "/",
  },
};

export default function Home() {
  return <HomePage />;
}
