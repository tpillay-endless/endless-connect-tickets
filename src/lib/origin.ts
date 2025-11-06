// src/lib/origin.ts

function normalizeOrigin(origin?: string | null) {
  if (!origin) return null;
  try {
    const normalized = new URL(origin);
    return normalized.origin.replace(/\/$/, '');
  } catch {
    return null;
  }
}

const ENV_ORIGIN =
  normalizeOrigin(process.env.TICKETS_BASE_URL) ??
  normalizeOrigin(process.env.NEXT_PUBLIC_TICKETS_BASE_URL);

/** Force trailing slash removal for downstream builders */
function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export function resolveRequestOrigin(req: Request): string {
  if (ENV_ORIGIN) return ENV_ORIGIN;

  const forwardedProto = req.headers.get('x-forwarded-proto');
  const forwardedHost = req.headers.get('x-forwarded-host');
  if (forwardedProto && forwardedHost) {
    return stripTrailingSlash(`${forwardedProto}://${forwardedHost}`);
  }

  const forwardedUrl = req.headers.get('x-forwarded-url');
  const forwardedOrigin = normalizeOrigin(forwardedUrl);
  if (forwardedOrigin) return forwardedOrigin;

  const host = req.headers.get('host');
  if (host) {
    const protocol =
      forwardedProto ||
      (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https');
    return stripTrailingSlash(`${protocol}://${host}`);
  }

  try {
    return stripTrailingSlash(new URL(req.url).origin);
  } catch {
    return ENV_ORIGIN ?? '';
  }
}

export function getConfiguredOrigin() {
  return ENV_ORIGIN ?? null;
}
