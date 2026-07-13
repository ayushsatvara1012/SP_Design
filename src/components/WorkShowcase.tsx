"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WORK_CATEGORIES, type WorkCategory, type WorkProject } from "@/lib/work";
import { getLenis } from "@/components/SmoothScrollProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  // Clear the floating navbar pill; Lenis drives the smooth scroll when active.
  if (lenis) lenis.scrollTo(el, { offset: -110 });
  else {
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function StackImage({
  src,
  alt,
  fit,
  priority,
}: {
  src: string;
  alt: string;
  fit: WorkCategory["fit"];
  priority?: boolean;
}) {
  const contain = fit === "contain";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`group relative aspect-[4/3] w-full overflow-hidden rounded-sm ${
        contain ? "bg-white ring-1 ring-ink/10" : "bg-ink/5"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={
          contain
            ? "object-contain p-3"
            : "object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        }
      />
    </motion.div>
  );
}

function StickyText({ project }: { project: WorkProject }) {
  return (
    <div className="md:sticky md:top-[40vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span className="eyebrow text-ink/70">{project.tag}</span>
        <h3 className="font-display mt-3 text-[clamp(1.75rem,1.4rem+1.8vw,2.75rem)] font-light leading-tight tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-4 text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-ink/85">
          {project.description}
        </p>
      </motion.div>
    </div>
  );
}

function WorkRow({
  project,
  index,
  fit,
  eager,
}: {
  project: WorkProject;
  index: number;
  fit: WorkCategory["fit"];
  eager?: boolean;
}) {
  const reversed = index % 2 === 1;

  // Single-image works have nothing to scroll past - render a plain centered block.
  if (project.images.length === 1) {
    return (
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={reversed ? "md:order-2" : "md:order-1"}
        >
          <StackImage
            src={project.images[0]}
            alt={project.title}
            fit={fit}
            priority={eager}
          />
        </motion.div>
        <div className={reversed ? "md:order-1" : "md:order-2"}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <span className="eyebrow text-ink/70">{project.tag}</span>
            <h3 className="font-display mt-3 text-[clamp(1.75rem,1.4rem+1.8vw,2.75rem)] font-light leading-tight tracking-tight text-ink">
              {project.title}
            </h3>
            <p className="mt-4 text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-ink/85">
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14">
      <div className={reversed ? "md:order-2" : "md:order-1"}>
        <StickyText project={project} />
      </div>

      <div
        className={`flex flex-col gap-5 md:gap-6 ${
          reversed ? "md:order-1" : "md:order-2"
        }`}
      >
        {project.images.map((src, i) => (
          <StackImage
            key={src}
            src={src}
            alt={`${project.title} - view ${i + 1}`}
            fit={fit}
            priority={eager && i === 0}
          />
        ))}
      </div>
    </div>
  );
}

function CategorySection({
  category,
  categoryIndex,
}: {
  category: WorkCategory;
  categoryIndex: number;
}) {
  return (
    <section
      id={category.id}
      className="scroll-mt-28 border-t border-ink/10 py-14 first:border-t-0 md:py-20"
    >
      <div className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow text-ink/75"
        >
          {category.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="font-display mt-4 text-[clamp(2rem,1.5rem+2.4vw,3.75rem)] font-light leading-tight tracking-tight text-ink"
        >
          {category.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-5 text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-ink/85"
        >
          {category.intro}
        </motion.p>
      </div>

      <div className="mt-10 space-y-16 md:mt-14 md:space-y-24">
        {category.projects.map((project, index) => (
          <WorkRow
            key={project.title}
            project={project}
            index={index}
            fit={category.fit}
            eager={categoryIndex === 0 && index === 0}
          />
        ))}
      </div>
    </section>
  );
}

export default function WorkShowcase() {
  useEffect(() => {
    if (!window.location.hash) return;
    // Wait a frame so sections have laid out before Lenis measures the target.
    const raf = requestAnimationFrame(() => scrollToHash(window.location.hash));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="designs" className="bg-paper px-6 md:px-14">
      <div className="mx-auto max-w-6xl">
        {WORK_CATEGORIES.map((category, i) => (
          <CategorySection
            key={category.id}
            category={category}
            categoryIndex={i}
          />
        ))}
      </div>
    </section>
  );
}
