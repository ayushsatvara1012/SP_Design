import About from "@/components/About";

export const metadata = {
  title: "About — SP Designs",
  description:
    "Shalini Prajapati — Civil Engineer turned architectural designer and 3D visualizer, founder of SP Designs in Mansa, Gujarat.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-28">
      <About />
    </div>
  );
}
