import { getAppSettings } from "@/lib/admin/service";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function SettingsPage() {
  const settings = await getAppSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          App Settings
        </h1>
        <p className="mt-1 text-muted">
          Configure how the goblin behaves across the platform.
        </p>
      </div>
      <SettingsForm initialSettings={settings as Record<string, unknown>} />
    </div>
  );
}
