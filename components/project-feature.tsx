import Image from "next/image";
import Link from "next/link";

import { primaryUrl, ProjectLinks, TechList } from "@/components/project-parts";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectFeature({
  project,
  lead = false,
}: {
  project: Project;
  lead?: boolean;
}) {
  const href = primaryUrl(project);

  return (
    <article id={project.slug} className="group scroll-mt-24">
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10",
            lead ? "aspect-[16/9]" : "aspect-[3/2]",
          )}
        >
          <Image
            src={project.image_path}
            alt={`${project.title} preview`}
            fill
            sizes={
              lead
                ? "(min-width: 1024px) 72rem, 100vw"
                : "(min-width: 768px) 36rem, 100vw"
            }
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3
          className={cn(
            "tracking-tight",
            lead ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
          )}
        >
          <Link
            href={href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {project.title}
          </Link>
        </h3>
        {project.year ? (
          <span className="font-mono text-[11px] text-foreground/65">
            {project.year}
          </span>
        ) : null}
      </div>

      <p className="mt-2 max-w-[52ch] text-sm/6 text-foreground/65">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <TechList items={project.tech_stack} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
