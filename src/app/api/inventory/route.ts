import { getStore } from '@/lib/ticketStore';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const s = await getStore();
  const left = Math.max(s.total - s.sold, 0);
  return Response.json({ ...s, left });
}