import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InteriorSketch from "@/components/InteriorSketch";
import Services from "@/components/Services";
import Designs from "@/components/Designs";
import Quotation from "@/components/Quotation";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <InteriorSketch />
      <Services />
      <Designs />
      <Quotation />
      <Contact />
    </main>
  );
}
