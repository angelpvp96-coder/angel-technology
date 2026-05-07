"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animations/use-gsap-context";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max desplazamiento en px hacia el cursor */
  strength?: number;
  /** Radio de detección en px alrededor del bbox */
  radius?: number;
};

export function MagneticWrapper({
  children,
  className = "",
  strength = 6,
  radius = 80,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let active = false;

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      if (
        active ||
        Math.abs(currentX) > 0.05 ||
        Math.abs(currentY) > 0.05
      ) {
        raf = requestAnimationFrame(animate);
      } else {
        el.style.transform = "";
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const halfDiag = Math.sqrt(rect.width ** 2 + rect.height ** 2) / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const distFromEdge = dist - halfDiag;

      if (distFromEdge < radius) {
        const proximity = Math.max(0, 1 - distFromEdge / radius);
        const norm = dist > 0 ? 1 / dist : 0;
        targetX = dx * norm * strength * proximity;
        targetY = dy * norm * strength * proximity;
        if (!active) {
          active = true;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(animate);
        }
      } else if (active) {
        active = false;
        targetX = 0;
        targetY = 0;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);
      }
    };

    const onLeave = () => {
      active = false;
      targetX = 0;
      targetY = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [radius, strength]);

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
