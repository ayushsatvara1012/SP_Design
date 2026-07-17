import Quotation from "@/components/quotation/Quotation";

export const metadata = {
  title: "Get a Quote — SP Designs",
  description:
    "How SP Designs takes a project from brief to built — 2D drawing, 3D render, and execution coordination in four stages.",
  alternates: { canonical: "/quotation" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What areas do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SP Designs is based in Mansa, Gujarat. We primarily serve clients across Mansa, Gandhinagar, Kalol, and Ahmedabad. However, for 2D drafting and 3D architectural visualization, we work with clients and architectural firms remotely across India."
      }
    },
    {
      "@type": "Question",
      name: "What inputs are needed to start a 2D or 3D design project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To get started, we need the site dimensions, basic requirements (like the number of rooms or specific functions), and any reference images you have for the desired style. If you already have CAD floor plans, we can directly begin 3D modeling and elevation rendering."
      }
    },
    {
      "@type": "Question",
      name: "What is the typical turnaround time for a 3D elevation or interior render?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard 3D front elevation or a single room's interior photorealistic render typically takes 3 to 5 working days, depending on the complexity of the design and the number of revisions requested."
      }
    },
    {
      "@type": "Question",
      name: "Do you provide site supervision or execution services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for local projects in and around Mansa and Gandhinagar, we offer on-site execution coordination. We provide detailed furniture drawings, electrical layouts, and ceiling plans to ensure the physical build perfectly matches the approved 3D design."
      }
    }
  ]
};

export default function QuotationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="pt-20 md:pt-28">
        <Quotation />
      </div>
    </>
  );
}
