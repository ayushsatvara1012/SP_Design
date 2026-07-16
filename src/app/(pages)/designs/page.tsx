import MagazineFlip from "@/components/work/MagazineFlip";
import WorkHero from "@/components/work/WorkHero";

export const metadata = {
  title: "Designs — SP Designs",
  description:
    "Selected architectural exterior, interior, and technical visualization designs by SP Designs — photorealistic 3D renders and 2D drafting.",
  alternates: { canonical: "/designs" },
};

export default function DesignsPage() {
  return (
    <>
      <WorkHero />
      <MagazineFlip />
    </>
  );
}
