import { getApiConfigs } from "@/lib/admin/service";
import { ApiConfigForm } from "@/components/admin/api-config-form";

export default async function ApiConfigPage() {
  const configs = await getApiConfigs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          API Configuration
        </h1>
        <p className="mt-1 text-muted">
          Manage the API keys the goblin uses to generate AI-enhanced roasts.
        </p>
      </div>
      <ApiConfigForm initialConfigs={configs} />
    </div>
  );
}
