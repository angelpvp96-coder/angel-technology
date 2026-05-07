"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { cotizacionSchema } from "@/lib/schemas/cotizacion";
import { CONTACT_EMAIL } from "@/lib/constants";

export type SubmitQuoteResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.reset) {
    ipHits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitQuote(
  formData: FormData,
): Promise<SubmitQuoteResult> {
  const raw = {
    nombre: String(formData.get("nombre") ?? ""),
    negocio: String(formData.get("negocio") ?? ""),
    mensaje: String(formData.get("mensaje") ?? ""),
    honeypot: String(formData.get("honeypot") ?? ""),
  };

  const parsed = cotizacionSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === "string" && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }
    return {
      ok: false,
      error: "Revisa los campos del formulario.",
      fieldErrors,
    };
  }

  if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
    return { ok: true };
  }

  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    hdrs.get("x-real-ip") ??
    "unknown";
  const ua = hdrs.get("user-agent") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return {
      ok: false,
      error:
        "Has enviado varias solicitudes. Intenta de nuevo en una hora o escríbenos por WhatsApp.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[submit-quote] RESEND_API_KEY missing");
    return {
      ok: false,
      error:
        "No pudimos enviar la solicitud por un problema técnico. Escríbenos por WhatsApp y lo resolvemos.",
    };
  }

  const resend = new Resend(apiKey);
  const { nombre, negocio, mensaje } = parsed.data;
  const timestamp = new Date().toISOString();

  const html = `
    <div style="font-family: ui-monospace, monospace; max-width: 600px; line-height: 1.6;">
      <h2 style="color: #1e3a5f; margin: 0 0 16px;">Nueva cotización — Angel Technology</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Negocio:</strong> ${escapeHtml(negocio)}</p>
      <p><strong>Mensaje:</strong></p>
      <blockquote style="border-left: 3px solid #e2632f; padding: 8px 16px; margin: 8px 0; background: #f4f1ec;">
        ${escapeHtml(mensaje).replace(/\n/g, "<br />")}
      </blockquote>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
      <p style="font-size: 11px; color: #888;">
        Recibido: ${timestamp}<br />
        IP: ${escapeHtml(ip)}<br />
        UA: ${escapeHtml(ua)}
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "Angel Technology <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      subject: `[Cotización Angel Technology] ${negocio}`,
      html,
      replyTo: undefined,
    });

    if (error) {
      console.error("[submit-quote] resend error", error);
      return {
        ok: false,
        error:
          "No pudimos enviar la solicitud. Escríbenos por WhatsApp y lo resolvemos directamente.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[submit-quote] exception", err);
    return {
      ok: false,
      error:
        "Algo salió mal al enviar. Inténtalo de nuevo o escríbenos por WhatsApp.",
    };
  }
}
