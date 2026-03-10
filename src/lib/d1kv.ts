import { getDatabase } from '@/lib/d1';

const TABLE_KV = 'app_kv';
const TABLE_SETS = 'app_sets';

const initPromises = new WeakMap<D1Database, Promise<void>>();

function ttlToExpiresAt(ttlSeconds?: number): number | null {
  if (!ttlSeconds || ttlSeconds <= 0) return null;
  return Math.floor(Date.now() / 1000) + ttlSeconds;
}

async function ensureSchema(db: D1Database) {
  let promise = initPromises.get(db);
  if (!promise) {
    promise = db.exec(`
      CREATE TABLE IF NOT EXISTS ${TABLE_KV} (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        expires_at INTEGER
      );

      CREATE INDEX IF NOT EXISTS idx_${TABLE_KV}_expires_at ON ${TABLE_KV}(expires_at);

      CREATE TABLE IF NOT EXISTS ${TABLE_SETS} (
        set_key TEXT NOT NULL,
        member TEXT NOT NULL,
        PRIMARY KEY (set_key, member)
      );

      CREATE INDEX IF NOT EXISTS idx_${TABLE_SETS}_set_key ON ${TABLE_SETS}(set_key);
    `).then(() => undefined);
    initPromises.set(db, promise);
  }
  await promise;
}

async function getReadyDb(): Promise<D1Database | null> {
  const db = await getDatabase();
  if (!db) return null;
  await ensureSchema(db);
  return db;
}

export async function kvSetJSON(key: string, value: unknown, ttlSeconds?: number) {
  const db = await getReadyDb();
  if (!db) return;
  const expiresAt = ttlToExpiresAt(ttlSeconds);
  await db
    .prepare(
      `INSERT INTO ${TABLE_KV} (key, value, expires_at) VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, expires_at = excluded.expires_at`
    )
    .bind(key, JSON.stringify(value), expiresAt)
    .run();
}

export async function kvGetJSON<T = unknown>(key: string): Promise<T | null> {
  const db = await getReadyDb();
  if (!db) return null;

  const row = await db
    .prepare(`SELECT value, expires_at FROM ${TABLE_KV} WHERE key = ? LIMIT 1`)
    .bind(key)
    .first<{ value: string; expires_at: number | null }>();

  if (!row) return null;

  const now = Math.floor(Date.now() / 1000);
  if (row.expires_at != null && row.expires_at <= now) {
    await db.prepare(`DELETE FROM ${TABLE_KV} WHERE key = ?`).bind(key).run();
    return null;
  }

  try {
    return JSON.parse(row.value) as T;
  } catch {
    return null;
  }
}

export async function kvDel(key: string) {
  const db = await getReadyDb();
  if (!db) return;
  await db.prepare(`DELETE FROM ${TABLE_KV} WHERE key = ?`).bind(key).run();
}

function toSqlLikePattern(pattern: string): string {
  return pattern.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_').replace(/\*/g, '%');
}

export async function kvKeys(pattern: string): Promise<string[]> {
  const db = await getReadyDb();
  if (!db) return [];
  const now = Math.floor(Date.now() / 1000);
  const sqlPattern = toSqlLikePattern(pattern);
  const rows = await db
    .prepare(
      `SELECT key FROM ${TABLE_KV}
       WHERE key LIKE ? ESCAPE '\\'
       AND (expires_at IS NULL OR expires_at > ?)`
    )
    .bind(sqlPattern, now)
    .all<{ key: string }>();

  return rows.results.map((row) => row.key);
}

export async function setAdd(setKey: string, member: string) {
  const db = await getReadyDb();
  if (!db) return;
  await db
    .prepare(`INSERT OR IGNORE INTO ${TABLE_SETS} (set_key, member) VALUES (?, ?)`)
    .bind(setKey, member)
    .run();
}

export async function setRemove(setKey: string, member: string) {
  const db = await getReadyDb();
  if (!db) return;
  await db
    .prepare(`DELETE FROM ${TABLE_SETS} WHERE set_key = ? AND member = ?`)
    .bind(setKey, member)
    .run();
}

export async function setMembers(setKey: string): Promise<string[]> {
  const db = await getReadyDb();
  if (!db) return [];
  const rows = await db
    .prepare(`SELECT member FROM ${TABLE_SETS} WHERE set_key = ?`)
    .bind(setKey)
    .all<{ member: string }>();
  return rows.results.map((row) => row.member);
}

