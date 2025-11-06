import { NextResponse } from 'next/server';
import { buildAllQR } from '@/lib/qr';
import { deleteTickets, getTicket, listTickets, putTicket } from '@/lib/ticketsDb';
import { readSessionFromCookie } from '@/lib/staff';
import { roleHasPermission } from '@/lib/staff/permissions';
import { getStore, setStore } from '@/lib/ticketStore';
import { resolveRequestOrigin } from '@/lib/origin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function requireManager(req: Request) {
  const me = await readSessionFromCookie(req.headers.get('cookie') || undefined);
  if (!me || !roleHasPermission(me.role, 'manageAttendees')) {
    return null;
  }
  return me;
}

type RouteContext = { params: Promise<{ token: string }> };

export async function PATCH(req: Request, context: RouteContext) {
  const session = await requireManager(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const { token } = await context.params;
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing token parameter' }, { status: 400 });
  }
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, email, phone, company } = body as Partial<{
    name: string;
    email: string;
    phone: string;
    company?: string;
  }>;

  if (!name || !email || !phone) {
    return NextResponse.json({ ok: false, error: 'Missing name, email, or phone' }, { status: 400 });
  }

  const existing = await getTicket(token);
  if (!existing) {
    return NextResponse.json({ ok: false, error: 'Ticket not found' }, { status: 404 });
  }

  const origin = resolveRequestOrigin(req);
  const qr = buildAllQR({
    origin,
    name,
    email,
    phone,
    company,
    event: existing.event,
    token,
  });

  const updated = {
    ...existing,
    name,
    email,
    phone,
    company,
    ticketUrl: qr.ticketUrl,
    ticketPngUrl: qr.ticketPngUrl,
    vcardSvgUrl: qr.vcardSvgUrl,
    updatedAt: new Date().toISOString(),
  };

  await putTicket(token, updated);

  return NextResponse.json({ ok: true, ticket: updated });
}

export async function DELETE(req: Request, context: RouteContext) {
  const session = await requireManager(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  const { token } = await context.params;
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing token parameter' }, { status: 400 });
  }
  await deleteTickets([token]);
  try {
    const [store, remaining] = await Promise.all([getStore(), listTickets()]);
    await setStore({ total: store.total, sold: remaining.length });
  } catch (err) {
    console.error('[admin attendees] failed to sync ticket store after delete', err);
  }
  return NextResponse.json({ ok: true, removed: [token] });
}
