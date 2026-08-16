import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./auth-frame.module.css";

interface AuthFrameProps {
  title: ReactNode;
  description: string;
  children: ReactNode;
}

export function AuthFrame({ title, description, children }: AuthFrameProps) {
  return (
    <main className={`${styles.main} bg-grain`}>
      <div className={styles.shell}>
        <div className={styles.art}>
          <Image
            src="/images/home/hero-goblin-v2.webp"
            alt="PageGoblin crouched behind a battered wall"
            fill
            sizes="(min-width: 1024px) 510px, 0px"
            className={styles.artImage}
            priority
          />
          <p className={styles.artLine}>
            I kept your pile warm.
          </p>
        </div>

        <div className={styles.panel}>
          <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <div className={styles.body}>{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
