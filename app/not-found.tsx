import Link from "next/link";

const shards = [
  { label: "Signal Lost", value: "404" },
  { label: "Route Status", value: "Unknown" },
  { label: "Studio Path", value: "Reroute" },
];

export default function NotFound() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="relative w-full overflow-hidden rounded-[40px] border border-white/10 bg-black/35 p-6 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.14)] blur-[150px]" />
          <div className="absolute -right-20 bottom-[-180px] h-[560px] w-[560px] rounded-full bg-[rgba(255,47,179,0.11)] blur-[170px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.45)] to-transparent" />
          <div className="grid-fade absolute inset-0 opacity-20" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/65">
              Page not found
            </div>

            <div className="mt-5">
              <div className="text-[clamp(4rem,20vw,11rem)] font-semibold leading-none tracking-[-0.04em] text-white/90">
                404
              </div>
              <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                This route got lost in the dark.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                The page you requested does not exist, moved, or was never meant to be seen.
                Head back to safe ground or jump straight into booking.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/"
                className="pink-edge inline-flex items-center justify-center rounded-2xl border border-[rgba(255,47,179,0.28)] bg-[rgba(255,47,179,0.14)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.20)]"
              >
                Return Home
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
              >
                Book Session
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
              >
                View Gallery
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-[rgba(255,47,179,0.10)] blur-2xl" />
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Crash Log</div>
              <div className="mt-4 grid gap-3">
                {shards.map((s, idx) => (
                  <div
                    key={s.label}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.50)] to-transparent"
                      style={{ opacity: 0.35 + idx * 0.2 }}
                    />
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                      {s.label}
                    </div>
                    <div className="mt-1 text-lg font-semibold tracking-tight text-white/90">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">Tip</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  If you typed the URL manually, check spelling. Otherwise, use the links
                  to continue browsing the studio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
