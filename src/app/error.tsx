"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 text-7xl">😵‍💫</div>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}>
        I broke something. Loudly.
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted">
        I clawed the wrong wire and the whole cave went dark. Hit it again, or
        crawl back home while I kick the wall.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-goblin px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border-2 border-border px-6 py-3 text-sm font-bold text-ink transition-all hover:border-goblin/50 active:scale-[0.98]"
        >
          Crawl home
        </Link>
      </div>
    </div>
  );
}
