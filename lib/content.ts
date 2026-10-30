export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "languages",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "PHP"],
  },
  {
    label: "frameworks & libraries",
    items: [
      "React",
      "Next.js",
      "Laravel",
      "Tailwind CSS",
      "Redux",
      "Tanstack-Query",
      "shadcn",
      "Payload CMS",
      "Clerk",
      "Better Auth",
      "Supabase",
    ],
  },
  {
    label: "backend & data",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSql",
      "Prisma ORM",
      "Drizzle ORM",
      "Redis",
      "BullMQ",
    ],
  },
  {
    label: "tooling",
    items: [
      "Git",
      "GitHub",
      "Firebase",
      "AWS",
      "Vercel",
      "OpenRouter",
      "TurboRepo",
    ],
  },
];

export const experience = {
  company: "Leadlly Edusolutions Pvt. Ltd.",
  role: "frontend developer",
  product: "student portal",
  start: "2024-04",
  end: "2026-05",
  period: "apr 2024 — may 2026",
  summary:
    "Leadlly is a self-study platform for students. Its student portal is where they plan revision, track chapters, and test themselves — one workspace for the study routine.",
  highlights: [
    {
      label: "built",
      text: "Built the student portal from scratch and carried it into production.",
    },
    {
      label: "owned",
      text: "Owned frontend delivery end to end, from data wiring to the shipped interface students used every day.",
    },
    {
      label: "shipped",
      text: "Shipped the dashboard, weekly planner, chapter tracker, and quizzes, plus a custom quiz builder for focused practice.",
    },
  ],
} as const;
