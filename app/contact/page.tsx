export default function ContactPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          Contact
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Reach out
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
          For booking, use the booking page. For everything else, send a message here.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <form className="glass soft-glow rounded-[32px] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" placeholder="Your name" />
            <Field label="Email" placeholder="you@email.com" type="email" />
          </div>
          <div className="mt-4">
            <Field label="Subject" placeholder="What’s up?" />
          </div>
          <div className="mt-4">
            <label className="text-xs font-semibold tracking-wide text-white/75">
              Message
            </label>
            <textarea
              rows={7}
              placeholder="Type your message..."
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/35 focus:border-[rgba(255,47,179,0.55)]"
            />
          </div>

          <button
            type="button"
            className="neon-border pink-glow mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[rgba(255,47,179,0.16)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.22)]"
          >
            Send Message
          </button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">
              Studio
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Appointment-only. Private sessions. No walk-ins.
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                Email: <span className="text-white/85">hello@elysianink.com</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                Location: <span className="text-white/85">Your City, ST</span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">
              Best way to book
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Use the booking form so your request has everything needed for quoting + scheduling.
            </p>
            <a
              href="/booking"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-black/25 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
            >
              Go to Booking
            </a>
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
