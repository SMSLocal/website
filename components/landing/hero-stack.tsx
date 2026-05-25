import { Bot, CheckCheck, Globe, KeyRound, MessageSquareText, ShieldCheck, Zap } from "lucide-react"

const fadeUp = (delay: string) => ({
  animation: "message-in 0.6s cubic-bezier(0.2,0.8,0.2,1) both",
  animationDelay: delay,
})

export function HeroStack() {
  return (
    <div className="relative mx-auto flex w-full max-w-sm flex-col items-stretch gap-4 lg:block lg:h-[500px] lg:max-w-none">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 blur-3xl lg:block"
      />

      {/* Bulk SMS — prominent */}
      <div
        style={fadeUp("0.05s")}
        className="animate-float-slow z-20 rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-foreground/10 lg:absolute lg:left-2 lg:top-0 lg:w-[272px] lg:-rotate-2"
      >
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquareText className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold text-foreground">Bulk SMS</div>
            <div className="text-[11px] text-muted-foreground">Diwali Sale · 2,418 recipients</div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-10 gap-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              style={{ animation: "pop-in 0.4s ease both", animationDelay: `${0.3 + i * 35}ms` }}
              className="aspect-square rounded-[3px] bg-primary/25"
            />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              style={{ transformOrigin: "left", animation: "hero-progress 1.6s ease both 0.4s" }}
              className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <span className="text-[11.5px] font-bold text-foreground">98.1%</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11.5px] font-semibold text-primary">
          <CheckCheck className="h-3.5 w-3.5" /> 2,371 delivered in 1.8s
        </div>
      </div>

      {/* WhatsApp AI */}
      <div
        style={fadeUp("0.25s")}
        className="animate-float-slower z-30 rounded-2xl border border-border bg-card p-3.5 shadow-2xl shadow-foreground/10 lg:absolute lg:right-0 lg:top-[208px] lg:w-[236px] lg:rotate-2"
      >
        <div className="mb-2 flex items-center gap-2 border-b border-border/60 pb-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white">P</span>
          <span className="text-[12px] font-semibold text-foreground">WhatsApp · AI</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-primary">
            <Bot className="h-2.5 w-2.5" /> Tamil
          </span>
        </div>
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-secondary px-2.5 py-1.5 text-[11.5px] text-foreground">
          பேமென்ட் வெற்றிகரமாக இருந்ததா?
        </div>
        <div className="ml-auto mt-1.5 max-w-[92%] rounded-2xl rounded-tr-sm bg-primary px-2.5 py-1.5 text-[11.5px] text-primary-foreground">
          ஆம், உறுதிப்படுத்தப்பட்டது 🎉
          <div className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-primary-foreground/75">AI · 0.8s <CheckCheck className="h-2.5 w-2.5" /></div>
        </div>
      </div>

      {/* OTP */}
      <div
        style={fadeUp("0.45s")}
        className="animate-float-slow z-30 rounded-2xl border border-border bg-card p-4 text-center shadow-2xl shadow-foreground/10 lg:absolute lg:bottom-0 lg:left-6 lg:w-[210px] lg:-rotate-1"
      >
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <KeyRound className="h-3.5 w-3.5 text-primary" /> Your SMSLocal OTP
        </div>
        <div className="mt-2 flex justify-center gap-1">
          {["4", "8", "2", "9", "1", "3"].map((d, i) => (
            <span
              key={i}
              style={{ animation: "pop-in 0.35s ease both", animationDelay: `${0.6 + i * 0.08}s` }}
              className="flex h-8 w-6 items-center justify-center rounded-md bg-primary/10 text-[15px] font-bold text-primary"
            >
              {d}
            </span>
          ))}
        </div>
        <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
          <CheckCheck className="h-3.5 w-3.5" /> Verified in 0.3s
        </div>
      </div>

      {/* Floating pills */}
      <Pill className="animate-float-slower -right-2 top-10 hidden xl:flex" icon={Zap} label="98% in <1s" delay="0.6s" />
      <Pill className="animate-float-slow right-16 bottom-20 hidden xl:flex" icon={Globe} label="8 Indian languages" delay="0.9s" />
      <Pill className="animate-float-slower left-1/2 top-[176px] hidden xl:flex" icon={ShieldCheck} label="DLT-compliant" delay="1.2s" />
    </div>
  )
}

function Pill({
  className,
  icon: Icon,
  label,
  delay,
}: {
  className: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  delay?: string
}) {
  return (
    <div
      aria-hidden
      style={delay ? { animationDelay: delay } : undefined}
      className={`pointer-events-none absolute z-40 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[11.5px] font-semibold text-foreground shadow-lg shadow-foreground/10 backdrop-blur-sm ${className}`}
    >
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </div>
  )
}
