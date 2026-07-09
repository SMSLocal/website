"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Fingerprint,
  Globe,
  KeyRound,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react"

/**
 * "Security & reliability" — boxless, dark, and alive.
 *
 * No cards: a central shield emblem runs a continuous radar sweep while the six
 * controls get "verified" one-by-one with a green check — a live audit pass —
 * then the loop resets. The uptime line becomes a hairline-separated footer
 * with a live pulse. Honours prefers-reduced-motion (all verified, no sweep).
 */

const CONTROLS: { Icon: LucideIcon; label: string; note: string }[] = [
  { Icon: KeyRound, label: "Multi-factor auth", note: "MFA on every login" },
  { Icon: Users, label: "Role-based access", note: "RBAC down to the inbox" },
  { Icon: Fingerprint, label: "Single sign-on", note: "SAML / OIDC SSO" },
  { Icon: ScrollText, label: "Audit logs", note: "Every action, timestamped" },
  { Icon: ShieldCheck, label: "AES-256 encryption", note: "At rest and in transit" },
  { Icon: Globe, label: "GDPR & CCPA", note: "Data-subject tooling built in" },
]

export function SecurityShield() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Tick controls on one-by-one, hold when all pass, then loop.
  useEffect(() => {
    if (reduced || !shown) return
    if (count > CONTROLS.length) {
      const t = setTimeout(() => setCount(0), 2200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCount((c) => c + 1), 620)
    return () => clearTimeout(t)
  }, [count, reduced, shown])

  const allPass = reduced || count > CONTROLS.length
  const isVerified = (i: number) => reduced || i < count
  const isScanning = (i: number) => !reduced && shown && i === count && count < CONTROLS.length

  return (
    <div ref={ref}>
      {/* ── shield emblem ───────────────────────────────────────── */}
      <div className="mt-12 flex flex-col items-center">
        <div className="relative h-36 w-36">
          {/* radar sweep */}
          {!reduced && (
            <div
              aria-hidden
              className="absolute inset-0 rounded-full animate-[orbit_4s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklch, var(--primary) 45%, transparent) 38deg, transparent 80deg)",
                maskImage: "radial-gradient(circle, #000 60%, transparent 72%)",
                WebkitMaskImage: "radial-gradient(circle, #000 60%, transparent 72%)",
              }}
            />
          )}
          {/* dashed rotating ring */}
          <div aria-hidden className="absolute inset-2 rounded-full border border-dashed border-primary/30 motion-safe:animate-[orbit_18s_linear_infinite]" />
          {/* pulse rings */}
          {!reduced && (
            <>
              <span aria-hidden className="absolute inset-6 animate-[pulse-ring_2.8s_ease-out_infinite] rounded-full border border-primary/40" />
              <span aria-hidden className="absolute inset-6 animate-[pulse-ring_2.8s_ease-out_infinite] rounded-full border border-primary/30 [animation-delay:1.4s]" />
            </>
          )}
          {/* core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-[0_0_44px_-6px_var(--primary)]">
              <ShieldCheck className="h-9 w-9" />
            </span>
          </div>
        </div>
        <p className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
          <span className={`h-1.5 w-1.5 rounded-full bg-emerald-400 ${reduced ? "" : "animate-pulse"}`} />
          {allPass ? "All controls verified" : "Running security checks…"}
        </p>
      </div>

      {/* ── six controls, verified live (boxless) ───────────────── */}
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2">
        {CONTROLS.map((c, i) => (
          <div
            key={c.label}
            className="relative flex items-center gap-3.5 border-b border-white/10 pb-5 transition-all duration-500"
            style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(10px)", transitionDelay: `${i * 70}ms` }}
          >
            <span
              className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary transition-all duration-300 ${
                isVerified(i) ? "bg-primary/15 ring-1 ring-primary/40" : "bg-white/5"
              } ${isScanning(i) ? "shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_35%,transparent)]" : ""}`}
            >
              <c.Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[14.5px] font-semibold text-white">{c.label}</p>
              <p className="mt-0.5 text-[12.5px] text-white/55">{c.note}</p>
            </div>
            <span
              className={`ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 transition-all ${
                isVerified(i) ? "animate-check-pop opacity-100" : "opacity-20"
              }`}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>

      {/* ── uptime footer (boxless, hairline only) ──────────────── */}
      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-3 w-3 items-center justify-center">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 ${reduced ? "" : "animate-ping"}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <p className="text-[14.5px] font-medium text-white/85">
            Backed by a <span className="font-semibold text-white">99.9% uptime</span> commitment and redundant infrastructure.
          </p>
        </div>
        <Link
          href="/legal/privacy/"
          className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary hover:underline"
        >
          Read our data &amp; privacy practices
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
