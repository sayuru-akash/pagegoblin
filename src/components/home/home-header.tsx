import Link from "next/link";
import { HomeLogo } from "./home-logo";
import styles from "./home-page.module.css";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/examples", label: "Examples" },
  { href: "/privacy", label: "Privacy" },
];

export function HomeHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <HomeLogo />

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/analyze" className={styles.headerCta}>
            Roast a page
          </Link>
        </nav>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open navigation menu">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/analyze">Roast a page</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
