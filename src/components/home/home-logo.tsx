import Image from "next/image";
import Link from "next/link";
import styles from "./home-page.module.css";

export function HomeLogo() {
  return (
    <Link href="/" className={styles.logo}>
      <Image
        src="/images/home/goblin-curious.png"
        alt=""
        width={500}
        height={500}
        sizes="36px"
        className={styles.logoMark}
      />
      <span className={styles.logoWordmark}>
        page <strong>goblin</strong>
      </span>
    </Link>
  );
}
