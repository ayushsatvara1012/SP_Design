# SP Designs - Website Plan

Client: Shalini Prajapati, Founder & Designer, SP Designs (Mansa, Gujarat)
Source material: PORTFOLIO_SHALINI PRAJAPATI.pdf (29 pages), SHALINI_P_CV.pdf
Status: Phase 1 in progress - Navbar and Hero built and reviewed; Services/Designs/Quotation/About/Contact
still blank placeholder sections. See section 15 for current implementation status.
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

Where it appears (used sparingly, 2-3 hero moments - not every section):
- Hero: signature space draws itself on load + first scroll.
- Section transition into Interior gallery: one flagship room drawn then rendered.
- "How I work" strip: 2D plan -> 3D render reveal that literally sells the service.

Fallback: users with prefers-reduced-motion see the finished render instantly.

## 5. Sitemap / section order

Revised 2026-07-12 per client nav requirements - nav bar links are Services, Designs, Quotation, About,
Contact (Hero has no nav link, reached via logo/scroll-to-top). Section ids in code: hero, services,
designs, quotation, about, contact.

1. Hero - brand wordmark, tagline, signature draw-to-render animation, primary CTA.
2. Services - what she offers (exterior visualization, interior visualization, 2D drafting, MEP-adjacent
   detailing, furniture documentation - see section 3). Supersedes the old separate Exterior/Interior/Craft
   sections; these become subsections or filterable groups within Services.
3. Designs - the portfolio/gallery proper (facades, showroom, hall, living, office, healthcare) with the
   flagship draw-to-render moment.
4. Quotation - process + how-to-get-a-quote (absorbs the old "How I Work" 4-step process: brief -> 2D
   drawing -> 3D render -> execution), positioned as the step before Contact.
5. About - short bio, credentials (Nirma, ISRO), tool badges.
6. Contact - email/phone/location (no inquiry funnel - chatbot owns lead capture, per section 9/13).

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
- Structure: single-page scroll experience.
- Assets: client will send high-res render exports later. For now, extract low-res renders from the PDF to build a blueprint.
- Language: English only for now.
- Contact section stays (email/phone/location) but no inquiry funnel - the chatbot owns lead capture.

Still to confirm later: domain/hosting (default Vercel), logo/wordmark (none exists - design a simple SP wordmark).

## 10. Phasing

- Phase 0: DONE - scope confirmed, decisions locked; animation stack confirmed (2026-07-12).
- Phase 1 (IN PROGRESS): Section-by-section build (see section 12) - not a full-page build in one pass. Real copy, low-res renders extracted from PDF as placeholders (client hasn't sent real assets yet - proceeding with placeholders per section 7). Responsive at every step.
  - Navbar: DONE (see section 15).
  - Hero: DONE (see section 15).
  - Services, Designs, Quotation, About, Contact: NOT STARTED - blank placeholder `<section>` blocks only.
- Phase 2: Add Lenis + GSAP scroll animation on the 2-3 signature draw-to-render moments (once base sections exist).
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
- Known open item: nav text is white, tuned for sitting over the dark hero. Once light-background
  sections are built below the hero, white-on-white will be low contrast - needs a scroll-triggered state
  (swap to solid/dark-text pill after the hero) when those sections are built. Not done yet.

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

### Sitemap (superseded from the original plan - see section 5)

Live section ids in `src/app/page.tsx`: `hero`, `services`, `designs`, `quotation`, `about`, `contact`.
Only `hero` has real content; the rest are blank `<section className="min-h-screen bg-paper" />` placeholders
per the section-12 build workflow, waiting to be built one at a time with pause-for-review between each.

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
