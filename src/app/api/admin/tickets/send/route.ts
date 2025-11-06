import { NextResponse } from 'next/server';
import { readSessionFromCookie } from '@/lib/staff';
import { roleHasPermission } from '@/lib/staff/permissions';
import { getTicket } from '@/lib/ticketsDb';
import { sendTicketEmail } from '@/lib/sendgrid';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function requireTicketSender(req: Request) {
  const session = await readSessionFromCookie(req.headers.get('cookie') || undefined);
  if (!session || !roleHasPermission(session.role, 'sendTickets')) {
    return null;
  }
  return session;
}

type SendTicketsBody = {
  tokens?: unknown;
};

export async function POST(req: Request) {
  const session = await requireTicketSender(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as SendTicketsBody | null;
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

  let sent = 0;
  const failures: Array<{ token: string; error: string }> = [];

  for (const token of tokens) {
    const ticket = await getTicket(token);
    if (!ticket) {
      failures.push({ token, error: 'Ticket not found.' });
      continue;
    }
    const result = await sendTicketEmail(ticket);
    if (!result.ok) {
      failures.push({ token, error: result.error || 'Unknown error.' });
      continue;
    }
    sent += 1;
  }

  const errors = failures.length;
  const message = errors
    ? sent
      ? `Sent ${sent} ticket${sent === 1 ? '' : 's'} with ${errors} error${errors === 1 ? '' : 's'}.`
      : 'Unable to send tickets. Check your SendGrid configuration and try again.'
    : `Sent ${sent} ticket${sent === 1 ? '' : 's'}.`;

  const status = sent === 0 ? 500 : 200;

  return NextResponse.json(
    {
      ok: errors === 0,
      sent,
      errors,
      message,
      failures: failures.length ? failures : undefined,
    },
    { status }
  );
}
