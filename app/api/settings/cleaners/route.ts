import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getCleaners, setCleaners } from "@/lib/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const cleaners = await getCleaners();
  return NextResponse.json({ cleaners, capacity: Math.max(1, cleaners.length) });
}

export async function PUT(req: Request) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const names = Array.isArray(body.names) ? body.names.map(String) : [];
  const cleaners = await setCleaners(names);
  return NextResponse.json({ cleaners, capacity: Math.max(1, cleaners.length) });
}
