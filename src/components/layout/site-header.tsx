"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { GoblinLogo } from "@/components/brand/goblin-logo";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#examples", label: "Examples" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-parchment/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <GoblinLogo />
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink hover:bg-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/analyze"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-goblin px-4 text-sm font-semibold text-ink shadow-goblin transition-colors hover:bg-goblin-dark"
          >
            Roast a page
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
