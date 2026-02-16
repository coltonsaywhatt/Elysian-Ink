import Link from "next/link";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const snapshot = [
  { k: "Reply time", v: "24-48h" },
  { k: "Booking", v: "Appointment only" },
  { k: "Deposit", v: "Required" },
  { k: "Design", v: "Custom-first" },
];

const tiers = [
  {
    title: "Minimum Session",
    price: "$___",
    sub: "Small pieces / straightforward concepts",
    bestFor: "Micro script, symbols, tiny marks",
    bullets: [
      "Includes setup, stencil, and needle time",
      "Great for concise ideas with clear placement",
      "Final price depends on placement + complexity",
    ],
    tone: "base",
  },
  {
    title: "Hourly Session",
    price: "$___ / hr",
    sub: "Most custom work",
    bestFor: "Custom linework, shading, and medium detail",
    bullets: [
      "Most accurate model for custom projects",
      "Quote range provided after references review",
      "Final cost = execution time + detail load",
    ],
    tone: "featured",
  },
  {
    title: "Day Session",
    price: "Quoted",
    sub: "Large-scale / multi-session plans",
    bestFor: "Sleeves, back pieces, heavy coverage",
    bullets: [
      "Built for long projects that need planning",
      "Session pacing + healing cadence included",
      "Design consultation included in project flow",
    ],
    tone: "base",
  },
];

const impactFactors = [
  {
    title: "Placement + movement",
    desc: "Bony or high-movement zones usually require more precision time.",
  },
  {
    title: "Detail density",
    desc: "Fine line detail, texture, and depth increase execution time.",
  },
  {
    title: "Technique load",
    desc: "Certain looks need additional passes to heal clean and crisp.",
  },
  {
    title: "Rework / cover-up",
    desc: "Cover-up strategy can add complexity and extra structuring work.",
  },
];

const addOns = [
  { label: "Touch-up (policy window)", note: "Varies" },
  { label: "Cover-up assessment", note: "Quoted" },
  { label: "Design consult (if needed)", note: "May apply" },
  { label: "Priority slot (limited)", note: "If available" },
];

const quoteChecklist = [
  "2-5 reference images",
  "Exact body placement",
  "Approximate size in inches",
  "Style notes + budget comfort range (optional)",
];

const faqs = [
  {
    q: "Do you do walk-ins?",
    a: "No. Elysian Ink is appointment-only so each session stays private and focused.",
  },
  {
    q: "How do deposits work?",
    a: "Deposits secure your slot and apply to your final total. Deposits are usually non-refundable, and may be transferable with proper notice.",
  },
  {
    q: "Can I get a quote by message?",
    a: "Yes. Send placement, size, and references. Better inputs = faster and more accurate quote range.",
  },
  {
    q: "Do you offer touch-ups?",
    a: "If needed, touch-ups may be available inside the policy window depending on placement, healing, and aftercare adherence.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[38px] border border-white/10 bg-white/5 p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-[-180px] h-[560px] w-[560px] rounded-full bg-[rgba(255,47,179,0.09)] blur-[150px]" />
          <div className="absolute -right-20 bottom-[-170px] h-[560px] w-[560px] rounded-full bg-[rgba(255,47,179,0.07)] blur-[160px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.30)] to-transparent" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
              <span className="inline-block h-2 w-2 rounded-full bg-[rgba(255,47,179,0.9)]" />
              Custom-first • Appointment-only • Built to heal clean
            </div>

            <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Precision pricing.
              <span className="block text-white/70">No mystery, no fluff.</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Every quote is based on actual variables: size, placement, complexity, and session time.
              Send strong references and you get a clean estimate fast.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="pink-edge inline-flex items-center justify-center rounded-2xl border border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.10)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.14)]"
              >
                Request Quote
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
              >
                See Healed Work
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {snapshot.map((f) => (
              <div key={f.k} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">{f.k}</div>
                <div className="mt-2 text-sm font-semibold text-white/88">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">Rate Matrix</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Choose the session type that fits your piece
            </h2>
          </div>
          <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 sm:block">
            Most clients book hourly
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((p) => (
            <article
              key={p.title}
              className={cx(
                "relative overflow-hidden rounded-[32px] border p-6 sm:p-7",
                p.tone === "featured"
                  ? "border-[rgba(255,47,179,0.30)] bg-[rgba(255,47,179,0.08)] pink-edge"
                  : "border-white/10 bg-white/5"
              )}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-[250px] w-[250px] rounded-full bg-[rgba(255,47,179,0.08)] blur-[100px]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
              </div>

              <div className="relative">
                {p.tone === "featured" ? (
                  <div className="mb-3 inline-flex rounded-full border border-[rgba(255,47,179,0.28)] bg-[rgba(255,47,179,0.14)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
                    Most booked
                  </div>
                ) : null}

                <div className="text-xs uppercase tracking-[0.25em] text-white/60">{p.title}</div>
                <div className="mt-3 text-3xl font-semibold tracking-tight">{p.price}</div>
                <div className="mt-1 text-sm text-white/65">{p.sub}</div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/75">
                  Best for: <span className="text-white/90">{p.bestFor}</span>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-white/72">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,47,179,0.9)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/booking"
                  className={cx(
                    "mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold tracking-wide transition",
                    p.tone === "featured"
                      ? "border border-[rgba(255,47,179,0.28)] bg-[rgba(255,47,179,0.14)] hover:bg-[rgba(255,47,179,0.20)]"
                      : "border border-white/10 bg-white/5 hover:bg-white/10"
                  )}
                >
                  Start Quote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">What moves the quote</div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Time, detail, placement.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Better input means tighter estimates. If your request is detailed, your quote gets accurate fast.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {impactFactors.map((f) => (
              <div key={f.title} className="rounded-[28px] border border-white/10 bg-black/25 p-5">
                <div className="text-sm font-semibold">{f.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">Quote checklist</div>
            <div className="mt-4 space-y-2">
              {quoteChecklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/75">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,47,179,0.9)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">Optional add-ons</div>
            <div className="mt-4 space-y-3">
              {addOns.map((a) => (
                <div key={a.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                  <div className="text-sm font-semibold text-white/85">{a.label}</div>
                  <div className="text-xs text-white/60">{a.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">Policy</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Deposits and rescheduling</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-sm font-semibold">Deposits</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Deposits secure appointment time and apply toward the final total. They are generally non-refundable.
              With sufficient notice, transfer to a new date may be possible at studio discretion.
            </p>
            <div className="mt-4 rounded-2xl border border-[rgba(255,47,179,0.18)] bg-[rgba(255,47,179,0.08)] px-4 py-3 text-sm text-white/75">
              Strong references + clear placement + target size = fastest path to a precise quote.
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-sm font-semibold">Cancellations</div>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              If plans change, notify as early as possible. Last-minute cancellations may forfeit deposit due to slot loss.
              Appointment-only scheduling protects both your session quality and studio time.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/70">
              The calendar is intentionally limited so every booked client gets focused attention.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">FAQ</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Quick answers</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-[28px] border border-white/10 bg-white/5 p-5 sm:p-6">
              <summary className="cursor-pointer list-none text-sm font-semibold text-white/85">
                <div className="flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="rounded-xl border border-white/10 bg-black/25 px-2 py-1 text-xs text-white/60 transition group-open:border-[rgba(255,47,179,0.25)] group-open:text-white/80">
                    open
                  </span>
                </div>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-220px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[rgba(255,47,179,0.08)] blur-[170px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.30)] to-transparent" />
          </div>

          <div className="relative grid gap-6 md:grid-cols-[1.25fr_0.75fr] md:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Ready when you are</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Send your concept. Get your quote.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Drop references + placement + size and I will reply with a clean estimate and availability.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/booking"
                className="pink-edge inline-flex w-full items-center justify-center rounded-2xl border border-[rgba(255,47,179,0.24)] bg-[rgba(255,47,179,0.12)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.18)] md:w-auto"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10 md:w-auto"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
