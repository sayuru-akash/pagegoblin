import Link from "next/link";
import { HomeLogo } from "./home-logo";
import styles from "./home-page.module.css";

const footerLinks = [
  { href: "/analyze", label: "Analyze" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/examples", label: "Examples" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "FAQ" },
  {
    href: "https://github.com/sayuru-akash/pagegoblin",
    label: "GitHub",
    external: true,
  },
];

export function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <HomeLogo />
        <nav className={styles.footerNav} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className={styles.copyright}>
        &copy; 2026 Sayuru Amarasinghe. MIT License.
      </p>
    </footer>
  );
}
