import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Code2, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

export const metadata: Metadata = {
  title: "Support — PageGoblin Help",
  description:
    "Get help with PageGoblin website roasts, report sharing, Chrome extension behavior, privacy questions, and support requests.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "PageGoblin Support",
    description: "Help and support for PageGoblin website roast reports and the Chrome extension.",
    url: "/support",
  },
};


const quickFaqs = [
  {
    q: "My roast report is missing or broken",
    a: "Try submitting the URL again. If the issue persists, the page might be behind authentication or blocking automated access.",
  },
  {
    q: "The goblin gave my page a low score but I disagree",
    a: "The goblin doesn't negotiate. But seriously — check the specific complaints. Even if the score feels harsh, the individual fixes are usually valid.",
  },
  {
    q: "Can I use PageGoblin on private staging sites?",
    a: "Only public URLs work. The goblin can't access pages behind login walls or VPNs.",
  },
  {
    q: "How do I share my roast report?",
    a: "Every roast gets a unique shareable link. Copy it from the report page and send it to whoever needs to see it.",
  },
];

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center bg-grain">
        {/* Hero */}
        <section className="flex w-full flex-col items-center px-6 pt-24 pb-20 text-center">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Need help? The goblin{" "}
                <span className="text-goblin">listens.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Common questions, quick answers. If the goblin can&apos;t help,
                a human will.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Quick FAQ */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow="Quick answers"
                title="Common questions"
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
                eyebrow="Get in touch"
                title="Contact the goblin"
                description="Found a bug? Have a feature request? Just want to say hi?"
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
                      For general questions, bug reports, and feature requests.
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
                      Report bugs, request features, or browse open issues.
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
                eyebrow="Reporting bugs"
                title="Help the goblin help you"
                description="When reporting a bug, include these details for the fastest resolution."
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
