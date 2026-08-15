"use client";

import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { motion } from "motion/react";
import { GoblinLogo } from "@/components/brand/goblin-logo";

const navLinks = [
  { href: "/analyze", label: "Analyze" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/examples", label: "Examples" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border bg-cave/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <GoblinLogo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-3 text-sm text-muted transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-goblin after:transition-transform hover:text-ink hover:after:scale-x-100 focus-goblin"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/analyze"
            className="group hidden h-10 items-center justify-center gap-1.5 rounded-[0.3rem] border border-goblin-light/40 bg-goblin px-5 text-sm font-bold text-[#111605] shadow-goblin transition-all duration-200 hover:-translate-y-0.5 hover:bg-goblin-dark hover:shadow-glow sm:inline-flex"
          >
            Roast my page
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <details className="relative lg:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-[0.3rem] border border-border bg-bone text-goblin-light focus-goblin [&::-webkit-details-marker]:hidden" aria-label="Toggle navigation menu">
              <Menu className="h-5 w-5" />
            </summary>
            <nav className="absolute right-0 top-12 flex min-w-52 flex-col border border-border bg-cave p-2 shadow-2xl" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="px-4 py-3 text-sm text-muted transition-colors hover:bg-bone hover:text-ink focus-goblin">
                  {link.label}
                </Link>
              ))}
              <Link href="/analyze" className="mt-1 bg-goblin px-4 py-3 text-sm font-bold text-[#111605] sm:hidden">
                Roast my page
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </motion.header>
  );
}
