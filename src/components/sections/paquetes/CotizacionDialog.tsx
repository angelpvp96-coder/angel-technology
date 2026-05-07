"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CotizacionForm } from "@/components/forms/CotizacionForm";
type Props = {
  trigger: React.ReactNode;
};

export function CotizacionDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cot-title"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-carbon/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-[520px] rounded-card-lg border border-navy/10 bg-cream p-7 shadow-2xl md:p-10">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-operation uppercase">
                  · Solicitar cotización
                </div>
                <h2
                  id="cot-title"
                  className="mt-2 font-sans text-2xl font-semibold tracking-tight text-navy md:text-3xl"
                >
                  Cuéntanos tu operación.
                </h2>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar diálogo"
                className="rounded-[0.75rem] p-2 text-navy/70 transition-colors hover:bg-navy/5 hover:text-navy focus-visible:outline-2 focus-visible:outline-operation focus-visible:outline-offset-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-navy/70">
              Diagnóstico operativo previo. Plan por etapas. Respondemos en
              menos de 24h.
            </p>
            <div className="mt-6">
              <CotizacionForm onSuccess={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
