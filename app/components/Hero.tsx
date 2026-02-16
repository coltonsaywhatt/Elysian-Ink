"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Flame, ShieldCheck } from "lucide-react";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const rx = (e.clientY / window.innerHeight - 0.5) * 6;
      const ry = (e.clientX / window.innerWidth - 0.5) * -8;
      setTilt({ x: rx, y: ry });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  const badges = useMemo(
    () => [
      { icon: ShieldCheck, label: "Clean + sterile setup" },
      { icon: Flame, label: "Custom-first work" },
      { icon: Sparkles, label: "Appointment only" },
    ],
    []
  );

  return (
    <section className="relative z-10">
      {/* Dark cinematic backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute inset-0 edge-fade" />
        <div className="absolute inset-0 scanlines" />
        {/* a couple controlled pink blooms */}
        <div className="absolute left-[18%] top-[-120px] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.10)] blur-[120px]" />
        <div className="absolute right-[8%] top-[40px] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.08)] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/40 backdrop-blur-xl subtle-ring">
          {/* micro highlight */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.35)] to-transparent" />
            <div className="absolute -left-20 top-[-120px] h-[420px] w-[420px] rounded-full bg-[rgba(255,47,179,0.09)] blur-[120px]" />
          </div>

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:p-12">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
                <span className="inline-block h-2 w-2 rounded-full bg-[rgba(255,47,179,0.9)]" />
                Solo appointment-only studio
              </div>

              <motion.h1
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
                className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Elysian Ink
                <span className="block text-white/70">
                  private sessions. loud results.
                </span>
              </motion.h1>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {badges.map((b) => (
                  <div
                    key={b.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <b.icon className="h-5 w-5 text-[rgba(255,47,179,0.95)]" />
                    <div className="mt-2 text-xs font-semibold tracking-wide text-white/85">
                      {b.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/booking"
                  className="pink-edge inline-flex items-center justify-center gap-2 rounded-2xl border border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.10)] px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-[rgba(255,47,179,0.14)]"
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

              <p className="mt-3 text-xs text-white/55">
                No walk-ins. Limited monthly slots. Response 24–48h.
              </p>
            </div>

            {/* Right: logo shrine */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[32px] bg-[rgba(255,47,179,0.06)] blur-2xl" />

              <motion.div
                style={
                  reduce
                    ? undefined
                    : {
                        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                      }
                }
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/5 to-black/30 p-5 sm:p-6"
              >
                {/* controlled “frame” lighting */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[rgba(255,47,179,0.10)]" />
                  <div className="absolute -bottom-28 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(255,47,179,0.10)] blur-[120px]" />
                </div>

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                      Signature mark
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                      Custom-first • Appointment-only
                    </div>
                  </div>

                  <div className="relative mx-auto w-full max-w-[520px]">
                    <div className="absolute inset-0 rounded-[28px] bg-[rgba(255,47,179,0.10)] blur-[50px] opacity-60" />
                    <Image
                      src="/logo.png"
                      alt="Elysian Ink Logo"
                      width={1200}
                      height={1200}
                      priority
                      className="relative w-full select-none drop-shadow-[0_0_22px_rgba(255,47,179,0.35)]"
                    />
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                      <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Style focus
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        Custom work with bold contrast and clean detail.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                      <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Booking tip
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        Include refs + placement + size for fastest quote.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/about"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
                  >
                    About Us
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
