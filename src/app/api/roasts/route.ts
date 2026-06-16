import { NextRequest, NextResponse } from "next/server";
import { createRoastReport } from "@/lib/reports";
import type { CreateRoastResult } from "@/lib/reports/types";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = rateLimit(`roasts:post:${ip}`, 10, 60_000);

  if (!rl.success) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(rl.resetAt).toISOString(),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  let result: CreateRoastResult;
  try {
    result = await createRoastReport(body);
  } catch (err) {
    console.error("Failed to create roast report", err);
    return NextResponse.json(
      { error: "Something went wrong while creating the roast." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error.message },
      {
        status: result.error.status,
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Remaining": String(rl.remaining),
        },
      }
    );
  }

  return NextResponse.json(result.data, {
    status: 201,
    headers: {
      "Cache-Control": "no-store",
      "X-RateLimit-Remaining": String(rl.remaining),
    },
  });
}
