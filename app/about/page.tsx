export default function AboutPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          About
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Solo studio. Serious craft.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
          Elysian Ink is built for people who want a calm, focused session and clean execution.
          Appointment-only means your time is protected.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass soft-glow rounded-[32px] p-6 sm:p-8">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">
            The vibe
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Dark romance energy, neon accents, and a clean studio setup. Custom-first work with
            thoughtful design choices.
          </p>
        </div>

        <div className="glass soft-glow rounded-[32px] p-6 sm:p-8">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">
            What I do
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Custom pieces, blackwork, fine-line, and modern dark floral (swap these to match your style).
            You bring the spark — we build the final design together.
          </p>
        </div>
      </div>
    </div>
  );
}
