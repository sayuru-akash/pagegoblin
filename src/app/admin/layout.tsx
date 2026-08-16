import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-guards";
import { AdminNav } from "@/components/admin/admin-nav";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import styles from "@/components/admin/admin.module.css";

export const metadata: Metadata = {
  title: "Cave Controls",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col bg-grain">
      <SiteHeader />
      <div className={styles.body}>
        <aside className={styles.aside}>
          <div className={styles.asideHead}>
            <p>Cave controls</p>
          </div>
          <div className={styles.nav}>
            <AdminNav />
          </div>
          <div className={styles.user}>
            <strong>
              {session.user.name || session.user.email}
            </strong>
            <span>{session.user.email}</span>
            <Link
              href="/dashboard"
            >
              Back to roast pile
            </Link>
          </div>
        </aside>
        <div className={styles.mobileNav}>
          <AdminNav />
        </div>
        <main className={styles.main}>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
