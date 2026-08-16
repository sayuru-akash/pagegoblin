import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InnerHero, SectionIntro } from "@/components/layout/inner-page";
import { FinalRoastCta } from "@/components/layout/final-roast-cta";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";
import styles from "@/styles/public-pages.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Website Roasts PageGoblin Dragged Out",
  description: "See PageGoblin tear into muddy headlines, hidden buttons, thin proof, and pages that make people guess.",
  path: "/examples",
  openGraphTitle: "PageGoblin Website Roast Examples",
  keywords: ["website roast examples", "landing page critique examples", "CTA copy examples", "website feedback examples"],
});

const roasts = [
  { domain: "vague-saas-startup.com", score: 23, crime: "The hero fed me fog", verdict: "Say what you sell." },
  { domain: "enterprise-buzzword.io", score: 15, crime: "Big words. No meat.", verdict: "Feed me facts." },
  { domain: "local-restaurant.com", score: 52, crime: "The menu ran away", verdict: "Show the food." },
  { domain: "portfolio-with-no-cta.com", score: 38, crime: "Pretty cave. Dead end.", verdict: "Give me one next step." },
];

const fixes = [
  { before: "We leverage synergistic solutions", after: "We fix your checkout in 48 hours" },
  { before: "Submit", after: "Get my free audit" },
  { before: "No proof in sight", after: "Put three customer quotes near the offer" },
];

export default function ExamplesPage() {
  return (
    <>
      <SiteHeader />
      <main className={`${styles.page} bg-grain`}>
        <InnerHero
          label="Examples"
          title={<>Real mess. <span>Real fixes.</span></>}
          description="A few pages that left teeth marks."
        />

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionIntro title="Fresh from the cave" />
            <Reveal delay={0.08}>
              <div className={styles.roastTable} role="table" aria-label="Sample website roasts">
                <div className={styles.roastHeader} role="row">
                  <span>Page</span><span>Score</span><span>First bite</span><span>Verdict</span>
                </div>
                {roasts.map((roast) => (
                  <div className={styles.roastRow} role="row" key={roast.domain}>
                    <strong>{roast.domain}</strong>
                    <span className={roast.score >= 40 ? styles.scoreMid : styles.scoreBad}>{roast.score}/100</span>
                    <span>{roast.crime}</span>
                    <span>{roast.verdict}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.sectionMuted}>
          <div className={styles.inner}>
            <SectionIntro label="Before and after" title="Less fog. More bite." />
            <Reveal delay={0.08}>
              <div className={styles.fixList}>
                {fixes.map((fix) => (
                  <div className={styles.fixRow} key={fix.before}>
                    <span className={styles.fixBefore}>{fix.before}</span>
                    <ArrowRight aria-hidden="true" className={styles.fixArrow} size={18} />
                    <span className={styles.fixAfter}>{fix.after}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <FinalRoastCta />
      </main>
      <SiteFooter />
    </>
  );
}
