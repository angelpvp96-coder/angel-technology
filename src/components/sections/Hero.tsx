"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroVisualization } from "./hero/HeroVisualization";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LiveDot } from "@/components/ui/LiveDot";
import { prefersReducedMotion } from "@/lib/animations/use-gsap-context";

const HEADLINE_LINE_1 = "La presencia es";
const HEADLINE_LINE_2 = "la conversión.";

function splitWords(text: string, baseClass: string) {
  return text.split(/(\s+)/).map((tok, i) => {
    if (/^\s+$/.test(tok)) return <span key={i}> </span>;
    return (
      <span
        key={i}
        className={baseClass}
        style={{ display: "inline-block", willChange: "transform, opacity" }}
      >
        {tok}
      </span>
    );
  });
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(["[data-hero-animate]"], { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 0.9 },
      });
      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0)
        .from(
          ".hero-line-1 .word",
          { y: 28, opacity: 0, stagger: 0.035, duration: 0.7 },
          0.15,
        )
        .from(
          ".hero-line-2 .word",
          { y: 36, opacity: 0, stagger: 0.04, duration: 0.8 },
          0.4,
        )
        .from(".hero-subhead", { y: 12, opacity: 0, duration: 0.6 }, 0.75)
        .from(
          ".hero-cta",
          { scale: 0.92, opacity: 0, duration: 0.5, ease: "back.out(1.6)" },
          0.95,
        )
        .from(".hero-meta > *", { opacity: 0, stagger: 0.05, duration: 0.4 }, 1.05)
        .from(
          ".hero-viz",
          { opacity: 0, scale: 0.96, duration: 1.1 },
          0,
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative isolate overflow-hidden bg-carbon text-cream"
      style={{ minHeight: "100dvh" }}
    >
      <HeroBackground />
      <div className="hero-viz absolute inset-0 z-[1]">
        <HeroVisualization />
      </div>

      <div className="relative z-[2] mx-auto flex min-h-[100dvh] max-w-[1200px] flex-col justify-end px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24">
        <div className="hero-eyebrow flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-cream/60 uppercase">
          <LiveDot size="sm" label="estado del sistema" />
          <span>Sistema operativo · v.2026</span>
          <span className="hidden h-px w-12 bg-cream/20 md:inline-block" />
          <span className="hidden md:inline">Florencia, Caquetá · CO</span>
        </div>

        <h1
          data-hero-animate
          className="mt-8 text-balance font-sans text-cream"
        >
          <span
            className="hero-line-1 block leading-[0.95] font-semibold tracking-[-0.02em]"
            style={{ fontSize: "clamp(48px, 9vw, 96px)" }}
          >
            {splitWords(HEADLINE_LINE_1, "word")}
          </span>
          <span
            className="hero-line-2 mt-1 block font-serif italic leading-[0.95] tracking-[-0.02em] text-cream"
            style={{ fontSize: "clamp(60px, 11vw, 120px)" }}
          >
            {splitWords(HEADLINE_LINE_2, "word")}
          </span>
        </h1>

        <p
          data-hero-animate
          className="hero-subhead mt-8 max-w-2xl text-pretty text-cream/75"
          style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.5 }}
        >
          Construimos sistemas de captación para negocios locales: web propia,
          Google Business y WhatsApp Business operando como una sola máquina
          que produce <span className="text-cream">citas agendadas</span>, no
          visitas curiosas.
        </p>

        <div
          data-hero-animate
          className="hero-cta mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <WhatsAppButton source="hero" variant="primary" size="lg" magnetic>
            Hablemos por WhatsApp →
          </WhatsAppButton>
          <a
            href="#sistema"
            className="inline-flex items-center gap-2 px-2 py-3 text-sm text-cream/70 transition-colors hover:text-cream"
          >
            Ver el sistema en vivo
            <span aria-hidden>↓</span>
          </a>
        </div>

        <div
          data-hero-animate
          className="hero-meta mt-16 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-cream/10 pt-6 font-mono text-[11px] tracking-[0.08em] text-cream/55 uppercase md:grid-cols-4"
        >
          <div>
            <div className="text-cream">Web propia</div>
            <div className="mt-1 normal-case tracking-normal text-cream/45">
              Identidad técnica.
            </div>
          </div>
          <div>
            <div className="text-cream">Google Business</div>
            <div className="mt-1 normal-case tracking-normal text-cream/45">
              Capta búsqueda local.
            </div>
          </div>
          <div>
            <div className="text-cream">WhatsApp Business</div>
            <div className="mt-1 normal-case tracking-normal text-cream/45">
              Cierra la conversación.
            </div>
          </div>
          <div>
            <div className="text-cream">Asistente IA</div>
            <div className="mt-1 normal-case tracking-normal text-cream/45">
              Califica 24/7.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
