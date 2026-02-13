export default function BookingPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          Booking Request
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Appointment Only
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
          Fill out the request form below. Include references, placement, and
          approximate size so we can quote accurately and find the right time slot.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <form className="glass soft-glow rounded-[32px] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" placeholder="Your name" />
            <Field label="Email" placeholder="you@email.com" type="email" />
            <Field label="Phone" placeholder="(###) ###-####" />
            <Field label="Preferred Contact" placeholder="Text or Email" />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Placement" placeholder="Forearm, thigh, etc." />
            <Field label="Approx. Size" placeholder='e.g. "4 inches"' />
          </div>

          <div className="mt-4">
            <Field label="Style / Vibe" placeholder="Blackwork, fine-line, dark floral, etc." />
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold tracking-wide text-white/75">
              Describe Your Idea
            </label>
            <textarea
              rows={6}
              placeholder="Tell me what you're imagining. Include meaning, elements, and any must-haves."
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/35 focus:border-[rgba(255,47,179,0.55)]"
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Budget Range (optional)" placeholder="$___ - $___" />
            <Field label="Availability" placeholder="Weekends / evenings / flexible" />
          </div>

          <button
            type="button"
            className="neon-border pink-glow mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[rgba(255,47,179,0.16)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.22)]"
          >
            Submit Booking Request
          </button>

          <p className="mt-3 text-xs leading-relaxed text-white/55">
            This form is a request — not a confirmed appointment. You’ll receive a reply with
            availability and next steps.
          </p>
        </form>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">
              What to include
            </div>
            <ul className="mt-3 space-y-3 text-sm text-white/70">
              {[
                "Reference images (links are fine)",
                "Placement + approximate size",
                "Any must-have elements or dealbreakers",
                "If you want color: note it (theme is black/pink)",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(255,47,179,0.95)]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">
              Studio Policy
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Appointment-only. Deposits may be required to secure a slot. Please arrive on time.
              No extra guests unless discussed beforehand.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold tracking-wide text-white/75">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/35 focus:border-[rgba(255,47,179,0.55)]"
      />
    </div>
  );
}
