import Image from "next/image";
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
import { Anton, Cinzel } from "next/font/google";
import { HomeFooter } from "./home-footer";
import { HomeHeader } from "./home-header";
import { HomeRoastForm } from "./home-roast-form";
import styles from "./home-page.module.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-home-display",
});

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
    title: "Trust Tax",
    description:
      "I’m looking for real proof: customer names, honest quotes, and clear contact details. If I can’t find any, your visitors probably can’t either.",
  },
  {
    number: "02",
    icon: Crosshair,
    title: "CTA Corpse",
    description:
      "Your button should say what happens next. If it makes me stop and guess, it is hiding instead of helping.",
  },
  {
    number: "03",
    icon: FileWarning,
    title: "Fluff Damage",
    description:
      "Big words do not make a clear promise. I’ll point out the bits that sound fancy but say very little.",
  },
  {
    number: "04",
    icon: UsersRound,
    title: "Buyer Confusion",
    description:
      "Give me five seconds. If I still do not know what you sell or who it is for, your visitors are already wandering off.",
  },
];

const floatingScores = [
  {
    className: styles.scoreTrust,
    icon: ShieldCheck,
    label: "Trust Tax",
    score: "20/100",
    level: "Low",
    description: "Do people believe you?",
  },
  {
    className: styles.scoreFluff,
    icon: FileWarning,
    label: "Fluff Damage",
    score: "90/100",
    level: "High",
    description: "How much copy says nothing",
  },
  {
    className: styles.scoreConversion,
    icon: Zap,
    label: "Conversion",
    score: "20/100",
    level: "Medium",
    description: "Can people follow the page?",
  },
  {
    className: styles.scoreCta,
    icon: Crosshair,
    label: "CTA Corpse",
    score: "20/100",
    level: "Low",
    description: "Is the next step easy to spot?",
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
    title: "Give me the link",
    description: "Any public page will do. Paste it in and I’ll take a look.",
  },
  {
    number: "02",
    title: "I have a sniff around",
    description:
      "I check the words, proof, buttons, and the path your visitors are meant to follow.",
  },
  {
    number: "03",
    title: "You get the fixes",
    description:
      "I put the useful changes first, so you know exactly where to start.",
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
  return (
    <div className={`${styles.page} ${anton.variable} ${cinzel.variable}`}>
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

      <HomeHeader />

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="home-heading">
          <Image
            src="/images/home/hero-goblin.png"
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            quality={65}
            className={styles.heroImage}
          />
          <div className={styles.heroShade} aria-hidden="true" />

          <div className={styles.heroContent}>
            <h1 id="home-heading">
              Hand me your site.{" "}
              <span>
                I’ll <em>sniff out</em> trouble.
              </span>
            </h1>
            <p>Drop the link here. I’ll nose around and tell you what to fix first.</p>
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
            See what I sniff out
            <span aria-hidden="true">
              <ChevronDown />
            </span>
          </a>
        </section>

        <section id="execution-list" className={styles.executionSection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="What I sniff out"
              title="Four things I check"
              accent="every time"
              description="I’m checking whether people trust you, understand you, and know what to do next. That’s the whole game."
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
              eyebrow="No homework"
              title="A useful roast. That’s it."
              description="I’m not handing you a giant report full of charts. I’ll tell you what feels wrong, why it matters, and what I’d change first."
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
                <h3>What most tools say</h3>
                <p>
                  “Your page may benefit from improved clarity and performance
                  across several key areas.”
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
                <h3>What I’d say</h3>
                <p>
                  “This hero image is 4MB. Pretty, yes. Quick, no. Squash it
                  before your visitors get bored and wander off.”
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.fixesSection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="Let me show you"
              title="Small changes, clearer page"
              description="Nothing mysterious. I show you the muddy bit, then give you a cleaner version you can actually use."
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
              title="Made for people"
              accent="doing the work"
              description="One landing page or fifty client sites, it makes no difference to me. Give me a link and I’ll tell you where people are getting stuck."
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

        <section className={styles.finalCtaSection}>
          <div className={`${styles.container} ${styles.finalCta}`}>
            <SectionHeading
              title="Go on. Let me"
              accent="see the page."
              description="I’ll be honest with you. I’ll also tell you what to do next."
            />
            <HomeRoastForm />
            <Image
              src="/images/home/goblin-peek.png"
              alt=""
              width={408}
              height={408}
              sizes="220px"
              className={styles.finalGoblin}
            />
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}
