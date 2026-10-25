import type { Metadata } from "next";
import Link from "next/link";

import { ProjectsExplorer } from "@/components/projects-explorer";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { getProjects } from "@/lib/projects";
import { JsonLd, socialImage } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 60;

const description =
  "A working archive of projects by Adil Khursheed, from full-stack apps to front-end interfaces.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `${site.name} | Projects`,
    description,
    type: "website",
    url: "/projects",
    siteName: site.name,
    locale: "en_IN",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Projects`,
    description,
    site: site.twitter,
    creator: site.twitter,
    images: [socialImage],
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}/projects#page`,
    url: `${site.url}/projects`,
    name: "Projects",
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        description: project.summary,
        url:
          project.live_url ??
          project.repo_url ??
          `${site.url}/projects`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${site.url}/projects`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <Section className="pt-24 md:pt-32">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 font-mono text-[11px] lowercase text-foreground/55"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground/80">
              projects
            </li>
          </ol>
        </nav>

        <SectionHeading
          as="h1"
          title="Projects"
          meta={
            projects.length
              ? `${String(projects.length).padStart(2, "0")} shipped`
              : "in progress"
          }
        />

        <p className="mt-6 max-w-[54ch] text-lg leading-9 text-foreground/75">
          A working archive of things I&apos;ve designed, built, and shipped. Each
          entry links to the live build and the source, so you can judge the work
          rather than the write-up.
        </p>

        <div className="mt-12">
          {projects.length ? (
            <ProjectsExplorer projects={projects} />
          ) : (
            <p className="max-w-[52ch] text-base/8 text-foreground/60">
              The archive is being catalogued. Browse the source on{" "}
              <a
                href="https://github.com/adil-khursheed"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                GitHub
              </a>{" "}
              in the meantime.
            </p>
          )}
        </div>
      </Section>
    </>
  );
}
