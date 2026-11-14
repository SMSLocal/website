import { AtSign, Check, ChevronDown, Filter, Inbox, Instagram, Layers, MessageCircle, MessageSquare, MoreVertical, Paperclip, Phone, Send, Star, Timer, Users } from "lucide-react"

// Hero graphic for /channels/social: an inbox on a monitor, with the channel icons around it. The inbox plays one
// conversation at a time, in turn: Instagram, Messenger, Chat, Email, SMS, then a Voice call. While a conversation is on
// screen (the customer's message, a typing indicator, the AI's reply), its row in the list is highlighted and its own app
// icon lights up and glows. Hand-built HTML + SVG + CSS, silent, 24-second loop (4 seconds per conversation).
// Desktop is a 580 x 470 stage; on phones the inbox and the icons stack.

const SLOTS = 6
const S = 100 / SLOTS
const f = (n: number) => +n.toFixed(2)
const BASE_SHADOW = "0 12px 18px -8px rgba(15,26,46,.5), inset 0 1px 0 rgba(255,255,255,.45)"
// a soft halo: it eases in, then fades away slowly while its conversation is on screen
const GLOW_OFF = `transform: none; box-shadow: ${BASE_SHADOW}`
const GLOW_PEAK = `transform: scale(1.08); box-shadow: ${BASE_SHADOW}, 0 0 16px 2px color-mix(in oklch, var(--g) 46%, transparent), 0 0 34px 6px color-mix(in oklch, var(--g) 22%, transparent)`
const GLOW_MID = `transform: scale(1.04); box-shadow: ${BASE_SHADOW}, 0 0 12px 0 color-mix(in oklch, var(--g) 26%, transparent), 0 0 26px 3px color-mix(in oklch, var(--g) 12%, transparent)`

// keyframe body that is "on" during slot i and "off" otherwise
const slotKf = (i: number, on: string, off: string) => {
  const s = i * S
  const e = (i + 1) * S
  if (i === 0) return `0%, ${f(e - 1)}% { ${on} } ${f(e)}%, 100% { ${off} }`
  if (i === SLOTS - 1) return `0%, ${f(s - 1)}% { ${off} } ${f(s)}%, 100% { ${on} }`
  return `0%, ${f(s - 1)}% { ${off} } ${f(s)}%, ${f(e - 1)}% { ${on} } ${f(e)}%, 100% { ${off} }`
}

// the glow: off, eases in to its peak, fades to a faint halo by the end of the slot, then fades out
const glowKf = (i: number) => {
  const s = i * S
  const e = (i + 1) * S
  const pts: [number, string][] = [[Math.max(0, s - 0.5), GLOW_OFF], [s + 1.5, GLOW_PEAK], [e - 1, GLOW_MID], [Math.min(100, e + 2.5), GLOW_OFF]]
  const parts: string[] = []
  if (pts[0][0] > 0) parts.push(`0% { ${GLOW_OFF} }`)
  pts.forEach(([p, v]) => parts.push(`${f(p)}% { ${v} }`))
  if (pts[pts.length - 1][0] < 100) parts.push(`100% { ${GLOW_OFF} }`)
  return parts.join(" ")
}

const slotCss = (i: number) => {
  const s = i * S
  return `
@keyframes si-p${i} { ${slotKf(i, "opacity: 1", "opacity: 0")} }
@keyframes si-r${i} { ${slotKf(i, "background-color: color-mix(in oklch, var(--primary) 11%, white)", "background-color: transparent")} }
@keyframes si-g${i} { ${glowKf(i)} }
@keyframes si-q${i} { 0%, ${f(s + 1)}% { opacity: 0; transform: translateY(6px) } ${f(s + 2.5)}%, 100% { opacity: 1; transform: none } }
@keyframes si-t${i} { 0%, ${f(s + 4.5)}% { opacity: 0 } ${f(s + 5.2)}%, ${f(s + 8.2)}% { opacity: 1 } ${f(s + 9)}%, 100% { opacity: 0 } }
@keyframes si-a${i} { 0%, ${f(s + 8.6)}% { opacity: 0; transform: translateY(6px) } ${f(s + 10)}%, 100% { opacity: 1; transform: none } }
.si-p${i} { opacity: 0; animation: si-p${i} 24s linear infinite }
.si-r${i} { animation: si-r${i} 24s linear infinite }
.si-g${i} { animation: si-g${i} 24s ease-in-out infinite }
.si-q${i} { opacity: 0; animation: si-q${i} 24s cubic-bezier(.2,.7,.2,1) infinite }
.si-t${i} { opacity: 0; animation: si-t${i} 24s ease-in-out infinite }
.si-a${i} { opacity: 0; animation: si-a${i} 24s cubic-bezier(.2,.7,.2,1) infinite }`
}

const CSS = `
${Array.from({ length: SLOTS }, (_, i) => slotCss(i)).join("\n")}
@keyframes si-flow { to { stroke-dashoffset: -20 } }
@keyframes si-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes si-td { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-2px); opacity: 1 } }
@keyframes si-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.18) } }
.si-flow { stroke-dasharray: 3 6; animation: si-flow 1.6s linear infinite }
.si-float { animation: si-float 6s ease-in-out infinite }
.si-td { animation: si-td 1s ease-in-out infinite }
.si-pulse { animation: si-pulse 2s ease-in-out infinite }
@keyframes si-blink { 0%, 44%, 48%, 100% { transform: scaleY(1) } 46% { transform: scaleY(.12) } }
.si-blink { transform-box: fill-box; transform-origin: center; animation: si-blink 6s ease-in-out infinite }
@keyframes si-ant { 0%, 100% { opacity: .15; transform: scale(.85) } 50% { opacity: .45; transform: scale(1.25) } }
@keyframes si-eq { 0%, 100% { transform: scaleY(.3) } 50% { transform: scaleY(1) } }
@keyframes si-wave { 0%, 62%, 100% { transform: rotate(0) } 70% { transform: rotate(-16deg) } 78% { transform: rotate(6deg) } 86% { transform: rotate(-12deg) } 94% { transform: rotate(0) } }
.si-ant { transform-box: fill-box; transform-origin: center; animation: si-ant 2.4s ease-in-out infinite }
.si-eq { transform-box: fill-box; transform-origin: 50% 100%; animation: si-eq 1s ease-in-out infinite }
.si-wave { animation: si-wave 5s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .si-blink, .si-ant, .si-eq, .si-wave { animation: none }
  [class*="si-q"], [class*="si-a"], .si-p0 { animation: none; opacity: 1; transform: none }
  [class*="si-t"] { animation: none; opacity: 0 }
  .si-p1, .si-p2, .si-p3, .si-p4, .si-p5 { animation: none; opacity: 0 }
  [class*="si-r"], [class*="si-g"] { animation: none }
  .si-flow, .si-float, .si-td, .si-pulse { animation: none }
}
`

const NAVY = "#14233a"
const IG_BG = "linear-gradient(45deg,#f9ce34,#ee2a7b 55%,#6228d7)"
const MS_BG = "linear-gradient(135deg,#0099ff,#a033ff 60%,#ff5280)"
// small app icons, like a phone home screen: a rounded square in the app's own colour with a white glyph
const APP = "flex items-center justify-center text-white"
const BG = {
  email: "linear-gradient(135deg,#ffb020,#e08a00)",
  sms: "linear-gradient(135deg,#5ee27b,#1fae4b)",
  chat: "linear-gradient(135deg, color-mix(in oklch, var(--primary) 55%, white), var(--primary))",
  voice: "linear-gradient(135deg,#2c4a73,#14233a)",
  inbox: "linear-gradient(150deg, color-mix(in oklch, var(--primary) 60%, white), var(--primary) 55%, color-mix(in oklch, var(--primary) 70%, #062a22))",
}

// the glow colour of each channel's icon, and which slot (conversation) it belongs to
const GLOW = { instagram: "#ee2a7b", messenger: "#a033ff", chat: "#12b886", email: "#ffb020", sms: "#1fae4b", voice: "#4a7bd0" }

function Avatar({ size, skin, hair, shirt, bg }: { size: number; skin: string; hair: string; shirt: string; bg: string }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className="shrink-0 rounded-full" aria-hidden>
      <rect width="40" height="40" fill={bg} />
      <path d="M5 40 Q5 28 20 27 Q35 28 35 40Z" fill={shirt} />
      <rect x="17" y="22" width="6" height="7" rx="2" fill={skin} />
      <circle cx="20" cy="17" r="8.2" fill={skin} />
      <path d="M11.5 16 Q11 8 20 8 Q29 8 28.5 16 Q26 12 20 12.5 Q14 12 11.5 16Z" fill={hair} />
      <circle cx="17" cy="17.5" r="1" fill="#2a2230" /><circle cx="23" cy="17.5" r="1" fill="#2a2230" />
      <path d="M17.5 21 Q20 23.2 22.5 21" stroke="#b5654a" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function MessengerGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#fff" d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.39 0 01.002 11.64z" />
      <path fill="#8b4dff" d="M8.32 9.45l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z" />
    </svg>
  )
}

// one conversation per channel, in the order they play
const CONVOS = [
  { n: "Meera K.", c: "Instagram", t: "10:30 AM", u: 2, p: { skin: "#f2c9a8", hair: "#2a2230", shirt: "#f5b942", bg: "#fde9c8" }, b: IG_BG, q: "Is this available in size M?", a: "Yes, size M is in stock. Want me to hold one?" },
  { n: "Arjun D.", c: "Messenger", t: "10:28 AM", u: 1, p: { skin: "#e5b48c", hair: "#1c1a22", shirt: "#4aa3ff", bg: "#dbeaff" }, b: MS_BG, q: "Can I track my order here?", a: "Sure. Order #7734 is out for delivery today." },
  { n: "Farhan S.", c: "Chat", t: "10:20 AM", p: { skin: "#d9a07a", hair: "#2a2230", shirt: "#31a24c", bg: "#d8f1df" }, b: "var(--primary)", q: "Do you ship to Kochi?", a: "Yes, 2-3 day delivery to Kochi." },
  { n: "Priya N.", c: "Email", t: "10:15 AM", p: { skin: "#f2c9a8", hair: "#4a2a22", shirt: "#e0457b", bg: "#fbdbe6" }, b: "#e08a00", q: "Following up on ticket #204.", a: "Found it. Your refund has been processed." },
  { n: "Rahul V.", c: "SMS", t: "10:10 AM", p: { skin: "#e5b48c", hair: "#2a2230", shirt: "#7b4dff", bg: "#e6defc" }, b: "#1fae4b", q: "When does my plan renew?", a: "Your plan renews on the 1st of next month." },
  { n: "Kabir S.", c: "Voice", t: "10:05 AM", p: { skin: "#d9a07a", hair: "#1c1a22", shirt: "#14233a", bg: "#dfe6ea" }, b: NAVY, q: "Where is my order? (call)", a: "Out for delivery by 6 pm.", voice: true },
]

/* the inbox that sits on the monitor */
function InboxScreen({ w = 372, h = 242 }: { w?: number; h?: number }) {
  return (
    <div className="flex overflow-hidden rounded-[8px] bg-white text-[#14233a]" style={{ width: w, height: h }}>
      <div className="flex w-[40px] shrink-0 flex-col items-center gap-2 bg-primary py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-primary"><MessageCircle className="h-3.5 w-3.5" /></span>
        {[Inbox, Users, Timer, Star, Layers].map((I, i) => <span key={i} className={`flex h-6 w-6 items-center justify-center rounded-lg text-white ${i === 0 ? "bg-white/25" : "bg-white/10"}`}><I className="h-3 w-3" /></span>)}
      </div>
      <div className="w-[140px] shrink-0 border-r border-border bg-[#fafbfc]">
        <div className="m-1.5 flex items-center gap-1 rounded-md bg-white px-1.5 py-1 text-[8.5px] font-medium ring-1 ring-border"><Filter className="h-2.5 w-2.5 text-muted-foreground" />All Channels<ChevronDown className="ml-auto h-2.5 w-2.5 text-muted-foreground" /></div>
        {CONVOS.map((r, i) => (
          <div key={r.n} className={`si-r${i} flex items-center gap-1.5 px-1.5 py-[5px]`}>
            <span className="relative shrink-0"><Avatar size={24} {...r.p} /><i className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white" style={{ background: r.b }} /></span>
            <span className="min-w-0 flex-1 leading-tight"><span className="block truncate text-[9px] font-semibold">{r.n}</span><span className="block text-[8px] text-muted-foreground">{r.c}</span></span>
            <span className="flex flex-col items-end gap-0.5"><span className="text-[7px] text-muted-foreground">{r.t}</span>{r.u && <span className="si-pulse flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[7px] font-bold text-white">{r.u}</span>}</span>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col bg-[#f3f6f8]">
        <div className="relative min-h-0 flex-1">
          {CONVOS.map((c, i) => (
            <div key={c.n} className={`si-p${i} absolute inset-0 flex flex-col`}>
              <div className="flex items-center gap-1.5 border-b border-border bg-white px-2 py-1.5">
                <Avatar size={20} {...c.p} />
                <span className="leading-tight"><span className="block text-[9px] font-semibold">{c.n}</span><span className="flex items-center gap-1 text-[7.5px] text-muted-foreground">{c.voice && <Phone className="h-2 w-2" />}{c.voice ? "Voice call" : c.c}</span></span>
                <Check className="ml-auto h-3 w-3 text-muted-foreground" /><MoreVertical className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 px-2 py-2">
                <div className={`si-q${i} max-w-[82%] self-start rounded-lg rounded-tl-sm bg-white px-2 py-1 text-[8.5px] leading-snug shadow-sm`}>{c.q}<span className="mt-0.5 block text-right text-[6.5px] text-muted-foreground">{c.t}</span></div>
                <div className="relative max-w-[88%] self-end">
                  <div className={`si-t${i} absolute right-0 top-0 flex items-center gap-1 rounded-lg bg-primary/15 px-2 py-1.5`}><i className="si-td h-1 w-1 rounded-full bg-primary" /><i className="si-td h-1 w-1 rounded-full bg-primary" style={{ animationDelay: ".15s" }} /><i className="si-td h-1 w-1 rounded-full bg-primary" style={{ animationDelay: ".3s" }} /></div>
                  <div className={`si-a${i} rounded-lg rounded-tr-sm bg-primary/15 px-2 py-1 text-[8.5px] leading-snug`}>{c.a}<span className="mt-0.5 flex items-center justify-end gap-0.5 text-[6.5px] text-muted-foreground">{c.voice ? "Agent" : "AI agent"}<Check className="h-2 w-2 text-primary" /></span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="m-1.5 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[8px] text-muted-foreground ring-1 ring-border">Type a message…<Paperclip className="ml-auto h-2.5 w-2.5" /><span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white"><Send className="h-2 w-2" /></span></div>
      </div>
    </div>
  )
}

// the AI agent: a friendly headset robot. Shaded white head and body, a glossy navy visor with glowing mint eyes, a teal
// headset with a mic, a glowing antenna, a chest display with a live sound bar, and a waving arm.
function Robot() {
  return (
    <svg viewBox="0 0 80 110" className="h-[92px] w-[67px]" fill="none" aria-hidden>
      <defs>
        <linearGradient id="sr-head" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".6" stopColor="#f1f7f5" /><stop offset="1" stopColor="#d3e3de" /></linearGradient>
        <linearGradient id="sr-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#cddfd9" /></linearGradient>
        <linearGradient id="sr-visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2b4d78" /><stop offset="1" stopColor="#0e1c30" /></linearGradient>
        <linearGradient id="sr-cup" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="color-mix(in oklch, var(--primary) 55%, white)" /><stop offset="1" stopColor="color-mix(in oklch, var(--primary) 85%, #062a22)" /></linearGradient>
      </defs>
      {/* antenna */}
      <rect x="38.6" y="9" width="2.8" height="9" rx="1.4" fill="#cfe0db" />
      <circle className="si-ant" cx="40" cy="6.5" r="6" fill="var(--primary)" opacity=".25" />
      <circle cx="40" cy="6.5" r="3.8" fill="var(--primary)" /><circle cx="38.8" cy="5.3" r="1.2" fill="#fff" opacity=".85" />
      {/* the waving arm (behind the body edge) */}
      <g className="si-wave" style={{ transformBox: "view-box", transformOrigin: "62px 84px" }}>
        <rect x="60" y="62" width="9" height="26" rx="4.5" fill="url(#sr-body)" stroke="#cbddd7" strokeWidth=".8" />
        <circle cx="64.5" cy="61" r="5.4" fill="#fff" stroke="#cbddd7" strokeWidth=".8" />
      </g>
      {/* body */}
      <path d="M15 108 Q12 77 40 73 Q68 77 65 108Z" fill="url(#sr-body)" stroke="#cbddd7" strokeWidth="1" />
      <rect x="9" y="82" width="9" height="22" rx="4.5" fill="url(#sr-body)" stroke="#cbddd7" strokeWidth=".8" />
      <rect x="26" y="81" width="28" height="18" rx="6.5" fill="#15304f" />
      <g fill="#7ff0cf">
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} className="si-eq" x={31 + i * 4.6} y="86" width="2.4" height="8" rx="1.2" style={{ animationDelay: `${i * 0.18}s` }} />)}
      </g>
      <circle cx="40" cy="76.5" r="1.6" fill="var(--primary)" />
      {/* neck */}
      <rect x="33" y="64" width="14" height="10" rx="4" fill="#c7dad4" />
      {/* head */}
      <rect x="11" y="17" width="58" height="50" rx="25" fill="url(#sr-head)" stroke="#cbddd7" strokeWidth="1.1" />
      <path d="M22 25 Q40 17 58 25" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" opacity=".95" />
      {/* visor */}
      <rect x="18" y="26" width="44" height="32" rx="15" fill="url(#sr-visor)" />
      <path d="M23 33 Q31 28 44 28.5 L37 40 Q28 38 23 41Z" fill="#fff" opacity=".1" />
      <g className="si-blink" style={{ filter: "drop-shadow(0 0 3px rgba(127,240,207,.9))" }}>
        <path d="M27 43 q5 -8 10 0" stroke="#7ff0cf" strokeWidth="3.6" strokeLinecap="round" /><path d="M43 43 q5 -8 10 0" stroke="#7ff0cf" strokeWidth="3.6" strokeLinecap="round" />
      </g>
      <path d="M35 49.5 Q40 53.5 45 49.5" stroke="#7ff0cf" strokeWidth="2.8" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 3px rgba(127,240,207,.9))" }} />
      <ellipse cx="25.5" cy="49" rx="3.6" ry="2.3" fill="#ff9ab0" opacity=".5" /><ellipse cx="54.5" cy="49" rx="3.6" ry="2.3" fill="#ff9ab0" opacity=".5" />
      {/* headset */}
      <path d="M9 40 A31 31 0 0 1 71 40" stroke="url(#sr-cup)" strokeWidth="5.5" strokeLinecap="round" />
      <rect x="3" y="32" width="11" height="25" rx="5.5" fill="url(#sr-cup)" /><rect x="66" y="32" width="11" height="25" rx="5.5" fill="url(#sr-cup)" />
      <rect x="5.6" y="35" width="2.6" height="12" rx="1.3" fill="#fff" opacity=".5" /><rect x="68.6" y="35" width="2.6" height="12" rx="1.3" fill="#fff" opacity=".5" />
      <path d="M72 55 Q72 70 52 70" stroke="url(#sr-cup)" strokeWidth="2.6" strokeLinecap="round" /><circle cx="48.5" cy="70" r="4" fill="url(#sr-cup)" /><circle cx="47.3" cy="68.8" r="1.2" fill="#fff" opacity=".8" />
    </svg>
  )
}

// an app icon that lights up and glows while its own conversation is on screen
function AppIcon({ slot, glow, bg, size = 40, radius = 13, children }: { slot: number; glow: string; bg: string; size?: number; radius?: number; children: React.ReactNode }) {
  return <span className={`${APP} si-g${slot}`} style={{ width: size, height: size, borderRadius: radius, background: bg, boxShadow: BASE_SHADOW, ["--g" as string]: glow }}>{children}</span>
}

export function SocialInboxScene() {
  return (
    <div className="relative mx-auto w-full max-w-[580px] lg:h-full lg:min-h-[470px]">
      {/* ───────────── desktop stage ───────────── */}
      <div className="relative hidden h-[470px] translate-y-[38px] sm:block">
        <div className="pointer-events-none absolute left-1/2 top-[230px] h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_11%,white),transparent_66%)]" />

        {/* connectors */}
        <svg className="pointer-events-none absolute left-0 top-0 h-[470px] w-[580px]" viewBox="0 0 580 470" fill="none" aria-hidden>
          {[
            "M161 40 V52", "M239 40 V52", "M317 48 V52", "M395 40 V52", "M473 40 V52",
            "M54 123 H78", "M54 203 H78",
          ].map((d) => <path key={d} className="si-flow" d={d} stroke="var(--primary)" strokeOpacity=".6" strokeWidth="1.6" strokeLinecap="round" />)}
          {[[161, 52], [239, 52], [317, 52], [395, 52], [473, 52], [78, 123], [78, 203]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke="var(--primary)" strokeWidth="1.8" />)}
        </svg>

        {/* the monitor: 477 x 293, from x 78 to 555 and y 52 to 345; its screen is a 419 x 242 inbox scaled up 10% */}
        <div className="absolute" style={{ left: 288, top: 339, width: 58, height: 30, background: "linear-gradient(180deg,#dfe6ea,#c2ccd3)" }} />
        <div className="absolute rounded-[50%] shadow-[0_8px_10px_-4px_rgba(15,26,46,.3)]" style={{ left: 247, top: 364, width: 140, height: 12, background: "linear-gradient(180deg,#e6ecef,#b9c4cb)" }} />
        <div className="absolute rounded-[16px] bg-gradient-to-b from-[#eef2f4] to-[#c9d3d9] p-2 pb-[18px] shadow-[0_34px_46px_-22px_rgba(15,26,46,.5),inset_0_1px_0_#fff]" style={{ left: 78, top: 52, width: 477, height: 293 }}>
          <div className="origin-top-left scale-[1.1]"><InboxScreen w={419} h={242} /></div>
        </div>

        {/* app icons: only the channels named on the page. Each glows while its conversation is on the screen. */}
        <div className="si-float absolute" style={{ left: 141, top: 0 }}><AppIcon slot={3} glow={GLOW.email} bg={BG.email}><AtSign className="h-5 w-5" /></AppIcon></div>
        <div className="si-float absolute" style={{ left: 219, top: 0 }}><AppIcon slot={4} glow={GLOW.sms} bg={BG.sms}><MessageSquare className="h-5 w-5" /></AppIcon></div>
        <div className="si-float absolute" style={{ left: 375, top: 0 }}><AppIcon slot={2} glow={GLOW.chat} bg={BG.chat}><MessageCircle className="h-5 w-5" /></AppIcon></div>
        <div className="si-float absolute" style={{ left: 453, top: 0 }}><AppIcon slot={5} glow={GLOW.voice} bg={BG.voice}><Phone className="h-5 w-5" /></AppIcon></div>
        <div className="si-float absolute" style={{ left: 293, top: -4 }}><span className={APP} style={{ width: 48, height: 48, borderRadius: 15, background: BG.inbox, boxShadow: BASE_SHADOW }}><Inbox className="h-6 w-6" /></span></div>
        <div className="si-float absolute" style={{ left: 14, top: 103 }}><AppIcon slot={0} glow={GLOW.instagram} bg={IG_BG}><Instagram className="h-5 w-5" /></AppIcon></div>
        <div className="si-float absolute" style={{ left: 14, top: 183 }}><AppIcon slot={1} glow={GLOW.messenger} bg={MS_BG}><MessengerGlyph className="h-6 w-6" /></AppIcon></div>

        {/* the AI agent, standing at the bottom left beside the monitor, under the icon column, with a soft contact shadow */}
        <div className="absolute rounded-[50%] bg-[#14233a]/15 blur-[3px]" style={{ left: 18, top: 356, width: 46, height: 8 }} />
        <div className="absolute drop-shadow-[0_8px_8px_rgba(15,26,46,.22)]" style={{ left: 7, top: 266 }}><Robot /></div>
      </div>

      {/* ───────────── phone: the inbox, then the icons ───────────── */}
      <div className="flex flex-col items-center gap-4 sm:hidden">
        <div className="h-[222px] w-full max-w-[318px]"><div className="origin-top-left scale-[.85] overflow-hidden rounded-2xl bg-gradient-to-b from-[#eef2f4] to-[#c9d3d9] p-1.5 shadow-[0_26px_36px_-18px_rgba(15,26,46,.5)]" style={{ width: 374 }}><InboxScreen /></div></div>
        <div className="mt-6 flex w-full items-center justify-between px-1">
          <AppIcon slot={0} glow={GLOW.instagram} bg={IG_BG} size={44} radius={14}><Instagram className="h-5 w-5" /></AppIcon>
          <AppIcon slot={1} glow={GLOW.messenger} bg={MS_BG} size={44} radius={14}><MessengerGlyph className="h-6 w-6" /></AppIcon>
          <AppIcon slot={2} glow={GLOW.chat} bg={BG.chat} size={44} radius={14}><MessageCircle className="h-5 w-5" /></AppIcon>
          <AppIcon slot={5} glow={GLOW.voice} bg={BG.voice} size={44} radius={14}><Phone className="h-5 w-5" /></AppIcon>
          <AppIcon slot={4} glow={GLOW.sms} bg={BG.sms} size={44} radius={14}><MessageSquare className="h-5 w-5" /></AppIcon>
          <AppIcon slot={3} glow={GLOW.email} bg={BG.email} size={44} radius={14}><AtSign className="h-5 w-5" /></AppIcon>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
