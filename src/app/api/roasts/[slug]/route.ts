import { NextRequest, NextResponse } from "next/server";
import { getReportBySlug } from "@/lib/reports";
import type { ReportPayload } from "@/lib/reports/types";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!slug || typeof slug !== "string") {
    return NextResponse.json(
      { error: "Missing slug." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  let report: ReportPayload | null;
  try {
    report = await getReportBySlug(slug);
  } catch (err) {
    console.error("Failed to fetch roast report", err);
    return NextResponse.json(
      { error: "Something went wrong while fetching the report." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!report) {
    return NextResponse.json(
      { error: "Report not found." },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(report, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });
}
