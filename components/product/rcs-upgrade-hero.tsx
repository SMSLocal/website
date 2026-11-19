import { BadgeCheck, Image as ImageIcon, MessageSquare, MousePointerClick, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /products/rcs: an exploded view of one RCS message. Four flat layers are stacked in an isometric 3D scene, like
// one card: the SMS fallback at the bottom, the buttons, the message (photo, title, text) and the verified sender on top. The stack
// pulls apart, and each layer lights up in turn together with a note on the right saying what SMSLocal does for it (registers the
// brand, builds the card, adds tap buttons, keeps the DLT SMS ready), then the layers close back into one message. Plain CSS 3D, no
// scripts, so it works as a server component. The notes drop under the stack on phones. Silent, looping. No clock times.

const LOOP = 12

type Stop = [number, number, boolean, number] // [percent, translateZ px, highlighted, opacity]

// timeline: plain SMS alone, the RCS layers appear on top of it as one message, the stack pulls apart, each layer lights up, it closes again
const plate = (i: number, z0: number, z1: number, hs: number) => {
  const he = hs + 9
  const o = i === 0 ? 1 : 0
  const stops: Stop[] = [
    [0, z0, false, o], [8, z0, false, o], [16, z0, false, 1], [28, z0, false, 1], [38, z1, false, 1],
    [hs, z1, false, 1], [hs + 3, z1, true, 1], [he, z1, true, 1], [he + 3, z1, false, 1],
    [86, z1, false, 1], [94, z0, false, 1], [98, z0, false, 1], [100, z0, false, o],
  ]
  const frames = stops
    .map(([p, z, h, op]) => `${p}% { opacity: ${op}; transform: translateZ(${z}px); box-shadow: ${h ? "0 0 0 2.5px var(--hi), 0 24px 40px -18px rgba(15,42,71,.4)" : "0 0 0 1px rgba(15,42,71,.12), 0 18px 30px -18px rgba(15,42,71,.3)"} }`)
    .join(" ")
  return `@keyframes rh-p${i} { ${frames} }
.rh-p${i} { opacity: ${o}; transform: translateZ(${z0}px); animation: rh-p${i} ${LOOP}s cubic-bezier(.4,0,.2,1) infinite }`
}

const note = (i: number, hs: number) => {
  const he = hs + 9
  return `@keyframes rh-n${i} { 0%, ${hs - 1}% { opacity: .38 } ${hs + 3}%, ${he}% { opacity: 1 } ${he + 4}%, 100% { opacity: .38 } }
.rh-n${i} { opacity: .38; animation: rh-n${i} ${LOOP}s ease-out infinite }
@keyframes rh-nb${i} { 0%, ${hs - 1}% { transform: scale(1) } ${hs + 1.5}% { transform: scale(1.22) } ${hs + 3}%, 100% { transform: scale(1) } }
.rh-nb${i} { animation: rh-nb${i} ${LOOP}s ease-out infinite }`
}

// layer order, bottom to top
const HS = { sender: 42, message: 51, buttons: 60, sms: 69 }

const CSS = `
${plate(0, 0, 0, HS.sms)}
${plate(1, 12, 70, HS.buttons)}
${plate(2, 24, 140, HS.message)}
${plate(3, 36, 210, HS.sender)}
${note(0, HS.sms)}${note(1, HS.buttons)}${note(2, HS.message)}${note(3, HS.sender)}
@keyframes rh-tap { 0%, 62% { transform: scale(1) } 65% { transform: scale(.94) } 68%, 100% { transform: scale(1) } }
.rh-tap { animation: rh-tap ${LOOP}s ease-out infinite }
@keyframes rh-floor { 0%, 28% { opacity: 0 } 38%, 86% { opacity: 1 } 94%, 100% { opacity: 0 } }
.rh-floor { opacity: 0; animation: rh-floor ${LOOP}s ease-out infinite }
@keyframes rh-l1 { 0%, 8% { opacity: 1 } 14%, 100% { opacity: 0 } }
.rh-l1 { animation: rh-l1 ${LOOP}s ease-out infinite }
@keyframes rh-l2 { 0%, 8% { opacity: 0 } 16%, 96% { opacity: 1 } 100% { opacity: 0 } }
.rh-l2 { opacity: 0; animation: rh-l2 ${LOOP}s ease-out infinite }
@media (prefers-reduced-motion: reduce) {
  .rh-p0, .rh-p1, .rh-p2, .rh-p3 { animation: none; opacity: 1 }
  .rh-p1 { transform: translateZ(70px) } .rh-p2 { transform: translateZ(140px) } .rh-p3 { transform: translateZ(210px) }
  .rh-n0, .rh-n1, .rh-n2, .rh-n3, .rh-floor, .rh-l2 { animation: none; opacity: 1 }
  .rh-l1 { animation: none; opacity: 0 }
  .rh-nb0, .rh-nb1, .rh-nb2, .rh-nb3, .rh-tap { animation: none }
}
`

const NOTES: { i: number; Icon: LucideIcon; c: string; t: string; d: string }[] = [
  { i: 3, Icon: BadgeCheck, c: "#0e9f6e", t: "Verified sender", d: "We register your brand with the carriers." },
  { i: 2, Icon: ImageIcon, c: "#6366f1", t: "Rich message", d: "Build photo, title and text once, in the dashboard or API." },
  { i: 1, Icon: MousePointerClick, c: "#2f78bd", t: "Tap buttons", d: "Buy now or Track order in one tap." },
  { i: 0, Icon: MessageSquare, c: "#64748b", t: "SMS fallback", d: "Phones without RCS get your DLT SMS." },
]

export function RcsUpgradeHero() {
  const label = "An exploded view of one RCS message. Four layers are stacked like a single card and then pulled apart in 3D: the verified sender on top, then the message with a photo, title and text, then the tap buttons, and at the bottom the SMS fallback. Each layer lights up in turn with a note on what SMSLocal does for it: registers your brand with the carriers, builds the rich card, adds one-tap buttons, and keeps your DLT-approved SMS ready for phones without RCS. The layers then close back into one message"
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div role="img" aria-label={label} className="grid items-center gap-5 sm:grid-cols-[300px_minmax(0,1fr)]">
        {/* the exploded stack */}
        <div className="relative mx-auto h-[400px] w-[300px]" style={{ perspective: "1100px" }}>
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center">
            <span className="rh-l1 absolute rounded-full bg-[#e9edf2] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0f2a47]/65">Plain SMS</span>
            <span className="rh-l2 inline-flex items-center gap-1.5 rounded-full bg-[#0e9f6e] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white"><BadgeCheck className="h-3.5 w-3.5" />RCS message</span>
          </span>
          <i aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(14,159,110,.16), transparent 62%)" }} />
          <div className="absolute left-1/2 top-[62%]" style={{ transformStyle: "preserve-3d", transform: "rotateX(54deg) rotateZ(-34deg) scale(1.1)" }}>
            {/* floor shadow */}
            <i className="rh-floor absolute -left-[118px] -top-[78px] h-[156px] w-[236px] rounded-3xl bg-[#0f2a47]/10 blur-md" style={{ transform: "translateZ(-30px)" }} />

            {/* bottom: SMS fallback */}
            <div className="rh-p0 absolute -left-[110px] -top-[70px] h-[140px] w-[220px] rounded-2xl bg-[#e9edf2] p-3.5" style={{ ["--hi" as string]: "#64748b" }}>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#0f2a47]/60"><MessageSquare className="h-3 w-3" />Plain SMS</span>
              <p className="mt-2 text-[11px] leading-snug text-[#0f2a47]/80">Urban Cart: Leather derby is back in stock. Shop: bit.ly/x1Kq</p>
            </div>

            {/* buttons */}
            <div className="rh-p1 absolute -left-[110px] -top-[70px] flex h-[140px] w-[220px] flex-col justify-end rounded-2xl bg-white p-3.5" style={{ ["--hi" as string]: "#2f78bd" }}>
              <div className="flex gap-2">
                <span className="rh-tap rounded-full bg-[#0e9f6e] px-4 py-2 text-[12px] font-semibold text-white">Buy now</span>
                <span className="rounded-full border border-[#cbd5e1] px-4 py-2 text-[12px] font-semibold text-[#0a7cff]">Details</span>
              </div>
            </div>

            {/* message: photo, title, text */}
            <div className="rh-p2 absolute -left-[110px] -top-[70px] flex h-[140px] w-[220px] items-center gap-3 rounded-2xl bg-white p-3.5" style={{ ["--hi" as string]: "#6366f1" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/home/p-shoe.webp" alt="" width={200} height={200} className="h-[96px] w-[84px] shrink-0 rounded-xl object-cover" />
              <span className="min-w-0 leading-tight">
                <span className="block text-[13px] font-semibold text-[#0f2a47]">Leather derby, back in stock</span>
                <span className="mt-1.5 block text-[12px] text-[#0f2a47]/65">Sizes 6 to 11</span>
                <span className="mt-1 block text-[11px] text-[#0b7a55]">Back in stock</span>
              </span>
            </div>

            {/* top: verified sender */}
            <div className="rh-p3 absolute -left-[110px] -top-[70px] flex h-[140px] w-[220px] items-start gap-2.5 rounded-2xl bg-white p-3.5" style={{ ["--hi" as string]: "#0e9f6e" }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f2a47] text-[15px] font-bold text-white">U</span>
              <span className="leading-tight">
                <span className="flex items-center gap-1 text-[14px] font-semibold text-[#0f2a47]">Urban Cart <BadgeCheck className="h-4 w-4 text-[#0e9f6e]" /></span>
                <span className="mt-0.5 flex items-center gap-1 text-[10.5px] text-[#0f2a47]/55"><ShieldCheck className="h-3 w-3" />Verified business</span>
              </span>
            </div>
          </div>
        </div>

        {/* what SMSLocal does for each layer */}
        <div>
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b7a55]">What SMSLocal sets up for you</p>
          <ul className="space-y-4">
          {NOTES.map((n) => (
            <li key={n.t} className={`rh-n${n.i} flex items-start gap-3`}>
              <span className={`rh-nb${n.i} flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white`} style={{ background: n.c }}><n.Icon className="h-[18px] w-[18px]" /></span>
              <span>
                <span className="block text-[14.5px] font-semibold leading-tight text-[#0f2a47]">{n.t}</span>
                <span className="mt-1 block text-[12.5px] leading-snug text-[#0f2a47]/65">{n.d}</span>
              </span>
            </li>
          ))}
          </ul>
          <p className="mt-5 border-t border-[#0f2a47]/10 pt-3 text-[12.5px] font-medium text-[#0f2a47]/75">One dashboard or API. RCS first, SMS behind it.</p>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
