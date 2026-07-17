// Single source of truth for site-wide identity + contact facts.
// Used by metadata, sitemap, robots, and JSON-LD so they never drift.
// Set NEXT_PUBLIC_SITE_URL in the deploy env once the real domain is live;
// the fallback is the default Vercel URL noted in the project plan.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.spdesigning.com";

export const SITE = {
  name: "SP Designs",
  founder: "Shalini Prajapati",
  title:
    "SP Designs | Architectural Visualization & Interior Design Agency",
  description:
    "SP Designs is an architectural visualization and interior design agency in Mansa, Gujarat, taking spaces from 2D technical drafting to photorealistic 3D render.",
  email: "spdesigns28@gmail.com",
  phone: "+918980775017",
  locality: "Mansa",
  region: "Gujarat",
  country: "IN",
  streetAddress: "SP Designs, Kalol Mansa Road, Mansa, Gujarat - India",
  ogImage: "/images/og.jpg",
} as const;
