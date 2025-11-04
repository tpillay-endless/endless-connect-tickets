import { getStore, setStore } from '@/lib/ticketStore';
import { putTicket, type TicketRecord, addTicketToIndex } from '@/lib/ticketsDb';
import { buildAllQR } from '@/lib/qr';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  type RegisterBody = { name?: string; email?: string; phone?: string; company?: string };
  const body = (await req.json().catch(() => ({}))) as RegisterBody;
  const { name, email, phone, company } = body;
  if (!name || !email || !phone) {
    return Response.json({ ok:false, error:'Missing name, email, or phone' }, { status: 400 });
  }

  const { origin } = new URL(req.url);
  const { token, ticketUrl, ticketPngUrl, vcardSvgUrl } = buildAllQR({
    origin, name, email, phone, company, event: 'single'
  });

  const record: TicketRecord = {
    token, name, email, phone, company, ticketUrl,
    createdAt: new Date().toISOString(),
    event: 'single',
    vcardSvgUrl,
    ticketPngUrl,
  };
  await putTicket(token, record);

  // index for export
  await addTicketToIndex(token);

  const s = await getStore();
  const updated = { ...s, sold: s.sold + 1 };
  await setStore(updated);
  const left = Math.max(updated.total - updated.sold, 0);

  return Response.json({
    ok: true,
    total: updated.total,
    sold: updated.sold,
    left,
    token,
    ticketUrl,
    ticketPngUrl,
    vcardSvgUrl,
  });
}
