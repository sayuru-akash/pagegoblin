import { getAppSettings } from "@/lib/admin/service";
import { SettingsForm } from "@/components/admin/settings-form";
import styles from "@/components/admin/admin.module.css";

export default async function SettingsPage() {
  const settings = await getAppSettings();

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <h1>Site settings.</h1>
        <p>Set the cave defaults.</p>
      </header>
      <SettingsForm initialSettings={settings as Record<string, unknown>} />
    </div>
  );
}
