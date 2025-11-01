// src/lib/qr.ts
import { randomUUID as nodeRandomUUID } from 'crypto';

const FG = process.env.QR_FG || '#f0f3f1';
const BG = process.env.QR_BG || '#65c298';
const ICON = process.env.QR_ICON || 'https://cdn.prod.website-files.com/68c9514a4d942d4c8f7be7bf/69037b1ce5fdf9edf0bdddfb_ico-ec-y25001.png';

const VCARD_FG = process.env.QR_VCARD_FG || '#000B07';
const VCARD_BG = process.env.QR_VCARD_BG || BG;

export const QR_FG = FG;
export const QR_BG = BG;
export const QR_ICON = ICON;
export const QR_VCARD_FG = VCARD_FG;
export const QR_VCARD_BG = VCARD_BG;

export type QRBuildInput = {
  origin: string;             // e.g. https://connect.endlessbiotech.com
  name: string;
  email: string;
  phone: string;
  company?: string;
  event?: string;             // default 'single' for now
  token?: string;             // optional (to reuse a token)
};

export function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: '' };
  const last = parts.pop()!;
  return { first: parts.join(' '), last };
}

export function buildVCard(fullName: string, email: string, phone: string, company?: string) {
  const safe = (s: string) => (s ?? '').toString().replace(/\r?\n/g, ' ').trim();
  const { first, last } = splitName(fullName);
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${safe(last)};${safe(first)};;;`,
    `FN:${safe(fullName)}`,
    company ? `ORG:${safe(company)}` : '',
    `TEL;TYPE=CELL:${safe(phone)}`,
    `EMAIL;TYPE=INTERNET:${safe(email)}`,
    'END:VCARD',
  ].filter(Boolean);
  return lines.join('\n');
}

export function buildTicketPngUrl(ticketUrl: string, size = 1024, iconPx = 342) {
  const u = new URL('https://quickchart.io/qr');
  u.searchParams.set('text', ticketUrl);
  u.searchParams.set('size', String(size));
  u.searchParams.set('margin', '0');
  u.searchParams.set('ecLevel', 'Q');
  u.searchParams.set('format', 'png');
  u.searchParams.set('dark', FG);
  u.searchParams.set('light', BG);
  u.searchParams.set('centerImageUrl', ICON);
  u.searchParams.set('centerImageWidth', String(iconPx));
  u.searchParams.set('centerImageHeight', String(iconPx));
  return u.toString();
}

export function buildVCardSvgUrl(vcard: string, size = 750) {
  const u = new URL('https://quickchart.io/qr');
  u.searchParams.set('text', vcard);
  u.searchParams.set('size', String(size));
  u.searchParams.set('margin', '0');
  u.searchParams.set('ecLevel', 'Q');
  u.searchParams.set('format', 'svg');
  u.searchParams.set('dark', VCARD_FG);
  u.searchParams.set('light', VCARD_BG);
  return u.toString();
}

export function buildTicketUrls(origin: string, token: string) {
  const base = `${origin.replace(/\/$/, '')}/tickets`;
  const ticketUrl = `${base}/t/${encodeURIComponent(token)}`;
  return { base, ticketUrl };
}

export type QRBuildOutput = {
  token: string;
  ticketUrl: string;
  ticketPngUrl: string;
  vcardSvgUrl: string;
  vcard: string;
};

export function buildAllQR(input: QRBuildInput): QRBuildOutput {
  const token = input.token ?? (globalThis.crypto?.randomUUID?.() ?? nodeRandomUUID());
  const { ticketUrl } = buildTicketUrls(input.origin, token);
  const ticketPngUrl = buildTicketPngUrl(ticketUrl);
  const vcard = buildVCard(input.name, input.email, input.phone, input.company);
  const vcardSvgUrl = buildVCardSvgUrl(vcard);
  return { token, ticketUrl, ticketPngUrl, vcardSvgUrl, vcard };
}