"use client";

import { Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { UsefulFix, Priority, Effort } from "@/lib/analysis";

const priorityVariant: Record<Priority, "danger" | "warning" | "default"> = {
  urgent: "danger",
  high: "warning",
  medium: "default",
  low: "default",
};

const priorityLabel: Record<Priority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const effortDots: Record<Effort, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export function FixesList({ fixes }: { fixes: UsefulFix[] }) {
  if (fixes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <Wrench className="h-8 w-8 text-goblin" />
          <p className="font-display text-lg font-bold text-ink">
            No fixes needed.
          </p>
          <p className="text-sm text-muted">
            Either this page is perfect, or the goblin is off its game.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stagger staggerDelay={0.08}>
      <div className="space-y-3">
        {fixes.map((fix, i) => (
          <StaggerItem key={i}>
            <Card>
              <CardContent>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-goblin-dark">
                    {fix.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityVariant[fix.priority]}>
                      {priorityLabel[fix.priority]}
                    </Badge>
                    <div className="flex items-center gap-1" title={`Effort: ${fix.effort}`}>
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
                        {fix.effort}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {fix.detail}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </div>
    </Stagger>
  );
}
