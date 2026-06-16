"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface GoblinMascotProps {
  className?: string;
}

export function GoblinMascot({ className }: GoblinMascotProps) {
  return (
    <Image
      src="/goblin.svg"
      alt="PageGoblin mascot"
      width={260}
      height={282}
      priority
      className={cn("h-auto w-48 sm:w-56 md:w-64", className)}
    />
  );
}
