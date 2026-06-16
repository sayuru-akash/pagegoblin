import type { CategoryScores, GoblinComplaint, UsefulFix, PageRisk } from "@/lib/analysis";

export interface ReportPayload {
  report: {
    id: string;
    slug: string;
    url: string;
    normalizedUrl: string;
    domain: string;
    title?: string;
    metaDescription?: string;
    source: "WEB_URL" | "EXTENSION" | "MANUAL_SIGNALS";
    roastMode: "DETERMINISTIC" | "AI_ASSISTED" | "HYBRID";
    visibility: "PRIVATE" | "UNLISTED" | "PUBLIC";
    score: number;
    categoryScores: CategoryScores;
    biggestCrime: string;
    goblinComplaints: GoblinComplaint[];
    actuallyUsefulFixes: UsefulFix[];
    warnings: PageRisk[];
    verdict: string;
    summaryMarkdown: string;
    metrics: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
  };
  links: {
    report: string;
    api: string;
  };
}

export interface CreateRoastSuccess {
  ok: true;
  data: ReportPayload;
}

export interface CreateRoastError {
  ok: false;
  error: {
    status: number;
    message: string;
  };
}

export type CreateRoastResult = CreateRoastSuccess | CreateRoastError;

export interface ReportMetrics {
  categoryScores: CategoryScores;
  goblinComplaints: GoblinComplaint[];
  actuallyUsefulFixes: UsefulFix[];
  warnings: PageRisk[];
  analysisMetrics: Record<string, unknown>;
}
