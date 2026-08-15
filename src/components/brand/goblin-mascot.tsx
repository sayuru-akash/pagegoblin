"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface GoblinMascotProps {
  className?: string;
}

export function GoblinMascot({ className }: GoblinMascotProps) {
  return (
    <Image
      src="/images/home/goblin-curious.png"
      alt="PageGoblin mascot"
      width={500}
      height={500}
      priority
      className={cn("h-auto w-40 drop-shadow-[0_0_32px_rgba(180,213,43,0.16)] sm:w-48 md:w-56", className)}
    />
  );
}
