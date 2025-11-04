import { NextResponse } from 'next/server';
import { deleteTickets, listTickets } from '@/lib/ticketsDb';
import { readSessionFromCookie } from '@/lib/staff';
import { getStore, setStore } from '@/lib/ticketStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  const me = await readSessionFromCookie(req.headers.get('cookie') || undefined);
  if (!me || me.role !== 'admin') {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  type BulkDeleteBody = { tokens?: unknown };
  const body = (await req.json().catch(() => null)) as BulkDeleteBody | null;
  if (!body || !Array.isArray(body.tokens)) {
    return NextResponse.json({ ok: false, error: 'Missing tokens array' }, { status: 400 });
  }

  const tokens = (body.tokens as unknown[])
    .map((t) => (typeof t === 'string' ? t.trim() : ''))
    .filter(Boolean);

  if (!tokens.length) {
    return NextResponse.json({ ok: false, error: 'No tokens provided' }, { status: 400 });
  }

  await deleteTickets(tokens);
  try {
    const [store, remaining] = await Promise.all([getStore(), listTickets()]);
    await setStore({ total: store.total, sold: remaining.length });
  } catch (err) {
    console.error('[admin attendees] failed to sync store after bulk delete', err);
  }

  return NextResponse.json({ ok: true, removed: tokens.length });
}
