"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthFrame } from "@/components/auth/auth-frame";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import formStyles from "@/components/auth/auth-form.module.css";

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
        title={<>Sign <span>in.</span></>}
        description="Your roast pile is still scratching at the walls."
        imageSrc="/images/home/goblin-seated.png"
        imageAlt="A bored PageGoblin waiting by the cave door"
        artLine="You took long enough."
      >
          <div className="w-full">
              <form onSubmit={handleSubmit} className={formStyles.form}>
                {error && (
                  <div role="alert" aria-live="polite" className={formStyles.error}>
                    {error}
                  </div>
                )}

                <div className={formStyles.field}>
                  <label htmlFor="email" className="block text-sm font-medium text-ink">
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

                <div className={formStyles.field}>
                  <label htmlFor="password" className="block text-sm font-medium text-ink">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  className={formStyles.submit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Opening the cave...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className={formStyles.switch}>
                New here?{" "}
                <Link href="/signup" className="font-medium text-goblin hover:text-goblin-dark transition-colors">
                  Create account
                </Link>
              </div>
          </div>
          <div className={formStyles.skip}>
            <Link href="/analyze" className="text-sm text-muted transition-colors hover:text-goblin-light">
              Skip this. Roast a page.
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
