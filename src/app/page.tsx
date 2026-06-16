import Link from "next/link";
import { ArrowRight, Shield, Crosshair, FileWarning, Users } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScoreOrb } from "@/components/ui/score-orb";
import { GoblinMascot } from "@/components/brand/goblin-mascot";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const judgeCards = [
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
    title: "Buyer Confusion Level",
    description:
      "If visitors cannot figure out what you do in 5 seconds, the goblin will not sugarcoat it.",
  },
];

const sampleFixes = [
  {
    before: '"We leverage synergistic solutions"',
    after: '"We fix your broken checkout in 48 hours"',
    score: 12,
  },
  {
    before: "CTA button says Submit",
    after: 'CTA button says "Get my free audit"',
    score: 34,
  },
  {
    before: "No testimonials visible",
    after: "3 testimonials above the fold",
    score: 58,
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center bg-grain">
        {/* Hero */}
        <section className="flex w-full flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Badge variant="goblin" className="mb-6">
                Tiny goblin. Big conversion judgement.
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
                The tiny goblin that
                <br />
                <span className="text-goblin">judges your website.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                PageGoblin roasts trust, clarity, CTAs, copy, and conversion
                confidence before your buyers silently leave.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/analyze"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-goblin px-8 text-sm font-semibold text-ink shadow-goblin transition-all hover:bg-goblin-dark hover:shadow-lg"
                >
                  Roast a page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-bone px-8 text-sm font-semibold text-ink transition-colors hover:bg-parchment"
                >
                  Install Chrome extension
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-16 flex items-center justify-center gap-10">
                <GoblinMascot />
                <ScoreOrb score={73} size="lg" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* What the goblin judges */}
        <section id="how-it-works" className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Inspection criteria"
                title="What the goblin judges"
                description="Every visit leaves no stone unturned. Here is what gets roasted."
              />
            </Reveal>

            <Stagger className="mt-16 grid gap-6 sm:grid-cols-2" staggerDelay={0.1}>
              {judgeCards.map((card) => (
                <StaggerItem key={card.title}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-goblin/15 text-goblin">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Comparison strip */}
        <section id="examples" className="w-full px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Not another audit tool"
                title="A roast, not a boring audit"
                description="Other tools give you a 47-page PDF you will never read. PageGoblin tells you what is broken and how to fix it, in plain language."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                <Card className="border-rose/20 bg-rose/5">
                  <CardHeader>
                    <Badge variant="danger" className="w-fit">Boring audit</Badge>
                    <CardDescription className="mt-3">
                      &ldquo;Your LCP metric is suboptimal across viewport breakpoints
                      affecting Core Web Vitals performance thresholds.&rdquo;
                    </CardDescription>
                  </CardHeader>
                </Card>
                <div className="hidden items-center justify-center sm:flex">
                  <span className="font-display text-2xl font-bold text-muted">vs</span>
                </div>
                <Card className="border-goblin/20 bg-goblin/5">
                  <CardHeader>
                    <Badge variant="goblin" className="w-fit">PageGoblin roast</Badge>
                    <CardDescription className="mt-3">
                      &ldquo;Your hero image is 4MB. That is not a hero, that is a hostage
                      situation. Compress it or watch visitors bounce.&rdquo;
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Actually useful fixes */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Real fixes"
                title="Actually useful fixes"
                description="No vague suggestions. The goblin gives you concrete before-and-after fixes."
              />
            </Reveal>

            <Stagger className="mt-12 space-y-6" staggerDelay={0.15}>
              {sampleFixes.map((fix, i) => (
                <StaggerItem key={i}>
                  <Card>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-rose line-through">{fix.before}</p>
                        <p className="text-sm font-medium text-goblin-dark">{fix.after}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted">
                          Score improved by +{fix.score}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted" />
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Audience */}
        <section className="w-full px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <SectionHeading
                title="Built for founders, marketers, agencies, indie hackers"
                description="Whether you are shipping a side project or managing 50 client sites, PageGoblin gives you the conversion confidence check you actually need."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {["Founders", "Marketers", "Agencies", "Indie hackers", "Freelancers", "Growth teams"].map(
                  (role) => (
                    <Badge key={role} variant="default">
                      {role}
                    </Badge>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12">
                <Link
                  href="/analyze"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cave px-8 text-sm font-semibold text-parchment transition-colors hover:bg-cave/90"
                >
                  Try PageGoblin free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
