"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ScoreOrbProps {
  score: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { container: "w-20 h-20", text: "text-xl", label: "text-[10px]", stroke: 4 },
  md: { container: "w-32 h-32", text: "text-3xl", label: "text-xs", stroke: 5 },
  lg: { container: "w-44 h-44", text: "text-5xl", label: "text-sm", stroke: 6 },
};

function getScoreColor(score: number): string {
  if (score >= 80) return "var(--color-goblin)";
  if (score >= 50) return "var(--color-amber)";
  return "var(--color-rose)";
}

export function ScoreOrb({ score, label = "Goblin Score", size = "md", className }: ScoreOrbProps) {
  const config = sizeMap[size];
  const radius = 50 - config.stroke;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className={cn("relative flex flex-col items-center gap-2", className)}>
      <div className={cn("relative", config.container)}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={config.stroke}
            opacity={0.3}
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("font-display font-bold", config.text)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <span className={cn("font-medium text-muted uppercase tracking-widest", config.label)}>
        {label}
      </span>
    </div>
  );
}
