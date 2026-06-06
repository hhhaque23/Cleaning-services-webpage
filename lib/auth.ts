const COOKIE = "spectre_admin";
const TTL_SECONDS = 60 * 60 * 12; // 12 hours

// Admin secret resolution & launch safety:
//   - DEV  + no real ADMIN_PASSWORD  -> demo mode (any non-empty password works).
//   - PROD + no real ADMIN_PASSWORD  -> LOCKED: no login succeeds and no token is
//     accepted, instead of silently leaving the admin console wide open.
//   - real ADMIN_PASSWORD (>=4 chars) -> normal HMAC auth.
const DEMO_SECRET = "spectre-demo-secret-set-ADMIN_PASSWORD-to-lock";
const IS_PROD = process.env.NODE_ENV === "production";

function realSecret(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length >= 4 ? pw : null;
}

function getSecret(): string {
  return realSecret() ?? DEMO_SECRET;
}

/** Production with no configured ADMIN_PASSWORD: admin is fully closed. */
export function isLocked(): boolean {
  return IS_PROD && realSecret() === null;
}

/** Dev with no configured ADMIN_PASSWORD: any non-empty password works. */
export function isDemoMode(): boolean {
  return !IS_PROD && realSecret() === null;
}

async function hmac(message: string, key: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  const bytes = new Uint8Array(sig);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function makeSessionToken(): Promise<string> {
  const secret = getSecret();
  const expiry = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const sig = await hmac(String(expiry), secret);
  return `${expiry}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (isLocked()) return false; // never accept a token when admin is locked
  if (!token) return false;
  const secret = getSecret();
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmac(expStr, secret);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++)
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

export function checkPassword(input: string): boolean {
  if (isLocked()) return false; // prod + no ADMIN_PASSWORD => nobody gets in
  // Demo mode (dev only): anything non-empty is accepted.
  if (isDemoMode()) return input.length > 0;
  const secret = getSecret();
  if (input.length !== secret.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++)
    diff |= input.charCodeAt(i) ^ secret.charCodeAt(i);
  return diff === 0;
}

export const SESSION_COOKIE = COOKIE;
export const SESSION_TTL_SECONDS = TTL_SECONDS;
