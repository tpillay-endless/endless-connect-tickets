// src/lib/ticketsDb.ts
export type TicketRecord = {
  token: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  ticketUrl: string;
  createdAt: string;
  event: string; // "single" for now
  checkedIn?: boolean;
  checkedInAt?: string | null;
  checkIns?: number; // times toggled on
  vcardSvgUrl?: string;
  ticketPngUrl?: string;
  updatedAt?: string;
};

const API = {
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
};

const INDEX_KEY = 'tickets:index';

async function upstashJSON<T = any>(path: string): Promise<T | null> {
  if (!API.url || !API.token) return null;
  const r = await fetch(`${API.url}${path}`, {
    headers: { Authorization: `Bearer ${API.token}` },
    cache: 'no-store',
  });
  if (!r.ok) return null;
  try {
    return (await r.json()) as T;
  } catch (err) {
    console.error('[ticketsDb] Failed to parse Upstash JSON', err);
    return null;
  }
}

async function upstashText(path: string, body?: string) {
  if (!API.url || !API.token) return;
  await fetch(`${API.url}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API.token}`,
      'Content-Type': body ? 'text/plain' : 'application/json',
    },
    body,
  });
}

async function kvSetRaw(key: string, value: unknown) {
  if (!API.url || !API.token) return;
  await fetch(`${API.url}/set/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API.token}`,
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(value),
  });
}

async function kvGetRaw<T>(key: string): Promise<T | null> {
  const res = await upstashJSON<{ result: string | null }>(`/get/${encodeURIComponent(key)}`);
  const raw = res?.result;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function smembers(key: string): Promise<string[]> {
  const res = await upstashJSON<{ result: string[] }>(`/smembers/${encodeURIComponent(key)}`);
  return res?.result ?? [];
}

async function keys(pattern: string): Promise<string[]> {
  const res = await upstashJSON<{ result: string[] }>(`/keys/${encodeURIComponent(pattern)}`);
  return res?.result ?? [];
}

async function delKey(key: string) {
  if (!API.url || !API.token) return;
  await fetch(`${API.url}/del/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API.token}` },
  });
}

// Save one ticket under key ticket:<token>
export async function putTicket(token: string, data: TicketRecord) {
  if (!API.url || !API.token) return; // local dev with no env → skip persistence
  await kvSetRaw(`ticket:${token}`, data);
}

// Read back a ticket by token
export async function getTicket(token: string): Promise<TicketRecord | null> {
  if (!API.url || !API.token) return null;
  return kvGetRaw<TicketRecord>(`ticket:${token}`);
}

export async function addTicketToIndex(token: string) {
  if (!API.url || !API.token) return;
  await upstashText(
    `/sadd/${encodeURIComponent(INDEX_KEY)}/${encodeURIComponent(token)}`
  );
}

export async function removeTicketFromIndex(token: string) {
  if (!API.url || !API.token) return;
  await upstashText(
    `/srem/${encodeURIComponent(INDEX_KEY)}/${encodeURIComponent(token)}`
  );
}

export async function listTickets(): Promise<TicketRecord[]> {
  if (!API.url || !API.token) return [];

  let tokens = await smembers(INDEX_KEY);
  if (!tokens.length) {
    const matched = await keys('ticket:*');
    tokens = matched.map((key) => key.replace(/^ticket:/, ''));
  }

  if (!tokens.length) return [];

  const records: TicketRecord[] = [];
  for (const token of tokens) {
    const ticket = await getTicket(token);
    if (ticket) records.push(ticket);
  }
  return records;
}

export async function deleteTickets(tokens: string[]) {
  if (!API.url || !API.token || !tokens.length) return;
  for (const token of tokens) {
    await delKey(`ticket:${token}`);
    await removeTicketFromIndex(token);
  }
}
