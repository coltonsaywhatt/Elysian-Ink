import Hero from "./components/Hero";

const labCards = [
  {
    title: "No Walk-Ins. No Noise.",
    desc: "One artist. One chair. One vision at a time.",
    tone: "bg-[rgba(255,47,179,0.11)]",
    span: "md:col-span-2",
  },
  {
    title: "Custom-First",
    desc: "References are input. Final artwork is yours.",
    tone: "bg-white/5",
    span: "",
  },
  {
    title: "Sterile + Methodical",
    desc: "Prep, placement, and execution are treated like ritual.",
    tone: "bg-black/25",
    span: "",
  },
  {
    title: "Blackwork + Neon Accent",
    desc: "Dark romance with razor-clean contrast and shape flow.",
    tone: "bg-white/5",
    span: "md:col-span-2",
  },
];

const rituals = [
  {
    id: "01",
    title: "Intake",
    detail: "You send concept, refs, size, and placement.",
    flag: "Signal In",
  },
  {
    id: "02",
    title: "Blueprint",
    detail: "Design is tailored to anatomy, movement, and style intent.",
    flag: "Locked",
  },
  {
    id: "03",
    title: "Session",
    detail: "Private, focused execution with no rushed decisions.",
    flag: "Inked",
  },
  {
    id: "04",
    title: "Aftercare",
    detail: "Healing protocol and direct support until it settles clean.",
    flag: "Healed",
  },
];

const metrics = [
  { k: "Style", v: "Blackwork / Neo-Romance" },
  { k: "Studio", v: "Private Appointment Environment" },
  { k: "Response", v: "24 to 48 Hour Booking Replies" },
];

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black/35">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/75 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/75 to-transparent" />
            </div>

            <div className="flex whitespace-nowrap py-3 text-[11px] uppercase tracking-[0.34em] text-white/70">
              <div className="animate-[marquee_20s_linear_infinite]">
                <span className="mx-6">appointment only</span>
                <span className="mx-6">no template tattoos</span>
                <span className="mx-6">private studio energy</span>
              </div>
              <div className="animate-[marquee_20s_linear_infinite]">
                <span className="mx-6">appointment only</span>
                <span className="mx-6">no template tattoos</span>
                <span className="mx-6">private studio energy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-[320px] w-[320px] rounded-full bg-[rgba(255,47,179,0.10)] blur-[110px]" />
              <div className="absolute right-[-130px] top-[20%] h-[320px] w-[320px] rounded-full bg-[rgba(255,47,179,0.08)] blur-[130px]" />
            </div>

            <div className="relative">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                Studio Manifesto
              </div>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Not built to look safe.
                <span className="block text-white/70">Built to hit hard and heal clean.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                This is a focused environment for clients who want custom work with intent,
                precision, and a strong point of view. No conveyor-belt sessions. No random noise.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {metrics.map((m) => (
                  <div key={m.k} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">{m.k}</div>
                    <div className="mt-2 text-sm font-semibold text-white/88">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-black/30 p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -bottom-24 left-1/2 h-[360px] w-[420px] -translate-x-1/2 rounded-full bg-[rgba(255,47,179,0.12)] blur-[130px]" />
              <div className="absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-[rgba(255,47,179,0.09)] blur-[95px]" />
            </div>

            <div className="relative">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Signature Matrix</div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Linework", "Razor Clean"],
                  ["Contrast", "High Drama"],
                  ["Flow", "Body-Mapped"],
                  ["Session", "Private Focus"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                      {label}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white/85">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.10)] p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Artist Note
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  If it looks easy, the prep was brutal. Every piece is designed to
                  feel intentional from distance and devastating up close.
                </p>
              </div>

              <a
                href="/pricing"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
              >
                View Session Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">Ink Lab</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Sharp structure. Chaotic energy.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {labCards.map((c, i) => (
            <div
              key={c.title}
              className={`relative overflow-hidden rounded-[30px] border border-white/10 p-6 ${c.tone} ${c.span}`}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-[240px] w-[240px] rounded-full bg-[rgba(255,47,179,0.09)] blur-[90px]" />
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  style={{ opacity: 0.35 + i * 0.15 }}
                />
              </div>

              <div className="relative">
                <div className="mb-3 inline-flex rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Module 0{i + 1}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Ritual Timeline</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                From first message to final heal.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Every phase has a purpose: clarity, control, and a finished tattoo that still feels powerful years later.
              </p>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-[rgba(255,47,179,0.55)] via-white/15 to-transparent" />
              <div className="grid gap-4">
                {rituals.map((s) => (
                  <div key={s.id} className="relative rounded-[24px] border border-white/10 bg-black/25 p-4 pl-12">
                    <div className="absolute left-2.5 top-4 grid h-4 w-4 place-items-center rounded-full bg-[rgba(255,47,179,0.85)] shadow-[0_0_16px_rgba(255,47,179,0.55)]" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-semibold tracking-tight">
                        {s.id} / {s.title}
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60">
                        {s.flag}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,47,179,0.14),rgba(255,255,255,0.04))] p-7 sm:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-[-160px] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.14)] blur-[150px]" />
            <div className="absolute -right-20 bottom-[-180px] h-[540px] w-[540px] rounded-full bg-[rgba(255,47,179,0.10)] blur-[170px]" />
          </div>

          <div className="relative grid gap-7 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Final Call</div>
              <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to wear something that doesn&apos;t look like everyone else?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                Send references, placement, and size. I&apos;ll reply with availability, design direction, and next steps.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="/booking"
                className="pink-edge inline-flex w-full items-center justify-center rounded-2xl border border-[rgba(255,47,179,0.30)] bg-[rgba(255,47,179,0.16)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.22)] md:w-auto"
              >
                Start Booking
              </a>
              <a
                href="/gallery"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10 md:w-auto"
              >
                Explore Gallery
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
