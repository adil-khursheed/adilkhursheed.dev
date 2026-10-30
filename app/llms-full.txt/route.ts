import { experience, skillGroups } from "@/lib/content";
import { faqs } from "@/lib/faq";
import type { Project } from "@/lib/projects";
import { getProjects } from "@/lib/projects";
import { site, socials } from "@/lib/site";

export const revalidate = 60;

function projectLines(project: Project) {
  return [
    `### ${project.title}`,
    "",
    project.summary,
    "",
    `- Type: ${project.type}`,
    project.year ? `- Year: ${project.year}` : null,
    `- Stack: ${project.tech_stack.join(", ")}`,
    project.live_url ? `- Live: ${project.live_url}` : null,
    project.repo_url ? `- Source: ${project.repo_url}` : null,
    "",
  ].filter((line): line is string => line !== null);
}

export async function GET() {
  const projects = await getProjects();

  const lines = [
    `# ${site.name} — ${site.role}`,
    "",
    site.description,
    "",
    "## Summary",
    "",
    site.summary,
    "",
    "## Entity",
    "",
    `- Name: ${site.name}`,
    `- Role: ${site.role}`,
    `- Location: ${site.country}`,
    `- Website: ${site.url}`,
    `- Profiles: ${socials
      .map((social) => `${social.label} (${social.href})`)
      .join(", ")}`,
    `- Technologies: ${site.technologies.join(", ")}`,
    "",
    "## Experience",
    "",
    `### ${experience.company}`,
    "",
    `${experience.role} · ${experience.product} · ${experience.period}`,
    "",
    experience.summary,
    "",
    ...experience.highlights.map((item) => `- ${item.text}`),
    "",
    "## Technical skills",
    "",
    ...skillGroups.flatMap((group) => [
      `### ${group.label}`,
      "",
      group.items.join(", "),
      "",
    ]),
    "## Projects",
    "",
    ...(projects.length
      ? projects.flatMap(projectLines)
      : [
          "The project archive is being catalogued. Browse the source at https://github.com/adil-khursheed.",
          "",
        ]),
    "## Questions",
    "",
    ...faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    "## Contact",
    "",
    `- Contact form: ${site.url}/#contact`,
    ...socials.map((social) => `- ${social.label}: ${social.href}`),
    "",
    "## Site structure",
    "",
    `- ${site.url}/`,
    `- ${site.url}/projects`,
    `- ${site.url}/sitemap.xml`,
    `- ${site.url}/llms.txt`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
