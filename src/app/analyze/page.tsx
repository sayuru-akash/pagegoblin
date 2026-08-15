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
import { CATEGORY_COPY } from "@/lib/analysis/category-copy";

export const metadata: Metadata = {
  title: "Throw Me a Website and Let Me Loose",
  description:
    "Give PageGoblin a public URL and get a wild, useful roast of the words, proof, buttons, and hard-to-use parts.",
  alternates: { canonical: "/analyze" },
  openGraph: {
    title: "Let PageGoblin Tear Into Your Website",
    description:
      "Throw in a URL. PageGoblin will sniff out what is broken and tell you how to fix it.",
    url: "/analyze",
  },
};


const criteria = [
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
];

export default async function AnalyzePage() {
  const settings = await getAppSettings();
  const aiAvailable = settings.aiModeEnabled === true;

  return (
    <>
      <SiteHeader />
      <main className="cave-page flex flex-1 flex-col items-center bg-grain">
        <section className="flex w-full flex-col items-center px-6 pt-24 pb-16 text-center">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <GoblinMascot className="mx-auto mb-8" />
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl">
                Throw me a <span className="text-goblin-dark">URL.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted">
                Give me any public page. I&apos;ll crawl inside, sniff out the weak
                bits, and drag the fixes back to you.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <UrlRoastForm variant="standalone" className="mt-10 mx-auto" aiAvailable={aiAvailable} />
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 text-xs text-muted">
                No signup. No waiting. Your report stays private unless you share it.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="w-full border-t border-border bg-bone/40 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-center font-display text-2xl font-bold text-ink">
                What I sink my teeth into
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
