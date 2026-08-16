import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "PageGoblin privacy policy explaining what page signals are collected, what is never collected, Chrome extension permissions, AI-provider disclosure, and data retention.",
  path: "/privacy",
  openGraphTitle: "PageGoblin Privacy Policy",
  keywords: ["PageGoblin privacy", "Chrome extension privacy", "website audit data privacy"],
});


const sections = [
  {
    title: "What I carry back to the cave",
    content:
      "I take the URL you give me and the page clues needed for the roast: the title, headings, button words, proof, and a few page details. I do not keep the full HTML of your page.",
  },
  {
    title: "What my claws never touch",
    content:
      "I do not take passwords, form entries, cookies, login tokens, browser storage, or private account data from a page. The Chrome extension sends page clues only after you click the roast button. I do not watch in the background or scan by myself.",
  },
  {
    title: "What I do with those clues",
    content:
      "I use the clues to make your roast, keep its share link working, and help make later reports better. That is all. I do not build ad profiles from your pages.",
  },
  {
    title: "How long the roast stays in the cave",
    content:
      "Reports stay stored so their share links keep working. Search engines are told not to list private reports. You can ask us to delete a report at any time.",
  },
  {
    title: "Why the extension needs its tiny keys",
    content:
      "The Chrome extension asks for activeTab so it can read the page after you click, scripting so it can gather the page clues, and storage so it can remember your choices. It does nothing until you let me loose.",
  },
  {
    title: "When another cave is involved",
    content:
      "We do not sell your data. If you turn on the bigger AI roast, the page clues may go to the AI service picked by the site owner. The switch tells you this before anything is sent.",
  },
  {
    title: "The keys stay in your hand",
    content:
      "Do not share the roast link if you want it kept quiet. Use the email below if you want a report deleted. You choose what leaves the cave.",
  },
  {
    title: "Contact",
    content:
      "Questions about this policy? Email info@codezela.com. A real human will answer, even if I growl first.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="cave-page legal-page flex flex-1 flex-col items-center bg-grain">
        <section className="w-full px-6 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-display text-5xl uppercase leading-none tracking-tight text-ink sm:text-7xl">
                Privacy Policy
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-sm text-muted">
                Last updated: June 2026
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I tear pages apart. I do not rummage through your private things.
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
