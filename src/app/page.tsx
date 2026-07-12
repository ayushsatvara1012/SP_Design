import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Designs from "@/components/Designs";
import Quotation from "@/components/Quotation";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <Services />
      <Designs />
      <Quotation />
      <section id="contact" className="min-h-screen bg-paper" />
    </main>
  );
}
