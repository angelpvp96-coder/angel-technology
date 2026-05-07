import { CardEmbudoEnVivo } from "./sistema/CardEmbudoEnVivo";
import { CardAsistenteIA } from "./sistema/CardAsistenteIA";
import { CardRutaCliente } from "./sistema/CardRutaCliente";

export function Sistema() {
  return (
    <section
      id="sistema"
      className="relative bg-cream px-6 py-24 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] tracking-[0.18em] text-operation uppercase">
              · El sistema operando
            </div>
            <h2
              className="mt-4 text-balance font-sans font-semibold tracking-[-0.02em] text-navy"
              style={{ fontSize: "clamp(36px, 5.5vw, 64px)", lineHeight: 1.02 }}
            >
              Tres componentes,{" "}
              <span className="font-serif italic font-medium text-navy">
                una sola máquina
              </span>{" "}
              de captación.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base leading-relaxed text-navy/65 md:text-right">
            Lo que ves abajo es lo que opera, en vivo, para los negocios que ya
            están con nosotros. Datos simulados — la mecánica es real.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          <CardEmbudoEnVivo />
          <CardAsistenteIA />
          <CardRutaCliente />
        </div>
      </div>
    </section>
  );
}
