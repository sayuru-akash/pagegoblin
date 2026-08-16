import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  ExternalLink,
  Eye,
  HardDrive,
  MousePointerClick,
  Puzzle,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  CHROME_EXTENSION_URL,
  SITE_URL,
  createPageMetadata,
} from "@/lib/seo";
import styles from "./extension-page.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "PageGoblin Chrome Extension: Roast Any Website in One Click",
  description:
    "Add PageGoblin to Chrome and get a quick website roast on any public page. Check the words, buttons, proof, page flow, and next-step clarity without leaving the tab.",
  path: "/extension",
  openGraphTitle: "Put a Goblin in Your Browser",
  keywords: [
    "PageGoblin Chrome extension",
    "website roast extension",
    "Chrome website audit extension",
    "landing page feedback extension",
    "conversion audit Chrome extension",
    "CTA checker extension",
    "website critique tool",
  ],
});

const steps = [
  {
    number: "01",
    icon: Eye,
    title: "Open the page",
    copy: "Go to the page you want me to sniff through, yours or theirs.",
  },
  {
    number: "02",
    icon: MousePointerClick,
    title: "Click the goblin",
    copy: "Tap PageGoblin in your toolbar. I tear through the page right there.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Keep the fixes",
    copy: "Copy the quick take, or open the full roast when you want every bite.",
  },
];

const benefits = [
  "Can people tell what the page does before their eyes wander off?",
  "Is the next step loud enough, or is the button hiding in a hedge?",
  "Is there real proof, or only chest-beating and fog?",
  "Do the words say something useful, or could any company wear them?",
  "Does the page lead people forward without making them hunt?",
];

const privacyPoints = [
  {
    icon: MousePointerClick,
    title: "You wake me up",
    copy: "I get temporary access to the page only after you click the extension.",
  },
  {
    icon: Sparkles,
    title: "The quick roast stays put",
    copy: "The first score and roast are worked out inside your browser.",
  },
  {
    icon: HardDrive,
    title: "Recent roasts live on your device",
    copy: "Your small roast history and choices stay in local extension storage.",
  },
  {
    icon: Send,
    title: "Nothing leaves unless you ask",
    copy: "Page clues go to pagegoblin.org only when you choose Open Full Roast.",
  },
  {
    icon: ShieldCheck,
    title: "No creepy rummaging",
    copy: "I do not take passwords, form entries, cookies, login tokens, or browser storage from the page.",
  },
];

const screenshots = [
  {
    src: "/images/extension/extension-score.jpg",
    alt: "PageGoblin Chrome extension showing the quick goblin score for a website",
    label: "The quick score",
  },
  {
    src: "/images/extension/extension-complaints.jpg",
    alt: "PageGoblin Chrome extension showing the biggest page problem and complaints",
    label: "What made me howl",
  },
  {
    src: "/images/extension/extension-fixes.jpg",
    alt: "PageGoblin Chrome extension showing quick fixes and the full roast action",
    label: "The fixes to bite first",
  },
];

const faqs = [
  {
    question: "Does PageGoblin read every tab?",
    answer:
      "No. I only get temporary access to the page you are on after you click the extension. I do not watch your tabs in the background.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No account is needed for the quick roast. Click the goblin and I get to work.",
  },
  {
    question: "What gets sent to PageGoblin?",
    answer:
      "Nothing is sent for the quick roast. If you choose Open Full Roast, the extension sends the page signals needed to build that report to pagegoblin.org.",
  },
  {
    question: "Can I use it on any website?",
    answer:
      "You can run it on public pages you own or have permission to review. Login walls and browser-only pages can keep my claws out.",
  },
];

const extensionJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "PageGoblin Chrome Extension",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome",
      description:
        "A Chrome extension that gives public web pages a quick conversion-focused website roast.",
      url: `${SITE_URL}/extension`,
      installUrl: CHROME_EXTENSION_URL,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function ExtensionPage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <JsonLd data={extensionJsonLd} />

        <section className={styles.hero} aria-labelledby="extension-heading">
          <div className={styles.heroCopy}>
            <div className={styles.extensionTag}>
              <Puzzle aria-hidden="true" />
              Chrome extension
            </div>
            <h1 id="extension-heading">
              Put a goblin in <span>your browser.</span>
            </h1>
            <p className={styles.heroLead}>
              One click on any page. I sniff out weak words, shy buttons, thin
              proof, and the spots where visitors get lost.
            </p>
            <div className={styles.heroActions}>
              <a
                href={CHROME_EXTENSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                <FaChrome aria-hidden="true" />
                Add PageGoblin to Chrome
                <ExternalLink aria-hidden="true" />
              </a>
              <a href="#how-it-works" className={styles.textLink}>
                See what it bites
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <p className={styles.heroNote}>
              <Check aria-hidden="true" /> Free quick roast. No account needed.
            </p>
          </div>

          <div className={styles.heroVisual} aria-label="PageGoblin extension preview">
            <Image
              src="/images/extension/goblin-browser-hero.webp"
              alt="A PageGoblin waiting beside a browser window"
              width={1536}
              height={1024}
              sizes="(max-width: 900px) 100vw, 58vw"
              quality={75}
              priority
              className={styles.heroGoblin}
            />
            <div className={styles.popupPreview}>
              <Image
                src="/images/extension/extension-score.jpg"
                alt="The real PageGoblin Chrome extension quick score screen"
                width={1280}
                height={800}
                sizes="(max-width: 600px) 72vw, 390px"
                className={styles.popupImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.stepsSection} id="how-it-works" aria-labelledby="steps-heading">
          <div className={styles.sectionIntro}>
            <p>HOW THE LITTLE MENACE WORKS</p>
            <h2 id="steps-heading">One click. Full little rampage.</h2>
          </div>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.number}>
                <span className={styles.stepNumber}>{step.number}</span>
                <step.icon aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.screensSection} aria-labelledby="screens-heading">
          <div className={styles.sectionIntro}>
            <p>THE REAL THING</p>
            <h2 id="screens-heading">No pretty lie. This is what you get.</h2>
          </div>
          <div className={styles.screenshotRail}>
            {screenshots.map((shot) => (
              <figure key={shot.src} className={styles.screenshotCard}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1280}
                  height={800}
                  sizes="(max-width: 720px) 86vw, (max-width: 1100px) 44vw, 31vw"
                />
                <figcaption>{shot.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.benefitsSection} aria-labelledby="benefits-heading">
          <div className={styles.benefitsCopy}>
            <p className={styles.eyebrow}>WHAT MY NOSE FOLLOWS</p>
            <h2 id="benefits-heading">I check what visitors feel first.</h2>
            <p>
              Not a fifty-page fog report. I go after the bits that decide
              whether somebody stays, trusts you, and knows what to do next.
            </p>
          </div>
          <ul className={styles.benefitList}>
            {benefits.map((benefit, index) => (
              <li key={benefit}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.privacySection} aria-labelledby="privacy-heading">
          <div className={styles.sectionIntro}>
            <p>NO SNEAKING AROUND</p>
            <h2 id="privacy-heading">Small permissions. Sharp teeth.</h2>
            <div className={styles.privacyLead}>
              I bite the page you hand me. I do not lurk behind the curtains.
            </div>
          </div>
          <div className={styles.privacyGrid}>
            {privacyPoints.map((point) => (
              <article key={point.title}>
                <point.icon aria-hidden="true" />
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/privacy" className={styles.textLink}>
            Read the plain-English privacy policy
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.sectionIntro}>
            <p>BEFORE YOU LET ME IN</p>
            <h2 id="faq-heading">Questions from the cave door.</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.installBand} aria-labelledby="install-heading">
          <div>
            <p>THE GOBLIN IS HOUSE-TRAINED. MOSTLY.</p>
            <h2 id="install-heading">Give me a chair in your toolbar.</h2>
          </div>
          <div className={styles.installActions}>
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryButton}
            >
              <FaChrome aria-hidden="true" />
              Add to Chrome
              <ExternalLink aria-hidden="true" />
            </a>
            <Link href="/analyze" className={styles.secondaryButton}>
              Roast without the extension
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
