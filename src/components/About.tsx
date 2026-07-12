"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const credentials = [
  {
    period: "2019 — 2023",
    title: "B.E. Civil Engineering",
    place: "Nirma University",
  },
  {
    period: "Internship",
    title: "ISRO",
    place: "Space Applications Centre",
  },
];

const tools = [
  "AutoCAD",
  "Revit",
  "3ds Max",
  "V-Ray",
  "QGIS",
  "MS Office",
];

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" className="bg-paper px-6 py-14 md:px-14 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-ink/60"
        >
          About
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-display mt-4 max-w-3xl text-[clamp(2.25rem,1.6rem+3.2vw,4.75rem)] font-light leading-tight tracking-tight text-ink"
        >
          Shalini Prajapati
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:order-1"
          >
            <motion.div style={{ y }} className="absolute inset-[-10%]">
              <Image
                src="/images/hero.jpg"
                alt="Shalini Prajapati"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 30%" }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-ink/10" />
          </motion.div>

          <div className="md:order-2">
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/70"
            >
              Founder of SP Designs and a Civil Engineer turned architectural designer and 3D
              visualizer, based in Mansa, Gujarat. Shalini takes a space end-to-end — from
              technical 2D drafting through photorealistic 3D rendering to on-site execution
              coordination — bringing an engineer&rsquo;s precision to every render.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mt-5 text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] text-ink/70"
            >
              Also working as Designer &amp; 3D Visualizer at Mark Point, specializing in modern
              residential and luxury interiors alongside exterior architectural visualization.
            </motion.p>

            <div className="mt-10 divide-y divide-ink/10 border-t border-ink/10">
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1 + index * 0.08,
                  }}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-display text-[clamp(1.125rem,1rem+0.4vw,1.375rem)] font-light text-ink">
                    {credential.title}
                  </span>
                  <span className="eyebrow text-ink/50">
                    {credential.place} · {credential.period}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="mt-10"
            >
              <span className="eyebrow text-ink/50">Tools</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="eyebrow rounded-full border border-ink/20 px-4 py-2 text-ink/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
