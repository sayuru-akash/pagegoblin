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

const steps = [
  {
    number: "01",
    icon: LinkIcon,
    title: "Feed the goblin a URL",
    description:
      "Paste any public webpage URL. The goblin grabs the page and starts sniffing around for problems.",
  },
  {
    number: "02",
    icon: Search,
    title: "The goblin inspects everything",
    description:
      "Trust signals, CTA clarity, copy quality, conversion friction. The goblin checks what buyers actually care about — and roasts what's broken.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Get your roast report",
    description:
      "A full teardown with a Goblin Score, the Biggest Crime, specific complaints, and actually useful fixes. No 47-page PDF. No vague suggestions.",
  },
];

const categories = [
  {
    icon: Shield,
    title: "Trust Tax",
    description:
      "Missing testimonials, weak social proof, zero credibility signals? The goblin sees through your facade.",
  },
  {
    icon: Crosshair,
    title: "CTA Corpse",
    description:
      "Your call-to-action is buried, vague, or dead on arrival. The goblin will tell you exactly where it flatlined.",
  },
  {
    icon: FileWarning,
    title: "Fluff Damage",
    description:
      "Jargon, filler words, saying nothing with maximum syllables. The goblin cuts through the noise with a rusty knife.",
  },
  {
    icon: Users,
    title: "Buyer Confusion",
    description:
      "If visitors cannot figure out what you do in 5 seconds, the goblin will not sugarcoat it.",
  },
  {
    icon: Zap,
    title: "Conversion Friction",
    description:
      "Slow loads, broken flows, dead ends. Every point of friction is a point of failure. The goblin finds them all.",
  },
];

const faqs = [
  {
    q: "Is PageGoblin free?",
    a: "Yes. Roast as many pages as you want.",
  },
  {
    q: "Does the goblin store my page data?",
    a: "Only the extracted signals needed for the report. Full HTML is never stored.",
  },
  {
    q: "Can I share my roast?",
    a: "Every roast gets a shareable link. Copy it, send it, tweet it.",
  },
  {
    q: "Will the goblin roast my competitors?",
    a: "The goblin doesn't play favorites. It roasts everyone equally.",
  },
  {
    q: "Is this an SEO tool?",
    a: "No. PageGoblin is a conversion and trust teardown, not an SEO checker.",
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
                How the goblin <span className="text-goblin">works</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Three steps from URL to brutal honesty.
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
                eyebrow="Inspection criteria"
                title="What gets roasted"
                description="Every page gets judged on these five categories. No exceptions."
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
                eyebrow="Two ways to roast"
                title="Extension vs Web App"
                description="Pick the workflow that fits. Same goblin, different entry points."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                <Card className="border-goblin/20 bg-goblin/5">
                  <CardHeader>
                    <Badge variant="goblin" className="w-fit">
                      Chrome Extension
                    </Badge>
                    <CardTitle className="mt-3">Instant roast</CardTitle>
                    <CardDescription className="text-base">
                      Instant roast of the active tab. Quick score, biggest crime,
                      top fixes. One click.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-amber/20 bg-amber/5">
                  <CardHeader>
                    <Badge variant="warning" className="w-fit">
                      Web App
                    </Badge>
                    <CardTitle className="mt-3">Full report</CardTitle>
                    <CardDescription className="text-base">
                      Full report with shareable link, downloadable markdown,
                      complete breakdown. Paste any URL.
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
                eyebrow="Questions"
                title="Frequently asked"
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
                Ready to get roasted?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-lg text-muted">
                Paste a URL and let the goblin do what it does best.
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
