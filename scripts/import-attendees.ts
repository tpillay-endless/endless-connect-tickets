#!/usr/bin/env node
// (keep your existing imports)
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import Papa from 'papaparse';
import fetch from 'node-fetch';

// --- load env early ---
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

// ---------- CONFIG ----------
const REDIS_URL   = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
if (!REDIS_URL || !REDIS_TOKEN) {
  console.error('❌ Missing UPSTASH_REDIS_REST_URL or _TOKEN in env');
  process.exit(1);
}

// If you moved QR helpers into a shared module, import them:
import { buildAllQR } from '../src/lib/qr';

// ---------- small helpers (same as before) ----------
async function upstashSetJSON(key: string, value: unknown) {
  const url = `${REDIS_URL}/set/${encodeURIComponent(key)}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'text/plain' },
    body: JSON.stringify(value),
  });
  if (!r.ok) throw new Error(`SET ${key} failed ${r.status}`);
}
async function upstashSAdd(key: string, member: string) {
  const url = `${REDIS_URL}/sadd/${encodeURIComponent(key)}/${encodeURIComponent(member)}`;
  const r = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${REDIS_TOKEN}` } });
  if (!r.ok) throw new Error(`SADD ${key} failed ${r.status}`);
}
function parseCSV(text: string) {
  const { data, errors } = Papa.parse(text, { header: true, skipEmptyLines: true });
  if (errors?.length) console.warn('CSV warnings:', errors.slice(0, 3));
  return data as Array<Record<string, string>>;
}
function normalizeUSPhone(raw?: string) {
  if (!raw) return { phoneE164: '', phoneRaw: '' };
  const s = String(raw).trim();
  const phoneRaw = s;

  // If it's already +1XXXXXXXXXX (with optional spaces), keep it.
  const compact = s.replace(/\s+/g, '');
  if (/^\+1\d{10}$/.test(compact)) {
    return { phoneE164: compact, phoneRaw };
  }

  // Strip everything non-digit.
  let digits = s.replace(/\D+/g, '');

  // 10 digits -> assume US.
  if (digits.length === 10) {
    return { phoneE164: `+1${digits}`, phoneRaw };
  }

  // 11 digits that start with '1' -> assume US with leading country code.
  if (digits.length === 11 && digits.startsWith('1')) {
    return { phoneE164: `+${digits}`, phoneRaw };
  }

  // Fallback: if it looks like a plausible international number, keep compacted version.
  if (/^\+\d{7,15}$/.test(compact)) {
    return { phoneE164: compact, phoneRaw };
  }

  // Otherwise, return no E.164 but preserve raw input.
  return { phoneE164: '', phoneRaw };
}

// ---------- MAIN (wrap all awaits here) ----------
async function main() {
  const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => {
    if (!a.startsWith('--')) return [];
    const k = a.slice(2);
    const v = all[i + 1]?.startsWith('--') ? true : all[i + 1];
    return [k, v ?? true];
  })) as Record<string, string | boolean>;

  const CSV_PATH = args['from-file'] as string | undefined;
  if (!CSV_PATH) {
    console.error('Usage: npm run import-attendees -- --from-file ./csv/hubspot.csv');
    process.exit(1);
  }

  const EVENT_CODE = process.env.EVENT_CODE || 'single';
  const ORIGIN = 'https://connect.endlessbiotech.com';

  const csvText = await fs.readFile(CSV_PATH, 'utf8');
  const rows = parseCSV(csvText);

  let ok = 0, fail = 0;
  for (const row of rows) {
    const name = ((row['Full Name'] || `${row['First Name'] || ''} ${row['Last Name'] || ''}`) as string).trim();
    const email = ((row['Email Address'] || row['Email'] || row['Email address']) as string || '').trim();
    const phoneIn = ((row['Phone Number'] || row['Phone'] || row['Mobile Phone']) as string || '').trim();
    const company = ((row['Company'] || row['Company Name']) as string || '').trim();

    if (!name || !email) { fail++; continue; }

    const { phoneE164, phoneRaw } = normalizeUSPhone(phoneIn);

    const fullPhone = phoneE164 || phoneRaw || '';
    const { token, ticketUrl, ticketPngUrl, vcardSvgUrl } = buildAllQR({
      origin: ORIGIN,
      name,
      email,
      phone: fullPhone,
      company,
      event: EVENT_CODE,
    });

    const record = {
      token, name, email,
      phone: fullPhone,
      phoneRaw, phoneE164,
      company,
      ticketUrl,
      createdAt: new Date().toISOString(),
      event: EVENT_CODE,
      checkedIn: false,
      checkedInAt: null as string | null,
      checkIns: 0,
      vcardSvgUrl,
      ticketPngUrl,
    };

    try {
      await upstashSetJSON(`ticket:${token}`, record);
      await upstashSAdd('tickets:index', token);
      ok++;
    } catch (e: any) {
      console.error('❌ write failed for', email, e?.message || e);
      fail++;
    }
  }

  console.log(`✅ Imported ${ok} attendees, ❌ ${fail} failed`);
}

// run it
main().catch((err) => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});