import type { Metadata } from "next";
import {
  Link as LinkIcon,
  Search,
  FileCheck,
  Shield,
  Crosshair,
  FileWarning,
  Users,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { UrlRoastForm } from "@/components/roast/url-roast-form";
import { CATEGORY_COPY } from "@/lib/analysis/category-copy";

export const metadata: Metadata = {
  title: "How PageGoblin Hunts Through a Website",
  description:
    "See how PageGoblin crawls through a website, sniffs out weak words and hidden buttons, and brings back fixes you can use.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How PageGoblin Works",
    description:
      "See what the goblin checks, what the score means, and what comes back in a website roast.",
    url: "/how-it-works",
  },
};


const steps = [
  {
    number: "01",
    icon: LinkIcon,
    title: "Throw me a URL",
    description:
      "Give me any public page. I grab the link, crawl inside, and start sniffing under every heading and button.",
  },
  {
    number: "02",
    icon: Search,
    title: "I tear through the page",
    description:
      "I hunt for proof, clear words, useful buttons, and every muddy bit that makes people stop. Nothing gets to hide in the roots.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "I drag back the fixes",
    description:
      "You get my score, what made me howl, and the fixes I would make first. No giant report. No fog. Just the mess and the way out.",
  },
];

const categories = [
  {
    icon: Shield,
    title: CATEGORY_COPY.trustTax.label,
    description: CATEGORY_COPY.trustTax.description,
  },
  {
    icon: Crosshair,
    title: CATEGORY_COPY.ctaCorpse.label,
    description: CATEGORY_COPY.ctaCorpse.description,
  },
  {
    icon: FileWarning,
    title: CATEGORY_COPY.fluffDamage.label,
    description: CATEGORY_COPY.fluffDamage.description,
  },
  {
    icon: Users,
    title: CATEGORY_COPY.buyerConfusionLevel.label,
    description: CATEGORY_COPY.buyerConfusionLevel.description,
  },
  {
    icon: Zap,
    title: CATEGORY_COPY.conversionFriction.label,
    description: CATEGORY_COPY.conversionFriction.description,
  },
];

const faqs = [
  {
    q: "Is PageGoblin free?",
    a: "Yes. Keep throwing me pages. I stay hungry.",
  },
  {
    q: "Does the goblin store my page data?",
    a: "I keep only the page clues needed for the report. I do not keep the full page HTML.",
  },
  {
    q: "Can I share my roast?",
    a: "Yes. Every roast gets a link you can copy and send.",
  },
  {
    q: "Will the goblin roast my competitors?",
    a: "Yes. I do not care whose page it is. Bad buttons all smell the same.",
  },
  {
    q: "Is this an SEO tool?",
    a: "Not really. I care most about clear words, real proof, and whether people know what to do next.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center bg-grain">
        {/* Hero */}
        <section className="flex w-full flex-col items-center px-6 pt-24 pb-20 text-center">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                How I hunt through your <span className="text-goblin">page</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                You throw me the link. I crawl in. The page starts screaming.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Steps */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Stagger className="space-y-8" staggerDelay={0.15}>
              {steps.map((step) => (
                <StaggerItem key={step.number}>
                  <Card className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                      <span className="font-mono text-4xl font-bold text-goblin/30">
                        {step.number}
                      </span>
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-goblin/15 text-goblin">
                        <step.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {step.description}
                      </CardDescription>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* What gets roasted */}
        <section className="w-full px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Where I dig"
                title="Nothing gets to hide"
                description="These are the five trails I follow through every page."
              />
            </Reveal>

            <Stagger
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.1}
            >
              {categories.map((cat) => (
                <StaggerItem key={cat.title}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-goblin/15 text-goblin">
                        <cat.icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{cat.title}</CardTitle>
                      <CardDescription>{cat.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Extension vs Web */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Two holes into the cave"
                title="Browser button or full website"
                description="Pick where you want to let me loose. I bite the same either way."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                <Card className="border-goblin/20 bg-goblin/5">
                  <CardHeader>
                    <Badge variant="goblin" className="w-fit">
                      Chrome Extension
                    </Badge>
                    <CardTitle className="mt-3">Let me loose on this tab</CardTitle>
                    <CardDescription className="text-base">
                      One click and I crawl through the page you have open. You get
                      the score and the first fixes fast.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-amber/20 bg-amber/5">
                  <CardHeader>
                    <Badge variant="warning" className="w-fit">
                      Web App
                    </Badge>
                    <CardTitle className="mt-3">Drag back the full report</CardTitle>
                    <CardDescription className="text-base">
                      Paste any public URL and get the whole pile: every howl,
                      every fix, a share link, and a file you can keep.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow="You have questions"
                title="I have answers. Probably."
              />
            </Reveal>

            <Stagger className="mt-12 space-y-4" staggerDelay={0.08}>
              {faqs.map((faq) => (
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

        {/* CTA */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Ready to let the beast loose?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-lg text-muted">
                Throw me the link. I already smell a weak button.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <UrlRoastForm variant="hero" className="mt-10" />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
