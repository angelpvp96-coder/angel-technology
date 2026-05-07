import { Check } from "lucide-react";
import type { Paquete } from "@/types";
import { LiveDot } from "@/components/ui/LiveDot";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CotizacionDialog } from "./CotizacionDialog";
import { Button } from "@/components/ui/Button";

type Props = { paquete: Paquete };

export function PaqueteCard({ paquete }: Props) {
  const isElite = paquete.destacado;

  const surface = isElite
    ? "bg-navy text-cream border-navy"
    : "bg-cream text-navy border-navy/10";

  const checkColor = isElite ? "text-operation" : "text-navy";
  const subtleText = isElite ? "text-cream/65" : "text-navy/65";
  const dividerColor = isElite ? "border-cream/15" : "border-navy/10";

  const hoverElevate = isElite
    ? "hover:-translate-y-1 hover:shadow-[0_28px_56px_-8px_rgba(226,99,47,0.45)]"
    : "hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_24px_48px_rgba(14,15,18,0.12)]";

  const cta =
    paquete.ctaType === "whatsapp" ? (
      <WhatsAppButton
        source={paquete.id === "elite" ? "elite_card" : "pro_card"}
        variant={isElite ? "primary" : "navy"}
        size="md"
        className="w-full"
        magnetic
      >
        {paquete.ctaLabel}
      </WhatsAppButton>
    ) : (
      <CotizacionDialog
        trigger={
          <Button as="button" variant="navy" size="md" className="w-full" magnetic>
            {paquete.ctaLabel}
          </Button>
        }
      />
    );

  return (
    <article
      className={[
        "relative flex flex-col overflow-hidden rounded-card-lg border transition-all duration-300 ease-out",
        surface,
        hoverElevate,
        isElite ? "shadow-[0_24px_64px_-24px_rgba(30,58,95,0.45)]" : "",
      ].join(" ")}
    >
      {isElite && (
        <div className="flex items-center justify-between gap-3 border-b border-cream/15 bg-gradient-to-r from-operation/15 via-operation/5 to-transparent px-7 py-3 md:px-9">
          <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-cream uppercase">
            <LiveDot size="sm" />
            MÁS ELEGIDO · Q2 2026
          </div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-operation uppercase">
            Recomendado
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-7 p-7 md:p-9">
        <header className="flex flex-col gap-3">
          <div
            className={`font-mono text-[10px] tracking-[0.18em] uppercase ${
              isElite ? "text-cream/70" : "text-operation"
            }`}
          >
            · {paquete.eyebrow}
          </div>
          <h3
            className="font-sans font-semibold tracking-[-0.02em]"
            style={{ fontSize: "clamp(32px,4vw,44px)", lineHeight: 1 }}
          >
            {paquete.nombre}
          </h3>
        </header>

        <div className={`border-t pt-5 ${dividerColor}`}>
          <div className="flex items-baseline gap-2">
            {paquete.precio ? (
              <span
                className="font-sans font-semibold tracking-tight tabular-nums"
                style={{ fontSize: "clamp(28px,3.4vw,38px)" }}
              >
                {paquete.precio}
              </span>
            ) : (
              <span
                className={`font-serif italic ${
                  isElite ? "text-cream" : "text-navy"
                }`}
                style={{ fontSize: "clamp(24px,3vw,32px)" }}
              >
                {paquete.precioLabel}
              </span>
            )}
          </div>
          <p className={`mt-2 text-[12px] ${subtleText}`}>{paquete.subprecio}</p>
        </div>

        <ul className="flex flex-col gap-3 text-[14px] leading-snug">
          {paquete.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check
                className={`mt-0.5 h-4 w-4 shrink-0 ${checkColor}`}
                strokeWidth={2.2}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4">
          {cta}
          <p
            className={`font-mono text-[10px] tracking-[0.12em] uppercase ${subtleText}`}
          >
            {paquete.garantia}
          </p>
        </div>
      </div>
    </article>
  );
}
