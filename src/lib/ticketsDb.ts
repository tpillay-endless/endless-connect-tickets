// src/lib/ticketsDb.ts
export type TicketRecord = {
  token: string;
  name: string;
  email: string;
  phone?: string;
  ticketUrl: string;
  createdAt: string;
  event: string; // "single" for now
  checkedIn?: boolean;
  checkedInAt?: string | null;
  checkIns?: number; // times toggled on
  vcardSvgUrl?: string;
  ticketPngUrl?: string;
};

const API = {
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
};

// Save one ticket under key ticket:<token>
export async function putTicket(token: string, data: TicketRecord) {
  if (!API.url || !API.token) return; // local dev with no env → skip persistence
  await fetch(`${API.url}/set/ticket:${token}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API.token}`,
      'Content-Type': 'text/plain', // important: store the raw JSON string
    },
    body: JSON.stringify(data),
  });
}

// Read back a ticket by token
export async function getTicket(token: string): Promise<TicketRecord | null> {
  if (!API.url || !API.token) return null;
  const r = await fetch(`${API.url}/get/ticket:${token}`, {
    headers: { Authorization: `Bearer ${API.token}` },
    cache: 'no-store',
  });
  if (!r.ok) return null;
  const j = (await r.json()) as { result: string | null };
  if (!j.result) return null;
  try { return JSON.parse(j.result) as TicketRecord; } catch { return null; }
}