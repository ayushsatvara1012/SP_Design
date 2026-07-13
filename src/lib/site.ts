// Single source of truth for site-wide identity + contact facts.
// Used by metadata, sitemap, robots, and JSON-LD so they never drift.
// Set NEXT_PUBLIC_SITE_URL in the deploy env once the real domain is live;
// the fallback is the default Vercel URL noted in the project plan.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sp-designs.vercel.app";

export const SITE = {
  name: "SP Designs",
  founder: "Shalini Prajapati",
  title:
    "SP Designs | Shalini Prajapati — Architectural Visualization & Interior Design",
  description:
    "SP Designs is the studio of Shalini Prajapati, an architectural designer and 3D visualizer in Mansa, Gujarat, taking spaces from 2D technical drafting to photorealistic 3D render.",
  email: "spdesigns28@gmail.com",
  phone: "+918980775017",
  locality: "Mansa",
  region: "Gujarat",
  country: "IN",
  streetAddress: "SJ Farm House, behind SJ Traders, Kalol-Mansa Road",
  ogImage: "/images/hero.jpg",
} as const;
