"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cotizacionSchema,
  type CotizacionInput,
} from "@/lib/schemas/cotizacion";
import { submitQuote, type SubmitQuoteResult } from "@/app/actions/submit-quote";
import { Button } from "@/components/ui/Button";

type Props = {
  onSuccess?: () => void;
};

export function CotizacionForm({ onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();
  const [serverResult, setServerResult] = useState<SubmitQuoteResult | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CotizacionInput>({
    resolver: zodResolver(cotizacionSchema),
    defaultValues: { nombre: "", negocio: "", mensaje: "", honeypot: "" },
  });

  const onSubmit = handleSubmit((data) => {
    const fd = new FormData();
    fd.set("nombre", data.nombre);
    fd.set("negocio", data.negocio);
    fd.set("mensaje", data.mensaje);
    fd.set("honeypot", data.honeypot ?? "");

    startTransition(async () => {
      const res = await submitQuote(fd);
      setServerResult(res);
      if (res.ok) {
        reset();
        setTimeout(() => onSuccess?.(), 1800);
      }
    });
  });

  if (serverResult?.ok) {
    return (
      <div role="status" aria-live="polite" className="py-8 text-center">
        <div className="font-mono text-[11px] tracking-[0.16em] text-signal uppercase">
          · Solicitud recibida
        </div>
        <h3 className="mt-3 font-sans text-2xl font-medium text-navy">
          Te escribimos en menos de 24h.
        </h3>
        <p className="mt-3 text-sm text-navy/70">
          Si necesitas conversar antes, también puedes escribirnos por
          WhatsApp.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-[0.85rem] border border-navy/15 bg-cream px-4 py-3 font-sans text-[15px] text-navy placeholder:text-navy/35 focus:border-navy focus:outline-2 focus:outline-operation focus:outline-offset-2";

  const fieldErrors = !serverResult?.ok ? serverResult?.fieldErrors : undefined;

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <label
          htmlFor="nombre"
          className="font-mono text-[10px] tracking-[0.16em] text-navy/65 uppercase"
        >
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.nombre || !!fieldErrors?.nombre}
          aria-describedby={errors.nombre ? "nombre-err" : undefined}
          {...register("nombre")}
          className={fieldClass}
          placeholder="Tu nombre"
        />
        {(errors.nombre || fieldErrors?.nombre) && (
          <p id="nombre-err" className="text-xs text-operation">
            {errors.nombre?.message ?? fieldErrors?.nombre}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="negocio"
          className="font-mono text-[10px] tracking-[0.16em] text-navy/65 uppercase"
        >
          Negocio
        </label>
        <input
          id="negocio"
          type="text"
          autoComplete="organization"
          aria-invalid={!!errors.negocio || !!fieldErrors?.negocio}
          {...register("negocio")}
          className={fieldClass}
          placeholder="Clínica, bufete, restaurante…"
        />
        {(errors.negocio || fieldErrors?.negocio) && (
          <p className="text-xs text-operation">
            {errors.negocio?.message ?? fieldErrors?.negocio}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="mensaje"
          className="font-mono text-[10px] tracking-[0.16em] text-navy/65 uppercase"
        >
          Qué necesitas
        </label>
        <textarea
          id="mensaje"
          rows={4}
          aria-invalid={!!errors.mensaje || !!fieldErrors?.mensaje}
          {...register("mensaje")}
          className={`${fieldClass} resize-none`}
          placeholder="Cuéntanos brevemente la situación actual y a qué quieres llegar."
        />
        {(errors.mensaje || fieldErrors?.mensaje) && (
          <p className="text-xs text-operation">
            {errors.mensaje?.message ?? fieldErrors?.mensaje}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="website">Sitio web</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      {serverResult && !serverResult.ok && !serverResult.fieldErrors && (
        <p role="alert" className="text-sm text-operation">
          {serverResult.error}
        </p>
      )}

      <Button
        as="button"
        type="submit"
        variant="navy"
        size="lg"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Enviando…" : "Enviar solicitud →"}
      </Button>
      <p className="text-center text-xs text-navy/55">
        Respondemos por correo o WhatsApp en menos de 24 horas hábiles.
      </p>
    </form>
  );
}
