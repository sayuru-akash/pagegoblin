import { getApiConfigs } from "@/lib/admin/service";
import { ApiConfigForm } from "@/components/admin/api-config-form";

export default async function ApiConfigPage() {
  const configs = await getApiConfigs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Keys to the bigger goblin
        </h1>
        <p className="mt-1 text-muted">
          Lock up the AI keys and pick which beast writes the full roar.
        </p>
      </div>
      <ApiConfigForm initialConfigs={configs} />
    </div>
  );
}
