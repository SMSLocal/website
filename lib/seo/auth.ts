/**
 * Lightweight JWT (HS256) session for the /dev/seo admin console.
 *
 * Implementation notes:
 * - Uses Web Crypto (available in both Node 20+ and the Edge runtime), so no
 *   external dep is required.
 * - The session token is stored in an httpOnly, SameSite=Lax cookie named
 *   `seo_session`. Validity is 12 hours.
 * - Credentials come from env:
 *     SEO_ADMIN_USER      — username (default: "admin")
 *     SEO_ADMIN_PASS      — password (required — no default)
 *     SEO_JWT_SECRET      — HMAC secret (required — min 32 chars recommended)
 */

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const SEO_COOKIE = "seo_session"
const TOKEN_TTL_SECONDS = 60 * 60 * 12 // 12 h

type SessionPayload = { sub: string; iat: number; exp: number }

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

export function getAuthConfig(): {
  user: string
  pass: string | null
  secret: string | null
} {
  return {
    user: process.env.SEO_ADMIN_USER || "admin",
    pass: process.env.SEO_ADMIN_PASS || null,
    secret: process.env.SEO_JWT_SECRET || null,
  }
}

export function isAuthConfigured(): boolean {
  const { pass, secret } = getAuthConfig()
  return Boolean(pass && secret)
}

/** Timing-safe string equality. */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function verifyCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const { user, pass } = getAuthConfig()
  if (!pass) return false
  return (
    constantTimeEqual(username, user) && constantTimeEqual(password, pass)
  )
}

export async function issueToken(username: string): Promise<string | null> {
  const { secret } = getAuthConfig()
  if (!secret) return null
  const now = Math.floor(Date.now() / 1000)
  const payload: SessionPayload = {
    sub: username,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS,
  }
  const header = { alg: "HS256", typ: "JWT" }
  const headerPart = b64url(JSON.stringify(header))
  const payloadPart = b64url(JSON.stringify(payload))
  const unsigned = `${headerPart}.${payloadPart}`
  const key = await importKey(secret)
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(unsigned),
  )
  return `${unsigned}.${b64url(sig)}`
}

export async function verifyToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null
  const { secret } = getAuthConfig()
  if (!secret) return null
  const parts = token.split(".")
  if (parts.length !== 3) return null
  const [h, p, s] = parts
  try {
    const key = await importKey(secret)
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlToBytes(s),
      new TextEncoder().encode(`${h}.${p}`),
    )
    if (!ok) return null
    const payload = JSON.parse(
      new TextDecoder().decode(b64urlToBytes(p)),
    ) as SessionPayload
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp < now) return null
    return payload
  } catch {
    return null
  }
}

/** Read & verify the session from the incoming request cookies. */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SEO_COOKIE)?.value
  return verifyToken(token)
}

/**
 * Server-component helper: redirect to the login page if there is no valid
 * session. Call at the top of every protected `/dev/seo/*` page.
 */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession()
  if (!session) redirect("/dev/seo/login")
  return session
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: TOKEN_TTL_SECONDS,
}
