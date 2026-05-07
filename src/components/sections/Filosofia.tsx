"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiveDot } from "@/components/ui/LiveDot";
import { TerminalCursor } from "@/components/ui/TerminalCursor";
import { FilosofiaSectionTitle } from "./filosofia/SectionTitle";
import { prefersReducedMotion } from "@/lib/animations/use-gsap-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function splitWords(text: string) {
  return text.split(/(\s+)/).map((tok, i) => {
    if (/^\s+$/.test(tok)) return <span key={i}> </span>;
    return (
      <span
        key={i}
        className="word"
        style={{ display: "inline-block", willChange: "transform, opacity" }}
      >
        {tok}
      </span>
    );
  });
}

const PRESION_LISTA = [
  "→ Reseñas inconsistentes en Google.",
  "→ Web heredada que no convierte.",
  "→ WhatsApp respondiendo con plantillas genéricas.",
  "→ Cero atribución entre canal y cita.",
  "→ Inversión en Ads sin sistema que reciba el clic.",
];

export function Filosofia() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const blocks = ref.current!.querySelectorAll<HTMLElement>(".filo-block");
      blocks.forEach((block) => {
        const words = block.querySelectorAll<HTMLElement>(".animated-text .word");
        const reveals = block.querySelectorAll<HTMLElement>("[data-reveal]");

        if (reduced) {
          gsap.set([...words, ...reveals], { opacity: 1, y: 0 });
          return;
        }
        gsap.set(words, { opacity: 0, y: 18 });
        gsap.set(reveals, { opacity: 0, y: 16 });

        ScrollTrigger.create({
          trigger: block,
          start: "top 75%",
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            if (words.length) {
              tl.to(words, {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "expo.out",
                stagger: 0.025,
              });
            }
            if (reveals.length) {
              tl.to(
                reveals,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  stagger: 0.1,
                  ease: "expo.out",
                },
                words.length ? "-=0.4" : 0,
              );
            }
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="filosofia"
      className="relative bg-navy px-6 py-24 text-cream md:px-10 md:py-40"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-32 md:gap-44">
        {/* BLOQUE 1 — PROBLEMA */}
        <div className="filo-block">
          <FilosofiaSectionTitle number="01" eyebrow="El problema" />
          <p
            className="animated-text mt-8 max-w-3xl text-pretty font-sans text-[clamp(24px,2.6vw,32px)] leading-[1.25] text-cream"
          >
            {splitWords(
              "Los negocios locales pagan páginas que no convierten. Pagan publicidad que entrega al usuario en una experiencia rota. Pagan presencia que no produce.",
            )}
          </p>
          <blockquote
            data-reveal
            className="mt-10 max-w-3xl border-l-2 border-operation pl-6"
          >
            <p className="font-serif italic text-[clamp(28px,3.4vw,40px)] leading-[1.15] text-cream/90">
              No vendemos sitios. Construimos el sistema que convierte la
              búsqueda en cita confirmada.
            </p>
          </blockquote>
        </div>

        {/* BLOQUE 2 — DISTINCIÓN */}
        <div className="filo-block">
          <FilosofiaSectionTitle number="02" eyebrow="La distinción" />
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14">
            <div className="opacity-55">
              <div className="font-mono text-[10px] tracking-[0.16em] text-cream/60 uppercase">
                · Lo que reciben de otros
              </div>
              <ul className="mt-5 space-y-3 text-pretty text-base leading-relaxed text-cream/80">
                <li>Plantillas genéricas con paleta corporativa.</li>
                <li>Slides de marca sin operación detrás.</li>
                <li>Reportes vanidad: visitas, impresiones, alcance.</li>
                <li>Promesas de SEO sin auditoría técnica.</li>
                <li>Ads sin embudo conectado.</li>
              </ul>
            </div>
            <div data-reveal>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-cream uppercase">
                <LiveDot size="sm" />
                Lo que entregamos
              </div>
              <ul className="mt-5 space-y-3 text-pretty text-base leading-relaxed text-cream">
                <li>Sistema operativo: web + GBP + WhatsApp como uno.</li>
                <li>Identidad técnica curada por sector.</li>
                <li>Atribución end-to-end de clic a cita.</li>
                <li>Asistente IA calificando 24/7 en WhatsApp.</li>
                <li>Reporting con KPIs de negocio, no de marketing.</li>
              </ul>
            </div>
          </div>
          <p
            data-reveal
            className="mt-14 text-center font-serif italic text-[clamp(28px,4.2vw,52px)] leading-[1.05] text-cream"
          >
            La marca cierra; el sistema agenda.
          </p>
        </div>

        {/* BLOQUE 3 — CASO REAL (presión + lista) */}
        <div className="filo-block">
          <FilosofiaSectionTitle number="03" eyebrow="Lo que recibe el cliente" />
          <p
            className="animated-text mt-8 max-w-3xl text-pretty font-sans text-[clamp(20px,2vw,26px)] leading-[1.4] text-cream"
          >
            {splitWords(
              "Un cliente típico llega con presión real. No con un brief. Con problemas que cuestan dinero todos los días.",
            )}
          </p>
          <ul className="mt-10 max-w-3xl space-y-4 font-mono text-[14px] leading-relaxed text-cream/85">
            {PRESION_LISTA.map((line, i) => (
              <li
                key={i}
                data-reveal
                className="flex items-start gap-3"
              >
                <span className="text-operation">{line.split(" ")[0]}</span>
                <span>{line.replace("→ ", "")}</span>
                {i === PRESION_LISTA.length - 1 && (
                  <TerminalCursor className="ml-1" />
                )}
              </li>
            ))}
          </ul>
          <p
            data-reveal
            className="mt-10 max-w-3xl text-pretty text-base leading-relaxed text-cream/75"
          >
            Resolvemos la lista. Después construimos sobre lo que quedó
            funcionando. No hay reset estético: hay reparación operativa.
          </p>
        </div>

        {/* BLOQUE 4 — CÓMO TRABAJAMOS */}
        <div className="filo-block">
          <FilosofiaSectionTitle number="04" eyebrow="Cómo trabajamos" />
          <p
            className="animated-text mt-8 max-w-3xl text-pretty font-sans text-[clamp(20px,2vw,26px)] leading-[1.4] text-cream"
          >
            {splitWords(
              "Diagnóstico operativo. Decisiones por etapas. Entregables verificables. Sin reuniones para discutir reuniones.",
            )}
          </p>
          <div
            data-reveal
            className="mt-10 max-w-3xl border-y border-cream/15 py-5 font-mono text-[12px] tracking-[0.06em] text-cream/70 uppercase"
          >
            DIAGNÓSTICO → IDENTIDAD → SISTEMA → CALIBRACIÓN → OPERACIÓN
          </div>
          <p
            data-reveal
            className="mt-10 max-w-3xl text-balance font-serif italic text-[clamp(24px,3vw,36px)] leading-[1.15] text-cream/90"
          >
            Trabajamos como ingeniería. Comunicamos como editorial. Medimos como
            operación.
          </p>
        </div>

        {/* BLOQUE 5 — CIERRE */}
        <div className="filo-block">
          <p
            data-reveal
            className="text-center font-mono text-[12px] tracking-[0.16em] text-cream/70 uppercase"
          >
            Reporte operativo · Angel Technology · Florencia, Caquetá
          </p>
        </div>
      </div>
    </section>
  );
}
