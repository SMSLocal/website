"use client"

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { Bell, Bot, Check, Heart, Send, Smile, TrendingUp, UserCheck, Zap } from "lucide-react"

// Hero artwork for /products/analytics, drawn in code on a fixed 600 x 470 stage and scaled to its column: a dashboard
// window whose chart draws itself and whose number counts up, a CSAT ring, a campaign funnel, a sentiment chip and a
// toast that cycles through live events. All figures are sample data. Reduced motion shows the finished state.

const TEAL = "var(--primary)"
const AMBER = "oklch(0.85 0.14 80)"
const INK = "oklch(0.18 0.02 230)"

const EVENTS = [
  { icon: Bot, t: "AI resolved a delivery question", s: "WhatsApp · 4s" },
  { icon: Smile, t: "Positive feedback on returns", s: "CSAT 5 · SMS" },
  { icon: Send, t: "Diwali offer reached 97%", s: "Delivered · RCS" },
  { icon: UserCheck, t: "Agent joined with full context", s: "Web chat · 1m 12s" },
  { icon: Bell, t: "Sentiment dip on pricing", s: "Flagged for review" },
]

const CSS = `
@keyframes anh-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes anh-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
@keyframes anh-grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
@keyframes anh-pop { from { opacity: 0; transform: translateY(12px) scale(.97) } to { opacity: 1; transform: none } }
@keyframes anh-ring { from { stroke-dashoffset: 214 } }
@keyframes anh-orbit { to { transform: rotate(360deg) } }
@keyframes anh-twinkle { 0%, 100% { opacity: .25; transform: scale(.7) } 50% { opacity: 1; transform: scale(1.15) } }
@keyframes anh-blink { 0%, 100% { opacity: .4 } 50% { opacity: 1 } }
.anh-draw { stroke-dasharray: 1; animation: anh-draw 2.2s ease-out both }
.anh-float { animation: anh-float 6s ease-in-out infinite }
.anh-grow { transform-origin: left; animation: anh-grow 1.2s cubic-bezier(.3,1,.4,1) both }
.anh-pop { animation: anh-pop .5s cubic-bezier(.3,1.2,.4,1) both }
.anh-ring { animation: anh-ring 1.6s ease-out both }
.anh-orbit { animation: anh-orbit 40s linear infinite }
.anh-twinkle { transform-box: fill-box; transform-origin: center; animation: anh-twinkle 2.6s ease-in-out infinite }
.anh-blink { animation: anh-blink 2s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .anh-draw, .anh-float, .anh-grow, .anh-pop, .anh-ring, .anh-blink, .anh-orbit, .anh-twinkle { animation: none } .anh-draw { stroke-dasharray: none } }
`

function A({ x, y, w, h, r, style, className, children }: { x: number; y: number; w?: number; h?: number; r?: number; style?: CSSProperties; className?: string; children?: ReactNode }) {
  return <div className={className} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, ...style }}>{children}</div>
}

function useCount(target: number, ms = 1800) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])
  return v
}

function Scene() {
  const uid = useId().replace(/:/g, "")
  const count = useCount(12480)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setN((x) => x + 1), 2800)
    return () => window.clearInterval(id)
  }, [])
  const ev = EVENTS[n % EVENTS.length]

  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 600, height: 470, color: INK, fontFamily: "inherit" }}>
      <svg width="600" height="470" viewBox="0 0 600 470" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <defs>
          <pattern id={`anh-dots-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="oklch(0.62 0.14 168)" opacity=".3" /></pattern>
          <radialGradient id={`anh-fade-${uid}`}><stop offset=".3" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
          <mask id={`anh-m-${uid}`}><rect width="600" height="470" fill={`url(#anh-fade-${uid})`} /></mask>
        </defs>
        <rect width="600" height="470" fill={`url(#anh-dots-${uid})`} mask={`url(#anh-m-${uid})`} />
        <g className="anh-orbit" style={{ transformOrigin: "300px 235px" }}>
          <circle cx="300" cy="235" r="222" fill="none" stroke="oklch(0.62 0.14 168)" strokeOpacity=".22" strokeWidth="1.6" strokeDasharray="3 9" />
          <circle cx="522" cy="235" r="6" fill="oklch(0.62 0.14 168)" />
          <circle cx="78" cy="235" r="4.5" fill="oklch(0.85 0.14 80)" />
        </g>
        {[[60, 30, 11], [560, 330, 9], [292, 22, 8], [30, 250, 8]].map(([x, y, r], i) => (
          <path key={`${x}${y}`} className="anh-twinkle" style={{ animationDelay: `${i * 0.5}s` }} d={`M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28}Z`} fill="oklch(0.62 0.14 168)" />
        ))}
      </svg>

      {/* soft glow */}
      <A x={60} y={60} w={460} h={360} r={230} style={{ background: "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 22%, transparent), transparent)" }} />

      {/* a second window peeking out behind, for depth */}
      <A x={40} y={64} w={420} h={318} r={24} style={{ background: "color-mix(in oklch, var(--primary) 12%, white)", border: "1px solid var(--border)", transform: "rotate(3deg)", boxShadow: "0 30px 50px -34px rgba(15,42,58,.35)" }} />

      {/* main dashboard window */}
      <A x={20} y={46} w={420} h={318} r={24} className="anh-float" style={{ background: "#fff", boxShadow: "0 40px 70px -34px rgba(15,42,58,.45), 0 6px 18px rgba(15,42,58,.06)", border: "1px solid var(--border)", overflow: "hidden", animationDelay: "-1s" }}>
        <A x={0} y={0} w={420} h={40} style={{ background: "#f4f8f7", borderBottom: "1px solid var(--border)" }}>
          <A x={16} y={15} style={{ display: "flex", gap: 6 }}><i style={{ width: 10, height: 10, borderRadius: 5, background: "#d6dfe0" }} /><i style={{ width: 10, height: 10, borderRadius: 5, background: "#d6dfe0" }} /><i style={{ width: 10, height: 10, borderRadius: 5, background: TEAL }} /></A>
          <A x={140} y={11} style={{ fontSize: 13, fontWeight: 700 }}>Analytics overview</A>
          <A x={312} y={9} w={92} h={22} r={11} style={{ background: "#fff", border: "1px solid var(--border)", fontSize: 11, fontWeight: 600, color: "#6b7a85", display: "flex", alignItems: "center", justifyContent: "center" }}>Last 7 days</A>
        </A>
        <A x={22} y={56} style={{ fontSize: 12, fontWeight: 600, color: "#6b7a85" }}>Conversations handled</A>
        <A x={22} y={74} style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{count.toLocaleString("en-IN")}</A>
        <A x={196} y={82} w={74} h={26} r={13} style={{ background: "color-mix(in oklch, var(--primary) 14%, white)", color: TEAL, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><TrendingUp style={{ width: 14, height: 14 }} />+8%</A>
        {/* chart */}
        <svg width="380" height="130" viewBox="0 0 412 150" preserveAspectRatio="none" style={{ position: "absolute", left: 20, top: 120 }} aria-hidden>
          <defs><linearGradient id={`anh-g-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="oklch(0.62 0.14 168)" stopOpacity=".32" /><stop offset="1" stopColor="oklch(0.62 0.14 168)" stopOpacity="0" /></linearGradient></defs>
          {[30, 70, 110].map((y) => <line key={y} x1="0" x2="412" y1={y} y2={y} stroke="#0b2a3a" strokeOpacity=".07" />)}
          <path d="M0 118 C 40 112, 64 80, 104 84 S 168 48, 208 42 S 280 66, 316 30 S 392 18, 412 12 L412 150 L0 150 Z" fill={`url(#anh-g-${uid})`} />
          <path className="anh-draw" pathLength={1} d="M0 118 C 40 112, 64 80, 104 84 S 168 48, 208 42 S 280 66, 316 30 S 392 18, 412 12" fill="none" stroke="oklch(0.62 0.14 168)" strokeWidth="3.4" strokeLinecap="round" />
          <path className="anh-draw" pathLength={1} style={{ animationDelay: ".4s" }} d="M0 134 C 50 130, 90 118, 136 120 S 214 98, 270 96 S 360 104, 412 86" fill="none" stroke="oklch(0.85 0.14 80)" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="1" />
          <circle cx="316" cy="30" r="6" fill="#fff" stroke="oklch(0.62 0.14 168)" strokeWidth="3" className="anh-blink" />
        </svg>
        <A x={246} y={104} w={92} h={30} r={10} className="anh-pop" style={{ background: INK, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", animationDelay: "1.8s" }}>Peak · 1,840</A>
        <A x={22} y={266} style={{ display: "flex", gap: 14, fontSize: 11, fontWeight: 600, color: "#6b7a85" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><i style={{ width: 14, height: 4, borderRadius: 2, background: "oklch(0.62 0.14 168)" }} />AI agent 68%</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><i style={{ width: 14, height: 4, borderRadius: 2, background: "oklch(0.85 0.14 80)" }} />Team 32%</span>
        </A>
      </A>

      {/* scheduled report chip */}
      <A x={0} y={0} w={196} h={46} r={16} className="anh-float" style={{ background: "#fff", boxShadow: "0 22px 40px -24px rgba(15,42,58,.45)", border: "1px solid var(--border)", animationDelay: "-5s" }}>
        <A x={10} y={9} w={28} h={28} r={9} style={{ background: TEAL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: 16, height: 16 }} /></A>
        <A x={46} y={7} style={{ fontSize: 11.5, fontWeight: 800 }}>Weekly report sent</A>
        <A x={46} y={24} style={{ fontSize: 10, color: "#6b7a85" }}>Mondays 9:00 AM · PDF</A>
      </A>

      {/* CSAT ring */}
      <A x={414} y={8} w={170} h={176} r={26} className="anh-float" style={{ background: "#fff", boxShadow: "0 30px 56px -30px rgba(15,42,58,.45)", border: "1px solid var(--border)", animationDelay: "-3s" }}>
        <A x={0} y={16} w={170} style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "#6b7a85" }}>CSAT</A>
        <svg width="112" height="112" viewBox="0 0 80 80" style={{ position: "absolute", left: 29, top: 40, transform: "rotate(-90deg)" }} aria-hidden>
          <circle cx="40" cy="40" r="34" fill="none" stroke="#0b2a3a" strokeOpacity=".08" strokeWidth="8" />
          <circle className="anh-ring" cx="40" cy="40" r="34" fill="none" stroke="oklch(0.62 0.14 168)" strokeWidth="8" strokeLinecap="round" strokeDasharray="200 214" />
        </svg>
        <A x={29} y={78} w={112} style={{ textAlign: "center", fontSize: 30, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>4.7</A>
        <A x={0} y={148} w={170} style={{ textAlign: "center", fontSize: 11.5, fontWeight: 700, color: TEAL }}>+0.2 this week</A>
      </A>

      {/* campaign funnel */}
      <A x={352} y={206} w={232} h={170} r={26} className="anh-float" style={{ background: "#fff", boxShadow: "0 30px 56px -30px rgba(15,42,58,.45)", border: "1px solid var(--border)", animationDelay: "-2s" }}>
        <A x={18} y={14} style={{ fontSize: 12.5, fontWeight: 800 }}>Campaign funnel</A>
        {[["Delivered", 97], ["Read", 71], ["Clicked", 34], ["Converted", 12]].map(([k, v], i) => (
          <A key={k as string} x={16} y={42 + i * 30} w={200} h={22}>
            <A x={0} y={3} style={{ fontSize: 10.5, fontWeight: 700, color: "#6b7a85" }}>{k as string}</A>
            <A x={62} y={2} w={104} h={18} r={9} style={{ background: "#eef3f3" }} />
            <A x={62} y={2} w={Math.max(((v as number) / 100) * 104, 12)} h={18} r={9} className="anh-grow" style={{ background: i === 3 ? AMBER : TEAL, opacity: 1 - i * 0.1, animationDelay: `${0.3 + i * 0.15}s` }} />
            <A x={172} y={3} style={{ fontSize: 11, fontWeight: 800 }}>{v as number}%</A>
          </A>
        ))}
      </A>

      {/* sentiment chip */}
      <A x={0} y={352} w={206} h={78} r={22} className="anh-float" style={{ background: "#fff", boxShadow: "0 26px 50px -28px rgba(15,42,58,.45)", border: "1px solid var(--border)", animationDelay: "-4s" }}>
        <A x={16} y={16} w={46} h={46} r={16} style={{ background: "color-mix(in oklch, var(--primary) 15%, white)", color: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}><Heart style={{ width: 24, height: 24 }} /></A>
        <A x={74} y={14} style={{ fontSize: 11.5, fontWeight: 700, color: "#6b7a85" }}>Sentiment</A>
        <A x={74} y={32} style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, color: TEAL }}>+62%</A>
        <A x={74} y={60} style={{ fontSize: 10.5, color: "#6b7a85" }}>Positive this week</A>
      </A>

      {/* live toast */}
      <A x={222} y={392} w={300} h={64} r={20} style={{ background: "#0f2a3a", boxShadow: "0 28px 50px -22px rgba(15,42,58,.7)", color: "#fff" }}>
        <div key={n} className="anh-pop" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 12, padding: "0 16px" }}>
          <span style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(255,255,255,.12)", color: AMBER, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}><ev.icon style={{ width: 18, height: 18 }} /></span>
          <span style={{ minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.t}</span>
            <span style={{ display: "block", fontSize: 10.5, opacity: 0.65 }}>{ev.s}</span>
          </span>
        </div>
        <A x={274} y={8} w={8} h={8} r={4} className="anh-blink" style={{ background: TEAL }} />
      </A>

      <A x={496} y={420} w={92} h={32} r={16} style={{ background: "color-mix(in oklch, var(--accent) 45%, white)", fontSize: 10.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, letterSpacing: ".04em" }}><Zap style={{ width: 12, height: 12 }} />LIVE DATA</A>
    </div>
  )
}

export function AnalyticsHero() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setW(el.clientWidth))
    ro.observe(el)
    setW(el.clientWidth)
    return () => ro.disconnect()
  }, [])
  const s = w / 600
  return (
    <div ref={ref} role="img" aria-label="An analytics dashboard with conversations handled, a CSAT ring, a campaign funnel, sentiment and a live activity toast, all sample data" className="relative mx-auto w-full max-w-[640px] lg:max-w-none" style={{ aspectRatio: "600 / 470", opacity: w ? 1 : 0, transition: "opacity .3s" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 600, height: 470, transformOrigin: "0 0", transform: `scale(${s})` }}>
        <Scene />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
