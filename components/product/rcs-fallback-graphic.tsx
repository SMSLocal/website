import { BadgeCheck, MapPin, Package, Send } from "lucide-react"

// Graphic for the RCS API section on /products/rcs: one send that forks to two phones. The phone that supports RCS shows a
// rich card, the other shows the same news as a plain SMS. A still SVG drawing, so it stays sharp at any width.

const INK = "#14233a"
const GREY = "#5b6678"
const BLUE = "#0b57d0"

function Phone({ x }: { x: number }) {
  return (
    <>
      <rect x={x} y={150} width={196} height={270} rx={30} fill="#fff" stroke="#111827" strokeWidth={6} />
      <rect x={x + 74} y={160} width={48} height={7} rx={3.5} fill="#111827" />
    </>
  )
}

export function RcsFallbackGraphic() {
  return (
    <svg viewBox="0 0 440 480" role="img" aria-label="One send reaches two phones. The phone that supports RCS receives a rich card from the verified business with a Track order button. The phone that does not support RCS receives the same update as a plain SMS" className="mx-auto h-auto w-full max-w-[470px] font-sans">
      {/* one send, forking to both */}
      <path d="M220 72 V94 Q220 112 202 112 H134 Q116 112 116 130 V148" fill="none" stroke="#0e9f6e" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M220 72 V94 Q220 112 238 112 H306 Q324 112 324 130 V148" fill="none" stroke="#94a3b8" strokeWidth={2.5} strokeLinecap="round" />
      <rect x={146} y={20} width={148} height={52} rx={26} fill={INK} />
      <Send x={172} y={36} width={20} height={20} color="#6ee7b7" />
      <text x={204} y={52} fontSize={16} fontWeight={700} fill="#fff">One send</text>

      {/* phone with RCS: a rich card */}
      <Phone x={20} />
      <circle cx={50} cy={193} r={13} fill="#0f2a47" />
      <text x={50} y={198} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fff">U</text>
      <text x={70} y={198} fontSize={14} fontWeight={700} fill={INK}>Urban Cart</text>
      <BadgeCheck x={147} y={185} width={17} height={17} fill={BLUE} color="#fff" />
      <rect x={36} y={218} width={164} height={178} rx={16} fill="#fff" stroke="#dbe2ec" />
      <path d="M36 292 V234 Q36 218 52 218 H184 Q200 218 200 234 V292 Z" fill="#d9f2e6" />
      <Package x={96} y={233} width={44} height={44} color="#0b7a55" strokeWidth={1.6} />
      <text x={50} y={316} fontSize={13.5} fontWeight={700} fill={INK}>Order on the way</text>
      <text x={50} y={336} fontSize={12} fill={GREY}>Arriving today</text>
      <line x1={36} y1={354} x2={200} y2={354} stroke="#dbe2ec" />
      <MapPin x={66} y={367} width={15} height={15} color={BLUE} />
      <text x={86} y={380} fontSize={13} fontWeight={700} fill={BLUE}>Track order</text>

      {/* phone without RCS: the same news as SMS */}
      <Phone x={224} />
      <text x={322} y={198} textAnchor="middle" fontSize={13} fontWeight={700} fill={GREY}>VM-URBCRT</text>
      <path d="M240 234 Q240 218 256 218 H388 Q404 218 404 234 V306 Q404 322 388 322 H246 Q240 322 240 316 Z" fill="#e9edf2" />
      <text fontSize={13} fill={INK}>
        <tspan x={254} y={242}>Urban Cart: Your</tspan>
        <tspan x={254} y={262}>order is on the way</tspan>
        <tspan x={254} y={282}>and arrives today.</tspan>
        <tspan x={254} y={302}>Thank you.</tspan>
      </text>

      {/* captions */}
      <text x={118} y={450} textAnchor="middle" fontSize={16} fontWeight={700} fill="#0b7a55">RCS rich card</text>
      <text x={118} y={470} textAnchor="middle" fontSize={13} fill={GREY}>Phones that support RCS</text>
      <text x={322} y={450} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>SMS fallback</text>
      <text x={322} y={470} textAnchor="middle" fontSize={13} fill={GREY}>All other phones</text>
    </svg>
  )
}
