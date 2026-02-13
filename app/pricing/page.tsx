const tiers = [
  {
    title: "Mini",
    price: "Starting at $___",
    items: ["Small piece", "Simple linework", "Fast session"],
  },
  {
    title: "Standard",
    price: "Starting at $___",
    items: ["Custom design", "Clean detail", "Most bookings"],
    featured: true,
  },
  {
    title: "Large / Project",
    price: "Quoted",
    items: ["Sleeves / backpieces", "Multi-session plan", "Design consult"],
  },
];

export default function PricingPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          Pricing
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple, transparent starts
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
          Final pricing depends on size, placement, detail, and session time.
          Submit a booking request for an accurate quote.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.title}
            className={[
              "rounded-[32px] border bg-white/5 p-6 sm:p-7",
              t.featured ? "neon-border pink-glow border-[rgba(255,47,179,0.35)]" : "border-white/10",
            ].join(" ")}
          >
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">
              {t.title}
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">
              {t.price}
            </div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {t.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,47,179,0.95)]" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <a
              href="/booking"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-black/25 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
            >
              Request Quote
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-8">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          Deposits
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Deposits hold your appointment time and go toward the final tattoo cost.
          They are typically non-refundable, but may be transferred with proper notice.
        </p>
      </div>
    </div>
  );
}
