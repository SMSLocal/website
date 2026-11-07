import { Mail, MessageCircle, MessageSquare, Phone, Instagram, Send, Check } from "lucide-react"

// Hero graphic for /products/omnichannel-inbox: "from seven apps to one inbox". Seven conversations from
// seven channels float around loosely, then slide into one tidy list where each gets an owner and a
// timer. Open scene, no frame, 12-second loop, silent, plain HTML + CSS.

const ITEMS = [
  { n: "Isha M.", p: "Where is my order?", ch: "WhatsApp", c: "#25a85a", I: MessageCircle, logo: "/logos/channels/whatsapp.svg", t: "2m", a: "AK", x0: 10, y0: 52, r0: -6 },
  { n: "Rahul S.", p: "Invoice for last month", ch: "Email", c: "#3b6df0", I: Mail, logo: "/logos/channels/gmail.svg", t: "5m", a: "SN", x0: 292, y0: 34, r0: 5 },
  { n: "Amit K.", p: "Need help with KYC", ch: "SMS", c: "#F5A300", I: MessageSquare, logo: null, t: "9m", a: "RM", x0: 176, y0: 132, r0: -3 },
  { n: "Sneha T.", p: "Missed call, callback", ch: "Voice", c: "#34A853", I: Phone, logo: null, t: "12m", a: "PD", x0: 6, y0: 214, r0: 4 },
  { n: "Ravi D.", p: "Loved the product!", ch: "Instagram", c: "#d6246e", I: Instagram, logo: "/logos/channels/instagram.svg", t: "18m", a: "AK", x0: 296, y0: 188, r0: -5 },
  { n: "Neha P.", p: "Is this in stock?", ch: "Messenger", c: "#0a84ff", I: MessageCircle, logo: "/logos/channels/messenger.svg", t: "24m", a: "VS", x0: 110, y0: 296, r0: 3 },
  { n: "Karan V.", p: "Confirm my booking", ch: "RCS", c: "#0f9f8a", I: Send, logo: "/logos/channels/google-messages.svg", t: "31m", a: "SN", x0: 292, y0: 334, r0: -4 },
]
const MOBILE = [[4, 36], [84, 92], [10, 148], [80, 204], [4, 260], [84, 316], [14, 372]]
const ROW = 48
const TOP = 80

const CSS = `
@keyframes om-move {
  0%, 30% { translate: var(--x0) var(--y0); rotate: var(--r0); scale: .94 }
  46%, 84% { translate: var(--x1) var(--y1); rotate: 0deg; scale: 1 }
  98%, 100% { translate: var(--x0) var(--y0); rotate: var(--r0); scale: .94 }
}
@keyframes om-move-m {
  0%, 30% { translate: var(--x0m) var(--y0m); rotate: var(--r0); scale: .94 }
  46%, 84% { translate: var(--x1m) var(--y1); rotate: 0deg; scale: 1 }
  98%, 100% { translate: var(--x0m) var(--y0m); rotate: var(--r0); scale: .94 }
}
@keyframes om-bob { 0%, 100% { transform: translateY(-4px) } 50% { transform: translateY(5px) } }
@keyframes om-ha { 0%, 3% { opacity: 0 } 6%, 30% { opacity: 1 } 36%, 90% { opacity: 0 } 97%, 100% { opacity: 1 } }
@keyframes om-hb { 0%, 44% { opacity: 0 } 52%, 84% { opacity: 1 } 90%, 100% { opacity: 0 } }
@keyframes om-ex { 0%, 52% { opacity: 0; transform: translateX(-8px) } 58%, 84% { opacity: 1; transform: none } 90%, 100% { opacity: 0 } }
@keyframes om-cap-a { 0%, 3% { opacity: 0 } 6%, 30% { opacity: 1 } 36%, 90% { opacity: 0 } 97%, 100% { opacity: 1 } }
@keyframes om-cap-b { 0%, 46% { opacity: 0 } 54%, 84% { opacity: 1 } 90%, 100% { opacity: 0 } }
@keyframes om-live { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
@keyframes om-blob { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(16px, -12px) } }
.om-it { position: absolute; left: 0; top: 0; width: 250px; animation: om-move 12s cubic-bezier(.5,.05,.25,1) infinite; will-change: transform }
.om-bob { animation: om-bob 4.4s ease-in-out infinite }
.om-ha { opacity: 0; animation: om-ha 12s linear infinite }
.om-hb { opacity: 0; animation: om-hb 12s linear infinite }
.om-ex { opacity: 0; animation: om-ex 12s ease-out infinite }
.om-cap-a { opacity: 0; animation: om-cap-a 12s linear infinite }
.om-cap-b { opacity: 0; animation: om-cap-b 12s linear infinite }
.om-live { animation: om-live 1.4s ease-in-out infinite }
.om-blob { animation: om-blob 9s ease-in-out infinite }
.om-wrap { position: relative; width: 540px; height: 476px }
.om-scale { width: 540px; height: 476px; transform-origin: top left }
@media (max-width: 639px) {
  .om-wrap { width: 100%; max-width: 340px; height: 476px }
  .om-scale { width: 100%; height: 476px }
  .om-it { animation-name: om-move-m; width: 250px }
  .om-ex { display: none }
  .om-hb { width: 100% !important }
  .om-scale > div[aria-hidden] { width: 100% !important }
}

@media (prefers-reduced-motion: reduce) {
  .om-it, .om-bob, .om-ha, .om-ex, .om-cap-a, .om-live, .om-blob { animation: none }
  .om-it { translate: var(--x1) var(--y1) }
  .om-hb, .om-ex, .om-cap-b { animation: none; opacity: 1 }
  .om-ha, .om-cap-a { opacity: 0 }
}
`

export function OmniHero() {
  return (
    <div className="mx-auto max-w-full">
      <div className="om-wrap mx-auto">
        <div className="om-scale relative">
          <div aria-hidden className="pointer-events-none absolute left-0 top-0 -z-10 h-[476px] w-[540px]">
            <span className="om-blob absolute left-[-30px] top-[230px] h-[200px] w-[200px] rounded-full bg-primary/20 blur-[60px]" />
            <span className="om-blob absolute right-[-20px] top-[10px] h-[200px] w-[200px] rounded-full bg-[oklch(0.74_0.14_250)]/20 blur-[60px]" style={{ animationDelay: "-4s" }} />
            <span className="om-blob absolute bottom-[-20px] right-[60px] h-[160px] w-[160px] rounded-full bg-[oklch(0.85_0.14_80)]/25 blur-[60px]" style={{ animationDelay: "-7s" }} />
          </div>

          {/* headings for each moment */}
          <p className="om-ha absolute left-0 top-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">7 apps · 7 tabs · 7 notification sounds</p>
          <p className="om-hb absolute left-0 top-0 flex w-[500px] items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="flex items-center gap-2"><span className="om-live h-1.5 w-1.5 rounded-full bg-primary" />Shared inbox · 7 open</span>
            <span className="text-primary">Routed · assigned · timed</span>
          </p>

          {ITEMS.map((it, i) => {
            const y1 = TOP + i * ROW
            return (
              <div key={it.n}>
                <div className="om-it" style={{ ["--x0m" as string]: `${MOBILE[i][0]}px`, ["--y0m" as string]: `${MOBILE[i][1]}px`, ["--x1m" as string]: "4px", ["--x0" as string]: `${it.x0}px`, ["--y0" as string]: `${it.y0}px`, ["--r0" as string]: `${it.r0}deg`, ["--x1" as string]: "16px", ["--y1" as string]: `${y1}px`, animationDelay: `${i * 0.1}s` }}>
                  <div className="om-bob flex items-center gap-3" style={{ animationDelay: `${-i * 0.7}s` }}>
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-border bg-background shadow-[0_8px_16px_-10px_rgba(0,0,0,.35)]">
                      {it.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.logo} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
                      ) : (
                        <it.I className="h-[22px] w-[22px]" style={{ color: it.c }} strokeWidth={1.9} />
                      )}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="flex items-baseline gap-1.5"><span className="text-[13.5px] font-semibold">{it.n}</span><span className="text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: it.c }}>{it.ch}</span></span>
                      <span className="block truncate text-[12.5px] text-muted-foreground">{it.p}</span>
                    </span>
                  </div>
                </div>
                {/* owner and age, once everything is in one place */}
                <div className="om-ex absolute flex w-[220px] items-center justify-end gap-3 text-[12.5px] font-medium text-foreground/70" style={{ left: 284, top: y1 + 4, animationDelay: `${i * 0.15}s` }}>
                  <span className="font-mono">{it.t}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-[10.5px] font-semibold text-primary">{it.a}</span>
                  <Check className="h-4 w-4 text-primary" strokeWidth={3} />
                </div>
              </div>
            )
          })}

          {/* plain-words captions */}
          <p className="om-cap-a absolute bottom-0 left-0 w-full text-center text-[14px] text-foreground">Seven apps, seven places to miss a customer.</p>
          <p className="om-cap-b absolute bottom-0 left-0 w-full text-center text-[14px] text-foreground">One shared inbox. Every conversation routed, owned and timed.</p>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
