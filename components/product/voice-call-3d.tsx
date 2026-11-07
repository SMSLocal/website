import { Check, Sparkles } from "lucide-react"

// Hero graphic for /voice-ai-agents: a call being answered by AI, shown as it happens.
// Centre: a phone on a live call (Captain AI answering, a running timer, a live waveform, mute / end / speaker).
// Left: a tilted glass card builds the live transcript line by line, in Hindi with English subtitles.
// Right: a glass card fills in the call summary once the call is done. HTML + CSS, flat colours, silent, 14s loop.

const BARS = 15
const h = (i: number) => 6 + Math.round(28 * Math.abs(Math.sin(i * 0.9 + 0.5) * Math.cos(i * 0.37)))

const TRANSCRIPT = [
  { who: "Rohan", t: "मेरा ऑर्डर कहाँ है?", en: "Where is my order #1042?", s: 14, ai: false },
  { who: "Captain", t: "आज ही शिप होगा। ट्रैकिंग भेजूँ?", en: "It ships today. Send tracking?", s: 27, ai: true },
  { who: "Rohan", t: "हाँ, भेज दीजिए।", en: "Yes, please send it.", s: 41, ai: false },
  { who: "Captain", t: "WhatsApp पर भेज दिया।", en: "Sent on WhatsApp.", s: 54, ai: true },
]
const SUMMARY = [
  { t: "Order #1042 located", s: 71 },
  { t: "Tracking sent on WhatsApp", s: 75 },
  { t: "Logged in HubSpot", s: 79 },
  { t: "Customer sentiment: positive", s: 83 },
]

const CSS = `
@property --cl-t { syntax: "<integer>"; initial-value: 0; inherits: false }
${TRANSCRIPT.map((l, i) => `@keyframes cl-l${i} { 0%, ${l.s}% { opacity: 0; transform: translateY(8px) } ${l.s + 3}%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0 } }
.cl-l${i} { opacity: 0; animation: cl-l${i} 14s cubic-bezier(.2,.7,.2,1) infinite }`).join("\n")}
${SUMMARY.map((l, i) => `@keyframes cl-s${i} { 0%, ${l.s}% { opacity: 0; transform: translateX(8px) } ${l.s + 3}%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0 } }
.cl-s${i} { opacity: 0; animation: cl-s${i} 14s cubic-bezier(.2,.7,.2,1) infinite }`).join("\n")}
@keyframes cl-timer { 0%, 10% { --cl-t: 0 } 90%, 100% { --cl-t: 38 } }
@keyframes cl-ring { 0% { transform: scale(.7); opacity: .6 } 100% { transform: scale(1.9); opacity: 0 } }
@keyframes cl-ringwin { 0%, 9% { opacity: 1 } 11%, 100% { opacity: 0 } }
@keyframes cl-conn { 0%, 9% { opacity: 0 } 12%, 93% { opacity: 1 } 97%, 100% { opacity: 0 } }
@keyframes cl-incoming { 0%, 8% { opacity: 1 } 11%, 100% { opacity: 0 } }
@keyframes cl-bar { 0%, 100% { transform: scaleY(.3) } 50% { transform: scaleY(1) } }
@keyframes cl-callerwin { 0%, 12% { opacity: 0 } 14%, 24% { opacity: 1 } 26%, 38% { opacity: 0 } 41%, 50% { opacity: 1 } 52%, 100% { opacity: 0 } }
@keyframes cl-aiwin { 0%, 25% { opacity: 0 } 27%, 38% { opacity: 1 } 40%, 52% { opacity: 0 } 54%, 66% { opacity: 1 } 68%, 100% { opacity: 0 } }
@keyframes cl-card { 0%, 11% { opacity: 0; transform: translateX(-14px) rotateY(16deg) } 15%, 93% { opacity: 1; transform: rotateY(16deg) } 97%, 100% { opacity: 0; transform: rotateY(16deg) } }
@keyframes cl-cardR { 0%, 66% { opacity: 0; transform: translateX(14px) rotateY(-16deg) } 71%, 93% { opacity: 1; transform: rotateY(-16deg) } 97%, 100% { opacity: 0; transform: rotateY(-16deg) } }
@keyframes cl-chipA { 0%, 12% { opacity: 0; transform: translateY(6px) } 16%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0 } }
@keyframes cl-chipB { 0%, 10% { opacity: 0; transform: translateY(6px) } 14%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0 } }
@keyframes cl-pop0 { 0%, 11% { opacity: 0; transform: translateY(16px) scale(.35) } 15% { opacity: 1; transform: translateY(-5px) scale(1.14) } 18%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: translateY(6px) scale(.9) } }
@keyframes cl-pop1 { 0%, 13% { opacity: 0; transform: translateY(16px) scale(.35) } 17% { opacity: 1; transform: translateY(-5px) scale(1.14) } 20%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: translateY(6px) scale(.9) } }
@keyframes cl-pop2 { 0%, 15% { opacity: 0; transform: translateY(16px) scale(.35) } 19% { opacity: 1; transform: translateY(-5px) scale(1.14) } 22%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: translateY(6px) scale(.9) } }
@keyframes cl-press { 0%, 86% { transform: none; box-shadow: 0 10px 20px -8px rgba(255,59,48,.6) } 88%, 92% { transform: scale(.9); box-shadow: 0 4px 8px -4px rgba(255,59,48,.5) } 95%, 100% { transform: none; box-shadow: 0 10px 20px -8px rgba(255,59,48,.6) } }
@keyframes cl-wave { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
@keyframes cl-float { 0%, 100% { transform: translateY(-4px) } 50% { transform: translateY(5px) } }
@keyframes cl-live { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
.cl-timer { animation: cl-timer 14s steps(38, end) infinite; counter-reset: cl var(--cl-t) }
.cl-timer::after { content: "0:" counter(cl, decimal-leading-zero) }
.cl-ring { animation: cl-ring 1.8s ease-out infinite }
.cl-ringwin { animation: cl-ringwin 14s linear infinite }
.cl-conn { opacity: 0; animation: cl-conn 14s ease-in-out infinite }
.cl-incoming { animation: cl-incoming 14s ease-in-out infinite }
.cl-bar { transform-origin: 50% 50%; animation: cl-bar .8s ease-in-out infinite }
.cl-caller { opacity: 0; animation: cl-callerwin 14s ease-in-out infinite }
.cl-ai { opacity: 0; animation: cl-aiwin 14s ease-in-out infinite }
.cl-card { opacity: 0; transform: rotateY(16deg); animation: cl-card 14s cubic-bezier(.2,.7,.2,1) infinite }
.cl-cardR { opacity: 0; transform: rotateY(-16deg); animation: cl-cardR 14s cubic-bezier(.2,.7,.2,1) infinite }
.cl-live { animation: cl-live 1.4s ease-in-out infinite }
.cl-float { animation: cl-float 6s ease-in-out infinite }
.cl-chipA { opacity: 0; animation: cl-chipA 14s cubic-bezier(.2,.7,.2,1) infinite }
.cl-chipB { opacity: 0; animation: cl-chipB 14s cubic-bezier(.2,.7,.2,1) infinite }
.cl-pop0, .cl-pop1, .cl-pop2 { display: block; opacity: 0 }
.cl-pop0 { animation: cl-pop0 14s cubic-bezier(.3,1.5,.4,1) infinite } .cl-pop1 { animation: cl-pop1 14s cubic-bezier(.3,1.5,.4,1) infinite } .cl-pop2 { animation: cl-pop2 14s cubic-bezier(.3,1.5,.4,1) infinite }
.cl-press { box-shadow: 0 10px 20px -8px rgba(255,59,48,.6); animation: cl-press 14s ease-in-out infinite }
.cl-wave { animation: cl-wave 1.2s ease-in-out infinite }
.cl-stage { perspective: 1100px }
.cl-wrap { position: relative; width: 560px; height: 424px }
@media (max-width: 599px) { .cl-wrap { width: 100%; max-width: 343px; height: 263px; margin: 0 auto } .cl-fit { transform: scale(.612); transform-origin: top left } }
@media (min-width: 400px) and (max-width: 599px) { .cl-wrap { max-width: 392px; height: 300px } .cl-fit { transform: scale(.7) } }
@media (prefers-reduced-motion: reduce) {
  .cl-timer, .cl-ring, .cl-ringwin, .cl-bar, .cl-live, .cl-press, .cl-wave, .cl-float { animation: none } .cl-timer { counter-reset: cl 38 }
  .cl-pop0, .cl-pop1, .cl-pop2 { animation: none; opacity: 1 }
  .cl-conn, .cl-incoming, [class*="cl-l"], [class*="cl-s"], .cl-caller, .cl-ai, .cl-chipA, .cl-chipB { animation: none; opacity: 1; transform: none } .cl-incoming, .cl-ringwin { opacity: 0 } .cl-caller { opacity: 0 }
  .cl-card { animation: none; opacity: 1; transform: rotateY(16deg) } .cl-cardR { animation: none; opacity: 1; transform: rotateY(-16deg) }
}
`

export function VoiceCall3D() {
  return (
    <div className="mx-auto max-w-full">
      <div className="cl-wrap">
        <div className="cl-fit cl-stage relative h-[424px] w-[560px]">
          {/* live transcript card, tilted toward the phone */}
          <div className="cl-card absolute left-0 top-[84px] w-[196px] rounded-2xl bg-white p-3.5 shadow-[7px_6px_0_0_oklch(0.9_0.02_200),0_26px_44px_-20px_rgba(15,26,46,.35)] ring-1 ring-border">
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"><span className="cl-live h-1.5 w-1.5 rounded-full bg-[#e5484d]" />Live transcript</p>
            <ul className="mt-3 space-y-2.5">
              {TRANSCRIPT.map((l, i) => (
                <li key={i} className={`cl-l${i}`}>
                  <p className={`text-[9.5px] font-semibold uppercase tracking-wide ${l.ai ? "text-primary" : "text-muted-foreground"}`}>{l.who}</p>
                  <p className="text-[13px] font-medium leading-snug">{l.t}</p>
                  <p className="text-[10.5px] leading-snug text-muted-foreground">{l.en}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* small status chips */}
          <p className="cl-chipA absolute left-[6px] top-[46px] flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-sm ring-1 ring-border"><span className="font-semibold text-primary">हिन्दी</span>detected</p>
          <p className="cl-chipB absolute right-[4px] top-[28px] flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-sm ring-1 ring-border"><Check className="h-3 w-3 text-primary" strokeWidth={3.4} />Answered in 1 ring</p>

          {/* the phone */}
          <div className="cl-float absolute left-[186px] top-[14px] h-[392px] w-[188px] rounded-[34px] bg-[#0f1a2e] p-[4px] shadow-[0_30px_50px_-22px_rgba(15,26,46,.55)]">
            <span aria-hidden className="absolute -left-[2px] top-[84px] h-7 w-[3px] rounded-l bg-[#0f1a2e]" /><span aria-hidden className="absolute -left-[2px] top-[124px] h-11 w-[3px] rounded-l bg-[#0f1a2e]" /><span aria-hidden className="absolute -right-[2px] top-[110px] h-14 w-[3px] rounded-r bg-[#0f1a2e]" />
            <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-[oklch(0.975_0.008_190)]">
              <span className="absolute left-1/2 top-2 h-[9px] w-[34px] -translate-x-1/2 rounded-full bg-[#05080f]" />
              <span aria-hidden className="pointer-events-none absolute -left-8 -top-10 h-[140%] w-12 rotate-[22deg] bg-white/35" />
              <div className="flex items-center justify-between px-5 pt-1.5 text-[10px] font-semibold"><span>9:41</span><span className="flex items-end gap-[2px]"><i className="h-[4px] w-[2.5px] rounded-sm bg-foreground" /><i className="h-[6px] w-[2.5px] rounded-sm bg-foreground" /><i className="h-[8px] w-[2.5px] rounded-sm bg-foreground" /><i className="h-[10px] w-[2.5px] rounded-sm bg-foreground" /></span></div>

              <div className="mt-6 flex flex-col items-center px-3">
                <div className="relative h-[76px] w-[76px]">
                  <span className="cl-ringwin absolute inset-0"><i className="cl-ring absolute inset-0 rounded-full border-2 border-primary" /><i className="cl-ring absolute inset-0 rounded-full border-2 border-primary" style={{ animationDelay: ".9s" }} /></span>
                  <span className="cl-conn absolute -inset-1.5"><i className="cl-ring absolute inset-0 rounded-full border border-primary/50" style={{ animationDuration: "2.6s" }} /></span>
                  <span className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/12 text-[24px] font-semibold text-primary">RK</span>
                </div>
                <p className="mt-3 text-[18px] font-semibold tracking-tight">Rohan K.</p>
                <p className="mt-0.5 text-[10.5px] text-muted-foreground">mobile · +91 98••• ••210</p>

                <div className="relative mt-3 h-[26px] w-full text-center">
                  <p className="cl-incoming absolute inset-0 text-[12px] font-medium text-muted-foreground">Incoming call…</p>
                  <p className="cl-conn absolute inset-0 font-mono text-[18px] font-medium tracking-tight"><span className="cl-timer" /></p>
                </div>

                <p className="cl-conn mt-1 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground"><Sparkles className="h-3 w-3" />Answered by Captain AI</p>

                {/* live waveform: dark while the caller speaks, green while Captain does */}
                <div className="relative mt-5 h-[40px] w-[132px]">
                  <div className="cl-caller absolute inset-0 flex items-center justify-between">
                    {Array.from({ length: BARS }, (_, i) => <i key={i} className="cl-bar block w-[4px] rounded-full bg-foreground" style={{ height: h(i), animationDelay: `${-(i * 0.13).toFixed(2)}s` }} />)}
                  </div>
                  <div className="cl-ai absolute inset-0 flex items-center justify-between">
                    {Array.from({ length: BARS }, (_, i) => <i key={i} className="cl-bar block w-[4px] rounded-full bg-primary" style={{ height: h(BARS - i), animationDelay: `${-(i * 0.11).toFixed(2)}s` }} />)}
                  </div>
                </div>
              </div>

              {/* call controls: mute, a larger red end-call button in the middle, speaker */}
              <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-5">
                <span className="cl-pop0">
                  <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-foreground shadow-[0_6px_14px_-6px_rgba(15,26,46,.35)] ring-1 ring-black/5">
                    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 5.2 2" /><path d="M15 9.3V6a3 3 0 0 0-3-3" /><path d="M18.5 11a6.5 6.5 0 0 1-9.9 5.5M5.5 11a6.5 6.5 0 0 0 .8 3.1" /><path d="M12 18v3" /><path d="M4 4l16 16" /></svg>
                  </span>
                </span>
                <span className="cl-pop2">
                  <span className="cl-press relative flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ff3b30] text-white">
                    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px]" fill="currentColor" style={{ transform: "rotate(135deg)" }}><path d="M20.5 15.9c-1.2 0-2.4-.2-3.5-.6a1 1 0 0 0-1 .25l-2.2 2.2a15.1 15.1 0 0 1-6.6-6.6l2.2-2.2a1 1 0 0 0 .25-1A11.4 11.4 0 0 1 8.1 4.5a1 1 0 0 0-1-1H3.6a1 1 0 0 0-1 1C2.6 14.1 9.9 21.4 19.5 21.4a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1Z" /></svg>
                  </span>
                </span>
                <span className="cl-pop1">
                  <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white text-foreground shadow-[0_6px_14px_-6px_rgba(15,26,46,.35)] ring-1 ring-black/5">
                    <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6.5 9H3v6h3.5L11 19z" fill="currentColor" /><path className="cl-wave" d="M15.5 9a4.2 4.2 0 0 1 0 6" /><path className="cl-wave" d="M18.5 6.5a8 8 0 0 1 0 11" style={{ animationDelay: ".25s" }} /></svg>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* call summary card, tilted the other way, appears when the call wraps up */}
          <div className="cl-cardR absolute right-0 top-[74px] w-[176px] rounded-2xl bg-white p-3.5 shadow-[-7px_6px_0_0_oklch(0.9_0.02_200),0_26px_44px_-20px_rgba(15,26,46,.35)] ring-1 ring-border">
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary"><Sparkles className="h-3 w-3" />Call summary</p>
            <ul className="mt-3 space-y-2.5">
              {SUMMARY.map((l, i) => (
                <li key={l.t} className={`cl-s${i} flex items-start gap-2 text-[12px] leading-snug`}>
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-2.5 w-2.5" strokeWidth={3.6} /></span>{l.t}
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-border pt-2.5 text-[11px] font-semibold text-primary">Handled without a live agent</p>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
