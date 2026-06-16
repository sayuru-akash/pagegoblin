import Link from "next/link";
import { cn } from "@/lib/utils";

interface GoblinLogoProps {
  className?: string;
}

export function GoblinLogo({ className }: GoblinLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 group", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="var(--color-cave)" />
        <circle cx="11" cy="14" r="3" fill="var(--color-goblin)" />
        <circle cx="21" cy="14" r="3" fill="var(--color-goblin)" />
        <path
          d="M10 22 C13 25 19 25 22 22"
          stroke="var(--color-goblin)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M6 6 L11 10" stroke="var(--color-goblin-light)" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 6 L21 10" stroke="var(--color-goblin-light)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="font-display text-lg font-bold text-ink group-hover:text-goblin-dark transition-colors">
        PageGoblin
      </span>
    </Link>
  );
}
