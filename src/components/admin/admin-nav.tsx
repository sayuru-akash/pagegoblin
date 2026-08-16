"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, KeyRound, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Watch the cave", shortLabel: "Overview", icon: LayoutDashboard },
  { href: "/admin/api-config", label: "Guard the AI keys", shortLabel: "AI keys", icon: KeyRound },
  { href: "/admin/settings", label: "Change the rules", shortLabel: "Settings", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-3 gap-1 lg:flex lg:flex-col" aria-label="Cave controls">
      {links.map((link) => {
        const isActive =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex min-w-0 items-center justify-center gap-2 whitespace-nowrap border-l px-2 py-2.5 text-sm font-medium transition-colors lg:justify-start lg:gap-3 lg:px-3",
              isActive
                ? "border-goblin bg-goblin/10 text-goblin-light"
                : "border-transparent text-muted hover:border-border hover:bg-bone hover:text-ink"
            )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              <span className="lg:hidden">{link.shortLabel}</span>
              <span className="hidden lg:inline">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
