import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Allow extension connections from Chrome Web Store + our own origin
  const origin = request.headers.get("origin");
  if (origin) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      origin
    );
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  // Rate limit info on API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("X-RateLimit-Limit", "10");
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static assets
    "/((?!_next/static|_next/image|favicon.ico|favicon.svg|goblin.svg|goblin-mark.svg|og-default.svg).*)",
  ],
};
