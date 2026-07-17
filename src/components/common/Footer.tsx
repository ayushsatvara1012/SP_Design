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
        viewBox="0 0 24 39"
        className="pointer-events-none absolute bottom-[5%] right-[4%] z-0 aspect-[24/39] w-[min(30vw,200px)] text-ink/[0.08] "
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M20.3034 17.8108C21.3163 15.0846 21.4143 12.4357 19.9835 9.896C19.1344 8.38869 17.7198 7.6152 16.0599 7.37218C14.2013 7.10006 12.386 7.55458 10.5676 7.86727C10.5409 7.87187 10.5676 7.86727 10.4892 7.88674C9.88574 8.31158 9.82158 8.75816 9.88574 9.50383C9.92102 9.91385 9.8003 10.6406 10.2122 10.7055C10.7992 10.7981 11.7628 10.9873 12.4149 11.0406C12.7659 10.9997 13.1029 11.0764 13.1142 11.5229C13.1449 12.731 13.1538 13.9399 13.1578 15.1485C13.1581 15.2311 13.046 15.3141 12.814 15.6352C12.4343 14.034 11.9467 12.6642 10.3166 12.2826C10.0235 12.4739 10.1286 12.7774 10.1279 13.0314C10.1198 15.7824 10.1345 18.5336 10.1146 21.2844C10.1108 21.8061 10.2781 22.155 10.6899 22.4655C11.9548 23.4191 13.2174 24.3905 14.2512 25.6029C17.6051 29.5364 17.1528 36.1744 11.3968 38.3226C8.36859 39.4528 5.30479 39.2248 2.62127 37.2138C-0.77729 34.667 -0.75729 29.2472 2.02311 26.3588C2.17452 26.2015 2.35195 25.997 2.57839 26.172C2.85838 26.3883 2.64302 26.6177 2.51183 26.8163C1.61449 28.1744 1.1387 29.657 1.09034 31.3003C1.00591 34.1688 2.72537 36.1758 5.14279 37.0634C7.3211 37.8631 9.44642 37.5346 11.337 36.1552C14.0647 34.1651 14.5304 30.2649 12.405 27.6067C11.7917 26.8398 11.1007 26.1609 10.1247 25.5279C10.1507 27.2749 9.98046 28.8895 10.2161 30.4829C10.3831 31.6123 11.1674 32.2135 12.2924 32.3715C12.5425 32.4067 12.8602 32.3279 12.9929 32.914C10.2282 32.9822 7.51579 32.9791 4.72819 32.9016C4.87131 32.3419 5.21062 32.4104 5.48142 32.3699C6.71793 32.1847 7.54893 31.2744 7.56043 30.0197C7.57859 28.0391 7.55539 26.0582 7.57225 24.0776C7.57666 23.5589 7.39072 23.1966 6.98351 22.8896C6.19893 22.2981 5.44913 21.6595 4.6671 21.0644C2.75676 19.6106 2.33383 17.6022 2.73585 15.3915C3.14122 13.1624 4.44635 11.5657 6.65282 10.9873C7.60284 10.7382 7.63819 10.2191 7.54689 9.50383C7.41899 8.5019 6.72562 7.90025 5.71903 7.84376C5.41198 7.82652 5.23384 7.84376 4.82578 7.81628C4.85965 7.41999 4.55651 6.35503 4.80522 6.33039C7.66873 6.04665 11.0283 6.16529 13.9177 6.00019C16.7412 6.00019 19.4359 5.94015 21.6551 7.97196C23.8716 10.0012 24.1824 12.6666 23.923 15.4724C23.8027 16.7747 23.3714 17.989 22.6657 19.0958C20.7589 22.0864 16.5859 23.1183 13.5137 21.3727C12.4564 20.7719 11.9342 19.8232 11.6855 18.6765C11.6393 18.4636 11.6027 18.2323 12.0011 18.0433C12.9471 20.3432 14.7946 20.9797 17.0606 20.5391C18.5671 20.2462 19.629 19.2798 20.3034 17.8108ZM6.31787 12.6636C4.98333 13.6741 4.52156 15.0718 4.80522 16.6601C5.07432 18.1668 6.17848 19.0324 7.47671 19.7352C7.47671 17.1634 7.47671 14.693 7.47671 12.2207C7.01297 12.2164 6.71356 12.4033 6.31787 12.6636Z"
          fill="currentColor"
        />
        <path
          d="M13.6598 0.0109444C14.6144 -0.0618059 15.3566 0.221727 15.766 1.05407C16.0862 1.705 16.0882 2.40222 15.7073 3.04658C15.2211 3.86918 14.212 4.19604 13.2182 3.88286C12.4627 3.64477 11.977 2.84021 12.0008 1.86621C12.0259 0.84094 12.5079 0.284435 13.6598 0.0109444Z"
          fill="currentColor"
        />
        <path
          d="M3.00694 24.3217C3.1281 23.3471 3.62653 22.8453 4.23823 23.0423C4.81948 23.2295 5.07717 23.8605 4.97994 24.8587C4.91014 25.5753 4.47355 26.048 3.92951 25.9961C3.28504 25.9346 2.94636 25.3849 3.00694 24.3217Z"
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

              <div className="flex items-center gap-3">
                <span className="text-ink shrink-0" aria-hidden>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </span>
                <a
                  href="https://www.instagram.com/sp_designs28?utm_source=qr&igsh=MWUwdTJobTh6eTZpeA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[clamp(0.875rem,0.82rem+0.2vw,1.0625rem)] font-medium text-ink block transition-colors hover:text-ink/70"
                >
                  sp_designs28
                </a>
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
