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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;

    let tl: gsap.core.Timeline | null = null;
    let ro: ResizeObserver | null = null;

    const buildTimeline = () => {
      if (!ref.current) return;
      tl?.kill();

      const cursor = ref.current.querySelector<HTMLElement>(".rc-cursor");
      const lines = ref.current.querySelectorAll<SVGLineElement>(".rc-line");
      const nodes = ref.current.querySelectorAll<HTMLElement>(".rc-node");
      const track = ref.current.querySelector<HTMLElement>(".rc-track");
      if (!cursor || !track || nodes.length === 0) return;

      const trackBox = track.getBoundingClientRect();
      const positions = Array.from(nodes).map((el) => {
        const r = el.getBoundingClientRect();
        return r.left - trackBox.left + r.width / 2;
      });

      gsap.set(lines, { strokeDashoffset: 100 });
      gsap.set(cursor, { x: positions[0] - 12, opacity: 1 });

      tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      positions.forEach((x, i) => {
        if (i === 0) return;
        tl!
          .to(cursor, {
            x: x - 12,
            duration: 0.85,
            ease: "power2.inOut",
          })
          .fromTo(
            lines[i - 1],
            { strokeDashoffset: 100 },
            { strokeDashoffset: 0, duration: 0.85, ease: "power2.inOut" },
            "<",
          )
          .to(
            nodes[i],
            {
              scale: 1.12,
              duration: 0.25,
              ease: "back.out(2)",
              transformOrigin: "center",
            },
            "-=0.15",
          )
          .to(nodes[i], { scale: 1, duration: 0.25 });
      });
      tl.to({}, { duration: 0.6 });
      tl.to([cursor, ...lines], { opacity: 0, duration: 0.4 });
      tl.set(cursor, { x: positions[0] - 12, opacity: 1 });
      tl.set(lines, { strokeDashoffset: 100, opacity: 1 });
    };

    const t = setTimeout(buildTimeline, 80);
    ro = new ResizeObserver(() => buildTimeline());
    ro.observe(ref.current);

    return () => {
      clearTimeout(t);
      tl?.kill();
      ro?.disconnect();
    };
  }, []);

  return (
    <article
      ref={ref}
      className="group/card relative flex min-h-[480px] flex-col overflow-hidden rounded-card-lg border border-navy/15 bg-navy p-7 text-cream transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy hover:shadow-[0_24px_48px_rgba(14,15,18,0.25)]"
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
              <div key={label} className="flex flex-col items-center gap-3">
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

          <div
            className="rc-cursor pointer-events-none absolute top-2 left-0"
            style={{ willChange: "transform" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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
