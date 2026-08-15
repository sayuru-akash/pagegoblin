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
      <main className="flex flex-1 flex-col items-center bg-grain px-6 py-16">
        <div className="mx-auto w-full max-w-4xl">
          <Reveal>
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <GoblinMascot className="shrink-0" />
                <div>
                  <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
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
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted">
                    Pages I bit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-3xl font-bold text-ink">
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
                  <p className="font-display text-3xl font-bold text-ink">
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
