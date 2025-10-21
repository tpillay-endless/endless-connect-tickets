import { store } from '@/lib/ticketStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST() {
  store.sold += 1;
  const left = Math.max(store.total - store.sold, 0);

  return new Response(JSON.stringify({
    ok: true,
    total: store.total,
    sold: store.sold,
    left
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}