import { Logo } from "./Logo";
import { LiveDot } from "@/components/ui/LiveDot";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import {
  BUSINESS_LOCATION,
  CONTACT_EMAIL,
  DOMAIN,
  WHATSAPP_DISPLAY,
  NAV_LINKS,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[3rem] bg-carbon text-cream">
      <div className="mx-auto max-w-[1280px] px-6 pt-20 pb-10 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Logo variant="light" className="h-7 w-auto" />
            <p
              className="mt-6 text-balance font-serif italic text-cream/85"
              style={{ fontSize: "clamp(22px,2.4vw,30px)", lineHeight: 1.18 }}
            >
              Sistemas de captación para negocios locales con criterio
              operativo.
            </p>
            <div className="mt-6">
              <WhatsAppButton source="footer" variant="primary" size="md">
                Hablemos por WhatsApp →
              </WhatsAppButton>
            </div>
          </div>

          <div className="grid w-full max-w-xl grid-cols-2 gap-10 md:grid-cols-3">
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-cream/55 uppercase">
                Navegar
              </div>
              <ul className="mt-4 space-y-2.5 text-[14px] text-cream/85">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a className="hover:text-cream" href={l.href}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-cream/55 uppercase">
                Servicios
              </div>
              <ul className="mt-4 space-y-2.5 text-[14px] text-cream/85">
                <li>Web operativa</li>
                <li>Google Business</li>
                <li>WhatsApp Business</li>
                <li>Asistente IA</li>
                <li>Software a medida</li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-cream/55 uppercase">
                Contacto
              </div>
              <ul className="mt-4 space-y-2.5 text-[14px] text-cream/85">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="hover:text-cream"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>{WHATSAPP_DISPLAY}</li>
                <li className="text-cream/65">{BUSINESS_LOCATION}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-cream/10 pt-6 font-mono text-[11px] tracking-[0.12em] text-cream/55 uppercase md:grid-cols-3 md:items-center">
          <div className="flex items-center gap-2">
            <LiveDot size="sm" />
            <span>Sistema operativo · {new Date().getFullYear()}</span>
          </div>
          <div className="text-cream/45 md:text-center">
            {DOMAIN} · v.2026
          </div>
          <div className="text-cream/45 md:text-right">
            Web + GBP + WhatsApp como una sola máquina.
          </div>
        </div>
      </div>
    </footer>
  );
}
