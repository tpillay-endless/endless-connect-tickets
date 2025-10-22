// src/lib/ticketStore.ts
export type Store = { total: number; sold: number };

const DEFAULT: Store = { total: 110, sold: 0 }; // fallback if Upstash/env not present

const API = {
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
};

// Upstash GET /get/<key> returns: { result: string | null }
type UpstashGetResponse = { result: string | null };

export async function getStore(): Promise<Store> {
  // No env → fallback to in-memory defaults
  if (!API.url || !API.token) return DEFAULT;

  try {
    const r = await fetch(`${API.url}/get/tickets`, {
      headers: { Authorization: `Bearer ${API.token}` },
      cache: 'no-store',
    });
    if (!r.ok) return DEFAULT;

    const data = (await r.json()) as UpstashGetResponse;
    if (!data || data.result == null) return DEFAULT;

    // The value we stored is a JSON string (e.g. '{"total":110,"sold":50}')
    return JSON.parse(data.result) as Store;
  } catch {
    return DEFAULT;
  }
}

export async function setStore(data: Store) {
  if (!API.url || !API.token) return;

  // Upstash /set expects the raw value in the body; we store a JSON string.
  // Example: body = '"{\"total\":110,\"sold\":51}"'
  await fetch(`${API.url}/set/tickets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(JSON.stringify(data)),
  });
}