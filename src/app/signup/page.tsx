"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthFrame } from "@/components/auth/auth-frame";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!data.ok) {
        setError(data.error?.message || "The cave would not open. Try again.");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Your cave exists, but the door stuck. Try signing in again.");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("The cave wall shook and dropped your request. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <AuthFrame
        title={<>Sign <span>up.</span></>}
        description="Keep every page I bite in one place."
      >
          <Card className="w-full border-0 bg-transparent p-0 shadow-none hover:translate-y-0 hover:shadow-none">
            <CardHeader className="sr-only">
              <CardTitle>Create account</CardTitle>
              <CardDescription>Enter your account details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div role="alert" aria-live="polite" className="border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-ink">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-ink">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
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
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
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
                      Making your account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted">
                Already have an account?{" "}
                <Link href="/signin" className="font-medium text-goblin hover:text-goblin-dark transition-colors">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
      </AuthFrame>
      <SiteFooter />
    </>
  );
}
