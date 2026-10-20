import type { Metadata } from "next";

import { ProjectsExplorer } from "@/components/projects-explorer";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { getProjects } from "@/lib/projects";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A working archive of projects by Adil Khursheed, from full-stack apps to front-end interfaces.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Section className="pt-24 md:pt-32">
      <SectionHeading
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
  );
}
