import { BadgeCheck, CheckCheck, MessageSquare, MousePointerClick, Send } from "lucide-react"

// Hero graphic for /channels/rcs-broadcasting: one RCS card dealt to a whole list. No phones. A large rich card (verified sender, photo,
// title, two buttons) sits in front, tilted a little in 3D. When the broadcast goes out, copies of it slide out behind it like a deck,
// each addressed to a different customer and ticked as delivered. Then the front card turns over like a real card and shows the other
// side: the plain SMS that a phone without RCS receives from the same send. It turns back and the loop repeats. Pure HTML and CSS 3D,
// no scripts, so it works as a server component. Silent. No clock times, no prices, no stats.

const LOOP = 14

const NAMES = ["Aarav", "Meera", "Rohan", "Isha"]

const CSS = `
${NAMES.map((_, i) => {
  const a = 14 + i * 4
  return `@keyframes rd-g${i} { 0%, ${a}% { opacity: 0; transform: translate3d(0,0,0) } ${a + 9}%, 92% { opacity: 1; transform: translate3d(${(i + 1) * 20}px, ${-(i + 1) * 34}px, 0) } 98%, 100% { opacity: 0; transform: translate3d(0,0,0) } }
.rd-g${i} { opacity: 0; animation: rd-g${i} ${LOOP}s cubic-bezier(.2,.7,.2,1) infinite }`
}).join("\n")}
@keyframes rd-flip { 0%, 52% { transform: rotateY(0deg) } 60%, 78% { transform: rotateY(180deg) } 86%, 100% { transform: rotateY(360deg) } }
.rd-flip { animation: rd-flip ${LOOP}s cubic-bezier(.5,0,.2,1) infinite }
@keyframes rd-l1 { 0%, 50% { opacity: 1 } 56%, 84% { opacity: 0 } 90%, 100% { opacity: 1 } }
@keyframes rd-l2 { 0%, 50% { opacity: 0 } 56%, 84% { opacity: 1 } 90%, 100% { opacity: 0 } }
.rd-l1 { animation: rd-l1 ${LOOP}s ease-in-out infinite }
.rd-l2 { opacity: 0; animation: rd-l2 ${LOOP}s ease-in-out infinite }
@keyframes rd-tick { 0%, 30% { opacity: 0; transform: scale(.7) } 36%, 92% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }
.rd-tick { opacity: 0; animation: rd-tick ${LOOP}s ease-out infinite }
@keyframes rd-btn { 0%, 36% { transform: scale(1); background: #fff } 40% { transform: scale(.95); background: #d7f3e6 } 44%, 100% { transform: scale(1); background: #fff } }
.rd-btn { animation: rd-btn ${LOOP}s ease-out infinite }
@keyframes rd-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
.rd-float { animation: rd-float 6s ease-in-out infinite }
@keyframes rd-shine { 0%, 8% { transform: translateX(-130%) } 22%, 100% { transform: translateX(130%) } }
.rd-shine { animation: rd-shine ${LOOP}s ease-in-out infinite }
@keyframes rd-bar { 0%, 30% { transform: scaleX(0) } 40%, 92% { transform: scaleX(1) } 98%, 100% { transform: scaleX(0) } }
.rd-bar { transform-origin: left; transform: scaleX(0); animation: rd-bar ${LOOP}s ease-out infinite }
@keyframes rd-ptr { 0%, 33% { opacity: 0; transform: translate(34px, 26px) } 38%, 41% { opacity: 1; transform: translate(0, 0) } 46%, 100% { opacity: 0; transform: translate(0, 0) } }
.rd-ptr { opacity: 0; animation: rd-ptr ${LOOP}s ease-out infinite }
@keyframes rd-send { 0%, 8% { transform: scale(1) } 11% { transform: scale(1.08) } 15%, 100% { transform: scale(1) } }
.rd-send { animation: rd-send ${LOOP}s ease-out infinite }
@keyframes rd-dot { 0%, 10% { opacity: 0; transform: translate(0,0) } 14% { opacity: 1 } 26% { opacity: 0; transform: translate(var(--dx), var(--dy)) } 100% { opacity: 0 } }
.rd-dot { opacity: 0; animation: rd-dot ${LOOP}s ease-out infinite }
@media (prefers-reduced-motion: reduce) {
  .rd-float, .rd-shine, .rd-send, .rd-dot, .rd-ptr { animation: none } .rd-shine, .rd-dot { display: none } .rd-bar { animation: none; transform: none }
  .rd-flip, .rd-l1, .rd-btn { animation: none } .rd-l2 { animation: none; opacity: 0 }
${NAMES.map((_, i) => `  .rd-g${i} { animation: none; opacity: 1; transform: translate3d(${(i + 1) * 20}px, ${-(i + 1) * 34}px, 0) }`).join("\n")}
  .rd-tick { animation: none; opacity: 1 }
}
`

const SHADOW = "0 0 0 1px rgba(15,42,71,.09), 0 30px 46px -26px rgba(15,42,71,.45)"

export function RcsDeckScene() {
  const label = "One RCS card dealt to a whole list. A large verified rich card from Urban Cart, with a photo, a title and two buttons, sits in front. When the broadcast goes out, copies slide out behind it like a deck, each addressed to a different customer and marked delivered. Then the front card turns over to show the plain SMS that a phone without RCS receives from the same send, and turns back again"
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div role="img" aria-label={label} className="relative mx-auto h-[321px] w-[343px] sm:h-[524px] sm:w-[560px]">
        <div className="absolute left-0 top-0 h-[524px] w-[560px] origin-top-left scale-[.612] sm:scale-100">
          <i aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 45% 62%, rgba(14,159,110,.15), transparent 62%)" }} />

          {/* stage with perspective: the deck sits on it */}
          <div className="rd-float absolute left-[100px] top-[184px] h-[300px] w-[300px]" style={{ perspective: "1300px" }}>
            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateY(-14deg) rotateX(5deg)" }}>
              {/* the dealt copies, stacked behind the front card */}
              {NAMES.map((n, i) => (
                <div key={n} className={`rd-g${i} absolute inset-0 rounded-2xl bg-white`} style={{ boxShadow: SHADOW, zIndex: 10 - i, transform: "translateZ(0)" }}>
                  <div className="flex items-center justify-between px-4 pt-2.5 text-[12px] font-semibold text-[#0f2a47]">
                    <span className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#e0f4ea] text-[10px] font-bold text-[#0b7a55]">{n[0]}</span>To {n}</span>
                    <span className="rd-tick flex items-center gap-1 text-[11px] text-[#0b7a55]"><CheckCheck className="h-3.5 w-3.5" />Delivered</span>
                  </div>
                  <i className="rd-bar absolute inset-x-4 top-[30px] block h-[2px] rounded bg-[#0e9f6e]/60" />
                </div>
              ))}

              {/* the front card, which turns over */}
              <div className="rd-flip absolute inset-0" style={{ transformStyle: "preserve-3d", zIndex: 20 }}>
                {/* RCS side */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl bg-white" style={{ boxShadow: SHADOW, backfaceVisibility: "hidden" }}>
                  <i aria-hidden className="rd-shine pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3" style={{ background: "linear-gradient(100deg, transparent, rgba(255,255,255,.65), transparent)" }} />
                  <div className="flex items-center gap-2.5 px-4 py-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f2a47] text-[12px] font-bold text-white">U</span>
                    <span className="leading-tight">
                      <span className="flex items-center gap-1 text-[13.5px] font-semibold text-[#0f2a47]">Urban Cart <BadgeCheck className="h-4 w-4 text-[#0e9f6e]" /></span>
                      <span className="block text-[10.5px] text-[#0f2a47]/50">Verified business</span>
                    </span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/home/p-shoe.webp" alt="" width={600} height={300} className="h-[130px] w-full object-cover" />
                  <div className="px-4 pt-3">
                    <p className="text-[15px] font-semibold leading-tight text-[#0f2a47]">Leather derby, back in stock</p>
                    <p className="mt-1 text-[12px] leading-snug text-[#0f2a47]/60">Sizes 6 to 11. Tap to see colours and order.</p>
                    <div className="mt-3 flex gap-2">
                      <span className="rd-btn flex-1 rounded-full border border-[#0e9f6e] py-2 text-center text-[12.5px] font-semibold text-[#0b7a55]">Buy now</span>
                      <span className="flex-1 rounded-full border border-[#cbd5e1] py-2 text-center text-[12.5px] font-semibold text-[#0a7cff]">View offer</span>
                    </div>
                    <MousePointerClick className="rd-ptr absolute bottom-[14px] left-[70px] z-20 h-6 w-6 text-[#0f2a47] drop-shadow" />
                  </div>
                </div>
                {/* SMS side */}
                <div className="absolute inset-0 rounded-2xl bg-[#e9edf2] p-5" style={{ boxShadow: SHADOW, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#0f2a47]/60"><MessageSquare className="h-3.5 w-3.5" />Plain SMS</span>
                  <p className="mt-4 text-[15px] leading-snug text-[#0f2a47]">Urban Cart: Leather derby is back in stock. Shop: bit.ly/x1Kq</p>
                  <p className="mt-4 text-[12px] leading-snug text-[#0f2a47]/55">Your approved DLT template, sent when the phone cannot show RCS.</p>
                </div>
              </div>
            </div>
          </div>

          {/* sender chip and caption that follows the card */}
          <div className="absolute left-[100px] top-[18px] z-30">
            <span className="rd-send inline-flex items-center gap-2 rounded-full bg-[#0f2a47] px-4 py-2 text-[12px] font-semibold text-white shadow-lg"><Send className="h-3.5 w-3.5 text-[#34d399]" />One broadcast from SMSLocal</span>
            {[0, 1, 2].map((k) => <i key={k} aria-hidden className="rd-dot absolute left-12 top-8 h-2 w-2 rounded-full bg-[#0e9f6e]" style={{ ["--dx" as string]: `${60 + k * 40}px`, ["--dy" as string]: `${90 + k * 28}px`, animationDelay: `${k * 0.25}s` }} />)}
          </div>
          <div className="absolute left-[100px] top-[500px] w-[300px] text-center text-[12.5px] font-semibold">
            <span className="rd-l1 absolute inset-x-0 text-[#0b7a55]">Phones with RCS: a verified rich card</span>
            <span className="rd-l2 absolute inset-x-0 text-[#0f2a47]/65">Phones without RCS: your SMS</span>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
