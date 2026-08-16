"use client";

import { Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { UsefulFix, Priority, Effort } from "@/lib/analysis";
import styles from "./report.module.css";

const priorityVariant: Record<Priority, "danger" | "warning" | "default"> = {
  urgent: "danger",
  high: "warning",
  medium: "default",
  low: "default",
};

const priorityLabel: Record<Priority, string> = {
  urgent: "Do this now",
  high: "Do this next",
  medium: "Worth doing",
  low: "Small polish",
};

const effortLabel: Record<Effort, string> = {
  low: "Quick",
  medium: "Some work",
  high: "Big job",
};

const effortDots: Record<Effort, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export function FixesList({ fixes }: { fixes: UsefulFix[] }) {
  if (fixes.length === 0) {
    return (
      <div className={styles.verdict}>
        <div className="flex flex-col items-center gap-3 text-center">
          <Wrench className="h-8 w-8 text-goblin" />
          <p className="font-display text-lg font-bold text-ink">
            No big fixes. You escaped my teeth.
          </p>
          <p className="text-sm text-muted">
            Keep watching the page as it grows. I may find a loose bone next time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Stagger staggerDelay={0.08}>
      <div className={styles.list}>
        {fixes.map((fix, i) => (
          <StaggerItem key={i}>
            <article className={styles.listRow}>
                <div className={styles.listTop}>
                  <h3 className="text-goblin-light">
                    {fix.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityVariant[fix.priority]}>
                      {priorityLabel[fix.priority]}
                    </Badge>
                    <div className={styles.effort}
                      title={`How much work: ${effortLabel[fix.effort]}`}
                    >
                      {[1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className={`h-2 w-2 rounded-full ${
                            dot <= effortDots[fix.effort]
                              ? "bg-goblin"
                              : "bg-border"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs capitalize text-muted">
                        {effortLabel[fix.effort]}
                      </span>
                    </div>
                  </div>
                </div>
                <p>
                  {fix.detail}
                </p>
            </article>
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
