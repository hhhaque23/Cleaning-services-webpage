import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const config = {
  // Admin pages (auth gate) + the two abuse-prone POST endpoints (rate limit).
  matcher: ["/admin/:path*", "/api/admin/login", "/api/bookings"],
};

// ---- Best-effort per-IP rate limiting --------------------------------------
// Fixed-window counter kept in memory on globalThis (per server instance).
// On Railway's single Node instance this is effective; if scaled horizontally
// it degrades to per-instance limiting, which is still a meaningful brake.
const WINDOW_MS = 60_000;
const LIMITS: Record<string, number> = {
  "/api/admin/login": 8, // brute-force brake on the admin password
  "/api/bookings": 20, // spam/flood brake on public booking creation
};

const store = globalThis as unknown as {
  __spectreRateLimit?: Map<string, { count: number; reset: number }>;
};
const buckets = store.__spectreRateLimit ?? new Map();
store.__spectreRateLimit = buckets;

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(pathname: string, ip: string, limit: number): boolean {
  const key = `${pathname}:${ip}`;
  const now = Date.now();
  const cur = buckets.get(key);
  if (!cur || now > cur.reset) {
    buckets.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  cur.count += 1;
  return cur.count > limit;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rate-limit the abuse-prone POST endpoints (fail open on any error).
  if (req.method === "POST" && pathname in LIMITS) {
    try {
      if (isRateLimited(pathname, clientIp(req), LIMITS[pathname])) {
        return NextResponse.json(
          { error: "Too many requests — please wait a minute and try again." },
          { status: 429, headers: { "Retry-After": "60" } }
        );
      }
    } catch {
      /* fail open — never block legitimate traffic on a limiter bug */
    }
    return NextResponse.next();
  }

  // Admin auth gate (unchanged behavior).
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (await verifySessionToken(token)) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
