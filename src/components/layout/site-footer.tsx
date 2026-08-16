import Link from "next/link";
import { GoblinLogo } from "@/components/brand/goblin-logo";

const footerLinks = [
  { href: "/extension", label: "Chrome extension" },
  { href: "/analyze", label: "Let me at a page" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/examples", label: "Examples" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
  { href: "https://github.com/sayuru-akash/pagegoblin", label: "GitHub" },
];

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-cave px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.6fr_auto] md:items-start">
        <div className="flex flex-col items-start gap-3">
          <GoblinLogo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Throw me a page. I will drag the mess into the light.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-sm text-muted transition-colors hover:text-goblin-light focus-goblin"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-1 md:items-end md:text-right">
          <p className="text-sm text-muted">
            &copy; 2026 Sayuru Amarasinghe. MIT License.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-goblin">the cave is awake</p>
        </div>
      </div>
    </footer>
  );
}
