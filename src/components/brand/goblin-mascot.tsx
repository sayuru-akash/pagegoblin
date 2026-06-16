"use client";

import { cn } from "@/lib/utils";

interface GoblinMascotProps {
  className?: string;
}

export function GoblinMascot({ className }: GoblinMascotProps) {
  return (
    <div
      className={cn("inline-block", className)}
      style={{ animation: "goblin-idle 3s ease-in-out infinite" }}
      aria-hidden="true"
    >
      <svg
        width="120"
        height="140"
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="60" cy="85" rx="40" ry="45" fill="var(--color-cave)" />
        <ellipse cx="60" cy="82" rx="36" ry="40" fill="var(--color-cave)" opacity="0.9" />
        <circle cx="45" cy="72" r="8" fill="var(--color-parchment)" />
        <circle cx="75" cy="72" r="8" fill="var(--color-parchment)" />
        <circle cx="46" cy="71" r="4" fill="var(--color-ink)" />
        <circle cx="76" cy="71" r="4" fill="var(--color-ink)" />
        <circle cx="47.5" cy="69.5" r="1.5" fill="white" />
        <circle cx="77.5" cy="69.5" r="1.5" fill="white" />
        <path
          d="M50 95 Q60 105 70 95"
          stroke="var(--color-goblin)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M20 30 L42 60" stroke="var(--color-goblin)" strokeWidth="6" strokeLinecap="round" />
        <path d="M100 30 L78 60" stroke="var(--color-goblin)" strokeWidth="6" strokeLinecap="round" />
        <path d="M18 28 L40 55" stroke="var(--color-goblin-light)" strokeWidth="3" strokeLinecap="round" />
        <path d="M102 28 L80 55" stroke="var(--color-goblin-light)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
