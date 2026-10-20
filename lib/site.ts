export const site = {
  name: "Adil Khursheed",
  role: "Full Stack Web Developer",
  location: "Based in India",
  summary:
    "I turn ideas into fast, scalable, real-world products with TypeScript, React, Next.js, Node.js, and MongoDB.",
  description:
    "Portfolio of Adil Khursheed, a full stack web developer building fast, accessible products end to end.",
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
