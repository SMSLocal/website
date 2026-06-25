"use client"

import { useEffect, useState } from "react"
import {
  CheckCircle2, Clock, Eye, Heart, MessageCircle,
  Send, ShoppingCart, Smile, Star, Users, X,
} from "lucide-react"

type Msg = { from: "visitor" | "agent"; text: string }

const CONVERSATION: Msg[] = [
  { from: "visitor", text: "Hi! Is this hoodie available in size L?" },
  { from: "agent",   text: "Yes! Size L is in stock 🎉" },
  { from: "visitor", text: "What colors are available?" },
  { from: "agent",   text: "Navy, Charcoal & Forest Green 🌿" },
  { from: "visitor", text: "Forest Green please, how to order?" },
  { from: "agent",   text: "Click 'Add to Cart' — ships in 2 days!" },
]

export function LiveChatVisual() {
  const [shown, setShown]               = useState(1)
  const [typing, setTyping]             = useState(false)
  const [inputText, setInputText]       = useState("")
  const [selectedSize, setSelectedSize] = useState(2)
  const [viewers, setViewers]           = useState(7)

  useEffect(() => {
    if (shown >= CONVERSATION.length) {
      const id = setTimeout(() => setShown(1), 3500)
      return () => clearTimeout(id)
    }
    const next  = CONVERSATION[shown]
    const pause = next.from === "agent" ? 1300 : 950
    const t1    = setTimeout(() => { if (next.from === "agent") setTyping(true) }, pause - 600)
    const t2    = setTimeout(() => { setTyping(false); setShown(s => s + 1) }, pause + 850)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [shown])

  useEffect(() => {
    const id = setInterval(() => setSelectedSize(s => (s % 3) + 1), 4200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setViewers(v => v <= 5 ? 11 : v - 1), 1800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const frames = ["Hi! Is this", "Hi! Is this hoodie in siz", "Hi! Is this hoodie available in size L?"]
    let i = 0
    const id = setInterval(() => {
      setInputText(frames[i % frames.length]); i++
      if (i >= frames.length) clearInterval(id)
    }, 780)
    return () => clearInterval(id)
  }, [])

  const visible = CONVERSATION.slice(0, shown)
  const sizes   = ["S", "M", "L", "XL"]
  const colors  = ["#1a3a5c", "#2d2d2d", "#1a5c3a"]

  return (
    <div
      className="relative w-full max-w-[530px]"
      style={{ animation: "lcv-pop 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(0,168,107,0.15), transparent 70%)" }}
      />

      {/* Floating badge */}
      <div
        className="absolute -left-3 top-9 z-20 flex items-center gap-2.5 rounded-xl px-3 py-2.5"
        style={{
          background: "rgba(10,20,16,0.97)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.55)",
          animation: "lcv-pop 0.55s 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(0,168,107,0.16)", color: "#00A86B" }}>
          <MessageCircle className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-bold" style={{ color: "rgba(255,255,255,0.93)" }}>142 installs today</p>
          <p className="text-[9.5px]" style={{ color: "#00A86B" }}>avg. setup 4m 32s</p>
        </div>
      </div>

      {/* Browser frame */}
      <div
        className="overflow-hidden rounded-2xl"
        style={{
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 28px 72px -18px rgba(0,0,0,0.80), 0 0 0 0.5px rgba(255,255,255,0.05)",
        }}
      >
        {/* Address bar */}
        <div
          className="flex items-center gap-3 px-4 py-2.5"
          style={{ background: "#181d2c", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex gap-1.5">
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
              <span key={i} className="rounded-full" style={{ display: "block", width: 10, height: 10, background: c }} />
            ))}
          </div>
          <div className="flex flex-1 justify-center">
            <div className="flex items-center gap-2 rounded-full px-3 py-1" style={{ background: "rgba(255,255,255,0.07)", minWidth: 200 }}>
              <span className="h-2 w-2 rounded-full" style={{ background: "#00A86B", flexShrink: 0 }} />
              <span className="text-[10.5px] font-medium" style={{ color: "rgba(255,255,255,0.37)" }}>
                stylehaus.in/products/oversized-hoodie
              </span>
            </div>
          </div>
          <div style={{ width: 56 }} />
        </div>

        {/* Website */}
        <div className="relative overflow-hidden" style={{ background: "#ffffff", height: 260 }}>

          {/* Nav */}
          <nav className="flex items-center justify-between px-5 py-2.5" style={{ borderBottom: "1px solid #f0f0f0", background: "white" }}>
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-md" style={{ background: "#00A86B" }}>
                <span className="text-[8px] font-black text-white">SH</span>
              </div>
              <span className="text-[12px] font-bold" style={{ color: "#0f172a" }}>StyleHaus</span>
            </div>
            <div className="flex gap-4 text-[10px] font-medium" style={{ color: "#64748b" }}>
              {["Home", "Shop", "Men", "Women", "Sale"].map(l => <span key={l}>{l}</span>)}
            </div>
            <div className="relative flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "#f8fafc" }}>
              <ShoppingCart className="h-3 w-3" style={{ color: "#334155" }} />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full text-[7px] font-bold text-white" style={{ background: "#00A86B" }}>2</span>
            </div>
          </nav>

          {/* Product layout */}
          <div className="flex" style={{ height: "calc(100% - 45px)" }}>

            {/* Left: info */}
            <div className="flex flex-1 flex-col overflow-hidden px-5 py-3">
              <p className="text-[9px]" style={{ color: "#94a3b8" }}>Home &rsaquo; Shop &rsaquo; <span style={{ color: "#475569" }}>Hoodies</span></p>

              <h2 className="mt-1.5 text-[13px] font-extrabold leading-tight" style={{ color: "#0f172a" }}>
                Premium Oversized Hoodie
              </h2>
              <p className="mt-0.5 text-[10px]" style={{ color: "#94a3b8" }}>Unisex · Regular Wash · 100% Cotton</p>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[15px] font-extrabold" style={{ color: "#0f172a" }}>₹1,299</span>
                <span className="text-[11px] line-through" style={{ color: "#cbd5e1" }}>₹1,899</span>
                <span className="rounded-full px-1.5 py-0.5 text-[8.5px] font-bold" style={{ background: "#fef2f2", color: "#ef4444" }}>32% OFF</span>
              </div>

              <div className="mt-1.5 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-current" style={{ width: 10, height: 10, color: i < 4 ? "#f59e0b" : "#e2e8f0" }} />
                ))}
                <span className="ml-1 text-[9.5px]" style={{ color: "#64748b" }}>4.8 · 247 reviews</span>
                <span className="ml-2 flex items-center gap-1 text-[9.5px]" style={{ color: "#94a3b8" }}>
                  <Eye style={{ width: 10, height: 10 }} />{viewers} viewing
                </span>
              </div>

              <div className="mt-2.5">
                <p className="text-[10px] font-semibold" style={{ color: "#334155" }}>
                  Color: <span style={{ color: "#00A86B" }}>Forest Green</span>
                </p>
                <div className="mt-1.5 flex gap-1.5">
                  {colors.map((c, i) => (
                    <div key={i} className="h-5 w-5 rounded-full" style={{
                      background: c,
                      boxShadow: i === 2 ? "0 0 0 2px white, 0 0 0 3.5px #00A86B" : "none",
                    }} />
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <p className="text-[10px] font-semibold" style={{ color: "#334155" }}>
                  Size: <span style={{ color: "#00A86B" }}>{sizes[selectedSize]}</span>
                </p>
                <div className="mt-1.5 flex gap-1">
                  {sizes.map((s, i) => (
                    <div key={s} className="flex h-6 w-7 items-center justify-center rounded-lg text-[10px] font-semibold"
                      style={i === selectedSize
                        ? { background: "#00A86B", color: "white", boxShadow: "0 2px 8px rgba(0,168,107,0.35)" }
                        : { background: "#f8fafc", color: "#475569", border: "1.5px solid #e2e8f0" }}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2.5 flex gap-2">
                <div className="flex h-7 flex-1 items-center justify-center gap-1.5 rounded-xl text-[10px] font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #00A86B, #009960)", boxShadow: "0 3px 10px rgba(0,168,107,0.32)" }}>
                  <ShoppingCart style={{ width: 12, height: 12 }} />Add to Cart
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-xl" style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
                  <Heart style={{ width: 12, height: 12, color: "#94a3b8" }} />
                </div>
              </div>

              <p className="mt-1.5 text-[9px]" style={{ color: "#64748b" }}>🚚 Free delivery · ↩ Easy returns · 🔒 Secure</p>
            </div>

            {/* Right: product image */}
            <div className="relative shrink-0 overflow-hidden" style={{ width: 128, background: "linear-gradient(160deg, #0a2417 0%, #1a5c3a 55%, #0e3322 100%)" }}>
              <div aria-hidden className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "9px 9px" }} />
              <div aria-hidden className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.10), transparent 65%)" }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute" style={{ width: 42, height: 25, top: 28, background: "rgba(0,168,107,0.60)", borderRadius: "50% 50% 0 0", left: "50%", transform: "translateX(-50%)", boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.2)" }} />
                <div className="absolute" style={{ width: 16, height: 12, top: 44, background: "#0a2417", borderRadius: "0 0 50% 50%", left: "50%", transform: "translateX(-50%)" }} />
                <div className="absolute" style={{ width: 56, height: 64, top: 54, background: "rgba(0,168,107,0.50)", borderRadius: "5px 5px 12px 12px", left: "50%", transform: "translateX(-50%)", boxShadow: "inset 0 0 18px rgba(0,0,0,0.15)" }} />
                <div className="absolute" style={{ width: 17, height: 44, top: 56, background: "rgba(255,255,255,0.07)", borderRadius: "8px", left: "calc(50% - 20px)" }} />
                <div className="absolute" style={{ width: 20, height: 44, top: 58, background: "rgba(0,168,107,0.42)", borderRadius: "5px", left: "calc(50% - 38px)", transform: "rotate(-10deg)", transformOrigin: "top center" }} />
                <div className="absolute" style={{ width: 20, height: 44, top: 58, background: "rgba(0,168,107,0.42)", borderRadius: "5px", left: "calc(50% + 18px)", transform: "rotate(10deg)", transformOrigin: "top center" }} />
                <div className="absolute" style={{ width: 26, height: 15, top: 100, background: "rgba(0,0,0,0.18)", borderRadius: "5px", left: "50%", transform: "translateX(-50%)", border: "1px solid rgba(255,255,255,0.06)" }} />
              </div>

              <div className="absolute left-2 top-2 rounded-full px-1.5 py-0.5 text-[7.5px] font-bold" style={{ background: "#00A86B", color: "white" }}>NEW</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded px-1.5 py-0.5 text-[8px] font-bold text-white/60" style={{ background: "rgba(0,0,0,0.25)" }}>StyleHaus</div>
            </div>
          </div>

          {/* Chat widget */}
          <div
            className="absolute bottom-2 right-2 flex flex-col overflow-hidden rounded-2xl"
            style={{
              width: 215,
              background: "white",
              boxShadow: "0 16px 48px -8px rgba(0,0,0,0.30), 0 0 0 1px rgba(0,0,0,0.07)",
              animation: "lcv-widget-open 0.5s 0.62s cubic-bezier(0.34,1.56,0.64,1) both",
              transformOrigin: "bottom right",
            }}
          >
            <div className="flex items-center justify-between px-3 py-2.5" style={{ background: "linear-gradient(135deg, #00A86B, #009960)" }}>
              <div className="flex items-center gap-2">
                <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: "rgba(255,255,255,0.22)" }}>
                  P
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full" style={{ background: "#86efac", border: "2px solid #00A86B" }} />
                </div>
                <div>
                  <p className="text-[11px] font-bold leading-none text-white">SMSLocal Chat</p>
                  <p className="mt-0.5 text-[9px] leading-none" style={{ color: "rgba(255,255,255,0.72)" }}>We reply in minutes</p>
                </div>
              </div>
              <button className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.18)" }}>
                <X className="h-3 w-3 text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-2 px-2.5 py-2.5" style={{ background: "#fafafa", overflow: "hidden", minHeight: 115, maxHeight: 145 }}>
              <div className="flex justify-start">
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm px-2.5 py-1.5 text-[10.5px] leading-snug" style={{ background: "#f0f0f0", color: "#374151" }}>
                  Hi! 👋 How can I help you today?
                </div>
              </div>
              {visible.map((m, i) => (
                <div key={`${shown}-${i}`} className={`flex ${m.from === "visitor" ? "justify-end" : "justify-start"}`}
                  style={{ animation: "lcv-msg 0.3s cubic-bezier(0.22,1,0.36,1) both" }}>
                  <div className={`max-w-[88%] rounded-2xl px-2.5 py-1.5 text-[10.5px] leading-snug ${m.from === "visitor" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                    style={m.from === "visitor" ? { background: "#00A86B", color: "white" } : { background: "#f0f0f0", color: "#374151" }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start" style={{ animation: "lcv-msg 0.24s ease both" }}>
                  <div className="rounded-2xl rounded-tl-sm px-3 py-2" style={{ background: "#f0f0f0" }}>
                    <div className="flex gap-1">
                      {[0, 150, 300].map(d => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full" style={{ background: "#9ca3af", animationDelay: `${d}ms` }} />)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 border-t px-2.5 py-2" style={{ background: "white", borderColor: "#ebebeb" }}>
              <Smile className="h-3.5 w-3.5 shrink-0" style={{ color: "#d1d5db" }} />
              <div className="flex-1 truncate text-[10px]" style={{ color: "#9ca3af" }}>
                {inputText || "Type a message…"}
                <span className="ml-px inline-block h-2.5 w-px translate-y-0.5" style={{ background: "#9ca3af", animation: "lcv-caret 1s step-end infinite" }} />
              </div>
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "#00A86B" }}>
                <Send className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
          </div>

          {/* Chat bubble */}
          <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "#00A86B", boxShadow: "0 4px 18px rgba(0,168,107,0.5)", animation: "lcv-bubble-hide 0.2s 0.60s forwards" }}>
            <MessageCircle className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Stat pills */}
      <div className="mt-3 flex items-center justify-center gap-2.5" style={{ animation: "lcv-pop 0.5s 0.8s cubic-bezier(0.34,1.56,0.64,1) both" }}>
        {[
          { icon: Users,        val: "47",     label: "Conversations", accent: "#00A86B" },
          { icon: Clock,        val: "1m 32s", label: "Avg Response",  accent: "#F59E0B" },
          { icon: CheckCircle2, val: "38",     label: "Resolved",      accent: "#0EA5E9" },
        ].map(({ icon: Icon, val, label, accent }) => (
          <div key={label} className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: "rgba(10,20,16,0.94)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.32)" }}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ background: accent + "22", color: accent }}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="leading-tight">
              <p className="text-[12px] font-bold tabular-nums" style={{ color: "rgba(255,255,255,0.93)" }}>{val}</p>
              <p className="text-[9px] uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.38)" }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes lcv-pop {
          from { opacity: 0; transform: translateY(18px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lcv-msg {
          from { opacity: 0; transform: translateY(6px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lcv-caret {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes lcv-widget-open {
          from { opacity: 0; transform: scale(0.5) translateY(14px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes lcv-bubble-hide {
          to { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
