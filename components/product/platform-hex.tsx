import { BarChart3, Bot, Code2, Inbox, Megaphone, Phone } from "lucide-react"

// Hero graphic for /platform: a honeycomb of the six platform modules around one shared customer record.
// The modules light up one after another and a small packet runs between each module and the record,
// with a short result floating out beside it. One crisp SVG, 14-second loop, silent, pure CSS.

const R = 70
const D = 128
const CX = 280
const CY = 250
const hex = (cx: number, cy: number, r = R) =>
  Array.from({ length: 6 }, (_, k) => {
    const a = ((-90 + 60 * k) * Math.PI) / 180
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(" ")

const CELLS = [
  { t: "Agentic AI", I: Bot, ang: -60, chip: "Resolved by AI", side: "start" as const, cx: 400, cy: 60 },
  { t: "Inbox", I: Inbox, ang: 0, chip: "New reply", side: "start" as const, cx: 482, cy: 254 },
  { t: "Broadcasting", I: Megaphone, ang: 60, chip: "Campaign sent", side: "start" as const, cx: 400, cy: 448 },
  { t: "Voice", I: Phone, ang: 120, chip: "Call summarised", side: "end" as const, cx: 160, cy: 448 },
  { t: "Analytics", I: BarChart3, ang: 180, chip: "Live report", side: "end" as const, cx: 78, cy: 254 },
  { t: "Developer API", I: Code2, ang: -120, chip: "Webhook delivered", side: "end" as const, cx: 160, cy: 60 },
].map((c, i) => {
  const a = (c.ang * Math.PI) / 180
  return { ...c, i, x: Math.round(CX + D * Math.cos(a)), y: Math.round(CY + D * Math.sin(a)), s: 6 + i * 13 }
})

const CSS = `
${CELLS.map((c) => `@keyframes px-c${c.i} { 0%, ${c.s - 1}% { fill: var(--background); stroke: var(--border) } ${c.s + 1}%, ${c.s + 11}% { fill: oklch(0.95 0.06 168); stroke: var(--primary) } ${c.s + 14}%, 100% { fill: var(--background); stroke: var(--border) } }
@keyframes px-k${c.i} { 0%, ${c.s - 1}% { opacity: 0; transform: translateY(6px) } ${c.s + 2}%, ${c.s + 11}% { opacity: 1; transform: none } ${c.s + 14}%, 100% { opacity: 0 } }
@keyframes px-d${c.i} { 0%, ${c.s}% { opacity: 0; translate: 0 0 } ${c.s + 1}% { opacity: 1 } ${c.s + 5}% { opacity: 1; translate: ${c.x - CX}px ${c.y - CY}px } ${c.s + 6}% { opacity: 0; translate: ${c.x - CX}px ${c.y - CY}px } ${c.s + 7}% { opacity: 1; translate: ${c.x - CX}px ${c.y - CY}px } ${c.s + 11}% { opacity: 1; translate: 0 0 } ${c.s + 12}%, 100% { opacity: 0; translate: 0 0 } }
.px-c${c.i} { animation: px-c${c.i} 14s ease-in-out infinite }
.px-k${c.i} { opacity: 0; animation: px-k${c.i} 14s ease-out infinite }
.px-d${c.i} { opacity: 0; animation: px-d${c.i} 14s ease-in-out infinite }`).join("\n")}
@keyframes px-core { 0%, 100% { opacity: .5; transform: scale(1) } 50% { opacity: 0; transform: scale(1.35) } }
@keyframes px-float { 0%, 100% { transform: translateY(-3px) } 50% { transform: translateY(4px) } }
@keyframes px-blob { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(14px, -10px) } }
@keyframes px-spark { 0%, 100% { opacity: .2; transform: scale(.6) } 50% { opacity: 1; transform: scale(1.1) } }
.px-core { transform-box: fill-box; transform-origin: center; animation: px-core 3s ease-out infinite }
.px-float { animation: px-float 7s ease-in-out infinite }
.px-blob { animation: px-blob 9s ease-in-out infinite }
.px-spark { transform-box: fill-box; transform-origin: center; animation: px-spark 3.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .px-core, .px-float, .px-blob, .px-spark { animation: none }
  ${CELLS.map((c) => `.px-c${c.i}, .px-k${c.i}, .px-d${c.i}`).join(", ")} { animation: none }
  ${CELLS.map((c) => `.px-k${c.i}`).join(", ")} { opacity: 1 }
}
`

export function PlatformHex() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 560 500" role="img" aria-label="Six platform modules, agentic AI, inbox, broadcasting, voice, analytics and developer API, arranged around one shared customer record" className="h-auto w-full overflow-visible">
        <defs>
          <filter id="pxBlob" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="32" /></filter>
          <filter id="pxShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#0f1a2e" floodOpacity=".14" /></filter>
          <linearGradient id="pxCore" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="oklch(0.72 0.14 168)" />
            <stop offset="1" stopColor="oklch(0.52 0.13 172)" />
          </linearGradient>
        </defs>

        <g aria-hidden>
          <circle className="px-blob" cx="90" cy="380" r="100" fill="oklch(0.8 0.13 168)" opacity=".3" filter="url(#pxBlob)" />
          <circle className="px-blob" style={{ animationDelay: "-3s" }} cx="480" cy="110" r="100" fill="oklch(0.74 0.14 250)" opacity=".25" filter="url(#pxBlob)" />
          <circle className="px-blob" style={{ animationDelay: "-6s" }} cx="470" cy="420" r="80" fill="oklch(0.85 0.14 80)" opacity=".25" filter="url(#pxBlob)" />
        </g>

        <g className="px-float">
          {/* the six modules */}
          {CELLS.map((c) => (
            <g key={c.t}>
              <g filter="url(#pxShadow)"><polygon points={hex(c.x, c.y)} fill="var(--background)" /></g>
              <polygon className={`px-c${c.i}`} points={hex(c.x, c.y)} fill="var(--background)" stroke="var(--border)" strokeWidth="2.5" strokeLinejoin="round" />
              <c.I x={c.x - 14} y={c.y - 30} width="28" height="28" stroke="var(--primary)" strokeWidth={1.9} />
              <text x={c.x} y={c.y + 24} textAnchor="middle" fontSize="15.5" fontWeight="700" fill="var(--foreground)" fontFamily="inherit">{c.t}</text>
            </g>
          ))}

          {/* the shared customer record */}
          <circle className="px-core" cx={CX} cy={CY} r="62" fill="none" stroke="var(--primary)" strokeWidth="3" />
          <g filter="url(#pxShadow)"><polygon points={hex(CX, CY, 66)} fill="url(#pxCore)" /></g>
          <polygon points={hex(CX, CY, 60)} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.6" strokeLinejoin="round" />
          <text x={CX} y={CY - 2} textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="inherit">Customer</text>
          <text x={CX} y={CY + 18} textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="inherit">record</text>

          {/* a packet running between the record and the module that is working */}
          {CELLS.map((c) => (
            <circle key={c.t} className={`px-d${c.i}`} cx={CX} cy={CY} r="6.5" fill="oklch(0.85 0.15 80)" stroke="#fff" strokeWidth="2" />
          ))}
        </g>

        {/* a short result beside each module as it works */}
        {CELLS.map((c) => (
          <g key={c.t} className={`px-k${c.i}`} fontFamily="inherit">
            <text x={c.cx} y={c.cy} textAnchor={c.side} fontSize="15" fontWeight="700" fill="var(--primary)">{"✓ "}{c.chip}</text>
          </g>
        ))}

        <text x="280" y="492" textAnchor="middle" fontSize="16" fill="var(--muted-foreground)" fontFamily="inherit">Six modules, one customer record.</text>

        {[[30, 150], [532, 330], [520, 40], [40, 440]].map(([x, y], i) => (
          <path key={i} className="px-spark" style={{ animationDelay: `${i * 0.8}s` }} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2} Z`} fill="oklch(0.8 0.15 75)" />
        ))}
      </svg>
      <style>{CSS}</style>
    </div>
  )
}
