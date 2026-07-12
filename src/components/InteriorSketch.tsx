"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTERIOR_SKETCH_PATHS } from "./interiorSketchPaths";

export default function InteriorSketch() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const renderRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = pathRefs.current.filter(Boolean);
    if (!els.length) return;

    const lengths = els.map((el) => el.getTotalLength());
    // Hide every stroke by pushing its dash offset a full length ahead.
    els.forEach((el, i) => {
      gsap.set(el, { strokeDasharray: lengths[i], strokeDashoffset: lengths[i] });
    });
    // Draw order: longest strokes first (walls, floor, big furniture gestures),
    // shortest last (fine detail ticks) so it reads like a hand roughing a sketch.
    const order = els.map((_, i) => i).sort((a, b) => lengths[b] - lengths[a]);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      els.forEach((el) => gsap.set(el, { strokeDashoffset: 0 }));
      gsap.set(renderRef.current, { opacity: 1 });
      gsap.set(captionRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const N = order.length;
    const DRAW = 8; // timeline seconds spent drawing the sketch
    const OVERLAP = 24; // ~how many strokes are actively drawing at once
    const step = DRAW / (N + OVERLAP);
    const strokeDur = step * OVERLAP;
    const FADE = 2.6; // seconds the render takes to resolve over the finished sketch

    const buildDraw = (tl: gsap.core.Timeline) => {
      order.forEach((idx, rank) => {
        tl.to(
          els[idx],
          { strokeDashoffset: 0, duration: strokeDur, ease: "none" },
          rank * step
        );
      });
      // Once the drawing is essentially complete, the real render resolves on top,
      // registered to the same frame so the sketch "becomes" the built space.
      tl.fromTo(
        renderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: FADE, ease: "power2.inOut" },
        DRAW * 0.85
      );
      tl.fromTo(
        captionRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        DRAW * 0.9
      );
    };

    const ctx = gsap.context(() => {
      gsap.set(renderRef.current, { opacity: 0 });
      gsap.set(captionRef.current, { opacity: 0, y: 16 });
      const mm = gsap.matchMedia();

      // Desktop: stage is CSS-sticky (full-screen when it reaches the top). Scrub the
      // draw + render fade. Start at "top 70%" so the first strokes appear while the
      // section is still entering - the user never lands on a blank full-screen frame.
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
        buildDraw(tl);
      });

      // Mobile: no sticky/scrub (perf/jank policy) - play the sequence once on scroll-in.
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
        buildDraw(tl);
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={wrapperRef}
      className="relative bg-paper md:h-[300vh]"
    >
      <div
        ref={stageRef}
        className="relative aspect-[2816/1536] w-full overflow-hidden bg-paper md:sticky md:top-0 md:aspect-auto md:h-screen"
      >
        <svg
          viewBox="0 0 2816 1536"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          {INTERIOR_SKETCH_PATHS.map((p, i) => (
            <path
              key={i}
              ref={(el) => {
                if (el) pathRefs.current[i] = el;
              }}
              d={p.d}
              stroke="#2e2a25"
              strokeWidth={p.w}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>

        <div ref={renderRef} className="absolute inset-0 opacity-0">
          <Image
            src="/images/Interior_sketch.png"
            alt="The living-room interior rendered as a finished, photorealistic space"
            fill
            quality={92}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="absolute left-1/2 top-8 flex -translate-x-1/2 flex-col items-center gap-2 px-6 text-center md:top-12">
          <span className="eyebrow text-ink/50">The Process</span>
          <span ref={captionRef} className="eyebrow text-ink/70 opacity-0">
            From a single line to a living space
          </span>
        </div>
      </div>
    </section>
  );
}
