// app/about/page.tsx
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  Droplet,
  HeartHandshake,
  Stars,
  ScanEye,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const PINK = "rgba(255,47,179,0.85)";
const PINK_SOFT = "rgba(255,47,179,0.12)";
const PINK_EDGE = "rgba(255,47,179,0.22)";

/** ====== content ====== */
const bento = [
  {
    title: "Custom-first",
    desc: "Every piece is built for your body, placement, and vibe — not copied and pasted.",
    icon: Sparkles,
  },
  {
    title: "Clean execution",
    desc: "Crisp linework, controlled shading, and a healed result that still hits.",
    icon: ScanEye,
  },
  {
    title: "Private sessions",
    desc: "Appointment-only means no chaos — just focus, comfort, and a premium experience.",
    icon: ShieldCheck,
  },
  {
    title: "Design guidance",
    desc: "Not sure what you want? Bring references — I’ll translate it into something real.",
    icon: HeartHandshake,
  },
];

const values = [
  {
    k: "Precision",
    v: "The little details are the whole point. Clean lines. Strong contrast. Thoughtful flow.",
    icon: ScanEye,
  },
  {
    k: "Comfort",
    v: "This is your body — so the session should feel safe, calm, and controlled.",
    icon: HeartHandshake,
  },
  {
    k: "Professionalism",
    v: "Clear communication, punctual sessions, and a process that respects your time.",
    icon: Clock,
  },
  {
    k: "Hygiene",
    v: "Sterile setup, single-use where appropriate, and a clean workspace — every session.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    n: "01",
    t: "Request",
    d: "Send references, placement, approximate size, and your availability.",
  },
  {
    n: "02",
    t: "Design",
    d: "We align on the concept and finalize details for your body and placement.",
  },
  {
    n: "03",
    t: "Session",
    d: "Focused time. Clean execution. A vibe that’s calm but intense.",
  },
  {
    n: "04",
    t: "Aftercare",
    d: "You get clear instructions so it heals crisp. Questions? I’ve got you.",
  },
];

const faqs = [
  {
    q: "Do you do walk-ins?",
    a: "No — Elysian Ink is appointment-only so every session is private and focused.",
  },
  {
    q: "Can I bring a friend?",
    a: "Usually sessions are solo so you can relax and I can stay locked in. If you need someone, message first.",
  },
  {
    q: "Do you copy designs?",
    a: "I use references for inspiration, but the final design is custom-built for you.",
  },
  {
    q: "How do I get the fastest quote?",
    a: "Send 3–5 references + placement + approximate size + any style notes you care about.",
  },
];

/** ====== tiny UI helpers ====== */
function SectionShell({
  kicker,
  title,
  desc,
  children,
  className,
  innerClassName,
}: {
  kicker?: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      className={cx(
        "relative mt-10 overflow-hidden rounded-[36px] border border-white/10 bg-white/5",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-56 h-[640px] w-[640px] rounded-full bg-[rgba(255,47,179,0.07)] blur-[180px]" />
        <div className="absolute -right-44 -bottom-64 h-[740px] w-[740px] rounded-full bg-[rgba(255,47,179,0.05)] blur-[200px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.10)] to-transparent" />
      </div>

      <div className={cx("relative p-6 sm:p-10", innerClassName)}>
        <div className="mb-6">
          {kicker ? (
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">
              {kicker}
            </div>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {desc ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
              {desc}
            </p>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}

function GlowDivider() {
  return (
    <div className="pointer-events-none my-10 h-px w-full bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.25)] to-transparent opacity-80" />
  );
}

export default function AboutPage() {
  const reduce = useReducedMotion();

  const heroStagger = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduce ? 0 : 10 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as unknown as any },
      },
    }),
    [reduce]
  );

  const listStagger = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.06, delayChildren: 0.05 },
      },
    }),
    []
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduce ? 0 : 10 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] as unknown as any },
      },
    }),
    [reduce]
  );

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10">
        {/* top sheen + blooms */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-[-160px] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.10)] blur-[160px]" />
          <div className="absolute -right-28 bottom-[-180px] h-[620px] w-[620px] rounded-full bg-[rgba(255,47,179,0.06)] blur-[190px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.28)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
        </div>

        {/* subtle grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.20]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08) 0, transparent 38%), radial-gradient(circle at 80% 40%, rgba(255,47,179,0.10) 0, transparent 44%), radial-gradient(circle at 50% 90%, rgba(255,255,255,0.06) 0, transparent 40%)",
          }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          {/* COPY */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={listStagger}
            className="relative"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: PINK }}
              />
              Solo artist • Appointment only • Black-first
            </motion.div>

            <motion.h1
              variants={heroStagger}
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              About Elysian Ink
            </motion.h1>

            <motion.p
              variants={heroStagger}
              className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base"
            >
              Carissa Stone is a solo tattoo artist based in Webster, Florida,
              originally born and raised in Connecticut. She began her tattoo
              journey in December, stepping into the craft with a deep respect
              for precision, creativity, and personal expression.
              <br />
              <br />
              Though new to the industry, Carissa approaches every piece with
              intention and discipline. Her focus is on creating clean,
              thoughtful tattoos that feel personal and powerful — designs that
              not only look good today, but heal beautifully and hold meaning
              over time.
              <br />
              <br />
              Working in a private, appointment-only setting, she values
              comfort, communication, and building trust with every client. Each
              session is about more than just ink — it’s about creating
              something lasting.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/booking"
                className="group inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold tracking-wide transition"
                style={{
                  borderColor: PINK_EDGE,
                  backgroundColor: "rgba(255,47,179,0.10)",
                }}
              >
                Request Booking
                <ArrowRight className="ml-2 h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
              >
                View Gallery
              </Link>
            </motion.div>

            {/* quick “signature” chips */}
            <motion.div variants={item} className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: Droplet, label: "Clean linework" },
                { icon: Stars, label: "High-contrast shading" },
                { icon: ShieldCheck, label: "Private sessions" },
                { icon: MapPin, label: "Webster, FL" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/70"
                >
                  <c.icon className="h-4 w-4 opacity-75" />
                  {c.label}
                </div>
              ))}
            </motion.div>

            <motion.p variants={item} className="mt-3 text-xs text-white/55">
              Want the fastest quote? Send references + placement + approximate
              size.
            </motion.p>

            {/* micro stats */}
            <motion.div variants={item} className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Appointment-only", v: "Focused, private sessions", icon: Clock },
                { k: "Custom designs", v: "Built for your body", icon: Sparkles },
                { k: "Clean standards", v: "Hygiene + process", icon: ShieldCheck },
              ].map((s) => (
                <div
                  key={s.k}
                  className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 p-4"
                >
                  <div className="pointer-events-none absolute inset-0">
                    <div
                      className="absolute -right-16 -top-16 h-[170px] w-[170px] rounded-full blur-[90px]"
                      style={{ backgroundColor: PINK_SOFT }}
                    />
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
                      <s.icon className="h-4 w-4 opacity-75" />
                      {s.k}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/85">
                      {s.v}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ARTIST CARD */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as unknown as any }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-[32px] bg-[rgba(255,47,179,0.07)] blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/30 p-5 sm:p-6">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute -bottom-28 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(255,47,179,0.12)] blur-[140px]" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                    The Artist
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: PINK }} />
                    Carissa Stone
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-[26px] border border-white/10 bg-black/30">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src="/artist1.jpg"
                      alt="Tattoo Artist"
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 opacity-70">
                      <div className="absolute -left-20 -top-24 h-[260px] w-[260px] rounded-full bg-[rgba(255,47,179,0.12)] blur-[90px]" />
                      <div className="absolute -right-16 bottom-[-90px] h-[280px] w-[280px] rounded-full bg-[rgba(255,255,255,0.06)] blur-[110px]" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                      Specialty
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/85">
                      Realism
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      Fine-line, traditional, floral, etc.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                      Vibe
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/85">
                      Calm session • Clean hits
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      Private sessions are built for comfort + focus.
                    </p>
                  </div>
                </div>

                <Link
                  href="/pricing"
                  className="group mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4 opacity-80 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      {/* The rest of your sections (Approach/Values/Process/Studio/FAQ/CTA) can stay exactly as-is from the version you pasted.
          Nothing else depended on Ink — only that one chip icon. */}
    </div>
  );
}
