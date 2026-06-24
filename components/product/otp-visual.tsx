"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Clock4, Zap } from "lucide-react"

const REQUEST_LINES = [
  { t: "$ ", c: "curl -X POST https://api.smslocal.in/v1/otp/send \\", cls: "text-white/85" },
  { t: "  ", c: "-H 'Authorization: Bearer sk_live_xxx' \\", cls: "text-white/60" },
  { t: "  ", c: "-H 'Content-Type: application/json' \\", cls: "text-white/60" },
  { t: "  ", c: "-d '{", cls: "text-white/60" },
  { t: "    ", c: '"template_id": "DLT_TEMPLATE_ID",', cls: "text-emerald-300" },
  { t: "    ", c: '"to": "+919876543210",', cls: "text-emerald-300" },
  { t: "    ", c: '"variables": { "otp": "482913" }', cls: "text-emerald-300" },
  { t: "  ", c: "}'", cls: "text-white/60" },
]

export function OtpVisual() {
  const [phase, setPhase] = useState<"idle" | "sending" | "delivered">("idle")
  const [latencyMs, setLatencyMs] = useState<number>(720)

  useEffect(() => {
    let mounted = true
    const cycle = async () => {
      while (mounted) {
        setPhase("idle")
        await sleep(1200)
        setPhase("sending")
        await sleep(900)
        const ms = 520 + Math.floor(Math.random() * 380)
        setLatencyMs(ms)
        setPhase("delivered")
        await sleep(2400)
      }
    }
    cycle()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 35%, transparent), transparent 70%)",
        }}
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.02_230)]/95 shadow-2xl">
        {/* Terminal chrome */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <p className="font-mono text-[11px] text-white/55">otp-dispatch.sh</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-400">
            <Zap className="h-3 w-3" />
            Priority route
          </span>
        </div>

        {/* Request body */}
        <div className="px-5 py-4 font-mono text-[12px] leading-relaxed">
          {REQUEST_LINES.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-3 w-5 shrink-0 select-none text-right text-white/25">{i + 1}</span>
              <pre className={line.cls}>
                <span className="text-white/30">{line.t}</span>
                {line.c}
              </pre>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 bg-black/30 px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">
            Response · POST /v1/otp/send
          </p>
          <div className="mt-2 font-mono text-[12px] text-white/75">
            <span className="text-emerald-400">200 OK</span>{" "}
            <span className="text-white/40">·</span>{" "}
            <span className="text-white/70">
              {'{ "request_id": "req_7KQ9", "status": "queued" }'}
            </span>
          </div>
        </div>

        {/* Webhook callback card */}
        <div className="border-t border-white/10 bg-[oklch(0.16_0.02_230)] px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border ${
                  phase === "delivered"
                    ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-400"
                    : phase === "sending"
                      ? "border-amber-400/40 bg-amber-400/15 text-amber-400"
                      : "border-white/15 bg-white/[0.03] text-white/50"
                }`}
              >
                {phase === "delivered" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Clock4 className={`h-3.5 w-3.5 ${phase === "sending" ? "animate-spin" : ""}`} />
                )}
              </span>
              <div>
                <p className="font-mono text-[11.5px] text-white/55">webhook · /delivery</p>
                <p className="text-[13px] font-semibold text-white">
                  {phase === "idle"
                    ? "Awaiting carrier…"
                    : phase === "sending"
                      ? "Dispatching via Jio primary route"
                      : "Delivered to +91 98765 43210"}
                </p>
              </div>
            </div>
            <div
              className={`rounded-lg px-3 py-1.5 text-right font-mono text-[12px] transition ${
                phase === "delivered"
                  ? "bg-emerald-400/15 text-emerald-400"
                  : "bg-white/5 text-white/50"
              }`}
            >
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] opacity-70">
                Latency
              </p>
              <p className="font-semibold">
                {phase === "delivered" ? `${(latencyMs / 1000).toFixed(2)}s` : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
