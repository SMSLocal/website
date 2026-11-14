"use client"

import { useEffect, useState } from "react"
import { Check, Facebook, Instagram, KeyRound, Layers, Loader2, Mail, MessageCircle, MessageSquareText, MessagesSquare, Phone, Send, Sparkles, Webhook, Code2 } from "lucide-react"

// Hero graphic for /products/integrations, light theme. A glossy SMSLocal hub with six app tiles around it. The apps
// connect one after another: the current tile glows, its beam to the hub lights up and a status card says "Connecting"
// then "Connected", with a tick staying on every tile that is done. Underneath, the ten native channels. With reduced
// motion everything rests on the finished state. Stage is 580 x 460; below sm everything stacks.

const CSS = `
@keyframes ih-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes ih-flow { to { stroke-dashoffset: -20 } }
@keyframes ih-ring { 0% { transform: scale(.85); opacity: .5 } 100% { transform: scale(1.7); opacity: 0 } }
@keyframes ih-pop { 0% { transform: scale(0) } 70% { transform: scale(1.25) } 100% { transform: scale(1) } }
@keyframes ih-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
.ih-float { animation: ih-float 6s ease-in-out infinite }
.ih-flow { stroke-dasharray: 3 8; animation: ih-flow 1.2s linear infinite }
.ih-ring { animation: ih-ring 1.6s ease-out infinite }
.ih-pop { animation: ih-pop .45s cubic-bezier(.3,1.5,.5,1) both }
.ih-in { animation: ih-in .45s cubic-bezier(.2,.7,.2,1) both }
.ih-card { background: linear-gradient(180deg, #fff 0%, #f1faf7 100%); border-radius: 22px; box-shadow: 0 26px 40px -22px rgba(8,60,48,.4), 0 8px 16px -8px rgba(8,60,48,.14), inset 0 2px 0 #fff, inset 0 -4px 8px rgba(16,185,129,.07) }
.ih-3d { background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 60%, white) 0%, var(--primary) 52%, color-mix(in oklch, var(--primary) 84%, black) 100%); box-shadow: 0 12px 18px -8px color-mix(in oklch, var(--primary) 75%, transparent), inset 0 2px 2px rgba(255,255,255,.6), inset 0 -3px 5px rgba(0,60,40,.25) }
@media (prefers-reduced-motion: reduce) { .ih-float, .ih-flow, .ih-ring, .ih-pop, .ih-in { animation: none } }
`

const NAVY = "text-[#14233a]"

// tile centres on the 580 x 460 stage
const APPS = [
  { name: "Shopify", cat: "E-commerce", x: 66, y: 112, pos: "sm:left-[24px] sm:top-[72px]" },
  { name: "HubSpot", cat: "CRM", x: 46, y: 232, pos: "sm:left-[4px] sm:top-[192px]" },
  { name: "Salesforce", cat: "CRM", x: 66, y: 352, pos: "sm:left-[24px] sm:top-[298px]" },
  { name: "Slack", cat: "Communication", x: 514, y: 112, pos: "sm:left-[472px] sm:top-[72px]" },
  { name: "Zapier", cat: "Automation", x: 534, y: 232, pos: "sm:left-[492px] sm:top-[192px]" },
  { name: "Zendesk", cat: "Helpdesk", x: 514, y: 352, pos: "sm:left-[472px] sm:top-[298px]" },
]
const HUB = { x: 290, y: 232 }

const CHANNELS = [MessageSquareText, MessageCircle, Mail, KeyRound, Sparkles, Phone, MessagesSquare, Send, Instagram, Facebook]

export function IntegrationsHeroHub() {
  const [step, setStep] = useState(0) // 0..6: apps connect one by one, 6 = all done, then it restarts

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStep(6)
      return
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % 8), 2200)
    return () => window.clearInterval(id)
  }, [])

  const current = step < 6 ? step : -1
  const connected = Math.min(step, 6)
  const status = current >= 0 ? `Connecting ${APPS[current].name}` : "All apps connected"

  return (
    <div className="relative mx-auto flex w-full max-w-[580px] flex-col gap-3 sm:block sm:h-[460px] lg:h-full lg:min-h-[460px]">
      {/* beams from every tile to the hub */}
      <svg className="pointer-events-none absolute left-1/2 top-0 hidden h-[460px] w-[580px] -translate-x-1/2 sm:block" viewBox="0 0 580 460" fill="none" aria-hidden>
        {APPS.map((a, i) => {
          const on = i === current
          const done = i < connected && !on
          return (
            <path key={a.name} className={on ? "ih-flow" : ""} d={`M${a.x} ${a.y} C ${(a.x + HUB.x) / 2} ${a.y}, ${(a.x + HUB.x) / 2} ${HUB.y}, ${HUB.x} ${HUB.y}`} stroke="var(--primary)" strokeOpacity={on ? 0.95 : done ? 0.45 : 0.18} strokeWidth={on ? 2.4 : 1.6} strokeLinecap="round" strokeDasharray={on ? undefined : "2 7"} style={{ transition: "stroke-opacity .4s, stroke-width .4s" }} />
          )
        })}
      </svg>

      {/* status card, top centre */}
      <div className="ih-float hidden sm:absolute sm:left-[170px] sm:top-[6px] sm:block sm:w-[240px]">
        <div key={status} className="ih-card ih-in flex items-center gap-3 px-4 py-3 ring-1 ring-white">
          <span className="ih-3d flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground">
            {current >= 0 ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" strokeWidth={3.5} />}
          </span>
          <span className="min-w-0 leading-tight">
            <span className={`block text-[13px] font-semibold ${NAVY}`}>{status}</span>
            <span className="block text-[10.5px] text-muted-foreground">1-click OAuth, no code</span>
          </span>
          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{connected}/6</span>
        </div>
      </div>

      {/* hub */}
      <div className="ih-float relative order-first mx-auto h-[150px] w-[150px] shrink-0 sm:absolute sm:left-[215px] sm:top-[157px]" style={{ animationDelay: "-1s" }}>
        {current >= 0 && <i key={`ring-${current}`} className="ih-ring absolute inset-3 rounded-[40px] bg-primary/30" />}
        <div className="ih-3d absolute inset-3 flex flex-col items-center justify-center rounded-[40px] text-primary-foreground ring-1 ring-white/30">
          <Layers className="h-11 w-11" />
        </div>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3.5 py-1 text-[12px] font-bold shadow-[0_12px_20px_-10px_rgba(8,60,48,.5)] ring-1 ring-border"><span className={NAVY}>SMSLocal</span></span>
      </div>
      <div className="hidden gap-2 sm:absolute sm:left-[214px] sm:top-[326px] sm:flex">
        {[[Code2, "REST API"], [Webhook, "Webhooks"]].map(([I, l]) => {
          const Icon = I as typeof Code2
          return <span key={l as string} className="ih-card flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-semibold ring-1 ring-white"><Icon className="h-3 w-3 text-primary" /><span className={NAVY}>{l as string}</span></span>
        })}
      </div>

      {/* app tiles */}
      <div className="grid w-full grid-cols-3 gap-3 sm:contents">
        {APPS.map((a, i) => {
          const on = i === current
          const done = i < connected && !on
          return (
            <div key={a.name} className={`ih-float sm:absolute ${a.pos}`} style={{ animationDelay: `${-i * 1.1}s` }}>
              <div
                className={`ih-card relative flex flex-col items-center px-2 py-2.5 ring-1 transition-all duration-500 sm:w-[84px] ${on ? "scale-[1.08] ring-primary/70 shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_14%,transparent)]" : "ring-white"}`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-[17px] font-extrabold ${done || on ? "ih-3d text-primary-foreground" : "bg-muted text-primary"}`}>{a.name[0]}</span>
                <span className={`mt-1.5 text-[11px] font-semibold leading-none ${NAVY}`}>{a.name}</span>
                <span className="mt-1 text-[9px] font-medium text-muted-foreground">{a.cat}</span>
                {done && <span className="ih-pop absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-white"><Check className="h-3 w-3" strokeWidth={3.5} /></span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* native channels */}
      <div className="ih-float sm:absolute sm:left-[48px] sm:top-[412px] sm:w-[484px]" style={{ animationDelay: "-3s" }}>
        <div className="ih-card flex items-center gap-3 px-4 py-2.5 ring-1 ring-white">
          <span className="shrink-0 text-[11px] font-bold leading-tight">
            <span className={NAVY}>10 native</span><br /><span className="text-muted-foreground">channels</span>
          </span>
          <span className="flex flex-1 items-center justify-between">
            {CHANNELS.map((C, i) => (
              <span key={i} className="ih-3d flex h-[30px] w-[30px] items-center justify-center rounded-full text-primary-foreground"><C className="h-3.5 w-3.5" /></span>
            ))}
          </span>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
