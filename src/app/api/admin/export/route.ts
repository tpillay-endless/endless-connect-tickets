import { NextResponse } from 'next/server';
import { readSessionFromCookie } from '@/lib/staff';
import { roleHasPermission } from '@/lib/staff/permissions';
import { listTickets, type TicketRecord } from '@/lib/ticketsDb';

function toCsvCell(v: unknown) {
  const s = v == null ? '' : String(v);
  // Escape quotes & wrap if needed
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function ticketsToCsv(rows: TicketRecord[]) {
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

  const url = new URL(req.url);
  const eventFilter = url.searchParams.get('event');
  const tickets = await listTickets();

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
