import { getStore, setStore } from '@/lib/ticketStore';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST() {
  const s = await getStore();
  const updated = { ...s, sold: s.sold + 1 };
  await setStore(updated);
  const left = Math.max(updated.total - updated.sold, 0);
  return Response.json({ ...updated, left });
}