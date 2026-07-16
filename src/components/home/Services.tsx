"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import OrnateDivider from "@/components/common/OrnateDivider";

const MotionLink = motion.create(Link);

type Service = {
  number: string;
  title: string;
  description: string;
  focalPosition: string;
  href: string;
  image: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Exterior Architectural Visualization",
    description:
      "Photorealistic facades — modern and traditional residences, commercial builds like the Hyundai showroom, and institutional spaces like the Swaminarayan hall.",
    focalPosition: "20% 30%",
    href: "/designs#exterior",
    image: "/images/home_Exterior_thumbnail.webp"
  },
  {
    number: "02",
    title: "Interior 3D Visualization",
    description:
      "Immersive interior renders across residential living spaces, office interiors, and healthcare reception areas — every material and light captured before a wall is built.",
    focalPosition: "70% 40%",
    href: "/designs#interior",
    image: "/images/home_Interior_thumbnail.webp"
  },
  {
    number: "03",
    title: "2D Technical Drafting",
    description:
      "Space planning, layout drawings, residential floor plans, and elevations — the precise technical foundation every render is built on.",
    focalPosition: "70% 40%",
    href: "/designs#technical",
    image: "/images/home_2d_thumbnail.webp"
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
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-sm ${reversed ? "md:order-2" : "md:order-1"
          }`}
      >
        <motion.div style={{ y }} className="absolute inset-[-10%]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain object-center"
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
          className="eyebrow inline-block text-ink/70"
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
          className="mt-4 text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/85"
        >
          {service.description}
        </motion.p>

        <MotionLink
          href={service.href}
          scroll={false}
          aria-label={`See ${service.title} work`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          whileHover={{ gap: "0.6rem" }}
          className="eyebrow mt-6 inline-flex items-center gap-2 text-ink transition-colors hover:text-ink/85"
        >
          See more
          <span aria-hidden>→</span>
        </MotionLink>
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
          className="eyebrow text-ink/75"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full flex justify-center mt-8 md:mt-12 mb-4 md:mb-6"
        >
          <OrnateDivider className="w-full max-w-[300px] md:max-w-lg text-ink/30" />
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 md:gap-16 mt-4 md:mt-6">
          {services.map((service, index) => (
            <div key={service.number}>
              {index > 0 && (
                <div className="flex justify-center mb-8 md:mb-16">
                  <OrnateDivider className="w-full max-w-[200px] md:max-w-md text-ink/20" />
                </div>
              )}
              <ServiceRow service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
