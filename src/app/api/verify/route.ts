import { getTicket, putTicket } from '@/lib/ticketsDb';
import { readSessionFromCookie } from '@/lib/staff';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Action = 'status' | 'checkin' | 'undo';

type Body = { token?: string; action?: Action; key?: string };

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

// Helper: allow staff session or fallback key auth
async function isAuthorized(req: Request, providedKey?: string) {
  const sess = await readSessionFromCookie(req.headers.get('cookie') || undefined);
  if (sess) return true;

  const adminToken = process.env.CHECKIN_TOKEN;
  if (!adminToken) return false;

  // Try provided body key or ?key=
  if (providedKey === adminToken) return true;
  try {
    const qk = new URL(req.url).searchParams.get('key');
    if (qk === adminToken) return true;
  } catch {}
  return false;
}

async function handle(req: Request, { token, action = 'status', key }: { token?: string; action?: Action; key?: string }) {
  if (!token) return json({ ok: false, error: 'Missing token' }, 400);

  const needsAuth = action === 'checkin' || action === 'undo';
  if (needsAuth && !(await isAuthorized(req, key))) {
    return json({ ok: false, error: 'Unauthorized' }, 401);
  }

  const rec = await getTicket(token);
  if (!rec) return json({ ok: false, error: 'Ticket not found' }, 404);

  switch (action) {
    case 'status':
      return json({ ok: true, status: rec.checkedIn ? 'checked-in' : 'not-checked-in', record: rec });

    case 'checkin':
      if (!rec.checkedIn) {
        rec.checkedIn = true;
        rec.checkedInAt = new Date().toISOString();
        rec.checkIns = (rec.checkIns ?? 0) + 1;
        await putTicket(token, rec);
      }
      return json({ ok: true, status: 'checked-in', record: rec });

    case 'undo':
      if (rec.checkedIn) {
        rec.checkedIn = false;
        rec.checkedInAt = null;
        await putTicket(token, rec);
      }
      return json({ ok: true, status: 'not-checked-in', record: rec });

    default:
      return json({ ok: false, error: 'Invalid action' }, 400);
  }
}

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = await req.json();
  } catch {}
  const { token, action = 'status', key } = body;
  return handle(req, { token, action, key });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token') ?? undefined;
  const action = (url.searchParams.get('action') as Action | null) ?? 'status';
  const key = url.searchParams.get('key') ?? undefined;
  return handle(req, { token, action, key });
}
