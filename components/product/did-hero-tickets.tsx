import { Check, MapPin, MessageSquare, PhoneCall, PhoneIncoming, Radio } from "lucide-react"

// Number tickets for the centred /numbers/did hero: one light ticket per number type, side by side, with notched
// edges and a dashed tear line. Numbers are masked samples.

const CSS = `
@keyframes dt-float { 0%, 100% { translate: 0 0 } 50% { translate: 0 -8px } }
@keyframes dt-shine { 0% { transform: translateX(-120%) } 55%, 100% { transform: translateX(260%) } }
@keyframes dt-live { 0%, 100% { opacity: .4 } 50% { opacity: 1 } }
.dt-float { animation: dt-float 6s ease-in-out infinite }
.dt-shine { animation: dt-shine 7s ease-in-out infinite }
.dt-live { animation: dt-live 1.6s ease-in-out infinite }
.dt-ticket { background: linear-gradient(180deg, #fff 0%, #f1faf7 100%); box-shadow: 0 34px 50px -26px rgba(8,60,48,.42), 0 10px 18px -8px rgba(8,60,48,.12), inset 0 2px 0 #fff, inset 0 -4px 8px rgba(16,185,129,.07) }
.dt-3d { background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 60%, white) 0%, var(--primary) 52%, color-mix(in oklch, var(--primary) 84%, black) 100%); box-shadow: 0 12px 18px -8px color-mix(in oklch, var(--primary) 75%, transparent), inset 0 2px 2px rgba(255,255,255,.6), inset 0 -3px 5px rgba(0,60,40,.25) }
@media (prefers-reduced-motion: reduce) { .dt-float, .dt-shine, .dt-live { animation: none } }
`

const TICKETS = [
  {
    type: "Local DID",
    icon: MapPin,
    num: "+91 22 ···· ····",
    use: "City-matching numbers for local calls",
    tags: [["Voice", PhoneCall], ["SMS", MessageSquare]] as const,
    lift: "sm:translate-y-6",
    delay: "0s",
  },
  {
    type: "Toll-free",
    icon: PhoneIncoming,
    num: "1800 ··· ····",
    use: "A support line customers call free",
    tags: [["Voice", PhoneCall], ["SMS", MessageSquare]] as const,
    lift: "",
    delay: "-2s",
    featured: true,
  },
  {
    type: "Short code",
    icon: Radio,
    num: "5 ·· ·· ··",
    use: "High-volume messaging",
    tags: [["SMS", MessageSquare], ["Broadcast", Radio]] as const,
    lift: "sm:translate-y-6",
    delay: "-4s",
  },
]

export function DidHeroTickets() {
  return (
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3 sm:gap-7">
      {TICKETS.map((t) => (
        <div key={t.type} className={t.lift}>
          <div className="dt-float" style={{ animationDelay: t.delay }}>
            <div className={`dt-ticket relative overflow-hidden rounded-[28px] p-6 ring-1 ${t.featured ? "ring-primary/40" : "ring-white"}`}>
              <span aria-hidden className="dt-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              <div className="relative flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="dt-3d flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground"><t.icon className="h-5 w-5" /></span>
                  <span className="text-[15px] font-semibold tracking-tight text-[#14233a]">{t.type}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground"><i className="dt-live h-1.5 w-1.5 rounded-full bg-primary" />Active</span>
              </div>

              <p className="relative mt-6 whitespace-nowrap font-mono text-[26px] font-bold leading-none tracking-tight text-[#14233a]">{t.num}</p>

              <div className="relative mt-5 border-t-2 border-dashed border-border pt-4">
                <p className="text-[13px] leading-snug text-muted-foreground">{t.use}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.tags.map(([label, Icon]) => (
                    <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11.5px] font-semibold text-primary"><Icon className="h-3 w-3" />{label}</span>
                  ))}
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-[11.5px] font-semibold text-foreground/80"><Check className="h-3 w-3 text-primary" strokeWidth={3.5} />DLT ready</span>
                </div>
              </div>

              {/* ticket notches */}
              <span aria-hidden className="absolute -left-3.5 top-[142px] h-7 w-7 rounded-full bg-background ring-1 ring-border" />
              <span aria-hidden className="absolute -right-3.5 top-[142px] h-7 w-7 rounded-full bg-background ring-1 ring-border" />
            </div>
          </div>
        </div>
      ))}
      <style>{CSS}</style>
    </div>
  )
}
