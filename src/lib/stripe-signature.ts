/**
 * stripe-signature.ts — verifies the `Stripe-Signature` header on a webhook.
 *
 * Implemented against Web Crypto rather than the Stripe SDK so the site keeps
 * its current dependency footprint (the SDK is ~2 MB for one HMAC). The scheme
 * is Stripe's documented v1 signature:
 *
 *   Stripe-Signature: t=<unix ts>,v1=<hex hmac>,v1=<hex hmac>,...
 *   signed payload   = "<t>.<raw request body>"
 *   signature        = HMAC-SHA256(signed payload, webhook signing secret)
 *
 * Two things matter and are easy to get wrong:
 *   1. The body must be the RAW text, byte for byte. Parse JSON only AFTER
 *      verifying — re-serialising a parsed object changes the bytes and every
 *      signature then fails.
 *   2. A header can carry several v1 signatures during a secret rotation. Any
 *      one matching is a pass.
 */

/** Reject signatures older than this (replay protection). Stripe's own default. */
const DEFAULT_TOLERANCE_SECONDS = 300;

export type SignatureResult =
  | { ok: true }
  | { ok: false; reason: "malformed" | "timestamp" | "mismatch" };

export async function verifyStripeSignature(args: {
  /** The raw, unparsed request body. */
  payload: string;
  /** The full Stripe-Signature header value. */
  header: string | null;
  /** The endpoint's signing secret (whsec_...). */
  secret: string;
  nowSeconds?: number;
  toleranceSeconds?: number;
}): Promise<SignatureResult> {
  const { payload, header, secret } = args;
  if (!header) return { ok: false, reason: "malformed" };

  let timestamp: string | null = null;
  const candidates: string[] = [];
  for (const part of header.split(",")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const key = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (key === "t") timestamp = value;
    else if (key === "v1") candidates.push(value);
  }
  if (!timestamp || candidates.length === 0) return { ok: false, reason: "malformed" };

  const sentAt = Number(timestamp);
  if (!Number.isFinite(sentAt)) return { ok: false, reason: "malformed" };

  const now = args.nowSeconds ?? Math.floor(Date.now() / 1000);
  const tolerance = args.toleranceSeconds ?? DEFAULT_TOLERANCE_SECONDS;
  if (Math.abs(now - sentAt) > tolerance) return { ok: false, reason: "timestamp" };

  const expected = await hmacSha256Hex(secret, `${timestamp}.${payload}`);
  for (const candidate of candidates) {
    if (timingSafeEqual(expected, candidate)) return { ok: true };
  }
  return { ok: false, reason: "mismatch" };
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return [...new Uint8Array(signature)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time compare — never short-circuit on the first differing byte. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
