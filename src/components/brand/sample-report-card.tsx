"use client";

import { motion } from "motion/react";
import { ArrowUpRight, AlertTriangle, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SampleReportCardProps {
  className?: string;
}

const reportLines = [
  {
    verdict: "no",
    icon: XCircle,
    label: "CTA above the fold",
    text: "Buried three scrolls deep. Nobody is scrolling that far.",
  },
  {
    verdict: "no",
    icon: XCircle,
    label: "Trust signals",
    text: "One testimonial from 2019. It shows its age.",
  },
  {
    verdict: "maybe",
    icon: AlertTriangle,
    label: "Headline clarity",
    text: "Synergistic. Disintermediate. You ate the jargon dictionary.",
  },
];

function getVerdictColor(v: string) {
  if (v === "yes") return "text-goblin";
  if (v === "no") return "text-rose";
  return "text-amber";
}

export function SampleReportCard({ className }: SampleReportCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, y: -4, transition: { duration: 0.4 } }}
      className={cn(
        "relative w-full max-w-md rounded-2xl border border-border bg-bone/95 p-5 shadow-card-hover backdrop-blur-sm",
        className
      )}
      style={{
        boxShadow:
          "0 1px 2px oklch(0 0 0 / 0.04), 0 8px 24px -8px oklch(0 0 0 / 0.12), 0 24px 48px -16px oklch(0 0 0 / 0.08)",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-cave">
            <span className="font-mono text-[10px] font-bold text-goblin">G</span>
          </div>
          <span className="font-mono text-[11px] text-muted">pagegoblin.report</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted/60">
          <Clock className="h-3 w-3" />
          <span className="font-mono text-[10px]">just now</span>
        </div>
      </div>

      {/* URL */}
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-parchment/50 px-3 py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-goblin" />
        <span className="font-mono text-xs text-ink truncate">your-website.com</span>
        <ArrowUpRight className="ml-auto h-3 w-3 text-muted" />
      </div>

      {/* Score row */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-bold tracking-tight text-rose"
            >
              42
            </motion.span>
            <span className="font-mono text-sm text-muted">/100</span>
          </div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
            The goblin says
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-[10px] uppercase tracking-widest text-rose">
            Needs work
          </span>
          <div className="mt-1 flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.08 }}
                className={cn(
                  "h-1.5 w-3 origin-left rounded-sm",
                  i < 2 ? "bg-rose" : "bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-border" />

      {/* Verdict lines */}
      <div className="space-y-2.5">
        {reportLines.map((line, i) => {
          const Icon = line.icon;
          return (
            <motion.div
              key={line.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.6 + i * 0.12 }}
              className="flex items-start gap-2.5"
            >
              <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", getVerdictColor(line.verdict))} />
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {line.label}
                </div>
                <p className="mt-0.5 text-[13px] leading-snug text-ink/90">
                  {line.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer verdict */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="font-mono text-[10px] text-muted">
          3 of 5 issues roasted
        </span>
        <span className="font-mono text-[10px] text-goblin">
          see full report →
        </span>
      </div>
    </motion.div>
  );
}
