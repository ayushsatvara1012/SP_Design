# SP Designs - Website Plan

Client: Shalini Prajapati, Founder & Designer, SP Designs (Mansa, Gujarat)
Source material: PORTFOLIO_SHALINI PRAJAPATI.pdf (29 pages), SHALINI_P_CV.pdf
Status: Phase 1 complete. Pivoted 2026-07-12 (see section 5/9) from single-page scroll to a
full multi-page site - Services, Designs/Work, Quotation, About, Contact are now each their
own route, matching how About was already built. See section 15 for current implementation
status.
Date: 2026-07-10 (last updated 2026-07-12)

## 1. Who the client is

Civil Engineer (Nirma University, 2019-2023, ISRO intern) turned architectural designer and 3D visualizer.
Founder of SP Designs; also works as Designer & 3D Visualizer at Mark Point.
Specializes in modern residential and luxury interiors, plus exterior architectural visualization.

Core value proposition: takes a space end-to-end - 2D technical drafting -> photorealistic 3D render -> execution coordination.
This 2D-to-3D workflow is her differentiator and should be the spine of the site's storytelling.

Tools: AutoCAD, Revit, 3ds Max, V-Ray, QGIS, MS Office.
Languages: Gujarati, Hindi, English.

## 2. Contact / identity facts (from CV - verify before publishing)

- Name: Shalini Prajapati
- Brand: SP Designs
- Email: spdesigns28@gmail.com
- Phone: 8980775017
- Location: SJ Farm House, behind SJ Traders, Kalol-Mansa Road, Mansa (Gujarat)
- Handle used on renders: SP_DESIGNS_RENDERS

## 3. What she serves (services to feature)

1. Exterior architectural visualization (facades - modern & traditional, commercial e.g. Hyundai showroom, institutional e.g. Swaminarayan hall)
2. Interior 3D visualization (residential/living, office, healthcare/reception)
3. 2D technical drafting: space planning & layouts, residential plans, elevations
4. MEP-adjacent detailing: electrical layouts, ceiling layouts
5. Furniture design documentation: 2D furniture drawings derived from 3D renders (kitchen, TV unit, joinery)

## 4. Signature interaction: "Sketch draws itself, render fades in"

The hand-drawn scroll animation the client wants maps directly onto her real workflow.

Mechanism:
- Line art exported as layered SVG (outline paths).
- On scroll, animate stroke-dashoffset full -> 0 so the pen "draws" the outline.
- Once the outline completes, cross-fade the photoreal 3D render on top.
- Optional watercolor/color-blob accents fade + scale in (matches the reference image aesthetic).

Where it appears (used sparingly, 2-3 moments - not every section):
- **Services ("What I Do") - DONE, see section 15.** Revised placement (2026-07-12): originally planned for
  Hero, moved here instead per explicit user request - Hero already felt finished, and the client wanted
  this moment to draw attention inside the section that explains the service, not the entry screen.
- Still open, location(s) TBD: a second signature moment, likely Designs gallery transition or the
  Quotation "How I work" strip (2D plan -> 3D render reveal) - not yet built, revisit once this first one
  is reviewed.

Fallback: users with prefers-reduced-motion see the finished render instantly.

Implementation note (2026-07-12): the actual asset used, `public/images/hero.jpg`, turned out to already be
a genuine diagonal sketch/render split of the *same room* (not a separate traced SVG line-art file, which
doesn't exist yet - see section 7 asset bottleneck). So instead of stroke-dashoffset path drawing, the
Services moment is a scroll-scrubbed clip-path wipe that progressively reveals more of that single image
(sketch side first, render side second), which is asset-honest and needed no new art. If/when a real traced
SVG line-art asset arrives from the client, a literal stroke-drawing version can replace this for the next
signature moment.

Update (2026-07-12): the traced SVG line-art asset arrived - `public/images/interior_sketch.svg` (868
separate stroke paths, viewBox 0 0 2816 1536, a living-room interior). So the real stroke-dashoffset
draw-on-scroll is now built as its own section **directly under Hero** (`InteriorSketch.tsx`, section id
`process`), and the earlier clip-path stand-in (`ServicesSignature.tsx`) was **removed** - this true
stroke-draw is now THE signature moment (per explicit user decision, "replace it"). Chosen behaviour
(user-selected): sequential hand-drawn feel (paths drawn longest-first so structural gestures lead and
fine details trail), pinned scrub on desktop, and after the drawing completes a set of restrained
indigo/green watercolor accent blobs bloom in (the reference aesthetic) - not a photoreal render fade
(no matching per-room render exists yet). See section 15 for the component details.

## 5. Sitemap / section order

Revised 2026-07-12 per client nav requirements - nav bar links are Services, Designs, Quotation, About,
Contact (Hero has no nav link, reached via logo/scroll-to-top).

Updated again 2026-07-12: **About was pulled out of the single-page scroll and moved to its own route**
at `/about`, per explicit user request - originally a deliberate one-off exception to the "single-page
scroll experience" decision in section 9.

**Pivoted 2026-07-12 (later same day): hybrid multi-page site.** The single-page-scroll decision in
section 9 is superseded - About's routed pattern was extended to some sections. **Final layout (revised
2026-07-12, latest): the homepage carries Hero + InteriorSketch + Services + Contact, and only Work,
Quotation, and About are standalone routes.** `/services` and `/contact` were briefly their own routes
then removed per explicit user request - Services and Contact are homepage sections again. Live routes:
`/` (Hero + InteriorSketch + Services + Contact), `/work` (the Designs/portfolio component - route name
is `work` to match the "Selected Work" copy in `Designs.tsx`), `/quotation`, `/about`. Navbar and Footer
nav link to real routes for Work/Quotation/About and to homepage anchors `/#services` and `/#contact` for
the two homepage sections. Cross-page CTAs: Hero's "View the work" -> `/work`, Quotation's "Get in touch"
-> `/#contact`, each Services row's "See more" -> `/work`.

Implementation: `Navbar` and `Footer` moved into the root layout (`src/app/layout.tsx`) so every route
gets them for free instead of each `page.tsx` importing/rendering them individually. The standalone content
routes (`about`, `work`, `quotation`) live under a `(pages)` route group with its own `layout.tsx` that
adds the `pt-12 md:pt-16` offset so content clears the fixed floating nav pill - Home (`/`) is
intentionally outside that group since Hero is full-bleed and meant to sit behind the nav.

1. Hero - brand wordmark, tagline, signature draw-to-render animation, primary CTA (opens the `/` route
   alongside InteriorSketch, Services, and Contact).
2. Services (homepage section `#services`, component `Services.tsx`) - what she offers (exterior
   visualization, interior visualization, 2D drafting, MEP-adjacent detailing, furniture documentation -
   see section 3). Supersedes the old separate Exterior/Interior/Craft sections.
3. Work (`/work`, component `Designs.tsx`) - the portfolio/gallery proper (facades, showroom, hall,
   living, office, healthcare) with the flagship draw-to-render moment.
4. Quotation (`/quotation`) - process + how-to-get-a-quote (absorbs the old "How I Work" 4-step process:
   brief -> 2D drawing -> 3D render -> execution), positioned as the step before Contact.
5. About (`/about`) - short bio, credentials (Nirma, ISRO), tool badges.
6. Contact (`/contact`) - email/phone/location (no inquiry funnel - chatbot owns lead capture, per
   section 9/13).

Original 7-section breakdown (for reference on content that still needs a home within the sections above):
About, Exterior Visualization, Interior Visualization, The Craft / Technical Drawings, How I Work.

## 6. Tech stack (locked)

- Framework: Next.js (App Router) + TypeScript.
- Styling: Tailwind CSS.
- Icons: Google Material Symbols (outline).
- Animation: hybrid approach (decided 2026-07-12).
  - Framer Motion: general parallax (image/text/section drift), fades, reveals - used richly, throughout most sections (not sparing).
  - GSAP + ScrollTrigger: reserved only for the 2-3 pinned, multi-stage "draw-to-render" signature sequences where precise scrubbing/pinning matters.
  - Smooth scroll: Lenis, underlying both.
- Line art: SVG assets prepared as vector paths (not PNG) for the draw-on-scroll effect.
- Images: next/image for the 3D renders; lazy-load galleries.
- Fonts: next/font (one display serif + one clean sans - see Design direction).
- Deploy: Vercel.
- Mobile motion: simplified - reduce/disable parallax depth and pinned GSAP sequences on small screens (perf + scroll-jank risk); keep simple fades/reveals. Ties into existing prefers-reduced-motion fallback (see section 4).

## 7. Asset requirements (the real bottleneck - needed from client)

- High-res exports of the 3D renders (currently embedded in the PDF at screen res).
- Layered SVG line drawings for the sections that "draw themselves" (redraw from her 2D CAD, or trace outlines in Illustrator/Figma).
- Logo / wordmark for SP Designs (none in source; may need to design one).
- Final approved copy for bio, service descriptions, contact details.
- Confirmation of which projects can be shown publicly (client NDAs?).

## 8. Design direction

- Ultra-premium, editorial, lots of whitespace, paper/off-white background (echoes the reference sketch aesthetic).
- Theme: white only (locked 2026-07-12) - no dark mode variant. Background stays white/off-white throughout; restrained accent color(s) only.
- Restrained accent color(s) - the watercolor blobs from the reference (indigo/green) as sparing accents.
- Motion is slow, deliberate, expensive-feeling; never busy.

### Typography (locked 2026-07-12)

- Display serif: **Fraunces** (headlines, hero tagline, section titles) - soft-serif, high stroke contrast, optical-size axis keeps it crisp from hero scale down to subheads. Editorial/design-magazine feel over corporate.
- Body sans: **Sora** (paragraphs, captions, nav, UI labels) - geometric-but-warm, subtle architectural echo that pairs with drafting/blueprint imagery without reading as a SaaS/tech font.
- Both via `next/font` (Google Fonts) - no licensing cost or third-party font-loading perf hit.
- Discipline: only 2 weights per family in active use (e.g. Fraunces Light for display, Sora Regular/Medium for body). No third typeface for "accents."
- Small-caps eyebrow labels (e.g. "EXTERIOR VISUALIZATION") use wide letter-spacing; big serif headlines use tight tracking.

### Type scale (responsive - mobile-first, fluid via clamp())

Base body: 16px mobile -> 18px desktop, line-height 1.6.

| Role | Mobile | Desktop | Notes |
|---|---|---|---|
| Hero H1 | 40-48px | 96-120px (clamp) | Fraunces Light, line-height ~1.05, ideally one line, tight tracking |
| Section H2 | 32px | 56px | Fraunces, tight tracking |
| Subsection H3 | 24px | 32px | Fraunces or Sora Medium |
| Body copy | 16px | 18px | Sora Regular, line-height 1.6, max-width ~65-75ch for readability |
| Eyebrow / label | 11-12px | 13px | Sora Medium, wide letter-spacing (~0.15-0.2em), uppercase |
| Nav / UI | 14px | 15px | Sora Regular/Medium |

Implementation note: use Tailwind's `clamp()`-based fluid type utilities (or a small custom fontSize scale in `tailwind.config` using `clamp(min, preferred-vw, max)`) rather than fixed breakpoint jumps, so headline size scales smoothly across all viewport widths rather than snapping at breakpoints.

## 9. Decisions (locked)

- Scope: portfolio showcase only. Lead-gen handled separately by an integrated Vaayu Intelligence chatbot (not our contact-form build).
- Structure: **hybrid multi-page site** (revised 2026-07-12, supersedes the earlier single-page-scroll
  decision - see section 5 for the final layout). Home (`/`) carries Hero + InteriorSketch + Services +
  Contact; only Work, Quotation, and About are standalone routes. (`/services` and `/contact` were
  briefly routes then folded back into the homepage per user request.)
- Assets: client will send high-res render exports later. For now, extract low-res renders from the PDF to build a blueprint.
- Language: English only for now.
- Contact section stays (email/phone/location) but no inquiry funnel - the chatbot owns lead capture.

Still to confirm later: domain/hosting (default Vercel), logo/wordmark (none exists - design a simple SP wordmark).

## 10. Phasing

- Phase 0: DONE - scope confirmed, decisions locked; animation stack confirmed (2026-07-12).
- Phase 1: DONE - Section-by-section build (see section 12) - not a full-page build in one pass. Real copy, low-res renders extracted from PDF as placeholders (client hasn't sent real assets yet - proceeding with placeholders per section 7). Responsive at every step.
  - Navbar: DONE (see section 15).
  - Hero: DONE (see section 15).
  - Services: DONE (see section 15) - built as flat list of 5 alternating rows, not grouped.
  - Designs: DONE (see section 15) - filterable gallery grid.
  - Quotation: DONE (see section 15) - 4-step process strip.
  - About: DONE (see section 15) - moved to its own route `/about`, not a homepage scroll section.
  - Contact: DONE (see section 15) - email/phone/location detail grid, chatbot mount point, footer row.
- Phase 2: IN PROGRESS - Add Lenis + GSAP scroll animation on the signature draw-to-render moment(s) (once base sections exist).
  - Services signature reveal: DONE (see section 15) - relocated from the original Hero/Designs placement to a pinned moment inside Services, per explicit user request ("Hero already feels done", wants it to "draw attention" in the What-I-Do section instead).
- Phase 3: Swap in high-res renders from client; performance + mobile fallbacks + reduced-motion + SEO.
- Phase 4: Integrate Vaayu Intelligence chatbot; deploy to Vercel; client review.

## 12. Build workflow (locked 2026-07-12) - section-by-section, not full-page

Reason: this is a single, long scroll page with heavy per-section animation work (parallax + signature draw-to-render
moments). Building all sections at once makes it hard to isolate and review animation/image issues. Instead:

- Build **one section at a time**, in sitemap order (see section 5): Hero -> About -> Exterior Visualization ->
  Interior Visualization -> The Craft -> How I Work -> Contact.
- Sections not yet built are left as **blank placeholder blocks** (e.g. a div with correct min-height / background,
  no content) so the page scaffold, scroll behavior, and nav anchors work end-to-end from the start without needing
  every section finished.
- After each section is built, **pause and review** with the user before moving to the next: check the section's
  animation (parallax and/or draw-to-render), image treatment, responsiveness (mobile + desktop), and typography
  against the locked type scale (section 8). Fix issues in that section before starting the next one.
- Do not move to the next section until the current one is approved.

## 14. Verification workflow (locked 2026-07-12)

Do NOT start the browser preview tool (`preview_start` / Browser pane) to visually verify changes on this
project. The user verifies manually in their own browser, which is faster than automated screenshot-based
checks - and the automated preview has repeatedly produced misleading results (stale dev servers serving
old CSS, `document.hidden` pausing Framer Motion animations, viewer-state artifacts like a raw SVG view
leaving the tab in a broken rendered state, screenshot/coordinate scaling confusion). After making a change:

- Run `npm run build` (or lint/typecheck) to confirm the code compiles - that verification stays in scope.
- Report what changed and where (files, classes, behavior), then ask the user to check it in their own
  browser rather than trying to confirm the visual result yourself.
- Only use the browser preview tool again if the user explicitly asks for it in a given session.

## 13. Chatbot note

Lead generation is delegated to an integrated Vaayu Intelligence chatbot. The site build reserves a
mount point / embed slot for it and does NOT build its own contact form funnel.

## 15. Implementation status (as of 2026-07-12)

Project scaffolded: Next.js 16 (App Router) + TypeScript + Tailwind v4, package name `sp-designs`.
Installed: `framer-motion`, `gsap`, `lenis`. Fonts: Fraunces (display) + Sora (body) via `next/font/google`.
Git repo initialized at root; not yet committed as of this log entry (see below - first commit follows
this update).

### Navbar (`src/components/Navbar.tsx`, `.nav-pill` in `src/app/globals.css`)

- Fixed, centered floating pill, always visible on scroll (no hide-on-scroll/scroll-triggered state yet -
  still open item, see note below).
- Logo: `public/logo.svg` (small "SP" monogram, provided by user) rendered directly at 40x40 on the left;
  text wordmark removed in favor of logo-only per user's own edit to Navbar.tsx.
- Nav links (Services, Designs, Quotation, About, Contact) pushed to the right via `justify-between` on
  the `<nav>` flex container, giving natural spacing between the logo and link groups.
- Visual treatment iterated twice: first a real frosted-glass effect (backdrop-filter blur + translucent
  white), then per explicit user request replaced with a **solid, non-glass gradient pill** - diagonal
  gradient across brand-adjacent tones blended via `color-mix()` (not raw rgba), plus a white
  fractalNoise SVG grain overlay (`.nav-pill::before`, `mix-blend-mode: screen`, opacity 0.32) for a
  non-smooth textured look. User has since hand-edited the gradient/shadow values directly in
  `globals.css` (warmer gold-brown stops, added inset highlight/shadow) and changed the global `--ink`
  token from near-black (`#1a1815`) to a warm tan (`#a7895a`) - current code reflects the user's edits;
  treat `--ink` as **no longer a literal near-black text color** going forward.
- Mobile: hamburger toggles a full-width `.nav-pill` dropdown below the bar with the same treatment.
- Scroll-direction shrink behavior (added 2026-07-12): pill collapses into a 56x56px circle (logo
  only, centered with padding so it doesn't look dense) pinned to the left edge at the same top
  offset when the user scrolls down past 24px; scrolling up (or being near the very top) expands it
  back to the full pill. Implemented via a throttled (`requestAnimationFrame`) scroll listener plus
  `motion.nav layout` in `Navbar.tsx` for the FLIP-style width/shape morph. Nav links/hamburger are
  hidden while collapsed.
- Known open item: nav text is white, tuned for sitting over the dark hero. An earlier attempt added
  a scroll-position-based swap to a solid `bg-ink` pill once past Hero, but the client asked to revert
  that - the pill/circle must always keep the original gradient/grain/box-shadow `.nav-pill` treatment
  regardless of section. So white-on-white contrast over light sections below Hero is still an open
  problem, now with an explicit constraint: solve it without changing the pill's background treatment
  (e.g. a dark-text logo/link variant, or an outline/shadow approach) rather than a background swap.

### Hero (`src/components/Hero.tsx`)

- Full-bleed background image at `public/images/hero.jpg` - swapped once already by the user (old image
  was 5632x3072 with a thick white frame; current image is 2816x1536, user's own sketch-to-3D-render
  diagonal-split composite with a much thinner white margin, ~5.5% top/bottom, ~2.9% left/right).
- Crop/zoom recalibrated to match the current image's margins: `scale-[1.18]` (was `1.32` for the old,
  wider-framed image - don't reuse that value if the image changes again without re-measuring the new
  margins, e.g. via a quick Python/PIL bounding-box scan of non-white pixels).
- `quality={95}` on `next/image` (Next's default `quality=75` was visibly softening/dulling the source);
  `contrast-105 saturate-105` filter instead of the earlier `brightness-110` (flat brightness boost read
  as washed-out/dull, contrast+saturate reads as "punchier" without the dullness).
- Motion: scroll parallax only (`useScroll` + `useTransform` + `useSpring` driving a `y` offset on the
  image layer). Cursor/pointer parallax was implemented first, then explicitly removed per user request -
  do not re-add mouse-tracking parallax to Hero unless asked again.
- Big left-aligned Fraunces headline "Spaces, drawn / then rendered real.", eyebrow label, body copy, and
  a "View the work" CTA scrolling to `#services`, all with Framer Motion fade/rise-in on load.
- `bg-gradient-to-r from-ink via-ink/40 to-transparent` overlay on the image for left-side text legibility.
- Type-scale rebalance (2026-07-12): headline/body/eyebrow/CTA sizes were widened into a stronger
  big/medium/small hierarchy using Hero-scoped inline `clamp()` values in `Hero.tsx` rather than
  editing the shared `--font-size-*` tokens in `globals.css` (those tokens stay reserved for the
  sitewide locked type scale in section 8, since Services etc. also read from them). Vertical spacing
  between eyebrow/headline/body/CTA was also tightened and the old `pt-24` top offset removed so the
  block reads as one compact, centered cluster instead of spreading down the viewport.
- Copy: headline/eyebrow text has since been hand-edited by the client directly in `Hero.tsx`
  ("Luxury is when it seems flawless" / "Interior Designing • SP Designs") - treat current file
  content as the source of truth over what's quoted elsewhere in this doc.

### Services (`src/components/Services.tsx`)

- Built 2026-07-12 as a **flat list of 5** services (client explicitly chose flat over the 3-part
  grouped workflow story - Visualization / Technical Drawing / Execution - that was proposed first).
- Layout: alternating rows, image left/text right then image right/text left, stacking image-above-text
  on mobile. Each row: numbered eyebrow (01-05), Fraunces title, Sora description, "See more" link CTA
  (currently `href="#"` - not yet wired to a destination, needs a decision once Designs exists).
- Images: no per-service renders exist yet: `public/images/hero.jpg` is reused as a temporary
  placeholder in every row (different `object-position` per row so they don't look identical) -
  swap for real renders once client sends high-res exports (section 7).
- Motion: per-row scroll parallax (image drifts ±40px via `useScroll`/`useTransform`), word-by-word
  staggered title reveal, and blur-in (`filter: blur(4px)→0`) fade/rise for eyebrow + description text,
  all triggered via `whileInView` (once).

### Interior sketch draw-to-render (`src/components/InteriorSketch.tsx`) - Phase 2, built 2026-07-12

- The real stroke-dashoffset "live sketching" signature moment, placed as its own section (`id="process"`)
  **directly under Hero** in `src/app/page.tsx`, above Services.
- Asset: `public/images/interior_sketch.svg` (868 separate stroke paths, living-room interior, viewBox
  0 0 2816 1536). The paths were extracted at build-authoring time into a data module
  `src/components/interiorSketchPaths.ts` (`INTERIOR_SKETCH_PATHS: { d, w }[]`, `w` = stroke-width, default
  1 for the 11 paths with no explicit width) via a one-off node regex over the SVG - so the component maps
  real `<path>` DOM nodes it can drive with GSAP, no runtime fetch / no SVGR build config. Re-run that
  extraction if the SVG is re-exported.
- Mechanism: on mount, `getTotalLength()` per path sets `strokeDasharray`/`strokeDashoffset` to hide each
  stroke, then a GSAP timeline animates offset -> 0. Draw order = **longest strokes first** (walls/floor/
  big furniture gestures lead, short detail ticks trail) for a hand-roughing-a-sketch feel, with heavy
  overlap (`OVERLAP = 24`) so ~2 dozen strokes draw at once rather than one-at-a-time. Strokes rendered in
  a warm graphite `#2e2a25` on `bg-paper` (pencil-on-paper, not the tan `--ink` token which is too light
  to read as line-art).
- End state (user-selected, revised 2026-07-12): **photoreal render cross-fade** - the client added a real
  render `public/images/Interior_sketch.png` (2816x1536, **pixel-identical to the SVG viewBox**, so it lands
  exactly registered on the drawn lines). After the drawing completes, the render cross-fades in over the
  finished sketch (opacity 0 -> 1 with a subtle 1.04 -> 1 settle, `FADE = 2.6`s starting at `DRAW*0.85`),
  **fully replacing** the sketch lines - "drawing becomes the built space." The earlier watercolor-accent
  ending was **removed** per this change. Fade is **scroll-scrubbed** (part of the pinned timeline, reverses
  on scroll up), consistent with the draw. Fraunces caption "From a single line to a living space." still
  fades in near the end.
- Layout (revised 2026-07-12): **full-bleed, no padding** - the SVG + render fill the stage edge-to-edge
  (`preserveAspectRatio="xMidYMid slice"` on the SVG + `object-cover` on the image, so both crop identically
  since they share the 2816x1536 frame). Desktop: **crop-to-fill** full screen. Mobile: the stage is an
  exact-aspect full-width band (`aspect-[2816/1536]`, `md:aspect-auto md:h-screen`) so nothing is cropped
  (user chose "cover desktop, fit mobile").
- Desktop (`768px+`): the stage is **CSS `sticky top-0 h-screen`** (not a GSAP pin anymore) and the draw +
  render fade are a scrubbed timeline (`scrub: 0.8`, wrapper `300vh`). ScrollTrigger `start: "top 70%"` so
  the first strokes appear while the section is still scrolling in - the user never lands on a blank
  full-screen frame (the reason for the sticky-over-pin switch: a GSAP pin can only start at "top top",
  which forced progress=0 / blank at the moment of pinning). Mobile (`<768px`): no sticky/scrub (mobile
  motion policy), same draw plays once on scroll-in (`start: "top 70%"`, `toggleActions: "play none none
  none"`). `prefers-reduced-motion`: skips GSAP, sets all strokes drawn + render/caption visible immediately.
- Relies on the existing Lenis+GSAP ScrollTrigger wiring in `SmoothScrollProvider.tsx` (added for the old
  ServicesSignature) - unchanged.

### Services signature reveal (REMOVED - was `src/components/ServicesSignature.tsx`) - superseded 2026-07-12

- The clip-path wipe stand-in on `hero.jpg` was **deleted** and its mount removed from `Services.tsx` once
  the real traced `interior_sketch.svg` arrived; `InteriorSketch.tsx` (above) is now the single signature
  moment. Original notes retained below for history.

- First GSAP + ScrollTrigger pinned signature moment, sits between the Services heading and the 5 rows
  (breaks out of the `max-w-[1400px]` column so it reads as wider/more prominent than the row content -
  "draw attention" was the explicit ask, see section 4 for why it's here instead of Hero).
- Asset: reuses `public/images/hero.jpg` as-is (no new SVG line-art - none exists yet, section 7). That
  file is already a genuine diagonal sketch/render split of the same room, so the effect is a scroll-
  scrubbed CSS `clip-path: inset()` wipe that reveals more of the image left-to-right as the user scrolls
  through a pinned `100vh` stage - sketch side revealed first, render side second, tracking a thin
  accent-indigo "edge" line across the boundary, with a small "Sketch → Render" caption fading in near
  the end. This is a wipe-reveal of one real image, not a true multi-path stroke-dashoffset draw - swap
  for literal path-drawing if/when a traced SVG line-art asset arrives from the client (see section 4 note).
- Desktop (`md:` and up, `768px+`): pinned via `ScrollTrigger` (`pin: stageRef`, `scrub: 0.6`, wrapper
  reserves `200vh` of scroll distance) using `gsap.matchMedia()` to scope the pin to desktop only.
- Mobile (`<768px`): no pin (per the locked mobile motion policy in section 6/10 - pinned sequences are
  perf/jank risk on small screens) - same clip-path wipe instead plays once, non-scrubbed, on a plain
  `ScrollTrigger` `toggleActions: "play none none none"` trigger.
- `prefers-reduced-motion`: skips GSAP entirely, sets the image to its fully-revealed end state immediately.
- **Lenis/GSAP sync added to `SmoothScrollProvider.tsx`**: this is the first component needing accurate
  pinning under Lenis's virtualized scroll, so the provider now registers `ScrollTrigger`, feeds
  `lenis.on("scroll", ScrollTrigger.update)`, and drives Lenis's raf loop from `gsap.ticker` (with
  `lagSmoothing(0)`) instead of Lenis's own `autoRaf` - the standard Lenis+GSAP ScrollTrigger integration
  pattern. Any future pinned GSAP sequence (Designs/Quotation, if/when built) relies on this same wiring
  already being in place - don't reintroduce `autoRaf: true` or you'll get two competing raf loops.
- Even-row (reversed) text blocks use `md:ml-auto md:pl-2` so the text hugs the grid-gap boundary next
  to the image, matching the odd rows' spacing exactly instead of leaving extra blank space to the
  outer container edge.
- Top section heading "From technical drawing to rendered space" uses a Services-scoped inline clamp
  (up to 76px), larger than the shared `--font-size-h2` token, same pattern as Hero's scoped sizing.

### Designs (`src/components/Designs.tsx`)

- Built 2026-07-12 as a filterable gallery grid, not the full flagship draw-to-render moment (that's
  Phase 2 per section 10 - GSAP work happens once base sections exist).
- Filter pills: All / Exterior / Interior / Technical - client-side state, grid re-flows via Framer
  Motion `layout` animation on filter change.
- 8 project cards spanning the real categories from section 3 (Hyundai showroom, Swaminarayan hall,
  residential facade, living/office/healthcare interiors, floor plan, joinery drawing).
- Each card: per-card scroll parallax on the image (same `useScroll`/`useTransform` pattern as Services),
  hover scale-up, dark gradient overlay revealing tag + title at the bottom, staggered fade/rise-in.
- Images: `public/images/hero.jpg` placeholder reused per card with different `object-position` (same
  temporary-asset pattern as Services - swap once client sends real renders, section 7).

### Quotation (`src/components/Quotation.tsx`)

- Built 2026-07-12, absorbs the old "How I Work" 4-step process per section 5: Brief -> 2D Drawing ->
  3D Render -> Execution.
- Layout: 4-column stepped strip (vertical stack on mobile, side-by-side with dividers on desktop), large
  faded Fraunces numerals, staggered fade/rise-in plus a subtle per-card parallax.
- Closing CTA row anchors to `#contact` on the homepage - no inquiry form (chatbot owns lead capture, per
  section 9/13).

### About (`src/components/About.tsx`, `src/app/about/page.tsx`)

- Built 2026-07-12, then moved out of the homepage scroll into its own route `/about` per explicit user
  request (see section 5 for the routing exception, section 9 for the updated locked decision).
- `src/app/about/page.tsx`: renders `Navbar` + `About`, wrapped in `pt-28 md:pt-36` so content clears the
  fixed floating nav pill with proper breathing room.
- Content: image (placeholder render, same parallax pattern as Services/Designs) left / bio text right on
  desktop, stacked on mobile. Bio covers the 2D-to-3D-to-execution positioning and the Mark Point role.
  Credentials list (Nirma University B.E. Civil Engineering 2019-2023, ISRO internship) with staggered
  reveal. Tool badges (AutoCAD, Revit, 3ds Max, V-Ray, QGIS, MS Office) as pill chips.
- `Navbar.tsx` changes to support this: About link changed from `<a href="#about">` to `next/link`
  `href="/about"` (conditional rendering in `NAV_LINKS.map` - `Link` for `/`-prefixed hrefs, plain `<a>`
  for `#`-anchor hrefs); logo link changed from `<a href="#hero">` to `<Link href="/">` since `#hero`
  doesn't resolve from `/about`.
- Known open item (inherited from Navbar's original note): white nav text was tuned for the dark Hero
  image. On `/about` the page background is paper/light with no hero image behind the nav, so the same
  contrast risk noted in the Navbar section below applies here too if the pill's own gradient/shadow ever
  gets lightened.

### Contact (`src/components/Contact.tsx`)

- Built 2026-07-12, closes out the homepage scroll.
- Detail grid: Email (`mailto:`), Phone (`tel:`), Location - 3 columns on desktop, stacked on mobile, each
  with staggered fade/rise-in. Values sourced from section 2 (client CV facts).
- No inquiry form per section 9/13 - added an empty `#chatbot-mount` div as the reserved embed slot for
  the Vaayu Intelligence chatbot instead.
- Simple footer row (brand name + auto-generated copyright year) closes the section.

### Footer (`src/components/Footer.tsx`)

- Originally just the ghost-logo watermark + one-line copyright bar embedded at the bottom of
  `Contact.tsx`. Extracted into its own component 2026-07-12 so it could be reused outside Contact (the
  first ask was to add a footer to the then-new `/about` route).
- Rebuilt into a **professional footer** 2026-07-12 (same day, later) as part of the multi-page routing
  pivot: a top row (brand wordmark left, "Explore" nav-links column right - Home/Services/Work/Quotation/
  About/Contact via `next/link`) above a divider, then the copyright line below. Ghost logo mask watermark
  kept behind both. Scope was explicitly nav-links-only per user choice - no contact-info column, no
  social/handle row, no separate logo+tagline block were added (all considered and declined).
- Now rendered once in the root layout (`src/app/layout.tsx`), not per-page.

### Routing pivot: single-page scroll -> full multi-page site (2026-07-12)

Supersedes the single-page-scroll decision in section 9 - see section 5 for full detail. Summary of the
mechanical changes:

- `Navbar` and `Footer` moved out of individual `page.tsx` files into `src/app/layout.tsx` (rendered once,
  wrapping `{children}` inside `SmoothScrollProvider`).
- New routes: `src/app/(pages)/{about,services,work,quotation,contact}/page.tsx`, each a thin wrapper
  around its existing component (`About`, `Services`, `Designs`, `Quotation`, `Contact`) plus a per-page
  `metadata.title`. Grouped under `(pages)` (route group, doesn't affect URLs) so a single
  `src/app/(pages)/layout.tsx` can apply the `pt-12 md:pt-16` fixed-nav clearance to all five at once
  instead of repeating it per page.
- `src/app/page.tsx` (Home) now renders only `Hero` + `InteriorSketch` - it's outside the `(pages)` group
  since Hero is full-bleed and designed to sit behind the nav, unlike the other routes.
- `Navbar.tsx` `NAV_LINKS` now point at real routes (`/services`, `/work`, `/quotation`, `/about`,
  `/contact`) instead of `#anchor` hrefs; label for the portfolio link changed from "Designs" to "Work".
- Cross-page CTAs that used to `#anchor`-jump within the single page now use `next/link`: Hero's "View the
  work" -> `/work`, Quotation's "Get in touch" -> `/contact`. Both needed `motion.create(Link)` (Framer
  Motion 12's HOC for wrapping non-DOM components) to keep the existing hover/entrance animations on an
  actual `<Link>` instead of a plain anchor.
- `npm run build` confirmed all 6 routes (`/`, `/about`, `/services`, `/work`, `/quotation`, `/contact`)
  compile and prerender as static content.

Live section ids in the individual components (`hero`, `services`, `designs`, `quotation`, `about`,
`contact`) are unchanged and harmless now that they're not anchor targets - left as-is, not worth churning.

### Bugs hit and fixed along the way (useful if similar patterns recur)

1. **Tailwind v4 (Lightning CSS) auto-fallback breaks `position: absolute`.** Any custom CSS rule using
   `isolation: isolate` gets an auto-injected `position: relative` fallback for older-browser stacking-
   context support. Because unlayered custom CSS always beats Tailwind's `@layer utilities` regardless of
   source order, this silently overrides a Tailwind `absolute` utility class applied to the same element.
   Fix used: don't combine `isolation: isolate` with elements that also need `position: absolute` via a
   utility class - use explicit `relative`/z-index layering instead.
2. **Framer Motion silently drops mixed transform shorthands.** Combining the `y` shorthand style key with
   a separately-named `translateY` (or generally stacking two different sources of the same transform axis)
   on one `motion.div` produces `transform: none` with no error. Fix used: split into two nested
   `motion.div` layers, each owning one clean transform-axis pairing.
3. **Next.js dev image optimizer caches by URL, not file content.** `.next/dev/cache/images/` caches
   resized copies keyed on the request URL + width/quality params. Swapping a same-named file (e.g.
   `hero.jpg`) on disk does not reliably bust this cache - old bytes kept being served. Fix: delete
   `.next/dev/cache/images` after replacing a same-path image, and hard-refresh the browser too (browser
   HTTP cache can also hold the stale response for that URL).
4. **Hydration mismatch from a browser extension, not app code.** ColorZilla (or similar) injects
   `cz-shortcut-listen="true"` onto `<body>` before React hydrates, which React flags as a hydration
   mismatch. Not a real bug - fixed by adding `suppressHydrationWarning` to `<body>` in `layout.tsx`
   (it was already on `<html>`).

### Verification workflow reminder

Per section 14 (locked): do not use the Browser pane / `preview_start` on this project. Run
`npm run build` to confirm changes compile, report what changed, and let the user check visually in
their own browser - faster for them and has been more reliable than the automated preview tooling here.

## 16. Performance + SEO audit pass (2026-07-12)

First dedicated perf/SEO sweep, done alongside the `/services`+`/contact` route removal.

Performance:
- **`Interior_sketch.png` 4.5MB -> `Interior_sketch.webp` 540KB** (`cwebp -q 90 -alpha_q 100`, transparent,
  2816x1536, visually lossless for a render). `InteriorSketch.tsx` now points at the `.webp`. The old PNG
  was removed (git-tracked, recoverable). `public/images` dropped ~5.8MB -> 1.8MB.
- **`next.config.ts`: `formats: ['image/avif','image/webp']`** so next/image serves AVIF (LCP win on the
  Hero) with WebP fallback automatically - no per-component change needed. `qualities` stays `[75, 95]`;
  InteriorSketch's `quality` was 92 (which silently snapped to 95 anyway) and is now explicit `95`.
- **`interiorSketchPaths.ts` coordinate precision reduced to 1 decimal** (one-off node regex rounding every
  `\d+\.\d+`; 0.025px on-screen error at the 2816px viewBox = imperceptible). 97KB -> 84KB (~14%) of
  client-bundled path data. Re-apply after any re-extraction from the SVG.
- Removed 5 unused create-next-app scaffold SVGs from `public/` (`file/globe/next/vercel/window.svg`; 0
  refs). `logo.svg` kept (used by Navbar + Footer watermark).

SEO (all new):
- `src/lib/site.ts` - single source of truth for name/contact/URL. `SITE_URL` reads
  `NEXT_PUBLIC_SITE_URL` and falls back to `https://sp-designs.vercel.app` (real domain still TBD - set the
  env var on deploy).
- `layout.tsx` metadata: `metadataBase`, `openGraph` (+image = hero.jpg 2816x1536), `twitter`
  summary_large_image, `robots` (index/follow, max-image-preview:large), keywords, canonical. Title
  template is `%s` so the per-route `metadata.title` exports pass through unchanged.
- **JSON-LD `ProfessionalService`** injected in `layout.tsx` (founder, Mansa/Gujarat postal address,
  email, phone, areaServed) - local-SEO structured data for the studio.
- `app/sitemap.ts` (/, /work, /quotation, /about) + `app/robots.ts` (allow all, points at sitemap). Both
  verified in the build output (`/robots.txt`, `/sitemap.xml` generated).

a11y:
- Each standalone route now has exactly one `<h1>`: promoted the top `h2` -> `h1` in `About.tsx`,
  `Designs.tsx`, `Quotation.tsx` (tag-only swap, styling unchanged). Services/Contact stay `h2` since
  they're homepage sections under Hero's `h1`.
- Services rows' placeholder `See more` `href="#"` -> real `/work` link (via `motion.create(Link)`), with
  an `aria-label` per row. This closes the section-15 open item ("See more CTA needs a destination once
  Designs exists").

`npm run build` + `npm run lint` both green; route table: `/`, `/about`, `/quotation`, `/work`,
`/robots.txt`, `/sitemap.xml`. Not committed (per section 14, user verifies visually first).
