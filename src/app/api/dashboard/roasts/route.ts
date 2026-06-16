import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth-guards";
import { getUserRoasts } from "@/lib/dashboard/service";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  try {
    const data = await getUserRoasts(session.user.id, page);
    return NextResponse.json(data, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("Failed to fetch user roasts", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
