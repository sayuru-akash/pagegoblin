"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UrlRoastFormProps {
  variant?: "hero" | "standalone";
  className?: string;
}

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isValidUrl(input: string): boolean {
  return input.includes(".");
}

export function UrlRoastForm({ variant = "hero", className }: UrlRoastFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isValidUrl(url)) {
      setError("That doesn't look like a URL. Try something like example.com");
      return;
    }

    const normalized = normalizeUrl(url);
    setIsLoading(true);

    try {
      const res = await fetch("/api/roasts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        const status = data.error?.status ?? res.status;
        if (status === 400) {
          setError(data.error?.message ?? "That URL doesn't look right.");
        } else if (status === 429) {
          setError("The goblin needs a break. Try again in a minute.");
        } else {
          setError("The goblin choked on something. Try again.");
        }
        return;
      }

      const slug = data.data.links.report.replace("/roasts/", "");
      router.push(`/roasts/${slug}`);
    } catch {
      setError("The goblin can't reach the server. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  }

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        isHero ? "w-full max-w-xl" : "w-full rounded-2xl border border-border bg-bone/50 p-6 shadow-sm",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
        <div className="relative">
          <label htmlFor="url-roast-input" className="sr-only">
            Enter a URL to roast
          </label>
          <Input
            id="url-roast-input"
            type="text"
            placeholder="https://your-website.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? "url-roast-error" : undefined}
            className={cn(
              isHero ? "h-14 text-base" : "h-12",
              "pr-4"
            )}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size={isHero ? "lg" : "md"}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              The goblin is inspecting...
            </>
          ) : (
            <>
              <Flame className="h-4 w-4" />
              Roast this page
            </>
          )}
        </Button>

        <AnimatePresence>
          {error && (
            <motion.p
              id="url-roast-error"
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-sm text-rose"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
