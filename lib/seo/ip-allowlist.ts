/**
 * IP allowlist for the /dev/seo admin console.
 *
 * Configuration:
 *   SEO_ADMIN_IP_ALLOWLIST = "203.0.113.42, 198.51.100.0/24, 2001:db8::/32"
 *
 * Empty / unset  → no restriction (every IP is allowed). This is the default
 *                  so the operator never gets locked out before they have a
 *                  chance to configure the allowlist.
 *
 * Notes:
 * - Supports plain IPv4, plain IPv6, and IPv4 CIDR ranges.
 * - For IPv6 we only do exact-match (no prefix arithmetic) — that's enough
 *   for typical admin allowlists, and avoids shipping a heavy IP library.
 * - The client IP is sourced from the same headers used by the rate-limiter
 *   (`x-vercel-forwarded-for`, `x-real-ip`, `cf-connecting-ip`,
 *   `x-forwarded-for`).
 */

import type { NextRequest } from "next/server"

export type IpAllowlistResult =
  | { enabled: false; allowed: true; ip: string }
  | { enabled: true; allowed: true; ip: string; matched: string }
  | { enabled: true; allowed: false; ip: string; entries: string[] }

function parseAllowlist(): string[] {
  const raw = process.env.SEO_ADMIN_IP_ALLOWLIST
  if (!raw) return []
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

export function isIpAllowlistEnabled(): boolean {
  return parseAllowlist().length > 0
}

export function getIpAllowlistEntries(): string[] {
  return parseAllowlist()
}

/** Pull the visitor IP from the standard set of forwarding headers. */
export function getClientIp(req: NextRequest | Request): string {
  const headers = "headers" in req ? req.headers : new Headers()
  const candidates = [
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-real-ip"),
    headers.get("cf-connecting-ip"),
    headers.get("x-forwarded-for"),
  ]
  for (const c of candidates) {
    if (!c) continue
    const ip = c.split(",")[0]?.trim()
    if (ip) return ip
  }
  return "unknown"
}

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".")
  if (parts.length !== 4) return null
  let n = 0
  for (const p of parts) {
    const v = Number(p)
    if (!Number.isInteger(v) || v < 0 || v > 255) return null
    n = (n << 8) + v
  }
  return n >>> 0
}

function matchEntry(ip: string, entry: string): boolean {
  // Exact-match wildcard.
  if (entry === "*") return true
  // Plain (non-CIDR) — string compare.
  if (!entry.includes("/")) {
    return entry === ip
  }
  // IPv4 CIDR — only IPv4 supported for arithmetic matching.
  const [base, prefixStr] = entry.split("/")
  const prefix = Number(prefixStr)
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return false
  const baseInt = ipv4ToInt(base)
  const ipInt = ipv4ToInt(ip)
  if (baseInt === null || ipInt === null) return false
  if (prefix === 0) return true
  const mask = (~0 << (32 - prefix)) >>> 0
  return (baseInt & mask) === (ipInt & mask)
}

export function checkIpAllowlist(
  req: NextRequest | Request,
): IpAllowlistResult {
  const ip = getClientIp(req)
  const entries = parseAllowlist()
  if (entries.length === 0) {
    return { enabled: false, allowed: true, ip }
  }
  for (const entry of entries) {
    if (matchEntry(ip, entry)) {
      return { enabled: true, allowed: true, ip, matched: entry }
    }
  }
  return { enabled: true, allowed: false, ip, entries }
}
