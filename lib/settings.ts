import postgres from "postgres";

// Tiny key/value settings store + the cleaners list (capacity = list length).
// Mirrors lib/bookings.ts: postgres-js via DATABASE_URL, with an in-memory
// fallback (globalThis singleton) for local/dev without a database.

const DATABASE_URL = process.env.DATABASE_URL;

let sql: ReturnType<typeof postgres> | null = null;
let schemaReady: Promise<void> | null = null;

function getSql() {
  if (!DATABASE_URL) return null;
  if (!sql) sql = postgres(DATABASE_URL, { prepare: false, max: 2 });
  return sql;
}

async function ensureSchema() {
  const client = getSql();
  if (!client) return;
  if (!schemaReady) {
    schemaReady = client`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `.then(() => undefined);
  }
  return schemaReady;
}

// In-memory fallback — stashed on globalThis so the singleton survives Next.js
// module duplication across route bundles. Lost on restart, by design.
const globalRef = globalThis as unknown as {
  __spectreSettings?: Map<string, string>;
};
const memory: Map<string, string> =
  globalRef.__spectreSettings ?? new Map<string, string>();
globalRef.__spectreSettings = memory;

export async function getSetting(key: string): Promise<string | null> {
  const client = getSql();
  if (client) {
    await ensureSchema();
    const rows = await client`SELECT value FROM settings WHERE key = ${key} LIMIT 1`;
    return (rows[0]?.value as string | undefined) ?? null;
  }
  return memory.get(key) ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const client = getSql();
  if (client) {
    await ensureSchema();
    await client`
      INSERT INTO settings (key, value, updated_at)
      VALUES (${key}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
    `;
    return;
  }
  memory.set(key, value);
}

const CLEANERS_KEY = "cleaners";
// Capacity must never be 0 (that would mark every slot booked-out and block all
// customer bookings before the owner ever opens Ops). Start with 2.
const DEFAULT_CLEANERS = ["Cleaner 1", "Cleaner 2"];
const MAX_CLEANERS = 20;

function normalize(names: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of names) {
    const name = String(raw).trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(name);
    if (out.length >= MAX_CLEANERS) break;
  }
  return out;
}

export async function getCleaners(): Promise<string[]> {
  const raw = await getSetting(CLEANERS_KEY);
  if (!raw) return [...DEFAULT_CLEANERS];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const names = normalize(parsed.map(String));
      return names.length ? names : [...DEFAULT_CLEANERS];
    }
  } catch {
    /* fall through to default */
  }
  return [...DEFAULT_CLEANERS];
}

export async function setCleaners(names: string[]): Promise<string[]> {
  const clean = normalize(names);
  // Never persist an empty list (would zero capacity); fall back to default.
  const toSave = clean.length ? clean : [...DEFAULT_CLEANERS];
  await setSetting(CLEANERS_KEY, JSON.stringify(toSave));
  return toSave;
}

export async function getCapacity(): Promise<number> {
  const cleaners = await getCleaners();
  return Math.max(1, cleaners.length);
}

export function isDbConfigured() {
  return Boolean(DATABASE_URL);
}
