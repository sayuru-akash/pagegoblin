"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";
import { normalizePageUrl } from "@/lib/analysis/url";
import styles from "./home-page.module.css";

interface HomeRoastFormProps {
  buttonLabel?: string;
}

export function HomeRoastForm({
  buttonLabel = "Roast my page",
}: HomeRoastFormProps) {
  const router = useRouter();
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    let normalizedUrl: string;
    try {
      const normalized = normalizePageUrl(url);
      const isPublicHostname =
        normalized.domain.includes(".") ||
        /^\d{1,3}(?:\.\d{1,3}){3}$/.test(normalized.domain) ||
        normalized.domain.includes(":");

      if (
        !["http:", "https:"].includes(normalized.protocol) ||
        !isPublicHostname ||
        normalized.domain.includes("%")
      ) {
        throw new Error("Invalid public website URL");
      }

      normalizedUrl = normalized.url;
    } catch {
      setError("That link has no scent. Give me something like example.com.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/roasts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl }),
      });
      const data = await response.json();

      if (!response.ok || !data.report || !data.links?.report) {
        if (response.status === 429) {
          setError("Back off for one tiny minute. I’m still chewing the last pile.");
        } else {
          setError("I bit that page and it bit back. Make sure it is public, then throw it at me again.");
        }
        return;
      }

      router.push(data.links.report);
    } catch {
      setError("I can’t reach the cave door. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.formShell}>
      <form
        className={styles.roastForm}
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        data-loading={isSubmitting ? "true" : "false"}
      >
        <label className={styles.srOnly} htmlFor={fieldId}>
          Website address for the goblin to check
        </label>
        <div className={styles.urlField}>
          <Globe2 aria-hidden="true" />
          <input
            id={fieldId}
            type="url"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            autoComplete="url"
            placeholder="your-website.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className={styles.buttonClaws} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              I’m in. Claws out.
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </form>
      <p
        id={errorId}
        className={styles.formError}
        role={error ? "alert" : undefined}
        aria-live="polite"
      >
        {error ?? "\u00a0"}
      </p>
    </div>
  );
}
