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
        The goblin fainted.
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted">
        Something broke. The goblin saw something it shouldn&apos;t have and needs a moment.
        You can try again, or retreat to safer ground.
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
          Go home
        </Link>
      </div>
    </div>
  );
}
