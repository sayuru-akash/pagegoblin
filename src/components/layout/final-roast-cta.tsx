import Image from "next/image";
import { HomeRoastForm } from "@/components/home/home-roast-form";
import styles from "./final-roast-cta.module.css";

export function FinalRoastCta() {
  return (
    <section className={styles.section} aria-labelledby="final-roast-heading">
      <div className={styles.panel}>
        <div className={styles.content}>
          <h2 id="final-roast-heading">
            Go on. Feed me <span>the page.</span>
          </h2>
          <p>I can already smell a weak button. Let me loose.</p>
          <div className={styles.form}>
            <HomeRoastForm />
          </div>
        </div>
        <Image
          src="/images/home/goblin-peek.png"
          alt=""
          width={408}
          height={408}
          sizes="(max-width: 640px) 200px, 260px"
          className={styles.goblin}
        />
      </div>
    </section>
  );
}
