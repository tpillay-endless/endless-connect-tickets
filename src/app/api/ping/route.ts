export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify({ ok: true, msg: 'pong' }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}