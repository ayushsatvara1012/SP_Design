"use client";

import { motion } from "framer-motion";

const details = [
  {
    label: "Email",
    value: "spdesigns28@gmail.com",
    href: "mailto:spdesigns28@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 89807 75017",
    href: "tel:+918980775017",
  },
  {
    label: "Location",
    value: "SJ Farm House, behind SJ Traders, Kalol-Mansa Road, Mansa, Gujarat",
    href: undefined,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-paper px-6 py-14 md:px-14 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-ink/60"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="font-display mt-4 max-w-4xl text-[clamp(2.25rem,1.6rem+3.2vw,4.75rem)] font-light leading-tight tracking-tight text-ink"
        >
          Let&rsquo;s bring your space to life
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 md:grid-cols-3 md:gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            >
              <span className="eyebrow text-ink/50">{detail.label}</span>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="font-display mt-3 block text-[clamp(1.25rem,1.1rem+0.6vw,1.75rem)] font-light leading-snug text-ink transition-colors hover:text-ink/70"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="font-display mt-3 max-w-sm text-[clamp(1.25rem,1.1rem+0.6vw,1.75rem)] font-light leading-snug text-ink">
                  {detail.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Vaayu Intelligence chatbot mount point — lead capture handled there, not in this build. See plan section 13. */}
        <div id="chatbot-mount" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-ink/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="eyebrow">SP Designs</span>
          <span className="eyebrow">© {new Date().getFullYear()} All rights reserved</span>
        </motion.div>
      </div>
    </section>
  );
}
