import Image, { getImageProps } from "next/image";
import {
  ChevronDown,
  CircleGauge,
  Crosshair,
  FileWarning,
  Scale,
  ShieldCheck,
  UsersRound,
  Zap,
} from "lucide-react";
import { Cinzel } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalRoastCta } from "@/components/layout/final-roast-cta";
import { HomeRoastForm } from "./home-roast-form";
import { CATEGORY_COPY } from "@/lib/analysis/category-copy";
import styles from "./home-page.module.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-home-serif",
});

const roastCategories = [
  {
    number: "01",
    icon: ShieldCheck,
    title: CATEGORY_COPY.trustTax.label,
    description: CATEGORY_COPY.trustTax.description,
  },
  {
    number: "02",
    icon: Crosshair,
    title: CATEGORY_COPY.ctaCorpse.label,
    description: CATEGORY_COPY.ctaCorpse.description,
  },
  {
    number: "03",
    icon: FileWarning,
    title: CATEGORY_COPY.fluffDamage.label,
    description: CATEGORY_COPY.fluffDamage.description,
  },
  {
    number: "04",
    icon: UsersRound,
    title: CATEGORY_COPY.buyerConfusionLevel.label,
    description: CATEGORY_COPY.buyerConfusionLevel.description,
  },
];

const floatingScores = [
  {
    className: styles.scoreTrust,
    icon: ShieldCheck,
    label: "Where's the proof?",
    score: "20/100",
    level: "Low",
    description: "I need more real proof.",
  },
  {
    className: styles.scoreFluff,
    icon: FileWarning,
    label: "Do these words mean anything?",
    score: "90/100",
    level: "High",
    description: "Some lines say very little.",
  },
  {
    className: styles.scoreConversion,
    icon: Zap,
    label: "What are you selling?",
    score: "20/100",
    level: "Medium",
    description: "I am still piecing it together.",
  },
  {
    className: styles.scoreCta,
    icon: Crosshair,
    label: "What am I meant to click?",
    score: "20/100",
    level: "Low",
    description: "The main button is hard to spot.",
  },
];

const fixes = [
  {
    crime: '“We deliver synergistic solutions for modern teams”',
    fix: '“We fix your broken checkout in 48 hours”',
    score: "+12",
  },
  {
    crime: 'The button only says “Submit”',
    fix: '“Send me my free audit”',
    score: "+34",
  },
  {
    crime: "No customer proof near the top",
    fix: "Add three short customer quotes where people can see them",
    score: "+58",
  },
];

const audiences = [
  "Founders",
  "Marketers",
  "Agencies",
  "Indie hackers",
  "Freelancers",
  "Growth teams",
];

const steps = [
  {
    number: "01",
    title: "Throw me the link",
    description: "Any public page will do. Drop it in the cave and stand back.",
  },
  {
    number: "02",
    title: "I crawl inside",
    description:
      "I bite the words, sniff for proof, and drag every hiding button into the light.",
  },
  {
    number: "03",
    title: "I drag back the bones",
    description:
      "You get the loudest problems first and a clear fix for every bite mark.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`${styles.sectionHeading} ${
        align === "left" ? styles.sectionHeadingLeft : ""
      }`}
    >
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2>
        {title} {accent ? <span>{accent}</span> : null}
      </h2>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </div>
  );
}

export function HomePage() {
  const { props: desktopHeroProps } = getImageProps({
    src: "/images/home/hero-goblin-v2.webp",
    alt: "",
    width: 1672,
    height: 941,
    sizes: "100vw",
    quality: 75,
  });
  const { props: mobileHeroProps } = getImageProps({
    src: "/images/home/hero-goblin-mobile-v2.webp",
    alt: "",
    width: 1024,
    height: 1536,
    sizes: "100vw",
    quality: 75,
  });

  return (
    <>
      <SiteHeader />
      <div className={`${styles.page} ${cinzel.variable}`}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.pageTexture} aria-hidden="true">
        <Image
          src="/images/home/cave-texture.png"
          alt=""
          fill
          sizes="100vw"
          quality={58}
          className={styles.pageTextureImage}
        />
      </div>

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="home-heading">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={mobileHeroProps.srcSet}
              sizes="100vw"
            />
            <img
              {...desktopHeroProps}
              alt=""
              aria-hidden="true"
              decoding="async"
              fetchPriority="high"
              loading="eager"
              className={styles.heroImage}
            />
          </picture>
          <div className={styles.heroShade} aria-hidden="true" />

          <div className={styles.heroContent}>
            <h1 id="home-heading">
              Throw me your site.{" "}
              <span>
                I’ll <em>drag out</em> the rot.
              </span>
            </h1>
            <p>Drop the link here. I’ll crawl inside and come back with teeth full of bad copy.</p>
            <HomeRoastForm />
          </div>

          <div className={styles.floatingScores} aria-label="Example roast scores">
            {floatingScores.map((item) => (
              <article
                key={item.label}
                className={`${styles.scoreCard} ${item.className}`}
              >
                <div className={styles.scoreCardTopline}>
                  <item.icon aria-hidden="true" />
                  <h2>{item.label}</h2>
                  <span>{item.level}</span>
                </div>
                <p className={styles.scoreNumber}>{item.score}</p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <a className={styles.scrollCue} href="#execution-list">
            See where I bite first
            <span aria-hidden="true">
              <ChevronDown />
            </span>
          </a>
        </section>

        <section id="execution-list" className={styles.executionSection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="Where I sink my teeth"
              title="Nothing gets to"
              accent="hide"
              description="I sniff for proof, bite into the words, and hunt down the next step. If the page makes me guess, I howl."
            />

            <div className={styles.categoryGrid}>
              {roastCategories.map((category) => (
                <article key={category.title} className={styles.categoryCard}>
                  <span className={styles.categoryNumber}>{category.number}</span>
                  <category.icon aria-hidden="true" />
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </article>
              ))}
              <Image
                src="/images/home/goblin-curious.png"
                alt=""
                width={500}
                height={500}
                sizes="110px"
                className={styles.categoryGoblinTop}
              />
              <Image
                src="/images/home/goblin-seated.png"
                alt=""
                width={408}
                height={408}
                sizes="90px"
                className={styles.categoryGoblinBottom}
              />
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <div className={`${styles.container} ${styles.comparisonLayout}`}>
            <SectionHeading
              eyebrow="I came back with teeth marks"
              title="I do not"
              accent="whisper"
              description="I tell you what made me howl, why people may get stuck, and what you fix before I crawl back in."
              align="left"
            />

            <div className={styles.comparisonCards}>
              <article className={`${styles.comparisonCard} ${styles.boringCard}`}>
                <Image
                  src="/images/home/goblin-seated.png"
                  alt=""
                  width={408}
                  height={408}
                  sizes="90px"
                />
                <h3>What the polite little tools mumble</h3>
                <p>
                  “A few things could be better. Somewhere.”
                </p>
              </article>

              <div className={styles.balance} aria-hidden="true">
                <span />
                <span>
                  <Scale />
                </span>
                <span />
              </div>

              <article className={`${styles.comparisonCard} ${styles.goblinCard}`}>
                <Image
                  src="/images/home/goblin-celebrate.png"
                  alt=""
                  width={408}
                  height={408}
                  sizes="100px"
                />
                <h3>What I drag out of the cave</h3>
                <p>
                  “This hero image is 4MB. I could build a nest before it loads.
                  Crush the file size before your visitors crawl away.”
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.fixesSection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="I do more than scream"
              title="I show you the"
              accent="way out"
              description="First I drag out the bad bit. Then I give you a clean line you can use before the dust settles."
            />

            <div className={styles.fixesGrid}>
              {fixes.map((fix) => (
                <article key={fix.score} className={styles.fixCard}>
                  <div className={styles.fixCopy}>
                    <p className={styles.crimeLabel}>What I found</p>
                    <p>{fix.crime}</p>
                    <p className={styles.fixLabel}>Try this</p>
                    <p>{fix.fix}</p>
                  </div>
                  <div className={styles.fixScore}>
                    <strong>{fix.score}</strong>
                    <span>Score lift</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.buildersSection}>
          <div className={styles.container}>
            <SectionHeading
              title="One page or fifty"
              accent="I stay hungry"
              description="Founders, teams, freelancers, whole agencies. I do not care who owns the cave. Throw me the link and I bite."
            />

            <ul className={styles.audienceList} aria-label="Who PageGoblin is for">
              {audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>

            <div className={styles.stepsGrid}>
              {steps.map((step) => (
                <article key={step.number} className={styles.stepCard}>
                  <span>{step.number}</span>
                  <CircleGauge aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FinalRoastCta />
      </main>

      </div>
      <SiteFooter />
    </>
  );
}
