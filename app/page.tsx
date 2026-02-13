import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />

      {/* Section: Highlights */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Appointment Only",
              desc: "A private, focused session — no walk-ins, no rush, just clean work and calm energy.",
            },
            {
              title: "Custom-First Design",
              desc: "Bring your idea (or a vibe). We’ll shape it into something you’ll be proud to wear forever.",
            },
            {
              title: "Clean + Premium",
              desc: "Meticulous prep, sterile tools, aftercare guidance, and a studio experience that feels elevated.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="glass soft-glow rounded-3xl p-6 md:p-7"
            >
              <div className="mb-3 h-2 w-16 rounded-full bg-[rgba(255,47,179,0.65)] blur-[0.2px]" />
              <h3 className="text-lg font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Band */}
        <div className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                Limited monthly slots
              </p>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to book your session?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Submit a request with your idea, placement, and references.
                You’ll get a reply with availability + next steps.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="/booking"
                className="neon-border pink-glow inline-flex w-full items-center justify-center rounded-2xl bg-[rgba(255,47,179,0.14)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.20)] md:w-auto"
              >
                Book Appointment
              </a>
              <a
                href="/pricing"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10 md:w-auto"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
