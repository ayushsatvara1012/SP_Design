import Navbar from "@/components/Navbar";
import About from "@/components/About";

export const metadata = {
  title: "About — SP Designs",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="pt-28 md:pt-36">
        <About />
      </div>
    </main>
  );
}
