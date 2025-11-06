// src/app/api/staff/seed/route.ts
import { NextResponse } from 'next/server';
import { putStaffUser, hashPassword } from '@/lib/staff';
import { randomUUID } from 'crypto';
import type { StaffRole } from '@/lib/staff/permissions';

async function runSeed(url: string) {
  const u = new URL(url);
  const key = u.searchParams.get('key') || '';
  const gate = process.env.CHECKIN_TOKEN || '';
  if (!gate || key !== gate) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const plan: Array<{ name: string; role: StaffRole; passEnv: string }> = [
    { name: 'Goran', role: 'superadmin', passEnv: 'STAFF_GORAN_PASS' },
    { name: 'Teddy', role: 'admin', passEnv: 'STAFF_TEDDY_PASS' },
    { name: 'Skyler', role: 'host', passEnv: 'STAFF_SKYLER_PASS' },
    { name: 'Jerrika', role: 'staff', passEnv: 'STAFF_JERRIKA_PASS' },
    { name: 'David', role: 'staff', passEnv: 'STAFF_DAVID_PASS' },
  ];

  const created: string[] = [];

  for (const p of plan) {
    const pass = process.env[p.passEnv];
    if (!pass) continue; // only create users with provided passwords

    const { hash, salt } = await hashPassword(pass);
    const user = {
      id: randomUUID(),
      name: p.name,
      nameLower: p.name.toLowerCase(),
      role: p.role,
      passHash: hash,
      salt,
      createdAt: new Date().toISOString(),
    };

    await putStaffUser(user);
    created.push(p.name);
  }

  return NextResponse.json({ ok: true, created });
}

export async function GET(req: Request)  { return runSeed(req.url); }
export async function POST(req: Request) { return runSeed(req.url); }
