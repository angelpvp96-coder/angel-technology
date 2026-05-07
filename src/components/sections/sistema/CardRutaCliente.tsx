"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, Globe, MessageCircle, CalendarCheck, Star } from "lucide-react";
import { LiveDot } from "@/components/ui/LiveDot";
import { prefersReducedMotion } from "@/lib/animations/use-gsap-context";

const STEPS = [
  { Icon: Search, label: "Búsqueda" },
  { Icon: Globe, label: "Web" },
  { Icon: MessageCircle, label: "WhatsApp" },
  { Icon: CalendarCheck, label: "Cita" },
  { Icon: Star, label: "Reseña" },
];

export function CardRutaCliente() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cursor = ref.current!.querySelector(".rc-cursor");
      const lines = ref.current!.querySelectorAll<SVGLineElement>(".rc-line");
      const nodes = ref.current!.querySelectorAll(".rc-node");

      const positions = Array.from(nodes).map((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const parent = ref.current!.querySelector(".rc-track")!.getBoundingClientRect();
        return r.left - parent.left + r.width / 2;
      });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      positions.forEach((x, i) => {
        tl.to(cursor, {
          x: x - 12,
          duration: 0.8,
          ease: "power2.inOut",
        });
        tl.to(
          nodes[i],
          { scale: 1.1, duration: 0.25, ease: "back.out(2)", transformOrigin: "center" },
          "<+0.1",
        );
        tl.to(nodes[i], { scale: 1, duration: 0.25 });
        if (i < lines.length) {
          tl.fromTo(
            lines[i],
            { strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
            "<-0.2",
          );
        }
      });
      tl.to(cursor, { opacity: 0, duration: 0.3 });
      tl.set(lines, { strokeDashoffset: 100 });
      tl.set(cursor, { x: positions[0] - 12, opacity: 1 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={ref}
      className="relative flex min-h-[480px] flex-col overflow-hidden rounded-card-lg border border-navy/15 bg-navy p-7 text-cream"
    >
      <header className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] text-operation uppercase">
            03 · Ruta del cliente
          </div>
          <h3 className="mt-3 font-sans text-2xl font-medium tracking-tight text-cream">
            Recorrido medible
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-cream/60 uppercase">
          <LiveDot size="sm" />
          Auditable
        </div>
      </header>

      <div className="mt-12 flex flex-1 flex-col justify-center gap-10">
        <div className="rc-track relative">
          {/* connecting lines */}
          <svg
            className="pointer-events-none absolute top-1/2 left-0 h-12 w-full -translate-y-1/2"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
          >
            {STEPS.slice(0, -1).map((_, i) => {
              const startX = (i + 0.5) * (100 / STEPS.length);
              const endX = (i + 1.5) * (100 / STEPS.length);
              return (
                <line
                  key={i}
                  className="rc-line"
                  x1={startX}
                  x2={endX}
                  y1="6"
                  y2="6"
                  stroke="#E2632F"
                  strokeWidth="0.4"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          <div className="relative grid grid-cols-5 gap-2">
            {STEPS.map(({ Icon, label }, i) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="rc-node flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-cream/[0.04] text-cream"
                  style={{ transformOrigin: "center" }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.4} />
                </div>
                <div className="font-mono text-[9px] tracking-[0.1em] text-cream/60 uppercase">
                  0{i + 1}
                </div>
                <div className="text-center text-[11px] text-cream/85">{label}</div>
              </div>
            ))}
          </div>

          {/* Cursor */}
          <div
            className="rc-cursor pointer-events-none absolute"
            style={{ top: "calc(0.5rem)", left: 0 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 3 L19 12 L13 13 L11 19 Z"
                fill="#E2632F"
                stroke="#0E0F12"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <p className="text-pretty text-sm leading-relaxed text-cream/70">
          Cada paso registrado con timestamp y atribución. Sin métricas vanidad.
          Solo el camino real desde búsqueda hasta cita confirmada.
        </p>
      </div>

      <footer className="mt-6 border-t border-cream/10 pt-4 font-mono text-[10px] tracking-[0.08em] text-cream/40 uppercase">
        Atribución end-to-end
      </footer>
    </article>
  );
}
