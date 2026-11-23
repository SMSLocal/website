import { BadgeCheck, MessageSquare, ScanSearch } from "lucide-react"

// Hero graphic for /channels/rcs-broadcasting, kept deliberately quiet: thin lines, soft fills, lots of white. It draws what the page is
// about. On the left is the campaign (a drawn gift card with two buttons, no photograph). Small dots, each one a recipient, travel
// from it to a single "RCS check". From there most dots continue up to a rich RCS card and a few continue down to a plain SMS, which is
// exactly what happens in one send: RCS where the phone can show it, SMS where it cannot. The two outputs breathe softly when dots
// arrive. Hand-drawn SVG with SMIL motion, so it needs no JavaScript and works as a server component. Silent. No prices, no stats.

export function GiftArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 80" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="gift-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9f4e8" />
          <stop offset="1" stopColor="#d8e8fb" />
        </linearGradient>
      </defs>
      <rect width="160" height="80" fill="url(#gift-bg)" />
      <circle cx="26" cy="20" r="14" fill="#fff" opacity=".5" />
      <circle cx="140" cy="62" r="20" fill="#fff" opacity=".4" />
      <g transform="translate(58 14)">
        <rect x="0" y="22" width="44" height="34" rx="4" fill="#0e9f6e" />
        <rect x="-3" y="14" width="50" height="12" rx="3" fill="#12b886" />
        <rect x="19" y="14" width="6" height="42" fill="#fff" opacity=".9" />
        <path d="M22 14 C 12 2, 2 8, 10 14 Z M22 14 C 32 2, 42 8, 34 14 Z" fill="#fff" opacity=".95" />
      </g>
    </svg>
  )
}

const RCS_PATH = "M 168 196 L 268 196 C 330 196, 336 104, 396 104"
const SMS_PATH = "M 168 196 L 268 196 C 330 196, 336 290, 396 290"

const RCS_DOTS = [0, 0.8, 1.6, 2.4, 3.2]
const SMS_DOTS = [1.2, 3.6]
const DUR = 4

const CSS = `
@keyframes rfs-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
.rfs-float { animation: rfs-float 7s ease-in-out infinite }
@keyframes rfs-breathe { 0%, 100% { opacity: .0 } 50% { opacity: .5 } }
.rfs-breathe { animation: rfs-breathe 1.6s ease-in-out infinite }
@keyframes rfs-breathe2 { 0%, 100% { opacity: 0 } 50% { opacity: .5 } }
.rfs-breathe2 { animation: rfs-breathe2 4s ease-in-out infinite }
@keyframes rfs-scan { 0% { transform: scale(1); opacity: .45 } 100% { transform: scale(2); opacity: 0 } }
.rfs-scan { transform-box: fill-box; transform-origin: center; animation: rfs-scan 2.4s ease-out infinite }
@keyframes rfs-tap { 0%, 55%, 100% { fill: #fff } 65%, 85% { fill: #e3f6ed } }
.rfs-tap { animation: rfs-tap 3.2s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .rfs-float, .rfs-breathe, .rfs-breathe2, .rfs-scan, .rfs-tap { animation: none } .rfs-scan { opacity: 0 } }
`

export function RcsFlowScene() {
  const label = "A quiet diagram of what the page is about. On the left is a campaign: a drawn gift card with two buttons. Small dots, each one a recipient, travel from it to a single RCS check. From there most dots continue up to a rich RCS card from a verified sender, and a few continue down to a plain SMS. One send: RCS where the phone can show it, SMS where it cannot"
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <svg viewBox="0 0 580 390" role="img" aria-label={label} className="h-auto w-full overflow-visible">
        <defs>
          <radialGradient id="rfs-glow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#34d399" stopOpacity=".2" />
            <stop offset="1" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
          <filter id="rfs-sh" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f2a47" floodOpacity=".1" />
          </filter>
          <clipPath id="rfs-clip-a"><rect x="32" y="130" width="116" height="66" rx="10" /></clipPath>
          <clipPath id="rfs-clip-b"><rect x="406" y="62" width="148" height="50" rx="8" /></clipPath>
        </defs>

        <ellipse cx="290" cy="195" rx="290" ry="180" fill="url(#rfs-glow)" />

        {/* the lines */}
        {[RCS_PATH, SMS_PATH].map((d) => <path key={d} d={d} fill="none" stroke="#0f2a47" strokeOpacity=".16" strokeWidth="1.6" strokeLinecap="round" />)}

        {/* the campaign */}
        <g className="rfs-float" filter="url(#rfs-sh)">
          <rect x="20" y="110" width="148" height="172" rx="16" fill="#fff" stroke="#0f2a47" strokeOpacity=".1" />
          <g clipPath="url(#rfs-clip-a)"><g transform="translate(32 130) scale(.725)"><GiftArtShape /></g></g>
          <rect x="34" y="208" width="96" height="7" rx="3.5" fill="#0f2a47" opacity=".75" />
          <rect x="34" y="222" width="116" height="5" rx="2.5" fill="#0f2a47" opacity=".14" />
          <rect x="34" y="232" width="84" height="5" rx="2.5" fill="#0f2a47" opacity=".14" />
          <rect x="34" y="248" width="56" height="20" rx="10" fill="#fff" stroke="#0a7cff" strokeOpacity=".45" />
          <rect x="96" y="248" width="56" height="20" rx="10" fill="#fff" stroke="#0a7cff" strokeOpacity=".45" />
        </g>
        <text x="94" y="306" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0f2a47">Your campaign</text>
        <text x="94" y="322" textAnchor="middle" fontSize="10.5" fill="#0f2a47" opacity=".55">One card, one list</text>

        {/* the check */}
        <circle className="rfs-scan" cx="270" cy="196" r="26" fill="none" stroke="#0e9f6e" strokeWidth="1.6" />
        <circle cx="270" cy="196" r="26" fill="#fff" stroke="#0e9f6e" strokeWidth="1.6" filter="url(#rfs-sh)" />
        <ScanSearch x={257} y={183} width={26} height={26} stroke="#0e9f6e" strokeWidth={1.7} />
        <text x="270" y="244" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0f2a47">RCS check</text>
        <text x="270" y="259" textAnchor="middle" fontSize="9.5" fill="#0f2a47" opacity=".55">on every number</text>

        {/* the rich RCS card */}
        <g className="rfs-float" style={{ animationDelay: "-2s" }} filter="url(#rfs-sh)">
          <rect x="396" y="40" width="168" height="130" rx="14" fill="#fff" stroke="#0f2a47" strokeOpacity=".1" />
          <rect className="rfs-breathe" x="394" y="38" width="172" height="134" rx="16" fill="none" stroke="#0e9f6e" strokeWidth="1.6" />
          <circle cx="414" cy="56" r="7" fill="#0e9f6e" />
          <text x="414" y="59.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">U</text>
          <text x="426" y="59.5" fontSize="9.5" fontWeight="700" fill="#0f2a47">Urban Cart</text>
          <BadgeCheck x={485} y={50} width={12} height={12} stroke="#0e9f6e" strokeWidth={2.2} />
          <g clipPath="url(#rfs-clip-b)"><g transform="translate(406 62) scale(.925 .625)"><GiftArtShape /></g></g>
          <rect x="410" y="120" width="86" height="6" rx="3" fill="#0f2a47" opacity=".7" />
          <rect className="rfs-tap" x="408" y="136" width="70" height="22" rx="11" stroke="#0a7cff" strokeOpacity=".45" />
          <text x="443" y="150.5" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0a7cff">Shop now</text>
          <rect x="484" y="136" width="70" height="22" rx="11" fill="#fff" stroke="#0a7cff" strokeOpacity=".45" />
          <text x="519" y="150.5" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0a7cff">View offer</text>
        </g>
        <text x="480" y="192" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f2a47">RCS: a rich card</text>

        {/* the SMS */}
        <g className="rfs-float" style={{ animationDelay: "-4s" }}>
          <path d="M 406 246 h 140 a 14 14 0 0 1 14 14 v 40 a 14 14 0 0 1 -14 14 h -118 l -14 10 v -10 h -8 a 14 14 0 0 1 -14 -14 v -40 a 14 14 0 0 1 14 -14 z" fill="#eef1f4" stroke="#0f2a47" strokeOpacity=".1" />
          <path className="rfs-breathe2" d="M 406 246 h 140 a 14 14 0 0 1 14 14 v 40 a 14 14 0 0 1 -14 14 h -118 l -14 10 v -10 h -8 a 14 14 0 0 1 -14 -14 v -40 a 14 14 0 0 1 14 -14 z" fill="none" stroke="#64748b" strokeWidth="1.6" />
          <MessageSquare x={418} y={256} width={12} height={12} stroke="#64748b" strokeWidth={2} />
          <rect x="436" y="258" width="96" height="6" rx="3" fill="#0f2a47" opacity=".5" />
          <rect x="418" y="276" width="124" height="5" rx="2.5" fill="#0f2a47" opacity=".2" />
          <rect x="418" y="288" width="88" height="5" rx="2.5" fill="#0f2a47" opacity=".2" />
        </g>
        <text x="480" y="342" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f2a47">SMS: where RCS is not available</text>

        {/* recipients travelling */}
        {RCS_DOTS.map((b) => (
          <circle key={`r${b}`} r="4.5" fill="#0e9f6e">
            <animateMotion dur={`${DUR}s`} begin={`${b}s`} repeatCount="indefinite" path={RCS_PATH} keyTimes="0;1" calcMode="spline" keySplines=".45 0 .35 1" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.9;1" dur={`${DUR}s`} begin={`${b}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {SMS_DOTS.map((b) => (
          <circle key={`s${b}`} r="4.5" fill="#64748b">
            <animateMotion dur={`${DUR}s`} begin={`${b}s`} repeatCount="indefinite" path={SMS_PATH} keyTimes="0;1" calcMode="spline" keySplines=".45 0 .35 1" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.9;1" dur={`${DUR}s`} begin={`${b}s`} repeatCount="indefinite" />
          </circle>
        ))}

        <text x="290" y="372" textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#0f2a47" opacity=".75">One send. RCS where it works, SMS where it does not.</text>
      </svg>
      <style>{CSS}</style>
    </div>
  )
}

// the gift drawing as raw shapes, so it can be placed and clipped inside the diagram
function GiftArtShape() {
  return (
    <g>
      <rect width="160" height="80" fill="#e4f4ee" />
      <circle cx="26" cy="20" r="14" fill="#fff" opacity=".55" />
      <circle cx="140" cy="62" r="20" fill="#d8e8fb" opacity=".8" />
      <g transform="translate(58 14)">
        <rect x="0" y="22" width="44" height="34" rx="4" fill="#0e9f6e" />
        <rect x="-3" y="14" width="50" height="12" rx="3" fill="#12b886" />
        <rect x="19" y="14" width="6" height="42" fill="#fff" opacity=".9" />
        <path d="M22 14 C 12 2, 2 8, 10 14 Z M22 14 C 32 2, 42 8, 34 14 Z" fill="#fff" opacity=".95" />
      </g>
    </g>
  )
}
