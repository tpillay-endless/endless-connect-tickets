import { store } from '@/lib/ticketStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const left = Math.max(store.total - store.sold, 0);

  return new Response(JSON.stringify({
    total: store.total,
    sold: store.sold,
    left,
    last_update: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}