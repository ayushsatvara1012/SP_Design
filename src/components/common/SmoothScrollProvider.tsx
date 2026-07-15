"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenisInstance = lenis;
    const syncGsap = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    // Whenever ScrollTrigger recomputes positions, Lenis must recompute its scroll
    // limit against the same layout - otherwise the two disagree and scroll clamps.
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    gsap.ticker.add(syncGsap);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(syncGsap);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // The root layout (and its Lenis instance) persists across client-side navigation,
  // so document height changes between routes without a fresh measurement. Force
  // both Lenis and ScrollTrigger to remeasure once the new route has painted.
  useEffect(() => {
    if (!lenisInstance) return;
    const raf = requestAnimationFrame(() => {
      lenisInstance?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
