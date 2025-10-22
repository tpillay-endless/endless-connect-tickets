// src/lib/ticketStore.ts
export type Store = { total: number; sold: number };

const API = {
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
};

export async function getStore(): Promise<Store> {
  if (!API.url || !API.token)
    return { total: 110, sold: 0 }; // fallback to memory
  try {
    const r = await fetch(`${API.url}/get/tickets`, {
      headers: { Authorization: `Bearer ${API.token}` },
    });
    const data = await r.json();
    return data.result ? JSON.parse(data.result) : { total: 110, sold: 0 };
  } catch {
    return { total: 110, sold: 0 };
  }
}

export async function setStore(data: Store) {
  if (!API.url || !API.token) return;
  await fetch(`${API.url}/set/tickets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(JSON.stringify(data)),
  });
}