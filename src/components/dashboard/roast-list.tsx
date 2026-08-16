"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DashboardRoast } from "@/lib/dashboard/service";
import styles from "./dashboard.module.css";

interface RoastListProps {
  roasts: DashboardRoast[];
  onUpdateVisibility: (slug: string, visibility: string) => Promise<void>;
  onDelete: (slug: string) => Promise<void>;
}

const visibilityOptions = ["PUBLIC", "UNLISTED", "PRIVATE"] as const;

function scoreVariant(score: number): "goblin" | "warning" | "danger" {
  if (score >= 70) return "goblin";
  if (score >= 40) return "warning";
  return "danger";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function RoastList({ roasts, onUpdateVisibility, onDelete }: RoastListProps) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function changeVisibility(slug: string, visibility: string) {
    if (busy) return;
    setBusy(slug);
    setError(null);
    try {
      await onUpdateVisibility(slug, visibility);
    } catch {
      setError("That change slipped out of my claws. Try again.");
    } finally {
      setBusy(null);
    }
  }

  async function removeRoast(slug: string) {
    if (busy || !window.confirm("Delete this roast for good?")) return;
    setBusy(slug);
    setError(null);
    try {
      await onDelete(slug);
    } catch {
      setError("I could not throw that roast out. Try again.");
    } finally {
      setBusy(null);
    }
  }

  if (roasts.length === 0) {
    return (
      <div className={styles.empty}>
        <strong>The shelf is empty.</strong>
        <p>Throw me a URL.</p>
        <Link href="/analyze"><Button className="mt-6">Roast a page</Button></Link>
      </div>
    );
  }

  return (
    <>
      {error && <p className={styles.notice} role="alert" aria-live="polite">{error}</p>}

      <div className={styles.desktopTable}>
        <table className={styles.table}>
          <thead>
            <tr><th>Page</th><th>Score</th><th>First bite</th><th>Visibility</th><th>Date</th><th><span className="sr-only">Actions</span></th></tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {roasts.map((roast, index) => (
                <motion.tr key={roast.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, delay: index * 0.025 }}>
                  <td>
                    <Link href={`/roasts/${roast.slug}`} className={styles.domain}>{roast.domain}<ExternalLink aria-hidden="true" /></Link>
                    {roast.title && <p className={styles.title}>{roast.title}</p>}
                  </td>
                  <td><Badge variant={scoreVariant(roast.score)}>{roast.score}/100</Badge></td>
                  <td><span className={styles.crime}>{roast.biggestCrime}</span></td>
                  <td>
                    <select className={styles.select} value={roast.visibility} onChange={(event) => changeVisibility(roast.slug, event.target.value)} disabled={busy === roast.slug} aria-label={`Visibility for ${roast.domain}`}>
                      {visibilityOptions.map((value) => <option value={value} key={value}>{value.charAt(0) + value.slice(1).toLowerCase()}</option>)}
                    </select>
                  </td>
                  <td className="text-xs text-muted">{formatDate(roast.createdAt)}</td>
                  <td><Button variant="ghost" size="sm" onClick={() => removeRoast(roast.slug)} disabled={busy === roast.slug} aria-label={`Delete roast for ${roast.domain}`}><Trash2 size={15} /></Button></td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className={styles.mobileList}>
        <AnimatePresence mode="popLayout">
          {roasts.map((roast, index) => (
            <motion.article className={styles.mobileCard} key={roast.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, delay: index * 0.025 }}>
              <div className={styles.mobileTop}>
                <Link href={`/roasts/${roast.slug}`} className={styles.domain}>{roast.domain}</Link>
                <Badge variant={scoreVariant(roast.score)}>{roast.score}/100</Badge>
              </div>
              <p className="my-3 text-sm text-muted">{roast.biggestCrime}</p>
              <div className={styles.mobileBottom}>
                <select className={styles.select} value={roast.visibility} onChange={(event) => changeVisibility(roast.slug, event.target.value)} disabled={busy === roast.slug} aria-label={`Visibility for ${roast.domain}`}>
                  {visibilityOptions.map((value) => <option value={value} key={value}>{value.charAt(0) + value.slice(1).toLowerCase()}</option>)}
                </select>
                <span className="text-xs text-muted">{formatDate(roast.createdAt)}</span>
                <Button variant="ghost" size="sm" onClick={() => removeRoast(roast.slug)} disabled={busy === roast.slug} aria-label={`Delete roast for ${roast.domain}`}><Trash2 size={15} /></Button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
