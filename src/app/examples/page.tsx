import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScoreOrb } from "@/components/ui/score-orb";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

interface MockRoast {
  domain: string;
  score: number;
  crime: string;
  complaints: string[];
  verdict: string;
}

const mockRoasts: MockRoast[] = [
  {
    domain: "vague-saas-startup.com",
    score: 23,
    crime: "Hero section says nothing",
    complaints: ["Fluff copy that could apply to any product", "No visible CTA above the fold", "Zero social proof or trust signals"],
    verdict: "This page is a Rorschach test. Everyone sees something different. Nobody buys.",
  },
  {
    domain: "enterprise-buzzword.io",
    score: 15,
    crime: "Maximum syllables, minimum meaning",
    complaints: ["Buzzword soup throughout the entire page", "Pricing hidden behind a sales call", "No human face or team section"],
    verdict: "The goblin read this page three times and still doesn't know what you sell.",
  },
  {
    domain: "local-restaurant.com",
    score: 52,
    crime: "Missing the basics",
    complaints: ["No menu link anywhere on the page", "No business hours listed", "No phone number or contact info"],
    verdict: "A restaurant website without a menu is like a restaurant without food.",
  },
  {
    domain: "portfolio-with-no-cta.com",
    score: 38,
    crime: "Beautiful but purposeless",
    complaints: ["Stunning visuals but zero direction", "No contact form or email link", "No clear ask for the visitor"],
    verdict: "This portfolio is a museum exhibit. Admire it, then leave without hiring anyone.",
  },
];

function getScoreBadgeVariant(score: number): "goblin" | "warning" | "danger" {
  if (score >= 80) return "goblin";
  if (score >= 50) return "warning";
  return "danger";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Good";
  if (score >= 50) return "Needs work";
  return "Brutal";
}

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

export default function ExamplesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center bg-grain">
        {/* Hero */}
        <section className="flex w-full flex-col items-center px-6 pt-24 pb-20 text-center">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Roasts so good <span className="text-rose">they hurt</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Real examples of PageGoblin tearing apart common website mistakes.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Sample Roasts */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Stagger className="grid gap-8 sm:grid-cols-2" staggerDelay={0.12}>
              {mockRoasts.map((roast) => (
                <StaggerItem key={roast.domain}>
                  <Card className="flex h-full flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-muted">
                          {roast.domain}
                        </span>
                        <Badge variant={getScoreBadgeVariant(roast.score)}>
                          {getScoreLabel(roast.score)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col gap-6">
                      <div className="flex items-center gap-6">
                        <ScoreOrb score={roast.score} size="sm" />
                        <div className="flex-1">
                          <p className="font-mono text-xs uppercase tracking-widest text-muted">
                            Biggest crime
                          </p>
                          <p className="mt-1 font-display text-lg font-bold text-ink">
                            {roast.crime}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="font-mono text-xs uppercase tracking-widest text-muted">
                          Goblin complaints
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {roast.complaints.map((c, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted"
                            >
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto border-t border-border pt-4">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted">
                          The verdict
                        </p>
                        <p className="mt-1 text-sm font-medium italic text-ink">
                          &ldquo;{roast.verdict}&rdquo;
                        </p>
                      </div>

                      <Link
                        href="/analyze"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-goblin transition-colors hover:text-goblin-dark"
                      >
                        View full roast
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Before/After */}
        <section className="w-full px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <SectionHeading
                eyebrow="Real fixes"
                title="Before and after the goblin"
                description="No vague suggestions. The goblin gives you concrete before-and-after fixes."
              />
            </Reveal>

            <Stagger className="mt-12 space-y-6" staggerDelay={0.15}>
              {sampleFixes.map((fix, i) => (
                <StaggerItem key={i}>
                  <Card>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-rose line-through">
                          {fix.before}
                        </p>
                        <p className="text-sm font-medium text-goblin-dark">
                          {fix.after}
                        </p>
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

        {/* CTA */}
        <section className="w-full border-t border-border bg-bone/40 px-6 py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Want to see your page here?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-lg text-muted">
                Feed the goblin a URL and find out how your page stacks up.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/analyze"
                className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-goblin px-8 text-sm font-semibold text-white shadow-goblin transition-colors hover:bg-goblin-dark"
              >
                Roast my page
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
