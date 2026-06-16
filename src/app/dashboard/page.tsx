import { requireAuth } from "@/lib/auth-guards";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GoblinMascot } from "@/components/brand/goblin-mascot";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center bg-grain px-6 py-16">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8 flex items-center gap-4">
            <GoblinMascot className="shrink-0" />
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
                Welcome, {session.user.name || "goblin friend"}
              </h1>
              <p className="text-sm text-muted">
                Your goblin dashboard awaits.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Roasts</CardTitle>
                <CardDescription>
                  Pages you have roasted will appear here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-sm text-muted">
                    No roasts yet. The goblin is hungry.
                  </p>
                  <Badge variant="goblin" className="mt-3">
                    Coming soon
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Your account details and settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted">Name</p>
                    <p className="text-sm font-medium text-ink">
                      {session.user.name || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Email</p>
                    <p className="text-sm font-medium text-ink">
                      {session.user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">Role</p>
                    <Badge variant={session.user.role === "ADMIN" ? "goblin" : "default"}>
                      {session.user.role}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
