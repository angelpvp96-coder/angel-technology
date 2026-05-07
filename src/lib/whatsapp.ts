import { WHATSAPP_NUMBER } from "./constants";

export type WhatsAppSource =
  | "hero"
  | "navbar"
  | "pro_card"
  | "elite_card"
  | "footer"
  | "filosofia"
  | "mobile_menu";

export const DEFAULT_MESSAGES: Record<WhatsAppSource, string> = {
  hero: "Hola Angel, vi tu sitio y quiero hablar sobre montar mi sistema de captación.",
  navbar: "Hola Angel, vengo del sitio.",
  pro_card:
    "Hola Angel, me interesa el paquete Pro ($3.200.000 COP). ¿Podemos conversar?",
  elite_card:
    "Hola Angel, me interesa el paquete Elite ($5.700.000 COP). ¿Podemos conversar?",
  footer: "Hola Angel, vengo del pie del sitio.",
  filosofia:
    "Hola Angel, leí la sección de filosofía y quiero conversar sobre mi negocio.",
  mobile_menu: "Hola Angel, vengo del sitio.",
};

export function buildWhatsAppLink(opts: {
  source: WhatsAppSource;
  message?: string;
}): string {
  const text = encodeURIComponent(opts.message ?? DEFAULT_MESSAGES[opts.source]);
  const utms = `utm_source=site&utm_medium=cta&utm_campaign=${opts.source}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}&${utms}`;
}
