"use client";

import { cn } from "@/lib/utils";

interface GoblinMascotProps {
  className?: string;
}

export function GoblinMascot({ className }: GoblinMascotProps) {
  return (
    <div
      className={cn("inline-block", className)}
      style={{ animation: "goblin-idle 4s ease-in-out infinite" }}
      aria-hidden="true"
    >
      <svg
        width="140"
        height="160"
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="var(--color-cave-2)" />
            <stop offset="100%" stopColor="var(--color-cave)" />
          </radialGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-goblin-light)" />
            <stop offset="100%" stopColor="var(--color-goblin)" />
          </radialGradient>
        </defs>
        
        {/* Body */}
        <ellipse cx="70" cy="95" rx="48" ry="52" fill="url(#bodyGrad)" />
        <ellipse cx="70" cy="92" rx="44" ry="46" fill="var(--color-cave)" opacity="0.9" />
        
        {/* Ears */}
        <path d="M25 55 L42 78" stroke="var(--color-cave-2)" strokeWidth="7" strokeLinecap="round" />
        <path d="M115 55 L98 78" stroke="var(--color-cave-2)" strokeWidth="7" strokeLinecap="round" />
        <path d="M22 52 L38 74" stroke="var(--color-goblin)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M118 52 L102 74" stroke="var(--color-goblin)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        
        {/* Eyes */}
        <ellipse cx="48" cy="78" rx="10" ry="12" fill="var(--color-bone)" />
        <ellipse cx="92" cy="78" rx="10" ry="12" fill="var(--color-bone)" />
        
        {/* Irises */}
        <circle cx="49" cy="77" r="6" fill="url(#eyeGlow)" />
        <circle cx="93" cy="77" r="6" fill="url(#eyeGlow)" />
        
        {/* Pupils */}
        <circle cx="49" cy="77" r="3.5" fill="var(--color-cave)" />
        <circle cx="93" cy="77" r="3.5" fill="var(--color-cave)" />
        
        {/* Eye highlights */}
        <circle cx="51" cy="74" r="1.5" fill="white" opacity="0.8" />
        <circle cx="95" cy="74" r="1.5" fill="white" opacity="0.8" />
        
        {/* Nose */}
        <ellipse cx="70" cy="92" rx="4" ry="3" fill="var(--color-cave-2)" opacity="0.6" />
        
        {/* Mouth */}
        <path
          d="M52 108 Q70 122 88 108"
          stroke="var(--color-goblin)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        
        {/* Teeth */}
        <path d="M58 112 L60 118 L62 112" fill="var(--color-bone)" opacity="0.8" />
        <path d="M78 112 L80 118 L82 112" fill="var(--color-bone)" opacity="0.8" />
        
        {/* Eyebrows */}
        <path d="M38 62 Q48 58 56 64" stroke="var(--color-cave-2)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M84 64 Q92 58 102 62" stroke="var(--color-cave-2)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
