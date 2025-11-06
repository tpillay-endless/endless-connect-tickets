import { NextResponse } from 'next/server';
import { listTickets } from '@/lib/ticketsDb';
import { readSessionFromCookie } from '@/lib/staff';
import { roleHasPermission } from '@/lib/staff/permissions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function forbidden() {
  return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
}

export async function GET(req: Request) {
  const me = await readSessionFromCookie(req.headers.get('cookie') || undefined);
  if (!me || !roleHasPermission(me.role, 'viewAttendeeList')) {
    return forbidden();
  }

  const tickets = await listTickets();
  tickets.sort((a, b) => {
    const aTime = new Date(a.createdAt || 0).getTime();
    const bTime = new Date(b.createdAt || 0).getTime();
    return bTime - aTime;
  });

  return NextResponse.json({
    ok: true,
    tickets,
    stats: {
      total: tickets.length,
      checkedIn: tickets.filter((t) => t.checkedIn).length,
    },
  });
}
