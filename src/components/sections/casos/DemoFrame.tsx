"use client";

import { useEffect, useState } from "react";
import { DemoIframe } from "./DemoIframe";
import { ExternalLink } from "lucide-react";

type Props = {
  url: string;
  title: string;
};

export function DemoFrame({ url, title }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isDesktop) {
    return (
      <div className="space-y-3">
        <DemoIframe url={url} title={title} />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-navy/60 uppercase transition-colors hover:text-operation"
        >
          Abrir en pestaña nueva <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-navy/15 bg-gradient-to-br from-navy/5 to-navy/15 shadow-[0_16px_48px_-24px_rgba(30,58,95,0.35)]">
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] tracking-[0.16em] text-navy/45 uppercase">
          {title}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/15 to-transparent" />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] text-operation uppercase"
      >
        Ver demo en vivo <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
