import { Check } from "lucide-react"

// Hero illustration for /channels/whatsapp: one glossy "WhatsApp AI Platform" button in the middle with seven
// pedestals around it (AI Replies, Rich Templates, Broadcasts, Verified Sender, Alerts & OTPs, Human Handoff,
// Two-way Chat), each
// holding a small 3D-style object, joined by thin glowing lines. In the site's own teal and navy on a light
// background. Hand-drawn SVG + CSS; a light runs out along each line in turn and the pedestal it reaches lifts and
// glows. Every object is centred on its pedestal and sits on the same baseline; labels are pills of equal height.
// Silent, 14-second loop.

const ACTIONS = ["Answered in seconds", "Template sent", "Campaign delivered", "Sender verified", "OTP delivered", "Agent takes over", "Customer replied"]
const SPARKS = [[40, 230, 0], [560, 240, 1.1], [150, 60, 2.2], [470, 70, 0.6], [330, 20, 1.7], [570, 400, 2.8], [30, 420, 3.4]]
type Kind = "ai" | "template" | "broadcast" | "verified" | "bell" | "support" | "chat"
const SPOTS: { k: Kind; label: string; x: number; y: number; s: number }[] = [
  { k: "ai", label: "AI Replies", x: 300, y: 92, s: 6 },
  { k: "template", label: "Rich Templates", x: 486, y: 168, s: 18 },
  { k: "broadcast", label: "Broadcasts", x: 516, y: 312, s: 30 },
  { k: "verified", label: "Verified Sender", x: 418, y: 442, s: 42 },
  { k: "bell", label: "Alerts & OTPs", x: 198, y: 446, s: 54 },
  { k: "support", label: "Human Handoff", x: 84, y: 318, s: 66 },
  { k: "chat", label: "Two-way Chat", x: 112, y: 148, s: 78 },
]
const CX = 300
const CY = 270

const CSS = `
${SPOTS.map((p, i) => `@keyframes wh-t${i} { 0%, ${p.s - 4}% { opacity: 0; stroke-dashoffset: 18 } ${p.s - 3}% { opacity: 1; stroke-dashoffset: 18 } ${p.s + 2}% { opacity: 1; stroke-dashoffset: -82 } ${p.s + 3}%, 100% { opacity: 0; stroke-dashoffset: -82 } }
@keyframes wh-h${i} { 0%, ${p.s - 4}% { opacity: 0; stroke-dashoffset: 0 } ${p.s - 3}% { opacity: 1; stroke-dashoffset: 0 } ${p.s + 2}% { opacity: 1; stroke-dashoffset: -100 } ${p.s + 3}%, 100% { opacity: 0; stroke-dashoffset: -100 } }
@keyframes wh-r${i} { 0%, ${p.s - 1}% { opacity: 0 } ${p.s + 3}%, ${p.s + 9}% { opacity: 1 } ${p.s + 15}%, 100% { opacity: 0 } }
@keyframes wh-o${i} { 0%, ${p.s}% { transform: translateY(0) } ${p.s + 3}%, ${p.s + 8}% { transform: translateY(-14px) } ${p.s + 13}%, 100% { transform: translateY(0) } }
@keyframes wh-g${i} { 0%, ${p.s - 1}% { opacity: 0 } ${p.s + 3}%, ${p.s + 9}% { opacity: 1 } ${p.s + 15}%, 100% { opacity: 0 } }
@keyframes wh-a${i} { 0%, ${p.s}% { opacity: 0 } ${p.s + 4}%, 94% { opacity: 1 } 98%, 100% { opacity: 0 } }
.wh-g${i} { opacity: 0; animation: wh-g${i} 14s ease-out infinite }
.wh-a${i} { opacity: 0; animation: wh-a${i} 14s ease-out infinite }
@keyframes wh-x${i} { 0%, ${p.s - 1}% { opacity: 0 } ${p.s + 2}%, ${p.s + 11}% { opacity: 1 } ${p.s + 15}%, 100% { opacity: 0 } }
.wh-x${i} { opacity: 0; animation: wh-x${i} 14s ease-out infinite }
@keyframes wh-d${i} { 0%, ${p.s}% { opacity: .35 } ${p.s + 3}%, ${p.s + 9}% { opacity: 1 } ${p.s + 14}%, 100% { opacity: .35 } }
.wh-t${i} { opacity: 0; stroke-dasharray: 18 300; stroke-dashoffset: 18; animation: wh-t${i} 14s linear infinite }
.wh-h${i} { opacity: 0; stroke-dasharray: .01 300; stroke-dashoffset: 0; animation: wh-h${i} 14s linear infinite }
.wh-r${i} { opacity: 0; animation: wh-r${i} 14s ease-in-out infinite }
.wh-o${i} { animation: wh-o${i} 14s cubic-bezier(.3,0,.2,1) infinite }
.wh-d${i} { opacity: .35; animation: wh-d${i} 14s ease-in-out infinite }`).join("\n")}
@keyframes wh-blob { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(14px, -10px) } }
@keyframes wh-spark { 0%, 100% { opacity: .15; transform: scale(.6) } 50% { opacity: .9; transform: scale(1) } }
@keyframes wh-rise { 0% { transform: translateY(0); opacity: 0 } 15% { opacity: .95 } 100% { transform: translateY(-120px); opacity: 0 } }
@keyframes wh-req { 0%, 1% { opacity: 0; transform: translateY(-8px) } 5%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }
@keyframes wh-done { 0%, 86% { opacity: 0; transform: translateY(6px) } 90%, 95% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }
.wh-blob { animation: wh-blob 9s ease-in-out infinite }
.wh-spark { transform-box: fill-box; transform-origin: center; animation: wh-spark 3.4s ease-in-out infinite }
.wh-rise { opacity: 0; animation: wh-rise 4.6s ease-out infinite }
.wh-req { opacity: 0; animation: wh-req 14s ease-out infinite }
.wh-done { opacity: 0; animation: wh-done 14s ease-out infinite }

@keyframes wh-flow { to { stroke-dashoffset: -24 } }
@keyframes wh-ring { 0% { transform: scale(.6); opacity: .55 } 100% { transform: scale(1.3); opacity: 0 } }
@keyframes wh-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.04) } }
@keyframes wh-bob { 0%, 100% { transform: translateY(-2px) } 50% { transform: translateY(2px) } }
.wh-flow { animation: wh-flow 2s linear infinite }
.wh-ring { transform-box: fill-box; transform-origin: center; animation: wh-ring 3.2s ease-out infinite }
.wh-pulse { transform-box: fill-box; transform-origin: center; animation: wh-pulse 3.6s ease-in-out infinite }
.wh-bob { animation: wh-bob 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .wh-flow, .wh-ring, .wh-pulse, .wh-bob, .wh-blob, .wh-spark, .wh-rise { animation: none }
  .wh-req, .wh-done, [class*="wh-a"] { animation: none; opacity: 1; transform: none } [class*="wh-g"] { animation: none; opacity: 0 } [class*="wh-x"] { animation: none; opacity: 0 }
  [class*="wh-t"], [class*="wh-h"], [class*="wh-r"] { animation: none; opacity: 0 } [class*="wh-o"] { animation: none } [class*="wh-d"] { animation: none; opacity: 1 }
}
`

const NAVY = "var(--foreground)"
const NAVY2 = "#2b3b57"
const TEAL = "var(--primary)"
const SLAB = "oklch(0.9 0.02 200)"
const AMBER = "oklch(0.85 0.14 80)"
const BLUE = "oklch(0.74 0.14 250)"

function Pedestal({ i }: { i: number }) {
  return (
    <>
      <ellipse cx="4" cy="28" rx="66" ry="13" fill={NAVY} opacity=".16" filter="url(#wh-blur)" />
      <path d="M-54 0 v13 a54 17 0 0 0 108 0 v-13z" fill="url(#wh-cyl)" stroke="var(--border)" />
      <path d="M-54 13 a54 17 0 0 0 108 0" fill="none" stroke="#0f2a3a" strokeOpacity=".18" strokeWidth="2" />
      <ellipse cx="0" cy="0" rx="54" ry="17" fill="url(#wh-top)" stroke="#fff" />
      <ellipse cx="-14" cy="-6" rx="22" ry="3.6" fill="#fff" opacity=".7" />
      <ellipse cx="0" cy="0" rx="45" ry="13.5" fill="none" stroke={TEAL} strokeOpacity=".28" />
      <ellipse className={`wh-r${i}`} cx="0" cy="0" rx="50" ry="15.5" fill="none" stroke={TEAL} strokeOpacity=".55" strokeWidth="9" filter="url(#wh-blur)" />
      <ellipse className={`wh-r${i}`} cx="0" cy="0" rx="45" ry="13.5" fill="none" stroke={TEAL} strokeWidth="2.6" />
    </>
  )
}

function rosette(r1: number, r2: number, n: number) {
  return Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n - Math.PI / 2
    const r = i % 2 ? r2 : r1
    return `${i ? "L" : "M"}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`
  }).join(" ") + "Z"
}

function Object3D({ k }: { k: Kind }) {
  switch (k) {
    case "ai":
      return (
        <g>
          <rect x="-24" y="-20" width="48" height="18" rx="7" fill={NAVY} />
          <circle cx="0" cy="-11" r="3.2" fill={TEAL} />
          <rect x="-38" y="-52" width="8" height="20" rx="4" fill={NAVY2} /><rect x="30" y="-52" width="8" height="20" rx="4" fill={NAVY2} />
          <rect x="-31" y="-68" width="62" height="48" rx="15" fill={NAVY2} />
          <rect x="-25" y="-62" width="50" height="36" rx="11" fill={NAVY} />
          <circle cx="-11" cy="-45" r="6.6" fill={TEAL} /><circle cx="11" cy="-45" r="6.6" fill={TEAL} />
          <circle cx="-9" cy="-47" r="2" fill="#fff" /><circle cx="13" cy="-47" r="2" fill="#fff" />
          <path d="M-7 -33 q7 5 14 0" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 -68 V-78" stroke={NAVY} strokeWidth="3" strokeLinecap="round" /><circle cx="0" cy="-81" r="4.6" fill={TEAL} />
          <path d="M-24 -62 a15 15 0 0 1 14 -4" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="30" cy="-70" r="9.5" fill={TEAL} stroke="#fff" strokeWidth="2.2" />
          <text x="30" y="-66.6" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">AI</text>
        </g>
      )
    case "template":
      return (
        <g>
          <rect x="-34" y="-74" width="80" height="72" rx="9" fill={SLAB} />
          <rect x="-40" y="-80" width="80" height="72" rx="9" fill="#fff" stroke="var(--border)" strokeWidth="1.4" />
          <rect x="-34" y="-74" width="68" height="28" rx="6" fill={TEAL} fillOpacity=".16" />
          <circle cx="-18" cy="-62" r="5" fill={AMBER} />
          <path d="M-34 -46 l16 -14 13 10 9 -7 21 11z" fill={TEAL} fillOpacity=".7" />
          <rect x="-34" y="-40" width="52" height="5" rx="2.5" fill={NAVY} opacity=".75" />
          <rect x="-34" y="-31" width="38" height="4.5" rx="2.2" fill="var(--border)" />
          <rect x="-34" y="-22" width="32" height="12" rx="6" fill={TEAL} />
          <text x="-18" y="-13.2" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#fff">Shop</text>
          <rect x="2" y="-22" width="32" height="12" rx="6" fill="#fff" stroke={TEAL} strokeWidth="1.3" />
          <text x="18" y="-13.2" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={TEAL}>Reply</text>
        </g>
      )
    case "broadcast":
      return (
        <g>
          <rect x="-38" y="-54" width="15" height="18" rx="3.5" fill={NAVY} />
          <rect x="-32" y="-38" width="9" height="22" rx="3.5" fill={NAVY2} />
          <path d="M-24 -54 L16 -76 V-16 L-24 -36z" fill={NAVY2} />
          <path d="M-24 -54 L16 -76" stroke="#fff" strokeOpacity=".3" strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="16" cy="-46" rx="5.5" ry="30" fill={TEAL} />
          <path d="M30 -64 q10 18 0 36 M38 -72 q15 26 0 52" fill="none" stroke={TEAL} strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="-34" cy="-14" r="0" fill="none" />
        </g>
      )
    case "verified":
      return (
        <g>
          <path d={rosette(34, 29, 10)} transform="translate(0 -44)" fill={TEAL} />
          <circle cx="0" cy="-44" r="24" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" />
          <path d="M-12 -44 l8 9 l17 -19" fill="none" stroke="#fff" strokeWidth="6.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-22 -62 a28 28 0 0 1 14 -9" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" />
          <path d="M-12 -14 l-6 14 l8 -4 l4 8 l6 -16" fill={NAVY2} />
          <path d="M12 -14 l6 14 l-8 -4 l-4 8 l-6 -16" fill={NAVY} />
        </g>
      )
    case "bell":
      return (
        <g>
          <path d="M0 -83 c-15 0 -24 11 -24 26 v14 l-9 11 h66 l-9 -11 v-14 c0 -15 -9 -26 -24 -26z" fill={NAVY2} />
          <path d="M-15 -66 c2 -6 6 -9 11 -10" stroke="#fff" strokeOpacity=".4" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <rect x="-33" y="-32" width="66" height="8" rx="4" fill={NAVY} />
          <rect x="-4" y="-90" width="8" height="8" rx="4" fill={NAVY} />
          <circle cx="0" cy="-17" r="7.5" fill={NAVY} />
          <circle cx="22" cy="-69" r="10" fill={TEAL} stroke="#fff" strokeWidth="2.4" />
          <text x="22" y="-65.2" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">1</text>
        </g>
      )
    case "chat":
      return (
        <g>
          <path d="M-36 -72 h50 a12 12 0 0 1 12 12 v18 a12 12 0 0 1 -12 12 h-30 l-13 10 v-10 h-7 a12 12 0 0 1 -12 -12 v-18 a12 12 0 0 1 12 -12z" fill={TEAL} />
          {[-24, -12, 0].map((x) => <circle key={x} cx={x} cy="-51" r="3.2" fill="#fff" />)}
          <path d="M18 -52 h14 a12 12 0 0 1 12 12 v16 a12 12 0 0 1 -12 12 h-4 v10 l-13 -10 h-17 a12 12 0 0 1 -12 -12 v-3" fill={NAVY2} stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" />
          <rect x="6" y="-40" width="26" height="4.5" rx="2.2" fill="#fff" opacity=".8" />
          <rect x="6" y="-31" width="18" height="4.5" rx="2.2" fill="#fff" opacity=".5" />
        </g>
      )
    default:
      return (
        <g>
          <path d="M-32 -42 a32 34 0 0 1 64 0" fill="none" stroke={NAVY} strokeWidth="7" strokeLinecap="round" />
          <path d="M-24 -62 a28 30 0 0 1 28 -9" fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="-42" y="-47" width="16" height="30" rx="8" fill={NAVY2} /><rect x="26" y="-47" width="16" height="30" rx="8" fill={NAVY2} />
          <rect x="-38" y="-41" width="7" height="17" rx="3.5" fill="#fff" opacity=".2" /><rect x="31" y="-41" width="7" height="17" rx="3.5" fill="#fff" opacity=".2" />
          <path d="M-34 -17 q0 21 27 21 h5" fill="none" stroke={NAVY} strokeWidth="3.4" strokeLinecap="round" />
          <rect x="-9" y="-5" width="15" height="10" rx="5" fill={TEAL} />
        </g>
      )
  }
}

// a label pill, centred under its pedestal
function Label({ text, i }: { text: string; i: number }) {
  const w = Math.round(text.length * 7.4 + 30)
  return (
    <g transform="translate(0 56)">
      <rect x={-w / 2} y="-13" width={w} height="26" rx="13" fill="#fff" stroke="var(--border)" />
      <circle className={`wh-d${i}`} cx={-w / 2 + 12} cy="0" r="3" fill={TEAL} />
      <text x="6" y="4.8" textAnchor="middle" fontSize="13" fontWeight="600" fill={NAVY}>{text}</text>
    </g>
  )
}

export function WhatsAppHub() {
  const ends = SPOTS.map((p) => ({
    ex: p.x + (CX - p.x) * 0.34,
    ey: p.y + (CY - p.y) * 0.22,
  }))
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="wh-blob absolute -left-8 top-[52%] h-[220px] w-[220px] rounded-full bg-primary/12 blur-[70px]" />
        <span className="wh-blob absolute -right-6 top-0 h-[220px] w-[220px] rounded-full bg-[oklch(0.74_0.14_250)]/13 blur-[70px]" style={{ animationDelay: "-4s" }} />
        <span className="wh-blob absolute bottom-0 left-1/3 h-[160px] w-[160px] rounded-full bg-[oklch(0.85_0.14_80)]/12 blur-[70px]" style={{ animationDelay: "-7s" }} />
      </div>
      <p className="wh-req flex items-center justify-center gap-2 text-center text-[13.5px] font-medium tracking-tight sm:text-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/channels/whatsapp.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0" />
        “Where is my order #1042? Send me the invoice.”
      </p>
      <svg viewBox="0 0 600 540" className="mt-1 block w-full" role="img" aria-label="WhatsApp AI Platform in the centre, connected to AI Replies, Rich Templates, Broadcasts, Verified Sender, Alerts and OTPs, Human Handoff and Two-way Chat">
        <defs><filter id="wh-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
          <linearGradient id="wh-cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c9e3da" /><stop offset=".35" stopColor="#ffffff" /><stop offset=".7" stopColor="#e6f2ee" /><stop offset="1" stopColor="#a9cdc1" /></linearGradient>
          <radialGradient id="wh-top" cx=".38" cy=".3" r=".85"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#f1f8f6" /><stop offset="1" stopColor="#d6e9e3" /></radialGradient>
          <linearGradient id="wh-hub" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="oklch(0.62 0.13 175)" /><stop offset=".32" stopColor="oklch(0.72 0.13 175)" /><stop offset=".7" stopColor="oklch(0.52 0.12 175)" /><stop offset="1" stopColor="oklch(0.36 0.09 178)" /></linearGradient>
          <radialGradient id="wh-hubtop" cx=".36" cy=".28" r=".9"><stop offset="0" stopColor="oklch(0.82 0.12 172)" /><stop offset=".55" stopColor="oklch(0.64 0.14 175)" /><stop offset="1" stopColor="oklch(0.5 0.12 176)" /></radialGradient>
        </defs>
        {SPARKS.map(([x, y, d]) => (
          <path key={`${x}-${y}`} className="wh-spark" d={`M${x} ${y - 6} L${x + 1.6} ${y - 1.6} L${x + 6} ${y} L${x + 1.6} ${y + 1.6} L${x} ${y + 6} L${x - 1.6} ${y + 1.6} L${x - 6} ${y} L${x - 1.6} ${y - 1.6}Z`} fill="var(--primary)" opacity=".5" style={{ animationDelay: `${d}s` }} />
        ))}
        {/* connecting lines (behind everything) */}
        {SPOTS.map((p, i) => {
          const qx = CX + (ends[i].ex - CX) * 0.5
          const qy = Math.min(ends[i].ey, CY) - 46
          const d = `M${CX} ${CY - 6} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${ends[i].ex.toFixed(1)} ${ends[i].ey.toFixed(1)}`
          return (
            <g key={p.k}>
              <path d={d} fill="none" stroke={TEAL} strokeOpacity=".28" strokeWidth="1.6" />
              <path className="wh-flow" d={d} fill="none" stroke={TEAL} strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 11" />
              <path className={`wh-t${i}`} d={d} pathLength="100" fill="none" stroke={TEAL} strokeWidth="4" strokeLinecap="round" />
              <path className={`wh-h${i}`} d={d} pathLength="100" fill="none" stroke={TEAL} strokeOpacity=".16" strokeWidth="11" strokeLinecap="round" />
              <path className={`wh-h${i}`} d={d} pathLength="100" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" />
            </g>
          )
        })}

        {/* the seven pedestals */}
        {SPOTS.map((p, i) => (
          <g key={p.k} className="wh-spot" transform={`translate(${p.x} ${p.y})`}>
            <rect x="-64" y="-100" width="128" height="190" fill="transparent" />
            <g className="wh-bob" style={{ animationDelay: `${-i * 0.8}s` }}>
              <ellipse className={`wh-g${i}`} cx="0" cy="-30" rx="58" ry="58" fill="color-mix(in oklch, var(--primary) 20%, white)" opacity=".3" filter="url(#wh-blur)" />
              <Pedestal i={i} />
              <g className={`wh-o${i}`}>
                <ellipse cx="0" cy="-2" rx="30" ry="7" fill={NAVY} opacity=".22" filter="url(#wh-blur)" />
                <g transform="translate(3 4.5) scale(.8)" style={{ filter: "brightness(.45) saturate(.7)" }} opacity=".5"><Object3D k={p.k} /></g>
                <g transform="scale(.8)" style={{ filter: "drop-shadow(0 5px 4px rgba(15,31,58,.28))" }}><Object3D k={p.k} /></g>
              </g>
            </g>
            <Label text={p.label} i={i} />
            <g className={`wh-a${i}`}>
              <circle cx="50" cy="-66" r="11" fill="var(--primary)" stroke="#fff" strokeWidth="2.5" />
              <path d="M44.5 -66 l4 4 l7 -8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text className={`wh-x${i}`} x="0" y="84" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--primary)">{ACTIONS[i]}</text>
          </g>
        ))}

        {/* light column and rising particles above the hub */}
        <path d={`M${CX - 46} ${CY - 10} L${CX - 24} ${CY - 150} L${CX + 24} ${CY - 150} L${CX + 46} ${CY - 10} Z`} fill="var(--primary)" opacity=".08" filter="url(#wh-blur)" />
        {[[-30, 0], [-12, 0.9], [8, 1.8], [24, 2.6], [-20, 3.3], [16, 4.1]].map(([dx, d]) => (
          <circle key={dx} className="wh-rise" cx={CX + dx} cy={CY - 20} r="2.4" fill="#fff" stroke="var(--primary)" strokeWidth="1" style={{ animationDelay: `${d}s` }} />
        ))}
        {/* the glossy centre button: a chunky disc with a raised inner plate and the WhatsApp badge */}
        <ellipse cx={CX + 6} cy={CY + 66} rx="150" ry="32" fill={NAVY} opacity=".2" filter="url(#wh-blur)" />
        <ellipse className="wh-ring" cx={CX} cy={CY + 16} rx="126" ry="42" fill="none" stroke={TEAL} strokeWidth="2" />
        <ellipse className="wh-ring" cx={CX} cy={CY + 16} rx="126" ry="42" fill="none" stroke={TEAL} strokeWidth="2" style={{ animationDelay: "1.6s" }} />
        <path d={`M${CX - 120} ${CY + 16} v14 a120 40 0 0 0 240 0 v-14z`} fill="url(#wh-cyl)" stroke="var(--border)" />
        <ellipse cx={CX} cy={CY + 16} rx="120" ry="40" fill="url(#wh-top)" stroke="#fff" />
        <ellipse cx={CX} cy={CY + 16} rx="110" ry="35" fill="none" stroke={TEAL} strokeOpacity=".4" />
        {/* button body */}
        <path d={`M${CX - 96} ${CY} v36 a96 32 0 0 0 192 0 v-36z`} fill="url(#wh-hub)" />
        <path d={`M${CX - 94} ${CY + 6} a94 31 0 0 0 188 0`} fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="1.6" />
        <ellipse cx={CX} cy={CY} rx="96" ry="32" fill="url(#wh-hubtop)" />
        <ellipse cx={CX} cy={CY} rx="84" ry="27" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1.4" />
        {/* raised inner plate */}
        <path d={`M${CX - 66} ${CY - 4} v6 a66 21 0 0 0 132 0 v-6z`} fill="oklch(0.56 0.13 175)" />
        <ellipse cx={CX} cy={CY - 4} rx="66" ry="21" fill="color-mix(in oklch, var(--primary) 84%, white)" stroke="#fff" strokeOpacity=".55" strokeWidth="1.3" />
        <ellipse cx={CX} cy={CY - 4} rx="52" ry="16" fill="none" stroke="#fff" strokeOpacity=".5" strokeDasharray="3 5" />
        <ellipse cx={CX - 28} cy={CY - 12} rx="26" ry="5" fill="#fff" opacity=".2" transform={`rotate(-8 ${CX - 28} ${CY - 12})`} />
        {/* label on the front face, centred */}
        <circle cx={CX - 84} cy={CY + 37} r="2.2" fill="#fff" opacity=".6" />
        <circle cx={CX + 84} cy={CY + 37} r="2.2" fill="#fff" opacity=".6" />
        <text x={CX} y={CY + 48.5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#fff" letterSpacing=".5">WhatsApp AI Platform</text>
        {/* the WhatsApp badge standing on the plate */}
        <g className="wh-pulse">
          <ellipse cx={CX} cy={CY + 2} rx="30" ry="8" fill="#000" opacity=".2" />
          <circle cx={CX} cy={CY - 26} r="38" fill="url(#wh-top)" stroke="#fff" strokeWidth="2" />
          <path d={`M${CX - 30} ${CY - 8} a38 38 0 0 0 60 0`} fill="none" stroke="#0f2a3a" strokeOpacity=".14" strokeWidth="4" />
          <circle cx={CX} cy={CY - 26} r="32.5" fill="none" stroke={TEAL} strokeOpacity=".3" strokeWidth="1.4" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <image href="/logos/channels/whatsapp.svg" x={CX - 26} y={CY - 52} width="52" height="52" preserveAspectRatio="xMidYMid meet" />
        </g>
      </svg>
      <p className="wh-done mt-1 flex items-center justify-center gap-2 text-center text-[13.5px] font-semibold text-primary sm:text-[14.5px]">
        <Check className="h-4 w-4 shrink-0" strokeWidth={3.4} />Handled on WhatsApp. Seven steps done, no ticket needed.
      </p>
      <style>{CSS}</style>
    </div>
  )
}
