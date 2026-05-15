import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  checkPassword,
  isAuthConfigured,
  makeSessionToken,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the server." },
      { status: 503 }
    );
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const password = String(body.password ?? "");
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  const token = await makeSessionToken();
  if (!token)
    return NextResponse.json({ error: "Auth misconfigured" }, { status: 503 });

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return NextResponse.json({ ok: true });
}
