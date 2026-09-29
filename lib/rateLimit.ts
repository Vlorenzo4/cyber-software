type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/**
 * Rate limiting simple en memoria (fixed window). No es exacto ni persiste
 * entre instancias/reinicios, pero alcanza para frenar abuso básico en un
 * endpoint interno protegido por API key.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  return true;
}
