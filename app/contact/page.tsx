"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Info,
  Mail,
  Phone,
  MapPin,
  Clock4,
  Sparkles,
  Instagram,
  Link as LinkIcon,
} from "lucide-react";

type ContactReason = "general" | "booking" | "aftercare" | "collab" | "other";
type ContactMethod = "email" | "text";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;

  reason: ContactReason;
  subject: string;
  message: string;

  availability: string;

  agree: boolean;
};

const STEPS = [
  { id: "contact", title: "Contact" },
  { id: "message", title: "Message" },
  { id: "review", title: "Review" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function ContactPage() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    contactMethod: "email",

    reason: "general",
    subject: "",
    message: "",

    availability: "",
    agree: false,
  });

  const step = STEPS[stepIndex];

  const progress = useMemo(() => {
    const total = STEPS.length - 1;
    return total === 0 ? 1 : stepIndex / total;
  }, [stepIndex]);

  const missing = useMemo(() => validate(form), [form]);

  const canGoNext = useMemo(() => {
    if (step.id === "contact") {
      return (
        !!form.name.trim() &&
        isValidEmail(form.email) &&
        isValidPhone(form.phone)
      );
    }
    if (step.id === "message") {
      return !!form.subject.trim() && !!form.message.trim();
    }
    if (step.id === "review") {
      return form.agree;
    }
    return false;
  }, [form, step.id]);

  function update<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  const next = () => setStepIndex((i) => clamp(i + 1, 0, STEPS.length - 1));
  const prev = () => setStepIndex((i) => clamp(i - 1, 0, STEPS.length - 1));

  async function submit() {
    if (!form.agree) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT;
      if (!endpoint) {
        throw new Error("Missing NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT.");
      }

      const body = new FormData();
      body.append("formType", "contact");
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("phone", form.phone);
      body.append("contactMethod", form.contactMethod);
      body.append("reason", form.reason);
      body.append("subject", form.subject);
      body.append("message", form.message);
      body.append("availability", form.availability);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      if (!res.ok) {
        const raw = await res.text().catch(() => "");
        let json: { errors?: Array<{ message?: string }> } | null = null;
        try {
          json = raw ? (JSON.parse(raw) as { errors?: Array<{ message?: string }> }) : null;
        } catch {
          json = null;
        }
        const message =
          json?.errors?.[0]?.message ||
          raw ||
          `Form submit failed (${res.status})`;
        throw new Error(message);
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send message right now.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted) {
    return (
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 text-sm text-white/65">
          Loading contact form...
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
          <Sparkles className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
          Contact • Fast replies • Appointment-only studio
        </div>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Get in touch
          <span className="block text-white/70">clean comms. quick answers.</span>
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Use this page for general questions, aftercare, collabs, or anything that
          isn’t a full booking request.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-start">
        {/* Left: Form */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-5 sm:p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                Step {stepIndex + 1} of {STEPS.length}
              </div>
              <div className="text-xs text-white/55">{step.title}</div>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full border border-white/10 bg-black/25">
              <motion.div
                initial={false}
                animate={{ width: `${Math.round(progress * 100)}%` }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }
                }
                className="h-full rounded-full bg-[rgba(255,47,179,0.65)]"
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {STEPS.map((s, idx) => {
                const active = idx === stepIndex;
                const done = idx < stepIndex;
                return (
                  <div
                    key={s.id}
                    className={cx(
                      "rounded-2xl border px-3 py-2 text-xs font-semibold transition",
                      active
                        ? "border-[rgba(255,47,179,0.30)] bg-[rgba(255,47,179,0.10)] text-white/90"
                        : done
                        ? "border-white/10 bg-white/5 text-white/75"
                        : "border-white/10 bg-black/20 text-white/55"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="uppercase tracking-[0.18em]">
                        {s.title}
                      </span>
                      {done ? (
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-[rgba(255,47,179,0.18)]">
                          <Check className="h-3 w-3 text-[rgba(255,47,179,0.95)]" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-white/45">
                          {idx + 1}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key={step.id}
                initial={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 0, y: 10, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -10, filter: "blur(8px)" }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }
                }
              >
                {step.id === "contact" && (
                  <StepContact form={form} update={update} missing={missing} />
                )}

                {step.id === "message" && (
                  <StepMessage form={form} update={update} missing={missing} />
                )}

                {step.id === "review" && (
                  <StepReview form={form} update={update} missing={missing} />
                )}

                {/* Nav */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={stepIndex === 0}
                    className={cx(
                      "inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold tracking-wide transition",
                      stepIndex === 0
                        ? "cursor-not-allowed border-white/10 bg-black/20 text-white/35"
                        : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  {step.id !== "review" ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canGoNext}
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold tracking-wide transition",
                        canGoNext
                          ? "border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.10)] text-white/90 hover:bg-[rgba(255,47,179,0.14)]"
                          : "cursor-not-allowed border-white/10 bg-black/20 text-white/35"
                      )}
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={!canGoNext || submitting}
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold tracking-wide transition",
                        canGoNext
                          ? "border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.10)] text-white/90 hover:bg-[rgba(255,47,179,0.14)]"
                          : "cursor-not-allowed border-white/10 bg-black/20 text-white/35"
                      )}
                    >
                      {submitting ? "Sending..." : "Send Message"} <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {submitError ? (
                  <div className="mt-3 rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-xs text-red-100">
                    {submitError}
                  </div>
                ) : null}

                {/* Small note */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-relaxed text-white/60">
                  <span className="font-semibold text-white/75">Booking?</span>{" "}
                  Use the{" "}
                  <Link
                    href="/booking"
                    className="text-white/80 underline underline-offset-4"
                  >
                    Booking page
                  </Link>{" "}
                  for quotes + scheduling.
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={
                  reduce
                    ? { opacity: 1 }
                    : { opacity: 0, y: 10, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }
                }
                className="py-6"
              >
                <div className="rounded-[32px] border border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.08)] p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,47,179,0.22)] bg-black/25 px-3 py-2 text-xs text-white/75">
                    <Check className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
                    Message sent
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                    Got it.
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    You’ll get a reply soon — usually within{" "}
                    <span className="font-semibold">24–48 hours</span>.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
                    >
                      Back Home
                    </Link>
                    <Link
                      href="/gallery"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
                    >
                      View Gallery
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side: Studio info */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          <StudioCard />
          <HelpCard />
        </aside>
      </div>
    </div>
  );
}

/* ===========================
   Steps
=========================== */

function StepContact({
  form,
  update,
  missing,
}: {
  form: ContactForm;
  update: <K extends keyof ContactForm>(key: K, value: ContactForm[K]) => void;
  missing: string[];
}) {
  return (
    <div>
      <SectionTitle
        kicker="Contact"
        title="How should I reach you?"
        desc="So your reply lands in the right place."
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          label="Full name"
          value={form.name}
          onChange={(v) => update("name", v)}
          placeholder="Your name"
          required
          error={missing.includes("name")}
        />
        <Input
          label="Email"
          value={form.email}
          onChange={(v) => update("email", v)}
          placeholder="you@email.com"
          required
          error={missing.includes("email")}
        />
        <Input
          label="Phone"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          placeholder="(203) 927-9852"
          required
          error={missing.includes("phone")}
        />

        <Select
          label="Preferred contact"
          value={form.contactMethod}
          onChange={(v) => update("contactMethod", v as any)}
          options={[
            { label: "Email", value: "email" },
            { label: "Text", value: "text" },
          ]}
        />
      </div>

      <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5">
        <div className="flex items-start gap-3">
          <span className="mt-1 grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/5">
            <Info className="h-4 w-4 text-white/70" />
          </span>
          <div>
            <div className="text-sm font-semibold text-white/85">Fast reply tip</div>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              If you’re asking about booking, include placement + size + references on the Booking page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepMessage({
  form,
  update,
  missing,
}: {
  form: ContactForm;
  update: <K extends keyof ContactForm>(key: K, value: ContactForm[K]) => void;
  missing: string[];
}) {
  return (
    <div>
      <SectionTitle
        kicker="Message"
        title="What’s up?"
        desc="Choose a reason and drop your question."
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Select
          label="Reason"
          value={form.reason}
          onChange={(v) => update("reason", v as any)}
          options={[
            { label: "General question", value: "general" },
            { label: "Booking question", value: "booking" },
            { label: "Aftercare", value: "aftercare" },
            { label: "Collab / media", value: "collab" },
            { label: "Other", value: "other" },
          ]}
        />
        <Input
          label="Subject"
          value={form.subject}
          onChange={(v) => update("subject", v)}
          placeholder="Quick summary (ex: aftercare question)"
          required
          error={missing.includes("subject")}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="Message"
          value={form.message}
          onChange={(v) => update("message", v)}
          placeholder="Tell me what you need — be as specific as you can."
          rows={7}
          required
          error={missing.includes("message")}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="Availability (optional)"
          value={form.availability}
          onChange={(v) => update("availability", v)}
          placeholder="If you want a call/text response: when are you available?"
          rows={4}
        />
      </div>
    </div>
  );
}

function StepReview({
  form,
  update,
  missing,
}: {
  form: ContactForm;
  update: <K extends keyof ContactForm>(key: K, value: ContactForm[K]) => void;
  missing: string[];
}) {
  const blockers = missing.filter((m) =>
    ["name", "email", "phone", "subject", "message"].includes(m)
  );

  return (
    <div>
      <SectionTitle
        kicker="Review"
        title="Confirm & send"
        desc="Quick review before it goes out."
      />

      {blockers.length > 0 && (
        <div className="mt-6 rounded-[28px] border border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.08)] p-5">
          <div className="text-sm font-semibold text-white/90">
            Missing essentials
          </div>
          <p className="mt-1 text-sm text-white/75">
            Please fill in: <span className="font-semibold">{blockers.join(", ")}</span>
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ReviewItem label="Name" value={form.name || "—"} />
        <ReviewItem label="Email" value={form.email || "—"} />
        <ReviewItem label="Phone" value={form.phone || "—"} />
        <ReviewItem
          label="Preferred contact"
          value={form.contactMethod === "text" ? "Text" : "Email"}
        />
        <ReviewItem
          label="Reason"
          value={
            form.reason === "general"
              ? "General"
              : form.reason === "booking"
              ? "Booking"
              : form.reason === "aftercare"
              ? "Aftercare"
              : form.reason === "collab"
              ? "Collab / media"
              : "Other"
          }
        />
        <ReviewItem label="Subject" value={form.subject || "—"} />
      </div>

      <div className="mt-4 rounded-[32px] border border-white/10 bg-black/20 p-5">
        <div className="text-sm font-semibold text-white/85">Message</div>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/70">
          {form.message || "—"}
        </p>
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-[28px] border border-white/10 bg-black/20 p-5">
        <input
          suppressHydrationWarning
          type="checkbox"
          checked={form.agree}
          onChange={(e) => update("agree", e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-black/30"
        />
        <div>
          <div className="text-sm font-semibold text-white/85">
            I understand replies may take 24–48h
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/70">
            Appointment-only studio. For quotes and scheduling, use the Booking page.
          </p>
        </div>
      </label>

      <div className="mt-4 text-xs text-white/55">
        Need booking?{" "}
        <Link href="/booking" className="text-white/80 underline underline-offset-4">
          Booking
        </Link>{" "}
        • Want pricing?{" "}
        <Link href="/pricing" className="text-white/80 underline underline-offset-4">
          Pricing
        </Link>
      </div>
    </div>
  );
}

/* ===========================
   Right side cards
=========================== */

function StudioCard() {
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-7">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-[rgba(255,47,179,0.06)] blur-[120px]" />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          Studio info
        </div>

        <div className="mt-4 space-y-3">
          <InfoRow icon={Mail} label="Email" value="Elysian.Ink@outlook.com" />
          <InfoRow icon={Phone} label="Phone" value="(203) 927-9852" />
          <InfoRow icon={Clock4} label="Hours" value="By appointment" />
          <InfoRow icon={MapPin} label="Location" value="Webster, FL" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href="https://www.instagram.com/elysian.ink_"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            <Instagram className="h-4 w-4" />
            Instagram
          </a>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            <LinkIcon className="h-4 w-4" />
            Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}

function HelpCard() {
  return (
    <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-7">
      <div className="text-xs uppercase tracking-[0.25em] text-white/60">
        Quick help
      </div>

      <div className="mt-4 space-y-3">
        <HelpItem
          title="Booking / quotes"
          desc="Use Booking for the fastest estimate + scheduling."
          href="/booking"
          cta="Go to Booking"
        />

        <HelpItem
          title="Pricing"
          desc="Rates, deposits, and what affects the final cost."
          href="/pricing"
          cta="Pricing"
        />
      </div>
    </div>
  );
}

/* ===========================
   UI parts
=========================== */

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.25em] text-white/60">
        {kicker}
      </div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
      ) : null}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold tracking-wide text-white/75">
        {label}{" "}
        {required ? (
          <span className="text-[rgba(255,47,179,0.95)]">*</span>
        ) : null}
      </label>
      <input
        suppressHydrationWarning
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cx(
          "mt-2 w-full rounded-2xl border bg-black/25 px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/35",
          error
            ? "border-[rgba(255,47,179,0.45)] focus:border-[rgba(255,47,179,0.65)]"
            : "border-white/10 focus:border-[rgba(255,47,179,0.45)]"
        )}
      />
      {error ? (
        <div className="mt-2 text-xs text-[rgba(255,47,179,0.85)]">
          Required
        </div>
      ) : null}
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows: number;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold tracking-wide text-white/75">
        {label}{" "}
        {required ? (
          <span className="text-[rgba(255,47,179,0.95)]">*</span>
        ) : null}
      </label>
      <textarea
        suppressHydrationWarning
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={cx(
          "mt-2 w-full resize-none rounded-2xl border bg-black/25 px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/35",
          error
            ? "border-[rgba(255,47,179,0.45)] focus:border-[rgba(255,47,179,0.65)]"
            : "border-white/10 focus:border-[rgba(255,47,179,0.45)]"
        )}
      />
      {error ? (
        <div className="mt-2 text-xs text-[rgba(255,47,179,0.85)]">
          Required
        </div>
      ) : null}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div>
      <label className="text-xs font-semibold tracking-wide text-white/75">
        {label}
      </label>
      <select
        suppressHydrationWarning
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/85 outline-none focus:border-[rgba(255,47,179,0.45)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-xs uppercase tracking-[0.25em] text-white/60">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <Icon className="h-4 w-4 text-[rgba(255,47,179,0.85)]" />
        </span>
        <div className="text-sm font-semibold text-white/80">{label}</div>
      </div>
      <div className="text-sm text-white/70">{value}</div>
    </div>
  );
}

function HelpItem({
  title,
  desc,
  href,
  cta,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-semibold text-white/85">{title}</div>
      <p className="mt-1 text-sm leading-relaxed text-white/70">{desc}</p>
      <Link
        href={href}
        className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
      >
        {cta}
      </Link>
    </div>
  );
}

/* ===========================
   Validation
=========================== */

function validate(f: ContactForm) {
  const m: string[] = [];
  if (!f.name.trim()) m.push("name");
  if (!isValidEmail(f.email)) m.push("email");
  if (!isValidPhone(f.phone)) m.push("phone");
  if (!f.subject.trim()) m.push("subject");
  if (!f.message.trim()) m.push("message");
  return m;
}

function isValidEmail(email: string) {
  const e = email.trim();
  if (!e) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function isValidPhone(phone: string) {
  const p = phone.replace(/[^\d]/g, "");
  return p.length >= 10;
}
