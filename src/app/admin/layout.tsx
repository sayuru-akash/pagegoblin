import { requireAdmin } from "@/lib/auth-guards";
import { AdminNav } from "@/components/admin/admin-nav";
import Link from "next/link";
import { GoblinLogo } from "@/components/brand/goblin-logo";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-grain md:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-cave/90 md:flex">
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <GoblinLogo />
        </div>
        <div className="px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Cave controls
          </p>
          <AdminNav />
        </div>
        <div className="mt-auto border-t border-border px-6 py-4">
          <p className="truncate text-sm font-medium text-ink">
            {session.user.name || session.user.email}
          </p>
          <p className="truncate text-xs text-muted">{session.user.email}</p>
          <Link
            href="/dashboard"
            className="mt-3 inline-block text-xs font-medium text-goblin-dark hover:underline"
          >
            &larr; Back to my roast pile
          </Link>
        </div>
      </aside>
      <div className="sticky top-0 z-40 border-b border-border bg-cave/95 px-4 py-4 backdrop-blur md:hidden">
        <div className="mb-4 flex items-center justify-between gap-3">
          <GoblinLogo />
          <Link href="/dashboard" className="text-xs font-medium text-goblin-light">
            Back to roasts
          </Link>
        </div>
        <AdminNav />
      </div>
      <main className="min-w-0 flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:py-12">{children}</div>
      </main>
    </div>
  );
}
