import { Check, MapPin, MessageSquare, PhoneCall, Phone, PhoneForwarded, ShieldCheck } from "lucide-react"

// Hero graphic for /numbers/did. One number card in the middle that cycles through the three number types (local,
// toll-free, short code), with the things the page promises around it: voice, SMS, DLT and sender-ID registration,
// number lookup with fraud and spam protection, and porting without downtime. Hand-built HTML, SVG and CSS.
// Stage is 580 x 460; below sm everything stacks.

const CSS = `
@keyframes dn-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes dn-flow { to { stroke-dashoffset: -20 } }
@keyframes dn-node { 0%, 100% { opacity: .75; transform: scale(.85) } 50% { opacity: 1; transform: scale(1.2) } }
@keyframes dn-deck {
  0%, 30% { transform: translateY(0) scale(1); opacity: 1; z-index: 3 }
  36%, 63% { transform: translateY(-28px) scale(.88); opacity: .7; z-index: 1 }
  69%, 96% { transform: translateY(-14px) scale(.94); opacity: .9; z-index: 2 }
  100% { transform: translateY(0) scale(1); opacity: 1; z-index: 3 }
}
@keyframes dn-fill { 0% { width: 6% } 70%, 100% { width: 100% } }
@keyframes dn-live { 0%, 100% { opacity: .4 } 50% { opacity: 1 } }
.dn-float { animation: dn-float 6s ease-in-out infinite }
.dn-flow { stroke-dasharray: 2 8; animation: dn-flow 1.4s linear infinite }
.dn-node { transform-box: fill-box; transform-origin: center; animation: dn-node 2.4s ease-in-out infinite }
.dn-deck { animation: dn-deck 12s ease-in-out infinite; transform-origin: 50% 100% }
.dn-fill { animation: dn-fill 6s ease-in-out infinite }
.dn-live { animation: dn-live 1.6s ease-in-out infinite }
.dn-card { background: linear-gradient(180deg, #fff 0%, #f1faf7 100%); border-radius: 24px; box-shadow: 0 30px 46px -22px rgba(8,60,48,.4), 0 10px 18px -8px rgba(8,60,48,.14), inset 0 2px 0 #fff, inset 0 -4px 8px rgba(16,185,129,.07) }
.dn-3d { background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 60%, white) 0%, var(--primary) 52%, color-mix(in oklch, var(--primary) 84%, black) 100%); box-shadow: 0 12px 18px -8px color-mix(in oklch, var(--primary) 75%, transparent), inset 0 2px 2px rgba(255,255,255,.6), inset 0 -3px 5px rgba(0,60,40,.25) }
@media (prefers-reduced-motion: reduce) { .dn-float, .dn-flow, .dn-node, .dn-deck, .dn-fill, .dn-live { animation: none } }
`

const NAVY = "text-[#14233a]"

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="dn-3d flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground">{children}</span>
}

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <p className={`flex items-center gap-1.5 text-[12px] font-semibold ${NAVY}`}>
      <span className="dn-3d flex h-4.5 w-4.5 h-[18px] w-[18px] items-center justify-center rounded-full text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
      {children}
    </p>
  )
}

export function DidHeroScene() {
  const arcs = [
    "M96 100 C100 120 130 142 156 150",
    "M484 100 C480 120 450 142 424 150",
    "M110 300 C118 288 150 280 186 272",
    "M470 300 C462 288 430 280 394 272",
    "M290 272 V386",
  ]
  const dots = [[156, 150], [424, 150], [186, 272], [394, 272], [290, 330]]
  const deck = [
    { type: "Local DID", num: "+91 22 ···· ····", note: "City-matching, for local calls", delay: 0 },
    { type: "Toll-free", num: "1800 ··· ····", note: "A support line customers call free", delay: -8 },
    { type: "Short code", num: "5 ·· ·· ··", note: "High-volume messaging", delay: -4 },
  ]
  return (
    <div className="relative mx-auto flex w-full max-w-[580px] flex-col gap-3 sm:block sm:h-[460px] lg:h-full lg:min-h-[460px]">
      {/* connectors */}
      <svg className="pointer-events-none absolute left-1/2 top-0 hidden h-[460px] w-[580px] -translate-x-1/2 sm:block" viewBox="0 0 580 460" fill="none" aria-hidden>
        {arcs.map((d) => <path key={d} className="dn-flow" d={d} stroke="var(--primary)" strokeOpacity=".6" strokeWidth="1.6" strokeLinecap="round" />)}
        {dots.map(([x, y], i) => <circle key={i} className="dn-node" cx={x} cy={y} r="4" fill="#fff" stroke="var(--primary)" strokeWidth="1.8" style={{ animationDelay: `${i * 0.35}s` }} />)}
      </svg>

      {/* top left: voice */}
      <div className="dn-float sm:absolute sm:left-[10px] sm:top-[28px] sm:w-[176px]">
        <div className="dn-card flex items-center gap-3 p-3.5 ring-1 ring-white">
          <Badge><PhoneCall className="h-4 w-4" /></Badge>
          <span className="leading-tight"><span className={`block text-[14px] font-semibold ${NAVY}`}>Voice</span><span className="block text-[10.5px] text-muted-foreground">IVR, AI agent, broadcast</span></span>
        </div>
      </div>

      {/* top right: SMS */}
      <div className="dn-float sm:absolute sm:left-[394px] sm:top-[28px] sm:w-[176px]" style={{ animationDelay: "-2s" }}>
        <div className="dn-card flex items-center gap-3 p-3.5 ring-1 ring-white">
          <Badge><MessageSquare className="h-4 w-4" /></Badge>
          <span className="leading-tight"><span className={`block text-[14px] font-semibold ${NAVY}`}>SMS</span><span className="block text-[10.5px] text-muted-foreground">Two-way and broadcast</span></span>
        </div>
      </div>

      {/* the number deck: three light cards, the front one rotates through local, toll-free and short code */}
      <div className="relative mx-auto h-[176px] w-full max-w-[300px] sm:absolute sm:left-[150px] sm:top-[92px] sm:mx-0 sm:w-[280px]">
        <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_70%)]" />
        {deck.map((c) => (
          <div key={c.type} className="dn-deck absolute inset-x-0 top-[34px]" style={{ animationDelay: `${c.delay}s` }}>
            <div className="dn-card p-4 ring-1 ring-white">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{c.type}</span>
                <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-muted-foreground"><i className="dn-live h-1.5 w-1.5 rounded-full bg-primary" />Active</span>
              </div>
              <p className={`mt-3.5 whitespace-nowrap font-mono text-[23px] font-bold leading-none tracking-tight ${NAVY}`}>{c.num}</p>
              <div className="mt-3.5 flex items-center justify-between border-t border-border/70 pt-3">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-primary" />{c.note}</span>
              </div>
              <div className="mt-2.5 flex gap-1.5">
                {["Voice", "SMS"].map((t) => (
                  <span key={t} className="dn-3d rounded-full px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* bottom left: registration */}
      <div className="dn-float sm:absolute sm:left-[6px] sm:top-[306px] sm:w-[176px]" style={{ animationDelay: "-3s" }}>
        <div className="dn-card space-y-2 p-3.5 ring-1 ring-white">
          <p className={`flex items-center gap-2 text-[13px] font-semibold ${NAVY}`}><PhoneForwarded className="h-4 w-4 text-primary" />Registered</p>
          <Tick>DLT registration</Tick>
          <Tick>Sender ID approved</Tick>
        </div>
      </div>

      {/* bottom right: protection */}
      <div className="dn-float sm:absolute sm:left-[398px] sm:top-[306px] sm:w-[176px]" style={{ animationDelay: "-4s" }}>
        <div className="dn-card space-y-2 p-3.5 ring-1 ring-white">
          <p className={`flex items-center gap-2 text-[13px] font-semibold ${NAVY}`}><ShieldCheck className="h-4 w-4 text-primary" />Protected</p>
          <Tick>Number lookup</Tick>
          <Tick>Fraud and spam</Tick>
        </div>
      </div>

      {/* bottom: porting */}
      <div className="sm:absolute sm:left-[120px] sm:top-[398px] sm:w-[340px]">
        <div className="dn-card flex items-center gap-3 px-4 py-3.5 ring-1 ring-white">
          <Badge><Phone className="h-4 w-4" /></Badge>
          <span className="min-w-0 flex-1">
            <span className={`flex items-center justify-between text-[12.5px] font-semibold ${NAVY}`}>Port your number<span className="text-[10.5px] font-medium text-primary">No downtime</span></span>
            <span className="mt-2 block h-2 overflow-hidden rounded-full bg-primary/15"><i className="dn-fill block h-full rounded-full bg-gradient-to-r from-primary/70 to-primary" /></span>
          </span>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
