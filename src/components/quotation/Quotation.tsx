"use client";

import { useRef, useState } from "react";
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
      "Furniture drawings, Electrical and ceiling plans, coordination handed off to keep the build true to the approved design.",
  },
];

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "SP Designs is based in Mansa, Gujarat. We primarily serve clients across Mansa, Gandhinagar, Kalol, and Ahmedabad. However, for 2D drafting and 3D architectural visualization, we work with clients and architectural firms remotely across India."
  },
  {
    question: "What inputs are needed to start a 2D or 3D design project?",
    answer: "To get started, we need the site dimensions, basic requirements (like the number of rooms or specific functions), and any reference images you have for the desired style. If you already have CAD floor plans, we can directly begin 3D modeling and elevation rendering."
  },
  {
    question: "What is the typical turnaround time for a 3D elevation or interior render?",
    answer: "A standard 3D front elevation or a single room's interior photorealistic render typically takes 3 to 5 working days, depending on the complexity of the design and the number of revisions requested."
  },
  {
    question: "Do you provide site supervision or execution services?",
    answer: "Yes, for local projects in and around Mansa and Gandhinagar, we offer on-site execution coordination. We provide detailed furniture drawings, electrical layouts, and ceiling plans to ensure the physical build perfectly matches the approved 3D design."
  }
];

const MotionLink = motion.create(Link);

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-ink/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left hover:text-ink/70 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-display text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] font-light text-ink pr-6">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/70"
        >
          ↓
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 pr-12 text-[clamp(0.9375rem,0.9rem+0.1vw,1rem)] text-ink/80 leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

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
      className="relative border-t border-ink/10 py-8 first:border-t-0 lg:border-t-0 lg:border-l lg:px-8 lg:py-0 lg:first:border-l-0 lg:first:pl-0"
    >
      <span className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-light leading-none text-ink/20">
        {step.number}
      </span>
      <h3 className="font-display mt-4 text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] font-light leading-tight text-ink">
        {step.title}
      </h3>
      <p className="mt-3 max-w-xs text-[clamp(0.9375rem,0.9rem+0.1vw,1rem)] text-ink/85">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function Quotation() {
  return (
    <section id="quotation" className="bg-paper px-6 py-14 md:px-14 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Above the fold: animate in CSS so the LCP text paints without waiting
            for hydration. Everything below stays whileInView on framer-motion. */}
        <p
          className="rise-in eyebrow text-ink/75"
          style={
            {
              "--rise-from": "12px",
              "--rise-duration": "0.7s",
            } as React.CSSProperties
          }
        >
          How To Get A Quote
        </p>
        <h1
          className="rise-in font-display mt-4 max-w-4xl text-[clamp(2.25rem,1.6rem+3.2vw,4.75rem)] font-light leading-tight tracking-tight text-ink"
          style={
            {
              "--rise-from": "16px",
              "--rise-duration": "0.8s",
              "--rise-delay": "0.05s",
            } as React.CSSProperties
          }
        >
          From brief to built
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-4 max-w-xl text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/85"
        >
          Every project moves through the same four stages, from first sketch to final coordination on site.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-0 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-[clamp(2rem,1.8rem+1vw,3rem)] font-light leading-tight text-ink mb-2">
              Frequently asked questions
            </h2>
            <p className="text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/70 mb-8">
              Everything you need to know about the process and working together.
            </p>
          </motion.div>
          <div className="flex flex-col border-t border-ink/10">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-start gap-4 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/85">
            Ready to talk through your space? Reach out and share what you have in mind.
          </p>
          <MotionLink
            href="/#contact"
            whileHover={{ gap: "0.6rem" }}
            className="eyebrow inline-flex items-center gap-2 text-ink transition-colors hover:text-ink/85"
          >
            Get in touch
            <span aria-hidden>→</span>
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}
