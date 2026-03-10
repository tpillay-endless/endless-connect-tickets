// src/lib/staff.ts
import { randomUUID } from 'crypto';
import type { StaffRole } from '@/lib/staff/permissions';
import { kvDel, kvGetJSON, kvSetJSON } from '@/lib/d1kv';

/** ---------- Staff types ---------- */
export type StaffUser = {
  id: string;
  name: string;
  nameLower: string;           // login key, case-insensitive
  role: StaffRole;
  passHash: string;            // base64
  salt: string;                // base64
  createdAt: string;
};
export type StaffSession = {
  id: string;
  userId: string;
  name: string;
  role: StaffRole;
  createdAt: string;
};

const SESSION_COOKIE = process.env.CHECKIN_SESSION_COOKIE || 'checkin_session';
const SESSION_TTL = Number(process.env.CHECKIN_SESSION_TTL || 60 * 60 * 12); // 12h

/** ---------- Store helpers ---------- */
export async function putStaffUser(user: StaffUser) {
  return kvSetJSON(`staff:user:${user.nameLower}`, user);
}
export async function getStaffUser(name: string): Promise<StaffUser | null> {
  return kvGetJSON<StaffUser>(`staff:user:${(name || '').toLowerCase().trim()}`);
}
export async function createSession(sess: StaffSession) {
  return kvSetJSON(`session:${sess.id}`, sess, SESSION_TTL);
}
export async function getSession(id: string) {
  return kvGetJSON<StaffSession>(`session:${id}`);
}
export async function deleteSession(id: string) {
  return kvDel(`session:${id}`);
}

/** ---------- Password hashing (salt + SHA-256) ---------- */
const enc = new TextEncoder();
function b64(buf: ArrayBuffer | Uint8Array) {
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = ''; for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return btoa(s);
}
function b64dec(s: string) {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function hashPassword(password: string, saltB64?: string) {
  const salt = saltB64 ? b64dec(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const data = new Uint8Array([...salt, ...enc.encode(password)]);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return { salt: b64(salt), hash: b64(digest) };
}
export async function verifyPassword(password: string, u: StaffUser) {
  const { hash } = await hashPassword(password, u.salt);
  return hash === u.passHash;
}

export async function upsertStaffUser(
  name: string,
  password: string,
  role: StaffRole
) {
  const nameLower = (name || '').toLowerCase().trim();
  const { salt, hash } = await hashPassword(password);
  const user: StaffUser = {
    id: randomUUID(),
    name,
    nameLower,
    role,
    passHash: hash,
    salt,
    createdAt: new Date().toISOString(),
  };
  await putStaffUser(user);
  return user;
}

/** ---------- Login / session helpers ---------- */
export async function loginStaff(name: string, password: string) {
  const user = await getStaffUser(name);
  if (!user) return { ok: false as const, error: 'User not found' };
  if (!(await verifyPassword(password, user))) return { ok: false as const, error: 'Invalid password' };
  const sess: StaffSession = {
    id: randomUUID(),
    userId: user.id,
    name: user.name,
    role: user.role,
    createdAt: new Date().toISOString(),
  };
  await createSession(sess);
  return { ok: true as const, session: sess };
}

export async function readSessionFromCookie(cookieHeader?: string) {
  if (!cookieHeader) return null;
  const safe = SESSION_COOKIE.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const m = cookieHeader.match(new RegExp(`${safe}=([^;]+)`));
  if (!m) return null;
  return getSession(m[1]);
}
export const COOKIE_NAME = SESSION_COOKIE;
