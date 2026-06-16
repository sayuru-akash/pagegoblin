"use client";

import { motion } from "motion/react";
import { Shield, Crosshair, FileWarning, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { CategoryScores } from "@/lib/analysis";

interface CategoryMeta {
  key: keyof CategoryScores;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const categories: CategoryMeta[] = [
  {
    key: "trustTax",
    label: "Trust Tax",
    description: "How much trust the page loses",
    icon: Shield,
  },
  {
    key: "ctaCorpse",
    label: "CTA Corpse",
    description: "Weak or dead CTA problem",
    icon: Crosshair,
  },
  {
    key: "fluffDamage",
    label: "Fluff Damage",
    description: "Vague copy and buzzword damage",
    icon: FileWarning,
  },
  {
    key: "buyerConfusionLevel",
    label: "Buyer Confusion",
    description: "Clarity issue for visitors",
    icon: Users,
  },
  {
    key: "conversionFriction",
    label: "Conversion Friction",
    description: "Friction in the conversion path",
    icon: Zap,
  },
];

function getScoreColor(score: number): string {
  if (score <= 30) return "var(--color-goblin)";
  if (score <= 60) return "var(--color-amber)";
  return "var(--color-rose)";
}

function getScoreBg(score: number): string {
  if (score <= 30) return "bg-goblin/10";
  if (score <= 60) return "bg-amber/10";
  return "bg-rose/10";
}

function getScoreLabel(score: number): string {
  if (score <= 30) return "Low";
  if (score <= 60) return "Medium";
  return "High";
}

export function CategoryScoresGrid({ scores }: { scores: CategoryScores }) {
  return (
    <Stagger staggerDelay={0.08}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const score = scores[cat.key];
          const Icon = cat.icon;
          return (
            <StaggerItem key={cat.key}>
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${getScoreColor(score)}15` }}
                      >
                        <Icon
                          className="h-4.5 w-4.5"
                          style={{ color: getScoreColor(score) }}
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold text-ink">
                          {cat.label}
                        </h3>
                        <p className="text-xs text-muted">{cat.description}</p>
                      </div>
                    </div>
                    <span
                      className="font-display text-2xl font-bold"
                      style={{ color: getScoreColor(score) }}
                    >
                      {score}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-bone">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: getScoreColor(score) }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${score}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-muted">0</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getScoreBg(score)}`}
                        style={{ color: getScoreColor(score) }}
                      >
                        {getScoreLabel(score)}
                      </span>
                      <span className="font-mono text-[10px] text-muted">100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </div>
    </Stagger>
  );
}
