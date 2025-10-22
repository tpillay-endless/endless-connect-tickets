// src/lib/ticketStore.ts
export type Store = { total: number; sold: number };

const DEFAULT: Store = { total: 110, sold: 0 };

const API = {
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
};

type UpstashGetResponse = { result: string | null };

export async function getStore(): Promise<Store> {
  if (!API.url || !API.token) return DEFAULT;

  try {
    const r = await fetch(`${API.url}/get/tickets`, {
      headers: { Authorization: `Bearer ${API.token}` },
      cache: 'no-store',
    });
    if (!r.ok) return DEFAULT;

    const data = (await r.json()) as UpstashGetResponse;
    if (!data || data.result == null) return DEFAULT;

    const obj = JSON.parse(data.result) as Partial<Store>;
    // coerce to numbers in case the stored JSON has strings
    const total = Number(obj.total ?? DEFAULT.total);
    const sold  = Number(obj.sold  ?? DEFAULT.sold);
    return { total, sold };
  } catch {
    return DEFAULT;
  }
}

export async function setStore(data: Store) {
  if (!API.url || !API.token) return;
  await fetch(`${API.url}/set/tickets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API.token}`,
      'Content-Type': 'text/plain',           // <- text is safest
    },
    body: JSON.stringify(data),               // <- ONLY ONE stringify
  });
}