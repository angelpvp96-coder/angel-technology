"use client";

import { useEffect, useState } from "react";
import { LiveDot } from "@/components/ui/LiveDot";
import { TerminalCursor } from "@/components/ui/TerminalCursor";

type Msg = {
  who: "in" | "out";
  text: string;
};

const SCRIPT: Msg[] = [
  { who: "in", text: "Hola, vi su clínica en Google. ¿Atienden brackets?" },
  { who: "out", text: "Hola Laura, sí. ¿Te interesa primera valoración?" },
  { who: "in", text: "Sí, ¿precio y horarios?" },
  {
    who: "out",
    text: "Valoración $80.000. Agendamos jueves 4pm o viernes 10am.",
  },
  { who: "in", text: "Jueves 4pm." },
  {
    who: "out",
    text: "Listo. Te llega confirmación con dirección y mapa.",
  },
  { who: "in", text: "Buenos días, ¿hacen limpieza dental?" },
  { who: "out", text: "Sí. ¿Para esta semana o la próxima?" },
  { who: "in", text: "Esta semana de ser posible." },
  { who: "out", text: "Miércoles 11am queda libre. ¿Lo aparto?" },
];

export function CardAsistenteIA() {
  const [visible, setVisible] = useState<Msg[]>(SCRIPT.slice(0, 4));
  const [cursor, setCursor] = useState(4);
  const [typing, setTyping] = useState<"in" | "out" | null>(null);

  useEffect(() => {
    const nextMsg = SCRIPT[cursor % SCRIPT.length];
    const typingDelay = 1200;
    const settleDelay = 2400;

    const t1 = setTimeout(() => setTyping(nextMsg.who), 200);
    const t2 = setTimeout(() => {
      setTyping(null);
      setVisible((curr) => [...curr.slice(1), nextMsg]);
      setCursor((c) => c + 1);
    }, typingDelay + settleDelay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [cursor]);

  return (
    <article className="group/card relative flex min-h-[480px] flex-col overflow-hidden rounded-card-lg border border-navy/10 bg-cream p-7 text-navy transition-all duration-300 ease-out hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_24px_48px_rgba(14,15,18,0.12)]">
      <header className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] text-operation uppercase">
            02 · Asistente IA
          </div>
          <h3 className="mt-3 font-sans text-2xl font-medium tracking-tight text-navy">
            Conversaciones cualificadas
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-navy/60 uppercase">
          <LiveDot size="sm" />
          STREAM · WhatsApp
        </div>
      </header>

      <div className="mt-8 flex flex-1 flex-col-reverse gap-3 overflow-hidden">
        {typing && (
          <div
            key={`typing-${cursor}`}
            className={[
              "flex max-w-[88%] items-center gap-1 rounded-[14px] px-4 py-3",
              typing === "in"
                ? "self-start bg-navy/5"
                : "self-end bg-navy",
            ].join(" ")}
            style={{ animation: "msg-fade-up 0.3s ease-out both" }}
            aria-label="escribiendo"
          >
            <TypingDots inverted={typing === "out"} />
          </div>
        )}
        {[...visible].reverse().map((m, i) => {
          const isLast = i === 0 && !typing;
          return (
            <div
              key={`${cursor}-${i}`}
              className={[
                "max-w-[88%] rounded-[14px] px-4 py-2.5 text-sm leading-snug",
                m.who === "in"
                  ? "self-start bg-navy/5 text-navy"
                  : "self-end bg-navy text-cream",
              ].join(" ")}
              style={{
                animation: "msg-fade-up 0.45s ease-out both",
                opacity: 1 - (visible.length - 1 - i) * 0.16,
              }}
            >
              {m.text}
              {isLast && m.who === "out" && (
                <TerminalCursor className="ml-1 bg-cream" />
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes msg-fade-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </article>
  );
}

function TypingDots({ inverted }: { inverted: boolean }) {
  const color = inverted ? "bg-cream/85" : "bg-navy/55";
  return (
    <span className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${color}`}
          style={{
            animation: `typing-bounce 1.1s ${i * 0.15}s ease-in-out infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes typing-bounce {
          0%,
          60%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }
      `}</style>
    </span>
  );
}
