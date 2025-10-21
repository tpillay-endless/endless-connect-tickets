'use client';
import { useState } from 'react';

export default function Test() {
  const [status, setStatus] = useState('ready');
  const [total, setTotal] = useState<number | null>(null);
  const [sold, setSold] = useState<number | null>(null);
  const [left, setLeft] = useState<number | null>(null);

  const fmt = (n: number | null) => (n == null ? '—' : new Intl.NumberFormat().format(n));

  async function getInventory() {
    setStatus('loading inventory…');
    const res = await fetch('/tickets/api/inventory', { cache: 'no-store' });
    const data = await res.json();
    setTotal(data.total); setSold(data.sold); setLeft(data.left);
    setStatus('ok');
  }

  async function registerOnce() {
    setStatus('registering…');
    const res = await fetch('/tickets/api/register', { method: 'POST' });
    const data = await res.json();
    setTotal(data.total); setSold(data.sold); setLeft(data.left);
    setStatus('ok');
  }

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 520 }}>
      <h1>Single-event Counter Test</h1>
      <div style={{ display:'flex', gap:12, marginTop:12 }}>
        <button onClick={getInventory} style={{ padding:'8px 12px', borderRadius:8, border:'1px solid #ccc' }}>
          Get inventory
        </button>
        <button onClick={registerOnce} style={{ padding:'8px 12px', borderRadius:8, border:'1px solid #ccc' }}>
          Register once
        </button>
      </div>
      <p style={{ marginTop:10, color:'#666' }}>Status: {status}</p>
      <div style={{ marginTop:12, border:'1px solid #eee', borderRadius:12, padding:12 }}>
        <div><strong>Left:</strong> {fmt(left)}</div>
        <div><strong>Total:</strong> {fmt(total)}</div>
        <div><strong>Sold:</strong> {fmt(sold)}</div>
      </div>
    </main>
  );
}