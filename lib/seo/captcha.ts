/**
 * Stateless HMAC-signed math captcha for the /dev/seo login form.
 *
 * Design:
 * - Server generates a random math problem (e.g. "7 + 4") plus an HMAC token
 *   that contains the expected answer, an expiry timestamp, and a signature
 *   keyed by `SEO_JWT_SECRET`.
 * - Client renders the problem, user types the answer, then on submit the
 *   browser sends both the user-entered `answer` and the opaque `token`.
 * - Server re-derives the HMAC, validates the signature + ttl + answer.
 *
 * No Redis state is needed — the token *is* the source of truth — which keeps
 * the login flow snappy and resilient even if the cache is cold. We rely on
 * the existing `signin` rate-limiter (8 attempts / 15 min per IP) to prevent
 * brute-forcing the captcha space.
 */

const TTL_SECONDS = 5 * 60 // 5 minutes

type ChallengePayload = {
  /** The expected answer, integer. */
  a: number
  /** Random nonce so identical questions get unique tokens. */
  n: string
  /** Expiry, unix seconds. */
  e: number
}

function b64url(input: ArrayBuffer | Uint8Array | string): string {
  let bytes: Uint8Array
  if (typeof input === "string") bytes = new TextEncoder().encode(input)
  else if (input instanceof Uint8Array) bytes = input
  else bytes = new Uint8Array(input)
  let s = ""
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i])
  return btoa(s).replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function b64urlToBytes(b64: string): Uint8Array {
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4))
  const normal = (b64 + pad).replace(/-/g, "+").replace(/_/g, "/")
  const bin = atob(normal)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  )
}

function getSecret(): string | null {
  return process.env.SEO_JWT_SECRET || null
}

export function isCaptchaConfigured(): boolean {
  return Boolean(getSecret())
}

function randInt(min: number, max: number): number {
  // crypto-quality randomness so the captcha space isn't predictable.
  const bytes = new Uint32Array(1)
  crypto.getRandomValues(bytes)
  const range = max - min + 1
  return min + (bytes[0] % range)
}

type Operator = "+" | "-"

function pickOperator(): Operator {
  // Addition and easy subtraction only. Multiplication was too taxing for
  // mobile visitors; all answers now fit comfortably in single mental math.
  return Math.random() < 0.7 ? "+" : "-"
}

/**
 * Build a deliberately *easy* challenge — single-digit operands, addition or
 * subtraction only, answer always a non-negative integer ≤ 18. The goal is
 * just to defeat dumb bots, not to test the visitor's maths.
 *
 *   +  →  e.g.  3 + 5 = 8     (operands 1–9, sum 2–18)
 *   -  →  e.g.  8 - 3 = 5     (a >= b so the answer is non-negative)
 */
export async function issueCaptcha(): Promise<{
  question: string
  token: string
} | null> {
  const secret = getSecret()
  if (!secret) return null

  const op = pickOperator()
  let a: number
  let b: number
  let answer: number
  if (op === "+") {
    a = randInt(1, 9)
    b = randInt(1, 9)
    answer = a + b
  } else {
    // Force a >= b so the result is always non-negative.
    a = randInt(2, 9)
    b = randInt(1, a)
    answer = a - b
  }

  const nonceBytes = new Uint8Array(6)
  crypto.getRandomValues(nonceBytes)
  const nonce = b64url(nonceBytes)

  const now = Math.floor(Date.now() / 1000)
  const payload: ChallengePayload = { a: answer, n: nonce, e: now + TTL_SECONDS }
  const payloadPart = b64url(JSON.stringify(payload))
  const key = await importKey(secret)
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadPart),
  )
  const token = `${payloadPart}.${b64url(sig)}`

  return { question: `${a} ${op} ${b}`, token }
}

export type CaptchaVerificationResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "malformed" | "expired" | "bad_signature" | "wrong_answer" }

export async function verifyCaptcha(
  token: string | undefined,
  answer: string | number | undefined,
): Promise<CaptchaVerificationResult> {
  if (!token || answer === undefined || answer === null || answer === "") {
    return { ok: false, reason: "missing" }
  }
  const secret = getSecret()
  if (!secret) return { ok: false, reason: "bad_signature" }
  const parts = token.split(".")
  if (parts.length !== 2) return { ok: false, reason: "malformed" }
  const [payloadPart, sigPart] = parts

  let payload: ChallengePayload
  try {
    payload = JSON.parse(
      new TextDecoder().decode(b64urlToBytes(payloadPart)),
    ) as ChallengePayload
  } catch {
    return { ok: false, reason: "malformed" }
  }
  if (
    typeof payload?.a !== "number" ||
    typeof payload?.e !== "number" ||
    typeof payload?.n !== "string"
  ) {
    return { ok: false, reason: "malformed" }
  }

  const key = await importKey(secret)
  let sigOk = false
  try {
    sigOk = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlToBytes(sigPart),
      new TextEncoder().encode(payloadPart),
    )
  } catch {
    sigOk = false
  }
  if (!sigOk) return { ok: false, reason: "bad_signature" }

  const now = Math.floor(Date.now() / 1000)
  if (payload.e < now) return { ok: false, reason: "expired" }

  const userAnswer = Number(answer)
  if (!Number.isFinite(userAnswer)) return { ok: false, reason: "wrong_answer" }
  if (Math.trunc(userAnswer) !== payload.a) {
    return { ok: false, reason: "wrong_answer" }
  }

  return { ok: true }
}
