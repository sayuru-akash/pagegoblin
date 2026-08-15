"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("PageGoblin crashed:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-grain px-6 py-16 text-center">
      <Image src="/images/home/goblin-seated.png" alt="A tired PageGoblin" width={180} height={180} className="mb-8 h-40 w-40 object-contain drop-shadow-[0_0_30px_rgba(180,213,43,0.15)]" />
      <h1 className="mb-4 font-display text-5xl uppercase leading-none tracking-tight text-ink sm:text-7xl">
        I broke something. Loudly.
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted">
        I clawed the wrong wire and the whole cave went dark. Hit it again, or
        crawl back home while I kick the wall.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-[0.3rem] bg-goblin px-6 py-3 text-sm font-bold text-[#111605] shadow-goblin transition-all hover:bg-goblin-dark hover:shadow-glow active:scale-[0.98]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-[0.3rem] border border-border px-6 py-3 text-sm font-bold text-ink transition-all hover:border-goblin active:scale-[0.98]"
        >
          Crawl home
        </Link>
      </div>
    </div>
  );
}
