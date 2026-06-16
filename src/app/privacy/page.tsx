import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "PageGoblin privacy policy explaining what page signals are collected, what is never collected, Chrome extension permissions, AI-provider disclosure, and data retention.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "PageGoblin Privacy Policy",
    description: "How PageGoblin handles submitted URLs, page signals, reports, Chrome extension data, and AI-provider disclosure.",
    url: "/privacy",
  },
};


const sections = [
  {
    title: "What we collect",
    content:
      "The URL you submit for roasting, along with extracted page signals — title, headings, CTA text, trust indicators, and other structural elements. We do not store the full HTML of your page.",
  },
  {
    title: "What we don't collect",
    content:
      "Passwords, form data, cookies, authentication tokens, local storage contents, or any personal account data from scanned pages. The Chrome extension only sends data after you explicitly click to trigger a roast. No background monitoring. No auto-scanning. No silent data grabs.",
  },
  {
    title: "How we use your data",
    content:
      "Your data is used for three things: generating roast reports, creating shareable links so you can send your roast to others, and improving our analysis accuracy over time. That's it. The goblin is too busy roasting websites to build advertising profiles.",
  },
  {
    title: "Data retention",
    content:
      "Roast reports are stored so shareable links keep working. Private reports are not indexed by search engines. You can request deletion of any report by contacting us.",
  },
  {
    title: "Extension permissions",
    content:
      "The Chrome extension requests three permissions: activeTab (temporary access only after you click), scripting (reads the DOM after your explicit action), and storage (saves your local preferences). There is no background monitoring. There is no auto-scanning. The extension does nothing until you tell it to.",
  },
  {
    title: "Third parties",
    content:
      "We do not sell your data. Ever. If you enable AI-powered features, page signals may be sent to the configured AI provider — this is clearly disclosed in the interface when those features are active.",
  },
  {
    title: "Your choices",
    content:
      "Don't share your roast link if you don't want others to see it. Contact us at the email below to delete any report. The goblin respects your autonomy.",
  },
  {
    title: "Contact",
    content:
      "Questions about this policy? Reach out at info@codezela.com. The goblin will respond. Eventually.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center bg-grain">
        <section className="w-full px-6 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
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
                The goblin respects your privacy. Mostly because it&apos;s too
                busy roasting websites to snoop.
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
