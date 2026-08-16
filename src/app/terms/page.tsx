import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "PageGoblin terms of service covering acceptable use, roast report content, privacy, limitations, and contact information.",
  path: "/terms",
  openGraphTitle: "PageGoblin Terms of Service",
  keywords: ["PageGoblin terms", "website roast terms", "Chrome extension terms"],
});


const sections = [
  {
    title: "Acceptance",
    content:
      "By using PageGoblin, you agree to these rules. If you do not agree, do not let me loose on a page. Even a wild goblin needs a fence.",
  },
  {
    title: "Service description",
    content:
      "PageGoblin is a website tool that gives loud, funny, useful feedback on web pages. I look at proof, button words, clear writing, and how easy the page is to use. A roast is an opinion from the tool, not paid expert advice.",
  },
  {
    title: "Acceptable use",
    content:
      "Only roast pages you own or have permission to check. Do not use PageGoblin to bully or target a person. Do not flood the API with bots or endless requests. I bite pages, not people.",
  },
  {
    title: "Roast content",
    content:
      "Roasts come from page clues and, when switched on, an AI writing step. They are opinions, not expert advice. Every howl is aimed at the page, never the person who made it.",
  },
  {
    title: "Limitation of liability",
    content:
      'PageGoblin is provided "as is" without warranties of any kind. We are not liable for damage that comes from using the service. Read the roast, use your own judgment, and keep your hands on the final choice.',
  },
  {
    title: "Privacy",
    content:
      "The Privacy Policy also applies when you use PageGoblin. Read it to see which page clues I carry back to the cave and what I never touch.",
  },
  {
    title: "Changes to terms",
    content:
      "We may change these terms. When that happens, the date at the top will change too. If you keep using PageGoblin after a change, you accept the new rules.",
  },
  {
    title: "Contact",
    content:
      "Questions about these terms? Email info@codezela.com. A human will come to the cave door.",
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="cave-page legal-page flex flex-1 flex-col items-center bg-grain">
        <section className="w-full px-6 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-display text-5xl uppercase leading-none tracking-tight text-ink sm:text-7xl">
                Terms of Service
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-sm text-muted">
                Last updated: June 2026
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Even the wildest cave has rules. Read these before you let me loose.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-12">
              {sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.05}>
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                      {section.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted">
                      {section.content}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
