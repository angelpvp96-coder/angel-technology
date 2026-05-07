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
  { who: "out", text: "Valoración $80.000. Agendamos jueves 4pm o viernes 10am." },
  { who: "in", text: "Jueves 4pm." },
  { who: "out", text: "Listo. Te llega confirmación con dirección y mapa." },
  { who: "in", text: "Buenos días, ¿hacen limpieza dental?" },
  { who: "out", text: "Sí. ¿Para esta semana o la próxima?" },
  { who: "in", text: "Esta semana de ser posible." },
  { who: "out", text: "Miércoles 11am queda libre. ¿Lo aparto?" },
];

export function CardAsistenteIA() {
  const [visible, setVisible] = useState<Msg[]>(SCRIPT.slice(0, 4));
  const [cursor, setCursor] = useState(4);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((curr) => {
        const next = [...curr.slice(1), SCRIPT[cursor % SCRIPT.length]];
        return next;
      });
      setCursor((c) => c + 1);
    }, 3200);
    return () => clearInterval(id);
  }, [cursor]);

  return (
    <article className="relative flex min-h-[480px] flex-col overflow-hidden rounded-card-lg border border-navy/15 bg-cream p-7 text-navy">
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
        {[...visible].reverse().map((m, i) => (
          <div
            key={`${cursor}-${i}`}
            className={[
              "msg max-w-[88%] rounded-[14px] px-4 py-2.5 text-sm leading-snug",
              m.who === "in"
                ? "self-start bg-navy/5 text-navy"
                : "self-end bg-navy text-cream",
            ].join(" ")}
            style={{
              animation: "fade-up 0.5s ease-out both",
              opacity: 1 - (visible.length - 1 - i) * 0.18,
            }}
          >
            {m.text}
            {i === 0 && m.who === "out" && (
              <TerminalCursor className="ml-1 bg-cream" />
            )}
          </div>
        ))}
      </div>

      <footer className="mt-6 flex items-center justify-between border-t border-navy/10 pt-4 font-mono text-[10px] tracking-[0.08em] text-navy/50 uppercase">
        <span>Calificación → Agendamiento</span>
        <span>{cursor} mensajes/h</span>
      </footer>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(8px);
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
