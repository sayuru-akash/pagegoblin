"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { GoblinMascot } from "@/components/brand/goblin-mascot";

export function VerdictCard({ verdict }: { verdict: string }) {
  return (
    <Reveal>
      <Card className="relative overflow-hidden border-cave/20 bg-cave/5">
        <CardContent className="relative z-10">
          <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-goblin">
            The Goblin Verdict
          </p>
          <blockquote className="font-display text-xl font-bold leading-relaxed tracking-tight text-ink sm:text-2xl">
            &ldquo;{verdict}&rdquo;
          </blockquote>
        </CardContent>
        <div className="absolute -bottom-2 -right-2 z-0 opacity-15">
          <GoblinMascot className="h-32 w-32" />
        </div>
      </Card>
    </Reveal>
  );
}
