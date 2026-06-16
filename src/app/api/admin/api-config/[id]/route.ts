import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { upsertApiConfig, deleteApiConfig, toggleApiConfig } from "@/lib/admin/service";
import { prisma } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  if (typeof body.enabled === "boolean" && Object.keys(body).length === 1) {
    const config = await toggleApiConfig(id, body.enabled);
    return NextResponse.json(config);
  }

  const { name, providerType, baseUrl, apiKey, model, enabled } = body;

  try {
    const existing = await prisma.apiConfig.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Config not found" }, { status: 404 });
    }

    const config = await upsertApiConfig({
      id,
      name: name || existing.name,
      providerType: providerType || existing.providerType,
      baseUrl: baseUrl !== undefined ? baseUrl : existing.baseUrl || undefined,
      apiKey: apiKey || "",
      model: model || existing.model,
      enabled: enabled !== undefined ? enabled : existing.enabled,
    });

    return NextResponse.json(config);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update config";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await deleteApiConfig(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete config";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
