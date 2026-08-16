import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: "PageGoblin terms covering acceptable use, roast content, privacy, limits, and contact information.",
  path: "/terms",
  openGraphTitle: "PageGoblin Terms of Service",
  keywords: ["PageGoblin terms", "website roast terms", "Chrome extension terms"],
});

const sections = [
  { title: "Acceptance", content: "By using PageGoblin, you agree to these rules. If you do not agree, do not let me loose on a page." },
  { title: "The service", content: "PageGoblin gives loud, useful feedback on public web pages. It checks proof, button words, clear writing, and how easy the page is to use. A roast is an opinion from the tool, not paid expert advice." },
  { title: "Acceptable use", content: "Only roast pages you own or have permission to check. Do not use PageGoblin to bully a person, flood the API, or send endless automated requests. I bite pages, not people." },
  { title: "Roast content", content: "Roasts come from page clues and, when enabled, an AI writing step. They are opinions, not expert advice. Every howl is aimed at the page, never its maker." },
  { title: "Liability", content: "PageGoblin is provided as is without warranties of any kind. We are not liable for damage that comes from using the service. Use your own judgment and keep control of the final choice." },
  { title: "Privacy", content: "The Privacy Policy also applies. Read it to see which page clues I carry back and what I never touch." },
  { title: "Changes", content: "We may change these terms. When that happens, the date at the top will change. Continuing to use PageGoblin means you accept the new rules." },
  { title: "Contact", content: "Questions about these terms? Email info@codezela.com. A human will come to the cave door." },
];

export default function TermsPage() {
  return <LegalPage label="Terms" title="Terms of Service" description="Even this cave has rules." updated="June 2026" sections={sections} />;
}
