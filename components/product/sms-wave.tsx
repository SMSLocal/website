import { Check } from "lucide-react"

// Hero graphic for /channels/sms-broadcasting: "one template, many personal messages". A single template with a
// {first_name} field sits on top. Personal messages drop out of it one after another, each with the name
// filled in and a delivery tick. Light, silent, pure CSS, 10-second loop.

const NAMES = ["Rahul", "Meera", "Arjun", "Sneha", "Karan"]
const IND = [0, 28, 8, 40, 16]

const CSS = `
${NAMES.map((_, i) => {
  const s = 14 + i * 12
  return `@keyframes sm-b${i} { 0%, ${s - 1}% { opacity: 0; transform: translateY(-34px) scale(.94) } ${s + 5}%, 88% { opacity: 1; transform: none } 96%, 100% { opacity: 0; transform: translateY(6px) } }
@keyframes sm-t${i} { 0%, ${s + 7}% { opacity: 0 } ${s + 10}%, 88% { opacity: 1 } 96%, 100% { opacity: 0 } }
@keyframes sm-n${i} { 0%, ${s + 1}% { background-size: 0% 3px } ${s + 7}%, 100% { background-size: 100% 3px } }
@keyframes sm-s${i} { 0%, ${s - 2}% { opacity: 0; transform: scale(.6) } ${s - 1}% { opacity: .9 } ${s + 4}%, 100% { opacity: 0; transform: scale(2.4) } }
.sm-b${i} { opacity: 0; animation: sm-b${i} 10s cubic-bezier(.2,.8,.2,1) infinite }
.sm-t${i} { opacity: 0; animation: sm-t${i} 10s ease-out infinite }
.sm-n${i} { background: linear-gradient(var(--primary), var(--primary)) left bottom / 0% 3px no-repeat; animation: sm-n${i} 10s ease-out infinite }
.sm-s${i} { opacity: 0; animation: sm-s${i} 10s ease-out infinite }`
}).join("\n")}
@keyframes sm-brace { 0%, 100% { opacity: 1 } 50% { opacity: .55 } }
@keyframes sm-float { 0%, 100% { transform: translateY(-3px) } 50% { transform: translateY(4px) } }
@keyframes sm-blob { 0%, 100% { transform: translate(0, 0) } 50% { transform: translate(14px, -10px) } }
.sm-brace { animation: sm-brace 2.4s ease-in-out infinite }
.sm-float { animation: sm-float 7s ease-in-out infinite }
.sm-blob { animation: sm-blob 9s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .sm-brace, .sm-float, .sm-blob { animation: none }
  ${NAMES.map((_, i) => `.sm-b${i}, .sm-t${i}, .sm-n${i}, .sm-s${i}`).join(", ")} { animation: none }
  ${NAMES.map((_, i) => `.sm-b${i}, .sm-t${i}`).join(", ")} { opacity: 1 }
  ${NAMES.map((_, i) => `.sm-n${i}`).join(", ")} { background-size: 100% 3px }
  ${NAMES.map((_, i) => `.sm-s${i}`).join(", ")} { opacity: 0 }
}
`

export function SmsWave() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="sm-blob absolute -left-6 top-[55%] h-[200px] w-[200px] rounded-full bg-primary/20 blur-[60px]" />
        <span className="sm-blob absolute -right-4 top-0 h-[200px] w-[200px] rounded-full bg-[oklch(0.74_0.14_250)]/20 blur-[60px]" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="sm-float">
        {/* the template */}
        <div className="relative z-10 mx-auto w-full max-w-[400px]">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">One template</p>
          <p className="rounded-2xl border-2 border-dashed border-primary/50 bg-background px-5 py-4 text-[17px] leading-snug">
            Hi <span className="sm-brace rounded-md bg-primary/12 px-1.5 font-mono text-[15px] font-semibold text-primary">{"{first_name}"}</span>, your Diwali offer ends Sunday.
          </p>
        </div>

        {/* a thin line the messages leave along */}
        <span aria-hidden className="mx-auto my-1 block h-7 w-px bg-gradient-to-b from-primary/60 to-transparent" />

        {/* the personal messages */}
        <ul className="space-y-3">
          {NAMES.map((n, i) => (
            <li key={n} className={`sm-b${i} relative`} style={{ marginLeft: IND[i] }}>
              <span aria-hidden className={`sm-s${i} absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-primary`} />
              <p className="flex w-fit max-w-full items-center gap-3 rounded-2xl rounded-bl-md bg-secondary px-4 py-2.5 text-[15px]">
                <span>Hi <span className={`sm-n${i} font-semibold`}>{n}</span>, your Diwali offer ends Sunday.</span>
                <span className={`sm-t${i} flex flex-none items-center text-primary`}><Check className="h-3.5 w-3.5" strokeWidth={3.4} /><Check className="-ml-2 h-3.5 w-3.5" strokeWidth={3.4} /></span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
