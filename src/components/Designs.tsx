"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Category = "Exterior" | "Interior" | "Technical";

type Project = {
  title: string;
  category: Category;
  tag: string;
  focalPosition: string;
};

const projects: Project[] = [
  {
    title: "Hyundai Showroom Facade",
    category: "Exterior",
    tag: "Commercial",
    focalPosition: "30% 25%",
  },
  {
    title: "Swaminarayan Hall",
    category: "Exterior",
    tag: "Institutional",
    focalPosition: "60% 35%",
  },
  {
    title: "Modern Residence Facade",
    category: "Exterior",
    tag: "Residential",
    focalPosition: "45% 55%",
  },
  {
    title: "Living Room Interior",
    category: "Interior",
    tag: "Residential",
    focalPosition: "25% 45%",
  },
  {
    title: "Office Interior",
    category: "Interior",
    tag: "Commercial",
    focalPosition: "70% 30%",
  },
  {
    title: "Healthcare Reception",
    category: "Interior",
    tag: "Institutional",
    focalPosition: "50% 60%",
  },
  {
    title: "Residential Floor Plan",
    category: "Technical",
    tag: "2D Drafting",
    focalPosition: "35% 20%",
  },
  {
    title: "Kitchen Joinery Drawing",
    category: "Technical",
    tag: "Furniture Documentation",
    focalPosition: "55% 65%",
  },
];

const categories: ("All" | Category)[] = ["All", "Exterior", "Interior", "Technical"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      className="group relative aspect-[4/5] overflow-hidden rounded-sm"
    >
      <motion.div style={{ y }} className="absolute inset-[-8%]">
        <Image
          src="/images/hero.jpg"
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          style={{ objectPosition: project.focalPosition }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 transition-opacity duration-500 group-hover:from-ink/80" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="eyebrow text-paper/70">{project.tag}</span>
        <h3 className="font-display mt-1 text-[clamp(1.1rem,1rem+0.6vw,1.5rem)] font-light leading-tight text-paper">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function Designs() {
  const [active, setActive] = useState<"All" | Category>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="designs" className="bg-paper px-6 py-14 md:px-14 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-ink/60"
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-display mt-4 max-w-3xl text-[clamp(2.25rem,1.6rem+3.2vw,4.75rem)] font-light leading-tight tracking-tight text-ink"
        >
          Spaces drawn, then made real
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`eyebrow rounded-full border px-4 py-2 transition-colors ${
                active === category
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filtered.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
