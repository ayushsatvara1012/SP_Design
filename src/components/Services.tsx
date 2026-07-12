"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Service = {
  number: string;
  title: string;
  description: string;
  focalPosition: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Exterior Architectural Visualization",
    description:
      "Photorealistic facades — modern and traditional residences, commercial builds like the Hyundai showroom, and institutional spaces like the Swaminarayan hall.",
    focalPosition: "20% 30%",
  },
  {
    number: "02",
    title: "Interior 3D Visualization",
    description:
      "Immersive interior renders across residential living spaces, office interiors, and healthcare reception areas — every material and light captured before a wall is built.",
    focalPosition: "70% 40%",
  },
  {
    number: "03",
    title: "2D Technical Drafting",
    description:
      "Space planning, layout drawings, residential floor plans, and elevations — the precise technical foundation every render is built on.",
    focalPosition: "40% 70%",
  },
  {
    number: "04",
    title: "MEP-Adjacent Detailing",
    description:
      "Electrical layouts and ceiling layouts that support the drafting work, keeping execution teams aligned with the design intent.",
    focalPosition: "60% 20%",
  },
  {
    number: "05",
    title: "Furniture Design Documentation",
    description:
      "2D furniture drawings derived directly from 3D renders — kitchens, TV units, and joinery — bridging visualization back to fabrication.",
    focalPosition: "30% 55%",
  },
];

const titleContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.1 },
  },
};

const titleWord = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const reversed = index % 2 === 1;
  const words = service.title.split(" ");

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 items-center gap-6 py-8 md:grid-cols-2 md:gap-16 md:py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-sm ${
          reversed ? "md:order-2" : "md:order-1"
        }`}
      >
        <motion.div style={{ y }} className="absolute inset-[-10%]">
          <Image
            src="/images/hero.jpg"
            alt={service.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: service.focalPosition }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`max-w-md ${reversed ? "md:order-1 md:ml-auto md:pl-2" : "md:order-2"}`}
      >
        <motion.span
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow inline-block text-ink/50"
        >
          {service.number}
        </motion.span>

        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={titleContainer}
          className="font-display mt-4 text-[clamp(1.75rem,1.4rem+1.8vw,2.75rem)] font-light leading-tight tracking-tight text-ink"
        >
          {words.map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden">
              <motion.span variants={titleWord} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-4 text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/70"
        >
          {service.description}
        </motion.p>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          whileHover={{ gap: "0.6rem" }}
          className="eyebrow mt-6 inline-flex items-center gap-2 text-ink transition-colors hover:text-ink/70"
        >
          See more
          <span aria-hidden>→</span>
        </motion.a>
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-paper px-6 py-14 md:px-14 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-ink/60"
        >
          What I Do
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-display mt-4 max-w-4xl text-[clamp(2.25rem,1.6rem+3.2vw,4.75rem)] font-light leading-tight tracking-tight text-ink"
        >
          From technical drawing to rendered space
        </motion.h2>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="divide-y divide-ink/10">
          {services.map((service, index) => (
            <ServiceRow key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
