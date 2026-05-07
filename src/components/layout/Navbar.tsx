"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-4 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ease-out",
          "w-[calc(100%-1.5rem)] max-w-[1100px]",
        ].join(" ")}
        data-scrolled={scrolled}
      >
        <nav
          className={[
            "flex items-center justify-between rounded-[1.25rem] border px-4 py-3 backdrop-blur-[12px] transition-all duration-300 ease-out md:px-5",
            scrolled
              ? "border-navy/15 bg-cream/80 text-navy shadow-[0_8px_32px_-12px_rgba(30,58,95,0.18)]"
              : "border-cream/15 bg-carbon/30 text-cream",
          ].join(" ")}
          aria-label="Navegación principal"
        >
          <a
            href="#top"
            className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-operation focus-visible:outline-offset-3"
          >
            <Logo
              variant={scrolled ? "dark" : "light"}
              className="h-5 w-auto md:h-6"
            />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={[
                    "rounded-[0.75rem] px-3 py-2 text-[13px] font-medium transition-colors",
                    scrolled
                      ? "hover:bg-navy/5"
                      : "hover:bg-cream/10",
                  ].join(" ")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <WhatsAppButton source="navbar" variant="primary" size="sm" magnetic>
              WhatsApp →
            </WhatsAppButton>
          </div>

          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={[
          "fixed inset-0 z-50 flex flex-col bg-carbon text-cream transition-opacity duration-300 md:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Logo variant="light" className="h-6 w-auto" />
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="w-full">
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-[40px] font-medium tracking-tight text-cream"
              >
                <span className="mr-3 font-mono text-xs text-system">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-8 pt-6 pb-12">
          <WhatsAppButton
            source="mobile_menu"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Hablemos por WhatsApp →
          </WhatsAppButton>
        </div>
      </div>
    </>
  );
}
