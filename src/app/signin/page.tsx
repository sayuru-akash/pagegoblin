"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GoblinMascot } from "@/components/brand/goblin-mascot";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. The goblin is not impressed.");
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setError("Something went wrong. The goblin tripped.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center bg-grain px-6 py-16">
        <Reveal>
          <div className="flex flex-col items-center mb-8">
            <GoblinMascot className="mb-4" />
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink text-center">
              Welcome back, goblin friend
            </h1>
            <p className="mt-2 text-sm text-muted text-center">
              The cave has been waiting for you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Sign in to PageGoblin</CardTitle>
              <CardDescription>
                Enter your credentials to access your roasts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-rose/10 border border-rose/30 px-4 py-3 text-sm text-rose">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-ink">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="goblin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-ink">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your secret goblin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      The goblin is checking...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-goblin hover:text-goblin-dark transition-colors">
                  Join the goblin cave
                </Link>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 text-center">
            <Link href="/analyze" className="text-sm text-muted hover:text-ink transition-colors">
              Try PageGoblin free →
            </Link>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-goblin" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
