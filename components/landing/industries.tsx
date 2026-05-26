import { ArrowUpRight, Banknote, GraduationCap, HeartPulse, Home, ShoppingBag, Truck } from "lucide-react"
import { Reveal } from "./reveal"

type Industry = {
  icon: React.ComponentType<{ className?: string }>
  name: string
  href: string
  channel: string
  sender: string
  msg: string
}

const INDUSTRIES: Industry[] = [
  { icon: ShoppingBag, name: "E-commerce", href: "/solutions/ecommerce", channel: "SMS", sender: "SHOPLY", msg: "Your order #4821 is out for delivery 🛵 Track live: smsl.in/t/4821" },
  { icon: Banknote, name: "Banking & Fintech", href: "/solutions/banking-fintech", channel: "SMS", sender: "HDFCBK", msg: "₹25,000 credited to a/c XX4567 on 25-May. Avl bal ₹1,02,300." },
  { icon: HeartPulse, name: "Healthcare", href: "/solutions/healthcare", channel: "WhatsApp", sender: "CityCare", msg: "Reminder: Dr. Mehta tomorrow at 11:00 AM. Reply C to confirm." },
  { icon: GraduationCap, name: "Education", href: "/solutions/education", channel: "SMS", sender: "GRNWUD", msg: "Fee due ₹12,000 by 30 May. Pay securely: smsl.in/fee -Greenwood" },
  { icon: Truck, name: "Logistics", href: "/solutions/logistics", channel: "SMS", sender: "SHIPIT", msg: "Your parcel arrives today. Delivery OTP: 4821 — share with the rider." },
  { icon: Home, name: "Real Estate", href: "/solutions/real-estate", channel: "WhatsApp", sender: "Acre", msg: "New 2BHK in Whitefield, ₹85L. Open house Sat 11 AM. Reply Y for details." },
]

function Bubble({ it }: { it: Industry }) {
  const Icon = it.icon
  return (
    <a href={it.href} className="group/b w-[290px] shrink-0">
      <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[11px] font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" /> {it.name}
        <span className="rounded bg-secondary px-1.5 py-0.5 text-[9px] uppercase tracking-wide">{it.channel}</span>
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-card px-3.5 py-2.5 text-[12.5px] leading-snug text-foreground shadow-md transition group-hover/b:-translate-y-0.5 group-hover/b:shadow-lg">
        {it.msg}
        <div className="mt-1 text-[10px] text-muted-foreground">{it.sender} · delivered ✓✓</div>
      </div>
    </a>
  )
}

function Row({ dir, items }: { dir: "l" | "r"; items: Industry[] }) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
      <div className={`flex w-max gap-4 ${dir === "l" ? "animate-marquee-l" : "animate-marquee-r"} group-hover:[animation-play-state:paused]`}>
        {[...items, ...items].map((it, i) => (
          <Bubble key={`${it.name}-${i}`} it={it} />
        ))}
      </div>
    </div>
  )
}

export function Industries() {
  return (
    <section className="overflow-hidden bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            Industry solutions
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Built for India&apos;s{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">growing industries</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            The messages Indian businesses send every day — across every industry.
          </p>
        </Reveal>
      </div>

      {/* Full-bleed moving message wall */}
      <div className="mt-12 space-y-4">
        <Row dir="l" items={INDUSTRIES} />
        <Row dir="r" items={[...INDUSTRIES].reverse()} />
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-4 text-center sm:px-6">
        <a href="/solutions" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Explore all industry solutions <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
