import { Check } from "lucide-react"
import { PaymentScene, PromoScene, RcsScene } from "./messaging-scenes"

type ShowcaseCard = {
  title: string
  points: string[]
  Scene: () => React.JSX.Element
}

const CARDS: ShowcaseCard[] = [
  {
    title: "Collect payments right inside the WhatsApp chat",
    points: ["UPI, cards and net banking", "Instant payment confirmation", "Order and amount shown upfront"],
    Scene: PaymentScene,
  },
  {
    title: "Promotional messages with rich banners, offers and links",
    points: ["Banner, offer and coupon code", "Buttons: shop, details, call", "Read receipts, delivery status"],
    Scene: PromoScene,
  },
  {
    title: "Swipeable RCS carousels that put every offer on screen",
    points: ["Photo, price and button per card", "Verified sender with your logo", "Automatic SMS fallback"],
    Scene: RcsScene,
  },
]

/**
 * "Messaging in action": three illustrated cards. Display only: no links,
 * buttons or arrows, by design. Rendered as plain HTML so it is visible
 * without any client-side script.
 */
export function MessagingShowcase() {
  return (
    <section id="messaging-in-action" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Messaging in action</span>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
            Conversations that turn into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">payments and sales</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-7">
          {CARDS.map(({ title, points, Scene }) => (
            <div key={title} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="aspect-[400/380] w-full overflow-hidden">
                  <Scene />
                </div>
                <div className="flex flex-1 flex-col items-start gap-4 bg-muted/60 px-6 pb-8 pt-6">
                  <h3 className="text-balance text-[20px] font-semibold leading-snug tracking-tight text-foreground">{title}</h3>
                  <ul className="grid gap-2.5">
                    {points.map((point) => (
                      <li key={point} className="flex min-h-6 items-start gap-2.5 text-[13px] font-medium leading-5 text-foreground/90 lg:text-[14px]">
                        <span className="mt-[1px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
