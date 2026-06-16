"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";

interface SettingsData {
  defaultVisibility?: string;
  rateLimitPerHour?: number;
  aiModeEnabled?: boolean;
  siteTitle?: string;
  siteTagline?: string;
  [key: string]: unknown;
}

export function SettingsForm({ initialSettings }: { initialSettings: SettingsData }) {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const handleSave = useCallback(
    (key: string, value: unknown) => {
      startTransition(async () => {
        const res = await fetch("/api/admin/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value }),
        });

        if (res.ok) {
          setSettings((prev) => ({ ...prev, [key]: value }));
          setSuccess(`Saved ${key}`);
        }
      });
    },
    []
  );

  return (
    <div className="space-y-6">
      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-goblin/30 bg-goblin/10 px-4 py-3 text-sm font-medium text-goblin-dark">
          <CheckCircle2 className="h-4 w-4" />
          {success}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Default Roast Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted">
            Default visibility for new roasts created by users.
          </p>
          <select
            value={settings.defaultVisibility || "UNLISTED"}
            onChange={(e) => handleSave("defaultVisibility", e.target.value)}
            className="flex h-11 w-full max-w-xs rounded-xl border border-border bg-bone px-4 text-sm text-ink transition-colors focus:outline-2 focus:outline-goblin focus:outline-offset-2"
          >
            <option value="PRIVATE">Private</option>
            <option value="UNLISTED">Unlisted</option>
            <option value="PUBLIC">Public</option>
          </select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rate Limiting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted">
            Maximum roasts per user per hour.
          </p>
          <Input
            type="number"
            min={1}
            max={1000}
            value={settings.rateLimitPerHour ?? 10}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) setSettings((prev) => ({ ...prev, rateLimitPerHour: val }));
            }}
            onBlur={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) handleSave("rateLimitPerHour", val);
            }}
            className="max-w-xs"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Mode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted">
            Enable AI-assisted roasts using the configured API.
          </p>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.aiModeEnabled ?? false}
              onChange={(e) => handleSave("aiModeEnabled", e.target.checked)}
              className="h-4 w-4 rounded border-border accent-goblin"
            />
            <span className="text-sm font-medium text-ink">
              AI-assisted roasts enabled
            </span>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="siteTitle" className="text-sm font-medium text-ink">
              Site Title
            </label>
            <Input
              id="siteTitle"
              value={settings.siteTitle || ""}
              onChange={(e) => setSettings((prev) => ({ ...prev, siteTitle: e.target.value }))}
              onBlur={(e) => handleSave("siteTitle", e.target.value)}
              placeholder="PageGoblin"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="siteTagline" className="text-sm font-medium text-ink">
              Tagline
            </label>
            <Input
              id="siteTagline"
              value={settings.siteTagline || ""}
              onChange={(e) => setSettings((prev) => ({ ...prev, siteTagline: e.target.value }))}
              onBlur={(e) => handleSave("siteTagline", e.target.value)}
              placeholder="The tiny goblin that judges your website"
            />
          </div>
        </CardContent>
      </Card>

      {isPending && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </div>
      )}
    </div>
  );
}
