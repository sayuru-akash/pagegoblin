import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { requireAuth } from "@/lib/auth-guards";
import { getUserRoasts, getUserStats } from "@/lib/dashboard/service";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Reveal } from "@/components/motion/reveal";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import styles from "@/components/dashboard/dashboard.module.css";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await requireAuth();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const [roastData, stats] = await Promise.all([
    getUserRoasts(session.user.id, page),
    getUserStats(session.user.id),
  ]);

  const name = session.user.name?.trim() || "stray creature";

  return (
    <>
      <SiteHeader />
      <main className={`${styles.main} bg-grain`}>
        <div className={styles.shell}>
          <Reveal>
            <header className={styles.heading}>
              <div>
                <p className={styles.label}>My roast pile</p>
                <h1>Back in the cave, <span>{name}.</span></h1>
              </div>
              <div className={styles.signout}><SignOutButton /></div>
            </header>
          </Reveal>

          <Reveal delay={0.08}>
            <div className={styles.stats}>
              <div className={styles.stat}><span>Pages I bit</span><strong>{stats.totalRoasts}</strong></div>
              <div className={styles.stat}><span>Average score</span><strong>{stats.averageScore > 0 ? `${stats.averageScore}/100` : "None"}</strong></div>
              <div className={styles.stat}><span>Page I chewed most</span><strong>{stats.mostRoastedDomain || "Nothing yet"}</strong></div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className={styles.toolbar}>
              <h2>The pile</h2>
              <Link href="/analyze" className="inline-flex h-11 items-center gap-2 rounded-[0.25rem] bg-goblin px-5 text-sm font-bold text-[#111605] transition-colors hover:bg-goblin-dark focus-goblin">
                Feed me a page <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.ledger}>
              <div className={styles.ledgerInner}>
                <DashboardClient initialRoasts={roastData.roasts} page={roastData.page} totalPages={roastData.totalPages} />
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
