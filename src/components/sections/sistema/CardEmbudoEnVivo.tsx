"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LiveDot } from "@/components/ui/LiveDot";
import { Sparkline } from "@/components/ui/Sparkline";
import { prefersReducedMotion } from "@/lib/animations/use-gsap-context";

const METRICS = [
  {
    label: "Búsquedas Google Business",
    base: 412,
    delta: [3, 5, 4, 6, 8, 5, 7, 9, 6, 8],
    spark: [4, 6, 5, 7, 6, 9, 8, 12, 11, 14],
  },
  {
    label: "Conversaciones WhatsApp",
    base: 87,
    delta: [1, 2, 2, 3, 2, 4, 3, 5, 3, 4],
    spark: [2, 3, 5, 4, 6, 5, 7, 8, 9, 11],
  },
  {
    label: "Citas agendadas",
    base: 23,
    delta: [1, 0, 1, 1, 2, 1, 2, 1, 2, 1],
    spark: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6],
  },
];

function MetricRow({ idx }: { idx: number }) {
  const m = METRICS[idx];
  const numRef = useRef<HTMLDivElement>(null);
  const deltaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current) return;
    const el = numRef.current;
    const deltaEl = deltaRef.current;

    if (prefersReducedMotion()) {
      el.textContent = m.base.toLocaleString("es-CO");
      return;
    }

    const target = { v: m.base };
    let current = m.base;

    const tl = gsap.timeline({ repeat: -1, delay: idx * 0.6 });
    m.delta.forEach((d) => {
      const next = current + d;
      tl.to(target, {
        v: next,
        duration: 1.2,
        ease: "elastic.out(1, 0.7)",
        onStart: () => {
          if (deltaEl) deltaEl.textContent = `+${d}`;
        },
        onUpdate: () => {
          el.textContent = Math.round(target.v).toLocaleString("es-CO");
        },
      });
      tl.to({}, { duration: 2.8 });
      current = next;
    });

    return () => {
      tl.kill();
    };
  }, [idx, m.base, m.delta]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.12em] text-cream/55 uppercase">
          {m.label}
        </span>
        <span
          ref={deltaRef}
          className="font-mono text-[10px] tabular-nums text-signal"
        >
          +{m.delta[0]}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div
          ref={numRef}
          className="font-sans text-3xl font-semibold tabular-nums text-cream md:text-4xl"
        >
          {m.base.toLocaleString("es-CO")}
        </div>
        <Sparkline
          values={m.spark}
          width={72}
          height={20}
          stroke="rgba(244,241,236,0.6)"
        />
      </div>
    </div>
  );
}

export function CardEmbudoEnVivo() {
  return (
    <article className="group/card relative flex min-h-[480px] flex-col overflow-hidden rounded-card-lg border border-cream/10 bg-carbon p-7 text-cream transition-all duration-300 ease-out hover:-translate-y-1 hover:border-cream/20 hover:shadow-[0_24px_48px_rgba(14,15,18,0.35)]">
      <header className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] text-operation uppercase">
            01 · Embudo
          </div>
          <h3 className="mt-3 font-sans text-2xl font-medium tracking-tight text-cream">
            Embudo en vivo
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-cream/60 uppercase">
          <LiveDot size="sm" />
          EN VIVO · simulada
        </div>
      </header>

      <div className="mt-10 flex flex-1 flex-col justify-end gap-7">
        <MetricRow idx={0} />
        <div className="h-px bg-cream/10" />
        <MetricRow idx={1} />
        <div className="h-px bg-cream/10" />
        <MetricRow idx={2} />
      </div>

      <footer className="mt-7 border-t border-cream/10 pt-4 font-mono text-[10px] tracking-[0.08em] text-cream/40 uppercase">
        Reporte continuo · ventana 30d
      </footer>
    </article>
  );
}
