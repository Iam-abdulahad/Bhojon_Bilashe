interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * In-memory IP rate limiter: max requests within a given window
 */
export function checkRateLimit(ip: string, maxRequests = 5, windowSeconds = 60): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + windowSeconds * 1000,
    });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}
