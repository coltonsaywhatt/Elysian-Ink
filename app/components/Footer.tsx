import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Clock3,
} from "lucide-react";

const navLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Gallery", "/gallery"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"],
  ["Booking", "/booking"],
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/45">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.08)] blur-[140px]" />
        <div className="absolute right-[-180px] top-[-260px] h-[760px] w-[760px] rounded-full bg-[rgba(255,47,179,0.06)] blur-[190px]" />
      </div>

      <div className="relative border-b border-white/10">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/70 to-transparent" />
        <div className="flex whitespace-nowrap py-2 text-[10px] uppercase tracking-[0.28em] text-white/60">
          <div className="animate-[footerMarquee_22s_linear_infinite]">
            <span className="mx-5">appointment only</span>
            <span className="mx-5">custom built tattoos</span>
            <span className="mx-5">private studio atmosphere</span>
            <span className="mx-5">your idea, elevated</span>
            <span className="mx-5">clean lines that age well</span>
            <span className="mx-5">designed for your body flow</span>
            <span className="mx-5">healed results you will brag about</span>
            <span className="mx-5">serious craft, zero chaos</span>
            <span className="mx-5">first tattoo? you are in good hands</span>
          </div>
          <div className="animate-[footerMarquee_22s_linear_infinite]">
            <span className="mx-5">appointment only</span>
            <span className="mx-5">custom built tattoos</span>
            <span className="mx-5">private studio atmosphere</span>
            <span className="mx-5">your idea, elevated</span>
            <span className="mx-5">clean lines that age well</span>
            <span className="mx-5">designed for your body flow</span>
            <span className="mx-5">healed results you will brag about</span>
            <span className="mx-5">serious craft, zero chaos</span>
            <span className="mx-5">first tattoo? you are in good hands</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-6 lg:col-span-5">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-24 h-[260px] w-[260px] rounded-full bg-[rgba(255,47,179,0.12)] blur-[95px]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.40)] to-transparent" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/65">
                <Sparkles className="h-3.5 w-3.5 text-[rgba(255,47,179,0.95)]" />
                Elysian Ink
              </div>

              <div className="mt-4 flex items-end gap-4">
                <div className="relative h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]">
                  <Image
                    src="/logo.png"
                    alt="Elysian Ink"
                    fill
                    className="object-contain drop-shadow-[0_0_26px_rgba(255,47,179,0.45)]"
                    priority
                  />
                </div>
                <div>
                  <div className="text-xl font-semibold tracking-tight">Elysian Ink</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/55">
                    Private Tattoo Studio
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/72">
                One artist. One chair. One focused session at a time. Built for clients who want
                custom work with intent, precision, and long-term impact.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/70">
                  Appointment only
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/70">
                  Webster, FL
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/70">
                  Custom-first
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">Navigate</div>
            <div className="mt-4 grid gap-2">
              {navLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                  <span>{label}</span>
                  <ArrowRight className="h-4 w-4 text-white/45" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-4">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Studio Status</div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm">
                  <span className="inline-flex items-center gap-2 text-white/75">
                    <Clock3 className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
                    Availability
                  </span>
                  <span className="rounded-full border border-[rgba(255,47,179,0.25)] bg-[rgba(255,47,179,0.12)] px-2 py-0.5 text-xs text-white/85">
                    Limited
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm">
                  <span className="inline-flex items-center gap-2 text-white/75">
                    <MapPin className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
                    Location
                  </span>
                  <span className="text-white/70">Webster, FL</span>
                </div>
              </div>

              <Link
                href="/booking"
                className="pink-edge mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(255,47,179,0.26)] bg-[rgba(255,47,179,0.14)] px-4 py-3 text-sm font-semibold transition hover:bg-[rgba(255,47,179,0.20)]"
              >
                Book Session <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">Direct Line</div>
              <div className="mt-4 space-y-2">
                <a
                  href="mailto:Elysian.Ink@outlook.com"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="inline-flex min-w-0 items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-[rgba(255,47,179,0.90)]" />
                    <span className="truncate">Elysian.Ink@outlook.com</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/45" />
                </a>
                <a
                  href="tel:+12039279852"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="inline-flex min-w-0 items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-[rgba(255,47,179,0.90)]" />
                    <span className="truncate">(203) 927-9852</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/45" />
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href="https://www.instagram.com/elysian.ink_"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/25 text-white/75 transition hover:bg-white/10 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/ElysianInktattoo"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/25 text-white/75 transition hover:bg-white/10 hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/55 sm:flex-row">
          <div>© 2026 Elysian Ink. Dark ink. Clean finish.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white/80">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes footerMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}
