"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Zap, Plus, Loader2, CheckCircle2, XCircle, ToggleLeft, ToggleRight } from "lucide-react";

interface ApiConfigItem {
  id: string;
  name: string;
  providerType: string;
  baseUrl: string | null;
  maskedApiKey: string;
  model: string;
  enabled: boolean;
  lastTestedAt: Date | string | null;
  lastTestStatus: string | null;
}

interface TestResult {
  success: boolean;
  message: string;
  latencyMs?: number;
}

export function ApiConfigForm({ initialConfigs }: { initialConfigs: ApiConfigItem[] }) {
  const [configs, setConfigs] = useState(initialConfigs);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    providerType: "OPENAI_COMPATIBLE" as string,
    baseUrl: "https://api.openai.com/v1",
    apiKey: "",
    model: "gpt-4o-mini",
    enabled: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const [testingIds, setTestingIds] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const resetForm = useCallback(() => {
    setForm({
      name: "",
      providerType: "OPENAI_COMPATIBLE",
      baseUrl: "https://api.openai.com/v1",
      apiKey: "",
      model: "gpt-4o-mini",
      enabled: false,
    });
    setShowForm(false);
    setEditingId(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const fetchConfigs = useCallback(async () => {
    const res = await fetch("/api/admin/api-config");
    if (res.ok) {
      const data = await res.json();
      setConfigs(data);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!form.name.trim() || !form.apiKey.trim() || !form.model.trim()) {
        setError("Name, API key, and model are required.");
        return;
      }

      startTransition(async () => {
        try {
          const url = editingId
            ? `/api/admin/api-config/${editingId}`
            : "/api/admin/api-config";
          const method = editingId ? "PATCH" : "POST";

          const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

          if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Something went wrong");
            return;
          }

          setSuccess(editingId ? "Config updated!" : "Config created!");
          resetForm();
          await fetchConfigs();
        } catch {
          setError("Network error");
        }
      });
    },
    [form, editingId, resetForm, fetchConfigs]
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm("Delete this API config?")) return;
      startTransition(async () => {
        const res = await fetch(`/api/admin/api-config/${id}`, { method: "DELETE" });
        if (res.ok) {
          setSuccess("Config deleted");
          await fetchConfigs();
        }
      });
    },
    [fetchConfigs]
  );

  const handleToggle = useCallback(
    (id: string, currentEnabled: boolean) => {
      startTransition(async () => {
        const res = await fetch(`/api/admin/api-config/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enabled: !currentEnabled }),
        });
        if (res.ok) {
          await fetchConfigs();
        }
      });
    },
    [fetchConfigs]
  );

  const handleTest = useCallback(
    async (id: string) => {
      setTestingIds((prev) => new Set(prev).add(id));
      setTestResults((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      try {
        const res = await fetch(`/api/admin/api-config/${id}/test`, { method: "POST" });
        const data: TestResult = await res.json();
        setTestResults((prev) => ({ ...prev, [id]: data }));
      } catch {
        setTestResults((prev) => ({
          ...prev,
          [id]: { success: false, message: "Network error" },
        }));
      } finally {
        setTestingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    []
  );

  const handleEdit = useCallback((config: ApiConfigItem) => {
    setEditingId(config.id);
    setForm({
      name: config.name,
      providerType: config.providerType,
      baseUrl: config.baseUrl || "",
      apiKey: "",
      model: config.model,
      enabled: config.enabled,
    });
    setShowForm(true);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-goblin/30 bg-goblin/10 px-4 py-3 text-sm font-medium text-goblin-dark">
          <CheckCircle2 className="h-4 w-4" />
          {success}
        </div>
      )}

      {!showForm && (
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: "", providerType: "OPENAI_COMPATIBLE", baseUrl: "https://api.openai.com/v1", apiKey: "", model: "gpt-4o-mini", enabled: false }); }}>
          <Plus className="h-4 w-4" />
          Add API Config
        </Button>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit API Config" : "New API Config"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-ink">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="OpenAI Production"
                    disabled={!!editingId}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="providerType" className="text-sm font-medium text-ink">
                    Provider Type
                  </label>
                  <select
                    id="providerType"
                    value={form.providerType}
                    onChange={(e) => setForm({ ...form, providerType: e.target.value })}
                    className="flex h-11 w-full rounded-xl border border-border bg-bone px-4 text-sm text-ink transition-colors focus:outline-2 focus:outline-goblin focus:outline-offset-2"
                  >
                    <option value="OPENAI_COMPATIBLE">OpenAI Compatible</option>
                    <option value="OPENAI">OpenAI</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="baseUrl" className="text-sm font-medium text-ink">
                  Base URL
                </label>
                <Input
                  id="baseUrl"
                  value={form.baseUrl}
                  onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
                  placeholder="https://api.openai.com/v1"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="text-sm font-medium text-ink">
                    API Key {editingId && "(leave blank to keep current)"}
                  </label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={form.apiKey}
                    onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
                    placeholder="sk-..."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="model" className="text-sm font-medium text-ink">
                    Model
                  </label>
                  <Input
                    id="model"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    placeholder="gpt-4o-mini"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enabled"
                  checked={form.enabled}
                  onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                  className="h-4 w-4 rounded border-border accent-goblin"
                />
                <label htmlFor="enabled" className="text-sm font-medium text-ink">
                  Enabled
                </label>
              </div>

              {error && <p className="text-sm font-medium text-rose">{error}</p>}

              <div className="flex gap-3">
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingId ? "Update" : "Create"}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {configs.map((config) => {
          const testResult = testResults[config.id];
          const isTesting = testingIds.has(config.id);

          return (
            <Card key={config.id}>
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-lg font-bold">
                      {config.name}
                    </h3>
                    <Badge variant={config.enabled ? "goblin" : "default"}>
                      {config.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted">
                    {config.providerType} &middot; {config.model}
                  </p>
                  {config.baseUrl && (
                    <p className="truncate text-xs text-muted">{config.baseUrl}</p>
                  )}
                  <p className="font-mono text-xs text-muted">
                    Key: {config.maskedApiKey}
                  </p>
                  {config.lastTestedAt && (
                    <p className="text-xs text-muted">
                      Last tested:{" "}
                      {new Date(config.lastTestedAt).toLocaleString()}{" "}
                      — {config.lastTestStatus}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {testResult && (
                    <div
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                        testResult.success
                          ? "bg-goblin/10 text-goblin-dark"
                          : "bg-rose/10 text-rose"
                      }`}
                    >
                      {testResult.success ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" />
                      )}
                      {testResult.message}
                      {testResult.latencyMs != null && ` (${testResult.latencyMs}ms)`}
                    </div>
                  )}

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleTest(config.id)}
                    disabled={isTesting}
                  >
                    {isTesting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Zap className="h-3.5 w-3.5" />
                    )}
                    Test
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleToggle(config.id, config.enabled)}
                    disabled={isPending}
                  >
                    {config.enabled ? (
                      <ToggleRight className="h-4 w-4 text-goblin" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 text-muted" />
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(config)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(config.id)}
                    disabled={isPending}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {configs.length === 0 && (
          <p className="py-8 text-center text-muted">
            No API configs yet. The goblin needs keys to work its magic.
          </p>
        )}
      </div>
    </div>
  );
}
