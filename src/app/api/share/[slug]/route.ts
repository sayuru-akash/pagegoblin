import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-guards";
import { createShareLink } from "@/lib/dashboard/service";

export const runtime = "nodejs";

export async function POST(
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

  try {
    const result = await createShareLink(session.user.id, slug);
    if (!result) {
      return NextResponse.json(
        { error: "Report not found or not owned by you." },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const baseUrl = request.nextUrl.origin;
    const url = `${baseUrl}/shared/${result.token}`;

    return NextResponse.json(
      { token: result.token, url },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Failed to create share link", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
