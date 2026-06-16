import { NextResponse } from "next/server";
import { getAppSettings } from "@/lib/admin/service";

export const runtime = "nodejs";

export async function GET() {
  try {
    const settings = await getAppSettings();
    return NextResponse.json({ aiAvailable: settings.aiModeEnabled === true }, {
      headers: { "Cache-Control": "public, s-maxage=300" },
    });
  } catch {
    return NextResponse.json({ aiAvailable: false });
  }
}
