"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

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
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-[-4%]" style={{ y: scrollYSpring }}>
        <Image
          src="/images/hero.jpg"
          alt="SP Designs — signature interior render"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="scale-[1.18] object-cover object-center contrast-105 saturate-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-24 md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-6 text-paper/80"
        >
          SP Designs — Mansa, Gujarat
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display max-w-4xl text-[var(--font-size-hero)] font-light leading-[1.03] tracking-tight text-paper"
        >
          Spaces, drawn
          <br />
          then rendered real.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="mt-8 max-w-md text-[var(--font-size-body)] text-paper/75"
        >
          From 2D technical drafting to photorealistic 3D visualization —
          architectural and interior design, end to end.
        </motion.p>

        <motion.a
          href="#services"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-[var(--font-size-nav)] font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          View the work
        </motion.a>
      </div>
    </section>
  );
}
