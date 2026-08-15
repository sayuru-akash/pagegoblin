"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthFrame } from "@/components/auth/auth-frame";
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
        setError("That email and password do not open the cave. Check them and try again.");
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setError("The cave door jammed. Give it one more shove in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <AuthFrame
        title={<>Back to the cave, <span className="text-goblin-dark">are you?</span></>}
        description="Good. Your old roasts are still scratching at the walls. Open the stash and see what survived."
      >
          <Card className="w-full bg-transparent shadow-none hover:translate-y-0 hover:shadow-none">
            <CardHeader>
              <CardTitle>Open your roast stash</CardTitle>
              <CardDescription>
                Give me the email and password tied to your cave.
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
                    placeholder="Your cave password"
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
                      Sniffing the key...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-goblin hover:text-goblin-dark transition-colors">
                  Dig out a new cave
                </Link>
              </div>
            </CardContent>
          </Card>
          <div className="mt-5 text-center">
            <Link href="/analyze" className="text-sm text-muted transition-colors hover:text-goblin-light">
              Skip the cave and roast a page →
            </Link>
          </div>
      </AuthFrame>
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
