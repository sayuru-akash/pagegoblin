import Link from "next/link";
import { KeyRound, Settings } from "lucide-react";
import { getAdminStats, getRecentReports } from "@/lib/admin/service";
import styles from "@/components/admin/admin.module.css";

export default async function AdminOverviewPage() {
  const [stats, recentReports] = await Promise.all([getAdminStats(), getRecentReports(10)]);
  const statCards = [
    ["Pages bitten", stats.totalReports],
    ["Cave keepers", stats.totalUsers],
    ["Average score", stats.avgScore],
    ["Fresh this week", stats.reportsThisWeek],
  ];

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <h1>Cave controls.</h1>
        <p>The beast at a glance.</p>
      </header>

      <div className={styles.stats}>
        {statCards.map(([label, value]) => (
          <div className={styles.stat} key={label}><span>{label}</span><strong>{value}</strong></div>
        ))}
      </div>

      <div className={styles.actions}>
        <Link href="/admin/api-config"><KeyRound size={16} /> AI keys</Link>
        <Link href="/admin/settings"><Settings size={16} /> Site settings</Link>
      </div>

      <section className={`${styles.panel} overflow-x-auto p-5 sm:p-6`}>
        <h2 className="mb-5 font-display text-2xl uppercase text-ink">Fresh bites</h2>
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border font-mono text-[10px] uppercase tracking-[0.14em] text-goblin-light"><th className="pb-3">Domain</th><th className="pb-3">Score</th><th className="pb-3">User</th><th className="pb-3">Visibility</th><th className="pb-3">Date</th></tr></thead>
          <tbody>
            {recentReports.map((report) => (
              <tr key={report.id} className="border-b border-border/50 transition-colors last:border-0 hover:bg-goblin/5">
                <td className="py-3 font-semibold text-ink">{report.domain}</td>
                <td className="py-3 font-mono text-goblin-light">{report.score}/100</td>
                <td className="py-3 text-muted">{report.user?.email ?? "No owner"}</td>
                <td className="py-3 text-muted">{report.visibility.toLowerCase()}</td>
                <td className="py-3 text-muted">{new Date(report.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {recentReports.length === 0 && <tr><td colSpan={5} className="py-10 text-center text-muted">Nothing here yet.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  );
}
