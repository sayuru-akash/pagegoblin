import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./auth-frame.module.css";

interface AuthFrameProps {
  title: ReactNode;
  description: string;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  artLine: string;
}

export function AuthFrame({ title, description, children, imageSrc, imageAlt, artLine }: AuthFrameProps) {
  return (
    <main className={`${styles.main} bg-grain`}>
      <div className={styles.shell}>
        <div className={styles.art}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 510px, 0px"
            className={styles.artCharacter}
            priority
          />
          <p className={styles.artLine}>
            {artLine}
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
