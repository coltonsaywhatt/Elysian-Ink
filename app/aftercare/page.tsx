const blocks = [
  {
    title: "First 24 hours",
    items: [
      "Leave bandage on as instructed.",
      "Wash hands before touching the tattoo.",
      "Avoid tight clothing rubbing the area.",
    ],
  },
  {
    title: "Days 2–7",
    items: [
      "Wash gently with unscented soap.",
      "Pat dry — don’t scrub.",
      "Apply a thin layer of aftercare lotion.",
    ],
  },
  {
    title: "Weeks 2–4",
    items: [
      "Do not pick or peel.",
      "Avoid soaking (pools, hot tubs).",
      "Use sunscreen after fully healed.",
    ],
  },
];

export default function AftercarePage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          Aftercare
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Heal it clean. Keep it crisp.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
          Follow these basics to protect your tattoo and keep it looking sharp.
          If anything feels off, reach out.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {blocks.map((b) => (
          <div key={b.title} className="glass soft-glow rounded-[32px] p-6 sm:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">
              {b.title}
            </div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {b.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,47,179,0.95)]" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-8">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          Avoid
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Direct sun, soaking, scratching, scented products, and gym friction on fresh tattoos.
          Healing takes time — protect the work.
        </p>
      </div>
    </div>
  );
}
