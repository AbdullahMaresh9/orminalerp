import { NextResponse } from 'next/server';

/**
 * Lightweight in-memory sliding-window rate limiter.
 *
 * No external service required. Each entry tracks the timestamps of recent
 * hits for a key (typically the client IP + route) and rejects once the count
 * within the window exceeds the limit. State lives in the module scope, so it
 * protects a single server instance — good enough to blunt spam/flooding from
 * a single client without adding an external dependency.
 */
type Bucket = number[];

const store = new Map<string, Bucket>();

// Periodically drop empty buckets so the map cannot grow unbounded.
let lastSweep = Date.now();

function sweep(now: number, windowMs: number) {
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  for (const [key, hits] of store) {
    const fresh = hits.filter((t) => now - t < windowMs);
    if (fresh.length === 0) store.delete(key);
    else store.set(key, fresh);
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfter: number; // seconds until the window frees up
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now, windowMs);

  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    const oldest = hits[0];
    const retryAfter = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    store.set(key, hits);
    return { success: false, remaining: 0, retryAfter };
  }

  hits.push(now);
  store.set(key, hits);
  return { success: true, remaining: Math.max(0, limit - hits.length), retryAfter: 0 };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Standard 429 response with a Retry-After header. */
export function tooManyRequests(retryAfter: number) {
  return NextResponse.json(
    { error: 'rate_limited', retryAfter },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } },
  );
}
