import Papa from 'papaparse';
import { NextResponse } from 'next/server';
import { buildAllQR } from '@/lib/qr';
import { addTicketToIndex, putTicket, type TicketRecord } from '@/lib/ticketsDb';
import { readSessionFromCookie } from '@/lib/staff';
import { roleHasPermission } from '@/lib/staff/permissions';
import { getStore, setStore } from '@/lib/ticketStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type NormalizedRow = {
  name: string;
  email: string;
  phone: string;
  company?: string;
};

function normalizeRow(row: Record<string, unknown>): NormalizedRow | null {
  const entries = Object.entries(row || {}).reduce<Record<string, string>>((acc, [key, value]) => {
    const val = typeof value === 'string' ? value.trim() : '';
    if (!key) return acc;
    acc[key.toLowerCase()] = val;
    return acc;
  }, {});

  const name = entries['name'] || entries['full name'] || '';
  const email = entries['email'] || '';
  const phone = entries['phone'] || entries['phone number'] || '';
  const company = entries['company'] || entries['organisation'] || entries['organization'] || '';

  if (!name || !email || !phone) {
    return null;
  }

  return { name, email, phone, company: company || undefined };
}

export async function POST(req: Request) {
  const me = await readSessionFromCookie(req.headers.get('cookie') || undefined);
  if (!me || !roleHasPermission(me.role, 'importExportTickets')) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ ok: false, error: 'Expected multipart/form-data' }, { status: 400 });
  }

  const form = await req.formData();
  const file = form.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Missing CSV file' }, { status: 400 });
  }

  const csvText = await file.text();
  if (!csvText.trim()) {
    return NextResponse.json({ ok: false, error: 'Empty CSV file' }, { status: 400 });
  }

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: 'greedy',
  });

  if (parsed.errors?.length) {
    return NextResponse.json(
      { ok: false, error: parsed.errors.map((e) => e.message).join('; ') },
      { status: 400 }
    );
  }

  const { origin } = new URL(req.url);
  const inserted: TicketRecord[] = [];
  const errors: Array<{ row: number; error: string }> = [];

  for (let index = 0; index < parsed.data.length; index++) {
    const row = parsed.data[index] as Record<string, unknown>;
    const normalized = normalizeRow(row);
    if (!normalized) {
      errors.push({ row: index + 2, error: 'Missing name, email, or phone' }); // +2 for header + 1-index
      continue;
    }

    try {
      const createdAt = new Date().toISOString();
      const { token, ticketUrl, ticketPngUrl, vcardSvgUrl } = buildAllQR({
        origin,
        name: normalized.name,
        email: normalized.email,
        phone: normalized.phone,
        company: normalized.company,
        event: 'single',
      });

      const record: TicketRecord = {
        token,
        name: normalized.name,
        email: normalized.email,
        phone: normalized.phone,
        company: normalized.company,
        ticketUrl,
        ticketPngUrl,
        vcardSvgUrl,
        createdAt,
        event: 'single',
      };

      await putTicket(token, record);
      await addTicketToIndex(token);
      inserted.push(record);
    } catch (err: unknown) {
      console.error('[tickets import] failed for row', index + 2, err);
      errors.push({ row: index + 2, error: 'Failed to import row' });
    }
  }

  if (inserted.length) {
    const store = await getStore();
    await setStore({
      total: store.total,
      sold: store.sold + inserted.length,
    });
  }

  return NextResponse.json({
    ok: true,
    imported: inserted.length,
    errors,
    tickets: inserted,
  });
}
