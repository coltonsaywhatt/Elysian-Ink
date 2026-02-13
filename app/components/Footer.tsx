import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="text-lg font-semibold tracking-tight">
                Elysian Ink
              </div>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                Solo appointment-only tattoo studio. Custom work, clean execution,
                and a premium session experience.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <span className="text-xs text-white/60">
                  Follow for fresh work + cancellations
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Booking", href: "/booking" },
                { label: "Gallery", href: "/gallery" },
                { label: "Pricing", href: "/pricing" },
                { label: "Aftercare", href: "/aftercare" },
                { label: "Contact", href: "/contact" },
                { label: "Home", href: "/" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} Elysian Ink. All rights reserved.</div>
            <div>Appointment-only • No walk-ins</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
