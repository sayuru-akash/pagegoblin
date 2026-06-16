"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Globe, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DashboardRoast } from "@/lib/dashboard/service";

interface RoastListProps {
  roasts: DashboardRoast[];
  onUpdateVisibility: (slug: string, visibility: string) => Promise<void>;
  onDelete: (slug: string) => Promise<void>;
}

const visibilityOptions = [
  { value: "PUBLIC", label: "Public", icon: Globe },
  { value: "UNLISTED", label: "Unlisted", icon: Eye },
  { value: "PRIVATE", label: "Private", icon: EyeOff },
] as const;

function scoreColor(score: number): string {
  if (score >= 70) return "text-goblin";
  if (score >= 40) return "text-amber";
  return "text-rose";
}

function scoreBadgeVariant(score: number): "goblin" | "warning" | "danger" {
  if (score >= 70) return "goblin";
  if (score >= 40) return "warning";
  return "danger";
}

function visibilityBadgeVariant(vis: string): "default" | "goblin" | "cave" {
  if (vis === "PUBLIC") return "goblin";
  if (vis === "PRIVATE") return "cave";
  return "default";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RoastList({ roasts, onUpdateVisibility, onDelete }: RoastListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [updatingVis, setUpdatingVis] = useState<string | null>(null);

  async function handleDelete(slug: string) {
    if (deleting) return;
    setDeleting(slug);
    try {
      await onDelete(slug);
    } finally {
      setDeleting(null);
    }
  }

  async function handleVisibilityChange(slug: string, visibility: string) {
    if (updatingVis) return;
    setUpdatingVis(slug);
    try {
      await onUpdateVisibility(slug, visibility);
    } finally {
      setUpdatingVis(null);
    }
  }

  if (roasts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-display font-bold text-ink">
          The goblin hasn&apos;t roasted anything for you yet.
        </p>
        <p className="mt-2 text-sm text-muted">
          Feed it a URL and watch it work.
        </p>
        <Link href="/analyze">
          <Button className="mt-6" variant="primary" size="md">
            Roast a page
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted">
                Page
              </th>
              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted">
                Score
              </th>
              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted">
                Crime
              </th>
              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted">
                Visibility
              </th>
              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted">
                Date
              </th>
              <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {roasts.map((roast, i) => (
                <motion.tr
                  key={roast.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group border-b border-border/50 transition-colors hover:bg-bone/50"
                >
                  <td className="py-4 pr-4">
                    <Link
                      href={`/roasts/${roast.slug}`}
                      className="flex items-center gap-2 text-sm font-medium text-ink hover:text-goblin transition-colors"
                    >
                      {roast.domain}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    {roast.title && (
                      <p className="mt-0.5 text-xs text-muted line-clamp-1">
                        {roast.title}
                      </p>
                    )}
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant={scoreBadgeVariant(roast.score)}>
                      <span className={scoreColor(roast.score)}>{roast.score}</span>
                    </Badge>
                  </td>
                  <td className="py-4 pr-4">
                    <p className="text-sm text-muted line-clamp-1 max-w-[200px]">
                      {roast.biggestCrime}
                    </p>
                  </td>
                  <td className="py-4 pr-4">
                    <select
                      value={roast.visibility}
                      onChange={(e) =>
                        handleVisibilityChange(roast.slug, e.target.value)
                      }
                      disabled={updatingVis === roast.slug}
                      className="rounded-lg border border-border bg-parchment px-2 py-1 text-xs font-medium text-ink focus-goblin disabled:opacity-50 cursor-pointer"
                    >
                      {visibilityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-xs text-muted">
                      {formatDate(roast.createdAt)}
                    </span>
                  </td>
                  <td className="py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(roast.slug)}
                      disabled={deleting === roast.slug}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-rose hover:text-rose"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        <AnimatePresence mode="popLayout">
          {roasts.map((roast, i) => (
            <motion.div
              key={roast.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="goblin-card p-4"
            >
              <div className="flex items-start justify-between">
                <Link
                  href={`/roasts/${roast.slug}`}
                  className="text-sm font-medium text-ink hover:text-goblin transition-colors"
                >
                  {roast.domain}
                </Link>
                <Badge variant={scoreBadgeVariant(roast.score)}>
                  <span className={scoreColor(roast.score)}>{roast.score}</span>
                </Badge>
              </div>
              {roast.title && (
                <p className="mt-1 text-xs text-muted line-clamp-1">
                  {roast.title}
                </p>
              )}
              <p className="mt-2 text-xs text-muted line-clamp-1">
                {roast.biggestCrime}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={visibilityBadgeVariant(roast.visibility)}>
                    {roast.visibility.toLowerCase()}
                  </Badge>
                  <span className="text-xs text-muted">
                    {formatDate(roast.createdAt)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(roast.slug)}
                  disabled={deleting === roast.slug}
                  className="text-rose hover:text-rose"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
