import { prisma } from "@/lib/db";
import type { ReportVisibility } from "@/generated/prisma/enums";

export interface DashboardRoast {
  id: string;
  slug: string;
  domain: string;
  title: string | null;
  score: number;
  biggestCrime: string;
  visibility: string;
  createdAt: string;
}

export interface DashboardStats {
  totalRoasts: number;
  averageScore: number;
  mostRoastedDomain: string | null;
}

export async function getUserRoasts(userId: string, page = 1, pageSize = 10) {
  const skip = (page - 1) * pageSize;
  const [roasts, total] = await Promise.all([
    prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        slug: true,
        domain: true,
        title: true,
        score: true,
        biggestCrime: true,
        visibility: true,
        createdAt: true,
      },
    }),
    prisma.report.count({ where: { userId } }),
  ]);

  return {
    roasts: roasts.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    })),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getUserStats(userId: string): Promise<DashboardStats> {
  const reports = await prisma.report.findMany({
    where: { userId },
    select: { score: true, domain: true },
  });

  if (reports.length === 0) {
    return { totalRoasts: 0, averageScore: 0, mostRoastedDomain: null };
  }

  const totalRoasts = reports.length;
  const averageScore = Math.round(
    reports.reduce((sum, r) => sum + r.score, 0) / totalRoasts
  );

  const domainCounts = new Map<string, number>();
  for (const r of reports) {
    domainCounts.set(r.domain, (domainCounts.get(r.domain) ?? 0) + 1);
  }
  let mostRoastedDomain: string | null = null;
  let maxCount = 0;
  for (const [domain, count] of domainCounts) {
    if (count > maxCount) {
      maxCount = count;
      mostRoastedDomain = domain;
    }
  }

  return { totalRoasts, averageScore, mostRoastedDomain };
}

export async function deleteReport(userId: string, slug: string) {
  const report = await prisma.report.findUnique({ where: { slug } });
  if (!report || report.userId !== userId) return null;
  await prisma.report.delete({ where: { id: report.id } });
  return true;
}

export async function updateReportVisibility(
  userId: string,
  slug: string,
  visibility: ReportVisibility
) {
  const report = await prisma.report.findUnique({ where: { slug } });
  if (!report || report.userId !== userId) return null;
  const updated = await prisma.report.update({
    where: { id: report.id },
    data: { visibility },
  });
  return updated;
}

export async function createShareLink(userId: string, slug: string) {
  const report = await prisma.report.findUnique({ where: { slug } });
  if (!report || report.userId !== userId) return null;

  const { randomBytes } = await import("node:crypto");
  const token = randomBytes(24).toString("base64url");

  const shareLink = await prisma.shareLink.create({
    data: {
      reportId: report.id,
      token,
      visibility: report.visibility as ReportVisibility,
    },
  });

  return { token: shareLink.token, reportSlug: report.slug };
}
