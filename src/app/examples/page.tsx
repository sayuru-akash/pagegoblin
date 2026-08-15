import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Website Roasts PageGoblin Dragged Out",
  description:
    "See PageGoblin tear into muddy headlines, hidden buttons, thin proof, and pages that make people guess.",
  alternates: { canonical: "/examples" },
  openGraph: {
    title: "PageGoblin Website Roast Examples",
    description:
      "Real examples of the goblin finding the mess, howling about it, and showing the way out.",
    url: "/examples",
  },
};


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
    crime: "The hero fed me fog",
    complaints: ["The first lines could fit any product", "The main button is hiding below the first screen", "I sniffed for customer proof and found dust"],
    verdict: "I crawled through the hero twice and still found no trail. Tell me what you sell before I chew through the menu.",
  },
  {
    domain: "enterprise-buzzword.io",
    score: 15,
    crime: "Big words with no meat",
    complaints: ["Every section feeds me another empty claim", "The price is locked behind a call", "The brand has no face, name, or story"],
    verdict: "I bit every big word on this page. Not one of them told me what you sell. Feed me facts.",
  },
  {
    domain: "local-restaurant.com",
    score: 52,
    crime: "The menu ran away",
    complaints: ["I cannot find the food menu", "The opening hours are missing", "There is no clear phone number or contact link"],
    verdict: "You showed me a restaurant and hid the food. Put the menu, hours, and phone number where my nose can find them.",
  },
  {
    domain: "portfolio-with-no-cta.com",
    score: 38,
    crime: "Pretty cave, no way forward",
    complaints: ["The pictures are strong but the path stops", "I cannot find a contact form or email", "The page never asks the visitor to do anything"],
    verdict: "I stared at the pretty work, then hit a wall. Give me one clear way to hire you before I wander back into the woods.",
  },
];

function getScoreBadgeVariant(score: number): "goblin" | "warning" | "danger" {
  if (score >= 80) return "goblin";
  if (score >= 50) return "warning";
  return "danger";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Hard to bite";
  if (score >= 50) return "Still chewing";
  return "A proper mess";
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
                See what I <span className="text-rose">dragged out</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                I crawled into these pages and came back with teeth full of bad copy.
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
                            First thing I bit
                          </p>
                          <p className="mt-1 font-display text-lg font-bold text-ink">
                            {roast.crime}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="font-mono text-xs uppercase tracking-widest text-muted">
                          What made me howl
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
                          My final growl
                        </p>
                        <p className="mt-1 text-sm font-medium italic text-ink">
                          &ldquo;{roast.verdict}&rdquo;
                        </p>
                      </div>

                      <Link
                        href="/analyze"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-goblin transition-colors hover:text-goblin-dark"
                      >
                        Open the whole mess
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
                eyebrow="I do more than scream"
                title="Here is the way out"
                description="I show you the muddy words, then give you a cleaner line to use."
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
                          My score went up +{fix.score}
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
                Want me crawling through your page?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-lg text-muted">
                Throw me the URL. I will bring back every loose bone.
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
