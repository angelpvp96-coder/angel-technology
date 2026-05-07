"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animations/use-gsap-context";

const NODES = [
  { id: "web", label: "WEB", x: 18, y: 28 },
  { id: "gbp", label: "GBP", x: 82, y: 22 },
  { id: "wa", label: "WHATSAPP", x: 88, y: 70 },
  { id: "ai", label: "ASISTENTE", x: 30, y: 82 },
  { id: "crm", label: "CRM", x: 12, y: 60 },
];

const CENTER = { x: 50, y: 50 };

export function HeroVisualization() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Pulse central
      gsap.to(".hv-center-pulse", {
        scale: 1.6,
        opacity: 0,
        duration: 1.6,
        ease: "power2.out",
        repeat: -1,
        transformOrigin: "center",
      });

      // Travelers animados
      NODES.forEach((node, i) => {
        const traveler = document.querySelector(`#hv-trav-${node.id}`);
        if (!traveler) return;
        const tl = gsap.timeline({ repeat: -1, delay: i * 0.6 });
        tl.fromTo(
          traveler,
          { cx: CENTER.x, cy: CENTER.y, opacity: 0 },
          { opacity: 1, duration: 0.2 },
        ).to(traveler, {
          cx: node.x,
          cy: node.y,
          duration: 2.4,
          ease: "power1.inOut",
        }).to(traveler, { opacity: 0, duration: 0.2 });
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="h-full w-full max-h-[700px] max-w-[900px]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Lines from center */}
        {NODES.map((n) => (
          <line
            key={`line-${n.id}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            stroke="rgba(74,111,142,0.35)"
            strokeWidth="0.15"
            strokeDasharray="0.6 0.6"
          />
        ))}

        {/* Peripheral nodes */}
        {NODES.map((n) => (
          <g key={`node-${n.id}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="0.9"
              fill="rgba(244,241,236,0.7)"
            />
            <circle
              cx={n.x}
              cy={n.y}
              r="2.2"
              fill="none"
              stroke="rgba(244,241,236,0.2)"
              strokeWidth="0.12"
            />
            <text
              x={n.x}
              y={n.y - 3.5}
              fontSize="1.6"
              fontFamily="var(--font-geist-mono), monospace"
              fill="rgba(244,241,236,0.55)"
              textAnchor="middle"
              letterSpacing="0.05em"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Travelers */}
        {NODES.map((n) => (
          <circle
            key={`trav-${n.id}`}
            id={`hv-trav-${n.id}`}
            cx={CENTER.x}
            cy={CENTER.y}
            r="0.5"
            fill="#E2632F"
          />
        ))}

        {/* Center node */}
        <circle
          className="hv-center-pulse"
          cx={CENTER.x}
          cy={CENTER.y}
          r="3"
          fill="#2D7D6E"
          opacity="0.5"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        <circle cx={CENTER.x} cy={CENTER.y} r="1.4" fill="#2D7D6E" />
        <circle cx={CENTER.x} cy={CENTER.y} r="0.6" fill="#F4F1EC" />
      </svg>
    </div>
  );
}
