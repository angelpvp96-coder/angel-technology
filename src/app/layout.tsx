import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NoiseOverlay } from "@/components/layout/NoiseOverlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a5f",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://angeltechnology.co"),
  title:
    "Angel Technology — Sistemas de captación para negocios locales en Colombia",
  description:
    "Construimos sistemas de captación para negocios locales: web propia, Google Business y WhatsApp Business que producen citas agendadas, no visitas.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Angel Technology",
    description:
      "Sistemas de captación digital para negocios locales en Colombia. Web + Google Business + WhatsApp que producen citas, no visitas.",
    url: "https://angeltechnology.co",
    siteName: "Angel Technology",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Technology",
    description:
      "Sistemas de captación digital para negocios locales en Colombia.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Angel Technology",
              url: "https://angeltechnology.co",
              telephone: "+573228283919",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Florencia",
                addressRegion: "Caquetá",
                addressCountry: "CO",
              },
              areaServed: "CO",
              description:
                "Sistemas de captación digital para negocios locales en Colombia.",
            }),
          }}
        />
      </head>
      <body className="bg-cream text-navy">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-navy focus:px-4 focus:py-2 focus:text-cream"
        >
          Saltar al contenido
        </a>
        <NoiseOverlay />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
