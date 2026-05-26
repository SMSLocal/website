"use client"

import { useEffect, useState } from "react"
import { CheckCheck, Send } from "lucide-react"

const WRAP = "w-full max-w-[210px]"
const INK = "oklch(0.2 0.02 230)"

function Dot({ d }: { d?: string }) {
  return <span className="h-1.5 w-1.5 rounded-full bg-white/70" style={{ animation: `dot-bounce 1.2s infinite ${d ?? "0s"}` }} />
}

/** Per-channel looping "live demo" visual shown inside each accordion panel. */
export function ChannelVisual({ kind }: { kind: string }) {
  const [t, setT] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 1400)
    return () => clearInterval(id)
  }, [])

  if (kind === "bulk") {
    const count = 2330 + (t % 6) * 8
    return (
      <div className={`${WRAP} rounded-xl bg-white/10 p-3 backdrop-blur-sm`}>
        <div className="flex justify-between text-[10px] text-white/70"><span>Diwali Sale</span><span className="font-semibold text-white">98.1%</span></div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="animate-fill-loop h-full rounded-full bg-white" /></div>
        <div className="mt-2 flex items-center gap-1 text-[10.5px] text-white/85"><CheckCheck className="h-3.5 w-3.5" /> {count.toLocaleString("en-IN")} delivered</div>
      </div>
    )
  }

  if (kind === "ai") {
    const s = t % 4
    const cycle = Math.floor(t / 4)
    return (
      <div className={`${WRAP} space-y-1.5`}>
        <div key={`q-${cycle}`} style={{ animation: "message-in .4s ease both" }} className="max-w-[82%] rounded-xl rounded-bl-sm bg-white/15 px-2.5 py-1.5 text-[11px] text-white">Where&apos;s my order?</div>
        {s === 1 && (
          <div className="flex w-fit items-center gap-1 rounded-xl rounded-bl-sm bg-white/15 px-2.5 py-2"><Dot /><Dot d=".15s" /><Dot d=".3s" /></div>
        )}
        {s >= 2 && (
          <div key={`r-${cycle}`} style={{ animation: "message-in .4s ease both" }} className="ml-auto max-w-[90%] rounded-xl rounded-br-sm bg-white px-2.5 py-1.5 text-[11px]" >
            <span style={{ color: INK }}>இன்று மாலை வந்துவிடும் 🛵</span>
            <span className="ml-1 text-[8.5px]" style={{ color: "oklch(0.5 0.02 230)" }}>AI · 0.8s</span>
          </div>
        )}
      </div>
    )
  }

  if (kind === "otp") {
    const s = t % 4
    const shown = [2, 4, 6, 6][s]
    const verified = s >= 3
    return (
      <div className={`${WRAP} rounded-xl bg-white/10 p-3 text-center backdrop-blur-sm`}>
        <div className="flex justify-center gap-1">
          {"482913".split("").map((d, i) => (
            <span key={i} className={`flex h-7 w-5 items-center justify-center rounded text-[13px] font-bold transition-all duration-300 ${i < shown ? "bg-white/20 text-white" : "bg-white/5 text-white/25"}`}>
              {i < shown ? d : "•"}
            </span>
          ))}
        </div>
        <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-white/85">
          {verified ? <><CheckCheck className="h-3 w-3" /> verified in 0.3s</> : <span className="text-white/60">sending…</span>}
        </div>
      </div>
    )
  }

  if (kind === "wa") {
    return (
      <div className={`${WRAP} rounded-xl bg-white/10 p-3 backdrop-blur-sm`}>
        <div className="text-[9.5px] uppercase tracking-wide text-white/55">Template · approved</div>
        <div key={`m-${Math.floor(t / 3)}`} style={{ animation: "message-in .45s ease both" }} className="mt-1.5 rounded-lg rounded-tl-sm bg-white/15 px-2.5 py-1.5 text-[11px] text-white">Your order #4821 has shipped 🚚</div>
      </div>
    )
  }

  if (kind === "rcs") {
    return (
      <div className={`${WRAP} overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm`}>
        <div className="relative h-10 overflow-hidden bg-gradient-to-r from-white/25 to-white/10">
          <span className="animate-sheen absolute inset-y-0 -left-1/3 w-1/3 bg-white/25" />
        </div>
        <div className="p-2.5">
          <div className="text-[11px] font-semibold text-white">Diwali Offer 🎉</div>
          <div className="mt-1.5 animate-pulse rounded-md bg-white/20 px-2 py-1 text-center text-[10px] font-medium text-white">Shop now</div>
        </div>
      </div>
    )
  }

  // quick
  const s = t % 4
  const sent = s === 3
  return (
    <div className={`${WRAP} rounded-xl bg-white/10 p-2.5 backdrop-blur-sm`}>
      {sent ? (
        <div key={`s-${Math.floor(t / 4)}`} style={{ animation: "message-in .4s ease both" }} className="ml-auto w-fit rounded-lg rounded-br-sm bg-white px-2.5 py-1.5 text-[10.5px] font-medium text-primary">Sent to 2,418 ✓</div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-md bg-white/15 px-2.5 py-1.5 text-[10.5px] text-white/65">
            {["Type…", "Type your m…", "Type your message…"][s] ?? "Type your message…"}
            <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-white/70 align-middle" />
          </div>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white text-primary"><Send className="h-3.5 w-3.5" /></span>
        </div>
      )}
    </div>
  )
}
