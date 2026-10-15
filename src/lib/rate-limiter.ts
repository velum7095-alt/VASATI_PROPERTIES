import { hashIp } from './crypto';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory sliding window store (suitable for containerized node/Coolify instances)
// Can be backed by Redis in multi-instance horizontal scaling
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup stale entries periodically to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((entry, key) => {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    });
  }, 60000);
  if (timer.unref) {
    timer.unref();
  }
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // e.g. 10 * 60 * 1000 = 10 minutes
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Check sliding window rate limit for a client IP and route bucket
 */
export function checkRateLimit(
  clientIp: string,
  bucket: string,
  config: RateLimitConfig
): RateLimitResult {
  const ipHash = hashIp(clientIp || '127.0.0.1');
  const key = `${bucket}:${ipHash}`;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    // New window
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, newEntry);
    return {
      allowed: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetInSeconds: Math.ceil(config.windowMs / 1000),
    };
  }

  // Existing window
  if (entry.count >= config.maxRequests) {
    const resetInSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetInSeconds,
    };
  }

  entry.count += 1;
  const resetInSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  return {
    allowed: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    resetInSeconds,
  };
}

// Predefined security rate limit presets
export const RATE_LIMIT_PRESETS = {
  // Public form submissions (leads, site visits): max 5 per 10 minutes
  LEAD_SUBMISSION: { maxRequests: 5, windowMs: 10 * 60 * 1000 },
  // Data Subject Rights requests: max 5 per 10 minutes
  DSR_SUBMISSION: { maxRequests: 5, windowMs: 10 * 60 * 1000 },
  // Status check lookups: max 20 per minute
  DSR_TRACKING: { maxRequests: 20, windowMs: 60 * 1000 },
  // Admin login attempts: max 5 attempts per 15 minutes to prevent brute-force
  ADMIN_LOGIN: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
};

