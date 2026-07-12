import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <Services />
      <section id="designs" className="min-h-screen bg-paper" />
      <section id="quotation" className="min-h-screen bg-paper" />
      <section id="about" className="min-h-screen bg-paper" />
      <section id="contact" className="min-h-screen bg-paper" />
    </main>
  );
}
