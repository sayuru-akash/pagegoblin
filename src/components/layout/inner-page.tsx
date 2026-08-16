import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import styles from "./inner-page.module.css";

interface InnerHeroProps {
  label: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "default" | "center" | "compact";
}

export function InnerHero({
  label,
  title,
  description,
  children,
  imageSrc,
  imageAlt = "",
  variant = "default",
}: InnerHeroProps) {
  return (
    <section className={`${styles.hero} ${styles[variant]}`}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <Reveal>
            <p className={styles.label}>{label}</p>
            <h1 className={styles.title}>{title}</h1>
          </Reveal>
          {description && (
            <Reveal delay={0.08}>
              <p className={styles.description}>{description}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.14}>{children}</Reveal>}
        </div>
        {imageSrc && (
          <Reveal delay={0.08} className={styles.heroArt}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
              className={styles.heroImage}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}

interface SectionIntroProps {
  label?: string;
  title: string;
  description?: string;
}

export function SectionIntro({ label, title, description }: SectionIntroProps) {
  return (
    <Reveal>
      <div className={styles.sectionIntro}>
        {label && <p className={styles.label}>{label}</p>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </Reveal>
  );
}

export { styles as innerPageStyles };
