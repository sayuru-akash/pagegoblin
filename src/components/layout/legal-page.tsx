import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InnerHero } from "@/components/layout/inner-page";
import { FinalRoastCta } from "@/components/layout/final-roast-cta";
import { Reveal } from "@/components/motion/reveal";
import styles from "@/styles/public-pages.module.css";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalPageProps {
  label: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function LegalPage({ label, title, description, updated, sections }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <main className={`${styles.page} bg-grain`}>
        <div className={styles.legalHero}>
          <InnerHero
            variant="compact"
            label={label}
            title={title}
            description={`${description} Last updated: ${updated}.`}
          />
        </div>

        <div className={styles.legalLayout}>
          <nav className={styles.toc} aria-label={`${title} sections`}>
            {sections.map((section, index) => (
              <a href={`#${sectionId(section.title)}`} key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{section.title}</span>
              </a>
            ))}
          </nav>

          <div className={styles.legalBody}>
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={Math.min(index * 0.035, 0.2)}>
                <section className={styles.legalSection} id={sectionId(section.title)}>
                  <h2>{String(index + 1).padStart(2, "0")}. {section.title}</h2>
                  <p>{section.content}</p>
                </section>
              </Reveal>
            ))}
          </div>
        </div>

        <FinalRoastCta />
      </main>
      <SiteFooter />
    </>
  );
}
