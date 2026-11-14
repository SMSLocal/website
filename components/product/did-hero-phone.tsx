import { Check, MapPin, Phone, PhoneForwarded, PhoneIncoming, PhoneOff, Radio, ShieldCheck } from "lucide-react"

// Hero graphic for /numbers/did, light theme: a phone taking a call on a SMSLocal number, with the three number types
// on the left and what the platform handles on the right (DLT and sender-ID registration, lookup with fraud and spam
// protection, porting without downtime). Hand-built HTML, SVG and CSS. Stage is 580 x 460; below sm everything stacks.

const CSS = `
@keyframes dp-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes dp-flow { to { stroke-dashoffset: -20 } }
@keyframes dp-node { 0%, 100% { opacity: .75; transform: scale(.85) } 50% { opacity: 1; transform: scale(1.2) } }
@keyframes dp-ring { 0% { transform: scale(.8); opacity: .55 } 100% { transform: scale(1.9); opacity: 0 } }
@keyframes dp-shake { 0%, 100% { transform: rotate(0) } 15% { transform: rotate(-14deg) } 30% { transform: rotate(12deg) } 45% { transform: rotate(-10deg) } 60% { transform: rotate(8deg) } 75% { transform: rotate(0) } }
@keyframes dp-live { 0%, 100% { opacity: .4 } 50% { opacity: 1 } }
.dp-float { animation: dp-float 6s ease-in-out infinite }
.dp-flow { stroke-dasharray: 2 8; animation: dp-flow 1.4s linear infinite }
.dp-node { transform-box: fill-box; transform-origin: center; animation: dp-node 2.4s ease-in-out infinite }
.dp-ring { animation: dp-ring 1.8s ease-out infinite }
.dp-shake { animation: dp-shake 1.4s ease-in-out infinite }
.dp-live { animation: dp-live 1.6s ease-in-out infinite }
.dp-card { background: linear-gradient(180deg, #fff 0%, #f1faf7 100%); border-radius: 20px; box-shadow: 0 26px 40px -22px rgba(8,60,48,.4), 0 8px 16px -8px rgba(8,60,48,.14), inset 0 2px 0 #fff, inset 0 -4px 8px rgba(16,185,129,.07) }
.dp-3d { background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 60%, white) 0%, var(--primary) 52%, color-mix(in oklch, var(--primary) 84%, black) 100%); box-shadow: 0 10px 16px -8px color-mix(in oklch, var(--primary) 75%, transparent), inset 0 2px 2px rgba(255,255,255,.6), inset 0 -3px 5px rgba(0,60,40,.25) }
@media (prefers-reduced-motion: reduce) { .dp-float, .dp-flow, .dp-node, .dp-ring, .dp-shake, .dp-live { animation: none } }
`

const NAVY = "text-[#14233a]"

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <p className={`flex items-center gap-1.5 text-[10.5px] font-semibold leading-tight ${NAVY}`}>
      <span className="dp-3d flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full text-primary-foreground"><Check className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
      {children}
    </p>
  )
}

function NumberCard({ type, num, note, icon: Icon }: { type: string; num: string; note: string; icon: typeof MapPin }) {
  return (
    <div className="dp-card p-3 ring-1 ring-white">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary"><Icon className="h-3 w-3" />{type}</p>
      <p className={`mt-1.5 whitespace-nowrap font-mono text-[13.5px] font-bold leading-none ${NAVY}`}>{num}</p>
      <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">{note}</p>
    </div>
  )
}

function InfoCard({ icon: Icon, title, lines }: { icon: typeof MapPin; title: string; lines: string[] }) {
  return (
    <div className="dp-card space-y-1.5 p-3 ring-1 ring-white">
      <p className={`flex items-center gap-1.5 text-[12px] font-semibold ${NAVY}`}><Icon className="h-3.5 w-3.5 text-primary" />{title}</p>
      {lines.map((l) => <Tick key={l}>{l}</Tick>)}
    </div>
  )
}

export function DidHeroPhone() {
  const arcs = [
    "M148 86 H185", "M148 196 H185", "M148 306 H185",
    "M395 86 H432", "M395 196 H432", "M395 306 H432",
  ]
  const dots = [[185, 86], [185, 196], [185, 306], [395, 86], [395, 196], [395, 306]]
  return (
    <div className="relative mx-auto flex w-full max-w-[580px] flex-col items-center gap-3 sm:block sm:h-[460px] lg:h-full lg:min-h-[460px]">
      {/* connectors */}
      <svg className="pointer-events-none absolute left-1/2 top-0 hidden h-[460px] w-[580px] -translate-x-1/2 sm:block" viewBox="0 0 580 460" fill="none" aria-hidden>
        {arcs.map((d) => <path key={d} className="dp-flow" d={d} stroke="var(--primary)" strokeOpacity=".6" strokeWidth="1.6" strokeLinecap="round" />)}
        {dots.map(([x, y], i) => <circle key={i} className="dp-node" cx={x} cy={y} r="3.6" fill="#fff" stroke="var(--primary)" strokeWidth="1.8" style={{ animationDelay: `${i * 0.3}s` }} />)}
      </svg>

      {/* left: the three number types */}
      <div className="grid w-full max-w-[300px] gap-3 sm:contents">
        <div className="dp-float sm:absolute sm:left-[4px] sm:top-[40px] sm:w-[144px]"><NumberCard type="Local DID" icon={MapPin} num="+91 22 ···· ····" note="City-matching, for local calls" /></div>
        <div className="dp-float sm:absolute sm:left-[4px] sm:top-[150px] sm:w-[144px]" style={{ animationDelay: "-2s" }}><NumberCard type="Toll-free" icon={PhoneIncoming} num="1800 ··· ····" note="A support line, free to call" /></div>
        <div className="dp-float sm:absolute sm:left-[4px] sm:top-[260px] sm:w-[144px]" style={{ animationDelay: "-4s" }}><NumberCard type="Short code" icon={Radio} num="5 ·· ·· ··" note="High-volume messaging" /></div>
      </div>

      {/* the phone */}
      <div className="dp-float relative order-first h-[430px] w-[210px] shrink-0 sm:absolute sm:left-[185px] sm:top-[15px]" style={{ animationDelay: "-1s" }}>
        <div className="absolute inset-0 rounded-[38px] bg-gradient-to-b from-white to-[#e3efeb] shadow-[0_44px_70px_-30px_rgba(8,60,48,.55),0_14px_24px_-10px_rgba(8,60,48,.18),inset_0_2px_0_#fff]" />
        <div className="absolute inset-[7px] overflow-hidden rounded-[32px] bg-gradient-to-b from-[#f4fbf8] to-[#e4f3ee] ring-1 ring-black/5">
          <div className="absolute left-1/2 top-2.5 h-4 w-16 -translate-x-1/2 rounded-full bg-[#14233a]" />
          <p className={`absolute left-5 top-2.5 text-[10px] font-bold ${NAVY}`}>9:41</p>
          <div className="flex h-full flex-col items-center px-4 pb-5 pt-12 text-center">
            <p className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-primary"><ShieldCheck className="h-3 w-3" />Verified number</p>
            <div className="relative mt-5">
              <i className="dp-ring absolute inset-0 rounded-full bg-primary/30" />
              <span className="dp-3d relative flex h-[72px] w-[72px] items-center justify-center rounded-full text-[28px] font-bold text-primary-foreground">M</span>
            </div>
            <p className={`mt-4 text-[17px] font-semibold tracking-tight ${NAVY}`}>Mehta Stores</p>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">Incoming call</p>
            <p className={`mt-3 whitespace-nowrap rounded-xl bg-white px-3 py-1.5 font-mono text-[12.5px] font-bold shadow-sm ring-1 ring-border ${NAVY}`}>+91 22 ···· ····</p>
            <p className="mt-2 flex items-center gap-1.5 text-[10.5px] font-medium text-muted-foreground"><i className="dp-live h-1.5 w-1.5 rounded-full bg-primary" />via your SMSLocal number</p>
            <div className="mt-auto flex w-full items-center justify-between px-3">
              <span className="flex flex-col items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fdecec] text-[#c93a3f] shadow-[0_10px_16px_-8px_rgba(201,58,63,.5)]"><PhoneOff className="h-5 w-5" /></span>Decline
              </span>
              <span className="flex flex-col items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
                <span className="dp-3d flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground"><Phone className="dp-shake h-5 w-5" /></span>Answer
              </span>
            </div>
            <i className="mt-4 block h-1 w-16 rounded-full bg-[#14233a]/50" />
          </div>
        </div>
      </div>

      {/* right: what the platform handles */}
      <div className="grid w-full max-w-[300px] gap-3 sm:contents">
        <div className="dp-float sm:absolute sm:left-[432px] sm:top-[40px] sm:w-[144px]" style={{ animationDelay: "-3s" }}><InfoCard icon={PhoneForwarded} title="Registered" lines={["DLT registration", "Sender ID approved"]} /></div>
        <div className="dp-float sm:absolute sm:left-[432px] sm:top-[150px] sm:w-[144px]" style={{ animationDelay: "-1s" }}><InfoCard icon={ShieldCheck} title="Protected" lines={["Number lookup", "Fraud and spam"]} /></div>
        <div className="dp-float sm:absolute sm:left-[432px] sm:top-[260px] sm:w-[144px]" style={{ animationDelay: "-5s" }}><InfoCard icon={Phone} title="Port your number" lines={["No downtime", "Keep your calls"]} /></div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
