import { Check } from "lucide-react"

// Hero graphic for /products/agentic-ai (file name kept from earlier versions). A hand-drawn glossy glass scene:
// a glowing round pedestal with an "AI" glass tile on top (Captain), and six upright glass tiles standing on small
// bases around it, each with a real app logo. A customer request comes in, then a beam of light runs from Captain
// to each app in turn, the tile lifts, glows, shows a tick and names the action taken there. SVG + CSS, silent,
// 14-second loop.

const FAV = (host: string) => `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${host}&size=64`

const TILES = [
  { n: "Razorpay", a: "Refund ₹399", src: FAV("razorpay.com"), x: 86, y: 118, s: 10 },
  { n: "Shopify", a: "Order updated", src: FAV("shopify.com"), x: 204, y: 60, s: 24 },
  { n: "Gmail", a: "Invoice emailed", src: FAV("mail.google.com"), x: 356, y: 60, s: 38 },
  { n: "HubSpot", a: "CRM note added", src: FAV("hubspot.com"), x: 474, y: 118, s: 52 },
  { n: "Slack", a: "Team alerted", src: FAV("slack.com"), x: 462, y: 296, s: 66 },
  { n: "Zendesk", a: "Ticket closed", src: FAV("zendesk.com"), x: 98, y: 296, s: 78 },
]

const CSS = `
${TILES.map((t, i) => `@keyframes ar6-l${i} { 0%, ${t.s - 1}% { transform: translateY(0) } ${t.s + 3}%, ${t.s + 9}% { transform: translateY(-14px) } ${t.s + 13}%, 100% { transform: translateY(0) } }
@keyframes ar6-g${i} { 0%, ${t.s - 1}% { opacity: 0 } ${t.s + 3}%, ${t.s + 9}% { opacity: 1 } ${t.s + 15}%, 100% { opacity: 0 } }
@keyframes ar6-a${i} { 0%, ${t.s}% { opacity: 0 } ${t.s + 4}%, 94% { opacity: 1 } 98%, 100% { opacity: 0 } }
@keyframes ar6-b${i} { 0%, ${t.s - 4}% { opacity: 0; stroke-dashoffset: 16 } ${t.s - 3}% { opacity: 1; stroke-dashoffset: 16 } ${t.s + 3}% { opacity: 1; stroke-dashoffset: -84 } ${t.s + 4}%, 100% { opacity: 0; stroke-dashoffset: -84 } }
@keyframes ar6-h${i} { 0%, ${t.s - 4}% { opacity: 0; stroke-dashoffset: 0 } ${t.s - 3}% { opacity: 1; stroke-dashoffset: 0 } ${t.s + 3}% { opacity: 1; stroke-dashoffset: -100 } ${t.s + 4}%, 100% { opacity: 0; stroke-dashoffset: -100 } }
@keyframes ar6-p${i} { 0%, ${t.s - 1}% { opacity: 0 } ${t.s + 1}%, ${t.s + 4}% { opacity: .55 } ${t.s + 9}%, 100% { opacity: 0 } }
.ar6-l${i} { animation: ar6-l${i} 14s cubic-bezier(.3,0,.2,1) infinite }
.ar6-g${i} { opacity: 0; animation: ar6-g${i} 14s ease-out infinite }
.ar6-a${i} { opacity: 0; animation: ar6-a${i} 14s ease-out infinite }
.ar6-b${i} { opacity: 0; stroke-dasharray: 16 300; stroke-dashoffset: 16; animation: ar6-b${i} 14s cubic-bezier(.5,0,.3,1) infinite }
.ar6-h${i} { opacity: 0; stroke-dasharray: .01 300; stroke-dashoffset: 0; animation: ar6-h${i} 14s cubic-bezier(.5,0,.3,1) infinite }`).join("\n")}
@keyframes ar6-bob { 0%, 100% { transform: translateY(-3px) } 50% { transform: translateY(4px) } }
@keyframes ar6-ai { 0%, 100% { transform: translateY(-4px) } 50% { transform: translateY(5px) } }
@keyframes ar6-ring { 0% { transform: scale(.55); opacity: .8 } 100% { transform: scale(1.25); opacity: 0 } }
@keyframes ar6-glow { 0%, 100% { opacity: .75 } 50% { opacity: 1 } }
@keyframes ar6-req { 0%, 1% { opacity: 0; transform: translateY(-8px) } 5%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }
@keyframes ar6-done { 0%, 86% { opacity: 0; transform: translateY(6px) } 90%, 95% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }
@keyframes ar6-blob { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(14px, -10px) } }
@keyframes ar6-spark { 0%, 100% { opacity: .15; transform: scale(.6) } 50% { opacity: .9; transform: scale(1) } }
.ar6-bob { animation: ar6-bob 5s ease-in-out infinite }
.ar6-ai { animation: ar6-ai 4.5s ease-in-out infinite }
.ar6-ring { transform-box: fill-box; transform-origin: center; animation: ar6-ring 2.8s ease-out infinite }
.ar6-glow { animation: ar6-glow 3s ease-in-out infinite }
@keyframes ar6-rise { 0% { transform: translateY(0); opacity: 0 } 15% { opacity: .95 } 100% { transform: translateY(-120px); opacity: 0 } }
.ar6-rise { animation: ar6-rise 4.6s ease-out infinite; opacity: 0 }
.ar6-spark { transform-box: fill-box; transform-origin: center; animation: ar6-spark 3.4s ease-in-out infinite }
.ar6-req { opacity: 0; animation: ar6-req 14s ease-out infinite }
.ar6-done { opacity: 0; animation: ar6-done 14s ease-out infinite }
.ar6-blob { animation: ar6-blob 9s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .ar6-bob, .ar6-ai, .ar6-ring, .ar6-glow, .ar6-blob, .ar6-spark, .ar6-rise { animation: none }
  .ar6-req, .ar6-done, [class*="ar6-a"] { animation: none; opacity: 1; transform: none }
  [class*="ar6-l"] { animation: none } [class*="ar6-g"], [class*="ar6-b"], [class*="ar6-h"] { animation: none; opacity: 0 }
}
`

// isometric top plane for the AI tile: x runs up-right, y runs down-right
const ISO = "matrix(.9 -.45 .9 .45 0 0)"
const SPARKS = [[60, 190, 0], [520, 200, 1.1], [150, 330, 2.2], [410, 350, 0.6], [300, 20, 1.7], [540, 70, 2.8]]

export function AgentRace() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="ar6-blob absolute -left-8 top-[52%] h-[220px] w-[220px] rounded-full bg-primary/12 blur-[70px]" />
        <span className="ar6-blob absolute -right-6 top-0 h-[220px] w-[220px] rounded-full bg-[oklch(0.74_0.14_250)]/13 blur-[70px]" style={{ animationDelay: "-4s" }} />
        <span className="ar6-blob absolute bottom-0 left-1/3 h-[160px] w-[160px] rounded-full bg-[oklch(0.85_0.14_80)]/12 blur-[70px]" style={{ animationDelay: "-7s" }} />
      </div>

      {/* the customer request, plain text */}
      <p className="ar6-req flex items-center justify-center gap-2 text-center text-[13.5px] font-medium tracking-tight sm:text-[14.5px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/channels/whatsapp.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0" />
        “Refund order #1042 and email me the invoice.”
      </p>

      <svg viewBox="0 0 560 412" className="mt-1 block w-full" role="img" aria-label="Captain AI at the centre, connected to Razorpay, Shopify, Gmail, HubSpot, Slack and Zendesk, completing a refund, an invoice and a CRM note">
        <defs>
          <linearGradient id="ar6-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "#fff", stopOpacity: 0.7 }} />
            <stop offset="0.55" style={{ stopColor: "#fff", stopOpacity: 0.28 }} />
            <stop offset="1" style={{ stopColor: "oklch(0.9 0.05 200)", stopOpacity: 0.3 }} />
          </linearGradient>
          <linearGradient id="ar6-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "#fff", stopOpacity: 0.7 }} />
            <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0.18 }} />
          </linearGradient>
          <linearGradient id="ar6-ai-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "#fff" }} />
            <stop offset="0.55" style={{ stopColor: "oklch(0.93 0.04 180)" }} />
            <stop offset="1" style={{ stopColor: "color-mix(in oklch, var(--primary) 62%, white)" }} />
          </linearGradient>
          <linearGradient id="ar6-cyl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "oklch(0.9 0.04 190)" }} />
            <stop offset="0.5" style={{ stopColor: "#fff" }} />
            <stop offset="1" style={{ stopColor: "oklch(0.86 0.06 190)" }} />
          </linearGradient>
          <linearGradient id="ar6-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "var(--primary)" }} />
            <stop offset="1" style={{ stopColor: "oklch(0.7 0.14 235)" }} />
          </linearGradient>
          <linearGradient id="ar6-col" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: 0.12 }} />
            <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="ar6-shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ar6-floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: 0.14 }} />
            <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
          </radialGradient>
          <clipPath id="ar6-clip"><rect x="-30" y="-34" width="60" height="68" rx="13" /></clipPath>
          <filter id="ar6-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
          <filter id="ar6-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        {/* sparkles in the air */}
        {SPARKS.map(([x, y, d]) => (
          <path key={`${x}-${y}`} className="ar6-spark" d={`M${x} ${y - 6} L${x + 1.6} ${y - 1.6} L${x + 6} ${y} L${x + 1.6} ${y + 1.6} L${x} ${y + 6} L${x - 1.6} ${y + 1.6} L${x - 6} ${y} L${x - 1.6} ${y - 1.6} Z`} fill="var(--primary)" style={{ animationDelay: `${d}s` }} />
        ))}

        {/* floor glow */}
        <ellipse cx="280" cy="262" rx="230" ry="84" fill="url(#ar6-floor)" />

        {/* light beams from Captain to each app, one at a time */}
        {TILES.map((t, i) => {
          const tx = t.x
          const ty = t.y + 46
          const cx = 280 + (tx - 280) * 0.5
          const cy = Math.min(ty, 250) - 40
          const d = `M280 258 Q${cx} ${cy} ${tx} ${ty}`
          return (
            <g key={`beam-${t.n}`}>
              <path d={d} fill="none" stroke="var(--primary)" strokeOpacity=".3" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
              <path className={`ar6-b${i}`} d={d} pathLength="100" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
              <path className={`ar6-h${i}`} d={d} pathLength="100" fill="none" stroke="var(--primary)" strokeWidth="11" strokeLinecap="round" />
              <path className={`ar6-h${i}`} d={d} pathLength="100" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" />
            </g>
          )
        })}

        {/* pedestal: three stacked glass discs with a glowing ring */}
        <g>
          <path d="M142 262 v16 a138 52 0 0 0 276 0 v-16 z" fill="url(#ar6-cyl)" opacity=".95" />
          <ellipse cx="280" cy="262" rx="138" ry="52" fill="#fff" stroke="var(--primary)" strokeOpacity=".25" />
          <ellipse className="ar6-glow" cx="280" cy="262" rx="112" ry="41" fill="none" stroke="var(--primary)" strokeWidth="4" filter="url(#ar6-soft)" />
          <ellipse cx="280" cy="262" rx="112" ry="41" fill="none" stroke="var(--primary)" strokeOpacity=".8" strokeWidth="1.6" />
          <ellipse className="ar6-ring" cx="280" cy="262" rx="112" ry="41" fill="none" stroke="var(--primary)" strokeWidth="2" />
          <ellipse className="ar6-ring" cx="280" cy="262" rx="112" ry="41" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ animationDelay: "1.4s" }} />
          <path d="M196 252 v12 a84 31 0 0 0 168 0 v-12 z" fill="url(#ar6-cyl)" />
          <ellipse cx="280" cy="252" rx="84" ry="31" fill="#fff" stroke="var(--primary)" strokeOpacity=".35" />
          <ellipse cx="280" cy="252" rx="64" ry="23" fill="oklch(0.93 0.05 180)" stroke="var(--primary)" strokeOpacity=".5" />
        </g>

        {/* light column and rising particles above the pedestal */}
        <path d="M232 250 L252 96 L308 96 L328 250 Z" fill="url(#ar6-col)" filter="url(#ar6-soft)" />
        {[[250, 0], [272, 0.9], [294, 1.8], [310, 2.6], [262, 3.3], [284, 4.1]].map(([x, d]) => (
          <circle key={x} className="ar6-rise" cx={x} cy="240" r="2.4" fill="#fff" stroke="var(--primary)" strokeWidth="1" style={{ animationDelay: `${d}s` }} />
        ))}

        {/* Captain: the AI glass tile */}
        <g className="ar6-ai">
          <ellipse cx="280" cy="236" rx="70" ry="26" fill="var(--primary)" opacity=".18" filter="url(#ar6-blur)" />
          <g transform="translate(280 214)"><g transform={ISO}><rect className="ar6-glow" x="-44" y="-44" width="88" height="88" rx="18" fill="none" stroke="var(--primary)" strokeWidth="7" filter="url(#ar6-soft)" /></g></g>
          <g transform="translate(280 214)">
            <g transform="translate(0 12)"><g transform={ISO}><rect x="-42" y="-42" width="84" height="84" rx="16" fill="url(#ar6-edge)" /></g></g>
            <g transform={ISO}>
              <rect x="-42" y="-42" width="84" height="84" rx="16" fill="url(#ar6-ai-top)" stroke="#fff" strokeWidth="2" />
              <rect x="-34" y="-34" width="68" height="68" rx="11" fill="none" stroke="#fff" strokeOpacity=".7" />
              <text x="0" y="12" textAnchor="middle" fontSize="34" fontWeight="700" fill="#fff" stroke="var(--primary)" strokeWidth="1.4" paintOrder="stroke" style={{ letterSpacing: "-0.02em" }}>AI</text>
            </g>
          </g>
        </g>
        <text x="280" y="333" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--primary)">Captain AI</text>

        {/* six app tiles: glass cards on small glass bases */}
        {TILES.map((t, i) => (
          <g key={t.n} transform={`translate(${t.x} ${t.y})`}>
            <g className="ar6-bob" style={{ animationDelay: `${i * 0.7}s` }}>
              <ellipse cx="0" cy="48" rx="40" ry="14" fill="var(--primary)" opacity=".18" filter="url(#ar6-soft)" />
              <path d="M-38 46 v5 a38 13 0 0 0 76 0 v-5 z" fill="url(#ar6-edge)" opacity=".7" />
              <ellipse cx="0" cy="46" rx="38" ry="13" fill="url(#ar6-glass)" stroke="#fff" strokeWidth="1.4" />
              <ellipse cx="-8" cy="43.5" rx="20" ry="5" fill="#fff" opacity=".5" />
              <g className={`ar6-l${i}`}>
                <ellipse className={`ar6-g${i}`} cx="0" cy="0" rx="42" ry="42" fill="var(--primary)" opacity=".13" filter="url(#ar6-blur)" />
                <g transform="skewY(-9)">
                  <rect x="-30" y="-34" width="60" height="68" rx="13" fill="url(#ar6-edge)" transform="translate(7 3)" />
                  <rect x="-30" y="-34" width="60" height="68" rx="13" fill="url(#ar6-glass)" />
                  <g clipPath="url(#ar6-clip)">
                    <path d="M-32 -22 L-12 -36 L8 -36 L-32 12 Z" fill="#fff" opacity=".6" />
                    <path d="M-32 22 L22 -36 L26 -36 L-32 30 Z" fill="#fff" opacity=".35" />
                    <path d="M32 36 L10 36 L32 10 Z" fill="#fff" opacity=".4" />
                    <path d="M-30 34 L30 34" stroke="oklch(0.85 0.08 200)" strokeWidth="3" opacity=".55" />
                  </g>
                  <rect x="-30" y="-34" width="60" height="68" rx="13" fill="none" stroke="#fff" strokeWidth="1.8" />
                  <rect x="-25.5" y="-29.5" width="51" height="59" rx="9.5" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="1" />
                  <rect x="-30" y="-34" width="60" height="68" rx="13" fill="none" stroke="var(--primary)" strokeOpacity=".16" strokeWidth=".8" />
                  <path d="M-20 -33 h26" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="22" cy="-26" r="1.6" fill="#fff" />
                  <image href={t.src} x="-16" y="-16" width="32" height="32" preserveAspectRatio="xMidYMid meet" />
                </g>
                <g className={`ar6-a${i}`}>
                  <circle cx="30" cy="-44" r="11" fill="var(--primary)" stroke="#fff" strokeWidth="2.5" />
                  <path d="M24.5 -44 l4 4 l7 -8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
              <text x="0" y="78" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--foreground)">{t.n}</text>
              <text className={`ar6-a${i}`} x="0" y="96" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--primary)">{t.a}</text>
            </g>
          </g>
        ))}
      </svg>

      {/* result, plain text */}
      <p className="ar6-done mt-1 flex items-center justify-center gap-2 text-center text-[13.5px] font-semibold text-primary sm:text-[14.5px]">
        <Check className="h-4 w-4 shrink-0" strokeWidth={3.4} />Resolved. Six actions done, no ticket needed.
      </p>
      <style>{CSS}</style>
    </div>
  )
}
