import Hero from "@/components/home/Hero";
import InteriorSketch from "@/components/home/InteriorSketch";
import Services from "@/components/home/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SP Designs | Interior Design & 3D Architectural Visualization Agency in Mansa, Gujarat",
  description: "SP Designs is an interior design & architectural visualization agency offering photorealistic 3D rendering, 2D technical drawings, and CAD space planning in Mansa, Gandhinagar, and Ahmedabad, Gujarat.",
  keywords: [
    "SP Designs", "interior design agency Mansa", "3D architectural visualization agency Gujarat",
    "interior design agency Gandhinagar", "3D elevation design Kalol", "2D floor plan drafting",
    "photorealistic home renders Ahmedabad", "residential interior living room design", "modular kitchen CAD drawings",
    "commercial showroom facade visualizer", "architectural rendering services India"
  ],
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <InteriorSketch />
      <Services />
    </>
  );
}
