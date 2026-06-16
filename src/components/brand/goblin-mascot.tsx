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
        width="220"
        height="240"
        viewBox="0 0 220 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin gradient — three tone green */}
          <radialGradient id="skinGrad" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="oklch(0.82 0.14 155)" />
            <stop offset="50%" stopColor="oklch(0.68 0.17 155)" />
            <stop offset="100%" stopColor="oklch(0.48 0.16 160)" />
          </radialGradient>

          {/* Body gradient — slightly darker than skin */}
          <radialGradient id="bodyGrad" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="oklch(0.72 0.16 155)" />
            <stop offset="100%" stopColor="oklch(0.45 0.15 160)" />
          </radialGradient>

          {/* Cheek blush */}
          <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 25 / 0.55)" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 25 / 0)" />
          </radialGradient>

          {/* Eye gradient — golden iris */}
          <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.88 0.15 80)" />
            <stop offset="60%" stopColor="oklch(0.75 0.16 65)" />
            <stop offset="100%" stopColor="oklch(0.55 0.15 50)" />
          </radialGradient>

          {/* Hat / hood */}
          <linearGradient id="hoodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.22 0.05 300)" />
            <stop offset="100%" stopColor="oklch(0.15 0.04 300)" />
          </linearGradient>

          {/* Torch flame */}
          <radialGradient id="flameOuter" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="oklch(0.95 0.15 80)" />
            <stop offset="50%" stopColor="oklch(0.78 0.18 50)" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 25 / 0)" />
          </radialGradient>

          {/* Scroll gradient */}
          <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.94 0.04 85)" />
            <stop offset="100%" stopColor="oklch(0.86 0.06 80)" />
          </linearGradient>

          {/* Soft ambient glow */}
          <radialGradient id="ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 155 / 0.3)" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 155 / 0)" />
          </radialGradient>
        </defs>

        {/* Ambient glow behind goblin */}
        <circle cx="110" cy="130" r="110" fill="url(#ambient)" className="animate-glow-pulse" />

        {/* === TORCH in left hand === */}
        <g transform="rotate(-8 30 160)">
          {/* Handle */}
          <rect x="27" y="125" width="6" height="55" rx="2" fill="oklch(0.4 0.06 50)" />
          <rect x="28" y="127" width="4" height="51" rx="1" fill="oklch(0.5 0.08 55)" />
          {/* Metal band */}
          <rect x="25" y="178" width="10" height="4" rx="1" fill="oklch(0.35 0.04 60)" />
          <rect x="25" y="125" width="10" height="4" rx="1" fill="oklch(0.35 0.04 60)" />
          {/* Flame cup */}
          <path d="M22 120 L38 120 L35 110 L25 110 Z" fill="oklch(0.35 0.04 60)" />
          {/* Flame */}
          <ellipse cx="30" cy="100" rx="6" ry="14" fill="url(#flameOuter)" className="animate-glow-pulse" />
          <ellipse cx="30" cy="105" rx="3" ry="8" fill="oklch(0.95 0.12 85)" />
          <ellipse cx="30" cy="108" rx="1.5" ry="4" fill="oklch(1 0 0)" />
        </g>

        {/* === BODY / TUNIC === */}
        <path
          d="M75 195 Q70 220 78 235 L142 235 Q150 220 145 195 Q140 188 110 188 Q80 188 75 195 Z"
          fill="url(#bodyGrad)"
        />
        {/* Tunic neckline */}
        <path
          d="M95 188 Q110 200 125 188"
          stroke="oklch(0.35 0.12 160)"
          strokeWidth="2"
          fill="none"
        />
        {/* Belt */}
        <rect x="78" y="208" width="64" height="6" rx="1" fill="oklch(0.22 0.04 40)" />
        <rect x="105" y="206" width="10" height="10" rx="1" fill="oklch(0.75 0.12 80)" />
        <circle cx="110" cy="211" r="2" fill="oklch(0.5 0.08 75)" />
        {/* Tunic stitch lines */}
        <path d="M82 195 L82 232" stroke="oklch(0.38 0.12 160)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
        <path d="M138 195 L138 232" stroke="oklch(0.38 0.12 160)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />

        {/* === ARMS === */}
        {/* Left arm holding torch */}
        <path
          d="M82 200 Q70 185 55 175 Q45 168 38 168"
          stroke="url(#bodyGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left hand */}
        <circle cx="36" cy="168" r="7" fill="oklch(0.6 0.16 158)" />

        {/* Right arm holding scroll */}
        <path
          d="M138 200 Q150 188 165 180 Q175 175 180 178"
          stroke="url(#bodyGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />

        {/* === SCROLL in right hand === */}
        <g transform="rotate(12 178 175)">
          {/* Scroll body */}
          <rect x="160" y="155" width="38" height="48" rx="2" fill="url(#scrollGrad)" stroke="oklch(0.6 0.05 75)" strokeWidth="1" />
          {/* Top curl */}
          <ellipse cx="160" cy="160" rx="4" ry="6" fill="oklch(0.86 0.06 80)" stroke="oklch(0.6 0.05 75)" strokeWidth="0.8" />
          <ellipse cx="160" cy="198" rx="4" ry="6" fill="oklch(0.86 0.06 80)" stroke="oklch(0.6 0.05 75)" strokeWidth="0.8" />
          {/* Text lines on scroll */}
          <line x1="165" y1="168" x2="190" y2="168" stroke="oklch(0.4 0.05 40)" strokeWidth="1.2" />
          <line x1="165" y1="174" x2="195" y2="174" stroke="oklch(0.4 0.05 40)" strokeWidth="1.2" />
          <line x1="165" y1="180" x2="188" y2="180" stroke="oklch(0.4 0.05 40)" strokeWidth="1.2" />
          <line x1="165" y1="186" x2="193" y2="186" stroke="oklch(0.4 0.05 40)" strokeWidth="1.2" />
          <line x1="165" y1="192" x2="186" y2="192" stroke="oklch(0.4 0.05 40)" strokeWidth="1.2" />
          {/* Big red "X" mark */}
          <path d="M170 164 L180 174 M180 164 L170 174" stroke="oklch(0.55 0.22 25)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          {/* Right hand on scroll */}
          <circle cx="180" cy="178" r="6" fill="oklch(0.6 0.16 158)" />
        </g>

        {/* === HOOD / HAT === */}
        <path
          d="M55 95 Q55 50 110 45 Q165 50 165 95 Q160 100 155 95 L65 95 Q60 100 55 95 Z"
          fill="url(#hoodGrad)"
        />
        {/* Hood inner shadow */}
        <path
          d="M65 90 Q110 78 155 90 Q150 100 145 98 L75 98 Q70 100 65 90 Z"
          fill="oklch(0 0 0 / 0.4)"
        />
        {/* Hood highlight */}
        <path
          d="M75 60 Q110 50 145 60 Q140 55 110 52 Q80 55 75 60 Z"
          fill="oklch(0.3 0.06 300 / 0.5)"
        />

        {/* === HEAD === */}
        <ellipse cx="110" cy="115" rx="52" ry="58" fill="url(#skinGrad)" />

        {/* Head highlight */}
        <ellipse cx="88" cy="88" rx="20" ry="16" fill="oklch(0.9 0.12 155 / 0.4)" />

        {/* Forehead shadow under hood */}
        <ellipse cx="110" cy="78" rx="40" ry="10" fill="oklch(0.35 0.15 160 / 0.3)" />

        {/* === EARS (pointy) === */}
        {/* Left ear */}
        <path
          d="M62 100 Q38 75 28 85 Q35 100 58 115 Z"
          fill="url(#skinGrad)"
          stroke="oklch(0.45 0.15 160)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M40 92 Q44 96 50 102"
          stroke="oklch(0.45 0.15 160)"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        {/* Earring */}
        <circle cx="32" cy="98" r="2" fill="oklch(0.75 0.12 80)" />
        <circle cx="32" cy="98" r="0.8" fill="oklch(0.5 0.08 75)" />

        {/* Right ear */}
        <path
          d="M158 100 Q182 75 192 85 Q185 100 162 115 Z"
          fill="url(#skinGrad)"
          stroke="oklch(0.45 0.15 160)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M180 92 Q176 96 170 102"
          stroke="oklch(0.45 0.15 160)"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        {/* Earring */}
        <circle cx="188" cy="98" r="2" fill="oklch(0.75 0.12 80)" />
        <circle cx="188" cy="98" r="0.8" fill="oklch(0.5 0.08 75)" />

        {/* === FACE === */}
        {/* Cheeks */}
        <ellipse cx="72" cy="135" rx="11" ry="7" fill="url(#cheekGrad)" />
        <ellipse cx="148" cy="135" rx="11" ry="7" fill="url(#cheekGrad)" />

        {/* Eyebrows — mischievous, angled */}
        <path
          d="M68 102 Q82 95 96 105"
          stroke="oklch(0.32 0.12 160)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M124 105 Q138 95 152 102"
          stroke="oklch(0.32 0.12 160)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* === EYES (big, sparkly, expressive) === */}
        {/* Eye whites */}
        <ellipse cx="84" cy="122" rx="15" ry="17" fill="oklch(0.98 0.005 90)" stroke="oklch(0.32 0.12 160)" strokeWidth="1.5" />
        <ellipse cx="136" cy="122" rx="15" ry="17" fill="oklch(0.98 0.005 90)" stroke="oklch(0.32 0.12 160)" strokeWidth="1.5" />

        {/* Irises — large, golden */}
        <circle cx="84" cy="124" r="10" fill="url(#irisGrad)" />
        <circle cx="136" cy="124" r="10" fill="url(#irisGrad)" />

        {/* Pupils */}
        <ellipse cx="84" cy="125" rx="3.5" ry="6.5" fill="oklch(0.15 0.02 300)" />
        <ellipse cx="136" cy="125" rx="3.5" ry="6.5" fill="oklch(0.15 0.02 300)" />

        {/* Eye highlights — multiple for sparkle */}
        <circle cx="88" cy="118" r="3.5" fill="white" />
        <circle cx="140" cy="118" r="3.5" fill="white" />
        <circle cx="81" cy="129" r="1.5" fill="white" opacity="0.7" />
        <circle cx="133" cy="129" r="1.5" fill="white" opacity="0.7" />
        <circle cx="86" cy="131" r="0.8" fill="white" opacity="0.5" />

        {/* === NOSE === */}
        <path
          d="M105 148 Q110 156 115 148 L113 160 Q110 163 107 160 Z"
          fill="oklch(0.42 0.14 160)"
        />
        {/* Nose highlight */}
        <ellipse cx="110" cy="150" rx="1.5" ry="2" fill="oklch(0.7 0.1 155 / 0.5)" />

        {/* === MOUTH (smirk with fangs) === */}
        <path
          d="M88 172 Q110 184 132 170"
          stroke="oklch(0.2 0.04 300)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="oklch(0.2 0.04 300)"
        />
        {/* Lower lip area */}
        <path
          d="M90 173 Q110 182 130 172 Q125 178 110 180 Q95 178 90 173 Z"
          fill="oklch(0.25 0.05 300)"
        />
        {/* Fangs */}
        <path
          d="M93 173 L91 182 L97 178 Z"
          fill="oklch(0.98 0.005 90)"
          stroke="oklch(0.6 0.05 85)"
          strokeWidth="0.5"
        />
        <path
          d="M123 178 L127 184 L127 175 Z"
          fill="oklch(0.98 0.005 90)"
          stroke="oklch(0.6 0.05 85)"
          strokeWidth="0.5"
        />
        {/* Small tongue */}
        <ellipse cx="110" cy="179" rx="5" ry="2.5" fill="oklch(0.6 0.2 25)" />

        {/* === WARTS === */}
        <circle cx="65" cy="148" r="1.8" fill="oklch(0.4 0.14 160)" />
        <circle cx="65" cy="148" r="0.6" fill="oklch(0.65 0.16 158)" />
        <circle cx="155" cy="155" r="1.5" fill="oklch(0.4 0.14 160)" />
        <circle cx="155" cy="155" r="0.5" fill="oklch(0.65 0.16 158)" />

        {/* === CHIN === */}
        <ellipse cx="110" cy="190" rx="14" ry="4" fill="oklch(0.5 0.16 160 / 0.3)" />
        <path
          d="M104 188 Q110 192 116 188"
          stroke="oklch(0.42 0.14 160)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* === SPECKLES (freckles) === */}
        <circle cx="78" cy="115" r="0.6" fill="oklch(0.4 0.14 160)" opacity="0.7" />
        <circle cx="95" cy="110" r="0.5" fill="oklch(0.4 0.14 160)" opacity="0.7" />
        <circle cx="125" cy="110" r="0.5" fill="oklch(0.4 0.14 160)" opacity="0.7" />
        <circle cx="142" cy="115" r="0.6" fill="oklch(0.4 0.14 160)" opacity="0.7" />

        {/* === Floating sparkles around goblin === */}
        <g className="animate-ambient-float">
          <path d="M195 60 L197 64 L201 66 L197 68 L195 72 L193 68 L189 66 L193 64 Z" fill="oklch(0.85 0.15 85)" />
        </g>
        <g className="animate-ambient-float" style={{ animationDelay: "0.5s" }}>
          <path d="M20 80 L21.5 83 L24.5 84.5 L21.5 86 L20 89 L18.5 86 L15.5 84.5 L18.5 83 Z" fill="oklch(0.85 0.15 85)" />
        </g>
        <g className="animate-ambient-float" style={{ animationDelay: "1s" }}>
          <circle cx="200" cy="120" r="1.5" fill="oklch(0.78 0.18 155)" />
        </g>
        <g className="animate-ambient-float" style={{ animationDelay: "1.5s" }}>
          <circle cx="15" cy="140" r="1.5" fill="oklch(0.78 0.18 155)" />
        </g>
      </svg>
    </div>
  );
}
