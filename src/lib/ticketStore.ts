// src/lib/ticketStore.ts
import { kvGetJSON, kvSetJSON } from '@/lib/d1kv';

export type Store = { total: number; sold: number };

const DEFAULT: Store = { total: 110, sold: 0 };

export async function getStore(): Promise<Store> {
  try {
    const obj = await kvGetJSON<Partial<Store>>('tickets');
    if (!obj) return DEFAULT;
    // coerce to numbers in case the stored JSON has strings
    const total = Number(obj.total ?? DEFAULT.total);
    const sold  = Number(obj.sold  ?? DEFAULT.sold);
    return { total, sold };
  } catch {
    return DEFAULT;
  }
}

export async function setStore(data: Store) {
  await kvSetJSON('tickets', data);
}
