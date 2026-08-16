import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Crosshair, FileWarning, Globe2, MonitorUp, Shield, Users, Zap } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InnerHero, SectionIntro } from "@/components/layout/inner-page";
import { FinalRoastCta } from "@/components/layout/final-roast-cta";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { CATEGORY_COPY } from "@/lib/analysis/category-copy";
import { createPageMetadata } from "@/lib/seo";
import styles from "@/styles/public-pages.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "How PageGoblin Hunts Through a Website",
  description: "See how PageGoblin hunts weak words, hidden buttons, thin proof, and friction, then brings back useful fixes.",
  path: "/how-it-works",
  openGraphTitle: "How PageGoblin Works",
  keywords: ["how website audits work", "website roast score", "CTA analysis", "website trust signals", "conversion friction"],
});

const steps = [
  { number: "01", title: "Throw the link", text: "Give me any public page." },
  { number: "02", title: "I hunt", text: "I sniff out weak words, proof, buttons, and friction." },
  { number: "03", title: "You fix it", text: "Take the score, the bites, and the first repairs." },
];

const trails = [
  { icon: Shield, label: CATEGORY_COPY.trustTax.label },
  { icon: Crosshair, label: CATEGORY_COPY.ctaCorpse.label },
  { icon: FileWarning, label: CATEGORY_COPY.fluffDamage.label },
  { icon: Users, label: CATEGORY_COPY.buyerConfusionLevel.label },
  { icon: Zap, label: CATEGORY_COPY.conversionFriction.label },
];

const faqs = [
  { q: "Is it free?", a: "Yes. Keep throwing me pages." },
  { q: "Do you keep the whole page?", a: "No. I keep only the clues needed for the report." },
  { q: "Can I share the roast?", a: "Yes. Every roast gets a link." },
  { q: "Can I roast a competitor?", a: "If the page is public, I can reach it." },
  { q: "Is this an SEO tool?", a: "No. I care about clear words, real proof, and the next click." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className={`${styles.page} bg-grain`}>
        <JsonLd data={faqJsonLd} />
        <InnerHero
          variant="center"
          label="How it works"
          title={<>Three steps. <span>Zero mercy.</span></>}
          description="You throw the link. I crawl in. The page starts talking."
        />

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionIntro title="The whole hunt" />
            <Reveal delay={0.08}>
              <div className={styles.steps}>
                {steps.map((step) => (
                  <article className={styles.step} key={step.number}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className={styles.trail} aria-label="The five things PageGoblin checks">
                {trails.map((trail) => (
                  <div className={styles.trailItem} key={trail.label}>
                    <trail.icon aria-hidden="true" />
                    <span>{trail.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.sectionMuted}>
          <div className={styles.inner}>
            <SectionIntro label="Pick your door" title="Tab or full report" />
            <div className={styles.choiceGrid}>
              <article className={styles.choice}>
                <MonitorUp aria-hidden="true" className="mb-6 text-goblin-light" />
                <h3>Chrome extension</h3>
                <p>Roast the tab you already have open.</p>
                <Link href="/extension">Get the extension <ArrowRight size={16} /></Link>
              </article>
              <article className={styles.choice}>
                <Globe2 aria-hidden="true" className="mb-6 text-goblin-light" />
                <h3>Website</h3>
                <p>Paste a URL and keep the full report.</p>
                <Link href="/analyze">Roast a page <ArrowRight size={16} /></Link>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.narrow}>
            <SectionIntro title="Quick answers" />
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details className={styles.faq} key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FinalRoastCta />
      </main>
      <SiteFooter />
    </>
  );
}
