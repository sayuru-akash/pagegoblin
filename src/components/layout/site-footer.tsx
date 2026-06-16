import Link from "next/link";
import { GoblinLogo } from "@/components/brand/goblin-logo";

const footerLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "/privacy", label: "Privacy" },
  { href: "https://github.com/anomalyco/pagegoblin", label: "GitHub" },
];

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-bone/50 px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <GoblinLogo />
          <p className="text-sm text-muted">
            Conversion judgment, delivered instantly.
          </p>
        </div>
        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center gap-1 md:items-end">
          <p className="text-sm text-muted">
            &copy; 2026 Sayuru Amarasinghe. MIT License.
          </p>
          <p className="font-mono text-xs text-muted/60">
            goblin.exe v0.1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
