import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Mail } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InnerHero, SectionIntro } from "@/components/layout/inner-page";
import { FinalRoastCta } from "@/components/layout/final-roast-cta";
import { createPageMetadata } from "@/lib/seo";
import styles from "@/styles/public-pages.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Help From the PageGoblin Cave",
  description: "Get help with PageGoblin roasts, report sharing, the Chrome extension, privacy, and bugs.",
  path: "/support",
  openGraphTitle: "PageGoblin Support",
  keywords: ["PageGoblin support", "website roast help", "PageGoblin extension help"],
});

const faqs = [
  { q: "My roast broke", a: "Try the URL again. Logins and crawler blocks can keep me out." },
  { q: "I disagree with the score", a: "Good. Check the page clues under each bite and keep what helps." },
  { q: "Can you reach a staging site?", a: "Only when it is open on the public web." },
  { q: "How do I share a roast?", a: "Copy the link from the report." },
];

const bugClues = [
  "The page URL",
  "What you expected",
  "What happened",
  "Your browser and device",
];

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <main className={`${styles.page} bg-grain`}>
        <InnerHero
          variant="center"
          label="Support"
          title={<>Need help? <span>Howl here.</span></>}
          description="Try the quick answers. If the cave still shakes, call a human."
        />

        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.supportGrid}>
              <div className={styles.contact}>
                <h2>Rattle the door</h2>
                <div className={styles.contactStack}>
                  <Link className={styles.contactLink} href="mailto:info@codezela.com">
                    <Mail aria-hidden="true" />
                    <span><strong>Email</strong>info@codezela.com</span>
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                  <Link className={styles.contactLink} href="https://github.com/sayuru-akash/pagegoblin/issues" target="_blank" rel="noopener noreferrer">
                    <Code2 aria-hidden="true" />
                    <span><strong>Report a bug</strong>Open a GitHub issue</span>
                    <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </div>

              <div className={styles.checklist}>
                <h2>Bring four clues</h2>
                <ul>
                  {bugClues.map((clue) => <li key={clue}>{clue}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionMuted}>
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
