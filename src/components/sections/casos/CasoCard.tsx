import type { Caso } from "@/types";
import { DemoFrame } from "./DemoFrame";

type Props = {
  caso: Caso;
  index: number;
};

export function CasoCard({ caso, index }: Props) {
  return (
    <article className="caso-card relative overflow-hidden rounded-card-lg border border-navy/10 bg-cream p-6 md:p-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_5fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <header className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-operation uppercase">
            <span>0{index + 1}</span>
            <span className="h-px w-8 bg-operation/40" />
            <span>{caso.vertical}</span>
          </header>
          <h3
            className="font-sans font-semibold tracking-[-0.02em] text-navy"
            style={{ fontSize: "clamp(40px,5vw,64px)", lineHeight: 1 }}
          >
            {caso.nombre}
          </h3>
          <p
            className="text-balance font-serif italic text-navy/80"
            style={{ fontSize: "clamp(22px,2.6vw,30px)", lineHeight: 1.18 }}
          >
            {caso.subtitulo}
          </p>
          <div className="space-y-4 text-pretty text-[15px] leading-relaxed text-navy/75">
            {caso.descripcion.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {caso.metric && (
            <div className="mt-2 inline-flex flex-col gap-1 self-start border-l-2 border-operation pl-4">
              <span className="font-mono text-[10px] tracking-[0.16em] text-navy/55 uppercase">
                {caso.metric.label}
              </span>
              <span className="font-sans text-3xl font-semibold tracking-tight text-navy">
                {caso.metric.value}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <DemoFrame url={caso.demoUrl} title={`Demo de ${caso.nombre}`} />
        </div>
      </div>
    </article>
  );
}
