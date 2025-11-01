import { readSessionFromCookie } from '@/lib/staff';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
  const sess = await readSessionFromCookie(req.headers.get('cookie') || undefined);

  if (!sess) {
    return new Response(JSON.stringify({ ok: false, error: 'No active session' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      user: {
        name: sess.name,
        role: sess.role,
        createdAt: sess.createdAt,
      },
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}