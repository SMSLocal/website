import { Bot, Check, Megaphone, MessageSquare, Phone, Sparkles } from "lucide-react"

// Hero graphic for /platform: "everything in one place". A tilted 3D app window shows the shared inbox
// (a WhatsApp question answered by AI), surrounded by floating tiles for the real channels and badges for
// the platform's modules, all at different depths so they drift as the scene sways. No SVG shapes to read:
// logos, names and a live chat make it obvious. Plain HTML + CSS 3D, 12-second loop, silent.

type Tile = { n: string; x: number; y: number; z: number; src?: string; I?: typeof Phone; c?: string; d: number }
const TILES: Tile[] = [
  { n: "WhatsApp", x: 18, y: 64, z: 110, src: "/logos/channels/whatsapp.svg", d: 0 },
  { n: "SMS", x: 6, y: 168, z: 60, I: MessageSquare, c: "#F5A300", d: 1.1 },
  { n: "Voice", x: 22, y: 270, z: 130, I: Phone, c: "#34A853", d: 2.2 },
  { n: "RCS", x: 176, y: 8, z: 90, src: "/logos/channels/google-messages.svg", d: 0.6 },
  { n: "Email", x: 332, y: 14, z: 130, src: "/logos/channels/gmail.svg", d: 1.7 },
  { n: "Instagram", x: 484, y: 62, z: 100, src: "/logos/channels/instagram.svg", d: 2.6 },
  { n: "Messenger", x: 492, y: 172, z: 60, src: "/logos/channels/messenger.svg", d: 0.9 },
]
const PILLS = [
  { t: "AI agents", I: Bot, x: 96, y: 372, z: 120, d: 0.3 },
  { t: "Copilot", I: Sparkles, x: 262, y: 392, z: 70, d: 1.4 },
  { t: "Broadcasting", I: Megaphone, x: 372, y: 360, z: 130, d: 2.1 },
]

const CSS = `
@keyframes sc-sway { 0%, 100% { transform: rotateX(7deg) rotateY(-15deg) } 50% { transform: rotateX(5deg) rotateY(-9deg) } }
@keyframes sc-bob { 0%, 100% { transform: translateY(-5px) } 50% { transform: translateY(6px) } }
@keyframes sc-q { 0%, 6% { opacity: 0; transform: translateY(10px) scale(.97) } 11%, 90% { opacity: 1; transform: none } 96%, 100% { opacity: 0 } }
@keyframes sc-typing { 0%, 22% { opacity: 0 } 25%, 36% { opacity: 1 } 38%, 100% { opacity: 0 } }
@keyframes sc-a { 0%, 37% { opacity: 0; transform: translateY(10px) scale(.97) } 43%, 90% { opacity: 1; transform: none } 96%, 100% { opacity: 0 } }
@keyframes sc-ok { 0%, 54% { opacity: 0; transform: scale(.8) } 58%, 90% { opacity: 1; transform: none } 96%, 100% { opacity: 0 } }
@keyframes sc-new { 0%, 66% { opacity: 0; transform: translateX(-16px) } 72%, 90% { opacity: 1; transform: none } 96%, 100% { opacity: 0 } }
@keyframes sc-toast { 0%, 66% { opacity: 0; transform: translateY(-14px) scale(.96) } 70%, 80% { opacity: 1; transform: none } 85%, 100% { opacity: 0; transform: translateY(-8px) scale(.98) } }
@keyframes sc-pingA { 0%, 5% { opacity: 0; transform: scale(1) } 6% { opacity: .8 } 14%, 100% { opacity: 0; transform: scale(1.55) } }
@keyframes sc-pingB { 0%, 64% { opacity: 0; transform: scale(1) } 65% { opacity: .8 } 74%, 100% { opacity: 0; transform: scale(1.55) } }
@keyframes sc-pill { 0%, 35% { box-shadow: 0 0 0 0 transparent } 40%, 52% { box-shadow: 0 0 0 4px color-mix(in oklch, var(--primary) 22%, transparent) } 58%, 100% { box-shadow: 0 0 0 0 transparent } }
@keyframes sc-sla { 0%, 6% { transform: scaleX(0); opacity: 1 } 38% { transform: scaleX(.78); opacity: 1 } 44%, 90% { transform: scaleX(.78); opacity: 1 } 96%, 100% { transform: scaleX(0); opacity: 0 } }
@keyframes sc-n12 { 0%, 70% { opacity: 1; transform: none } 74%, 94% { opacity: 0; transform: translateY(-8px) } 98%, 100% { opacity: 1; transform: none } }
@keyframes sc-n13 { 0%, 70% { opacity: 0; transform: translateY(8px) } 74%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0; transform: translateY(8px) } }
@keyframes sc-dots { 0%, 100% { opacity: .3 } 50% { opacity: 1 } }
@keyframes sc-live { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
@keyframes sc-blob { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(14px, -10px) } }
.sc-stage { perspective: 1500px; perspective-origin: 50% 45% }
.sc-scene { transform-style: preserve-3d; animation: sc-sway 12s ease-in-out infinite }
.sc-bob { animation: sc-bob 5s ease-in-out infinite }
.sc-q { opacity: 0; animation: sc-q 12s cubic-bezier(.2,.7,.2,1) infinite }
.sc-typing { opacity: 0; animation: sc-typing 12s linear infinite }
.sc-a { opacity: 0; animation: sc-a 12s cubic-bezier(.2,.7,.2,1) infinite }
.sc-ok { opacity: 0; animation: sc-ok 12s ease-out infinite }
.sc-new { opacity: 0; animation: sc-new 12s cubic-bezier(.2,.7,.2,1) infinite }
.sc-toast { opacity: 0; animation: sc-toast 12s cubic-bezier(.2,.7,.2,1) infinite }
.sc-pingA, .sc-pingB { opacity: 0; transform-origin: center }
.sc-pingA { animation: sc-pingA 12s ease-out infinite }
.sc-pingB { animation: sc-pingB 12s ease-out infinite }
.sc-pill { animation: sc-pill 12s ease-in-out infinite }
.sc-sla { transform: scaleX(0); animation: sc-sla 12s cubic-bezier(.4,0,.2,1) infinite }
.sc-n12 { animation: sc-n12 12s ease-in-out infinite }
.sc-n13 { opacity: 0; animation: sc-n13 12s ease-in-out infinite }
.sc-dots i { animation: sc-dots 1s ease-in-out infinite }
.sc-live { animation: sc-live 1.4s ease-in-out infinite }
.sc-blob { animation: sc-blob 9s ease-in-out infinite }

/* designed at 560px wide, scaled down on phones */
.sc-wrap { position: relative; width: 560px; height: 450px }
@media (max-width: 639px) { .sc-wrap { width: 100%; max-width: 360px; height: 292px; margin: 0 auto } .sc-fit { transform: scale(.64); transform-origin: top left } }
@media (min-width: 400px) and (max-width: 639px) { .sc-wrap { max-width: 392px; height: 318px } .sc-fit { transform: scale(.7) } }
@media (prefers-reduced-motion: reduce) {
  .sc-scene, .sc-bob, .sc-dots i, .sc-live, .sc-blob { animation: none }
  .sc-scene { transform: rotateX(8deg) rotateY(-15deg) }
  .sc-q, .sc-a, .sc-ok, .sc-new { animation: none; opacity: 1 } .sc-typing, .sc-toast { opacity: 0; animation: none }
  .sc-pingA, .sc-pingB, .sc-pill, .sc-n12 { animation: none } .sc-sla { animation: none; transform: scaleX(.78) } .sc-n13 { animation: none; opacity: 0 }
}
`

export function PlatformScene() {
  return (
    <div className="mx-auto max-w-full">
      <div className="sc-wrap">
        <div className="sc-fit relative h-[450px] w-[560px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <span className="sc-blob absolute -left-8 top-[52%] h-[220px] w-[220px] rounded-full bg-primary/20 blur-[70px]" />
            <span className="sc-blob absolute -right-6 top-0 h-[220px] w-[220px] rounded-full bg-[oklch(0.74_0.14_250)]/20 blur-[70px]" style={{ animationDelay: "-4s" }} />
            <span className="sc-blob absolute bottom-0 right-16 h-[170px] w-[170px] rounded-full bg-[oklch(0.85_0.14_80)]/25 blur-[70px]" style={{ animationDelay: "-7s" }} />
          </div>

          <div className="sc-stage absolute inset-0">
            <div className="sc-scene absolute inset-0">
              {/* the app window, standing in the middle */}
              <div className="absolute left-[88px] top-[84px] h-[280px] w-[392px] overflow-hidden rounded-[16px] border border-border bg-background shadow-[0_40px_80px_-30px_rgba(15,26,46,.4)]" style={{ transform: "translateZ(0)" }}>
                <div className="flex h-[34px] items-center gap-1.5 border-b border-border bg-secondary px-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" /><span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-[12px] font-semibold text-foreground">SMSLocal <span className="font-normal text-muted-foreground">· Shared inbox</span></span>
                  <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    AI replies
                    <span className="relative h-[14px] w-[24px] rounded-full bg-primary"><span className="absolute right-[2px] top-[2px] h-[10px] w-[10px] rounded-full bg-white" /></span>
                  </span>
                </div>
                <div className="grid h-[246px] grid-cols-[132px_1fr]">
                  {/* conversation list */}
                  <ul className="overflow-hidden border-r border-border bg-secondary/40">
                    <li className="flex h-6 items-center justify-between border-b border-border px-2.5 text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Open chats
                      <span className="relative h-3.5 w-5 overflow-hidden text-right text-foreground"><span className="sc-n12 absolute inset-0">12</span><span className="sc-n13 absolute inset-0 text-primary">13</span></span>
                    </li>
                    <li className="sc-new flex items-center gap-2 border-b border-border bg-primary/8 px-2.5 py-2">
                      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[oklch(0.92_0.06_250)] text-[11px] font-semibold text-[oklch(0.4_0.12_250)]">K
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logos/channels/google-messages.svg" alt="" width={11} height={11} className="absolute -bottom-0.5 -right-0.5 h-[11px] w-[11px] rounded-full bg-white p-[1px] ring-2 ring-white" />
                      </span>
                      <span className="min-w-0 flex-1 leading-tight"><span className="flex items-center justify-between"><span className="truncate text-[11.5px] font-semibold">Karan V.</span><span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">1</span></span><span className="block truncate text-[10.5px] text-muted-foreground">Confirm my booking</span></span>
                    </li>
                    {[
                      { n: "Isha M.", p: "Where is my order?", t: "10:42", src: "/logos/channels/whatsapp.svg", on: true, bg: "oklch(0.93 0.07 150)", fg: "oklch(0.4 0.12 150)" },
                      { n: "Rahul S.", p: "Invoice for last month", t: "10:38", src: "/logos/channels/gmail.svg", on: false, bg: "oklch(0.93 0.06 20)", fg: "oklch(0.45 0.14 20)" },
                      { n: "Neha P.", p: "Is this in stock?", t: "10:31", src: "/logos/channels/messenger.svg", on: false, bg: "oklch(0.93 0.07 80)", fg: "oklch(0.45 0.1 80)" },
                    ].map((r) => (
                      <li key={r.n} className={`flex items-center gap-2 border-b border-border px-2.5 py-2 ${r.on ? "border-l-2 border-l-primary bg-background" : ""}`}>
                        <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold" style={{ background: r.bg, color: r.fg }}>{r.n[0]}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.src} alt="" width={11} height={11} className="absolute -bottom-0.5 -right-0.5 h-[11px] w-[11px] rounded-full bg-white p-[1px] ring-2 ring-white" />
                        </span>
                        <span className="min-w-0 flex-1 leading-tight"><span className="flex items-center justify-between"><span className="truncate text-[11.5px] font-semibold">{r.n}</span><span className="text-[9px] text-muted-foreground">{r.t}</span></span><span className="block truncate text-[10.5px] text-muted-foreground">{r.p}</span></span>
                      </li>
                    ))}
                  </ul>

                  {/* open conversation */}
                  <div className="flex min-w-0 flex-col">
                    <div className="relative flex h-9 shrink-0 items-center gap-2 border-b border-border px-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logos/channels/whatsapp.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
                      <span className="text-[12px] font-semibold">Isha M.</span>
                      <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[9.5px] font-medium text-muted-foreground">Order #1042</span>
                      <span aria-hidden className="sc-sla absolute -bottom-px left-0 h-[2px] w-full origin-left bg-primary" />
                    </div>
                    <div className="relative flex-1 px-3 pt-3">
                      <p className="sc-q w-fit max-w-[88%] rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-[12px] leading-snug">Where is my order #1042?<span className="ml-2 align-bottom text-[9px] text-muted-foreground">10:42</span></p>
                      <div className="relative mt-2.5 h-[78px]">
                        <p className="sc-typing sc-dots absolute right-0 top-0 flex w-12 items-center justify-center gap-1 rounded-2xl rounded-tr-sm bg-primary/15 py-2.5"><i className="h-1.5 w-1.5 rounded-full bg-primary" /><i className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animationDelay: ".15s" }} /><i className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animationDelay: ".3s" }} /></p>
                        <div className="sc-a absolute right-0 top-0 max-w-[92%]">
                          <p className="mb-1 flex items-center justify-end gap-1 text-[9.5px] font-semibold text-primary"><Sparkles className="h-3 w-3" />Captain AI</p>
                          <p className="rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-[12px] leading-snug text-primary-foreground">It arrives tomorrow. Track it here: smsl.in/t/1042<span className="ml-2 inline-flex items-center gap-0.5 align-bottom text-[9px] text-primary-foreground/80">10:42 <Check className="h-2.5 w-2.5" strokeWidth={3} /></span></p>
                        </div>
                      </div>
                    </div>
                    <div className="sc-ok flex h-9 shrink-0 items-center border-t border-border px-3">
                      <span className="flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-[10.5px] font-semibold text-primary"><Check className="h-3 w-3" strokeWidth={3.4} />Resolved by AI</span>
                    </div>
                  </div>
                </div>

                {/* in-app notification that slides down when a new chat arrives */}
                <div className="sc-toast pointer-events-none absolute bottom-[5px] right-2 flex w-[136px] items-center gap-2 rounded-xl bg-foreground px-2.5 py-1.5 text-background shadow-[0_14px_30px_-10px_rgba(15,26,46,.5)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logos/channels/google-messages.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0 rounded-md bg-white p-[2px]" />
                  <span className="min-w-0 leading-tight"><span className="block text-[10.5px] font-semibold">New chat</span><span className="block truncate text-[9.5px] text-background/70">Karan V. · RCS</span></span>
                </div>
              </div>

              {/* channel tiles, floating in front of the window at different depths */}
              {TILES.map((t) => (
                <div key={t.n} className="absolute" style={{ left: t.x, top: t.y, transform: `translateZ(${t.z}px)` }}>
                  <div className="sc-bob flex flex-col items-center gap-1.5" style={{ animationDelay: `${t.d}s` }}>
                    <span className="relative flex h-[58px] w-[58px] items-center justify-center rounded-[18px] border border-border bg-background shadow-[0_22px_34px_-14px_rgba(15,26,46,.4)]">
                      {t.n === "WhatsApp" ? <i aria-hidden className="sc-pingA absolute inset-0 rounded-[18px] border-2 border-primary" /> : t.n === "RCS" ? <i aria-hidden className="sc-pingB absolute inset-0 rounded-[18px] border-2 border-primary" /> : null}
                      {t.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.src} alt={`${t.n} logo`} width={30} height={30} className="h-[30px] w-[30px] object-contain" />
                      ) : t.I ? (
                        <t.I className="h-[30px] w-[30px]" strokeWidth={1.8} style={{ color: t.c }} aria-label={t.n} />
                      ) : null}
                    </span>
                    <span className="text-[11.5px] font-semibold text-foreground">{t.n}</span>
                  </div>
                </div>
              ))}

              {/* module badges */}
              {PILLS.map((p) => (
                <div key={p.t} className="absolute" style={{ left: p.x, top: p.y, transform: `translateZ(${p.z}px)` }}>
                  <div className={`sc-bob flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 ${p.t === "AI agents" ? "sc-pill" : ""} shadow-[0_20px_32px_-14px_rgba(15,26,46,.4)]`} style={{ animationDelay: `${p.d}s` }}>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary"><p.I className="h-3.5 w-3.5" strokeWidth={2.2} /></span>
                    <span className="text-[13px] font-semibold text-foreground">{p.t}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
