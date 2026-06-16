import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-guards";
import { deleteReport, updateReportVisibility } from "@/lib/dashboard/service";
import { ReportVisibility } from "@/generated/prisma/enums";

export const runtime = "nodejs";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const { slug } = await context.params;
  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const result = await deleteReport(session.user.id, slug);
    if (!result) {
      return NextResponse.json(
        { error: "Report not found or not owned by you." },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.json(
      { success: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Failed to delete report", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const { slug } = await context.params;
  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  let body: { visibility?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  const vis = body.visibility;
  if (!vis || !Object.values(ReportVisibility).includes(vis as ReportVisibility)) {
    return NextResponse.json(
      { error: "Invalid visibility. Must be PRIVATE, UNLISTED, or PUBLIC." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const updated = await updateReportVisibility(
      session.user.id,
      slug,
      vis as ReportVisibility
    );
    if (!updated) {
      return NextResponse.json(
        { error: "Report not found or not owned by you." },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.json(
      { visibility: updated.visibility },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Failed to update visibility", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
