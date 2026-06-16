"use client";

import { ShieldAlert, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import type { PageRisk } from "@/lib/analysis";

const iconMap = {
  PRIVATE_PAGE: EyeOff,
  SENSITIVE_CONTENT: ShieldAlert,
} as const;

export function WarningsPanel({ warnings }: { warnings: PageRisk[] }) {
  if (warnings.length === 0) return null;

  return (
    <Reveal>
      <div className="space-y-3">
        {warnings.map((warning, i) => {
          const Icon = iconMap[warning.type] ?? ShieldAlert;
          const isDanger = warning.severity === "danger";
          return (
            <Card
              key={i}
              className={
                isDanger
                  ? "border-rose/30 bg-rose/5"
                  : "border-amber/30 bg-amber/5"
              }
            >
              <CardContent className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isDanger ? "bg-rose/10" : "bg-amber/10"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isDanger ? "text-rose" : "text-amber"
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`font-display text-sm font-bold ${
                      isDanger ? "text-rose" : "text-amber-dark"
                    }`}
                  >
                    {warning.type === "PRIVATE_PAGE"
                      ? "Private Page Detected"
                      : "Sensitive Content Warning"}
                  </p>
                  <p className="mt-1 text-sm text-muted">{warning.message}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Reveal>
  );
}
