import { getApiConfigs } from "@/lib/admin/service";
import { ApiConfigForm } from "@/components/admin/api-config-form";
import styles from "@/components/admin/admin.module.css";

export default async function ApiConfigPage() {
  const configs = await getApiConfigs();

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <h1>AI keys.</h1>
        <p>Choose which beast writes the full roar.</p>
      </header>
      <ApiConfigForm initialConfigs={configs} />
    </div>
  );
}
