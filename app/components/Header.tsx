"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const nav = [
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Aftercare", href: "/aftercare" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-3xl border border-white/10 bg-black/35 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 sm:px-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <span className="absolute inset-0 rounded-2xl bg-[rgba(255,47,179,0.18)] blur-md opacity-0 transition group-hover:opacity-100" />
                <Sparkles className="relative h-5 w-5 text-[rgba(255,47,179,0.95)]" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">
                  Elysian Ink
                </div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/55">
                  Appointment Only
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="rounded-2xl px-4 py-2 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
                >
                  {i.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="neon-border ml-2 inline-flex items-center justify-center rounded-2xl bg-[rgba(255,47,179,0.14)] px-4 py-2 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.20)]"
              >
                Book
              </Link>

              <a
                href="#"
                aria-label="Instagram"
                className="ml-1 grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <FaInstagram />
              </a>
            </nav>

            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 md:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={reduce ? { x: 0, opacity: 1 } : { x: 22, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduce ? { x: 0, opacity: 0 } : { x: 22, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              className="fixed right-3 top-3 z-[60] w-[min(92vw,380px)] overflow-hidden rounded-[28px] border border-white/10 bg-[#09090d]/95 shadow-2xl"
            >
              <div className="flex items-center justify-between p-4">
                <div>
                  <div className="text-sm font-semibold">Elysian Ink</div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/55">
                    Menu
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X />
                </button>
              </div>

              <div className="px-4 pb-4">
                <div className="grid gap-2">
                  {nav.map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
                    >
                      {i.label}
                    </Link>
                  ))}
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="neon-border pink-glow mt-1 inline-flex items-center justify-center rounded-2xl bg-[rgba(255,47,179,0.16)] px-4 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.22)]"
                  >
                    Book Appointment
                  </Link>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                    Studio Notes
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Appointment-only. No walk-ins. Please include references +
                    placement + approximate size when booking.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
