"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

type Setup = (ctx: gsap.Context) => void;

export function useGsapContext<T extends HTMLElement>(
  setup: Setup,
  deps: ReadonlyArray<unknown> = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(setup, ref.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
