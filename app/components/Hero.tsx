"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Clock4, MapPin } from "lucide-react";

export default function Hero() {
  const reduce = useReducedMotion();

  const words = useMemo(
    () => ["Clean lines.", "Dark romance.", "Neon ink.", "Custom pieces."],
    []
  );

  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5">
          {/* top glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[10%] top-[-140px] h-[380px] w-[380px] rounded-full bg-[rgba(255,47,179,0.22)] blur-[90px]" />
            <div className="absolute right-[0%] top-[-180px] h-[460px] w-[460px] rounded-full bg-[rgba(255,47,179,0.14)] blur-[110px]" />
          </div>

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:p-12">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/75">
                <Sparkles className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
                Solo appointment-only studio • Black + Pink theme
              </div>

              <motion.h1
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
                className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Elysian Ink
                <span className="block text-white/70">
                  Where chaos turns into craft.
                </span>
              </motion.h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Custom tattoos with a clean, premium experience. A private session
                built around your idea — designed carefully, executed precisely.
              </p>

              {/* Animated “rotator” without heavy state */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {words.map((w, idx) => (
                  <motion.span
                    key={w}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.10 + idx * 0.08,
                      ease: [0.2, 0.9, 0.2, 1],
                    }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75"
                  >
                    {w}
                  </motion.span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/booking"
                  className="neon-border pink-glow inline-flex items-center justify-center gap-2 rounded-2xl bg-[rgba(255,47,179,0.16)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.22)]"
                >
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
                >
                  View Gallery
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: ShieldCheck, label: "Sterile Setup", sub: "Clean & careful" },
                  { icon: Clock4, label: "Appointment Only", sub: "Focused sessions" },
                  { icon: MapPin, label: "Private Studio", sub: "No chaos, all craft" },
                ].map((i) => (
                  <div
                    key={i.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <i.icon className="h-5 w-5 text-[rgba(255,47,179,0.95)]" />
                    <div className="mt-2 text-sm font-semibold">{i.label}</div>
                    <div className="mt-1 text-xs text-white/60">{i.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[32px] bg-[rgba(255,47,179,0.08)] blur-2xl" />

              <div className="glass soft-glow rounded-[32px] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                      Booking Queue
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight">
                      Request a Slot
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                    Response: 24–48h
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Include your idea + reference pics",
                    "Placement + approximate size",
                    "Black & pink vibe welcome",
                    "Budget range (optional)",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[rgba(255,47,179,0.95)]" />
                      <div className="text-sm text-white/75">{t}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                    Studio vibe
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Dark, clean, neon-glow energy. Minimal distractions. Maximum focus.
                  </p>
                </div>

                <div className="mt-5">
                  <Link
                    href="/booking"
                    className="neon-border pink-glow inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[rgba(255,47,179,0.16)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.22)]"
                  >
                    Start Booking <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* floating accent chips */}
              {!reduce && (
                <>
                  <motion.div
                    className="absolute -right-2 -top-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Neon-ready ✦
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-3 left-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Black + Pink only
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
