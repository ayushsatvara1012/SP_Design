import Quotation from "@/components/Quotation";

export const metadata = {
  title: "Get a Quote — SP Designs",
  description:
    "How SP Designs takes a project from brief to built — 2D drawing, 3D render, and execution coordination in four stages.",
  alternates: { canonical: "/quotation" },
};

export default function QuotationPage() {
  return (
    <div className="pt-20 md:pt-28">
      <Quotation />
    </div>
  );
}
