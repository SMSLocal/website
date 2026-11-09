import { Bot, Camera, ChevronLeft, Megaphone, Phone, Search, UserCheck, Users, Video, Wifi } from "lucide-react"

// Hero graphic for /channels/messenger: the Messenger app's chat list on a phone, built from this page's content.
// Top: the Facebook Pages and the agents that answer (AI agent, human agent). Below: conversations, each tagged with
// who handled it (Auto-reply, AI agent, Human agent, Broadcast). A big Messenger logo and thin rings and dots frame it.
// Hand-built HTML + SVG + CSS, silent, 14-second loop.

const ROWS = [
  { n: "Aman", p: "Urban Cart", m: "Can you change the address?", tag: "Human agent", tone: "bg-[#14233a]/10 text-[#14233a]", c: "#f5b942", unread: true, s: 8 },
  { n: "Riya", p: "Studio Nine", m: "Out for delivery today by 6 pm", tag: "AI agent", tone: "bg-[#7b4dff]/10 text-[#6a3df0]", c: "#8fa8ff", s: 16 },
  { n: "Sana", p: "Urban Cart", m: "Hi! Yes, the jacket is in stock", tag: "Auto-reply", tone: "bg-[#0084ff]/10 text-[#0074e0]", c: "#7fd8c3", s: 24 },
  { n: "Karan", p: "Studio Nine", m: "New arrivals this week 🛍", tag: "Broadcast", tone: "bg-[#31a24c]/10 text-[#238a3b]", c: "#ff9f8a", s: 32 },
  { n: "Meera", p: "Urban Cart", m: "Thanks, order confirmed ✓", tag: "Human agent", tone: "bg-[#14233a]/10 text-[#14233a]", c: "#c6a8f5", s: 40 },
]

const CHAT = [
  { s: 57 }, { s: 62 }, { s: 68 }, { s: 73 }, { s: 78 },
]

const win = (name: string, a: number, y = 8) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(${y}px) } ${a + 3}%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0; transform: none } }`

const CSS = `
${ROWS.map((r, i) => win(`mp-r${i}`, r.s)).join("\n")}
${win("mp-top", 2, 6)}
${CHAT.map((c, i) => `@keyframes mp-c${i} { 0%, ${c.s}% { opacity: 0; transform: translateY(8px) } ${c.s + 3}%, 86% { opacity: 1; transform: none } 90%, 100% { opacity: 0; transform: none } }`).join("\n")}
@keyframes mp-chat { 0%, 52% { transform: translateX(100%) } 56%, 86% { transform: none } 90%, 100% { transform: translateX(100%) } }
@keyframes mp-tap { 0%, 47% { opacity: 0 } 49.5%, 52% { opacity: 1 } 55%, 100% { opacity: 0 } }
@keyframes mp-bob { 0%, 100% { transform: translateY(-5px) } 50% { transform: translateY(6px) } }
@keyframes mp-fl { 0%, 100% { translate: 0 -5px } 50% { translate: 0 6px } }
@keyframes mp-ping { 0%, 100% { box-shadow: 0 0 0 0 rgba(0,132,255,.45) } 60% { box-shadow: 0 0 0 5px rgba(0,132,255,0) } }
${ROWS.map((_, i) => `.mp-r${i} { opacity: 0; animation: mp-r${i} 14s cubic-bezier(.2,.7,.2,1) infinite }`).join("\n")}
.mp-chat { transform: translateX(100%); animation: mp-chat 14s cubic-bezier(.3,.7,.2,1) infinite }
.mp-tap { opacity: 0; animation: mp-tap 14s ease-in-out infinite }
${CHAT.map((_, i) => `.mp-c${i} { opacity: 0; animation: mp-c${i} 14s cubic-bezier(.2,.7,.2,1) infinite }`).join("\n")}
.mp-top { opacity: 0; animation: mp-top 14s cubic-bezier(.2,.7,.2,1) infinite }
.mp-phone { animation: mp-bob 7s ease-in-out infinite }
.mp-fl { animation: mp-fl 5s ease-in-out infinite }
.mp-ping { animation: mp-ping 1.8s ease-out infinite }
@media (prefers-reduced-motion: reduce) {
  [class*="mp-r"], .mp-top, [class*="mp-c"] { animation: none; opacity: 1; transform: none }
  .mp-chat { animation: none; transform: translateX(100%) } .mp-tap { animation: none; opacity: 0 }
  .mp-phone, .mp-fl, .mp-ping { animation: none }
}
`

const NAVY = "#14233a"
const FB = ({ cls }: { cls: string }) => <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#1877F2] font-bold leading-none text-white ${cls}`}>f</span>

function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg className="h-[44px] w-[44px] drop-shadow-[0_10px_14px_rgba(70,70,220,.3)] sm:h-[108px] sm:w-[108px]" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id="mp-lg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#0099ff" /><stop offset=".6" stopColor="#a033ff" /><stop offset="1" stopColor="#ff5280" /></linearGradient>
        </defs>
        <path fill="url(#mp-lg)" d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.39 0 01.002 11.64z" />
        <path fill="#fff" d="M8.32 9.45l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z" />
      </svg>
      <span className="hidden items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] sm:inline-flex font-semibold text-[#14233a] shadow-sm ring-1 ring-border">Facebook Messenger</span>
    </div>
  )
}

export function MessengerPhone() {
  return (
    <div className="relative mx-auto h-[480px] w-full max-w-[580px] overflow-hidden lg:h-full lg:min-h-[480px]">
      {/* thin rings and dots, centred on the phone and balanced on both sides */}
      <div className="absolute left-1/2 lg:left-[72%] top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
      <div className="absolute left-1/2 lg:left-[72%] top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
      <div className="absolute -bottom-40 left-[2%] h-[340px] w-[340px] rounded-full border border-primary/20" />
      <div className="absolute -top-28 left-[8%] h-[220px] w-[220px] rounded-full border border-primary/10" />
      <i className="absolute left-[10%] top-[30%] h-3 w-3 rounded-full bg-[#0084ff]/35" />
      <i className="absolute left-[4%] top-[56%] h-8 w-8 rounded-full bg-primary/15" />
      <i className="absolute bottom-[12%] left-[24%] h-4 w-4 rounded-full bg-primary/30" />
      <i className="absolute bottom-[20%] left-[40%] h-2 w-2 rounded-full bg-[#a033ff]/35" />
      <i className="absolute left-[44%] top-[6%] h-2.5 w-2.5 rounded-full bg-primary/35" />
      <i className="absolute right-[3%] top-[12%] h-4 w-4 rounded-full bg-[#0084ff]/30" />
      <i className="absolute bottom-[8%] right-[4%] h-6 w-6 rounded-full bg-primary/20" />

      {/* the phone */}
      <div className="mp-phone absolute left-1/2 lg:left-[72%] top-1/2 -ml-[122px] -mt-[228px] h-[456px] w-[244px] rounded-[34px] bg-[#0f1a2e] p-[5px] shadow-[0_34px_50px_-22px_rgba(15,26,46,.5)] ring-1 ring-black/20">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[29px] bg-white">
          <div className="flex items-center justify-between px-4 pt-2 text-[9px] font-semibold text-[#14233a]"><span>11:11</span><Wifi className="h-3 w-3" /></div>

          {/* profile + search */}
          <div className="mp-top flex items-center gap-2 px-3 pb-2 pt-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: NAVY }}>SL</span>
            <span className="flex flex-1 items-center gap-1.5 rounded-full bg-[#f0f2f5] px-2.5 py-1.5 text-[9.5px] text-muted-foreground"><Search className="h-3 w-3" />Search conversations</span>
          </div>

          {/* pages and agents */}
          <div className="mp-top flex items-start justify-between px-3 pb-2.5">
            {[
              { l: "Urban Cart", c: "#f5b942", t: "U", f: true },
              { l: "Studio Nine", c: "#8fa8ff", t: "S", f: true },
              { l: "AI agent", c: "#7b4dff", bot: true },
              { l: "Rohit", c: "#14233a", t: "R", on: true },
            ].map((a) => (
              <span key={a.l} className="flex w-[52px] flex-col items-center gap-1">
                <span className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-dashed border-[#0084ff]/70 p-[2px]">
                  <span className="flex h-full w-full items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: a.c }}>{a.bot ? <Bot className="h-4 w-4" /> : a.t}</span>
                  {a.f && <FB cls="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 text-[8px] ring-2 ring-white" />}
                  {a.on && <i className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#31a24c] ring-2 ring-white" />}
                </span>
                <span className="text-[8.5px] text-[#14233a]">{a.l}</span>
              </span>
            ))}
          </div>

          {/* conversations */}
          <ul className="flex-1 overflow-hidden px-2.5">
            {ROWS.map((r, i) => (
              <li key={r.n} className={`mp-r${i} relative flex items-center gap-2 py-[7px]`}>
                {i === 0 && <i className="mp-tap pointer-events-none absolute inset-y-0 -inset-x-1.5 rounded-xl bg-[#0084ff]/10" />}
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: r.c }}>{r.n[0]}<FB cls="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 text-[8px] ring-2 ring-white" /></span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="flex items-center gap-1.5"><span className={`text-[10.5px] ${r.unread ? "font-bold" : "font-semibold"} text-[#14233a]`}>{r.n}</span><span className={`rounded-full px-1.5 py-px text-[7.5px] font-semibold ${r.tone}`}>{r.tag}</span></span>
                  <span className={`block truncate text-[9px] ${r.unread ? "font-semibold text-[#14233a]" : "text-muted-foreground"}`}>{r.m}</span>
                </span>
                {r.unread && <i className="mp-ping h-2 w-2 shrink-0 rounded-full bg-[#0084ff]" />}
              </li>
            ))}
          </ul>

          {/* blue tab bar with camera button */}
          <div className="relative flex h-[42px] items-center gap-7 bg-[#0084ff] pl-7 text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 3C6.8 3 3 6.9 3 11.7c0 2.5 1.1 4.7 2.9 6.2V21l2.9-1.6c.9.2 1.7.4 2.7.4 5.2 0 9-3.9 9-8.1S17.2 3 12 3zm1 10.6-2.3-2.4-4.4 2.4 4.8-5.1 2.3 2.4 4.4-2.4-4.8 5.1z" /></svg>
            <Users className="h-4 w-4" />
            <Megaphone className="h-4 w-4" />
            <span className="absolute -top-3 right-3 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white text-[#0084ff] ring-[3px] ring-[#0084ff]"><Camera className="h-[18px] w-[18px]" /></span>
          </div>

          {/* the first chat, opened */}
          <div className="mp-chat absolute inset-0 z-20 flex flex-col bg-white">
            <div className="flex items-center justify-between px-4 pt-2 text-[9px] font-semibold text-[#14233a]"><span>11:11</span><Wifi className="h-3 w-3" /></div>
            <div className="flex items-center gap-2 border-b border-black/5 px-3 pb-2 pt-2">
              <ChevronLeft className="h-4 w-4 text-[#0084ff]" />
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: "#f5b942" }}>A<i className="absolute -bottom-px -right-px h-2 w-2 rounded-full bg-[#31a24c] ring-2 ring-white" /></span>
              <span className="leading-tight"><span className="block text-[11px] font-semibold text-[#14233a]">Aman</span><span className="block text-[8.5px] text-muted-foreground">Urban Cart · Active now</span></span>
              <span className="ml-auto flex items-center gap-2.5 text-[#0084ff]"><Phone className="h-3.5 w-3.5" /><Video className="h-4 w-4" /></span>
            </div>
            <div className="flex flex-1 flex-col gap-2 px-2.5 py-3">
              <div className="mp-c0 max-w-[80%] self-end rounded-2xl rounded-br-md bg-gradient-to-b from-[#0a85ff] to-[#7b4dff] px-2.5 py-1.5 text-[10px] leading-snug text-white">Where is my order #7734?</div>
              <div className="mp-c1 max-w-[86%] self-start">
                <span className="mb-0.5 flex items-center gap-1 text-[8.5px] font-semibold text-[#6a3df0]"><Bot className="h-2.5 w-2.5" />AI agent</span>
                <div className="rounded-2xl rounded-bl-md bg-[#f0f2f5] px-2.5 py-1.5 text-[10px] leading-snug">Out for delivery today by 6 pm.</div>
              </div>
              <div className="mp-c2 max-w-[80%] self-end rounded-2xl rounded-br-md bg-gradient-to-b from-[#0a85ff] to-[#7b4dff] px-2.5 py-1.5 text-[10px] leading-snug text-white">Can you change the address?</div>
              <div className="mp-c3 flex items-center gap-2 py-0.5"><span className="h-px flex-1 bg-border" /><span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-semibold text-white" style={{ background: NAVY }}><UserCheck className="h-2.5 w-2.5" />Rohit joined · history kept</span><span className="h-px flex-1 bg-border" /></div>
              <div className="mp-c4 max-w-[86%] self-start">
                <span className="mb-0.5 block text-[8.5px] font-semibold text-muted-foreground">Rohit · Human agent</span>
                <div className="rounded-2xl rounded-bl-md bg-[#f0f2f5] px-2.5 py-1.5 text-[10px] leading-snug">Done, address updated ✓</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-2 text-[#0084ff]"><span className="flex-1 rounded-full bg-[#f0f2f5] px-2.5 py-1.5 text-[9px] text-muted-foreground">Aa</span></div>
          </div>
        </div>
      </div>

      {/* big Messenger logo */}
      <div className="mp-fl absolute left-0 top-[6%] sm:left-[3%] sm:top-[8%] lg:left-[30%]"><Logo /></div>
      <style>{CSS}</style>
    </div>
  )
}
