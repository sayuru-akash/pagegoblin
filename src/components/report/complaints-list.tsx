"use client";

import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { GoblinComplaint, Severity } from "@/lib/analysis";

const severityVariant: Record<Severity, "danger" | "warning" | "default"> = {
  critical: "danger",
  high: "danger",
  medium: "warning",
  low: "default",
};

const severityLabel: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function ComplaintsList({
  complaints,
}: {
  complaints: GoblinComplaint[];
}) {
  if (complaints.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <AlertTriangle className="h-8 w-8 text-goblin" />
          <p className="font-display text-lg font-bold text-ink">
            The goblin found nothing to complain about.
          </p>
          <p className="text-sm text-muted">This feels like cheating.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stagger staggerDelay={0.08}>
      <div className="space-y-3">
        {complaints.map((complaint) => (
          <StaggerItem key={complaint.id}>
            <Card>
              <CardContent>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-ink">
                    {complaint.title}
                  </h3>
                  <Badge variant={severityVariant[complaint.severity]}>
                    {severityLabel[complaint.severity]}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {complaint.detail}
                </p>
                {complaint.evidence && complaint.evidence.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {complaint.evidence.map((evidence, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-bone px-2 py-1 font-mono text-xs text-muted"
                      >
                        {evidence}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
