import Image from "next/image";
import styles from "./cave-loader.module.css";

interface CaveLoaderProps {
  title: string;
  detail: string;
  compact?: boolean;
  showTracks?: boolean;
  showCreature?: boolean;
}

export function CaveLoader({
  title,
  detail,
  compact = false,
  showTracks = false,
  showCreature = true,
}: CaveLoaderProps) {
  return (
    <section
      className={`${styles.shell} ${compact ? styles.compact : ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.inner}>
        {showCreature ? (
          <div className={styles.creatureWindow} aria-hidden="true">
            <Image
              src="/images/home/hero-goblin-mobile-v2.webp"
              alt=""
              fill
              sizes="180px"
              quality={65}
              className={styles.creature}
            />
            <span className={styles.scanLine} />
            <span className={styles.clawMark} />
            <span className={styles.clawMark} />
            <span className={styles.clawMark} />
          </div>
        ) : null}

        <p className={styles.eyebrow}>Something is scratching in there</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.detail}>{detail}</p>

        <div className={styles.biteTrail} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        {showTracks ? (
          <div className={styles.tracks} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        ) : null}
      </div>
    </section>
  );
}
