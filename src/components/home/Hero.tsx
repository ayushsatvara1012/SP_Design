"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-[-4%]" style={{ y: scrollYSpring }}>
        <Image
          src="/images/hero.webp"
          alt="SP Designs — signature interior render"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="scale-[1.18] object-cover object-center contrast-105 saturate-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-14">
        <div className="max-w-4xl">
          <p
            className="rise-in eyebrow mb-4 text-[clamp(0.625rem,0.58rem+0.15vw,0.75rem)] text-paper"
            style={
              {
                "--rise-from": "12px",
                "--rise-duration": "0.8s",
                "--rise-delay": "0.25s",
              } as React.CSSProperties
            }
          >
            Interior Designing • SP Designs
          </p>

          <h1
            className="rise-in font-display text-[clamp(2.75rem,1.4rem+6vw,7rem)] font-light leading-[1.02] tracking-tight"
            style={
              {
                color: "rgba(250, 248, 244, 0.75)",
                WebkitTextStroke: "1px rgba(250, 248, 244, 0.95)",
                textShadow: "0 0 14px rgba(117, 117, 117, 0.45), 0 2px 4px rgba(0, 0, 0, 0.25)",
                "--rise-delay": "0.35s",
              } as React.CSSProperties
            }
          >
            <span
              style={{
                WebkitTextStroke: "1.2px rgb(255 234 206 / 95%)",
                textShadow: "0 0 16px rgba(223, 197, 163, 0.5)",
              }}
              className="shimmer-luxury font-normal"
            >
              Luxury
            </span>{" "}
            is when it seems flawless
          </h1>

          <p
            className="rise-in mt-5 max-w-xl text-[clamp(1.0625rem,1rem+0.5vw,1.3125rem)] text-paper leading-relaxed"
            style={
              {
                "--rise-from": "16px",
                "--rise-duration": "0.8s",
                "--rise-delay": "0.5s",
              } as React.CSSProperties
            }
          >
            From 2D technical drafting to photorealistic 3D visualization —
            architectural and interior design, end to end.
          </p>

          <Link
            href="/designs"
            className="rise-in mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-[clamp(0.75rem,0.72rem+0.1vw,0.8125rem)] font-medium tracking-wide text-paper transition-all hover:bg-paper hover:text-ink hover:scale-[1.02] shadow-sm hover:shadow-md"
            style={
              {
                "--rise-from": "16px",
                "--rise-duration": "0.8s",
                "--rise-delay": "0.65s",
              } as React.CSSProperties
            }
          >
            View the work
          </Link>
        </div>
      </div>
    </section>
  );
}
