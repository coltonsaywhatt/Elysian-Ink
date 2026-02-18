import Link from "next/link";
import { ShieldCheck, Eye, Lock, Mail, Clock4 } from "lucide-react";

const updated = "February 18, 2026";

const sections = [
  {
    icon: Eye,
    title: "What We Collect",
    body: "When you use contact or booking forms, we may collect your name, email, phone number, message details, tattoo preferences, and any reference links or files you submit.",
  },
  {
    icon: ShieldCheck,
    title: "How We Use Your Information",
    body: "Your information is used to respond to inquiries, review booking requests, provide quotes, schedule sessions, and communicate updates related to your request.",
  },
  {
    icon: Lock,
    title: "Data Storage and Security",
    body: "We use trusted third-party services to process form submissions and file uploads. We take reasonable steps to protect your information, but no online system is guaranteed to be fully secure.",
  },
  {
    icon: Clock4,
    title: "Retention",
    body: "We keep submitted information only as long as needed for communication, booking workflow, legal obligations, or business records.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-[-140px] h-[480px] w-[480px] rounded-full bg-[rgba(255,47,179,0.10)] blur-[150px]" />
          <div className="absolute -right-28 bottom-[-170px] h-[560px] w-[560px] rounded-full bg-[rgba(255,47,179,0.06)] blur-[170px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.28)] to-transparent" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
            <ShieldCheck className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
            Privacy Policy
          </div>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Your information, handled with care.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            This policy explains what data we collect, why we collect it, and how we protect it.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/55">Last updated: {updated}</p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[30px] border border-white/10 bg-white/5 p-6"
          >
            <section.icon className="h-5 w-5 text-[rgba(255,47,179,0.95)]" />
            <h2 className="mt-3 text-lg font-semibold tracking-tight">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-[30px] border border-white/10 bg-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Sharing and Third Parties</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          We only share your data with service providers needed to operate this website and booking workflow
          (for example, form delivery and upload processing). We do not sell your personal information.
        </p>

        <h2 className="mt-6 text-xl font-semibold tracking-tight">Your Rights</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          You can request access, correction, or deletion of your submitted information by contacting us.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/75">
          <div className="inline-flex items-center gap-2 font-semibold text-white/85">
            <Mail className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
            Contact for privacy requests
          </div>
          <a className="mt-2 block underline underline-offset-4" href="mailto:Elysian.Ink@outlook.com">
            Elysian.Ink@outlook.com
          </a>
        </div>
      </section>

      <div className="mt-6 text-xs text-white/55">
        Also review our{" "}
        <Link href="/terms" className="text-white/80 underline underline-offset-4">
          Terms of Service
        </Link>
        .
      </div>
    </div>
  );
}
