import Link from "next/link";
import { GoblinLogo } from "@/components/brand/goblin-logo";

const footerLinks = [
  { href: "/analyze", label: "Analyze" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/examples", label: "Examples" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
  { href: "https://github.com/sayuru-akash/pagegoblin", label: "GitHub" },
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
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
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
          <p className="font-mono text-xs text-muted">goblin.exe v1.0.0</p>
        </div>
      </div>
    </footer>
  );
}
