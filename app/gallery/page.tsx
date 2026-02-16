import Link from "next/link";
import { getInstagramMediaPage, hasInstagramConfig } from "@/lib/instagram";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const configured = hasInstagramConfig();
  const page = configured
    ? await getInstagramMediaPage(24)
    : { items: [], nextCursor: null, hasMore: false };
  const profileUrl = process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL;

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-[-150px] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.10)] blur-[140px]" />
          <div className="absolute -right-24 bottom-[-180px] h-[560px] w-[560px] rounded-full bg-[rgba(255,47,179,0.07)] blur-[160px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.28)] to-transparent" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75">
            <span className="inline-block h-2 w-2 rounded-full bg-[rgba(255,47,179,0.9)]" />
            Live Instagram Feed
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            The Archive
            <span className="block text-white/70">photos, videos, healed outcomes.</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            This gallery pulls directly from Instagram so your newest posted work appears automatically.
          </p>
        </div>
      </section>

      <section className="mt-8">
        {!configured ? (
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">Setup required</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Connect Instagram to unlock live media</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Add your API token in environment variables and this page will populate automatically.
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/75">
              <p><code>INSTAGRAM_ACCESS_TOKEN</code> is required.</p>
              <p className="mt-1">
                Optional: <code>NEXT_PUBLIC_INSTAGRAM_PROFILE_URL</code> for the profile link button.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-2xl border border-[rgba(255,47,179,0.24)] bg-[rgba(255,47,179,0.12)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[rgba(255,47,179,0.18)]"
              >
                Go to Booking
              </Link>
            </div>
          </div>
        ) : (
          <GalleryClient
            initialItems={page.items}
            initialNextCursor={page.nextCursor}
            initialHasMore={page.hasMore}
            profileUrl={profileUrl}
          />
        )}
      </section>
    </div>
  );
}
