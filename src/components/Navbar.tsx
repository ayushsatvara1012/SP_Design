"use client";

import { useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Designs", href: "#designs" },
  { label: "Quotation", href: "#quotation" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <nav className="nav-pill relative flex w-full max-w-3xl items-center justify-between gap-6 rounded-full px-6 py-3 [text-shadow:0_1px_10px_rgba(10,15,30,0.35)] md:px-8">
        <a
          href="#hero"
          className="relative z-10 flex shrink-0 items-center gap-2.5"
        >
          <Image src="/logo.svg" alt="" width={40} height={40} />
        </a>

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
      </nav>

      {open && (
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
