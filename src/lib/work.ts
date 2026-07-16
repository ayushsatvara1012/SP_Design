export type WorkCategoryId = "exterior" | "interior" | "technical";

export type WorkProject = {
  title: string;
  tag: string;
  description: string;
  images: string[];
  // Dense technical sheets need a whole page each to stay legible. Defaults to 2.
  imagesPerPage?: 1 | 2;
  // Give the opening page entirely to the description, and let the drawings have
  // full pages of their own.
  textOnlyOpening?: boolean;
  // The first image is already the book's cover art; don't repeat it inside.
  skipCoverImage?: boolean;
};

export type WorkCategory = {
  id: WorkCategoryId;
  eyebrow: string;
  heading: string;
  intro: string;
  projects: WorkProject[];
};

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    id: "exterior",
    eyebrow: "01 — Exterior",
    heading: "Architectural Exterior Visualization",
    intro:
      "Photorealistic facades that let clients walk the exterior before a foundation is poured - modern and traditional residences, commercial builds, and institutional halls.",
    projects: [
      {
        title: "Modern Architectural Facade",
        tag: "Residential",
        description:
          "This exterior 3D render showcases modern architectural facades with a balance of aesthetics and functionality. Realistic materials, natural lighting, and detailed textures bring the design to life, letting clients visualize the final outcome before execution - elegant, well-proportioned structures that enhance the character of the space while staying practical.",
        images: [
          "/images/work/exterior/modern-facade-1.webp",
          "/images/work/exterior/modern-facade-2.webp",
        ],
      },
      {
        title: "Traditional Architectural Facade",
        tag: "Residential",
        description:
          "A modern single-floor residence designed around simplicity and elegance. The render highlights realistic textures, lighting, and landscaping for a natural, inviting look, with special attention to arches, fencing, and outdoor spaces. High-quality renders that communicate the design intent and give clients a clear vision of the project.",
        images: [
          "/images/work/exterior/traditional-facade-1.webp",
          "/images/work/exterior/traditional-facade-2.webp",
        ],
      },
      {
        title: "Shri Swaminarayan, Vadi",
        tag: "Institutional",
        description:
          "Design and visualization of Shri Swaminarayan Hall at Veda, focused on functional planning and aesthetic detailing. The project paired 2D drawings with 3D renders that presented the space with clarity and realism, helping communicate the concept and support smooth client decision-making.",
        images: [
          "/images/work/exterior/swaminarayan-1.webp",
          "/images/work/exterior/swaminarayan-2.webp",
        ],
      },
      {
        title: "Hyundai Showroom",
        tag: "Commercial",
        description:
          "A 3D visualization of the Hyundai showroom tailored to their official template, blending realism and design precision to bring the space to life and showcase the brand's modern identity.",
        images: [
          "/images/work/exterior/hyundai-1.webp",
          "/images/work/exterior/hyundai-2.webp",
        ],
      },
    ],
  },
  {
    id: "interior",
    eyebrow: "02 — Interior",
    heading: "Architectural Interior Visualization",
    intro:
      "Immersive interiors where every material, light, and furniture placement is resolved before a wall goes up - residential living, offices, and healthcare spaces.",
    projects: [
      {
        title: "Modern Office Space",
        tag: "Commercial",
        description:
          "A detailed 3D visualization of a modern office interior built in 3ds Max and V-Ray. Photorealistic renders showcase space planning, furniture arrangements, material finishes, and lighting concepts - presenting the interior design concept with strong attention to detail.",
        imagesPerPage: 1,
        skipCoverImage: true,
        images: [
          "/images/work/interior/office-1.webp",
          "/images/work/interior/office-2.webp",
          "/images/work/interior/office-3.webp",
        ],
      },
      {
        title: "Functional & Elegant Interiors",
        tag: "Residential",
        description:
          "Modern, functional living spaces with a touch of elegance. Focused on spatial planning, lighting, and material selection, the design reflects both comfort and luxury. Realistic rendering brings out textures, furniture placement, and ambiance so clients can experience the space virtually before it is built.",
        images: [
          "/images/work/interior/functional-1.webp",
          "/images/work/interior/functional-2.webp",
        ],
      },
      {
        title: "Residential Interiors",
        tag: "Selected Renders",
        description:
          "A selection of 3D visualizations from previous residential projects - living rooms, modular kitchens, dining, and bedrooms - each rendered to convey material, light, and mood with realism.",
        images: [
          "/images/work/interior/residential-1.webp",
          "/images/work/interior/residential-2.webp",
          "/images/work/interior/residential-3.webp",
          "/images/work/interior/residential-6.webp",
        ],
      },
      {
        title: "Healthcare Interiors",
        tag: "Institutional",
        description:
          "A modern reception and waiting area designed for comfort and elegance. The layout keeps circulation smooth while staying welcoming, with material choices and lighting that lend a professional yet warm character - balancing functionality with aesthetics for a strong first impression.",
        images: [
          "/images/work/interior/healthcare-1.webp",
          "/images/work/interior/healthcare-2.webp",
          "/images/work/interior/healthcare-3.webp",
          "/images/work/interior/healthcare-4.webp",
          "/images/work/interior/healthcare-5.webp",
          "/images/work/interior/healthcare-6.webp",
        ],
      },
    ],
  },
  {
    id: "technical",
    eyebrow: "03 — Technical",
    heading: "Architectural Drawings & Details",
    intro:
      "The technical foundation beneath every render - space planning, elevations, MEP-adjacent layouts, and fabrication-ready furniture documentation.",
    projects: [
      {
        title: "Space Planning & Layouts",
        tag: "Floor Plans",
        description:
          "Efficient layouts that maximize space utilization. Each plan is developed with careful attention to functionality, circulation, proportions, and practical living needs - translating concepts into clear, well-structured architectural plans across ground, first, and upper floors.",
        imagesPerPage: 1,
        textOnlyOpening: true,
        images: [
          "/images/work/technical/space-planning-1.webp",
          "/images/work/technical/space-planning-2.webp",
          "/images/work/technical/space-planning-3.webp",
        ],
      },
      {
        title: "2D Elevation & Exterior Details",
        tag: "Elevations",
        description:
          "2D elevation and exterior detail drawings derived directly from 3D renders, including a high-rise building elevation. Each drawing captures the exterior language of the design with the dimensional precision needed for execution.",
        imagesPerPage: 1,
        // Presentation order: the high-rise elevation reads last.
        images: [
          "/images/work/technical/elevation-1.webp",
          "/images/work/technical/elevation-3.webp",
          "/images/work/technical/elevation-4.webp",
          "/images/work/technical/elevation-2.webp",
        ],
      },
      {
        title: "Electrical Layouts",
        tag: "MEP",
        description:
          "Electrical layouts for safe, efficient, well-organized power distribution. Detailed placement of lights, switches, sockets, and components, designed to meet safety standards while supporting functional and aesthetic requirements.",
        images: ["/images/work/technical/electrical-1.webp"],
      },
      {
        title: "Ceiling Layout & Design",
        tag: "MEP",
        description:
          "Ceiling detail drawings covering layout, material selection, and decorative elements. The designs focus on functionality, lighting integration, and visual appeal, giving clear guidance for accurate execution during construction.",
        images: ["/images/work/technical/ceiling-1.webp"],
      },
      {
        title: "2D Furniture Documentation",
        tag: "Fabrication",
        description:
          "Detailed 2D furniture drawings developed from 3D renders - wardrobes, kitchens, TV units, and joinery - capturing exact dimensions, joinery details, and material specifications. Each sheet bridges design visualization and fabrication, ready for accurate construction and installation.",
        imagesPerPage: 1,
        images: [
          "/images/work/technical/furniture-1.webp",
          "/images/work/technical/furniture-2.webp",
          "/images/work/technical/furniture-3.webp",
          "/images/work/technical/furniture-4.webp",
          "/images/work/technical/furniture-5.webp",
          "/images/work/technical/furniture-6.webp",
        ],
      },
    ],
  },
];
