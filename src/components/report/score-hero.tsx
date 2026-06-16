"use client";

import { ScoreOrb } from "@/components/ui/score-orb";
import { Card, CardContent } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { ReportPayload } from "@/lib/reports/types";

export function ScoreHero({ report }: { report: ReportPayload["report"] }) {
  return (
    <Stagger staggerDelay={0.15}>
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
        <StaggerItem>
          <ScoreOrb score={report.score} size="lg" label="Goblin Score" />
        </StaggerItem>

        <div className="flex flex-1 flex-col gap-6">
          <StaggerItem>
            <Card className="border-rose/20 bg-rose/5">
              <CardContent>
                <p className="mb-1 font-mono text-xs font-medium uppercase tracking-widest text-rose">
                  Biggest Crime
                </p>
                <p className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {report.biggestCrime}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <blockquote className="border-l-4 border-goblin pl-4">
              <p className="font-display text-lg italic text-ink">
                &ldquo;{report.verdict}&rdquo;
              </p>
              <cite className="mt-2 block text-sm font-medium text-muted not-italic">
                — The PageGoblin
              </cite>
            </blockquote>
          </StaggerItem>
        </div>
      </div>
    </Stagger>
  );
}
