"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const PAIRS = [
  { sketch: "/images/design_sketch.webp", real: "/images/design_real.webp" },
  { sketch: "/images/design_sketch_1.webp", real: "/images/design_real_1.webp" },
  { sketch: "/images/design_sketch_2.webp", real: "/images/design_real_2.webp" },
];

export default function WorkHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'sketch' | 'real'>('sketch');
  const [inView, setInView] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // The sketch/render cycle is decorative and endless, so don't run it while the
  // hero is scrolled out of view or when the visitor has asked for less motion.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;
    if (phase === 'sketch') {
      timeout = setTimeout(() => setPhase('real'), 2000);
    } else {
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PAIRS.length);
        setPhase('sketch');
      }, 2500); // 0.5s transition + 2s hold
    }
    return () => clearTimeout(timeout);
  }, [phase, inView, prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scrollYSpring = useSpring(scrollY, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-[-4%]" style={{ y: scrollYSpring }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            {/* Sketch Image */}
            <Image
              src={PAIRS[currentIndex].sketch}
              alt="SP Designs Portfolio Work Sketch"
              fill
              priority={currentIndex === 0}
              quality={85}
              sizes="100vw"
              className="object-cover object-center contrast-105 saturate-105"
            />
            
            {/* Real Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'real' ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={PAIRS[currentIndex].real}
                alt="SP Designs Portfolio Work Real"
                fill
                priority={currentIndex === 0}
                quality={85}
                sizes="100vw"
                className="object-cover object-center contrast-105 saturate-105"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent z-10 pointer-events-none" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-14">
        <p
          className="rise-in font-sans text-[clamp(0.6875rem,0.65rem+0.15vw,0.8125rem)] font-medium tracking-wider text-paper uppercase mb-4"
          style={
            {
              "--rise-from": "12px",
              "--rise-duration": "0.8s",
            } as React.CSSProperties
          }
        >
          Selected Works • SP Designs
        </p>

        <h1
          className="rise-in font-display max-w-4xl text-[clamp(2.75rem,1.4rem+6vw,7rem)] font-light leading-[1.02] tracking-tight"
          style={{ "--rise-delay": "0.1s" } as React.CSSProperties}
        >
          <span
            style={{
              color: "rgba(250, 248, 244, 0.85)",
              WebkitTextStroke: "1px rgba(250, 248, 244, 0.95)",
              textShadow: "0 0 14px rgba(0,0,0, 0.45), 0 2px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            Space drawn then{" "}
          </span>
          <span
            className="metal-3d-effect font-normal"
            data-shine-text="made real"
            style={
              {
                // Reuses the section's existing IntersectionObserver, so the
                // sweep stops repainting once the hero scrolls out of view
                // rather than looping forever off-screen.
                "--shimmer-play": inView ? "running" : "paused",
              } as React.CSSProperties
            }
          >
            made real
          </span>
        </h1>

        <p
          className="rise-in mt-5 max-w-lg text-[clamp(1.0625rem,1rem+0.5vw,1.3125rem)] text-paper"
          style={
            {
              "--rise-from": "16px",
              "--rise-duration": "0.8s",
              "--rise-delay": "0.35s",
            } as React.CSSProperties
          }
        >
          Explore a curation of signature residential interiors, commercial visualizations, and photorealistic 3D renders.
        </p>

        <a
          href="#designs"
          className="rise-in mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-[clamp(0.75rem,0.72rem+0.1vw,0.8125rem)] font-medium tracking-wide text-paper transition-colors hover:bg-paper hover:text-ink"
          style={
            {
              "--rise-from": "16px",
              "--rise-duration": "0.8s",
              "--rise-delay": "0.5s",
            } as React.CSSProperties
          }
        >
          Explore projects
        </a>
      </div>
    </section>
  );
}
