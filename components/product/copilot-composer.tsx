import { Check, FileText, Sparkles } from "lucide-react"

// Hero graphic for /products/agent-copilot: an open, frameless inbox. A customer writes on WhatsApp,
// Copilot (the column on the right) summarises the thread, shows its sources and writes a reply, the agent
// picks a tone, presses "Use reply" and sends. No boxes or cards: just chat bubbles, text and hairlines.
// A 14-second loop. Plain HTML + CSS, no client JS, silent.

const SUMMARY = ["Order #4821 is 6 days late", "Courier delay confirmed", "Wants a tracking link"]
const SOURCES = ["Delivery policy", "Order #4821"]
const REPLY = ["Sorry for the wait, Ananya!", "Order #4821 is out for delivery", "and should reach you today.", "Want the live tracking link?"]
const FULL = "Sorry for the wait, Ananya! Order #4821 is out for delivery and should reach you today. Want the live tracking link?"

/* a simple "appear at X%" keyframe that holds until the end of the loop */
const appear = (n: string, at: number, lift = 8) =>
  `@keyframes ${n} { 0%, ${at - 1}% { opacity: 0; transform: translateY(${lift}px) } ${at + 2}%, 95% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }\n.${n} { opacity: 0; animation: ${n} 14s ease-out infinite }`
const grow = (n: string, s: number, e: number) =>
  `@keyframes ${n} { 0%, ${s}% { width: 0 } ${e}%, 95% { width: 100% } 98%, 100% { width: 100% } }\n.${n} { width: 0; animation: ${n} 14s steps(24) infinite }`

const CSS = `
${appear("ib-c1", 4)}
${SUMMARY.map((_, i) => appear(`ib-s${i}`, 14 + i * 4, 6)).join("\n")}
${SOURCES.map((_, i) => appear(`ib-r${i}`, 27 + i * 3, 6)).join("\n")}
${REPLY.map((_, i) => grow(`ib-l${i}`, 32 + i * 4, 35 + i * 4)).join("\n")}
${appear("ib-tone", 31, 6)}
${appear("ib-use", 49, 6)}
${appear("ib-sent", 74, 14)}
${appear("ib-tick", 80, 2)}
${appear("ib-badge", 82, 6)}
@keyframes ib-typing { 0%, 1% { opacity: 0 } 2%, 4% { opacity: 1 } 5%, 100% { opacity: 0 } }
@keyframes ib-status1 { 0%, 5% { opacity: 0 } 7%, 36% { opacity: 1 } 38%, 100% { opacity: 0 } }
@keyframes ib-status2 { 0%, 37% { opacity: 0 } 39%, 95% { opacity: 1 } 98%, 100% { opacity: 0 } }
@keyframes ib-think { 0%, 6% { opacity: 0 } 8%, 30% { opacity: 1 } 34%, 100% { opacity: 0 } }
@keyframes ib-chip { 0%, 49% { transform: scale(1) } 52% { transform: scale(1.12) } 56%, 100% { transform: scale(1) } }
@keyframes ib-flash { 0%, 51% { background: transparent } 54% { background: oklch(0.95 0.06 168) } 58%, 100% { background: transparent } }
@keyframes ib-press { 0%, 60% { transform: scale(1); box-shadow: 0 8px 18px -8px oklch(0.55 0.13 172 / .6) } 62% { transform: scale(.94); box-shadow: 0 2px 6px -2px oklch(0.55 0.13 172 / .6) } 66%, 100% { transform: scale(1); box-shadow: 0 8px 18px -8px oklch(0.55 0.13 172 / .6) } }
@keyframes ib-used { 0%, 62% { opacity: 1 } 66%, 95% { opacity: .45 } 98%, 100% { opacity: 1 } }
@keyframes ib-draft { 0%, 63% { opacity: 0; transform: translateY(6px) } 66%, 73% { opacity: 1; transform: none } 74%, 100% { opacity: 0 } }
@keyframes ib-hint { 0%, 61% { opacity: 1 } 64%, 100% { opacity: 0 } }
@keyframes ib-send { 0%, 69% { transform: scale(1) } 71.5% { transform: scale(.88) } 75%, 100% { transform: scale(1) } }
@keyframes ib-ring { 0%, 70% { opacity: 0; transform: scale(.7) } 71.5% { opacity: .8 } 80%, 100% { opacity: 0; transform: scale(2.2) } }
@keyframes ib-fade { 0% { opacity: 0 } 2%, 97% { opacity: 1 } 99%, 100% { opacity: 0 } }
@keyframes ib-dots { 0%, 100% { opacity: .3 } 50% { opacity: 1 } }
@keyframes ib-live { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
@keyframes ib-shimmer { to { background-position: -200% 0 } }
@keyframes ib-float { 0%, 100% { transform: translateY(-3px) } 50% { transform: translateY(4px) } }
@keyframes ib-blob { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(16px, -12px) } }
.ib-typing { opacity: 0; animation: ib-typing 14s linear infinite }
.ib-status1 { opacity: 0; animation: ib-status1 14s linear infinite }
.ib-status2 { opacity: 0; animation: ib-status2 14s linear infinite }
.ib-think { opacity: 0; animation: ib-think 14s linear infinite }
.ib-chip { display: inline-block; animation: ib-chip 14s ease-out infinite }
.ib-flash { animation: ib-flash 14s linear infinite }
.ib-press { animation: ib-press 14s ease-out infinite }
.ib-used { animation: ib-used 14s linear infinite }
.ib-draft { opacity: 0; animation: ib-draft 14s ease-out infinite }
.ib-hint { animation: ib-hint 14s linear infinite }
.ib-send { animation: ib-send 14s ease-out infinite }
.ib-ring { opacity: 0; animation: ib-ring 14s ease-out infinite }
.ib-fade { animation: ib-fade 14s linear infinite }
.ib-dots i { animation: ib-dots 1s ease-in-out infinite }
.ib-live { animation: ib-live 1.4s ease-in-out infinite }
.ib-shimmer { background: linear-gradient(90deg, var(--border) 25%, var(--secondary) 50%, var(--border) 75%); background-size: 200% 100%; animation: ib-shimmer 1.4s linear infinite }
.ib-float { animation: ib-float 7s ease-in-out infinite; will-change: transform }
.ib-blob { animation: ib-blob 9s ease-in-out infinite }

/* the scene is designed at 560px and scaled down on narrow screens */
.ib-wrap { position: relative; width: 560px; height: 432px }
.ib-scale { width: 560px; height: 432px; transform-origin: top left }
@media (max-width: 639px) {
  .ib-wrap { width: 100%; max-width: 340px; height: 432px }
  .ib-scale { width: 100%; height: 432px }
  .ib-scale .ib-fade, .ib-scale .ib-float { width: 100% }
  .ib-fade { width: 100% !important }
  .ib-grid { grid-template-columns: 1fr !important }
  .ib-chat { display: none }
  .ib-co { border-left: 0 !important; padding-left: 0 !important }
}

@media (prefers-reduced-motion: reduce) {
  .ib-blob, .ib-fade, .ib-float, .ib-typing, .ib-think, .ib-chip, .ib-flash, .ib-press, .ib-used, .ib-draft, .ib-hint, .ib-send, .ib-ring, .ib-dots i, .ib-live, .ib-shimmer, .ib-status1 { animation: none }
  .ib-c1, .ib-s0, .ib-s1, .ib-s2, .ib-r0, .ib-r1, .ib-l0, .ib-l1, .ib-l2, .ib-l3, .ib-tone, .ib-use, .ib-sent, .ib-tick, .ib-badge { animation: none; opacity: 1; transform: none }
  .ib-l0, .ib-l1, .ib-l2, .ib-l3 { width: 100% }
  .ib-status2 { animation: none; opacity: 1 }
  .ib-typing, .ib-think, .ib-draft, .ib-ring { opacity: 0 }
}
`

export function CopilotComposer() {
  return (
    <div className="mx-auto max-w-full">
      <div className="ib-wrap mx-auto">
        <div className="ib-scale">
          {/* soft colour behind the scene, no frame */}
          <div aria-hidden className="pointer-events-none absolute left-0 top-0 -z-10 h-[432px] w-[560px]">
            <span className="ib-blob absolute left-[-30px] top-[220px] h-[200px] w-[200px] rounded-full bg-primary/20 blur-[60px]" />
            <span className="ib-blob absolute right-[-20px] top-[20px] h-[200px] w-[200px] rounded-full bg-[oklch(0.74_0.14_250)]/20 blur-[60px]" style={{ animationDelay: "-4s" }} />
          </div>
          <div className="ib-float">
            <div className="ib-fade relative h-[432px] w-[560px]">
              {/* top line */}
              <div className="flex h-8 items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="flex items-center gap-2"><span className="ib-live h-1.5 w-1.5 rounded-full bg-primary" />Inbox · WhatsApp</span>
                <span className="ib-badge flex items-center gap-1.5 font-semibold text-primary"><Check className="h-3.5 w-3.5" strokeWidth={3.4} />Replied in 8 seconds</span>
              </div>

              <div className="ib-grid grid h-[392px] grid-cols-[292px_1fr]">
                {/* the conversation */}
                <div className="ib-chat flex flex-col pr-6">
                  <div className="flex items-center gap-3 pb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-[12.5px] font-semibold text-primary">AR</span>
                    <span className="leading-tight">
                      <span className="block text-[14.5px] font-semibold">Ananya Rao</span>
                      <span className="block text-[12px] text-muted-foreground">WhatsApp · Order #4821</span>
                    </span>
                  </div>
                  <div className="relative flex-1 space-y-3 pt-3">
                    <div className="relative min-h-[70px]">
                      <span className="ib-typing ib-dots absolute left-0 top-0 flex w-fit gap-1 rounded-2xl rounded-bl-md bg-secondary px-3.5 py-3"><i className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /><i className="h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: ".15s" }} /><i className="h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: ".3s" }} /></span>
                      <p className="ib-c1 w-fit max-w-[250px] rounded-2xl rounded-bl-md bg-secondary px-4 py-2.5 text-[13.5px] leading-snug">Hi, my order #4821 hasn&apos;t arrived and it&apos;s been 6 days. Can you check?</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="ib-sent max-w-[250px] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[13.5px] leading-snug text-primary-foreground">{FULL}</p>
                      <span className="ib-tick mt-1.5 flex items-center gap-0.5 text-[11.5px] text-muted-foreground"><Check className="-mr-1.5 h-3 w-3 text-primary" strokeWidth={3} /><Check className="h-3 w-3 text-primary" strokeWidth={3} />Delivered</span>
                    </div>
                  </div>
                  {/* composer: just a line, no box */}
                  <div className="relative flex min-h-[62px] items-end gap-3 border-b-2 border-foreground/15 pb-2.5">
                    <p className="relative flex-1 text-[13px] leading-snug text-muted-foreground">
                      <span className="ib-hint">Reply to Ananya…</span>
                      <span className="ib-draft absolute inset-x-0 bottom-0 text-foreground">{FULL}</span>
                    </p>
                    <span className="relative flex-none">
                      <span aria-hidden className="ib-ring absolute inset-0 rounded-full border-2 border-primary" />
                      <span className="ib-send relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M2.4 17.6 18 10 2.4 2.4l2 6.6 8.6 1-8.6 1z" /></svg></span>
                    </span>
                  </div>
                </div>

                {/* Copilot: open sections divided by hairlines */}
                <div className="ib-co flex flex-col border-l border-border pl-6">
                  <div className="flex items-center justify-between pb-3">
                    <span className="flex items-center gap-1.5 text-[14.5px] font-semibold text-primary"><Sparkles className="h-[17px] w-[17px]" />Copilot</span>
                    <span className="relative h-4 w-[120px] text-right text-[11.5px] text-muted-foreground">
                      <span className="ib-status1 absolute right-0">Reading thread…</span>
                      <span className="ib-status2 absolute right-0 font-medium text-primary">Suggestion ready</span>
                    </span>
                  </div>

                  <div className="border-t border-border py-3">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Summary</p>
                    <div className="relative min-h-[64px]">
                      <span className="ib-think absolute inset-0 space-y-2"><i className="ib-shimmer block h-3 w-[88%] rounded" /><i className="ib-shimmer block h-3 w-[70%] rounded" /><i className="ib-shimmer block h-3 w-[78%] rounded" /></span>
                      <ul className="relative space-y-1.5">
                        {SUMMARY.map((s, i) => (<li key={s} className={`ib-s${i} flex items-center gap-2 text-[13px]`}><span className="h-1.5 w-1.5 flex-none rounded-full bg-primary" />{s}</li>))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-border py-3">
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Sources</p>
                    <p className="flex gap-4 text-[12.5px] font-medium">
                      {SOURCES.map((s, i) => (<span key={s} className={`ib-r${i} flex items-center gap-1.5`}><FileText className="h-3.5 w-3.5 text-primary" />{s}</span>))}
                    </p>
                  </div>

                  <div className="ib-used border-t border-border pt-3">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Suggested reply</p>
                    <div className="ib-flash border-l-[3px] border-primary py-0.5 pl-3 text-[12.5px] leading-[1.5]">
                      {REPLY.map((l, i) => (<span key={l} className={`ib-l${i} block overflow-hidden whitespace-nowrap`}>{l}</span>))}
                    </div>
                    <div className="ib-tone mt-3 flex items-center gap-4 text-[12px] font-medium text-muted-foreground">
                      <span className="ib-chip border-b-2 border-primary pb-0.5 font-semibold text-primary">Friendly</span>
                      <span className="pb-0.5">Formal</span>
                      <span className="pb-0.5">Short</span>
                    </div>
                    <span className="ib-use mt-3 block">
                      <span className="ib-press flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[12.5px] font-semibold text-primary-foreground">Use reply <kbd className="rounded bg-white/25 px-1.5 text-[10.5px]">Tab</kbd></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
