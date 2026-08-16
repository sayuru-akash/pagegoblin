"use client";

import { motion } from "motion/react";
import { Shield, Crosshair, FileWarning, Users, Zap } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import type { CategoryScores } from "@/lib/analysis";
import { CATEGORY_COPY } from "@/lib/analysis/category-copy";

interface CategoryMeta {
  key: keyof CategoryScores;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const categories: CategoryMeta[] = [
  {
    key: "trustTax",
    ...CATEGORY_COPY.trustTax,
    icon: Shield,
  },
  {
    key: "ctaCorpse",
    ...CATEGORY_COPY.ctaCorpse,
    icon: Crosshair,
  },
  {
    key: "fluffDamage",
    ...CATEGORY_COPY.fluffDamage,
    icon: FileWarning,
  },
  {
    key: "buyerConfusionLevel",
    ...CATEGORY_COPY.buyerConfusionLevel,
    icon: Users,
  },
  {
    key: "conversionFriction",
    ...CATEGORY_COPY.conversionFriction,
    icon: Zap,
  },
];

function getScoreColor(score: number): string {
  if (score >= 70) return "var(--color-goblin)";
  if (score >= 40) return "var(--color-amber)";
  return "var(--color-rose)";
}

function getScoreBg(score: number): string {
  if (score >= 70) return "bg-goblin/10";
  if (score >= 40) return "bg-amber/10";
  return "bg-rose/10";
}

function getScoreLabel(score: number): string {
  if (score >= 70) return "Hard to bite";
  if (score >= 40) return "Still chewing";
  return "Big mess";
}

export function CategoryScoresGrid({ scores }: { scores: CategoryScores }) {
  return (
    <Stagger staggerDelay={0.08}>
      <div className="overflow-hidden border border-border bg-cave/55">
        {categories.map((cat) => {
          const score = scores[cat.key];
          const Icon = cat.icon;
          return (
            <StaggerItem key={cat.key}>
              <div className="grid gap-4 border-b border-border px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(180px,1.2fr)_70px_minmax(180px,1fr)_100px] sm:items-center sm:px-5">
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
                      <div className="min-w-0">
                        <h3 className="font-display text-lg uppercase leading-none text-ink">
                          {cat.label}
                        </h3>
                      </div>
                  </div>
                  <span
                      className="font-display text-2xl"
                      style={{ color: getScoreColor(score) }}
                    >
                      {score}<small className="text-xs text-muted">/100</small>
                    </span>
                  <div>
                    <div className="h-2 w-full overflow-hidden bg-bone">
                      <motion.div
                        className="h-full"
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
                  </div>
                  <span
                        className={`w-fit rounded-[0.2rem] px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider ${getScoreBg(score)}`}
                        style={{ color: getScoreColor(score) }}
                      >
                        {getScoreLabel(score)}
                      </span>
              </div>
            </StaggerItem>
          );
        })}
      </div>
    </Stagger>
  );
}
