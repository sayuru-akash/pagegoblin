import Link from "next/link";
import { getAdminStats, getRecentReports } from "@/lib/admin/service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Users, Flame, TrendingUp } from "lucide-react";

export default async function AdminOverviewPage() {
  const [stats, recentReports] = await Promise.all([
    getAdminStats(),
    getRecentReports(10),
  ]);

  const statCards = [
    { label: "Total Roasts", value: stats.totalReports, icon: Flame, color: "text-amber" },
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-goblin-dark" },
    { label: "Avg Score", value: stats.avgScore, icon: TrendingUp, color: "text-rose" },
    { label: "This Week", value: stats.reportsThisWeek, icon: Flame, color: "text-goblin" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          The Goblin&apos;s Control Room
        </h1>
        <p className="mt-1 text-muted">
          Platform overview and quick actions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted">
                {card.label}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/api-config"
          className="goblin-card flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors hover:bg-bone"
        >
          <KeyRound className="h-4 w-4 text-goblin-dark" />
          Configure API Keys
        </Link>
        <Link
          href="/admin/settings"
          className="goblin-card flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors hover:bg-bone"
        >
          App Settings
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Roasts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 font-medium text-muted">Domain</th>
                  <th className="pb-3 font-medium text-muted">Score</th>
                  <th className="pb-3 font-medium text-muted">User</th>
                  <th className="pb-3 font-medium text-muted">Visibility</th>
                  <th className="pb-3 font-medium text-muted">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-bone/50">
                    <td className="py-3 font-medium">{report.domain}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center rounded-full bg-goblin/15 px-2.5 py-0.5 text-xs font-semibold text-goblin-dark">
                        {report.score}
                      </span>
                    </td>
                    <td className="py-3 text-muted">
                      {report.user?.email ?? "—"}
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center rounded-full bg-bone px-2.5 py-0.5 text-xs font-medium text-ink border border-border">
                        {report.visibility}
                      </span>
                    </td>
                    <td className="py-3 text-muted">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {recentReports.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted">
                      No roasts yet. The goblin is waiting...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
