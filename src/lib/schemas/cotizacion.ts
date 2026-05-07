import { z } from "zod";

export const cotizacionSchema = z.object({
  nombre: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(80, "Máximo 80 caracteres"),
  negocio: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(120, "Máximo 120 caracteres"),
  mensaje: z
    .string()
    .min(10, "Cuéntanos un poco más")
    .max(1000, "Máximo 1000 caracteres"),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type CotizacionInput = z.infer<typeof cotizacionSchema>;
