import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 text-7xl">🧌</div>
      <h1 className="mb-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          style={{ fontFamily: "var(--font-bricolage-grotesque)" }}>
        The goblin can&apos;t find this page.
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted">
        It wandered off somewhere. Maybe it followed a dead CTA. Maybe it got lost in fluff copy.
        Either way — this page does not exist.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-xl bg-goblin px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          Back to safety
        </Link>
        <Link
          href="/analyze"
          className="rounded-xl border-2 border-border px-6 py-3 text-sm font-bold text-ink transition-all hover:border-goblin/50 active:scale-[0.98]"
        >
          Roast a page instead
        </Link>
      </div>
    </div>
  );
}
