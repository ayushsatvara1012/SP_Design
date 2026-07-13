import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    "Shalini Prajapati",
    "interior design Mansa",
    "3D architectural visualization",
    "interior visualization Gujarat",
    "2D drafting",
    "photorealistic render",
    "exterior visualization",
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
        width: 2816,
        height: 1536,
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
  "@type": "ProfessionalService",
  name: SITE.name,
  image: `${SITE_URL}${SITE.ogImage}`,
  url: SITE_URL,
  email: SITE.email,
  telephone: SITE.phone,
  description: SITE.description,
  founder: { "@type": "Person", name: SITE.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: { "@type": "State", name: SITE.region },
  knowsAbout: [
    "Interior Design",
    "3D Architectural Visualization",
    "2D Technical Drafting",
    "Exterior Visualization",
  ],
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
        className="min-h-full flex flex-col bg-paper text-ink font-sans"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
