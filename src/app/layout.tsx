import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { SITE, SITE_URL } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: "%s",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder }],
  creator: SITE.founder,
  keywords: [
    "SP Designs",
    "interior design Mansa",
    "interior designer Mansa",
    "3D architectural visualization",
    "architectural visualizer Gujarat",
    "interior visualization Gujarat",
    "3D elevation designer Kalol",
    "interior decorator Gandhinagar",
    "residential interior design Ahmedabad",
    "2D drafting",
    "2D floor plan layout",
    "civil engineering CAD drawings",
    "photorealistic render",
    "exterior visualization",
    "3D facade rendering",
    "modular kitchen design drawings",
    "office cabin interior rendering",
    "showroom facade visualizer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE_URL,
    locale: "en_IN",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "SP Designs — signature interior render",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "Architect", "InteriorDesign", "LocalBusiness"],
  name: SITE.name,
  image: `${SITE_URL}${SITE.ogImage}`,
  url: SITE_URL,
  email: SITE.email,
  telephone: SITE.phone,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    postalCode: "382845",
    addressCountry: SITE.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "23.4247",
    longitude: "72.6617"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  priceRange: "$$",
  areaServed: { "@type": "State", name: SITE.region },
  knowsAbout: [
    "Interior Design",
    "3D Architectural Visualization",
    "2D Technical Drafting",
    "Exterior Visualization",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Architectural & Interior Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "2D Technical Drafting",
          description: "Space planning, layouts, and elevations drafted in AutoCAD and Revit."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "3D Architectural Renderings",
          description: "Photorealistic 3D rendering and exterior visualization in 3ds Max and V-Ray."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior Design & Visualization",
          description: "Residential and commercial interior design concepts turned into photorealistic renders."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-paper text-ink font-sans relative"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
