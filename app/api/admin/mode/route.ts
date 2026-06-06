import { NextResponse } from "next/server";
import { isDemoMode, isLocked } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ demo: isDemoMode(), locked: isLocked() });
}
