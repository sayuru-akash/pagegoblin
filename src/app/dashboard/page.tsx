import { requireAuth } from "@/lib/auth-guards";
import { getUserRoasts, getUserStats } from "@/lib/dashboard/service";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GoblinMascot } from "@/components/brand/goblin-mascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

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

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center bg-grain px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="mb-10 flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 sm:gap-6">
                <GoblinMascot className="w-20 shrink-0 sm:w-24" />
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-goblin">The pile I dragged</p>
                  <h1 className="font-display text-4xl uppercase leading-none tracking-tight text-ink sm:text-6xl">
                    Back in the cave, {session.user.name || "stray creature"}
                  </h1>
                  <p className="text-sm text-muted">
                    Your old roasts are still scratching at the walls.
                  </p>
                </div>
              </div>
              <SignOutButton />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted">
                    Pages I bit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-4xl text-ink">
                    {stats.totalRoasts}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted">
                    Average score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-4xl text-ink">
                    {stats.averageScore > 0 ? stats.averageScore : "None yet"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted">
                    Page I chewed most
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-lg font-bold text-ink truncate">
                    {stats.mostRoastedDomain || "Nothing yet"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink">
                The pile I dragged home
              </h2>
              <Link href="/analyze">
                <Button variant="primary" size="sm">
                  <Flame className="h-4 w-4" />
                  Feed me a page
                </Button>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <DashboardClient
                  initialRoasts={roastData.roasts}
                  page={roastData.page}
                  totalPages={roastData.totalPages}
                />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
