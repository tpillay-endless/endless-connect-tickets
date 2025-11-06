import { NextResponse } from 'next/server';
import { readSessionFromCookie } from '@/lib/staff';
import { roleHasPermission } from '@/lib/staff/permissions';
import { getTicket, putTicket, type TicketRecord } from '@/lib/ticketsDb';
import { buildTicketPngUrl, buildVCard, buildVCardSvgUrl } from '@/lib/qr';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function requireRebuildAccess(req: Request) {
  const session = await readSessionFromCookie(req.headers.get('cookie') || undefined);
  if (!session || !roleHasPermission(session.role, 'rebuildTickets')) {
    return null;
  }
  return session;
}

type RebuildTicketsBody = {
  tokens?: unknown;
};

export async function POST(req: Request) {
  const session = await requireRebuildAccess(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as RebuildTicketsBody | null;
  const tokens = Array.isArray(body?.tokens)
    ? Array.from(
        new Set(
          body!.tokens
            .map((token) => (typeof token === 'string' ? token.trim() : ''))
            .filter(Boolean)
        )
      )
    : [];

  if (!tokens.length) {
    return NextResponse.json(
      { ok: false, error: 'No attendee tokens provided.' },
      { status: 400 }
    );
  }

  const updatedTickets: TicketRecord[] = [];
  const failures: Array<{ token: string; error: string }> = [];

  for (const token of tokens) {
    const ticket = await getTicket(token);
    if (!ticket) {
      failures.push({ token, error: 'Ticket not found.' });
      continue;
    }
    try {
      const ticketPngUrl = buildTicketPngUrl(ticket.ticketUrl);
      const vcard = buildVCard(ticket.name, ticket.email, ticket.phone ?? '', ticket.company);
      const vcardSvgUrl = buildVCardSvgUrl(vcard);
      const updated = {
        ...ticket,
        ticketPngUrl,
        vcardSvgUrl,
        updatedAt: new Date().toISOString(),
      };
      await putTicket(token, updated);
      updatedTickets.push(updated);
    } catch (err) {
      console.error('[admin attendees] rebuild failed', err);
      failures.push({
        token,
        error: err instanceof Error ? err.message : 'Unable to rebuild ticket assets.',
      });
    }
  }

  const updated = updatedTickets.length;
  const errors = failures.length;
  const status = updated === 0 ? 500 : 200;
  const message = errors
    ? updated
      ? `Rebuilt ${updated} ticket${updated === 1 ? '' : 's'} with ${errors} error${errors === 1 ? '' : 's'}.`
      : 'Unable to rebuild ticket assets.'
    : `Rebuilt ${updated} ticket${updated === 1 ? '' : 's'}.`;

  return NextResponse.json(
    {
      ok: errors === 0,
      updated,
      errors,
      message,
      tickets: updatedTickets,
      failures: failures.length ? failures : undefined,
    },
    { status }
  );
}
