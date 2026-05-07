export type PaqueteId = "pro" | "elite" | "personalizado";

export interface Paquete {
  id: PaqueteId;
  eyebrow: string;
  nombre: string;
  precio: string | null;
  precioLabel: string | null;
  subprecio: string;
  features: string[];
  garantia: string;
  ctaLabel: string;
  ctaType: "whatsapp" | "form";
  destacado: boolean;
}

export type CasoId = "raizal" | "imetol";

export interface Caso {
  id: CasoId;
  vertical: string;
  nombre: string;
  subtitulo: string;
  descripcion: string[];
  demoUrl: string;
  fakeUrl: string;
  screenshotPath: string;
  metric?: { label: string; value: string };
}
