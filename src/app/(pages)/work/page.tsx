import MagazineFlip from "@/components/work/MagazineFlip";
import WorkHero from "@/components/work/WorkHero";

export const metadata = {
  title: "Work — SP Designs",
  description:
    "Selected architectural exterior, interior, and technical visualization work by SP Designs — photorealistic 3D renders and 2D drafting.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <MagazineFlip />
    </>
  );
}
