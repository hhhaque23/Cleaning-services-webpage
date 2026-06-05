import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  checkPassword,
  makeSessionToken,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeNext(raw: string): string {
  return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/admin";
}

// Relative Location → the browser resolves it against its own (public) origin,
// so this works behind Railway's proxy without building an absolute URL.
function redirectTo(location: string): NextResponse {
  return new NextResponse(null, { status: 303, headers: { Location: location } });
}

// Native HTML form POST (not fetch, not a Server Action). We set the session
// cookie on the SAME 303 response that redirects, so the browser commits the
// cookie and then follows the redirect to /admin WITH it — a plain, ordered,
// browser-native flow with no client-side navigation that could race the cookie.
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const password = form ? String(form.get("password") ?? "") : "";
  const next = safeNext(form ? String(form.get("next") ?? "/admin") : "/admin");

  if (!checkPassword(password)) {
    return redirectTo(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const res = redirectTo(next);
  res.cookies.set(SESSION_COOKIE, await makeSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
