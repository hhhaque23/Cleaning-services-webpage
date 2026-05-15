const COOKIE = "pristine_admin";
const TTL_SECONDS = 60 * 60 * 12; // 12 hours

// When ADMIN_PASSWORD is unset we run in DEMO mode: any non-empty password
// works. Tokens are still signed (with this constant) so direct admin URL
// access without going through /admin/login still gets bounced to login.
const DEMO_SECRET = "pristine-demo-secret-set-ADMIN_PASSWORD-to-lock";

function getSecret(): string {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length >= 4 ? pw : DEMO_SECRET;
}

export function isDemoMode(): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  return !(pw && pw.length >= 4);
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
  // Demo mode: anything non-empty is accepted.
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
