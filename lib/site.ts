const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adilkhursheed.vercel.app"
).replace(/\/+$/, "");

export const site = {
  name: "Adil Khursheed",
  role: "Full Stack Web Developer",
  location: "Based in India",
  url: siteUrl,
  twitter: "@AdilSayed2",
  summary:
    "I turn ideas into fast, scalable, real-world products with TypeScript, React, Next.js, Node.js, and MongoDB.",
  description:
    "Adil Khursheed is a full stack web developer in India building fast, accessible products end to end with TypeScript, React, Next.js, Node.js, and MongoDB.",
  keywords: [
    "Adil Khursheed",
    "full stack web developer",
    "web developer India",
    "TypeScript developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "portfolio",
  ],
  technologies: [
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  match?: "exact" | "section";
};

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work", match: "section" },
  { label: "Projects", href: "/projects", match: "exact" },
  { label: "Contact", href: "/#contact", match: "section" },
];

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "instagram" | "twitter";
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/adil-khursheed", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adil-khursheed-16535615b/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sayed_adil_/",
    icon: "instagram",
  },
  { label: "Twitter", href: "https://twitter.com/AdilSayed2", icon: "twitter" },
];
