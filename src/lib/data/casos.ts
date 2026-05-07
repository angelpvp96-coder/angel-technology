import type { Caso } from "@/types";

export const CASOS: Caso[] = [
  {
    id: "raizal",
    vertical: "FOOD & RESTAURANTE",
    nombre: "Raizal",
    subtitulo: "Cocina del río, presencia digital con identidad",
    descripcion: [
      "Restaurante de cocina amazónica que necesitaba una presencia que reflejara la densidad de su producto sin caer en el template estándar de food.",
      "Construimos un sitio editorial con menú dinámico, integración a reservas por WhatsApp y SEO local enfocado en visitantes de paso por Florencia.",
    ],
    demoUrl: "https://alambique.lovable.app/",
    screenshotPath: "/images/demos/raizal-screenshot.webp",
    metric: { label: "RESERVAS · primer mes", value: "+38%" },
  },
  {
    id: "imetol",
    vertical: "SOFTWARE INDUSTRIAL",
    nombre: "IMETOL",
    subtitulo: "Plataforma técnica para una operación industrial seria",
    descripcion: [
      "Empresa de ingeniería industrial que requería una plataforma para presentar capacidades técnicas a clientes B2B y consolidar leads calificados.",
      "Construimos un sitio modular con secciones por capacidad técnica, casos de obra y un portal de cotización estructurado por tipo de proyecto.",
    ],
    demoUrl: "https://imetol-construct-forge.vercel.app/",
    screenshotPath: "/images/demos/imetol-screenshot.webp",
    metric: { label: "LEADS B2B calificados", value: "+62%" },
  },
];
