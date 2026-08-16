"use client";

import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { GoblinComplaint, Severity } from "@/lib/analysis";
import styles from "./report.module.css";

const severityVariant: Record<Severity, "danger" | "warning" | "default"> = {
  critical: "danger",
  high: "danger",
  medium: "warning",
  low: "default",
};

const severityLabel: Record<Severity, string> = {
  critical: "Fix this first",
  high: "Big bite",
  medium: "Sharp scratch",
  low: "Small nibble",
};

export function ComplaintsList({
  complaints,
}: {
  complaints: GoblinComplaint[];
}) {
  if (complaints.length === 0) {
    return (
      <div className={styles.verdict}>
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertTriangle className="h-8 w-8 text-goblin" />
          <p className="font-display text-lg font-bold text-ink">
            I sniffed every corner. Nothing big enough to bite.
          </p>
          <p className="text-sm text-muted">Hmph. I leave hungry.</p>
        </div>
      </div>
    );
  }

  return (
    <Stagger staggerDelay={0.08}>
      <div className={styles.list}>
        {complaints.map((complaint) => (
          <StaggerItem key={complaint.id}>
            <article className={styles.listRow}>
                <div className={styles.listTop}>
                  <h3>
                    {complaint.title}
                  </h3>
                  <Badge variant={severityVariant[complaint.severity]}>
                    {severityLabel[complaint.severity]}
                  </Badge>
                </div>
                <p>
                  {complaint.detail}
                </p>
                {complaint.evidence && complaint.evidence.length > 0 && (
                  <div className={styles.evidence}>
                    {complaint.evidence.map((evidence, i) => (
                      <span
                        key={i}
                      >
                        {evidence}
                      </span>
                    ))}
                  </div>
                )}
            </article>
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
