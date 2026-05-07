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

  const cta =
    paquete.ctaType === "whatsapp" ? (
      <WhatsAppButton
        source={paquete.id === "elite" ? "elite_card" : "pro_card"}
        variant={isElite ? "primary" : "navy"}
        size="md"
        className="w-full"
      >
        {paquete.ctaLabel}
      </WhatsAppButton>
    ) : (
      <CotizacionDialog
        trigger={
          <Button as="button" variant="navy" size="md" className="w-full">
            {paquete.ctaLabel}
          </Button>
        }
      />
    );

  return (
    <article
      className={[
        "relative flex flex-col gap-7 overflow-hidden rounded-card-lg border p-7 md:p-9",
        surface,
        isElite ? "shadow-[0_24px_64px_-24px_rgba(30,58,95,0.45)]" : "",
      ].join(" ")}
    >
      {isElite && (
        <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-cream uppercase">
          <LiveDot size="sm" />
          MÁS ELEGIDO
        </div>
      )}

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
            <>
              <span
                className="font-sans font-semibold tracking-tight tabular-nums"
                style={{ fontSize: "clamp(28px,3.4vw,38px)" }}
              >
                {paquete.precio}
              </span>
            </>
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
    </article>
  );
}
