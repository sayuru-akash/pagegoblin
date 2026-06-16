"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GoblinEyeProps {
  className?: string;
  size?: number;
}

export function GoblinEye({ className, size = 200 }: GoblinEyeProps) {
  const eyeRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current || !pupilRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(
        12,
        Math.hypot(e.clientX - centerX, e.clientY - centerY) / 10
      );
      
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      pupilRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <svg
      ref={eyeRef}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      {/* Outer glow */}
      <defs>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-goblin)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-goblin)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-goblin-light)" />
          <stop offset="60%" stopColor="var(--color-goblin)" />
          <stop offset="100%" stopColor="var(--color-goblin-dark)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Glow background */}
      <circle cx="100" cy="100" r="90" fill="url(#eyeGlow)" className="animate-glow-pulse" />
      
      {/* Eye shape - almond */}
      <path
        d="M20 100 C20 60 55 30 100 30 C145 30 180 60 180 100 C180 140 145 170 100 170 C55 170 20 140 20 100Z"
        fill="var(--color-bone)"
        stroke="var(--color-border)"
        strokeWidth="1"
        opacity="0.8"
      />
      
      {/* Iris */}
      <circle cx="100" cy="100" r="45" fill="url(#irisGradient)" opacity="0.9" />
      
      {/* Iris detail lines - hardcoded to avoid hydration mismatch */}
      <g opacity="0.3">
        <line x1="100" y1="100" x2="142" y2="100" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="136.37" y2="136.37" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="100" y2="142" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="63.63" y2="136.37" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="58" y2="100" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="63.63" y2="63.63" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="100" y2="58" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="136.37" y2="63.63" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="130.35" y2="117.65" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="117.65" y2="130.35" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="82.35" y2="130.35" stroke="var(--color-cave)" strokeWidth="0.5" />
        <line x1="100" y1="100" x2="69.65" y2="117.65" stroke="var(--color-cave)" strokeWidth="0.5" />
      </g>
      
      {/* Pupil - follows mouse */}
      <circle
        ref={pupilRef}
        cx="100"
        cy="100"
        r="18"
        fill="var(--color-cave)"
        style={{ transition: "transform 0.1s ease-out" }}
      />
      
      {/* Highlight */}
      <circle cx="115" cy="85" r="6" fill="white" opacity="0.6" />
      <circle cx="108" cy="92" r="2" fill="white" opacity="0.8" />
      
      {/* Eyelid shadow */}
      <path
        d="M20 100 C20 60 55 30 100 30 C145 30 180 60 180 100 C180 95 145 35 100 35 C55 35 20 95 20 100Z"
        fill="var(--color-cave)"
        opacity="0.1"
      />
      
      {/* Bottom lid */}
      <path
        d="M20 100 C20 140 55 170 100 170 C145 170 180 140 180 100 C180 105 145 165 100 165 C55 165 20 105 20 100Z"
        fill="var(--color-cave)"
        opacity="0.05"
      />
    </svg>
  );
}
