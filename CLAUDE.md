# Angel Technology — Landing

Landing operativa cinematográfica para Angel Technology (Florencia, Caquetá, CO). Sistema de captación digital para negocios locales en Colombia.

## Commands
- `pnpm dev` — Dev server (localhost:3000)
- `pnpm build` — Build de producción
- `pnpm start` — Servir build localmente
- `pnpm lint` — ESLint

## Tech Stack
Next.js 16 (App Router) + TypeScript strict + Tailwind v4 + GSAP 3 + ScrollTrigger + Resend + Vercel Analytics. Deploy en Vercel.

## Architecture
- `src/app/` — App Router. `page.tsx` compone secciones, `layout.tsx` carga fonts y noise overlay, `actions/` contiene Server Actions
- `src/components/layout/` — Navbar, Footer, NoiseOverlay, Logo
- `src/components/sections/` — Una carpeta por sección grande (sistema/, filosofia/, casos/, paquetes/, hero/), un wrapper `<Section>.tsx` y los sub-bloques dentro
- `src/components/ui/` — Primitivos: Button, WhatsAppButton, LiveDot, TerminalCursor, Sparkline
- `src/components/forms/` — CotizacionForm
- `src/lib/` — Constantes, helpers (whatsapp), schemas Zod, helpers de animación GSAP, data
- `src/types/` — Tipos compartidos

## Reglas No Negociables
1. Cumplir restricciones anti-genericidad: si el resultado podría estar en un template Wix/Hostinger/Webflow, está mal.
2. Verde señal `#2D7D6E` SOLO en indicadores "EN VIVO" pulsantes.
3. Naranja operación `#E2632F` SOLO en CTAs primarios + cursor terminal + flechas + eyebrows.
4. Split-words: palabras IN-LINE con `display: inline-block`, NUNCA apiladas vertical.
5. `prefers-reduced-motion: reduce` debe degradar TODA animación GSAP.
6. TypeScript strict. Sin `any`.
7. Mobile-first.
8. Iframes de Casos NUNCA cargan en mobile — screenshot/placeholder + link a demo.

## Environment Variables
| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | API key de Resend para envío de cotizaciones |
| `CONTACT_EMAIL` | Email destino para cotizaciones recibidas |
