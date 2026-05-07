"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  title: string;
};

export function DemoIframe({ url, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-navy/15 bg-cream shadow-[0_24px_64px_-32px_rgba(30,58,95,0.45)]"
    >
      {shouldLoad ? (
        <>
          <iframe
            src={url}
            title={title}
            loading="lazy"
            className="h-full w-full origin-top-left"
            style={{
              pointerEvents: interactive ? "auto" : "none",
            }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
          {!interactive && (
            <button
              type="button"
              onClick={() => setInteractive(true)}
              className="absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent via-transparent to-navy/30 p-4 transition-opacity hover:opacity-95"
              aria-label="Activar interacción con la demo"
            >
              <span className="rounded-button bg-cream px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-navy uppercase shadow-md">
                Click para interactuar
              </span>
            </button>
          )}
        </>
      ) : (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy/5 to-navy/10">
          <div className="font-mono text-[11px] tracking-[0.16em] text-navy/40 uppercase">
            Cargando demo en vivo…
          </div>
        </div>
      )}
    </div>
  );
}
