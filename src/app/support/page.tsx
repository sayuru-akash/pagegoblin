import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Code2, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Help From the PageGoblin Cave",
  description:
    "Get help with PageGoblin website roasts, report sharing, Chrome extension behavior, privacy questions, and support requests.",
  path: "/support",
  openGraphTitle: "PageGoblin Support",
  keywords: ["PageGoblin support", "website roast help", "PageGoblin extension help"],
});


const quickFaqs = [
  {
    q: "My roast ran away or broke",
    a: "Throw the URL at me again. If I still cannot get in, the page may sit behind a login or block crawlers like me.",
  },
  {
    q: "You bit my page too hard. I disagree.",
    a: "Good. Growl back. Then check the proof under each bite. The score is only a signpost, but the page clues and fixes should still make sense.",
  },
  {
    q: "Can I use PageGoblin on private staging sites?",
    a: "Only if I can reach them from the open web. Logins and VPN walls keep my claws out.",
  },
  {
    q: "How do I share my roast report?",
    a: "Every roast gets its own link. Copy it from the report and toss it to whoever needs to see the mess.",
  },
];

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <main className="cave-page flex flex-1 flex-col items-center bg-grain">
        {/* Hero */}
        <section className="flex w-full flex-col items-center px-6 pt-24 pb-20 text-center">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
                Something broke? <span className="text-goblin">Howl this way.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
                I have answers for the usual cave trouble. If I cannot fix it,
                a real human will crawl over.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Quick FAQ */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow="Sniff here first"
                title="The usual cave trouble"
              />
            </Reveal>

            <Stagger className="mt-12 space-y-4" staggerDelay={0.08}>
              {quickFaqs.map((faq) => (
                <StaggerItem key={faq.q}>
                  <Card>
                    <CardHeader className="mb-0">
                      <CardTitle className="text-base">{faq.q}</CardTitle>
                      <CardDescription className="text-sm">
                        {faq.a}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Contact */}
        <section className="w-full px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow="Still stuck?"
                title="Rattle the cave door"
                description="Found a bug, want a new trick, or need a real answer? Make some noise."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-goblin/15 text-goblin">
                      <Mail className="h-5 w-5" />
                    </div>
                    <CardTitle>Email</CardTitle>
                    <CardDescription>
                      Send questions, bug reports, and ideas here. A human reads them.
                    </CardDescription>
                    <Link
                      href="mailto:info@codezela.com"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-goblin transition-colors hover:text-goblin-dark"
                    >
                      info@codezela.com
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardHeader>
                </Card>
              </Reveal>

              <Reveal delay={0.15}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-goblin/15 text-goblin">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <CardTitle>GitHub</CardTitle>
                    <CardDescription>
                      Drop a bug into the issue pit, ask for a new trick, or see what is already loose.
                    </CardDescription>
                    <Link
                      href="https://github.com/sayuru-akash/pagegoblin/issues"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-goblin transition-colors hover:text-goblin-dark"
                    >
                      Open an issue
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardHeader>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Bug report guidance */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow="Bring useful tracks"
                title="Show us where it broke"
                description="Give us these four clues so we can find the bug before it crawls away."
              />
            </Reveal>

            <Stagger className="mt-12 space-y-4" staggerDelay={0.1}>
              {[
                "The URL you were trying to roast",
                "What you expected to happen",
                "What actually happened",
                "Your browser and device (if relevant)",
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <Card>
                    <div className="flex items-center gap-3 p-1">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-goblin/15 font-mono text-xs font-bold text-goblin">
                        {i + 1}
                      </span>
                      <p className="text-sm text-ink">{item}</p>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
