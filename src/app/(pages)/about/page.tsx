import About from "@/components/about/About";
import Image from "next/image";

export const metadata = {
  title: "About — SP Designs",
  description:
    "SP Designs is a premier architectural design and 3D visualization agency based in Mansa, Gujarat, specializing in residential and commercial spaces.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="relative pt-20 md:pt-2 min-h-screen">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/background.webp"
          alt="Background Texture"
          fill
          className="object-cover"
          priority
        />
        {/* Fade to paper at the bottom to blend with footer smoothly */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-paper to-transparent" />
      </div>
      <div className="relative z-10">
        <About />
      </div>
    </div>
  );
}
