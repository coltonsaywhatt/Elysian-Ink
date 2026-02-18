import Link from "next/link";
import { FileText, CalendarClock, CreditCard, AlertTriangle, Mail } from "lucide-react";

const updated = "February 18, 2026";

const terms = [
  {
    icon: FileText,
    title: "Bookings and Requests",
    body: "Submitting a form is a request, not a confirmed appointment. Sessions are confirmed only after approval and scheduling details are finalized.",
  },
  {
    icon: CreditCard,
    title: "Deposits and Payments",
    body: "A deposit may be required to hold an appointment slot. Deposits are generally non-refundable unless otherwise stated in writing.",
  },
  {
    icon: CalendarClock,
    title: "Rescheduling and Cancellations",
    body: "Please provide advance notice if you need to reschedule. Late cancellations or no-shows may result in forfeited deposits and future booking restrictions.",
  },
  {
    icon: AlertTriangle,
    title: "Health and Safety",
    body: "You must disclose relevant medical conditions, allergies, and medications before your appointment. Services may be declined if safety standards cannot be met.",
  },
];

export default function TermsPage() {
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
            <FileText className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
            Terms of Service
          </div>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Clear terms for a smooth session.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            These terms explain how appointments, deposits, and studio policies work when you book with
            Elysian Ink.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/55">Last updated: {updated}</p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {terms.map((term) => (
          <article key={term.title} className="rounded-[30px] border border-white/10 bg-white/5 p-6">
            <term.icon className="h-5 w-5 text-[rgba(255,47,179,0.95)]" />
            <h2 className="mt-3 text-lg font-semibold tracking-tight">{term.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{term.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-[30px] border border-white/10 bg-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Client Responsibility</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          By booking, you confirm that submitted information is accurate and that you are legally eligible to
          receive tattoo services in your jurisdiction.
        </p>

        <h2 className="mt-6 text-xl font-semibold tracking-tight">Policy Updates</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Terms may be updated periodically. Continued use of the website and booking process indicates
          acceptance of the current terms.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/75">
          <div className="inline-flex items-center gap-2 font-semibold text-white/85">
            <Mail className="h-4 w-4 text-[rgba(255,47,179,0.95)]" />
            Terms questions
          </div>
          <a className="mt-2 block underline underline-offset-4" href="mailto:Elysian.Ink@outlook.com">
            Elysian.Ink@outlook.com
          </a>
        </div>
      </section>

      <div className="mt-6 text-xs text-white/55">
        Also review our{" "}
        <Link href="/privacy" className="text-white/80 underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
