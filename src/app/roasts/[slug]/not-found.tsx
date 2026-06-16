import Link from "next/link";
import { GoblinMascot } from "@/components/brand/goblin-mascot";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-parchment px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <GoblinMascot className="h-28 w-28 opacity-80" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
          This roast got eaten.
        </h1>
        <p className="max-w-md text-muted">
          The goblin searched everywhere but couldn&apos;t find this report.
          Maybe it was never roasted, or maybe the goblin got hungry.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-goblin px-6 text-sm font-semibold text-white shadow-goblin transition-colors hover:bg-goblin-dark"
        >
          Roast another page
        </Link>
      </div>
    </div>
  );
}
