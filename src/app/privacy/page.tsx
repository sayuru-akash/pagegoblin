import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "PageGoblin privacy policy covering page signals, Chrome extension permissions, AI providers, and retention.",
  path: "/privacy",
  openGraphTitle: "PageGoblin Privacy Policy",
  keywords: ["PageGoblin privacy", "Chrome extension privacy", "website audit data privacy"],
});

const sections = [
  { title: "What I carry back", content: "I take the URL and the page clues needed for the roast: the title, headings, button words, proof, and a few page details. I do not keep the full HTML." },
  { title: "What I never touch", content: "I do not take passwords, form entries, cookies, login tokens, browser storage, or private account data. The extension reads page clues only after you click the roast button." },
  { title: "What the clues do", content: "I use the clues to make the roast, keep its share link working, and improve later reports. I do not build ad profiles from your pages." },
  { title: "How long reports stay", content: "Reports stay stored so their share links work. Search engines are told not to list private reports. You can ask us to delete a report at any time." },
  { title: "Extension permissions", content: "The extension uses activeTab to read the page after you click, scripting to gather page clues, and storage to remember your choices. It does nothing until you let it loose." },
  { title: "AI providers", content: "We do not sell your data. If you turn on the bigger AI roast, page clues may go to the AI service chosen by the site owner. The switch tells you before anything is sent." },
  { title: "Your choices", content: "Do not share a roast link if you want it kept quiet. Email us if you want a report deleted. You choose what leaves the cave." },
  { title: "Contact", content: "Questions about this policy? Email info@codezela.com. A real human will answer." },
];

export default function PrivacyPage() {
  return <LegalPage label="Privacy" title="Privacy Policy" description="I bite pages, not private things." updated="June 2026" sections={sections} />;
}
