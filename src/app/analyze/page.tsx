import type { Metadata } from "next";
import { Shield, Crosshair, FileWarning, Users } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GoblinMascot } from "@/components/brand/goblin-mascot";
import { UrlRoastForm } from "@/components/roast/url-roast-form";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getAppSettings } from "@/lib/admin/service";

export const metadata: Metadata = {
  title: "Analyze a Website — Free Landing Page Roast",
  description:
    "Paste any public URL and get a PageGoblin website roast covering trust signals, CTA clarity, copy quality, buyer confusion, and conversion friction.",
  alternates: { canonical: "/analyze" },
  openGraph: {
    title: "Analyze a Website with PageGoblin",
    description:
      "Get a fast, practical landing page roast with a Goblin Score, biggest crime, complaints, and useful fixes.",
    url: "/analyze",
  },
};


const criteria = [
  {
    icon: Shield,
    title: "Trust signals",
    description: "Testimonials, social proof, credibility markers.",
  },
  {
    icon: Crosshair,
    title: "CTA clarity",
    description: "Is your call-to-action visible and compelling?",
  },
  {
    icon: FileWarning,
    title: "Copy quality",
    description: "Jargon, fluff, filler words — all get flagged.",
  },
  {
    icon: Users,
    title: "Visitor confusion",
    description: "Can someone understand your page in 5 seconds?",
  },
];

export default async function AnalyzePage() {
  const settings = await getAppSettings();
  const aiAvailable = settings.aiModeEnabled === true;

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center bg-grain">
        <section className="flex w-full flex-col items-center px-6 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <GoblinMascot className="mx-auto mb-8" />
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Feed the goblin a URL
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted">
                Paste any public webpage URL. The goblin will tear it apart in
                seconds.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <UrlRoastForm variant="standalone" className="mt-10 mx-auto" aiAvailable={aiAvailable} />
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 text-xs text-muted">
                No signup needed • Results in seconds • Private by default
              </p>
            </Reveal>
          </div>
        </section>

        <section className="w-full border-t border-border bg-bone/40 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-center font-display text-2xl font-bold text-ink">
                What the goblin checks
              </h2>
            </Reveal>

            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
              {criteria.map((item) => (
                <StaggerItem key={item.title} className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-goblin/15 text-goblin">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
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
