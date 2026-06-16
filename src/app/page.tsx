import Link from "next/link";
import { ArrowRight, Bug, Eye, Gauge, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center max-w-4xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-goblin-green/30 bg-goblin-green/10 px-4 py-1.5 text-sm font-medium text-goblin-green">
          <Bug className="h-4 w-4" />
          <span>Now judging websites</span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          The tiny goblin that
          <br />
          <span className="bg-gradient-to-r from-goblin-green to-goblin-purple bg-clip-text text-transparent">
            judges your website.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed sm:text-xl">
          PageGoblin crawls every page, inspects every pixel, and gives you
          brutally honest feedback. No sugar-coating. No participation trophies.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/analyze"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-goblin-green px-8 text-sm font-semibold text-white shadow-lg shadow-goblin-green/25 transition-all hover:bg-goblin-green-dark hover:shadow-goblin-green/40"
          >
            Start Judging
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="w-full border-t border-border bg-surface/50 px-6 py-24"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            What the goblin inspects
          </h2>
          <p className="mt-4 text-center text-muted max-w-xl mx-auto">
            Every visit leaves no stone unturned. Here is what gets judged.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <FeatureCard
              icon={<Eye className="h-6 w-6" />}
              title="Visual Design"
              description="Layout, spacing, typography, color contrast — the goblin sees it all and judges harshly."
            />
            <FeatureCard
              icon={<Gauge className="h-6 w-6" />}
              title="Performance"
              description="Core Web Vitals, bundle sizes, load times. The goblin does not wait for slow sites."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Accessibility"
              description="Missing alt text? Bad contrast? Keyboard traps? The goblin will find every a11y violation."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to be judged?
          </h2>
          <p className="mt-4 text-muted">
            Drop your URL and let the goblin do its worst.
          </p>
          <Link
            href="/analyze"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-colors hover:bg-foreground/80"
          >
            Analyze Your Site
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border px-6 py-8">
        <div className="mx-auto max-w-5xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted">
            © 2026 Sayuru Amarasinghe. MIT License.
          </p>
          <p className="text-sm text-muted font-mono">
            🦹 goblin.exe v0.1.0
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-8 transition-shadow hover:shadow-lg">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-goblin-green/10 text-goblin-green">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}
