import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getApiConfigs, upsertApiConfig } from "@/lib/admin/service";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const configs = await getApiConfigs();
  return NextResponse.json(configs);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { name, providerType, baseUrl, apiKey, model, enabled } = body;

  if (!name || !apiKey || !model) {
    return NextResponse.json(
      { error: "name, apiKey, and model are required" },
      { status: 400 }
    );
  }

  try {
    const config = await upsertApiConfig({
      name,
      providerType: providerType || "OPENAI_COMPATIBLE",
      baseUrl,
      apiKey,
      model,
      enabled,
    });
    return NextResponse.json(config, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create config";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
