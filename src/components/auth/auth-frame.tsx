import Image from "next/image";
import type { ReactNode } from "react";

interface AuthFrameProps {
  title: ReactNode;
  description: string;
  children: ReactNode;
}

export function AuthFrame({ title, description, children }: AuthFrameProps) {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden bg-grain px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden border border-border bg-cave shadow-[0_30px_100px_rgba(0,0,0,0.5)] lg:min-h-[660px] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative hidden min-h-[660px] overflow-hidden border-r border-border lg:block">
          <Image
            src="/images/home/hero-goblin-v2.webp"
            alt="PageGoblin crouched behind a battered wall"
            fill
            sizes="(min-width: 1024px) 510px, 0px"
            className="object-cover object-[58%_center]"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,2,0.05),rgba(2,4,2,0.2)),linear-gradient(0deg,#020402_0%,transparent_35%)]" />
          <p className="absolute bottom-8 left-8 max-w-xs border-l border-goblin pl-4 font-display text-2xl uppercase leading-[1.05] text-ink">
            I kept the roast pile warm. <span className="text-goblin-dark">Mostly.</span>
          </p>
        </div>

        <div className="flex items-center px-6 py-10 sm:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
              {description}
            </p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
