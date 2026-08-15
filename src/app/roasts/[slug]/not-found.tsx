import Link from "next/link";
import { GoblinMascot } from "@/components/brand/goblin-mascot";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-parchment px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <GoblinMascot className="h-28 w-28 opacity-80" />
        <h1 className="font-display text-5xl uppercase leading-none tracking-tight text-ink sm:text-7xl">
          I ate this roast. Maybe.
        </h1>
        <p className="max-w-md text-muted">
          I sniffed the shelf, clawed through the pile, and found nothing. The
          report may be gone, private, or never made.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-[0.3rem] bg-goblin px-6 text-sm font-bold text-[#111605] shadow-goblin transition-colors hover:bg-goblin-dark"
        >
          Give me another page
        </Link>
      </div>
    </div>
  );
}
