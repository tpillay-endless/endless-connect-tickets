import { getCloudflareContext } from '@opennextjs/cloudflare';

let warnedMissingBinding = false;

export async function getDatabase(): Promise<D1Database | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.DATABASE ?? null;
  } catch (err) {
    if (!warnedMissingBinding) {
      console.warn('[d1] Cloudflare context unavailable. DATABASE binding is required.', err);
      warnedMissingBinding = true;
    }
    return null;
  }
}

