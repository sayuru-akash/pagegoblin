import { prisma } from "@/lib/db";
import { encryptSecret, decryptSecret } from "@/lib/crypto";
import { Prisma } from "@/generated/prisma/client";

export async function getAdminStats() {
  const [totalReports, totalUsers, avgScore, recentReports] = await Promise.all([
    prisma.report.count(),
    prisma.user.count(),
    prisma.report.aggregate({ _avg: { score: true } }),
    prisma.report.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);
  return {
    totalReports,
    totalUsers,
    avgScore: Math.round(avgScore._avg.score ?? 0),
    reportsThisWeek: recentReports,
  };
}

export async function getAdminReports(page = 1, pageSize = 20) {
  const skip = (page - 1) * pageSize;
  const [reports, total] = await Promise.all([
    prisma.report.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { email: true, name: true } } },
    }),
    prisma.report.count(),
  ]);
  return { reports, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function getRecentReports(limit = 10) {
  return prisma.report.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true, name: true } } },
  });
}

function maskApiKey(key: string): string {
  if (key.length <= 8) return "****";
  return `${key.slice(0, 4)}${"*".repeat(key.length - 8)}${key.slice(-4)}`;
}

export async function getApiConfigs() {
  const configs = await prisma.apiConfig.findMany({ orderBy: { createdAt: "desc" } });
  const encryptionKey = process.env.ENCRYPTION_KEY!;
  return configs.map((config) => {
    let maskedKey = "****";
    try {
      const decrypted = decryptSecret(config.encryptedApiKey, encryptionKey);
      maskedKey = maskApiKey(decrypted);
    } catch {
      maskedKey = "****";
    }
    return {
      id: config.id,
      name: config.name,
      providerType: config.providerType,
      baseUrl: config.baseUrl,
      maskedApiKey: maskedKey,
      model: config.model,
      enabled: config.enabled,
      createdAt: config.createdAt,
      updatedAt: config.updatedAt,
      lastTestedAt: config.lastTestedAt,
      lastTestStatus: config.lastTestStatus,
    };
  });
}

export async function upsertApiConfig(input: {
  id?: string;
  name: string;
  providerType: "OPENAI_COMPATIBLE" | "OPENAI" | "OTHER";
  baseUrl?: string;
  apiKey: string;
  model: string;
  enabled?: boolean;
}) {
  const encryptionKey = process.env.ENCRYPTION_KEY!;
  const encryptedApiKey = encryptSecret(input.apiKey, encryptionKey);

  const data = {
    name: input.name,
    providerType: input.providerType,
    baseUrl: input.baseUrl || null,
    encryptedApiKey,
    model: input.model,
    enabled: input.enabled ?? false,
  };

  if (input.id) {
    return prisma.apiConfig.update({ where: { id: input.id }, data });
  }

  return prisma.apiConfig.upsert({
    where: { name: input.name },
    update: data,
    create: data,
  });
}

export async function testApiConfig(id: string) {
  const config = await prisma.apiConfig.findUnique({ where: { id } });
  if (!config) return { success: false, message: "Config not found" };

  const encryptionKey = process.env.ENCRYPTION_KEY!;
  let apiKey: string;
  try {
    apiKey = decryptSecret(config.encryptedApiKey, encryptionKey);
  } catch {
    await prisma.apiConfig.update({
      where: { id },
      data: { lastTestedAt: new Date(), lastTestStatus: "DECRYPT_FAILED" },
    });
    return { success: false, message: "Failed to decrypt API key" };
  }

  const baseUrl = (config.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "");
  const start = Date.now();

  try {
    const res = await fetch(`${baseUrl}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(10_000),
    });

    const latencyMs = Date.now() - start;

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      const status = `HTTP_${res.status}`;
      await prisma.apiConfig.update({
        where: { id },
        data: { lastTestedAt: new Date(), lastTestStatus: status },
      });
      return { success: false, message: `API returned ${res.status}: ${body.slice(0, 200)}`, latencyMs };
    }

    await prisma.apiConfig.update({
      where: { id },
      data: { lastTestedAt: new Date(), lastTestStatus: "OK" },
    });
    return { success: true, message: "Connection successful", latencyMs };
  } catch (err) {
    const latencyMs = Date.now() - start;
    const message = err instanceof Error ? err.message : "Unknown error";
    await prisma.apiConfig.update({
      where: { id },
      data: { lastTestedAt: new Date(), lastTestStatus: "ERROR" },
    });
    return { success: false, message, latencyMs };
  }
}

export async function deleteApiConfig(id: string) {
  await prisma.apiConfig.delete({ where: { id } });
}

export async function toggleApiConfig(id: string, enabled: boolean) {
  return prisma.apiConfig.update({ where: { id }, data: { enabled } });
}

export async function getAppSettings() {
  const settings = await prisma.appSetting.findMany();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}

export async function updateAppSetting(key: string, value: unknown) {
  return prisma.appSetting.upsert({
    where: { key },
    update: { value: value as unknown as Prisma.InputJsonValue },
    create: { key, value: value as unknown as Prisma.InputJsonValue },
  });
}
