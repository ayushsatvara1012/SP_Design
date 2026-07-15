"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

const PAIRS = [
  { sketch: "/images/design_sketch.png", real: "/images/design_real.png" },
  { sketch: "/images/design_sketch_1.png", real: "/images/design_real_1.png" },
  { sketch: "/images/design_sketch_2.png", real: "/images/design_real_2.png" },
];

export default function WorkHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'sketch' | 'real'>('sketch');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase === 'sketch') {
      timeout = setTimeout(() => setPhase('real'), 2000);
    } else {
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PAIRS.length);
        setPhase('sketch');
      }, 2500); // 0.5s transition + 2s hold
    }
    return () => clearTimeout(timeout);
  }, [phase]);

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
              priority
              quality={95}
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
                priority
                quality={95}
                sizes="100vw"
                className="object-cover object-center contrast-105 saturate-105"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent z-10 pointer-events-none" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[clamp(0.6875rem,0.65rem+0.15vw,0.8125rem)] font-medium tracking-wider text-paper/80 uppercase mb-4"
        >
          Selected Works • SP Designs
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-display max-w-4xl text-[clamp(2.75rem,1.4rem+6vw,7rem)] font-light leading-[1.02] tracking-tight text-paper"
        >
          Spaces drawn, then made real
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="mt-5 max-w-lg text-[clamp(1.0625rem,1rem+0.5vw,1.3125rem)] text-paper/80"
        >
          Explore a curation of signature residential interiors, commercial visualizations, and photorealistic 3D renders.
        </motion.p>

        <motion.a
          href="#designs"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-[clamp(0.75rem,0.72rem+0.1vw,0.8125rem)] font-medium tracking-wide text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          Explore projects
        </motion.a>
      </div>
    </section>
  );
}
