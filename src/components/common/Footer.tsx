"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Designs", href: "/designs" },
  { label: "Quotation", href: "/quotation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const SERVICES_LINKS = [
  { label: "Exterior Architectural Visualization", href: "/#services" },
  { label: "Interior 3D Visualization", href: "/#services" },
  { label: "2D Technical Drafting", href: "/#services" },
];

import SignatureIcon from "./SignatureIcon";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-gradient-to-b from-transparent via-paper via-[15%] to-paper px-6 pb-10 pt-10 md:px-14 md:pb-14 md:pt-16 scroll-mt-24">
      <svg
        viewBox="0 0 20 14"
        className="pointer-events-none absolute bottom-[5%] right-[4%] z-0 aspect-[20/14] w-[min(50vw,400px)] text-ink/[0.08] "
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M10.9749 0.199128C12.519 0.092916 13.8768 0.0398102 15.0482 0.0398102C18.3494 0.0398102 20 1.2015 20 3.52487C20 4.60027 19.7205 5.54289 19.1614 6.35275C18.8685 6.79088 18.4159 7.1427 17.8036 7.40823C17.1913 7.66048 16.4525 7.78661 15.5873 7.78661L8.7262 7.60738L13 14H11L10.9749 0.199128ZM15 0.5C13.9518 0.5 12.8519 0.407065 12 0.5L8.7262 7L11 7H15C16.8769 6.92034 18.4026 6.16688 18.4026 3.5647C18.4026 2.50259 18.0591 2.07089 17.5 1.5C16.9409 0.915837 16.0482 0.5 15 0.5Z"
          fill="currentColor"
        />
        <path
          d="M8.14657 3.266C8.01306 1.88905 6.82871 0.880627 5.16062 0.466576C3.28093 0 2.73549 0.404931 2.13648 0.85633C1.53747 1.30773 1.23796 1.93172 1.23796 2.72831C1.23796 3.69749 1.74379 4.44761 2.75546 4.97866C3.02129 5.44524 3.18891 7.0697 3.18891 7.0697C3.18891 7.0697 5.32455 6.01422 5.87032 6.2532C6.41609 6.49218 6.91526 6.76434 7.36785 7.0697C7.82044 7.37506 8.1865 7.79991 8.46604 8.34424C8.74558 8.8753 8.88535 9.55903 8.88535 10.3954C8.88535 11.2186 8.6524 11.9222 8.1865 12.5064C7.7206 13.0906 7.15487 13.4889 6.4893 13.7013C5.83704 13.9004 5.07164 14 4.19309 14C2.55579 14 1.15809 13.5951 0 12.7852V10.3954C0.168854 11.1351 0.881964 12.5576 1.59507 13.2689C2.18813 13.8603 3.22136 13.8009 3.95348 13.8009C5.0317 13.8009 5.95019 13.5552 6.70894 13.064C7.481 12.5595 7.86703 11.8227 7.86703 10.8535C7.86703 9.79137 7.3612 8.96159 6.34953 8.36415C5.89694 8.09863 5.39777 7.85301 4.852 7.62731C4.31954 7.40161 3.95348 5.44524 3.95348 5.44524C3.95348 5.44524 2.18972 6.39924 1.73714 6.09388C0.725471 5.43006 0.219638 4.48743 0.219638 3.266C0.219638 2.29682 0.545767 1.51351 1.19802 0.916074C1.85028 0.305358 2.82867 0 4.13319 0C5.45101 0 6.78881 0.225699 8.14657 0.677098V3.266Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1400px]">


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-10 border-b border-ink/10 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:items-start"
        >
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <SignatureIcon className="w-full max-w-[120px] text-ink/40" />
            <span className="font-display text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] font-light text-ink">
              SP Designs
            </span>
            <SignatureIcon className="w-full max-w-[120px] text-ink/40 -scale-y-100" />
          </div>

          <nav aria-label="Explore Navigation">
            <span className="font-sans text-[clamp(0.8125rem,0.78rem+0.12vw,0.875rem)] font-medium tracking-wider text-ink/70 uppercase">Explore</span>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-[clamp(0.875rem,0.82rem+0.2vw,1.0625rem)] font-medium tracking-wider text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services Navigation">
            <span className="font-sans text-[clamp(0.8125rem,0.78rem+0.12vw,0.875rem)] font-medium tracking-wider text-ink/70 uppercase ">Services</span>
            <ul className="mt-4 flex flex-col gap-3 max-w-[280px]">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-display text-[clamp(0.875rem,0.82rem+0.2vw,1.0625rem)] font-normal tracking-wide text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact Navigation">
            <span className="font-sans text-[clamp(0.8125rem,0.78rem+0.12vw,0.875rem)] font-medium tracking-wider text-ink/70 uppercase">Contact</span>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-ink shrink-0" aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <a
                  href="mailto:spdesigns28@gmail.com"
                  className="font-display text-[clamp(0.875rem,0.82rem+0.2vw,1.0625rem)] font-medium text-ink block"
                >
                  spdesigns28@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-ink shrink-0" aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a
                  href="tel:+918980775017"
                  className="font-display text-[clamp(0.875rem,0.82rem+0.2vw,1.0625rem)] font-medium text-ink block"
                >
                  +91 89807 75017
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-ink shrink-0 mt-0.5" aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <p className="font-display text-[clamp(0.875rem,0.82rem+0.2vw,1.0625rem)] font-medium text-ink leading-relaxed max-w-[240px]">
                  SP Designs, Kalol Mansa Road, Mansa, Gujarat - India
                </p>
              </div>
            </div>
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center gap-3 text-center text-ink/70 sm:flex-row sm:justify-between sm:text-left"
        >
          <span className="eyebrow">© {new Date().getFullYear()} SP Designs. All rights reserved.</span>
          <a href="https://sapybase.com" target="_blank" rel="noopener noreferrer" className="eyebrow">
            Designed by Sapybase
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
