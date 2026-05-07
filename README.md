# Angel Technology — Landing

Sitio operativo cinematográfico para [Angel Technology](https://angeltechnology.co), estudio de operaciones digitales en Florencia, Caquetá. Web + Google Business + WhatsApp Business como una sola máquina de captación para negocios locales.

## Stack
Next.js 16 (App Router) · TypeScript strict · Tailwind v4 · GSAP 3 + ScrollTrigger · Resend (email) · Vercel Analytics. Deploy en Vercel.

## Setup local

```bash
pnpm install
cp .env.example .env.local
# Editar .env.local con valores reales
pnpm dev
# → http://localhost:3000
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | API key de Resend para enviar cotizaciones |
| `CONTACT_EMAIL` | Email destino del formulario |

## Comandos

| Comando | Acción |
|---|---|
| `pnpm dev` | Dev server en `localhost:3000` |
| `pnpm build` | Build de producción |
| `pnpm start` | Servir build |
| `pnpm lint` | ESLint |

## Estructura

```
src/
├── app/                          # App Router + Server Actions
│   ├── actions/submit-quote.ts   # Resend
│   ├── layout.tsx · page.tsx
│   ├── opengraph-image.tsx
│   ├── sitemap.ts · robots.ts
│   └── globals.css               # Tokens + keyframes
├── components/
│   ├── layout/                   # Navbar, Footer, NoiseOverlay, Logo
│   ├── sections/                 # Hero, Sistema, Filosofia, Casos, Paquetes
│   ├── ui/                       # Button, LiveDot, TerminalCursor, Sparkline...
│   └── forms/CotizacionForm.tsx
├── lib/
│   ├── constants.ts · whatsapp.ts
│   ├── animations/               # split-words, prefersReducedMotion
│   ├── data/                     # paquetes.ts, casos.ts
│   └── schemas/cotizacion.ts     # zod
└── types/index.ts
```

## Deploy

Conectar el repo a Vercel, configurar `RESEND_API_KEY` y `CONTACT_EMAIL` como env vars, apuntar dominio `angeltechnology.co` (registro A → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`).
