"use client";

import React, { useEffect, useMemo, useRef } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const particles = Array.from({ length: 84 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.07,
      vy: (Math.random() - 0.5) * 0.05,
      a: 0.18 + Math.random() * 0.38,
      tw: Math.random() * Math.PI * 2,
    }));

    const blooms = Array.from({ length: 10 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.12 + Math.random() * 0.22,
      a: 0.06 + Math.random() * 0.08,
      drift: (Math.random() - 0.5) * 0.00025,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const time = t * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Subtle grid fade
      ctx.save();
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      const size = 36;
      for (let x = 0; x < w; x += size) {
        ctx.fillRect(x, 0, 1, h);
      }
      for (let y = 0; y < h; y += size) {
        ctx.fillRect(0, y, w, 1);
      }
      // vignette
      const vg = ctx.createRadialGradient(w * 0.5, h * 0.15, 0, w * 0.5, h * 0.15, Math.max(w, h) * 0.8);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = vg;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // Pink bloom fields
      for (const b of blooms) {
        b.x += b.drift;
        if (b.x < -0.1) b.x = 1.1;
        if (b.x > 1.1) b.x = -0.1;

        const cx = b.x * w;
        const cy = b.y * h;
        const rr = b.r * Math.min(w, h);

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        g.addColorStop(0, `rgba(255,47,179,${b.a})`);
        g.addColorStop(1, "rgba(255,47,179,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
      }

      // Particles (ink sparks)
      for (const p of particles) {
        p.tw += 0.02;
        p.x += p.vx * (0.7 + Math.sin(p.tw) * 0.2);
        p.y += p.vy * (0.7 + Math.cos(p.tw) * 0.2);

        if (p.x < -0.1) p.x = 1.1;
        if (p.x > 1.1) p.x = -0.1;
        if (p.y < -0.1) p.y = 1.1;
        if (p.y > 1.1) p.y = -0.1;

        const cx = p.x * w;
        const cy = p.y * h;
        const alpha = clamp(p.a + Math.sin(time * 0.9 + p.tw) * 0.06, 0.08, 0.55);

        ctx.beginPath();
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,47,179,${alpha})`;
        ctx.fill();

        // tiny glow halo
        ctx.beginPath();
        ctx.arc(cx, cy, p.r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,47,179,${alpha * 0.08})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* soft gradient sheets */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-[-10%] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.18)] blur-[90px]" />
        <div className="absolute -right-24 top-[10%] h-[520px] w-[520px] rounded-full bg-[rgba(255,47,179,0.14)] blur-[90px]" />
        <div className="absolute left-[40%] top-[62%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[rgba(255,47,179,0.10)] blur-[110px]" />
      </div>

      {/* canvas FX */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* grid mask */}
      <div className="grid-fade absolute inset-0 opacity-25" />
    </div>
  );
}
