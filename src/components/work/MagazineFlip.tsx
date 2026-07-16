"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { WORK_CATEGORIES, type WorkCategory } from "@/lib/work";
import { getLenis } from "@/components/common/SmoothScrollProvider";
import OrnateDivider from "@/components/common/OrnateDivider";
import SoundToggle from "@/components/work/SoundToggle";
import {
  playBookHandle,
  playPageFlip,
  preloadBookAudio,
} from "@/lib/bookAudio";

// ----------------------------------------------------------------------
// 1. HELPERS
// ----------------------------------------------------------------------
// Subscribes rather than setState-in-effect, so the server and the hydration pass
// agree on the desktop spread and the client corrects itself after hydration -
// letting the whole grid server-render instead of being gated behind a mount flag.
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

// Clears the fixed navbar (top-5 + h-16) when jumping to a book anchor.
// Keep in sync with the scroll-mt-28 on each book row.
const NAV_SCROLL_OFFSET = 112;

// ----------------------------------------------------------------------
// 2. BOOK THEMES & PALETTES
// ----------------------------------------------------------------------
export const BOOK_THEMES = {
  exterior: {
    gradient: "linear-gradient(135deg, #44543b 0%, #687e5b 55%, #2a3424 100%)",
    backGradient: "linear-gradient(135deg, #2a3424 0%, #687e5b 45%, #44543b 100%)",
    spine: "bg-[#1b2218]"
  },
  interior: {
    gradient: "linear-gradient(135deg, #85533b 0%, #a87258 55%, #593321 100%)",
    backGradient: "linear-gradient(135deg, #593321 0%, #a87258 45%, #85533b 100%)",
    spine: "bg-[#361e13]"
  },
  technical: {
    gradient: "linear-gradient(135deg, #37355c 0%, #525080 55%, #201f36 100%)",
    backGradient: "linear-gradient(135deg, #201f36 0%, #525080 45%, #37355c 100%)",
    spine: "bg-[#131221]"
  }
};

// ----------------------------------------------------------------------
// 3. PAGE GENERATOR
// ----------------------------------------------------------------------
function generatePages(category: WorkCategory, isMobile: boolean) {
  const pages: { id: string; content: React.ReactNode }[] = [];
  let pageCounter = 1;

  const theme = BOOK_THEMES[category.id as keyof typeof BOOK_THEMES] || BOOK_THEMES.technical;

  const PageNumber = ({ num, isFront }: { num: number; isFront: boolean }) => (
    <div className={`absolute bottom-6 md:bottom-8 ${isFront ? "right-6 md:right-10" : "left-6 md:left-10"} flex items-center gap-4 md:gap-6 font-mono text-[10px] md:text-xs text-ink/40 tracking-widest`}>
      {!isFront && <span>{String(num).padStart(2, '0')}</span>}
      {!isFront && (
        <svg width="40" height="10" viewBox="0 0 40 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 md:w-10">
          <path d="M39 5H1M1 5L6 1M1 5L6 9" />
        </svg>
      )}
      {isFront && (
        <svg width="40" height="10" viewBox="0 0 40 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 md:w-10">
          <path d="M1 5H39M39 5L34 1M39 5L34 9" />
        </svg>
      )}
      {isFront && <span>{String(num).padStart(2, '0')}</span>}
    </div>
  );

  // Cover
  pages.push({
    id: "cover",
    content: (
      <div 
        className="w-full h-full flex flex-col justify-between p-[6cqi] relative border border-white/10 shadow-[inset_-2px_0_15px_rgba(0,0,0,0.3)] overflow-hidden [container-type:size]"
        style={{
          background: theme.gradient
        }}
      >
        {/* Fractal Noise Overlay (Navbar style) */}
        <div 
          className="absolute inset-0 z-10 opacity-[0.28] mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "140px 140px"
          }}
        />

        {/* Spine crease shadow overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-[16px] bg-gradient-to-r from-black/25 via-black/8 to-transparent pointer-events-none z-20" />

        {/* Luxury inner gold-ink frame */}
        <div className="absolute inset-3 border border-white/15 pointer-events-none rounded-[4px] z-20" />

        <div className="text-center relative z-20 pt-[4cqi] px-2">
          <p className="text-[clamp(0.5rem,2.4cqi,0.8125rem)] uppercase tracking-[0.18em] font-medium text-white/70 mb-[3cqi]">{category.eyebrow}</p>
          {/* Cover art repeats the heading the grid already states semantically. */}
          <p className="font-display text-[clamp(1rem,8.5cqi,3.5rem)] font-light leading-[1.08] tracking-tight text-[#fdf6ed] text-balance break-words [hyphens:auto] [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
            {category.heading}
          </p>
        </div>
        <div className="absolute inset-0 z-0">
          {category.projects[0]?.images[0] && (
            <Image
              src={category.projects[0].images[0]}
              alt="Cover background"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-[0.14] mix-blend-overlay grayscale"
            />
          )}
        </div>
        <div className="z-20 bg-black/25 backdrop-blur-md p-[4cqi] text-center border-t border-white/10 relative mx-3 mb-3 rounded-sm shadow-sm">
          <p className="text-[clamp(0.6rem,3cqi,0.95rem)] font-sans text-white/90 leading-relaxed max-w-sm mx-auto line-clamp-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]">
            {category.intro}
          </p>
        </div>
      </div>
    )
  });

  // Projects
  category.projects.forEach((p, pIndex) => {
    const images = [...p.images];
    if (p.skipCoverImage) images.shift();

    const imagesPerPage = p.imagesPerPage ?? 2;

    // Page 1: Text + up to 1 image (if any)
    const isFrontFace1 = isMobile ? true : pages.length % 2 === 0;
    const shadowClass1 = isFrontFace1
      ? "shadow-[inset_-2px_0_10px_rgba(107,86,54,0.05)]"
      : "shadow-[inset_2px_0_10px_rgba(107,86,54,0.05)]";

    const chunk1 = p.textOnlyOpening ? [] : images.splice(0, 1);

    pages.push({
      id: `project-${pIndex}-page-1`,
      content: (
        <div className={`w-full h-full bg-paper p-6 md:p-10 pb-16 md:pb-20 flex flex-col relative ${shadowClass1} ${p.textOnlyOpening ? "justify-center" : ""}`}>
          {/* Text Section */}
          <div className="shrink-0 mb-4">
            <span className="eyebrow text-ink/60">{p.tag}</span>
            <h4 className="font-display mt-2 text-[clamp(1.2rem,1.2rem+1vw,2rem)] font-light leading-tight tracking-tight text-ink mb-3">
              {p.title}
            </h4>
            <p className={`text-[10px] md:text-sm leading-relaxed text-ink/80 font-sans ${p.textOnlyOpening ? "" : "line-clamp-4"}`}>
              {p.description}
            </p>
          </div>

          {/* Images Section */}
          {chunk1.length > 0 && (
            <div className="flex-1 flex flex-col gap-4 min-h-0 relative">
              {chunk1.map((img, idx) => (
                <div key={idx} className="flex-1 relative w-full overflow-hidden rounded-sm">
                  <Image src={img} fill sizes="(max-width: 768px) 100vw, 50vw" priority={pIndex === 0} className="object-contain" alt={p.title} />
                </div>
              ))}
            </div>
          )}

          <PageNumber num={pageCounter++} isFront={isFrontFace1} />
        </div>
      )
    });

    // Subsequent pages: imagesPerPage images each, per the project's own layout.
    while (images.length > 0) {
      const chunk = images.splice(0, imagesPerPage);

      const isFrontFaceN = isMobile ? true : pages.length % 2 === 0;
      const shadowClassN = isFrontFaceN
        ? "shadow-[inset_-2px_0_10px_rgba(107,86,54,0.05)]"
        : "shadow-[inset_2px_0_10px_rgba(107,86,54,0.05)]";

      pages.push({
        id: `project-${pIndex}-page-chunk-${images.length}`,
        content: (
          <div className={`w-full h-full bg-paper p-6 md:p-10 pb-16 md:pb-20 flex flex-col relative ${shadowClassN}`}>
            <div className="flex-1 flex flex-col gap-4 min-h-0 relative">
              {chunk.map((img, idx) => (
                <div key={idx} className="flex-1 relative w-full overflow-hidden rounded-sm">
                  <Image src={img} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" alt={p.title} />
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-between items-center mb-2 shrink-0">
              <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest">{p.title}</span>
            </div>
            <PageNumber num={pageCounter++} isFront={isFrontFaceN} />
          </div>
        )
      });
    }
  });

  if (!isMobile && pages.length % 2 === 0) {
    pages.push({
      id: "blank",
      content: <div className="w-full h-full bg-paper shadow-[inset_-2px_0_10px_rgba(107,86,54,0.05)]" />
    });
  }

  // Back Cover
  pages.push({
    id: "back-cover",
    content: (
      <div className={`w-full h-full bg-[#fcfaf7] p-8 md:p-12 flex flex-col items-center justify-between shadow-[inset_2px_0_15px_rgba(107,86,54,0.06)] ${isMobile ? '' : 'border-l'} border-ink/10 relative`}>
        {/* Subtle background decoration */}
        <div className="absolute inset-4 border border-ink/5 pointer-events-none rounded-sm" />

        <div className="w-full text-center mt-6 z-10">
          <span className="eyebrow text-ink/50 tracking-[0.2em] mb-2 block">SP DESIGNS</span>
          <p className="font-display text-2xl md:text-3xl font-light text-ink">Crafting Signature Spaces</p>
          <div className="w-12 h-[1px] bg-ink/20 mx-auto mt-4" />
        </div>

        <div className="text-center my-auto px-4 max-w-sm z-10 flex flex-col items-center gap-6">
          <p className="text-xs md:text-sm text-ink/80 leading-relaxed font-sans">
            At SP Designs, we believe every space has a story waiting to be told. Through precision drafting, curated interiors, and photorealistic 3D visualization, we turn your architectural dreams into breathtaking realities.
          </p>
          <p className="text-[11px] md:text-xs text-ink/65 italic leading-relaxed font-serif">
            Let&apos;s design the future of your spaces together.
          </p>
        </div>

        <div className="w-full text-center mb-6 z-10 flex flex-col items-center gap-4">
          <div 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-md border border-white/10 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #8c714b 0%, #a88d65 55%, #6b5636 100%)"
            }}
          >
            {/* Noise inside logo circle */}
            <div 
              className="absolute inset-0 opacity-[0.25] mix-blend-screen pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px"
              }}
            />
            <Image 
              src="/logo.svg" 
              alt="SP Designs Logo" 
              width={40} 
              height={28} 
              className="relative z-10 opacity-95" 
            />
          </div>
          <div>
            <a 
              href="https://spdesigning.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-ink hover:text-ink/70 font-mono tracking-wider transition-colors duration-200"
            >
              www.spdesigning.com
            </a>
          </div>
        </div>
        <PageNumber num={pageCounter++} isFront={false} />
      </div>
    )
  });

  return pages;
}

// ----------------------------------------------------------------------
// 3. ICONS
// ----------------------------------------------------------------------
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ----------------------------------------------------------------------
// 4. UI COMPONENTS
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// 4. MAIN COMPONENT
// ----------------------------------------------------------------------
export default function MagazineFlip() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [flippedCount, setFlippedCount] = useState(0);

  // A #hash arriving from another route (/designs#interior) is applied by the
  // browser before this grid has laid out, so resolve it once on mount and again
  // on any later hash change.
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { offset: -NAV_SCROLL_OFFSET });
      } else {
        // Lenis is absent under prefers-reduced-motion; scroll-mt-28 handles the inset.
        el.scrollIntoView({ block: "start" });
      }
    };

    const raf = requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  // Decode the samples ahead of the first click, so opening a book is not the
  // thing that waits on the download.
  useEffect(() => {
    void preloadBookAudio();
  }, []);

  // Fullscreen-modal lock: freeze smooth-scroll + native scroll and fade the
  // site chrome (navbar/footer) while a volume is open, so the opened book is a
  // stable, centered reader instead of a fixed layer over a scrolling page.
  useEffect(() => {
    const open = activeCategoryIndex !== null;
    if (open) {
      getLenis()?.stop();
      document.body.classList.add("book-open");
    } else {
      getLenis()?.start();
      document.body.classList.remove("book-open");
    }
    return () => {
      getLenis()?.start();
      document.body.classList.remove("book-open");
    };
  }, [activeCategoryIndex]);

  // Pre-generate pages and leaves for all books so they exist in the grid
  const allBooks = useMemo(() => {
    return WORK_CATEGORIES.map(cat => {
      const pages = generatePages(cat, isMobile);
      let leaves = [];
      if (isMobile) {
        leaves = pages.map(p => ({ front: p, back: null }));
      } else {
        for (let i = 0; i < pages.length; i += 2) {
          leaves.push({
            front: pages[i],
            back: pages[i + 1] || null
          });
        }
      }
      return { cat, pages, leaves };
    });
  }, [isMobile]);

  // Performance: Throttle aggressive clickers. A ref lock released on a timer,
  // rather than a Date.now() comparison, keeps these handlers free of impure reads.
  const flipLocked = useRef(false);
  const flipLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const FLIP_DURATION = 800;

  const lockFlip = () => {
    flipLocked.current = true;
    if (flipLockTimer.current) clearTimeout(flipLockTimer.current);
    flipLockTimer.current = setTimeout(() => {
      flipLocked.current = false;
    }, FLIP_DURATION);
  };
  // Two-phase open/close choreography timer (fly <-> swing), so the two
  // directions are exact mirrors of each other. Phase length sits just past
  // the 0.8s swing so the next phase starts with no dead-stop hitch.
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const PHASE_MS = 850;
  // While the closed book flies home it must stay above the fading backdrop
  // (z-55), otherwise the whole flight happens hidden behind it and the book
  // pops into the grid.
  const [returningIndex, setReturningIndex] = useState<number | null>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (returnTimer.current) clearTimeout(returnTimer.current);
    if (flipLockTimer.current) clearTimeout(flipLockTimer.current);
  }, []);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (flipLocked.current) return;

    if (activeCategoryIndex !== null) {
      const book = allBooks[activeCategoryIndex];
      if (flippedCount < book.leaves.length) {
        lockFlip();
        playPageFlip();
        setFlippedCount((c) => c + 1);
      }
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (flipLocked.current) return;

    if (flippedCount === 1) {
      handleClose(); // Paging back to cover instantly returns the book to the shelf!
      return;
    }

    if (flippedCount > 0) {
      lockFlip();
      playPageFlip();
      setFlippedCount((c) => c - 1);
    }
  };

  const handleSelect = (idx: number) => {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (returnTimer.current) clearTimeout(returnTimer.current);
    setReturningIndex(null);
    // Phase 1: fly the closed book to the centre. Phase 2: swing it open.
    // The thump lands on the click (which is also what unlocks the audio context
    // under the autoplay policy); the cover's own flip sounds when it swings.
    setActiveCategoryIndex(idx);
    setFlippedCount(0);
    lockFlip();
    playBookHandle();
    phaseTimer.current = setTimeout(() => {
      playPageFlip();
      setFlippedCount(1);
    }, PHASE_MS);
  };

  const handleClose = () => {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (returnTimer.current) clearTimeout(returnTimer.current);
    // Phase 1: swing the cover shut at the centre. Phase 2: fly home to the
    // shelf, staying above the backdrop for the whole flight.
    // Mirror of opening: the cover swings shut, then the book thumps back down
    // on the shelf when it lands.
    const idx = activeCategoryIndex;
    setFlippedCount(0);
    lockFlip();
    playPageFlip();
    phaseTimer.current = setTimeout(() => {
      playBookHandle();
      setReturningIndex(idx);
      setActiveCategoryIndex(null);
      returnTimer.current = setTimeout(() => setReturningIndex(null), 900);
    }, PHASE_MS);
  };

  // Keyboard navigation
  useEffect(() => {
    if (activeCategoryIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryIndex, flippedCount, allBooks]);

  return (
    <div id="designs" className="w-full bg-paper font-sans relative">
      <SoundToggle />


      {/* STABILIZING BACKDROP: opaque paper layer that hides the grid while a
          volume is open, so the morphing book reads as a centered modal. */}
      <AnimatePresence>
        {activeCategoryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-paper"
          />
        )}
      </AnimatePresence>

      {/* GLOBAL CLOSE BUTTON */}
      <AnimatePresence>
        {activeCategoryIndex !== null && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClose}
            className="fixed top-6 right-6 md:right-10 z-[100] w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-ink/10 flex items-center justify-center text-ink/60 hover:text-ink hover:bg-white transition-colors shadow-sm"
            aria-label="Close Book"
          >
            <CloseIcon />
          </motion.button>
        )}
      </AnimatePresence>

      <div className={`w-full pt-20 pb-32`}>
        {/* HERO TITLE */}
        <div className={`transition-opacity duration-500 text-center mb-16 md:mb-24 px-6 mx-auto max-w-3xl ${activeCategoryIndex !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <h2 className="font-display text-[clamp(2.5rem,2rem+3vw,4.5rem)] font-light text-ink mb-4 md:mb-6">Explore our Designs</h2>
          <p className="text-ink/70 font-sans text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed">
            Understand what we do and how we do it to make your experience better with SP Designs.
          </p>
        </div>

        {/* UNIFIED 3D BOOK LIST / FULLSCREEN CANVAS */}
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col gap-32 md:gap-40">
          {allBooks.map((book, idx) => {
            const isSelected = activeCategoryIndex === idx;
            const isGrid = activeCategoryIndex === null;
            const isHidden = !isGrid && !isSelected;
            const reversed = idx % 2 === 1;
            const bookTheme = BOOK_THEMES[book.cat.id as keyof typeof BOOK_THEMES] || BOOK_THEMES.technical;

            return (
              <React.Fragment key={book.cat.id}>
                <div
                  id={book.cat.id}
                  className="relative flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full scroll-mt-28"
                >
                  {/* TEXT SECTION */}
                  <div className={`flex-1 w-full transition-opacity duration-500 ${!isGrid ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${reversed ? 'md:order-2 md:pl-10' : 'md:order-1 md:pr-10'}`}>
                    <span className="eyebrow text-ink/70 mb-4 block">{book.cat.eyebrow}</span>
                    <h3 className="font-display text-[clamp(2rem,1.5rem+2.4vw,3.75rem)] font-light leading-tight tracking-tight text-ink mb-6">
                      {book.cat.heading}
                    </h3>
                    <p className="text-[clamp(1rem,0.95rem+0.2vw,1.125rem)] leading-relaxed text-ink/85 max-w-lg">
                      {book.cat.intro}
                    </p>
                  </div>

                  {/* BOOK SECTION */}
                  <div className={`flex-1 w-full relative pb-16 md:pb-0 ${reversed ? 'md:order-1' : 'md:order-2'}`}>
                    {/* GHOST PLACEHOLDER */}
                    {isSelected && <div className="relative w-full aspect-[1/1.3] max-h-[50vh] md:max-h-[60vh] mx-auto" />}

                    <motion.div
                      layout
                      transition={{ layout: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
                      className={isSelected
                        ? "fixed inset-0 m-auto flex items-center justify-center p-4 sm:p-6 md:p-10 z-[60]"
                        : `relative w-full max-w-[280px] md:max-w-none aspect-[1/1.3] max-h-[50vh] md:max-h-[60vh] mx-auto cursor-pointer group py-4 ${returningIndex === idx ? "z-[70]" : "z-10"}`}
                      style={{
                        opacity: isHidden ? 0 : 1,
                        pointerEvents: isHidden ? "none" : "auto",
                        perspective: isSelected ? "4000px" : "2000px"
                      }}
                      onClick={() => !isSelected && handleSelect(idx)}
                    >
                      <motion.div
                        layout
                        className={`relative mx-auto ${isSelected
                            ? (isMobile
                              ? 'w-full aspect-[1/1.3] max-w-[min(92vw,440px,calc((100dvh-72px)/1.3))]'
                              : (flippedCount > 0
                                ? 'w-full aspect-[2/1] max-w-[min(100%,calc((100dvh-88px)*2))]'
                                : 'aspect-[1/1.3] h-[min(calc(100dvh-96px),86vh)]'))
                            : "w-full h-full"
                          }`}
                        style={{ transformStyle: "preserve-3d" }}
                        animate={{
                          rotateX: isSelected ? 0 : 25,
                          rotateY: isSelected ? 0 : -20,
                          rotateZ: isSelected ? 0 : 2,
                        }}
                        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], layout: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
                      >
                        {/* TABLE SHADOW (Only in reading view) */}
                        <motion.div
                          className="absolute inset-0 bg-ink/10 blur-3xl translate-y-12"
                          style={{ transform: "translateZ(-30px)" }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                        />

                        {/* 3D BOOK EDGES & BACK COVER (Only in grid view) */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{ transformStyle: "preserve-3d" }}
                          animate={{ opacity: isSelected ? 0 : 1 }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* BACK COVER */}
                          <div
                            className="absolute inset-0 rounded-r-md shadow-2xl border-l-[6px] border-black/40 overflow-hidden"
                            style={{ 
                              transform: "translateZ(-40px) rotateY(180deg)", 
                              backfaceVisibility: "hidden",
                              background: bookTheme.backGradient
                            }}
                          >
                            {/* Noise on back cover */}
                            <div 
                              className="absolute inset-0 opacity-[0.28] mix-blend-screen pointer-events-none"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                backgroundSize: "140px 140px"
                              }}
                            />
                          </div>
                          {/* SPINE (LEFT) */}
                          <div
                            className={`absolute left-0 top-0 h-full w-[40px] ${bookTheme.spine} flex items-center justify-center overflow-hidden shadow-[inset_2px_0_15px_rgba(0,0,0,0.85)] border-r border-black/30`}
                            style={{ transform: "translateX(-20px) translateZ(-20px) rotateY(-90deg)" }}
                          >
                            {/* Gold foil line details on spine */}
                            <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-[#dfc5a3]/40 to-transparent" />
                          </div>
                          {/* PAGES (RIGHT) */}
                          <div
                            className="absolute right-0 top-[3px] bottom-[3px] w-[40px] bg-[#fdfaf5] shadow-[inset_-3px_0_15px_rgba(0,0,0,0.15)]"
                            style={{
                              transform: "translateX(20px) translateZ(-20px) rotateY(90deg)",
                              backgroundImage: "repeating-linear-gradient(to right, #e5e0d8 0, #e5e0d8 1px, #fdfaf5 1px, #fdfaf5 3px)"
                            }}
                          />
                          {/* PAGES (TOP) */}
                          <div
                            className="absolute top-0 left-[6px] right-[3px] h-[40px] bg-[#fdfaf5]"
                            style={{
                              transform: "translateY(-20px) translateZ(-20px) rotateX(90deg)",
                              backgroundImage: "repeating-linear-gradient(to bottom, #e5e0d8 0, #e5e0d8 1px, #fdfaf5 1px, #fdfaf5 3px)"
                            }}
                          />
                          {/* PAGES (BOTTOM) */}
                          <div
                            className="absolute bottom-0 left-[6px] right-[3px] h-[40px] bg-[#fdfaf5] shadow-[inset_0_3px_15px_rgba(0,0,0,0.15)]"
                            style={{
                              transform: "translateY(20px) translateZ(-20px) rotateX(-90deg)",
                              backgroundImage: "repeating-linear-gradient(to bottom, #e5e0d8 0, #e5e0d8 1px, #fdfaf5 1px, #fdfaf5 3px)"
                            }}
                          />
                          {/* DROPSHADOW */}
                          <div
                            className="absolute inset-0 bg-black/45 blur-2xl rounded-xl transition-all duration-1000 ease-out group-hover:blur-3xl group-hover:bg-black/25"
                            style={{ transform: "translateZ(-60px) translateY(12px) translateX(12px)" }}
                          />
                        </motion.div>

                        {/* PAGINATION HITBOXES (Only in reading view) */}
                        {isSelected && (
                          <div className="absolute inset-0 z-50 pointer-events-none flex" style={{ transform: "translateZ(30px)" }}>
                            <button
                              className="w-1/2 h-full pointer-events-auto cursor-pointer disabled:hidden"
                              onClick={handlePrev}
                              disabled={flippedCount === 0}
                              aria-label="Previous Page"
                            />
                            <button
                              className="w-1/2 h-full pointer-events-auto cursor-pointer disabled:hidden"
                              onClick={handleNext}
                              disabled={flippedCount === book.leaves.length}
                              aria-label="Next Page"
                            />
                          </div>
                        )}

                        {/* LEAVES (The physical pages & front cover) */}
                        {book.leaves.map((leaf, index) => {
                          // If it's closed in the grid, nothing is flipped. If selected, use flippedCount!
                          const isFlipped = isSelected ? flippedCount > index : false;
                          const zLevel = isFlipped ? index : book.leaves.length - index;
                          // A leaf is a half-width spread page only while the book is
                          // actually OPEN (flippedCount > 0). When closed it is the
                          // full-width cover - so closing swings the cover shut and
                          // flies home as a mirror of opening (no half->full stretch).
                          const isSpread = isSelected && flippedCount > 0;

                          return (
                            <motion.div
                              layout
                              key={index}
                              className={`absolute top-0 h-full ${isMobile ? 'w-full left-0' :
                                  (isSpread ? 'w-1/2 right-0' : 'w-full left-0')
                                }`}
                              style={{ transformStyle: "preserve-3d" }}
                              initial={false}
                              animate={{
                                z: zLevel * 0.1,
                                zIndex: zLevel,
                              }}
                              transition={{
                                layout: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
                                // Swap stacking exactly at the flip's 90deg midpoint
                                // (pages are edge-on, so the reorder is invisible in
                                // both directions - no content snap on close).
                                z: { delay: 0.4, duration: 0 },
                                zIndex: { delay: 0.4, duration: 0 }
                              }}
                            >
                              <motion.div
                                className="w-full h-full absolute inset-0"
                                style={{
                                  transformOrigin: "left center",
                                  transformStyle: "preserve-3d",
                                  willChange: "transform"
                                }}
                                initial={false}
                                animate={{
                                  rotateY: isFlipped ? -180 : 0,
                                }}
                                transition={{
                                  duration: 0.8, // Flip stays in lockstep with the layout morph
                                  ease: [0.65, 0, 0.35, 1],
                                }}
                              >
                                {/* FRONT FACE */}
                                <div className="absolute inset-0 overflow-hidden bg-white border border-ink/10 shadow-[0_0_1px_rgba(0,0,0,0.1)]" style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}>
                                  {leaf.front.content}
                                </div>
                                {/* BACK FACE */}
                                <div className={`absolute inset-0 overflow-hidden ${isMobile && !leaf.back ? '' : 'bg-white border border-ink/10 shadow-[0_0_1px_rgba(0,0,0,0.1)]'}`} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(0)" }}>
                                  {leaf.back ? leaf.back.content : (isMobile ? null : <div className="w-full h-full bg-paper border border-ink/10 shadow-[0_0_1px_rgba(0,0,0,0.1)]" />)}
                                </div>
                              </motion.div>
                            </motion.div>
                          );
                        })}

                        {/* GRID READ VOLUME LABEL */}
                        {!isSelected && (
                          <div className="absolute -bottom-16 left-0 right-0 text-center transition-opacity duration-300 opacity-60 group-hover:opacity-100">
                            <span className="text-xs font-medium tracking-widest text-ink uppercase">Tap to View</span>
                            <div className="w-8 h-[1px] bg-ink mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
                {idx < allBooks.length - 1 && isGrid && (
                  <div className="w-full flex justify-center py-6">
                    <OrnateDivider className="w-48 md:w-64 text-ink/20" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
