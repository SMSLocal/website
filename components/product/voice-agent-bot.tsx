import { Check, MessageCircle, Mic, PhoneCall } from "lucide-react"

// Hero graphic for /voice-ai-agents: a 14-second, self-explaining loop. A step tracker, a running call
// timer and a caption say what is happening at every moment: 1 the old phone menu, 2 the caller just
// speaks, 3 the agent understands, 4 the agent acts. Silent, pure CSS.

const STEPS = [
  { label: "Old menu", s: 2, e: 26, cap: "The old way: callers press keys and wait on hold." },
  { label: "Caller speaks", s: 29, e: 50, cap: "The new way: the caller just says what they need." },
  { label: "Agent understands", s: 53, e: 72, cap: "The agent picks up the language and the request." },
  { label: "Agent acts", s: 75, e: 94, cap: "It checks the order, sends the link and saves the call." },
]
const TICKS = Array.from({ length: 40 }, (_, i) => i * 9)
const CHECKS = [
  { at: 76, t: "Checked order 7734: out for delivery" },
  { at: 82, t: "Sent the tracking link on WhatsApp" },
  { at: 88, t: "Saved the call summary to the inbox" },
]
const CHIPS = [
  { at: 54, k: "Language", v: "Hindi" },
  { at: 60, k: "Intent", v: "Order status" },
  { at: 66, k: "Order no.", v: "7734" },
]
const NOTES = [
  { l: 8, d: 0 },
  { l: 30, d: 1.1 },
  { l: 18, d: 2.2 },
]

const scene = (n: string, s: number, e: number, lift = true) =>
  `@keyframes ${n} { 0%, ${s - 2}% { opacity: 0${lift ? "; transform: translateY(10px) scale(.98)" : ""} } ${s}%, ${e}% { opacity: 1${lift ? "; transform: none" : ""} } ${e + 2}%, 100% { opacity: 0${lift ? "; transform: translateY(-10px) scale(.98)" : ""} } }`
const dotk = (n: string, s: number, e: number) =>
  `@keyframes ${n} { 0%, ${s - 1}% { background: var(--background); color: var(--muted-foreground); border-color: var(--border); transform: scale(1) } ${s}%, ${e}% { background: var(--primary); color: var(--primary-foreground); border-color: var(--primary); transform: scale(1.12) } ${e + 1}%, 100% { background: var(--background); color: var(--muted-foreground); border-color: var(--border); transform: scale(1) } }`
const textk = (n: string, s: number, e: number) =>
  `@keyframes ${n} { 0%, ${s - 1}% { color: var(--muted-foreground) } ${s}%, ${e}% { color: var(--foreground) } ${e + 1}%, 100% { color: var(--muted-foreground) } }`
const pop = (n: string, at: number) =>
  `@keyframes ${n} { 0%, ${at - 1}% { opacity: 0; transform: translateX(-14px) scale(.95) } ${at + 1.5}%, 94% { opacity: 1; transform: none } 97%, 100% { opacity: 0 } }`

const CSS = `
@property --vq-a { syntax: "<angle>"; initial-value: 0deg; inherits: false }
@property --vq-t { syntax: "<integer>"; initial-value: 0; inherits: false }
${STEPS.map((x, i) => scene(`vq-s${i}`, x.s, x.e) + dotk(`vq-d${i}`, x.s, x.e) + textk(`vq-t${i}`, x.s, x.e) + scene(`vq-c${i}`, x.s, x.e, false)).join("\n")}
${CHECKS.map((x, i) => pop(`vq-k${i}`, x.at)).join("\n")}
${CHIPS.map((x, i) => pop(`vq-p${i}`, x.at)).join("\n")}
@keyframes vq-spin { to { --vq-a: 360deg } }
@keyframes vq-count { to { --vq-t: 14 } }
@keyframes vq-fill { 0% { transform: scaleX(0) } 100% { transform: scaleX(1) } }
@keyframes vq-float { 0%, 100% { transform: translateY(-4px) } 50% { transform: translateY(5px) } }
@keyframes vq-halo { 0% { transform: scale(.55); opacity: .5 } 100% { transform: scale(1.35); opacity: 0 } }
@keyframes vq-strike { 0%, 8% { transform: scaleX(0) } 18%, 100% { transform: scaleX(1) } }
@keyframes vq-note { 0% { transform: translateY(28px) rotate(-8deg); opacity: 0 } 25% { opacity: 1 } 100% { transform: translateY(-34px) rotate(10deg); opacity: 0 } }
@keyframes vq-hold { 0%, 1% { opacity: 0 } 3%, 26% { opacity: 1 } 29%, 100% { opacity: 0 } }
@keyframes vq-quote { 0%, 28% { opacity: 0 } 29%, 94% { opacity: 1 } 97%, 100% { opacity: 0 } }
@keyframes vq-type { 0%, 30% { width: 0 } 45%, 100% { width: 100% } }
@keyframes vq-caret { 0%, 29% { border-color: transparent } 30%, 47% { border-color: var(--primary) } 48%, 100% { border-color: transparent } }
@keyframes vq-orbit { to { transform: rotate(360deg) } }
@keyframes vq-orbit-r { to { transform: rotate(-360deg) } }
@keyframes vq-voice { 0%, 100% { transform: scale(1) } 18% { transform: scale(1.07) } 34% { transform: scale(.98) } 52% { transform: scale(1.1) } 70% { transform: scale(1.01) } 86% { transform: scale(1.06) } }
@keyframes vq-tick { 0%, 100% { opacity: .25; transform: scaleY(.6) } 50% { opacity: 1; transform: scaleY(1.25) } }
@keyframes vq-ticks { to { transform: rotate(360deg) } }
@keyframes vq-rip { 0% { transform: scale(1); opacity: .7 } 100% { transform: scale(2.2); opacity: 0 } }
@keyframes vq-scan { 0%, 52% { transform: scaleX(0); opacity: 0 } 54% { opacity: 1 } 66% { transform: scaleX(1); opacity: 1 } 72%, 100% { transform: scaleX(1); opacity: 0 } }
@keyframes vq-sheen { 0% { transform: translateX(-120%) } 100% { transform: translateX(260%) } }
@keyframes vq-fly { 0%, 82% { opacity: 0; transform: translate(0, 0) scale(.6) } 84% { opacity: 1; transform: translate(0, 0) scale(1) } 92% { opacity: 1; transform: translate(70px, -26px) scale(1) } 95%, 100% { opacity: 0; transform: translate(96px, -40px) scale(.8) } }
@keyframes vq-done { 0%, 90% { opacity: 0; transform: scale(.6) } 93%, 96% { opacity: 1; transform: scale(1) } 99%, 100% { opacity: 0; transform: scale(.9) } }
@keyframes vq-blink { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
@keyframes vq-dots { 0%, 100% { opacity: .25 } 50% { opacity: 1 } }
${STEPS.map((_, i) => `.vq-s${i} { opacity: 0; animation: vq-s${i} 14s ease-in-out infinite } .vq-c${i} { opacity: 0; animation: vq-c${i} 14s ease-in-out infinite } .vq-d${i} { animation: vq-d${i} 14s ease-out infinite } .vq-t${i} { animation: vq-t${i} 14s linear infinite }`).join("\n")}
${CHECKS.map((_, i) => `.vq-k${i} { opacity: 0; animation: vq-k${i} 14s ease-out infinite }`).join("\n")}
${CHIPS.map((_, i) => `.vq-p${i} { opacity: 0; animation: vq-p${i} 14s ease-out infinite }`).join("\n")}
.vq-edge { background: conic-gradient(from var(--vq-a), transparent 0 55%, oklch(0.8 0.13 168) 72%, oklch(0.7 0.15 250) 84%, oklch(0.8 0.15 75) 92%, transparent 100%); animation: vq-spin 6s linear infinite }
.vq-card { animation: vq-float 7s ease-in-out infinite; will-change: transform }
.vq-halo { animation: vq-halo 5.4s ease-out infinite }
.vq-timer { animation: vq-count 14s steps(14) infinite; counter-reset: vqs var(--vq-t) }
.vq-timer::after { content: "00:" counter(vqs, decimal-leading-zero) }
.vq-fill { transform-origin: left; animation: vq-fill 14s linear infinite }
.vq-strike { transform-origin: left; animation: vq-strike 14s ease-out infinite }
.vq-note { opacity: 0; animation: vq-note 3.3s ease-in-out infinite }
.vq-hold { opacity: 0; animation: vq-hold 14s linear infinite }
.vq-quote { opacity: 0; animation: vq-quote 14s linear infinite }
.vq-type { width: 0; border-right: 2px solid transparent; animation: vq-type 14s steps(19) infinite, vq-caret 14s linear infinite }
.vq-orb { animation: vq-voice 2.4s ease-in-out infinite }
.vq-o1 { animation: vq-orbit 5s linear infinite }
.vq-o2 { animation: vq-orbit-r 6.5s linear infinite }
.vq-o3 { animation: vq-orbit 8s linear infinite }
.vq-tick { transform-box: fill-box; transform-origin: 50% 100%; animation: vq-tick 1.1s ease-in-out infinite }
.vq-ticks { animation: vq-ticks 24s linear infinite }
.vq-rip { animation: vq-rip 2.2s ease-out infinite }
.vq-scan { transform-origin: left; opacity: 0; animation: vq-scan 14s ease-in-out infinite }
.vq-sheen { animation: vq-sheen 2.6s ease-in-out infinite }
.vq-fly { opacity: 0; animation: vq-fly 14s ease-in-out infinite }
.vq-done { opacity: 0; animation: vq-done 14s ease-out infinite }
.vq-blink { animation: vq-blink 1.4s ease-in-out infinite }
.vq-dots i { animation: vq-dots 1.2s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .vq-edge, .vq-card, .vq-halo, .vq-timer, .vq-fill, .vq-strike, .vq-note, .vq-hold, .vq-quote, .vq-type, .vq-caret, .vq-orb, .vq-o1, .vq-o2, .vq-o3, .vq-tick, .vq-ticks, .vq-rip, .vq-scan, .vq-sheen, .vq-fly, .vq-done, .vq-blink, .vq-dots i { animation: none }
  .vq-s0, .vq-c0 { animation: none; opacity: 1 }
  .vq-s1, .vq-s2, .vq-s3, .vq-c1, .vq-c2, .vq-c3, .vq-k0, .vq-k1, .vq-k2, .vq-p0, .vq-p1, .vq-p2 { animation: none; opacity: 0 }
  .vq-d0, .vq-d1, .vq-d2, .vq-d3, .vq-t0, .vq-t1, .vq-t2, .vq-t3 { animation: none }
  .vq-strike { transform: scaleX(1) }
  .vq-halo, .vq-note { display: none }
}
`

export function VoiceAgentBot() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      {/* soft sound rings behind the card */}
      {[0, 1.8, 3.6].map((d) => (
        <span key={d} aria-hidden className="vq-halo pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" style={{ animationDelay: `${d}s` }} />
      ))}

      <div className="vq-card">
        {/* a light that runs round the edge of the card */}
        <div className="vq-edge rounded-[30px] p-[2px]">
          <div className="rounded-[28px] bg-background px-6 pb-6 pt-6 shadow-[0_24px_60px_-34px_rgba(15,26,46,.35)]">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="flex items-center gap-2"><PhoneCall className="h-3.5 w-3.5 text-primary" /><span className="vq-blink h-1.5 w-1.5 rounded-full bg-primary" />Incoming call</span>
              <span className="flex items-center gap-3">Hindi · English<span className="vq-timer tabular-nums text-foreground" /></span>
            </div>

            {/* step tracker with a bar that fills across the loop */}
            <ol className="relative mt-5 grid grid-cols-4 gap-1">
              <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[13px] h-[2px] rounded-full bg-border" />
              <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[13px] h-[2px] overflow-hidden rounded-full"><span className="vq-fill block h-full w-full bg-primary" /></span>
              {STEPS.map((x, i) => (
                <li key={x.label} className="relative flex flex-col items-center text-center">
                  <span className={`vq-d${i} relative flex h-[26px] w-[26px] items-center justify-center rounded-full border font-mono text-[11px] font-semibold`}>{i + 1}</span>
                  <span className={`vq-t${i} mt-1.5 text-[11.5px] font-medium leading-tight`}>{x.label}</span>
                </li>
              ))}
            </ol>

            {/* what the caller says (on hold first, then the words appear) */}
            <div className="relative mt-5 flex h-[38px] items-center justify-center">
              <p className="vq-hold absolute inset-0 flex items-center justify-center gap-2 text-[14px] text-muted-foreground">
                On hold <span className="vq-dots flex gap-[3px]"><i className="h-1 w-1 rounded-full bg-current" /><i className="h-1 w-1 rounded-full bg-current" style={{ animationDelay: ".2s" }} /><i className="h-1 w-1 rounded-full bg-current" style={{ animationDelay: ".4s" }} /></span>
              </p>
              <p className="vq-quote relative text-[19px] font-medium text-foreground">
                <span className="vq-type inline-block overflow-hidden whitespace-nowrap align-bottom">“Where is my order?”</span>
                    <span className="vq-scan absolute -bottom-1 left-0 h-[2px] w-full bg-primary/70" />
              </p>
            </div>

            {/* the stage: one scene at a time */}
            <div className="relative mt-3 h-[150px]">
              {/* 1 · the old menu, with hold music floating up */}
              <div className="vq-s0 absolute inset-0 flex flex-col justify-center gap-2.5 pl-4 text-[17px] text-muted-foreground">
                {["Press 1 for sales", "Press 2 for support", "Press 3 for billing"].map((t, i) => (
                  <p key={t} className="relative w-fit">
                    {t}
                    <span className="vq-strike absolute left-0 top-1/2 h-[2px] w-full bg-foreground" style={{ animationDelay: `${i * 0.25}s` }} />
                  </p>
                ))}
                <span aria-hidden className="absolute bottom-3 right-6 h-[90px] w-[60px]">
                  {NOTES.map((n) => (
                    <span key={n.l} className="vq-note absolute bottom-0 text-[22px] text-foreground/40" style={{ left: n.l, animationDelay: `${n.d}s` }}>♪</span>
                  ))}
                </span>
              </div>

              {/* 2 · the caller speaks: a light "aurora" orb that breathes with the voice */}
              <div className="vq-s1 absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 150 150" aria-hidden className="vq-ticks absolute h-[150px] w-[150px]">
                  {TICKS.map((r, i) => (
                    <g key={r} transform={`rotate(${r} 75 75)`}>
                      <line className="vq-tick" style={{ animationDelay: `${-(i % 8) * 0.14}s` }} x1="75" y1="3" x2="75" y2={i % 2 ? 9 : 12} stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                  ))}
                </svg>
                <span aria-hidden className="vq-rip absolute h-[104px] w-[104px] rounded-full border-2 border-primary/40" />
                <span aria-hidden className="vq-rip absolute h-[104px] w-[104px] rounded-full border-2 border-primary/40" style={{ animationDelay: "1.1s" }} />
                <span className="vq-orb relative flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-full bg-[oklch(0.62_0.13_170)] shadow-[0_18px_40px_-14px_oklch(0.55_0.13_172/0.7)]">
                  <span aria-hidden className="vq-o1 absolute inset-0"><i className="absolute left-[-6px] top-[8px] h-[70px] w-[70px] rounded-full bg-[oklch(0.82_0.14_168)] blur-[14px]" /></span>
                  <span aria-hidden className="vq-o2 absolute inset-0"><i className="absolute bottom-[-4px] right-[-6px] h-[74px] w-[74px] rounded-full bg-[oklch(0.7_0.15_235)] blur-[16px]" /></span>
                  <span aria-hidden className="vq-o3 absolute inset-0"><i className="absolute right-[10px] top-[-10px] h-[56px] w-[56px] rounded-full bg-[oklch(0.86_0.13_85)] opacity-80 blur-[14px]" /></span>
                  <span aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,.55),transparent_52%)]" />
                  <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />
                  <Mic className="relative h-8 w-8 text-white drop-shadow-[0_2px_6px_rgba(0,60,50,.35)]" strokeWidth={1.9} />
                </span>
              </div>

              {/* 3 · the agent understands */}
              <div className="vq-s2 absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                {CHIPS.map((c, i) => (
                  <p key={c.k} className={`vq-p${i} relative flex w-[240px] items-center justify-between overflow-hidden rounded-full bg-primary/10 px-4 py-2 text-[13.5px]`}>
                    <span aria-hidden className="vq-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent" style={{ animationDelay: `${i * 0.4}s` }} />
                    <span className="relative text-muted-foreground">{c.k}</span><span className="relative font-semibold text-primary">{c.v}</span>
                  </p>
                ))}
              </div>

              {/* 4 · the agent acts */}
              <div className="vq-s3 absolute inset-0">
                <ul className="absolute inset-0 flex flex-col justify-center gap-3 pl-1">
                  {CHECKS.map((c, i) => (
                    <li key={c.t} className={`vq-k${i} flex items-center gap-3 text-[14.5px] font-medium text-foreground`}>
                      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.6} /></span>
                      {c.t}
                    </li>
                  ))}
                </ul>
                <span aria-hidden className="vq-fly absolute left-[250px] top-[62px] flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.7_0.17_150)] text-white shadow-md"><MessageCircle className="h-4 w-4" strokeWidth={2.2} /></span>
                <span className="vq-done absolute right-1 top-1 rounded-full bg-primary px-3 py-1 text-[11.5px] font-semibold text-primary-foreground">Resolved · no handoff</span>
              </div>
            </div>

            {/* a plain-words caption for every moment */}
            <div className="relative mt-2 h-[44px] border-t border-border pt-3">
              {STEPS.map((x, i) => (
                <p key={x.label} className={`vq-c${i} absolute inset-x-0 top-3 text-center text-[13.5px] leading-snug text-foreground`}>
                  <span className="mr-1.5 font-mono text-[11px] text-primary">{i + 1}/4</span>{x.cap}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{CSS}</style>
    </div>
  )
}
