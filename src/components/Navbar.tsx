"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Designs", href: "#designs" },
  { label: "Quotation", href: "#quotation" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY < 24) {
          setCollapsed(false);
        } else if (delta > 4) {
          setCollapsed(true);
        } else if (delta < -4) {
          setCollapsed(false);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-5 z-50 flex px-4 transition-[justify-content] duration-500 ${
        collapsed ? "justify-start pl-5" : "justify-center"
      }`}
    >
      <motion.nav
        layout
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`nav-pill relative flex items-center gap-6 overflow-hidden rounded-full [text-shadow:0_1px_10px_rgba(10,15,30,0.35)] ${
          collapsed
            ? "h-14 w-14 justify-center gap-0 px-0 py-0"
            : "w-full max-w-3xl justify-between px-6 py-3 md:px-8"
        }`}
      >
        <a
          href="#hero"
          className={`relative z-10 flex shrink-0 items-center gap-2.5 ${
            collapsed ? "p-2.5" : ""
          }`}
        >
          <Image src="/logo.svg" alt="" width={40} height={40} style={{ height: "auto" }} />
        </a>

        {!collapsed && (
          <>
            <ul className="relative z-10 hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-[var(--font-size-nav)] font-medium text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation menu"
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full md:hidden"
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-white transition-transform ${
                    open ? "translate-y-[6.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-white transition-transform ${
                    open ? "-translate-y-[6.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </>
        )}
      </motion.nav>

      {open && !collapsed && (
        <div className="nav-pill absolute top-[calc(100%+0.5rem)] w-[calc(100%-2rem)] max-w-3xl rounded-3xl px-6 py-5 [text-shadow:0_1px_10px_rgba(10,15,30,0.35)] md:hidden">
          <ul className="relative z-10 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-[var(--font-size-nav)] font-medium text-white/90"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
