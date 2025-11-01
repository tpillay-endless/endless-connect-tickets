import { COOKIE_NAME, readSessionFromCookie, deleteSession } from '@/lib/staff';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const sess = await readSessionFromCookie(cookie);
  if (sess) await deleteSession(sess.id);

  return new Response(JSON.stringify({ ok:true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `${COOKIE_NAME}=; Path=/tickets; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    },
  });
}