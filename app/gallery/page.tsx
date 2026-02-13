const items = Array.from({ length: 12 }).map((_, i) => ({
  title: `Piece ${i + 1}`,
}));

export default function GalleryPage() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.25em] text-white/60">
          Gallery
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Recent work
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
          Drop your tattoo photos into these slots later (or replace with real images).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
          >
            <div className="aspect-[4/5] w-full bg-black/30" />
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-[rgba(255,47,179,0.10)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-sm font-semibold text-white/90">
                {it.title}
              </div>
              <div className="text-xs text-white/60">Black + pink aesthetic</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
