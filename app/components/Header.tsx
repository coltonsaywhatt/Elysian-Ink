"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Instagram,
  MapPin,
  Sparkles,
  Facebook,
  Phone,
  Mail,
} from "lucide-react";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

type NavItem = { label: string; href: string; badge?: string };

export default function Header() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav: NavItem[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6">
        <div
          className={cx(
            "relative mx-auto max-w-6xl overflow-hidden rounded-[26px] border backdrop-blur-2xl transition-all duration-300",
            scrolled
              ? "border-white/20 bg-black/70 shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
              : "border-white/10 bg-black/45 shadow-[0_14px_46px_rgba(0,0,0,0.42)]"
          )}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.55)] to-transparent" />
            <div className="absolute -left-12 top-[-40px] h-[180px] w-[180px] rounded-full bg-[rgba(255,47,179,0.16)] blur-[70px]" />
            <div className="absolute -right-12 top-[-50px] h-[200px] w-[200px] rounded-full bg-[rgba(255,47,179,0.14)] blur-[85px]" />
          </div>

          <div className="relative flex items-center justify-between px-4 py-3 sm:px-5 lg:px-7">
            <Link href="/" className="group flex items-center gap-3 sm:gap-4">
              <div className="relative h-16 w-16 transition group-hover:scale-[1.03] sm:h-20 sm:w-20">
                <Image
                  src="/logo.png"
                  alt="Elysian Ink"
                  fill
                  className="object-contain drop-shadow-[0_0_34px_rgba(255,47,179,0.32)]"
                  priority
                />
              </div>

              <div className="leading-tight">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold tracking-tight sm:text-lg">
                    Elysian Ink
                  </span>
                  <span className="hidden rounded-full border border-[rgba(255,47,179,0.35)] bg-[rgba(255,47,179,0.16)] px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-white/90 md:inline-flex">
                    APPOINTMENT ONLY
                  </span>
                </div>
                <div className="hidden text-xs text-white/60 sm:block">
                  Private studio. Premium custom tattoo sessions.
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 xl:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative rounded-2xl border border-transparent px-3.5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/10 hover:bg-white/8 hover:text-white"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {item.label}
                    {item.badge ? (
                      <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-white/70">
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.55)] to-transparent opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 lg:flex">
                <a
                  href="https://www.instagram.com/elysian.ink_"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/8 text-white/75 transition hover:border-white/20 hover:bg-white/12 hover:text-white"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <a
                  href="https://www.facebook.com/ElysianInktattoo"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/8 text-white/75 transition hover:border-white/20 hover:bg-white/12 hover:text-white"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>

              <Link
                href="/booking"
                className="hidden items-center justify-center gap-2 rounded-2xl border border-[rgba(255,47,179,0.30)] bg-[rgba(255,47,179,0.16)] px-4.5 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,47,179,0.18),0_0_36px_rgba(255,47,179,0.16)] transition hover:bg-[rgba(255,47,179,0.22)] md:inline-flex"
              >
                Book Session
                <ArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/8 text-white/85 transition hover:bg-white/12 xl:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative hidden border-t border-white/10 lg:block">
            <div className="flex items-center justify-between px-7 py-2 text-[11px] uppercase tracking-[0.2em] text-white/55">
              <div className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[rgba(255,47,179,0.95)]" />
                Limited monthly slots
              </div>
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[rgba(255,47,179,0.95)]" />
                Webster, FL
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={reduce ? { x: 0 } : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }
              }
              className="fixed inset-0 z-50 w-screen overflow-hidden border-0 bg-black/95 backdrop-blur-2xl sm:bottom-3 sm:right-3 sm:top-3 sm:w-[94vw] sm:max-w-[440px] sm:rounded-[30px] sm:border sm:border-white/15 sm:bg-black/90"
              aria-label="Mobile menu"
            >
              <div className="relative flex h-[100dvh] min-h-0 flex-col overflow-y-auto overscroll-contain p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:h-full sm:p-5">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-24 top-[-120px] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.14)] blur-[150px]" />
                  <div className="absolute -left-20 bottom-[-140px] h-[420px] w-[420px] rounded-full bg-[rgba(255,47,179,0.12)] blur-[140px]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.45)] to-transparent" />
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                      <Image
                        src="/logo.png"
                        alt="Elysian Ink"
                        fill
                        className="object-contain drop-shadow-[0_0_34px_rgba(255,47,179,0.32)]"
                      />
                    </div>
                    <div>
                      <div className="text-base font-semibold">Elysian Ink</div>
                      <div className="text-xs uppercase tracking-[0.18em] text-white/60">
                        appointment only
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/8 text-white/85 transition hover:bg-white/12"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-[26px] border border-white/10 bg-white/8 p-4">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[rgba(255,47,179,0.22)] blur-[48px]" />
                  </div>
                  <div className="relative flex items-start gap-3">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/35">
                      <Sparkles className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/95">
                        Private sessions. Loud results.
                      </div>
                      <div className="mt-1 text-sm leading-relaxed text-white/75">
                        Custom design, clean heals, and a premium studio workflow.
                      </div>
                      <div className="mt-3 hidden items-center gap-2 rounded-full border border-[rgba(255,47,179,0.30)] bg-[rgba(255,47,179,0.16)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85 sm:inline-flex">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[rgba(255,47,179,0.95)]" />
                        Now booking: March / April
                      </div>
                    </div>
                  </div>
                </div>

                <nav className="mt-5 grid gap-2.5">
                  {nav.map((item, idx) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cx(
                        "group flex items-center justify-between rounded-[22px] border px-4 py-3.5 text-sm font-semibold transition",
                        pathname === item.href
                          ? "border-[rgba(255,47,179,0.34)] bg-[rgba(255,47,179,0.14)] text-white"
                          : "border-white/10 bg-black/30 text-white/85 hover:border-[rgba(255,47,179,0.30)] hover:bg-white/10"
                      )}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span
                          className={cx(
                            "text-[10px] tracking-[0.2em]",
                            pathname === item.href ? "text-white/70" : "text-white/45"
                          )}
                        >
                          0{idx + 1}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      <ArrowRight
                        className={cx(
                          "h-4 w-4 transition group-hover:translate-x-0.5",
                          pathname === item.href ? "text-white/90" : "text-white/55 group-hover:text-white/90"
                        )}
                      />
                    </Link>
                  ))}
                </nav>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href="tel:+12039279852"
                    className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-white/8 px-3 py-2.5 text-xs font-semibold tracking-[0.08em] text-white/85 transition hover:bg-white/12"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call
                  </a>
                  <a
                    href="mailto:Elysian.Ink@outlook.com"
                    className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-white/8 px-3 py-2.5 text-xs font-semibold tracking-[0.08em] text-white/85 transition hover:bg-white/12"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </a>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <a
                    href="https://www.instagram.com/elysian.ink_"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/12"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/ElysianInktattoo"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/12"
                  >
                    <Facebook className="h-4 w-4" /> Facebook
                  </a>
                </div>

                <div className="mt-5 pt-4 sm:mt-auto sm:pt-5">
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[22px] border border-[rgba(255,47,179,0.34)] bg-[rgba(255,47,179,0.20)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,47,179,0.22),0_0_46px_rgba(255,47,179,0.20)] transition hover:bg-[rgba(255,47,179,0.28)]"
                  >
                    Book Session <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="mt-4 text-center text-xs text-white/45">
                  © {new Date().getFullYear()} Elysian Ink
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
