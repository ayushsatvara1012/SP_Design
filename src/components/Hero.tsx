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

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-4 text-[clamp(0.625rem,0.58rem+0.15vw,0.75rem)] text-paper/80"
        >
          Interior Designing • SP Designs
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display max-w-4xl text-[clamp(2.75rem,1.4rem+6vw,7rem)] font-light leading-[1.02] tracking-tight text-paper"
        >
          Luxury is when it seems flawless
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="mt-5 max-w-lg text-[clamp(1.0625rem,1rem+0.5vw,1.3125rem)] text-paper/80"
        >
          From 2D technical drafting to photorealistic 3D visualization —
          architectural and interior design, end to end.
        </motion.p>

        <motion.a
          href="#services"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-[clamp(0.75rem,0.72rem+0.1vw,0.8125rem)] font-medium tracking-wide text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          View the work
        </motion.a>
      </div>
    </section>
  );
}
