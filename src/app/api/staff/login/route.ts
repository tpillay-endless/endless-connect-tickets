import { COOKIE_NAME, loginStaff } from '@/lib/staff';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    type LoginBody = { name?: string; password?: string };
    const body = (await req.json().catch(() => ({}))) as LoginBody;
    const { name, password } = body;
    if (!name || !password) {
      return Response.json({ ok: false, error: 'Missing name or password' }, { status: 400 });
    }

    const out = await loginStaff(name, password);
    if (!out.ok) {
      console.warn('[login] Failed for user:', name);
      // clear any existing cookie if login fails
      return new Response(JSON.stringify(out), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `${COOKIE_NAME}=; Path=/tickets; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
        },
      });
    }

    console.log('[login] Success for user:', out.session.name);

    return new Response(JSON.stringify({ ok: true, user: { name: out.session.name, role: out.session.role } }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `${COOKIE_NAME}=${out.session.id}; Path=/tickets; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 12}`,
      },
    });
  } catch (err) {
    console.error('[login] unexpected error', err);
    return Response.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
