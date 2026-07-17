import Hero from "@/components/home/Hero";
import InteriorSketch from "@/components/home/InteriorSketch";
import Services from "@/components/home/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SP Designs | Interior Designer & 3D Architectural Visualizer in Mansa, Gujarat",
  description: "SP Designs by Shalini Prajapati offers photorealistic 3D interior & exterior architectural rendering, 2D technical drawings, and CAD space planning in Mansa, Gandhinagar, and Ahmedabad, Gujarat.",
  keywords: [
    "SP Designs", "Shalini Prajapati", "interior design Mansa", "3D architectural visualization Gujarat",
    "interior designer Gandhinagar", "3D elevation designer Kalol", "2D floor plan drafting",
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
