import { experience, skillGroups } from "@/lib/content";
import { faqs } from "@/lib/faq";
import type { Project } from "@/lib/projects";
import { getProjects } from "@/lib/projects";
import { site, socials } from "@/lib/site";

export const revalidate = 60;

function projectUrl(project: Project) {
  return project.live_url ?? project.repo_url ?? `${site.url}/projects`;
}

export async function GET() {
  const projects = await getProjects();

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.role} based in ${site.country}. ${site.summary}`,
    "",
    "## About",
    "",
    site.description,
    "",
    "## Pages",
    "",
    `- [Home](${site.url}/): Portfolio, experience, technical skills, selected work, and contact.`,
    `- [Projects](${site.url}/projects): ${projects.length} shipped personal and freelance projects with live and source links.`,
    `- [Contact](${site.url}/#contact): Project enquiries through the contact form.`,
    "",
    "## Experience",
    "",
    `- ${experience.company} — ${experience.role}, ${experience.product} (${experience.period}).`,
    ...experience.highlights.map((item) => `  - ${item.text}`),
    "",
    "## Skills",
    "",
    ...skillGroups.map(
      (group) => `- ${group.label}: ${group.items.join(", ")}`,
    ),
    "",
    "## Projects",
    "",
    ...(projects.length
      ? projects.map(
          (project) =>
            `- [${project.title}](${projectUrl(project)}): ${project.summary} (${project.tech_stack.join(", ")})`,
        )
      : [
          "- The project archive is being catalogued. Browse the source at https://github.com/adil-khursheed.",
        ]),
    "",
    "## Questions",
    "",
    ...faqs.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
    "## Contact",
    "",
    `- Contact form: ${site.url}/#contact`,
    ...socials.map((social) => `- ${social.label}: ${social.href}`),
    "",
    "## Optional",
    "",
    `- [Sitemap](${site.url}/sitemap.xml)`,
    `- [Full site text](${site.url}/llms-full.txt)`,
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
