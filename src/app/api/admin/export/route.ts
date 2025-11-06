import { NextResponse } from 'next/server';
import { readSessionFromCookie } from '@/lib/staff';
import { roleHasPermission } from '@/lib/staff/permissions';

type Ticket = {
  token: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  ticketUrl: string;
  createdAt: string;
  event: string;
  checkedIn?: boolean;
  checkedInAt?: string | null;
  checkIns?: number;
  vcardSvgUrl?: string;
  ticketPngUrl?: string;
};

const API = {
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
};

async function upstashJSON<T = unknown>(path: string): Promise<T | null> {
  const r = await fetch(`${API.url}${path}`, {
    headers: { Authorization: `Bearer ${API.token}` },
    cache: 'no-store',
  });
  if (!r.ok) return null;
  return r.json() as Promise<T>;
}

async function smembers(key: string): Promise<string[] | null> {
  const res = await upstashJSON<{ result: string[] }>(`/smembers/${encodeURIComponent(key)}`);
  return res?.result ?? null;
}


async function keys(pattern: string): Promise<string[]> {
  const res = await upstashJSON<{ result: string[] }>(`/keys/${encodeURIComponent(pattern)}`);
  return res?.result ?? [];
}

async function getJSON<T = unknown>(key: string): Promise<T | null> {
  const res = await upstashJSON<{ result: string | null }>(`/get/${encodeURIComponent(key)}`);
  const str = res?.result ?? null;
  if (!str) return null;
  try { return JSON.parse(str) as T; } catch { return null; }
}

function toCsvCell(v: unknown) {
  const s = v == null ? '' : String(v);
  // Escape quotes & wrap if needed
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function ticketsToCsv(rows: Ticket[]) {
  const headers = [
    'token','name','email','phone','company',
    'checkedIn','checkedInAt','checkIns',
    'event','createdAt','ticketUrl',
    'vcardSvgUrl','ticketPngUrl'
  ];
  const lines = [headers.join(',')];
  for (const t of rows) {
    lines.push([
      t.token, t.name, t.email, t.phone || '', t.company || '',
      t.checkedIn ? 'yes' : 'no', t.checkedInAt || '', t.checkIns ?? 0,
      t.event, t.createdAt, t.ticketUrl,
      t.vcardSvgUrl || '', t.ticketPngUrl || ''
    ].map(toCsvCell).join(','));
  }
  return lines.join('\r\n');
}

export async function GET(req: Request) {
  // Auth: admins and super admins
  const me = await readSessionFromCookie(req.headers.get('cookie') || undefined);
  if (!me || !roleHasPermission(me.role, 'importExportTickets')) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  if (!API.url || !API.token) {
    return NextResponse.json({ ok: false, error: 'Storage not configured' }, { status: 500 });
  }

  const url = new URL(req.url);
  const eventFilter = url.searchParams.get('event');

  // Prefer the index
  let tokens = await smembers('tickets:index');
  // Fallback: KEYS ticket:* (dataset is small, safe and fast here)
  if (!tokens || tokens.length === 0) {
    const matched = await keys('ticket:*'); // ["ticket:uuid", ...]
    tokens = matched.map(k => k.replace(/^ticket:/, ''));
  }

  // Fetch tickets
  const tickets: Ticket[] = [];
  for (const token of tokens) {
    const data = await getJSON<Ticket>(`ticket:${token}`);
    if (data) {
      tickets.push(data as Ticket);
    }
  }

  const filtered = eventFilter ? tickets.filter(t => t.event === eventFilter) : tickets;
  const csv = ticketsToCsv(filtered);
  const filename = `endless-connect-attendees-${new Date().toISOString().slice(0,10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
