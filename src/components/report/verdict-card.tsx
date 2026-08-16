"use client";

import { Reveal } from "@/components/motion/reveal";
import styles from "./report.module.css";

export function VerdictCard({ verdict }: { verdict: string }) {
  return (
    <Reveal>
      <div className={styles.verdict}>
          <p className={styles.micro}>
            My final growl
          </p>
          <blockquote>
            &ldquo;{verdict}&rdquo;
          </blockquote>
      </div>
    </Reveal>
  );
}
