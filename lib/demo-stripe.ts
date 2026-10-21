import "server-only";

import { createHash } from "node:crypto";

import Stripe from "stripe";

type RateEntry = { count: number; resetAt: number };

const globalRateState = globalThis as typeof globalThis & {
  liveduceDemoRate?: Map<string, RateEntry>;
};

const rateState =
  globalRateState.liveduceDemoRate ?? new Map<string, RateEntry>();
globalRateState.liveduceDemoRate = rateState;

export function getDemoStripe(): Stripe | null {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) return null;
  if (!secret.startsWith("sk_test_")) {
    throw new Error("Portfolio demo refuses non-test Stripe credentials.");
  }
  return new Stripe(secret);
}

export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const expectedHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!expectedHost) return false;

  try {
    const parsedOrigin = new URL(origin);
    const secureProtocol =
      parsedOrigin.protocol === "https:" ||
      (parsedOrigin.protocol === "http:" &&
        (parsedOrigin.hostname === "127.0.0.1" ||
          parsedOrigin.hostname === "localhost"));
    return secureProtocol && parsedOrigin.host === expectedHost;
  } catch {
    return false;
  }
}

export function allowCheckout(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-for") ?? "unknown";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  const current = rateState.get(key);

  if (!current || current.resetAt <= now) {
    rateState.set(key, { count: 1, resetAt: now + 10 * 60_000 });
    return true;
  }
  if (current.count >= 5) return false;
  current.count += 1;
  return true;
}
