import { Check, LogOut, MessageCircle, MousePointer2, MousePointerClick, Send, Sparkles, Timer, UserRound } from "lucide-react"

// Hero graphic for /channels/web-chat: "Turn website visitors into conversations, not bounces", in one card.
// One pricing page that plays in two parts on a 16-second loop.
//   Before: a visitor browses for 38 seconds, moves to the corner and leaves. The page goes grey. 0 conversations.
//   After: the proactive trigger fires, the chat widget opens, the AI answers, and a lead is captured.
// Two tabs above the card show which part is playing. Plain HTML + CSS, silent.

const seg = (name: string, a: number, b: number, y = 8) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(${y}px) } ${a + 2.5}%, ${b}% { opacity: 1; transform: none } ${b + 2.5}%, 100% { opacity: 0; transform: none } }`

const CSS = `
${seg("wc-timer", 5, 43, 6)}
${seg("wc-left", 38, 44, 8)}
${seg("wc-res-l", 40, 45, 8)}
${seg("wc-trig", 49, 61, 6)}
${seg("wc-lead", 88, 96, 8)}
${seg("wc-res-r", 90, 96, 8)}
${seg("wc-m0", 66, 96, 6)}
${seg("wc-m1", 73, 96, 6)}
${seg("wc-m2", 78, 96, 6)}
@keyframes wc-cur { 0% { left: 58%; top: 64%; opacity: 0 } 5% { left: 58%; top: 64%; opacity: 1 } 10% { left: 50%; top: 74%; opacity: 1 } 18% { left: 68%; top: 58%; opacity: 1 } 26% { left: 36%; top: 36%; opacity: 1 } 33% { left: 6%; top: 9%; opacity: 1; transform: scale(1) } 36% { left: 6%; top: 9%; opacity: 1; transform: scale(.8) } 38%, 100% { left: 6%; top: 9%; opacity: 0; transform: scale(1) } }
@keyframes wc-dim { 0%, 35% { filter: grayscale(0); opacity: 1 } 39%, 44% { filter: grayscale(1); opacity: .5 } 48%, 100% { filter: grayscale(0); opacity: 1 } }
@keyframes wc-tb { 0%, 44% { background-color: #fdecec; color: #c93a3f; box-shadow: 0 0 0 1px #f5c4c6 } 46%, 100% { background-color: #f1f4f6; color: #8a97a3; box-shadow: 0 0 0 1px transparent } }
@keyframes wc-ta { 0%, 44% { background-color: #f1f4f6; color: #8a97a3; box-shadow: 0 0 0 1px transparent } 46%, 97% { background-color: color-mix(in oklch, var(--primary) 12%, white); color: var(--primary); box-shadow: 0 0 0 1px color-mix(in oklch, var(--primary) 40%, transparent) } 99%, 100% { background-color: #f1f4f6; color: #8a97a3; box-shadow: 0 0 0 1px transparent } }
@keyframes wc-pro { 0%, 52% { opacity: 0; transform: translateY(6px) scale(.95) } 55%, 60% { opacity: 1; transform: none } 63%, 100% { opacity: 0; transform: translateY(-3px) } }
@keyframes wc-launch { 0%, 47% { opacity: 0; transform: scale(.5) } 51%, 61% { opacity: 1; transform: none } 64%, 100% { opacity: 0; transform: scale(.5) } }
@keyframes wc-open { 0%, 62% { opacity: 0; transform: scale(.55) translateY(12px) } 67%, 96% { opacity: 1; transform: none } 99%, 100% { opacity: 0; transform: scale(.55) translateY(12px) } }
@keyframes wc-ty { 0%, 78% { opacity: 0 } 79.5%, 83% { opacity: 1 } 84.5%, 100% { opacity: 0 } }
@keyframes wc-ans { 0%, 83.5% { opacity: 0 } 85%, 96% { opacity: 1 } 99%, 100% { opacity: 0 } }
@keyframes wc-dot { 0%, 100% { opacity: .4 } 50% { opacity: 1 } }
@keyframes wc-type { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-2px); opacity: 1 } }
.wc-timer, .wc-left, .wc-res-l, .wc-trig, .wc-lead, .wc-res-r, .wc-m0, .wc-m1, .wc-m2 { opacity: 0 }
.wc-timer { animation: wc-timer 16s cubic-bezier(.2,.7,.2,1) infinite } .wc-left { animation: wc-left 16s cubic-bezier(.2,.7,.2,1) infinite }
.wc-res-l { animation: wc-res-l 16s cubic-bezier(.2,.7,.2,1) infinite } .wc-trig { animation: wc-trig 16s cubic-bezier(.2,.7,.2,1) infinite }
.wc-lead { animation: wc-lead 16s cubic-bezier(.2,.7,.2,1) infinite } .wc-res-r { animation: wc-res-r 16s cubic-bezier(.2,.7,.2,1) infinite }
.wc-m0 { animation: wc-m0 16s cubic-bezier(.2,.7,.2,1) infinite } .wc-m1 { animation: wc-m1 16s cubic-bezier(.2,.7,.2,1) infinite } .wc-m2 { animation: wc-m2 16s cubic-bezier(.2,.7,.2,1) infinite }
.wc-cur { position: absolute; opacity: 0; animation: wc-cur 16s ease-in-out infinite }
.wc-dim { animation: wc-dim 16s ease-in-out infinite }
.wc-tb { animation: wc-tb 16s ease-in-out infinite } .wc-ta { animation: wc-ta 16s ease-in-out infinite }
.wc-pro { opacity: 0; transform-origin: 100% 100%; animation: wc-pro 16s cubic-bezier(.2,.7,.2,1) infinite }
.wc-launch { opacity: 0; animation: wc-launch 16s cubic-bezier(.3,1.2,.4,1) infinite }
.wc-open { opacity: 0; transform-origin: 100% 100%; animation: wc-open 16s cubic-bezier(.3,1.2,.4,1) infinite }
.wc-ty { opacity: 0; animation: wc-ty 16s ease-in-out infinite }
.wc-ans { opacity: 0; animation: wc-ans 16s ease-in-out infinite }
.wc-live { animation: wc-dot 1.6s ease-in-out infinite }
.wc-td { animation: wc-type 1s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .wc-trig, .wc-lead, .wc-res-r, .wc-m0, .wc-m1, .wc-m2, .wc-open, .wc-ans { animation: none; opacity: 1; transform: none }
  .wc-timer, .wc-left, .wc-res-l, .wc-cur, .wc-pro, .wc-launch, .wc-ty, .wc-tb { animation: none; opacity: 0 } .wc-ta { animation: none } .wc-dim, .wc-live, .wc-td { animation: none }
}
`

const NAVY = "#14233a"
const PLANS = [
  { n: "Starter", p: "₹999", f: ["1 online store", "500 orders a month", "Email support"] },
  { n: "Growth", p: "₹2,499", f: ["Unlimited orders", "AI chat widget", "Priority support"] },
  { n: "Scale", p: "₹5,999", f: ["Multiple stores", "Custom domain", "Dedicated manager"] },
]
const bar = "rounded-full bg-[#e6ebef]"

export function WebChatScene() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] flex-col justify-center gap-2.5 lg:-translate-y-4 lg:translate-x-5 lg:h-full lg:min-h-[470px]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_10%,white),transparent_66%)]" />

      {/* which part is playing */}
      <div className="relative flex items-center gap-2">
        <span className="wc-tb inline-flex items-center whitespace-nowrap gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"><LogOut className="h-3.5 w-3.5" />Before<span className="hidden sm:inline"> · visitors bounce</span></span>
        <span className="h-px w-5 bg-border" />
        <span className="wc-ta inline-flex items-center whitespace-nowrap gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"><Sparkles className="h-3.5 w-3.5" />After<span className="hidden sm:inline"> · visitors talk</span></span>
      </div>

      {/* the one card */}
      <div className="relative h-[404px] overflow-hidden sm:h-[372px] rounded-2xl bg-white shadow-[8px_7px_0_0_oklch(0.92_0.02_200),0_30px_46px_-26px_rgba(15,26,46,.45)] ring-1 ring-border">
        <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3.5 py-2.5">
          <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/80" /><i className="h-2.5 w-2.5 rounded-full bg-[#f5b942]/90" /><i className="h-2.5 w-2.5 rounded-full bg-primary/80" /></span>
          <span className="flex-1 truncate rounded-full bg-white px-3 py-1 text-[10.5px] text-muted-foreground ring-1 ring-border">yourstore.com/pricing</span>
        </div>

        {/* the website */}
        <div className="wc-dim px-5 pb-4 pt-4">
          <div className="flex items-center gap-2.5"><span className="h-5 w-5 rounded-md bg-primary" /><span className="text-[11px] font-bold text-[#14233a]">yourstore</span><span className="ml-3 hidden text-[10px] font-medium text-muted-foreground sm:inline">Shop</span><span className="hidden text-[10px] font-semibold text-[#14233a] sm:inline">Pricing</span><span className="hidden text-[10px] font-medium text-muted-foreground sm:inline">Support</span><span className="ml-auto rounded-full bg-[#14233a] px-3 py-1 text-[9px] font-semibold text-white">Sign in</span></div>
          <p className="mt-5 text-[20px] font-bold leading-tight tracking-tight text-[#14233a]">Plans that grow<br />with your store</p>
          <p className="mt-1 text-[10.5px] text-muted-foreground">Pick a plan. Change it any time.</p>
          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {PLANS.map((p, i) => (
              <div key={p.n} className={`relative rounded-xl p-2.5 ring-1 ${i === 1 ? "bg-primary/[0.08] ring-primary/40" : "bg-white ring-border"}`}>
                {i === 1 && <span className="absolute -top-2 right-2 rounded-full bg-primary px-1.5 py-px text-[7.5px] font-bold text-primary-foreground">Popular</span>}
                <span className="block text-[10px] font-semibold text-[#14233a]">{p.n}</span>
                <span className="mt-1 block text-[17px] font-bold leading-none tracking-tight text-[#14233a]">{p.p}<span className="text-[8.5px] font-medium text-muted-foreground">/mo</span></span>
                <ul className="mt-2 space-y-1">
                  {p.f.map((x) => <li key={x} className="flex items-center gap-1 text-[8.5px] leading-tight text-muted-foreground"><Check className="h-2.5 w-2.5 shrink-0 text-primary" strokeWidth={3} />{x}</li>)}
                </ul>
                <span className={`mt-2.5 block rounded-full py-1 text-center text-[8.5px] font-semibold ${i === 1 ? "bg-primary text-primary-foreground" : "bg-[#eef2f5] text-[#14233a]"}`}>Choose plan</span>
              </div>
            ))}
          </div>
        </div>

        {/* BEFORE: timer, wandering cursor, the visitor leaves */}
        <span className="wc-timer absolute right-3 top-[92px] inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#14233a] shadow-sm ring-1 ring-border"><Timer className="h-3 w-3 text-primary" />38s on pricing</span>
        <MousePointer2 className="wc-cur h-6 w-6 fill-[#14233a] text-white drop-shadow" />
        <div className="wc-left absolute inset-x-0 top-[58%] flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#c93a3f] shadow-[0_16px_26px_-10px_rgba(15,26,46,.45)] ring-1 ring-[#f5c4c6]"><LogOut className="h-4 w-4" />Visitor left, no one spoke to them</span>
        </div>

        {/* AFTER: trigger, bubble, widget, lead */}
        <span className="wc-trig absolute right-3 top-[92px] inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-semibold text-white shadow-lg" style={{ background: NAVY }}><MousePointerClick className="h-3 w-3 text-primary" />Trigger: 45s on pricing → chat opens</span>
        <div className="wc-pro absolute bottom-[68px] right-4 rounded-xl rounded-br-sm bg-white px-3 py-2 text-[11px] font-semibold shadow-[0_12px_22px_-10px_rgba(15,26,46,.5)] ring-1 ring-border">Need help choosing a plan? 👋</div>
        <span className="wc-launch absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"><Sparkles className="h-5 w-5" /></span>
        <div className="wc-open absolute bottom-3 right-3 w-[206px] sm:bottom-4 sm:right-4 sm:w-[240px] overflow-hidden rounded-2xl bg-white shadow-[0_26px_40px_-14px_rgba(15,26,46,.6)] ring-1 ring-border">
          <div className="flex items-center gap-2.5 bg-primary px-3.5 py-2.5 text-primary-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25"><Sparkles className="h-3.5 w-3.5" /></span>
            <span className="leading-tight"><span className="block text-[12.5px] font-semibold">Chat with us</span><span className="flex items-center gap-1 text-[9.5px] opacity-90"><i className="wc-live h-1.5 w-1.5 rounded-full bg-white" />AI answers instantly</span></span>
          </div>
          <div className="flex h-[134px] flex-col gap-2 bg-[#f6f8fa] px-3 py-3 sm:h-[148px]">
            <div className="wc-m0 max-w-[92%] self-start rounded-2xl rounded-bl-md bg-white px-2.5 py-1.5 text-[11px] leading-snug shadow-sm ring-1 ring-border">Hi! Looking for something specific?</div>
            <div className="wc-m1 max-w-[82%] self-end rounded-2xl rounded-br-md bg-primary px-2.5 py-1.5 text-[11px] leading-snug text-primary-foreground">Do you ship to Kochi?</div>
            <div className="wc-m2 relative max-w-[94%] self-start">
              <div className="wc-ty absolute left-0 top-0 flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm ring-1 ring-border"><i className="wc-td h-1.5 w-1.5 rounded-full bg-muted-foreground" /><i className="wc-td h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: ".15s" }} /><i className="wc-td h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: ".3s" }} /></div>
              <div className="wc-ans rounded-2xl rounded-bl-md bg-white px-2.5 py-1.5 text-[11px] leading-snug shadow-sm ring-1 ring-border">Yes, 2-3 day delivery to Kochi.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-border bg-white px-3 py-2"><span className="flex-1 rounded-full bg-secondary px-3 py-1.5 text-[10px] text-muted-foreground">Type a message…</span><Send className="h-3.5 w-3.5 text-primary" /></div>
        </div>
        <span className="wc-lead absolute right-4 top-[88px] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-semibold text-white shadow-[0_12px_20px_-8px_rgba(15,26,46,.55)]" style={{ background: NAVY }}><Check className="h-3 w-3 text-primary" strokeWidth={3} />Lead captured · Aman</span>
      </div>

      {/* the result, under the card */}
      <div className="relative h-[40px]">
        <div className="wc-res-l absolute inset-0 flex items-center gap-2 rounded-xl bg-white px-3.5 text-[12px] ring-1 ring-border"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fdecec] text-[#c93a3f]"><UserRound className="h-3.5 w-3.5" /></span><span><b className="font-semibold text-[#14233a]">0 conversations</b> <span className="text-muted-foreground">· lead lost</span></span></div>
        <div className="wc-res-r absolute inset-0 flex items-center gap-2 rounded-xl bg-white px-3.5 text-[12px] ring-1 ring-border"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"><MessageCircle className="h-3.5 w-3.5" /></span><span><b className="font-semibold text-[#14233a]">Conversation started</b> <span className="text-muted-foreground">· lead captured</span></span></div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
