"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASOS } from "@/lib/data/casos";
import { CasoCard } from "./casos/CasoCard";
import { prefersReducedMotion } from "@/lib/animations/use-gsap-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Casos() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const ctx = gsap.context(() => {
      const cards =
        ref.current!.querySelectorAll<HTMLElement>(".caso-stack-item");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.4,
          filter: "blur(6px)",
          ease: "power1.out",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="casos" className="relative bg-cream px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-[11px] tracking-[0.18em] text-operation uppercase">
              · Casos en operación
            </div>
            <h2
              className="mt-4 text-balance font-sans font-semibold tracking-[-0.02em] text-navy"
              style={{ fontSize: "clamp(36px,5.5vw,64px)", lineHeight: 1.02 }}
            >
              Sistemas vivos,{" "}
              <span className="font-serif italic font-medium">
                resultado verificable
              </span>
              .
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base leading-relaxed text-navy/65 md:text-right">
            Demos cargan en vivo en escritorio. En móvil abren en pestaña nueva
            para preservar el rendimiento.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-10">
          {CASOS.map((caso, i) => (
            <div key={caso.id} className="caso-stack-item">
              <CasoCard caso={caso} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
