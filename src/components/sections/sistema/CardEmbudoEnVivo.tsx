"use client";

import { useEffect, useState } from "react";
import { LiveDot } from "@/components/ui/LiveDot";
import { Sparkline } from "@/components/ui/Sparkline";

const METRICS = [
  {
    label: "Búsquedas Google Business",
    base: 412,
    delta: [-3, 1, 4, 2, 6, 5, 8, 12],
    spark: [4, 6, 5, 7, 6, 9, 8, 12, 11, 14],
  },
  {
    label: "Conversaciones WhatsApp",
    base: 87,
    delta: [-1, 0, 2, 1, 3, 2, 4, 6],
    spark: [2, 3, 5, 4, 6, 5, 7, 8, 9, 11],
  },
  {
    label: "Citas agendadas",
    base: 23,
    delta: [0, 1, 0, 1, 1, 2, 2, 3],
    spark: [1, 2, 1, 3, 2, 4, 3, 5, 4, 6],
  },
];

function useTickingNumber(base: number, delta: number[], stepMs: number) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % delta.length;
      setValue((v) => v + delta[i]);
    }, stepMs);
    return () => clearInterval(id);
  }, [base, delta, stepMs]);
  return value;
}

function MetricRow({ idx }: { idx: number }) {
  const m = METRICS[idx];
  const value = useTickingNumber(m.base, m.delta, 1800 + idx * 600);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.12em] text-cream/55 uppercase">
          {m.label}
        </span>
        <span className="font-mono text-[10px] text-signal">+{m.delta[m.delta.length - 1]}</span>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div
          className="font-sans text-3xl font-semibold tabular-nums text-cream md:text-4xl"
          aria-live="off"
        >
          {value.toLocaleString("es-CO")}
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
    <article
      className="relative flex min-h-[480px] flex-col overflow-hidden rounded-card-lg border border-cream/10 bg-carbon p-7 text-cream"
    >
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
