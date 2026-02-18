"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Play, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import type { InstagramMediaItem } from "@/lib/instagram";

type Filter = "all" | "image" | "video";

function labelFor(type: InstagramMediaItem["mediaType"]) {
  if (type === "VIDEO") return "Video";
  if (type === "CAROUSEL_ALBUM") return "Carousel";
  return "Photo";
}

function toFilter(type: InstagramMediaItem["mediaType"]): Filter {
  return type === "VIDEO" ? "video" : "image";
}

export default function GalleryClient({
  initialItems,
  initialNextCursor,
  initialHasMore,
  profileUrl,
}: {
  initialItems: InstagramMediaItem[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
  profileUrl?: string;
}) {
  const reduce = useReducedMotion();
  const [items, setItems] = useState<InstagramMediaItem[]>(initialItems);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => toFilter(item.mediaType) === filter);
  }, [items, filter]);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? null, [items, selectedId]);
  const selectedIndex = useMemo(
    () => (selectedId ? items.findIndex((item) => item.id === selectedId) : -1),
    [items, selectedId]
  );
  const canNavigate = items.length > 1 && selectedIndex >= 0;

  const reels = useMemo(
    () => items.filter((item) => item.mediaType === "VIDEO").slice(0, 12),
    [items]
  );

  function showPrevious() {
    setSelectedId((current) => {
      if (!current || items.length === 0) return current;
      const idx = items.findIndex((item) => item.id === current);
      if (idx < 0) return current;
      const prevIndex = (idx - 1 + items.length) % items.length;
      return items[prevIndex].id;
    });
  }

  function showNext() {
    setSelectedId((current) => {
      if (!current || items.length === 0) return current;
      const idx = items.findIndex((item) => item.id === current);
      if (idx < 0) return current;
      const nextIndex = (idx + 1) % items.length;
      return items[nextIndex].id;
    });
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedId) return;
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowLeft") showPrevious();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, selectedIndex, items]);

  useEffect(() => {
    if (!selectedId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function loadMore() {
    if (!hasMore || !nextCursor || loadingMore) return;

    setLoadingMore(true);
    setLoadError(null);

    try {
      const params = new URLSearchParams({
        limit: "24",
        after: nextCursor,
      });
      const res = await fetch(`/api/instagram?${params.toString()}`);

      if (!res.ok) {
        throw new Error(`Failed to load more media (${res.status})`);
      }

      const json = (await res.json()) as {
        items?: InstagramMediaItem[];
        nextCursor?: string | null;
        hasMore?: boolean;
      };

      const incoming = json.items ?? [];
      setItems((prev) => {
        const existing = new Set(prev.map((i) => i.id));
        const deduped = incoming.filter((i) => !existing.has(i.id));
        return [...prev, ...deduped];
      });
      setNextCursor(json.nextCursor ?? null);
      setHasMore(Boolean(json.hasMore && json.nextCursor));
    } catch (error) {
      console.error(error);
      setLoadError("Could not load more posts right now.");
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <>
      {reels.length > 0 ? (
        <div className="mb-6">
          <div className="mb-3 text-xs uppercase tracking-[0.25em] text-white/60">Reels</div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {reels.map((item) => (
              <button
                key={`reel-${item.id}`}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className="group relative w-[180px] shrink-0 overflow-hidden rounded-[20px] border border-white/10 bg-white/5 text-left"
              >
                <img
                  src={item.thumbnailUrl || item.mediaUrl}
                  alt={item.caption || "Instagram reel"}
                  className="aspect-[9/16] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-white/85">
                    <Play className="h-3 w-3" />
                    Reel
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
          {[
            { key: "all", label: `All (${items.length})` },
            {
              key: "image",
              label: `Photos (${items.filter((i) => toFilter(i.mediaType) === "image").length})`,
            },
            {
              key: "video",
              label: `Videos (${items.filter((i) => toFilter(i.mediaType) === "video").length})`,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key as Filter)}
              className={[
                "rounded-xl px-3 py-2 text-xs font-semibold tracking-wide transition",
                filter === tab.key
                  ? "bg-[rgba(255,47,179,0.16)] text-white"
                  : "text-white/65 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {profileUrl ? (
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80 transition hover:bg-white/10"
          >
            Follow on Instagram <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-center text-white/70">
          No media in this filter yet.
        </div>
      ) : (
        <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
          {filtered.map((item) => {
            const preview = item.mediaType === "VIDEO" ? item.thumbnailUrl || item.mediaUrl : item.mediaUrl;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className="group relative block w-full overflow-hidden rounded-[26px] border border-white/10 bg-white/5 text-left"
              >
                <img
                  src={preview}
                  alt={item.caption || "Instagram media"}
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                </div>

                <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
                  {labelFor(item.mediaType)}
                </div>

                {item.mediaType === "VIDEO" ? (
                  <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/45 text-white">
                    <Play className="h-4 w-4" />
                  </div>
                ) : null}

                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="line-clamp-2 text-xs leading-relaxed text-white/88">
                    {item.caption || "View on Instagram"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex flex-col items-center gap-3">
        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-65"
          >
            {loadingMore ? "Loading..." : "Load More from Instagram"}
          </button>
        ) : (
          <div className="text-xs uppercase tracking-[0.2em] text-white/45">End of feed</div>
        )}
        {loadError ? <div className="text-xs text-[rgba(255,130,130,0.9)]">{loadError}</div> : null}
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {selected ? (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(5,5,8,0.88)] p-2 backdrop-blur-md sm:p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.28, ease: [0.22, 0.86, 0.24, 1] }
              }
              className="relative w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/15 bg-[rgba(7,7,10,0.95)] shadow-[0_28px_90px_rgba(0,0,0,0.65)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,47,179,0.35)] to-transparent" />

              <div className="absolute left-3 top-3 z-40 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/85">
                {selectedIndex + 1} / {items.length}
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute right-2 top-2 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/65 text-white/95 shadow-[0_8px_28px_rgba(0,0,0,0.45)] transition hover:bg-black/80 sm:right-3 sm:top-3"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-[1fr_0.36fr]">
                <div
                  className="relative bg-black"
                  onTouchStart={(e) => {
                    touchStartXRef.current = e.touches[0]?.clientX ?? null;
                  }}
                  onTouchEnd={(e) => {
                    if (!canNavigate || touchStartXRef.current === null) return;
                    const endX = e.changedTouches[0]?.clientX;
                    if (typeof endX !== "number") return;
                    const delta = endX - touchStartXRef.current;
                    if (Math.abs(delta) < 40) return;
                    if (delta > 0) showPrevious();
                    else showNext();
                  }}
                >
                  {selected.mediaType === "VIDEO" ? (
                    <video
                      src={selected.mediaUrl}
                      controls
                      poster={selected.thumbnailUrl}
                      className="max-h-[80vh] w-full object-contain"
                    />
                  ) : (
                    <img
                      src={selected.mediaUrl}
                      alt={selected.caption || "Instagram media"}
                      className="max-h-[80vh] w-full object-contain"
                    />
                  )}

                  <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-between px-2 sm:px-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showPrevious();
                      }}
                      disabled={!canNavigate}
                      className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/55 text-white/90 shadow-[0_8px_26px_rgba(0,0,0,0.4)] transition hover:bg-black/75 disabled:cursor-not-allowed disabled:opacity-35"
                      aria-label="Previous media"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showNext();
                      }}
                      disabled={!canNavigate}
                      className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/55 text-white/90 shadow-[0_8px_26px_rgba(0,0,0,0.4)] transition hover:bg-black/75 disabled:cursor-not-allowed disabled:opacity-35"
                      aria-label="Next media"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(12,12,16,0.96),rgba(8,8,12,0.98))] p-4 md:border-l md:border-t-0 md:p-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">Instagram</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/82">
                    {selected.caption || "No caption provided."}
                  </p>
                  <div className="mt-4 text-xs text-white/50">
                    {new Date(selected.timestamp).toLocaleDateString()}
                  </div>
                  <a
                    href={selected.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-white/88 transition hover:bg-white/10"
                  >
                    Open on Instagram <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <div className="mt-4 text-[11px] text-white/45">
                    Tip: swipe on mobile or use arrow keys on desktop.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}

      <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">Need a quote?</div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-white/70">
            Found a style direction you like? Send references + placement + size and get a clean estimate.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-2xl border border-[rgba(255,47,179,0.24)] bg-[rgba(255,47,179,0.12)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[rgba(255,47,179,0.18)]"
          >
            Start Booking
          </Link>
        </div>
      </div>
    </>
  );
}
