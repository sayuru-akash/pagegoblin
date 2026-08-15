"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Loader2, Flame, Sparkles, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UrlRoastFormProps {
  variant?: "hero" | "standalone";
  className?: string;
  aiAvailable?: boolean;
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

export function UrlRoastForm({ variant = "hero", className, aiAvailable }: UrlRoastFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [aiMode, setAiMode] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isValidUrl(url)) {
      setError("That link has no scent. Give me something like example.com.");
      return;
    }

    const normalized = normalizeUrl(url);
    setIsLoading(true);

    try {
      const res = await fetch("/api/roasts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: normalized,
          ...(aiMode ? { mode: "AI_ASSISTED" } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.report) {
        const status = data.error?.status ?? res.status;
        if (status === 400) {
          setError(data.error?.message ?? "That link smells wrong. Check it and throw it back.");
        } else if (status === 429) {
          setError("Back off for one tiny minute. I am still chewing the last pile.");
        } else {
          setError("I bit the page and it bit back. Make sure it is public, then throw it at me again.");
        }
        return;
      }

      const slug = data.links.report.replace("/roasts/", "");
      router.push(`/roasts/${slug}`);
    } catch {
      setError("I cannot reach the cave door. Check your connection and try again.");
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
            Give PageGoblin a website URL to roast
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
                <Flame className="h-4 w-4 text-goblin/40" />
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
              Clawing through your page...
            </>
          ) : (
            <>
              Let me loose
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

        {aiAvailable && (
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => setAiMode(!aiMode)}
              className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors cursor-pointer"
            >
              <div
                className={cn(
                  "relative h-5 w-9 rounded-full transition-colors duration-200",
                  aiMode ? "bg-goblin" : "bg-border"
                )}
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
                  animate={{ x: aiMode ? 16 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
              <Sparkles className={cn("h-3.5 w-3.5", aiMode ? "text-goblin" : "text-muted/60")} />
              <span className="font-medium">Unchain the bigger goblin</span>
              <span className="text-muted/60">(full roar)</span>
              <Info className="h-3 w-3 text-muted/40" />
            </button>

            <AnimatePresence>
              {aiMode && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-muted/70 leading-relaxed overflow-hidden"
                >
                  I send the page clues to the AI service picked by the cave keeper. That gives me a much wilder roast. Your URL and page words leave this server when you turn it on.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </form>
    </div>
  );
}
