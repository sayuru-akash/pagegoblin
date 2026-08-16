"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, KeyRound, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Watch the cave", icon: LayoutDashboard },
  { href: "/admin/api-config", label: "Guard the AI keys", icon: KeyRound },
  { href: "/admin/settings", label: "Change the rules", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Cave controls">
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
              "flex shrink-0 items-center gap-3 whitespace-nowrap border-l px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "border-goblin bg-goblin/10 text-goblin-light"
                : "border-transparent text-muted hover:border-border hover:bg-bone hover:text-ink"
            )}
          >
            <link.icon className="h-4 w-4 shrink-0" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
