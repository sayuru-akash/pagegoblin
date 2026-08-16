import type { Metadata } from "next";
import { Crosshair, FileWarning, LockKeyhole, Shield, Users, Zap } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InnerHero, SectionIntro } from "@/components/layout/inner-page";
import { UrlRoastForm } from "@/components/roast/url-roast-form";
import { Reveal } from "@/components/motion/reveal";
import { getAppSettings } from "@/lib/admin/service";
import { CATEGORY_COPY } from "@/lib/analysis/category-copy";
import { createPageMetadata } from "@/lib/seo";
import styles from "@/styles/public-pages.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Throw Me a Website and Let Me Loose",
  description:
    "Give PageGoblin a public URL and get a wild, useful roast of the words, proof, buttons, and hard-to-use parts.",
  path: "/analyze",
  openGraphTitle: "Let PageGoblin Tear Into Your Website",
  keywords: ["analyze my website", "website roast tool", "website conversion audit", "landing page analyzer", "CTA checker"],
});

const criteria = [
  { icon: Shield, ...CATEGORY_COPY.trustTax },
  { icon: Crosshair, ...CATEGORY_COPY.ctaCorpse },
  { icon: FileWarning, ...CATEGORY_COPY.fluffDamage },
  { icon: Users, ...CATEGORY_COPY.buyerConfusionLevel },
  { icon: Zap, ...CATEGORY_COPY.conversionFriction },
];

export default async function AnalyzePage() {
  const settings = await getAppSettings();

  return (
    <>
      <SiteHeader />
      <main className={`${styles.page} bg-grain`}>
        <InnerHero
          label="Analyze"
          title={<>Drop a link. <span>Get eaten.</span></>}
          description="Paste a public page. I will drag every weak spot into the light."
          image
        >
          <div className={styles.heroForm}>
            <UrlRoastForm variant="standalone" aiAvailable={settings.aiModeEnabled === true} />
          </div>
          <p className={styles.privacyNote}>
            <LockKeyhole aria-hidden="true" size={14} />
            No signup. Reports stay unlisted unless you change them.
          </p>
        </InnerHero>

        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionIntro label="Five trails" title="What I hunt" />
            <Reveal delay={0.08}>
              <div className={styles.criteria}>
                {criteria.map((item) => (
                  <article className={styles.criterion} key={item.label}>
                    <item.icon aria-hidden="true" />
                    <h3>{item.label}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
