"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Brief",
    description:
      "Share the space, the site, and the intent — dimensions, references, and how the space should feel and function.",
  },
  {
    number: "02",
    title: "2D Drawing",
    description:
      "Space planning, layouts, and elevations drafted in AutoCAD and Revit — the technical foundation everything else is built on.",
  },
  {
    number: "03",
    title: "3D Render",
    description:
      "The plan modeled and lit in 3ds Max and V-Ray until the render reads as photoreal — every material and surface considered.",
  },
  {
    number: "04",
    title: "Execution",
    description:
      "Furniture drawings, MEP-adjacent detailing, and coordination handed off to keep the build true to the approved design.",
  },
];

const MotionLink = motion.create(Link);

function StepCard({ step, index }: { step: Step; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="relative border-t border-ink/10 py-8 first:border-t-0 md:border-t-0 md:border-l md:px-8 md:py-0"
    >
      <span className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-light leading-none text-ink/20">
        {step.number}
      </span>
      <h3 className="font-display mt-4 text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] font-light leading-tight text-ink">
        {step.title}
      </h3>
      <p className="mt-3 max-w-xs text-[clamp(0.9375rem,0.9rem+0.1vw,1rem)] text-ink/70">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function Quotation() {
  return (
    <section id="quotation" className="bg-paper px-6 py-14 md:px-14 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-ink/60"
        >
          How To Get A Quote
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-display mt-4 max-w-4xl text-[clamp(2.25rem,1.6rem+3.2vw,4.75rem)] font-light leading-tight tracking-tight text-ink"
        >
          From brief to built
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-4 max-w-xl text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/70"
        >
          Every project moves through the same four stages, from first sketch to final coordination on site.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-0">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-start gap-4 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/70">
            Ready to talk through your space? Reach out and share what you have in mind.
          </p>
          <MotionLink
            href="/#contact"
            whileHover={{ gap: "0.6rem" }}
            className="eyebrow inline-flex items-center gap-2 text-ink transition-colors hover:text-ink/70"
          >
            Get in touch
            <span aria-hidden>→</span>
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}
