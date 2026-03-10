// src/lib/ticketsDb.ts
import { kvDel, kvGetJSON, kvKeys, kvSetJSON, setAdd, setMembers, setRemove } from '@/lib/d1kv';

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

const INDEX_KEY = 'tickets:index';

// Save one ticket under key ticket:<token>
export async function putTicket(token: string, data: TicketRecord) {
  await kvSetJSON(`ticket:${token}`, data);
}

// Read back a ticket by token
export async function getTicket(token: string): Promise<TicketRecord | null> {
  return kvGetJSON<TicketRecord>(`ticket:${token}`);
}

export async function addTicketToIndex(token: string) {
  await setAdd(INDEX_KEY, token);
}

export async function removeTicketFromIndex(token: string) {
  await setRemove(INDEX_KEY, token);
}

export async function listTickets(): Promise<TicketRecord[]> {
  let tokens = await setMembers(INDEX_KEY);
  if (!tokens.length) {
    const matched = await kvKeys('ticket:*');
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
  if (!tokens.length) return;
  for (const token of tokens) {
    await kvDel(`ticket:${token}`);
    await removeTicketFromIndex(token);
  }
}
