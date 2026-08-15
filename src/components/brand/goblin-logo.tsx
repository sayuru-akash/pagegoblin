import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GoblinLogoProps {
  className?: string;
}

export function GoblinLogo({ className }: GoblinLogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 group", className)}>
      <Image
        src="/images/home/goblin-curious.png"
        alt=""
        width={40}
        height={40}
        sizes="40px"
        className="h-10 w-10 object-contain brightness-110 saturate-125 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:-rotate-6"
      />
      <span className="font-display text-xl uppercase leading-none tracking-[0.01em] text-ink transition-colors group-hover:text-goblin-light">
        page <strong className="font-normal text-goblin-dark">goblin</strong>
      </span>
    </Link>
  );
}
