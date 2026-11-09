import { Bot, Camera, ChevronLeft, Megaphone, Phone, Search, UserCheck, Users, Video, Wifi } from "lucide-react"

// Hero graphic for /channels/messenger: the Messenger app's chat list on a tilted phone, built from this page's content.
// Top: the Facebook Pages and the agents that answer (AI agent, human agent). Below: conversations, each tagged with
// who handled it (Auto-reply, AI agent, Human agent, Broadcast). On larger screens four role chips sit on an arc to the
// left, joined to the matching conversation by dotted lines: as each conversation arrives its chip and line light up.
// A Messenger logo on a glossy disc, a floor shadow and a glass reflection give it depth.
// Hand-built HTML + SVG + CSS, silent, 14-second loop.

const ROWS = [
  { n: "Aman", p: "Urban Cart", m: "Can you change the address?", tag: "Human agent", tone: "bg-[#14233a]/10 text-[#14233a]", c: "#f5b942", unread: true, s: 8 },
  { n: "Riya", p: "Studio Nine", m: "Out for delivery today by 6 pm", tag: "AI agent", tone: "bg-primary/10 text-[oklch(0.45_0.12_175)]", c: "#6f8fb4", s: 16 },
  { n: "Sana", p: "Urban Cart", m: "Hi! Yes, the jacket is in stock", tag: "Auto-reply", tone: "bg-primary/10 text-[oklch(0.45_0.12_175)]", c: "#7fd8c3", s: 24 },
  { n: "Karan", p: "Studio Nine", m: "New arrivals this week 🛍", tag: "Broadcast", tone: "bg-[#31a24c]/10 text-[#238a3b]", c: "#4aa38f", s: 32 },
  { n: "Meera", p: "Urban Cart", m: "Thanks, order confirmed ✓", tag: "Human agent", tone: "bg-[#14233a]/10 text-[#14233a]", c: "#8aa0b8", s: 40 },
]

const CHAT = [
  { s: 57 }, { s: 62 }, { s: 68 }, { s: 73 }, { s: 78 },
]

// the role chips (larger screens): position on the stage, and which conversation rows they belong to
const CHIPS = [
  { Icon: UserCheck, t: "Human agent", c: "#14233a", x: 36, y: 128, rows: [0, 4] },
  { Icon: Bot, t: "AI agent", c: "var(--primary)", x: 70, y: 196, rows: [1] },
  { Icon: Phone, t: "Auto-reply", c: "#e0a21b", x: 70, y: 264, rows: [2] },
  { Icon: Megaphone, t: "Broadcast", c: "#4aa38f", x: 36, y: 332, rows: [3] },
]
const CHIP_W = 132
const CHIP_H = 38
const ROW_Y = [168, 218, 268, 318, 368]
const PHONE_L = 303
// every link: chip -> conversation row
const LINKS = CHIPS.flatMap((c, ci) => c.rows.map((r) => ({ ci, r })))

const CAPS = [
  { t: "Human agent", d: "Takes over, full history kept", Icon: UserCheck, c: "#14233a" },
  { t: "AI agent", d: "Replies in seconds, any hour", Icon: Bot, c: "var(--primary)" },
  { t: "Auto-reply", d: "Answers common questions", Icon: Phone, c: "#e0a21b" },
  { t: "Broadcast", d: "Opt-in offers to subscribers", Icon: Megaphone, c: "#4aa38f" },
  { t: "Human agent", d: "Confirms and closes the order", Icon: UserCheck, c: "#14233a" },
]
const f = (n: number) => +n.toFixed(2)
const win = (name: string, a: number, y = 8) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(${y}px) } ${a + 3}%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0; transform: none } }`

// generic "on during these windows" keyframes
const windows = (name: string, wins: [number, number][], on: string, off: string) => {
  const pts: string[] = []
  if (wins[0][0] - 1 > 0) pts.push(`0% { ${off} }`)
  wins.forEach(([a, b]) => { pts.push(`${f(a - 1)}% { ${off} }`, `${f(a + 1)}% { ${on} }`, `${f(b - 1)}% { ${on} }`, `${f(b + 2)}% { ${off} }`) })
  pts.push(`100% { ${off} }`)
  return `@keyframes ${name} { ${pts.join(" ")} }`
}
const GLOW_ON = "transform: scale(1.06); box-shadow: 0 12px 20px -10px rgba(15,26,46,.4), 0 0 0 3px color-mix(in oklch, var(--primary) 30%, transparent), 0 0 22px 4px color-mix(in oklch, var(--primary) 22%, transparent)"
const GLOW_OFF = "transform: none; box-shadow: 0 12px 20px -10px rgba(15,26,46,.4), 0 0 0 0 transparent"

const CSS = `
${ROWS.map((r, i) => win(`mp-r${i}`, r.s)).join("\n")}
${win("mp-top", 2, 6)}
${CHAT.map((c, i) => `@keyframes mp-c${i} { 0%, ${c.s}% { opacity: 0; transform: translateY(8px) } ${c.s + 3}%, 86% { opacity: 1; transform: none } 90%, 100% { opacity: 0; transform: none } }`).join("\n")}
${CHIPS.map((c, i) => windows(`mp-h${i}`, c.rows.map((r) => [ROWS[r].s, ROWS[r].s + 7] as [number, number]), GLOW_ON, GLOW_OFF)).join("\n")}
${ROWS.map((r, i) => windows(`mp-hl${i}`, [[r.s + 1, r.s + 8]], "opacity: 1", "opacity: 0")).join("\n")}
${LINKS.map((l, k) => windows(`mp-ln${k}`, [[ROWS[l.r].s, ROWS[l.r].s + 7]], "opacity: 1", "opacity: 0")).join("\n")}
${ROWS.map((r, i) => windows(`mp-cap${i}`, [[r.s, r.s + 7]], "opacity: 1; transform: none", "opacity: 0; transform: translateY(8px)")).join("\n")}
@keyframes mp-spin { to { transform: rotate(360deg) } }
@keyframes mp-dots { 0%, 16% { opacity: 0 } 17.5%, 20.5% { opacity: 1 } 22%, 100% { opacity: 0 } }
@keyframes mp-txt { 0%, 21% { opacity: 0 } 23%, 100% { opacity: 1 } }
@keyframes mp-dot { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-2px); opacity: 1 } }
@keyframes mp-badge { 0%, 9% { opacity: 0; transform: scale(.4) } 12%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }
@keyframes mp-chat { 0%, 52% { transform: translateX(100%) } 56%, 86% { transform: none } 90%, 100% { transform: translateX(100%) } }
@keyframes mp-tap { 0%, 47% { opacity: 0 } 49.5%, 52% { opacity: 1 } 55%, 100% { opacity: 0 } }
@keyframes mp-bob { 0%, 100% { translate: 0 -5px } 50% { translate: 0 6px } }
@keyframes mp-fl { 0%, 100% { translate: 0 -5px } 50% { translate: 0 6px } }
@keyframes mp-ping { 0%, 100% { box-shadow: 0 0 0 0 rgba(18,160,124,.45) } 60% { box-shadow: 0 0 0 5px rgba(18,160,124,0) } }
@keyframes mp-flow { to { stroke-dashoffset: -20 } }
${ROWS.map((_, i) => `.mp-r${i} { opacity: 0; animation: mp-r${i} 14s cubic-bezier(.2,.7,.2,1) infinite }\n.mp-hl${i} { opacity: 0; animation: mp-hl${i} 14s ease-in-out infinite }`).join("\n")}
${CHIPS.map((_, i) => `.mp-h${i} { animation: mp-h${i} 14s ease-in-out infinite }`).join("\n")}
${LINKS.map((_, k) => `.mp-ln${k} { opacity: 0; animation: mp-ln${k} 14s ease-in-out infinite }`).join("\n")}
.mp-spin { animation: mp-spin 18s linear infinite }
${ROWS.map((_, i) => `.mp-cap${i} { opacity: 0; animation: mp-cap${i} 14s ease-in-out infinite }`).join("\n")}
.mp-dots { opacity: 0; animation: mp-dots 14s ease-out infinite }
.mp-txt { opacity: 0; animation: mp-txt 14s ease-out infinite }
.mp-dot { animation: mp-dot 1s ease-in-out infinite }
.mp-badge { opacity: 0; animation: mp-badge 14s cubic-bezier(.3,1.4,.4,1) infinite }
.mp-chat { transform: translateX(100%); animation: mp-chat 14s cubic-bezier(.3,.7,.2,1) infinite }
.mp-tap { opacity: 0; animation: mp-tap 14s ease-in-out infinite }
${CHAT.map((_, i) => `.mp-c${i} { opacity: 0; animation: mp-c${i} 14s cubic-bezier(.2,.7,.2,1) infinite }`).join("\n")}
.mp-top { opacity: 0; animation: mp-top 14s cubic-bezier(.2,.7,.2,1) infinite }
.mp-phone { animation: mp-bob 7s ease-in-out infinite }
.mp-fl { animation: mp-fl 5s ease-in-out infinite }
.mp-ping { animation: mp-ping 1.8s ease-out infinite }
.mp-flow { stroke-dasharray: 3 6; animation: mp-flow 1.6s linear infinite }
@media (prefers-reduced-motion: reduce) {
  [class*="mp-r"], .mp-top, [class*="mp-c"], .mp-txt, .mp-badge { animation: none; opacity: 1; transform: none }
  [class*="mp-cap"] { animation: none; opacity: 0 } .mp-cap0 { opacity: 1 } .mp-spin { animation: none }
  [class*="mp-hl"], [class*="mp-ln"], .mp-dots { animation: none; opacity: 0 } [class*="mp-h"]:not([class*="mp-hl"]) { animation: none }
  .mp-chat { animation: none; transform: translateX(100%) } .mp-tap { animation: none; opacity: 0 }
  .mp-phone, .mp-fl, .mp-ping, .mp-flow, .mp-dot { animation: none }
}
`

const NAVY = "#14233a"
const FB = ({ cls }: { cls: string }) => <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#14233a] font-bold leading-none text-white ${cls}`}>f</span>

function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg className="relative h-[44px] w-[44px] sm:h-[66px] sm:w-[66px]" viewBox="0 0 24 24" aria-hidden>
          <defs>
            <linearGradient id="mp-lg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#3fd9b0" /><stop offset=".6" stopColor="#12a07c" /><stop offset="1" stopColor="#0b6f58" /></linearGradient>
          </defs>
          <path fill="url(#mp-lg)" d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.39 0 01.002 11.64z" />
          <path fill="#fff" d="M8.32 9.45l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z" />
        </svg>
      </div>
      <span className="mt-3 hidden items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#14233a] shadow-sm ring-1 ring-border sm:inline-flex">Facebook Messenger</span>
    </div>
  )
}

export function MessengerPhone() {
  return (
    <div className="relative mx-auto h-[480px] w-full max-w-[580px] overflow-hidden lg:h-full lg:min-h-[480px]">
      {/* two thin rings centred on the phone, and a few dots */}
      <div className="absolute left-1/2 lg:left-[72%] top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
      <div className="absolute left-1/2 lg:left-[72%] top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
      <i className="absolute left-[44%] top-[6%] h-2.5 w-2.5 rounded-full bg-primary/35" />
      <i className="absolute right-[3%] top-[12%] h-4 w-4 rounded-full bg-primary/30" />
      <i className="absolute bottom-[8%] right-[4%] h-6 w-6 rounded-full bg-primary/20" />

      {/* larger screens: connectors, floor shadow and the role chips on a 580 x 480 stage */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[480px] w-[580px] -translate-x-1/2 -translate-y-1/2 lg:block">
        <svg className="absolute left-0 top-0 h-[480px] w-[580px]" viewBox="0 0 580 480" fill="none" aria-hidden>
          <defs><filter id="mp-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter></defs>
          <ellipse cx="418" cy="462" rx="168" ry="22" fill="var(--primary)" opacity=".1" />
          <ellipse cx="418" cy="462" rx="168" ry="22" stroke="var(--primary)" strokeOpacity=".3" strokeDasharray="3 6" />
          <ellipse cx="418" cy="468" rx="118" ry="11" fill="#0f1a2e" opacity=".24" filter="url(#mp-blur)" />
          {LINKS.map((l, k) => {
            const c = CHIPS[l.ci]
            const x1 = c.x + CHIP_W
            const y1 = c.y + CHIP_H / 2
            const y2 = ROW_Y[l.r]
            const mx = (x1 + PHONE_L) / 2
            const d = `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${PHONE_L} ${y2}`
            return (
              <g key={k}>
                <path d={d} stroke="var(--primary)" strokeOpacity=".28" strokeWidth="1.4" strokeDasharray="2 6" strokeLinecap="round" />
                <path className={`mp-ln${k} mp-flow`} d={d} stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                <circle cx={PHONE_L} cy={y2} r="3" fill="var(--primary)" opacity=".6" />
              </g>
            )
          })}
        </svg>
        {/* caption card: what the active role does */}
        <div className="absolute" style={{ left: 36, top: 398, width: 238, height: 52 }}>
          {CAPS.map((c, i) => (
            <div key={i} className={`mp-cap${i} absolute inset-0 flex items-center gap-2.5 rounded-2xl bg-white/90 px-3 ring-1 ring-white shadow-[0_18px_28px_-14px_rgba(15,26,46,.4)]`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: c.c }}><c.Icon className="h-4 w-4" /></span>
              <span className="leading-tight"><span className="block text-[12px] font-semibold text-[#14233a]">{c.t}</span><span className="block text-[10.5px] text-muted-foreground">{c.d}</span></span>
            </div>
          ))}
        </div>
        {CHIPS.map((c, i) => (
          <div key={c.t} className="mp-fl absolute" style={{ left: c.x, top: c.y, animationDelay: `${-i * 1.3}s` }}>
            <span className={`mp-h${i} flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3 text-[11.5px] font-semibold text-[#14233a] ring-1 ring-border`} style={{ width: CHIP_W, height: CHIP_H }}>
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-white" style={{ background: c.c }}><c.Icon className="h-3.5 w-3.5" /></span>{c.t}
            </span>
          </div>
        ))}
      </div>

      {/* the phone, tilted in 3D */}
      <div
        className="mp-phone absolute left-1/2 lg:left-[72%] top-1/2 -ml-[122px] -mt-[228px] h-[456px] w-[244px] rounded-[34px] bg-[#0f1a2e] p-[5px] shadow-[0_34px_50px_-22px_rgba(15,26,46,.5),inset_0_0_0_1px_rgba(255,255,255,.12)] ring-1 ring-black/20"
        style={{ transform: "perspective(1500px) rotateY(-18deg) rotateX(4deg)", transformStyle: "preserve-3d" }}
      >
        {/* thickness: stacked slabs behind the screen, plus side buttons */}
        {[-3, -6, -9, -12, -15].map((z) => <i key={z} className="pointer-events-none absolute inset-0 rounded-[34px] bg-[#0a1322]" style={{ transform: `translateZ(${z}px)` }} />)}
        <i className="pointer-events-none absolute -right-[3px] top-[88px] h-10 w-[3px] rounded-r bg-[#223350]" style={{ transform: "translateZ(-7px)" }} />
        <i className="pointer-events-none absolute -left-[3px] top-[70px] h-6 w-[3px] rounded-l bg-[#223350]" style={{ transform: "translateZ(-7px)" }} />
        <i className="pointer-events-none absolute -left-[3px] top-[104px] h-6 w-[3px] rounded-l bg-[#223350]" style={{ transform: "translateZ(-7px)" }} />
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
              { l: "Studio Nine", c: "#6f8fb4", t: "S", f: true },
              { l: "AI agent", c: "#14233a", bot: true },
              { l: "Rohit", c: "#14233a", t: "R", on: true },
            ].map((a) => (
              <span key={a.l} className="flex w-[52px] flex-col items-center gap-1">
                <span className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-dashed border-primary/70 p-[2px]">
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
                <i className={`mp-hl${i} pointer-events-none absolute inset-y-0 -inset-x-1.5 rounded-xl bg-primary/10`} />
                {i === 0 && <i className="mp-tap pointer-events-none absolute inset-y-0 -inset-x-1.5 rounded-xl bg-primary/10" />}
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: r.c }}>{r.n[0]}<FB cls="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 text-[8px] ring-2 ring-white" /></span>
                <span className="relative min-w-0 flex-1 leading-tight">
                  <span className="flex items-center gap-1.5"><span className={`text-[10.5px] ${r.unread ? "font-bold" : "font-semibold"} text-[#14233a]`}>{r.n}</span><span className={`rounded-full px-1.5 py-px text-[7.5px] font-semibold ${r.tone}`}>{r.tag}</span></span>
                  <span className={`block truncate text-[9px] ${r.unread ? "font-semibold text-[#14233a]" : "text-muted-foreground"} ${i === 1 ? "mp-txt" : ""}`}>{r.m}</span>
                  {i === 1 && (
                    <span className="mp-dots absolute bottom-0 left-0 flex h-[13px] items-center gap-1 rounded-full bg-[#f0f2f5] px-2">
                      {[0, 0.15, 0.3].map((d) => <i key={d} className="mp-dot h-1 w-1 rounded-full bg-[#14233a]/60" style={{ animationDelay: `${d}s` }} />)}
                    </span>
                  )}
                </span>
                {r.unread && <i className="mp-ping h-2 w-2 shrink-0 rounded-full bg-primary" />}
              </li>
            ))}
          </ul>

          {/* tab bar with camera button */}
          <div className="relative flex h-[42px] items-center gap-7 bg-primary pl-7 text-white">
            <span className="relative">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 3C6.8 3 3 6.9 3 11.7c0 2.5 1.1 4.7 2.9 6.2V21l2.9-1.6c.9.2 1.7.4 2.7.4 5.2 0 9-3.9 9-8.1S17.2 3 12 3zm1 10.6-2.3-2.4-4.4 2.4 4.8-5.1 2.3 2.4 4.4-2.4-4.8 5.1z" /></svg>
              <i className="mp-badge absolute -right-2 -top-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#f5b942] px-[3px] text-[7.5px] font-bold text-[#14233a] ring-2 ring-primary">5</i>
            </span>
            <Users className="h-4 w-4" />
            <Megaphone className="h-4 w-4" />
            <span className="absolute -top-3 right-3 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white text-primary ring-[3px] ring-primary"><Camera className="h-[18px] w-[18px]" /></span>
          </div>

          {/* the first chat, opened */}
          <div className="mp-chat absolute inset-0 z-20 flex flex-col bg-white">
            <div className="flex items-center justify-between px-4 pt-2 text-[9px] font-semibold text-[#14233a]"><span>11:11</span><Wifi className="h-3 w-3" /></div>
            <div className="flex items-center gap-2 border-b border-black/5 px-3 pb-2 pt-2">
              <ChevronLeft className="h-4 w-4 text-primary" />
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: "#f5b942" }}>A<i className="absolute -bottom-px -right-px h-2 w-2 rounded-full bg-[#31a24c] ring-2 ring-white" /></span>
              <span className="leading-tight"><span className="block text-[11px] font-semibold text-[#14233a]">Aman</span><span className="block text-[8.5px] text-muted-foreground">Urban Cart · Active now</span></span>
              <span className="ml-auto flex items-center gap-2.5 text-primary"><Phone className="h-3.5 w-3.5" /><Video className="h-4 w-4" /></span>
            </div>
            <div className="flex flex-1 flex-col gap-2 px-2.5 py-3">
              <div className="mp-c0 max-w-[80%] self-end rounded-2xl rounded-br-md bg-gradient-to-b from-primary to-[oklch(0.5_0.12_175)] px-2.5 py-1.5 text-[10px] leading-snug text-white">Where is my order #7734?</div>
              <div className="mp-c1 max-w-[86%] self-start">
                <span className="mb-0.5 flex items-center gap-1 text-[8.5px] font-semibold text-[oklch(0.45_0.12_175)]"><Bot className="h-2.5 w-2.5" />AI agent</span>
                <div className="rounded-2xl rounded-bl-md bg-[#f0f2f5] px-2.5 py-1.5 text-[10px] leading-snug">Out for delivery today by 6 pm.</div>
              </div>
              <div className="mp-c2 max-w-[80%] self-end rounded-2xl rounded-br-md bg-gradient-to-b from-primary to-[oklch(0.5_0.12_175)] px-2.5 py-1.5 text-[10px] leading-snug text-white">Can you change the address?</div>
              <div className="mp-c3 flex items-center gap-2 py-0.5"><span className="h-px flex-1 bg-border" /><span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-semibold text-white" style={{ background: NAVY }}><UserCheck className="h-2.5 w-2.5" />Rohit joined · history kept</span><span className="h-px flex-1 bg-border" /></div>
              <div className="mp-c4 max-w-[86%] self-start">
                <span className="mb-0.5 block text-[8.5px] font-semibold text-muted-foreground">Rohit · Human agent</span>
                <div className="rounded-2xl rounded-bl-md bg-[#f0f2f5] px-2.5 py-1.5 text-[10px] leading-snug">Done, address updated ✓</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-2 text-primary"><span className="flex-1 rounded-full bg-[#f0f2f5] px-2.5 py-1.5 text-[9px] text-muted-foreground">Aa</span></div>
          </div>

          {/* glass reflection across the screen */}
          <i className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(115deg,rgba(255,255,255,.28)_0%,rgba(255,255,255,.06)_30%,transparent_46%)]" />
        </div>
      </div>

      {/* Messenger logo on a disc: top-left on small screens, above the chips on large ones */}
      <div className="mp-fl absolute left-0 top-[6%] sm:left-[3%] sm:top-[8%] lg:left-1/2 lg:top-1/2 lg:-ml-[116px] lg:-mt-[206px]"><Logo /></div>
      <style>{CSS}</style>
    </div>
  )
}
