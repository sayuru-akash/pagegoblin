"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
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
  const [isFocused, setIsFocused] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isValidUrl(url)) {
      setError("That doesn't look like a valid URL. Try example.com");
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
          setError("Our servers need a moment. Please try again shortly.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        return;
      }

      const slug = data.data.links.report.replace("/roasts/", "");
      router.push(`/roasts/${slug}`);
    } catch {
      setError("Can't reach our servers. Check your connection.");
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
            Enter a URL to analyze
          </label>
          <div className={cn(
            "relative rounded-xl transition-all duration-300",
            isFocused && "shadow-glow"
          )}>
            <Input
              id="url-roast-input"
              type="text"
              placeholder="your-website.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error ? "url-roast-error" : undefined}
              className={cn(
                isHero ? "h-14 text-base" : "h-12",
                "pr-4 border-2 transition-all duration-300",
                isFocused && "border-goblin/50 bg-bone"
              )}
            />
            {isFocused && !url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Sparkles className="h-4 w-4 text-goblin/40" />
              </motion.div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size={isHero ? "lg" : "md"}
          disabled={isLoading}
          className="w-full group"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing your page...
            </>
          ) : (
            <>
              Begin inspection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
