import { PAQUETES } from "@/lib/data/paquetes";
import { PaqueteCard } from "./paquetes/PaqueteCard";

export function Paquetes() {
  return (
    <section
      id="paquetes"
      className="relative bg-cream px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] tracking-[0.18em] text-operation uppercase">
              · Paquetes operativos
            </div>
            <h2
              className="mt-4 text-balance font-sans font-semibold tracking-[-0.02em] text-navy"
              style={{ fontSize: "clamp(36px,5.5vw,64px)", lineHeight: 1.02 }}
            >
              Tres formas de{" "}
              <span className="font-serif italic font-medium">entrar al sistema</span>
              .
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base leading-relaxed text-navy/65 md:text-right">
            Pagos 50/50: mitad al inicio, mitad al entregar. Sin retainers
            forzados, sin contratos a 12 meses.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {PAQUETES.map((p) => (
            <PaqueteCard key={p.id} paquete={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
