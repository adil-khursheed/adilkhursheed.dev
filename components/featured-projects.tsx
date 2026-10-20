import { ActionLink } from "@/components/action-link";
import { ProjectFeature } from "@/components/project-feature";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedProjects } from "@/lib/projects";

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects(3);
  const [lead, ...rest] = projects;

  return (
    <Section id="projects">
      <SectionHeading
        title="Selected work"
        meta={
          <ActionLink href="/projects" icon="right">
            all projects
          </ActionLink>
        }
      />

      {lead ? (
        <div className="mt-10 flex flex-col gap-14">
          <ProjectFeature project={lead} lead />
          {rest.length ? (
            <div className="grid gap-12 md:grid-cols-2">
              {rest.map((project) => (
                <ProjectFeature key={project.id} project={project} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-8 max-w-[52ch] text-base/8 text-foreground/60">
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
    </Section>
  );
}
