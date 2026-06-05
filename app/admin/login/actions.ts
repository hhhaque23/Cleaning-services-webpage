"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  checkPassword,
  makeSessionToken,
} from "@/lib/auth";

function safeNext(raw: string): string {
  return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/admin";
}

// Sets the session cookie AND redirects in one server response, so the browser
// follows the redirect WITH the just-set cookie (no client-side set-cookie /
// navigate race — that race is what bounced users back to the login screen).
export async function signIn(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/admin"));

  if (!checkPassword(password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  cookies().set(SESSION_COOKIE, await makeSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  redirect(next);
}
