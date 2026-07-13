"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Quotation", href: "/quotation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const HEADER_PADDING_X = 16; // px, matches header's px-4
const MAX_EXPANDED_WIDTH = 768; // px, matches max-w-3xl
const COLLAPSED_SIZE = 64; // px, matches h-16 w-16
const FINAL_LEFT_INSET = 4; // px, resting gap from the header's inner edge
const TOGGLE_DURATION = 0.5; // seconds, total accordion + slide duration

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const lastScrollY = useRef(0);
  const prevCollapsed = useRef(collapsed);
  const [phase, setPhase] = useState<"closing" | "opening" | null>(null);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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

  useEffect(() => {
    if (prevCollapsed.current === collapsed) return;
    prevCollapsed.current = collapsed;
    setPhase(collapsed ? "closing" : "opening");
    const t = setTimeout(() => setPhase(null), TOGGLE_DURATION * 1000 + 20);
    return () => clearTimeout(t);
  }, [collapsed]);

  const { expandedWidth, collapsedX } = useMemo(() => {
    const headerInnerWidth = Math.max(viewportWidth - HEADER_PADDING_X * 2, COLLAPSED_SIZE);
    const width = Math.min(headerInnerWidth, MAX_EXPANDED_WIDTH);
    const centeredOffset = (headerInnerWidth - COLLAPSED_SIZE) / 2;
    return { expandedWidth: width, collapsedX: FINAL_LEFT_INSET - centeredOffset };
  }, [viewportWidth]);

  const targetWidth = collapsed ? COLLAPSED_SIZE : expandedWidth;
  const targetX = collapsed ? collapsedX : 0;

  // Real width is interpolated (no scale transform), so the pill folds shut/open
  // like an accordion without distorting its rounded ends or its children.
  // The horizontal slide only kicks in near the end of closing (and leads on
  // opening), so the two gestures read as one continuous, seamless motion.
  const widthAnimate = phase ? [null, ...(phase === "closing" ? [COLLAPSED_SIZE] : [COLLAPSED_SIZE, expandedWidth])] : targetWidth;
  const xAnimate = phase ? [null, ...(phase === "closing" ? [0, collapsedX] : [0])] : targetX;

  const widthTransition =
    phase === "closing"
      ? { duration: TOGGLE_DURATION, times: [0, 0.85], ease: "easeInOut" as const }
      : phase === "opening"
        ? {
            duration: TOGGLE_DURATION,
            times: [0, 0.15, 1],
            ease: ["linear", "easeInOut"] as ["linear", "easeInOut"],
          }
        : { duration: 0.3, ease: "easeInOut" as const };

  const xTransition =
    phase === "closing"
      ? {
          duration: TOGGLE_DURATION,
          times: [0, 0.7, 1],
          ease: ["linear", "easeOut"] as ["linear", "easeOut"],
        }
      : phase === "opening"
        ? { duration: TOGGLE_DURATION, times: [0, 0.35], ease: "easeOut" as const }
        : { duration: 0.3, ease: "easeInOut" as const };

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <motion.nav
        initial={false}
        animate={{ width: widthAnimate, x: xAnimate }}
        transition={{ width: widthTransition, x: xTransition }}
        className={`nav-pill relative flex h-16 items-center gap-6 overflow-hidden rounded-full [text-shadow:0_1px_3px_rgba(0,0,0,0.5),0_1px_10px_rgba(10,15,30,0.35)] ${
          collapsed ? "justify-center gap-0 px-0" : "justify-between px-6 md:px-8"
        }`}
      >
        <Link
          href="/"
          className={`relative z-10 flex shrink-0 items-center gap-2.5 ${
            collapsed ? "p-3" : ""
          }`}
        >
          <Image src="/logo.svg" alt="" width={40} height={28} />
        </Link>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="nav-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.28, ease: "easeOut" } }}
              exit={{ opacity: 0, transition: { duration: 0.12, ease: "easeIn" } }}
              className="relative z-10 ml-auto flex items-center gap-8"
            >
              <ul className="hidden items-center gap-8 md:flex">
                {NAV_LINKS.map((link) =>
                  link.href.startsWith("/") ? (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-[var(--font-size-nav)] font-medium text-white transition-colors hover:text-white/80"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="font-sans text-[var(--font-size-nav)] font-medium text-white transition-colors hover:text-white/80"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}
              </ul>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label="Toggle navigation menu"
                className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full md:hidden"
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {open && !collapsed && (
        <div className="nav-pill absolute top-[calc(100%+0.5rem)] w-[calc(100%-2rem)] max-w-3xl rounded-3xl px-6 py-5 [text-shadow:0_1px_3px_rgba(0,0,0,0.5),0_1px_10px_rgba(10,15,30,0.35)] md:hidden">
          <ul className="relative z-10 flex flex-col gap-4">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-sans text-[var(--font-size-nav)] font-medium text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-sans text-[var(--font-size-nav)] font-medium text-white"
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
