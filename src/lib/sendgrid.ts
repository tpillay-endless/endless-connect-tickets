import { buildTicketPngUrl } from '@/lib/qr';
import type { TicketRecord } from '@/lib/ticketsDb';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_TEMPLATE_ID =
  process.env.SENDGRID_TICKET_TEMPLATE_ID || 'SENDGRID_TEMPLATE_ID_PLACEHOLDER';
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'tickets@example.com';
const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Endless Connect';

export type SendTicketEmailResult = {
  ok: boolean;
  error?: string;
};

function extractFirstName(fullName: string) {
  const trimmed = fullName?.trim();
  if (!trimmed) return 'there';
  const [first] = trimmed.split(/\s+/);
  return first || 'there';
}

function ensureTicketPngUrl(ticket: TicketRecord) {
  if (ticket.ticketPngUrl) return ticket.ticketPngUrl;
  try {
    return buildTicketPngUrl(ticket.ticketUrl);
  } catch {
    return ticket.ticketUrl;
  }
}

export async function sendTicketEmail(ticket: TicketRecord): Promise<SendTicketEmailResult> {
  if (!ticket.email) {
    return { ok: false, error: 'Ticket is missing an email address.' };
  }

  if (!SENDGRID_API_KEY) {
    return { ok: false, error: 'SendGrid API key not configured.' };
  }

  if (!SENDGRID_TEMPLATE_ID || SENDGRID_TEMPLATE_ID === 'SENDGRID_TEMPLATE_ID_PLACEHOLDER') {
    return { ok: false, error: 'SendGrid template ID not configured.' };
  }

  const payload = {
    personalizations: [
      {
        to: [{ email: ticket.email, name: ticket.name }],
        dynamic_template_data: {
          firstName: extractFirstName(ticket.name),
          fullName: ticket.name,
          email: ticket.email,
          company: ticket.company ?? '',
          ticketUrl: ticket.ticketUrl,
          ticketPngUrl: ensureTicketPngUrl(ticket),
          event: ticket.event,
        },
      },
    ],
    from: {
      email: SENDGRID_FROM_EMAIL,
      name: SENDGRID_FROM_NAME,
    },
    template_id: SENDGRID_TEMPLATE_ID,
  };

  try {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      const message = errorText
        ? `SendGrid responded with ${res.status}: ${errorText}`
        : `SendGrid responded with status ${res.status}.`;
      return { ok: false, error: message };
    }

    return { ok: true };
  } catch (err) {
    console.error('[sendgrid] request failed', err);
    return { ok: false, error: 'Failed to reach SendGrid API.' };
  }
}

