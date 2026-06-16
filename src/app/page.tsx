import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Crosshair,
  FileWarning,
  Users,
  Zap,
  Scale,
  Skull,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { GoblinMascot } from "@/components/brand/goblin-mascot";
import { SampleReportCard } from "@/components/brand/sample-report-card";
import { UrlRoastForm } from "@/components/roast/url-roast-form";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ScrollIndicator } from "@/components/motion/scroll-indicator";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const judgeCards = [
  {
    icon: Shield,
    title: "Trust Tax",
    description:
      "Missing testimonials, weak social proof, zero credibility signals. Your page screams 'we might be a scam' and the goblin will absolutely say it to your face.",
  },
  {
    icon: Crosshair,
    title: "CTA Corpse",
    description:
      "Your call-to-action is buried, vague, or dead on arrival. The goblin will perform the autopsy and tell you exactly where it flatlined.",
  },
  {
    icon: FileWarning,
    title: "Fluff Damage",
    description:
      "Jargon, filler words, saying nothing with maximum syllables. The goblin cuts through your corporate nonsense with a rusty, blood-stained knife.",
  },
  {
    icon: Users,
    title: "Buyer Confusion",
    description:
      "If visitors cannot figure out what you do in five seconds, the goblin will not sugarcoat it. Clarity is not optional. It is survival.",
  },
];

const sampleFixes = [
  {
    before: '"We leverage synergistic solutions"',
    after: '"We fix your broken checkout in 48 hours"',
    score: 12,
  },
  {
    before: 'CTA button says "Submit"',
    after: 'CTA button says "Get my free audit"',
    score: 34,
  },
  {
    before: "No testimonials visible",
    after: "3 testimonials above the fold",
    score: 58,
  },
];

const audienceRoles = [
  "Founders",
  "Marketers",
  "Agencies",
  "Indie hackers",
  "Freelancers",
  "Growth teams",
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center overflow-hidden">
        {/* Hero */}
        <section className="relative flex w-full min-h-[92vh] flex-col items-center justify-center px-6 pt-20 pb-24 text-center overflow-hidden hero-gradient">
          {/* Aurora background */}
          <div className="hero-aurora hero-aurora-1" />
          <div className="hero-aurora hero-aurora-2" />
          <div className="hero-aurora hero-aurora-3" />

          {/* Floating embers */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="particle" />
            ))}
          </div>

          <div className="relative mx-auto max-w-5xl w-full">
            {/* Headline */}
            <div className="mb-8">
              <TextReveal
                text="Your site"
                className="justify-center font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
                delay={0.2}
                staggerDelay={0.05}
              />
              <TextReveal
                text="deserves a beating."
                className="justify-center font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
                wordClassName="text-gradient-goblin"
                delay={0.5}
                staggerDelay={0.08}
              />
            </div>

            {/* Subtitle */}
            <Reveal delay={0.8}>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Drop a URL. Watch the goblin drag your page behind the shed.
              </p>
            </Reveal>

            {/* Search */}
            <Reveal delay={1.0}>
              <div className="mt-10 flex flex-col items-center">
                <UrlRoastForm variant="hero" />
                <p className="mt-4 text-center text-xs text-muted/60">
                  No login. No mercy. The goblin bites and the bite is private.
                </p>
              </div>
            </Reveal>

            {/* Sample report — the real hero */}
            <Reveal delay={1.4}>
              <div className="mt-20 flex justify-center">
                <SampleReportCard />
              </div>
            </Reveal>
          </div>

          {/* Scroll indicator */}
          <Reveal delay={1.8}>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <ScrollIndicator />
            </div>
          </Reveal>
        </section>

        {/* What the goblin judges */}
        <section
          id="how-it-works"
          className="relative w-full border-t border-border bg-bone/30 px-6 py-28"
        >
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="The execution list"
                title="What gets roasted"
                description="Every page is judged against the four horsemen of conversion death. No fluff. No vanity metrics. Just what actually kills your revenue."
              />
            </Reveal>

            <Stagger
              className="mt-16 grid gap-6 sm:grid-cols-2"
              staggerDelay={0.1}
            >
              {judgeCards.map((card) => (
                <StaggerItem key={card.title}>
                  <Card className="group h-full cursor-default p-5 glow-border">
                    <CardHeader className="mb-0">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-goblin/10 text-goblin transition-all duration-300 group-hover:bg-goblin/15 group-hover:scale-110 group-hover:shadow-goblin">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                      <CardDescription className="mt-1.5 text-[13px] leading-relaxed">
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Comparison strip */}
        <section id="examples" className="relative w-full px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Not another audit tool"
                title="A roast, not a report"
                description="Other tools give you a 47-page PDF you will never read. PageGoblin tells you what is broken and how to fix it, in language that does not require a computer science degree."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-14 grid gap-6 sm:grid-cols-3 items-stretch">
                <Card className="border-rose/20 bg-rose/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Skull className="h-16 w-16 text-rose" />
                  </div>
                  <CardHeader>
                    <Badge variant="danger" className="w-fit">
                      Boring audit
                    </Badge>
                    <CardDescription className="mt-4 text-sm leading-relaxed">
                      &ldquo;Your LCP metric is suboptimal across viewport breakpoints affecting Core Web Vitals performance thresholds.&rdquo;
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <div className="hidden sm:flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-12 w-px bg-border" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-goblin/20 bg-goblin/5">
                      <Scale className="h-5 w-5 text-goblin" />
                    </div>
                    <div className="h-12 w-px bg-border" />
                  </div>
                </div>
                
                <Card className="border-goblin/20 bg-goblin/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Zap className="h-16 w-16 text-goblin" />
                  </div>
                  <CardHeader>
                    <Badge variant="goblin" className="w-fit">
                      PageGoblin roast
                    </Badge>
                    <CardDescription className="mt-4 text-sm leading-relaxed font-medium text-ink/80">
                      &ldquo;Your hero image is 4MB. That is not a hero, that is a hostage situation. Compress it or watch visitors bounce harder than a basketball.&rdquo;
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Actually useful fixes */}
        <section className="relative w-full border-t border-border bg-bone/30 px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Real fixes"
                title="Before and after the carnage"
                description="No vague suggestions. No 'consider improving user experience.' Concrete before-and-after fixes that actually move the needle."
              />
            </Reveal>

            <Stagger className="mt-14 space-y-5" staggerDelay={0.15}>
              {sampleFixes.map((fix, i) => (
                <StaggerItem key={i}>
                  <Card className="group glow-border">
                    <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-rose font-medium">The crime</span>
                          <div className="h-px flex-1 bg-rose/20" />
                        </div>
                        <p className="text-sm text-rose line-through opacity-70">
                          {fix.before}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-goblin-dark font-medium">The fix</span>
                          <div className="h-px flex-1 bg-goblin/20" />
                        </div>
                        <p className="text-sm font-medium text-goblin-dark">
                          {fix.after}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 sm:pl-6 sm:border-l border-border">
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-2xl font-bold text-goblin">
                            +{fix.score}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-muted">
                            Score improvement
                          </span>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-goblin/10 text-goblin transition-all duration-300 group-hover:bg-goblin/20 group-hover:scale-110">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Audience */}
        <section className="relative w-full px-6 py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <SectionHeading
                title="Built for the builders"
                description="Whether you are shipping a side project or managing fifty client sites, PageGoblin gives you the conversion confidence check you actually need. Not the one you want."
              />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                {audienceRoles.map((role) => (
                  <Badge
                    key={role}
                    variant="default"
                    className="px-4 py-2 text-xs font-medium transition-all duration-300 hover:bg-goblin/10 hover:border-goblin/30 hover:scale-105 cursor-default"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-14">
                <Link
                  href="/analyze"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-cave px-8 text-sm font-semibold text-parchment transition-all duration-300 hover:bg-cave-2 hover:shadow-lg"
                >
                  Face the judgment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative w-full border-t border-border bg-bone/30 px-6 py-24 overflow-hidden">
          {/* Soft ambient glow behind goblin */}
          <div className="hero-aurora hero-aurora-1 opacity-30" />

          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <div className="flex flex-col items-center gap-5">
                <div className="relative -my-4">
                  {/* Glow ring behind goblin */}
                  <div className="absolute inset-0 -m-12 rounded-full bg-goblin/15 blur-3xl animate-glow-pulse" />
                  <GoblinMascot className="relative" />
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl mt-2">
                  Ready for your funeral?
                </h2>
                <p className="text-muted max-w-md">
                  Your page is waiting. The judgment is instant. The ego death is free.
                </p>
                <Link
                  href="/analyze"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-cave px-8 text-sm font-semibold text-parchment shadow-goblin transition-all duration-300 hover:bg-cave-2 hover:shadow-glow"
                >
                  Feed the goblin
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
