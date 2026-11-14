"use client"

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react"
import {
  BarChart3,
  Check,
  CheckCheck,
  ChevronLeft,
  Layers,
  MessageSquare,
  MoreVertical,
  Plus,
  Send,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Smile,
  Tag,
  Truck,
  Users,
  X,
  Zap,
  Image as ImageIcon,
} from "lucide-react"

// Hero artwork for /products/rcs, a code replica of the supplied design: five feature pills joined by dotted lines to a
// glossy phone showing a branded RCS card (Diwali hamper banner, product thumbnails, View Offer button, suggested
// replies, a sent reply and the message bar) on a mint pedestal, with the big RCS badge and a four-point panel on the
// right. It is laid out on a fixed 1536 x 1024 stage and scaled to the width it is given; phones get a closer crop of
// the phone plus the same points as a list.

const GREEN = "#16a56b"
const GREEN_DK = "#0e8a58"
const MINT = "#dff3e8"
const INK = "#10272b"
const GREY = "#5f7378"

const LEFT = [
  { y: 155, t: "Rich Media", s: "Images & Videos", icon: ImageIcon, color: GREEN },
  { y: 295, t: "Carousels", s: "Multiple Products", icon: Layers, color: "#5b4bd6" },
  { y: 433, t: "Quick Replies", s: "Instant Actions", icon: MessageSquare, color: "#2f6df0" },
  { y: 570, t: "Verified Sender", s: "Builds Trust", icon: ShieldCheck, color: GREEN },
  { y: 708, t: "Works on Android Phones", s: "", icon: Smartphone, color: "#f59e0b" },
]
const CONNECT: [number, number, number, number][] = [
  [215, 551, 293, 0], [350, 551, 389, 0], [487, 548, 468, 0], [621, 545, 563, 0], [755, 540, 688, 0],
]
const RIGHT = [
  { t: "Rich, Interactive Conversations", icon: MessageSquare, bg: "#d9f2e5", color: GREEN },
  { t: "Higher Engagement", icon: Zap, bg: "#fff3d0", color: "#f4a418" },
  { t: "Better Conversions", icon: BarChart3, bg: "#d9f2e5", color: GREEN },
  { t: "All in One Chat Flow", icon: Users, bg: "#d9f2e5", color: GREEN },
]

const CSS = `
@keyframes rch-flow { to { stroke-dashoffset: -24 } }
@keyframes rch-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
@keyframes rch-pop { from { opacity: 0; transform: translateY(14px) scale(.96) } to { opacity: 1; transform: none } }
@keyframes rch-ring { 0% { transform: scale(1); opacity: .5 } 100% { transform: scale(1.5); opacity: 0 } }
@keyframes rch-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.03) } }
@keyframes rch-dots { 0%, 60%, 100% { transform: translateY(0); opacity: .4 } 30% { transform: translateY(-8px); opacity: 1 } }
@keyframes rch-press { 0% { transform: scale(1) } 40% { transform: scale(.93) } 100% { transform: scale(1) } }
@keyframes rch-shine { 0% { transform: translateX(-140%) skewX(-18deg) } 55%, 100% { transform: translateX(260%) skewX(-18deg) } }
@keyframes rch-spark { 0%, 100% { opacity: .25; transform: scale(.7) } 50% { opacity: 1; transform: scale(1.15) } }
@keyframes rch-wave { 0% { transform: scale(.6); opacity: .55 } 100% { transform: scale(1.12); opacity: 0 } }
@keyframes rch-ray { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
.rch-flow { animation: rch-flow 1.4s linear infinite }
.rch-float { animation: rch-float 6s ease-in-out infinite }
.rch-pop { animation: rch-pop .5s cubic-bezier(.3,1.2,.4,1) both }
.rch-ring { animation: rch-ring 2.2s ease-out infinite }
.rch-pulse { animation: rch-pulse 2.6s ease-in-out infinite }
.rch-pulse2 { animation: rch-pulse 2s ease-in-out infinite }
.rch-dot { animation: rch-dots 1s ease-in-out infinite }
.rch-press { animation: rch-press .45s ease-out both }
.rch-shine { animation: rch-shine 3.6s ease-in-out infinite }
.rch-spark { transform-box: fill-box; transform-origin: center; animation: rch-spark 2.6s ease-in-out infinite }
.rch-wave { transform-box: fill-box; transform-origin: center; animation: rch-wave 3.2s ease-out infinite }
.rch-ray { animation: rch-ray 2.2s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .rch-flow, .rch-float, .rch-pop, .rch-ring, .rch-ray, .rch-pulse, .rch-pulse2, .rch-dot, .rch-press, .rch-shine, .rch-spark, .rch-wave { animation: none } }
`

function A({ x, y, w, h, r, style, className, children }: { x: number; y: number; w?: number; h?: number; r?: number; style?: CSSProperties; className?: string; children?: ReactNode }) {
  return <div className={className} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, ...style }}>{children}</div>
}

function Headphones() {
  return (
    <svg viewBox="0 0 110 72" width="110" height="72" aria-hidden>
      <path d="M26 44 a29 30 0 0 1 58 0" fill="none" stroke="#1d3f9c" strokeWidth="7" strokeLinecap="round" />
      <rect x="17" y="40" width="16" height="26" rx="8" fill="#2a5bd7" /><rect x="77" y="40" width="16" height="26" rx="8" fill="#2a5bd7" />
      <rect x="21" y="46" width="6" height="14" rx="3" fill="#7ea2f0" opacity=".7" /><rect x="83" y="46" width="6" height="14" rx="3" fill="#7ea2f0" opacity=".7" />
    </svg>
  )
}
function Watch() {
  return (
    <svg viewBox="0 0 110 72" width="110" height="72" aria-hidden>
      <rect x="42" y="2" width="26" height="12" rx="4" fill="#2b3237" /><rect x="42" y="58" width="26" height="12" rx="4" fill="#2b3237" />
      <rect x="30" y="12" width="50" height="48" rx="14" fill="#1a1f23" />
      <rect x="35" y="17" width="40" height="38" rx="10" fill="#1f6b52" />
      <path d="M42 44 l6 -10 l6 6 l8 -12" fill="none" stroke="#7ff0b8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function Sneaker() {
  return (
    <svg viewBox="0 0 110 72" width="110" height="72" aria-hidden>
      <path d="M12 50 q0 -12 10 -14 l14 -4 q12 14 26 8 l22 8 q16 4 18 14 v4 H12z" fill="#2f6df0" />
      <path d="M12 54 H106 v6 q-2 4 -8 4 H20 q-8 0 -8 -6z" fill="#fff" />
      <path d="M44 32 l6 6 M54 35 l6 6 M64 38 l6 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M26 40 q6 -2 12 2" stroke="#8fb2ff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Layer({ z, children }: { z: number; children: ReactNode }) {
  return <div data-z={z} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>{children}</div>
}

// which feature pill and which right-hand point light up at each step of the conversation
const LEFT_ON = [3, 0, 1, 1, 2, 2, 4, 4, 4]
const RIGHT_ON = [-1, 0, 0, 1, 1, 2, 3, 3, 3]

function Banner({ uid }: { uid: string }) {
  return (
    <svg width="404" height="210" viewBox="0 0 404 210" aria-hidden style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id={`rch-bn-${uid}`} x1="0" y1="0" x2="1" y2=".6"><stop offset="0" stopColor="#fbc552" /><stop offset=".5" stopColor="#f8922f" /><stop offset="1" stopColor="#f0661f" /></linearGradient>
        <linearGradient id={`rch-box-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#25a05f" /><stop offset="1" stopColor="#0f6b3d" /></linearGradient>
        <linearGradient id={`rch-gold-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6d77a" /><stop offset="1" stopColor="#d49a2a" /></linearGradient>
        <radialGradient id={`rch-glow-${uid}`} cx=".7" cy=".5" r=".6"><stop offset="0" stopColor="#fff4c4" stopOpacity=".9" /><stop offset="1" stopColor="#fff4c4" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="404" height="210" fill={`url(#rch-bn-${uid})`} />
      <rect width="404" height="210" fill={`url(#rch-glow-${uid})`} />
      {[[40, 30, 5], [170, 24, 4], [250, 18, 3], [372, 40, 4], [120, 120, 3], [380, 120, 3]].map(([x, y, r]) => <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="#fff" opacity=".5" />)}
      {/* gift box */}
      <rect x="226" y="86" width="168" height="108" rx="6" fill={`url(#rch-box-${uid})`} />
      <rect x="216" y="64" width="188" height="34" rx="6" fill="#1b8a50" />
      <rect x="216" y="64" width="188" height="10" rx="5" fill="#fff" opacity=".18" />
      <rect x="296" y="64" width="30" height="130" fill={`url(#rch-gold-${uid})`} />
      <rect x="226" y="118" width="168" height="16" fill={`url(#rch-gold-${uid})`} opacity=".9" />
      <g transform="translate(311 56)">
        <ellipse cx="-30" cy="-10" rx="30" ry="15" transform="rotate(-24 -30 -10)" fill={`url(#rch-gold-${uid})`} />
        <ellipse cx="30" cy="-10" rx="30" ry="15" transform="rotate(24 30 -10)" fill={`url(#rch-gold-${uid})`} />
        <ellipse cx="-26" cy="-8" rx="16" ry="6" transform="rotate(-24 -26 -8)" fill="#a8731a" opacity=".35" />
        <ellipse cx="26" cy="-8" rx="16" ry="6" transform="rotate(24 26 -8)" fill="#a8731a" opacity=".35" />
        <circle r="11" fill="#e8b24a" /><circle r="5" cx="-2" cy="-2" fill="#f7dd8e" />
      </g>
      {/* diyas */}
      {[[196, 176, 1], [376, 188, 0.8]].map(([x, y, s]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse cx="0" cy="22" rx="34" ry="6" fill="#000" opacity=".18" />
          <path d="M-34 4 h68 a34 24 0 0 1 -68 0z" fill="#8a4a1e" /><path d="M-34 4 h68" stroke="#b8702f" strokeWidth="4" />
          <path d="M0 -34 q-12 14 0 30 q12 -16 0 -30z" fill="#ffb02e" /><path d="M0 -22 q-5 8 0 18 q5 -10 0 -18z" fill="#fff2b0" />
          <circle cx="0" cy="-20" r="24" fill="#ffd36a" opacity=".25" />
        </g>
      ))}
    </svg>
  )
}

function Scene({ step }: { step: number }) {
  const uid = useId().replace(/:/g, "")
  const lOn = LEFT_ON[Math.min(step, 8)]
  const rOn = RIGHT_ON[Math.min(step, 8)]
  const cardH = step >= 3 ? 414 : step >= 2 ? 352 : 266
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1536, height: 1024, color: INK, fontFamily: "inherit" }}>
     <div style={{ position: "absolute", inset: 0 }}>
      {/* background washes */}
      <Layer z={-140}>
      <svg width="1536" height="1024" viewBox="0 0 1536 1024" style={{ position: "absolute", inset: 0, maskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 50%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 50%, transparent 100%)" }} aria-hidden>
        <defs><radialGradient id={`rch-r1-${uid}`}><stop offset="0" stopColor="#d3f3e4" stopOpacity=".9" /><stop offset="1" stopColor="#d3f3e4" stopOpacity="0" /></radialGradient></defs>
        <circle cx="120" cy="140" r="380" fill={`url(#rch-r1-${uid})`} />
        <circle cx="180" cy="900" r="330" fill={`url(#rch-r1-${uid})`} opacity=".8" />
        <circle cx="1400" cy="160" r="340" fill={`url(#rch-r1-${uid})`} opacity=".8" />
        <circle cx="1420" cy="880" r="320" fill={`url(#rch-r1-${uid})`} opacity=".7" />
      </svg>
      </Layer>
      <Layer z={-30}>
      <svg width="1536" height="1024" viewBox="0 0 1536 1024" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <defs>
          <radialGradient id={`rch-r1-${uid}`}><stop offset="0" stopColor="#d3f3e4" stopOpacity=".9" /><stop offset="1" stopColor="#d3f3e4" stopOpacity="0" /></radialGradient>
          
          <linearGradient id={`rch-ped-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b6ecd5" /><stop offset="1" stopColor="#7fd9b3" /></linearGradient>
          <linearGradient id={`rch-bez-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c9e9e2" /><stop offset=".5" stopColor="#6fbfb0" /><stop offset="1" stopColor="#2f9c8b" /></linearGradient>
          <filter id={`rch-blur-${uid}`}><feGaussianBlur stdDeviation="18" /></filter>
        </defs>
        {/* pedestal */}
        <ellipse cx="781" cy="975" rx="380" ry="30" fill="#0a5b46" opacity=".25" filter={`url(#rch-blur-${uid})`} />
        <path d="M405 934 v26 a376 46 0 0 0 752 0 v-26z" fill={`url(#rch-ped-${uid})`} />
        <ellipse cx="781" cy="934" rx="376" ry="46" fill="#d7f6e8" />
        <ellipse cx="781" cy="934" rx="330" ry="36" fill="#bff0da" opacity=".8" />
        <ellipse className="rch-wave" cx="781" cy="934" rx="330" ry="36" fill="none" stroke="#2fc58b" strokeWidth="4" />
        <ellipse className="rch-wave" style={{ animationDelay: "1.6s" }} cx="781" cy="934" rx="330" ry="36" fill="none" stroke="#2fc58b" strokeWidth="4" />
        {[[470, 120, 14], [1080, 70, 11], [1500, 520, 13], [60, 520, 12], [700, 20, 10], [1290, 960, 12], [250, 990, 10]].map(([x, y, r], i) => (
          <path key={`${x}${y}`} className="rch-spark" style={{ animationDelay: `${i * 0.37}s` }} d={`M${x} ${y - r} L${x + r * 0.28} ${y - r * 0.28} L${x + r} ${y} L${x + r * 0.28} ${y + r * 0.28} L${x} ${y + r} L${x - r * 0.28} ${y + r * 0.28} L${x - r} ${y} L${x - r * 0.28} ${y - r * 0.28}Z`} fill="#3fcf97" opacity=".7" />
        ))}
        {/* connectors */}
        {CONNECT.map(([y1, x2, y2], i) => (
          <g key={y1}>
            <path className="rch-flow" d={`M451 ${y1 + 2} C 500 ${y1 + 10}, 520 ${y2 - 20}, ${x2} ${y2}`} fill="none" stroke={GREEN} strokeWidth="3" strokeDasharray="9 11" strokeLinecap="round" style={{ animationDelay: `${-i * 0.2}s` }} />
            <circle cx="443" cy={y1} r="8.5" fill="#fff" stroke={GREEN} strokeWidth="3.5" />
            <circle r="7" fill={GREEN}><animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.5}s`} path={`M451 ${y1 + 2} C 500 ${y1 + 10}, 520 ${y2 - 20}, ${x2} ${y2}`} /></circle>
          </g>
        ))}
        {/* rays */}
        <g stroke={GREEN} strokeWidth="9" strokeLinecap="round">
          <path className="rch-ray" d="M1387 108 L1385 78" /><path className="rch-ray" style={{ animationDelay: ".4s" }} d="M1423 118 L1440 93" /><path className="rch-ray" style={{ animationDelay: ".8s" }} d="M1444 148 L1473 140" />
        </g>
      </svg>
      </Layer>

      {/* left pills */}
      <Layer z={46}>
      {LEFT.map((c, i) => {
        const on = i === lOn
        return (
          <A key={c.t} x={104} y={c.y} w={313} h={107} style={{ transformOrigin: "center", transform: `scale(${on ? 1.04 : 1})`, transition: "transform .6s cubic-bezier(.3,1.2,.4,1)" }}>
            <div className="rch-float" style={{ position: "absolute", inset: 0, borderRadius: 54, animationDelay: `${-i * 0.9}s`, background: on ? "linear-gradient(135deg, #ffffff, #effaf4)" : "#fff", border: `2px solid ${on ? GREEN : "transparent"}`, transition: "all .5s ease", boxShadow: on ? "0 30px 50px -22px rgba(22,165,107,.6), 0 0 0 6px rgba(22,165,107,.12), inset 0 -3px 0 rgba(22,165,107,.12)" : "0 26px 44px -24px rgba(20,100,80,.45), 0 4px 14px rgba(20,100,80,.08), inset 0 -3px 0 rgba(22,165,107,.08)" }}>
              <A x={24} y={25} w={52} h={52} style={{ color: c.color, display: "flex", alignItems: "center", justifyContent: "center", transform: on ? "scale(1.12)" : "none", transition: "transform .5s" }}><c.icon style={{ width: 50, height: 50 }} strokeWidth={1.8} /></A>
              <A x={92} y={0} w={222} h={103} style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.15, display: "flex", alignItems: "center", whiteSpace: "pre-line", letterSpacing: "-0.01em" }}>{c.t === "Works on Android Phones" ? "Works on\nAndroid Phones" : c.t}</A>
            </div>
          </A>
        )
      })}
      </Layer>

      {/* phone */}
      <Layer z={0}>
      <A x={531} y={27} w={512} h={921} r={88} style={{ background: "linear-gradient(135deg, #cdeae3, #6fbfb0 45%, #2f9c8b)", boxShadow: "0 50px 80px -30px rgba(10,90,70,.55), inset 0 0 0 3px rgba(255,255,255,.5)" }} />
      <A x={541} y={37} w={492} h={901} r={80} style={{ background: "#0e1f22" }} />
      <A x={548} y={45} w={477} h={885} r={73} style={{ background: "#f5f9f7", overflow: "hidden" }}>
        {/* status + header */}
        <A x={0} y={0} w={477} h={146} style={{ background: "#fff", boxShadow: "0 6px 18px -12px rgba(10,60,50,.35)" }} />
        <A x={74} y={26} style={{ fontSize: 21, fontWeight: 700 }}>9:41</A>
        <A x={186} y={12} w={125} h={34} r={17} style={{ background: "#0b0b0d" }} />
        <A x={352} y={28} w={110} h={24}>
          <svg width="110" height="24" viewBox="0 0 110 24" aria-hidden><g fill={INK}><rect x="0" y="14" width="4" height="8" rx="1" /><rect x="7" y="10" width="4" height="12" rx="1" /><rect x="14" y="6" width="4" height="16" rx="1" /><rect x="21" y="2" width="4" height="20" rx="1" /></g><path d="M38 9 q9 -8 18 0 M42 14 q5 -5 10 0" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" /><circle cx="47" cy="19" r="2.4" fill={INK} /><rect x="72" y="4" width="32" height="16" rx="5" fill="none" stroke={INK} strokeWidth="2" /><rect x="75" y="7" width="24" height="10" rx="2.5" fill={INK} /></svg>
        </A>
        <A x={54} y={72} style={{ color: INK }}><ChevronLeft style={{ width: 36, height: 36 }} strokeWidth={2.6} /></A>
        <A x={101} y={70} w={58} h={58} r={29} style={{ background: `linear-gradient(135deg, #26b87a, ${GREEN_DK})`, color: "#fff", fontSize: 30, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>A</A>
        <A x={175} y={68} style={{ fontSize: 26, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>Aarav Mart<svg width="26" height="26" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="11" fill="#2f8bff" /><path d="M7 12.5 l3.4 3.4 L17 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></A>
        <A x={175} y={103} style={{ fontSize: 20, color: GREY }}>Verified sender</A>
        <A x={424} y={78} style={{ color: INK }}><MoreVertical style={{ width: 30, height: 30 }} strokeWidth={2.8} /></A>

        {/* the card (grows as the message arrives) */}
        {step >= 1 && (
          <A x={36} y={172} w={409} h={cardH} r={26} className="rch-pop" style={{ background: "#fff", boxShadow: "0 18px 36px -22px rgba(10,60,50,.4)", overflow: "hidden", transition: "height .6s cubic-bezier(.3,1.1,.4,1)" }}>
            <A x={0} y={0} w={409} h={210} style={{ overflow: "hidden" }}><Banner uid={uid} /></A>
            <A x={26} y={24} style={{ fontSize: 35, fontWeight: 800, lineHeight: 1.05, color: "#3a1d0a", width: 210 }}>Your Diwali Hamper is Ready!</A>
            <A x={24} y={228} style={{ fontSize: 21, fontWeight: 500, color: INK }}>Apply code DIWALI500 at checkout.</A>
            {step >= 2 && [
              { x: 22, bg: "#dbe9fb", el: <Headphones />, d: 0 },
              { x: 144, bg: "#dff1e5", el: <Watch />, d: 0.14 },
              { x: 266, bg: "#d9f0e6", el: <Sneaker />, d: 0.28 },
            ].map((t) => (
              <A key={t.x} x={t.x} y={261} w={117} h={74} r={14} className="rch-pop" style={{ background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", animationDelay: `${t.d}s` }}>{t.el}</A>
            ))}
            {step >= 3 && (
              <A x={20} y={348} w={363} h={50} r={25} className="rch-pop" style={{ background: `linear-gradient(180deg, #1fb27a, ${GREEN_DK})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 22, fontWeight: 700, boxShadow: "0 12px 20px -12px rgba(14,138,88,.8)" }}><span style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 25 }}><i className="rch-shine" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 70, background: "linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)" }} /></span><ShoppingCart style={{ width: 26, height: 26, position: "relative" }} strokeWidth={2.2} /><span style={{ position: "relative" }}>View Offer</span></A>
            )}
          </A>
        )}

        {/* suggested replies (Track Order gets tapped) */}
        {step >= 4 && step <= 5 && [
          { x: 35, y: 602, w: 186, t: "Track Order", I: Truck, tap: step === 5, d: 0 },
          { x: 233, y: 602, w: 186, t: "View Offer", I: Tag, tap: false, d: 0.12 },
          { x: 34, y: 658, w: 160, t: "Not Now", I: X, tap: false, d: 0.24 },
        ].map((c) => (
          <A key={c.t} x={c.x} y={c.y} w={c.w} h={45} r={23} className={c.tap ? "rch-press" : "rch-pop"} style={{ background: c.tap ? GREEN : "#fff", color: c.tap ? "#fff" : INK, border: `2px solid ${GREEN}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 20, fontWeight: 600, animationDelay: c.tap ? "0s" : `${c.d}s` }}><c.I style={{ width: 26, height: 26, color: c.tap ? "#fff" : GREEN }} strokeWidth={2} />{c.t}</A>
        ))}

        {step >= 6 && (
          <A x={234} y={612} w={198} h={52} r={26} className="rch-pop" style={{ background: "#d8f1e3", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 21, fontWeight: 500, color: "#2c5a49" }}>Track order<CheckCheck style={{ width: 28, height: 28, color: "#2f9c8b" }} strokeWidth={2.4} /></A>
        )}
        {step === 7 && (
          <A x={34} y={690} w={118} h={50} r={25} className="rch-pop" style={{ background: "#fff", boxShadow: "0 8px 18px -12px rgba(10,60,50,.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
            {[0, 0.15, 0.3].map((d) => <i key={d} className="rch-dot" style={{ width: 11, height: 11, borderRadius: "50%", background: GREEN, animationDelay: `${d}s` }} />)}
          </A>
        )}
        {step >= 8 && (
          <A x={34} y={682} w={330} h={92} r={26} className="rch-pop" style={{ background: "#fff", boxShadow: "0 10px 22px -14px rgba(10,60,50,.4)" }}>
            <A x={20} y={14} style={{ fontSize: 21, fontWeight: 700 }}>Out for delivery 🚚</A>
            <A x={20} y={44} style={{ fontSize: 19, color: GREY }}>Arriving today by 6 PM</A>
            <A x={20} y={74} w={290} h={7} r={4} style={{ background: "#e3eeea" }}><A x={0} y={0} w={200} h={7} r={4} style={{ background: GREEN }} /></A>
          </A>
        )}

        {/* glass sheen */}
        <A x={0} y={0} w={477} h={885} style={{ background: "linear-gradient(115deg, rgba(255,255,255,.28) 0%, rgba(255,255,255,0) 32%)", pointerEvents: "none" }} />
        {/* composer */}
        <A x={0} y={786} w={477} h={99} style={{ background: "#fff", boxShadow: "0 -8px 20px -16px rgba(10,60,50,.35)" }}>
          <A x={14} y={26} w={42} h={42} r={21} style={{ color: GREEN_DK, display: "flex", alignItems: "center", justifyContent: "center" }}><Plus style={{ width: 36, height: 36 }} strokeWidth={2.4} /></A>
          <A x={69} y={18} w={302} h={55} r={28} style={{ background: "#f1f5f4", display: "flex", alignItems: "center", paddingLeft: 22, fontSize: 21, color: GREY }}>RCS message</A>
          <A x={332} y={29} style={{ color: GREEN_DK }}><Smile style={{ width: 34, height: 34 }} strokeWidth={2.2} /></A>
          <A x={384} y={17} w={54} h={54} r={27} style={{ background: `linear-gradient(135deg, #26b87a, ${GREEN_DK})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 18px -8px rgba(14,138,88,.8)" }}><Send style={{ width: 26, height: 26 }} strokeWidth={2.4} /></A>
        </A>
      </A>
      </Layer>

      {/* RCS badge */}
      <Layer z={90}>
      <A x={1120} y={150} w={300} h={260} r={130} style={{ background: "radial-gradient(closest-side, rgba(47,197,139,.45), rgba(47,197,139,0))", filter: "blur(10px)" }} />
      <A x={1090} y={120} w={350} h={300} className="rch-float" style={{ animationDelay: "-2s" }}>
        <svg width="350" height="300" viewBox="0 0 350 300" aria-hidden>
          <defs>
            <linearGradient id={`rch-bub-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2ed592" /><stop offset=".55" stopColor="#12ac6e" /><stop offset="1" stopColor="#0a8a57" /></linearGradient>
            <linearGradient id={`rch-gloss-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".38" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          </defs>
          <path d="M66 20 H284 A56 56 0 0 1 340 76 V179 A56 56 0 0 1 284 235 H142 L42 292 L68 235 A56 56 0 0 1 10 179 V76 A56 56 0 0 1 66 20 Z" fill={`url(#rch-bub-${uid})`} />
          <path d="M66 20 H284 A56 56 0 0 1 340 76 V108 H10 V76 A56 56 0 0 1 66 20 Z" fill={`url(#rch-gloss-${uid})`} />
          <rect x="44" y="84" width="262" height="108" rx="40" fill="#fff" />
          <path d="M82 188 L66 226 L124 190 Z" fill="#fff" />
          <text x="175" y="166" textAnchor="middle" fontSize="82" fontWeight="900" fill="#0d1a1c" letterSpacing="-2">RCS</text>
        </svg>
        <A x={264} y={4} w={76} h={76} r={38} style={{ background: "#fff", boxShadow: "0 10px 20px -8px rgba(10,100,70,.5)" }}>
          <A x={8} y={8} w={60} h={60} r={30} className="rch-pulse2" style={{ background: `linear-gradient(135deg, #26c88a, ${GREEN_DK})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Check style={{ width: 38, height: 38 }} strokeWidth={4} /></A>
        </A>
      </A>
      <A x={1070} y={408} w={400} style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.16, textAlign: "center", whiteSpace: "nowrap" }}>Next-Gen<br />Business Messaging</A>

      </Layer>

      {/* right panel */}
      <Layer z={60}>
      <A x={1096} y={520} w={361} h={332} style={{ transformOrigin: "right center", transform: "none" }}>
        <div className="rch-float" style={{ position: "absolute", inset: 0, borderRadius: 36, background: "#fff", animationDelay: "-3s", boxShadow: "0 30px 50px -26px rgba(20,100,80,.45), 0 4px 14px rgba(20,100,80,.08), inset 0 -3px 0 rgba(22,165,107,.08)" }}>
          {RIGHT.map((r, i) => {
            const on = i === rOn
            return (
              <A key={r.t} x={20} y={14 + i * 78} w={321} h={70} r={22} style={{ background: on ? "#effaf4" : "transparent", boxShadow: on ? `0 0 0 2.5px ${GREEN}` : "none", transition: "all .5s ease" }}>
                <A x={10} y={1} w={64} h={64} r={20} style={{ background: r.bg, color: r.color, display: "flex", alignItems: "center", justifyContent: "center", transform: on ? "scale(1.1)" : "none", transition: "transform .5s" }}><r.icon style={{ width: 36, height: 36 }} strokeWidth={2} /></A>
                <A x={92} y={0} w={222} h={66} style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.14, display: "flex", alignItems: "center" }}>{r.t}</A>
              </A>
            )
          })}
        </div>
      </A>
      </Layer>
     </div>
    </div>
  )
}

function Stage({ crop, children, label }: { crop: { x: number; y: number; w: number; h: number }; children: ReactNode; label?: string }) {
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
  const s = w / crop.w
  return (
    <div ref={ref} role={label ? "img" : undefined} aria-label={label} className="relative w-full overflow-hidden" style={{ aspectRatio: `${crop.w} / ${crop.h}`, opacity: w ? 1 : 0, transition: "opacity .3s" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1536, height: 1024, transformOrigin: "0 0", transform: `translate(${-crop.x * s}px, ${-crop.y * s}px) scale(${s})` }}>{children}</div>
    </div>
  )
}

export function RcsHero() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(8)
      return
    }
    let timers: number[] = []
    const run = () => {
      const marks = [0, 700, 2300, 3700, 5000, 7200, 8100, 9200, 10500]
      timers = marks.map((t, i) => window.setTimeout(() => setStep(i), t))
      timers.push(window.setTimeout(run, 15500))
    }
    run()
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  const label = "An RCS business message from Aarav Mart on a phone: a Diwali hamper card with product thumbnails, a View Offer button and tappable replies, beside the RCS badge and the features Rich Media, Carousels, Quick Replies, Verified Sender and Works on Android Phones"
  return (
    <div className="relative mx-auto w-full max-w-[1240px]" style={{ textRendering: "geometricPrecision", WebkitFontSmoothing: "antialiased" }}>
      <div className="hidden sm:block">
        <Stage crop={{ x: 0, y: 0, w: 1536, h: 1024 }} label={label}>
          <Scene step={step} />
        </Stage>
      </div>
      <div className="sm:hidden">
        <Stage crop={{ x: 500, y: 10, w: 580, h: 990 }} label={label}>
          <Scene step={step} />
        </Stage>
        <ul className="mt-5 grid grid-cols-2 gap-3">
          {[...LEFT.map((c) => ({ t: c.t, s: c.s, I: c.icon, color: c.color })), ...RIGHT.map((r) => ({ t: r.t, s: "", I: r.icon, color: r.color }))].map((c) => (
            <li key={c.t} className="flex items-center gap-3 rounded-2xl border bg-white px-3.5 py-3 shadow-sm" style={{ borderColor: "#e3eeea" }}>
              <c.I className="h-5 w-5 shrink-0" style={{ color: c.color }} />
              <span className="text-[13px] font-semibold leading-tight">{c.t}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
