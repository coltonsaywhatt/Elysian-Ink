"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  X,
  Sparkles,
  ShieldCheck,
  Clock4,
  MapPin,
  Image as ImageIcon,
  Link as LinkIcon,
  Info,
} from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

type ContactMethod = "email" | "text";

type FormState = {
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;

  idea: string;
  styleTags: string[];
  placement: string;
  sizeInches: number; // approximate
  isColor: "blackwork" |  "fullcolor" | "unsure";

  references: string; // links
  budgetMin: number;
  budgetMax: number;

  availability: string;
  notes: string;

  files: File[];
  agree: boolean;
};

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

const STYLE_TAGS = [
  "Fine-line",
  "Dark floral",
  "Lettering",
  "Ornamental",
  "Cyber / glitch",
  "Anime",
  "Realism",
  "Traditional",
  "Neo-trad",
  "Minimal",
  "Abstract",
];

const PLACEMENTS = [
  "Forearm",
  "Upper arm",
  "Bicep",
  "Hand",
  "Wrist",
  "Chest",
  "Ribs",
  "Back",
  "Shoulder",
  "Thigh",
  "Calf",
  "Ankle",
  "Neck",
  "Other",
];

const STEPS = [
  { id: "contact", title: "Contact" },
  { id: "design", title: "Design" },
  { id: "refs", title: "References" },
  { id: "review", title: "Review" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

export default function BookingPage() {
  const reduce = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { startUpload, isUploading } = useUploadThing("referenceUploader");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    contactMethod: "email",

    idea: "",
    styleTags: [],
    placement: "Forearm",
    sizeInches: 5,
    isColor: "blackwork",

    references: "",
    budgetMin: 150,
    budgetMax: 450,

    availability: "",
    notes: "",

    files: [],
    agree: false,
  });

  const step = STEPS[stepIndex];

  const progress = useMemo(() => {
    const total = STEPS.length - 1;
    return total === 0 ? 1 : stepIndex / total;
  }, [stepIndex]);

  const missing = useMemo(() => validate(form), [form]);

  const canGoNext = useMemo(() => {
    // step-scoped gating
    if (step.id === "contact") {
      return (
        !!form.name.trim() &&
        isValidEmail(form.email) &&
        isValidPhone(form.phone)
      );
    }
    if (step.id === "design") {
      return !!form.idea.trim() && !!form.placement.trim();
    }
    if (step.id === "refs") {
      // allow empty references, but encourage
      return true;
    }
    if (step.id === "review") {
      return form.agree;
    }
    return false;
  }, [form, step.id]);

  const next = () => setStepIndex((i) => clamp(i + 1, 0, STEPS.length - 1));
  const prev = () => setStepIndex((i) => clamp(i - 1, 0, STEPS.length - 1));

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function toggleTag(tag: string) {
    setForm((s) => {
      const has = s.styleTags.includes(tag);
      const styleTags = has
        ? s.styleTags.filter((t) => t !== tag)
        : [...s.styleTags, tag];
      return { ...s, styleTags };
    });
  }

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setForm((s) => {
      // cap to 8 files to keep UI sane
      const merged = [...s.files, ...files].slice(0, 8);
      return { ...s, files: merged };
    });
    e.target.value = "";
  }

  function removeFile(idx: number) {
    setForm((s) => ({
      ...s,
      files: s.files.filter((_, i) => i !== idx),
    }));
  }

  async function submit() {
    if (!form.agree) return;
    setSubmitting(true);
    setSubmitError(null);
    let uploadedKeys: string[] = [];
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT;
      if (!endpoint) {
        throw new Error("Missing NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT.");
      }

      let uploadedFiles: Array<{ name: string; size: number; url: string; key: string }> = [];
      if (form.files.length > 0) {
        const result = await startUpload(form.files);
        if (!result || result.length === 0) {
          throw new Error("File upload failed. Please try again.");
        }

        uploadedFiles = result
          .map((file) => {
            const f = file as {
              key?: string;
              name?: string;
              size?: number;
              ufsUrl?: string;
              url?: string;
            };
            return {
              key: f.key || "",
              name: f.name || "reference",
              size: typeof f.size === "number" ? f.size : 0,
              url: f.ufsUrl || f.url || "",
            };
          })
          .filter((f) => Boolean(f.url && f.key));

        uploadedKeys = uploadedFiles.map((f) => f.key);
      }

      const { files, ...rest } = form;
      const body = new FormData();
      body.append("formType", "booking");
      body.append("name", rest.name);
      body.append("email", rest.email);
      body.append("phone", rest.phone);
      body.append("contactMethod", rest.contactMethod);
      body.append("idea", rest.idea);
      body.append("styleTags", rest.styleTags.join(", "));
      body.append("placement", rest.placement);
      body.append("sizeInches", String(rest.sizeInches));
      body.append("isColor", String(rest.isColor));
      body.append("references", rest.references);
      body.append("budgetMin", String(rest.budgetMin));
      body.append("budgetMax", String(rest.budgetMax));
      body.append("availability", rest.availability);
      body.append("notes", rest.notes);
      body.append("originalFileCount", String(files.length));
      body.append("uploadedFileCount", String(uploadedFiles.length));
      if (uploadedFiles.length > 0) {
        body.append(
          "uploadedFileUrls",
          uploadedFiles
            .map((f) => `<a href="${f.url}" target="_blank" rel="noopener noreferrer">${f.name}</a>`)
            .join("<br/>")
        );
      } else {
        body.append("uploadedFileUrls", "No uploaded files");
      }

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
      if (uploadedKeys.length > 0) {
        try {
          await fetch("/api/uploadthing/cleanup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keys: uploadedKeys }),
          });
        } catch {
          // Best-effort cleanup only.
        }
      }
      setSubmitError(error instanceof Error ? error.message : "Unable to submit request right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      {/* Top header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
          <Sparkles className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
          Booking Request • Appointment Only
        </div>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Request an appointment
          <span className="block text-white/70">
            private session. clean execution. loud results.
          </span>
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          This is a request — not a confirmed booking. Send your idea + placement +
          approximate size + references, and you’ll get a reply with availability and
          next steps.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, label: "Sterile setup", sub: "Clean + careful" },
            { icon: Clock4, label: "24–48h response", sub: "Usually" },
            { icon: MapPin, label: "Appointment only", sub: "No walk-ins" },
          ].map((b) => (
            <div
              key={b.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <b.icon className="h-5 w-5 text-[rgba(255,47,179,0.95)]" />
              <div className="mt-2 text-sm font-semibold">{b.label}</div>
              <div className="mt-1 text-xs text-white/60">{b.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-start">
        {/* Left: form */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-5 sm:p-8">
          {/* progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                Step {stepIndex + 1} of {STEPS.length}
              </div>
              <div className="text-xs text-white/55">
                {step.title}
              </div>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full border border-white/10 bg-black/25">
              <motion.div
                initial={false}
                animate={{ width: `${Math.round(progress * 100)}%` }}
                transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                className="h-full rounded-full bg-[rgba(255,47,179,0.65)]"
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-4">
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
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
              >
                {step.id === "contact" && (
                  <StepContact form={form} update={update} missing={missing} />
                )}
                {step.id === "design" && (
                  <StepDesign
                    form={form}
                    update={update}
                    toggleTag={toggleTag}
                    missing={missing}
                  />
                )}
                {step.id === "refs" && (
                  <StepRefs
                    form={form}
                    update={update}
                    onFiles={onFiles}
                    removeFile={removeFile}
                  />
                )}
                {step.id === "review" && (
                  <StepReview form={form} update={update} missing={missing} />
                )}

                {/* Navigation */}
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
                      disabled={!canGoNext || submitting || isUploading}
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold tracking-wide transition",
                        canGoNext
                          ? "border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.10)] text-white/90 hover:bg-[rgba(255,47,179,0.14)]"
                          : "cursor-not-allowed border-white/10 bg-black/20 text-white/35"
                      )}
                    >
                      {submitting || isUploading ? "Sending..." : "Submit Request"} <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {submitError ? (
                  <div className="mt-3 rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-xs text-red-100">
                    {submitError}
                  </div>
                ) : null}

                {/* gentle note */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-relaxed text-white/60">
                  <span className="font-semibold text-white/75">Heads up:</span>{" "}
                  The more references you include, the faster your quote + scheduling.
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
                className="py-6"
              >
                <div className="rounded-[32px] border border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.08)] p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(255,47,179,0.22)] bg-black/25 px-3 py-2 text-xs text-white/75">
                    <Check className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
                    Request submitted
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                    You’re in the queue.
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    You’ll get a reply in <span className="font-semibold">24–48 hours</span> with
                    availability, a quote range, and next steps.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/gallery"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
                    >
                      View Gallery
                    </Link>
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-white/10"
                    >
                      Back Home
                    </Link>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: live summary */}
        <aside className="space-y-6 lg:sticky lg:top-24">
          <SummaryCard form={form} missing={missing} />
          <PolicyCard />
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
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  missing: string[];
}) {
  return (
    <div>
      <SectionTitle
        kicker="Contact"
        title="Who are you?"
        desc="So I can reply fast and lock the right slot."
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
          onChange={(v) => update("contactMethod", v as ContactMethod)}
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
            <div className="text-sm font-semibold text-white/85">
              Quick tip
            </div>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              If you want the fastest scheduling, make sure your phone and email are correct —
              I’ll reply using your preferred method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepDesign({
  form,
  update,
  toggleTag,
  missing,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  toggleTag: (tag: string) => void;
  missing: string[];
}) {
  return (
    <div>
      <SectionTitle
        kicker="Design"
        title="What are we making?"
        desc="Give me the vibe and the placement — I’ll shape the rest."
      />

      <div className="mt-6">
        <Textarea
          label="Describe your idea"
          value={form.idea}
          onChange={(v) => update("idea", v)}
          placeholder="What do you want? Meaning, elements, mood, inspiration... the more specific the better."
          rows={6}
          required
          error={missing.includes("idea")}
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Select
          label="Placement"
          value={form.placement}
          onChange={(v) => update("placement", v)}
          options={PLACEMENTS.map((p) => ({ label: p, value: p }))}
        />

        <Select
          label="Color direction"
          value={form.isColor}
          onChange={(v) => update("isColor", v as any)}
          options={[
            { label: "Fine-line", value: "Fine-line" },
            { label: "Full color", value: "fullcolor" },
            { label: "Unsure", value: "unsure" },
          ]}
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Slider
          label="Approx. size (inches)"
          value={form.sizeInches}
          min={1}
          max={14}
          step={1}
          onChange={(v) => update("sizeInches", v)}
          hint="Rough estimate is fine — helps quoting."
        />

        <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">
            Style tags
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {STYLE_TAGS.map((tag) => {
              const on = form.styleTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cx(
                    "rounded-2xl border px-3 py-2 text-xs font-semibold transition",
                    on
                      ? "border-[rgba(255,47,179,0.30)] bg-[rgba(255,47,179,0.10)] text-white/90"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <RangeSlider
          label="Budget range (optional)"
          min={50}
          max={1500}
          step={25}
          valueMin={form.budgetMin}
          valueMax={form.budgetMax}
          onChange={(minV, maxV) => {
            update("budgetMin", minV);
            update("budgetMax", maxV);
          }}
          hint="This helps me recommend scale/detail that fits."
        />

        <Textarea
          label="Extra notes (optional)"
          value={form.notes}
          onChange={(v) => update("notes", v)}
          placeholder="Allergies, cover-up notes, sensitive areas, timing constraints, etc."
          rows={5}
        />
      </div>
    </div>
  );
}

function StepRefs({
  form,
  update,
  onFiles,
  removeFile,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (idx: number) => void;
}) {
  return (
    <div>
      <SectionTitle
        kicker="References"
        title="Show me what you mean"
        desc="Links are great. Images are even better."
      />

      <div className="mt-6 grid gap-4">
        <Textarea
          label="Reference links (optional)"
          value={form.references}
          onChange={(v) => update("references", v)}
          placeholder="Paste Instagram/Pinterest/Google Drive links. One per line is perfect."
          rows={5}
          icon={<LinkIcon className="h-4 w-4 text-white/60" />}
        />

        <div className="rounded-[32px] border border-white/10 bg-black/20 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-white/85">
                Upload reference images (optional)
              </div>
              <p className="mt-1 text-sm text-white/65">
                Add up to 8 files. Files are uploaded first, then included in your booking submission.
              </p>
            </div>

            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10">
              <Upload className="h-4 w-4" />
              Add files
              <input
                suppressHydrationWarning
                type="file"
                accept="image/*"
                multiple
                onChange={onFiles}
                className="hidden"
              />
            </label>
          </div>

          {form.files.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {form.files.map((f, idx) => (
                <div
                  key={`${f.name}-${idx}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-black/25">
                      <ImageIcon className="h-4 w-4 text-white/70" />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white/85">
                        {f.name}
                      </div>
                      <div className="text-xs text-white/55">
                        {formatBytes(f.size)}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-black/25 text-white/70 transition hover:bg-white/10"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/65">
              No files added yet.
            </div>
          )}
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">
            Pro tip
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            If you’re not sure what you want, drop 3–5 references and tell me what you
            like about each one (line weight, shading, vibe, etc.).
          </p>
        </div>
      </div>
    </div>
  );
}

function StepReview({
  form,
  update,
  missing,
}: {
  form: FormState;
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  missing: string[];
}) {
  const blockers = missing.filter((m) =>
    ["name", "email", "phone", "idea"].includes(m)
  );

  return (
    <div>
      <SectionTitle
        kicker="Review"
        title="Confirm your request"
        desc="Quick review before you send it."
      />

      {blockers.length > 0 && (
        <div className="mt-6 rounded-[28px] border border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.08)] p-5">
          <div className="text-sm font-semibold text-white/90">
            A few essentials are missing
          </div>
          <p className="mt-1 text-sm text-white/75">
            Go back and fill in:{" "}
            <span className="font-semibold">
              {blockers.join(", ")}
            </span>
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
        <ReviewItem label="Placement" value={form.placement || "—"} />
        <ReviewItem label="Approx. size" value={`${form.sizeInches}"`} />
        <ReviewItem
          label="Color direction"
          value={
            form.isColor === "Fine-line"
              ? "Fine-line"

                : form.isColor === "fullcolor"
                  ? "Full color"
                  : "Unsure"
          }
        />
        <ReviewItem
          label="Style tags"
          value={form.styleTags.length ? form.styleTags.join(", ") : "—"}
        />
      </div>

      <div className="mt-4 rounded-[32px] border border-white/10 bg-black/20 p-5">
        <div className="text-sm font-semibold text-white/85">Idea</div>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/70">
          {form.idea || "—"}
        </p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-semibold text-white/85">References</div>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/70">
            {form.references || "—"}
          </p>
          <div className="mt-3 text-xs text-white/55">
            Files: {form.files.length ? `${form.files.length} attached` : "none"}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-semibold text-white/85">
            Availability
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {form.availability || "—"}
          </p>

          <Textarea
            label="Availability details (recommended)"
            value={form.availability}
            onChange={(v) => update("availability", v)}
            placeholder="Example: Weeknights after 6, Saturdays any time, prefer early mornings..."
            rows={4}
          />
        </div>
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
            I understand this is a request
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/70">
            Appointment-only. No walk-ins. Deposits may be required to hold a slot.
            I’ll receive availability + next steps via my preferred contact method.
          </p>
        </div>
      </label>

      <div className="mt-4 text-xs text-white/55">
        Want to see work first?{" "}
        <Link href="/gallery" className="text-white/80 underline underline-offset-4">
          Gallery
        </Link>{" "}
        • Need pricing?{" "}
        <Link href="/pricing" className="text-white/80 underline underline-offset-4">
          Pricing
        </Link>
      </div>
    </div>
  );
}

/* ===========================
   Right side
=========================== */

function SummaryCard({ form, missing }: { form: FormState; missing: string[] }) {
  const completeness = useMemo(() => {
    const required = ["name", "email", "phone", "idea"];
    const missingRequired = required.filter((k) => missing.includes(k));
    const done = required.length - missingRequired.length;
    return { done, total: required.length };
  }, [missing]);

  const scorePct = Math.round((completeness.done / completeness.total) * 100);

  return (
    <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-7">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-[rgba(255,47,179,0.06)] blur-[120px]" />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">
              Request Summary
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight">
              {form.placement || "Placement"} • {form.sizeInches}" approx
            </div>
            <div className="mt-1 text-sm text-white/65">
              {form.styleTags.length ? form.styleTags.join(" • ") : "No style tags selected"}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/70">
            {scorePct}% ready
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">
            Quote signals
          </div>
          <div className="mt-3 grid gap-3">
            <Row label="Budget" value={`$${form.budgetMin}–$${form.budgetMax}`} />
            <Row
              label="Color"
              value={
                form.isColor === "Fine-line"
                  ? "Fine-line"
                    : form.isColor === "fullcolor"
                      ? "Full color"
                      : "Unsure"
              }
            />
            <Row
              label="References"
              value={
                form.references.trim() || form.files.length
                  ? "Included"
                  : "None yet"
              }
              warn={!form.references.trim() && form.files.length === 0}
            />
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">
            Essentials
          </div>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <Essential ok={!missing.includes("name")} label="Name" />
            <Essential ok={!missing.includes("email")} label="Email (valid)" />
            <Essential ok={!missing.includes("phone")} label="Phone (valid)" />
            <Essential ok={!missing.includes("idea")} label="Idea description" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicyCard() {
  return (
    <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-7">
      <div className="text-xs uppercase tracking-[0.25em] text-white/60">
        Studio policy
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Appointment-only. Deposits may be required to secure a slot. Please arrive on time.
        No extra guests unless discussed ahead of time.
      </p>

      <div className="mt-4 rounded-3xl border border-[rgba(255,47,179,0.18)] bg-[rgba(255,47,179,0.08)] p-5">
        <div className="text-sm font-semibold text-white/85">
          Want the fastest quote?
        </div>
        <p className="mt-1 text-sm leading-relaxed text-white/70">
          Add 3–5 references and include placement + approximate size.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
        >
          Pricing
        </Link>
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
        {label} {required ? <span className="text-[rgba(255,47,179,0.95)]">*</span> : null}
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
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows: number;
  required?: boolean;
  error?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold tracking-wide text-white/75">
        {label} {required ? <span className="text-[rgba(255,47,179,0.95)]">*</span> : null}
      </label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-4 top-4">{icon}</span>
        ) : null}
        <textarea
          suppressHydrationWarning
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={cx(
            "mt-2 w-full resize-none rounded-2xl border bg-black/25 px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/35",
            icon ? "pl-11" : "",
            error
              ? "border-[rgba(255,47,179,0.45)] focus:border-[rgba(255,47,179,0.65)]"
              : "border-white/10 focus:border-[rgba(255,47,179,0.45)]"
          )}
        />
      </div>
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

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">
            {label}
          </div>
          {hint ? <div className="mt-1 text-xs text-white/55">{hint}</div> : null}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
          {value}"
        </div>
      </div>

      <input
        suppressHydrationWarning
        className="mt-4 w-full"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />

      <div className="mt-2 flex justify-between text-[11px] text-white/45">
        <span>{min}"</span>
        <span>{max}"</span>
      </div>
    </div>
  );
}

function RangeSlider({
  label,
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChange,
  hint,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  valueMin: number;
  valueMax: number;
  onChange: (minV: number, maxV: number) => void;
  hint?: string;
}) {
  const safeMin = Math.min(valueMin, valueMax - step);
  const safeMax = Math.max(valueMax, valueMin + step);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-white/60">
            {label}
          </div>
          {hint ? <div className="mt-1 text-xs text-white/55">{hint}</div> : null}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
          ${safeMin}–${safeMax}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1 text-[11px] text-white/55">Min</div>
          <input
            suppressHydrationWarning
            className="w-full"
            type="range"
            min={min}
            max={max - step}
            step={step}
            value={safeMin}
            onChange={(e) => onChange(Number(e.target.value), safeMax)}
          />
        </div>

        <div>
          <div className="mb-1 text-[11px] text-white/55">Max</div>
          <input
            suppressHydrationWarning
            className="w-full"
            type="range"
            min={min + step}
            max={max}
            step={step}
            value={safeMax}
            onChange={(e) => onChange(safeMin, Number(e.target.value))}
          />
        </div>

        <div className="flex justify-between text-[11px] text-white/45">
          <span>${min}</span>
          <span>${max}</span>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-xs uppercase tracking-[0.25em] text-white/60">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-white/85">
        {value}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.25em] text-white/55">
        {label}
      </div>
      <div
        className={cx(
          "text-sm font-semibold",
          warn ? "text-[rgba(255,47,179,0.90)]" : "text-white/85"
        )}
      >
        {value}
      </div>
    </div>
  );
}

function Essential({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-sm text-white/70">{label}</div>
      <span
        className={cx(
          "grid h-8 w-8 place-items-center rounded-2xl border",
          ok
            ? "border-[rgba(255,47,179,0.22)] bg-[rgba(255,47,179,0.10)]"
            : "border-white/10 bg-black/25"
        )}
      >
        {ok ? (
          <Check className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-white/25" />
        )}
      </span>
    </div>
  );
}

/* ===========================
   Validation helpers
=========================== */

function validate(f: FormState) {
  const m: string[] = [];
  if (!f.name.trim()) m.push("name");
  if (!isValidEmail(f.email)) m.push("email");
  if (!isValidPhone(f.phone)) m.push("phone");
  if (!f.idea.trim()) m.push("idea");
  return m;
}

function isValidEmail(email: string) {
  const e = email.trim();
  if (!e) return false;
  // simple + safe regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function isValidPhone(phone: string) {
  const p = phone.replace(/[^\d]/g, "");
  // allow 10+ digits (US-friendly)
  return p.length >= 10;
}

function formatBytes(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
