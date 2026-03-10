#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

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

  const baseUrl = ((args['base-url'] as string) || process.env.IMPORT_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const cookie = (args['cookie'] as string) || process.env.IMPORT_SESSION_COOKIE || '';
  if (!cookie) {
    console.error('❌ Missing session cookie. Set IMPORT_SESSION_COOKIE="checkin_session=..." or pass --cookie.');
    process.exit(1);
  }

  const endpoint = `${baseUrl}/tickets/api/admin/tickets/import`;
  const csvBytes = await fs.readFile(CSV_PATH);
  const form = new FormData();
  form.append('file', new Blob([csvBytes], { type: 'text/csv' }), path.basename(CSV_PATH));

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Cookie: cookie },
    body: form,
  });

  const bodyText = await res.text();
  if (!res.ok) {
    console.error(`❌ Import request failed (${res.status})`);
    console.error(bodyText);
    process.exit(1);
  }

  console.log(bodyText);
}

main().catch((err) => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});
