"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import {
  BadgeCheck,
  Bot,
  Check,
  ChevronLeft,
  Inbox,
  MessageSquareText,
  MoreHorizontal,
  Package,
  Plus,
  Send,
  Shirt,
  Smile,
  Sparkles,
  Truck,
  Undo2,
  Zap,
} from "lucide-react"

// Hero artwork for /channels/instagram, built in code (no image): a glossy phone showing an Instagram DM where the AI
// agent answers and sends a card, floating Comment Automation and Shared Inbox cards, a 3D Instagram icon and parcel,
// and three quick replies that really switch the whole conversation. It is laid out on a fixed 1448 x 1086 stage and
// scaled to whatever width it is given; phones get two closer crops of the same stage so the text stays readable.

type Topic = "sizing" | "shipping" | "returns"
const ORDER: Topic[] = ["sizing", "shipping", "returns"]
const LABEL: Record<Topic, string> = { sizing: "Sizing", shipping: "Shipping", returns: "Returns" }

const DATA: Record<Topic, {
  q: string; a: string; icon: "shirt" | "truck" | "return"
  cardTitle: string; cardSub: string; cardCta: string
  reply: string; done: string
  cUser: string; cInit: string; cText: string; cChip: string
  in1: string; in1Sub: string; in3Sub: string
  alt: string
}> = {
  sizing: {
    q: "Does this come in size M?", a: "Yes! Size M is in stock. I've added the shirt below.", icon: "shirt",
    cardTitle: "Linen Shirt", cardSub: "₹1,499 · Size M", cardCta: "View product",
    reply: "Perfect, ordering now!", done: "Order placed. Ships tomorrow.",
    cUser: "meera.k", cInit: "M", cText: "Price? Link please", cChip: "Auto-DM sent with the link",
    in1: "meera.k", in1Sub: "Story reply · size M?", in3Sub: "Delivery confirmed",
    alt: "An Instagram DM where a customer asks about size M and the AI agent answers with a product card",
  },
  shipping: {
    q: "When will my order arrive?", a: "Arrives Thursday. I've pulled up your tracking below.", icon: "truck",
    cardTitle: "Order #1042", cardSub: "Out for delivery · Thu", cardCta: "Track order",
    reply: "Great, thanks!", done: "Tracking sent. Arrives Thursday.",
    cUser: "arjun.s", cInit: "A", cText: "Ships to Pune?", cChip: "Auto-DM sent with delivery info",
    in1: "arjun.s", in1Sub: "Shipping question", in3Sub: "Out for delivery",
    alt: "An Instagram DM where a customer asks when an order will arrive and the AI agent sends a tracking card",
  },
  returns: {
    q: "Can I return this if it doesn't fit?", a: "Yes, 7-day free returns. I've created a return label for you below.", icon: "return",
    cardTitle: "Return label", cardSub: "Free pickup · 7 days", cardCta: "Get label",
    reply: "Perfect, thank you!", done: "Return booked. Pickup tomorrow.",
    cUser: "neha.r", cInit: "N", cText: "Can I exchange it?", cChip: "Auto-DM sent with the policy",
    in1: "neha.r", in1Sub: "Returns question", in3Sub: "Pickup booked",
    alt: "An Instagram DM where a customer asks about returns and the AI agent confirms free 7-day returns with a return label",
  },
}

const INK = "#15222c"
const GREY = "#6b7a85"
const TEAL = "oklch(0.62 0.14 168)"
const TEAL_DK = "oklch(0.5 0.12 176)"
const MINT = "color-mix(in oklch, oklch(0.62 0.14 168) 12%, white)"
const MINT2 = "color-mix(in oklch, oklch(0.62 0.14 168) 22%, white)"
const GRAD = "linear-gradient(135deg, oklch(0.72 0.13 175), oklch(0.62 0.14 168) 55%, oklch(0.5 0.12 176))"
const CARD_SH = "0 30px 60px -22px rgba(15,60,50,.28), 0 6px 18px rgba(15,60,50,.07)"
const GLASS = "linear-gradient(180deg, rgba(255,255,255,.96), rgba(244,252,249,.92))"

const CSS = `
@keyframes igh-pop { from { opacity: 0; transform: translateY(18px) scale(.97) } to { opacity: 1; transform: none } }
@keyframes igh-float { 0%, 100% { transform: translateY(-5px) } 50% { transform: translateY(6px) } }
@keyframes igh-tw { 0%, 100% { opacity: .4 } 50% { opacity: 1 } }
.igh-pop { opacity: 0; animation: igh-pop .6s cubic-bezier(.3,1.2,.4,1) both }
.igh-float { animation: igh-float 7s ease-in-out infinite }
.igh-tw { animation: igh-tw 2.4s ease-in-out infinite }
@keyframes igh-sway { 0%, 100% { transform: rotateY(-7deg) rotateX(2deg) } 50% { transform: rotateY(7deg) rotateX(-2deg) } }
@keyframes igh-drift { 0%, 100% { transform: translate(0, 0) rotate(0deg) } 50% { transform: translate(34px, -26px) rotate(4deg) } }
@keyframes igh-drift2 { 0%, 100% { transform: translate(0, 0) rotate(0deg) } 50% { transform: translate(-40px, 18px) rotate(-3deg) } }
@keyframes igh-orb { 0%, 100% { transform: translate(0, 0) scale(1); opacity: .55 } 50% { transform: translate(28px, -40px) scale(1.15); opacity: .9 } }
@keyframes igh-spin { 0%, 100% { transform: rotate(-14deg) rotateY(-24deg) } 50% { transform: rotate(-8deg) rotateY(24deg) translateY(-8px) } }
@keyframes igh-bob { 0%, 100% { transform: translateY(0) rotateZ(-3deg) } 50% { transform: translateY(-16px) rotateZ(3deg) } }
@keyframes igh-ping { 0% { transform: scale(.85); opacity: .7 } 100% { transform: scale(1.6); opacity: 0 } }
@keyframes igh-dash { to { stroke-dashoffset: -28 } }
@keyframes igh-typing { 0% { opacity: 0; transform: translateY(8px) } 8%, 52% { opacity: 1; transform: none } 62%, 100% { opacity: 0; transform: none } }
@keyframes igh-dot { 0%, 60%, 100% { transform: translateY(0); opacity: .45 } 30% { transform: translateY(-9px); opacity: 1 } }
@keyframes igh-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.12) } }
@keyframes igh-glow { 0%, 100% { box-shadow: 0 8px 14px -6px rgba(20,120,90,.5), 0 0 0 0 rgba(60,190,150,.5) } 50% { box-shadow: 0 8px 14px -6px rgba(20,120,90,.5), 0 0 0 12px rgba(60,190,150,0) } }
.igh-drift { transform-box: fill-box; transform-origin: center; animation: igh-drift 9s ease-in-out infinite }
.igh-drift2 { transform-box: fill-box; transform-origin: center; animation: igh-drift2 11s ease-in-out infinite }
.igh-orb { transform-box: fill-box; transform-origin: center; animation: igh-orb 7s ease-in-out infinite }
.igh-spin { animation: igh-spin 7s ease-in-out infinite }
.igh-bob { animation: igh-bob 6s ease-in-out infinite }
.igh-ping { animation: igh-ping 2.8s ease-out infinite }
.igh-dashflow { animation: igh-dash 1.6s linear infinite }
.igh-typing { opacity: 0; animation: igh-typing 1.5s ease both }
.igh-dot { animation: igh-dot 1s ease-in-out infinite }
.igh-pulse { animation: igh-pulse 2.2s ease-in-out infinite }
.igh-glow { animation: igh-glow 2.4s ease-out infinite }
.igh-pill { cursor: pointer; pointer-events: auto; transition: transform .2s ease, box-shadow .2s ease }
.igh-pill:hover { transform: translateY(-2px) }
.igh-pill:focus-visible { outline: 3px solid #15222c; outline-offset: 3px }
@media (prefers-reduced-motion: reduce) { .igh-pop { animation: none; opacity: 1 } .igh-float, .igh-tw, .igh-drift, .igh-drift2, .igh-orb, .igh-spin, .igh-bob, .igh-ping, .igh-dashflow, .igh-dot, .igh-pulse, .igh-glow { animation: none } .igh-typing { display: none } .igh-pill { transition: none } }
`

function A({ x, y, w, h, r, style, className, children }: { x: number; y: number; w?: number; h?: number; r?: number; style?: CSSProperties; className?: string; children?: ReactNode }) {
  return (
    <div className={className} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, ...style }}>
      {children}
    </div>
  )
}
const T = (size: number, weight = 500, color = INK): CSSProperties => ({ fontSize: size, fontWeight: weight, color, lineHeight: 1.25, whiteSpace: "nowrap" })

function Check2({ s = 34, bg = "#fff", fg = TEAL }: { s?: number; bg?: string; fg?: string }) {
  return (
    <span style={{ width: s, height: s, borderRadius: "50%", background: bg, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
      <Check style={{ width: s * 0.58, height: s * 0.58, color: fg }} strokeWidth={3.6} />
    </span>
  )
}

function Avatar({ x, y }: { x: number; y: number }) {
  return (
    <A x={x} y={y} w={56} h={56} r={28} style={{ background: MINT2, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
      <svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="22" r="9.5" fill={TEAL} /><path d="M10 52 Q28 28 46 52Z" fill={TEAL} /></svg>
    </A>
  )
}

function IgGlyph({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="9">
      <rect x="18" y="18" width="64" height="64" rx="20" /><circle cx="50" cy="50" r="15" /><circle cx="68" cy="32" r="3.2" fill="#fff" stroke="none" />
    </svg>
  )
}

const IG_GRAD = "linear-gradient(45deg, #fdc830 0%, #f5445c 38%, #d6249f 68%, #6a3de8 100%)"

function CardIcon({ kind }: { kind: "shirt" | "truck" | "return" }) {
  const p = { style: { width: 58, height: 58, color: TEAL }, strokeWidth: 2.4 }
  if (kind === "shirt") return <Shirt {...p} />
  if (kind === "truck") return <Truck {...p} />
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" stroke={TEAL} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14 H44 M14 25 H34" stroke="#b9c6cc" /><path d="M16 46 H40 a12 12 0 0 0 0 -24" /><path d="M26 36 L16 46 L26 56" />
    </svg>
  )
}

// one slice of the 3D scene, pushed towards the viewer by `z` px
function Layer({ z, children }: { z: number; children: ReactNode }) {
  return <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: `translateZ(${z}px)`, pointerEvents: "none" }}>{children}</div>
}

function Backdrop() {
  return (
    <svg width="1448" height="1086" viewBox="0 0 1448 1086" style={{ position: "absolute", inset: 0 }} aria-hidden>
      <defs>
        <radialGradient id="igh-g1" cx=".35" cy=".5" r=".6"><stop offset="0" stopColor="#d9f5ea" /><stop offset="1" stopColor="#d9f5ea" stopOpacity="0" /></radialGradient>
        <radialGradient id="igh-g2" cx=".85" cy=".2" r=".5"><stop offset="0" stopColor="#d5f3e8" /><stop offset="1" stopColor="#d5f3e8" stopOpacity="0" /></radialGradient>
      </defs>
      <circle className="igh-orb" cx="120" cy="140" r="34" fill="#d3f0e4" />
      <circle className="igh-orb" style={{ animationDelay: "-2.5s" }} cx="1400" cy="520" r="26" fill="#d3f0e4" />
      <circle className="igh-orb" style={{ animationDelay: "-4.5s" }} cx="760" cy="1040" r="22" fill="#cdeedf" />
      <circle className="igh-orb" style={{ animationDelay: "-1s" }} cx="1180" cy="40" r="18" fill="#cdeedf" />
      <path className="igh-drift" d="M760 40 C 980 100 1120 10 1400 90" fill="none" stroke="#e1f6ee" strokeWidth="46" strokeLinecap="round" opacity=".8" />
      <path className="igh-drift2" d="M760 1030 C 940 980 1180 1020 1380 950" fill="none" stroke="#e1f6ee" strokeWidth="46" strokeLinecap="round" opacity=".9" />
      <path className="igh-drift" style={{ animationDelay: "-3s" }} d="M300 640 C 90 560 20 400 150 330" fill="none" stroke="#d3f0e4" strokeWidth="82" strokeLinecap="round" opacity=".9" />
      <path className="igh-dashflow" d="M232 143 C 120 200 130 400 228 520" fill="none" stroke={TEAL} strokeWidth="2.4" strokeDasharray="5 9" strokeLinecap="round" opacity=".75" />
    </svg>
  )
}

function Scene({ topic, onPick }: { topic: Topic; onPick: (t: Topic) => void }) {
  const d = DATA[topic]
  const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` })
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1448, height: 1086, fontFamily: "inherit", perspective: 2200, perspectiveOrigin: "50% 42%" }}>
     <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", }}>
      <Layer z={-110}><Backdrop /></Layer>

      <Layer z={0}>
      {/* the phone: a stack of darker slabs behind the screen gives it real thickness */}
      {[44, 38, 32, 26, 20, 14, 8].map((z, i) => (
        <A key={z} x={240} y={45} w={565} h={1000} r={104} style={{ transform: `translateZ(${-z}px)`, background: i % 2 ? "oklch(0.55 0.12 172)" : "oklch(0.6 0.13 170)", boxShadow: i === 0 ? "0 60px 80px -20px rgba(15,90,70,.45)" : undefined }} />
      ))}
      <A x={240} y={45} w={565} h={1000} r={104} style={{ background: "linear-gradient(160deg, #e4f8f0, #bfead8)", boxShadow: `0 50px 90px -30px rgba(20,110,85,.45), 0 0 0 6px ${TEAL}`, }}>
        <A x={14} y={14} w={537} h={972} r={92} style={{ background: "linear-gradient(180deg, #ffffff, #f4fbf8)", boxShadow: "inset 0 0 0 2px rgba(255,255,255,.9), inset 0 0 40px rgba(60,190,150,.12)", overflow: "hidden" }}>
          <svg width="537" height="972" viewBox="0 0 537 972" style={{ position: "absolute", inset: 0 }} aria-hidden>
            <path d="M60 255 C 38 285 52 320 56 350 C 62 388 34 420 56 470 V 560" fill="none" stroke={TEAL} strokeWidth="2.4" strokeDasharray="5 9" className="igh-dashflow" strokeLinecap="round" opacity=".7" />
            <path d="M60 740 C 40 770 50 810 56 842" fill="none" stroke={TEAL} strokeWidth="2.4" strokeDasharray="5 9" className="igh-dashflow" strokeLinecap="round" opacity=".7" />
            <circle cx="84" cy="600" r="7" fill={TEAL} /><circle cx="93" cy="839" r="7" fill={TEAL} />
          </svg>
        </A>
      </A>
      <A x={498} y={78} w={94} h={21} r={11} style={{ background: "#dde9e6" }} />
      {/* header */}
      <A x={314} y={128} style={{ color: INK }}><ChevronLeft style={{ width: 40, height: 40 }} strokeWidth={2.6} /></A>
      <A x={375} y={124} w={48} h={48} r={14} style={{ background: IG_GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}><IgGlyph s={34} /></A>
      <A x={442} y={122} style={{ ...T(26, 700), display: "flex", alignItems: "center", gap: 8 }}>Instagram <BadgeCheck style={{ width: 26, height: 26, color: "#fff", fill: TEAL }} strokeWidth={2} /></A>
      <A x={443} y={154} style={T(21, 500, GREY)}>Store · Direct Message</A>
      <A x={722} y={130} style={{ color: INK }}><MoreHorizontal style={{ width: 38, height: 38 }} strokeWidth={3} /></A>

      <div key={topic} style={{ transformStyle: "preserve-3d", transform: "translateZ(26px)" }}>
        {/* the agent "types" before answering */}
        <div className="igh-typing" style={delay(0.1)}>
          <A x={322} y={366} w={112} h={64} r={32} style={{ background: "#fff", boxShadow: CARD_SH, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            {[0, 0.15, 0.3].map((s) => <span key={s} className="igh-dot" style={{ width: 13, height: 13, borderRadius: "50%", background: TEAL, animationDelay: `${s}s` }} />)}
          </A>
        </div>
        {/* customer question */}
        <div className="igh-pop" style={delay(0.05)}>
          <Avatar x={300} y={226} />
          <A x={368} y={215} w={352} h={103} r={36} style={{ background: "#f1f5f5", boxShadow: "0 8px 20px -8px rgba(15,60,50,.15)" }}>
            <div style={{ position: "absolute", left: 26, top: 16, width: 290, fontSize: 26, fontWeight: 500, color: INK, lineHeight: 1.22 }}>{d.q}</div>
            <div style={{ position: "absolute", right: 26, bottom: 10, ...T(16, 500, "#8a979f") }}>10:24 AM</div>
          </A>
        </div>
        {/* AI answer */}
        <div className="igh-pop" style={delay(1.2)}>
          <A x={322} y={348} w={444} h={138} r={46} style={{ background: GRAD, boxShadow: "0 26px 40px -18px rgba(20,120,90,.6)", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: "0 0 55% 0", background: "linear-gradient(180deg, rgba(255,255,255,.28), rgba(255,255,255,0))" }} />
            <Bot style={{ position: "absolute", left: 34, top: 26, width: 62, height: 62, color: "#fff" }} strokeWidth={2.1} />
            <div style={{ position: "absolute", left: 118, top: 20, width: 300, fontSize: 24, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{d.a}</div>
            <div style={{ position: "absolute", right: 16, bottom: 14 }}><Check2 s={34} /></div>
          </A>
        </div>
        {/* card */}
        <div className="igh-pop" style={delay(1.6)}>
          <A x={335} y={510} w={435} h={182} r={42} style={{ background: GLASS, boxShadow: CARD_SH, border: "2px solid #fff" }}>
            <A x={24} y={20} w={112} h={110} r={28} style={{ background: MINT2, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 2px 0 rgba(255,255,255,.8)" }}>
              <span style={{ width: 82, height: 82, borderRadius: 20, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px -6px rgba(15,60,50,.25)" }}><CardIcon kind={d.icon} /></span>
            </A>
            <A x={160} y={20} style={T(29, 700)}>{d.cardTitle}</A>
            <A x={160} y={58} style={T(23, 500, GREY)}>{d.cardSub}</A>
            <A x={157} y={104} w={254} h={54} r={27} style={{ background: `linear-gradient(180deg, ${MINT2}, color-mix(in oklch, oklch(0.62 0.14 168) 32%, white))`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, boxShadow: "0 10px 18px -10px rgba(20,120,90,.5)" }}>
              <span style={T(25, 700, TEAL_DK)}>{d.cardCta}</span><span style={T(28, 700, TEAL_DK)}>→</span>
            </A>
          </A>
        </div>
        {/* customer reply */}
        <div className="igh-pop" style={delay(2.1)}>
          <Avatar x={298} y={729} />
          <A x={368} y={722} w={d.reply.length * 12.4 + 110} h={66} r={33} style={{ background: "#f1f5f5", boxShadow: "0 8px 20px -8px rgba(15,60,50,.15)", display: "flex", alignItems: "center", paddingLeft: 26, gap: 10 }}>
            <span style={T(23, 600)}>{d.reply}</span><span style={{ fontSize: 28 }}>🙌</span>
          </A>
          <A x={688 + Math.max(0, d.reply.length - 20) * 12} y={751} style={T(16, 500, "#8a979f")}>10:27 AM</A>
        </div>
        {/* outcome */}
        <div className="igh-pop" style={delay(2.6)}>
          <A x={352} y={820} w={424} h={69} r={35} style={{ background: GRAD, boxShadow: "0 22px 34px -16px rgba(20,120,90,.65)", display: "flex", alignItems: "center", paddingLeft: 26, gap: 14, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: "0 0 50% 0", background: "linear-gradient(180deg, rgba(255,255,255,.26), rgba(255,255,255,0))" }} />
            <span style={{ position: "relative" }}><Check2 s={40} /></span>
            <span style={{ position: "relative", ...T(22, 700, "#fff") }}>{d.done}</span>
          </A>
        </div>
      </div>

      {/* composer */}
      <A x={302} y={917} w={480} h={68} r={34} style={{ background: "#fff", boxShadow: "0 14px 26px -14px rgba(15,60,50,.3)" }}>
        <A x={16} y={14} w={40} h={40} r={20} style={{ background: MINT, display: "flex", alignItems: "center", justifyContent: "center" }}><Plus style={{ width: 24, height: 24, color: GREY }} strokeWidth={2.6} /></A>
        <A x={79} y={8} w={325} h={52} r={26} style={{ background: "#eef2f3", display: "flex", alignItems: "center", paddingLeft: 24, ...T(20, 500, "#8a979f") }}>Message...</A>
        <A x={355} y={20} style={{ color: GREY }}><Smile style={{ width: 30, height: 30 }} strokeWidth={2.2} /></A>
        <A x={418} y={11} w={50} h={50} r={25} className="igh-glow" style={{ background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 14px -6px rgba(20,120,90,.6)" }}><Send style={{ width: 24, height: 24, color: "#fff" }} strokeWidth={2.4} /></A>
      </A>
      <A x={452} y={1011} w={175} h={6} r={3} style={{ background: "#c8d4d8" }} />

      </Layer>

      {/* Instagram icon: spins gently in 3D, with a ping ring */}
      <Layer z={170}>
        <A x={96} y={268} w={140} h={140} r={44} className="igh-ping" style={{ border: `4px solid ${TEAL}` }} />
        <A x={96} y={268} w={140} h={140} r={38} className="igh-spin" style={{ background: IG_GRAD, boxShadow: "0 0 0 14px rgba(255,255,255,.75), 0 0 70px rgba(255,255,255,.95), 0 30px 46px -12px rgba(245,68,92,.45)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: "0 0 52% 0", background: "linear-gradient(180deg, rgba(255,255,255,.35), rgba(255,255,255,0))" }} />
          <div style={{ position: "relative" }}><IgGlyph s={96} /></div>
        </A>
      </Layer>

      <Layer z={130}>
      <svg width="1448" height="1086" viewBox="0 0 1448 1086" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden>
        <defs>
          <linearGradient id="igh-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3fcf8" /><stop offset="1" stopColor="#cdeedf" /></linearGradient>
          <linearGradient id="igh-left" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d9f3e8" /><stop offset="1" stopColor="#b6e4d0" /></linearGradient>
          <linearGradient id="igh-right" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#cdeedf" /><stop offset="1" stopColor="#a6dcc5" /></linearGradient>
          <filter id="igh-blur"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>
        <g className="igh-tw" stroke={TEAL} strokeWidth="7" strokeLinecap="round"><path d="M96 740 L112 762" /><path d="M126 728 L130 756" /><path d="M72 770 L96 780" /></g>
        <ellipse cx="180" cy="1000" rx="130" ry="22" fill="#0f5a46" opacity=".22" filter="url(#igh-blur)" />
        <g className="igh-bob" style={{ animationDelay: "-2s" }}>
          <polygon points="62,848 172,884 172,992 62,950" fill="url(#igh-left)" />
          <polygon points="172,884 292,830 292,936 172,992" fill="url(#igh-right)" />
          <polygon points="62,848 186,782 292,830 172,884" fill="url(#igh-top)" />
          <polygon points="104,826 128,858 212,816 186,786" fill="#bfe6d4" opacity=".85" />
          <g transform="translate(232 908) skewY(-27)" fill="none" stroke={TEAL} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-26 -6 H12 a22 22 0 0 1 0 44 H-14" transform="translate(0 -10)" /><path d="M-6 -26 L-26 -6 L-6 14" transform="translate(0 -10)" />
          </g>
        </g>
      </svg>
      </Layer>

      {/* Comment Automation */}
      <Layer z={90}>
      <div className="igh-float" style={{ animationDelay: "-1s" }}>
        <A x={870} y={140} w={508} h={270} r={46} style={{ background: GLASS, boxShadow: CARD_SH, border: "2px solid #fff" }}>
          <A x={30} y={25} w={72} h={68} r={22} style={{ background: MINT2, display: "flex", alignItems: "center", justifyContent: "center" }}><MessageSquareText style={{ width: 38, height: 38, color: TEAL_DK }} strokeWidth={2.2} /></A>
          <A x={116} y={26} style={T(28, 700)}>Comment Automation</A>
          <A x={116} y={66} style={T(21, 500, GREY)}>Turn comments into support, instantly.</A>
          <A x={30} y={113} w={450} h={70} r={18} style={{ background: "#eceff0" }}>
            <A x={22} y={11} w={48} h={48} r={24} style={{ background: "#fde4e1", display: "flex", alignItems: "center", justifyContent: "center", ...T(24, 700, "#c0453b") }}>{d.cInit}</A>
            <A x={98} y={9} style={T(20, 700)}>{d.cUser}</A>
            <A x={98} y={37} style={T(20, 500)}>{d.cText}</A>
          </A>
          <A x={48} y={193} w={432} h={46} r={23} style={{ background: MINT, display: "flex", alignItems: "center", paddingLeft: 20, gap: 14 }}>
            <Zap style={{ width: 24, height: 24, color: TEAL, fill: TEAL }} />
            <span style={T(21, 700, TEAL_DK)}>{d.cChip}</span>
            <span style={{ position: "absolute", right: 12 }}><Check2 s={30} bg={TEAL} fg="#fff" /></span>
          </A>
        </A>
        <A x={1266} y={92} w={90} h={90} r={45} className="igh-pulse" style={{ background: "#fff", boxShadow: "0 18px 30px -12px rgba(15,60,50,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles style={{ width: 42, height: 42, color: TEAL, fill: TEAL }} strokeWidth={1.5} />
        </A>
      </div>

      </Layer>

      {/* Shared Inbox */}
      <Layer z={60}>
      <div className="igh-float" style={{ animationDelay: "-3.4s" }}>
        <A x={868} y={437} w={512} h={325} r={46} style={{ background: GLASS, boxShadow: CARD_SH, border: "2px solid #fff" }}>
          <A x={32} y={21} w={74} h={68} r={22} style={{ background: MINT2, display: "flex", alignItems: "center", justifyContent: "center" }}><Inbox style={{ width: 40, height: 40, color: TEAL_DK }} strokeWidth={2.2} /></A>
          <A x={125} y={22} style={T(28, 700)}>Shared Inbox</A>
          <A x={125} y={62} style={T(21, 500, GREY)}>All customer conversations in one place.</A>
          <A x={30} y={106} w={454} h={60} r={14} style={{ background: `linear-gradient(90deg, ${MINT2}, ${MINT})`, display: "flex", alignItems: "center" }}>
            <img src="/logos/channels/instagram.svg" alt="" width={44} height={44} style={{ position: "absolute", left: 24, top: 8 }} />
            <A x={95} y={6} style={T(22, 700)}>{d.in1}</A><A x={95} y={31} style={T(21, 500, GREY)}>{d.in1Sub}</A>
            <span style={{ position: "absolute", right: 14, top: 14 }}><Check2 s={32} bg={TEAL} fg="#fff" /></span>
          </A>
          <A x={30} y={171} w={454} h={60} r={14}>
            <img src="/logos/channels/whatsapp.svg" alt="" width={44} height={44} style={{ position: "absolute", left: 24, top: 8 }} />
            <A x={95} y={6} style={T(22, 700)}>Rahul S.</A><A x={95} y={31} style={T(21, 500, GREY)}>Where is my order?</A>
            <span style={{ position: "absolute", right: 22, top: 22, width: 16, height: 16, borderRadius: "50%", background: "#cfd6d9" }} />
          </A>
          <A x={30} y={236} w={454} h={64} r={14}>
            <A x={24} y={11} w={40} h={40} r={11} style={{ background: "#F5A300", display: "flex", alignItems: "center", justifyContent: "center", ...T(26, 700, "#fff") }}>S</A>
            <A x={95} y={8} style={T(22, 700)}>+91 98••• ••210</A><A x={95} y={34} style={T(21, 500, GREY)}>{d.in3Sub}</A>
            <span style={{ position: "absolute", right: 14, top: 16 }}><Check2 s={32} bg={TEAL} fg="#fff" /></span>
          </A>
        </A>
      </div>

      </Layer>

      {/* Quick replies (real buttons) */}
      <Layer z={110}>
      <A x={862} y={794} style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Zap style={{ width: 28, height: 28, color: INK, fill: INK }} /><span style={T(25, 700)}>Quick Replies</span>
      </A>
      {(
        [
          { x: 862, w: 162, k: "sizing" as Topic, I: Shirt },
          { x: 1038, w: 166, k: "shipping" as Topic, I: Package },
          { x: 1217, w: 168, k: "returns" as Topic, I: Undo2 },
        ]
      ).map(({ x, w, k, I }) => {
        const on = k === topic
        return (
          <button
            key={k}
            type="button"
            aria-pressed={on}
            aria-label={`Show the ${LABEL[k].toLowerCase()} example`}
            onClick={() => onPick(k)}
            className="igh-pill"
            style={{
              position: "absolute", left: x, top: 852, width: w, height: 60, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              background: on ? GRAD : GLASS, color: on ? "#fff" : INK, border: on ? "none" : "2px solid #fff",
              boxShadow: on ? "0 16px 26px -10px rgba(20,120,90,.6)" : "0 14px 24px -12px rgba(15,60,50,.3)", fontSize: 24, fontWeight: 700, fontFamily: "inherit",
            }}
          >
            <I style={{ width: 28, height: 28, color: on ? "#fff" : TEAL_DK }} strokeWidth={2.2} />{LABEL[k]}
          </button>
        )
      })}
      </Layer>
      </div>
     </div>
    </div>
  )
}

// scales the fixed stage to the available width; `crop` shows just one region of it (used on phones)
function Stage({ crop, hidden, clip = true, children }: { crop: { x: number; y: number; w: number; h: number }; hidden?: boolean; clip?: boolean; children: ReactNode }) {
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
    <div
      ref={ref}
      aria-hidden={hidden || undefined}
      className={`relative w-full ${clip ? "overflow-hidden" : "overflow-visible"}`}
      style={{ aspectRatio: `${crop.w} / ${crop.h}`, opacity: w ? 1 : 0, transition: "opacity .3s" }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: 1448, height: 1086, transformOrigin: "0 0", transform: `translate(${-crop.x * s}px, ${-crop.y * s}px) scale(${s})` }}>
        {children}
      </div>
    </div>
  )
}

export function InstagramHero() {
  const [topic, setTopic] = useState<Topic>("returns")
  const lastPick = useRef(0)
  const hover = useRef(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => {
      if (hover.current || document.hidden || Date.now() - lastPick.current < 10000) return
      setTopic((cur) => ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length])
    }, 8000)
    return () => window.clearInterval(id)
  }, [])

  const pick = (t: Topic) => {
    lastPick.current = Date.now()
    setTopic(t)
  }
  const scene = <Scene topic={topic} onPick={pick} />

  return (
    <div
      className="relative mx-auto w-full max-w-[640px] lg:max-w-none"
      role="group"
      aria-label={`${DATA[topic].alt}. Pick Sizing, Shipping or Returns to see another example.`}
      onMouseEnter={() => { hover.current = true }}
      onMouseLeave={() => { hover.current = false }}
    >
      <div className="hidden sm:block">
        <Stage crop={{ x: 0, y: 0, w: 1448, h: 1086 }} clip={false}>{scene}</Stage>
      </div>
      <div className="sm:hidden">
        <Stage crop={{ x: 20, y: 30, w: 810, h: 1030 }}>{scene}</Stage>
        <div className="mt-2">
          <Stage crop={{ x: 840, y: 70, w: 570, h: 880 }} hidden>{scene}</Stage>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
