import Image from "next/image";
import {
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
  variable: "--font-home-serif",
});

const roastCategories = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Trust Tax",
    description:
      "Missing testimonials, weak social proof, zero credibility signals. Your page screams ‘we might be a scam’ and the goblin will absolutely say it to your face.",
  },
  {
    number: "02",
    icon: Crosshair,
    title: "CTA Corpse",
    description:
      "Your call-to-action is buried, vague, or dead on arrival. The goblin will perform the autopsy and tell you exactly where it flatlined.",
  },
  {
    number: "03",
    icon: FileWarning,
    title: "Fluff Damage",
    description:
      "Jargon. Filler. Words saying nothing with maximum syllables. The goblin cuts through your corporate nonsense with a rusty, blood-stained knife.",
  },
  {
    number: "04",
    icon: UsersRound,
    title: "Buyer Confusion",
    description:
      "If visitors cannot figure out what you do in five seconds, the goblin will not sugarcoat it. Clarity is not optional. It is survival.",
  },
];

const floatingScores = [
  {
    className: styles.scoreTrust,
    icon: ShieldCheck,
    label: "Trust Tax",
    score: "20/100",
    level: "Low",
    description: "How much trust the page loses",
  },
  {
    className: styles.scoreFluff,
    icon: FileWarning,
    label: "Fluff Damage",
    score: "90/100",
    level: "High",
    description: "Vague copy and buzzword damage",
  },
  {
    className: styles.scoreConversion,
    icon: Zap,
    label: "Conversion",
    score: "20/100",
    level: "Medium",
    description: "How much trust the page loses",
  },
  {
    className: styles.scoreCta,
    icon: Crosshair,
    label: "CTA Corpse",
    score: "20/100",
    level: "Low",
    description: "Weak or dead CTA problem",
  },
];

const fixes = [
  {
    crime: '“We leverage synergistic solutions”',
    fix: '“We fix your broken checkout in 48 hours”',
    score: "+12",
  },
  {
    crime: 'CTA button says “Submit”',
    fix: 'CTA button says “Get my free audit”',
    score: "+34",
  },
  {
    crime: "No testimonials visible",
    fix: "3 testimonials above the fold",
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
    title: "Drop a URL",
    description:
      "Paste any live webpage. No account required for your first audit.",
  },
  {
    number: "02",
    title: "Goblin audits it",
    description:
      "Scores every conversion-critical element against 40+ criteria in seconds.",
  },
  {
    number: "03",
    title: "Fix it or feel it",
    description:
      "Get a prioritised action list. Or ignore it and let your bounce rate prove us right.",
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
              Your site
              <span>
                <em>deserves</em> a beating.
              </span>
            </h1>
            <p>Drop a URL. Watch the goblin drag your page behind the shed.</p>
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
            See what the goblin will tear apart
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section id="execution-list" className={styles.executionSection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="The execution list"
              title="What gets"
              accent="roasted"
              description="Every page is judged against the four horsemen of conversion death. No fluff. No vanity metrics. Just what actually kills your revenue."
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
              eyebrow="Not another audit tool"
              title="A roast, not a report"
              description="Other tools give you a 47-page PDF you will never read. PageGoblin tells you what is broken and how to fix it, in language that does not require a computer science degree."
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
                <h3>Boring audit</h3>
                <p>
                  “Your LCP metric is suboptimal across viewport breakpoints
                  affecting Core Web Vitals performance thresholds.”
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
                <h3>PageGoblin roast</h3>
                <p>
                  “Your hero image is 4MB. That is not a hero, that is a hostage
                  situation. Compress it or watch visitors bounce harder than a
                  basketball.”
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.fixesSection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="Real fixes"
              title="Before and after the carnage"
              description="No vague suggestions. No ‘consider improving user experience.’ Concrete before-and-after fixes that actually move the needle."
            />

            <div className={styles.fixesGrid}>
              {fixes.map((fix) => (
                <article key={fix.score} className={styles.fixCard}>
                  <div className={styles.fixCopy}>
                    <p className={styles.crimeLabel}>The crime</p>
                    <p>{fix.crime}</p>
                    <p className={styles.fixLabel}>The fix</p>
                    <p>{fix.fix}</p>
                  </div>
                  <div className={styles.fixScore}>
                    <strong>{fix.score}</strong>
                    <span>Score improvement</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.buildersSection}>
          <div className={styles.container}>
            <SectionHeading
              title="Built for the"
              accent="builders"
              description="Whether you are shipping a side project or managing fifty client sites, PageGoblin gives you the conversion confidence check you actually need. Not the one you want."
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
              title="Ready for your"
              accent="ego funeral?"
              description="Your website has problems. The goblin will find all of them."
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
